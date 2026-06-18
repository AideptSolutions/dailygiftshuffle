import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import Navbar from '@/components/Navbar';
import Breadcrumbs from '@/components/Breadcrumbs';
import Footer from '@/components/Footer';
import InlineShuffle from '@/components/InlineShuffle';
import ProductCard from '@/components/ProductCard';
import { products } from '@/data/products-catalog';
import CategoryIcon from '@/components/CategoryIcon';

export const metadata: Metadata = {
  title: 'Best Graduation Gifts 2026: Thoughtful Picks for Grads | TheGiftShuffle',
  description:
    'Find the best graduation gifts for 2026. From high school to college grads, shop practical picks for dorms, first apartments, and new beginnings, every budget covered.',
  openGraph: {
    title: 'Best Graduation Gifts 2026: Thoughtful Picks for Grads | TheGiftShuffle',
    description:
      'Find the best graduation gifts for 2026. From high school to college grads, shop practical picks for dorms, first apartments, and new beginnings, every budget covered.',
    url: 'https://thegiftshuffle.com/graduation-gifts',
    images: [
      {
        url: 'https://www.thegiftshuffle.com/api/og?title=Best+Graduation+Gifts+2026',
        width: 1200,
        height: 630,
      },
    ],
  },
  alternates: {
    canonical: 'https://thegiftshuffle.com/graduation-gifts',
  },
};

const gradProducts = products.filter(
  (p) => p.occasions && p.occasions.includes('graduation')
);

// Price tier splits
const under50 = gradProducts.filter((p) => p.price < 50);
const between50and100 = gradProducts.filter((p) => p.price >= 50 && p.price <= 100);
const over100 = gradProducts.filter((p) => p.price > 100);

const faqs = [
  {
    q: 'What are the best graduation gifts for high school graduates?',
    a: 'High school grads heading to college appreciate practical gifts for dorm life: a quality bedding set, noise-cancelling earbuds, a portable charger, a mini fridge, and a good backpack. Gift cards to Amazon or Target also land well because they know exactly what they need for their specific dorm.',
  },
  {
    q: 'What are the best graduation gifts for college graduates?',
    a: 'College grads entering the workforce appreciate gifts that help with the transition: a quality blazer, a professional bag or tote, a planner or productivity journal, a good coffee maker for their first apartment, and personal finance books like "I Will Teach You to Be Rich." These are things they need but have not yet bought for themselves.',
  },
  {
    q: 'What is the right amount to spend on a graduation gift?',
    a: 'For a close family member: $50-$150 is a reasonable range. For a friend: $25-$75 is common. Group gifts from multiple people can pool at any amount. The most appreciated gifts are not always the most expensive. A thoughtful $40 gift that solves a specific problem the grad has is worth more than a generic $100 gift card.',
  },
  {
    q: 'What are good graduation gift ideas that are not cash?',
    a: 'Beyond cash, the best non-cash graduation gifts are practical for the next chapter: luggage for travel, a quality kitchen knife set for a first apartment, a ring light and webcam setup for remote interviews, a professional portfolio or padfolio, or a meaningful book that matches where they are headed. Experiences like a cooking class or a concert also make strong memories.',
  },
];

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map(({ q, a }) => ({
    '@type': 'Question',
    name: q,
    acceptedAnswer: { '@type': 'Answer', text: a },
  })),
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://thegiftshuffle.com' },
    { '@type': 'ListItem', position: 2, name: 'Graduation Gifts', item: 'https://thegiftshuffle.com/graduation-gifts' },
  ],
};

const itemListSchema = {
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  name: 'Best Graduation Gifts 2026',
  description: 'Hand-picked graduation gift ideas for the class of 2026, curated by TheGiftShuffle',
  url: 'https://thegiftshuffle.com/graduation-gifts',
  numberOfItems: gradProducts.length,
  itemListElement: gradProducts.map((p, i) => ({
    '@type': 'ListItem',
    position: i + 1,
    name: p.name,
    description: p.description,
    url: p.affiliateUrl,
  })),
};

export default function GraduationGiftsPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <Breadcrumbs items={[{ label: 'Graduation Gifts', href: '/graduation-gifts' }]} />

      {/* Hero image */}
      <section className="max-w-5xl mx-auto px-4 pt-8">
        <div className="relative w-full rounded-2xl overflow-hidden" style={{ aspectRatio: '3/2', maxHeight: '420px' }}>
          <Image
            src="/images/heroes/graduation-gifts.jpg"
            alt="A graduation gift with cap and diploma"
            fill
            className="object-cover"
            priority
            unoptimized
          />
        </div>
      </section>

      {/* Hero */}
      <section
        className="text-center py-14 px-4"
        style={{ background: 'linear-gradient(135deg, #FFFAF5 0%, #fff9e6 100%)' }}
      >
        <div className="mb-4 flex justify-center"><CategoryIcon slug="graduation" className="w-14 h-14 text-coral" aria-hidden="true" /></div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-gray-900 mb-4 max-w-3xl mx-auto">
          The Best Graduation Gifts for 2026
        </h1>
        <p className="text-gray-600 text-lg max-w-xl mx-auto mb-2">
          Congratulations to the Class of 2026. Whether they are heading to college, entering the workforce, or moving into their first apartment, there is something here for every grad and every budget.
        </p>
        <p className="text-gray-500 text-base max-w-xl mx-auto mb-6">
          Practical picks that help them launch, not just another gift card.
        </p>
        <Link
          href="/shuffle"
          className="btn-shuffle text-white font-bold px-8 py-3 rounded-full inline-block text-sm"
        >
          Find a Gift by Shuffle
        </Link>
      </section>

      <main id="main-content" tabIndex={-1} className="flex-1">

        {/* Shuffle section */}
        <section className="max-w-5xl mx-auto px-4 py-10">
          <InlineShuffle
            products={gradProducts.length > 0 ? gradProducts : products.slice(0, 20)}
            heading="Shuffle Graduation Gift Picks"
          />
        </section>

        {/* Price Tier: Under $50 */}
        {under50.length > 0 && (
          <section className="max-w-5xl mx-auto px-4 py-8 border-t border-gray-100">
            <h2 className="text-2xl font-extrabold text-gray-900 mb-2">
              Graduation Gifts Under $50
            </h2>
            <p className="text-gray-500 text-sm mb-5">
              Thoughtful picks that won&apos;t break the bank. Great for friends or group contributions.
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {under50.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </section>
        )}

        {/* Price Tier: $50–$100 */}
        {between50and100.length > 0 && (
          <section className="max-w-5xl mx-auto px-4 py-8 border-t border-gray-100">
            <h2 className="text-2xl font-extrabold text-gray-900 mb-2">
              Graduation Gifts $50–$100
            </h2>
            <p className="text-gray-500 text-sm mb-5">
              The sweet spot for close family and friends. Practical upgrades for the next chapter.
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {between50and100.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </section>
        )}

        {/* Price Tier: $100+ */}
        {over100.length > 0 && (
          <section className="max-w-5xl mx-auto px-4 py-8 border-t border-gray-100">
            <h2 className="text-2xl font-extrabold text-gray-900 mb-2">
              Graduation Gifts $100+
            </h2>
            <p className="text-gray-500 text-sm mb-5">
              For the grad who deserves something genuinely memorable. Perfect for parents or group gifts.
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {over100.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </section>
        )}

        {/* Editorial */}
        <section className="max-w-3xl mx-auto px-4 py-8 border-t border-gray-100">
          <h2 className="text-2xl font-extrabold text-gray-900 mb-6">
            What Grads Actually Want in 2026
          </h2>
          <div className="space-y-4 text-gray-700 leading-relaxed text-base">
            <p>
              High school and college graduation gifting split into two different problems. For the high school grad heading to a dorm, the category is practical setup: bedding, organizers, a good backpack, earbuds, and a power strip with USB ports. These are things every college student needs in the first two weeks and almost nobody thinks to register for ahead of time. The sweet spot is $30-$60 per item, and a bundle of a few practical things beats one big gift almost every time.
            </p>
            <p>
              College grads entering the workforce need different things. A quality messenger bag or tote from Bellroy or Timbuk2, a notebook and pen setup for meetings, a pour-over coffee kit for their first apartment, and a professional padfolio for interviews are all gifts that match where they actually are in life. Tech accessories are strong here too: a 4K webcam for remote interviews, a compact Bluetooth speaker for a new apartment, and a portable monitor for working from coffee shops are all practical and immediately useful.
            </p>
            <p>
              The $25-$75 price point is the sweet spot for group graduation gifts. At that range, you can give something genuinely useful without overspending. Luggage accessories like packing cubes and a quality carry-on, kitchen essentials for a first apartment (a good knife, a cast iron pan, a French press), and journal or planner sets all land in this range and are easy to wrap. For group gifts pooled from multiple people, $100-$200 unlocks better luggage, a Vitamix, or a quality espresso machine.
            </p>
            <p>
              Cash alternatives that work: a gift card to Amazon (they know exactly what they need), a contribution to their student loan payment, a Venmo with a note about what it is for, or a subscription to a tool they will actually use. Audible for the reader, Spotify for the music person, or a year of Duolingo Plus for someone moving abroad. Experiences also work well: a cooking class, a wine tasting, or a concert ticket to something they have wanted to see. The grad will remember the experience long after they have used whatever kitchen gadget you bought them.
            </p>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="max-w-3xl mx-auto px-4 py-10 border-t border-gray-100">
          <h2 className="text-2xl font-extrabold text-gray-900 mb-8">
            Graduation Gift FAQs
          </h2>
          <div className="space-y-6">
            {faqs.map(({ q, a }) => (
              <div key={q} className="bg-white rounded-2xl p-6 shadow-sm">
                <h3 className="font-bold text-gray-900 mb-2">{q}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{a}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Related links */}
        <section className="max-w-5xl mx-auto px-4 py-10 border-t border-gray-100 text-center">
          <h2 className="text-xl font-bold text-gray-900 mb-4">More Gift Guides</h2>
          <div className="flex flex-wrap gap-2 justify-center">
            {[
              { href: '/', label: 'Home' },
              { href: '/birthday-gift-ideas', label: 'Birthday Gifts' },
              { href: '/gift-ideas-for-teachers', label: 'Teacher Appreciation Gifts' },
              { href: '/category/tech', label: 'Tech Gifts' },
              { href: '/category/office', label: 'Office Gifts' },
              { href: '/category/finance', label: 'Finance Gifts' },
              { href: '/category/travel', label: 'Travel Gifts' },
              { href: '/category/kitchen', label: 'Kitchen Gifts' },
              { href: '/gifts-under-50', label: 'Gifts Under $50' },
              { href: '/gifts-under-25', label: 'Gifts Under $25' },
            ].map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className="px-4 py-2 bg-white border border-gray-200 rounded-full text-sm text-gray-600 hover:border-[#F04E30] hover:text-[#F04E30] transition-colors"
              >
                {label}
              </Link>
            ))}
          </div>
        </section>

      </main>

      <Footer />
    </div>
  );
}
