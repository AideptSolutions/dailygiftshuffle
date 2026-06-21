import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import Navbar from '@/components/Navbar';
import InlineShuffle from '@/components/InlineShuffle';
import Breadcrumbs from '@/components/Breadcrumbs';
import catalog from '@/data/products-catalog';
import { products as recipientProducts } from '@/data/products';
import ProductCard, { type CompactProduct } from '@/components/ProductCard';

export const metadata: Metadata = {
  title: 'Birthday Gifts for Gamers: 20+ Best Picks for 2026 | TheGiftShuffle',
  description:
    'The best birthday gifts for gamers in 2026: top-rated headsets, mechanical keyboards, controllers, RGB gear and stream-deck upgrades for the gamer in your life, every budget covered.',
  keywords: [
    'birthday gifts for gamers',
    'best birthday gifts for gamers 2026',
    'gamer birthday gifts',
    'gamer birthday gifts for men',
    'gifts for gamers',
    'gaming gifts',
    'best gifts for gamers 2026',
    '30th birthday gifts for gamers',
  ],
  openGraph: {
    title: 'Birthday Gifts for Gamers: 20+ Best Picks for 2026 | TheGiftShuffle',
    description:
      'Top-rated birthday gifts for gamers in 2026: headsets, mechanical keyboards, controllers, RGB gear and more for every budget.',
    type: 'website',
    url: 'https://thegiftshuffle.com/birthday-gifts-for-gamers',
    images: [
      {
        url: 'https://www.thegiftshuffle.com/api/og?title=Birthday%20Gifts%20for%20Gamers%20%7C%20TheGiftShuffle',
        width: 1200,
        height: 630,
      },
    ],
  },
  alternates: {
    canonical: 'https://thegiftshuffle.com/birthday-gifts-for-gamers',
  },
};

// Pull every gaming-tagged pick from the expanded category catalog, plus any
// gaming items from the recipient catalog, dedupe by id, rank by rating.
const gamingCatalog = catalog.filter((p) => p.tags?.includes('gaming') && p.rating >= 4.3);
const gamingRecipient = recipientProducts.filter((p) => p.tags?.includes('gaming') && p.rating >= 4.3);

const byId = new Map<string, CompactProduct>();
for (const p of [...gamingCatalog, ...gamingRecipient]) {
  if (!byId.has(p.id)) byId.set(p.id, p as CompactProduct);
}
const gamerGifts = Array.from(byId.values()).sort(
  (a, b) => b.rating - a.rating || b.reviewCount - a.reviewCount,
);

const faqs = [
  {
    q: 'What are the best birthday gifts for gamers in 2026?',
    a: 'The best birthday gifts for gamers in 2026 are upgrades to the gear they use most: a wireless gaming headset (the SteelSeries Arctis Nova or HyperX Cloud II are perennial favorites), a mechanical keyboard, a high-precision wireless mouse, an Elgato Stream Deck for anyone who streams, or RGB lighting to finish the setup. Match the gift to their platform (PC, PlayStation or Xbox) and it always lands.',
  },
  {
    q: 'What is a good birthday gift for a gamer on a budget?',
    a: 'Under $50, the standout gamer birthday gifts are a quality wired headset, controller thumb-grip sets, an extended RGB mouse pad, a controller charging station, or a wall mount to show off their controllers. They are inexpensive but genuinely useful, which is exactly why they get used daily.',
  },
  {
    q: 'What do you get a gamer who has everything?',
    a: 'For the gamer who has it all, go for the finishing-touch upgrades they have not justified buying: an Elgato Stream Deck, a premium racing-style gaming chair, RGB ambient lighting, a wireless charging station, or platform-specific collector accessories. These polish the setup rather than duplicating what they already own.',
  },
  {
    q: 'What are good 30th birthday gifts for gamers?',
    a: 'A milestone like a 30th birthday is the moment to upgrade the centerpiece of the setup: a flagship wireless headset, a high-end mechanical keyboard, an ergonomic gaming chair, or a Stream Deck if they create content. Pick the one piece of their rig that is overdue for an upgrade and make it the gift.',
  },
  {
    q: 'How do you pick a gaming gift if you are not a gamer?',
    a: 'If you are not a gamer yourself, you do not need to guess at games. Stick to gear that works across every title: a comfortable headset, a good mouse pad, controller accessories, or RGB lighting. Just confirm their platform (PC, PlayStation or Xbox) before buying anything controller or console specific, and you cannot go wrong.',
  },
];

const itemListSchema = {
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  name: 'Birthday Gifts for Gamers',
  description: 'The best birthday gifts for gamers in 2026, curated by TheGiftShuffle',
  url: 'https://thegiftshuffle.com/birthday-gifts-for-gamers',
  numberOfItems: gamerGifts.length,
  itemListElement: gamerGifts.map((p, i) => ({
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

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map((f) => ({
    '@type': 'Question',
    name: f.q,
    acceptedAnswer: { '@type': 'Answer', text: f.a },
  })),
};

export default function BirthdayGiftsForGamersPage() {
  return (
    <div className="min-h-screen flex flex-col" style={{ background: '#FFFAF5' }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <Navbar />
      <Breadcrumbs items={[{ label: 'Birthday Gifts for Gamers', href: '/birthday-gifts-for-gamers' }]} />

      <main id="main-content" className="flex-1">
        {/* Hero image */}
        <section className="max-w-5xl mx-auto px-4 pt-8">
          <div className="relative w-full rounded-2xl overflow-hidden" style={{ aspectRatio: '3/2', maxHeight: '420px' }}>
            <Image
              src="/images/heroes/birthday-gifts-for-gamers.jpg"
              alt="A gamer birthday gift setup with headset, controller and RGB lighting"
              fill
              className="object-cover"
              priority
              unoptimized
            />
          </div>
        </section>

        {/* Hero copy */}
        <section className="max-w-3xl mx-auto px-4 pt-8 pb-2 text-center">
          <h1 className="text-4xl sm:text-5xl font-extrabold mb-5 leading-tight" style={{ color: '#1A202C' }}>
            Birthday Gifts for Gamers
          </h1>
          <p className="text-base sm:text-lg text-gray-700 leading-relaxed mb-3">
            The <strong>best birthday gifts for gamers in 2026</strong> are upgrades to the gear
            they already live in: headsets, keyboards, controllers, stream decks and the RGB
            lighting that ties a setup together. Every pick below is top-rated and works whether
            they game on PC, PlayStation or Xbox.
          </p>
          <p className="text-base text-gray-600 leading-relaxed">
            Not a gamer yourself? No problem. Stick to the cross-platform gear here, confirm their
            console, and you will hand over something they actually wanted. Budgets run from a
            sub-$25 accessory to a milestone-worthy 30th-birthday upgrade.
          </p>
        </section>

        {/* Inline Shuffle */}
        <section className="max-w-5xl mx-auto px-4 py-6">
          <InlineShuffle products={gamerGifts} heading="Shuffle Gamer Birthday Picks" />
        </section>

        {/* Product Grid */}
        <section className="max-w-5xl mx-auto px-4 py-8">
          <h2 className="text-2xl font-bold mb-6" style={{ color: '#1A202C' }}>
            Top Birthday Gifts for Gamers
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {gamerGifts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>

        {/* How TheGiftShuffle Works */}
        <section className="bg-white py-12 px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl font-bold mb-4" style={{ color: '#1A202C' }}>
              Not Sure Which Upgrade to Pick?
            </h2>
            <p className="text-gray-600 mb-6">
              Tell TheGiftShuffle who the birthday is for and your budget, and get an instant gamer
              gift recommendation in one click.
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
          <h2 className="text-xl font-bold mb-4" style={{ color: '#1A202C' }}>More Gift Guides</h2>
          <div className="flex flex-wrap gap-3">
            {[
              { href: '/category/gaming', label: 'All Gaming Gifts' },
              { href: '/best-birthday-gifts-2026', label: 'Best Birthday Gifts 2026' },
              { href: '/unique-birthday-gifts', label: 'Unique Birthday Gifts' },
              { href: '/birthday-gift-ideas', label: 'Birthday Gift Ideas' },
              { href: '/gift-ideas-for-teens', label: 'Gift Ideas for Teens' },
              { href: '/gift-ideas-for-him', label: 'Gift Ideas for Him' },
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
