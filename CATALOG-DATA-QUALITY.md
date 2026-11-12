# Catalog Data Quality

**Last updated:** 2026-08-14

How product data enters the catalog, which parts of it are trustworthy, and the
defects found so far. Read this before adding products or "refreshing" prices.

---

## The core constraint: Amazon is not in Google Shopping

`scripts/enrich-products.mjs` gets rating, reviewCount and price from Serper's
`shopping` endpoint. **Amazon does not feed Google Shopping.** Its
"find the Amazon result" lookup therefore almost never matches, and the code
falls through to `rated || list[0]`, Walmart, Target, eBay, whoever.

Confirmed three ways on 2026-08-14:

- An Amazon-only price query returned a price for **0 of 81** items.
- A price-by-ASIN lookup resolved **3 of 81**.
- A magnetic tiles set came back as 4.7 stars / 1,100 reviews / $39.97. Amazon
  actually shows **4.8 / 5,887 / $19.99**.

| Field from enrich-products.mjs | Trustworthy? |
|---|---|
| ASIN | Yes (still verify the title, see below) |
| image | Yes |
| rating | **No**, some other retailer's rating |
| reviewCount | **No**, some other retailer's count |
| price | **No**, some other retailer's price |

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

CORRECTION 2026-11-11: neither signal below can be used any more. The API
answers ItemNotAccessible for live listings it does not serve (owner hand check:
4 of 5 such products were live), and Amazon is not to be read by browser
automation. Dead links are found by the owner checking by hand.

~~Only two signals work: the **Creators API** (an ASIN it does not return is
delisted) and **same-origin fetch from a real signed-in tab**.~~

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
enough, it rated a LEGO Bugatti relink 0.6 "MATCH" when the ASIN was a
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

1. **Name similarity**, brand + product type. Removed 21 entries on 2026-08-14
   (Kindle Paperwhite x3, Le Creuset x3, Dyson Airwrap x3). Prone to false
   positives that must be kept: Echo Dot vs Show 5 vs Show 8, Bose headphones vs
   earbuds, Switch OLED vs Lite, Instant Pot 6qt vs 8qt.
2. **Same ASIN**, definitive; two entries on one ASIN are one product whatever
   the copy says. Found 28 groups name matching missed (4x Elgato Stream Deck,
   3x Instant Pot, 3x Star Map, 3x Logitech G502). Cleaned up 2026-08-14:
   **37 entries removed, catalog 940 -> 903.**

When collapsing a group, **merge before you delete**. Duplicates rarely carry the
same metadata (the two Laneige entries disagreed on `mom` / `mothersFathers`), so
deleting the loser outright silently drops the product from pages only the loser
reached. Each keeper absorbs the union of the removed entries' recipients, tags
and occasions first, 21 keepers gained coverage that way.

The two files do **not** share a vocabulary, so merged values must be mapped:

| products.ts | products-catalog.ts |
|---|---|
| `justBecause` | `just-because` |
| `mothersFathers` | `mothers-day` (and `mothersFathers`) |
| `weddingHousewarming` | `wedding`, `housewarming` |
| `brother`, `sister`, `streamers`, `myself-her/him` | *(no equivalent, dropped)* |
| *(no equivalent)* | `baby-shower` |

Duplicates also disagreed on their numbers (one Star Map claimed 14,300 reviews,
another 858; Amazon says 858), so keepers were set from live pages. That exposed
bad data **above** the 1000-review line that `apply-review-fix.mjs` deliberately
skips: the Stream Deck's real count is 774 (stored 28,700) and the Anker 737's is
259 (stored 41,203). **Entries with fake-high counts are still uncorrected.**

Also resolved: 4 reused ids (two overlapping `college-*` import batches) and
5 dead links, 4 re-pointed to verified ASINs, plus a Ring doorbell pair that was
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

## Hanukkah + digital gift cards (2026-11-01)

11 products for the new /hanukkah-gifts and /last-minute-christmas-gifts
pages, section "HANUKKAH + DIGITAL GIFTS 2026" at the end of
data/products-catalog.ts. Verified with SerpAPI amazon_product (canaries
checked first; title, rating, reviews, price, stock, seller, no refurbished
wording) and ratings cross-checked against Amazon search. Images are brand or
retailer packshots (Home Depot, Zion Judaica, Penguin Random House, Walmart,
Faire, Starbucks, Target, Staples, BJ's), 800x800 contain on white, audited.

- Hanukkah (6): Zion Judaica silver-plated menorah B016V0NTZK ($17.99,
  4.6/2,312), Zion Judaica 10 wooden dreidels B09K75X14R ($9.99, 4.8/899),
  Hanukkah Bear book 082343169X ($7.45, 4.8/994), Mensch on a Bench plush
  and book B00KSAA05M ($34.99, 4.7/817), Manischewitz chocolate gelt 24 bags
  B00QJ2LBCE ($22.85, 4.4/351; weakest pick, third-party seller), Ann Clark
  Hanukkah cookie cutters B07J2VV8RN ($12.99, 4.7/403).
- Digital eGift cards (5, sold by ACI Gift Cards LLC, an Amazon company):
  Starbucks $25 B0FQN639NZ, DoorDash $50 B0FQN3LKFR, Netflix $25
  B0FQNBFNXH, Chipotle $25 B0FQNB2WJF, Airbnb $100 B0FQMXSDKH.
- Rejected: Apple (4.1) and Google Play (4.3) gift cards, Spotify (no US
  listing), Audible (no reviews), Uber (no non-Amazon image of the Standard
  design), Instacart (same), Hanukkah pajamas/socks/plush (under ~300
  reviews), images with people, overlays or old packaging.
- New occasion value 'hanukkah' (catalog Occasion type). The six Hanukkah
  items use it instead of 'holiday' so Christmas guides skip them, and
  lib/giftSelect's ALL pool now excludes them (stocking stuffers, Secret
  Santa and White Elephant select by price, and had picked up menorahs and
  dreidels). /hanukkah-gifts draws from ALL_WITH_HANUKKAH.

### Halloween items out of the 'holiday' occasion (2026-11-01)

Eight Halloween party products (tag 'halloween') also carried the 'holiday'
occasion, so they leaked into Christmas guides and shuffles that filter on it
(a light-up Halloween door cover in the Christmas Gifts for Mom shuffle, a
pumpkin candy bowl on the kids page). Every 'holiday' consumer means the
winter holidays (Christmas guides, the shuffle's Holiday filter, the Genie),
while the Halloween guide selects by tag, so their occasions are now
['just-because']. A name scan found no untagged Halloween items left on
'holiday'.

### Halloween items hidden off-season (2026-11-01)

Owner asked to remove Halloween items from the catalog until next September.
Implemented as a seasonal gate rather than a delete, so nothing is lost and
the items return on their own: lib/season.ts isInSeason() hides tag
'halloween' outside Sep-Oct (US Eastern).
- lib/giftSelect ALL (every guide) excludes them off-season; it is evaluated
  at build time, so a deploy on or after Sep 1 brings them back to guides.
- lib/catalogFeed (the /api/products/all feed behind the homepage, Find a
  Gift, search, category shuffles and the Gift Genie) checks the season per
  request, so the feed flips back on Sep 1 with no deploy.
- The Halloween pages keep their products all year to hold their rankings:
  /halloween-party-gifts and /category/halloween draw from ALL_INCL_SEASONAL,
  and /shuffle/halloween fetches /api/products/all?season=all.
- Verified: feed 1,041 items with 0 Halloween (1,061 / 20 with
  ?season=all); the three Halloween pages still list them; gifts-under-25,
  white-elephant, gift-ideas-for-mom, category/home and the homepage show none.

## Category depth batch 1: pets, sports, travel (2026-11-01)

Owner asked to deepen the thin category shuffles (target 60 each, looser bar:
4.3+ rating and 300+ reviews). 81 products added in section "CATEGORY DEPTH
2026-11: PETS, SPORTS, TRAVEL" (ids pet26-*, spt26-*, trv26-*). Totals go
pets 33 -> 65, sports 37 -> 61, travel 37 -> 64 (some items carry
cross-tags: car-accessories, kitchen, beauty, outdoors, office).

Sourcing and verification (all from a real amazon.com tab in the built-in
browser, same-origin fetch; the pane must not use setTimeout delays because
hidden-pane timers are throttled to about one per minute):
- Candidates: ~24 Amazon searches per category parsed for ASIN, rating,
  review count and price, then hand-picked for giftability and brand.
- Each pick re-read on its /dp/ page: title, rating, reviews, price, In
  Stock, seller and fulfiller. Dropped: Callaway 300 Pro rangefinder and
  Crankbrothers M19 (third-party sellers), Funko Michael Jordan (third-party
  seller, counterfeit risk), GoSports Slammo (Spikeball clone), Samsonite
  Omni and Winfield 2 (third-party sellers), MATEIN carry-on and TRIPPED
  cubes (duplicates of picks or existing items).
- Description claims checked against the listing's feature bullets; eight
  travel descriptions and several sports ones were corrected before adding.
- Logged in scripts/amazon-live.csv.

Images (Serper and both Serper keys out of credits, SerpAPI at 42 searches,
OpenAI out of credits on 2026-11-01): Bing image search run from the browser
pane (scripts cannot read Bing image results; they get a stripped page), the
results ranked in-page with the same rules as scripts/lib/image-search.mjs
(Amazon, eBay, AliExpress, Temu, Shopee, Pinterest and similar blocked), then
downloaded locally and normalized to 800x800 contain-on-white. Provenance in
data/image-sources.json (provider "bing-browser-2026-11").
- Every image audited on numbered contact sheets. First pass: 45 of 81 were
  wrong or unusable (German Kobe edition, "50 States 1000 Eats" instead of
  5000 Ideas, UNO Deluxe instead of UNO NFL, a cowboy-boot mug, a framed
  sign instead of the memorial blanket, a webpage screenshot, a child in the
  seat-cover shot, legs in the sock shot, marketing infographics, wrong
  colors and pack sizes, a "Lumabone" knockoff for Benebone). A targeted
  second search returned eight candidates per product, rendered one row per
  product, and each replacement was picked by eye; Amazon listing images
  were viewed as reference only (lesotc, URPOWER, Kitty City pads, Karma
  mug), never used.
- Accepted with minor caveats: some pet products show the pet (fine for pet
  gear), Muddy Mat keeps its color-swatch strip, EverSnug is shown in green
  (listing is light pink), Travelpro in blue (listing is black), Kitty City
  tunnel bed has two small arrows.

## Category depth batch 2: AI/smart home, car accessories, finance (2026-11-01)

102 products added in section "CATEGORY DEPTH 2026-11: SMART HOME, CAR,
FINANCE" (ids sh26-*, car26-*, fin26-*), same verification as batch 1
(same-origin /dp/ reads for title, rating, reviews, price, stock, seller;
feature bullets read before writing descriptions). Six picks were already
in the catalog under other categories, so instead of duplicating them the
existing entries gained the category tag: MEATER Plus, Echo Spot, Hatch
Baby, Govee smart bulbs and Sonos Era 100 (ai-smart-home), ROVE R2-4K dash
cam (car-accessories). Expected totals: smart home 26 -> about 61, car
21 -> about 57, finance 18 -> about 58.

Dropped at verification: LITTLE TREES 10-pack (third-party reseller), The
Book on Rental Property Investing (one copy left, third-party seller).
Dropped at the image stage because no brand or retailer shot of the actual
product exists online (only Amazon re-uploads or lookalikes): VANMASS
suction phone mount, Valleycomfy steering wheel cover, GRANATAN bull and
bear statue, Travelambo women's wallet. Their catalog entries were removed
rather than shown with a lookalike image.

Images: this time the browser-pane Bing pass pulled eight candidates per
product up front and every pick was made by eye from one-row-per-product
sheets (batch 1 showed auto-picks are wrong about half the time). Amazon
listing images were used only as an identification reference for products
with several similar variants (Refasy ATM bank, Cryptex, pull-out money box,
Monopoly Junior, coin album, BlueDriver Pro, LetPot LPH-Air, Birdfy, Northern
Galaxy, Hulkman Alpha85, Fanttik V10 APEX). Caught on review: a Turkish
"Bitcoin Standardi" cover, wrong-model images for several gadgets.
Accepted caveats: digital photo frames show stock family photos on screen;
the Refasy bank and pull-out money box show a hand demonstrating them; the
JOYTUTUS mirror image carries a small feature-label overlay.

## Category depth batch 3: gardening, baby shower, wedding (2026-11-01)

83 products added in section "CATEGORY DEPTH 2026-11: GARDENING, BABY
SHOWER, WEDDING" (ids gdn26-*, bby26-*, wed26-*), same verification and
eight-candidate, pick-by-eye image process as batch 2. Existing products
that were already in the catalog gained the category tag instead of being
duplicated: O'Keeffe's Working Hands (gardening); Yogasleep Dohm, RUVALINO
diaper bag, HelloBaby monitor (baby-shower); and 17 couples and registry
staples (wedding): Mikasa and crystal champagne flutes, The Adventure
Challenge, One Question a Day, Riedel Vinum glasses, Coravin, wine and
cheese board, Staub cocotte, KitchenAid mixer, All-Clad D3 set, bucket
list poster, Homesick candle, wine gift basket, Instant Pot Duo Plus,
Cuisinart coffee maker, OXO tool set, Lodge 12 in skillet. Expected totals:
gardening 28 -> about 61, baby shower 30 -> about 58, wedding 12 -> about
60.

Dropped at verification: Doona car seat stroller and Manhattan Toy Winkel
(third-party sellers), Angelcare bath support (2 left in stock), a 20-book
board book set (duplicate of the 10-book set). Dropped at the image stage
(no brand or retailer shot of the actual product): Burritos tortilla
swaddle, All Natural Shop scratch-off date night cards.

Bug found and fixed: the tag-adding helper located an entry by searching
back to a line starting with exactly two spaces and "{". About a dozen
products-catalog.ts entries open with four spaces, so for those the tag
landed on the previous entry. In batch 2 this put car-accessories on a
Logitech MX Master mouse (tech-006) instead of the ROVE dash cam (tech-008);
it was live from batch 2 until batch 3 shipped. In batch 3 it would have
put wedding on the REI Flash daypack instead of the Lodge skillet, and on
the Breville Barista Express instead of the Staub cocotte. All corrected
(the Breville keeps wedding: it is a registry staple and its occasions
already listed wedding), and every tag added this session was re-checked
against the entry that actually holds the ASIN.

## Catalog health review 2026-11-06

Prompted by the owner asking how well upkeep is going. Live feed: 1,326
products, 1,315 with an ASIN, 923 of those in scripts/amazon-live.csv.

Amazon access changed. A sample of 80 random older ASINs, fetched
same-origin from the in-app browser, all returned an "Access restricted"
page aimed at unauthorized AI agents. Zero usable results, so no measured
figure exists for current dead-link or rating drift. The browser method
behind the dead-link sweep and the rating-cliff watch must not be used
again: do not retry it from another browser or route around the notice.
Amazon verification needs an approved source (Creators API, blocked on 10
qualifying sales in 30 days) or the owner checking by hand.

Measured from the feed:
- 18 entries rate under 4.0 (open items said 7) and 90 have under 150
  reviews (open items said 21). The rise is mostly admin products merged
  2026-10-29 plus young listings.
- Suspicious low scores on famous products suggest a wrong listing rather
  than a bad product: tech-001 AirPods Pro 2nd Gen 3.2, teens-100-2 Beats
  Studio 3.2, her-100-2 Dyson Airwrap 3.5 (495 reviews).
- finance-great-now-what has rating 0, reviews 0 (owner's own book).
- 11 entries have no ASIN.
- Older models still listed: Oura Gen 3, Apple Watch Series 10, Whoop 4.0,
  AirPods Pro 2nd Gen, Sony WH-1000XM5. Not confirmed as superseded on
  Amazon; check before removing.

Trend loop: ShuffleBoss cron jobs write reports to content-drafts/, but those
files are untracked and nothing feeds them into the catalog. Of the 15 picks
in weekly-trends-2026-11-02.md, about 4 are in the catalog. Reports cite "LLM
knowledge" as a source and carry [VERIFY] flags, so treat every pick as a lead.

Demand signal: clicks:ranking holds 54 ASINs and 68 clicks in total, too thin
to rank 1,300 products.

## Owner hand-checked additions 2026-11-09

Amazon blocks automated checks, so new listings are verified by the owner by hand.
- trend26-toniebox2-teal, B0FJ3R4FBX: 4.5 stars, 987 reviews, $149.99, shipped and sold
  by Tonies US (owner screenshot). Image from us.tonies.com. Added to the trending page row.
- Fitbit Inspire 3 (Midnight Zen), B0B5F9SZW7: listing link from the owner; image saved
  (tech26-fitbit-inspire3.jpg, retailer photo) but not added until rating, reviews, price
  and seller are confirmed.

## Creators API status 2026-11-11: ELIGIBLE, serving data

The account now passes the 10 qualifying sales in 30 days rule. Tested with the
credential already in `.env.all` (the one created 2026-08-15 under application
The-Gift-Shuffle; Associates Central also lists two other active credentials
that this project does not use).
- `getItems` returns 200 with title, price, image link, parent ASIN and a tagged
  detail page URL. `searchItems` (keyword search) returns 200 as well.
- Customer reviews are NOT served: `customerReviews.count` and
  `customerReviews.starRating` come back empty for every product tried (5
  products, including when requested alone). No error, just no data.
- Eligibility is a rolling 30-day test. If sales drop, calls go back to
  `403 AssociateNotEligible`, so nothing on the live site should depend on a
  live API call until volume is steadier.
- `scripts/lib/creators-api.mjs` now sends a user agent of the form
  `Agent/<name>` on every request, as the Associates Program IP License
  (section 4, Agents) requires of software acting for the account. Set
  `AMAZON_AGENT_NAME` to say who runs the script (default
  TheGiftShuffleCatalogTools).

License rules that apply once API data is used (IP License section 2):
- (h) API data may be cached for 24 hours at most, then must be refreshed;
  product images from the API may not be stored at all, only linked for up to
  24 hours. ASINs may be stored indefinitely.
- (i) Prices refreshed less than hourly need a date and time stamp next to
  them, plus the "accurate as of the date/time indicated" disclaimer.
- (k) A plain-view notice that certain content on the site comes from Amazon.
- Participation Requirements 2(b) and 6(t): prices and star ratings may be
  shown only when obtained through the API.
So a one-time price copy into the catalog files is not compliant on its own;
a daily refresh with a timestamp would be.

First use, 2026-11-11: keyword lookups for the 11 products that link to an
Amazon search page. Clean matches: Echo Show 8 B0DC8ZMR1P at $199.99 (listed
$149.99), LifeStraw B006QF3TW4 at $17.97 (listed $19.95), YETI Roadie 24
B0F1B4FP49 at $250 (listed $249.99). Near match: Dyson Supersonic Origin
B0F5DMBGT6 at $399.99 or Nural B0D71BKD7Q at $449.99 (listed as a $429.99 gift
set). No real match at the listed price: Talking Photo Album (real ones $44.95
to $54.95, listed $24.99), LEGO Technic Bugatti Chiron 42083 (retired, $599.95
from a reseller, listed $349.99), Moleskine Smart Writing Set ($279, listed
$129.99), Cometeer capsules (not sold on Amazon), couples robes ($45.99
unbranded, listed $79.99), Anker 24W solar panel (not found), USA soccer jersey
(reseller or unbranded only). Nothing changed yet; owner to decide.

## Creators API rate limits and the guard (2026-11-11)

From Amazon's "API Rates" and "Best Programming Practices" pages, supplied by
the owner as PDFs on 2026-11-11.
- One call per second. A call is one transaction whether it carries 1 product
  or 10.
- Daily allowance: 8,640 calls a day for the first 30 days after a credential
  is created. After that, 1 call a day for every 5 cents of shipped revenue
  that Amazon attributes to Creators API links in the previous 30 days,
  recalculated daily. Our credential dates from 2026-08-15, so the first 30
  days are long over. The site's links are hand-built, not API-made, so it is
  NOT KNOWN how much revenue Amazon counts toward this, and Amazon sends no
  allowance figure in its responses (checked). Treat the allowance as small.
- Over the limit returns 429 TooManyRequests.
- Access is lost after 30 straight days with no qualifying sales and returns
  within two days of the next shipped sale.
- Prices may be cached 1 hour, everything else 1 day (the license allows prices
  to stay up to 24 hours when a date and time stamp is shown).
- Do not call the API during page rendering: crawlers would spend the allowance.
- Links returned by the API must be used unaltered to be attributed.

The guard, built into scripts/lib/creators-api.mjs so every script gets it:
- at least 1.1 seconds between calls, including across separate runs;
- a rolling 24-hour count in .cache/creators-api.json (gitignored) and a
  self-imposed cap of 300 calls a day (AMAZON_API_DAILY_CAP);
- on a 429 it stops at once, does not retry, and refuses calls for 30 minutes
  (or longer if Amazon says so);
- the access token is reused for its full hour;
- 10 products per call: a pass over the 540 product IDs in the data files is
  54 calls and about a minute.
Tested offline with a fake network (12 checks: pacing, cap, stop on 429,
cooling-off, token reuse, 24-hour window) and with one real call.

Before any job that calls the API:

    node scripts/creators-api-status.mjs 540     # usage so far, and whether a pass fits
    node scripts/creators-api-status.mjs --ping  # one real call to confirm access

Usage on 2026-11-11: 17 calls (16 during setup, 1 ping). No throttling seen.
Owner check that would settle the allowance question: the Link Type Performance
report in Associates Central shows sales attributed to Creators API links.

## Full catalog check through the API, 2026-11-11 (report only)

One pass over every product with an Amazon product ID in data/products.ts,
data/products-catalog.ts and data/seasonal-products.ts: 1,377 entries, 1,376
distinct IDs, 138 calls needed. Amazon throttled the run at call 130 (429,
"Request rate limit exceeded"), so 1,291 entries were checked and 86 were not.
The guard stopped at once, did not retry, and blocked calls for 30 minutes. It
is not yet known whether that was the per-second or the per-day limit; one
test call after the cooling-off period will tell (success means per-second).
Pacing has since been slowed to 2 seconds after each response and the default
cap lowered to 150 a day. No catalog file was changed by the check.

Of the 1,291 entries checked:
- 76 are not accessible through the API ("ItemNotAccessible"): most likely
  delisted, or a kind of product the API does not serve.
- 142 came back with no price, meaning no current offer (out of stock, or a
  parent listing with no buyable variant).
- 1,073 came back with a price. Against the price the site shows:
  332 within 2 percent, 140 off by 2 to 10 percent, 203 off by 10 to 25
  percent, 207 off by 25 to 50 percent, 191 off by 50 percent or more.
  Amazon is higher on 351 and lower on 390. Medians: listed 32.29, Amazon 29.99.
- 277 would land in a different budget band at today's price: 48 listed under
  25 dollars are now 25 or more, 42 listed under 50 are now 50 or more, 24
  listed under 100 are now 100 or more.
- 7 have a name that shares no distinctive word with the Amazon title, so the
  product ID probably points at a different product: kids-u25-2, pets-u25-1, mom-25-1, md-007, tech-011, her-008, aish-005.
  Several of the largest price gaps look like the same problem (for example
  gaming-006, kids-100-1, aish-005).

Read: about a third of the prices on the site are right today, and roughly one
product in six is unavailable or unreachable. The prices were entered by hand
or from other retailers months ago and have never been refreshed.

Not accessible through the API (76 entries, our IDs):
her-rom-1 her-rom-2 friends-u25-2 him-25-3 teens-25-2 kids-100-2
friends-100-2 tech-50-1 fit-25-1 off-u25-1 off-u25-2 lux-50-1 kit-25-2
pet2-25-2 cow-u25-1 md-020 analog-lamy-safari-pen gp-u25-2 gp-25-1 sis-u25-1
kids-ridecar-1 pets-feeder-1 tech-001 fin-006 her-003 her-004 him-004
teen-002 teen-003 kid-001 kid-003 cpl-003 fri-004 stk-004 tech-019 off-009
mom-002 out-006 out-012 trv-002 trv-004 trv-005 aish-002 bty-005 bty-006
gaming-001 gaming-002 gaming-003 gaming-007 gaming-008 garden-010 garden-011
garden-012 car-seatgap-organizer sport-oofos-slides travel-toiletry-bag
wed-wine-decanter toy-bs-4 camping-puffy-blanket
retro-nes-controller-coasters camp-smokeless-fire-pit lux50-cashmere-beanie
forher-instax-mini12 forher-birthstone-ring forher-satin-pajamas
gaming2-razer-kraken-kitty her3-ugg-tasman lux3-kendra-scott bday-jbl-flip6
selfcare-weighted-blanket stuffer-hothands gg-desk-mat-xxl hw-014
admin-1772857746578-q9r2n admin-1773608794914-24ynf
gdn26-welland-cedar-stump-stool

Returned with no current offer (142 entries, our IDs):
her-u25-1 mom-u25-2 her-25-2 couples-25-2 her-50-1 her-50-2 dad-50-1
couples-50-1 pets-50-2 mom-100-2 dad-100-1 dad-100-2 couples-100-4
friends-100-1 tech-50-2 diy-25-3 fit-u25-3 off-25-1 lux-100-3 hob-u25-2
kit-25-3 kit-50-1 fin-u25-1 kd-50-2 u10-6 u10-19 poke-picks-1 trv-u25-1
trv-u25-4 smt-u25-2 md-010 md-013 md-018 analog-catan-board-game
analog-hydro-flask-32oz tech-jackery-explorer-500 gp-25-2 bro-resistance-1
bro-25-2 bro-100-1 sis-u25-3 sis-50-1 pets-u25-4 kids-100-3 her-trend-3
him-ooni-1 teens-trend-1 couples-250-1 tech-002 tech-005 tech-006 tech-011
fit-003 fit-008 kit-012 off-007 off-008 lux-004 lux-005 pet-003 hob-001
hob-003 hob-005 hob-006 him-002 teen-001 stk-002 stk-003 fit-014 fit-015
kit-014 off-010 mom-001 par-022 out-004 out-005 out-011 out-014 cpl-005
aish-005 bty-004 wedding-005 gaming-005 garden-004 garden-006
car-emergency-kit sport-triggerpoint-grid sport-resistance-bands
sport-stadium-blanket smart-blink-mini game-glorious-model-o
game-razer-iskur-v2 travel-airtag-4pack travel-compression-socks
travel-luggage-scale toy-bs-1 bs-02 bs-05 bs-08 bs-24 beauty-olaplex-kit
beauty-foreo-luna-mini beauty-rare-beauty-blush beauty-makeup-organizer
sports-stanley-quencher camping-string-lights lux-marble-coasters
camp-folding-camp-chair lux50-leather-passport-holder
college-sony-headphones college-academic-planner college-tapestry
forher-loccitane-handcream forher-cashmere-wrap college-storage-drawers
selfcare-meditation-cushion gaming2-razer-deathadder lux3-tory-burch-wallet
lux3-longchamp-tote lux3-mvmt-watch lux3-swarovski-necklace
selfcare-acupressure-mat craft-pottery-wheel elephant-dundie gg-ps5-ssd
stuffer-pokemon-tin admin-1772854853091-qevcc admin-1772856864684-372c1
admin-1772856953569-0qrbm admin-1772857013321-zg1re
admin-1772857448333-9ejqp admin-1772858103884-9cp0i
admin-1773605286646-l6pwi admin-1773607432989-siuqa
admin-1773607596670-gs0r6 admin-1773608087879-auoa3
admin-1773608296134-23vb4 admin-1773609759337-9gv00 trend26-kpop-zoey-doll
trend26-tickle-me-elmo trend26-pikachu-puppetronic
trend26-lego-friends-advent

Same day, owner-approved (commit 184b3d8 and the one before it): Echo Show 8,
LifeStraw and YETI Roadie 24 now link to real product pages at the current
price; seven search-link entries with no real product were removed (gp-u25-3,
kids-lego-1, emp-100-2, him-trend-1, couples-150-1, out-015, wc-jersey-usa).
sis-250-1 (Dyson Supersonic) still uses a search link, awaiting a decision.

### 2026-11-11: Dyson entries replaced (commit ab01b9a)

sis-250-1 (search link, "gift set" that does not exist) replaced by two real
listings: sis-dyson-supersonic-origin (B0F5DMBGT6, 399.99) and
sis-dyson-supersonic-nural (B0D71BKD7Q, 449.99). IDs and prices from the API on
2026-11-11. Images from Dyson's own site, logged in data/image-sources.json;
the first Origin candidate was an internal cutaway on black and the second
showed five attachments the Origin does not ship with, so the image used is the
dryer alone from Dyson's Origin page. rating and reviewCount are 0, so no
stars show and the products are left out of pools that filter on rating; they
still appear on 10 built pages each. To show stars they need a hand check of
each listing, the same as the Toniebox. Verified live in the product feed.

Still a search link: dad-002 "Craft Beer-of-the-Month Club (3-Month)" in
data/products-catalog.ts, built with the amzSearch helper, which is why the
first sweep for literal search URLs missed it. It is in the shuffle and Genie
feed but on no static page. Not a product Amazon sells as one listing. Owner
to decide; recommended: remove.

Open question on the 76 "not accessible" products: that API answer does not
prove a product is gone. It can also mean a listing the API does not serve.
Until a few are hand-checked, treat the cause as unknown.

### 2026-11-11: throttle test result

One test call at 03:37 UTC on Nov 12 (31 minutes after the throttle, with 147
calls already in the rolling 24 hours) SUCCEEDED. So the daily allowance was
not used up at 147: the throttle was almost certainly the per-second limit,
with two requests landing in the same second at Amazon's end while paced 1.1
seconds apart at ours. The 2-second pacing measured from each response is the
fix for that. What this does not show is how high the daily allowance is, only
that it is at least 148. The default cap stays at 150 for now; raise it per run
with AMAZON_API_DAILY_CAP once the owner agrees. Usage: 148 calls in 24 hours.

### 2026-11-11: round two through the API, own cap lifted (owner decision)

Owner asked to run without the self-imposed cap so that Amazon's limit, not
ours, is what stops a run. Pacing (2 s after each response) and stop-on-429
stayed on. 92 calls ran with no throttle; usage reached 240 calls in 24 hours.
Amazon's daily limit was NOT reached, so it is still unknown, now known to be
above 240. No filler calls were sent to find the ceiling: every call so far has
been real catalog work. The default cap is back to 300 (commit 4426a9a).

A. Price check finished for the 89 product IDs the first run missed: 79
   returned, 10 not accessible, 20 with no current offer. Whole catalog now:
   86 not accessible by ID, 162 with no current offer.
B. The 7 "name does not match the title" products, looked up by name. Three
   are real: tech-011 (JBL Flip 6, ID points at an unrelated item; the real
   one is B09GJZKQ3K at 129.95, listed 99), aish-005 (Samsung Galaxy Ring, ID
   points at a MacBook Air; real one B0D3JF9VF8 at 399.99, listed 399), her-008
   (Cuyana Classic Essential Tote, ID points at another brand's bag; Cuyana is
   not on Amazon). Four are false alarms where a generic name simply shares no
   word with the listing title: kids-u25-2, pets-u25-1, mom-25-1, md-007.
   Fixes await owner approval.
C. The 76 products the API would not return by ID, searched by name: none came
   back under its own ID. By a rough match of name and price, 44 have a likely
   replacement listing, 30 only a weak or generic match, 2 nothing. A "likely
   replacement" is often a different brand, so each needs a human yes or no;
   nothing was applied. Five links sent to the owner to confirm the IDs are
   really dead before replacing anything.

Also live: dad-002 (beer club, search link) removed with the unused search-link
helper. The live product feed has 1,299 products and every one links to a
product page.

### 2026-11-11: owner hand check of five "not accessible" products

The owner opened five of the 76 products the API would not return by ID. Four
are live, buyable listings (Pandora Moments bracelet B0CMYFJFFF, Ember Mug 2
B07NQRM6ML, LAMY Safari pen B00133X1V8, balance bike B0BZ439ZWF). One is gone:
The Ordinary Multi-Peptide Lash and Brow Serum B0B5DYY1HQ ("sorry, we can't find
that page").
- Conclusion: ItemNotAccessible does NOT mean delisted. Most of the 86 such
  products are probably fine and simply cannot be price-checked through the
  API. One in five in this small sample was dead, so a rough guess is 10 to 25
  dead links among them, and only a hand check can say which.
- md-020 (the serum) removed: a search by its exact name returned other The
  Ordinary products but not this one, so there is no replacement.
- The 44 "likely replacements" found by search are NOT to be applied: the
  current IDs mostly work.
- scripts/check-dead-links.mjs --via-api is disabled for the same reason.

### 2026-11-11: three wrong product IDs fixed, and the link check page

Owner approved (commit f6d4ee6), verified in the live product feed:
- tech-011 JBL Flip 6 now links to B09GJZKQ3K at 129.95 (was listed 99 and
  pointed at an unrelated item). The site's image shows a black speaker and
  this listing is the blue one; no plain new black listing came back in search,
  only a bundle and a renewed unit.
- aish-005 Samsung Galaxy Ring now links to B0D3JF9VF8 at 399.99 (pointed at a
  MacBook Air).
- her-008 Cuyana Classic Essential Tote removed (pointed at another brand's
  bag; Cuyana is not sold on Amazon).
Live feed: 1,297 products.

Link check page for the owner: https://claude.ai/artifact/BVg47ffBaKQdLYbg8YQeZ2
It lists the 81 products the API would not return by ID that have not been
hand-checked (86 such IDs, less the 4 confirmed live and the removed serum).
Links carry no affiliate tag. The owner marks each Works, Dead or Wrong and
pastes the results back. Until those results arrive, none of the 81 is to be
changed. API usage: 241 calls in 24 hours, no throttle since pacing went to 2 s.
