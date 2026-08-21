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

/**
 * Amazon merchant mark. Drawn inline rather than hotlinked as a favicon so it
 * stays crisp, costs no extra request, and cannot break if the remote asset
 * moves. The glyph carries the destination visually; the sr-only label on the
 * card link carries it for assistive tech.
 */
function AmazonMark() {
  return (
    <svg width="15" height="15" viewBox="0 0 16 16" aria-hidden="true" focusable="false" className="shrink-0">
      <rect width="16" height="16" rx="3.5" fill="#FF9900" />
      <path d="M3.5 9.9c2.5 2.1 6.6 2.1 9.1.1" stroke="#fff" strokeWidth="1.6" strokeLinecap="round" fill="none" />
      <path d="M11.3 8.8l2.1.7-.8 1.9z" fill="#fff" />
    </svg>
  );
}

function ArrowOut() {
  return (
    <svg width="11" height="11" viewBox="0 0 12 12" aria-hidden="true" focusable="false" className="shrink-0">
      <path d="M2.5 9.5L9 3M9 3H4.6M9 3v4.4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    </svg>
  );
}

function StarRating({ rating }: { rating: number }) {
  const full = Math.floor(rating);
  const half = rating % 1 >= 0.5;
  return (
    <span className="star-gold text-xs">
      {Array(full).fill('★').join('')}
      {half ? '½' : ''}
      {Array(5 - full - (half ? 1 : 0)).fill('★').join('')}
    </span>
  );
}

export interface CompactProduct {
  id: string;
  name: string;
  description?: string;
  why?: string;
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
    // `group` + a stretched link: the whole card is the click target (the loud
    // orange CTA bar is gone), while the pin button stays above it. An <a>
    // wrapping everything would nest a <button> inside a link, which is invalid.
    // data-gift-name is what ClickTracker reads to label the click; without it
    // every click was recorded as the link text.
    <div
      data-gift-name={product.name}
      className="group relative rounded-2xl overflow-hidden shadow-sm border border-[#E2E8F0] hover:shadow-md hover:border-[#F04E30]/30 hover:-translate-y-0.5 transition-all duration-200 flex flex-col"
      style={{ background: '#F0F4F8' }}
    >
      <a
        href={product.affiliateUrl}
        target="_blank"
        rel="noopener noreferrer sponsored"
        aria-label={`View ${product.name} on Amazon`}
        className="absolute inset-0 z-[1] rounded-2xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#F04E30]"
      />

      {/* Image */}
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
            onClick={(e) => { e.stopPropagation(); e.preventDefault(); onTogglePin(); }}
            title="Pin this gift"
            className="absolute top-1.5 left-1.5 w-6 h-6 flex items-center justify-center rounded-full bg-white/80 hover:bg-white transition-colors z-[2]"
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
        {product.rating > 0 && (
          <div className="mt-1.5">
            <StarRating rating={product.rating} />
            <p className="text-xs text-gray-400">{product.reviewCount.toLocaleString()} reviews</p>
          </div>
        )}
        {(product.why || product.description) && (
          <p className="text-[10px] italic text-gray-500 mt-1.5 pl-2 border-l-2 border-[#F04E30]/30 leading-snug line-clamp-2">
            {product.why ? <>&#10022; Why we picked this: {product.why}</> : product.description}
          </p>
        )}

        {/* Merchant + price. Replaces the full-width "Buy on Amazon" bar: the
            mark says where the link goes without shouting, the arrow only
            appears on hover so the card reads calm at rest. */}
        <div className="mt-auto pt-2.5 flex items-center gap-1.5">
          <AmazonMark />
          <span className="text-sm font-extrabold" style={{ color: '#1A202C' }}>
            {product.priceDisplay}
          </span>
          <span className="ml-auto text-[#F04E30] opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            <ArrowOut />
          </span>
        </div>
      </div>
    </div>
  );
}
