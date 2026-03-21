'use client';

import { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import type { Product } from '@/data/products';
import ProductModal from '@/components/ProductModal';

const CATEGORIES = [
  { slug: 'tech',            label: 'Tech & Gadgets',  emoji: '💻', desc: 'Gadgets, smart home, wearables, and all things tech.' },
  { slug: 'gaming',          label: 'Gaming',           emoji: '🎮', desc: 'Controllers, headsets, accessories for every gamer.' },
  { slug: 'fitness',         label: 'Fitness',          emoji: '💪', desc: 'Equipment, wearables, and gear for active people.' },
  { slug: 'home',            label: 'Home & Decor',     emoji: '🏠', desc: 'Cozy decor, candles, and thoughtful pieces for any home.' },
  { slug: 'kitchen',         label: 'Kitchen',          emoji: '🍳', desc: 'Appliances, tools, and gadgets for food lovers.' },
  { slug: 'sports',          label: 'Sports',           emoji: '⚽', desc: 'Gear, apparel, and fan gifts for every sport.' },
  { slug: 'pets',            label: 'Pets',             emoji: '🐾', desc: 'Toys, treats, and accessories for beloved pets.' },
  { slug: 'kids',            label: 'Kids',             emoji: '🧸', desc: 'Fun, educational, and creative gifts for children.' },
  { slug: 'hobby',           label: 'Hobbies',          emoji: '🎨', desc: 'Gifts for makers, collectors, and passionate hobbyists.' },
  { slug: 'luxury',          label: 'Luxury',           emoji: '✨', desc: 'Premium and elevated gifts worth splurging on.' },
  { slug: 'office',          label: 'Office',           emoji: '🖥️', desc: 'Desk upgrades, productivity tools, and work-from-home essentials.' },
  { slug: 'gardening',       label: 'Gardening',        emoji: '🌱', desc: 'Tools, planters, and gifts for green thumbs.' },
  { slug: 'parenting',       label: 'Parenting',        emoji: '👶', desc: 'Practical and thoughtful gifts for parents and caregivers.' },
  { slug: 'diy-tools',       label: 'DIY & Tools',      emoji: '🔨', desc: 'Power tools, hand tools, and workshop essentials.' },
  { slug: 'finance',         label: 'Finance',          emoji: '💰', desc: 'Books, courses, and gifts for money-minded people.' },
  { slug: 'car-accessories', label: 'Car Accessories',  emoji: '🚗', desc: 'Dash cams, organizers, and must-haves for drivers.' },
];

const PAGES = [
  { label: 'Birthday Gift Ideas',  url: '/birthday-gift-ideas',  emoji: '🎂' },
  { label: 'Christmas Gift Ideas', url: '/christmas-gift-ideas', emoji: '🎄' },
  { label: 'Gifts for Her',        url: '/gift-ideas-for-her',   emoji: '👩' },
  { label: 'Gifts for Him',        url: '/gift-ideas-for-him',   emoji: '👨' },
  { label: 'Gifts for Mom',        url: '/gift-ideas-for-mom',   emoji: '❤️' },
  { label: 'Gifts for Dad',        url: '/gift-ideas-for-dad',   emoji: '🎩' },
  { label: 'Gifts Under $50',      url: '/gifts-under-50',       emoji: '💵' },
];

export default function SearchBar() {
  const [isOpen, setIsOpen]           = useState(false);
  const [query, setQuery]             = useState('');
  const [catalog, setCatalog]         = useState<Product[]>([]);
  const [activeProduct, setActiveProduct] = useState<Product | null>(null);

  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef     = useRef<HTMLInputElement>(null);

  // Fetch catalog once when search first opens
  useEffect(() => {
    if (!isOpen || catalog.length > 0) return;
    fetch('/api/products/all')
      .then(r => r.ok ? r.json() : [])
      .then((data: Product[]) => setCatalog(data))
      .catch(() => {});
  }, [isOpen, catalog.length]);

  // Auto-focus input when opened
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isOpen]);

  // Close on outside click (skip if product modal is open — modal handles its own clicks)
  useEffect(() => {
    if (!isOpen) return;
    const handler = (e: MouseEvent) => {
      if (activeProduct) return;
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        close();
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen, activeProduct]);

  // Close on Escape
  useEffect(() => {
    if (!isOpen) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close();
    };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

  const close = useCallback(() => {
    setIsOpen(false);
    setQuery('');
    setActiveProduct(null);
  }, []);

  const q = query.trim().toLowerCase();
  const showResults = q.length >= 2;

  const productResults = useMemo(() => {
    if (!showResults) return [];
    const filtered = catalog.filter(p =>
      p.name.toLowerCase().includes(q) || p.description?.toLowerCase().includes(q)
    );
    filtered.sort((a, b) => {
      const aStart = a.name.toLowerCase().startsWith(q) ? 0 : 1;
      const bStart = b.name.toLowerCase().startsWith(q) ? 0 : 1;
      if (aStart !== bStart) return aStart - bStart;
      return (b.reviewCount ?? 0) - (a.reviewCount ?? 0);
    });
    return filtered.slice(0, 5);
  }, [q, catalog, showResults]);

  const categoryResults = useMemo(() => {
    if (!showResults) return [];
    return CATEGORIES.filter(c =>
      c.label.toLowerCase().includes(q) || c.desc.toLowerCase().includes(q)
    ).slice(0, 4);
  }, [q, showResults]);

  const pageResults = useMemo(() => {
    if (!showResults) return [];
    return PAGES.filter(p => p.label.toLowerCase().includes(q)).slice(0, 3);
  }, [q, showResults]);

  const hasResults = productResults.length > 0 || categoryResults.length > 0 || pageResults.length > 0;

  return (
    <>
      <div ref={containerRef} className="relative">
        {!isOpen ? (
          /* ── Search icon button ─────────────────────────────── */
          <button
            onClick={() => setIsOpen(true)}
            aria-label="Search"
            className="text-gray-600 hover:text-[#F04E30] transition-colors p-1"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <circle cx="11" cy="11" r="8" />
              <path strokeLinecap="round" d="M21 21l-4.35-4.35" />
            </svg>
          </button>
        ) : (
          /* ── Expanded search input ──────────────────────────── */
          <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[320px] sm:w-[420px] z-50">
            <div className="flex items-center bg-white border-2 border-[#F04E30] rounded-xl shadow-lg px-3 py-1.5 gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-gray-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <circle cx="11" cy="11" r="8" />
                <path strokeLinecap="round" d="M21 21l-4.35-4.35" />
              </svg>
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={e => setQuery(e.target.value)}
                placeholder="Search gifts, categories..."
                className="flex-1 text-sm text-gray-800 placeholder-gray-400 outline-none bg-transparent min-w-0"
              />
              <button
                onClick={close}
                aria-label="Close search"
                className="text-gray-400 hover:text-gray-600 transition-colors flex-shrink-0"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* ── Results dropdown ────────────────────────────── */}
            {showResults && (
              <div className="absolute top-full right-0 w-full mt-1 bg-white rounded-2xl shadow-xl border border-[#E2E8F0] overflow-hidden z-50 max-h-[70vh] overflow-y-auto">
                {!hasResults ? (
                  <p className="text-sm text-gray-400 text-center py-6 px-4">No results for &ldquo;{query}&rdquo;</p>
                ) : (
                  <>
                    {/* Products */}
                    {productResults.length > 0 && (
                      <div>
                        <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-wide px-3 pt-3 pb-1">
                          Products
                        </p>
                        {productResults.map(p => (
                          <button
                            key={p.id}
                            onClick={() => { setActiveProduct(p); }}
                            className="w-full flex items-center gap-3 px-3 py-2 hover:bg-[#FFFAF5] transition-colors text-left group"
                          >
                            <div className="w-10 h-10 flex-shrink-0 bg-gray-50 rounded-lg overflow-hidden relative">
                              <Image src={p.image} alt={p.name} fill className="object-contain p-1" unoptimized />
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-semibold text-gray-800 group-hover:text-[#F04E30] line-clamp-1 transition-colors">
                                {p.name}
                              </p>
                              <p className="text-xs text-gray-400">{p.priceDisplay}</p>
                            </div>
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5 text-gray-300 group-hover:text-[#F04E30] flex-shrink-0 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                            </svg>
                          </button>
                        ))}
                      </div>
                    )}

                    {/* Categories */}
                    {categoryResults.length > 0 && (
                      <div>
                        <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-wide px-3 pt-3 pb-1">
                          Categories
                        </p>
                        {categoryResults.map(c => (
                          <Link
                            key={c.slug}
                            href={`/shuffle/${c.slug}`}
                            onClick={close}
                            className="flex items-center gap-3 px-3 py-2 hover:bg-[#FFFAF5] transition-colors group"
                          >
                            <span className="text-lg w-7 text-center flex-shrink-0">{c.emoji}</span>
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-semibold text-gray-800 group-hover:text-[#F04E30] transition-colors">
                                {c.label}
                              </p>
                              <p className="text-xs text-gray-400 line-clamp-1">{c.desc}</p>
                            </div>
                          </Link>
                        ))}
                      </div>
                    )}

                    {/* Pages */}
                    {pageResults.length > 0 && (
                      <div className="pb-1">
                        <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-wide px-3 pt-3 pb-1">
                          Pages
                        </p>
                        {pageResults.map(p => (
                          <Link
                            key={p.url}
                            href={p.url}
                            onClick={close}
                            className="flex items-center gap-3 px-3 py-2 hover:bg-[#FFFAF5] transition-colors group"
                          >
                            <span className="text-lg w-7 text-center flex-shrink-0">{p.emoji}</span>
                            <p className="text-sm font-semibold text-gray-800 group-hover:text-[#F04E30] transition-colors">
                              {p.label}
                            </p>
                          </Link>
                        ))}
                      </div>
                    )}
                  </>
                )}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Product modal */}
      {activeProduct && (
        <ProductModal product={activeProduct} onClose={() => setActiveProduct(null)} />
      )}
    </>
  );
}
