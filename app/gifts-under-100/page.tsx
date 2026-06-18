import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import Navbar from '@/components/Navbar';
import Breadcrumbs from '@/components/Breadcrumbs';
import { products } from '@/data/products';
import ProductCard from '@/components/ProductCard';
import InlineShuffle from '@/components/InlineShuffle';

export const metadata: Metadata = {
  title: 'Gifts Under $100: Premium Picks Without the Premium Price | TheGiftShuffle',
  description:
    'Browse the best gifts under $100: smart home tech, fitness gear, premium grooming kits, and kitchen upgrades that feel expensive without breaking the bank.',
  keywords: [
    'gifts under $100',
    'gifts under 100 dollars',
    'good gifts under $100',
    'thoughtful gifts under $100',
    'what to get someone under $100',
  ],
  openGraph: {
    title: 'Gifts Under $100: Premium Picks Without the Premium Price | TheGiftShuffle',
    description:
      'Discover premium-feeling gifts under $100, the sweet spot for thoughtful, high-impact gifting without the splurge.',
    type: 'website',
    url: 'https://thegiftshuffle.com/gifts-under-100',
    images: [
      {
        url: 'https://www.thegiftshuffle.com/api/og?title=Gifts%20Under%20%24100%20%7C%20TheGiftShuffle',
        width: 1200,
        height: 630,
      },
    ],
  },
  alternates: {
    canonical: 'https://thegiftshuffle.com/gifts-under-100',
  },
};

const under100Products = products.filter(
  (p) => ['50to100', '100to150'].includes(p.budgetTier)
).slice(0, 24);

const faqs = [
  {
    q: 'What are the best gifts under $100?',
    a: "The best gifts under $100 hit the premium threshold without financial stress. Top picks include: a smart alarm clock with sunrise simulation, a high-quality insulated tumbler set, a premium grooming kit, a walking pad for under-desk use, a cast iron skillet, or a smart home starter bundle. Look for products in the $75–$100 range with 4.5+ stars. Reviewers in this segment specifically call out &quot;great gift&quot; in their reviews.",
  },
  {
    q: "What's a good gift under $100 for a man?",
    a: "For a man under $100, the top-performing categories are: cordless power tools (a compact drill or multitool), premium grooming kits (beard trimmer set, shaving kit), a tactical backpack, a portable projector, high-quality wireless earbuds, or a smart home device. These feel like a real upgrade, something he might not splurge on himself but genuinely appreciates.",
  },
  {
    q: "What's a thoughtful gift under $100 for a woman?",
    a: "Thoughtful gifts under $100 for women include: a silk pillowcase set, a premium aromatherapy diffuser kit, a personalized bracelet stack, a subscription box (beauty, wine, books), a quality weighted blanket, or a stylish insulated tumbler in her favorite color. Focus on daily-use luxuries, items that upgrade her routine in a small but meaningful way.",
  },
  {
    q: 'What are premium-feeling gifts under $100?',
    a: "Gifts that feel expensive under $100: a real leather wallet or card case, a crystal wine decanter set, a cashmere-blend throw blanket, a Turkish cotton robe, a smart coffee maker, or a gold-plated jewelry organizer. The key is materials and presentation: gifts that look and feel high-end but come in at a fraction of the price.",
  },
  {
    q: 'What tech gifts are under $100?',
    a: "Top tech gifts under $100: true wireless earbuds (AirPods alternatives with great reviews), a smart alarm clock, a portable Bluetooth speaker, a smart plug starter kit, an e-reader, a compact ring light for video calls, or a mini projector. The $50–$100 tech range has exploded with quality options that rival far more expensive products.",
  },
  {
    q: "What's a safe gift for anyone under $100?",
    a: "The safest gifts under $100 for anyone: a premium insulated tumbler (Stanley, Hydro Flask), a high-quality cozy blanket, a nice portable speaker, a spa/self-care gift set, or a versatile smartwatch fitness tracker. These are universally appreciated, well-reviewed, and work for any gender, age group, or occasion.",
  },
];

const itemListSchema = {
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  name: 'Gifts Under $100',
  description: 'Hand-picked gift ideas under $100 curated by TheGiftShuffle',
  url: 'https://thegiftshuffle.com/gifts-under-100',
  numberOfItems: under100Products.length,
  itemListElement: under100Products.map((p, i) => ({
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

export default function GiftsUnder100Page() {
  return (
    <div className="min-h-screen flex flex-col" style={{ background: '#FFFAF5' }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <Navbar />
      <Breadcrumbs items={[{ label: 'Gifts Under $100', href: '/gifts-under-100' }]} />

      <main id="main-content" className="flex-1">
        {/* Hero image */}
        <section className="max-w-5xl mx-auto px-4 pt-8">
          <div className="relative w-full rounded-2xl overflow-hidden" style={{ aspectRatio: '3/2', maxHeight: '420px' }}>
            <Image
              src="/images/heroes/gifts-under-100.jpg"
              alt="A selection of thoughtful gifts under $100"
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
            Gifts Under $100
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed mb-4">
            The $50–$100 range is the fastest-growing gift budget segment, and for good reason. It hits the threshold of &quot;feels premium&quot; without the financial stress of going higher. The trending categories in this range are smart home tech (video doorbells, smart alarm clocks, mini projectors), fitness equipment (walking pads, weighted vests, compact resistance systems), premium grooming kits, and kitchen upgrades that feel like a real improvement. These are the gifts people actually use every day, not the ones that collect dust on a shelf.
          </p>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Products in the $75–$100 range consistently show the best review-to-price ratio on Amazon. Reviewers in this segment explicitly mention gift-worthiness. &quot;Bought this as a gift and they loved it&quot; is the most common phrase in top reviews. Whether you&apos;re shopping for a birthday, anniversary, holiday, or any occasion, this budget delivers impact without overthinking it.
          </p>
        </section>

        {/* Inline Shuffle */}
        <section className="max-w-5xl mx-auto px-4 py-6">
          <InlineShuffle products={under100Products} heading="Shuffle Picks Under $100" />
        </section>

        {/* Full Product Grid */}
        <section className="max-w-5xl mx-auto px-4 py-8">
          <h2 className="text-2xl font-bold mb-6" style={{ color: '#1A202C' }}>
            All Picks Under $100
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {under100Products.map((p) => (
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
              Want a smarter way to find the perfect gift? Use TheGiftShuffle. Set your budget,
              pick who it&apos;s for, and get a personalized recommendation instantly.
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
