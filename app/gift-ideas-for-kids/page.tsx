import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import Navbar from '@/components/Navbar';
import InlineShuffle from '@/components/InlineShuffle';
import Breadcrumbs from '@/components/Breadcrumbs';
import { products } from '@/data/products';
import ProductCard from '@/components/ProductCard';

export const metadata: Metadata = {
  title: 'Gift Ideas for Kids and Grandkids: Top Picks by Age | TheGiftShuffle',
  description:
    'Find the best gift ideas for kids and grandkids at every age and budget. From toddler toys to STEM kits to outdoor gear, these are the picks kids actually want.',
  keywords: [
    'gift ideas for kids',
    'gifts for grandkids',
    'kids gift ideas',
    'best gifts for kids',
    'gift ideas for grandchildren',
    'toys for kids',
    'gifts for toddlers',
    'birthday gifts for kids',
  ],
  openGraph: {
    title: 'Gift Ideas for Kids and Grandkids | TheGiftShuffle',
    description:
      'Top-rated gift ideas for kids and grandkids at every age and budget. Hand-picked toys, games, and gear kids will love.',
    type: 'website',
    url: 'https://www.thegiftshuffle.com/gift-ideas-for-kids',
    images: [
      {
        url: 'https://www.thegiftshuffle.com/api/og?title=Gift%20Ideas%20for%20Kids%20%7C%20TheGiftShuffle',
        width: 1200,
        height: 630,
      },
    ],
  },
  alternates: {
    canonical: 'https://www.thegiftshuffle.com/gift-ideas-for-kids',
  },
};

const kidsProducts = products.filter(
  (p) => p.recipients.includes('kids') || p.recipients.includes('baby')
).slice(0, 24);

const faqs = [
  {
    q: 'What are the best gift ideas for kids under $30?',
    a: 'Kinetic sand kits, glow-in-the-dark star sets, sticker activity books, and watercolor art sets are all fantastic options under $30. These are open-ended, creative gifts that hold a kid\'s attention far longer than most screen-based toys. They\'re also easy to wrap and ship, which makes them popular choices for grandparents shopping online.',
  },
  {
    q: 'What gifts do grandkids actually want?',
    a: 'Grandkids tend to love gifts that feel special from grandparents specifically. Building sets like LEGO, RC vehicles, telescopes, and coding robots rank high across age groups. For younger kids, plush toys, shape sorters, and sensory play kits are perennial favorites. The sweet spot is something their parents might not splurge on themselves but would be thrilled to receive.',
  },
  {
    q: 'What are good educational gift ideas for kids?',
    a: 'Coding robots, beginner telescopes, STEM building sets, and watercolor art kits top the list for educational gifts that still feel fun. Kids are far more likely to engage with a gift that feels like play, so the best educational gifts hide the learning inside the activity. A coding robot that draws or dances will get used every day. A workbook will not.',
  },
  {
    q: 'What are good gifts for a 5 to 8 year old?',
    a: 'Kids aged 5 to 8 are in a golden window for hands-on gifts. Kinetic sand, magnetic building tiles, art supply sets, simple science kits, and beginner chapter book series all work well. RC cars and monster trucks are also a huge hit in this age range. Avoid gifts that require too much setup or adult supervision to get started.',
  },
  {
    q: 'What baby shower gifts are the most useful?',
    a: 'The most-used baby gifts are the practical ones: a white noise machine, a set of organic bandana bibs, a portable changing pad, and a soft plush lovey toy. New parents often receive a lot of clothing in the newborn size, so sizing up to 6 to 12 months is a thoughtful move. Baby activity gyms and shape sorters also get steady daily use once the baby hits 3 to 4 months.',
  },
  {
    q: 'What are good gifts for a baby from grandparents?',
    a: 'Grandparents often want to give something memorable and lasting. A personalized baby memory book, a high-quality white noise machine, a convertible crib, or a classic wooden toy set are all gifts that feel meaningful. Soft plush animals and loveys are sentimental favorites that tend to become the baby\'s comfort object for years.',
  },
];

const itemListSchema = {
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  name: 'Gift Ideas for Kids and Grandkids',
  description: 'Hand-picked gift ideas for kids and grandkids curated by TheGiftShuffle',
  url: 'https://www.thegiftshuffle.com/gift-ideas-for-kids',
  numberOfItems: kidsProducts.length,
  itemListElement: kidsProducts.map((p, i) => ({
    '@type': 'ListItem',
    position: i + 1,
    item: {
      '@type': 'Product',
      name: p.name,
      image: p.image.startsWith('http') ? p.image : `https://www.thegiftshuffle.com${p.image}`,
      ...(p.description ? { description: p.description } : {}),
      offers: { '@type': 'Offer', price: p.price, priceCurrency: 'USD', availability: 'https://schema.org/InStock', url: p.affiliateUrl },
      ...(p.rating > 0 && p.reviewCount > 0 ? { aggregateRating: { '@type': 'AggregateRating', ratingValue: p.rating, reviewCount: p.reviewCount } } : {}),
    },
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

export default function GiftIdeasForKidsPage() {
  return (
    <div className="min-h-screen flex flex-col" style={{ background: '#FFFAF5' }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <Navbar />
      <Breadcrumbs items={[{ label: 'Gift Ideas for Kids and Grandkids', href: '/gift-ideas-for-kids' }]} />

      <main id="main-content" className="flex-1">
        {/* Hero image */}
        <section className="max-w-5xl mx-auto px-4 pt-8">
          <div className="relative w-full rounded-2xl overflow-hidden" style={{ aspectRatio: '3/2', maxHeight: '420px' }}>
            <Image
              src="/images/heroes/gift-ideas-for-kids.jpg"
              alt="Children excitedly opening presents"
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
            Gift Ideas for Kids and Grandkids
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
            The best gift ideas for kids and grandkids are the ones they ask about again the next day.
            Whether you are shopping for a toddler, a grade-schooler, or a teen, these hand-picked
            options cover every age, budget, and interest. Grandparents, parents, aunts, and uncles
            all find picks here worth gifting.
          </p>
        </section>

        {/* Product Grid */}
        {/* Inline Shuffle */}
        <section className="max-w-5xl mx-auto px-4 py-6">
          <InlineShuffle products={kidsProducts} heading="Shuffle Kids Picks" />
        </section>

        <section className="max-w-5xl mx-auto px-4 py-8">
          <h2 className="text-2xl font-bold mb-6" style={{ color: '#1A202C' }}>
            Top Picks for Kids and Grandkids
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {kidsProducts.map((p) => (
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
              Not seeing the right fit? Use TheGiftShuffle to get a personalized pick in seconds.
              Select Kids or Baby, choose your budget, and hit Shuffle for an instant recommendation.
            </p>
            <Link
              href="/shuffle"
              className="inline-block bg-[#F04E30] text-white font-bold px-10 py-4 rounded-full hover:opacity-90 transition-opacity text-lg"
            >
              Try the Gift Shuffle
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
              { href: '/best-baby-shower-gifts-2026', label: 'Best Baby Shower Gifts 2026' },
              { href: '/birthday-gift-ideas', label: 'Birthday Gift Ideas' },
              { href: '/gifts-under-50', label: 'Gifts Under $50' },
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
