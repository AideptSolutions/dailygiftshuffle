import type { Metadata } from 'next';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Breadcrumbs from '@/components/Breadcrumbs';
import { products } from '@/data/products';
import ProductCard from '@/components/ProductCard';
import InlineShuffle from '@/components/InlineShuffle';

export const metadata: Metadata = {
  title: "Gift Ideas for Grandparents — Thoughtful Gifts They'll Love | TheGiftShuffle",
  description:
    'Find the perfect gift for grandma or grandpa — from garden tools and cozy home items to easy-to-use tech and wellness gifts. Hand-picked thoughtful gifts for grandparents.',
  keywords: [
    'gift ideas for grandparents',
    'gifts for grandma',
    'gifts for grandpa',
    'unique gifts for grandparents',
    'practical gifts for grandparents',
  ],
  openGraph: {
    title: "Gift Ideas for Grandparents — Thoughtful Gifts They'll Love | TheGiftShuffle",
    description:
      'Browse thoughtful gift ideas for grandparents — garden tools, cozy home picks, wellness items, and easy tech they will actually use.',
    type: 'website',
    url: 'https://thegiftshuffle.com/gift-ideas-for-grandparents',
    images: [
      {
        url: 'https://www.thegiftshuffle.com/api/og?title=Gift%20Ideas%20for%20Grandparents%20%7C%20TheGiftShuffle',
        width: 1200,
        height: 630,
      },
    ],
  },
  alternates: {
    canonical: 'https://thegiftshuffle.com/gift-ideas-for-grandparents',
  },
};

const grandparentProducts = products.filter((p) => p.recipients.includes('grandparents')).slice(0, 24);

const faqs = [
  {
    q: "What's a good gift for grandma who has everything?",
    a: "For a grandma who seems to have everything, the best gifts are thoughtful and experiential: a digital photo frame preloaded with family photos, a personalized recipe book with family favorites, a subscription to an audiobook service, or a luxurious weighted blanket. Focus on items that create connection or help her relax — things she might not buy herself.",
  },
  {
    q: 'What do grandpas like as gifts?',
    a: "Grandpas tend to appreciate practical gifts tied to their hobbies. Top picks include garden tool accessories (kneeling pads, seed starter kits), workshop and DIY tools, a premium insulated travel mug, crossword puzzle books, or a digital photo frame. Tech gifts work best when they are intuitive — smart speakers like Echo Dot are especially popular.",
  },
  {
    q: 'What are practical gifts for elderly grandparents?',
    a: "Practical gifts for elderly grandparents include: a hands-free LED book light, a large-button TV remote, a non-slip bath mat, a jar opener set, a heated throw blanket, or a pill organizer with day labels. These are the gifts that get used every single day — and they always appreciate the thoughtfulness behind choosing something functional.",
  },
  {
    q: 'What are good gifts for grandparents under $50?',
    a: "Under $50, you can find excellent grandparent gifts: a cozy sherpa throw blanket, a deluxe seed packet collection, a large-print word search book, a premium tea gift set, or a long-reach garden tool set. Items in this range with 10k+ reviews signal that other families have already vetted them as reliable grandparent gifts.",
  },
  {
    q: 'What gifts help grandparents stay active?',
    a: "Gifts that encourage activity for grandparents include: a lightweight gardening kneeling pad with handles, resistance bands for gentle exercise, a step counter smartwatch with a simple display, walking poles for stability, or a set of yard games. Gardening tools are the fastest-growing gift category for the 65+ demographic — they combine activity with purpose.",
  },
  {
    q: "What's a unique gift for grandparents?",
    a: "Unique grandparent gifts include a custom star map of their wedding date, a DNA ancestry kit, a handwriting keepsake necklace, a digital cloud photo frame that family can update remotely, or a personalized family tree print. These feel genuinely special — not just practical — and create lasting memories.",
  },
];

const itemListSchema = {
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  name: 'Gift Ideas for Grandparents',
  description: 'Hand-picked gift ideas for grandparents curated by TheGiftShuffle',
  url: 'https://thegiftshuffle.com/gift-ideas-for-grandparents',
  numberOfItems: grandparentProducts.length,
  itemListElement: grandparentProducts.map((p, i) => ({
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

export default function GiftIdeasForGrandparentsPage() {
  return (
    <div className="min-h-screen flex flex-col" style={{ background: '#FFFAF5' }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <Navbar />
      <Breadcrumbs items={[{ label: 'Gift Ideas for Grandparents', href: '/gift-ideas-for-grandparents' }]} />

      <main id="main-content" className="flex-1">
        {/* Hero */}
        <section className="max-w-5xl mx-auto px-4 pt-8 pb-6 text-center">
          <h1 className="text-4xl sm:text-5xl font-extrabold mb-4" style={{ color: '#1A202C' }}>
            Gift Ideas for Grandparents
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed mb-4">
            The best gifts for grandparents combine thoughtfulness with practicality — and 2026 trends make that easier than ever. Garden tools and accessories are the fastest-growing gift category for the 65+ demographic, with seed starter kits, kneeling pads, and long-reach planters leading the charts. Health and wellness items are close behind: smart health monitors, joint support supplements, heated throws, and cozy weighted blankets are consistently top-rated in this segment. The key is choosing trusted brands with strong reviews — grandparents specifically appreciate the reassurance of a well-reviewed, well-known product.
          </p>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
            For grandparents who love reading, LED book lights and large-print puzzle books are perennial favorites with exceptional review counts. For the tech-curious, simple devices like digital photo frames (which family members can update remotely) and voice-activated smart speakers have seen a huge spike in the 65+ gifting category. Items like seed packets, kneeling pads, and cozy home accessories top the &quot;most re-purchased&quot; lists — a clear signal they deliver real, daily value.
          </p>
        </section>

        {/* Inline Shuffle */}
        <section className="max-w-5xl mx-auto px-4 py-6">
          <InlineShuffle products={grandparentProducts} heading="Shuffle Grandparent Gift Picks" />
        </section>

        {/* Full Product Grid */}
        <section className="max-w-5xl mx-auto px-4 py-8">
          <h2 className="text-2xl font-bold mb-6" style={{ color: '#1A202C' }}>
            All Gift Ideas for Grandparents
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {grandparentProducts.map((p) => (
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
              recommendation in seconds — just pick Grandparents, set your budget, and hit Shuffle.
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
