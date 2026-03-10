import { BudgetTier, NicheTag, Occasion, Recipient } from '@/data/products';
import { redis } from '@/lib/redis';

export interface AdminProduct {
  id: string;
  name: string;
  description: string;
  price: number;
  priceDisplay: string;
  image: string;
  rating: number;
  reviewCount: number;
  affiliateUrl: string;
  asin: string;
  recipients: Recipient[];
  budgetTier: BudgetTier;
  occasions: Occasion[];
  tags: NicheTag[];
  status: 'draft' | 'published';
  cranes?: boolean;
  createdAt: string;
  updatedAt: string;
}

const REDIS_KEY = 'admin:products';

export async function readAdminProducts(): Promise<AdminProduct[]> {
  try {
    const raw = await redis.get<AdminProduct[]>(REDIS_KEY);
    if (raw) return raw;
    // Redis empty — seed from bundled JSON (first deploy bootstrap)
    const seed = await seedFromJson();
    return seed;
  } catch (err) {
    console.error('[admin-store] Redis read failed, falling back to JSON:', err);
    return loadFromJson();
  }
}

export async function writeAdminProducts(products: AdminProduct[]): Promise<void> {
  await redis.set(REDIS_KEY, products);
}

export async function getPublishedAdminProducts(): Promise<AdminProduct[]> {
  const all = await readAdminProducts();
  return all.filter(p => p.status === 'published');
}

// ─── JSON bootstrap helpers (local dev + first-run seeding) ─────────────────

function loadFromJson(): AdminProduct[] {
  try {
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    return require('../data/admin-products.json') as AdminProduct[];
  } catch {
    return [];
  }
}

async function seedFromJson(): Promise<AdminProduct[]> {
  const products = loadFromJson();
  if (products.length > 0) {
    try {
      await redis.set(REDIS_KEY, products);
      console.log(`[admin-store] Seeded ${products.length} products from JSON into Redis`);
    } catch (err) {
      console.error('[admin-store] Seed write failed:', err);
    }
  }
  return products;
}
