import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import Navbar from '@/components/Navbar';
import Breadcrumbs from '@/components/Breadcrumbs';
import InlineShuffle from '@/components/InlineShuffle';
import { products } from '@/data/products';

export const metadata: Metadata = {
  title: "Top 10 Gifts for Grandparents Who Already Have Everything | TheGiftShuffle",
  description:
    "Stuck on a gift for grandparents who already own everything? Ten ideas that skip clutter and land emotionally, with prices and who each one fits.",
  keywords: [
    'best gifts for grandparents who have everything',
    'thoughtful gifts for grandparents',
    'gifts for grandparents who need nothing',
    'unique grandparent gifts',
    'gifts for elderly grandparents',
  ],
  openGraph: {
    title: "Top 10 Gifts for Grandparents Who Already Have Everything | TheGiftShuffle",
    description:
      "Ten gift ideas that skip clutter and land emotionally. For the grandparent who has everything except your time, story, or voice.",
    type: 'website',
    url: 'https://thegiftshuffle.com/top-10-gifts-for-grandparents-who-have-everything',
  },
  alternates: {
    canonical: 'https://thegiftshuffle.com/top-10-gifts-for-grandparents-who-have-everything',
  },
};

const gifts = [
  {
    rank: 1,
    name: 'A Recorded Audio Memoir Subscription',
    why: 'Services like StoryWorth and Remento email a grandparent one prompt a week and turn a year of answers into a hardcover book or audio file.',
    bestFor: 'Grandparents who love to tell stories but have never been asked the right questions.',
    price: '$99 to $149 per year',
    link: 'https://www.storyworth.com',
  },
  {
    rank: 2,
    name: 'A Smart Photo Frame Loaded by the Grandkids',
    why: 'The Aura Carver and Skylight Frame let family members anywhere upload photos straight from their phones. The frame quietly rotates new pictures, no app, no buttons.',
    bestFor: 'Any grandparent who lives more than a 30-minute drive from the family they want to see most.',
    price: '$90 to $200',
    link: 'https://auraframes.com',
  },
  {
    rank: 3,
    name: "A One-Hour Visit From Their Local Library's Tech Help Desk",
    why: 'Most public library systems run free one-on-one device coaching sessions for older adults. You book the appointment and a librarian shows her how to back up her phone, set up FaceTime, or block scam calls.',
    bestFor: 'Grandparents tired of being told to "just download the app."',
    price: 'Free, or a small donation to the library',
    link: 'https://www.americanlibraries.org',
  },
  {
    rank: 4,
    name: "A Year of Their Hometown's Sunday Paper",
    why: 'Most regional newspapers still mail a print Sunday edition anywhere in the country. For grandparents who moved away, a year of the local paper landing on the porch every weekend is the kind of comfort no mall gift competes with.',
    bestFor: 'Grandparents who left their hometown decades ago and still mention it weekly.',
    price: '$80 to $250 per year',
    link: null,
  },
  {
    rank: 5,
    name: 'A Hand-Lettered Family Recipe Book',
    why: 'Pick five recipes the family associates with this grandparent, type them up clean, and have a calligrapher on Etsy hand-letter them into a small folio. Add a one-paragraph note from each grandkid about a memory tied to the recipe.',
    bestFor: 'The grandparent who taught the family how to cook one thing perfectly.',
    price: '$120 to $300',
    link: 'https://www.etsy.com',
  },
  {
    rank: 6,
    name: 'A Membership to a Local Botanical Garden or Aquarium',
    why: 'Annual passes to a nearby attraction get used. Stuff often does not. Most major botanical gardens and aquariums run senior membership tiers around $50 to $100 with member-only morning hours and parking included.',
    bestFor: 'Still-mobile grandparents who like a Tuesday morning outing.',
    price: '$50 to $150',
    link: null,
  },
  {
    rank: 7,
    name: '"Cleaning Crew Day" Booked and Paid for in Advance',
    why: 'Hire a vetted cleaning service for four hours. Pay it up front. Hand grandma a card that says "Day already booked. Friday the 18th. They will text you to confirm." No guilt, no negotiation.',
    bestFor: 'Grandparents who insist they are fine but whose knees have other opinions.',
    price: '$150 to $300 per visit, depending on city',
    link: null,
  },
  {
    rank: 8,
    name: 'A Voice-Activated Speaker Pre-Set With Their Favorites',
    why: 'An Amazon Echo Show or Google Nest Hub, pre-configured by you before wrapping, with their three favorite radio stations and a few named routines saved already.',
    bestFor: 'Grandparents who used to listen to a specific AM station that no longer exists locally.',
    price: '$80 to $130 for the device plus a 20-minute setup from you',
    link: 'https://www.amazon.com/dp/B09B2SBHQK?tag=dailygiftshuf-20',
  },
  {
    rank: 9,
    name: 'A Subscription to a Letters-From-Strangers Project',
    why: 'Operation Gratitude, More Love Letters, and the Letters Against Isolation project mail handwritten cards from volunteers around the world to a recipient\'s home.',
    bestFor: 'Grandparents who live alone and look forward to the mail more than they admit.',
    price: '$5 to $25 per month, donation-based',
    link: 'https://www.operationgratitude.com',
  },
  {
    rank: 10,
    name: 'A Pre-Paid Visit Plan With a Specific Date and Flights Booked',
    why: 'Not a vague "I will come see you soon." A printed itinerary, a flight confirmation, and a date circled on the calendar. The best version takes the planning off the older person entirely.',
    bestFor: 'Any grandparent who has hinted, twice, that the family does not visit enough.',
    price: '$200 to $700 in flights or gas plus a thoughtful weekend',
    link: null,
  },
];

const shufflePool = products.filter(
  (p) =>
    p.recipients?.includes('mom') ||
    p.recipients?.includes('her') ||
    p.recipients?.includes('dad') ||
    p.recipients?.includes('him') ||
    p.recipients?.includes('grandparents'),
);

const faqs = [
  {
    q: "What is the best gift for elderly grandparents who say they want nothing?",
    a: "Experience-based gifts and time-based gifts almost always work better than physical objects. A booked visit, a paid-for cleaning day, or a year of their hometown newspaper land in a way that a wrapped object often does not.",
  },
  {
    q: "Are smart photo frames really worth it for older grandparents?",
    a: "Yes, for grandparents who have trouble with phone apps but still want to see updates from family. The Aura and Skylight models work over Wi-Fi and need no setup from the older person, which is the part that usually fails with tech gifts.",
  },
  {
    q: "What is a thoughtful budget gift for grandparents under $50?",
    a: "A handwritten letter from each grandchild bundled into a small album, a small monthly subscription to a letter-writing project, or paying for a year of a local-paper Sunday edition all fit under $50 and tend to outlast more expensive gifts.",
  },
  {
    q: "How can I give grandparents more visits as a gift?",
    a: "Book the flight or block the weekend now, print the confirmation, and put it inside a card. The hardest part of family visits is the scheduling, and removing that obstacle is itself the gift.",
  },
];

const itemListSchema = {
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  name: "Top 10 Gifts for Grandparents Who Already Have Everything",
  url: 'https://thegiftshuffle.com/top-10-gifts-for-grandparents-who-have-everything',
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

export default function GrandparentsGiftsPage() {
  return (
    <div className="min-h-screen flex flex-col" style={{ background: '#FFFAF5' }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <Navbar />
      <Breadcrumbs items={[{ label: 'Top 10 Gifts for Grandparents', href: '/top-10-gifts-for-grandparents-who-have-everything' }]} />

      <main id="main-content" className="flex-1">
        {/* Hero image */}
        <section className="max-w-5xl mx-auto px-4 pt-8">
          <div className="relative w-full rounded-2xl overflow-hidden" style={{ aspectRatio: '3/2', maxHeight: '420px' }}>
            <Image
              src="/images/heroes/top-10-gifts-for-grandparents-who-have-everything.jpg"
              alt="Grandparents opening a gift together"
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
            Top 10 Gifts for Grandparents Who Already Have Everything
          </h1>
          <p className="text-base sm:text-lg text-gray-700 leading-relaxed mb-3">
            Buying for grandparents is its own special problem. By the time someone has been alive
            seven or eight decades, they have accumulated a lifetime of mugs, sweaters, and
            well-intentioned scented candles. The standard gift guide does not help, because the
            standard gift guide is full of stuff.
          </p>
          <p className="text-base text-gray-600 leading-relaxed">
            What works for the grandparent who already has everything is something else entirely:
            time, story, ease, or the small kind of comfort that feels like a quiet hug from across
            the country. Below are ten ideas that have hit for actual families in the last year,
            sorted by what they actually deliver.
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
                        View Gift
                      </a>
                    )}
                  </div>
                </div>
              </li>
            ))}
          </ol>
        </section>

        {/* How to Pick */}
        <section className="max-w-3xl mx-auto px-4 py-6 border-t border-[#E2E8F0]">
          <h2 className="text-2xl font-bold mb-4" style={{ color: '#1A202C' }}>How to Pick Without Overthinking It</h2>
          <ul className="space-y-2 text-gray-700 text-base">
            <li>If you can almost picture them rolling their eyes at a new sweater, do not get them a sweater.</li>
            <li>If a present needs to be stored, dusted, or wrapped in plastic to keep clean, skip it.</li>
            <li>The best presents on this list either remove a hassle, deliver someone&apos;s voice or face, or schedule a future moment to look forward to.</li>
          </ul>
          <p className="mt-4 text-gray-600 text-base leading-relaxed">
            If you are torn between two options, go with the one that creates a specific date on the
            calendar. Older adults plan around things to look forward to more than younger adults do,
            and putting something concrete on the horizon often outperforms a more expensive object.
          </p>
        </section>

        {/* Shuffle Widget */}
        <section className="max-w-3xl mx-auto px-4 py-8 border-t border-[#E2E8F0]">
          <p className="text-gray-600 text-sm mb-5">
            Not sure which one fits? Use the shuffle below to explore more gift ideas from across
            the full catalog.
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
              { href: '/gift-ideas-for-her', label: 'Gift Ideas for Her' },
              { href: '/gift-ideas-for-him', label: 'Gift Ideas for Him' },
              { href: '/gift-ideas-for-mom', label: 'Gift Ideas for Mom' },
              { href: '/top-10-gifts-that-arrive-in-24-hours', label: 'Gifts That Arrive in 24 Hours' },
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
