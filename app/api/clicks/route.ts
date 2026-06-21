import { randomUUID } from 'crypto';
import { NextRequest, NextResponse } from 'next/server';
import { redis } from '@/lib/redis';
import { parseAsin } from '@/lib/clickTracking';

// Records one affiliate click in Redis. Called via navigator.sendBeacon from the
// site-wide ClickTracker, so it must never throw — a bad payload just no-ops.
export const dynamic = 'force-dynamic';

const RANKING_KEY = 'clicks:ranking'; // sorted set: member = asin|url, score = clicks (cumulative)
const NAMES_KEY = 'clicks:names';     // hash: key -> last-seen product name
const EVENTS_KEY = 'clicks:events';   // sorted set: member = JSON event, score = epoch ms (time-windowed)
const EVENTS_RETENTION_MS = 7 * 24 * 60 * 60 * 1000; // keep 7 days for daily/recent reporting
const EVENTS_BACKSTOP_S = 8 * 24 * 60 * 60;

export async function POST(req: NextRequest) {
  try {
    const data = (await req.json().catch(() => ({}))) as {
      asin?: string;
      url?: string;
      name?: string;
    };

    const key =
      (typeof data.asin === 'string' && data.asin) ||
      (typeof data.url === 'string' && (parseAsin(data.url) || data.url)) ||
      '';

    if (!key) return new NextResponse(null, { status: 204 });

    const name = data.name && typeof data.name === 'string' ? data.name.slice(0, 200) : null;

    await redis.zincrby(RANKING_KEY, 1, key);
    if (name) {
      await redis.hset(NAMES_KEY, { [key]: name });
    }

    // Timestamped event so time-windowed reports (e.g. the daily digest) can ask
    // "how many clicks in the last 24h, and on which products". Capped to 7 days.
    const now = Date.now();
    await redis.zadd(EVENTS_KEY, {
      score: now,
      member: JSON.stringify({ key, name, at: new Date(now).toISOString(), id: randomUUID() }),
    });
    await redis.zremrangebyscore(EVENTS_KEY, 0, now - EVENTS_RETENTION_MS);
    await redis.expire(EVENTS_KEY, EVENTS_BACKSTOP_S);

    return new NextResponse(null, { status: 204 });
  } catch {
    // Beacons ignore the response; swallow everything so a click is never an error.
    return new NextResponse(null, { status: 204 });
  }
}
