import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import Navbar from '@/components/Navbar';
import InlineShuffle from '@/components/InlineShuffle';
import Breadcrumbs from '@/components/Breadcrumbs';
import { products } from '@/data/products';
import ProductCard from '@/components/ProductCard';

export const metadata: Metadata = {
  title: 'Sustainable Eco-Friendly Gifts: Green Picks They Will Actually Use | TheGiftShuffle',
  description:
    'Eco gifts that do not feel like a punishment. Browse the best sustainable and eco-friendly gift ideas, reusable, organic, plastic-free, and genuinely useful for any budget.',
  keywords: [
    'sustainable gifts',
    'eco friendly gifts',
    'green gifts',
    'eco gifts',
    'sustainable gift ideas',
    'environmentally friendly gifts',
    'plastic free gifts',
    'zero waste gifts',
  ],
  openGraph: {
    title: 'Sustainable Eco-Friendly Gifts: Green Picks They Will Actually Use | TheGiftShuffle',
    description:
      'Browse the best sustainable and eco-friendly gift ideas, reusable, organic, plastic-free, and genuinely useful for any budget.',
    type: 'website',
    url: 'https://thegiftshuffle.com/sustainable-eco-gifts',
    images: [
      {
        url: 'https://www.thegiftshuffle.com/api/og?title=Sustainable%20Eco-Friendly%20Gifts%20%7C%20TheGiftShuffle',
        width: 1200,
        height: 630,
      },
    ],
  },
  alternates: {
    canonical: 'https://thegiftshuffle.com/sustainable-eco-gifts',
  },
};

const ecoProducts = products
  .filter((p) => p.tags?.includes('home') || p.tags?.includes('fitness') || p.tags?.includes('kitchen'))
  .slice(0, 24);

const faqs = [
  {
    q: 'What are good sustainable gifts?',
    a: "Good sustainable gifts are ones the recipient will actually use, not just feel good about receiving. The best eco-friendly gifts include a Hydro Flask stainless steel water bottle, a beeswax wrap set (replaces plastic wrap), a bamboo cutting board, organic cotton throw blanket, a reusable tote set, a high-quality stainless steel travel mug, or a seed-paper notebook. Practicality makes sustainability last.",
  },
  {
    q: 'What are eco-friendly gifts that people actually want?',
    a: "Eco-friendly gifts people genuinely love: a Hydro Flask or Stanley tumbler, a bamboo utensil set, a beeswax wrap kit, a soy wax candle with recyclable packaging, organic skincare gift sets, a reusable produce bag set, or a compostable planter with succulents. The key is choosing items that replace something they already buy.",
  },
  {
    q: 'What are zero-waste gift ideas?',
    a: "Zero-waste gift ideas remove single-use packaging from the equation. Top picks: a glass meal prep container set, a reusable silicone food bag set, a bamboo toothbrush kit, a natural beeswax wrap set, a stainless steel straw set with cleaning brush, a solid shampoo bar set, or a linen produce bag bundle. These replace disposables the recipient buys repeatedly.",
  },
  {
    q: 'What are sustainable gifts under $50?',
    a: "Great sustainable gifts under $50 include a beeswax wrap starter set, a bamboo cheese board, an organic cotton tote bag set, a soy wax candle, a reusable coffee cup, a bamboo phone stand, or a natural essential oil diffuser kit. Under $50 is the sweet spot for eco gifts. Most practical sustainable swaps live in this price range.",
  },
  {
    q: 'What are eco-friendly gifts for someone who loves the outdoors?',
    a: "For outdoor lovers, the best eco gifts are ones they will use on adventures: a Hydro Flask wide-mouth bottle, a Sea to Summit titanium spork set, a reusable beeswax food wrap for trail meals, a solar-powered phone charger, a bamboo hiking cutlery kit, or a National Park Pass. Experiences over things is the most sustainable gift philosophy.",
  },
  {
    q: 'Are eco-friendly gifts more expensive?',
    a: "Not always. Many sustainable gifts cost the same or less than conventional equivalents, beeswax wraps cost $12 to $20, reusable tote sets cost $10 to $18, soy candles cost $15 to $25, bamboo utensil kits cost $14 to $22. Where sustainable gifts cost more, they usually last significantly longer, making the per-use cost lower.",
  },
];

const itemListSchema = {
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  name: 'Sustainable Eco-Friendly Gifts',
  description: 'Curated sustainable and eco-friendly gift ideas for every person by TheGiftShuffle',
  url: 'https://thegiftshuffle.com/sustainable-eco-gifts',
  numberOfItems: ecoProducts.length,
  itemListElement: ecoProducts.map((p, i) => ({
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

export default function SustainableEcoGiftsPage() {
  return (
    <div className="min-h-screen flex flex-col" style={{ background: '#FFFAF5' }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <Navbar />
      <Breadcrumbs items={[{ label: 'Sustainable Eco-Friendly Gifts', href: '/sustainable-eco-gifts' }]} />

      <main id="main-content" className="flex-1">
        {/* Hero image */}
        <section className="max-w-5xl mx-auto px-4 pt-8">
          <div className="relative w-full rounded-2xl overflow-hidden" style={{ aspectRatio: '3/2', maxHeight: '420px' }}>
            <Image
              src="/images/heroes/sustainable-eco-gifts.jpg"
              alt="Sustainable eco-friendly gifts wrapped in natural kraft paper"
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
            Sustainable Eco-Friendly Gifts
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Eco gifts that do not feel like a punishment. Browse the best sustainable and
            eco-friendly gift ideas, reusable, organic, plastic-free, and genuinely useful
            for any budget and any person on your list.
          </p>
        </section>

        {/* Product Grid */}
        {/* Inline Shuffle */}
        <section className="max-w-5xl mx-auto px-4 py-6">
          <InlineShuffle products={ecoProducts} heading="Shuffle Eco Picks" />
        </section>

        <section className="max-w-5xl mx-auto px-4 py-8">
          <h2 className="text-2xl font-bold mb-6" style={{ color: '#1A202C' }}>
            Top Sustainable Gift Picks
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {ecoProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>

        {/* How TheGiftShuffle Works */}
        <section className="bg-white py-12 px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl font-bold mb-4" style={{ color: '#1A202C' }}>
              How TheGiftShuffle Works
            </h2>
            <p className="text-gray-600 mb-6">
              Need a sustainable gift idea right now? Use TheGiftShuffle, pick who it&apos;s for,
              set your budget, and get an instant personalized recommendation.
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
              { href: '/gift-ideas-for-her', label: 'Gift Ideas for Her' },
              { href: '/gift-ideas-for-him', label: 'Gift Ideas for Him' },
              { href: '/gifts-under-50', label: 'Gifts Under $50' },
              { href: '/birthday-gift-ideas', label: 'Birthday Gift Ideas' },
              { href: '/gift-ideas-for-mom', label: 'Gift Ideas for Mom' },
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
