import { NextResponse } from 'next/server';
import { getFullCatalog } from '@/lib/catalogFeed';

export const dynamic = 'force-dynamic';

// The public feed that powers the shuffle, search, and home-featured surfaces.
// The merge itself lives in lib/catalogFeed.ts, shared with the Gift Genie.
// ?season=all also returns out-of-season items (Halloween outside Sep-Oct),
// used only by the seasonal shuffle page /shuffle/halloween.
export async function GET(req: Request) {
  const includeOffSeason = new URL(req.url).searchParams.get('season') === 'all';
  return NextResponse.json(await getFullCatalog({ includeOffSeason }));
}
