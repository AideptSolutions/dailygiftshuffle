import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import Navbar from '@/components/Navbar';
import InlineShuffle from '@/components/InlineShuffle';
import Breadcrumbs from '@/components/Breadcrumbs';
import { products } from '@/data/products';
import ProductCard from '@/components/ProductCard';

export const metadata: Metadata = {
  title: 'Unique Birthday Gifts: 30 Cool, Creative Ideas They Will Remember | TheGiftShuffle',
  description:
    'Unique birthday gifts that beat the gift card. 30 cool, creative and memorable birthday gift ideas for adults, friends and family, hand-picked because nobody else will think of them.',
  keywords: [
    'unique birthday gifts',
    'cool birthday gifts',
    'creative birthday gifts',
    'unique birthday gift',
    'memorable birthday gifts',
    'fun birthday gifts',
    'unique birthday gifts for adults',
    'interesting birthday gifts',
  ],
  openGraph: {
    title: 'Unique Birthday Gifts: 30 Cool, Creative Ideas They Will Remember | TheGiftShuffle',
    description:
      '30 unique, cool and creative birthday gifts that beat the gift card, hand-picked because nobody else will think of them.',
    type: 'website',
    url: 'https://thegiftshuffle.com/unique-birthday-gifts',
    images: [
      {
        url: 'https://www.thegiftshuffle.com/api/og?title=Unique%20Birthday%20Gifts%20%7C%20TheGiftShuffle',
        width: 1200,
        height: 630,
      },
    ],
  },
  alternates: {
    canonical: 'https://thegiftshuffle.com/unique-birthday-gifts',
  },
};

// "Unique" = the distinctive end of the catalog: hobby, luxury, tech, gaming and
// smart-home picks rather than everyday staples. Order by rating, cap per
// recipient so it reads as a curated set distinct from the best-sellers page.
const UNIQUE_TAGS = new Set(['hobby', 'luxury', 'tech', 'gaming', 'ai-smart-home', 'kitchen', 'beauty']);
const RECIPIENT_CAP = 6;
const uniquePool = products
  .filter(
    (p) =>
      p.occasions?.includes('birthday') &&
      p.rating >= 4.5 &&
      (p.tags ?? []).some((t) => UNIQUE_TAGS.has(t)),
  )
  .sort((a, b) => b.rating - a.rating || b.reviewCount - a.reviewCount);

const recipientCount: Record<string, number> = {};
const uniqueBirthday: typeof products = [];
for (const p of uniquePool) {
  const key = p.recipients?.[0] ?? 'any';
  if ((recipientCount[key] ?? 0) >= RECIPIENT_CAP) continue;
  recipientCount[key] = (recipientCount[key] ?? 0) + 1;
  uniqueBirthday.push(p);
  if (uniqueBirthday.length >= 30) break;
}

const shufflePool = products.filter((p) => p.occasions?.includes('birthday'));

const faqs = [
  {
    q: 'What are some unique birthday gifts?',
    a: 'Truly unique birthday gifts go past the default gift card: a custom night-sky map of their birth date, an instant camera, a whiskey decanter or cocktail-smoker set, an indoor hydroponic herb garden, a red-light therapy wand, a premium board or strategy game, or a personalized engraved piece. They stand out precisely because most people never think of them.',
  },
  {
    q: 'What is a cool birthday gift for someone hard to shop for?',
    a: 'For the hard-to-shop-for person, anchor on a hobby and upgrade it: a pour-over coffee kit for the coffee obsessive, a mechanical keyboard for the desk worker, a high-end yoga or recovery tool for the fitness one, a smart planter for the plant parent. A specific, hobby-matched gift always beats a generic crowd-pleaser.',
  },
  {
    q: 'What are creative birthday gifts for adults?',
    a: 'Creative birthday gifts for adults blend a little fun with real usefulness: a cocktail-smoker kit, an instant camera, a sunset projection lamp, a personalized star map, a premium puzzle or strategy game, or an aromatherapy diffuser with a curated oil set. The goal is a gift that sparks a reaction when opened and still gets used a month later.',
  },
  {
    q: 'What makes a birthday gift memorable?',
    a: 'A birthday gift is memorable when it is unexpected and personal. That usually means it references something specific about them (a hobby, an inside joke, a birth date), creates an experience or a ritual rather than sitting in a drawer, or is a small luxury they would never justify buying themselves. Memorability comes from thought, not price.',
  },
  {
    q: 'What are unique birthday gifts under $50?',
    a: 'Unique birthday gifts under $50 include an instant camera, a custom star map, a sunset projection lamp, a cocktail-smoker kit, a premium card or strategy game, a quality pour-over coffee set, or an engraved keepsake. Each feels considered and one-of-a-kind without crossing into splurge territory.',
  },
];

const itemListSchema = {
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  name: 'Unique Birthday Gifts',
  description: 'Unique, cool and creative birthday gift ideas curated by TheGiftShuffle',
  url: 'https://thegiftshuffle.com/unique-birthday-gifts',
  numberOfItems: uniqueBirthday.length,
  itemListElement: uniqueBirthday.map((p, i) => ({
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

export default function UniqueBirthdayGiftsPage() {
  return (
    <div className="min-h-screen flex flex-col" style={{ background: '#FFFAF5' }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <Navbar />
      <Breadcrumbs items={[{ label: 'Unique Birthday Gifts', href: '/unique-birthday-gifts' }]} />

      <main id="main-content" className="flex-1">
        {/* Hero image */}
        <section className="max-w-5xl mx-auto px-4 pt-8">
          <div className="relative w-full rounded-2xl overflow-hidden" style={{ aspectRatio: '3/2', maxHeight: '420px' }}>
            <Image
              src="/images/heroes/unique-birthday-gifts.jpg"
              alt="Unique and creative birthday gifts wrapped on a table"
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
            Unique Birthday Gifts They Will Actually Remember
          </h1>
          <p className="text-base sm:text-lg text-gray-700 leading-relaxed mb-3">
            Anyone can hand over a gift card. These <strong>30 unique birthday gifts</strong> are
            the cool, creative picks that get a real reaction, then still get used a month later.
            Every one is hand-picked from the more distinctive end of our catalog, so you arrive
            with something nobody else thought of.
          </p>
          <p className="text-base text-gray-600 leading-relaxed">
            From custom keepsakes and instant cameras to hobby upgrades and small everyday
            luxuries, this list works for adults, friends, partners and the impossible-to-shop-for
            person on your list. Browse below, or hit shuffle for a fresh idea every click.
          </p>
        </section>

        {/* Inline Shuffle */}
        <section className="max-w-5xl mx-auto px-4 py-6">
          <InlineShuffle products={shufflePool} heading="Shuffle Unique Birthday Picks" />
        </section>

        {/* Product Grid */}
        <section className="max-w-5xl mx-auto px-4 py-8">
          <h2 className="text-2xl font-bold mb-6" style={{ color: '#1A202C' }}>
            30 Unique Birthday Gift Ideas
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {uniqueBirthday.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>

        {/* How TheGiftShuffle Works */}
        <section className="bg-white py-12 px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl font-bold mb-4" style={{ color: '#1A202C' }}>
              Want Something Even More Their Style?
            </h2>
            <p className="text-gray-600 mb-6">
              Tell TheGiftShuffle who it is for and your budget, and get an instant, one-of-a-kind
              birthday gift idea in a single click.
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
          <h2 className="text-xl font-bold mb-4" style={{ color: '#1A202C' }}>More Birthday Gift Guides</h2>
          <div className="flex flex-wrap gap-3">
            {[
              { href: '/best-birthday-gifts-2026', label: 'Best Birthday Gifts 2026' },
              { href: '/birthday-gift-ideas', label: 'Birthday Gift Ideas' },
              { href: '/birthday-gifts-for-gamers', label: 'Birthday Gifts for Gamers' },
              { href: '/gift-ideas-for-friends', label: 'Gift Ideas for Friends' },
              { href: '/gift-ideas-for-her', label: 'Gift Ideas for Her' },
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
