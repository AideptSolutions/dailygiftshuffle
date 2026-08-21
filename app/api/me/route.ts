import { NextRequest, NextResponse } from 'next/server';
import { getSession, clientIp } from '@/lib/auth';
import { remainingRuns, RUNS_PER_DAY, RUNS_PER_WEEK } from '@/lib/genie/quota';
import { rlMePerIp } from '@/lib/ratelimit';

export const dynamic = 'force-dynamic';

// Who am I + display-only run quota (the server re-checks the real counters
// on every run; the client never sends them back).
export async function GET(req: NextRequest) {
  const { success } = await rlMePerIp.limit(clientIp(req));
  if (!success) return NextResponse.json({ error: 'rate-limited' }, { status: 429 });

  const session = getSession(req);
  if (!session) return NextResponse.json({ signedIn: false });

  const { dayLeft, weekLeft } = await remainingRuns(session.uid);
  return NextResponse.json({
    signedIn: true,
    email: session.email,
    runsLeftToday: dayLeft,
    runsLeftThisWeek: weekLeft,
    runsPerDay: RUNS_PER_DAY,
    runsPerWeek: RUNS_PER_WEEK,
  });
}
