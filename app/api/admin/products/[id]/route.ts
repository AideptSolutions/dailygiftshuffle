import { NextRequest, NextResponse } from 'next/server';
import { readAdminProducts, writeAdminProducts, AdminProduct } from '@/lib/admin-store';
import { getCategoryImageUrl, isAmazonCdnUrl } from '@/lib/categoryImages';

function checkAuth(req: NextRequest): boolean {
  return req.cookies.get('admin-auth')?.value === 'true';
}

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  if (!checkAuth(req)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const updates = await req.json() as Partial<AdminProduct>;
  const all = readAdminProducts();
  const idx = all.findIndex(p => p.id === params.id);
  if (idx === -1) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  // Strip Amazon CDN images if submitted via form — replace with category icon
  if (updates.image !== undefined && isAmazonCdnUrl(updates.image)) {
    updates.image = getCategoryImageUrl([...(updates.tags ?? []), ...(all[idx].tags ?? [])]);
  }
  all[idx] = { ...all[idx], ...updates, updatedAt: new Date().toISOString() };
  writeAdminProducts(all);
  return NextResponse.json(all[idx]);
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  if (!checkAuth(req)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const all = readAdminProducts();
  const filtered = all.filter(p => p.id !== params.id);
  if (filtered.length === all.length) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  writeAdminProducts(filtered);
  return NextResponse.json({ deleted: params.id });
}
