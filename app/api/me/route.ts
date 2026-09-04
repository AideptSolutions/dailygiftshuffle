import { NextRequest, NextResponse } from 'next/server';
import { getSession, clientIp, verifyValue, ANON_COOKIE } from '@/lib/auth';
import { remainingRuns, RUNS_PER_DAY, RUNS_PER_WEEK } from '@/lib/genie/quota';
import { rlMePerIp } from '@/lib/ratelimit';

export const dynamic = 'force-dynamic';

// Who am I + display-only run quota (the server re-checks the real counters
// on every run; the client never sends them back).
export async function GET(req: NextRequest) {
  const { success } = await rlMePerIp.limit(clientIp(req));
  if (!success) return NextResponse.json({ error: 'rate-limited' }, { status: 429 });

  const session = getSession(req);
  if (session) {
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

  // Anonymous: quota rides the signed anon-id cookie once one exists.
  const anonId = verifyValue(req.cookies.get(ANON_COOKIE)?.value);
  if (anonId) {
    const { dayLeft, weekLeft } = await remainingRuns(`anon:${anonId}`);
    return NextResponse.json({
      signedIn: false,
      runsLeftToday: dayLeft,
      runsLeftThisWeek: weekLeft,
      runsPerDay: RUNS_PER_DAY,
      runsPerWeek: RUNS_PER_WEEK,
    });
  }
  return NextResponse.json({ signedIn: false, runsPerDay: RUNS_PER_DAY });
}
