import type { Metadata } from 'next';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Breadcrumbs from '@/components/Breadcrumbs';
import { products } from '@/data/products';
import ProductCard from '@/components/ProductCard';
import InlineShuffle from '@/components/InlineShuffle';

export const metadata: Metadata = {
  title: "Gifts Under $25 — Thoughtful Budget Picks | TheGiftShuffle",
  description:
    'Discover the best gifts under $25 that don\'t look cheap — skincare sets, card games, candles, and more. Thoughtful budget gift ideas with top-rated reviews.',
  keywords: [
    'gifts under $25',
    "cheap gifts that don't look cheap",
    'affordable gift ideas',
    'budget gift ideas',
    'good gifts under $25',
  ],
  openGraph: {
    title: 'Gifts Under $25 — Thoughtful Budget Picks | TheGiftShuffle',
    description:
      'Browse the best gifts under $25 — affordable but thoughtful picks with tens of thousands of verified reviews.',
    type: 'website',
    url: 'https://thegiftshuffle.com/gifts-under-25',
    images: [
      {
        url: 'https://www.thegiftshuffle.com/api/og?title=Gifts%20Under%20%2425%20%7C%20TheGiftShuffle',
        width: 1200,
        height: 630,
      },
    ],
  },
  alternates: {
    canonical: 'https://thegiftshuffle.com/gifts-under-25',
  },
};

const under25Products = products.filter((p) => p.budgetTier === 'under25').slice(0, 24);

const faqs = [
  {
    q: 'What are good gifts under $25?',
    a: "Great gifts under $25 include: a scented candle set, bath bomb collection, funny quote wine glass, skincare essentials kit, card game, succulent planter, silk scrunchie set, or a pocket multi-tool. The key is choosing something with strong reviews — 4.5+ stars with 5,000+ ratings is your quality signal in this price range.",
  },
  {
    q: "What are the best cheap gifts that don't look cheap?",
    a: "Cheap gifts that look expensive include: a set of silk scrunchies (looks luxurious, costs under $15), a high-quality soy wax candle, a ceramic mug with a witty design, a mini succulents set in a ceramic planter, or a leather card holder. Packaging and category perception matter — beauty and home items often look far more expensive than they are.",
  },
  {
    q: 'What are stocking stuffer ideas under $25?',
    a: "Top stocking stuffers under $25: PopSocket phone grip, pocket multi-tool, novelty socks 3-pack, lip balm set, LED book light, glow-in-the-dark stars, small skincare items (face roller, eye patches), a card game, or flavored lip gloss set. The best stocking stuffers are small, useful, and instantly satisfying — they should spark a &quot;oh I actually needed this&quot; reaction.",
  },
  {
    q: 'What gifts under $25 have the best reviews?',
    a: "The highest-reviewed gifts under $25 on Amazon include PopSockets (40k+ reviews), novelty socks packs (12k+ reviews), LED desk lamps with USB ports (11k+ reviews), kinetic sand kits (18k+ reviews), and insulated tumblers. Review count is a proxy for gifting velocity — the more a product gets bought as a gift, the more reviews it accumulates.",
  },
  {
    q: 'What are last-minute gifts under $25?',
    a: "For last-minute gifts under $25, look for Amazon Prime same-day delivery items: a bath bomb set, scented candle, funny coffee mug, card game, or a self-care face mask kit. Many of these ship same-day in metro areas. Digital gift cards are also a zero-judgment last-minute move that always lands well.",
  },
  {
    q: 'What are unique gifts under $25?',
    a: "Unique gifts under $25 that stand out: a glow-in-the-dark star ceiling kit, a self-care affirmation card deck, a color-your-own puzzle, a custom name keychain, a tiny succulent terrarium kit, or a recipe card tin box set. These are the gifts that feel thoughtful and specific — not like you just grabbed the first thing on the shelf.",
  },
];

const itemListSchema = {
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  name: 'Gifts Under $25',
  description: 'Hand-picked gift ideas under $25 curated by TheGiftShuffle',
  url: 'https://thegiftshuffle.com/gifts-under-25',
  numberOfItems: under25Products.length,
  itemListElement: under25Products.map((p, i) => ({
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

export default function GiftsUnder25Page() {
  return (
    <div className="min-h-screen flex flex-col" style={{ background: '#FFFAF5' }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <Navbar />
      <Breadcrumbs items={[{ label: 'Gifts Under $25', href: '/gifts-under-25' }]} />

      <main id="main-content" className="flex-1">
        {/* Hero */}
        <section className="max-w-5xl mx-auto px-4 pt-8 pb-6 text-center">
          <h1 className="text-4xl sm:text-5xl font-extrabold mb-4" style={{ color: '#1A202C' }}>
            Gifts Under $25
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed mb-4">
            The demand for quality gifts under $25 has surged, driven by Amazon same-day delivery and social proof culture. Under $25 does not mean cheap — the best-reviewed products in this range consistently prove it. Lip balm sets, skincare essentials, LED book lights, card games, and scented candle collections often have 30,000–100,000+ verified reviews and are bought over and over again as gifts precisely because they deliver. The category thrives because the gifting bar is about perception, not price — and these picks clear it easily.
          </p>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
            The trending segments in sub-$25 gifting are: self-care consumables (bath bombs, face masks, skincare minis), functional desk accessories (LED lamps, PopSockets, phone wallets), stocking stuffers with mass appeal, and snack or food gifts with high gifting velocity. If a product has 10k+ reviews and ships Prime, it&apos;s a proven gift. These picks are curated to hit that sweet spot — thoughtful, deliverable fast, and genuinely useful.
          </p>
        </section>

        {/* Inline Shuffle */}
        <section className="max-w-5xl mx-auto px-4 py-6">
          <InlineShuffle products={under25Products} heading="Shuffle Picks Under $25" />
        </section>

        {/* Full Product Grid */}
        <section className="max-w-5xl mx-auto px-4 py-8">
          <h2 className="text-2xl font-bold mb-6" style={{ color: '#1A202C' }}>
            All Picks Under $25
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {under25Products.map((p) => (
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
              Looking for the perfect budget gift? Use TheGiftShuffle — set your budget to under $25,
              pick who it&apos;s for, and hit Shuffle for instant personalized picks.
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
              { href: '/gifts-under-50', label: 'Gifts Under $50' },
              { href: '/birthday-gift-ideas', label: 'Birthday Gift Ideas' },
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
