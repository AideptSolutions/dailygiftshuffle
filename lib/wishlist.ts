import { Product } from '@/data/products';

const WISHLIST_KEY = 'dgs_wishlist';

interface WishlistData {
  email: string;
  items: Product[];
}

export function getWishlist(): WishlistData | null {
  if (typeof window === 'undefined') return null;
  try {
    const raw = localStorage.getItem(WISHLIST_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function addToWishlist(email: string, product: Product): void {
  if (typeof window === 'undefined') return;
  const current = getWishlist();
  const items = current?.items ?? [];
  const alreadyExists = items.some((p) => p.id === product.id);
  if (!alreadyExists) {
    items.push(product);
  }
  localStorage.setItem(WISHLIST_KEY, JSON.stringify({ email, items }));
}

export function removeFromWishlist(productId: string): void {
  if (typeof window === 'undefined') return;
  const current = getWishlist();
  if (!current) return;
  const items = current.items.filter((p) => p.id !== productId);
  localStorage.setItem(WISHLIST_KEY, JSON.stringify({ ...current, items }));
}

export function getWishlistCount(): number {
  const wl = getWishlist();
  return wl?.items?.length ?? 0;
}
