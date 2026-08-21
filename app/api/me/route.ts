import { NextRequest, NextResponse } from 'next/server';
import { getSession, clientIp } from '@/lib/auth';
import { getBalance } from '@/lib/genie/credits';
import { rlMePerIp } from '@/lib/ratelimit';

export const dynamic = 'force-dynamic';

// Who am I + display-only credit balance (the server re-checks the real
// balance on every run; the client never sends it back).
export async function GET(req: NextRequest) {
  const { success } = await rlMePerIp.limit(clientIp(req));
  if (!success) return NextResponse.json({ error: 'rate-limited' }, { status: 429 });

  const session = getSession(req);
  if (!session) return NextResponse.json({ signedIn: false });

  const credits = await getBalance(session.uid);
  return NextResponse.json({ signedIn: true, email: session.email, credits });
}
