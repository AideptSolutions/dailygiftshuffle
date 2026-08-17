# TheGiftShuffle — Project Todos

_Last updated: 2026-08-17_

> Credentials never go in this file. Secrets live in `.env.all` / Vercel env vars
> only — see [DEPLOY.md](DEPLOY.md).

## 🔴 Blocking / Next Up

- [ ] Nothing blocking. Build passes and the site is live.

## 🟡 In Progress / Pending

- [ ] **Amazon Creators API — blocked on eligibility, not on code.** The
      credential authenticates, but `GetItems` returns `403
      AssociateNotEligible`: Amazon wants 10+ qualifying sales in the trailing
      30 days before it serves product data. (Stricter than the old PA-API 5
      rule of 3 sales in 180 days — don't plan against that number.) Nothing to
      build when eligibility lands: re-run `--check`, then `--write`.
      See `CATALOG-DATA-QUALITY.md`.
- [ ] **AdSense application** — `components/AdSlot.tsx` exists and renders slots;
      confirm whether the account was ever approved and whether a real
      `ca-pub` ID is wired in production.
- [ ] **Catalog refresh cadence** — run `scripts/check-dead-links.mjs` on the
      documented schedule. Dead links are the costly failure; ratings are a hard
      cliff at 4.5 with 149 entries sitting within 0.1 of it. Review counts
      barely move ranking because of the `log10` term.

## 🟢 Completed

**Data quality (Aug 2026)**
- [x] Replaced merchant-feed ratings with real Amazon figures on 196 products —
      `enrich-products.mjs` had been serving other retailers' data, which buried
      the best picks under the `rating x log10(reviewCount)` ranking
- [x] Consolidated 37 same-ASIN duplicates, removed 21 duplicate listings,
      repaired 5 dead product links
- [x] Pointed 71 products at real `/dp/ASIN` pages instead of search URLs
- [x] Added the dead-link checker and the Amazon Creators API client
- [x] Documented the whole picture in `CATALOG-DATA-QUALITY.md`

**Site & SEO**
- [x] Phase 1 MVP + Phase 2 (10 niche pages, 500-slug `/gifts/[slug]` SSG,
      sitemap, JSON-LD, ad slots) — site is LIVE
- [x] SEO/AEO overhaul + Q4 build-out; ~100 routes under `app/`
- [x] Answer-engine (AEO) answer blocks, Organization/WebSite schema, IndexNow
- [x] Homepage Phase 1 + Phase 2: visual recipient tiles, editorial descriptors,
      cohesive lifestyle imagery
- [x] Shuffle widget: visible "beat", reduced-motion support, hydration fix
- [x] Fixed GSC duplicate-canonical overlap; restored `/gift-ideas-for-mom`
- [x] Real Amazon Associates tag (`dailygiftshuf-20`) live across the catalog
- [x] Upstash Redis wired; click tracking by ASIN via `components/ClickTracker.tsx`
- [x] Admin panel at `/admin` (password in `ADMIN_PASSWORD`, not in this repo)
- [x] Brand kit with mascot + social avatars

**Fixed since this file last got attention**
- [x] `app/category/[niche]/page.tsx` corruption (outdoors content in the gaming
      FAQs) — resolved; category pages build clean

## 📋 Backlog

- [ ] Weekly trend reports → identify new niche pages to build (automate via cron)
- [ ] Add more niche category pages based on trend reports
- [ ] TheDollarShuffle.com — future project, domain owned

## 🗑 Dropped (deliberately not doing)

- ~~Merge the products-catalog entries into `products.ts`~~ — obsolete. The two
  catalogs are intentional: `lib/giftSelect.ts` reads both, dedupes, and filters
  filler so guide pages read as curated. Merging would lose that split.
- ~~Swap placeholder affiliate tags (`AMAZON_TAG`, `SHAREASALE_TAG`,
  `IMPACT_TAG`)~~ — done for Amazon; the remaining occurrences are a header
  comment in `data/products-catalog.ts`, an admin-UI placeholder string, and a
  docstring example. No live link carries a placeholder tag.
