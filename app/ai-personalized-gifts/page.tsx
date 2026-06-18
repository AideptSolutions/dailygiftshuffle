import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import Navbar from '@/components/Navbar';
import InlineShuffle from '@/components/InlineShuffle';
import Breadcrumbs from '@/components/Breadcrumbs';
import { products } from '@/data/products';
import ProductCard from '@/components/ProductCard';

export const metadata: Metadata = {
  title: 'AI-Powered Personalized Gifts — Smart Picks for Everyone | TheGiftShuffle',
  description:
    'The new wave of gifting uses AI to make it personal. Browse the best AI-powered and personalized gift ideas — from smart photo frames to custom portraits to DNA kits — for any budget.',
  keywords: [
    'ai personalized gifts',
    'personalized gift ideas',
    'ai gift ideas',
    'smart personalized gifts',
    'custom ai gifts',
    'technology gift ideas',
    'unique personalized gifts',
  ],
  openGraph: {
    title: 'AI-Powered Personalized Gifts — Smart Picks for Everyone | TheGiftShuffle',
    description:
      'Browse the best AI-powered and personalized gift ideas — from smart photo frames to custom portraits to DNA kits — for any budget.',
    type: 'website',
    url: 'https://thegiftshuffle.com/ai-personalized-gifts',
    images: [
      {
        url: 'https://www.thegiftshuffle.com/api/og?title=AI-Powered%20Personalized%20Gifts%20%7C%20TheGiftShuffle',
        width: 1200,
        height: 630,
      },
    ],
  },
  alternates: {
    canonical: 'https://thegiftshuffle.com/ai-personalized-gifts',
  },
};

const aiProducts = products
  .filter((p) => p.tags?.includes('ai-smart-home') || p.tags?.includes('tech'))
  .slice(0, 24);

const faqs = [
  {
    q: 'What are AI-powered personalized gifts?',
    a: "AI-powered personalized gifts use artificial intelligence to create something tailored to the recipient — custom portrait art generated from their photo, a smart frame that learns their favorite memories, a DNA ancestry kit that maps their heritage, or a book written just for them. They combine the thoughtfulness of a personalized gift with technology that makes the experience feel genuinely unique rather than just monogrammed.",
  },
  {
    q: 'What is the best AI gift to give someone?',
    a: "The best AI gifts depend on the person. For tech lovers: an Amazon Echo Show or smart display. For the sentimental type: a Locket smart photo frame or a custom AI portrait print. For the curious: a 23andMe DNA ancestry kit. For the home decorator: an AI-curated art print service. These gifts tend to be memorable because they feel personal and forward-thinking at the same time.",
  },
  {
    q: 'Are personalized gifts worth it?',
    a: "Yes — personalized gifts are consistently rated higher by recipients than generic ones. Studies show people value effort and thought over price tag. An AI-generated custom portrait or a smart frame loaded with family photos signals that you paid attention. That signal matters far more than how much you spent.",
  },
  {
    q: 'What are unique personalized gift ideas under $50?',
    a: "Great personalized gifts under $50 include a custom star map print of a meaningful date, a personalized name necklace, a monogrammed leather journal, a custom illustrated portrait from an AI art service, a smart photo keychain, or a personalized recipe book. These feel considered without requiring a large budget.",
  },
  {
    q: 'What AI gifts are good for someone who loves technology?',
    a: "For tech enthusiasts, top AI gifts include: an Amazon Echo Show (smart display), a Govee smart LED light system, a smart home hub starter kit, an AI-powered security camera, or a robot vacuum. For something more personal, a custom AI portrait or a DNA heritage kit pairs tech with sentimentality — a combination most tech people do not expect.",
  },
  {
    q: 'What is a good personalized gift for a couple?',
    a: "The best personalized gifts for couples include: a custom star map of their first date, a personalized couples portrait, a smart photo frame pre-loaded with shared memories, a DNA ancestry kit for both (if heritage matters to them), or a custom illustrated map of a meaningful city. Choose something that references a shared story.",
  },
];

const itemListSchema = {
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  name: 'AI-Powered Personalized Gifts',
  description: 'Curated AI-powered and personalized gift ideas for every person by TheGiftShuffle',
  url: 'https://thegiftshuffle.com/ai-personalized-gifts',
  numberOfItems: aiProducts.length,
  itemListElement: aiProducts.map((p, i) => ({
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

export default function AiPersonalizedGiftsPage() {
  return (
    <div className="min-h-screen flex flex-col" style={{ background: '#FFFAF5' }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <Navbar />
      <Breadcrumbs items={[{ label: 'AI-Powered Personalized Gifts', href: '/ai-personalized-gifts' }]} />

      <main id="main-content" className="flex-1">
        {/* Hero image */}
        <section className="max-w-5xl mx-auto px-4 pt-8">
          <div className="relative w-full rounded-2xl overflow-hidden" style={{ aspectRatio: '3/2', maxHeight: '420px' }}>
            <Image
              src="/images/heroes/ai-personalized-gifts.jpg"
              alt="Personalized custom gifts wrapped and arranged on a table"
              fill
              className="object-cover"
              priority
              unoptimized
            />
          </div>
        </section>
        {/* Hero */}
        <section className="max-w-5xl mx-auto px-4 pt-8 pb-6 text-center">
          <h1 className="text-4xl sm:text-5xl font-extrabold mb-4" style={{ color: '#1A202C' }}>
            AI-Powered Personalized Gifts
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
            The new wave of gifting uses AI to make it personal. Browse the best AI-powered and
            personalized gift ideas — from smart photo frames to custom portraits to DNA kits —
            for any budget and any person on your list.
          </p>
        </section>

        {/* Product Grid */}
        {/* Inline Shuffle */}
        <section className="max-w-5xl mx-auto px-4 py-6">
          <InlineShuffle products={aiProducts} heading="Shuffle AI Gift Picks" />
        </section>

        <section className="max-w-5xl mx-auto px-4 py-8">
          <h2 className="text-2xl font-bold mb-6" style={{ color: '#1A202C' }}>
            Top AI &amp; Personalized Gift Picks
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {aiProducts.map((p) => (
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
              Not sure which personalized gift to choose? Use TheGiftShuffle — pick who it&apos;s
              for, set your budget, and get an instant smart recommendation.
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
              { href: '/gift-ideas-for-him', label: 'Gift Ideas for Him' },
              { href: '/gift-ideas-for-her', label: 'Gift Ideas for Her' },
              { href: '/birthday-gift-ideas', label: 'Birthday Gift Ideas' },
              { href: '/graduation-gifts', label: 'Graduation Gifts' },
              { href: '/gifts-under-100', label: 'Gifts Under $100' },
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
