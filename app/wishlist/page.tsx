import type { Metadata } from 'next';
import WishlistClient from './WishlistClient';

export const metadata: Metadata = {
  title: 'My Wishlist: TheGiftShuffle',
  description: 'View your saved gift ideas.',
  // A personal page with nothing for a searcher: kept out of the index and the sitemap.
  robots: { index: false, follow: true },
  alternates: { canonical: 'https://www.thegiftshuffle.com/wishlist' },
};

export default function WishlistPage() {
  return <WishlistClient />;
}
