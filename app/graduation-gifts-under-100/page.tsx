import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import Navbar from '@/components/Navbar';
import Breadcrumbs from '@/components/Breadcrumbs';
import { products } from '@/data/products';
import ProductCard from '@/components/ProductCard';
import InlineShuffle from '@/components/InlineShuffle';
import CategoryIcon from '@/components/CategoryIcon';

export const metadata: Metadata = {
  title: "Graduation Gifts Under $100 (Class of 2026) | TheGiftShuffle",
  description:
    "The best graduation gifts under $100 for the Class of 2026. Smartwatches, Kindle e-readers, massage guns, silk pajama sets, coding robots, and more practical picks for every grad.",
  keywords: [
    "graduation gifts under 100",
    "graduation gifts under $100",
    "best graduation gifts 2026 under 100",
    "graduation gift ideas under 100 dollars",
    "college graduation gifts under 100",
  ],
  openGraph: {
    title: "Graduation Gifts Under $100 (Class of 2026) | TheGiftShuffle",
    description:
      "Top graduation gifts under $100: Kindle, smartwatch, massage gun, silk pajamas, and more for every grad.",
    type: 'website',
    url: 'https://thegiftshuffle.com/graduation-gifts-under-100',
  },
  alternates: {
    canonical: 'https://thegiftshuffle.com/graduation-gifts-under-100',
  },
};

const gradUnder100 = products
  .filter((p) => p.occasions?.includes('graduation') && p.price <= 100)
  .sort((a, b) => b.rating - a.rating || b.reviewCount - a.reviewCount);

const faqs = [
  {
    q: "What are the best graduation gifts under $100?",
    a: "The best graduation gifts under $100 are upgrades that match the next chapter: a Kindle Paperwhite for the reader heading into downtime they've never had, a smartwatch with GPS for the grad starting a new routine, a percussion massage gun for the one entering a physical job or a desk-job stress spiral, and silk pajamas for the one finally getting their own space. Under $100 is where the gifts go from 'nice' to 'genuinely useful and thoughtful.'",
  },
  {
    q: "What's the right amount to spend on a college graduation gift?",
    a: "For a close family member graduating college, $50-$150 is the appropriate range. For a friend, $25-$75. Under $100 covers excellent options in both cases: a Kindle Paperwhite ($100), a smartwatch ($90), a massage gun ($80), or a quality jewelry box for the grad who just landed her first professional job ($70). The amount matters less than whether it fits the specific grad's next chapter.",
  },
  {
    q: "What graduation gifts under $100 actually get used?",
    a: "The highest daily-use graduation gifts under $100: a Kindle Paperwhite (used on every commute), a smartwatch (worn every day), an insulated tumbler (carried to every morning class or job), wireless earbuds (used for every study session or commute), and a quality backpack or tote. These are all gifts with a natural place in the grad's daily routine, not items that end up in a closet.",
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
  name: 'Graduation Gifts Under $100: Class of 2026',
  description: 'Hand-picked graduation gifts under $100 for the Class of 2026, curated by TheGiftShuffle',
  url: 'https://thegiftshuffle.com/graduation-gifts-under-100',
  numberOfItems: gradUnder100.length,
  itemListElement: gradUnder100.map((p, i) => ({
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

export default function GraduationGiftsUnder100Page() {
  return (
    <div className="min-h-screen flex flex-col" style={{ background: '#FFFAF5' }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <Navbar />
      <Breadcrumbs
        items={[
          { label: 'Graduation Gifts', href: '/graduation-gifts' },
          { label: 'Under $100', href: '/graduation-gifts-under-100' },
        ]}
      />

      <main id="main-content" className="flex-1">
        {/* Hero image */}
        <section className="max-w-5xl mx-auto px-4 pt-8">
          <div className="relative w-full rounded-2xl overflow-hidden" style={{ aspectRatio: '3/2', maxHeight: '420px' }}>
            <Image
              src="/images/heroes/graduation-gifts-under-100.jpg"
              alt="A graduation gift under $100"
              fill
              className="object-cover"
              priority
              unoptimized
            />
          </div>
        </section>
        {/* Hero */}
        <section className="max-w-5xl mx-auto px-4 pt-8 pb-6 text-center">
          <div className="mb-3 flex justify-center"><CategoryIcon slug="graduation" className="w-12 h-12 text-coral" aria-hidden="true" /></div>
          <h1 className="text-4xl sm:text-5xl font-extrabold mb-4" style={{ color: '#1A202C' }}>
            Graduation Gifts Under $100: Class of 2026
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Under $100 is the sweet spot for close-family graduation gifting. You&apos;re in Kindle territory.
            Smartwatch territory. Quality massage gun territory, the kind of gift they&apos;ve been wanting but
            haven&apos;t justified spending on themselves yet. These picks match where the grad actually is headed:
            college, the workforce, or their first real space.
          </p>
        </section>

        {/* Product Grid */}
        <section className="max-w-5xl mx-auto px-4 py-8">
          <h2 className="text-2xl font-bold mb-2" style={{ color: '#1A202C' }}>
            Graduation Gifts Under $100
          </h2>
          <p className="text-sm text-gray-500 mb-6">Sorted by customer rating.</p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {gradUnder100.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>

        {/* Inline Shuffle */}
        <section className="max-w-5xl mx-auto px-4 py-6">
          <InlineShuffle products={gradUnder100} heading="Shuffle Graduation Picks Under $100" />
        </section>

        {/* CTA */}
        <section className="bg-white py-12 px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl font-bold mb-4" style={{ color: '#1A202C' }}>
              Find a Graduation Gift in Seconds
            </h2>
            <p className="text-gray-600 mb-6">
              Use TheGiftShuffle to get a personalized graduation gift recommendation, set your budget and get
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
              { href: '/graduation-gifts-under-50', label: 'Graduation Gifts Under $50' },
              { href: '/gifts-under-100', label: 'All Gifts Under $100' },
              { href: '/birthday-gift-ideas', label: 'Birthday Gift Ideas' },
              { href: '/gift-ideas-for-teachers', label: 'Teacher Appreciation Gifts' },
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
