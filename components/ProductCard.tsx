'use client';
/**
 * Compact ProductCard â€" matches the landing page HomeFeaturedSection card style.
 * Used on category pages, gift-guide pages, and any other product grid.
 */
import Image from 'next/image';
import { useState } from 'react';

function PinIcon({ pinned }: { pinned: boolean }) {
  return pinned ? (
    <svg width="14" height="14" viewBox="0 0 16 16" fill="#F04E30" xmlns="http://www.w3.org/2000/svg">
      <path d="M9.828.722a.5.5 0 0 1 .354.146l4.95 4.95a.5.5 0 0 1 0 .707c-.48.48-1.072.588-1.503.588-.177 0-.335-.018-.46-.039l-3.134 3.134a5.927 5.927 0 0 1 .16 1.013c.046.702-.032 1.687-.72 2.375a.5.5 0 0 1-.707 0l-2.829-2.828-3.182 3.182c-.195.195-1.219.902-1.414.707-.195-.195.512-1.22.707-1.414l3.182-3.182-2.828-2.829a.5.5 0 0 1 0-.707c.688-.688 1.673-.767 2.375-.72a5.922 5.922 0 0 1 1.013.16l3.134-3.133a2.772 2.772 0 0 1-.04-.461c0-.43.108-1.022.589-1.503a.5.5 0 0 1 .353-.146z"/>
    </svg>
  ) : (
    <svg width="14" height="14" viewBox="0 0 16 16" fill="#9CA3AF" xmlns="http://www.w3.org/2000/svg">
      <path d="M9.828.722a.5.5 0 0 1 .354.146l4.95 4.95a.5.5 0 0 1 0 .707c-.48.48-1.072.588-1.503.588-.177 0-.335-.018-.46-.039l-3.134 3.134a5.927 5.927 0 0 1 .16 1.013c.046.702-.032 1.687-.72 2.375a.5.5 0 0 1-.707 0l-2.829-2.828-3.182 3.182c-.195.195-1.219.902-1.414.707-.195-.195.512-1.22.707-1.414l3.182-3.182-2.828-2.829a.5.5 0 0 1 0-.707c.688-.688 1.673-.767 2.375-.72a5.922 5.922 0 0 1 1.013.16l3.134-3.133a2.772 2.772 0 0 1-.04-.461c0-.43.108-1.022.589-1.503a.5.5 0 0 1 .353-.146zm0 1.042L5.975 5.607a.5.5 0 0 1-.326.279 4.93 4.93 0 0 0-1.232.315l4.383 4.382a4.93 4.93 0 0 0 .315-1.232.5.5 0 0 1 .279-.325l3.843-3.844-.642-.643-3.767 3.767-.47-.47 3.767-3.767-.643-.642zm-6.74 9.92.548-.548 1.445 1.445-.548.549-1.445-1.446z"/>
    </svg>
  );
}

function StarRating({ rating }: { rating: number }) {
  const full = Math.floor(rating);
  const half = rating % 1 >= 0.5;
  return (
    <span className="star-gold text-xs">
      {Array(full).fill('â˜…').join('')}
      {half ? 'Â½' : ''}
      {Array(5 - full - (half ? 1 : 0)).fill('â˜†').join('')}
    </span>
  );
}

export interface CompactProduct {
  id: string;
  name: string;
  description?: string;
  price: number;
  priceDisplay: string;
  image: string;
  rating: number;
  reviewCount: number;
  affiliateUrl: string;
}

export default function ProductCard({
  product,
  pinned,
  onTogglePin,
}: {
  product: CompactProduct;
  pinned?: boolean;
  onTogglePin?: () => void;
}) {
  const [imgSrc, setImgSrc] = useState(product.image);
  return (
    <div className="rounded-2xl overflow-hidden shadow-sm border border-[#E2E8F0] hover:shadow-md hover:border-[#F04E30]/30 transition-shadow flex flex-col" style={{ background: '#F0F4F8' }}>
      {/* Image â€" fixed compact height, matches landing page card size */}
      <div className="relative w-full h-28">
        <Image
          src={imgSrc}
          alt={product.name}
          fill
          className="object-contain p-2"
          unoptimized
          onError={() => setImgSrc('/img/categories/gift.svg')}
        />
        {onTogglePin && (
          <button
            onClick={(e) => { e.stopPropagation(); onTogglePin(); }}
            title="Pin this gift"
            className="absolute top-1.5 left-1.5 w-6 h-6 flex items-center justify-center rounded-full bg-white/80 hover:bg-white transition-colors z-10"
          >
            <PinIcon pinned={!!pinned} />
          </button>
        )}
      </div>

      {/* Info */}
      <div className="p-3 flex flex-col flex-1">
        <p className="text-xs font-semibold text-gray-900 leading-snug line-clamp-2">
          {product.name}
        </p>
        <div className="mt-1.5">
          <StarRating rating={product.rating} />
          <p className="text-xs text-gray-400">{product.reviewCount.toLocaleString()} reviews</p>
        </div>
        <p className="text-sm font-extrabold mt-auto pt-2" style={{ color: '#1A202C' }}>
          {product.priceDisplay}
        </p>
      </div>

      {/* Buy button â€" full-width at bottom */}
      <a
        href={product.affiliateUrl}
        target="_blank"
        rel="noopener noreferrer sponsored"
        className="btn-amazon block text-center text-xs font-bold py-2 px-3"
      >
        Buy on Amazon
      </a>
    </div>
  );
}

