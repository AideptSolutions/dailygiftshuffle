// Upstash REST credentials for the standalone maintenance scripts.
//
// These used to be hardcoded in every script that touched Redis, which put a
// live token in git history. They now come from .env.all / .env.local (both
// gitignored), using the same loader and the same variable names as the app
// itself (lib/redis.ts):
//
//   UPSTASH_REDIS_REST_URL     e.g. https://<name>.upstash.io
//   UPSTASH_REDIS_REST_TOKEN   REST token from the Upstash console
//
// See DEPLOY.md. Never inline these values back into a tracked file.
import { loadEnv } from './creators-api.mjs';

loadEnv();

export const REDIS_URL = process.env.UPSTASH_REDIS_REST_URL;
export const REDIS_TOKEN = process.env.UPSTASH_REDIS_REST_TOKEN;

if (!REDIS_URL || !REDIS_TOKEN) {
  console.error(
    'UPSTASH_REDIS_REST_URL / UPSTASH_REDIS_REST_TOKEN missing from .env.all (or .env.local).'
  );
  process.exit(1);
}

/** Authorization header for the Upstash REST API. */
export const REDIS_HEADERS = { Authorization: `Bearer ${REDIS_TOKEN}` };
