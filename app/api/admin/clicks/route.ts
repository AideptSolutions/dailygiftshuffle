import { NextRequest, NextResponse } from 'next/server';
import { redis } from '@/lib/redis';
import { products } from '@/data/products';
import { readAdminProducts } from '@/lib/admin-store';
import { parseAsin, isAsin } from '@/lib/clickTracking';

export const dynamic = 'force-dynamic';

// Must match the keys written by /api/clicks.
const RANKING_KEY = 'clicks:ranking';
const NAMES_KEY = 'clicks:names';

function checkAuth(req: NextRequest): boolean {
  return req.cookies.get('admin-auth')?.value === 'true';
}

export async function GET(req: NextRequest) {
  if (!checkAuth(req)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  // Top items by clicks (sorted set, highest first).
  const raw = (await redis.zrange(RANKING_KEY, 0, 299, {
    rev: true,
    withScores: true,
  })) as (string | number)[];
  const storedNames = (await redis.hgetall<Record<string, string>>(NAMES_KEY)) ?? {};

  // Resolve ASIN -> product name from the catalog + admin products.
  const nameByKey = new Map<string, string>();
  for (const p of products) {
    const a = parseAsin(p.affiliateUrl);
    if (a) nameByKey.set(a, p.name);
  }
  try {
    for (const p of await readAdminProducts()) {
      const a = (p.asin && p.asin.trim().toUpperCase()) || parseAsin(p.affiliateUrl);
      if (a) nameByKey.set(a, p.name);
    }
  } catch {
    /* admin products optional */
  }

  const items: { key: string; clicks: number; name: string | null; url: string }[] = [];
  for (let i = 0; i < raw.length; i += 2) {
    const key = String(raw[i]);
    const clicks = Number(raw[i + 1]);
    items.push({
      key,
      clicks,
      name: nameByKey.get(key) ?? storedNames[key] ?? null,
      url: isAsin(key) ? `https://www.amazon.com/dp/${key}` : key,
    });
  }

  const total = items.reduce((sum, r) => sum + r.clicks, 0);
  return NextResponse.json({ total, count: items.length, items });
}
