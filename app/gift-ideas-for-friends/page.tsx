import type { Metadata } from 'next';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Breadcrumbs from '@/components/Breadcrumbs';
import { products } from '@/data/products';
import ProductCard from '@/components/ProductCard';
import InlineShuffle from '@/components/InlineShuffle';

export const metadata: Metadata = {
  title: 'Gift Ideas for Friends — Fun & Thoughtful Picks They\'ll Love | TheGiftShuffle',
  description:
    'Find the best gift ideas for friends in 2025 — fun card games, self-care sets, cocktail kits, and viral TikTok picks. Thoughtful gifts for every best friend and budget.',
  keywords: [
    'gift ideas for friends',
    'gifts for best friend',
    'friend gift ideas',
    'birthday gifts for friends',
    'unique gifts for friends',
  ],
  openGraph: {
    title: "Gift Ideas for Friends — Fun & Thoughtful Picks They'll Love | TheGiftShuffle",
    description:
      'Browse fun and thoughtful gift ideas for friends — viral picks, self-care sets, card games, and more under $30.',
    type: 'website',
    url: 'https://thegiftshuffle.com/gift-ideas-for-friends',
    images: [
      {
        url: 'https://www.thegiftshuffle.com/api/og?title=Gift%20Ideas%20for%20Friends%20%7C%20TheGiftShuffle',
        width: 1200,
        height: 630,
      },
    ],
  },
  alternates: {
    canonical: 'https://thegiftshuffle.com/gift-ideas-for-friends',
  },
};

const friendProducts = products.filter((p) => p.recipients.includes('friends')).slice(0, 24);

const faqs = [
  {
    q: "What's a good birthday gift for a best friend?",
    a: "The best birthday gifts for a best friend are personal and fun — think a custom friendship card game, a cocktail kit for a night in, a personalized jewelry piece, a cozy self-care set, or a funny engraved wine glass. The goal is to make it feel picked out for them specifically, not grabbed off a shelf. Under $40 you have a ton of great options.",
  },
  {
    q: 'What are fun gifts for a group of friends?',
    a: "For group gifting, experience-adjacent gifts win every time: a party card game (What Do You Meme, We Are Not Really Strangers), a cocktail kit, a charcuterie board set, a fondue pot, or a group cooking class gift card. These create shared memories rather than individual possessions — and friends tend to remember the experience far more than any single item.",
  },
  {
    q: 'What are unique gift ideas for a female best friend?',
    a: "Unique gifts for a female best friend include: a personalized star map of a meaningful date, a custom illustrated portrait, a viral skincare set she keeps seeing on TikTok, a friendship bracelet-making kit, or a subscription box tailored to her interests (beauty, snacks, books). Lean into inside jokes and shared memories for the most memorable gifts.",
  },
  {
    q: 'What are gifts for friends under $25?',
    a: "Great gifts for friends under $25 include: a funny quote wine glass, a bath bomb set, a scented candle, a card game, a mini succulent planter, or a self-care face mask set. The under-$25 category is dominated by consumables and shareable experiences — items that feel generous without a big price tag.",
  },
  {
    q: "What's a last-minute gift for a friend?",
    a: "For a last-minute friend gift, go with something that ships same-day or is instantly deliverable: a digital gift card to their favorite store, a well-rated skincare set, a funny novelty item, or a bestselling book. Snack gift boxes and self-care sets are especially safe bets that always feel thoughtful even when ordered at the last minute.",
  },
  {
    q: 'What gifts are trending for friends right now?',
    a: "The top trending friend gifts in 2025 are: viral TikTok-featured self-care sets, spicy card games (like Hot Ones Hot Sauce sets), cocktail kits, aesthetic journaling sets, cozy snack boxes, and personalized jewelry. The biggest shift is toward &quot;experience-adjacent&quot; gifts — items that create a shared moment or ongoing ritual between friends.",
  },
];

const itemListSchema = {
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  name: 'Gift Ideas for Friends',
  description: 'Hand-picked gift ideas for friends curated by TheGiftShuffle',
  url: 'https://thegiftshuffle.com/gift-ideas-for-friends',
  numberOfItems: friendProducts.length,
  itemListElement: friendProducts.map((p, i) => ({
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

export default function GiftIdeasForFriendsPage() {
  return (
    <div className="min-h-screen flex flex-col" style={{ background: '#FFFAF5' }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <Navbar />
      <Breadcrumbs items={[{ label: 'Gift Ideas for Friends', href: '/gift-ideas-for-friends' }]} />

      <main id="main-content" className="flex-1">
        {/* Hero */}
        <section className="max-w-5xl mx-auto px-4 pt-8 pb-6 text-center">
          <h1 className="text-4xl sm:text-5xl font-extrabold mb-4" style={{ color: '#1A202C' }}>
            Gift Ideas for Friends
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed mb-4">
            The biggest trend in friend gifting for 2025 is &quot;experience-adjacent&quot; gifts — items that create shared moments rather than just sit on a shelf. Card games (We Are Not Really Strangers, What Do You Meme), cocktail kits, snack boards, and board games are leading the category. These gifts work because they become an event: you give the cocktail kit, and suddenly you have plans for Friday night. Personalized consumables are also surging — flavored gummy bear sets, custom protein shakes, beauty essentials — things that feel curated but get used up and reordered.
          </p>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Friend gifts skew heavily toward fun, shareable, and self-care items — and gifts under $30 dominate this segment. The best approach: look for products with high social media presence and strong Amazon reviews. Viral TikTok items with 50k+ reviews are a reliable signal that the gift will land well. Whether it&apos;s a birthday, Galentine&apos;s Day, or just because, these picks are the ones friends actually want — not just what looks good wrapped.
          </p>
        </section>

        {/* Inline Shuffle */}
        <section className="max-w-5xl mx-auto px-4 py-6">
          <InlineShuffle products={friendProducts} heading="Shuffle Friend Gift Picks" />
        </section>

        {/* Full Product Grid */}
        <section className="max-w-5xl mx-auto px-4 py-8">
          <h2 className="text-2xl font-bold mb-6" style={{ color: '#1A202C' }}>
            All Gift Ideas for Friends
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {friendProducts.map((p) => (
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
              recommendation in seconds — just pick Friends, set your budget, and hit Shuffle.
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
              { href: '/gift-ideas-for-her', label: 'Gift Ideas for Her' },
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
