import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import Navbar from '@/components/Navbar';
import Breadcrumbs from '@/components/Breadcrumbs';
import { products } from '@/data/products';
import ProductCard from '@/components/ProductCard';
import InlineShuffle from '@/components/InlineShuffle';

export const metadata: Metadata = {
  title: 'Gifts for Boss: Best Boss Gift Ideas 2026 | TheGiftShuffle',
  description:
    'Find the best gifts for your boss in 2026. Premium desk accessories, insulated mugs, luxury gift sets, and professional picks that hit the right professional note, not too personal, not too cheap.',
  keywords: [
    'gifts for boss',
    'boss gift ideas 2026',
    'good gifts for your boss',
    'professional gifts for boss',
    'what to get your boss for a gift',
    'boss appreciation gifts',
  ],
  openGraph: {
    title: 'Gifts for Boss: Best Boss Gift Ideas 2026 | TheGiftShuffle',
    description:
      'The best boss gifts for 2026: premium desk accessories, insulated mugs, luxury sets, and professional picks.',
    type: 'website',
    url: 'https://thegiftshuffle.com/gifts-for-boss',
  },
  alternates: {
    canonical: 'https://thegiftshuffle.com/gifts-for-boss',
  },
};

// Boss gifts: premium coworker/employee items + quality office/tech items
const bossProducts = products
  .filter(
    (p) =>
      (p.recipients.includes('coworker') || p.recipients.includes('employees')) &&
      p.price >= 25
  )
  .sort((a, b) => b.rating - a.rating || b.reviewCount - a.reviewCount);

// Supplement with premium practical products that work for professional gifting
const premiumOfficeProducts = products
  .filter(
    (p) =>
      p.tags?.includes('office') &&
      !p.recipients.includes('coworker') &&
      !p.recipients.includes('employees') &&
      p.price >= 25 &&
      p.price <= 150
  )
  .sort((a, b) => b.rating - a.rating || b.reviewCount - a.reviewCount)
  .slice(0, 10);

const displayProducts =
  bossProducts.length >= 10
    ? bossProducts
    : [...bossProducts, ...premiumOfficeProducts];

const faqs = [
  {
    q: 'What is a good gift for your boss?',
    a: "A good gift for your boss is professional, practical, and not too personal. The best boss gifts are: a temperature-control mug (Ember, around $150 or a quality alternative at $50), a premium desk organizer, an insulated tumbler with a clean design, a quality notebook and pen set for meetings, or a gourmet snack gift box. The goal is something they will actually use at work, not something that creates an awkward personal dynamic.",
  },
  {
    q: 'How much should you spend on a gift for your boss?',
    a: "The standard range for a boss gift is $25-$75 when giving individually, or up to $100-$150 when pooling with colleagues. Spending significantly more than coworkers risks looking like you're trying to gain favor; spending significantly less can come across as dismissive of the relationship. $35-$60 is the most common and appropriate sweet spot for most professional contexts.",
  },
  {
    q: "What are professional gifts for a boss that aren't awkward?",
    a: "Professional boss gifts that avoid awkwardness: a quality insulated tumbler or smart mug (universally useful), a bamboo desk organizer (practical and tasteful), a premium popcorn or snack gift set (consumable, shared), a recognition award plaque for a departing boss, or a subscription to a productivity app or audiobook service. Avoid alcohol (unless you know them very well), overly personal items (perfume, clothing), and anything that could be interpreted as commentary on their habits or appearance.",
  },
  {
    q: "What are good boss appreciation day gifts?",
    a: "For Boss Appreciation Day (October 16), the best gifts are: a team gift card from the whole group to a restaurant or experience, a personalized desk nameplate or award plaque, a gourmet snack tower the team can share in the office, or a quality insulated tumbler with a subtle personalization. The ideal boss appreciation gift acknowledges their leadership without being overly flattering or creating hierarchy within the team.",
  },
  {
    q: "What do you get a boss who has everything?",
    a: "For a boss who seems to have everything, lean toward consumable luxuries or experiences: a curated gourmet snack or tea gift set that gets used and enjoyed, a gift card to a restaurant they frequent or have mentioned, a high-quality notebook refill for a system they already use, or a team contribution to an experience (cooking class, wine tasting, spa afternoon). Experiences create memories without adding clutter to a full desk or home.",
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
  name: 'Best Gifts for Boss 2026',
  description: 'Hand-picked boss gift ideas for 2026, curated by TheGiftShuffle',
  url: 'https://thegiftshuffle.com/gifts-for-boss',
  numberOfItems: displayProducts.length,
  itemListElement: displayProducts.map((p, i) => ({
    '@type': 'ListItem',
    position: i + 1,
    name: p.name,
    description: p.description,
    url: p.affiliateUrl,
  })),
};

export default function GiftsForBossPage() {
  return (
    <div className="min-h-screen flex flex-col" style={{ background: '#FFFAF5' }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <Navbar />
      <Breadcrumbs items={[{ label: 'Gifts for Boss', href: '/gifts-for-boss' }]} />

      <main id="main-content" className="flex-1">
        {/* Hero image */}
        <section className="max-w-5xl mx-auto px-4 pt-8">
          <div className="relative w-full rounded-2xl overflow-hidden" style={{ aspectRatio: '3/2', maxHeight: '420px' }}>
            <Image
              src="/images/heroes/gifts-for-boss.jpg"
              alt="A professional gift for a boss on an office desk"
              fill
              className="object-cover"
              priority
              unoptimized
            />
          </div>
        </section>
        {/* Answer-first hero */}
        <section className="max-w-5xl mx-auto px-4 pt-8 pb-6 text-center">
          <h1 className="text-4xl sm:text-5xl font-extrabold mb-4" style={{ color: '#1A202C' }}>
            Gifts for Your Boss
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed mb-4">
            <strong>The best boss gifts are professional, practical, and appropriately priced.</strong>{' '}
            A quality insulated tumbler, a premium desk organizer, a gourmet snack gift set. These say &ldquo;I appreciate
            your leadership&rdquo; without overstepping. The sweet spot is $35-$75, whether you&apos;re giving alone or
            contributing to a team gift.
          </p>
          <p className="text-base text-gray-500 max-w-2xl mx-auto leading-relaxed">
            Avoid: anything too personal, anything that implies they need improvement, and anything so expensive
            it makes the dynamic awkward. The best boss gift is something they use every day and remember
            positively every time they do.
          </p>
        </section>

        {/* Product Grid */}
        <section className="max-w-5xl mx-auto px-4 py-8">
          <h2 className="text-2xl font-bold mb-2" style={{ color: '#1A202C' }}>
            Best Boss Gift Ideas 2026
          </h2>
          <p className="text-sm text-gray-500 mb-6">Sorted by customer rating. Professional picks at every budget.</p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {displayProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>

        {/* Inline Shuffle */}
        <section className="max-w-5xl mx-auto px-4 py-6">
          <InlineShuffle products={displayProducts} heading="Shuffle Boss Gift Picks" />
        </section>

        {/* Guidance section */}
        <section className="max-w-3xl mx-auto px-4 py-8 border-t border-gray-100">
          <h2 className="text-2xl font-bold mb-5" style={{ color: '#1A202C' }}>
            How to Choose the Right Gift for Your Boss
          </h2>
          <div className="space-y-4 text-gray-700 leading-relaxed">
            <p>
              The professional relationship changes the calculus on gifting. Unlike a coworker or friend, there&apos;s
              an inherent power dynamic with a boss, which means the goal of the gift is different. You&apos;re not
              trying to be memorable or impressive. You&apos;re trying to be thoughtful and appropriate.
            </p>
            <p>
              The safest boss gifts are ones with universal utility: a temperature-control mug they can use in
              every meeting, a quality insulated tumbler for the commute, a premium desk accessory that organizes
              their workspace, or a gourmet snack set that gets consumed and enjoyed without creating any
              long-term obligation.
            </p>
            <p>
              For a departing boss or a formal recognition moment, a personalized award plaque or engraved
              item is genuinely appreciated. These are the gifts bosses actually display. A team gift card
              from the whole group to a restaurant or spa experience is another strong option because it
              removes the individual dynamic entirely and lets them enjoy something they want.
            </p>
          </div>
        </section>

        {/* CTA */}
        <section className="bg-white py-12 px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl font-bold mb-4" style={{ color: '#1A202C' }}>
              Get a Personalized Gift Recommendation
            </h2>
            <p className="text-gray-600 mb-6">
              Use TheGiftShuffle. Pick the recipient type, set your budget, and get an instant curated
              gift recommendation in seconds.
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
              { href: '/gifts-for-coworkers', label: 'Gifts for Coworkers' },
              { href: '/gift-ideas-for-him', label: 'Gift Ideas for Him' },
              { href: '/gift-ideas-for-her', label: 'Gift Ideas for Her' },
              { href: '/gifts-under-50', label: 'Gifts Under $50' },
              { href: '/gifts-under-100', label: 'Gifts Under $100' },
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
