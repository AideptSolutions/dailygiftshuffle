import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import { redis, wishlistKey } from '@/lib/redis';
import type { ShareableWishlist } from '@/lib/redis';
import PublicWishlistOwnerActions from './PublicWishlistOwnerActions';

interface Props {
  params: { id: string };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const raw = await redis.get(wishlistKey(params.id));
  if (!raw) return { title: 'Wishlist Not Found — TheGiftShuffle' };

  const wishlist: ShareableWishlist =
    typeof raw === 'string' ? JSON.parse(raw) : (raw as ShareableWishlist);

  const firstImage = wishlist.items[0]?.image;

  return {
    title: `${wishlist.title} — TheGiftShuffle`,
    description: `Browse ${wishlist.title} — a curated gift wishlist on TheGiftShuffle.`,
    openGraph: {
      title: wishlist.title,
      description: `Browse ${wishlist.title} — a curated gift wishlist on TheGiftShuffle.`,
      images: firstImage ? [{ url: firstImage }] : [],
      url: `https://thegiftshuffle.com/wishlist/${params.id}`,
    },
    twitter: {
      card: 'summary_large_image',
      title: wishlist.title,
      images: firstImage ? [firstImage] : [],
    },
  };
}

export default async function PublicWishlistPage({ params }: Props) {
  const raw = await redis.get(wishlistKey(params.id));
  if (!raw) notFound();

  const wishlist: ShareableWishlist =
    typeof raw === 'string' ? JSON.parse(raw) : (raw as ShareableWishlist);

  return (
    <div
      className="min-h-screen flex flex-col"
      style={{ background: 'linear-gradient(135deg, #FFFAF5 0%, #fff9e6 100%)' }}
    >
      <Navbar />
      <main id="main-content" tabIndex={-1} className="flex-1 max-w-2xl mx-auto w-full px-4 py-10">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900">{wishlist.title}</h1>
            <p className="text-sm text-gray-400 mt-1">{wishlist.items.length} gift{wishlist.items.length !== 1 ? 's' : ''}</p>
          </div>
          <Link
            href="/shuffle"
            className="btn-shuffle text-white font-bold px-5 py-2 rounded-full text-sm flex-shrink-0"
          >
            Find Gifts
          </Link>
        </div>

        {/* Owner-only edit controls (client island) */}
        <PublicWishlistOwnerActions wishlistId={params.id} />

        {wishlist.items.length === 0 ? (
          <div className="bg-white rounded-3xl shadow-sm p-12 text-center">
            <p className="text-gray-500">This wishlist is empty.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {wishlist.items.map((item) => (
              <div
                key={item.productId}
                className="bg-white rounded-2xl shadow-sm flex overflow-hidden border border-[#E2E8F0] hover:shadow-md transition-shadow"
              >
                <div className="relative w-28 h-28 flex-shrink-0 bg-gray-50">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    className="object-contain p-3"
                    unoptimized
                  />
                </div>
                <div className="flex-1 p-4 min-w-0 flex flex-col justify-between">
                  <div>
                    <div className="flex items-start justify-between gap-2">
                      <h2 className="font-bold text-gray-900 text-sm leading-tight">{item.name}</h2>
                      <span className="font-extrabold flex-shrink-0 text-sm text-gray-900">{item.price}</span>
                    </div>
                    {item.hint && (
                      <p className="text-xs text-[#FF6B6B] italic mt-1">&ldquo;{item.hint}&rdquo;</p>
                    )}
                  </div>
                  <a
                    href={item.affiliateUrl}
                    target="_blank"
                    rel="noopener noreferrer sponsored"
                    className="mt-3 self-start text-xs btn-amazon font-bold px-3 py-1.5 rounded-lg"
                  >
                    Buy on Amazon
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}

        {wishlist.items.length > 0 && (
          <p className="text-xs text-center text-gray-400 mt-6">
            Affiliate links — we may earn a commission at no extra cost to you.
          </p>
        )}
      </main>
    </div>
  );
}
