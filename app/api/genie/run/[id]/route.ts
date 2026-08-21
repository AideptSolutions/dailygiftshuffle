import { NextRequest, NextResponse } from 'next/server';
import { redis } from '@/lib/redis';
import { getSession, clientIp } from '@/lib/auth';
import { runKey } from '@/lib/genie/keys';
import { rlMePerIp } from '@/lib/ratelimit';

export const dynamic = 'force-dynamic';

interface StoredRun {
  runId: string;
  uid: string | null;
  [k: string]: unknown;
}

// Owner-only run retrieval (history). Public viewing goes through the share
// page, which never exposes uid or quiz answers.
export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  const { success } = await rlMePerIp.limit(clientIp(req));
  if (!success) return NextResponse.json({ error: 'rate-limited' }, { status: 429 });

  const session = getSession(req);
  if (!session) return NextResponse.json({ error: 'unauthorized' }, { status: 401 });

  const run = await redis.get<StoredRun>(runKey(params.id));
  if (!run || run.uid !== session.uid) {
    return NextResponse.json({ error: 'not-found' }, { status: 404 });
  }
  return NextResponse.json(run);
}
