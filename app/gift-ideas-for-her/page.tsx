import type { Metadata } from 'next';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Breadcrumbs from '@/components/Breadcrumbs';
import { products } from '@/data/products';

export const metadata: Metadata = {
  title: "Gift Ideas for Her — Gifts She'll Actually Love | TheGiftShuffle",
  description:
    "Browse 25+ thoughtful gift ideas for her — wife, girlfriend, sister, or best friend. From self-care to personal style, these picks make an impression.",
  keywords: [
    'gift ideas for her',
    'gifts for her',
    'gifts for girlfriend',
    'gifts for wife',
    'unique gifts for women',
    'thoughtful gifts for women',
  ],
  openGraph: {
    title: "Gift Ideas for Her — Gifts She'll Actually Love | TheGiftShuffle",
    description:
      "Browse 25+ thoughtful gift ideas for her — wife, girlfriend, sister, or best friend.",
    type: 'website',
    url: 'https://thegiftshuffle.com/gift-ideas-for-her',
  },
  alternates: {
    canonical: 'https://thegiftshuffle.com/gift-ideas-for-her',
  },
};

const herProducts = products.filter(
  (p) => p.recipients.includes('her') || p.recipients.includes('mom')
).slice(0, 24);

const faqs = [
  {
    q: "What's a good gift for a woman who has everything?",
    a: "For the woman who has everything, the best gifts are personalized or experiential — a custom name necklace, a spa day gift card, a luxury skincare set she'd never splurge on herself, or an experience like a cooking class or wine tasting. These feel thoughtful precisely because they require knowing her.",
  },
  {
    q: 'What gifts do women actually love?',
    a: "Women consistently love gifts that feel personal and indulgent. Top picks include luxury self-care sets (bath bombs, face rollers, silk eye masks), personalized jewelry, cozy loungewear like silk pajamas or a cashmere sweater, premium skincare, and experience gifts like spa days or cooking classes.",
  },
  {
    q: 'What are unique gift ideas for her under $50?',
    a: "Under $50, great gifts for her include a personalized name necklace, an aromatherapy diffuser, a jade face roller and gua sha set, a luxury tea gift set, a silk sleep eye mask, a cozy sherpa blanket, or a botanical illustration puzzle. These feel luxurious at a practical price point.",
  },
  {
    q: "What's a romantic gift for a girlfriend?",
    a: "Romantic gifts for a girlfriend include personalized jewelry (a name necklace or birthstone bracelet), a couple's spa experience, matching hoodies, a custom star map of your first date, a luxury candle gift set, or a wine and cheese board for a night in. The key is anything that says you put thought into it.",
  },
  {
    q: "What's a thoughtful gift for a wife?",
    a: "Thoughtful gifts for a wife are things she'd love but wouldn't buy for herself: a Dyson Airwrap, silk pajamas, a Nespresso machine, a KitchenAid stand mixer, a spa day gift card, or a personalized jewelry box. These show you know her well enough to pick something truly special.",
  },
  {
    q: "What's a last-minute gift for her?",
    a: "For a last-minute gift for her that still feels intentional: a cozy sherpa blanket, a scented candle set, bath bombs, a Kindle Paperwhite, or an insulated tumbler are all available for same-day delivery and are genuinely appreciated. A digital gift card for a spa or cooking class also delivers instantly.",
  },
];

const itemListSchema = {
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  name: 'Gift Ideas for Her',
  description: 'Hand-picked gift ideas for her curated by TheGiftShuffle',
  url: 'https://thegiftshuffle.com/gift-ideas-for-her',
  numberOfItems: herProducts.length,
  itemListElement: herProducts.map((p, i) => ({
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

export default function GiftIdeasForHerPage() {
  return (
    <div className="min-h-screen flex flex-col" style={{ background: '#FFFAF5' }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <Navbar />
      <Breadcrumbs items={[{ label: 'Gift Ideas for Her', href: '/gift-ideas-for-her' }]} />

      <main id="main-content" className="flex-1">
        {/* Hero */}
        <section className="max-w-5xl mx-auto px-4 pt-8 pb-6 text-center">
          <h1 className="text-4xl sm:text-5xl font-extrabold mb-4" style={{ color: '#1A202C' }}>
            Gift Ideas for Her
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
            If you&apos;re looking for gift ideas for her, the best gifts are ones that feel personal
            and indulgent — luxury self-care sets, personalized jewelry, cozy loungewear, and
            experiences she&apos;d never plan for herself. Whether you need a gift for a wife,
            girlfriend, or best friend, these picks consistently land.
          </p>
        </section>

        {/* Product Grid */}
        <section className="max-w-5xl mx-auto px-4 py-8">
          <h2 className="text-2xl font-bold mb-6" style={{ color: '#1A202C' }}>
            Top Picks for Her
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {herProducts.map((p) => (
              <div
                key={p.id}
                className="bg-white rounded-2xl p-5 shadow-sm border border-[#E2E8F0] flex flex-col"
              >
                <div className="flex-1">
                  <h3 className="font-bold text-[#1A202C] mb-1 leading-tight">{p.name}</h3>
                  <p className="text-gray-500 text-sm mb-3 leading-relaxed">{p.description}</p>
                  <div className="flex items-center gap-1 text-sm text-gray-400 mb-2">
                    <span className="text-yellow-400">★</span>
                    <span>{p.rating} ({p.reviewCount.toLocaleString()} reviews)</span>
                  </div>
                </div>
                <div className="flex items-center justify-between mt-auto pt-3 border-t border-gray-100">
                  <span className="font-bold text-[#F04E30] text-lg">{p.priceDisplay}</span>
                  <a
                    href={p.affiliateUrl}
                    target="_blank"
                    rel="noopener noreferrer sponsored"
                    className="bg-[#F04E30] text-white text-sm font-semibold px-4 py-2 rounded-full hover:opacity-90 transition-opacity"
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
              Want a recommendation matched to her personality and your budget? Use
              TheGiftShuffle to get an instant pick in seconds.
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
              { href: '/gifts-under-50', label: 'Gifts Under $50' },
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
