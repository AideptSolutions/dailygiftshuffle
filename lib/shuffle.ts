import { products, Product, BudgetTier, Recipient, Occasion, NicheTag } from '@/data/products';

/** Map composite "myself-*" recipients to fallback pools for products not yet tagged specifically */
function recipientFallbacks(r: Recipient): Recipient[] {
  if (r === 'myself-her') return ['myself-her', 'myself', 'her'];
  if (r === 'myself-him') return ['myself-him', 'myself', 'him'];
  if (r === 'sister') return ['sister', 'her'];
  if (r === 'brother') return ['brother', 'him'];
  return [r];
}

const SHOWN_KEY = 'dgs_shown_ids';

function getShownIds(): string[] {
  if (typeof window === 'undefined') return [];
  try { return JSON.parse(sessionStorage.getItem(SHOWN_KEY) || '[]'); } catch { return []; }
}
function addShownId(id: string): void {
  if (typeof window === 'undefined') return;
  const shown = getShownIds();
  shown.push(id);
  sessionStorage.setItem(SHOWN_KEY, JSON.stringify(shown));
}
export function clearShownIds(): void {
  if (typeof window === 'undefined') return;
  sessionStorage.removeItem(SHOWN_KEY);
}

function pickRandom(pool: Product[], shown: string[]): Product | null {
  let unseen = pool.filter((p) => !shown.includes(p.id));
  if (unseen.length === 0) unseen = pool;
  if (unseen.length === 0) return null;
  return unseen[Math.floor(Math.random() * unseen.length)];
}

// Range tiers map to multiple underlying tiers
const RANGE_TIERS: Partial<Record<BudgetTier, BudgetTier[]>> = {
  under50:  ['under25', '25to50'],
  under150: ['under25', '25to50', '50to100', '100to150'],
};

function matchesBudget(p: Product, budget: BudgetTier): boolean {
  const expanded = RANGE_TIERS[budget];
  if (expanded) return expanded.includes(p.budgetTier);
  return p.budgetTier === budget;
}

/**
 * Pick up to N unique products matching criteria. Used for 4-card shuffle displays.
 */
export function shuffleMany(
  count: number,
  opts: { recipient?: Recipient; budget?: BudgetTier | 'any'; tags?: NicheTag[]; catalog?: Product[] }
): Product[] {
  const catalog_ = opts.catalog ?? products;
  if (!catalog_.length) return [];

  const shown = (() => {
    try { return JSON.parse(sessionStorage.getItem('dgs_shown_multi') || '[]') as string[]; }
    catch { return [] as string[]; }
  })();

  const matches = (p: Product) => {
    if (opts.recipient && !p.recipients.includes(opts.recipient)) return false;
    if (opts.budget && opts.budget !== 'any' && !matchesBudget(p, opts.budget)) return false;
    if (opts.tags?.length && !opts.tags.some(t => p.tags?.includes(t))) return false;
    return true;
  };

  let pool = catalog_.filter(matches);
  if (!pool.length && opts.recipient) pool = catalog_.filter(p => p.recipients.includes(opts.recipient!));
  if (!pool.length) pool = catalog_;

  const unseen = pool.filter(p => !shown.includes(p.id));
  const source = unseen.length >= count ? unseen : pool;

  const picked: Product[] = [];
  const available = [...source];
  while (picked.length < count && available.length > 0) {
    const idx = Math.floor(Math.random() * available.length);
    picked.push(available.splice(idx, 1)[0]);
  }

  const updatedShown = [...shown, ...picked.map(p => p.id)];
  try { sessionStorage.setItem('dgs_shown_multi', JSON.stringify(updatedShown)); } catch {}

  return picked;
}

export function shuffleProduct(
  recipient: Recipient,
  budget: BudgetTier,
  occasion?: Occasion,
  tags?: NicheTag[],
  catalog?: Product[]
): Product | null {
  const catalog_ = catalog ?? products;
  const shown = getShownIds();

  const recipFallbacks = recipientFallbacks(recipient);
  const base = (p: Product) =>
    recipFallbacks.some((r) => p.recipients.includes(r)) && matchesBudget(p, budget);
  const occFilter = (p: Product) =>
    occasion ? (p.occasions?.includes(occasion) ?? false) : true;
  const tagFilter = (p: Product) =>
    tags && tags.length > 0 ? tags.some((t) => p.tags?.includes(t)) : true;

  // Most specific → progressively broader
  let pool = catalog_.filter((p) => base(p) && occFilter(p) && tagFilter(p));
  let pick = pickRandom(pool, shown);
  if (pick) { addShownId(pick.id); return pick; }

  pool = catalog_.filter((p) => base(p) && tagFilter(p));
  pick = pickRandom(pool, shown);
  if (pick) { addShownId(pick.id); return pick; }

  pool = catalog_.filter((p) => base(p));
  pick = pickRandom(pool, shown);
  if (pick) { addShownId(pick.id); return pick; }

  pool = catalog_.filter((p) => matchesBudget(p, budget));
  pick = pickRandom(pool, shown);
  if (pick) { addShownId(pick.id); return pick; }

  return null;
}

export function shuffleByTags(
  tags: NicheTag[],
  budget?: BudgetTier,
  catalog?: Product[]
): Product | null {
  const catalog_ = catalog ?? products;
  const shown = getShownIds();
  let pool = catalog_.filter(
    (p) => tags.some((t) => p.tags?.includes(t)) && (budget ? matchesBudget(p, budget) : true)
  );
  if (pool.length === 0) pool = catalog_.filter((p) => budget ? matchesBudget(p, budget) : true);
  const pick = pickRandom(pool, shown);
  if (pick) { addShownId(pick.id); return pick; }
  return null;
}

export function shuffleMultiple(
  count: number,
  recipient: Recipient | null,
  budget: BudgetTier | 'any',
  occasion?: Occasion | null,
  tags?: NicheTag[],
  catalog?: Product[]
): Product[] {
  const catalog_ = catalog ?? products;
  const shown = getShownIds();

  const fallbacks = recipient ? recipientFallbacks(recipient) : null;
  const base = (p: Product) =>
    fallbacks ? fallbacks.some((r) => p.recipients.includes(r)) : true;
  const budgetFilter = (p: Product) =>
    budget === 'any' ? true : matchesBudget(p, budget as BudgetTier);
  const occFilter = (p: Product) =>
    occasion ? (p.occasions?.includes(occasion) ?? false) : true;
  const tagFilter = (p: Product) =>
    tags && tags.length > 0 ? tags.some((t) => p.tags?.includes(t)) : true;

  // Build pool using cascade: most specific → broader
  let pool: Product[] = [];
  if (budget !== 'any' && occasion) {
    pool = catalog_.filter((p) => base(p) && budgetFilter(p) && occFilter(p) && tagFilter(p));
  }
  if (pool.length < count) {
    const more = catalog_.filter((p) => base(p) && budgetFilter(p) && tagFilter(p) && !pool.includes(p));
    pool = [...pool, ...more];
  }
  if (pool.length < count) {
    const more = catalog_.filter((p) => base(p) && budgetFilter(p) && !pool.includes(p));
    pool = [...pool, ...more];
  }
  if (pool.length < count) {
    const more = catalog_.filter((p) => budgetFilter(p) && !pool.includes(p));
    pool = [...pool, ...more];
  }
  if (pool.length < count) {
    const more = catalog_.filter((p) => !pool.includes(p));
    pool = [...pool, ...more];
  }

  // Prefer unseen products, shuffle, take count
  const unseen = pool.filter((p) => !shown.includes(p.id));
  const seen = pool.filter((p) => shown.includes(p.id));
  const ordered = [...unseen, ...seen];
  // Fisher-Yates shuffle
  for (let i = ordered.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [ordered[i], ordered[j]] = [ordered[j], ordered[i]];
  }

  const picks = ordered.slice(0, count);
  picks.forEach((p) => addShownId(p.id));
  return picks;
}

export function getProductsForSlug(opts: {
  recipients?: Recipient[];
  budgetTier?: BudgetTier;
  tags?: NicheTag[];
  occasions?: Occasion[];
  limit?: number;
  catalog?: Product[];
}): Product[] {
  const catalog_ = opts.catalog ?? products;
  let pool = catalog_.filter((p) => {
    if (opts.recipients?.length && !opts.recipients.some((r) => p.recipients.includes(r))) return false;
    if (opts.budgetTier && !matchesBudget(p, opts.budgetTier)) return false;
    if (opts.tags?.length && !opts.tags.some((t) => p.tags?.includes(t))) return false;
    if (opts.occasions?.length && !opts.occasions.some((o) => p.occasions?.includes(o))) return false;
    return true;
  });
  if (pool.length === 0) pool = catalog_.slice(0, opts.limit ?? 5);
  return pool.slice(0, opts.limit ?? 5);
}
