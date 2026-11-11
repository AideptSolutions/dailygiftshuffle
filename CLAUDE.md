# CLAUDE.md

> **Full deploy/secrets/sync rules: see [DEPLOY.md](DEPLOY.md).** Read it before deploying or committing.

## Deployment

This project deploys to **Vercel via GitHub git-push integration** (reconnected 2026-06-17), NOT via the `vercel` CLI.

To deploy: run `npx next build` to confirm it passes, then **commit and push to `master`**. The push triggers an automatic Vercel deployment.

- Do **not** run `vercel` / `vercel --prod` / `vercel deploy` or other CLI deploy commands; they upload from the local machine, bypass git, and desync GitHub. The only allowed Vercel CLI command is `vercel git connect` (one-time relink).
- Do **not** assume merging a PR is what ships; a push to `master` is the trigger.
- After pushing, confirm the Vercel deployment reaches `READY` and verify the change on https://www.thegiftshuffle.com.

## Secrets

`.env.all`, `.env.vercel`, `.env*.local` are gitignored and hold real secrets (ADMIN_PASSWORD, SERPER_API_KEY, GOOGLE_AI_API_KEY, Upstash tokens). Never stage or commit any `.env` file, `*.key`, or `*.pem`.

## Click tracking (affiliate item clicks)

Every "Buy on Amazon" click is tracked **automatically**; there is nothing to wire up per product.

- `components/ClickTracker.tsx` (mounted once in `app/layout.tsx`) listens site-wide for clicks on any Amazon link and keys each click by the **ASIN** parsed from the URL. Counts go to Upstash Redis via `app/api/clicks/route.ts` (sorted set `clicks:ranking`); a GA4 `select_item` event also fires. Helpers live in `lib/clickTracking.ts`. The owner views ranked clicks at `/admin/clicks` (behind the existing `admin-auth` cookie / `ADMIN_PASSWORD`).
- Each click also adds to a daily hash, `clicks:day:YYYY-MM-DD` (UTC, field `<key>|<path>`, kept about 800 days), which powers the 7, 30 and 90 day views and the source-page table on `/admin/clicks`. Only the pathname is stored, never the query string.
- **When adding products to the catalog** (`data/products.ts` or `data/products-catalog.ts`): no tracking code is needed; just ensure each product's `affiliateUrl` is a real Amazon **`/dp/ASIN`** link (already required for affiliate revenue). That alone makes the item tracked and cleanly named in the dashboard. Avoid bare `amazon.com/s?k=` search URLs, which have no ASIN and only count by raw URL.
- Do **not** remove `<ClickTracker />` from the layout or change the Redis key names (`clicks:ranking`, `clicks:names`) without updating `/api/clicks` and `/api/admin/clicks` together.

## Source of truth

Keep GitHub current; don't leave local commits unpushed. If `git status` shows you're ahead of `origin/master`, push before considering work done.

For the guided workflow use the `/deploy` skill.

## Product catalog

All products live in code: `data/products.ts` and `data/products-catalog.ts`, merged and deduped by `lib/catalogFeed.ts` (the feed behind `/api/products/all`, the homepage and Find a Gift shuffles, and the Gift Genie). The Redis admin catalog (`admin:products`) and Crane's List were retired on 2026-10-29: admin products were merged into `data/products-catalog.ts` and `/admin` now redirects to `/admin/clicks`. Add new products to the catalog files, with live-verified ASINs and local images (see `CATALOG-DATA-QUALITY.md`). Never add products via Redis.

## Client error log

`app/error.tsx` and `app/global-error.tsx` are the error boundaries: a script error shows a branded panel and keeps the page's head tags, instead of the framework's generic error screen. `components/ErrorReporter.tsx` (mounted once in `app/layout.tsx`) and both boundaries report through `lib/clientErrors.ts` to GA4 (`exception` event) and to `/api/client-error`, which keeps the newest 200 errors for 60 days in the Redis list `errors:client` with path and user agent. Read it signed in as admin at `/api/client-error` (JSON). Do not remove the boundaries or the reporter: they exist because Google stored blank versions of several guide pages in 2026 (see `SEO-RECOVERY-2026-08.md`, audit of 2026-11-10).
