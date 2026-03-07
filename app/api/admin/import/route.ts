import { NextRequest, NextResponse } from 'next/server';
import { parseAmazonUrl, fetchAmazonMeta } from '@/lib/asin-parser';
import { readAdminProducts, writeAdminProducts, AdminProduct } from '@/lib/admin-store';

function checkAuth(req: NextRequest): boolean {
  const cookie = req.cookies.get('admin-auth');
  return cookie?.value === 'true';
}

export async function POST(req: NextRequest) {
  if (!checkAuth(req)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const body = await req.json() as { urls: string[]; tags?: string[]; recipients?: string[]; budgetTier?: string; cranes?: boolean };
  const { urls, tags = [], recipients = [], budgetTier = 'under25', cranes = false } = body;
  if (!urls?.length) return NextResponse.json({ error: 'No URLs provided' }, { status: 400 });

  const results: AdminProduct[] = [];
  const now = new Date().toISOString();

  for (const rawUrl of urls) {
    const url = rawUrl.trim();
    if (!url) continue;

    const { asin, tag, cleanUrl } = parseAmazonUrl(url);

    // Try to fetch Amazon metadata (graceful fallback if blocked)
    const meta = asin ? await fetchAmazonMeta(asin) : { title: '', image: '', price: '' };

    const product: AdminProduct = {
      id: `admin-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
      name: meta.title || (asin ? `Product ${asin}` : 'New Product'),
      description: '',
      price: meta.price ? parseFloat(meta.price) : 0,
      priceDisplay: meta.price ? `$${meta.price}` : '',
      image: meta.image || '',
      rating: 4.5,
      reviewCount: 0,
      affiliateUrl: cleanUrl,
      asin: asin || '',
      recipients: recipients as AdminProduct['recipients'],
      budgetTier: budgetTier as AdminProduct['budgetTier'],
      occasions: [],
      tags: tags as AdminProduct['tags'],
      status: 'draft',
      cranes,
      createdAt: now,
      updatedAt: now,
    };

    results.push(product);
  }

  // Save to store
  const existing = readAdminProducts();
  writeAdminProducts([...existing, ...results]);

  return NextResponse.json({ imported: results });
}
