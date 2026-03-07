import type { Metadata } from 'next';
import WishlistClient from './WishlistClient';

export const metadata: Metadata = {
  title: 'My Wishlist — DailyGiftShuffle',
  description: 'View your saved gift ideas.',
};

export default function WishlistPage() {
  return <WishlistClient />;
}
