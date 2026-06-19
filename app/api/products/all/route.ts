import { NextResponse } from 'next/server';
import { getPublishedAdminProducts } from '@/lib/admin-store';
import { getCategoryImageUrl } from '@/lib/categoryImages';
import { products as recipientCatalog } from '@/data/products';
import productCatalog from '@/data/products-catalog';

export const dynamic = 'force-dynamic';

// The public feed that powers the shuffle, search, and home-featured surfaces.
// It merges BOTH static catalogs (the high-quality, image-verified gift catalog)
// with the admin/Redis products, deduped. The static catalog comes first so its
// cleaner data wins on any duplicate, and the admin products add unique items.
// Crane's List entries (a personal shopping list) stay excluded.

interface FeedProduct {
  id: string;
  name: string;
  description: string;
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
  };
}

export async function GET() {
  const adminProducts = (await getPublishedAdminProducts())
    .filter((p) => !p.cranes && !/^crane-/i.test(p.id))
    .map((p) => ({ ...p, image: p.image || getCategoryImageUrl(p.tags ?? []) }));

  const merged: FeedProduct[] = [];
  const seen = new Set<string>();
  // Order matters: recipient catalog, then niche catalog, then admin.
  for (const p of [...recipientCatalog, ...productCatalog, ...adminProducts] as any[]) {
    if (!p?.affiliateUrl || !p?.image) continue;
    const key = dedupKey(p);
    if (key && seen.has(key)) continue;
    if (key) seen.add(key);
    merged.push(normalize(p));
  }

  return NextResponse.json(merged);
}
