import { NextRequest, NextResponse } from 'next/server';
import { redis } from '@/lib/redis';
import { sameOrigin, clientIp, newAuthToken, safeNextPath } from '@/lib/auth';
import { magicKey, MAGIC_TTL_SECONDS, sha256 } from '@/lib/genie/keys';
import { rlLinkPerEmail, rlLinkPerIp } from '@/lib/ratelimit';
import { sendMagicLink } from '@/lib/email';

export const dynamic = 'force-dynamic';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

// Requests a magic sign-in link. Enumeration-safe by construction: the
// response is byte-identical whether or not the email has an account, because
// accounts are only created at verify time and every valid request does the
// same work (mint token, store, send).
export async function POST(req: NextRequest) {
  if (!sameOrigin(req)) {
    return NextResponse.json({ error: 'forbidden' }, { status: 403 });
  }

  let email = '';
  let next = '/';
  try {
    const body = await req.json();
    email = String(body?.email ?? '').trim().toLowerCase();
    next = safeNextPath(typeof body?.next === 'string' ? body.next : '/');
  } catch {
    /* fall through to validation */
  }
  if (!EMAIL_RE.test(email) || email.length > 254) {
    return NextResponse.json({ error: 'invalid-email' }, { status: 400 });
  }

  const ip = clientIp(req);
  const [byEmail, byIp] = await Promise.all([
    rlLinkPerEmail.limit(sha256(email)),
    rlLinkPerIp.limit(ip),
  ]);
  if (!byEmail.success || !byIp.success) {
    return NextResponse.json({ error: 'rate-limited' }, { status: 429 });
  }

  const token = newAuthToken();
  await redis.set(magicKey(token), { email, next }, { ex: MAGIC_TTL_SECONDS });

  const link = `${req.nextUrl.origin}/api/auth/verify?token=${token}`;
  try {
    await sendMagicLink(email, link);
  } catch (e) {
    // Do not leak delivery state to the client; log for the operator.
    console.error('[auth] magic link send failed:', e);
  }

  return NextResponse.json({ ok: true });
}
