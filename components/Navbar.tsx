'use client';

import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { getWishlistCount } from '@/lib/wishlist';

const CATEGORIES: { slug: string; label: string; emoji: string }[] = [
  { slug: 'tech',              label: 'Tech & Gadgets',   emoji: '💻' },
  { slug: 'gaming',            label: 'Gaming',           emoji: '🎮' },
  { slug: 'fitness',           label: 'Fitness',          emoji: '💪' },
  { slug: 'home',              label: 'Home & Decor',     emoji: '🏠' },
  { slug: 'kitchen',           label: 'Kitchen',          emoji: '🍳' },
  { slug: 'sports',            label: 'Sports',           emoji: '⚽' },
  { slug: 'pets',              label: 'Pets',             emoji: '🐾' },
  { slug: 'kids',              label: 'Kids',             emoji: '🧸' },
  { slug: 'hobby',             label: 'Hobbies',          emoji: '🎨' },
  { slug: 'luxury',            label: 'Luxury',           emoji: '✨' },
  { slug: 'office',            label: 'Office',           emoji: '🖥️' },
  { slug: 'gardening',         label: 'Gardening',        emoji: '🌱' },
  { slug: 'parenting',         label: 'Parenting',        emoji: '👶' },
  { slug: 'diy-tools',         label: 'DIY & Tools',      emoji: '🔨' },
  { slug: 'finance',           label: 'Finance',          emoji: '💰' },
  { slug: 'car-accessories',   label: 'Car Accessories',  emoji: '🚗' },
];

export default function Navbar() {
  const [wishlistCount, setWishlistCount] = useState(0);
  const [categoriesOpen, setCategoriesOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const dropdownId = 'categories-dropdown';

  useEffect(() => {
    setWishlistCount(getWishlistCount());
    const handler = () => setWishlistCount(getWishlistCount());
    window.addEventListener('wishlist-updated', handler);
    return () => window.removeEventListener('wishlist-updated', handler);
  }, []);

  // Close dropdown on outside click or Escape key
  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setCategoriesOpen(false);
      }
    };
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setCategoriesOpen(false);
    };
    if (categoriesOpen) {
      document.addEventListener('mousedown', handleOutsideClick);
      document.addEventListener('keydown', handleEscape);
    }
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
      document.removeEventListener('keydown', handleEscape);
    };
  }, [categoriesOpen]);

  return (
    <nav aria-label="Main navigation" className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link href="/" className="font-extrabold text-xl" style={{ color: '#F04E30' }}>
          TheGiftShuffle
        </Link>
        <div className="flex items-center gap-4 text-sm font-medium text-gray-600">
          <Link href="/shuffle" className="hover:text-[#F04E30] transition-colors hidden sm:block">
            Find a Gift
          </Link>

          {/* Categories dropdown */}
          <div ref={dropdownRef} className="relative hidden sm:block">
            <button
              onClick={() => setCategoriesOpen((o) => !o)}
              aria-haspopup="true"
              aria-expanded={categoriesOpen}
              aria-controls={dropdownId}
              className="hover:text-[#F04E30] transition-colors flex items-center gap-1"
            >
              Categories
              <svg
                aria-hidden="true"
                focusable="false"
                className={`w-3 h-3 transition-transform ${categoriesOpen ? 'rotate-180' : ''}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {categoriesOpen && (
              <div
                id={dropdownId}
                role="menu"
                aria-label="Gift categories"
                className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-72 bg-white rounded-2xl shadow-xl border border-[#E2E8F0] p-3 z-50"
              >
                <p className="text-xs text-gray-400 font-semibold uppercase tracking-wide px-2 mb-2" aria-hidden="true">
                  Shuffle by Category
                </p>
                <div className="grid grid-cols-2 gap-1">
                  {CATEGORIES.map((cat) => (
                    <Link
                      key={cat.slug}
                      href={`/shuffle/${cat.slug}`}
                      role="menuitem"
                      onClick={() => setCategoriesOpen(false)}
                      className="flex items-center gap-2 px-2 py-1.5 rounded-xl hover:bg-[#FFFAF5] hover:text-[#F04E30] transition-colors text-sm text-gray-700"
                    >
                      <span aria-hidden="true" className="text-base">{cat.emoji}</span>
                      <span className="font-medium">{cat.label}</span>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>

          <Link href="/about" className="hover:text-[#F04E30] transition-colors hidden sm:block">
            About
          </Link>
          <Link
            href="/wishlist"
            aria-label={wishlistCount > 0 ? `Wishlist (${wishlistCount} items)` : 'Wishlist'}
            className="relative hover:text-[#F04E30] transition-colors flex items-center gap-1"
          >
            <span className="hidden sm:inline">Wishlist</span>
            {wishlistCount > 0 && (
              <span aria-hidden="true" className="absolute -top-2 -right-2 bg-[#F04E30] text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
                {wishlistCount}
              </span>
            )}
          </Link>
          <Link
            href="/shuffle"
            className="btn-shuffle font-bold px-4 py-2 rounded-full text-sm"
          >
            Shuffle
          </Link>
        </div>
      </div>
    </nav>
  );
}
