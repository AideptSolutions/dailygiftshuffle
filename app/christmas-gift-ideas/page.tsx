import type { Metadata } from 'next';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Breadcrumbs from '@/components/Breadcrumbs';
import { products } from '@/data/products';
import ProductCard from '@/components/ProductCard';

export const metadata: Metadata = {
  title: 'Christmas Gift Ideas 2025 — Top Picks for Everyone on Your List | TheGiftShuffle',
  description:
    "Find the perfect Christmas gift for everyone on your list. Browse 30+ curated holiday gift ideas sorted by recipient and budget — no more gift stress.",
  keywords: [
    'christmas gift ideas',
    'christmas gifts 2025',
    'holiday gift ideas',
    'christmas gift ideas for family',
    'unique christmas gifts',
    'best christmas gifts 2025',
  ],
  openGraph: {
    title: 'Christmas Gift Ideas 2025 — Top Picks for Everyone on Your List | TheGiftShuffle',
    description:
      "Browse 30+ curated Christmas gift ideas for everyone on your list — sorted by recipient and budget.",
    type: 'website',
    url: 'https://thegiftshuffle.com/christmas-gift-ideas',
  },
  alternates: {
    canonical: 'https://thegiftshuffle.com/christmas-gift-ideas',
  },
};

const christmasProducts = products
  .filter((p) => p.occasions?.includes('holiday'))
  .slice(0, 30);

// Fallback: if not enough holiday products, fill with a diverse mix
const displayProducts = christmasProducts.length >= 12
  ? christmasProducts
  : products.slice(0, 30);

const faqs = [
  {
    q: 'What are good Christmas gifts for 2025?',
    a: "The best Christmas gifts for 2025 include smart home gadgets (smart plugs, smart bulbs, smart thermostat), premium self-care sets, insulated tumblers and mugs, subscription boxes, gaming accessories, and experience gifts. For 2025, personalized and tech-integrated gifts are trending heavily — things like smart watches, Kindle e-readers, and wireless audio gear.",
  },
  {
    q: "What's a unique Christmas gift idea?",
    a: "For a truly unique Christmas gift, think beyond the wishlist: a custom star map of a meaningful date, an Oura Ring sleep tracker, a hot air balloon ride gift certificate, an infrared sauna blanket, a red light therapy wand, or a couples cooking class gift card. These are memorable precisely because most people wouldn't think to give them.",
  },
  {
    q: 'What are the best Christmas gifts under $50?',
    a: "The best Christmas gifts under $50 include a cozy sherpa blanket, an aromatherapy diffuser, a personalized name necklace, a portable Bluetooth speaker, wireless earbuds, an LED room light kit, a journaling starter kit, or a quality beard grooming set. These all feel premium at a reasonable price point.",
  },
  {
    q: 'What should I get someone who has everything for Christmas?',
    a: "For someone who seems to have everything, give an experience (cooking class, whiskey tasting, hot air balloon ride), a premium upgrade to something they use daily (Ember temperature mug, smart watch, Dyson hair styler), or a personalized keepsake (custom star map, monogrammed leather journal). These feel fresh regardless of what they already own.",
  },
  {
    q: "What's a good last-minute Christmas gift?",
    a: "Great last-minute Christmas gifts available for fast delivery: insulated tumbler, cozy sherpa blanket, scented candle set, beard grooming kit, portable Bluetooth speaker, wireless charger, or blue light blocking glasses. For something instantaneous, a digital gift card for Amazon, a streaming service, or an experience delivers right away.",
  },
  {
    q: 'What are Christmas gift ideas for the whole family?',
    a: "For the whole family, consider gifts everyone can enjoy together: a board game or card game set, a chess set, a charcuterie board set for family gatherings, a projector for movie nights, an Instant Pot, a double hammock, or a subscription to a streaming service. Family gift experiences (cooking class, escape room) also create lasting memories.",
  },
];

const itemListSchema = {
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  name: 'Christmas Gift Ideas 2025',
  description: 'Curated Christmas gift ideas for 2025 by TheGiftShuffle',
  url: 'https://thegiftshuffle.com/christmas-gift-ideas',
  numberOfItems: displayProducts.length,
  itemListElement: displayProducts.map((p, i) => ({
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

export default function ChristmasGiftIdeasPage() {
  return (
    <div className="min-h-screen flex flex-col" style={{ background: '#FFFAF5' }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <Navbar />
      <Breadcrumbs items={[{ label: 'Christmas Gift Ideas', href: '/christmas-gift-ideas' }]} />

      <main id="main-content" className="flex-1">
        {/* Hero */}
        <section className="max-w-5xl mx-auto px-4 pt-8 pb-6 text-center">
          <h1 className="text-4xl sm:text-5xl font-extrabold mb-4" style={{ color: '#1A202C' }}>
            Christmas Gift Ideas
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
            The best Christmas gift ideas include cozy subscription boxes, personalized keepsakes,
            smart home gadgets, experience gifts, and family game nights. TheGiftShuffle curates
            picks for every person on your list and every budget — so you can shop with confidence
            this holiday season.
          </p>
        </section>

        {/* Product Grid */}
        <section className="max-w-5xl mx-auto px-4 py-8">
          <h2 className="text-2xl font-bold mb-6" style={{ color: '#1A202C' }}>
            Top Christmas Gift Picks
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {displayProducts.map((p) => (
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
              Shopping for multiple people this Christmas? Use TheGiftShuffle to get
              personalized picks for each person on your list in seconds.
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
              { href: '/gift-ideas-for-mom', label: 'Gift Ideas for Mom' },
              { href: '/gift-ideas-for-dad', label: 'Gift Ideas for Dad' },
              { href: '/gifts-under-50', label: 'Gifts Under $50' },
              { href: '/birthday-gift-ideas', label: 'Birthday Gift Ideas' },
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
