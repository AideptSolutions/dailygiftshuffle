# TheGiftShuffle — Project Todos

_Last updated: 2026-03-29_

## 🔴 Blocking / Next Up
- [ ] FIX BUG: `app/category/[niche]/page.tsx` corrupted — outdoors content injected into gaming FAQs, build failing
- [ ] Verify all category pages build clean after fix

## 🟡 In Progress / Pending
- [ ] Affiliate tags still placeholders: AMAZON_TAG, SHAREASALE_TAG, IMPACT_TAG — apply for accounts and swap in real tags
  - Amazon Associates (apply after deploy)
  - Impact (Target/REI/Chewy/Nordstrom)
  - ShareASale (Uncommon Goods)
  - Skimlinks
- [ ] AdSense application (after deploy + some traffic)
- [ ] Push latest changes to GitHub → redeploy to Vercel

## 🟢 Completed
- [x] Phase 1 MVP complete (all routes 200 OK, email capture, wishlist)
- [x] 162 real products in data/products-catalog.ts
- [x] Upstash Redis wired (social-slug-73085.upstash.io), 46 products in Redis
- [x] Admin panel at /admin (TruffleShuffle1)
- [x] Niche categories: gaming, kids, camping/outdoors
- [x] New pages: /gift-ideas-for-kids, /gifts-for-camping-and-outdoors
- [x] Card fix: all images fixed h-28, grid 2/4 cols
- [x] Admin recipients: brother, sister, streamers, myself-her, myself-him
- [x] Admin budget tiers: under50, under150
- [x] Favicon added (public/favicon.png)
- [x] Phase 2: 10 niche pages, 500-slug /gifts/[slug] SSG, sitemap, JSON-LD, ad slots
- [x] Site is LIVE

## 📋 Backlog
- [ ] Weekly trend reports → identify new niche pages to build (automated via cron)
- [ ] Merge 162 products from data/products-catalog.ts into products.ts
- [ ] Add more niche category pages based on trend reports
- [ ] TheDollarShuffle.com — future project, domain owned
