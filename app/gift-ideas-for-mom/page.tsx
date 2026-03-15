import type { Metadata } from 'next';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Breadcrumbs from '@/components/Breadcrumbs';
import { products } from '@/data/products';
import ProductCard from '@/components/ProductCard';

export const metadata: Metadata = {
  title: 'Gift Ideas for Mom — 25 Thoughtful Picks | TheGiftShuffle',
  description:
    'Finding the perfect gift for Mom just got easy. Browse 25+ hand-picked gift ideas for every budget — from thoughtful keepsakes to practical favorites she\'ll actually love.',
  keywords: [
    'gift ideas for mom',
    'gifts for mom',
    'mothers day gifts',
    'birthday gifts for mom',
    'unique gifts for mom',
    'thoughtful gifts for mom',
  ],
  openGraph: {
    title: 'Gift Ideas for Mom — 25 Thoughtful Picks | TheGiftShuffle',
    description:
      'Browse 25+ hand-picked gift ideas for Mom for every budget — from spa sets to personalized keepsakes.',
    type: 'website',
    url: 'https://thegiftshuffle.com/gift-ideas-for-mom',
  },
  alternates: {
    canonical: 'https://thegiftshuffle.com/gift-ideas-for-mom',
  },
};

const momProducts = products.filter(
  (p) => p.recipients.includes('mom') || p.recipients.includes('her')
).slice(0, 24);

const faqs = [
  {
    q: "What's a good gift for a mom who has everything?",
    a: "For a mom who has everything, the best gifts are experiences or personalized keepsakes she wouldn't buy for herself — think a spa day gift card, a custom star map of a meaningful date, a monogrammed jewelry box, or a subscription box tailored to her interests. These feel thoughtful without duplicating what she already owns.",
  },
  {
    q: "What do moms actually want for Mother's Day?",
    a: "Most moms say they want to feel appreciated and relaxed. Top Mother's Day gifts include spa and self-care sets, quality time experiences, personalized jewelry, cozy loungewear, or a premium coffee machine. Skip the generic and go for something that reflects her specific personality and interests.",
  },
  {
    q: "What are unique gift ideas for mom under $50?",
    a: "Under $50, you can find genuinely thoughtful gifts for mom: a luxury tea gift set, a silk sleep eye mask and earplugs spa set, an aromatherapy diffuser, a personalized name necklace, or a beautiful botanical puzzle. These feel special without breaking the bank.",
  },
  {
    q: "What's a last-minute gift idea for mom?",
    a: "For a last-minute gift that still feels intentional, choose something available for same-day delivery: a cozy sherpa blanket, an insulated tumbler, a scented candle set, or a digital gift card for a spa experience. These ship fast and always land well.",
  },
  {
    q: "What gifts do moms love most?",
    a: "Moms consistently love gifts that help them relax and recharge. Top picks include spa and bath sets, luxurious loungewear, kitchen upgrades she wouldn't splurge on herself, experience gifts like cooking classes, and sentimental personalized items like custom jewelry or photo books.",
  },
  {
    q: "What's the best gift for a new mom?",
    a: "New moms need practical comfort and self-care. The best gifts include a postpartum recovery care kit, a silk sleep eye mask, a high-quality nursing-friendly robe, a cozy weighted blanket, or a meal delivery gift card. These show you're thinking about her needs, not just the baby's.",
  },
];

const itemListSchema = {
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  name: 'Gift Ideas for Mom',
  description: 'Hand-picked gift ideas for Mom curated by TheGiftShuffle',
  url: 'https://thegiftshuffle.com/gift-ideas-for-mom',
  numberOfItems: momProducts.length,
  itemListElement: momProducts.map((p, i) => ({
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

export default function GiftIdeasForMomPage() {
  return (
    <div className="min-h-screen flex flex-col" style={{ background: '#FFFAF5' }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <Navbar />
      <Breadcrumbs items={[{ label: 'Gift Ideas for Mom', href: '/gift-ideas-for-mom' }]} />

      <main id="main-content" className="flex-1">
        {/* Hero */}
        <section className="max-w-5xl mx-auto px-4 pt-8 pb-6 text-center">
          <h1 className="text-4xl sm:text-5xl font-extrabold mb-4" style={{ color: '#1A202C' }}>
            Gift Ideas for Mom
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
            If you&apos;re looking for gift ideas for mom, the best options include personalized jewelry,
            cozy spa sets, subscription boxes, and experiences like cooking classes. Whether you&apos;re
            shopping for Mother&apos;s Day, her birthday, or just because, these hand-picked picks are
            matched to what moms actually love.
          </p>
        </section>

        {/* Product Grid */}
        <section className="max-w-5xl mx-auto px-4 py-8">
          <h2 className="text-2xl font-bold mb-6" style={{ color: '#1A202C' }}>
            Top Picks for Mom
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {momProducts.map((p) => (
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
              Not finding exactly what you need? Use TheGiftShuffle to get a personalized
              recommendation in seconds — just pick Mom, set your budget, and hit Shuffle.
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
