import Image from 'next/image';
import { products } from '@/data/products';

// 4 highest-reviewed products — highest demand / trending
const HOT_PRODUCT_IDS = [
  'friends-50-1',  // Instant Pot Duo 6-Qt — 112,000 reviews
  'her-50-2',      // Kindle Paperwhite    —  98,700 reviews
  'her-100-1',     // KitchenAid Mixer     —  87,400 reviews
  'him-50-1',      // Smart Watch          —  45,300 reviews
];

const hotProducts = HOT_PRODUCT_IDS
  .map((id) => products.find((p) => p.id === id))
  .filter(Boolean) as typeof products;

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

export default function FeaturedGifts() {
  return (
    <div className="w-full max-w-4xl mx-auto px-4 mb-8">
      <div className="flex items-center justify-center gap-2 mb-5">
        <h2 className="text-lg font-extrabold text-gray-800 tracking-tight">Trending Right Now</h2>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {hotProducts.map((product) => (
          <a
            key={product.id}
            href={product.affiliateUrl}
            target="_blank"
            rel="noopener noreferrer sponsored"
            className="bg-white rounded-2xl overflow-hidden shadow-sm border border-[#E2E8F0] hover:shadow-md hover:border-[#F04E30]/30 transition-all flex flex-col group"
          >
            <div className="relative w-full bg-gray-50" style={{ paddingBottom: '75%' }}>
              <Image
                src={product.image}
                alt={product.name}
                fill
                className="object-contain p-3"
                unoptimized
              />
            </div>
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
            <div className="btn-amazon text-center text-xs font-bold py-2 px-3">
              Shop on Amazon
            </div>
          </a>
        ))}
      </div>

      <p className="text-center text-xs text-gray-400 mt-3">
        Affiliate links — we may earn a small commission at no extra cost to you.
      </p>
    </div>
  );
}
