import { NextRequest, NextResponse } from 'next/server';
import { readAdminProducts, writeAdminProducts, AdminProduct } from '@/lib/admin-store';
import { getCategoryImageUrl, isAmazonCdnUrl } from '@/lib/categoryImages';

function checkAuth(req: NextRequest): boolean {
  return req.cookies.get('admin-auth')?.value === 'true';
}

export async function GET(req: NextRequest) {
  if (!checkAuth(req)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  return NextResponse.json(readAdminProducts());
}

export async function POST(req: NextRequest) {
  if (!checkAuth(req)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const body = await req.json() as Partial<AdminProduct>;
  const now = new Date().toISOString();
  const product: AdminProduct = {
    id: `admin-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
    name: body.name || 'New Product',
    description: body.description || '',
    price: body.price ?? 0,
    priceDisplay: body.priceDisplay || `$${body.price ?? 0}`,
    image: isAmazonCdnUrl(body.image ?? '') ? getCategoryImageUrl(body.tags ?? []) : (body.image || ''),
    rating: body.rating ?? 4.5,
    reviewCount: body.reviewCount ?? 0,
    affiliateUrl: body.affiliateUrl || '',
    asin: body.asin || '',
    recipients: body.recipients || [],
    budgetTier: body.budgetTier || 'under25',
    occasions: body.occasions || [],
    tags: body.tags || [],
    status: body.status || 'draft',
    cranes: body.cranes ?? false,
    createdAt: now,
    updatedAt: now,
  };
  const all = readAdminProducts();
  writeAdminProducts([...all, product]);
  return NextResponse.json(product, { status: 201 });
}
