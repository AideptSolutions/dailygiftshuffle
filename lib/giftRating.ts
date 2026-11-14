// The GiftShuffle rating: the site's own editorial rating of how good a gift
// something is. It is NOT a customer rating and never uses Amazon's stars or
// review counts, which Amazon only allows to be shown when they come from its
// API (and its API returns none for this account).
//
// Each product gets five marks from 1 to 5 in data/gift-ratings.json:
//   [gift, delight, staying power, value, maker track record, risk flags]
// Risk flags are letters: s = needs the right size, x = needs a subscription
// or extra purchase, f = fragile or perishable, o = one fixed style of
// something personal.
//
// rating = (30 x gift + 20 x delight + 20 x staying + 15 x value + 15 x maker)
//          / 100, minus 0.15 per flag (at most 0.5), on a 1 to 5 scale.
//
// The rubric, the anchors for each mark and the switch plan are in
// content-drafts/giftshuffle-score-plan-2026-11.md. To rate a new product,
// add its id and marks to data/gift-ratings.json; nothing needs looking up.

import data from '@/data/gift-ratings.json';

export type GiftMarks = [number, number, number, number, number, string];
const MARKS = data as unknown as Record<string, GiftMarks>;

export const MARK_LABELS = ['Gift', 'Delight', 'Staying power', 'Value', 'Maker'] as const;
const WEIGHTS = [30, 20, 20, 15, 15];
export const FLAG_LABELS: Record<string, string> = {
  s: 'needs the right size',
  x: 'needs an extra purchase',
  f: 'fragile',
  o: 'one fixed style',
};

/** The five marks and flags for a product, or null if it has not been rated. */
export function giftMarks(id: string): GiftMarks | null {
  return MARKS[id] ?? null;
}

/** The rating from 1.0 to 5.0, one decimal, or null if not rated. */
export function giftRating(id: string): number | null {
  const m = MARKS[id];
  if (!m) return null;
  const weighted = WEIGHTS.reduce((sum, w, i) => sum + w * (m[i] as number), 0) / 100;
  const flags = typeof m[5] === 'string' ? m[5].length : 0;
  return Math.round((weighted - Math.min(0.5, 0.15 * flags)) * 10) / 10;
}
