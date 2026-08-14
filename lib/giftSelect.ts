// Shared product-selection helpers for the SEO gift-guide landing pages.
//
// Two catalogs feed the public surfaces: data/products.ts (recipient/occasion
// catalog) and data/products-catalog.ts (the niche-tagged category catalog). For
// a "best [X] gifts" page we want the strongest picks across BOTH, deduped, with
// consumable/filler items removed so the list reads like an editor curated it.

import { products as recipientProducts } from '@/data/products';
import catalog from '@/data/products-catalog';
import type { CompactProduct } from '@/components/ProductCard';

export interface AnyProduct {
  id: string;
  name: string;
  description?: string;
  why?: string;
  price: number;
  priceDisplay: string;
  image: string;
  rating: number;
  reviewCount: number;
  affiliateUrl: string;
  recipients?: string[];
  tags?: string[];
  occasions?: string[];
  budgetTier?: string;
}

// The recipient catalog (data/products.ts) is a single clean source with rich
// copy: the default pool for every guide. Drawing from one catalog avoids the
// same real product appearing twice under different ids.
export const RECIPIENT: AnyProduct[] = recipientProducts as AnyProduct[];

// Combined pool for the few guides that need the category catalog's depth
// (gaming, camping). Dedupe by id AND by normalized name so a product listed in
// both catalogs (e.g. a Stanley tumbler) is not shown twice.
const norm = (s: string) => s.toLowerCase().replace(/[^a-z0-9]/g, '');
const seenId = new Set<string>();
const seenName = new Set<string>();
export const ALL: AnyProduct[] = [];
for (const p of [...recipientProducts, ...catalog] as AnyProduct[]) {
  const nameKey = norm(p.name);
  if (seenId.has(p.id) || seenName.has(nameKey)) continue;
  seenId.add(p.id);
  seenName.add(nameKey);
  ALL.push(p);
}

// Items that win on review volume but are not giftable headliners.
const DEFAULT_EXCLUDE_RECIPIENTS = ['baby', 'pets'];
const DEFAULT_EXCLUDE_TAGS = ['parenting'];

export interface CurateOpts {
  /** Predicate selecting the candidate pool (e.g. tag/recipient/occasion test). */
  match: (p: AnyProduct) => boolean;
  /** 'social' = rating x log10(reviews) (best-sellers); 'rating' = top rated first. */
  sort?: 'social' | 'rating';
  minRating?: number;
  minPrice?: number;
  excludeRecipients?: string[];
  excludeTags?: string[];
  /** Cap per primary recipient so one audience cannot dominate the grid. */
  recipientCap?: number;
  limit?: number;
  /** Pool to draw from. Defaults to the combined ALL pool. */
  pool?: AnyProduct[];
  /**
   * Tags to favour on this page. Raw review count rewards mass-market
   * electronics and appliances, which are poor answers to "a gift for her".
   * Boosting the on-theme categories keeps the grid gift-shaped without
   * hard-excluding a genuinely great pick from another category.
   */
  preferTags?: string[];
  /** Tags to push down (still eligible, just ranked behind everything else). */
  deprioritizeTags?: string[];
}

const AFFINITY_BOOST = 1.6;
const AFFINITY_PENALTY = 0.45;

const baseScore = (p: AnyProduct) => p.rating * Math.log10(p.reviewCount + 10);

const score = (p: AnyProduct, prefer?: Set<string>, demote?: Set<string>) => {
  const s = baseScore(p);
  if (!prefer?.size && !demote?.size) return s;
  const tags = p.tags ?? [];
  // Demote wins over prefer: many products carry several tags (a Le Creuset is
  // both 'kitchen' and 'luxury'), and an explicit "not on this page" signal
  // should not be overridden by an incidental on-theme tag.
  if (demote?.size && tags.some((t) => demote.has(t))) return s * AFFINITY_PENALTY;
  if (prefer?.size && tags.some((t) => prefer.has(t))) return s * AFFINITY_BOOST;
  return s;
};

// Collapse near-duplicate variants of the same product (e.g. two Le Creuset
// dutch ovens, or a tumbler in two sizes) so a single guide never shows the same
// thing twice. Drop marketing filler + size/number tokens, then key on the first
// few meaningful words (brand + product type).
const FILLER = new Set([
  'the', 'a', 'an', 'with', 'and', 'set', 'pack', 'count', 'piece', 'pc', 'pcs', 'kit',
  'signature', 'classic', 'pro', 'plus', 'premium', 'deluxe', 'original', 'new', 'edition',
  'round', 'oz', 'qt', 'quart', 'inch', 'in', 'ct', 'gen', 'series', 'size', 'large', 'small',
]);
const variantKey = (name: string) => {
  const tokens = name
    .toLowerCase()
    .replace(/\([^)]*\)/g, ' ')
    .split(/[^a-z0-9]+/)
    .filter((t) => t && !FILLER.has(t) && !/^\d/.test(t));
  return tokens.slice(0, 3).join(' ');
};

export function curate(opts: CurateOpts): CompactProduct[] {
  const {
    match,
    sort = 'social',
    minRating = 4.5,
    minPrice = 0,
    excludeRecipients = DEFAULT_EXCLUDE_RECIPIENTS,
    excludeTags = DEFAULT_EXCLUDE_TAGS,
    recipientCap = 6,
    limit = 30,
    pool = RECIPIENT,
    preferTags,
    deprioritizeTags,
  } = opts;

  const exR = new Set(excludeRecipients);
  const exT = new Set(excludeTags);
  const prefer = preferTags ? new Set(preferTags) : undefined;
  const demote = deprioritizeTags ? new Set(deprioritizeTags) : undefined;

  const ranked = pool
    .filter(
      (p) =>
        p.rating >= minRating &&
        p.price >= minPrice &&
        !(p.recipients ?? []).some((r) => exR.has(r)) &&
        !(p.tags ?? []).some((t) => exT.has(t)) &&
        match(p),
    )
    .sort((a, b) =>
      sort === 'rating'
        ? b.rating - a.rating || b.reviewCount - a.reviewCount
        : score(b, prefer, demote) - score(a, prefer, demote),
    );

  const perRecipient: Record<string, number> = {};
  const seenVariant = new Set<string>();
  const out: CompactProduct[] = [];
  for (const p of ranked) {
    const vk = variantKey(p.name);
    if (vk && seenVariant.has(vk)) continue;
    const key = p.recipients?.[0] ?? 'any';
    if ((perRecipient[key] ?? 0) >= recipientCap) continue;
    seenVariant.add(vk);
    perRecipient[key] = (perRecipient[key] ?? 0) + 1;
    out.push(p as CompactProduct);
    if (out.length >= limit) break;
  }
  return out;
}

/** Wider pool for the shuffle widget: same match, looser caps, more items. */
export function shufflePool(match: (p: AnyProduct) => boolean, pool: AnyProduct[] = RECIPIENT): CompactProduct[] {
  return pool.filter((p) => p.rating >= 4.3 && match(p)) as CompactProduct[];
}
