// Live Amazon prices, layered over the hand-kept catalog.
//
// Why this exists: Amazon lets an Associate show a price only when it comes
// from their API, for at most 24 hours, with the time it was fetched next to
// it. So prices are NOT kept in the repo. A scheduled job
// (scripts/refresh-prices.mjs) reads them from the Creators API once a day and
// stores them in Redis with a 24-hour expiry; the build pulls them into
// data/prices.generated.json (gitignored, see scripts/pull-prices.mjs); this
// module lays them over each product.
//
// A product with a live price shows it with an "as of" time. A product without
// one (no current offer, not served by the API, or the refresh did not run)
// shows "See price on Amazon". The catalog's own `price` is then only a last
// known value used for sorting and budget bands, never shown.
//
// Everything here is deterministic on purpose: the same file gives the same
// result on the server and in the browser, so pages hydrate cleanly. The one
// time-dependent decision (is this price still under 24 hours old?) is made
// by <Price> in the browser and by offerFor() at build time.

import generated from '@/data/prices.generated.json';

export const PRICE_MAX_AGE_MS = 24 * 60 * 60 * 1000;

/** Amazon's required wording for prices that are not refreshed hourly. */
export const PRICE_DISCLAIMER =
  'Product prices and availability are accurate as of the date/time indicated and are subject to change. Any price and availability information displayed on Amazon at the time of purchase will apply to the purchase of this product.';

/** Amazon's required notice for sites that show content from its API. */
export const AMAZON_CONTENT_NOTICE =
  "CERTAIN CONTENT THAT APPEARS ON THIS SITE COMES FROM AMAZON. THIS CONTENT IS PROVIDED 'AS IS' AND IS SUBJECT TO CHANGE OR REMOVAL AT ANY TIME.";

interface PriceFile {
  pulledAt: string | null;
  /** ASIN -> [price in USD, ISO time the API returned it] */
  prices: Record<string, [number, string]>;
}
const FILE = generated as unknown as PriceFile;
const PRICES = FILE.prices ?? {};

const asinOf = (url = ''): string => url.match(/\/dp\/([A-Z0-9]{10})/)?.[1] ?? '';

export const formatPrice = (p: number): string => '$' + (Number.isInteger(p) ? String(p) : p.toFixed(2));

export const tierForPrice = (p: number) =>
  p < 25 ? 'under25' : p < 50 ? '25to50' : p < 100 ? '50to100' : p < 150 ? '100to150' : p < 250 ? '150to250' : '250plus';

/** True while a price fetched at `asOf` may still be shown. */
export function isPriceFresh(asOf?: string | null, now: number = Date.now()): boolean {
  if (!asOf) return false;
  const t = Date.parse(asOf);
  return Number.isFinite(t) && now - t < PRICE_MAX_AGE_MS;
}

/** "Nov 12, 2:05 AM PT". Built from parts so server and browser agree exactly. */
export function formatAsOf(iso: string): string {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return '';
  const parts = new Intl.DateTimeFormat('en-US', {
    timeZone: 'America/Los_Angeles',
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  }).formatToParts(d);
  const get = (type: string) => parts.find((p) => p.type === type)?.value ?? '';
  return `${get('month')} ${get('day')}, ${get('hour')}:${get('minute')} ${get('dayPeriod').toUpperCase()} PT`;
}

/**
 * The live price for a link, for places that hold only a saved copy of a
 * product (a shared wishlist, for example). Their saved price is never shown:
 * it could be months old.
 */
export function livePriceFor(affiliateUrl: string): { priceDisplay: string; priceAsOf?: string } {
  const entry = PRICES[asinOf(affiliateUrl)];
  return entry ? { priceDisplay: formatPrice(entry[0]), priceAsOf: entry[1] } : { priceDisplay: '' };
}

interface Priceable {
  affiliateUrl: string;
  price: number;
  priceDisplay: string;
  budgetTier?: string;
  priceAsOf?: string;
}

/**
 * Lay live prices over a catalog array, in place. Called once at the bottom
 * of each data file. Products with no live price keep their catalog values
 * and get no `priceAsOf`, which is what tells the UI not to show a price.
 */
export function applyLivePrices<T extends Priceable>(list: T[]): T[] {
  for (const p of list) {
    const entry = PRICES[asinOf(p.affiliateUrl)];
    if (!entry) continue;
    const [price, asOf] = entry;
    p.price = price;
    p.priceDisplay = formatPrice(price);
    if (p.budgetTier) p.budgetTier = tierForPrice(price);
    p.priceAsOf = asOf;
  }
  return list;
}

/**
 * The `offers` part of a schema.org Product, only when the price is live.
 * Spread it into the Product object: `...offerFor(p)`. A product without a
 * live price gets no offer rather than a stale or invented one.
 */
export function offerFor(p: { price: number; affiliateUrl: string; priceAsOf?: string }) {
  if (!isPriceFresh(p.priceAsOf)) return {};
  return {
    offers: {
      '@type': 'Offer',
      price: p.price,
      priceCurrency: 'USD',
      url: p.affiliateUrl,
    },
  };
}
