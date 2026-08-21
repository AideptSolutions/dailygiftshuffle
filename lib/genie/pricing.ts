// Genie run bundles. Credits are derived from the Stripe PRICE ID via this
// map, never from client input or checkout metadata, so a tampered field can
// never mint extra runs. Price IDs come from the Stripe dashboard via env.

export interface Bundle {
  key: 's' | 'm' | 'l';
  credits: number;
  label: string;
  usd: string;
  priceIdEnv: string;
}

export const BUNDLES: Bundle[] = [
  { key: 's', credits: 10, label: '10 readings', usd: '$2.99', priceIdEnv: 'STRIPE_PRICE_GENIE_S' },
  { key: 'm', credits: 30, label: '30 readings', usd: '$6.99', priceIdEnv: 'STRIPE_PRICE_GENIE_M' },
  { key: 'l', credits: 100, label: '100 readings', usd: '$14.99', priceIdEnv: 'STRIPE_PRICE_GENIE_L' },
];

export function bundleByKey(key: string): Bundle | undefined {
  return BUNDLES.find((b) => b.key === key);
}

export function creditsForPriceId(priceId: string): number | null {
  for (const b of BUNDLES) {
    if (process.env[b.priceIdEnv] && process.env[b.priceIdEnv] === priceId) return b.credits;
  }
  return null;
}
