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
