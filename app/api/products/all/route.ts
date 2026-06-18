import { NextResponse } from 'next/server';
import { getPublishedAdminProducts } from '@/lib/admin-store';
import { getCategoryImageUrl } from '@/lib/categoryImages';

export const dynamic = 'force-dynamic';

export async function GET() {
  // Exclude Crane's List items (personal shopping list, not gift-catalog
  // products) from the public shuffle. Catches both the `cranes` flag and the
  // `crane-` id prefix (older entries that predate the flag). They remain on
  // the /cranes page.
  const adminProducts = (await getPublishedAdminProducts())
    .filter(p => !p.cranes && !/^crane-/i.test(p.id));

  const normalized = adminProducts.map(p => ({
    id: p.id,
    name: p.name,
    description: p.description,
    price: p.price,
    priceDisplay: p.priceDisplay,
    image: p.image || getCategoryImageUrl(p.tags ?? []),
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
