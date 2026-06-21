import { NextRequest, NextResponse } from 'next/server';
import { redis } from '@/lib/redis';
import { parseAsin } from '@/lib/clickTracking';

// Records one affiliate click in Redis. Called via navigator.sendBeacon from the
// site-wide ClickTracker, so it must never throw — a bad payload just no-ops.
export const dynamic = 'force-dynamic';

const RANKING_KEY = 'clicks:ranking'; // sorted set: member = asin|url, score = clicks
const NAMES_KEY = 'clicks:names';     // hash: key -> last-seen product name

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

    await redis.zincrby(RANKING_KEY, 1, key);
    if (data.name && typeof data.name === 'string') {
      await redis.hset(NAMES_KEY, { [key]: data.name.slice(0, 200) });
    }

    return new NextResponse(null, { status: 204 });
  } catch {
    // Beacons ignore the response; swallow everything so a click is never an error.
    return new NextResponse(null, { status: 204 });
  }
}
