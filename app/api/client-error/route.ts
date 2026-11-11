import { NextRequest, NextResponse } from 'next/server';
import { redis } from '@/lib/redis';
import { clientIp, isAdmin, sameOrigin } from '@/lib/auth';
import { rlClientErrorPerIp } from '@/lib/ratelimit';
import { cleanClickPath } from '@/lib/clickTracking';

// Short capped log of client-side script errors, written by lib/clientErrors.ts.
// It exists to answer one question: does any page crash while rendering, and for
// which user agents (a crawler's renderer included)? Newest first, 200 entries,
// 60 days. GET is admin-only and returns the log as JSON.
export const dynamic = 'force-dynamic';

const KEY = 'errors:client';
const MAX_ENTRIES = 200;
const RETENTION_S = 60 * 24 * 60 * 60;

export async function POST(req: NextRequest) {
  try {
    if (!sameOrigin(req)) return new NextResponse(null, { status: 204 });
    const { success } = await rlClientErrorPerIp.limit(clientIp(req));
    if (!success) return new NextResponse(null, { status: 204 });

    const data = (await req.json().catch(() => ({}))) as {
      message?: unknown; source?: unknown; fatal?: unknown; path?: unknown;
    };
    if (typeof data.message !== 'string' || !data.message) return new NextResponse(null, { status: 204 });

    const entry = {
      at: new Date().toISOString(),
      path: cleanClickPath(typeof data.path === 'string' ? data.path : undefined),
      message: data.message.slice(0, 300),
      source: typeof data.source === 'string' ? data.source.slice(0, 200) : '',
      fatal: data.fatal === true,
      ua: (req.headers.get('user-agent') || '').slice(0, 200),
    };
    await redis.lpush(KEY, JSON.stringify(entry));
    await redis.ltrim(KEY, 0, MAX_ENTRIES - 1);
    await redis.expire(KEY, RETENTION_S);
    return new NextResponse(null, { status: 204 });
  } catch {
    return new NextResponse(null, { status: 204 });
  }
}

export async function GET(req: NextRequest) {
  if (!isAdmin(req)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const raw = await redis.lrange(KEY, 0, MAX_ENTRIES - 1);
  const errors = raw.map((r) => (typeof r === 'string' ? JSON.parse(r) : r));
  return NextResponse.json({ count: errors.length, errors });
}
