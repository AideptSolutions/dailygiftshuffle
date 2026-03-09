import type { Metadata } from 'next';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Breadcrumbs from '@/components/Breadcrumbs';
import { products } from '@/data/products';

export const metadata: Metadata = {
  title: 'Gifts Under $50 — 30 Great Ideas for Any Occasion | TheGiftShuffle',
  description:
    "You don't need to spend a lot to give a great gift. Browse 30+ curated gift ideas under $50 — thoughtful picks for birthdays, holidays, and just because.",
  keywords: [
    'gifts under $50',
    'gifts under 50 dollars',
    'cheap gifts',
    'affordable gift ideas',
    'budget gift ideas',
    'good gifts under 50',
  ],
  openGraph: {
    title: 'Gifts Under $50 — 30 Great Ideas for Any Occasion | TheGiftShuffle',
    description:
      "Browse 30+ curated gift ideas under $50 — thoughtful picks that prove you don't need a big budget.",
    type: 'website',
    url: 'https://thegiftshuffle.com/gifts-under-50',
  },
  alternates: {
    canonical: 'https://thegiftshuffle.com/gifts-under-50',
  },
};

const under50Products = products.filter(
  (p) => p.budgetTier === 'under25' || p.budgetTier === '25to50'
).slice(0, 30);

const faqs = [
  {
    q: "What's a good gift under $50?",
    a: "The best gifts under $50 are practical, high-quality items the recipient will actually use. Top picks include a cozy sherpa blanket, an insulated 30oz tumbler, a personalized name necklace, an aromatherapy diffuser, a portable Bluetooth speaker, a premium beard grooming kit, or a luxury tea gift set. These all feel thoughtful without the big price tag.",
  },
  {
    q: 'What are unique gifts for $50 or less?',
    a: "For unique gifts under $50, consider a himalayan salt lamp, a botanical illustration puzzle, a jade face roller and gua sha set, a polaroid mini instant camera, aesthetic LED room light kit, a journaling starter kit, or a set of mulberry silk scrunchies. These stand out from generic gift-giving while staying well under budget.",
  },
  {
    q: 'What can I get someone for $25?',
    a: "There are genuinely great gifts under $25: a rose gold journal, a set of bath bombs, a funny quote wine glass, a pocket multi-tool, a BBQ spice rub set, a pop socket phone grip, a floral scented candle, or self-care affirmation cards. These feel intentional and personal without the splurge.",
  },
  {
    q: "What's a thoughtful last-minute gift under $50?",
    a: "For a thoughtful last-minute gift under $50 that still arrives on time, prioritize items with Amazon same-day or next-day delivery: a cozy sherpa throw blanket, an insulated tumbler, a scented candle set, a beard grooming kit, or a portable Bluetooth speaker. These ship quickly and feel meaningful.",
  },
  {
    q: "What's a good birthday gift under $50?",
    a: "Great birthday gifts under $50 include a personalized name necklace, an aromatherapy diffuser, a Polaroid mini instant camera, a journaling starter kit, a premium yoga mat, wireless earbuds, or aesthetic LED room lights. Pick something tied to their interests and it will always land well.",
  },
  {
    q: 'What do people actually want as gifts under $50?',
    a: "According to reviews and bestseller data, the most appreciated gifts under $50 are: insulated tumblers (especially the 30oz format), cozy sherpa blankets, portable Bluetooth speakers, quality skin care and bath sets, and practical tech accessories like wireless chargers and cable organizers. Practical gifts with a premium feel win every time.",
  },
];

const itemListSchema = {
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  name: 'Gifts Under $50',
  description: 'Curated gifts under $50 for any occasion by TheGiftShuffle',
  url: 'https://thegiftshuffle.com/gifts-under-50',
  numberOfItems: under50Products.length,
  itemListElement: under50Products.map((p, i) => ({
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

export default function GiftsUnder50Page() {
  return (
    <div className="min-h-screen flex flex-col" style={{ background: '#FFFAF5' }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <Navbar />
      <Breadcrumbs items={[{ label: 'Gifts Under $50', href: '/gifts-under-50' }]} />

      <main id="main-content" className="flex-1">
        {/* Hero */}
        <section className="max-w-5xl mx-auto px-4 pt-8 pb-6 text-center">
          <h1 className="text-4xl sm:text-5xl font-extrabold mb-4" style={{ color: '#1A202C' }}>
            Gifts Under $50
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
            The best gifts under $50 include cozy self-care sets, personalized keepsakes,
            bestselling tech accessories, quality kitchen tools, and fun experiences. Whether
            you need a birthday gift, a holiday pick, or something just because — these picks
            prove you don&apos;t need a big budget to make a big impression.
          </p>
        </section>

        {/* Product Grid */}
        <section className="max-w-5xl mx-auto px-4 py-8">
          <h2 className="text-2xl font-bold mb-6" style={{ color: '#1A202C' }}>
            Top Picks Under $50
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {under50Products.map((p) => (
              <div
                key={p.id}
                className="bg-white rounded-2xl p-5 shadow-sm border border-[#E2E8F0] flex flex-col"
              >
                <div className="flex-1">
                  <div className="flex items-start justify-between gap-2 mb-1">
                    <h3 className="font-bold text-[#1A202C] leading-tight">{p.name}</h3>
                    <span className="text-xs font-semibold bg-green-50 text-green-700 px-2 py-0.5 rounded-full shrink-0">
                      {p.priceDisplay}
                    </span>
                  </div>
                  <p className="text-gray-500 text-sm mb-3 leading-relaxed">{p.description}</p>
                  <div className="flex items-center gap-1 text-sm text-gray-400 mb-2">
                    <span className="text-yellow-400">★</span>
                    <span>{p.rating} ({p.reviewCount.toLocaleString()} reviews)</span>
                  </div>
                </div>
                <div className="mt-auto pt-3 border-t border-gray-100">
                  <a
                    href={p.affiliateUrl}
                    target="_blank"
                    rel="noopener noreferrer sponsored"
                    className="block w-full text-center bg-[#F04E30] text-white text-sm font-semibold px-4 py-2 rounded-full hover:opacity-90 transition-opacity"
                  >
                    Shop on Amazon
                  </a>
                </div>
              </div>
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
              Want a budget-matched recommendation in seconds? Use TheGiftShuffle — pick
              your recipient, select your budget tier, and hit Shuffle.
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
              { href: '/birthday-gift-ideas', label: 'Birthday Gift Ideas' },
              { href: '/christmas-gift-ideas', label: 'Christmas Gift Ideas' },
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
