# Catalog Data Quality

**Last updated:** 2026-08-14

How product data enters the catalog, which parts of it are trustworthy, and the
defects found so far. Read this before adding products or "refreshing" prices.

---

## The core constraint: Amazon is not in Google Shopping

`scripts/enrich-products.mjs` gets rating, reviewCount and price from Serper's
`shopping` endpoint. **Amazon does not feed Google Shopping.** Its
"find the Amazon result" lookup therefore almost never matches, and the code
falls through to `rated || list[0]` — Walmart, Target, eBay, whoever.

Confirmed three ways on 2026-08-14:

- An Amazon-only price query returned a price for **0 of 81** items.
- A price-by-ASIN lookup resolved **3 of 81**.
- A magnetic tiles set came back as 4.7 stars / 1,100 reviews / $39.97. Amazon
  actually shows **4.8 / 5,887 / $19.99**.

| Field from enrich-products.mjs | Trustworthy? |
|---|---|
| ASIN | Yes (still verify the title, see below) |
| image | Yes |
| rating | **No** — some other retailer's rating |
| reviewCount | **No** — some other retailer's count |
| price | **No** — some other retailer's price |

### Why it mattered

Every guide ranks by `rating x log10(reviewCount)` (`lib/giftSelect.ts`). A
fake-low count buries the product. 205 entries were affected, and the damage
landed hardest on the best products:

| Product | Stored | Actual Amazon |
|---|---|---|
| HEETA Scalp Massager | 7 reviews | 154,506 |
| CeraVe Cleanser & Duo | 7 reviews | 109,117 |
| Olaplex No.3 Repair Kit | 264 reviews | 135,572 |
| ASAKUKI Oil Diffuser | 15 reviews | 71,788 |
| Mario Badescu Mist Set | 5 reviews | 19,626 |

This is very likely why quality picks kept losing to mass-market electronics on
`/best-gifts-for-her-2026`. Fixed 2026-08-14 for 196 entries; HEETA, CeraVe and
Olaplex now rank top-4 on `/best-beauty-gifts-2026`.

It also hid **7 products rated below 4.0** that were passing the `minRating: 4.5`
filter on fake scores, including a Tetris lamp at 1.6 stars from 2 reviews.

---

## Getting real Amazon rating / reviewCount

Amazon blocks scripted `/dp/` fetches after roughly a dozen requests, and the
block is session-based (a 6.5s delay did not help). Same-origin fetches from a
signed-in browser tab ran **203 ASINs with zero blocks**.

Full procedure: `scripts/amazon-live-data.mjs`.
Captured data: `scripts/amazon-live.csv`.
Apply with: `node scripts/apply-review-fix.mjs --write`.

`apply-review-fix.mjs` only rewrites entries whose stored reviewCount is under
1000 (the merchant-feed tell), so re-running it is a no-op.

**Prices are still unsolved by scraping.** The page scrape returns per-unit and
promotional figures (it read $0.31 for a Dr Teal's gift set and $2.22 for a
CeraVe duo). Do not bulk-update prices from search or scrape data.

---

## Amazon Creators API (the durable fix, built and waiting)

The Creators API replaces PA-API 5 (deprecated) and is the authoritative source
for price, rating, review count and images.

    scripts/lib/creators-api.mjs       auth + GetItems, batches of 10
    scripts/refresh-catalog-data.mjs   diff/apply across both catalogs
    node scripts/refresh-catalog-data.mjs --check    readiness probe

Credentials live in `.env.all` (gitignored): `AMAZON_CREATORS_CLIENT_ID`,
`AMAZON_CREATORS_CLIENT_SECRET`, `AMAZON_CREATORS_VERSION`,
`AMAZON_PARTNER_TAG`. The version selects the Login with Amazon token host
(3.1 NA `api.amazon.com`, 3.2 EU `api.amazon.co.uk`, 3.3 FE `api.amazon.co.jp`);
the API host `https://creatorsapi.amazon` is the same everywhere.

**Status 2026-08-14: authenticating, but not yet returning data.** `GetItems`
responds `403 AssociateNotEligible`. Amazon requires **at least 10 qualifying
sales in the past 30 days** before it serves product data. This is stricter than
the old PA-API 5 rule of 3 sales in 180 days - do not rely on the older figure.
The credential is valid and nothing needs changing; re-run `--check` once sales
qualify, then `refresh-catalog-data.mjs --write`.

Until then the browser procedure above remains the working source for rating and
review count, and prices stay untouched.

---

## Dead links (delisted products)

`scripts/check-dead-links.mjs`. A delisted ASIN still renders a normal product
card, still gets clicked, and earns nothing.

**Do not "simplify" this into a fetch loop.** Amazon serves its bot-check to
scripted requests as a **200 with no not-found marker**, so the obvious
implementation reports "all alive" forever. Measured 2026-08-14:

| Request | Dead ASIN | Live ASIN |
|---|---|---|
| `GET /dp/{asin}` | 200, 3781 bytes, bot-check | identical |
| `HEAD /dp/{asin}` | 200, empty | identical |
| `HEAD /gp/aw/d/{asin}` | 405 | 405 |

Only two signals work: the **Creators API** (an ASIN it does not return is
delisted) and **same-origin fetch from a real signed-in tab**.

Every run self-validates against canary ASINs of known state and **aborts**
rather than report anything if they classify wrong, because a false "dead"
verdict would replace a good link. Ambiguous responses are `unknown` and re-run,
never reported dead. Exit 1 on broken detection, 0 on a healthy run.

    node scripts/check-dead-links.mjs --via-api        # preferred, once eligible
    node scripts/check-dead-links.mjs --emit           # browser snippet
    node scripts/check-dead-links.mjs --ingest <file>  # report

### Suggested cadence

Measured against this catalog, the three fields decay very differently:

- **Review counts barely matter.** Ranking is `rating x log10(reviews)`, so even
  +25% growth (a year-plus) shifts scores at most 4.7% and keeps 35/40 of a
  page's top 40. 533 entries have 10k+ reviews and are effectively frozen.
  Refreshing these on a schedule is close to pure waste.
- **Ratings are a cliff, not a slope.** `minRating: 4.5` means a -0.1 drift
  silently removes a product from every guide. **149 entries sit in 4.5-4.6.**
- **Dead links cost the most** and are the cheapest thing to watch.

| Check | Cadence | Scope |
|---|---|---|
| Dead links | monthly | all ASINs |
| Rating-cliff watch | 6-8 weeks | ~204 (the 4.5-4.6 band + sub-500-review entries) |
| Full data refresh | wait for the API | - |
| New products | at intake, always | - |

Prefer prioritising by the `clicks:ranking` Redis sorted set once there is click
history: the products that actually earn deserve accuracy, the long tail does not.

---

## Verifying an ASIN is the right product

Always read the **actual Amazon page title**. Word-overlap scoring is not
enough — it rated a LEGO Bugatti relink 0.6 "MATCH" when the ASIN was a
third-party **LED light kit for** that set. Other real misses caught this way:

- Craft Beer of the Month -> **Root** Beer of the Month
- YETI Roadie 24 cooler -> the Roadie **basket accessory**
- Anker 24W solar charger -> **BigBlue** 28W
- Talking photo album -> a Voice Pad **recorder**
- Echo Show 8 -> Echo Show **5**

`scripts/title-for-asin.mjs` pulls the authoritative title via Google (Serper
returns the title for a `/dp/` page even though it has no rating).

---

## Affiliate links

Every `affiliateUrl` must be a real `/dp/ASIN` link. Amazon **search** links
(`/s?k=`) still carry the tag but drop the shopper on a results page and have no
ASIN, so `/admin/clicks` cannot name them (see `CLAUDE.md`).

Fixed 2026-08-14: 84 search links -> 13. The remaining 13 are entries whose
resolved ASIN was the wrong product; they keep the search link (which still
earns) until re-sourced.

---

## Duplicates

Two detectors, both in `scripts/find-duplicate-products.mjs`:

1. **Name similarity** — brand + product type. Removed 21 entries on 2026-08-14
   (Kindle Paperwhite x3, Le Creuset x3, Dyson Airwrap x3). Prone to false
   positives that must be kept: Echo Dot vs Show 5 vs Show 8, Bose headphones vs
   earbuds, Switch OLED vs Lite, Instant Pot 6qt vs 8qt.
2. **Same ASIN** — definitive; two entries on one ASIN are one product whatever
   the copy says. Found 28 groups name matching missed (4x Elgato Stream Deck,
   3x Instant Pot, 3x Star Map, 3x Logitech G502). Cleaned up 2026-08-14:
   **37 entries removed, catalog 940 -> 903.**

When collapsing a group, **merge before you delete**. Duplicates rarely carry the
same metadata (the two Laneige entries disagreed on `mom` / `mothersFathers`), so
deleting the loser outright silently drops the product from pages only the loser
reached. Each keeper absorbs the union of the removed entries' recipients, tags
and occasions first — 21 keepers gained coverage that way.

The two files do **not** share a vocabulary, so merged values must be mapped:

| products.ts | products-catalog.ts |
|---|---|
| `justBecause` | `just-because` |
| `mothersFathers` | `mothers-day` (and `mothersFathers`) |
| `weddingHousewarming` | `wedding`, `housewarming` |
| `brother`, `sister`, `streamers`, `myself-her/him` | *(no equivalent — dropped)* |
| *(no equivalent)* | `baby-shower` |

Duplicates also disagreed on their numbers (one Star Map claimed 14,300 reviews,
another 858; Amazon says 858), so keepers were set from live pages. That exposed
bad data **above** the 1000-review line that `apply-review-fix.mjs` deliberately
skips: the Stream Deck's real count is 774 (stored 28,700) and the Anker 737's is
259 (stored 41,203). **Entries with fake-high counts are still uncorrected.**

Also resolved: 4 reused ids (two overlapping `college-*` import batches) and
5 dead links — 4 re-pointed to verified ASINs, plus a Ring doorbell pair that was
both duplicated *and* 404, folded into the live `smart-ring-doorbell` entry.

---

## Open items

- [x] Clean up the same-ASIN duplicate groups (37 removed, 2026-08-14)
- [x] Resolve the duplicate ids and dead (404) ASINs (2026-08-14)
- [ ] Re-source the 13 entries still on search links
- [ ] Review the 21 entries with under 150 real reviews (thin social proof for a
      "top-rated" guide) and the 7 rated below 4.0
- [ ] Verify rating/reviewCount for the ~735 entries **above** 1000 reviews.
      apply-review-fix.mjs skips them by design, but spot checks found several
      badly wrong (Stream Deck 28,700 -> 774). The Creators API refresh covers
      this in one pass once eligible; until then it needs the browser procedure.
- [ ] Re-source `college-owala-bottle`: its ASIN is a single colorway rated
      3.9, so the product now drops below the 4.5 guide threshold. The main
      Owala FreeSip listing rates far higher. Same for the Brooklinen sheets
      (real 3.8).
- [ ] Creators API: blocked on eligibility (10 qualifying sales / 30 days). Client
      is built; run `refresh-catalog-data.mjs --check` to retest, then `--write`
- [ ] 52 enriched sweep candidates (wedding/baby-shower/travel/kids/pets/sports/
      gardening) are on hold pending trustworthy numbers; images already
      downloaded to `public/images/products/`

## Dead-link sweep 2026-09-25

Browser same-origin sweep of all 906 catalog ASINs (in-app browser tab on
amazon.com; anonymous session). Canary validation PASSED: 3 known-dead
detected dead, 2 known-live intact, so dead verdicts are trustworthy.
Coverage: 397 confirmed alive, 498 unresolved (Amazon bot-checked the
session in bursts; unresolved is treated as alive, never dead). Raw run
output in scripts/_dl-results-2026-09-25.txt, work list in
scripts/_dead-asins.json (both gitignored scratch).

11 entries confirmed DEAD (page 404s; card still renders and absorbs
clicks). Re-confirmed individually except the last two, which were
classified once during a clean window and then blocked on re-check:

| id | ASIN | name |
|---|---|---|
| him-50-1 | B0FFSB9VCK | Smart Watch Fitness Tracker |
| tech-50-1 | B0FZSYSP8Y | Mini Portable Projector |
| kid-002 | B003ERYIFS | Magna-Tiles Clear Colors 100-Piece Set |
| kid-004 | B00005BSID | Melissa & Doug Wooden Toy Kitchen |
| cpl-004 | B07YZSVV6B | Wine & Cheese Gift Basket |
| fri-002 | B07FSJT23X | The Uncommon Box - Mystery Gift Subscription |
| fri-001 | B07GCTHNBR | Engraved Whiskey Decanter Set |
| aish-004 | B01M9AU2SX | Philips Hue White & Color Ambiance Starter Kit |
| bty-004 | B09TZM7Z9V | FOREO LUNA 4 Facial Cleansing Device |
| gaming-005 | B07BFQZNFL | RESPAWN 110 Racing Style Gaming Chair |
| gaming-012 | B07D5M3Q15 | Corsair MM300 Pro Extended Gaming Mouse Pad |

**RESOLVED 2026-09-26 (commit 653464f):** all 11 re-pointed to live,
verified ASINs (title, rating, review count, and stock read from each
product page before re-pointing; prices and budget tiers updated; images
refetched from brand/retailer sources). Notable swaps: KidKraft Vintage
Kitchen replaces the delisted Melissa & Doug; medicube Booster Pro
replaces the FOREO LUNA 4 (her-bty-6 already carries the LUNA 4);
iDventure Cluebox replaces the defunct mystery subscription; GTPLAYER
chair replaces the RESPAWN 110; Amazfit Bip Max and TMY projector replace
no-name generics. Lesson: single-quote-regex field patching truncates on
TS escaped apostrophes; the build caught it (fri-002).

Still open from the sweep: the 498 unresolved ASINs need a follow-up pass
(real signed-in Chrome session via the extension avoided all bot checks
in August, or Creators API once eligible).

## Stocking stuffer additions 2026-10-09 (commit f591543)

15 new stuffer- products, every ASIN read live from its product page
before adding (title, rating, review count, price, in stock; recorded
in amazon-live.csv). Headliners by review depth: Dickies Dri-tech socks
(218,272), INIU 10000mAh charger (87,749), OKeeffes Working Hands
(83,594), Bananagrams (26,932), Rubiks Cube (14,437), Hot Wheels 5-pack
(13,829), Summer Fridays Lip Butter Balm (10,921). One candidate was
dropped during the image audit (generic fuzzy socks, 557 reviews, no
accurate off-Amazon image). Known imperfections, accepted deliberately:
Water Wow is a fresh 3-pack listing with only 23 reviews on a classic
product; the Duke Cannon image shows the Sawtooth scent packaging while
the ASIN is Sandalwood + Lavender (identical packaging design); the
Hot Wheels image shows three 5-pack variants for a styles-vary listing.
Every image visually audited; 5 required tuned re-queries or hand-picked
brand-site URLs (eos came from evolutionofsmooth.com directly).

## Kids stocking stuffer additions 2026-10-22

Added 8 licensed-character products to products-catalog.ts for the
/stocking-stuffers-for-kids spoke (owner request: Pokemon cards, Pokemon
toys, Paw Patrol, small dolls/princess toys and similar). All ASINs
live-verified same-origin from a real amazon.com browser tab (title,
rating, review count, price, In Stock) and logged in
scripts/amazon-live.csv:

- stuffer-pokemon-tin      B0GWK55V53  4.8/158     $19.97
- stuffer-pokemon-figures  B09YMJH8BZ  4.8/1,031   $21.39
- stuffer-paw-patrol-figures B0B4Y639SN 4.8/7,294  $19.97
- stuffer-paw-patrol-marshall B0DBLS6TPB 4.8/2,740 $11.99
- stuffer-princess-ariel   B0FGFPX23L  4.8/136     $12.99
- stuffer-frozen-dolls     B0FGF5YR9M  4.7/289     $19.99
- stuffer-squishmallow     B0G26PLWJ3  4.9/652     $14.99
- stuffer-playdoh          B00JM5GW10  4.7/69,566  $7.99

Image notes (licensed products had the worst wrong-variant rate yet,
5 of 8 needed fixes; Amazon landing images downloaded to scratchpad as
ground truth only, never used on site):
- pokemon-tin: first fetch was a 5-tin lineup with baked-in marketing
  text; replaced with single Meganium/Meowstic tin (common-lands.com).
- pokemon-figures: first fetch was the WRONG 6-pack variant (Snivy/
  Tepig/Oshawott); replaced with the correct Battle Ready box showing
  Pikachu/Squirtle/Charmander/Bulbasaur/Mimikyu/Toxel (Walmart).
- princess-ariel: first pick was an old Disney Store 5-doll fashion
  set; replaced with Mattel's official out-of-box shot of the exact
  animated-style 4-doll set (images.mattel.net).
- playdoh: three wrong images in a row (party-favor wrappers, an
  infographic slide, refill sticks); fixed by reading Walmart's own
  search results in-browser for the exact 10-can SKU hero.
- squishmallow: serpapi returned 0 candidates on the product name;
  tuned query found Jazwares' official 2000px shot of Noelani.
- paw-patrol x2 and frozen-dolls: correct on first fetch.

Caveats: stuffer-pokemon-tin (158 reviews) and stuffer-princess-ariel
(136) are new-release listings with young review counts; both are
official brand products (Pokemon Company / Mattel) so rating drift risk
is low, but worth rechecking in a future sweep. Pokemon TCG booster
bundles were priced $45-90 everywhere (scalped market) and were
deliberately avoided; the mini tin is the only card product that fits
the under-$25 stocking band at MSRP.

## Admin products cleanup 2026-10-26

Audited all 134 admin products (Redis key admin:products; 96 gift catalog,
38 Crane's List) against the data rules, with live Amazon reads for every
ASIN (same-origin browser probe, canaries B07Y8TM6SW dead / B00FLYWNYQ live
classified correctly). Backup of the pre-cleanup value:
data/backups/admin-products-2026-10-26-before-cleanup.json (restore by
writing it back to admin:products). Write was guarded: aborts unless live
Redis still equals the backup; read-back verified.

Fixed:
- HOMEPAGE LEAK: app/page.tsx passed every published admin product,
  including Crane's List (iron supplements, chili powder, a toddler dress),
  into the homepage shuffle pool. Now filtered the same way as
  lib/catalogFeed.ts (!p.cranes && !/^crane-/).
- Unpublished (status draft, reversible in /admin) 15: one dead ASIN
  (Sperax walking pad B0DJ8ZL7RX), 13 gift products below the published
  4.3-star minimum (mole repellent 1.9, no-name smart ring 3.4, Razer
  Wolverine V3 Pro 3.9, RedThunder K10 3.9, walking pad 4.0, C Cushion Lab
  pillow 4.0, NACON Revolution 5 Pro 4.0, Astro A50 X 4.1, Creative Co-Op
  metal boxes 4.1, SAFEJAWZ 4.2, Meta Quest dock 4.2, PowerA controller
  4.2, GoSports mini cornhole 4.2), and a duplicate eero Pro 7 entry.
  Crane's List items were not held to the rating rule (personal wishlist).
- Affiliate links: all normalized to https://www.amazon.com/dp/ASIN?tag=dailygiftshuf-20.
  8 links had NO dailygiftshuf-20 tag (raw search-result URLs with crid/dib
  params: 7 Crane's List items and the Amazon Basics dumbbell), so those
  clicks earned nothing. One /gp/product link and one asin field that
  disagreed with its link (dumbbell) fixed.
- Text: mojibake repaired (UTF-8 read as cp1252, e.g. an em dash stored as
  the a-hat/euro/quote sequence) across 41 fields; "Amazon.com :" name
  prefixes removed (3); all dashes removed (house rule); one Pokemon record
  with multiply-corrupted text rewritten by hand.
- Copy: 59 products got clean short names and/or one-line descriptions
  written from the live Amazon title and feature bullets (61 gift products
  had empty descriptions; names up to 188 chars of scraped SEO title).
- Live data: rating, reviewCount and price refreshed from Amazon for 117
  live ASINs; priceDisplay and budgetTier recomputed from price (24 tiers
  were wrong, 4 price labels read just ".99").
- Images: 4 crane-* items pointed at m.media-amazon.com URLs that were all
  404 (never real); now the existing verified local images.
- Tags/recipients: invalid values mapped (dogs->pets, food/snacks/coffee->
  kitchen, hair/selfcare/skincare->beauty, health/wellness->fitness,
  smart-home->ai-smart-home, coworkers->coworker); empty ones filled.
- data/admin-products.json (bundled first-run/outage fallback) synced to
  the cleaned set so an outage cannot reintroduce the old data.

Result: 119 published (82 gift catalog), 15 draft; every published gift
product has a description and is rated 4.3+.

Left as-is (needs a later pass):
- 13 ASINs bot-checked during the probe (Amazon throttled the session):
  kept their existing data unverified. Only 2 are gift catalog: GRAYL
  GeoPress (B0C1JHC2M6) and AirPods Pro 3 (B0FQFB8FMG), both show 0 reviews.
- 2 Crane's List items still link to Amazon search results, not a product
  (Cosequin Minis, Fairlife Core Power Elite): need the exact ASIN.
- 20 admin products duplicate main-catalog ASINs; harmless in shuffles
  (catalogFeed dedupes, static data wins) but they could be removed.
- Lincoln Logs Collector's Edition (B00V5Y9P5G): the listing's feature text
  describes a refurbished unit; confirm the buy box sells new before
  keeping it as a gift pick.

### Follow-up: remaining items closed (2026-10-26, same day)

Amazon kept bot-checking the in-app browser, so live data for the leftover
ASINs came from SerpAPI's Amazon engines (key in .env.all). Validated first:
dead canary returns "hasn't returned any results", live canary matches the
browser read. Caveat found: engine=amazon_product misreads some ratings
(Instant Pot 4.4 vs 4.7 on the page; AirPods Pro 3 3.1 vs 4.4 in Amazon
search), so ratings were only taken when within 0.3 of the stored value.

Fixed (second guarded Redis write, read-back verified):
- The 13 bot-checked ASINs: live review counts and prices.
- Lincoln Logs: B00V5Y9P5G is a refurbished listing ("This refurbished
  product is tested and certified..."); replaced with the new-condition
  Lincoln Logs 100th Anniversary Tin (B00RWNEN9W, 4.7, 16,579 reviews,
  $49.99), with a verified image.
- Crane's List search links resolved to exact products: Cosequin for Small
  Dogs with MSM and Omega-3s (B0GHCSRWMF) and Core Power Elite 42g Vanilla
  12-pack (B01DDIRE2W, image replaced: the old one was strawberry).
- crane-pet-001 / crane-coffee-001 / crane-coffee-002 were created by
  scripts/add-crane-products.ts with isCranesListItem, a field /cranes never
  reads, so they never appeared on Crane's List; now cranes: true.
  crane-iron-001 set to draft (duplicate of the Slow Fe entry on the list).
- PAGE WEIGHT: three published products (LifeStraw, GRAYL, AirPods Pro 3)
  stored AI-generated images (Google C2PA metadata) inline as base64, about
  2.6MB. The homepage serializes admin products into its HTML, so the live
  homepage was 2,840KB (2MB gzipped). Replaced with real product photos
  saved as files; getPublishedAdminProducts now drops data: images so this
  cannot recur. Local homepage after the fix: 193KB.

Static catalog fixes found while resolving the duplicates:
- data/products.ts carried five crane-* entries that reached every shuffle
  and guide (iron supplement, dog treats, K-Cups, eero router): removed.
- college-airpods was named "Apple AirPods (3rd Generation)" at $99.99 with
  a 3rd-gen photo, but its ASIN (B0FQFB8FMG) is AirPods Pro 3 at $199.99;
  corrected name, copy, price, tier, rating and photo.
- Stale prices synced to live: Ring Battery Doorbell $179.99 -> $99.99,
  Cuisinart TOA-70 $199 -> $218.99 (tier was also wrong), Magna-Tiles
  $108 -> $112.50.
- The 20 gift/catalog duplicates are kept on purpose: the homepage reads only
  admin products, so removing the admin copies would shrink its pool; the
  two copies now agree on price. check-fit: 0 items over any page's cap.

## Admin catalog merged; Crane's List retired (2026-10-29)

The Redis admin catalog (admin:products) caused most of this month's catalog
bugs: duplicates with conflicting prices, Genie pins silently dropped,
Crane's List items leaking into shuffles, inline base64 images bloating the
homepage, a JSON fallback that had to be synced by hand, and edits that
skipped version control and build checks. Admin products were also invisible
to every guide and category page (giftSelect only reads the catalog files).
/admin had not been used to add products since April.

What changed:
- The 82 published admin gift products moved into data/products-catalog.ts
  (section "MERGED FROM ADMIN"): 76 merged with their ids kept, so existing
  pins and wishlists resolve; 6 already had catalog entries (Ring doorbell,
  Callaway balls, Magna-Tiles, Cuisinart TOA-70, Turtle Beach Stealth 600,
  AirPods Pro 3), and their retired admin ids alias to those entries in
  lib/catalogFeed.ts (RETIRED_ADMIN_IDS). The catalog Recipient type gained
  brother, sister, myself-her, myself-him and streamers.
- The 15 drafts (dead or below 4.3) were not migrated.
- lib/catalogFeed.ts reads only the two catalog files.
- Homepage: first paint is curate(ALL) 4.5+ and $25+ (60 products); the
  shuffle then widens to the full feed (rated 4.3+, real photo). Locally 60
  shuffles dealt 237 distinct products (the old admin pool was about 80).
- Removed: Crane's List (/cranes, now a 308 to /), the admin product manager
  and its APIs (products, import, seed, generate-image), lib/admin-store.ts,
  lib/asin-parser.ts, data/admin-products.json, and the Redis sync scripts.
  /admin redirects to /admin/clicks (click analytics unchanged, now naming
  ASINs from both catalogs). outputFileTracingIncludes for data/** removed.
- The admin:products key is still in Redis, unread. Snapshot:
  data/backups/admin-products-2026-10-29-before-merge.json.

Verified: feed still 1,030 products; all 82 published admin gift products
reachable; 0 crane items; Genie pins on retired and merged ids resolve 4/4;
check-fit 0 off-theme and 0 over-cap; homepage 177KB; redirects as above.

## Trending holiday 2026 batch (2026-10-29)

20 products added to data/products-catalog.ts (section "TRENDING HOLIDAY
2026", ids trend26-*), chosen where 2026 hot lists agree (Amazon Top Toys,
Target Bullseye's Top Toys, The Toy Insider Hot 20, GiftList's Oct 26
wishlist ranking, TikTok Shop holiday trend data) and the catalog had gaps:
KPop Demon Hunters (Zoey Golden singing doll, Rumi Squishmallow), Tickle Me
Elmo, furReal Gabby, Bluey Light and Surprise Heeler House, Little People My
Mario playset, Hatchin' Yoshi, Pikachu Puppetronic, GUI GUI Mega Slime Haul,
Barbie in the Nutcracker Clara, Ninja SLUSHi FS301, HydroJug Traveler, LEGO
Marvel and Friends advent calendars 2026, Sol de Janeiro Cheirosa 62 mist,
medicube PDRN jelly mask, Bluetooth beanie, LEGO Botanicals Pretty Pink
bouquet, YUSHOW men's flannel pajamas, Pop Mart Labubu Big into Energy.

Verification (Amazon browser still throttled; SerpAPI amazon engines):
title, rating, review count, price, stock, and no refurbished/renewed text.
Skipped: heatless curlers (best sets rate 4.1-4.2), LEGO Star Wars advent
2026 (no buy box), beauty advent calendars (generic brands, few reviews),
another heated throw (3 in catalog). Labubu confirmed in the browser as
"Sold by POP MART Official Online Store", ships from Amazon (counterfeits
are common). Images: brand or retailer packshots only, all 20 audited;
8 replaced on review (children in shot: furReal, Mario; marketing banner:
SLUSHi; wrong doll: Barbie Clara was the 25th-anniversary repro; model or
stylized art vs listing: beanie, pajamas, Labubu; Yoshi fetch crashed).
Barbie, beanie, Labubu and pajamas were matched against the Amazon listing
image (reference only, never used on site).
