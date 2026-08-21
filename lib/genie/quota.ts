// Free-tier run quotas for signed-in users: 3 readings per day, capped at 15
// per week. Replaces the old purchased-credit ledger; there is no payment
// path. Counters live in Redis keyed by UTC day / ISO week, INCR-then-check
// (atomic under concurrency: at the limit, racing requests both increment and
// the losers roll back), with a refund used when the provider fails so a
// broken run never costs quota.

import { redis } from '@/lib/redis';

export const RUNS_PER_DAY = 3;
export const RUNS_PER_WEEK = 15;

const DAY_TTL = 2 * 24 * 3600;
const WEEK_TTL = 8 * 24 * 3600;

const utcDay = (d = new Date()) => d.toISOString().slice(0, 10).replace(/-/g, '');

// ISO 8601 week number, UTC.
function isoWeek(d = new Date()): string {
  const date = new Date(Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate()));
  const dayNum = date.getUTCDay() || 7;
  date.setUTCDate(date.getUTCDate() + 4 - dayNum);
  const yearStart = new Date(Date.UTC(date.getUTCFullYear(), 0, 1));
  const week = Math.ceil(((date.getTime() - yearStart.getTime()) / 86400000 + 1) / 7);
  return `${date.getUTCFullYear()}w${String(week).padStart(2, '0')}`;
}

export const quotaDayKey = (uid: string) => `genie:quota:d:${uid}:${utcDay()}`;
export const quotaWeekKey = (uid: string) => `genie:quota:w:${uid}:${isoWeek()}`;

export type QuotaResult =
  | { ok: true; dayLeft: number; weekLeft: number }
  | { ok: false; reason: 'daily' | 'weekly' };

export async function consumeRun(uid: string): Promise<QuotaResult> {
  const dKey = quotaDayKey(uid);
  const d = await redis.incr(dKey);
  if (d === 1) await redis.expire(dKey, DAY_TTL);
  if (d > RUNS_PER_DAY) {
    await redis.decr(dKey);
    return { ok: false, reason: 'daily' };
  }

  const wKey = quotaWeekKey(uid);
  const w = await redis.incr(wKey);
  if (w === 1) await redis.expire(wKey, WEEK_TTL);
  if (w > RUNS_PER_WEEK) {
    await redis.decr(wKey);
    await redis.decr(dKey);
    return { ok: false, reason: 'weekly' };
  }

  return { ok: true, dayLeft: RUNS_PER_DAY - d, weekLeft: RUNS_PER_WEEK - w };
}

// Give the run back after a provider failure. Floored at 0 so a refund that
// lands after a window rollover cannot create bonus runs.
export async function refundRun(uid: string): Promise<void> {
  for (const key of [quotaDayKey(uid), quotaWeekKey(uid)]) {
    const after = await redis.decr(key);
    if (after < 0) await redis.incr(key);
  }
}

export async function remainingRuns(uid: string): Promise<{ dayLeft: number; weekLeft: number }> {
  const [d, w] = await Promise.all([
    redis.get<number>(quotaDayKey(uid)),
    redis.get<number>(quotaWeekKey(uid)),
  ]);
  return {
    dayLeft: Math.max(0, RUNS_PER_DAY - (Number(d) || 0)),
    weekLeft: Math.max(0, RUNS_PER_WEEK - (Number(w) || 0)),
  };
}
