import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import Navbar from '@/components/Navbar';
import Breadcrumbs from '@/components/Breadcrumbs';
import { products } from '@/data/products';
import ProductCard from '@/components/ProductCard';
import InlineShuffle from '@/components/InlineShuffle';

export const metadata: Metadata = {
  title: "Best Mother's Day Gifts Under $25 (2026) | TheGiftShuffle",
  description:
    "The best budget-friendly Mother's Day gifts under $25: shower steamers, eye masks, slipper socks, brightening serums, and more. Great gifts don't require a big budget.",
  keywords: [
    "mothers day gifts under 25",
    "mothers day gifts under $25",
    "cheap mothers day gifts",
    "budget mothers day gift ideas",
    "inexpensive mothers day gifts 2026",
  ],
  openGraph: {
    title: "Best Mother's Day Gifts Under $25 (2026) | TheGiftShuffle",
    description:
      "Browse the best Mother's Day gifts under $25: shower steamers, eye patches, slipper socks, serums, and more.",
    type: 'website',
    url: 'https://thegiftshuffle.com/mothers-day-gifts-under-25',
  },
  alternates: {
    canonical: 'https://thegiftshuffle.com/mothers-day-gifts-under-25',
  },
};

const momTagged = products.filter(
  (p) =>
    p.topicTags?.includes('mothers-day') ||
    p.topicTags?.includes('for-mom')
);

const under25Products =
  momTagged.filter((p) => p.price <= 25).length > 0
    ? momTagged.filter((p) => p.price <= 25)
    : products.filter((p) => p.recipients.includes('mom'));

const faqs = [
  {
    q: "What are the best Mother's Day gifts under $25?",
    a: "The best Mother's Day gifts under $25 include aromatherapy shower steamers, collagen under-eye patches, fuzzy slipper socks, brightening serums from The Ordinary, and Korean sheet mask sets. These are small luxuries that feel genuinely indulgent but won't break the bank, exactly the kind of thing Mom would never buy herself.",
  },
  {
    q: "Is $25 enough to get Mom a good gift?",
    a: "Yes. A $25 gift that fits her daily routine will beat a $100 gift she never uses. Shower steamers she reaches for every morning, a pack of eye patches she uses twice a week, or a set of plush slipper socks she wears all winter. These are $25 gifts that earn a permanent place in her life.",
  },
  {
    q: "What self-care gifts for Mom are under $25?",
    a: "Under $25, you can find excellent self-care gifts: JoJowell aromatherapy shower steamers, Grace & Stella restoring eye masks (24 pairs), The Ordinary Alpha Arbutin brightening serum, cozy fuzzy slipper socks (7-pack), and Korean sheet mask sets. All are under $25 and feel like a luxury treat.",
  },
  {
    q: "What can I get Mom for Mother's Day that she'll actually use?",
    a: "Budget-friendly gifts that earn daily use: a multi-pack of shower steamers for her morning routine, under-eye patches she can use while watching her show at night, plush slipper socks she'll wear every morning, or a small skincare serum that fits neatly into her existing routine. Practical self-care items win every time.",
  },
];

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map((f) => ({
    '@type': 'Question',
    name: f.q,
    acceptedAnswer: { '@type': 'Answer', text: f.a },
  })),
};

const itemListSchema = {
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  name: "Mother's Day Gifts Under $25",
  description: "Hand-picked Mother's Day gifts under $25 curated by TheGiftShuffle",
  url: 'https://thegiftshuffle.com/mothers-day-gifts-under-25',
  numberOfItems: under25Products.length,
  itemListElement: under25Products.map((p, i) => ({
    '@type': 'ListItem',
    position: i + 1,
    item: {
      '@type': 'Product',
      name: p.name,
      image: p.image.startsWith('http') ? p.image : `https://www.thegiftshuffle.com${p.image}`,
      ...(p.description ? { description: p.description } : {}),
      offers: { '@type': 'Offer', price: p.price, priceCurrency: 'USD', availability: 'https://schema.org/InStock', url: p.affiliateUrl },
      ...(p.rating > 0 && p.reviewCount > 0 ? { aggregateRating: { '@type': 'AggregateRating', ratingValue: p.rating, reviewCount: p.reviewCount } } : {}),
    },
  })),
};

export default function MothersDayGiftsUnder25Page() {
  return (
    <div className="min-h-screen flex flex-col" style={{ background: '#FFFAF5' }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <Navbar />
      <Breadcrumbs
        items={[
          { label: "Mother's Day Gifts", href: '/mothers-day-gifts' },
          { label: "Under $25", href: '/mothers-day-gifts-under-25' },
        ]}
      />

      <main id="main-content" className="flex-1">
        {/* Hero image */}
        <section className="max-w-5xl mx-auto px-4 pt-8">
          <div className="relative w-full rounded-2xl overflow-hidden" style={{ aspectRatio: '3/2', maxHeight: '420px' }}>
            <Image
              src="/images/heroes/mothers-day-gifts-under-25.jpg"
              alt="An affordable Mother's Day gift with flowers"
              fill
              className="object-cover"
              priority
              unoptimized
            />
          </div>
        </section>
        {/* Hero */}
        <section className="max-w-5xl mx-auto px-4 pt-8 pb-6 text-center">
          <h1 className="text-4xl sm:text-5xl font-extrabold mb-4" style={{ color: '#1A202C' }}>
            The Best Mother&apos;s Day Gifts Under $25 in 2026
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Great gifts don&apos;t require a big budget. They require knowing what Mom will actually use. Under $25, you can find shower steamers that turn her morning commute prep into a spa moment, under-eye patches she reaches for every night, and slipper socks so soft she&apos;ll never want to take them off. The price isn&apos;t the point. The thought, and the daily ritual it creates, is.
          </p>
        </section>

        {/* Product Grid */}
        <section className="max-w-5xl mx-auto px-4 py-8">
          <h2 className="text-2xl font-bold mb-6" style={{ color: '#1A202C' }}>
            Mother&apos;s Day Gifts Under $25
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {under25Products.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>

        {/* Inline Shuffle */}
        <section className="max-w-5xl mx-auto px-4 py-6">
          <InlineShuffle products={under25Products} heading="Shuffle Under-$25 Picks" />
        </section>

        {/* How TheGiftShuffle Works */}
        <section className="bg-white py-12 px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl font-bold mb-4" style={{ color: '#1A202C' }}>
              How TheGiftShuffle Works
            </h2>
            <p className="text-gray-600 mb-6">
              Want more ideas at any budget? Use TheGiftShuffle to pick Mom, set your budget, and get
              a personalized recommendation in seconds.
            </p>
            <Link
              href="/shuffle"
              className="inline-block bg-[#F04E30] text-white font-bold px-10 py-4 rounded-full hover:opacity-90 transition-opacity text-lg"
            >
              Try the Gift Shuffle →
            </Link>
          </div>
        </section>

        {/* FAQ */}
        <section className="max-w-3xl mx-auto px-4 py-12">
          <h2 className="text-2xl font-bold mb-8" style={{ color: '#1A202C' }}>
            Frequently Asked Questions
          </h2>
          <div className="space-y-6">
            {faqs.map((faq) => (
              <div key={faq.q} className="bg-white rounded-2xl p-6 shadow-sm border border-[#E2E8F0]">
                <h3 className="font-bold text-[#1A202C] mb-2">{faq.q}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Internal Links */}
        <section className="max-w-5xl mx-auto px-4 pb-12">
          <h2 className="text-xl font-bold mb-4" style={{ color: '#1A202C' }}>Related Gift Guides</h2>
          <div className="flex flex-wrap gap-3">
            {[
              { href: '/mothers-day-gifts', label: "All Mother's Day Gifts" },
              { href: '/mothers-day-gifts-under-50', label: "Mother's Day Gifts Under $50" },
              { href: '/gift-ideas-for-mom', label: 'Gift Ideas for Mom' },
              { href: '/gifts-under-25', label: 'Gifts Under $25' },
            ].map((link) => (
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
      </main>
    </div>
  );
}
