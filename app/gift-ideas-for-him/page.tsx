import type { Metadata } from 'next';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Breadcrumbs from '@/components/Breadcrumbs';
import { products } from '@/data/products';

export const metadata: Metadata = {
  title: "Gift Ideas for Him — Gifts He'll Actually Use | TheGiftShuffle",
  description:
    "Browse 25+ curated gift ideas for him — husband, boyfriend, brother, or best friend. Practical picks, unique finds, and crowd-pleasers for every budget.",
  keywords: [
    'gift ideas for him',
    'gifts for him',
    'gifts for boyfriend',
    'gifts for husband',
    'unique gifts for men',
    'practical gifts for men',
  ],
  openGraph: {
    title: "Gift Ideas for Him — Gifts He'll Actually Use | TheGiftShuffle",
    description:
      "Browse 25+ curated gift ideas for him — husband, boyfriend, brother, or best friend.",
    type: 'website',
    url: 'https://thegiftshuffle.com/gift-ideas-for-him',
  },
  alternates: {
    canonical: 'https://thegiftshuffle.com/gift-ideas-for-him',
  },
};

const himProducts = products.filter(
  (p) => p.recipients.includes('him') || p.recipients.includes('dad')
).slice(0, 24);

const faqs = [
  {
    q: "What's a good gift for a man who has everything?",
    a: "For the man who seems to have everything, the best gifts are experiences he'd never plan for himself (whiskey tasting, sporting event, cooking class), premium upgrades to things he uses daily (a quality tumbler, leather wallet, or percussion massage gun), or a subscription to something he loves.",
  },
  {
    q: 'What gifts do guys actually like?',
    a: "Men consistently rate practical, high-quality gifts highest. Top choices include smart tech gadgets, quality grilling accessories, fitness equipment, insulated tumblers, versatile multi-tools, and anything related to a specific hobby. The key is giving something he'll use regularly, not just display.",
  },
  {
    q: 'What are unique gift ideas for him under $50?',
    a: "Under $50, great gifts for men include a leather card holder, a pocket multi-tool, a beard grooming kit, an insulated 30oz tumbler, a leather dopp kit, a portable Bluetooth speaker, or a premium BBQ spice rub set. These are practical, quality items he'll use and appreciate.",
  },
  {
    q: "What's a romantic gift for a boyfriend?",
    a: "Romantic gifts for a boyfriend work best when they're personalized or tied to a shared experience. Consider a custom star map of your first date, matching couple hoodies, a wine and cheese board set for a date night at home, or an experience gift like tickets to an event he's been wanting to attend.",
  },
  {
    q: "What's a practical gift idea for a husband?",
    a: "Practical gifts for a husband he'll genuinely appreciate: a smart watch fitness tracker, a percussion massage gun, a cast iron skillet, a cordless drill kit, a smart thermostat, a quality weekender bag, or a Kindle Paperwhite if he reads. Choose something that upgrades a part of his daily life.",
  },
  {
    q: "What's a last-minute gift for him?",
    a: "For a last-minute gift for him, Amazon same-day options work great: a multi-tool, insulated tumbler, beard grooming kit, Bluetooth speaker, or wireless charger. These ship fast and feel intentional. Alternatively, a digital experience gift card (cooking class, streaming subscription) delivers instantly.",
  },
];

const itemListSchema = {
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  name: 'Gift Ideas for Him',
  description: 'Hand-picked gift ideas for him curated by TheGiftShuffle',
  url: 'https://thegiftshuffle.com/gift-ideas-for-him',
  numberOfItems: himProducts.length,
  itemListElement: himProducts.map((p, i) => ({
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

export default function GiftIdeasForHimPage() {
  return (
    <div className="min-h-screen flex flex-col" style={{ background: '#FFFAF5' }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <Navbar />
      <Breadcrumbs items={[{ label: 'Gift Ideas for Him', href: '/gift-ideas-for-him' }]} />

      <main id="main-content" className="flex-1">
        {/* Hero */}
        <section className="max-w-5xl mx-auto px-4 pt-8 pb-6 text-center">
          <h1 className="text-4xl sm:text-5xl font-extrabold mb-4" style={{ color: '#1A202C' }}>
            Gift Ideas for Him
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
            If you&apos;re looking for gift ideas for him, the best gifts are ones he&apos;ll actually
            use — smart gadgets, quality everyday carry items, grilling accessories, and experiences
            he wouldn&apos;t plan for himself. Whether you need a gift for a husband, boyfriend, or
            best friend, these picks are proven crowd-pleasers.
          </p>
        </section>

        {/* Product Grid */}
        <section className="max-w-5xl mx-auto px-4 py-8">
          <h2 className="text-2xl font-bold mb-6" style={{ color: '#1A202C' }}>
            Top Picks for Him
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {himProducts.map((p) => (
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
              Want a personalized recommendation? Use TheGiftShuffle to get an instant pick
              filtered to his personality and your budget.
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
