'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useFavorites } from '@/lib/useFavorites';

export default function FavoritesSidebar() {
  const { favorites, remove } = useFavorites();
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Vertical tab — always visible on the right edge */}
      <button
        onClick={() => setOpen((o) => !o)}
        aria-label="My Picks"
        className="fixed right-0 top-1/2 -translate-y-1/2 z-40 flex flex-col items-center justify-center gap-1 py-5 px-2 rounded-l-2xl shadow-lg text-white text-xs font-bold select-none transition-all"
        style={{ background: 'linear-gradient(180deg, #F04E30, #FF7F50)', minHeight: 80 }}
      >
        <span className="leading-none text-[10px] tracking-wide uppercase">Picks</span>
        {favorites.length > 0 && (
          <span className="bg-white text-[#F04E30] rounded-full w-5 h-5 flex items-center justify-center text-xs font-extrabold leading-none mt-0.5">
            {favorites.length}
          </span>
        )}
      </button>

      {/* Backdrop */}
      {open && (
        <div
          className="fixed inset-0 z-40 bg-black/20"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Drawer */}
      <div
        className={`fixed top-0 right-0 h-full z-50 flex flex-col bg-white shadow-2xl border-l border-gray-100 transition-transform duration-300 ${
          open ? 'translate-x-0' : 'translate-x-full'
        }`}
        style={{ width: 288 }}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-4 border-b border-gray-100">
          <h3 className="font-extrabold text-gray-900 text-base">
            My Picks
            {favorites.length > 0 && (
              <span className="ml-1.5 text-[#F04E30]">({favorites.length})</span>
            )}
          </h3>
          <button
            onClick={() => setOpen(false)}
            className="w-7 h-7 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 text-gray-600 text-sm font-bold transition-colors"
          >
            X
          </button>
        </div>

        {/* Items list */}
        <div className="flex-1 overflow-y-auto p-3 space-y-2">
          {favorites.length === 0 ? (
            <div className="text-center mt-16 px-4">
              <p className="text-gray-500 text-sm font-medium">No picks yet</p>
              <p className="text-gray-400 text-xs mt-1">
                Save any gift while shuffling to see it here
              </p>
            </div>
          ) : (
            favorites.map((product) => (
              <div
                key={product.id}
                className="flex items-start gap-2.5 bg-gray-50 rounded-xl p-2.5"
              >
                {/* Thumbnail */}
                <div className="relative w-14 h-14 flex-shrink-0 bg-white rounded-lg overflow-hidden border border-[#E2E8F0]">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-contain p-1"
                    unoptimized
                  />
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-semibold text-gray-900 leading-snug line-clamp-2">
                    {product.name}
                  </p>
                  <p className="text-sm font-extrabold mt-0.5" style={{ color: '#F04E30' }}>
                    {product.priceDisplay}
                  </p>
                </div>

                {/* Remove */}
                <button
                  onClick={() => remove(product.id)}
                  title="Remove"
                  className="flex-shrink-0 text-xs text-gray-400 hover:text-red-400 font-bold transition-colors mt-0.5 px-1"
                >
                  X
                </button>
              </div>
            ))
          )}
        </div>

        {/* Footer CTA */}
        <div className="p-4 border-t border-gray-100 space-y-2">
          {favorites.length > 0 ? (
            <>
              {/* Primary: open every item on its affiliate page */}
              <button
                onClick={() => {
                  favorites.forEach((p, i) => {
                    setTimeout(() => {
                      window.open(p.affiliateUrl, '_blank', 'noopener,noreferrer');
                    }, i * 300);
                  });
                }}
                className="btn-amazon block w-full text-center font-bold py-3.5 rounded-xl text-sm"
              >
                Shop All on Amazon
              </button>

              {/* Secondary: review page */}
              <Link
                href="/selections"
                onClick={() => setOpen(false)}
                className="block w-full text-center border border-gray-200 text-gray-500 font-semibold py-2.5 rounded-xl text-xs hover:bg-gray-50 transition-colors"
              >
                Review My Picks ({favorites.length})
              </Link>
            </>
          ) : (
            <Link
              href="/shuffle"
              onClick={() => setOpen(false)}
              className="block w-full text-center border-2 border-[#F04E30] text-[#F04E30] font-bold py-3.5 rounded-xl text-sm hover:bg-[#FFFAF5] transition-colors"
            >
              Start Shuffling
            </Link>
          )}
        </div>
      </div>
    </>
  );
}
