// Which rating the site shows and ranks by.
//
//   'amazon'      The old behaviour: stars and review counts stored in the
//                 catalog (originally from Amazon and other stores).
//   'staged'      The GiftShuffle rating everywhere EXCEPT the protected
//                 pages below, which keep the old behaviour. Used to measure
//                 the effect before the earning pages change.
//   'giftshuffle' The GiftShuffle rating everywhere.
//
// This one constant is the switch. It decides the stars on product cards
// (components/RatingSlot.tsx), the order and filters of every guide
// (lib/giftRank.ts, lib/giftSelect.ts) and the rating markup for search
// engines (lib/ratingMarkup.ts). See content-drafts/giftshuffle-score-plan-
// 2026-11.md for the plan and lib/giftRating.ts for the rating itself.
//
// Keep this file free of imports: client components load it.

export type RatingMode = 'amazon' | 'staged' | 'giftshuffle';

export const RATING_MODE: RatingMode = 'amazon';

/**
 * Pages that earn search clicks or AI citations today. In 'staged' mode they
 * keep the old stars and the old ranking. Same list as "Protected titles and
 * descriptions" in CLAUDE.md, plus the homepage.
 */
export const PROTECTED_PATHS: ReadonlySet<string> = new Set([
  '/',
  '/stocking-stuffers',
  '/stocking-stuffers-for-her',
  '/stocking-stuffers-for-him',
  '/stocking-stuffers-for-kids',
  '/stocking-stuffers-for-mom',
  '/stocking-stuffers-for-dad',
  '/stocking-stuffers-under-10',
  '/gifts-for-a-crush',
  '/luxury-gifts-under-50',
  '/gifts-for-girlfriend',
  '/white-elephant-gifts',
  '/best-birthday-gifts-2026',
  '/birthday-gift-ideas',
  '/luxury-gifts-under-200',
  '/gift-ideas-for-teens',
  '/christmas-gifts-for-her',
  '/best-gaming-gifts-2026',
  '/halloween-party-gifts',
  '/category/fitness',
]);

/**
 * True when the page at `path` should show and rank by the GiftShuffle
 * rating. With no path (shared code that does not know its page) 'staged'
 * counts as on, since most pages are.
 */
export function usesGiftRating(path?: string | null, mode: RatingMode = RATING_MODE): boolean {
  if (mode === 'giftshuffle') return true;
  if (mode === 'amazon') return false;
  if (!path) return true;
  const clean = path.length > 1 ? path.replace(/\/+$/, '') : path;
  return !PROTECTED_PATHS.has(clean);
}

// The numbers a list ranks and filters by, for code that runs in the browser.
// The stand-ins (rankRating, rankReviews) are worked out on the server in
// lib/giftRank.ts and travel on each product; these only choose between
// them and the stored values. Server code uses lib/giftRank.ts instead.
interface RankFields {
  rating?: number;
  reviewCount?: number;
  rankRating?: number;
  rankReviews?: number;
}

export function rankRatingOf(p: RankFields, path?: string | null): number {
  return (usesGiftRating(path) ? p.rankRating ?? p.rating : p.rating) ?? 0;
}

export function rankReviewsOf(p: RankFields, path?: string | null): number {
  return (usesGiftRating(path) ? p.rankReviews ?? p.reviewCount : p.reviewCount) ?? 0;
}
