import { NextResponse } from 'next/server';
import { redis, wishlistKey, ShareableWishlist, ShareableWishlistItem } from '@/lib/redis';

// GET /api/wishlist/[id] — public
export async function GET(
  _request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const raw = await redis.get(wishlistKey(params.id));
    if (!raw) {
      return NextResponse.json({ error: 'Not found' }, { status: 404 });
    }
    const wishlist: ShareableWishlist =
      typeof raw === 'string' ? JSON.parse(raw) : (raw as ShareableWishlist);
    // Never expose ownerToken to public
    const { ownerToken: _, ...publicData } = wishlist;
    return NextResponse.json(publicData);
  } catch (err) {
    console.error('GET /api/wishlist/[id] error:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// PUT /api/wishlist/[id] — update items/title (requires Authorization: Bearer <ownerToken>)
export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
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

    const body = await request.json();
    const updated: ShareableWishlist = {
      ...wishlist,
      title: body.title ?? wishlist.title,
      items: (body.items as ShareableWishlistItem[]) ?? wishlist.items,
      updatedAt: new Date().toISOString(),
    };

    await redis.set(wishlistKey(params.id), JSON.stringify(updated), { ex: 60 * 60 * 24 * 365 });
    const { ownerToken: _, ...publicData } = updated;
    return NextResponse.json(publicData);
  } catch (err) {
    console.error('PUT /api/wishlist/[id] error:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
