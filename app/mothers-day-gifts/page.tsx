import type { Metadata } from 'next';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Breadcrumbs from '@/components/Breadcrumbs';
import { products } from '@/data/products';
import ProductCard from '@/components/ProductCard';
import InlineShuffle from '@/components/InlineShuffle';

export const metadata: Metadata = {
  title: "Mother's Day Gifts — The Best Picks for 2025 | TheGiftShuffle",
  description:
    "Find the best Mother's Day gifts for 2025 — personalized jewelry, spa sets, premium kitchen gadgets, and thoughtful picks for every budget. Don't wait until the last minute.",
  keywords: [
    "mothers day gifts",
    "mothers day gift ideas",
    "best mothers day gifts 2025",
    "unique mothers day gifts",
    "mothers day gifts for mom",
  ],
  openGraph: {
    title: "Mother's Day Gifts — The Best Picks for 2025 | TheGiftShuffle",
    description:
      "Browse the best Mother's Day gifts for 2025 — personalized jewelry, spa sets, kitchen upgrades, and more.",
    type: 'website',
    url: 'https://thegiftshuffle.com/mothers-day-gifts',
    images: [
      {
        url: 'https://www.thegiftshuffle.com/api/og?title=Mother%27s%20Day%20Gifts%20%7C%20TheGiftShuffle',
        width: 1200,
        height: 630,
      },
    ],
  },
  alternates: {
    canonical: 'https://thegiftshuffle.com/mothers-day-gifts',
  },
};

const mothersDayProducts = products.filter(
  (p) => p.recipients.includes('mom') || p.recipients.includes('her')
).slice(0, 24);

const faqs = [
  {
    q: "What are the best Mother's Day gifts in 2025?",
    a: "The best Mother's Day gifts in 2025 are personalized jewelry (name necklaces, birthstone rings), premium spa and self-care sets, experience gifts (cooking classes, afternoon tea, wine tasting), smart kitchen gadgets she wouldn't buy herself, and subscription boxes tailored to her interests. These are the categories with the highest gifting satisfaction scores — she actually uses and remembers them.",
  },
  {
    q: "What does every mom want for Mother's Day?",
    a: "Most moms say they want to feel seen and appreciated — not just gifted. The gifts that land best are ones that reflect her specific personality: a spa set for the mom who never makes time for herself, a premium kitchen tool for the mom who loves to cook, a personalized keepsake for the sentimental mom. Avoid generic; lean specific.",
  },
  {
    q: "What are unique Mother's Day gift ideas?",
    a: "Unique Mother's Day gifts include: a custom star map of the day she became a mom, a handwriting necklace with her child's writing, a DNA ancestry kit, a personalized recipe book with family favorites, a day spa experience gift card, or a subscription to an online cooking class. These are the gifts she talks about years later.",
  },
  {
    q: "What are good Mother's Day gifts under $50?",
    a: "Under $50, you can find excellent Mother's Day gifts: a luxury tea gift set, a botanical puzzle, a personalized name necklace, a silk sleep eye mask and spa set, an aromatherapy diffuser, or a cozy sherpa throw blanket. These feel genuinely thoughtful at a price that doesn't require group contributions.",
  },
  {
    q: "What do moms want instead of flowers?",
    a: "While flowers are always appreciated, the gifts that outlast them are: a quality spa or self-care set, a kitchen upgrade she has been eyeing, personalized jewelry, a subscription box she will receive every month, or an experience (cooking class, local food tour). These create memories and daily use — flowers fade in a week.",
  },
  {
    q: "What are last-minute Mother's Day gift ideas?",
    a: "Last-minute Mother's Day gifts that still feel intentional: a same-day-delivery spa set or candle collection, an insulated tumbler in her favorite color, a digital gift card for a spa or restaurant experience, or a next-day-delivery personalized mug. If you have more time, even a hand-written letter with a printed photo can be more meaningful than a rushed purchase.",
  },
];

const itemListSchema = {
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  name: "Mother's Day Gifts",
  description: "Hand-picked Mother's Day gift ideas curated by TheGiftShuffle",
  url: 'https://thegiftshuffle.com/mothers-day-gifts',
  numberOfItems: mothersDayProducts.length,
  itemListElement: mothersDayProducts.map((p, i) => ({
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

export default function MothersDayGiftsPage() {
  return (
    <div className="min-h-screen flex flex-col" style={{ background: '#FFFAF5' }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <Navbar />
      <Breadcrumbs items={[{ label: "Mother's Day Gifts", href: '/mothers-day-gifts' }]} />

      <main id="main-content" className="flex-1">
        {/* Hero */}
        <section className="max-w-5xl mx-auto px-4 pt-8 pb-6 text-center">
          <h1 className="text-4xl sm:text-5xl font-extrabold mb-4" style={{ color: '#1A202C' }}>
            Mother&apos;s Day Gifts
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed mb-4">
            Mother&apos;s Day is the #2 gifting holiday in the US — and 2025 trends are clearer than ever. Personalized jewelry and keepsakes are the #1 search category this year, driven by the desire for gifts that feel permanent and meaningful. Right behind that: spa and self-care sets (because moms genuinely need a moment to recharge), experience gifts like cooking classes and wine tastings, premium kitchen gadgets that upgrade her everyday routine, and subscriptions that keep giving past the day itself. Reviews signal gift intent — the products with the most five-star mentions of &quot;got this for my mom&quot; are the ones that consistently deliver.
          </p>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
            One of the most important insights in Mother&apos;s Day gifting: buying early unlocks the best selection. Popular items — especially personalized jewelry, custom keepsakes, and curated spa sets — sell out or face shipping delays as the holiday approaches. The picks below are available now and hand-curated to match what moms actually want in 2025, not just what looks good in an ad.
          </p>
        </section>

        {/* Inline Shuffle */}
        <section className="max-w-5xl mx-auto px-4 py-6">
          <InlineShuffle products={mothersDayProducts} heading="Shuffle Mother's Day Picks" />
        </section>

        {/* Full Product Grid */}
        <section className="max-w-5xl mx-auto px-4 py-8">
          <h2 className="text-2xl font-bold mb-6" style={{ color: '#1A202C' }}>
            All Mother&apos;s Day Gift Ideas
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {mothersDayProducts.map((p) => (
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
              Not finding the right fit? Use TheGiftShuffle — pick Mom, set your budget, and get
              a personalized Mother&apos;s Day gift recommendation in seconds.
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
              { href: '/gift-ideas-for-her', label: 'Gift Ideas for Her' },
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
