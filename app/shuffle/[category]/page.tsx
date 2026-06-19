import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import Navbar from '@/components/Navbar';
import Breadcrumbs from '@/components/Breadcrumbs';
import ShuffleGrid from './ShuffleGrid';
import { CATEGORY_META } from './categoryMeta';

export function generateStaticParams() {
  return Object.keys(CATEGORY_META).map((category) => ({ category }));
}

export function generateMetadata({ params }: { params: { category: string } }): Metadata {
  const meta = CATEGORY_META[params.category];
  const label = meta?.label ?? 'Gift';
  const title = `${label} Gift Shuffle: Discover Top-Rated Picks | TheGiftShuffle`;
  const description = meta?.intro ?? `Shuffle through top-rated ${label.toLowerCase()} gift ideas at every budget.`;
  const url = `https://thegiftshuffle.com/shuffle/${params.category}`;
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: 'website',
      url,
      images: [
        {
          url: `https://www.thegiftshuffle.com/api/og?title=${encodeURIComponent(label + ' Gift Shuffle')}`,
          width: 1200,
          height: 630,
        },
      ],
    },
    alternates: { canonical: url },
  };
}

const FALLBACK = {
  label: 'Gift',
  desc: 'Shuffle through top-rated gift ideas.',
  intro: 'Hit shuffle for a fresh, top-rated gift idea every click.',
  related: [{ href: '/shuffle', label: 'All Shuffles' }],
};

export default function CategoryShufflePage({ params }: { params: { category: string } }) {
  const category = params.category;
  const meta = CATEGORY_META[category] ?? FALLBACK;
  const hero = CATEGORY_META[category]
    ? `/images/heroes/shuffle-${category}.jpg`
    : '/images/heroes/gifts-under-50.jpg';

  return (
    <div className="min-h-screen flex flex-col" style={{ background: 'linear-gradient(135deg, #FFFAF5 0%, #fff9e6 100%)' }}>
      <Navbar />
      <Breadcrumbs
        items={[
          { label: 'Shuffle', href: '/shuffle' },
          { label: `${meta.label} Gifts`, href: `/shuffle/${category}` },
        ]}
      />

      <main id="main-content" tabIndex={-1} className="flex-1 max-w-5xl mx-auto px-4 py-8 w-full">
        {/* Hero image */}
        <section className="mb-8">
          <div className="relative w-full rounded-2xl overflow-hidden" style={{ aspectRatio: '16/6', maxHeight: '300px' }}>
            <Image
              src={hero}
              alt={`${meta.label} gift ideas to shuffle through`}
              fill
              className="object-cover"
              priority
              unoptimized
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/15 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-7">
              <Link
                href="/shuffle"
                className="text-xs font-semibold text-white/80 hover:text-white mb-1 inline-block transition-colors"
              >
                All Shuffles
              </Link>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-white drop-shadow-sm">{meta.label} Gifts</h1>
            </div>
          </div>
          <p className="text-gray-600 text-base leading-relaxed max-w-2xl mt-4">{meta.intro}</p>
        </section>

        {/* Interactive shuffle */}
        <ShuffleGrid category={category} label={meta.label} />

        {/* Related rich guides */}
        <section className="mt-12 border-t border-gray-100 pt-8">
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-4">
            Explore {meta.label} gifts in more detail
          </p>
          <div className="flex flex-wrap gap-3">
            {meta.related.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="border border-[#F04E30] text-[#F04E30] px-4 py-2 rounded-full text-sm font-medium hover:bg-[#F04E30] hover:text-white transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </section>

        {/* Browse other shuffle categories */}
        <section className="mt-10 border-t border-gray-100 pt-8">
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-4">Browse other categories</p>
          <div className="flex flex-wrap gap-2">
            {Object.entries(CATEGORY_META)
              .filter(([slug]) => slug !== category)
              .map(([slug, m]) => (
                <Link
                  key={slug}
                  href={`/shuffle/${slug}`}
                  className="px-3 py-1.5 rounded-full text-xs font-semibold border border-gray-200 text-gray-600 hover:border-[#F04E30] hover:text-[#F04E30] transition-colors bg-white"
                >
                  {m.label}
                </Link>
              ))}
          </div>
        </section>
      </main>
    </div>
  );
}
