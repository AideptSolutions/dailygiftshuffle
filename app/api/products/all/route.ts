import { NextResponse } from 'next/server';
import { getPublishedAdminProducts } from '@/lib/admin-store';
import { getCategoryImageUrl, isAmazonCdnUrl } from '@/lib/categoryImages';

/**
 * GET /api/products/all
 * Returns published admin products only.
 * The static placeholder catalog (data/products.ts) is excluded —
 * all real products are managed via the admin panel.
 *
 * Amazon CDN image URLs (m.media-amazon.com) are replaced at runtime with
 * local SVG category icons to comply with Amazon Associates TOS §7.
 */
export async function GET() {
  const adminProducts = getPublishedAdminProducts();

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
