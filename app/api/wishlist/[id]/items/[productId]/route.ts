import { NextResponse } from 'next/server';
import { redis, wishlistKey, ShareableWishlist } from '@/lib/redis';

// DELETE /api/wishlist/[id]/items/[productId]
export async function DELETE(
  request: Request,
  { params }: { params: { id: string; productId: string } }
) {
  try {
    const authHeader = request.headers.get('Authorization');
    const ownerToken = authHeader?.replace('Bearer ', '').trim();
    if (!ownerToken) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const raw = await redis.get(wishlistKey(params.id));
    if (!raw) {
      return NextResponse.json({ error: 'Not found' }, { status: 404 });
    }
    const wishlist: ShareableWishlist =
      typeof raw === 'string' ? JSON.parse(raw) : (raw as ShareableWishlist);

    if (wishlist.ownerToken !== ownerToken) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    const updated: ShareableWishlist = {
      ...wishlist,
      items: wishlist.items.filter((item) => item.productId !== params.productId),
      updatedAt: new Date().toISOString(),
    };

    await redis.set(wishlistKey(params.id), JSON.stringify(updated), { ex: 60 * 60 * 24 * 365 });
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('DELETE /api/wishlist/[id]/items/[productId] error:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
