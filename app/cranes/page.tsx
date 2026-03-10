/**
 * ⚠️  TEMPORARY PAGE — Remove once Amazon Creator API access is approved.
 * To remove: delete this file + remove the Crane's List button in app/page.tsx.
 *
 * To add items: go to /admin → paste Amazon links → check "Add to Crane's List" → Import.
 */

import type { Metadata } from 'next';
import Link from 'next/link';
import { readAdminProducts } from '@/lib/admin-store';

export const metadata: Metadata = {
  title: "Crane's List — TheGiftShuffle",
  description: 'A curated list of items — pick something you love!',
  robots: 'noindex',
};

export default async function CranesPage() {
  const all = await readAdminProducts();
  const items = all.filter(p => p.cranes && p.status === 'published');

  return (
    <div className="min-h-screen" style={{ background: '#FFFAF5' }}>

      {/* Header */}
      <div className="max-w-2xl mx-auto px-4 pt-12 pb-6 text-center">
        <div className="text-5xl mb-4">🎁</div>
        <h1 className="text-3xl font-extrabold mb-2" style={{ color: '#1A202C' }}>
          Crane&apos;s List
        </h1>
        <p className="text-gray-500 text-base max-w-md mx-auto">
          Hey! If you&apos;re here, you&apos;re a friend or family member — thanks for stopping by.
          Pick anything on this list and grab it on Amazon. Every purchase helps! 🙏
        </p>
      </div>

      {/* Items */}
      <div className="max-w-2xl mx-auto px-4 pb-16 space-y-4">
        {items.length === 0 ? (
          <div className="bg-white rounded-2xl border border-[#E2E8F0] p-12 text-center">
            <p className="text-gray-400 text-sm">No items yet — check back soon!</p>
          </div>
        ) : items.map(item => (
          <div
            key={item.id}
            className="bg-white rounded-2xl border border-[#E2E8F0] p-5 flex items-center gap-5"
          >
            {/* Image */}
            {item.image ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={item.image}
                alt={item.name}
                className="w-20 h-20 object-contain flex-shrink-0 rounded-xl bg-gray-50 p-1"
              />
            ) : (
              <div className="w-20 h-20 flex-shrink-0 rounded-xl bg-gray-100 flex items-center justify-center text-3xl">
                🎁
              </div>
            )}

            {/* Details */}
            <div className="flex-1 min-w-0">
              <h2 className="font-bold text-sm leading-snug mb-0.5" style={{ color: '#1A202C' }}>
                {item.name}
              </h2>
              {item.description && (
                <p className="text-xs text-gray-500 mb-2 line-clamp-2">{item.description}</p>
              )}
              {item.priceDisplay && (
                <span className="text-sm font-extrabold" style={{ color: '#1A202C' }}>
                  {item.priceDisplay}
                </span>
              )}
            </div>

            {/* CTA */}
            <a
              href={item.affiliateUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-amazon font-bold text-sm px-5 py-3 rounded-xl flex-shrink-0"
            >
              Buy on Amazon
            </a>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="text-center pb-10">
        <Link href="/" className="text-sm text-gray-400 hover:text-[#E64126] transition-colors">
          ← Back to TheGiftShuffle
        </Link>
      </div>

    </div>
  );
}
