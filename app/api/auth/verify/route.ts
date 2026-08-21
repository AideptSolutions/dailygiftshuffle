import { NextRequest, NextResponse } from 'next/server';
import { redis } from '@/lib/redis';
import {
  signSession,
  newUid,
  clientIp,
  safeNextPath,
  SESSION_COOKIE,
  SESSION_MAX_AGE,
} from '@/lib/auth';
import { magicKey, userEmailKey, userKey, SIGNUP_FREE_RUNS } from '@/lib/genie/keys';
import { grantCredits } from '@/lib/genie/credits';
import { rlVerifyPerIp } from '@/lib/ratelimit';

export const dynamic = 'force-dynamic';

// Completes a magic-link sign-in. The token is single-use via GETDEL: a
// replayed link atomically finds nothing and lands on link-expired. First
// verify for an email creates the account and grants the free runs, gated by
// SET NX so a re-login can never re-mint credits.
export async function GET(req: NextRequest) {
  const expired = NextResponse.redirect(new URL('/?genie=link-expired', req.nextUrl.origin));

  const { success } = await rlVerifyPerIp.limit(clientIp(req));
  if (!success) return expired;

  const token = req.nextUrl.searchParams.get('token') ?? '';
  if (!token || token.length > 128) return expired;

  const stored = await redis.getdel<{ email: string; next?: string }>(magicKey(token));
  if (!stored?.email) return expired;

  const email = stored.email.trim().toLowerCase();

  // Atomic account-created gate. The free-run grant lives ONLY in this branch.
  let uid = newUid();
  const created = await redis.set(userEmailKey(email), uid, { nx: true });
  if (created === 'OK') {
    await redis.set(userKey(uid), { id: uid, email, createdAt: new Date().toISOString() });
    await grantCredits(uid, SIGNUP_FREE_RUNS);
  } else {
    const existing = await redis.get<string>(userEmailKey(email));
    if (!existing) return expired; // should not happen; fail safe
    uid = existing;
  }

  const res = NextResponse.redirect(
    new URL(`${safeNextPath(stored.next)}?genie=signed-in`, req.nextUrl.origin),
  );
  res.cookies.set(SESSION_COOKIE, signSession(uid, email), {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: SESSION_MAX_AGE,
  });
  return res;
}
