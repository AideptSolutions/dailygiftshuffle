import type { Metadata } from 'next';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Breadcrumbs from '@/components/Breadcrumbs';
import { products } from '@/data/products';
import ProductCard from '@/components/ProductCard';
import InlineShuffle from '@/components/InlineShuffle';

export const metadata: Metadata = {
  title: "Last-Minute Mother's Day Gifts 2026 (Ships Fast) | TheGiftShuffle",
  description:
    "Last-minute Mother's Day gift ideas for 2026 that still arrive on time. Top-rated picks with Amazon Prime shipping — spa sets, skincare, jewelry, and more.",
  keywords: [
    "last minute mothers day gifts",
    "last minute mothers day gift ideas",
    "mothers day gifts that ship fast",
    "mothers day gifts prime shipping",
    "last minute mothers day 2026",
  ],
  openGraph: {
    title: "Last-Minute Mother's Day Gifts 2026 (Ships Fast) | TheGiftShuffle",
    description:
      "Top-rated Mother's Day gifts that still ship in time. Prime-eligible spa sets, skincare, jewelry, and more.",
    type: 'website',
    url: 'https://thegiftshuffle.com/last-minute-mothers-day-gifts',
  },
  alternates: {
    canonical: 'https://thegiftshuffle.com/last-minute-mothers-day-gifts',
  },
};

// Top-rated mothers day products, sorted by rating
const lastMinuteProducts = products
  .filter(
    (p) =>
      p.occasions?.includes('mothersFathers') &&
      (p.recipients.includes('her') || p.recipients.includes('mom'))
  )
  .sort((a, b) => b.rating - a.rating || b.reviewCount - a.reviewCount)
  .slice(0, 20);

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://thegiftshuffle.com' },
    { '@type': 'ListItem', position: 2, name: "Mother's Day Gifts", item: 'https://thegiftshuffle.com/mothers-day-gifts' },
    { '@type': 'ListItem', position: 3, name: 'Last-Minute Gifts', item: 'https://thegiftshuffle.com/last-minute-mothers-day-gifts' },
  ],
};

const itemListSchema = {
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  name: "Last-Minute Mother's Day Gifts 2026",
  description: "Top-rated Mother's Day gifts available with fast Amazon Prime shipping, curated by TheGiftShuffle",
  url: 'https://thegiftshuffle.com/last-minute-mothers-day-gifts',
  numberOfItems: lastMinuteProducts.length,
  itemListElement: lastMinuteProducts.map((p, i) => ({
    '@type': 'ListItem',
    position: i + 1,
    name: p.name,
    description: p.description,
    url: p.affiliateUrl,
  })),
};

export default function LastMinuteMothersDayPage() {
  return (
    <div className="min-h-screen flex flex-col" style={{ background: '#FFFAF5' }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <Navbar />
      <Breadcrumbs
        items={[
          { label: "Mother's Day Gifts", href: '/mothers-day-gifts' },
          { label: 'Last-Minute Gifts', href: '/last-minute-mothers-day-gifts' },
        ]}
      />

      <main id="main-content" className="flex-1">
        {/* Hero */}
        <section className="max-w-5xl mx-auto px-4 pt-8 pb-6 text-center">
          <h1 className="text-4xl sm:text-5xl font-extrabold mb-4" style={{ color: '#1A202C' }}>
            Last-Minute Mother&apos;s Day Gifts 2026
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed mb-3">
            Still haven&apos;t ordered yet? These top-rated picks are available with Amazon Prime and can arrive
            before Mother&apos;s Day with standard two-day shipping. We sorted by highest rating and review count
            so you can order fast and still give something she will actually love.
          </p>
          <p className="text-sm text-gray-500 max-w-xl mx-auto">
            Tip: Check your Prime delivery window at checkout to confirm arrival by May 11.
          </p>
        </section>

        {/* Inline Shuffle */}
        <section className="max-w-5xl mx-auto px-4 py-6">
          <InlineShuffle products={lastMinuteProducts} heading="Shuffle Last-Minute Picks" />
        </section>

        {/* Product Grid */}
        <section className="max-w-5xl mx-auto px-4 py-8">
          <h2 className="text-2xl font-bold mb-2" style={{ color: '#1A202C' }}>
            Top-Rated Mother&apos;s Day Picks That Ship Fast
          </h2>
          <p className="text-sm text-gray-500 mb-6">
            Sorted by customer rating. Most are Prime-eligible with 2-day delivery.
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {lastMinuteProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="bg-white py-12 px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl font-bold mb-4" style={{ color: '#1A202C' }}>
              Need Help Deciding Fast?
            </h2>
            <p className="text-gray-600 mb-6">
              Answer two questions in TheGiftShuffle and get a personalized pick in seconds. No scrolling, no indecision.
            </p>
            <Link
              href="/shuffle"
              className="inline-block bg-[#F04E30] text-white font-bold px-10 py-4 rounded-full hover:opacity-90 transition-opacity text-lg"
            >
              Try the Gift Shuffle →
            </Link>
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
              { href: '/mothers-day-gifts-under-100', label: "Mother's Day Gifts Under $100" },
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
