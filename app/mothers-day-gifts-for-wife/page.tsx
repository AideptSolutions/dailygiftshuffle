import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import Navbar from '@/components/Navbar';
import Breadcrumbs from '@/components/Breadcrumbs';
import { products } from '@/data/products';
import ProductCard from '@/components/ProductCard';
import InlineShuffle from '@/components/InlineShuffle';

export const metadata: Metadata = {
  title: "Best Mother's Day Gifts for Wife 2026 | TheGiftShuffle",
  description:
    "Find the best Mother's Day gifts for your wife in 2026. Thoughtful picks she will actually love — spa sets, jewelry, skincare, cozy upgrades, and more for every budget.",
  keywords: [
    "mothers day gifts for wife",
    "mothers day gift ideas for wife",
    "best mothers day gifts for wife 2026",
    "mothers day gifts for her",
    "wife mothers day gifts",
  ],
  openGraph: {
    title: "Best Mother's Day Gifts for Wife 2026 | TheGiftShuffle",
    description:
      "Browse the best Mother's Day gifts for your wife in 2026 — spa sets, jewelry, skincare, and more.",
    type: 'website',
    url: 'https://thegiftshuffle.com/mothers-day-gifts-for-wife',
  },
  alternates: {
    canonical: 'https://thegiftshuffle.com/mothers-day-gifts-for-wife',
  },
};

const wifeProducts = products.filter(
  (p) =>
    p.occasions?.includes('mothersFathers') &&
    (p.recipients.includes('her') || p.recipients.includes('mom'))
);

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://thegiftshuffle.com' },
    { '@type': 'ListItem', position: 2, name: "Mother's Day Gifts", item: 'https://thegiftshuffle.com/mothers-day-gifts' },
    { '@type': 'ListItem', position: 3, name: "Mother's Day Gifts for Wife", item: 'https://thegiftshuffle.com/mothers-day-gifts-for-wife' },
  ],
};

const itemListSchema = {
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  name: "Mother's Day Gifts for Wife",
  description: "Hand-picked Mother's Day gift ideas for wives and partners, curated by TheGiftShuffle",
  url: 'https://thegiftshuffle.com/mothers-day-gifts-for-wife',
  numberOfItems: wifeProducts.length,
  itemListElement: wifeProducts.map((p, i) => ({
    '@type': 'ListItem',
    position: i + 1,
    name: p.name,
    description: p.description,
    url: p.affiliateUrl,
  })),
};

const faqs = [
  {
    q: "What are the best Mother's Day gifts for your wife?",
    a: "The best Mother's Day gifts for a wife give her time, rest, or a small luxury she would not buy herself. Think a spa robe and bath set, personalized jewelry, a silk pajama set, or a premium skincare ritual. Tie it to how she actually likes to unwind.",
  },
  {
    q: "What should I get my wife for Mother's Day if she says she wants nothing?",
    a: "When she says nothing, she usually means do not make a fuss, not skip it. Go practical and personal: a cozy weighted blanket, her favorite candle scent, a coffee or tea upgrade, or a handwritten note paired with one small nice thing. Effort reads louder than price.",
  },
  {
    q: "What is a romantic Mother's Day gift for a wife?",
    a: "Romantic picks lean personal: a custom star map of a meaningful date, engraved birthstone jewelry, a couples spa set, or a framed photo book of the year. The romance is in the specificity, not the dollar amount.",
  },
  {
    q: "When is Mother's Day 2026?",
    a: "Mother's Day 2026 is Sunday, May 10. It always falls on the second Sunday of May. Order physical gifts by May 4 with standard shipping, or May 7 with expedited shipping, to be safe.",
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

export default function MothersDayGiftsForWifePage() {
  return (
    <div className="min-h-screen flex flex-col" style={{ background: '#FFFAF5' }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <Navbar />
      <Breadcrumbs
        items={[
          { label: "Mother's Day Gifts", href: '/mothers-day-gifts' },
          { label: 'For Wife', href: '/mothers-day-gifts-for-wife' },
        ]}
      />

      <main id="main-content" className="flex-1">
        {/* Hero image */}
        <section className="max-w-5xl mx-auto px-4 pt-8">
          <div className="relative w-full rounded-2xl overflow-hidden" style={{ aspectRatio: '3/2', maxHeight: '420px' }}>
            <Image
              src="/images/heroes/mothers-day-gifts-for-wife.jpg"
              alt="A Mother's Day gift for a wife with fresh flowers"
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
            Mother&apos;s Day Gifts for Wife 2026
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
            She runs the household, shows up for the kids, and probably hasn&apos;t taken a real break in months.
            This Mother&apos;s Day, give her something that feels less like an obligation gift and more like genuine appreciation.
            Every pick below was chosen because it gives her something she wants but would never carve out for herself:
            time to slow down, a little luxury, or an upgrade to something she uses every single day.
          </p>
        </section>

        {/* Inline Shuffle */}
        <section className="max-w-5xl mx-auto px-4 py-6">
          <InlineShuffle products={wifeProducts} heading="Shuffle Wife Picks" />
        </section>

        {/* Product Grid */}
        <section className="max-w-5xl mx-auto px-4 py-8">
          <h2 className="text-2xl font-bold mb-6" style={{ color: '#1A202C' }}>
            All Mother&apos;s Day Gift Ideas for Wife
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {wifeProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="bg-white py-12 px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl font-bold mb-4" style={{ color: '#1A202C' }}>
              Not Sure What She Wants?
            </h2>
            <p className="text-gray-600 mb-6">
              Use TheGiftShuffle to get a personalized recommendation in seconds. Pick her personality, set your budget, and hit Shuffle.
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
        <section className="max-w-5xl mx-auto px-4 py-12">
          <h2 className="text-xl font-bold mb-4" style={{ color: '#1A202C' }}>Related Gift Guides</h2>
          <div className="flex flex-wrap gap-3">
            {[
              { href: '/', label: 'Home' },
              { href: '/mothers-day-gifts', label: "All Mother's Day Gifts" },
              { href: '/mothers-day-gifts-under-100', label: "Mother's Day Gifts Under $100" },
              { href: '/mothers-day-gifts-under-50', label: "Mother's Day Gifts Under $50" },
              { href: '/gift-ideas-for-her', label: 'Gift Ideas for Her' },
              { href: '/gift-ideas-for-mom', label: 'Gift Ideas for Mom' },
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
