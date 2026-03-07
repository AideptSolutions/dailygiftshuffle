'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import { getWishlist, removeFromWishlist } from '@/lib/wishlist';
import { Product } from '@/data/products';

function StarRating({ rating }: { rating: number }) {
  const full = Math.floor(rating);
  const half = rating % 1 >= 0.5;
  const empty = 5 - full - (half ? 1 : 0);
  return (
    <span className="star-gold text-sm">
      {Array(full).fill('\u2605').join('')}
      {half ? '\u00BD' : ''}
      {Array(empty).fill('\u2606').join('')}
    </span>
  );
}

export default function WishlistClient() {
  const [items, setItems] = useState<Product[]>([]);
  const [email, setEmail] = useState<string>('');
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const wl = getWishlist();
    setItems(wl?.items ?? []);
    setEmail(wl?.email ?? '');
    setLoaded(true);
  }, []);

  const handleRemove = (id: string) => {
    removeFromWishlist(id);
    setItems((prev) => prev.filter((p) => p.id !== id));
    window.dispatchEvent(new Event('wishlist-updated'));
  };

  if (!loaded) return null;

  return (
    <div className="min-h-screen flex flex-col" style={{ background: 'linear-gradient(135deg, #FFFAF5 0%, #fff9e6 100%)' }}>
      <Navbar />
      <main id="main-content" tabIndex={-1} className="flex-1 max-w-2xl mx-auto w-full px-4 py-10">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900">My Wishlist</h1>
            {email && <p className="text-sm text-gray-400 mt-1">Saved for {email}</p>}
          </div>
          <Link href="/shuffle" className="btn-shuffle text-white font-bold px-5 py-2 rounded-full text-sm">
            + Find More
          </Link>
        </div>

        {items.length === 0 ? (
          <div className="bg-white rounded-3xl shadow-sm p-12 text-center">
            <h2 className="text-xl font-bold text-gray-900 mb-2">Your wishlist is empty</h2>
            <p className="text-gray-500 mb-6">
              Start shuffling to discover gifts and save them here!
            </p>
            <Link href="/shuffle" className="btn-shuffle text-white font-bold px-8 py-3 rounded-full inline-block">
              Find a Gift
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {items.map((product) => (
              <div
                key={product.id}
                className="bg-white rounded-2xl shadow-sm flex overflow-hidden border border-[#E2E8F0] hover:shadow-md transition-shadow"
              >
                <div className="relative w-28 h-28 flex-shrink-0 bg-gray-50">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-contain p-3"
                    unoptimized
                  />
                </div>
                <div className="flex-1 p-4 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="font-bold text-gray-900 text-sm leading-tight">{product.name}</h3>
                    <span className="font-extrabold flex-shrink-0 text-sm" style={{ color: '#1A202C' }}>
                      {product.priceDisplay}
                    </span>
                  </div>
                  <div className="flex items-center gap-1 mt-1 mb-2">
                    <StarRating rating={product.rating} />
                    <span className="text-xs text-gray-400">({product.reviewCount.toLocaleString()})</span>
                  </div>
                  <p className="text-xs text-gray-500 line-clamp-2 mb-3">{product.description}</p>
                  <div className="flex gap-2">
                    <a
                      href={product.affiliateUrl}
                      target="_blank"
                      rel="noopener noreferrer sponsored"
                      className="text-xs btn-amazon font-bold px-3 py-1.5 rounded-lg"
                    >
                      Buy on Amazon
                    </a>
                    <button
                      onClick={() => handleRemove(product.id)}
                      className="text-xs text-gray-400 hover:text-red-500 transition-colors px-2"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
        {items.length > 0 && (
          <p className="text-xs text-center text-gray-400 mt-6">
            Affiliate links — we may earn a commission at no extra cost to you.
          </p>
        )}
      </main>
    </div>
  );
}
