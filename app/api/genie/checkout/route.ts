import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { getSession, sameOrigin, safeNextPath } from '@/lib/auth';
import { bundleByKey } from '@/lib/genie/pricing';
import { rlCheckoutPerUid } from '@/lib/ratelimit';

export const dynamic = 'force-dynamic';

// Creates a Stripe Checkout session for a run bundle. Dark until Phase 3:
// without the Stripe env vars this returns 503 and the UI never shows it.
export async function POST(req: NextRequest) {
  if (!sameOrigin(req)) {
    return NextResponse.json({ error: 'forbidden' }, { status: 403 });
  }
  if (!process.env.STRIPE_SECRET_KEY) {
    return NextResponse.json({ error: 'not-configured' }, { status: 503 });
  }
  const session = getSession(req);
  if (!session) return NextResponse.json({ error: 'unauthorized' }, { status: 401 });

  const { success } = await rlCheckoutPerUid.limit(session.uid);
  if (!success) return NextResponse.json({ error: 'rate-limited' }, { status: 429 });

  let bundleKey = '';
  let returnPath = '/';
  try {
    const body = await req.json();
    bundleKey = String(body?.bundle ?? '');
    returnPath = safeNextPath(typeof body?.returnPath === 'string' ? body.returnPath : '/');
  } catch { /* validated below */ }

  const bundle = bundleByKey(bundleKey);
  const priceId = bundle ? process.env[bundle.priceIdEnv] : undefined;
  if (!bundle || !priceId) {
    return NextResponse.json({ error: 'invalid-bundle' }, { status: 400 });
  }

  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
  const origin = req.nextUrl.origin;
  const checkout = await stripe.checkout.sessions.create({
    mode: 'payment',
    line_items: [{ price: priceId, quantity: 1 }],
    client_reference_id: session.uid,
    customer_email: session.email,
    metadata: { uid: session.uid, bundle: bundle.key },
    success_url: `${origin}${returnPath}?genie=purchased`,
    cancel_url: `${origin}${returnPath}`,
  });

  return NextResponse.json({ url: checkout.url });
}
