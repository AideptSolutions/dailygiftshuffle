'use client';

import Link from 'next/link';
import { products } from '@/data/products';

const STARTER_IDS = [
  // Under $10 everyday picks
  'u10-1','u10-2','u10-3','u10-4','u10-5',
  'u10-6','u10-7','u10-8','u10-9','u10-10',
  'u10-11','u10-12','u10-13','u10-14','u10-15',
  'u10-16','u10-17','u10-18','u10-19','u10-20',
  // Baby & young child consumables
  'baby-picks-1','baby-picks-2','baby-picks-3',
  'baby-picks-4','baby-picks-5','baby-picks-6',
  // Pokemon
  'poke-picks-1','poke-picks-2',
];

const allPicks = products.filter(p => STARTER_IDS.includes(p.id));

const SECTIONS = [
  {
    label: 'Gifts Under $10',
    desc: 'Practical, fun, and genuinely thoughtful — all under ten bucks.',
    ids: ['u10-1','u10-2','u10-3','u10-4','u10-5','u10-6','u10-7','u10-8','u10-9','u10-10','u10-11','u10-12','u10-13','u10-14','u10-15','u10-16','u10-17','u10-18','u10-19','u10-20'],
  },
  {
    label: 'Baby & Young Child Essentials',
    desc: 'The consumables every parent of a 4-month-old goes through constantly. A gift they will actually use.',
    ids: ['baby-picks-1','baby-picks-2','baby-picks-3','baby-picks-4','baby-picks-5','baby-picks-6'],
  },
  {
    label: 'Pokemon Picks',
    desc: 'For the kids (and adults) who still love cracking open a pack.',
    ids: ['poke-picks-1','poke-picks-2'],
  },
];

const CARD_COLORS = [
  'bg-rose-100','bg-orange-100','bg-amber-100','bg-lime-100','bg-emerald-100',
  'bg-teal-100','bg-cyan-100','bg-sky-100','bg-violet-100','bg-pink-100',
  'bg-red-100','bg-yellow-100','bg-green-100','bg-blue-100','bg-indigo-100',
  'bg-purple-100','bg-fuchsia-100','bg-rose-200','bg-orange-200','bg-teal-200',
];

export default function PicksPage() {
  return (
    <main className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 py-10 px-4 text-center">
        <p className="text-sm uppercase tracking-widest font-semibold mb-2" style={{ color: '#F04E30' }}>
          Curated by TheGiftShuffle
        </p>
        <h1 className="text-3xl font-bold text-gray-900 mb-3">20 Gifts Under $10</h1>
        <p className="text-gray-500 max-w-xl mx-auto text-base">
          Practical, fun, and genuinely thoughtful picks — all under ten bucks.
          Click any &ldquo;Buy on Amazon&rdquo; button to grab one instantly.
        </p>
      </div>

      {/* Sections */}
      <div className="max-w-5xl mx-auto px-4 py-10 space-y-14">
        {SECTIONS.map(section => {
          const sectionPicks = allPicks.filter(p => section.ids.includes(p.id));
          return (
            <div key={section.label}>
              <div className="mb-6">
                <h2 className="text-xl font-bold text-gray-900">{section.label}</h2>
                <p className="text-sm text-gray-500 mt-1">{section.desc}</p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
                {sectionPicks.map((product, idx) => (
                  <div
                    key={product.id}
                    className="bg-white rounded-xl border border-[#E2E8F0] shadow-sm flex flex-col overflow-hidden hover:shadow-md transition-shadow"
                  >
                    <div className={`${CARD_COLORS[idx % CARD_COLORS.length]} flex items-center justify-center h-36`}>
                      <span className="text-lg font-bold text-gray-500 opacity-30 select-none text-center px-3 leading-tight">
                        {product.name.split(' ').slice(0, 3).join(' ')}
                      </span>
                    </div>
                    <div className="p-4 flex flex-col flex-1">
                      <p className="text-xs font-semibold text-orange-500 uppercase tracking-wide mb-1">
                        {product.priceDisplay}
                      </p>
                      <h3 className="font-semibold text-gray-900 text-sm mb-1 leading-snug">
                        {product.name}
                      </h3>
                      <p className="text-gray-500 text-xs leading-relaxed flex-1 mb-3 line-clamp-3">
                        {product.description}
                      </p>
                      <div className="flex items-center gap-1 mb-3">
                        <span className="star-gold text-xs">{'★'.repeat(Math.round(product.rating))}</span>
                        <span className="text-gray-400 text-xs">({product.reviewCount.toLocaleString()})</span>
                      </div>
                      <a
                        href={product.affiliateUrl}
                        target="_blank"
                        rel="noopener noreferrer sponsored"
                        className="block w-full text-center bg-orange-500 hover:bg-orange-600 text-white text-sm font-semibold py-2 rounded-lg transition-colors"
                      >
                        Buy on Amazon
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* Footer note */}
      <div className="text-center pb-10 px-4">
        <p className="text-xs text-gray-400 max-w-md mx-auto">
          As an Amazon Associate, TheGiftShuffle earns from qualifying purchases.
          Prices are approximate and may vary.
        </p>
        <Link href="/" className="inline-block mt-4 text-sm text-orange-500 hover:underline">
          Back to TheGiftShuffle
        </Link>
      </div>
    </main>
  );
}
