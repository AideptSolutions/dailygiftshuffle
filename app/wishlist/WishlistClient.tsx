'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import { useToast } from '@/components/Toast';
import { getWishlist, removeFromWishlist } from '@/lib/wishlist';
import { Product } from '@/data/products';
import type { ShareableWishlistItem } from '@/lib/redis';

const SHARE_KEY = 'dgs_share';

interface ShareMeta {
  id: string;
  ownerToken: string;
}

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

function getShareMeta(): ShareMeta | null {
  try {
    const raw = localStorage.getItem(SHARE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

function saveShareMeta(meta: ShareMeta) {
  localStorage.setItem(SHARE_KEY, JSON.stringify(meta));
}

function toShareableItems(
  products: Product[],
  hints: Record<string, string>
): ShareableWishlistItem[] {
  return products.map((p) => ({
    productId: p.id,
    name: p.name,
    image: p.image,
    price: p.priceDisplay,
    affiliateUrl: p.affiliateUrl,
    hint: hints[p.id] ?? '',
  }));
}

export default function WishlistClient() {
  const [items, setItems] = useState<Product[]>([]);
  const [email, setEmail] = useState<string>('');
  const [loaded, setLoaded] = useState(false);
  const [hints, setHints] = useState<Record<string, string>>({});
  const [title, setTitle] = useState('My Gift Wishlist');
  const [shareId, setShareId] = useState<string | null>(null);
  const [sharing, setSharing] = useState(false);
  const { showToast, ToastElement } = useToast();
  const titleRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const wl = getWishlist();
    setItems(wl?.items ?? []);
    setEmail(wl?.email ?? '');

    const meta = getShareMeta();
    if (meta) setShareId(meta.id);

    setLoaded(true);
  }, []);

  const shareUrl =
    shareId ? `https://thegiftshuffle.com/wishlist/${shareId}` : null;

  const syncToBackend = useCallback(
    async (
      meta: ShareMeta,
      currentItems: Product[],
      currentHints: Record<string, string>,
      currentTitle: string
    ) => {
      await fetch(`/api/wishlist/${meta.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${meta.ownerToken}`,
        },
        body: JSON.stringify({
          title: currentTitle,
          items: toShareableItems(currentItems, currentHints),
        }),
      });
    },
    []
  );

  const handleShare = async () => {
    setSharing(true);
    try {
      let meta = getShareMeta();

      if (!meta) {
        // Generate a stable owner token
        const ownerToken = crypto.randomUUID();
        const res = await fetch('/api/wishlist', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            ownerToken,
            title,
            items: toShareableItems(items, hints),
          }),
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error);
        meta = { id: data.id, ownerToken };
        saveShareMeta(meta);
        setShareId(data.id);
      } else {
        await syncToBackend(meta, items, hints, title);
      }

      const url = `https://thegiftshuffle.com/wishlist/${meta.id}`;

      if (navigator.share) {
        await navigator.share({ title: 'My Gift Wishlist', url });
      } else {
        await navigator.clipboard.writeText(url);
        showToast('Link copied!');
      }
    } catch (err) {
      console.error('Share error:', err);
      showToast('Something went wrong. Try again.');
    } finally {
      setSharing(false);
    }
  };

  const handleCopyLink = async () => {
    if (!shareUrl) return;
    await navigator.clipboard.writeText(shareUrl);
    showToast('Link copied!');
  };

  const handleTitleBlur = async () => {
    const meta = getShareMeta();
    if (meta) {
      await syncToBackend(meta, items, hints, title);
    }
  };

  const handleHintChange = (productId: string, value: string) => {
    setHints((prev) => ({ ...prev, [productId]: value }));
  };

  const handleHintBlur = async () => {
    const meta = getShareMeta();
    if (meta) {
      await syncToBackend(meta, items, hints, title);
    }
  };

  const handleRemove = (id: string) => {
    removeFromWishlist(id);
    setItems((prev) => prev.filter((p) => p.id !== id));
    window.dispatchEvent(new Event('wishlist-updated'));

    const meta = getShareMeta();
    if (meta) {
      fetch(`/api/wishlist/${meta.id}/items/${encodeURIComponent(id)}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${meta.ownerToken}` },
      }).catch(console.error);
    }
  };

  if (!loaded) return null;

  return (
    <div className="min-h-screen flex flex-col" style={{ background: 'linear-gradient(135deg, #FFFAF5 0%, #fff9e6 100%)' }}>
      <Navbar />
      <main id="main-content" tabIndex={-1} className="flex-1 max-w-2xl mx-auto w-full px-4 py-10">
        <div className="flex items-center justify-between mb-6">
          <div className="flex-1 min-w-0 mr-4">
            <input
              ref={titleRef}
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              onBlur={handleTitleBlur}
              className="text-2xl sm:text-3xl font-extrabold text-gray-900 bg-transparent border-b-2 border-transparent hover:border-gray-200 focus:border-[#FF6B6B] focus:outline-none w-full truncate transition-colors"
              aria-label="Wishlist title"
            />
            {email && <p className="text-sm text-gray-400 mt-1">Saved for {email}</p>}
          </div>
          <Link href="/shuffle" className="btn-shuffle text-white font-bold px-5 py-2 rounded-full text-sm flex-shrink-0">
            + Find More
          </Link>
        </div>

        {items.length > 0 && (
          <div className="mb-6 flex flex-col sm:flex-row gap-3 items-start sm:items-center">
            <button
              onClick={handleShare}
              disabled={sharing}
              className="btn-shuffle text-white font-bold px-6 py-2.5 rounded-full text-sm disabled:opacity-60 flex items-center gap-2"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
              </svg>
              {sharing ? 'Sharing…' : 'Share My Wishlist'}
            </button>
            {shareUrl && (
              <button
                onClick={handleCopyLink}
                className="text-sm text-[#FF6B6B] hover:underline font-semibold truncate max-w-xs"
                title={shareUrl}
              >
                {shareUrl}
              </button>
            )}
          </div>
        )}

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
                className="bg-white rounded-2xl shadow-sm flex flex-col overflow-hidden border border-[#E2E8F0] hover:shadow-md transition-shadow"
              >
                <div className="flex">
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
                <div className="px-4 pb-3 border-t border-gray-50">
                  <input
                    type="text"
                    placeholder="Add a hint for the gift giver… (optional)"
                    value={hints[product.id] ?? ''}
                    onChange={(e) => handleHintChange(product.id, e.target.value)}
                    onBlur={handleHintBlur}
                    className="w-full text-xs text-gray-500 placeholder-gray-300 bg-transparent border-none focus:outline-none focus:ring-0 pt-2"
                  />
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
      {ToastElement}
    </div>
  );
}
