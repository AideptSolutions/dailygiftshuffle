import type { Metadata } from 'next';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Breadcrumbs from '@/components/Breadcrumbs';
import { products } from '@/data/products';
import ProductCard from '@/components/ProductCard';

export const metadata: Metadata = {
  title: 'Birthday Gift Ideas — Unique Picks for Every Person | TheGiftShuffle',
  description:
    "The birthday is tomorrow and you have no idea what to get. Browse 30+ curated birthday gift ideas for everyone on your list — sorted by recipient and budget.",
  keywords: [
    'birthday gift ideas',
    'birthday gifts',
    'unique birthday gifts',
    'birthday gifts for adults',
    'birthday gifts under $50',
    'last minute birthday gifts',
  ],
  openGraph: {
    title: 'Birthday Gift Ideas — Unique Picks for Every Person | TheGiftShuffle',
    description:
      "Browse 30+ curated birthday gift ideas for everyone on your list — sorted by recipient and budget.",
    type: 'website',
    url: 'https://thegiftshuffle.com/birthday-gift-ideas',
  },
  alternates: {
    canonical: 'https://thegiftshuffle.com/birthday-gift-ideas',
  },
};

const birthdayProducts = products
  .filter((p) => p.occasions?.includes('birthday'))
  .slice(0, 30);

const faqs = [
  {
    q: "What's a good birthday gift for someone who has everything?",
    a: "For someone who has everything, the best birthday gifts are experiences (cooking class, whiskey tasting, escape room, concert tickets), premium upgrades to daily items (Ember temperature mug, smart watch, Dyson hair styler), or sentimental personalized pieces (custom star map, monogrammed leather journal, birthstone bracelet). These feel fresh because they're either unique to them or experiential.",
  },
  {
    q: 'What are unique birthday gift ideas?',
    a: "Truly unique birthday gifts that people remember: an Oura Ring sleep tracker, a hot air balloon ride certificate, a red light therapy wand, a custom night sky map of their birth date, a couples cooking class, an infrared sauna blanket, or a premium whiskey decanter set. These stand out precisely because most people default to Amazon gift cards.",
  },
  {
    q: 'What are good birthday gifts under $50?',
    a: "Great birthday gifts under $50 include a personalized name necklace, a portable Bluetooth speaker, wireless earbuds, an aromatherapy diffuser, a cozy sherpa blanket, a Polaroid mini instant camera, a premium yoga mat, or a journaling starter kit. Choose something tied to what they love and it will always feel special.",
  },
  {
    q: "What's a last-minute birthday gift?",
    a: "For a last-minute birthday gift that arrives on time, focus on Amazon same-day or next-day options: an insulated tumbler, a cozy sherpa blanket, a beard grooming kit, a scented candle set, or a Kindle Paperwhite. Alternatively, a digital gift card for Amazon, an experience, or a streaming subscription delivers instantly and feels intentional.",
  },
  {
    q: 'What birthday gifts do adults actually want?',
    a: "Adults consistently prefer practical luxury — gifts they'd want but wouldn't buy for themselves. Top picks: a percussion massage gun, a smart watch, a Kindle Paperwhite, an Ember temperature mug, premium noise-canceling headphones, a cozy weighted blanket, or a high-end skincare gift set. Adults also love experience gifts (cooking class, wine tasting, spa day) over physical items.",
  },
  {
    q: "What's a good birthday gift for a friend?",
    a: "Good birthday gifts for friends are personal without being too intimate: a funny quote wine glass, a himalayan salt lamp, a portable Bluetooth speaker, a wine tasting gift set, a luxury candle gift set, a cozy sherpa blanket, or a chess set if they're into games. The best friend gifts reflect their specific personality and interests.",
  },
];

const itemListSchema = {
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  name: 'Birthday Gift Ideas',
  description: 'Curated birthday gift ideas for every person by TheGiftShuffle',
  url: 'https://thegiftshuffle.com/birthday-gift-ideas',
  numberOfItems: birthdayProducts.length,
  itemListElement: birthdayProducts.map((p, i) => ({
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

export default function BirthdayGiftIdeasPage() {
  return (
    <div className="min-h-screen flex flex-col" style={{ background: '#FFFAF5' }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <Navbar />
      <Breadcrumbs items={[{ label: 'Birthday Gift Ideas', href: '/birthday-gift-ideas' }]} />

      <main id="main-content" className="flex-1">
        {/* Hero */}
        <section className="max-w-5xl mx-auto px-4 pt-8 pb-6 text-center">
          <h1 className="text-4xl sm:text-5xl font-extrabold mb-4" style={{ color: '#1A202C' }}>
            Birthday Gift Ideas
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
            The best birthday gift ideas include personalized items, experience gifts, curated
            gift boxes, and practical favorites they&apos;d never buy themselves. Whether you
            need a last-minute pick or a carefully planned surprise, these birthday gifts are
            chosen to make people smile — for any age, budget, and personality.
          </p>
        </section>

        {/* Product Grid */}
        <section className="max-w-5xl mx-auto px-4 py-8">
          <h2 className="text-2xl font-bold mb-6" style={{ color: '#1A202C' }}>
            Top Birthday Gift Picks
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {birthdayProducts.map((p) => (
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
              Need a birthday gift idea right now? Use TheGiftShuffle — pick who it&apos;s for,
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
              { href: '/gift-ideas-for-mom', label: 'Gift Ideas for Mom' },
              { href: '/gift-ideas-for-dad', label: 'Gift Ideas for Dad' },
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
