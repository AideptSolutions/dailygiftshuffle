import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import Navbar from '@/components/Navbar';
import Breadcrumbs from '@/components/Breadcrumbs';
import { products } from '@/data/products';
import ProductCard from '@/components/ProductCard';
import InlineShuffle from '@/components/InlineShuffle';

export const metadata: Metadata = {
  title: "Mother's Day Gifts Under $100 | TheGiftShuffle",
  description:
    "The best Mother's Day gifts under $100 for 2026. Thoughtful picks including spa sets, jewelry, skincare, kitchen upgrades, and cozy gifts, all under a hundred dollars.",
  keywords: [
    "mothers day gifts under 100",
    "mothers day gifts under $100",
    "best mothers day gifts under 100",
    "affordable mothers day gifts 2026",
    "mothers day gift ideas under 100",
  ],
  openGraph: {
    title: "Mother's Day Gifts Under $100 | TheGiftShuffle",
    description:
      "Browse the best Mother's Day gifts under $100: spa sets, jewelry, skincare, kitchen tools, and more.",
    type: 'website',
    url: 'https://www.thegiftshuffle.com/mothers-day-gifts-under-100',
  },
  alternates: {
    canonical: 'https://www.thegiftshuffle.com/mothers-day-gifts-under-100',
  },
};

const under100Products = products.filter(
  (p) =>
    p.occasions?.includes('mothersFathers') &&
    (p.recipients.includes('her') || p.recipients.includes('mom')) &&
    p.price <= 100
);

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.thegiftshuffle.com' },
    { '@type': 'ListItem', position: 2, name: "Mother's Day Gifts", item: 'https://www.thegiftshuffle.com/mothers-day-gifts' },
    { '@type': 'ListItem', position: 3, name: "Under $100", item: 'https://www.thegiftshuffle.com/mothers-day-gifts-under-100' },
  ],
};

const itemListSchema = {
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  name: "Mother's Day Gifts Under $100",
  description: "Hand-picked Mother's Day gifts under $100 curated by TheGiftShuffle",
  url: 'https://www.thegiftshuffle.com/mothers-day-gifts-under-100',
  numberOfItems: under100Products.length,
  itemListElement: under100Products.map((p, i) => ({
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

const faqs = [
  {
    q: "What are the best Mother's Day gifts under $100?",
    a: "The best Mother's Day gifts under $100 include silk pajama sets, personalized birthstone jewelry, a luxury skincare set, a premium kitchen tool like a Dutch oven, or a plush spa robe. Each feels indulgent without needing a group contribution.",
  },
  {
    q: "What can you get Mom for under $100?",
    a: "Under $100 covers a lot: a name-engraved necklace, a high-end candle and bath set, a quality cookware upgrade, a cozy weighted blanket, or a curated coffee or tea sampler. The trick is picking one nice thing instead of several cheap ones.",
  },
  {
    q: "Are Mother's Day gifts under $100 still thoughtful?",
    a: "Yes. Thoughtfulness comes from the match, not the price. A $40 gift tied to a hobby she loves beats a generic $200 splurge. Personalization, her favorite scent, or an upgrade to something she uses daily all read as genuinely considered.",
  },
  {
    q: "When is Mother's Day 2026?",
    a: "Mother's Day 2026 is Sunday, May 10. It always falls on the second Sunday of May. Order physical gifts by May 4 with standard shipping, or May 7 with expedited shipping, to be safe.",
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

export default function MothersDayGiftsUnder100Page() {
  return (
    <div className="min-h-screen flex flex-col" style={{ background: '#FFFAF5' }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <Navbar />
      <Breadcrumbs
        items={[
          { label: "Mother's Day Gifts", href: '/mothers-day-gifts' },
          { label: 'Under $100', href: '/mothers-day-gifts-under-100' },
        ]}
      />

      <main id="main-content" className="flex-1">
        {/* Hero image */}
        <section className="max-w-5xl mx-auto px-4 pt-8">
          <div className="relative w-full rounded-2xl overflow-hidden" style={{ aspectRatio: '3/2', maxHeight: '420px' }}>
            <Image
              src="/images/heroes/mothers-day-gifts-under-100.jpg"
              alt="A Mother's Day gift under $100 with flowers"
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
            Mother&apos;s Day Gifts Under $100
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
            A hundred dollars is the sweet spot for Mother&apos;s Day gifting. It buys you something genuinely special
            without needing a group contribution or an awkward conversation about the budget. In this range you get
            silk pajamas, personalized jewelry, luxury skincare sets, premium kitchen tools, and spa experiences
            that actually feel indulgent. Every pick below lands at $100 or under and feels like you spent more.
          </p>
        </section>

        {/* Inline Shuffle */}
        <section className="max-w-5xl mx-auto px-4 py-6">
          <InlineShuffle products={under100Products} heading="Shuffle Under-$100 Picks" />
        </section>

        {/* Product Grid */}
        <section className="max-w-5xl mx-auto px-4 py-8">
          <h2 className="text-2xl font-bold mb-6" style={{ color: '#1A202C' }}>
            Mother&apos;s Day Gifts Under $100
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {under100Products.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>

        {/* Value CTA */}
        <section className="bg-white py-12 px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl font-bold mb-4" style={{ color: '#1A202C' }}>
              Find the Perfect Price Point
            </h2>
            <p className="text-gray-600 mb-6">
              Use TheGiftShuffle to narrow down picks by budget and recipient. Set your max spend, pick Mom, and get a personalized recommendation in seconds.
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
        <section className="max-w-5xl mx-auto px-4 py-12">
          <h2 className="text-xl font-bold mb-4" style={{ color: '#1A202C' }}>Related Gift Guides</h2>
          <div className="flex flex-wrap gap-3">
            {[
              { href: '/', label: 'Home' },
              { href: '/mothers-day-gifts', label: "All Mother's Day Gifts" },
              { href: '/mothers-day-gifts-for-wife', label: "Mother's Day Gifts for Wife" },
              { href: '/mothers-day-gifts-under-50', label: "Mother's Day Gifts Under $50" },
              { href: '/mothers-day-gifts-under-25', label: "Mother's Day Gifts Under $25" },
              { href: '/gifts-under-100', label: 'All Gifts Under $100' },
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
