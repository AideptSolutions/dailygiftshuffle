import { Redis } from '@upstash/redis';

export const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL!,
  token: process.env.UPSTASH_REDIS_REST_TOKEN!,
});

export interface ShareableWishlistItem {
  productId: string;
  name: string;
  image: string;
  price: string;
  affiliateUrl: string;
  hint?: string;
}

export interface ShareableWishlist {
  id: string;
  title: string;
  ownerToken: string;
  items: ShareableWishlistItem[];
  createdAt: string;
  updatedAt: string;
}

export function wishlistKey(id: string) {
  return `wishlist:${id}`;
}
