# CLAUDE.md

## Deployment

This project deploys to **Vercel via GitHub git-push integration**, NOT via the `vercel` CLI.

To deploy: **commit and push to the deploy branch** (the branch wired to Vercel — typically `master`/`main`). The push triggers an automatic Vercel deployment.

- Do **not** run `vercel` / `vercel --prod` or other CLI deploy commands — they bypass the GitHub integration.
- Do **not** assume merging a PR is what ships; a push to the deploy branch is the trigger.
- After pushing, report the triggered deployment (branch/commit) and surface the status/URL so production can be confirmed.

For the guided workflow use the `/deploy` skill.
