// Server-side run-credit ledger. The balance lives only in Redis; clients never
// send balances. Credits are minted in exactly two places: the account-creation
// grant (SET NX branch in the auth verify route) and the Stripe webhook.

import { redis } from '@/lib/redis';
import { creditsKey } from '@/lib/genie/keys';

export async function getBalance(uid: string): Promise<number> {
  const v = await redis.get<number>(creditsKey(uid));
  return typeof v === 'number' ? v : Number(v ?? 0) || 0;
}

// Atomic decrement-and-check: two concurrent requests with balance 1 see DECR
// results 0 and -1, so exactly one proceeds. The transient negative is healed
// by the compensating INCR. (A hard function kill between DECR and refund can
// burn one credit; acceptable at ~1.3 cents.)
export async function spendCredit(uid: string): Promise<{ ok: boolean; remaining: number }> {
  const remaining = await redis.decr(creditsKey(uid));
  if (remaining < 0) {
    await redis.incr(creditsKey(uid));
    return { ok: false, remaining: 0 };
  }
  return { ok: true, remaining };
}

// Refund after an LLM/provider failure so a broken run never costs the user.
export async function refundCredit(uid: string): Promise<void> {
  await redis.incr(creditsKey(uid));
}

export async function grantCredits(uid: string, n: number): Promise<number> {
  return redis.incrby(creditsKey(uid), n);
}

// Refund on Stripe charge.refunded: remove up to n, flooring at 0 (a partially
// consumed refunded bundle zeroes out rather than going negative).
export async function revokeCredits(uid: string, n: number): Promise<void> {
  const after = await redis.decrby(creditsKey(uid), n);
  if (after < 0) await redis.incrby(creditsKey(uid), -after);
}
