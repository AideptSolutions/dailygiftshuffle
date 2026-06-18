import type { Metadata } from 'next';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Breadcrumbs from '@/components/Breadcrumbs';
import { products } from '@/data/products';
import ProductCard from '@/components/ProductCard';
import InlineShuffle from '@/components/InlineShuffle';

export const metadata: Metadata = {
  title: "Gift Ideas for Teens — Trending Gifts They'll Actually Want | TheGiftShuffle",
  description:
    'Discover the best gift ideas for teens in 2026 — from wireless earbuds and LED gaming lights to skincare gift sets and streetwear. Find trending teen gifts they actually want.',
  keywords: [
    'gift ideas for teens',
    'gifts for teenagers',
    'teen gift ideas',
    'gifts for teen boys',
    'gifts for teen girls',
    'cool gifts for teens',
  ],
  openGraph: {
    title: "Gift Ideas for Teens — Trending Gifts They'll Actually Want | TheGiftShuffle",
    description:
      'Browse hand-picked gift ideas for teens — trending tech, gaming gear, skincare, and more.',
    type: 'website',
    url: 'https://thegiftshuffle.com/gift-ideas-for-teens',
    images: [
      { url: 'https://www.thegiftshuffle.com/api/og?title=Gift%20Ideas%20for%20Teens%20%7C%20TheGiftShuffle', width: 1200, height: 630 },
    ],
  },
  alternates: {
    canonical: 'https://thegiftshuffle.com/gift-ideas-for-teens',
  },
};

const teenProducts = products.filter((p) => p.recipients.includes('teens')).slice(0, 24);

const faqs = [
  {
    q: 'What are the best gifts for teen boys?',
    a: "The best gifts for teen boys in 2026 include gaming peripherals (mechanical keyboards, controllers), wireless earbuds, LED gaming lights, portable Bluetooth speakers, and tech accessories. Look for products with 4.5+ stars and strong social proof — teens do their research. PopSockets, JBL earbuds, and gaming gear consistently top the lists.",
  },
  {
    q: 'What do teenage girls want as gifts?',
    a: "Teenage girls are gravitating toward skincare and self-care gift sets, ring lights for content creation, aesthetic room decor (LED strips, neon signs), fashion accessories, and personalized jewelry. Items that film well for social media — like unboxing-worthy skincare sets or Polaroid cameras — are especially popular right now.",
  },
  {
    q: 'What are trending gifts for teens right now?',
    a: "Trending teen gifts in 2026 include: true wireless earbuds (AirPods, JBL), LED room lighting kits, ring lights for content creators, gaming accessories, mini Polaroid cameras, skincare starter sets (CeraVe, The Ordinary), and aesthetic journaling kits. Social media virality is the #1 purchase signal — if it trends on TikTok, teens want it.",
  },
  {
    q: 'What are good gifts for teens under $50?',
    a: "Under $50 you can find excellent teen gifts: wireless earbuds, LED strip lights, a Polaroid mini camera, a journaling starter kit, or a PopSocket set. These are the sweet spot — not too cheap to seem thoughtless, but accessible enough to not overthink.",
  },
  {
    q: "What's a good gift for a 16-year-old?",
    a: "For a 16-year-old, consider wireless earbuds, a portable Bluetooth speaker, an aesthetic room LED light kit, a skincare gift set (great for girls), or a gaming accessory like a controller charging dock. At 16, teens are highly aware of brand and social status — stick to items with strong reviews and recognizable names.",
  },
  {
    q: "What's a last-minute gift idea for a teen?",
    a: "For a last-minute teen gift, choose something available for same-day or next-day delivery: a PopSocket set, a skincare mini set, a cute phone case bundle, wireless earbuds, or a gift card to their favorite brand (Amazon, Sephora, Roblox). Teens are surprisingly happy with practical, high-rated everyday items.",
  },
];

const itemListSchema = {
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  name: 'Gift Ideas for Teens',
  description: 'Hand-picked gift ideas for teens curated by TheGiftShuffle',
  url: 'https://thegiftshuffle.com/gift-ideas-for-teens',
  numberOfItems: teenProducts.length,
  itemListElement: teenProducts.map((p, i) => ({
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

export default function GiftIdeasForTeensPage() {
  return (
    <div className="min-h-screen flex flex-col" style={{ background: '#FFFAF5' }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <Navbar />
      <Breadcrumbs items={[{ label: 'Gift Ideas for Teens', href: '/gift-ideas-for-teens' }]} />

      <main id="main-content" className="flex-1">
        {/* Hero */}
        <section className="max-w-5xl mx-auto px-4 pt-8 pb-6 text-center">
          <h1 className="text-4xl sm:text-5xl font-extrabold mb-4" style={{ color: '#1A202C' }}>
            Gift Ideas for Teens
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed mb-4">
            Shopping for teens in 2026 means keeping up with what&apos;s actually trending — not just what looks good in a store. The top gift categories right now are tech accessories (wireless earbuds, LED gaming lights, ring lights for aspiring content creators), fashion and streetwear, gaming peripherals, skincare and self-care sets for teen girls, and fitness gear. Reviews and social media virality are the #1 purchase signal for teens — they already know what they want, and it usually has 10k+ five-star reviews to back it up.
          </p>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
            The best-performing teen gifts are the ones teens would brag about receiving. Products like PopSockets, JBL earbuds, skincare gift sets from CeraVe or The Ordinary, and aesthetic room LED kits consistently dominate the category with 4.5+ stars and tens of thousands of reviews. Whether you&apos;re shopping for a birthday, the holidays, or graduation, these picks are hand-curated to match what teens are actually asking for right now.
          </p>
        </section>

        {/* Inline Shuffle */}
        <section className="max-w-5xl mx-auto px-4 py-6">
          <InlineShuffle products={teenProducts} heading="Shuffle Teen Gift Picks" />
        </section>

        {/* Full Product Grid */}
        <section className="max-w-5xl mx-auto px-4 py-8">
          <h2 className="text-2xl font-bold mb-6" style={{ color: '#1A202C' }}>
            All Gift Ideas for Teens
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {teenProducts.map((p) => (
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
              recommendation in seconds — just pick Teens, set your budget, and hit Shuffle.
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
              { href: '/gift-ideas-for-kids', label: 'Gifts for Kids' },
              { href: '/gift-ideas-for-him', label: 'Gift Ideas for Him' },
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
