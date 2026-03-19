import type { Metadata } from 'next';
import Link from 'next/link';
import Navbar from '@/components/Navbar';

export const metadata: Metadata = {
  title: 'Gift Ideas Blog — Guides, Trends & Tips | TheGiftShuffle',
  description:
    'The TheGiftShuffle blog — gift guides, trending products, and tips for finding the perfect gift for anyone.',
  openGraph: {
    title: 'Gift Ideas Blog — Guides, Trends & Tips | TheGiftShuffle',
    description:
      'Gift guides, trending products, and tips for finding the perfect gift for anyone.',
    type: 'website',
    url: 'https://thegiftshuffle.com/blog',
  },
  alternates: {
    canonical: 'https://thegiftshuffle.com/blog',
  },
};

const upcomingPosts = [
  {
    title: "Best Gifts for 2025: What's Trending Right Now",
    teaser:
      'We dug into tens of thousands of Amazon reviews and social signals to surface the top gift picks across every category for 2025.',
  },
  {
    title: 'How to Pick the Perfect Gift for Anyone (Without Overthinking It)',
    teaser:
      'A simple framework for choosing a gift that actually lands — no matter the person, budget, or occasion.',
  },
  {
    title: "50 Gifts Under $25 That Look Way More Expensive",
    teaser:
      'Proof that budget doesn&apos;t mean cheap — these are the highest-rated sub-$25 gifts with the best perceived value.',
  },
];

export default function BlogPage() {
  return (
    <div className="min-h-screen flex flex-col" style={{ background: '#FFFAF5' }}>
      <Navbar />

      <main id="main-content" className="flex-1">
        {/* Hero */}
        <section className="max-w-5xl mx-auto px-4 pt-10 pb-6 text-center">
          <h1 className="text-4xl sm:text-5xl font-extrabold mb-4" style={{ color: '#1A202C' }}>
            The Gift Ideas Blog
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Gift guides, trending picks, and practical tips for finding the perfect gift — for anyone,
            any occasion, any budget. New posts coming soon.
          </p>
        </section>

        {/* Upcoming Posts */}
        <section className="max-w-5xl mx-auto px-4 py-10">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {upcomingPosts.map((post) => (
              <div
                key={post.title}
                className="bg-white rounded-2xl p-6 shadow-sm border border-[#E2E8F0] flex flex-col gap-3"
              >
                <span
                  className="inline-block self-start text-xs font-bold px-3 py-1 rounded-full text-white"
                  style={{ background: '#F04E30' }}
                >
                  Coming Soon
                </span>
                <h2 className="text-lg font-bold leading-snug" style={{ color: '#1A202C' }}>
                  {post.title}
                </h2>
                <p
                  className="text-sm text-gray-500 leading-relaxed"
                  dangerouslySetInnerHTML={{ __html: post.teaser }}
                />
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="bg-white py-12 px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl font-bold mb-4" style={{ color: '#1A202C' }}>
              Can&apos;t Wait? Find a Gift Right Now
            </h2>
            <p className="text-gray-600 mb-6">
              Skip the scroll. Use TheGiftShuffle to get a personalized gift recommendation
              in seconds — just pick who it&apos;s for, set your budget, and hit Shuffle.
            </p>
            <Link
              href="/shuffle"
              className="inline-block bg-[#F04E30] text-white font-bold px-10 py-4 rounded-full hover:opacity-90 transition-opacity text-lg"
            >
              Try the Gift Shuffle →
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
}
