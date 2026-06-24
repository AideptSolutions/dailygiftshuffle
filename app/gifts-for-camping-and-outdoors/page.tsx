import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import Navbar from '@/components/Navbar';
import InlineShuffle from '@/components/InlineShuffle';
import Breadcrumbs from '@/components/Breadcrumbs';
import { products } from '@/data/products';
import ProductCard from '@/components/ProductCard';

export const metadata: Metadata = {
  title: 'Gifts for Camping and the Outdoors: Top Picks for Every Adventurer | TheGiftShuffle',
  description:
    'Find the best gifts for campers, hikers, and outdoor lovers. Hand-picked gear from trusted brands at every budget, from starter kits to serious upgrades.',
  keywords: [
    'gifts for camping',
    'outdoor gift ideas',
    'camping gifts',
    'gifts for hikers',
    'best camping gear gifts',
    'gifts for outdoor lovers',
    'hiking gift ideas',
    'camping gift ideas for him',
    'camping gift ideas for her',
  ],
  openGraph: {
    title: 'Gifts for Camping and the Outdoors | TheGiftShuffle',
    description:
      'Top-rated camping and outdoor gift ideas at every budget. Hand-picked picks for hikers, campers, and everyone who prefers trees over Wi-Fi.',
    type: 'website',
    url: 'https://www.thegiftshuffle.com/gifts-for-camping-and-outdoors',
    images: [
      {
        url: 'https://www.thegiftshuffle.com/api/og?title=Gifts%20for%20Camping%20and%20Outdoors%20%7C%20TheGiftShuffle',
        width: 1200,
        height: 630,
      },
    ],
  },
  alternates: {
    canonical: 'https://www.thegiftshuffle.com/gifts-for-camping-and-outdoors',
  },
};

const outdoorsProducts = products.filter(
  (p) => p.tags?.includes('outdoors') || p.tags?.includes('sports')
).slice(0, 24);

const faqs = [
  {
    q: 'What are the best gifts for camping under $50?',
    a: 'A LifeStraw water filter, stormproof matches, a quality headlamp, or a camping hammock are all standout camping gifts under $50. These are functional, compact, and exactly the kind of gear every camper uses on every trip. They also make excellent add-ons when paired with a larger gift.',
  },
  {
    q: 'What do experienced campers actually want as gifts?',
    a: 'Experienced campers tend to want gear they have been eyeing but have not bought for themselves. A GPS navigator that works off-grid, a YETI cooler, a solar-charging power bank, or a premium merino wool base layer are the kinds of gifts they get genuinely excited about. Avoid beginner kits and focus on quality upgrades from trusted brands.',
  },
  {
    q: 'What are good gifts for hikers and backpackers?',
    a: 'Backpackers obsess over weight and reliability. A lightweight sleeping pad, a compact daypack from Osprey, a rugged headlamp, or a solar panel charger are practical gifts that directly improve their experience on trail. The goal is either to lighten their pack or make their camp life more comfortable.',
  },
  {
    q: 'What outdoor gifts work for someone who does not camp but loves being outside?',
    a: 'A portable hammock, a waterproof power bank, a quality daypack, or a pair of merino wool layers work just as well at a music festival, beach trip, or day hike as they do at a campsite. The best outdoor gifts travel well and integrate into everyday life, not just dedicated camping trips.',
  },
  {
    q: 'What camping gifts are good for beginners?',
    a: 'First-time campers need the basics done well: a reliable headlamp, a two-burner camp stove, a sleeping pad, and fire-starting tools. A beginner bundle covering these areas is far more useful than one expensive specialized item. Prioritize safety, warmth, and lighting for anyone spending their first nights outdoors.',
  },
  {
    q: 'What are good outdoor gifts for teens and kids?',
    a: 'Teens and older kids respond well to gear that gives them independence: their own headlamp, a personal water filter, a hammock they can set up themselves, or a compact solar charger. These feel like real outdoor tools rather than toys, which matters a lot at that age. Keep the focus on adventure and exploration.',
  },
];

const itemListSchema = {
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  name: 'Gifts for Camping and the Outdoors',
  description: 'Hand-picked camping and outdoor gift ideas curated by TheGiftShuffle',
  url: 'https://www.thegiftshuffle.com/gifts-for-camping-and-outdoors',
  numberOfItems: outdoorsProducts.length,
  itemListElement: outdoorsProducts.map((p, i) => ({
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

export default function GiftsForOutdoorsPage() {
  return (
    <div className="min-h-screen flex flex-col" style={{ background: '#FFFAF5' }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <Navbar />
      <Breadcrumbs items={[{ label: 'Gifts for Camping and the Outdoors', href: '/gifts-for-camping-and-outdoors' }]} />

      <main id="main-content" className="flex-1">
        {/* Hero image */}
        <section className="max-w-5xl mx-auto px-4 pt-8">
          <div className="relative w-full rounded-2xl overflow-hidden" style={{ aspectRatio: '3/2', maxHeight: '420px' }}>
            <Image
              src="/images/heroes/gifts-for-camping-and-outdoors.jpg"
              alt="Outdoor and camping gear arranged as a gift"
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
            Gifts for Camping and the Outdoors
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
            The best gifts for outdoor people are the ones they reach for on every trip.
            Whether you are shopping for a weekend car camper, a serious backpacker, or someone
            who just loves spending time outside, these hand-picked picks cover every budget and
            every type of adventure.
          </p>
        </section>

        {/* Product Grid */}
        {/* Inline Shuffle */}
        <section className="max-w-5xl mx-auto px-4 py-6">
          <InlineShuffle products={outdoorsProducts} heading="Shuffle Outdoor Picks" />
        </section>

        <section className="max-w-5xl mx-auto px-4 py-8">
          <h2 className="text-2xl font-bold mb-6" style={{ color: '#1A202C' }}>
            Top Picks for Campers and Outdoor Lovers
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {outdoorsProducts.map((p) => (
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
              Not finding the right fit? Hit Shuffle to get a personalized outdoor gear
              recommendation based on who you are shopping for and your budget.
            </p>
            <Link
              href="/shuffle/outdoors"
              className="inline-block bg-[#F04E30] text-white font-bold px-10 py-4 rounded-full hover:opacity-90 transition-opacity text-lg"
            >
              Shuffle Outdoor Gifts
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
              { href: '/gift-ideas-for-dad', label: 'Gift Ideas for Dad' },
              { href: '/gift-ideas-for-kids', label: 'Gifts for Kids and Grandkids' },
              { href: '/birthday-gift-ideas', label: 'Birthday Gift Ideas' },
              { href: '/gifts-under-50', label: 'Gifts Under $50' },
              { href: '/category/outdoors', label: 'Browse All Outdoor Gifts' },
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
