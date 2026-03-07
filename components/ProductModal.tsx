'use client';

import { useEffect } from 'react';
import Image from 'next/image';
import type { Product } from '@/data/products';
import { useFavorites } from '@/lib/useFavorites';

function StarRating({ rating }: { rating: number }) {
  const full  = Math.floor(rating);
  const half  = rating % 1 >= 0.5;
  const empty = 5 - full - (half ? 1 : 0);
  return (
    <span className="star-gold text-base">
      {Array(full).fill('\u2605').join('')}
      {half ? '\u00BD' : ''}
      {Array(empty).fill('\u2606').join('')}
    </span>
  );
}

interface Props {
  product: Product;
  onClose: () => void;
}

export default function ProductModal({ product, onClose }: Props) {
  const { toggle, isFavorited } = useFavorites();
  const saved = isFavorited(product.id);

  // Close on Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [onClose]);

  // Prevent body scroll while open
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, []);

  return (
    /* Backdrop */
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center p-4"
      style={{ background: 'rgba(0,0,0,0.55)' }}
      onClick={onClose}
    >
      {/* Modal panel */}
      <div
        className="relative bg-white rounded-3xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-500 font-bold text-sm transition-colors"
        >
          X
        </button>

        {/* Image */}
        <div className="relative w-full bg-gray-50 rounded-t-3xl" style={{ paddingBottom: '60%' }}>
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-contain p-8"
            unoptimized
          />
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Name + price */}
          <div className="flex items-start justify-between gap-3 mb-3">
            <h2 className="text-xl font-extrabold text-gray-900 leading-snug flex-1">
              {product.name}
            </h2>
            <span className="text-2xl font-extrabold flex-shrink-0" style={{ color: '#F04E30' }}>
              {product.priceDisplay}
            </span>
          </div>

          {/* Rating */}
          <div className="flex items-center gap-2 mb-4">
            <StarRating rating={product.rating} />
            <span className="text-sm text-gray-400">
              {product.rating.toFixed(1)} ({product.reviewCount.toLocaleString()} reviews)
            </span>
          </div>

          {/* Description */}
          <p className="text-gray-600 text-sm leading-relaxed mb-6">
            {product.description}
          </p>

          {/* Actions */}
          <div className="flex flex-col gap-3">
            <a
              href={product.affiliateUrl}
              target="_blank"
              rel="noopener noreferrer sponsored"
              className="btn-amazon block w-full text-center font-bold py-4 rounded-2xl text-base"
            >
              Shop on Amazon
            </a>
            <button
              onClick={() => toggle(product)}
              className={`w-full py-3 rounded-2xl font-semibold text-sm border-2 transition-colors ${
                saved
                  ? 'border-[#F04E30] bg-[#F04E30] text-white'
                  : 'border-[#F04E30] text-[#F04E30] hover:bg-[#FFFAF5]'
              }`}
            >
              {saved ? 'Saved to My Picks' : 'Save to My Picks'}
            </button>
          </div>

          <p className="text-xs text-center text-gray-300 mt-4">
            Affiliate link — we may earn a commission at no cost to you.
          </p>
        </div>
      </div>
    </div>
  );
}
