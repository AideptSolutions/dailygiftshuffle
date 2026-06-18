# CLAUDE.md

> **Full deploy/secrets/sync rules: see [DEPLOY.md](DEPLOY.md).** Read it before deploying or committing.

## Deployment

This project deploys to **Vercel via GitHub git-push integration** (reconnected 2026-06-17), NOT via the `vercel` CLI.

To deploy: run `npx next build` to confirm it passes, then **commit and push to `master`**. The push triggers an automatic Vercel deployment.

- Do **not** run `vercel` / `vercel --prod` / `vercel deploy` or other CLI deploy commands — they upload from the local machine, bypass git, and desync GitHub. The only allowed Vercel CLI command is `vercel git connect` (one-time relink).
- Do **not** assume merging a PR is what ships; a push to `master` is the trigger.
- After pushing, confirm the Vercel deployment reaches `READY` and verify the change on https://www.thegiftshuffle.com.

## Secrets

`.env.all`, `.env.vercel`, `.env*.local` are gitignored and hold real secrets (ADMIN_PASSWORD, SERPER_API_KEY, GOOGLE_AI_API_KEY, Upstash tokens). Never stage or commit any `.env` file, `*.key`, or `*.pem`.

## Source of truth

Keep GitHub current — don't leave local commits unpushed. If `git status` shows you're ahead of `origin/master`, push before considering work done.

For the guided workflow use the `/deploy` skill.
