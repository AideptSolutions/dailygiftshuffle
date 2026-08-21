import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { redis } from '@/lib/redis';
import { grantCredits, revokeCredits } from '@/lib/genie/credits';
import { creditsForPriceId } from '@/lib/genie/pricing';
import { stripeEventKey, STRIPE_EVENT_TTL_SECONDS } from '@/lib/genie/keys';

export const dynamic = 'force-dynamic';

// The ONLY credit mint besides the signup grant. Requirements enforced here:
// - Stripe signature over the raw body is the sole authentication.
// - Idempotent per event id (SET NX): a replayed event credits nothing.
// - Credits derive from the line item's PRICE ID via the pricing map; checkout
//   metadata is used for the uid only, never for amounts.
export async function POST(req: NextRequest) {
  const secretKey = process.env.STRIPE_SECRET_KEY;
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!secretKey || !webhookSecret) {
    return NextResponse.json({ error: 'not-configured' }, { status: 503 });
  }

  const stripe = new Stripe(secretKey);
  const signature = req.headers.get('stripe-signature');
  if (!signature) return NextResponse.json({ error: 'no-signature' }, { status: 400 });

  let event: Stripe.Event;
  try {
    event = await stripe.webhooks.constructEventAsync(await req.text(), signature, webhookSecret);
  } catch {
    return NextResponse.json({ error: 'bad-signature' }, { status: 400 });
  }

  // Idempotency gate: first delivery of this event id wins, replays no-op.
  const fresh = await redis.set(stripeEventKey(event.id), '1', {
    nx: true,
    ex: STRIPE_EVENT_TTL_SECONDS,
  });
  if (fresh !== 'OK') return NextResponse.json({ received: true, duplicate: true });

  try {
    if (event.type === 'checkout.session.completed') {
      const session = event.data.object as Stripe.Checkout.Session;
      if (session.payment_status === 'paid') {
        const uid = session.metadata?.uid || session.client_reference_id;
        if (uid) {
          const items = await stripe.checkout.sessions.listLineItems(session.id, { limit: 5 });
          let credits = 0;
          for (const item of items.data) {
            const priceId = typeof item.price === 'string' ? item.price : item.price?.id;
            const c = priceId ? creditsForPriceId(priceId) : null;
            if (c) credits += c * (item.quantity ?? 1);
          }
          if (credits > 0) {
            await grantCredits(uid, credits);
          } else {
            console.error('[stripe] paid session with no recognized price id', session.id);
          }
        }
      }
    } else if (event.type === 'charge.refunded') {
      const charge = event.data.object as Stripe.Charge;
      // Recover the checkout session to learn uid + bundle size.
      const sessions = await stripe.checkout.sessions.list({
        payment_intent: typeof charge.payment_intent === 'string' ? charge.payment_intent : charge.payment_intent?.id,
        limit: 1,
      });
      const session = sessions.data[0];
      const uid = session?.metadata?.uid || session?.client_reference_id;
      if (uid && session) {
        const items = await stripe.checkout.sessions.listLineItems(session.id, { limit: 5 });
        let credits = 0;
        for (const item of items.data) {
          const priceId = typeof item.price === 'string' ? item.price : item.price?.id;
          const c = priceId ? creditsForPriceId(priceId) : null;
          if (c) credits += c * (item.quantity ?? 1);
        }
        if (credits > 0) await revokeCredits(uid, credits);
      }
    }
  } catch (e) {
    // The event key is already claimed; log loudly so the operator can
    // reconcile by hand rather than risking a double grant on retry.
    console.error('[stripe] webhook processing failed after idempotency claim:', event.id, e);
  }

  return NextResponse.json({ received: true });
}
