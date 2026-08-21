// Session + request-security helpers for the Genie's account layer.
//
// Sessions are stateless HMAC-signed cookies (no JWT dependency):
//   base64url(payload JSON) + '.' + base64url(HMAC-SHA256(payload, SESSION_SECRET))
// Verification uses timingSafeEqual. This intentionally does NOT follow the
// legacy unsigned admin-auth cookie pattern.

import { createHmac, timingSafeEqual, randomBytes } from 'crypto';
import type { NextRequest } from 'next/server';

export const SESSION_COOKIE = 'dgs_sess';
export const TRIAL_COOKIE = 'dgs_trial';
export const SESSION_MAX_AGE = 90 * 24 * 3600; // seconds
export const TRIAL_COOKIE_MAX_AGE = 365 * 24 * 3600;

export interface SessionPayload {
  uid: string;
  email: string;
  iat: number;
  exp: number;
}

function secret(): string {
  const s = process.env.SESSION_SECRET;
  if (s && s.length >= 16) return s;
  if (process.env.NODE_ENV !== 'production') {
    return 'dev-only-secret-do-not-use-in-prod';
  }
  throw new Error('SESSION_SECRET is not configured');
}

const b64url = (buf: Buffer) => buf.toString('base64url');
const mac = (payload: string) => b64url(createHmac('sha256', secret()).update(payload).digest());

// Generic signed value: "<base64url(data)>.<base64url(hmac)>"
export function signValue(data: string): string {
  const p = b64url(Buffer.from(data, 'utf8'));
  return `${p}.${mac(p)}`;
}

export function verifyValue(value: string | undefined | null): string | null {
  if (!value) return null;
  const dot = value.lastIndexOf('.');
  if (dot <= 0) return null;
  const p = value.slice(0, dot);
  const sig = value.slice(dot + 1);
  const expected = mac(p);
  const a = Buffer.from(sig);
  const b = Buffer.from(expected);
  if (a.length !== b.length || !timingSafeEqual(a, b)) return null;
  try {
    return Buffer.from(p, 'base64url').toString('utf8');
  } catch {
    return null;
  }
}

export function signSession(uid: string, email: string): string {
  const now = Math.floor(Date.now() / 1000);
  const payload: SessionPayload = { uid, email, iat: now, exp: now + SESSION_MAX_AGE };
  return signValue(JSON.stringify(payload));
}

export function verifySession(cookieValue: string | undefined | null): SessionPayload | null {
  const data = verifyValue(cookieValue);
  if (!data) return null;
  try {
    const payload = JSON.parse(data) as SessionPayload;
    if (!payload.uid || !payload.email) return null;
    if (payload.exp < Math.floor(Date.now() / 1000)) return null;
    return payload;
  } catch {
    return null;
  }
}

export function getSession(req: NextRequest): SessionPayload | null {
  return verifySession(req.cookies.get(SESSION_COOKIE)?.value);
}

export function newAuthToken(): string {
  return randomBytes(32).toString('base64url');
}

export function newUid(): string {
  return randomBytes(9).toString('base64url'); // 12 chars
}

// CSRF defense in depth for state-changing POSTs (alongside SameSite=Lax):
// the Origin (or Referer) host must match the request host.
export function sameOrigin(req: NextRequest): boolean {
  const origin = req.headers.get('origin') ?? req.headers.get('referer');
  if (!origin) return true; // curl/no-origin: cookie SameSite already applies
  try {
    return new URL(origin).host === req.nextUrl.host;
  } catch {
    return false;
  }
}

export function clientIp(req: NextRequest): string {
  const fwd = req.headers.get('x-forwarded-for');
  return (fwd ? fwd.split(',')[0] : '').trim() || 'local';
}

// Open-redirect guard for the magic link's ?next= param: same-site relative
// paths only ("/..." but not "//...").
export function safeNextPath(next: string | null | undefined): string {
  if (next && /^\/(?!\/)/.test(next)) return next;
  return '/';
}
