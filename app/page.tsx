export const revalidate = 300; // Cache page for 5 min, regenerate in background

import Link from 'next/link';
import type { Metadata } from 'next';
import Navbar from '@/components/Navbar';
import HomeFeaturedSection from '@/components/HomeFeaturedSection';
import { getPublishedAdminProducts } from '@/lib/admin-store';
import { getCategoryImageUrl, isAmazonCdnUrl } from '@/lib/categoryImages';

export const metadata: Metadata = {
  title: 'TheGiftShuffle — Find the Perfect Gift in Seconds',
  description:
    'Find the perfect gift for anyone in seconds. Pick a recipient, set a budget, and hit Shuffle for instant curated gift recommendations. Free to use, no sign-up required.',
  keywords: [
    'gift ideas',
    'gift finder',
    'gifts for mom',
    'gifts for dad',
    'gifts under 50',
    'birthday gift ideas',
    'christmas gift ideas',
    'unique gifts',
  ],
  openGraph: {
    type: 'website',
    url: 'https://thegiftshuffle.com',
  },
};

const features = [
  { title: 'Personalized', desc: 'Filter by recipient and budget for spot-on recommendations.' },
  { title: 'Instant',      desc: 'Get a curated gift idea in under 5 seconds. No more decision fatigue.' },
  { title: 'Ready to Buy', desc: 'Every result comes with a direct Amazon link so you can shop immediately.' },
];

const giftGuides = [
  {
    href: '/gift-ideas-for-mom',
    emoji: '🌸',
    title: 'Gifts for Mom',
    desc: 'Thoughtful picks she\'ll actually love — spa sets, jewelry, and more.',
  },
  {
    href: '/gift-ideas-for-dad',
    emoji: '🔧',
    title: 'Gifts for Dad',
    desc: 'Skip the boring tie. Gadgets, grilling gear, and experiences he\'ll use.',
  },
  {
    href: '/gift-ideas-for-him',
    emoji: '🎯',
    title: 'Gifts for Him',
    desc: 'Practical picks for husbands, boyfriends, and best friends.',
  },
  {
    href: '/gift-ideas-for-her',
    emoji: '✨',
    title: 'Gifts for Her',
    desc: 'From self-care to personal style — gifts she\'ll adore.',
  },
  {
    href: '/gifts-under-50',
    emoji: '💰',
    title: 'Gifts Under $50',
    desc: 'Great gifts that prove you don\'t need a big budget.',
  },
  {
    href: '/christmas-gift-ideas',
    emoji: '🎄',
    title: 'Christmas Gift Ideas',
    desc: 'Top holiday picks for everyone on your list.',
  },
  {
    href: '/birthday-gift-ideas',
    emoji: '🎂',
    title: 'Birthday Gift Ideas',
    desc: 'Unique picks that make birthdays unforgettable.',
  },
];

export default async function HomePage() {
  const adminProducts = await getPublishedAdminProducts();
  const products = adminProducts.map(p => ({
    id: p.id,
    name: p.name,
    description: p.description,
    price: p.price,
    priceDisplay: p.priceDisplay,
    image: isAmazonCdnUrl(p.image ?? '') ? getCategoryImageUrl(p.tags ?? []) : (p.image || getCategoryImageUrl(p.tags ?? [])),
    rating: p.rating,
    reviewCount: p.reviewCount,
    affiliateUrl: p.affiliateUrl,
    recipients: p.recipients,
    budgetTier: p.budgetTier,
    occasions: p.occasions,
    tags: p.tags,
  }));
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      {/* Hero */}
      <section
        className="flex-1 flex flex-col items-center justify-center text-center px-4 py-20"
        style={{ background: 'linear-gradient(135deg, #FFFAF5 0%, #FFF9E6 100%)' }}
      >
        <h1 className="text-4xl sm:text-6xl font-extrabold leading-tight mb-4 max-w-3xl" style={{ color: '#1A202C' }}>
          Find the{' '}
          <span style={{ color: '#F04E30' }}>Perfect Gift</span>
          <br />in Seconds
        </h1>
        <p className="text-lg sm:text-xl text-gray-600 max-w-xl mb-10">
          Pick a recipient, set a budget, and hit{' '}
          <strong style={{ color: '#F04E30' }}>SHUFFLE</strong> — we will curate a surprise gift
          recommendation just for you.
        </p>

        {/* Featured gifts + shuffle widgets */}
        <div className="w-full mt-2">
          <HomeFeaturedSection initialProducts={products} />
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-center mb-12" style={{ color: '#1A202C' }}>
            How It Works
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            {[
              { step: '1', title: 'Pick a Recipient', desc: 'Choose your Recipient or Product Category.' },
              { step: '2', title: 'Set Your Budget',  desc: 'Nine budget tiers from under $25 to $250+.' },
              { step: '3', title: 'Hit Shuffle',      desc: 'Get an instant curated gift with a buy link and save it to your wishlist.' },
            ].map((item) => (
              <div key={item.step} className="text-center">
                <div
                  className="w-16 h-16 rounded-full flex items-center justify-center text-2xl font-extrabold mx-auto mb-4"
                  style={{ background: '#FFFAF5', border: '2px solid #F04E30', color: '#F04E30' }}
                >
                  {item.step}
                </div>
                <h3 className="font-bold text-lg mb-2" style={{ color: '#1A202C' }}>{item.title}</h3>
                <p className="text-gray-500 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 px-4" style={{ background: '#FFFAF5' }}>
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {features.map((f) => (
              <div key={f.title} className="bg-white rounded-2xl p-6 shadow-sm border border-[#E2E8F0] text-center">
                <h3 className="font-bold mb-1" style={{ color: '#1A202C' }}>{f.title}</h3>
                <p className="text-gray-500 text-sm">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Gift Guides */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-center mb-3" style={{ color: '#1A202C' }}>
            Popular Gift Guides
          </h2>
          <p className="text-center text-gray-500 mb-10 text-sm">
            Browse our hand-curated gift guides — filtered by recipient, budget, and occasion.
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {giftGuides.map((guide) => (
              <Link
                key={guide.href}
                href={guide.href}
                className="group bg-white border border-[#E2E8F0] rounded-2xl p-5 shadow-sm hover:border-[#F04E30] hover:shadow-md transition-all flex flex-col gap-2"
              >
                <span className="text-3xl">{guide.emoji}</span>
                <h3 className="font-bold text-sm text-[#1A202C] group-hover:text-[#F04E30] transition-colors leading-tight">
                  {guide.title}
                </h3>
                <p className="text-xs text-gray-500 leading-relaxed">{guide.desc}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section
        className="py-20 px-4 text-center"
        style={{ background: 'linear-gradient(135deg, #F04E30 0%, #FF7F50 100%)' }}
      >
        <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-4">
          Ready to find the perfect gift?
        </h2>
        <p className="text-white/80 text-lg mb-8">Free to use. No sign-up required.</p>
        <Link
          href="/shuffle"
          className="bg-white font-bold text-xl px-12 py-5 rounded-full inline-block transition-all hover:opacity-90"
          style={{ color: '#F04E30' }}
        >
          Start Shuffling
        </Link>

        {/* ── TEMP: Crane's wishlist page — remove once creator API access is approved ── */}
        <div className="mt-4">
          <Link
            href="/cranes"
            className="text-white/70 hover:text-white text-sm font-medium underline underline-offset-4 transition-colors"
          >
            Crane&apos;s List 🎁
          </Link>
        </div>
        {/* ── END TEMP ── */}
      </section>
    </div>
  );
}
