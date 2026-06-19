import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import Navbar from '@/components/Navbar';
import InlineShuffle from '@/components/InlineShuffle';
import Breadcrumbs from '@/components/Breadcrumbs';
import { products } from '@/data/products';
import ProductCard from '@/components/ProductCard';

export const metadata: Metadata = {
  title: 'Best Birthday Gifts for 2026: 30 Top-Rated Picks for Anyone | TheGiftShuffle',
  description:
    'The best birthday gifts for 2026, ranked by what people actually love. 30 top-rated birthday gift ideas for him, her, friends and family, spanning every budget from under $25 to splurge-worthy.',
  keywords: [
    'best birthday gifts',
    'best birthday gifts 2026',
    'best birthday gift ideas',
    'best birthday gift',
    'top birthday gifts',
    'best birthday presents',
    'good birthday gifts',
    'best gifts for birthday',
  ],
  openGraph: {
    title: 'Best Birthday Gifts for 2026: 30 Top-Rated Picks for Anyone | TheGiftShuffle',
    description:
      'The 30 best birthday gifts for 2026, ranked by what people actually love. For him, her, friends and family, every budget.',
    type: 'website',
    url: 'https://thegiftshuffle.com/best-birthday-gifts-2026',
    images: [
      {
        url: 'https://www.thegiftshuffle.com/api/og?title=Best%20Birthday%20Gifts%202026%20%7C%20TheGiftShuffle',
        width: 1200,
        height: 630,
      },
    ],
  },
  alternates: {
    canonical: 'https://thegiftshuffle.com/best-birthday-gifts-2026',
  },
};

// "Best" = social proof, but only among things that actually read as a birthday
// GIFT. Exclude baby/pet consumables (diapers, wipes win on review volume but are
// not gifts) and sub-$15 filler, then rank by rating x review volume and enforce
// recipient diversity so the list reads like a real editor picked it.
const EXCLUDE_RECIPIENTS = new Set(['baby', 'pets']);
const EXCLUDE_TAGS = new Set(['parenting']);
const RECIPIENT_CAP = 6;
const birthdayPool = products
  .filter(
    (p) =>
      p.occasions?.includes('birthday') &&
      p.rating >= 4.5 &&
      p.reviewCount >= 500 &&
      p.price >= 15 &&
      !(p.recipients ?? []).some((r) => EXCLUDE_RECIPIENTS.has(r)) &&
      !(p.tags ?? []).some((t) => EXCLUDE_TAGS.has(t)),
  )
  .map((p) => ({ p, score: p.rating * Math.log10(p.reviewCount + 10) }))
  .sort((a, b) => b.score - a.score);

const recipientCount: Record<string, number> = {};
const bestBirthday: typeof products = [];
for (const { p } of birthdayPool) {
  const key = p.recipients?.[0] ?? 'any';
  if ((recipientCount[key] ?? 0) >= RECIPIENT_CAP) continue;
  recipientCount[key] = (recipientCount[key] ?? 0) + 1;
  bestBirthday.push(p);
  if (bestBirthday.length >= 30) break;
}

// Shuffle pool: the full birthday catalog
const shufflePool = products.filter((p) => p.occasions?.includes('birthday'));

const faqs = [
  {
    q: 'What are the best birthday gifts for 2026?',
    a: 'The best birthday gifts in 2026 lean toward practical luxury, things people want but would not buy for themselves. Top performers this year include a percussion massage gun, an Ember temperature-control mug, noise-canceling headphones, a Kindle Paperwhite, a smart watch, a weighted blanket, and a premium skincare set. The pattern: skip the novelty item and upgrade something they already use every day.',
  },
  {
    q: 'What makes a good birthday gift?',
    a: 'A good birthday gift is specific to the person, useful enough that it gets reached for often, and a small upgrade over what they already own. The gifts that land best either solve a daily annoyance (cold coffee, bad sleep, tangled cables) or deepen a hobby they already love. Generic gift cards rank lowest on memorability for exactly this reason.',
  },
  {
    q: "What is the best birthday gift for someone who has everything?",
    a: 'For someone who has everything, go experiential or hyper-personal: a cooking or cocktail class, concert or event tickets, a custom star map of their birth date, a monogrammed leather piece, or a premium upgrade to a daily ritual (an Ember mug, a high-end coffee grinder, an Oura ring). These feel fresh because they are either unique to them or a memory rather than an object.',
  },
  {
    q: 'What are the best birthday gifts under $50?',
    a: 'Great birthday gifts under $50 include a personalized name necklace, wireless earbuds, a portable Bluetooth speaker, a cozy sherpa or weighted blanket, an aromatherapy diffuser, a Polaroid-style instant camera, or a premium candle set. Tie the pick to something they already enjoy and a sub-$50 gift still feels intentional.',
  },
  {
    q: 'What are good birthday gifts for adults?',
    a: 'Adults consistently prefer practical luxury over novelty. The most-loved adult birthday gifts are a massage gun, a smart watch, a Kindle, noise-canceling headphones, an Ember mug, a weighted blanket, or a high-end grooming or skincare set. Experience gifts (a tasting, a class, a spa day) also outperform physical items for adults who already own what they need.',
  },
  {
    q: 'What are unique birthday gifts people remember?',
    a: 'Memorable, unique birthday gifts stand out because most people default to the obvious: a custom night-sky map, an instant camera, a whiskey decanter set, a red-light therapy wand, an indoor herb garden, or a personalized engraved piece. Browse our unique birthday gifts guide for the full list, or hit shuffle above for a fresh idea every click.',
  },
];

const itemListSchema = {
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  name: 'Best Birthday Gifts for 2026',
  description: 'The 30 best, top-rated birthday gifts for 2026, curated by TheGiftShuffle',
  url: 'https://thegiftshuffle.com/best-birthday-gifts-2026',
  numberOfItems: bestBirthday.length,
  itemListElement: bestBirthday.map((p, i) => ({
    '@type': 'ListItem',
    position: i + 1,
    name: p.name,
    description: p.description,
    url: p.affiliateUrl,
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

export default function BestBirthdayGifts2026Page() {
  return (
    <div className="min-h-screen flex flex-col" style={{ background: '#FFFAF5' }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <Navbar />
      <Breadcrumbs items={[{ label: 'Best Birthday Gifts 2026', href: '/best-birthday-gifts-2026' }]} />

      <main id="main-content" className="flex-1">
        {/* Hero image */}
        <section className="max-w-5xl mx-auto px-4 pt-8">
          <div className="relative w-full rounded-2xl overflow-hidden" style={{ aspectRatio: '3/2', maxHeight: '420px' }}>
            <Image
              src="/images/heroes/best-birthday-gifts-2026.jpg"
              alt="The best birthday gifts for 2026 wrapped with ribbon and confetti"
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
            The Best Birthday Gifts for 2026
          </h1>
          <p className="text-base sm:text-lg text-gray-700 leading-relaxed mb-3">
            These are the <strong>30 best birthday gifts for 2026</strong>, ranked by what people
            actually love rather than what has been recycled in gift listicles since 2019. Every
            pick below is top-rated, in stock now, and chosen to feel like a real upgrade, not a
            last-minute grab. No filler, no novelty mugs.
          </p>
          <p className="text-base text-gray-600 leading-relaxed">
            Whether you are shopping for him, her, a best friend, a parent, or the person who claims
            they do not want anything, this list spans every budget from under $25 to a genuine
            splurge. Scroll the picks, or hit shuffle to discover something new every click.
          </p>
        </section>

        {/* Inline Shuffle */}
        <section className="max-w-5xl mx-auto px-4 py-6">
          <InlineShuffle products={shufflePool} heading="Shuffle the Best Birthday Picks" />
        </section>

        {/* Product Grid */}
        <section className="max-w-5xl mx-auto px-4 py-8">
          <h2 className="text-2xl font-bold mb-6" style={{ color: '#1A202C' }}>
            30 Best Birthday Gifts, Ranked
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {bestBirthday.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>

        {/* How TheGiftShuffle Works */}
        <section className="bg-white py-12 px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl font-bold mb-4" style={{ color: '#1A202C' }}>
              Can&apos;t Decide? Let TheGiftShuffle Pick
            </h2>
            <p className="text-gray-600 mb-6">
              Tell us who the birthday is for and your budget, and get an instant, personalized
              birthday gift recommendation in one click.
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
              { href: '/birthday-gift-ideas', label: 'Birthday Gift Ideas' },
              { href: '/unique-birthday-gifts', label: 'Unique Birthday Gifts' },
              { href: '/birthday-gifts-for-gamers', label: 'Birthday Gifts for Gamers' },
              { href: '/gift-ideas-for-him', label: 'Gift Ideas for Him' },
              { href: '/gift-ideas-for-her', label: 'Gift Ideas for Her' },
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
