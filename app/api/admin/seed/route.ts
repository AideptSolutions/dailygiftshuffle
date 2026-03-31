import { NextResponse } from 'next/server';
import { redis } from '@/lib/redis';
import { seedFromJson } from '@/lib/admin-store';

export const dynamic = 'force-dynamic';

export async function POST(req: Request) {
  const token = req.headers.get('x-seed-token');
  if (!process.env.SEED_SECRET || token !== process.env.SEED_SECRET) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  await redis.del('admin:products');
  const products = await seedFromJson();

  return NextResponse.json({
    status: 'flushed and re-seeded',
    count: products.length,
  });
}
