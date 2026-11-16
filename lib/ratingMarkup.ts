// The rating part of a schema.org Product, for the page at `page`.
// Spread it into the Product object: `...ratingMarkup(p, '/my-guide')`.
//
// Old behaviour ('amazon' mode, or a protected page in 'staged' mode): an
// AggregateRating with the stored stars and review count.
//
// GiftShuffle rating: an editorial Review by the site, never an
// AggregateRating. An aggregate rating claims "this is what our customers
// said"; ours is one editorial judgment and has no count, and search engines
// ask that aggregate ratings come from a site's own users.

import { giftRating } from '@/lib/giftRating';
import { usesGiftRating } from '@/lib/ratingMode';

export const RATING_AUTHOR = 'TheGiftShuffle Editorial Staff';

interface Rated {
  id: string;
  rating: number;
  reviewCount: number;
  gsRating?: number | null;
  why?: string;
  description?: string;
}

export function ratingMarkup(p: Rated, page?: string | null) {
  if (!usesGiftRating(page)) {
    return p.rating > 0 && p.reviewCount > 0
      ? { aggregateRating: { '@type': 'AggregateRating', ratingValue: p.rating, reviewCount: p.reviewCount } }
      : {};
  }
  const value = p.gsRating ?? giftRating(p.id);
  if (value == null) return {};
  const body = p.why || p.description;
  return {
    review: {
      '@type': 'Review',
      author: { '@type': 'Organization', name: RATING_AUTHOR },
      reviewRating: { '@type': 'Rating', ratingValue: value, bestRating: 5, worstRating: 1 },
      ...(body ? { reviewBody: body } : {}),
    },
  };
}
