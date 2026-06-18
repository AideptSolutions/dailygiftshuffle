import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import Navbar from '@/components/Navbar';
import Breadcrumbs from '@/components/Breadcrumbs';
import { products } from '@/data/products';
import ProductCard from '@/components/ProductCard';
import InlineShuffle from '@/components/InlineShuffle';

export const metadata: Metadata = {
  title: "Best Mother's Day Gifts Under $50 (2026) | TheGiftShuffle",
  description:
    "The best Mother's Day gifts under $50 — shower steamers, eye masks, slipper socks, bath gift sets, and skincare serums. Thoughtful doesn't have to mean expensive.",
  keywords: [
    "mothers day gifts under 50",
    "mothers day gifts under $50",
    "affordable mothers day gifts",
    "cheap mothers day gifts",
    "budget mothers day gifts 2026",
  ],
  openGraph: {
    title: "Best Mother's Day Gifts Under $50 (2026) | TheGiftShuffle",
    description:
      "Browse the best Mother's Day gifts under $50 — spa sets, skincare, cozy socks, shower steamers, and more.",
    type: 'website',
    url: 'https://thegiftshuffle.com/mothers-day-gifts-under-50',
  },
  alternates: {
    canonical: 'https://thegiftshuffle.com/mothers-day-gifts-under-50',
  },
};

const momTagged = products.filter(
  (p) =>
    p.topicTags?.includes('mothers-day') ||
    p.topicTags?.includes('for-mom')
);

const under50Products =
  momTagged.filter((p) => p.price <= 50).length > 0
    ? momTagged.filter((p) => p.price <= 50)
    : products.filter((p) => p.recipients.includes('mom'));

const faqs = [
  {
    q: "What are the best Mother's Day gifts under $50?",
    a: "The best Mother's Day gifts under $50 include shower steamers, eye masks, slipper socks, bath gift sets, and skincare serums. These are everyday luxuries that moms love but rarely buy for themselves — and all can be found at or under the $50 mark.",
  },
  {
    q: "Is $50 enough to spend on Mom for Mother's Day?",
    a: "Absolutely. Thoughtful beats expensive every time. A beautifully packaged spa gift set, a 30-pack of aromatherapy shower steamers, or a set of collagen eye patches can feel genuinely indulgent for under $50. What matters is picking something that fits her lifestyle — not hitting a price point.",
  },
  {
    q: "What self-care gifts for Mom are under $50?",
    a: "Great self-care gifts for Mom under $50: aromatherapy shower steamers, hydrating face masks, bath bombs and bath salts sets, cozy loungewear, satin pajama sets, and brightening skincare serums. These are the gifts that give her a built-in excuse to slow down.",
  },
  {
    q: "What can I get Mom for Mother's Day that she'll actually use?",
    a: "Practical self-care items win every time. Shower steamers she can use daily, a set of slipper socks she'll wear on every cold morning, an under-eye patch set for her nighttime routine — these are the gifts that earn a permanent place in her daily life rather than sitting on a shelf.",
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
  name: "Mother's Day Gifts Under $50",
  description: "Hand-picked Mother's Day gifts under $50 curated by TheGiftShuffle",
  url: 'https://thegiftshuffle.com/mothers-day-gifts-under-50',
  numberOfItems: under50Products.length,
  itemListElement: under50Products.map((p, i) => ({
    '@type': 'ListItem',
    position: i + 1,
    name: p.name,
    description: p.description,
    url: p.affiliateUrl,
  })),
};

export default function MothersDayGiftsUnder50Page() {
  return (
    <div className="min-h-screen flex flex-col" style={{ background: '#FFFAF5' }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <Navbar />
      <Breadcrumbs
        items={[
          { label: "Mother's Day Gifts", href: '/mothers-day-gifts' },
          { label: "Under $50", href: '/mothers-day-gifts-under-50' },
        ]}
      />

      <main id="main-content" className="flex-1">
        {/* Hero image */}
        <section className="max-w-5xl mx-auto px-4 pt-8">
          <div className="relative w-full rounded-2xl overflow-hidden" style={{ aspectRatio: '3/2', maxHeight: '420px' }}>
            <Image
              src="/images/heroes/mothers-day-gifts-under-50.jpg"
              alt="A Mother's Day gift under $50 with flowers"
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
            The Best Mother&apos;s Day Gifts Under $50 in 2026
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Thoughtful doesn&apos;t have to mean expensive. Some of the most meaningful gifts Mom will receive this Mother&apos;s Day cost under $50 — because they&apos;re things she needs, loves, and would never splurge on herself. Shower steamers that turn her morning into a spa, eye patches she&apos;ll use twice a week, slipper socks she&apos;ll wear until they fall apart. The gift doesn&apos;t have to be big. It has to be right.
          </p>
        </section>

        {/* Product Grid */}
        <section className="max-w-5xl mx-auto px-4 py-8">
          <h2 className="text-2xl font-bold mb-6" style={{ color: '#1A202C' }}>
            Mother&apos;s Day Gifts Under $50
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {under50Products.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>

        {/* Inline Shuffle */}
        <section className="max-w-5xl mx-auto px-4 py-6">
          <InlineShuffle products={under50Products} heading="Shuffle Under-$50 Picks" />
        </section>

        {/* How TheGiftShuffle Works */}
        <section className="bg-white py-12 px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl font-bold mb-4" style={{ color: '#1A202C' }}>
              How TheGiftShuffle Works
            </h2>
            <p className="text-gray-600 mb-6">
              Want more ideas? Use TheGiftShuffle to get a personalized Mother&apos;s Day recommendation in seconds — pick Mom, set your budget, hit Shuffle.
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
              { href: '/mothers-day-gifts-under-25', label: "Mother's Day Gifts Under $25" },
              { href: '/gift-ideas-for-mom', label: 'Gift Ideas for Mom' },
              { href: '/gifts-under-50', label: 'Gifts Under $50' },
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
