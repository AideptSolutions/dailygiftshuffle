import { NextResponse } from 'next/server';
import { getPublishedAdminProducts } from '@/lib/admin-store';
import { getCategoryImageUrl, isAmazonCdnUrl } from '@/lib/categoryImages';

export const dynamic = 'force-dynamic';

export async function GET() {
  const adminProducts = await getPublishedAdminProducts();

  const normalized = adminProducts.map(p => ({
    id: p.id,
    name: p.name,
    description: p.description,
    price: p.price,
    priceDisplay: p.priceDisplay,
    image: isAmazonCdnUrl(p.image ?? '')
      ? getCategoryImageUrl(p.tags ?? [])
      : (p.image || getCategoryImageUrl(p.tags ?? [])),
    rating: p.rating,
    reviewCount: p.reviewCount,
    affiliateUrl: p.affiliateUrl,
    recipients: p.recipients,
    budgetTier: p.budgetTier,
    occasions: p.occasions,
    tags: p.tags,
  }));

  return NextResponse.json(normalized);
}
