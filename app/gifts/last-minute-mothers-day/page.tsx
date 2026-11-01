import type { Metadata } from 'next';
import Link from 'next/link';
import GuideLinkCards from '@/components/GuideLinkCards';
import Navbar from '@/components/Navbar';
import Breadcrumbs from '@/components/Breadcrumbs';
import { products } from '@/data/products';
import ProductCard from '@/components/ProductCard';
import InlineShuffle from '@/components/InlineShuffle';

export const metadata: Metadata = {
  title: "Last-Minute Mother's Day Gifts 2027 That Feel Thoughtful | TheGiftShuffle",
  description:
    "Running out of time? Top-rated last-minute Mother's Day gifts: spa sets, skincare, jewelry, plus digital gifts sent by email. Check the delivery estimate at checkout.",
  keywords: [
    "last minute mothers day gifts",
    "last minute mothers day gift ideas 2027",
    "last minute gift ideas for mom",
    "digital mothers day gifts",
  ],
  openGraph: {
    title: "Last-Minute Mother's Day Gifts 2027 That Feel Thoughtful | TheGiftShuffle",
    description:
      "Top-rated last-minute Mother's Day gifts, plus digital options sent by email.",
    type: 'website',
    url: 'https://www.thegiftshuffle.com/gifts/last-minute-mothers-day',
  },
  alternates: {
    canonical: 'https://www.thegiftshuffle.com/gifts/last-minute-mothers-day',
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
    q: "What are good last-minute Mother's Day gifts?",
    a: "Top-rated picks that feel chosen rather than grabbed: aromatherapy shower steamers, luxury spa gift sets, silk sleep masks, personalized name necklaces, jade face rollers, and skincare gift sets. Before you order, check the delivery estimate Amazon shows at checkout for her address.",
  },
  {
    q: "Can I still get a Mother's Day gift delivered on time?",
    a: "It depends on the item, the seller and her address, and we do not control shipping, so check the estimated delivery date at checkout before you place the order. If the estimate lands after Mother's Day, switch to a digital gift: a spa, restaurant or streaming gift card is delivered by email instead of shipped.",
  },
  {
    q: "What last-minute Mother's Day gifts feel intentional and not rushed?",
    a: "The gifts that don't feel rushed are the ones that reflect her actual preferences: if she loves self-care, a premium shower steamer set or luxury spa box feels deliberate. If she's a skincare enthusiast, a La Roche-Posay or Sunday Riley gift set lands well. A personalized name necklace always feels chosen, not grabbed. Avoid generic bath sets from unknown brands. Stick to recognizable quality.",
  },
  {
    q: "What if there is no time left to ship anything?",
    a: "Go digital or go local. A gift card to a local spa, restaurant, or experience is sent by email and can be printed or texted, and a Kindle gift card is genuinely useful. A florist or bakery near her can tell you what they can arrange.",
  },
  {
    q: "What's the latest I can order and still get a Mother's Day gift in time?",
    a: "There is no single cutoff: it depends on the item, the seller and where she lives, and the checkout page shows the estimated delivery date for your order. If that date lands after Mother's Day, go digital: a spa experience gift card, a gift card with a personal note, or a printed photo with a handwritten letter are often more meaningful than a rushed physical gift.",
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
  name: "Last-Minute Mother's Day Gifts 2027",
  description: "Top-rated last-minute Mother's Day gifts, curated by TheGiftShuffle",
  url: 'https://www.thegiftshuffle.com/gifts/last-minute-mothers-day',
  numberOfItems: lastMinuteProducts.length,
  itemListElement: lastMinuteProducts.map((p, i) => ({
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

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.thegiftshuffle.com' },
    { '@type': 'ListItem', position: 2, name: "Mother's Day Gifts", item: 'https://www.thegiftshuffle.com/mothers-day-gifts' },
    { '@type': 'ListItem', position: 3, name: 'Last-Minute Gifts', item: 'https://www.thegiftshuffle.com/gifts/last-minute-mothers-day' },
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
            <span className="text-red-600 font-bold text-sm">Mother&apos;s Day 2027 is Sunday, May 9</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold mb-4" style={{ color: '#1A202C' }}>
            Last-Minute Mother&apos;s Day Gifts 2027
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed mb-3">
            You still have time to choose well. These are the top-rated picks, sorted by rating so you can
            decide fast and still give something she will genuinely love.
          </p>
          <p className="text-sm text-gray-500 max-w-xl mx-auto">
            Tip: check the estimated delivery date at checkout before you place the order. Shipping is up to
            the seller; if the date looks tight, the digital ideas below are delivered by email.
          </p>
        </section>

        {/* Inline Shuffle */}
        <section className="max-w-5xl mx-auto px-4 py-6">
          <InlineShuffle products={lastMinuteProducts} heading="Shuffle Last-Minute Picks" />
        </section>

        {/* Product Grid */}
        <section className="max-w-5xl mx-auto px-4 py-8">
          <h2 className="text-2xl font-bold mb-2" style={{ color: '#1A202C' }}>
            Top-Rated Last-Minute Picks
          </h2>
          <p className="text-sm text-gray-500 mb-6">
            Sorted by customer rating. Check each item&apos;s delivery estimate on Amazon before you buy.
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
            skincare bundles, and personalized jewelry are the best last-minute Mother&apos;s Day gifts in 2027.
            None of them look last-minute.
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            Here is the thing about last-minute gifting: it does not have to mean low-effort. A curated spa gift
            set with a bath bomb, face mask, and eye patches costs about the same as a forgettable
            candle. The difference is that one of them looks like you thought about it. A 30-pack of aromatherapy
            shower steamers with a handwritten note beats a generic gift basket every time.
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            The safest last-minute categories: self-care (shower steamers, spa sets, skincare), cozy comfort
            (satin pajamas, silk sleep mask, weighted eye pillow), and personalized pieces (name necklace,
            birthstone bracelet). All of these read as intentional even when they weren&apos;t.
          </p>
          <p className="text-gray-700 leading-relaxed">
            If the delivery estimate lands after Mother&apos;s Day: go digital. A gift card to a local spa, a
            restaurant she loves, or a streaming service she&apos;d actually use, sent by email, printed out with a real note,
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
              no indecision, just order.
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
          <GuideLinkCards
            links={[
              { href: '/mothers-day-gifts', label: "All Mother's Day Gifts" },
              { href: '/last-minute-mothers-day-gifts', label: "More Last-Minute Mother's Day Gifts" },
              { href: '/mothers-day-gifts-for-wife', label: "Mother's Day Gifts for Wife" },
              { href: '/mothers-day-gifts-under-50', label: "Mother's Day Gifts Under $50" },
              { href: '/mothers-day-gifts-under-100', label: "Mother's Day Gifts Under $100" },
              { href: '/gift-ideas-for-mom', label: 'Gift Ideas for Mom' },
            ]}
          />
        </section>
      </main>
    </div>
  );
}
