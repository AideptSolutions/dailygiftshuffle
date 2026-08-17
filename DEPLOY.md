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

**This applies to tracked docs too, not just `.env` files.** Never write a
password, token, or key into a `.md` file, a code comment, or a commit message —
gitignore does not protect a file that is already tracked. Refer to the env var
by name (`ADMIN_PASSWORD`) and leave the value in `.env.all` / Vercel.
Two credentials were committed this way and were removed from the working tree
on 2026-08-17. Both are still in git history, so deleting the lines is not the
fix — **both must be rotated**:

| Credential | Was in | Status |
|---|---|---|
| `ADMIN_PASSWORD` | `TODOS.md` (since the MVP) | **rotate** |
| `UPSTASH_REDIS_REST_TOKEN` | 7 scripts, hardcoded | **rotate** |

Standalone scripts get Upstash credentials from `scripts/lib/redis-env.mjs`,
which loads `.env.all` / `.env.local` and exits with a clear message if either
variable is missing. Import from it rather than inlining a URL and token again.

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
