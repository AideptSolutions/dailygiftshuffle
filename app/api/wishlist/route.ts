import { NextResponse } from 'next/server';
import { nanoid } from 'nanoid';
import { redis, wishlistKey, ShareableWishlist, ShareableWishlistItem } from '@/lib/redis';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { ownerToken, title, items } = body as {
      ownerToken: string;
      title?: string;
      items?: ShareableWishlistItem[];
    };

    if (!ownerToken) {
      return NextResponse.json({ error: 'ownerToken required' }, { status: 400 });
    }

    const id = nanoid(8);
    const now = new Date().toISOString();
    const wishlist: ShareableWishlist = {
      id,
      title: title ?? 'My Gift Wishlist',
      ownerToken,
      items: items ?? [],
      createdAt: now,
      updatedAt: now,
    };

    await redis.set(wishlistKey(id), JSON.stringify(wishlist), { ex: 60 * 60 * 24 * 365 }); // 1 year TTL

    return NextResponse.json({ id, ownerToken });
  } catch (err) {
    console.error('POST /api/wishlist error:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
