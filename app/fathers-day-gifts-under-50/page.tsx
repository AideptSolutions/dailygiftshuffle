import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import Navbar from '@/components/Navbar';
import Breadcrumbs from '@/components/Breadcrumbs';
import { products } from '@/data/products';
import ProductCard from '@/components/ProductCard';
import InlineShuffle from '@/components/InlineShuffle';

export const metadata: Metadata = {
  title: "Father's Day Gifts Under $50 (2026): Top Picks for Dad | TheGiftShuffle",
  description:
    "The best Father's Day gifts under $50 in 2026. Digital meat thermometers, insulated tumblers, Bluetooth speakers, leather dopp kits, and more, all under $50.",
  keywords: [
    "fathers day gifts under 50",
    "fathers day gifts under $50",
    "affordable fathers day gifts 2026",
    "good fathers day gifts under 50 dollars",
    "best fathers day gifts under 50",
  ],
  openGraph: {
    title: "Father's Day Gifts Under $50 (2026) | TheGiftShuffle",
    description:
      "Great Father's Day gifts for under $50, including digital thermometers, insulated tumblers, Bluetooth speakers, and more.",
    type: 'website',
    url: 'https://thegiftshuffle.com/fathers-day-gifts-under-50',
  },
  alternates: {
    canonical: 'https://thegiftshuffle.com/fathers-day-gifts-under-50',
  },
};

const fathersDayUnder50 = products
  .filter(
    (p) =>
      (p.recipients.includes('dad') || p.recipients.includes('him')) &&
      p.price <= 50
  )
  .sort((a, b) => b.rating - a.rating || b.reviewCount - a.reviewCount);

const faqs = [
  {
    q: "What are the best Father's Day gifts under $50?",
    a: "The best Father's Day gifts under $50 are: an instant-read digital meat thermometer (the #1 most-gifted item at this price, with 78,000+ five-star reviews), an insulated 30oz tumbler, a portable Bluetooth speaker, a leather dopp kit for his grooming essentials, and a drill bit set for the DIY dad. These hit the sweet spot of genuinely useful, practical, and priced to not overthink.",
  },
  {
    q: "What does Dad actually want for Father's Day that's under $50?",
    a: "When you ask dads what they want, the consistent answer is something practical that improves their daily life or a hobby. Under $50, the top categories are kitchen/grill gadgets (digital thermometer, BBQ rub set), drinks (insulated tumbler, flask), and everyday carry upgrades (leather card holder, dopp kit). The key is choosing something specific to what he actually does, not a generic gift.",
  },
  {
    q: "Is $50 enough for a good Father's Day gift?",
    a: "Absolutely. The $25-$50 range is the single best value zone for Father's Day gifting. At $30, the digital meat thermometer with 78,000 reviews is one of the highest-satisfaction gifts in this price band. At $45, a 30oz insulated tumbler he'll use every day for years. The gift doesn't need to be expensive to be right. It needs to be used.",
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
  name: "Father's Day Gifts Under $50",
  description: "Hand-picked Father's Day gifts under $50, curated by TheGiftShuffle",
  url: 'https://thegiftshuffle.com/fathers-day-gifts-under-50',
  numberOfItems: fathersDayUnder50.length,
  itemListElement: fathersDayUnder50.map((p, i) => ({
    '@type': 'ListItem',
    position: i + 1,
    name: p.name,
    description: p.description,
    url: p.affiliateUrl,
  })),
};

export default function FathersDayGiftsUnder50Page() {
  return (
    <div className="min-h-screen flex flex-col" style={{ background: '#FFFAF5' }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <Navbar />
      <Breadcrumbs
        items={[
          { label: "Father's Day Gifts", href: '/fathers-day-gifts' },
          { label: 'Under $50', href: '/fathers-day-gifts-under-50' },
        ]}
      />

      <main id="main-content" className="flex-1">
        {/* Hero image */}
        <section className="max-w-5xl mx-auto px-4 pt-8">
          <div className="relative w-full rounded-2xl overflow-hidden" style={{ aspectRatio: '3/2', maxHeight: '420px' }}>
            <Image
              src="/images/heroes/fathers-day-gifts-under-50.jpg"
              alt="A mid-range Father's Day gift for dad"
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
            The Best Father&apos;s Day Gifts Under $50
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
            The $25-$50 range is the sweet spot of Father&apos;s Day gifting. Enough budget for something genuinely
            useful, a digital meat thermometer he&apos;ll reach for every barbecue, an insulated tumbler he&apos;ll
            carry daily, a Bluetooth speaker for the garage or patio. These are the gifts dads actually remember.
          </p>
        </section>

        {/* Product Grid */}
        <section className="max-w-5xl mx-auto px-4 py-8">
          <h2 className="text-2xl font-bold mb-2" style={{ color: '#1A202C' }}>
            Father&apos;s Day Gifts Under $50
          </h2>
          <p className="text-sm text-gray-500 mb-6">Sorted by customer rating.</p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {fathersDayUnder50.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>

        {/* Inline Shuffle */}
        <section className="max-w-5xl mx-auto px-4 py-6">
          <InlineShuffle products={fathersDayUnder50} heading="Shuffle Under-$50 Picks for Dad" />
        </section>

        {/* CTA */}
        <section className="bg-white py-12 px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl font-bold mb-4" style={{ color: '#1A202C' }}>
              Want a Personalized Pick?
            </h2>
            <p className="text-gray-600 mb-6">
              Use TheGiftShuffle. Pick Dad, set your budget, and get an instant Father&apos;s Day recommendation.
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
          <h2 className="text-xl font-bold mb-4" style={{ color: '#1A202C' }}>More Father&apos;s Day Gift Guides</h2>
          <div className="flex flex-wrap gap-3">
            {[
              { href: '/fathers-day-gifts', label: "All Father's Day Gifts" },
              { href: '/fathers-day-gifts-under-25', label: "Father's Day Gifts Under $25" },
              { href: '/fathers-day-gifts-under-100', label: "Father's Day Gifts Under $100" },
              { href: '/gift-ideas-for-dad', label: 'Gift Ideas for Dad' },
              { href: '/gift-ideas-for-him', label: 'Gift Ideas for Him' },
              { href: '/gifts-under-50', label: 'All Gifts Under $50' },
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
