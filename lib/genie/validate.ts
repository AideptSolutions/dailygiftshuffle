// Server-side validation of the model's output: the injection-containment
// boundary. Whatever the model says, what leaves this function is exactly 5
// real catalog products, at most 3 of them pinned, with clamped numbers and
// truncated strings. Worst case under any prompt injection: odd gift picks.

import type { FeedProduct } from '@/lib/catalogFeed';
import { baseScore, type AnyProduct } from '@/lib/giftSelect';
import type { CandidateSet } from '@/lib/genie/candidates';
import type { GenieRawOutput } from '@/lib/genie/provider';

export interface ValidatedPick {
  product: FeedProduct;
  confidence: number;
  reason: string;
  pinned: boolean;
}

export interface ValidatedResult {
  recipientProfile: string;
  picks: ValidatedPick[];
}

const PICK_COUNT = 5;
const MAX_PINNED = 3;
const FALLBACK_REASON = 'A top-rated match for your answers.';

const clampInt = (v: unknown, lo: number, hi: number, dflt: number) => {
  const n = Math.round(Number(v));
  if (!Number.isFinite(n)) return dflt;
  return Math.min(hi, Math.max(lo, n));
};

const cleanText = (v: unknown, max: number) =>
  String(v ?? '').replace(/\s+/g, ' ').trim().slice(0, max);

export function validateOutput(raw: GenieRawOutput, candidates: CandidateSet): ValidatedResult {
  const pinnedIds = new Set(candidates.pinned.map((p) => p.id));

  // Keep only picks whose productId exists in the candidate set; dedupe.
  const seen = new Set<string>();
  let picks: ValidatedPick[] = [];
  for (const p of Array.isArray(raw?.picks) ? raw.picks : []) {
    const product = candidates.byId.get(String(p?.productId));
    if (!product || seen.has(product.id)) continue;
    seen.add(product.id);
    picks.push({
      product,
      confidence: clampInt(p?.confidence, 0, 100, 60),
      reason: cleanText(p?.reason, 140) || FALLBACK_REASON,
      pinned: pinnedIds.has(product.id),
    });
  }

  // Enforce max 3 pinned: drop the lowest-confidence pinned picks.
  const pinnedPicks = picks.filter((p) => p.pinned);
  if (pinnedPicks.length > MAX_PINNED) {
    const toDrop = new Set(
      pinnedPicks
        .sort((a, b) => a.confidence - b.confidence)
        .slice(0, pinnedPicks.length - MAX_PINNED)
        .map((p) => p.product.id),
    );
    picks = picks.filter((p) => !toDrop.has(p.product.id));
  }

  picks = picks.slice(0, PICK_COUNT);

  // Backfill deterministically from the top-scored non-pinned candidates.
  if (picks.length < PICK_COUNT) {
    const fill = [...candidates.discoveries]
      .filter((p) => !seen.has(p.id))
      .sort((a, b) => baseScore(b as AnyProduct) - baseScore(a as AnyProduct));
    for (const product of fill) {
      if (picks.length >= PICK_COUNT) break;
      seen.add(product.id);
      picks.push({ product, confidence: 55, reason: FALLBACK_REASON, pinned: false });
    }
  }

  picks.sort((a, b) => b.confidence - a.confidence);

  return {
    recipientProfile:
      cleanText(raw?.recipientProfile, 600) ||
      'A person of excellent taste, judging by these picks.',
    picks,
  };
}

// Full deterministic fallback when the provider fails twice: top pinned by
// score (max 3) + top discoveries. The user always gets 5 real products.
export function deterministicFallback(candidates: CandidateSet): ValidatedResult {
  const byScore = (a: FeedProduct, b: FeedProduct) =>
    baseScore(b as AnyProduct) - baseScore(a as AnyProduct);
  const pinned = [...candidates.pinned].sort(byScore).slice(0, MAX_PINNED);
  const picks: ValidatedPick[] = pinned.map((product, i) => ({
    product,
    confidence: 80 - i * 5,
    reason: 'One of your own pins, and a strong match on paper.',
    pinned: true,
  }));
  for (const product of [...candidates.discoveries].sort(byScore)) {
    if (picks.length >= PICK_COUNT) break;
    picks.push({ product, confidence: 65, reason: FALLBACK_REASON, pinned: false });
  }
  return {
    recipientProfile:
      'The lamp flickered, but the picks below are the strongest matches for your answers.',
    picks,
  };
}
