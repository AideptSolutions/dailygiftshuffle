import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import Navbar from '@/components/Navbar';
import Breadcrumbs from '@/components/Breadcrumbs';
import { products } from '@/data/products';
import ProductCard from '@/components/ProductCard';
import InlineShuffle from '@/components/InlineShuffle';

export const metadata: Metadata = {
  title: "Graduation Gifts Under $50 (Class of 2026) | TheGiftShuffle",
  description:
    "The best graduation gifts under $50 for the Class of 2026. Portable Bluetooth speakers, wireless earbuds, insulated tumblers, journals, and more — thoughtful picks that don't break the bank.",
  keywords: [
    "graduation gifts under 50",
    "graduation gifts under $50",
    "cheap graduation gifts 2026",
    "affordable graduation gifts",
    "best graduation gifts under 50 dollars",
    "high school graduation gifts under 50",
  ],
  openGraph: {
    title: "Graduation Gifts Under $50 (Class of 2026) | TheGiftShuffle",
    description:
      "Top graduation gifts under $50 — Bluetooth speakers, earbuds, tumblers, journals, and practical picks for every grad.",
    type: 'website',
    url: 'https://thegiftshuffle.com/graduation-gifts-under-50',
  },
  alternates: {
    canonical: 'https://thegiftshuffle.com/graduation-gifts-under-50',
  },
};

const gradUnder50 = products
  .filter((p) => p.occasions?.includes('graduation') && p.price <= 50)
  .sort((a, b) => b.rating - a.rating || b.reviewCount - a.reviewCount);

const faqs = [
  {
    q: "What are the best graduation gifts under $50?",
    a: "The best graduation gifts under $50 are practical picks that help them launch: a portable Bluetooth speaker ($45) for their first dorm or apartment, wireless earbuds for commuting and studying, an insulated 30oz tumbler they'll use every day, a journaling starter kit for reflection and planning, and a goal-setting journal to start the next chapter intentionally. These are gifts with daily-use cases — not decorative pieces that sit on a shelf.",
  },
  {
    q: "What makes a good graduation gift under $50?",
    a: "A good graduation gift under $50 solves a specific problem the grad actually has in the next chapter. For high school grads heading to college: earbuds for studying, a power bank for campus use, an LED desk lamp with USB. For college grads entering the workforce: an insulated tumbler for commuting, a goal-setting journal, a smart plug for their first apartment. Under $50 is the sweet spot for friend-level graduation gifts.",
  },
  {
    q: "What are good group graduation gifts under $50 per person?",
    a: "With multiple people contributing under $50 each, you can pool resources for a more meaningful gift: a quality Bluetooth speaker, a Polaroid mini instant camera with extra film, a premium tech accessory bundle (power bank + USB hub + cable organizer), or a gift card to Amazon or Target that they can spend on exactly what they need. The best group graduation gift is the one that enables something — not just fills space.",
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
  name: 'Graduation Gifts Under $50 — Class of 2026',
  description: 'Hand-picked graduation gifts under $50 for the Class of 2026, curated by TheGiftShuffle',
  url: 'https://thegiftshuffle.com/graduation-gifts-under-50',
  numberOfItems: gradUnder50.length,
  itemListElement: gradUnder50.map((p, i) => ({
    '@type': 'ListItem',
    position: i + 1,
    name: p.name,
    description: p.description,
    url: p.affiliateUrl,
  })),
};

export default function GraduationGiftsUnder50Page() {
  return (
    <div className="min-h-screen flex flex-col" style={{ background: '#FFFAF5' }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <Navbar />
      <Breadcrumbs
        items={[
          { label: 'Graduation Gifts', href: '/graduation-gifts' },
          { label: 'Under $50', href: '/graduation-gifts-under-50' },
        ]}
      />

      <main id="main-content" className="flex-1">
        {/* Hero image */}
        <section className="max-w-5xl mx-auto px-4 pt-8">
          <div className="relative w-full rounded-2xl overflow-hidden" style={{ aspectRatio: '3/2', maxHeight: '420px' }}>
            <Image
              src="/images/heroes/graduation-gifts-under-50.jpg"
              alt="An affordable graduation gift under $50"
              fill
              className="object-cover"
              priority
              unoptimized
            />
          </div>
        </section>
        {/* Hero */}
        <section className="max-w-5xl mx-auto px-4 pt-8 pb-6 text-center">
          <div className="text-4xl mb-3">🎓</div>
          <h1 className="text-4xl sm:text-5xl font-extrabold mb-4" style={{ color: '#1A202C' }}>
            Graduation Gifts Under $50 — Class of 2026
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Under $50 is the standard graduation gift range for friends, and it covers a lot of ground. A portable
            Bluetooth speaker for their first apartment. Wireless earbuds for studying and commuting. An insulated
            tumbler they&apos;ll use every single day. These are the gifts grads actually need — not just another
            piece of decor.
          </p>
        </section>

        {/* Product Grid */}
        <section className="max-w-5xl mx-auto px-4 py-8">
          <h2 className="text-2xl font-bold mb-2" style={{ color: '#1A202C' }}>
            Graduation Gifts Under $50
          </h2>
          <p className="text-sm text-gray-500 mb-6">Sorted by customer rating.</p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {gradUnder50.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>

        {/* Inline Shuffle */}
        <section className="max-w-5xl mx-auto px-4 py-6">
          <InlineShuffle products={gradUnder50} heading="Shuffle Graduation Picks Under $50" />
        </section>

        {/* CTA */}
        <section className="bg-white py-12 px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl font-bold mb-4" style={{ color: '#1A202C' }}>
              Find a Graduation Gift in Seconds
            </h2>
            <p className="text-gray-600 mb-6">
              Use TheGiftShuffle to get a personalized graduation gift recommendation — set your budget and get
              an instant curated pick.
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
          <h2 className="text-xl font-bold mb-4" style={{ color: '#1A202C' }}>More Graduation Gift Guides</h2>
          <div className="flex flex-wrap gap-3">
            {[
              { href: '/graduation-gifts', label: 'All Graduation Gifts' },
              { href: '/graduation-gifts-under-100', label: 'Graduation Gifts Under $100' },
              { href: '/gifts-under-50', label: 'All Gifts Under $50' },
              { href: '/gift-ideas-for-teachers', label: 'Teacher Appreciation Gifts' },
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
