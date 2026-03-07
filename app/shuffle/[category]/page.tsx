'use client';

import { useEffect, useState, useCallback } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import ProductModal from '@/components/ProductModal';
import { useFavorites } from '@/lib/useFavorites';
import { shuffleMany } from '@/lib/shuffle';
import { type Product, type NicheTag } from '@/data/products';

const CATEGORY_META: Record<string, { label: string; desc: string }> = {
  'tech':            { label: 'Tech & Gadgets',   desc: 'Gadgets, smart home, wearables, and all things tech.' },
  'gaming':          { label: 'Gaming',            desc: 'Controllers, headsets, accessories for every gamer.' },
  'fitness':         { label: 'Fitness',           desc: 'Equipment, wearables, and gear for active people.' },
  'home':            { label: 'Home & Decor',      desc: 'Cozy decor, candles, and thoughtful pieces for any home.' },
  'kitchen':         { label: 'Kitchen',           desc: 'Appliances, tools, and gadgets for food lovers.' },
  'sports':          { label: 'Sports',            desc: 'Gear, apparel, and fan gifts for every sport.' },
  'pets':            { label: 'Pets',              desc: 'Toys, treats, and accessories for beloved pets.' },
  'kids':            { label: 'Kids',              desc: 'Fun, educational, and creative gifts for children.' },
  'hobby':           { label: 'Hobbies',           desc: 'Gifts for makers, collectors, and passionate hobbyists.' },
  'luxury':          { label: 'Luxury',            desc: 'Premium and elevated gifts worth splurging on.' },
  'office':          { label: 'Office',            desc: 'Desk upgrades, productivity tools, and work-from-home essentials.' },
  'gardening':       { label: 'Gardening',         desc: 'Tools, planters, and gifts for green thumbs.' },
  'parenting':       { label: 'Parenting',         desc: 'Practical and thoughtful gifts for parents and caregivers.' },
  'diy-tools':       { label: 'DIY & Tools',       desc: 'Power tools, hand tools, and workshop essentials.' },
  'finance':         { label: 'Finance',           desc: 'Books, courses, and gifts for money-minded people.' },
  'car-accessories': { label: 'Car Accessories',   desc: 'Dash cams, organizers, and must-haves for drivers.' },
};

function StarRating({ rating }: { rating: number }) {
  return (
    <span className="star-gold text-sm">
      {'★'.repeat(Math.floor(rating))}
      {rating % 1 >= 0.5 ? '½' : ''}
      {'☆'.repeat(5 - Math.ceil(rating))}
    </span>
  );
}

export default function CategoryShufflePage() {
  const params   = useParams();
  const category = (params?.category as string) ?? '';
  const meta     = CATEGORY_META[category] ?? { label: category, desc: '' };
  const tag      = category as NicheTag;

  const [catalog,  setCatalog]  = useState<Product[]>([]);
  const [cards,    setCards]    = useState<Product[]>([]);
  const [loading,  setLoading]  = useState(true);
  const [fading,   setFading]   = useState(false);
  const [modal,    setModal]    = useState<Product | null>(null);
  const { toggle: toggleFav, isFavorited } = useFavorites();

  useEffect(() => {
    fetch('/api/products/all')
      .then(r => r.ok ? r.json() : [])
      .then((data: Product[]) => {
        setCatalog(data);
        const initial = shuffleMany(4, { tags: [tag], catalog: data });
        setCards(initial);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [tag]);

  const reshuffle = useCallback(() => {
    setFading(true);
    setTimeout(() => {
      setCards(shuffleMany(4, { tags: [tag], catalog }));
      setFading(false);
    }, 250);
  }, [catalog, tag]);

  return (
    <div className="min-h-screen" style={{ background: 'linear-gradient(135deg, #FFFAF5 0%, #fff9e6 100%)' }}>
      <Navbar />

      <main id="main-content" tabIndex={-1} className="max-w-4xl mx-auto px-4 py-10">
        {/* Header */}
        <div className="text-center mb-8">
          <Link href="/shuffle" className="text-xs text-gray-400 hover:text-[#F04E30] mb-3 inline-block transition-colors">
            All Shuffles
          </Link>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-2">{meta.label} Gifts</h1>
          <p className="text-gray-500 text-sm max-w-md mx-auto">{meta.desc}</p>
        </div>

        {/* Cards */}
        {loading ? (
          <div className="grid grid-cols-2 gap-4">
            {[0,1,2,3].map(i => (
              <div key={i} className="bg-white rounded-2xl h-64 animate-pulse border border-[#E2E8F0]" />
            ))}
          </div>
        ) : cards.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-gray-400 mb-4">No gifts in this category yet.</p>
            <Link href="/shuffle" className="btn-shuffle text-white font-bold px-6 py-3 rounded-full text-sm inline-block">
              Try the main shuffle
            </Link>
          </div>
        ) : (
          <div className={`grid grid-cols-2 gap-4 transition-opacity duration-200 ${fading ? 'opacity-0' : 'opacity-100'}`}>
            {cards.map(p => (
              <div
                key={p.id}
                className="bg-white rounded-2xl shadow-sm border border-[#E2E8F0] overflow-hidden hover:shadow-md transition-shadow cursor-pointer group"
                onClick={() => setModal(p)}
              >
                <div className="relative w-full aspect-video bg-gray-50">
                  <Image
                    src={p.image}
                    alt={p.name}
                    fill
                    className="object-cover"
                    unoptimized
                  />
                  {/* Save button */}
                  <button
                    onClick={e => { e.stopPropagation(); toggleFav(p); }}
                    aria-label={isFavorited(p.id) ? 'Remove from picks' : 'Save to My Picks'}
                    className={`absolute top-2 right-2 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold shadow transition-colors z-10 ${
                      isFavorited(p.id) ? 'bg-[#F04E30] text-white' : 'bg-white text-gray-400 hover:text-[#F04E30]'
                    }`}
                  >
                    <span aria-hidden="true">{isFavorited(p.id) ? '★' : '☆'}</span>
                  </button>
                </div>
                <div className="p-3">
                  <p className="font-semibold text-gray-900 text-sm leading-snug line-clamp-2 mb-1">{p.name}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-[#F04E30] font-bold text-sm">{p.priceDisplay}</span>
                    <div className="flex items-center gap-1">
                      <StarRating rating={p.rating ?? 4.5} />
                      <span className="text-xs text-gray-400">({(p.reviewCount ?? 0).toLocaleString()})</span>
                    </div>
                  </div>
                  <a
                    href={p.affiliateUrl}
                    target="_blank"
                    rel="noopener noreferrer sponsored"
                    onClick={e => e.stopPropagation()}
                    className="mt-2 w-full bg-[#F04E30] hover:bg-orange-500 text-white text-xs font-bold py-1.5 rounded-lg flex items-center justify-center transition-colors"
                  >
                    Shop on Amazon
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Shuffle again */}
        {!loading && cards.length > 0 && (
          <div className="text-center mt-8">
            <button
              onClick={reshuffle}
              className="btn-shuffle text-white font-extrabold px-10 py-4 rounded-full text-lg shadow-lg hover:shadow-xl transition-all"
            >
              Shuffle Again
            </button>
            <p className="text-xs text-gray-400 mt-3">
              Showing {cards.length} of {catalog.filter(p => p.tags?.includes(tag)).length} {meta.label} gifts
            </p>
            <p className="text-xs text-gray-300 mt-2">
              Affiliate links — we may earn a commission at no extra cost to you.
            </p>
          </div>
        )}

        {/* Browse other categories */}
        <div className="mt-12 border-t border-gray-100 pt-8">
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide text-center mb-4">Browse other categories</p>
          <div className="flex flex-wrap gap-2 justify-center">
            {Object.entries(CATEGORY_META).filter(([slug]) => slug !== category).map(([slug, m]) => (
              <Link
                key={slug}
                href={`/shuffle/${slug}`}
                className="px-3 py-1.5 rounded-full text-xs font-semibold border border-gray-200 text-gray-600 hover:border-[#F04E30] hover:text-[#F04E30] transition-colors bg-white"
              >
                {m.label}
              </Link>
            ))}
          </div>
        </div>
      </main>

      {modal && <ProductModal product={modal} onClose={() => setModal(null)} />}
    </div>
  );
}
