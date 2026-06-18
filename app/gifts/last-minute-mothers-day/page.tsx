import type { Metadata } from 'next';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Breadcrumbs from '@/components/Breadcrumbs';
import { products } from '@/data/products';
import ProductCard from '@/components/ProductCard';
import InlineShuffle from '@/components/InlineShuffle';

export const metadata: Metadata = {
  title: "Last-Minute Mother's Day Gifts 2026 — Order by May 9 | TheGiftShuffle",
  description:
    "Running out of time? These last-minute Mother's Day gifts ship fast with Amazon Prime. Top-rated spa sets, skincare, jewelry, and thoughtful picks — all deliverable before May 11.",
  keywords: [
    "last minute mothers day gifts",
    "last minute mothers day gift ideas 2026",
    "mothers day gifts fast shipping",
    "mothers day gifts that ship fast",
    "last minute gift ideas for mom",
    "same day mothers day gifts",
  ],
  openGraph: {
    title: "Last-Minute Mother's Day Gifts 2026 — Order by May 9 | TheGiftShuffle",
    description:
      "Top-rated Mother's Day gifts with Amazon Prime shipping. Order now and still make it in time.",
    type: 'website',
    url: 'https://thegiftshuffle.com/gifts/last-minute-mothers-day',
  },
  alternates: {
    canonical: 'https://thegiftshuffle.com/gifts/last-minute-mothers-day',
  },
};

const lastMinuteProducts = products
  .filter(
    (p) =>
      p.occasions?.includes('mothersFathers') ||
      p.topicTags?.includes('mothers-day') ||
      p.topicTags?.includes('for-mom') ||
      p.recipients.includes('mom')
  )
  .sort((a, b) => b.rating - a.rating || b.reviewCount - a.reviewCount)
  .slice(0, 24);

const faqs = [
  {
    q: "What are good last-minute Mother's Day gifts that ship fast?",
    a: "The best last-minute Mother's Day gifts are Amazon Prime-eligible products that arrive in 1-2 days: aromatherapy shower steamers, luxury spa gift sets, silk sleep masks, personalized name necklaces, jade face rollers, and skincare gift sets. These ship fast and feel genuinely thoughtful — not like a last-minute panic buy. Order by May 9 for standard Prime delivery by May 11.",
  },
  {
    q: "Can I still get a Mother's Day gift delivered on time?",
    a: "Yes — if you order today with Amazon Prime, most items will arrive by May 11. Check the estimated delivery window at checkout before placing your order. Same-day delivery is available in many metro areas for eligible products. Digital gift cards (spa experiences, restaurant credit, streaming subscriptions) are also an excellent option because they're instant.",
  },
  {
    q: "What last-minute Mother's Day gifts feel intentional and not rushed?",
    a: "The gifts that don't feel rushed are the ones that reflect her actual preferences: if she loves self-care, a premium shower steamer set or luxury spa box feels deliberate. If she's a skincare enthusiast, a La Roche-Posay or Sunday Riley gift set lands well. A personalized name necklace always feels chosen, not grabbed. Avoid generic bath sets from unknown brands — stick to recognizable quality.",
  },
  {
    q: "What are the best same-day or next-day Mother's Day gift ideas?",
    a: "For same-day delivery (check availability in your area): spa gift sets, candles, silk eye masks, and insulated tumblers are all frequently available. For next-day: shower steamer sets, personalized jewelry, skincare bundles, and silk pajamas. A digital gift card to a local spa, restaurant, or experience is delivered instantly and can be printed or texted. Don't overlook the Kindle gift card — it's genuinely useful and immediate.",
  },
  {
    q: "What's the latest I can order and still get a Mother's Day gift in time?",
    a: "Order by end of day May 9 with Amazon Prime for standard 2-day delivery by May 11. Same-day delivery orders must typically be placed before noon local time. If you're ordering May 10 or 11, go digital: a spa experience gift card, an Amazon gift card with a personal note, or a printed photo with a handwritten letter can all be assembled same-day and are often more meaningful than a rushed physical gift.",
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
  name: "Last-Minute Mother's Day Gifts 2026",
  description: "Top-rated Mother's Day gifts available with Amazon Prime fast shipping, curated by TheGiftShuffle",
  url: 'https://thegiftshuffle.com/gifts/last-minute-mothers-day',
  numberOfItems: lastMinuteProducts.length,
  itemListElement: lastMinuteProducts.map((p, i) => ({
    '@type': 'ListItem',
    position: i + 1,
    name: p.name,
    description: p.description,
    url: p.affiliateUrl,
  })),
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://thegiftshuffle.com' },
    { '@type': 'ListItem', position: 2, name: "Mother's Day Gifts", item: 'https://thegiftshuffle.com/mothers-day-gifts' },
    { '@type': 'ListItem', position: 3, name: 'Last-Minute Gifts', item: 'https://thegiftshuffle.com/gifts/last-minute-mothers-day' },
  ],
};

export default function GiftsLastMinuteMothersDayPage() {
  return (
    <div className="min-h-screen flex flex-col" style={{ background: '#FFFAF5' }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <Navbar />
      <Breadcrumbs
        items={[
          { label: "Mother's Day Gifts", href: '/mothers-day-gifts' },
          { label: 'Last-Minute Gifts', href: '/gifts/last-minute-mothers-day' },
        ]}
      />

      <main id="main-content" className="flex-1">
        {/* Urgency Hero */}
        <section className="max-w-5xl mx-auto px-4 pt-8 pb-6 text-center">
          {/* Urgency badge */}
          <div className="inline-flex items-center gap-2 bg-red-50 border border-red-200 rounded-full px-4 py-1.5 mb-5">
            <span className="text-red-600 font-bold text-sm">Mother&apos;s Day is May 11</span>
            <span className="text-red-400 text-sm">— Order by May 9 for guaranteed delivery</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold mb-4" style={{ color: '#1A202C' }}>
            Last-Minute Mother&apos;s Day Gifts 2026
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed mb-3">
            You still have time. These top-rated picks are available with Amazon Prime and can arrive before
            Mother&apos;s Day with 2-day shipping. Sorted by highest rating so you can order fast and still give
            something she will genuinely love.
          </p>
          <p className="text-sm text-gray-500 max-w-xl mx-auto">
            Tip: Check the estimated delivery date at checkout before placing your order. Same-day delivery
            is available for some items in select metro areas.
          </p>
        </section>

        {/* Inline Shuffle */}
        <section className="max-w-5xl mx-auto px-4 py-6">
          <InlineShuffle products={lastMinuteProducts} heading="Shuffle Last-Minute Picks" />
        </section>

        {/* Product Grid */}
        <section className="max-w-5xl mx-auto px-4 py-8">
          <h2 className="text-2xl font-bold mb-2" style={{ color: '#1A202C' }}>
            Top-Rated Picks That Ship Before May 11
          </h2>
          <p className="text-sm text-gray-500 mb-6">
            Sorted by customer rating. Most are Prime-eligible with 2-day delivery.
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {lastMinuteProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>

        {/* Answer-first intro for AEO */}
        <section className="max-w-3xl mx-auto px-4 py-8 border-t border-gray-100">
          <h2 className="text-2xl font-bold mb-4" style={{ color: '#1A202C' }}>
            The Best Last-Minute Mother&apos;s Day Gifts That Still Feel Thoughtful
          </h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            <strong>The short answer:</strong> aromatherapy shower steamers, premium spa gift sets, silk sleep masks,
            skincare bundles, and personalized jewelry are the best last-minute Mother&apos;s Day gifts in 2026.
            All ship fast with Amazon Prime and none of them look last-minute.
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            Here is the thing about last-minute gifting: it does not have to mean low-effort. A curated spa gift
            set with a bath bomb, face mask, and eye patches arrives in the same two-day window as a forgettable
            candle — the difference is that one of them looks like you thought about it. A 30-pack of aromatherapy
            shower steamers with a handwritten note beats a generic gift basket every time.
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            The safest last-minute categories: self-care (shower steamers, spa sets, skincare), cozy comfort
            (satin pajamas, silk sleep mask, weighted eye pillow), and personalized pieces (name necklace,
            birthstone bracelet). All of these read as intentional even when they weren&apos;t.
          </p>
          <p className="text-gray-700 leading-relaxed">
            If you&apos;re ordering after May 9: go digital. A gift card to a local spa, a restaurant she loves,
            or a streaming service she&apos;d actually use — delivered instantly, printed out with a real note,
            tucked into an envelope. Sometimes the most personal gift is the one that says &ldquo;I want you to
            spend a whole afternoon doing exactly what you want.&rdquo;
          </p>
        </section>

        {/* CTA */}
        <section className="bg-white py-12 px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl font-bold mb-4" style={{ color: '#1A202C' }}>
              Can&apos;t Decide Fast Enough?
            </h2>
            <p className="text-gray-600 mb-6">
              Answer two questions in TheGiftShuffle and get a personalized pick in seconds. No scrolling,
              no indecision — just order.
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
            Last-Minute Mother&apos;s Day Gift FAQs
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
          <h2 className="text-xl font-bold mb-4" style={{ color: '#1A202C' }}>More Mother&apos;s Day Gift Guides</h2>
          <div className="flex flex-wrap gap-3">
            {[
              { href: '/mothers-day-gifts', label: "All Mother's Day Gifts" },
              { href: '/last-minute-mothers-day-gifts', label: "Last-Minute Gifts (Fast Ship)" },
              { href: '/mothers-day-gifts-for-wife', label: "Mother's Day Gifts for Wife" },
              { href: '/mothers-day-gifts-under-50', label: "Mother's Day Gifts Under $50" },
              { href: '/mothers-day-gifts-under-100', label: "Mother's Day Gifts Under $100" },
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
