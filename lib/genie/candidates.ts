// Candidate pre-filter for a Genie run: choose the ~150 catalog products the
// model is allowed to pick from. Deterministic code owns eligibility and
// quality; the model only supplies the judgment layer on top.

import type { FeedProduct } from '@/lib/catalogFeed';
import { baseScore, variantKey, type AnyProduct } from '@/lib/giftSelect';

export interface GenieQuiz {
  relationship: string; // Recipient enum, validated in the route
  occasion: string;     // Occasion enum, validated in the route
  budget: string;       // BudgetTier enum or 'any', validated in the route
  note?: string;        // free text, capped + sanitized in the route
}

export interface CandidateSet {
  pinned: FeedProduct[];
  discoveries: FeedProduct[];
  byId: Map<string, FeedProduct>;
}

const NON_PIN_LIMIT = 130;
const MIN_RATING = 4.3;
const TAG_CAP = 20;

// Budget windows per tier, expanded 25% both ways so the model may make one
// "slightly over budget but perfect" call.
const BUDGET_WINDOWS: Record<string, [number, number]> = {
  under25:  [0, 25],
  '25to50': [25, 50],
  under50:  [0, 50],
  '50to100': [50, 100],
  '100to150': [100, 150],
  under150: [0, 150],
  '150to250': [150, 250],
  '250plus': [250, Infinity],
};

function budgetWindow(budget: string): [number, number] {
  const w = BUDGET_WINDOWS[budget];
  if (!w) return [0, Infinity];
  const [lo, hi] = w;
  return [lo * 0.75, hi === Infinity ? Infinity : hi * 1.25];
}

const PIN_THEME_BOOST = 1.6;   // mirrors AFFINITY_BOOST in giftSelect
const RELATIONSHIP_BOOST = 1.4;
const OCCASION_BOOST = 1.2;

export function selectCandidates(
  catalog: FeedProduct[],
  pinnedIds: string[],
  quiz: GenieQuiz,
): CandidateSet {
  const byCatalogId = new Map(catalog.map((p) => [p.id, p]));

  // Pins always make the candidate list; unknown/stale ids are dropped.
  const pinned = pinnedIds
    .slice(0, 20)
    .map((id) => byCatalogId.get(id))
    .filter((p): p is FeedProduct => !!p);
  const pinnedIdSet = new Set(pinned.map((p) => p.id));

  // Theme tags: tags shared across the pinned set signal what this recipient
  // is about. With a single pin, its own tags are the theme.
  const tagCounts = new Map<string, number>();
  for (const p of pinned) {
    for (const t of p.tags ?? []) tagCounts.set(t, (tagCounts.get(t) ?? 0) + 1);
  }
  const themeThreshold = pinned.length >= 2 ? 2 : 1;
  const themeTags = new Set(
    Array.from(tagCounts.entries()).filter(([, n]) => n >= themeThreshold).map(([t]) => t),
  );

  const [lo, hi] = budgetWindow(quiz.budget);
  const excludeRecipients = new Set(['baby', 'pets']);
  if (quiz.relationship === 'baby') excludeRecipients.delete('baby');
  if (quiz.relationship === 'pets') excludeRecipients.delete('pets');

  const eligible = catalog.filter((p) => {
    if (pinnedIdSet.has(p.id)) return false;
    if ((p.rating ?? 0) < MIN_RATING) return false;
    if (!(p.price >= lo && p.price <= hi)) return false;
    if ((p.recipients ?? []).some((r) => excludeRecipients.has(r))) return false;
    return true;
  });

  const scored = eligible
    .map((p) => {
      let s = baseScore(p as AnyProduct);
      if ((p.tags ?? []).some((t) => themeTags.has(t))) s *= PIN_THEME_BOOST;
      if ((p.recipients ?? []).includes(quiz.relationship)) s *= RELATIONSHIP_BOOST;
      if ((p.occasions ?? []).includes(quiz.occasion)) s *= OCCASION_BOOST;
      return { p, s };
    })
    .sort((a, b) => b.s - a.s);

  // Dedupe variants (against pins too) and cap any one tag so a single
  // category cannot flood the list.
  const seenVariants = new Set(pinned.map((p) => variantKey(p.name)));
  const tagUse = new Map<string, number>();
  const discoveries: FeedProduct[] = [];
  for (const { p } of scored) {
    if (discoveries.length >= NON_PIN_LIMIT) break;
    const vk = variantKey(p.name);
    if (seenVariants.has(vk)) continue;
    const primaryTag = p.tags?.[0] ?? 'untagged';
    const used = tagUse.get(primaryTag) ?? 0;
    if (used >= TAG_CAP) continue;
    seenVariants.add(vk);
    tagUse.set(primaryTag, used + 1);
    discoveries.push(p);
  }

  // Light shuffle so list order does not leak our ranking to the model.
  for (let i = discoveries.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [discoveries[i], discoveries[j]] = [discoveries[j], discoveries[i]];
  }

  const byId = new Map<string, FeedProduct>();
  for (const p of [...pinned, ...discoveries]) byId.set(p.id, p);
  return { pinned, discoveries, byId };
}
