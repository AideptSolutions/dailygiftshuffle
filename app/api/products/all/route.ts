import { NextResponse } from 'next/server';
import { getFullCatalog } from '@/lib/catalogFeed';

export const dynamic = 'force-dynamic';

// The public feed that powers the shuffle, search, and home-featured surfaces.
// The merge itself lives in lib/catalogFeed.ts, shared with the Gift Genie.
export async function GET() {
  return NextResponse.json(await getFullCatalog());
}
