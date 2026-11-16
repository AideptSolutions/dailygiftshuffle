// Ranking values for the GiftShuffle rating.
//
// Every guide was written to rank and filter on two numbers: a star rating
// around 4.3 to 4.9 and a review count from tens to hundreds of thousands
// (for example "rating at least 4.5 and 500 reviews", or the best-seller
// score rating x log10(reviews)). The GiftShuffle rating runs on a different
// scale (about 2 to 5, median 3.4) and has no review count.
//
// Rather than rewrite seventy pages of thresholds, each product gets two
// stand-in numbers on the OLD scales, assigned by rank: the product with the
// best GiftShuffle rating gets the best old-scale rating and the largest
// old-scale count, the median product gets the median of each, and so on.
// Every existing threshold then keeps roughly the share of the catalog it
// always did, while the order comes entirely from the GiftShuffle rating.
// These stand-ins are for ranking only and are never shown.
//
// rankRating() and rankReviews() return the stand-ins when the page uses the
// GiftShuffle rating (lib/ratingMode.ts) and the stored values otherwise.

import { products as recipientProducts } from '@/data/products';
import catalog from '@/data/products-catalog';
import { seasonalProducts } from '@/data/seasonal-products';
import { giftRating } from '@/lib/giftRating';
import { RATING_MODE, usesGiftRating } from '@/lib/ratingMode';

interface Rankable {
  id: string;
  rating: number;
  reviewCount: number;
  gsRating?: number | null;
  rankRating?: number;
  rankReviews?: number;
}

const everything = [...recipientProducts, ...catalog, ...seasonalProducts] as unknown as Rankable[];

const asc = (a: number, b: number) => a - b;
const oldRatings = everything.map((p) => p.rating).filter((r) => r > 0).sort(asc);
const oldReviews = everything.map((p) => p.reviewCount).filter((r) => r > 0).sort(asc);

// One row per product id (the same id can sit in two catalogs).
const ids = Array.from(new Set(everything.map((p) => p.id)));
const order = ids
  .map((id) => ({ id, gs: giftRating(id) ?? 0 }))
  .sort((a, b) => a.gs - b.gs || (a.id < b.id ? -1 : 1));

const standIn = new Map<string, { rating: number; reviews: number; gs: number | null }>();
order.forEach((row, i) => {
  // Products that share a GiftShuffle rating share a stand-in: use the middle
  // of their run so ties stay ties.
  let lo = i;
  let hi = i;
  while (lo > 0 && order[lo - 1].gs === row.gs) lo--;
  while (hi < order.length - 1 && order[hi + 1].gs === row.gs) hi++;
  const at = order.length > 1 ? (lo + hi) / 2 / (order.length - 1) : 1;
  const pick = (sorted: number[]) => (sorted.length ? sorted[Math.round(at * (sorted.length - 1))] : 0);
  const rated = giftRating(row.id) !== null;
  standIn.set(row.id, { rating: rated ? pick(oldRatings) : 0, reviews: rated ? pick(oldReviews) : 0, gs: giftRating(row.id) });
});

// Put the values on the product objects too, so they travel to the browser
// with the product (cards, the feed) without the browser loading this file.
// Skipped while the switch is off, so pages carry no extra data until then.
if (RATING_MODE !== 'amazon') {
  for (const p of everything) {
    const s = standIn.get(p.id);
    p.gsRating = s?.gs ?? null;
    p.rankRating = s?.rating ?? 0;
    p.rankReviews = s?.reviews ?? 0;
  }
}

/** The rating to rank or filter by on the page at `page`. */
export function rankRating(p: Rankable, page?: string | null): number {
  if (!usesGiftRating(page)) return p.rating;
  return p.rankRating ?? standIn.get(p.id)?.rating ?? p.rating;
}

/** The review count to rank or filter by on the page at `page`. */
export function rankReviews(p: Rankable, page?: string | null): number {
  if (!usesGiftRating(page)) return p.reviewCount;
  return p.rankReviews ?? standIn.get(p.id)?.reviews ?? p.reviewCount;
}
