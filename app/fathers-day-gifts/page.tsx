import type { Metadata } from 'next';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Breadcrumbs from '@/components/Breadcrumbs';
import { products } from '@/data/products';
import ProductCard from '@/components/ProductCard';
import InlineShuffle from '@/components/InlineShuffle';

export const metadata: Metadata = {
  title: "Father's Day Gifts — Best Picks for Dad in 2025 | TheGiftShuffle",
  description:
    "Find the best Father's Day gifts for 2025 — tools, tech gadgets, grilling accessories, fitness gear, and picks for every kind of dad. Gifts he'll actually use.",
  keywords: [
    "fathers day gifts",
    "fathers day gift ideas",
    "best fathers day gifts 2025",
    "unique fathers day gifts",
    "fathers day gifts for dad",
  ],
  openGraph: {
    title: "Father's Day Gifts — Best Picks for Dad in 2025 | TheGiftShuffle",
    description:
      "Browse the best Father's Day gift ideas for 2025 — tools, tech, grilling gear, and picks dad will actually use.",
    type: 'website',
    url: 'https://thegiftshuffle.com/fathers-day-gifts',
    images: [
      {
        url: 'https://www.thegiftshuffle.com/api/og?title=Father%27s%20Day%20Gifts%20%7C%20TheGiftShuffle',
        width: 1200,
        height: 630,
      },
    ],
  },
  alternates: {
    canonical: 'https://thegiftshuffle.com/fathers-day-gifts',
  },
};

const fathersDayProducts = products.filter(
  (p) => p.recipients.includes('dad') || p.recipients.includes('him')
).slice(0, 24);

const faqs = [
  {
    q: "What are the best Father's Day gifts in 2025?",
    a: "The best Father's Day gifts in 2025 are: cordless power tools (drill sets, multi-tools), premium grilling accessories (digital meat thermometers, BBQ spice rub sets), tech gadgets (portable Bluetooth speakers, smartwatches), fitness gear (resistance bands, walking pads), and premium everyday carry items (leather wallets, insulated tumblers). Gifts with high repurchase rates — like grilling spice sets and golf accessories — signal proven, repeated value.",
  },
  {
    q: "What do dads actually want for Father's Day?",
    a: "When surveyed, dads most often say they want something practical that upgrades their daily life or a hobby — not another generic mug. Top categories: a tool or gadget for the garage or workshop, an upgrade to their grilling setup, fitness or outdoor gear, or tech that makes life easier. The best gifts are ones he has mentioned wanting but hasn't bought himself.",
  },
  {
    q: "What are unique Father's Day gift ideas?",
    a: "Unique Father's Day gifts include: a custom engraved multi-tool, a whiskey aging kit (make his own bourbon), a star map of a significant date, a personalized leather dopp kit with his initials, a DNA ancestry kit for the curious dad, or a premium outdoor cooking class. These feel genuinely considered — not grabbed off an endcap at the last minute.",
  },
  {
    q: "What are good Father's Day gifts under $50?",
    a: "Under $50, you can find excellent Father's Day gifts: a digital meat thermometer (the most-gifted item in this range), a BBQ spice rub set, a magnetic wristband tool holder, a premium insulated tumbler, a leather card holder, or a portable Bluetooth speaker. These hit the sweet spot of practical, useful, and priced to not overthink.",
  },
  {
    q: "What are last-minute Father's Day gift ideas?",
    a: "Last-minute Father's Day gifts that still hit: a same-day-delivery BBQ spice set, an insulated tumbler, a pocket multi-tool, or a gift card to his favorite restaurant, hardware store, or sporting goods retailer. For digital delivery: a streaming service subscription or an Audible gift card for the dad who commutes. These all ship fast and feel intentional.",
  },
  {
    q: "What's a good Father's Day gift for a new dad?",
    a: "New dads need practical support — the best gifts acknowledge what his life looks like now. Top picks: a diaper bag backpack (there are excellent men-forward options), a hands-free phone holder for baby monitoring, a premium coffee setup for sleep-deprived mornings, a funny &quot;new dad survival kit&quot; bundle, or a gift card for a meal delivery service. These signal that you see him — not just the baby.",
  },
];

const itemListSchema = {
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  name: "Father's Day Gifts",
  description: "Hand-picked Father's Day gift ideas curated by TheGiftShuffle",
  url: 'https://thegiftshuffle.com/fathers-day-gifts',
  numberOfItems: fathersDayProducts.length,
  itemListElement: fathersDayProducts.map((p, i) => ({
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

export default function FathersDayGiftsPage() {
  return (
    <div className="min-h-screen flex flex-col" style={{ background: '#FFFAF5' }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <Navbar />
      <Breadcrumbs items={[{ label: "Father's Day Gifts", href: '/fathers-day-gifts' }]} />

      <main id="main-content" className="flex-1">
        {/* Hero */}
        <section className="max-w-5xl mx-auto px-4 pt-8 pb-6 text-center">
          <h1 className="text-4xl sm:text-5xl font-extrabold mb-4" style={{ color: '#1A202C' }}>
            Father&apos;s Day Gifts
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed mb-4">
            Father&apos;s Day is the 3rd biggest gifting event of the year — and 2025 trends make it easier to nail than ever. Outdoor and garage tools remain the #1 gift category, with cordless power tools, magnetic tool wristbands, and workshop accessories leading searches. Tech gadgets are close behind: portable speakers, smartwatches, and compact projectors are the fastest-growing segments. Grilling accessories (digital meat thermometers, premium spice sets, BBQ tool kits) are perennial winners with exceptional review counts and high repurchase rates. Sports gear and health and fitness items round out the top five.
          </p>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
            The fastest-growing sub-categories this year are cordless tools, smart tech, and premium everyday carry items — the kind of upgrade Dad has been putting off buying for himself. Products with high repurchase rates like golf balls, grilling spice sets, and insulated tumblers are proven gift performers precisely because they run out, wear out, and get used constantly. These picks are curated for every kind of dad — the builder, the grill master, the tech guy, and the one who says he doesn&apos;t need anything.
          </p>
        </section>

        {/* Inline Shuffle */}
        <section className="max-w-5xl mx-auto px-4 py-6">
          <InlineShuffle products={fathersDayProducts} heading="Shuffle Father's Day Picks" />
        </section>

        {/* Full Product Grid */}
        <section className="max-w-5xl mx-auto px-4 py-8">
          <h2 className="text-2xl font-bold mb-6" style={{ color: '#1A202C' }}>
            All Father&apos;s Day Gift Ideas
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {fathersDayProducts.map((p) => (
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
              Not finding the right fit? Use TheGiftShuffle — pick Dad, set your budget, and get
              a personalized Father&apos;s Day gift recommendation in seconds.
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
              { href: '/gift-ideas-for-dad', label: 'Gift Ideas for Dad' },
              { href: '/gift-ideas-for-him', label: 'Gift Ideas for Him' },
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
