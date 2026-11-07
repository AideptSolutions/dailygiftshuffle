import { NextRequest, NextResponse } from 'next/server';
import { redis } from '@/lib/redis';
import { clickDayKey, isAsin } from '@/lib/clickTracking';
import { catalogNamesByAsin } from '@/lib/clickNames';

export const dynamic = 'force-dynamic';

// Must match the keys written by /api/clicks.
const RANKING_KEY = 'clicks:ranking';
const NAMES_KEY = 'clicks:names';

const PERIODS = new Set([7, 30, 90]);
const DAY_MS = 24 * 60 * 60 * 1000;

function checkAuth(req: NextRequest): boolean {
  return req.cookies.get('admin-auth')?.value === 'true';
}

const itemUrl = (key: string) => (isAsin(key) ? `https://www.amazon.com/dp/${key}` : key);

// Fields are "<key>|<path>". Paths never contain "|" (cleanClickPath cuts there).
function splitField(field: string): { key: string; path: string } {
  const i = field.lastIndexOf('|');
  return { key: field.slice(0, i), path: field.slice(i + 1) };
}

async function readDays(start: number, count: number) {
  const pipe = redis.pipeline();
  for (let i = 0; i < count; i++) pipe.hgetall(clickDayKey(new Date(start - i * DAY_MS)));
  return (await pipe.exec()) as (Record<string, number> | null)[];
}

export async function GET(req: NextRequest) {
  if (!checkAuth(req)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const storedNames = (await redis.hgetall<Record<string, string>>(NAMES_KEY)) ?? {};
  const catalogNames = catalogNamesByAsin();
  const nameOf = (key: string) => catalogNames.get(key) ?? storedNames[key] ?? null;

  const days = Number(req.nextUrl.searchParams.get('days'));
  if (PERIODS.has(days)) {
    const now = Date.now();
    const current = await readDays(now, days);
    const previous = await readDays(now - days * DAY_MS, days);

    const clicksByKey = new Map<string, number>();
    const clicksByPath = new Map<string, number>();
    const pathsByKey = new Map<string, Map<string, number>>();
    for (const day of current) {
      for (const [field, value] of Object.entries(day ?? {})) {
        const { key, path } = splitField(field);
        const n = Number(value);
        clicksByKey.set(key, (clicksByKey.get(key) ?? 0) + n);
        clicksByPath.set(path, (clicksByPath.get(path) ?? 0) + n);
        const paths = pathsByKey.get(key) ?? new Map<string, number>();
        paths.set(path, (paths.get(path) ?? 0) + n);
        pathsByKey.set(key, paths);
      }
    }
    const previousByKey = new Map<string, number>();
    for (const day of previous) {
      for (const [field, value] of Object.entries(day ?? {})) {
        const { key } = splitField(field);
        previousByKey.set(key, (previousByKey.get(key) ?? 0) + Number(value));
      }
    }

    const items = Array.from(clicksByKey, ([key, clicks]) => ({
      key,
      clicks,
      previous: previousByKey.get(key) ?? 0,
      name: nameOf(key),
      url: itemUrl(key),
      topPage: Array.from(pathsByKey.get(key) ?? []).sort((a, b) => b[1] - a[1])[0]?.[0] ?? null,
    })).sort((a, b) => b.clicks - a.clicks);
    const pages = Array.from(clicksByPath, ([path, clicks]) => ({ path, clicks })).sort(
      (a, b) => b.clicks - a.clicks
    );

    return NextResponse.json({
      total: items.reduce((sum, r) => sum + r.clicks, 0),
      previousTotal: Array.from(previousByKey.values()).reduce((sum, n) => sum + n, 0),
      count: items.length,
      items,
      pages,
    });
  }

  // All time: top items by clicks (sorted set, highest first).
  const raw = (await redis.zrange(RANKING_KEY, 0, 299, {
    rev: true,
    withScores: true,
  })) as (string | number)[];

  const items: { key: string; clicks: number; name: string | null; url: string }[] = [];
  for (let i = 0; i < raw.length; i += 2) {
    const key = String(raw[i]);
    items.push({ key, clicks: Number(raw[i + 1]), name: nameOf(key), url: itemUrl(key) });
  }

  const total = items.reduce((sum, r) => sum + r.clicks, 0);
  return NextResponse.json({ total, count: items.length, items });
}
