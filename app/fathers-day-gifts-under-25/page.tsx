import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import Navbar from '@/components/Navbar';
import Breadcrumbs from '@/components/Breadcrumbs';
import { products } from '@/data/products';
import ProductCard from '@/components/ProductCard';
import InlineShuffle from '@/components/InlineShuffle';

export const metadata: Metadata = {
  title: "Father's Day Gifts Under $25 (2026): Best Affordable Picks | TheGiftShuffle",
  description:
    "The best Father's Day gifts under $25 in 2026. Pocket multi-tools, leather card holders, BBQ rub sets, and more, thoughtful picks for Dad at every budget.",
  keywords: [
    "fathers day gifts under 25",
    "fathers day gifts under $25",
    "cheap fathers day gifts",
    "affordable fathers day gifts 2026",
    "best fathers day gifts under 25 dollars",
  ],
  openGraph: {
    title: "Father's Day Gifts Under $25 (2026) | TheGiftShuffle",
    description:
      "Great Father's Day gifts for under $25, including pocket multi-tools, leather wallets, BBQ rubs, and more.",
    type: 'website',
    url: 'https://thegiftshuffle.com/fathers-day-gifts-under-25',
  },
  alternates: {
    canonical: 'https://thegiftshuffle.com/fathers-day-gifts-under-25',
  },
};

const fathersDayUnder25 = products
  .filter(
    (p) =>
      (p.recipients.includes('dad') || p.recipients.includes('him')) &&
      p.price <= 25
  )
  .sort((a, b) => b.rating - a.rating || b.reviewCount - a.reviewCount);

const faqs = [
  {
    q: "What are the best Father's Day gifts under $25?",
    a: "The best Father's Day gifts under $25 are: a pocket multi-tool (14-in-1 stainless steel fits any lifestyle), a slim leather card holder, an artisan BBQ spice rub trio, a stainless steel hip flask, and a beard grooming kit. These are all everyday-use gifts that feel considered, not filler.",
  },
  {
    q: "Can you get a good Father's Day gift for under $25?",
    a: "Absolutely. The under-$25 range has some of the highest everyday-use gift density of any price point. A quality pocket multi-tool, a leather card holder, or a set of funny novelty socks are all gifts he will actually reach for repeatedly. Focus on things with daily use cases rather than one-time novelty.",
  },
  {
    q: "What practical gifts for Dad are under $25?",
    a: "Under $25, the most practical gifts for Dad are: a pocket multi-tool (handy for anything), a magnetic wristband for holding screws during DIY projects, a leather card holder to replace his bulky wallet, a stainless steel flask for his weekend bag, and a BBQ spice rub set for the grill master. All are genuinely used, not decorative.",
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
  name: "Father's Day Gifts Under $25",
  description: "Hand-picked Father's Day gifts under $25, curated by TheGiftShuffle",
  url: 'https://thegiftshuffle.com/fathers-day-gifts-under-25',
  numberOfItems: fathersDayUnder25.length,
  itemListElement: fathersDayUnder25.map((p, i) => ({
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

export default function FathersDayGiftsUnder25Page() {
  return (
    <div className="min-h-screen flex flex-col" style={{ background: '#FFFAF5' }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <Navbar />
      <Breadcrumbs
        items={[
          { label: "Father's Day Gifts", href: '/fathers-day-gifts' },
          { label: 'Under $25', href: '/fathers-day-gifts-under-25' },
        ]}
      />

      <main id="main-content" className="flex-1">
        {/* Hero image */}
        <section className="max-w-5xl mx-auto px-4 pt-8">
          <div className="relative w-full rounded-2xl overflow-hidden" style={{ aspectRatio: '3/2', maxHeight: '420px' }}>
            <Image
              src="/images/heroes/fathers-day-gifts-under-25.jpg"
              alt="An affordable Father's Day gift wrapped on a table"
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
            The Best Father&apos;s Day Gifts Under $25
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
            You don&apos;t need a big budget to get Dad something he actually uses. Under $25 covers a genuine
            leather card holder, a pocket multi-tool he&apos;ll carry for years, or an artisan BBQ spice rub set
            for the grill master. These are everyday gifts, chosen, not grabbed off a shelf.
          </p>
        </section>

        {/* Product Grid */}
        <section className="max-w-5xl mx-auto px-4 py-8">
          <h2 className="text-2xl font-bold mb-2" style={{ color: '#1A202C' }}>
            Father&apos;s Day Gifts Under $25
          </h2>
          <p className="text-sm text-gray-500 mb-6">Sorted by customer rating.</p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {fathersDayUnder25.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>

        {/* Inline Shuffle */}
        <section className="max-w-5xl mx-auto px-4 py-6">
          <InlineShuffle products={fathersDayUnder25} heading="Shuffle Under-$25 Picks for Dad" />
        </section>

        {/* CTA */}
        <section className="bg-white py-12 px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl font-bold mb-4" style={{ color: '#1A202C' }}>
              Want a Personalized Pick?
            </h2>
            <p className="text-gray-600 mb-6">
              Use TheGiftShuffle. Pick Dad, set your budget to under $25, and get an instant recommendation.
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
          <h2 className="text-xl font-bold mb-4" style={{ color: '#1A202C' }}>More Father&apos;s Day Gift Guides</h2>
          <div className="flex flex-wrap gap-3">
            {[
              { href: '/fathers-day-gifts', label: "All Father's Day Gifts" },
              { href: '/fathers-day-gifts-under-50', label: "Father's Day Gifts Under $50" },
              { href: '/fathers-day-gifts-under-100', label: "Father's Day Gifts Under $100" },
              { href: '/gift-ideas-for-dad', label: 'Gift Ideas for Dad' },
              { href: '/gift-ideas-for-him', label: 'Gift Ideas for Him' },
              { href: '/gifts-under-25', label: 'All Gifts Under $25' },
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
