import type { Metadata } from 'next';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Breadcrumbs from '@/components/Breadcrumbs';
import { products } from '@/data/products';

export const metadata: Metadata = {
  title: "Gift Ideas for Dad — 25 Unique Picks He'll Actually Use | TheGiftShuffle",
  description:
    "Skip the boring tie. Browse 25+ hand-picked gift ideas for Dad — from tech gadgets to experiences he'll actually talk about. Perfect for Father's Day, birthdays, and more.",
  keywords: [
    'gift ideas for dad',
    'gifts for dad',
    'fathers day gifts',
    'birthday gifts for dad',
    'unique gifts for dad',
    'gifts dad will actually use',
  ],
  openGraph: {
    title: "Gift Ideas for Dad — 25 Unique Picks He'll Actually Use | TheGiftShuffle",
    description:
      "Browse 25+ hand-picked gift ideas for Dad — gadgets, grilling gear, and experiences he'll actually use.",
    type: 'website',
    url: 'https://thegiftshuffle.com/gift-ideas-for-dad',
  },
  alternates: {
    canonical: 'https://thegiftshuffle.com/gift-ideas-for-dad',
  },
};

const dadProducts = products.filter(
  (p) => p.recipients.includes('dad') || p.recipients.includes('him')
).slice(0, 24);

const faqs = [
  {
    q: 'What do dads actually want as gifts?',
    a: "Most dads want gifts they'll genuinely use — not decorations that collect dust. Top picks include smart gadgets, quality tools, grilling accessories, insulated tumblers, and experience gifts like a whiskey tasting or golf lesson. When in doubt, upgrade something he already uses to a premium version.",
  },
  {
    q: "What's a good gift for a dad who has everything?",
    a: "For a dad who has everything, the best gifts are experiences (golf lesson, distillery tour, cooking class), personalized keepsakes (custom star map, engraved flask), or subscriptions to something he loves (craft beer club, streaming service, coffee subscription). These feel fresh regardless of what he already owns.",
  },
  {
    q: 'What are unique gifts for dad under $50?',
    a: "Under $50 you can find genuinely useful gifts Dad will love: a digital meat thermometer (the most popular dad gift on Amazon), an insulated 30oz tumbler, a leather dopp kit, a BBQ spice rub set, a magnetic wristband tool holder, or a premium chess set. These are practical, quality picks he'd love.",
  },
  {
    q: "What's a last-minute gift for dad?",
    a: "For a last-minute gift, go with something available for same-day or next-day delivery: a quality multi-tool, an insulated tumbler, a beard grooming kit, or a digital gift card for an experience he'd enjoy. These feel thoughtful even on short notice.",
  },
  {
    q: 'What gifts do dads love most?',
    a: "Dads consistently love gifts that make their hobbies or daily routines better. Top categories: grilling and BBQ accessories, tech gadgets and smart home devices, quality tools and EDC items, fitness trackers, and anything related to his specific hobby — whether that's fishing, golf, woodworking, or gaming.",
  },
  {
    q: "What's the best Father's Day gift?",
    a: "The best Father's Day gifts are personalized or experience-based. Popular picks include a custom engraved whiskey decanter set, a pellet smoker grill, a smart watch, a cast iron skillet, or an experience like a cooking class or sporting event tickets. Choose something tied to what he actually enjoys doing.",
  },
];

const itemListSchema = {
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  name: 'Gift Ideas for Dad',
  description: 'Hand-picked gift ideas for Dad curated by TheGiftShuffle',
  url: 'https://thegiftshuffle.com/gift-ideas-for-dad',
  numberOfItems: dadProducts.length,
  itemListElement: dadProducts.map((p, i) => ({
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

export default function GiftIdeasForDadPage() {
  return (
    <div className="min-h-screen flex flex-col" style={{ background: '#FFFAF5' }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <Navbar />
      <Breadcrumbs items={[{ label: 'Gift Ideas for Dad', href: '/gift-ideas-for-dad' }]} />

      <main id="main-content" className="flex-1">
        {/* Hero */}
        <section className="max-w-5xl mx-auto px-4 pt-8 pb-6 text-center">
          <h1 className="text-4xl sm:text-5xl font-extrabold mb-4" style={{ color: '#1A202C' }}>
            Gift Ideas for Dad
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
            If you&apos;re looking for gift ideas for dad, the best options include smart gadgets,
            grilling accessories, personalized keepsakes, and experiences like golf lessons or a
            whiskey tasting. These picks are chosen because dads actually use them — no forgotten
            gift drawer.
          </p>
        </section>

        {/* Product Grid */}
        <section className="max-w-5xl mx-auto px-4 py-8">
          <h2 className="text-2xl font-bold mb-6" style={{ color: '#1A202C' }}>
            Top Picks for Dad
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {dadProducts.map((p) => (
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
              Not finding exactly what you need? Use TheGiftShuffle to get a personalized
              recommendation in seconds — just pick Dad, set your budget, and hit Shuffle.
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
