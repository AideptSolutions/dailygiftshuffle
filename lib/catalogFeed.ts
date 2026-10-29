// The single server-side source for the full merged catalog: both static
// catalogs plus published admin/Redis products, deduped (static data wins).
// Extracted from app/api/products/all/route.ts so the public feed route and
// the Gift Genie candidate pre-filter share one definition of "the catalog".

import { getPublishedAdminProducts } from '@/lib/admin-store';
import { getCategoryImageUrl } from '@/lib/categoryImages';
import { products as recipientCatalog } from '@/data/products';
import productCatalog from '@/data/products-catalog';

export interface FeedProduct {
  id: string;
  name: string;
  description: string;
  why?: string;
  price: number;
  priceDisplay: string;
  image: string;
  rating: number;
  reviewCount: number;
  affiliateUrl: string;
  recipients: string[];
  budgetTier: string;
  occasions?: string[];
  tags?: string[];
  // Merchant network, for future non-Amazon vendors. Absent = amazon.
  network?: string;
}

const asinOf = (url = ''): string => (url.match(/\/dp\/([A-Z0-9]{10})/)?.[1] ?? '').toUpperCase();
const nameKey = (name = ''): string => name.toLowerCase().replace(/[^a-z0-9]/g, '').slice(0, 40);
const dedupKey = (p: { affiliateUrl?: string; name?: string }): string =>
  asinOf(p.affiliateUrl) || nameKey(p.name);

/* eslint-disable @typescript-eslint/no-explicit-any */
function normalize(p: any): FeedProduct {
  return {
    id: p.id,
    name: p.name,
    description: p.description,
    why: p.why,
    price: p.price,
    priceDisplay: p.priceDisplay,
    image: p.image,
    rating: p.rating,
    reviewCount: p.reviewCount,
    affiliateUrl: p.affiliateUrl,
    recipients: p.recipients ?? [],
    budgetTier: p.budgetTier,
    occasions: p.occasions,
    tags: p.tags,
    network: p.network,
  };
}

export interface CatalogWithAliases {
  products: FeedProduct[];
  /** id of a dropped duplicate -> id of the copy the feed kept. Surfaces that
   *  render a duplicate under its own id (admin products on the homepage,
   *  catalog entries in guides) still produce pins the Genie can resolve. */
  aliases: Record<string, string>;
}

export async function getFullCatalog(): Promise<FeedProduct[]> {
  return (await getFullCatalogWithAliases()).products;
}

// Crane's List entries (a personal shopping list) stay excluded.
export async function getFullCatalogWithAliases(): Promise<CatalogWithAliases> {
  const adminProducts = (await getPublishedAdminProducts())
    .filter((p) => !p.cranes && !/^crane-/i.test(p.id))
    .map((p) => ({ ...p, image: p.image || getCategoryImageUrl(p.tags ?? []) }));

  const merged: FeedProduct[] = [];
  const keptIdByKey = new Map<string, string>();
  const aliases: Record<string, string> = {};
  // Order matters: recipient catalog, then niche catalog, then admin.
  for (const p of [...recipientCatalog, ...productCatalog, ...adminProducts] as any[]) {
    if (!p?.affiliateUrl || !p?.image) continue;
    const key = dedupKey(p);
    const kept = key ? keptIdByKey.get(key) : undefined;
    if (kept) {
      if (p.id !== kept) aliases[p.id] = kept;
      continue;
    }
    if (key) keptIdByKey.set(key, p.id);
    merged.push(normalize(p));
  }
  return { products: merged, aliases };
}
