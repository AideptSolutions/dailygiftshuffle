/**
 * Compact ProductCard — matches the landing page HomeFeaturedSection card style.
 * Used on category pages, gift-guide pages, and any other product grid.
 */
import Image from 'next/image';

function StarRating({ rating }: { rating: number }) {
  const full = Math.floor(rating);
  const half = rating % 1 >= 0.5;
  return (
    <span className="star-gold text-xs">
      {Array(full).fill('★').join('')}
      {half ? '½' : ''}
      {Array(5 - full - (half ? 1 : 0)).fill('☆').join('')}
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

export default function ProductCard({ product }: { product: CompactProduct }) {
  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-[#E2E8F0] hover:shadow-md hover:border-[#F04E30]/30 transition-shadow flex flex-col">
      {/* Image — fixed compact height, matches landing page card size */}
      <div className="relative w-full h-28 bg-gray-50">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-contain p-2"
          unoptimized
        />
      </div>

      {/* Info */}
      <div className="p-3 flex flex-col flex-1">
        <p className="text-xs font-semibold text-gray-900 leading-snug line-clamp-2 flex-1">
          {product.name}
        </p>
        <div className="mt-1.5">
          <StarRating rating={product.rating} />
          <p className="text-xs text-gray-400">{product.reviewCount.toLocaleString()} reviews</p>
        </div>
        <p className="text-sm font-extrabold mt-1.5" style={{ color: '#1A202C' }}>
          {product.priceDisplay}
        </p>
      </div>

      {/* Buy button — full-width at bottom */}
      <a
        href={product.affiliateUrl}
        target="_blank"
        rel="noopener noreferrer sponsored"
        className="btn-amazon block text-center text-xs font-bold py-2 px-3"
      >
        Shop on Amazon
      </a>
    </div>
  );
}
