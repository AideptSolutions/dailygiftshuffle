'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import { useFavorites } from '@/lib/useFavorites';
import ProductModal from '@/components/ProductModal';
import type { Product } from '@/data/products';

function StarRating({ rating }: { rating: number }) {
  const full = Math.floor(rating);
  const half = rating % 1 >= 0.5;
  return (
    <span className="star-gold text-sm">
      {'★'.repeat(full)}
      {half ? '½' : ''}
      {'☆'.repeat(5 - full - (half ? 1 : 0))}
    </span>
  );
}

export default function SelectionsPage() {
  const { favorites, remove, clear } = useFavorites();
  const [activeProduct, setActiveProduct] = useState<Product | null>(null);

  const totalMin = favorites.reduce((sum, p) => sum + p.price, 0);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />

      <main className="flex-1 max-w-4xl mx-auto w-full px-4 py-10">

        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-2">
            Your Gift Picks
          </h1>
          <p className="text-gray-500">
            {favorites.length > 0
              ? `${favorites.length} item${favorites.length !== 1 ? 's' : ''} · estimated total $${totalMin.toFixed(2)}`
              : 'Nothing saved yet — go shuffle some gifts!'}
          </p>
        </div>

        {favorites.length === 0 ? (
          /* Empty state */
          <div className="text-center py-20 bg-white rounded-3xl shadow-sm">
            <div className="text-6xl mb-4">☆</div>
            <p className="text-gray-600 font-medium mb-6 text-lg">Your picks list is empty.</p>
            <Link href="/shuffle" className="btn-shuffle text-white font-bold px-10 py-4 rounded-full inline-block">
              Start Shuffling
            </Link>
          </div>
        ) : (
          <>
            {/* Product grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-8">
              {favorites.map((product) => (
                <div
                  key={product.id}
                  onClick={() => setActiveProduct(product)}
                  className="bg-white rounded-2xl shadow-sm overflow-hidden border border-[#E2E8F0] flex flex-col cursor-pointer hover:shadow-md hover:border-[#F04E30]/30 transition-all"
                >
                  {/* Image */}
                  <div className="relative w-full bg-gray-50" style={{ paddingBottom: '70%' }}>
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-contain p-5"
                      unoptimized
                    />
                    {/* Remove button */}
                    <button
                      onClick={(e) => { e.stopPropagation(); remove(product.id); }}
                      title="Remove from picks"
                      className="absolute top-2 right-2 w-7 h-7 rounded-full bg-white border border-gray-200 flex items-center justify-center text-gray-400 hover:text-red-500 hover:border-red-300 text-base font-bold transition-colors shadow-sm"
                    >
                      ×
                    </button>
                  </div>

                  {/* Info */}
                  <div className="p-4 flex flex-col flex-1">
                    <h3 className="font-bold text-gray-900 text-sm leading-snug mb-1 flex-1">
                      {product.name}
                    </h3>
                    <div className="flex items-center gap-1.5 mb-2">
                      <StarRating rating={product.rating} />
                      <span className="text-xs text-gray-400">({product.reviewCount.toLocaleString()})</span>
                    </div>
                    <p className="text-xs text-gray-500 line-clamp-2 mb-3">{product.description}</p>
                    <div className="flex items-center justify-between mt-auto">
                      <span className="text-xl font-extrabold" style={{ color: '#1A202C' }}>
                        {product.priceDisplay}
                      </span>
                      <a
                        href={product.affiliateUrl}
                        target="_blank"
                        rel="noopener noreferrer sponsored"
                        onClick={(e) => e.stopPropagation()}
                        className="btn-amazon font-bold text-xs py-2 px-4 rounded-xl inline-block"
                      >
                        Buy on Amazon
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Summary bar */}
            <div className="bg-white rounded-2xl shadow-sm border border-[#E2E8F0] p-6">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <p className="text-gray-500 text-sm mb-1">
                    {favorites.length} gift{favorites.length !== 1 ? 's' : ''} selected
                  </p>
                  <p className="text-2xl font-extrabold text-gray-900">
                    Est. total:{' '}
                    <span style={{ color: '#1A202C' }}>${totalMin.toFixed(2)}</span>
                  </p>
                  <p className="text-xs text-gray-400 mt-1">
                    Prices from Amazon. Click each item to add to your cart.
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
                  <button
                    onClick={clear}
                    className="text-sm font-semibold text-gray-400 hover:text-gray-600 py-3 px-6 rounded-xl border border-gray-200 hover:border-gray-300 transition-colors text-center"
                  >
                    Clear All
                  </button>
                  <button
                    onClick={() => {
                      // Open each affiliate link in a new tab so the user can add all to their Amazon cart
                      favorites.forEach((p, i) => {
                        setTimeout(() => {
                          window.open(p.affiliateUrl, '_blank', 'noopener,noreferrer');
                        }, i * 300); // slight stagger to avoid popup blockers
                      });
                    }}
                    className="btn-amazon font-bold py-3 px-8 rounded-xl text-center text-sm"
                  >
                    Open All on Amazon →
                  </button>
                </div>
              </div>

              <p className="text-xs text-gray-300 text-center mt-4">
                As an Amazon Associate, DailyGiftShuffle earns from qualifying purchases.
              </p>
            </div>

            {/* Keep shopping */}
            <div className="text-center mt-8">
              <Link href="/shuffle" className="text-[#F04E30] font-semibold hover:underline text-sm">
                ← Keep shuffling for more ideas
              </Link>
            </div>
          </>
        )}
      </main>

      {activeProduct && (
        <ProductModal
          product={activeProduct}
          onClose={() => setActiveProduct(null)}
        />
      )}
    </div>
  );
}
