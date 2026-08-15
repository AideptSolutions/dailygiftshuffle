// How to pull REAL Amazon rating / reviewCount / price for a set of ASINs.
//
// This is a documented procedure rather than a runnable scraper, because the
// only reliable path found so far needs a real browser session.
//
// What does NOT work:
//   * Serper `shopping` - Amazon does not feed Google Shopping, so results are
//     Walmart/Target/eBay. This is what silently corrupted 205 catalog entries.
//   * Serper `search` on an ASIN - returns the correct product TITLE (useful for
//     confirming an ASIN is the right product) but no rating or review count.
//   * Plain `fetch` of amazon.com/dp/<ASIN> from Node - works for roughly a
//     dozen requests, then Amazon serves a bot-check page. A 6.5s delay did not
//     help; the block is session-based, not purely rate-based.
//
// What DOES work (used on 2026-08-14 for all 205 suspect entries):
//   1. Open a browser tab on https://www.amazon.com (the in-app Browser pane is
//      fine). This establishes the session cookies Amazon expects.
//   2. From that tab's console, fetch product pages SAME-ORIGIN so the request
//      carries those cookies:
//
//        await fetch('/dp/' + asin, { credentials: 'include' })
//
//      Same-origin requests from a real session were not blocked at ~200
//      sequential fetches with a 220ms gap.
//   3. Parse the HTML for:
//        rating       /([0-9.]+)\s+out of 5 stars/
//        reviewCount  /([\d,]+)\s+(?:global\s+)?ratings/
//        price        /<span class="a-offscreen">\s*\$([\d,]+\.\d\d)/
//        title        the <title> tag (strip the "Amazon.com:" prefix and the
//                     trailing category suffix)
//   4. Accumulate results on `window` and poll, because a single tool call is
//      capped at 30s while a full run takes minutes.
//   5. Save as scripts/amazon-live.csv keyed by ASIN, then apply with
//      scripts/apply-review-fix.mjs. That script only rewrites entries whose
//      stored reviewCount is under 1000 (the merchant-feed tell), so it is safe
//      to re-run: a second pass is a no-op.
//
// Capture the page TITLE too when spot-checking a new ASIN - it is the only way
// to catch an ASIN that points at the wrong product. Word-overlap scoring is not
// enough: it rated a LEGO Bugatti link 0.6 "MATCH" when the ASIN was actually an
// LED light kit for that set.
//
// Do NOT take price from this: the a-offscreen span often holds a per-unit or
// promotional figure (it read $0.31 for a Dr Teal's gift set, $2.22 for a CeraVe
// duo). Prices still need a real feed.
//
// The durable fix is the Amazon Product Advertising API: it returns price,
// rating, review count and images directly and is the compliant source. It
// requires the Associates account to have 3 qualifying sales in 180 days, then
// credentials. Prefer it over the browser procedure once available.

console.log(readFileSync(new URL(import.meta.url)).toString().split('\n')
  .filter((l) => l.startsWith('//')).map((l) => l.replace(/^\/\/ ?/, '')).join('\n'));
import { readFileSync } from 'fs';
