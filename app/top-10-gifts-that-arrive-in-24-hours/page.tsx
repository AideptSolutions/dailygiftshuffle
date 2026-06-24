import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import Navbar from '@/components/Navbar';
import Breadcrumbs from '@/components/Breadcrumbs';
import InlineShuffle from '@/components/InlineShuffle';
import { products } from '@/data/products';

export const metadata: Metadata = {
  title: "Top 10 Gifts That Arrive in 24 Hours or Less | TheGiftShuffle",
  description:
    "Need a last-minute gift fast? Ten ideas that arrive within 24 hours, with prices and the kind of person each one is actually for.",
  keywords: [
    'gifts that arrive in 24 hours',
    'last minute gifts that arrive fast',
    'gifts delivered next day',
    'same day gift delivery',
    'last minute gift ideas',
  ],
  openGraph: {
    title: "Top 10 Gifts That Arrive in 24 Hours or Less | TheGiftShuffle",
    description:
      "You forgot. It happens. Ten options that reliably land at the recipient's door (or inbox) within 24 hours.",
    type: 'website',
    url: 'https://www.thegiftshuffle.com/top-10-gifts-that-arrive-in-24-hours',
  },
  alternates: {
    canonical: 'https://www.thegiftshuffle.com/top-10-gifts-that-arrive-in-24-hours',
  },
};

const gifts = [
  {
    rank: 1,
    name: 'A Same-Day Flower Delivery From a Local Florist',
    why: 'Skip the big national flower sites; their orders get bounced to local florists anyway. Search Google Maps for actual shops in the neighborhood, call before noon, and most independents will hand-deliver the same afternoon.',
    bestFor: "Anyone whose Tuesday could use a small surprise on the kitchen counter.",
    price: '$50 to $120 for a hand-arranged delivery',
    link: null,
  },
  {
    rank: 2,
    name: 'An e-Gift Card to a Specific Restaurant or Coffee Shop',
    why: 'Generic Amazon cards feel like an apology. A $40 card to the recipient\'s actual favorite ramen place or coffee bar, sent through Toast, Square, or the restaurant\'s own site, lands in their inbox in minutes and tells them you remembered the spot.',
    bestFor: "Friends with a go-to spot, coworkers you have grabbed lunch with.",
    price: '$25 to $75',
    link: 'https://www.toasttab.com',
  },
  {
    rank: 3,
    name: 'A Bottle of Wine Delivered the Same Afternoon',
    why: 'Drizly, Saucey, and Instacart still run same-day alcohol delivery in most US cities, typically within two hours. Pair a mid-range bottle with a one-line note typed at checkout and the whole transaction is done in eight minutes.',
    bestFor: 'Hosts, dinner-party invitations you forgot about, congratulations gifts.',
    price: '$30 to $80 plus delivery fee',
    link: 'https://drizly.com',
  },
  {
    rank: 4,
    name: 'A Curated Spotify or Apple Music Playlist Plus a Subscription Code',
    why: 'Build a playlist around a specific shared memory and gift a month or year of premium streaming through the platform itself. The playlist itself takes 20 minutes; the subscription code lands by email immediately.',
    bestFor: 'Long-distance friends, partners with a shared story you can tell in songs.',
    price: '$11 to $120 depending on the subscription length',
    link: 'https://www.spotify.com',
  },
  {
    rank: 5,
    name: 'An Audible Credit Plus a Specific Book Recommendation',
    why: 'Audible offers a send-a-credit feature that emails one full audiobook credit. Add a short note picking the exact book they should use it on, and you have moved from generic card to a friend recommending the next thing.',
    bestFor: 'Parents in a carpool phase of life, anyone who walks dogs or commutes.',
    price: '$15 per credit',
    link: 'https://www.audible.com',
  },
  {
    rank: 6,
    name: 'A Same-Day Cake or Pastry From a Local Bakery',
    why: 'Most bakeries will hold a cake at the counter for pickup the same day, and many will arrange delivery through DoorDash or Uber direct if you call. A small layer cake from a local bakery beats a chain grocery cake every time.',
    bestFor: 'Birthdays you forgot about until that morning.',
    price: '$25 to $90 plus delivery',
    link: null,
  },
  {
    rank: 7,
    name: 'A Tear-Open Hand-Written Card via Postable or Felt',
    why: 'Postable and Felt let you write a real, hand-feel-printed card from your phone, with your own typed words, and they ship out same business day.',
    bestFor: 'Family members, far-away friends, retirement gifts that need a paper component.',
    price: '$5 to $15 per card',
    link: 'https://www.postable.com',
  },
  {
    rank: 8,
    name: 'A Photo Print Bundle From Walgreens or CVS Same-Day Pickup',
    why: 'You can upload pictures from your phone to Walgreens or CVS Photo and have a stack of glossy 4x6 prints ready at the nearest store inside an hour. Bundle them with a $3 cardboard photo book and the whole gift costs under $25.',
    bestFor: 'Grandparents, parents of new babies, a friend who just moved.',
    price: '$15 to $30',
    link: 'https://photo.walgreens.com',
  },
  {
    rank: 9,
    name: 'A Same-Day Etsy Order With "Ready to Ship" Filter',
    why: 'Under "Ready to ship in 1 day," sellers commit to dropping the order in the mail within 24 hours, and many use overnight shipping. Stick to that filter and skip anything labeled "made to order."',
    bestFor: 'People who want something one-of-a-kind without paying customization time.',
    price: '$20 to $150 plus expedited shipping',
    link: 'https://www.etsy.com',
  },
  {
    rank: 10,
    name: 'A Donation in Their Name to a Cause They Already Talk About',
    why: 'For the recipient who has everything, a donation in their name lands instantly by email. Match the cause to something they actually mention. Generic donations can feel hollow; specific ones do not.',
    bestFor: 'Relatives who say "do not buy me anything," milestone birthdays, hosts who already have too much stuff.',
    price: 'Anything from $25 to whatever fits',
    link: null,
  },
];

const shufflePool = products.filter(
  (p) => p.recipients?.includes('friends') || p.recipients?.includes('her') || p.recipients?.includes('him'),
);

const faqs = [
  {
    q: "What is the fastest gift I can send right now?",
    a: "A digital gift card, audiobook credit, or charitable donation sent through email arrives in minutes. For something physical, a local florist or alcohol delivery service like Drizly typically lands within two to four hours in metro areas.",
  },
  {
    q: "Are same-day Amazon Prime gifts a good idea?",
    a: "Same-day Prime works in some metros and not others, and the gifts trend generic. For someone you care about, a hand-arranged item from a local shop usually feels more personal at a similar price.",
  },
  {
    q: "Can I send a real handwritten card same day?",
    a: "Yes, through services like Postable and Felt, which print cards in your own typed words and mail them same business day. Delivery is one to three days depending on the recipient's location.",
  },
  {
    q: "What is a thoughtful last-minute gift under $30?",
    a: "A specific-restaurant e-gift card paired with a personal note, a Walgreens photo bundle, or a small Drizly delivery all fit under $30 and reliably arrive within 24 hours.",
  },
];

const itemListSchema = {
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  name: "Top 10 Gifts That Arrive in 24 Hours or Less",
  url: 'https://www.thegiftshuffle.com/top-10-gifts-that-arrive-in-24-hours',
  numberOfItems: 10,
  itemListElement: gifts.map((g, i) => ({
    '@type': 'ListItem',
    position: i + 1,
    name: g.name,
    description: g.why,
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

export default function Gifts24HoursPage() {
  return (
    <div className="min-h-screen flex flex-col" style={{ background: '#FFFAF5' }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <Navbar />
      <Breadcrumbs items={[{ label: 'Top 10 Gifts That Arrive in 24 Hours', href: '/top-10-gifts-that-arrive-in-24-hours' }]} />

      <main id="main-content" className="flex-1">
        {/* Hero image */}
        <section className="max-w-5xl mx-auto px-4 pt-8">
          <div className="relative w-full rounded-2xl overflow-hidden" style={{ aspectRatio: '3/2', maxHeight: '420px' }}>
            <Image
              src="/images/heroes/top-10-gifts-that-arrive-in-24-hours.jpg"
              alt="A fast-delivery gift package at the front door"
              fill
              className="object-cover"
              priority
              unoptimized
            />
          </div>
        </section>
        {/* SEO Blurb */}
        <section className="max-w-3xl mx-auto px-4 pt-10 pb-2 text-center">
          <h1 className="text-4xl sm:text-5xl font-extrabold mb-5 leading-tight" style={{ color: '#1A202C' }}>
            Top 10 Gifts That Arrive in 24 Hours or Less
          </h1>
          <p className="text-base sm:text-lg text-gray-700 leading-relaxed mb-3">
            You forgot. It happens. Anniversary, birthday, the friend who flew in unexpectedly, the
            colleague whose retirement lunch is tomorrow. The good news is that the gifting world has
            quietly built an entire infrastructure around the same-day and next-day window.
          </p>
          <p className="text-base text-gray-600 leading-relaxed">
            This list focuses on ten options that reliably land at the recipient&apos;s door (or inbox)
            within a day. Where digital options are involved, they arrive in minutes. The trick is
            knowing which routes actually deliver inside 24 hours, and which ones promise the moon
            and ship from a warehouse in Ohio.
          </p>
        </section>

        {/* Disclosure */}
        <section className="max-w-3xl mx-auto px-4 pt-4">
          <p className="text-xs text-gray-400 italic text-center">
            As an Amazon Associate, Daily Gift Shuffle earns from qualifying purchases. We may earn
            a small commission at no additional cost to you. Pricing was current at time of writing
            and may change.
          </p>
        </section>

        {/* Gift List */}
        <section className="max-w-3xl mx-auto px-4 py-8">
          <ol className="flex flex-col gap-5">
            {gifts.map((g) => (
              <li key={g.rank}>
                <div className="flex items-start gap-4 rounded-2xl border border-[#E2E8F0] bg-white p-5 shadow-sm">
                  <span
                    className="flex-shrink-0 w-9 h-9 rounded-full flex items-center justify-center text-sm font-extrabold text-white mt-0.5"
                    style={{ background: '#F04E30' }}
                  >
                    {g.rank}
                  </span>
                  <div className="flex-1 min-w-0">
                    <p className="text-base font-bold text-gray-900 leading-snug mb-1">{g.name}</p>
                    <p className="text-sm text-gray-600 leading-relaxed mb-2">{g.why}</p>
                    <p className="text-xs text-gray-500 mb-1">
                      <strong className="text-gray-700">Best for:</strong> {g.bestFor}
                    </p>
                    <p className="text-sm font-bold" style={{ color: '#1A202C' }}>{g.price}</p>
                    {g.link && (
                      <a
                        href={g.link}
                        target="_blank"
                        rel="noopener noreferrer sponsored"
                        className="inline-block mt-2 text-xs font-bold text-white px-4 py-1.5 rounded-full"
                        style={{ background: '#F04E30' }}
                      >
                        View Option
                      </a>
                    )}
                  </div>
                </div>
              </li>
            ))}
          </ol>
        </section>

        {/* Tips Section */}
        <section className="max-w-3xl mx-auto px-4 py-6 border-t border-[#E2E8F0]">
          <h2 className="text-2xl font-bold mb-4" style={{ color: '#1A202C' }}>How to Pull This Off Without Looking Like You Forgot</h2>
          <ol className="space-y-2 list-decimal list-inside text-gray-700 text-base">
            <li>Include something concrete in the note (a memory, a date, the name of their dog). Generic happy birthday reads as panicked.</li>
            <li>Confirm the delivery window before you click pay. Drizly delivery cuts off at 9 p.m. local in most cities; floral shops often want orders before 1 p.m. for same-day.</li>
            <li>Pair a digital gift with a physical or scheduled component if the budget allows; a Spotify subscription plus a $25 cafe card lands warmer than either alone.</li>
            <li>Save a go-bag of last-minute options. Bookmark the local florist, the bakery, the bottle shop now. Future you, in a panic at 11 a.m., will thank you.</li>
          </ol>
        </section>

        {/* Shuffle Widget */}
        <section className="max-w-3xl mx-auto px-4 py-8 border-t border-[#E2E8F0]">
          <p className="text-gray-600 text-sm mb-5">
            Still looking for the right idea? Use the shuffle below to browse the full gift catalog.
          </p>
          <InlineShuffle products={shufflePool} heading="More Gift Ideas" />
        </section>

        {/* FAQ */}
        <section className="max-w-3xl mx-auto px-4 py-10">
          <h2 className="text-2xl font-bold mb-6" style={{ color: '#1A202C' }}>Frequently Asked Questions</h2>
          <div className="space-y-4">
            {faqs.map((faq) => (
              <div key={faq.q} className="bg-white rounded-2xl p-6 shadow-sm border border-[#E2E8F0]">
                <h3 className="font-bold text-[#1A202C] mb-2">{faq.q}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Internal Links */}
        <section className="max-w-3xl mx-auto px-4 pb-12">
          <h2 className="text-lg font-bold mb-4" style={{ color: '#1A202C' }}>Related Gift Guides</h2>
          <div className="flex flex-wrap gap-3">
            {[
              { href: '/top-10-gifts-for-grandparents-who-have-everything', label: 'Gifts for Grandparents' },
              { href: '/gifts-under-25', label: 'Gifts Under $25' },
              { href: '/gifts-under-50', label: 'Gifts Under $50' },
              { href: '/gift-ideas-for-friends', label: 'Gift Ideas for Friends' },
              { href: '/gift-ideas-for-him', label: 'Gift Ideas for Him' },
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
