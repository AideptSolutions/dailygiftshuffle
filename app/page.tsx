export const revalidate = 300; // Cache page for 5 min, regenerate in background

import Link from 'next/link';
import Image from 'next/image';
import type { Metadata } from 'next';
import Navbar from '@/components/Navbar';
import JsonLd from '@/components/JsonLd';
import MothersDayBanner from '@/components/MothersDayBanner';
import HomeFeaturedSection from '@/components/HomeFeaturedSection';
import GiftCupAnimation from '@/components/GiftCupAnimation';
import GiftPackageCollections from '@/components/GiftPackageCollections';
import { getPublishedAdminProducts } from '@/lib/admin-store';
import { getCategoryImageUrl, isAmazonCdnUrl } from '@/lib/categoryImages';
import { products as allProducts } from '@/data/products';

export const metadata: Metadata = {
  title: 'TheGiftShuffle: Find the Perfect Gift in Seconds',
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
    href: '/top-10-fathers-day-gifts-2026',
    image: '/img/gift-guides/dad.jpg',
    alt: "Top 10 Father's Day gifts 2026 - gadgets, grilling gear, and experiences",
    title: "Father's Day Top 10",
    desc: 'The 10 best gifts for dad in 2026, ranked. June 21 is coming fast.',
  },
  {
    href: '/mothers-day-gifts',
    image: '/img/mothers-day-hero-2026.jpg',
    alt: "Mother's Day gifts including skincare, shower steamers, pajamas, and spa sets",
    title: 'Gifts for Mom',
    desc: 'Shower steamers, skincare, cozy pajamas, and spa sets she will actually use.',
  },
  {
    href: '/gift-ideas-for-him',
    image: '/img/gift-guides/him.jpg',
    alt: 'Gift ideas for him, smartwatch, earbuds, and accessories',
    title: 'Gifts for Him',
    desc: 'Practical picks for husbands, boyfriends, and best friends.',
  },
  {
    href: '/gift-ideas-for-her',
    image: '/img/gift-guides/her.jpg',
    alt: 'Gift ideas for her, perfume, jewelry, and skincare',
    title: 'Gifts for Her',
    desc: 'From self-care to personal style, gifts she\'ll adore.',
  },
  {
    href: '/gifts-under-50',
    image: '/img/gift-guides/under-50.jpg',
    alt: 'Gifts under $50, candle, book, mug, and plant',
    title: 'Gifts Under $50',
    desc: 'Great gifts that prove you don\'t need a big budget.',
  },
  {
    href: '/christmas-gift-ideas',
    image: '/img/gift-guides/christmas.jpg',
    alt: 'Christmas gift ideas, wrapped presents and holiday decor',
    title: 'Christmas Gift Ideas',
    desc: 'Top holiday picks for everyone on your list.',
  },
  {
    href: '/birthday-gift-ideas',
    image: '/img/gift-guides/birthday.jpg',
    alt: 'Birthday gift ideas, wrapped present, balloons, and confetti',
    title: 'Birthday Gift Ideas',
    desc: 'Unique picks that make birthdays unforgettable.',
  },
  {
    href: '/gift-ideas-for-kids',
    image: '/img/gift-guides/kids.jpg',
    alt: 'Gifts for kids, LEGO, building blocks, and toys',
    title: 'Gifts for Kids and Grandkids',
    desc: 'Age-appropriate picks from tots to teens that they will actually play with.',
  },
  {
    href: '/gifts-for-camping-and-outdoors',
    image: '/img/gift-guides/outdoors.jpg',
    alt: 'Gifts for camping and outdoors, headlamp, knife, and gear',
    title: 'Gifts for Camping and the Outdoors',
    desc: 'Gear that actually gets used on every trip, from day hikes to base camp.',
  },
  {
    href: '/category/baby-shower',
    image: '/img/gift-guides/baby-shower.jpg',
    alt: 'Baby shower gift ideas, swaddle, plush toys, and accessories',
    title: 'Baby Shower Gifts',
    desc: 'From practical must-haves to heartfelt keepsakes for the new arrival.',
  },
  {
    href: '/category/wedding',
    image: '/img/gift-guides/wedding.jpg',
    alt: 'Wedding gift ideas, champagne, keepsakes, and couples gifts',
    title: 'Wedding Gifts',
    desc: 'Thoughtful picks for the happy couple, registry hits and beyond.',
  },
  {
    href: '/category/travel',
    image: '/img/gift-guides/travel.jpg',
    alt: 'Travel gift ideas, passport holder, earbuds, and luggage',
    title: 'Travel Gifts',
    desc: 'For the frequent flyer or adventure seeker on your list.',
  },
  {
    href: '/graduation-gifts',
    image: '/img/gift-guides/birthday.jpg',
    alt: 'Graduation gift ideas, diploma, laptop, and luggage',
    title: 'Graduation Gifts',
    desc: 'Practical picks for grads heading to college, work, or their first apartment.',
  },
];

// Top 10 Father's Day gifts, pulled from shared product data
const TOP_10_DADS_IDS = ['dad-fd-1','dad-fd-2','dad-fd-3','dad-fd-4','dad-fd-5','dad-fd-6','dad-fd-7','dad-fd-8','dad-fd-9','dad-fd-10'];
const productMap = Object.fromEntries(allProducts.map((p) => [p.id, p]));
const top10Dads = TOP_10_DADS_IDS.map((id) => productMap[id]).filter(Boolean);

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
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'What is TheGiftShuffle?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'TheGiftShuffle is an AI-curated gift discovery platform that helps you find unique, personalized gift ideas filtered by recipient, occasion, and budget.',
        },
      },
      {
        '@type': 'Question',
        name: 'How does the gift shuffle work?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Enter who you are shopping for and your budget, and TheGiftShuffle instantly surfaces a curated set of gift ideas. Shuffle again to see new options, or save favorites to your list.',
        },
      },
      {
        '@type': 'Question',
        name: 'Are the gifts on TheGiftShuffle available on Amazon?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Most gifts link to Amazon, Target, REI, and other major retailers via affiliate links. Prices and availability are subject to change.',
        },
      },
      {
        '@type': 'Question',
        name: 'What is the best gift under $50?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'TheGiftShuffle curates hundreds of gifts under $50 across categories including tech gadgets, home goods, experiences, and more, all hand-reviewed for quality and uniqueness.',
        },
      },
    ],
  };

  return (
    <div className="min-h-screen flex flex-col">
      <JsonLd data={faqSchema} id="homepage-faq-schema" />
      <Navbar />
      <MothersDayBanner />

      {/* Hero */}
      <section
        className="flex-1 flex flex-col items-center justify-center text-center px-4 py-8"
        style={{ background: '#FFFFFF' }}
      >
        <h1 className="text-4xl sm:text-6xl font-extrabold leading-tight mb-4 max-w-3xl" style={{ color: '#1A202C' }}>
          Find the{' '}
          <span style={{ color: '#F04E30' }}>Perfect Gift</span>
          <br />in Seconds
        </h1>
        <p className="text-lg sm:text-xl text-gray-600 max-w-xl mb-2">
          Pick a recipient, set a budget, and hit{' '}
          <strong style={{ color: '#F04E30' }}>SHUFFLE</strong>
        </p>
        <p className="text-base sm:text-lg text-gray-500 max-w-xl mb-10">
          receive a curated selection of gift recommendations with each click
        </p>

        {/* Cup animation */}
        <div className="-mt-8 -mb-3">
          <GiftCupAnimation />
        </div>

        {/* Featured gifts + shuffle widgets */}
        <div className="w-full mt-2">
          <HomeFeaturedSection initialProducts={products} />
        </div>
      </section>

      {/* Gift Package Collections */}
      <GiftPackageCollections />

      {/* Father's Day Top 10 */}
      <section className="py-14 px-4" style={{ background: '#FFF8F0' }}>
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center justify-between mb-2 flex-wrap gap-2">
            <div>
              <span className="text-xs font-semibold uppercase tracking-widest" style={{ color: '#F04E30' }}>Father&apos;s Day, June 21</span>
              <h2 className="text-2xl sm:text-3xl font-extrabold mt-1" style={{ color: '#1A202C' }}>
                Top 10 Gifts for Dad in 2026
              </h2>
            </div>
            <Link
              href="/top-10-fathers-day-gifts-2026"
              className="text-sm font-semibold px-4 py-2 rounded-full border-2 transition-all hover:bg-[#F04E30] hover:text-white"
              style={{ borderColor: '#F04E30', color: '#F04E30' }}
            >
              See Full Guide &rarr;
            </Link>
          </div>
          <p className="text-sm text-gray-500 mb-6">Ranked by what dads actually use, not what gets recycled every year.</p>

          {/* Horizontal scroll on mobile, 5-col grid on desktop */}
          <div className="flex gap-3 overflow-x-auto pb-2 sm:grid sm:grid-cols-5 sm:overflow-visible scrollbar-hide">
            {top10Dads.map((p, i) => (
              <a
                key={p.id}
                href={p.affiliateUrl}
                target="_blank"
                rel="noopener noreferrer sponsored"
                className="group flex-shrink-0 w-40 sm:w-auto bg-white rounded-2xl border border-[#E2E8F0] hover:border-[#F04E30] hover:shadow-md transition-all flex flex-col overflow-hidden"
              >
                <div className="relative w-full" style={{ height: '120px' }}>
                  <Image
                    src={p.image}
                    alt={p.name}
                    fill
                    unoptimized
                    className="object-cover"
                  />
                  <span
                    className="absolute top-2 left-2 w-6 h-6 rounded-full flex items-center justify-center text-xs font-extrabold text-white shadow"
                    style={{ background: '#F04E30' }}
                  >
                    {i + 1}
                  </span>
                </div>
                <div className="p-3 flex flex-col gap-1 flex-1">
                  <p className="text-xs font-bold leading-tight text-[#1A202C] group-hover:text-[#F04E30] transition-colors line-clamp-2">{p.name}</p>
                  <p className="text-xs font-semibold mt-auto" style={{ color: '#F04E30' }}>{p.priceDisplay}</p>
                </div>
              </a>
            ))}
          </div>

          <div className="text-center mt-6">
            <Link
              href="/top-10-fathers-day-gifts-2026"
              className="inline-block text-sm font-bold px-8 py-3 rounded-full text-white transition-all hover:opacity-90"
              style={{ background: '#F04E30' }}
            >
              View Full Top 10 List &rarr;
            </Link>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 px-4" style={{ background: '#FFF3EE' }}>
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
                  style={{ background: '#FFF8EE', border: '2px solid #F04E30', color: '#F04E30' }}
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
      <section className="py-16 px-4" style={{ background: '#FFF3EE' }}>
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {features.map((f) => (
              <div key={f.title} className="rounded-2xl p-6 shadow-sm border border-[#F04E30]/20 text-center" style={{ background: '#FFFFFF' }}>
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
            Browse our hand-curated gift guides, filtered by recipient, budget, and occasion.
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {giftGuides.map((guide) => (
              <Link
                key={guide.href}
                href={guide.href}
                className="group bg-white border border-[#E2E8F0] rounded-2xl overflow-hidden shadow-sm hover:border-[#F04E30] hover:shadow-md transition-all flex flex-col"
              >
                <div className="relative w-full overflow-hidden" style={{ height: '120px' }}>
                  <Image
                    src={guide.image}
                    alt={guide.alt}
                    fill
                    unoptimized
                    className="object-cover transition-transform duration-200 group-hover:scale-[1.1]"
                  />
                </div>
                <div className="p-4 flex flex-col gap-1">
                  <h3 className="font-bold text-sm text-[#1A202C] group-hover:text-[#F04E30] transition-colors leading-tight">
                    {guide.title}
                  </h3>
                  <p className="text-xs text-gray-500 leading-relaxed">{guide.desc}</p>
                </div>
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

        {/* ── TEMP: Crane's wishlist page, remove once creator API access is approved ── */}
        <div className="mt-4">
          <Link
            href="/cranes"
            className="text-white/70 hover:text-white text-sm font-medium underline underline-offset-4 transition-colors"
          >
            Crane&apos;s List
          </Link>
        </div>
        {/* ── END TEMP ── */}
      </section>
    </div>
  );
}
