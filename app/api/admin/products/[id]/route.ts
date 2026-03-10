import { NextRequest, NextResponse } from 'next/server';
import { readAdminProducts, writeAdminProducts, AdminProduct } from '@/lib/admin-store';
import { getCategoryImageUrl, isAmazonCdnUrl } from '@/lib/categoryImages';

function checkAuth(req: NextRequest): boolean {
  return req.cookies.get('admin-auth')?.value === 'true';
}

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  if (!checkAuth(req)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const updates = await req.json() as Partial<AdminProduct>;
  const all = await readAdminProducts();
  const idx = all.findIndex(p => p.id === params.id);
  if (idx === -1) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  if (updates.image !== undefined && isAmazonCdnUrl(updates.image)) {
    updates.image = getCategoryImageUrl([...(updates.tags ?? []), ...(all[idx].tags ?? [])]);
  }
  all[idx] = { ...all[idx], ...updates, updatedAt: new Date().toISOString() };
  await writeAdminProducts(all);
  return NextResponse.json(all[idx]);
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  if (!checkAuth(req)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const all = await readAdminProducts();
  const filtered = all.filter(p => p.id !== params.id);
  if (filtered.length === all.length) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  await writeAdminProducts(filtered);
  return NextResponse.json({ deleted: params.id });
}
