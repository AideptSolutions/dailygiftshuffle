import type { Metadata } from 'next';
import GuideLinkCards from '@/components/GuideLinkCards';
import Image from 'next/image';
import Navbar from '@/components/Navbar';
import Breadcrumbs from '@/components/Breadcrumbs';
import InlineShuffle from '@/components/InlineShuffle';
import { products } from '@/data/products';

// Formerly /top-10-gifts-that-arrive-in-24-hours (301 in next.config.mjs).
// We do not control shipping or delivery, so this page never promises an
// arrival time: it describes how each gift gets there (by email, local pickup,
// a local shop) and sends shoppers to the seller's own delivery estimate.

export const metadata: Metadata = {
  title: "10 Last-Minute Gift Ideas for When You're Out of Time | TheGiftShuffle",
  description:
    "Out of time? Ten last-minute gift ideas that skip the shipping wait: gifts sent by email, local shops and in-store pickup, with prices and who each one suits.",
  keywords: [
    'last minute gift ideas',
    'last minute gifts',
    'digital gift ideas',
    'gifts you can send by email',
    'local gift ideas',
  ],
  openGraph: {
    title: "10 Last-Minute Gift Ideas for When You're Out of Time | TheGiftShuffle",
    description:
      'You forgot. It happens. Ten gift ideas that skip the warehouse: sent by email, picked up in person, or handled by a shop near them.',
    type: 'website',
    url: 'https://www.thegiftshuffle.com/last-minute-gift-ideas',
  },
  alternates: {
    canonical: 'https://www.thegiftshuffle.com/last-minute-gift-ideas',
  },
};

const gifts = [
  {
    rank: 1,
    name: 'Flowers From a Local Florist',
    why: 'Skip the big national flower sites; their orders get passed to local florists anyway. Find an actual shop near the recipient on Google Maps and call. The florist will tell you what they can arrange and when they deliver.',
    bestFor: 'Anyone whose Tuesday could use a small surprise on the kitchen counter.',
    price: '$50 to $120 for a hand-arranged bouquet',
    link: null,
  },
  {
    rank: 2,
    name: 'An e-Gift Card to a Specific Restaurant or Coffee Shop',
    why: "Generic cards feel like an apology. A $40 card to the recipient's actual favorite ramen place or coffee bar, bought on the restaurant's own site, is delivered by email instead of shipped, and it tells them you remembered the spot.",
    bestFor: 'Friends with a go-to spot, coworkers you have grabbed lunch with.',
    price: '$25 to $75',
    link: null,
  },
  {
    rank: 3,
    name: 'A Bottle of Wine From a Local Shop',
    why: "Pick a mid-range bottle from a bottle shop near them, or through a grocery or alcohol delivery app that serves their area. Add a one-line note at checkout. Delivery options and alcohol rules vary by city and state, so the app or shop is the place to check what's available.",
    bestFor: 'Hosts, dinner-party invitations you forgot about, congratulations gifts.',
    price: '$30 to $80 plus any delivery fee',
    link: null,
  },
  {
    rank: 4,
    name: 'A Curated Playlist Plus a Streaming Subscription',
    why: 'Build a playlist around a specific shared memory, then gift a few months of premium streaming. The playlist takes 20 minutes; the subscription is a digital gift, sent by email rather than shipped.',
    bestFor: 'Long-distance friends, partners with a shared story you can tell in songs.',
    price: '$11 to $120 depending on the subscription length',
    link: 'https://www.spotify.com',
  },
  {
    rank: 5,
    name: 'An Audiobook With a Specific Recommendation',
    why: 'Audible lets you send an audiobook or a membership as a gift by email. Add a short note on why you picked that exact book, and you have moved from generic card to a friend recommending the next thing.',
    bestFor: 'Parents in a carpool phase of life, anyone who walks dogs or commutes.',
    price: '$15 to $30 per book',
    link: 'https://www.audible.com',
  },
  {
    rank: 6,
    name: 'A Cake or Pastry From a Local Bakery',
    why: 'Call a bakery near the recipient and ask what they have in the case. Many will box something up for pickup, and some arrange delivery themselves or through a delivery app. A small layer cake from a local bakery beats a chain grocery cake every time.',
    bestFor: 'Birthdays you remembered the morning of.',
    price: '$25 to $90',
    link: null,
  },
  {
    rank: 7,
    name: 'A Real Card, Written From Your Phone',
    why: 'Postable and Felt let you write a card from your phone in your own words; they print it and mail it for you. Check the mailing options on their site when you order.',
    bestFor: 'Family members, far-away friends, retirement gifts that need a paper component.',
    price: '$5 to $15 per card',
    link: 'https://www.postable.com',
  },
  {
    rank: 8,
    name: 'A Photo Print Bundle Picked Up In Store',
    why: 'Upload pictures from your phone to Walgreens or CVS Photo and choose in-store pickup; the order page shows when it will be ready. Bundle the prints with a simple photo album and the whole gift costs under $25.',
    bestFor: 'Grandparents, parents of new babies, a friend who just moved.',
    price: '$15 to $30',
    link: 'https://photo.walgreens.com',
  },
  {
    rank: 9,
    name: 'A Ready-Made Etsy Find',
    why: 'Skip anything labeled made to order. Etsy lets you filter to items that are ready to ship, and each listing shows its processing time and shipping options at checkout, so you can see what fits before you buy.',
    bestFor: 'People who want something one-of-a-kind without waiting on customization.',
    price: '$20 to $150 plus shipping',
    link: 'https://www.etsy.com',
  },
  {
    rank: 10,
    name: 'A Donation in Their Name to a Cause They Already Talk About',
    why: 'For the recipient who has everything, a donation in their name comes with an emailed acknowledgment you can forward or print. Match the cause to something they actually mention. Generic donations can feel hollow; specific ones do not.',
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
    q: "What can I give if I'm completely out of time?",
    a: 'Skip shipping altogether. Gift cards, streaming subscriptions, audiobooks and donations are delivered by email instead of shipped. For something physical, buy from a shop near the recipient (a florist, a bakery, a bottle shop) or use in-store pickup for photo prints.',
  },
  {
    q: 'Are fast-shipping gifts from big retailers a good idea?',
    a: "They can work, but delivery options depend on the item and the address, and the gifts trend generic. The retailer's checkout shows the delivery estimate for your order. For someone you care about, something from a local shop usually feels more personal at a similar price.",
  },
  {
    q: 'Can I still send a real handwritten card?',
    a: 'Yes. Postable and Felt print a card in your own words and mail it for you. Their sites show the mailing options when you order.',
  },
  {
    q: 'What is a thoughtful last-minute gift under $30?',
    a: 'A gift card to their favorite restaurant with a personal note, a photo print bundle picked up in store, or a treat from a local bakery all fit under $30.',
  },
];

const itemListSchema = {
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  name: "10 Last-Minute Gift Ideas for When You're Out of Time",
  url: 'https://www.thegiftshuffle.com/last-minute-gift-ideas',
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

export default function LastMinuteGiftIdeasPage() {
  return (
    <div className="min-h-screen flex flex-col" style={{ background: '#FFFAF5' }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <Navbar />
      <Breadcrumbs items={[{ label: 'Last-Minute Gift Ideas', href: '/last-minute-gift-ideas' }]} />

      <main id="main-content" className="flex-1">
        {/* Hero image */}
        <section className="max-w-5xl mx-auto px-4 pt-8">
          <div className="relative w-full rounded-2xl overflow-hidden" style={{ aspectRatio: '3/2', maxHeight: '420px' }}>
            <Image
              src="/images/heroes/last-minute-gift-ideas.jpg"
              alt="A last-minute gift spread on cream linen: a phone, a gift card in a sealed envelope, two event tickets, a candle and a knit throw"
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
            10 Last-Minute Gift Ideas for When You&apos;re Out of Time
          </h1>
          <p className="text-base sm:text-lg text-gray-700 leading-relaxed mb-3">
            You forgot. It happens. Anniversary, birthday, the friend who flew in unexpectedly, the
            colleague whose retirement lunch is tomorrow. The way out is to skip the warehouse and the
            shipping wait entirely.
          </p>
          <p className="text-base text-gray-600 leading-relaxed">
            Every idea here gets to the recipient without a long-haul shipment: sent by email, picked
            up in person, or handled by a shop near them. Timing is up to the shop or service, so
            each one tells you where to check before you pay.
          </p>
        </section>

        {/* Disclosure */}
        <section className="max-w-3xl mx-auto px-4 pt-4">
          <p className="text-xs text-gray-400 italic text-center">
            As an Amazon Associate, TheGiftShuffle earns from qualifying purchases. We may earn
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
                        rel="noopener noreferrer"
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
            <li>Check the delivery or pickup estimate before you pay. The shop or service sets it, and it varies by address, item and time of day.</li>
            <li>Pair a digital gift with something physical if the budget allows; a streaming subscription plus a $25 cafe card lands warmer than either alone.</li>
            <li>Save a short list of local options. Bookmark the florist, the bakery and the bottle shop now. Future you, in a panic at 11 a.m., will thank you.</li>
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
          <GuideLinkCards
            links={[
              { href: '/last-minute-christmas-gifts', label: 'Last-Minute Christmas Gifts' },
              { href: '/top-10-gifts-for-grandparents-who-have-everything', label: 'Gifts for Grandparents' },
              { href: '/gifts-under-25', label: 'Gifts Under $25' },
              { href: '/gifts-under-50', label: 'Gifts Under $50' },
              { href: '/gift-ideas-for-friends', label: 'Gift Ideas for Friends' },
              { href: '/gift-ideas-for-him', label: 'Gift Ideas for Him' },
            ]}
          />
        </section>
      </main>
    </div>
  );
}
