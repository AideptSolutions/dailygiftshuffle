import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import Navbar from '@/components/Navbar';
import Breadcrumbs from '@/components/Breadcrumbs';
import { products } from '@/data/products';
import ProductCard from '@/components/ProductCard';
import InlineShuffle from '@/components/InlineShuffle';

export const metadata: Metadata = {
  title: "Father's Day Gifts Under $100 (2026): Best Picks for Dad | TheGiftShuffle",
  description:
    "The best Father's Day gifts under $100 in 2026. Smartwatches, massage guns, whiskey decanter sets, cast iron skillets, power tools, and more, all under $100.",
  keywords: [
    "fathers day gifts under 100",
    "fathers day gifts under $100",
    "fathers day gifts 2026 under 100",
    "best fathers day gifts under 100 dollars",
    "fathers day gift ideas under 100",
  ],
  openGraph: {
    title: "Father's Day Gifts Under $100 (2026) | TheGiftShuffle",
    description:
      "The best Father's Day gifts under $100, including smartwatches, massage guns, cast iron skillets, whiskey sets, and more.",
    type: 'website',
    url: 'https://thegiftshuffle.com/fathers-day-gifts-under-100',
  },
  alternates: {
    canonical: 'https://thegiftshuffle.com/fathers-day-gifts-under-100',
  },
};

const fathersDayUnder100 = products
  .filter(
    (p) =>
      (p.recipients.includes('dad') || p.recipients.includes('him')) &&
      p.price <= 100
  )
  .sort((a, b) => b.rating - a.rating || b.reviewCount - a.reviewCount);

const faqs = [
  {
    q: "What are the best Father's Day gifts under $100?",
    a: "The best Father's Day gifts under $100 are: a smart fitness watch with GPS and heart rate monitoring, a percussion massage gun with 6 attachments, a pre-seasoned 12-inch cast iron skillet, a whiskey decanter set with matching glasses, and a leather tool roll for the workshop. The $50-$100 range unlocks the category of gifts Dad has been wanting but won't spend on himself.",
  },
  {
    q: "What Father's Day gifts under $100 does Dad actually use?",
    a: "The gifts in the $50-$100 range with the highest daily-use rates: an insulated smart mug or quality tumbler, a percussion massage gun for post-workout recovery or desk-job soreness, a cast iron skillet he'll cook on for 20 years, and a compact Bluetooth speaker for the garage or patio. These aren't one-time-use novelties. They integrate into his actual life.",
  },
  {
    q: "What is the best splurge Father's Day gift under $100?",
    a: "The best 'splurge' Father's Day gift under $100 is the percussion massage gun at around $80. It's the gift Dad would never justify buying himself, but will use after every workout, workday, or yardwork session. A whiskey decanter set in the $65 range also hits high on perceived value. Hand-blown glass in a gift box always looks more expensive than it is.",
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
  name: "Father's Day Gifts Under $100",
  description: "Hand-picked Father's Day gifts under $100, curated by TheGiftShuffle",
  url: 'https://thegiftshuffle.com/fathers-day-gifts-under-100',
  numberOfItems: fathersDayUnder100.length,
  itemListElement: fathersDayUnder100.map((p, i) => ({
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

export default function FathersDayGiftsUnder100Page() {
  return (
    <div className="min-h-screen flex flex-col" style={{ background: '#FFFAF5' }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <Navbar />
      <Breadcrumbs
        items={[
          { label: "Father's Day Gifts", href: '/fathers-day-gifts' },
          { label: 'Under $100', href: '/fathers-day-gifts-under-100' },
        ]}
      />

      <main id="main-content" className="flex-1">
        {/* Hero image */}
        <section className="max-w-5xl mx-auto px-4 pt-8">
          <div className="relative w-full rounded-2xl overflow-hidden" style={{ aspectRatio: '3/2', maxHeight: '420px' }}>
            <Image
              src="/images/heroes/fathers-day-gifts-under-100.jpg"
              alt="A Father's Day gift box beside a handwritten card"
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
            The Best Father&apos;s Day Gifts Under $100
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Under $100 is where Father&apos;s Day gifting gets genuinely interesting. You&apos;re now in the range
            of a quality smartwatch, a percussion massage gun he&apos;ll use daily, a cast iron skillet he&apos;ll
            cook on for decades, or a whiskey decanter set that looks twice the price. These are the gifts he
            mentions wanting and never buys himself.
          </p>
        </section>

        {/* Product Grid */}
        <section className="max-w-5xl mx-auto px-4 py-8">
          <h2 className="text-2xl font-bold mb-2" style={{ color: '#1A202C' }}>
            Father&apos;s Day Gifts Under $100
          </h2>
          <p className="text-sm text-gray-500 mb-6">Sorted by customer rating.</p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {fathersDayUnder100.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>

        {/* Inline Shuffle */}
        <section className="max-w-5xl mx-auto px-4 py-6">
          <InlineShuffle products={fathersDayUnder100} heading="Shuffle Under-$100 Picks for Dad" />
        </section>

        {/* CTA */}
        <section className="bg-white py-12 px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl font-bold mb-4" style={{ color: '#1A202C' }}>
              Need a Recommendation Fast?
            </h2>
            <p className="text-gray-600 mb-6">
              Use TheGiftShuffle. Pick Dad, set your budget, and get a personalized Father&apos;s Day pick in seconds.
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
              { href: '/fathers-day-gifts-under-25', label: "Father's Day Gifts Under $25" },
              { href: '/fathers-day-gifts-under-50', label: "Father's Day Gifts Under $50" },
              { href: '/gift-ideas-for-dad', label: 'Gift Ideas for Dad' },
              { href: '/gift-ideas-for-him', label: 'Gift Ideas for Him' },
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
