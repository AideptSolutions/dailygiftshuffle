# Deploy & Sync Playbook — TheGiftShuffle

Read this before deploying or committing. It applies to every contributor and
every AI agent (Claude, OpenClaw, etc.) working on this project.

## Project facts

- **Local repo:** `C:\Users\allan\projects\dailygiftshuffle` (branch: `master`)
- **GitHub:** `AideptSolutions/dailygiftshuffle`
- **Live site:** https://www.thegiftshuffle.com  (NOT thedailygiftshuffle.com)
- **Host:** Vercel, project `dailygiftshuffle`

## How to deploy — the ONLY correct way

Deploys happen by **pushing to `master`**. The GitHub→Vercel git integration
(reconnected 2026-06-17) auto-builds and deploys every push to `master` to
production.

Workflow:

1. Make your changes.
2. Run `npx next build` and confirm it exits `0`. **This is the gate** — a broken
   build will not deploy, and you must never push one.
3. Commit your work (see *Secrets* below).
4. `git push origin master`
5. Confirm on Vercel the new deployment reaches state `READY`, then verify the
   change on https://www.thegiftshuffle.com.

## NEVER do this

- **Never deploy with the Vercel CLI** — no `vercel`, `vercel --prod`, or
  `vercel deploy`. CLI deploys upload from the local machine, bypass git, and
  leave GitHub out of sync. That desync is the exact problem fixed on 2026-06-17;
  git push is the only deploy path.
- The **one** allowed Vercel CLI command is `vercel git connect` — one-time, only
  if the GitHub integration is ever disconnected again.
- Never `git push --force` or `--no-verify` to `master`.

## Secrets — never commit these

`.env.all`, `.env.vercel`, and `.env*.local` are gitignored and hold real
secrets: `ADMIN_PASSWORD`, `SERPER_API_KEY`, `GOOGLE_AI_API_KEY`, Upstash tokens,
and (if added) `PEXELS_API_KEY`. Never stage or commit any `.env` file, `*.key`,
`*.pem`, or files named like secrets. If `git add -A` would stage one, exclude it
explicitly (e.g. `git add -A -- . ':!path/to/secret'`).

### Gift Genie env vars (Phase 2+)

Set in Vercel (and `.env.all` for the record) when enabling each phase:

- `NEXT_PUBLIC_GENIE_PHASE` - feature gate: unset/`1` = teaser panel only,
  `2` = accounts + runs live (free tier: 1 anonymous trial, then 3 runs/day
  and 15/week per signed-in user).
- `SESSION_SECRET` - 32+ random bytes; signs session/trial cookies. Rotating it
  logs every user out.
- `ANTHROPIC_API_KEY` - Genie brain (default model `claude-haiku-4-5`).
- `GENIE_MODEL` - optional override; `gemini-*` values switch to the Gemini
  fallback using `GOOGLE_AI_API_KEY`.
- `RESEND_API_KEY`, `GENIE_EMAIL_FROM` - magic-link email (domain must be
  verified in Resend with SPF/DKIM DNS records first).

## Keep GitHub as the source of truth

Don't leave local commits unpushed. After committing, push to `master` so GitHub
and production stay current. If `git status` shows you're ahead of
`origin/master`, push before considering the work done.

## Verification before reporting "done"

Don't call a change live until: `next build` passed, the push succeeded, the
Vercel deployment is `READY`, and you've confirmed it on the live URL.

## Image pipeline (reference)

Product/hero images come from a provider-agnostic SERP pipeline, NOT the Amazon
PA-API. See `scripts/lib/image-search.mjs`, `scripts/fetch-real-images.mjs`, and
`scripts/build-review-sheet.mjs`. Ranking excludes Amazon-hosted images
(Associates ToS) and prefers clean retailer/brand shots. Keys live in `.env.all`.

## After a content deploy: ping IndexNow

    npm run indexnow                    # all sitemap URLs
    npm run indexnow -- /retro-gaming-gifts   # just what changed

IndexNow pushes to Bing, Yandex, Seznam and Naver immediately instead of waiting
to be recrawled. This matters more than it looks: **ChatGPT search grounds on
Bing's index**, so a stale Bing copy means answer engines read an old version of
pages whose whole advantage is their structured data.

The key file must stay live at `/075328b6e1bfb8beae94027dab866fe3.txt`
(`public/` in this repo) or submissions are rejected. Google does not use
IndexNow; it still needs the sitemap and Search Console.

This was manual-only from March to August 2026 and was never run, so every
catalog fix in that window went unannounced. Run it whenever products or pages
change.
