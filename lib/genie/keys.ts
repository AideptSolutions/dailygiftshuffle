// Every Genie/auth Redis key lives here so names have one home (mirrors the
// wishlistKey() convention in lib/redis.ts).

import { createHash } from 'crypto';

export const sha256 = (s: string) => createHash('sha256').update(s).digest('hex');

// Accounts
export const userEmailKey = (email: string) => `user:email:${email.trim().toLowerCase()}`;
export const userKey      = (uid: string)   => `user:${uid}`;

// Magic links: only the hash of the token is ever stored.
export const magicKey = (rawToken: string) => `magic:${sha256(rawToken)}`;
export const MAGIC_TTL_SECONDS = 15 * 60;


// Genie runs
export const runKey      = (runId: string)   => `genie:run:${runId}`;
export const runsListKey = (uid: string)     => `genie:runs:${uid}`;
export const shareKey    = (shareId: string) => `genie:share:${shareId}`;
export const RUN_TTL_SECONDS   = 30 * 24 * 3600;
export const SHARE_TTL_SECONDS = 365 * 24 * 3600;

// Anonymous trial controls
export const trialIpKey = (ip: string) => `trial:ip:${sha256(ip)}`;
export const TRIAL_IP_TTL_SECONDS = 30 * 24 * 3600;
export const TRIAL_PER_IP_MAX = 2; // allow a shared household a second run

export const anonDayKey = (d = new Date()) =>
  `genie:anon:day:${d.toISOString().slice(0, 10).replace(/-/g, '')}`;
export const ANON_DAY_TTL_SECONDS = 2 * 24 * 3600;
// Hard daily ceiling on anonymous runs: the absolute worst-case daily LLM spend
// from trial abuse is ANON_DAY_MAX x ~1.3 cents.
export const ANON_DAY_MAX = 500;
