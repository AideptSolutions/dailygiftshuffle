import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import Navbar from '@/components/Navbar';
import Breadcrumbs from '@/components/Breadcrumbs';
import { products } from '@/data/products';
import InlineShuffle from '@/components/InlineShuffle';

export const metadata: Metadata = {
  title: "Top 10 Fathers Day Gifts for 2026 | Gifts Dads Actually Want | TheGiftShuffle",
  description:
    "Fathers Day 2026 is June 21. Here are the 10 best gifts for dads this year, ranked by what is trending now. From smart grills and noise-canceling headphones to golf watches and whiskey kits.",
  keywords: [
    'top 10 fathers day gifts 2026',
    'best fathers day gifts 2026',
    'fathers day gift ideas for him',
    'unique fathers day gifts',
    'trending fathers day gifts 2026',
    'best gifts for dad 2026',
    'fathers day gifts under 50',
    'fathers day gifts under 100',
  ],
  openGraph: {
    title: "Top 10 Fathers Day Gifts for 2026 | Gifts Dads Actually Want | TheGiftShuffle",
    description:
      "Fathers Day is June 21, 2026. These are the 10 best gifts for dads right now, ranked by what is trending, not what has been recycled since 2019.",
    type: 'website',
    url: 'https://thegiftshuffle.com/top-10-fathers-day-gifts-2026',
    images: [
      {
        url: 'https://www.thegiftshuffle.com/api/og?title=Top%2010%20Father%27s%20Day%20Gifts%202026%20%7C%20TheGiftShuffle',
        width: 1200,
        height: 630,
      },
    ],
  },
  alternates: {
    canonical: 'https://thegiftshuffle.com/top-10-fathers-day-gifts-2026',
  },
};

// Hardcoded top 10 IDs in ranked order
const TOP_10_IDS = [
  'dad-fd-1',
  'dad-fd-2',
  'dad-fd-3',
  'dad-fd-4',
  'dad-fd-5',
  'dad-fd-6',
  'dad-fd-7',
  'dad-fd-8',
  'dad-fd-9',
  'dad-fd-10',
];

const productMap = Object.fromEntries(products.map((p) => [p.id, p]));
const top10 = TOP_10_IDS.map((id) => productMap[id]).filter(Boolean);

// Shuffle pool: all products tagged for him or dad
const shufflePool = products.filter(
  (p) => p.recipients?.includes('him') || p.recipients?.includes('dad'),
);

const faqs = [
  {
    q: "What are the best Father's Day gifts for 2026?",
    a: "The best Father's Day gifts in 2026 are the ones dads actually use every day: a Bose QuietComfort headset, a smart meat thermometer, a Theragun massager, a Stanley tumbler, or a whiskey cocktail smoker kit. The trend has shifted away from novelty gag gifts and toward practical upgrades that improve something he already does.",
  },
  {
    q: "What do dads actually want for Father's Day?",
    a: "Most dads want something that saves them time, improves a hobby, or feels like a genuine upgrade. Not another coffee mug. Top picks dads consistently love: quality Bluetooth speaker, a meat thermometer, a massage gun, a quality pocket knife, a beer brewing kit, or a streaming subscription they have been putting off. The key is tying the gift to something he is already passionate about.",
  },
  {
    q: "What are unique Father's Day gifts that are not cliche?",
    a: "Skip the generic and go with: a Ninja pizza oven, a cocktail smoker kit, a GPS golf watch, a custom star map, or a PowerUp paper airplane kit. These feel personal and considered rather than last-minute.",
  },
  {
    q: "What is a good Father's Day gift under $50?",
    a: "Great Father's Day gifts under $50 include the Stanley tumbler ($35), a whiskey cocktail smoker kit ($45), a Carhartt dopp kit ($23), and a digital meat thermometer ($30). Any of these feels thoughtful without stressing the budget.",
  },
  {
    q: "What is a last-minute Father's Day gift that does not look last-minute?",
    a: "For last-minute Father's Day gifts, focus on Amazon same-day or next-day delivery: a Stanley tumbler, a MEATER thermometer, or a Theragun Relief. A custom star map also delivers digitally and looks genuinely thoughtful.",
  },
  {
    q: "When is Father's Day 2026?",
    a: "Father's Day 2026 is on Sunday, June 21. It always falls on the third Sunday of June. To guarantee delivery in time, order physical gifts by June 14 with standard shipping, or June 18 with expedited shipping.",
  },
];

const itemListSchema = {
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  name: "Top 10 Father's Day Gifts for 2026",
  description: "The best Father's Day gifts for 2026, curated by TheGiftShuffle",
  url: 'https://thegiftshuffle.com/top-10-fathers-day-gifts-2026',
  numberOfItems: top10.length,
  itemListElement: top10.map((p, i) => ({
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

export default function Top10FathersDayGifts2026Page() {
  return (
    <div className="min-h-screen flex flex-col" style={{ background: '#FFFAF5' }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <Navbar />
      <Breadcrumbs items={[{ label: "Top 10 Father's Day Gifts 2026", href: '/top-10-fathers-day-gifts-2026' }]} />

      <main id="main-content" className="flex-1">

        {/* ── HERO IMAGE ──────────────────────────────────────────────── */}
        <section className="max-w-5xl mx-auto px-4 pt-8">
          <div className="relative w-full rounded-2xl overflow-hidden" style={{ aspectRatio: '3/2', maxHeight: '420px' }}>
            <Image
              src="/images/products/fathers-day-hero.jpg"
              alt="Father unwrapping a gift in his man cave"
              fill
              className="object-cover"
              priority
              unoptimized
            />
          </div>
        </section>

        {/* ── SEO BLURB ───────────────────────────────────────────────── */}
        <section className="max-w-3xl mx-auto px-4 pt-8 pb-2 text-center">
          <h1 className="text-4xl sm:text-5xl font-extrabold mb-5 leading-tight" style={{ color: '#1A202C' }}>
            Top 10 Father&apos;s Day Gifts for 2026
          </h1>
          <p className="text-base sm:text-lg text-gray-700 leading-relaxed mb-3">
            Father&apos;s Day 2026 is <strong>June 21</strong>. These are the 10 best gifts for dads this year,
            ranked by what people are actually buying right now, not what has been recycled in listicles since 2019.
            Every pick here solves a real problem, upgrades a hobby he already has, or gives him 30 minutes of
            daily-use joy. No novelty mugs. No generic gift cards.
          </p>
          <p className="text-base text-gray-600 leading-relaxed text-center">
            Whether you are shopping for a grilling dad, a tech dad, a golf dad, or the guy who claims he does not
            want anything, this list covers every budget from under $25 up to a full outdoor cooking setup. Scroll
            through the picks below, then use the shuffle widget at the bottom to explore even more ideas across
            the full for-him and for-dad catalog.
          </p>
        </section>

        {/* ── TOP 10 LIST ─────────────────────────────────────────────── */}
        <section className="max-w-3xl mx-auto px-4 py-8">
          <h2 className="text-2xl font-bold mb-6" style={{ color: '#1A202C' }}>
            The 10 Best Father&apos;s Day Gifts for 2026
          </h2>

          <ol className="flex flex-col gap-4">
            {top10.map((p, i) => (
              <li key={p.id}>
                <a
                  href={p.affiliateUrl}
                  target="_blank"
                  rel="noopener noreferrer sponsored"
                  className="flex items-start gap-4 rounded-2xl border border-[#E2E8F0] bg-white hover:border-[#F04E30]/40 hover:shadow-md transition-all p-4 group"
                >
                  {/* Rank */}
                  <span
                    className="flex-shrink-0 w-9 h-9 rounded-full flex items-center justify-center text-sm font-extrabold text-white mt-1"
                    style={{ background: '#F04E30' }}
                  >
                    {i + 1}
                  </span>

                  {/* Product image */}
                  <div className="relative flex-shrink-0 w-20 h-20 rounded-xl overflow-hidden bg-[#F0F4F8]">
                    <Image
                      src={p.image || '/img/categories/gift.svg'}
                      alt={p.name}
                      fill
                      className="object-contain p-1"
                      unoptimized
                    />
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-bold text-gray-900 leading-snug group-hover:text-[#F04E30] transition-colors">
                      {p.name}
                    </p>
                    <p className="text-xs text-gray-500 mt-1 leading-snug line-clamp-2">
                      {p.description}
                    </p>
                    {p.why && (
                      <p className="text-[11px] italic text-gray-400 mt-1.5 leading-snug line-clamp-2 pl-2 border-l-2 border-[#F04E30]/30">
                        {p.why}
                      </p>
                    )}
                    <p className="text-base font-extrabold mt-2" style={{ color: '#1A202C' }}>
                      {p.priceDisplay}
                    </p>
                  </div>

                  {/* CTA */}
                  <span className="flex-shrink-0 self-center btn-amazon text-xs font-bold py-2 px-4 rounded-full whitespace-nowrap hidden sm:block">
                    Buy on Amazon
                  </span>
                </a>
              </li>
            ))}
          </ol>
        </section>

        {/* ── SHUFFLE WIDGET ───────────────────────────────────────────── */}
        <section className="max-w-3xl mx-auto px-4 py-8 border-t border-[#E2E8F0]">
          <p className="text-gray-600 text-sm mb-5">
            Not sure which one fits your dad? Use the shuffle below to browse the full for-him and
            for-dad catalog and find something that matches his style.
          </p>
          <InlineShuffle
            products={shufflePool}
            heading="More Gifts for Dad"
          />
        </section>

        {/* ── FAQ ──────────────────────────────────────────────────────── */}
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

        {/* ── INTERNAL LINKS ───────────────────────────────────────────── */}
        <section className="max-w-3xl mx-auto px-4 pb-12">
          <h2 className="text-lg font-bold mb-4" style={{ color: '#1A202C' }}>Related Gift Guides</h2>
          <div className="flex flex-wrap gap-3">
            {[
              { href: '/gift-ideas-for-dad', label: 'Gift Ideas for Dad' },
              { href: '/gift-ideas-for-him', label: 'Gift Ideas for Him' },
              { href: '/fathers-day-gifts-under-25', label: "Father's Day Gifts Under $25" },
              { href: '/fathers-day-gifts-under-50', label: "Father's Day Gifts Under $50" },
              { href: '/fathers-day-gifts-under-100', label: "Father's Day Gifts Under $100" },
              { href: '/gifts-under-50', label: 'Gifts Under $50' },
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
