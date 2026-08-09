import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import Navbar from '@/components/Navbar';
import InlineShuffle from '@/components/InlineShuffle';
import Breadcrumbs from '@/components/Breadcrumbs';
import ProductCard from '@/components/ProductCard';
import { curate, shufflePool, ALL } from '@/lib/giftSelect';

export const metadata: Metadata = {
  title: 'Birthday Gift Ideas for 2026: The Best Picks for Every Person & Budget | TheGiftShuffle',
  description:
    'Birthday gift ideas for every person and budget: what to get someone for their birthday, sorted by recipient, with top-rated ranked picks for her, him, teens, friends and parents, plus an instant gift-picker tool.',
  keywords: [
    'birthday gift ideas',
    'birthday gift ideas 2026',
    'birthday gifts',
    'unique birthday gifts',
    'best birthday gifts',
    'birthday gifts for adults',
    'birthday gift ideas for her',
    'birthday gift ideas for him',
    'birthday gifts under $50',
    'last minute birthday gifts',
  ],
  openGraph: {
    title: 'Birthday Gift Ideas for 2026: The Best Picks for Every Person & Budget | TheGiftShuffle',
    description:
      'The best birthday gift ideas for 2026, sorted by recipient and budget, plus an instant gift-picker tool.',
    type: 'website',
    url: 'https://www.thegiftshuffle.com/birthday-gift-ideas',
    images: [
      {
        url: 'https://www.thegiftshuffle.com/api/og?title=Birthday%20Gift%20Ideas%20%7C%20TheGiftShuffle',
        width: 1200,
        height: 630,
      },
    ],
  },
  alternates: {
    canonical: 'https://www.thegiftshuffle.com/birthday-gift-ideas',
  },
};

// Ranked, quality birthday picks from the full combined catalog.
const isBirthday = (p: { occasions?: string[] }) => !!p.occasions?.includes('birthday');
const birthdayProducts = curate({ match: isBirthday, minRating: 4.5, sort: 'social', recipientCap: 8, limit: 40, pool: ALL });
const shuffle = shufflePool(isBirthday, ALL);

// Scannable "by recipient" reference (AEO-friendly + internal links to the pages
// that already rank).
const byRecipient = [
  { label: 'For Her', gifts: 'A silk pillowcase, a designer fragrance, a personalized necklace, or a plush spa robe.', href: '/best-gifts-for-her-2026', link: 'Best birthday gifts for her' },
  { label: 'For Him', gifts: 'Noise-canceling headphones, a whiskey decanter set, a leather dopp kit, or a smart watch.', href: '/gift-ideas-for-him', link: 'Birthday gift ideas for him' },
  { label: 'For Teens', gifts: 'Wireless earbuds, LED strip lights, an instant camera, or a portable speaker.', href: '/gift-ideas-for-teens', link: 'Gift ideas for teens' },
  { label: 'For a Best Friend', gifts: 'A luxury candle, a funny mug, a wine-tasting set, or a cozy blanket.', href: '/gift-ideas-for-friends', link: 'Gift ideas for friends' },
  { label: 'For Mom', gifts: 'An Ember mug, a weighted blanket, a jewelry box, or a birth-flower necklace.', href: '/gift-ideas-for-mom', link: 'Gift ideas for mom' },
  { label: 'For Dad', gifts: 'A grilling tool set, a nice bourbon glass set, headphones, or a leather wallet.', href: '/gift-ideas-for-dad', link: 'Gift ideas for dad' },
  { label: 'For a Coworker', gifts: 'A premium candle, a desk organizer, gourmet coffee, or a nice tumbler.', href: '/gifts-for-coworkers', link: 'Gifts for coworkers' },
  { label: 'For a Gamer', gifts: 'A wireless headset, RGB LED strips, a mechanical keyboard, or a stream deck.', href: '/birthday-gifts-for-gamers', link: 'Birthday gifts for gamers' },
];

const byBudget = [
  { label: 'Under $25', gifts: 'A scented candle, cozy socks, a bestselling book, an enamel mug, or a fun card game.', href: '/gifts-under-25', link: 'Gifts under $25' },
  { label: 'Under $50', gifts: 'A personalized necklace, wireless earbuds, a Bluetooth speaker, or an instant camera.', href: '/gifts-under-50', link: 'Gifts under $50' },
  { label: 'Under $100', gifts: 'A percussion massage gun, an Ember mug, a weighted blanket, or a smart-home device.', href: '/gifts-under-100', link: 'Gifts under $100' },
  { label: 'A Real Splurge', gifts: 'Premium noise-canceling headphones, a smart watch, fine jewelry, or an experience.', href: '/best-luxury-gifts-2026', link: 'Luxury gift ideas' },
];

const faqs = [
  {
    q: 'What are the best birthday gift ideas for 2026?',
    a: "The best birthday gift ideas for 2026 are things people want but rarely buy for themselves: a percussion massage gun, an Ember temperature-control mug, a Kindle Paperwhite, noise-canceling headphones, a cozy weighted blanket, or a personalized name necklace. The gift that never misses is one matched to a single thing you know about them, a hobby, a daily annoyance, or a small luxury they would not splurge on.",
  },
  {
    q: 'What should I get someone for their birthday?',
    a: 'Start from one specific thing about them and upgrade it: a hobby, a daily frustration, or a treat they would not buy themselves. If you are genuinely stuck, safe crowd-pleasers work well: a premium candle, wireless earbuds, an insulated tumbler, a cozy blanket, or a bestselling book. Matching the gift to the person beats matching it to the occasion every time.',
  },
  {
    q: 'What are good birthday gift ideas for adults?',
    a: 'Adults appreciate practical upgrades and small luxuries over novelty: noise-canceling headphones, an Ember temperature-control mug, a percussion massage gun, a nice fragrance or candle, a weighted blanket, or a quality leather accessory. Pick the category they already care about and give them a better version than they would buy themselves.',
  },
  {
    q: 'What are good birthday gifts to get yourself?',
    a: 'A birthday is the perfect excuse for the small upgrade you keep skipping: wireless earbuds, a percussion massage gun, a silk pillowcase, an Ember mug, a nice fragrance, or a hobby tool you have been eyeing. Pick the thing you would love but keep talking yourself out of buying.',
  },
  {
    q: 'What are good birthday gift ideas for her?',
    a: 'Good birthday gifts for her blend a little luxury with everyday use: a silk pillowcase, a designer fragrance like Viktor & Rolf Flowerbomb, a personalized birth-flower necklace, a plush spa robe, or a premium candle. Tie it to something she already loves and it always feels considered.',
  },
  {
    q: 'What are good birthday gift ideas for him?',
    a: 'Men consistently like practical upgrades: noise-canceling headphones, a whiskey decanter or bourbon glass set, a leather dopp kit or wallet, a smart watch, or a grilling tool set. Skip novelty and upgrade something he already uses.',
  },
  {
    q: "What's a good birthday gift for someone who has everything?",
    a: "For someone who has everything, go experiential or hyper-personal: a cooking or whiskey-tasting class, concert tickets, a custom star map of their birth date, a monogrammed leather piece, or a premium upgrade to a daily ritual like an Ember mug. These feel fresh because they are unique to them or a memory rather than another object.",
  },
  {
    q: 'What are unique birthday gift ideas?',
    a: "Unique birthday gifts people remember: an Oura Ring sleep tracker, a custom night-sky map of their birth date, a red-light therapy wand, an instant camera, an indoor hydroponic herb garden, or a premium whiskey decanter set. They stand out precisely because most people default to a gift card.",
  },
  {
    q: 'What are good birthday gifts under $50?',
    a: 'Great birthday gifts under $50 include a personalized name necklace, wireless earbuds, a portable Bluetooth speaker, an aromatherapy diffuser, a cozy sherpa blanket, an instant camera, or a premium candle set. Choose something tied to what they love and it will feel intentional.',
  },
  {
    q: "What's a cheap but thoughtful birthday gift?",
    a: 'Cheap-but-thoughtful means personal, not generic: a candle in a scent they love, their favorite specialty coffee or tea, a bestselling book in a genre they read, cozy socks, or a framed photo. Under $25, thoughtfulness comes from specificity, not price.',
  },
  {
    q: 'What do you get someone for their birthday when you barely know them?',
    a: 'For someone you barely know, stay on safe, universal ground: a nice candle, gourmet chocolate or coffee, a quality insulated tumbler, or a bestselling book. Avoid anything that assumes strong personal taste, like clothing, strong fragrances, or very specific decor.',
  },
  {
    q: 'What are good milestone birthday gifts (30th, 40th, 50th)?',
    a: 'For a milestone birthday, upgrade the centerpiece of a hobby or daily life, or make it sentimental: a flagship watch or piece of jewelry, a custom star map of their birth year, an experience like a getaway or tasting, or a high-end version of something they use every day.',
  },
  {
    q: "What's a good last-minute birthday gift?",
    a: 'For a last-minute birthday gift that still lands, go for fast-shipping crowd-pleasers (an insulated tumbler, a candle set, a cozy blanket) or something digital that arrives instantly: an experience gift card, a streaming subscription, or an Amazon gift card paired with a handwritten note.',
  },
  {
    q: 'How is TheGiftShuffle different from other birthday gift guides?',
    a: 'Most birthday gift guides are long static lists you scroll top to bottom. TheGiftShuffle is interactive: tap Shuffle for an instant, top-rated pick matched to the recipient and your budget, pin the ones you like, and use Back to revisit any you passed. It turns scrolling a giant list into a one-click decision.',
  },
];

const itemListSchema = {
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  name: 'Birthday Gift Ideas',
  description: 'Curated, ranked birthday gift ideas for every person and budget by TheGiftShuffle',
  url: 'https://www.thegiftshuffle.com/birthday-gift-ideas',
  numberOfItems: birthdayProducts.length,
  itemListElement: birthdayProducts.map((p, i) => ({
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

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map((f) => ({
    '@type': 'Question',
    name: f.q,
    acceptedAnswer: { '@type': 'Answer', text: f.a },
  })),
};

export default function BirthdayGiftIdeasPage() {
  return (
    <div className="min-h-screen flex flex-col" style={{ background: '#FFFAF5' }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <Navbar />
      <Breadcrumbs items={[{ label: 'Birthday Gift Ideas', href: '/birthday-gift-ideas' }]} />

      <main id="main-content" className="flex-1">
        {/* Hero image */}
        <section className="max-w-5xl mx-auto px-4 pt-8">
          <div className="relative w-full rounded-2xl overflow-hidden" style={{ aspectRatio: '3/2', maxHeight: '420px' }}>
            <Image
              src="/images/heroes/birthday-gift-ideas.jpg"
              alt="Wrapped birthday gifts with balloons and confetti"
              fill
              className="object-cover"
              priority
              unoptimized
            />
          </div>
        </section>

        {/* Hero + lift-able answer block */}
        <section className="max-w-3xl mx-auto px-4 pt-8 pb-2 text-center">
          <h1 className="text-4xl sm:text-5xl font-extrabold mb-5 leading-tight" style={{ color: '#1A202C' }}>
            Birthday Gift Ideas for 2026
          </h1>
          <p className="text-lg text-gray-700 leading-relaxed mb-3">
            The <strong>best birthday gift ideas for 2026</strong> are things people genuinely want
            but rarely buy for themselves: a percussion massage gun, an Ember temperature-control
            mug, a Kindle Paperwhite, noise-canceling headphones, a cozy weighted blanket, or a
            personalized name necklace. The gift that never misses is one matched to a single thing
            you know about them, a hobby, a daily annoyance, or a small luxury they would not splurge on.
          </p>
          <p className="text-base text-gray-600 leading-relaxed">
            Not sure where to start? Tell TheGiftShuffle who it is for and your budget for an instant,
            top-rated pick in one click, or browse the ideas <strong>by recipient</strong> and{' '}
            <strong>by budget</strong> below.
          </p>
        </section>

        {/* Lift-able AEO answer block */}
        <section className="max-w-3xl mx-auto px-4 py-6">
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-[#E2E8F0]">
            <h2 className="text-2xl font-bold mb-3" style={{ color: '#1A202C' }}>
              What Should I Get Someone for Their Birthday?
            </h2>
            <p className="text-gray-700 leading-relaxed">
              Start with one thing you know about them, a hobby, a daily annoyance, or a small
              luxury they would not buy themselves, and upgrade it. If you are truly stuck, safe and
              near-universal wins are a <strong>premium candle</strong>, an{' '}
              <strong>insulated tumbler</strong>, <strong>wireless earbuds</strong>, a{' '}
              <strong>cozy blanket</strong>, or a <strong>bestselling book</strong>. Match the gift
              to the person rather than the occasion and it always lands. The 40 picks on this page
              hold a <strong>4.7-star average across more than 3.4 million verified Amazon
              reviews</strong> combined, so every option is crowd-tested. Use the shuffle below to
              get an instant, top-rated pick for exactly who you are shopping for.
            </p>
          </div>
        </section>

        {/* By recipient */}
        <section className="max-w-5xl mx-auto px-4 py-8">
          <h2 className="text-2xl font-bold mb-6" style={{ color: '#1A202C' }}>Birthday Gift Ideas by Recipient</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {byRecipient.map((r) => (
              <div key={r.label} className="bg-white rounded-2xl p-5 shadow-sm border border-[#E2E8F0]">
                <h3 className="font-bold text-[#1A202C] mb-1">{r.label}</h3>
                <p className="text-gray-600 text-sm leading-relaxed mb-2">{r.gifts}</p>
                <Link href={r.href} className="text-[#F04E30] text-sm font-semibold hover:underline">
                  {r.link} &rarr;
                </Link>
              </div>
            ))}
          </div>
        </section>

        {/* By budget */}
        <section className="max-w-5xl mx-auto px-4 py-8">
          <h2 className="text-2xl font-bold mb-6" style={{ color: '#1A202C' }}>Birthday Gift Ideas by Budget</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {byBudget.map((b) => (
              <div key={b.label} className="bg-white rounded-2xl p-5 shadow-sm border border-[#E2E8F0]">
                <h3 className="font-bold text-[#1A202C] mb-1">{b.label}</h3>
                <p className="text-gray-600 text-sm leading-relaxed mb-2">{b.gifts}</p>
                <Link href={b.href} className="text-[#F04E30] text-sm font-semibold hover:underline">
                  {b.link} &rarr;
                </Link>
              </div>
            ))}
          </div>
        </section>

        {/* Inline Shuffle */}
        <section className="max-w-5xl mx-auto px-4 py-6">
          <InlineShuffle products={shuffle} heading="Shuffle Birthday Gift Picks" />
        </section>

        {/* Product Grid */}
        <section className="max-w-5xl mx-auto px-4 py-8">
          <h2 className="text-2xl font-bold mb-6" style={{ color: '#1A202C' }}>
            {birthdayProducts.length} Top-Rated Birthday Gifts, Ranked
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {birthdayProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>

        {/* How TheGiftShuffle Works */}
        <section className="bg-white py-12 px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl font-bold mb-4" style={{ color: '#1A202C' }}>
              Still Stuck? Let TheGiftShuffle Pick
            </h2>
            <p className="text-gray-600 mb-6">
              No endless scrolling. Tell us who the birthday is for and your budget, and get an
              instant, top-rated birthday gift idea in one click. Shuffle again until one feels right.
            </p>
            <Link
              href="/shuffle"
              className="inline-block bg-[#F04E30] text-white font-bold px-10 py-4 rounded-full hover:opacity-90 transition-opacity text-lg"
            >
              Try the Gift Shuffle &rarr;
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
              { href: '/best-birthday-gifts-2026', label: 'Best Birthday Gifts 2026' },
              { href: '/unique-birthday-gifts', label: 'Unique Birthday Gifts' },
              { href: '/birthday-gifts-for-gamers', label: 'Birthday Gifts for Gamers' },
              { href: '/best-gifts-for-her-2026', label: 'Best Gifts for Her' },
              { href: '/gift-ideas-for-him', label: 'Gift Ideas for Him' },
              { href: '/help-me-pick-a-gift', label: 'Help Me Pick a Gift' },
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
