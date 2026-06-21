import { NextRequest, NextResponse } from 'next/server';
import { redis } from '@/lib/redis';

// Internal stats for the cross-site daily digest. Auth via a shared secret
// header (INTERNAL_STATS_KEY) so only our own cron can read it.
export const dynamic = 'force-dynamic';

const EVENTS_KEY = 'clicks:events';

function authed(req: NextRequest): boolean {
  const key = process.env.INTERNAL_STATS_KEY;
  return !!key && req.headers.get('x-internal-key') === key;
}

interface ClickEvent {
  key: string;
  name: string | null;
  at: string;
}

function parseEvent(item: unknown): ClickEvent | null {
  let obj: unknown = item;
  if (typeof item === 'string') {
    try {
      obj = JSON.parse(item);
    } catch {
      return null;
    }
  }
  if (obj && typeof obj === 'object') {
    const o = obj as Record<string, unknown>;
    return {
      key: String(o.key ?? ''),
      name: o.name ? String(o.name) : null,
      at: String(o.at ?? ''),
    };
  }
  return null;
}

export async function GET(req: NextRequest) {
  if (!authed(req)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const since = Date.now() - 24 * 60 * 60 * 1000;

  let raw: unknown[] = [];
  try {
    raw = (await redis.zrange(EVENTS_KEY, 0, -1)) as unknown[];
  } catch {
    raw = [];
  }

  const byProduct = new Map<string, { name: string | null; clicks: number }>();
  let clicks24h = 0;

  for (const item of raw) {
    const e = parseEvent(item);
    if (!e || !e.at) continue;
    if (new Date(e.at).getTime() < since) continue;
    clicks24h++;
    const cur = byProduct.get(e.key) ?? { name: e.name, clicks: 0 };
    cur.clicks++;
    if (!cur.name && e.name) cur.name = e.name;
    byProduct.set(e.key, cur);
  }

  const products = Array.from(byProduct.entries())
    .map(([asin, v]) => ({ asin, name: v.name, clicks: v.clicks }))
    .sort((a, b) => b.clicks - a.clicks)
    .slice(0, 100);

  return NextResponse.json({ clicks24h, products });
}
