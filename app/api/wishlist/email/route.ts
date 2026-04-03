import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json() as { email?: string; picks?: string[] };
    const { email, picks } = body;

    if (!email || !picks) {
      return NextResponse.json({ error: 'Missing email or picks' }, { status: 400 });
    }

    // Log for now — wire Resend here later
    console.log('[wishlist/email]', { email, picks, ts: new Date().toISOString() });

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
  }
}
