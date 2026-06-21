import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import Navbar from '@/components/Navbar';
import Breadcrumbs from '@/components/Breadcrumbs';
import { products } from '@/data/products';
import ProductCard from '@/components/ProductCard';
import InlineShuffle from '@/components/InlineShuffle';

export const metadata: Metadata = {
  title: 'Gifts for Coworkers: Best Office Gift Ideas 2026 | TheGiftShuffle',
  description:
    'Find the best gifts for coworkers in 2026. Funny mugs, desk organizers, wireless chargers, snack sets, and thoughtful office gifts for colleagues at every budget.',
  keywords: [
    'gifts for coworkers',
    'coworker gift ideas',
    'office gift ideas 2026',
    'good gifts for coworkers',
    'funny coworker gifts',
    'best gifts for coworkers under 50',
  ],
  openGraph: {
    title: 'Gifts for Coworkers: Best Office Gift Ideas 2026 | TheGiftShuffle',
    description:
      'Best coworker gifts for 2026: funny mugs, desk gadgets, snack boxes, and thoughtful picks that work for any office dynamic.',
    type: 'website',
    url: 'https://thegiftshuffle.com/gifts-for-coworkers',
  },
  alternates: {
    canonical: 'https://thegiftshuffle.com/gifts-for-coworkers',
  },
};

const coworkerProducts = products
  .filter((p) => p.recipients.includes('coworker') || p.recipients.includes('employees'))
  .sort((a, b) => b.rating - a.rating || b.reviewCount - a.reviewCount);

// Fallback: add office-tagged products if thin
const officeSupplements = products
  .filter(
    (p) =>
      p.tags?.includes('office') &&
      !p.recipients.includes('coworker') &&
      !p.recipients.includes('employees')
  )
  .sort((a, b) => b.rating - a.rating || b.reviewCount - a.reviewCount)
  .slice(0, 8);

const displayProducts =
  coworkerProducts.length >= 12
    ? coworkerProducts
    : [...coworkerProducts, ...officeSupplements];

const faqs = [
  {
    q: 'What are the best gifts for coworkers?',
    a: "The best gifts for coworkers are practical, universally appreciated, and appropriately priced for the relationship: a funny but tasteful office mug, a desk organizer, a wireless charging pad, gourmet snacks or a popcorn gift tower, and premium desk accessories like a succulent planter or sticky note set. The key is choosing something useful or enjoyable at work, not something too personal.",
  },
  {
    q: 'What is an appropriate gift amount for a coworker?',
    a: "For a casual coworker, $15-$30 is standard. For a close work friend or someone you interact with daily, $25-$50 is appropriate. For group gifts from a team, pool to $50-$100 for a better experience. The most important thing is not to over-gift in a way that creates an awkward dynamic. Practical desk items, snacks, or a funny personalized mug hit the right note at any price.",
  },
  {
    q: 'What are good farewell or leaving gifts for a coworker?',
    a: "Farewell gifts for a coworker who is leaving should reflect the relationship and where they're going: a personalized tumbler or mug (practical, daily-use), a quality notebook and pen set for their next chapter, a gift card to a restaurant near their new office or home, or a funny 'You're Fired' or 'New Adventures' themed item if the relationship allows humor. A group card signed by the whole team plus a modest gift is often more meaningful than a single large item.",
  },
  {
    q: 'What are the best Secret Santa gifts for a coworker?',
    a: "For Secret Santa, keep it universally appropriate and under $25: a funny office mug with a witty quote, a desk succulent planter, a scented hand lotion travel set, a gourmet snack box, a sticky note and pen gift set, or a fidget cube for stress relief. Avoid anything too personal (perfume, clothing), too niche (hobby-specific items you're not sure about), or anything that could be interpreted as inappropriate in a workplace context.",
  },
  {
    q: "What are good White Elephant or office party gifts?",
    a: "The best White Elephant gifts ($15-$25 range) for office parties are funny but usable: a 'World's Okayest Coworker' mug, a magnetic fidget cube, a desk succulent, a gourmet popcorn tin, a hilarious sticky note set, or a set of novelty socks. These are gifts that get laughs during the reveal and then actually get used, which is the dual goal of a good White Elephant pick.",
  },
];

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map((f) => ({
    '@type': 'Question',
    name: f.q,
    acceptedAnswer: { '@type': 'Answer', text: f.a },
  })),
};

const itemListSchema = {
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  name: 'Best Gifts for Coworkers 2026',
  description: 'Hand-picked coworker gift ideas for 2026, curated by TheGiftShuffle',
  url: 'https://thegiftshuffle.com/gifts-for-coworkers',
  numberOfItems: displayProducts.length,
  itemListElement: displayProducts.map((p, i) => ({
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

export default function GiftsForCoworkersPage() {
  return (
    <div className="min-h-screen flex flex-col" style={{ background: '#FFFAF5' }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <Navbar />
      <Breadcrumbs items={[{ label: 'Gifts for Coworkers', href: '/gifts-for-coworkers' }]} />

      <main id="main-content" className="flex-1">
        {/* Hero image */}
        <section className="max-w-5xl mx-auto px-4 pt-8">
          <div className="relative w-full rounded-2xl overflow-hidden" style={{ aspectRatio: '3/2', maxHeight: '420px' }}>
            <Image
              src="/images/heroes/gifts-for-coworkers.jpg"
              alt="Coworkers exchanging gifts in the office"
              fill
              className="object-cover"
              priority
              unoptimized
            />
          </div>
        </section>
        {/* Answer-first hero for AEO */}
        <section className="max-w-5xl mx-auto px-4 pt-8 pb-6 text-center">
          <h1 className="text-4xl sm:text-5xl font-extrabold mb-4" style={{ color: '#1A202C' }}>
            Gifts for Coworkers
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed mb-4">
            <strong>The best coworker gifts are practical, work-appropriate, and priced to match the relationship.</strong>{' '}
            A funny office mug, a desk succulent planter, a wireless charging pad, or a gourmet snack set. These
            are universally appreciated without being too personal or too expensive.
          </p>
          <p className="text-base text-gray-500 max-w-2xl mx-auto leading-relaxed">
            The rule of thumb: if you would be comfortable giving it to anyone in the office without it feeling
            weird, it&apos;s a good coworker gift. The picks below all clear that bar.
          </p>
        </section>

        {/* Product Grid */}
        <section className="max-w-5xl mx-auto px-4 py-8">
          <h2 className="text-2xl font-bold mb-2" style={{ color: '#1A202C' }}>
            Best Gifts for Coworkers 2026
          </h2>
          <p className="text-sm text-gray-500 mb-6">Sorted by customer rating.</p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {displayProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>

        {/* Inline Shuffle */}
        <section className="max-w-5xl mx-auto px-4 py-6">
          <InlineShuffle products={displayProducts} heading="Shuffle Coworker Gift Picks" />
        </section>

        {/* Budget breakdown section */}
        <section className="max-w-3xl mx-auto px-4 py-8 border-t border-gray-100">
          <h2 className="text-2xl font-bold mb-5" style={{ color: '#1A202C' }}>
            Coworker Gifts by Budget
          </h2>
          <div className="space-y-6">
            <div>
              <h3 className="font-bold text-lg mb-1" style={{ color: '#1A202C' }}>Under $20: Casual Coworker</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                A funny office mug ($17), a sticky note and pen gift set ($15), fidget cube ($9), magnetic
                bookmarks ($8), or a mini desk whiteboard set ($9). Perfect for Secret Santa draws or a low-key
                birthday acknowledgment.
              </p>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-1" style={{ color: '#1A202C' }}>$20–$50: Close Work Friend</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                A bamboo desk organizer with drawer ($33), a wireless charging pad ($40), a noise-reducing
                ear plugs case for open offices ($28), or an insulated 20oz personalized tumbler ($30).
                These are everyday-use gifts that improve their work experience.
              </p>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-1" style={{ color: '#1A202C' }}>$50–$100: Whole-Team or Farewell Gift</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                A gourmet popcorn tower ($50) or premium spa gift box ($55) works for the whole team to share.
                For a farewell gift: an Ember temperature-control mug ($150 if budget allows, or an insulated
                smart mug in the $50 range). A restaurant gift card is always welcome and always used.
              </p>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="bg-white py-12 px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl font-bold mb-4" style={{ color: '#1A202C' }}>
              Get a Personalized Gift Recommendation
            </h2>
            <p className="text-gray-600 mb-6">
              Use TheGiftShuffle. Pick the recipient, set your budget, and get an instant curated gift suggestion.
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
              { href: '/gifts-for-boss', label: 'Gifts for Boss' },
              { href: '/gifts-under-25', label: 'Gifts Under $25' },
              { href: '/gifts-under-50', label: 'Gifts Under $50' },
              { href: '/gift-ideas-for-him', label: 'Gift Ideas for Him' },
              { href: '/gift-ideas-for-her', label: 'Gift Ideas for Her' },
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
