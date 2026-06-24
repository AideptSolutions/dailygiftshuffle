import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import Navbar from '@/components/Navbar';
import Breadcrumbs from '@/components/Breadcrumbs';
import InlineShuffle from '@/components/InlineShuffle';
import { products } from '@/data/products';

export const metadata: Metadata = {
  title: "Top 10 Gifts for New Dads Under $50 | TheGiftShuffle",
  description:
    "Ten gifts for new dads under $50 that actually get used in the first year, picked for sleep-deprived parents who do not need more baby blankets.",
  keywords: [
    'best gifts for new dads under 50',
    'new dad gifts under $50',
    'first time dad gift ideas',
    'cheap useful gifts for new fathers',
    'father day gifts under 50',
  ],
  openGraph: {
    title: "Top 10 Gifts for New Dads Under $50 | TheGiftShuffle",
    description:
      "Ten gifts for new dads that actually get used. No novelty mugs. No matching outfits. Just useful things for a sleep-deprived first year.",
    type: 'website',
    url: 'https://www.thegiftshuffle.com/top-10-gifts-for-new-dads-under-50',
  },
  alternates: {
    canonical: 'https://www.thegiftshuffle.com/top-10-gifts-for-new-dads-under-50',
  },
};

const gifts = [
  {
    rank: 1,
    name: 'Hatch Rest Mini Sound Machine',
    why: 'A simple, dimmable sound machine and night light. Plays white noise, has a soft glow, and is portable for travel. Most newborns sleep better with consistent white noise. It is the rare gadget that gets used every single night.',
    bestFor: 'Any new dad, especially one in an apartment with thin walls.',
    price: '$35 to $45',
    link: 'https://www.amazon.com/Hatch-Baby-Machine-Registry-Essential/dp/B0F7C6XJ3P?linkCode=ll2&tag=dailygiftshuf-20&linkId=8f0cd9aab93e5a98fc9c5d1882c0e1c1&language=en_US',
  },
  {
    rank: 2,
    name: 'Yeti Rambler Tumbler, 20 oz',
    why: 'A vacuum-insulated tumbler that keeps coffee hot for hours. Matters when you are warming a bottle at 3 a.m. and forgot the cup on the counter at 2 a.m. Coffee that survives the unpredictable timing of newborn life.',
    bestFor: 'The dad who is now drinking coffee at 4 a.m. and 1 p.m. instead of just morning.',
    price: '$35 to $40',
    link: 'https://www.amazon.com/YETI-Vacuu-Rambler-Stainless-Steel/dp/B07FM5HLMF?linkCode=ll2&tag=dailygiftshuf-20&linkId=dbbea718a6ae92f8ad133a7a72a03218&language=en_US',
  },
  {
    rank: 3,
    name: 'Frida Baby NoseFrida Nasal Aspirator',
    why: 'The Snotsucker. Despite the name, it works on a congested baby far better than the hospital bulb. First cold hits around month four. This is the tool every pediatrician quietly recommends.',
    bestFor: 'Practical-minded dads who want the thing that works.',
    price: '$15 to $20',
    link: 'https://www.amazon.com/Nasal-Aspirator-NoseFrida-Snotsucker-Fridababy/dp/B00171WXII?linkCode=ll2&tag=dailygiftshuf-20&linkId=b89aa9df2cbfc1d5c1e8124a9c999a81&language=en_US',
  },
  {
    rank: 4,
    name: 'BabyBjorn Baby Carrier Mini',
    why: 'A simple front-facing carrier sized for newborns. Lets a dad hold the baby with two hands free. Babies sleep in carriers; parents get coffee. New ones run over $100, but lightly used carriers go well under $50.',
    bestFor: 'Hands-on dads who want to bond and walk the dog at the same time.',
    price: '$25 to $50 secondhand, or link below for new',
    link: 'https://www.amazon.com/BabyBj%C3%B6rn-Baby-Carrier-Woven-Black/dp/B0CLV7JPPK?linkCode=ll2&tag=dailygiftshuf-20&linkId=418b751a51da8e390d66bee4d2a11fd3&language=en_US',
  },
  {
    rank: 5,
    name: 'Vornado 530 Air Circulator Fan',
    why: 'A small, quiet circulator fan. Reduces SIDS risk per CDC and AAP guidance, evens out room temperature, and adds gentle white noise. Pediatricians actually recommend nursery airflow. This one is not too loud or too directional.',
    bestFor: 'Dads in older homes or warm climates.',
    price: '$45 to $50',
    link: 'https://www.amazon.com/Vornado-CR1-0073-06-Small-Whole-Circulator/dp/B000E5S4MW?linkCode=ll2&tag=dailygiftshuf-20&linkId=eb78c80918ed7cf62abcaa9e78a107da&language=en_US',
  },
  {
    rank: 6,
    name: 'Bombas Men\'s Socks (4-Pack)',
    why: 'New dads stand and walk a lot more than they expect, often in the middle of the night on hard floors. Better socks help. A small upgrade he would not buy for himself.',
    bestFor: 'Any new dad, particularly one who used to wear whatever was clean.',
    price: '$40 to $50',
    link: 'https://www.amazon.com/BOMBAS-Originals-Ankle-Socks-White/dp/B0CVLKH8M2?linkCode=ll2&tag=dailygiftshuf-20&linkId=f9bde6efd584bc43292217dd928707b2&language=en_US',
  },
  {
    rank: 7,
    name: 'A Pre-Loaded Coffee Shop Gift Card',
    why: '$40 to his actual favorite local cafe, not a chain unless that is genuinely his spot. Take the time to ask his partner. Permission to leave the house for fifteen quiet minutes. That is the real gift.',
    bestFor: 'Dads with a regular coffee shop and no time to go.',
    price: '$25 to $50',
    link: null,
  },
  {
    rank: 8,
    name: 'A Night of Restaurant Delivery (DoorDash or Uber Eats)',
    why: '$50 in credit on whichever delivery app the new family already uses. Skip the gourmet meal kit. They will not have time to cook it. Solves what\'s for dinner twice, sometimes three times.',
    bestFor: 'Anyone in the first six weeks postpartum.',
    price: '$25 to $50',
    link: null,
  },
  {
    rank: 9,
    name: 'Levoit Core Mini Air Purifier',
    why: 'A compact HEPA purifier sized for a nursery. Quiet enough not to wake the baby, small enough to fit on a dresser. Newborn rooms collect dust, dander, and in many regions wildfire smoke.',
    bestFor: 'Dads in cities, wildfire-prone areas, or homes with pets.',
    price: '$40 to $50',
    link: 'https://www.amazon.com/LEVOIT-Purifiers-Fragrance-Core-Mini/dp/B09LMF648R?linkCode=ll2&tag=dailygiftshuf-20&linkId=527b8da516c4e760654e311f3c155bab&language=en_US',
  },
  {
    rank: 10,
    name: 'A Hand-Written "I Got Tonight" Coupon Book from the Co-Parent',
    why: 'Three coupons: "I will do the 2 a.m. feed." "I will take baby for two hours so you can run or nap." "I will handle bath night solo." Sleep is the actual currency of new parenthood. This is sleep.',
    bestFor: 'Partners giving the gift. Cost: a pen and an envelope.',
    price: 'Free',
    link: null,
  },
];

const shufflePool = products.filter(
  (p) =>
    p.recipients?.includes('dad') ||
    p.recipients?.includes('him'),
);

const faqs = [
  {
    q: "What is the best $50 gift for a new dad?",
    a: "The honest answer is sleep. A Hatch Rest Mini sound machine plus a $20 coffee shop gift card hits both: better baby sleep and a permission slip for a quiet morning out.",
  },
  {
    q: "Do new dads actually want gear for themselves?",
    a: "Yes, but specifically gear that helps with the baby. A carrier, a tumbler that survives the chaos of newborn life, a real pair of socks. Novelty mugs are not it.",
  },
  {
    q: "Are gift cards too impersonal for new dads?",
    a: "A generic Visa card is. A gift card to his actual coffee shop, his actual takeout spot, or a delivery app his partner already uses is not. Specificity makes it personal.",
  },
  {
    q: "When is the right time to give a new dad gift?",
    a: "The most useful window is week three to week eight postpartum, after the initial casserole brigade fades and the family is back to running on its own.",
  },
];

const itemListSchema = {
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  name: "Top 10 Gifts for New Dads Under $50",
  url: 'https://www.thegiftshuffle.com/top-10-gifts-for-new-dads-under-50',
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

export default function NewDadsGiftsPage() {
  return (
    <div className="min-h-screen flex flex-col" style={{ background: '#FFFAF5' }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <Navbar />
      <Breadcrumbs items={[{ label: 'Top 10 Gifts for New Dads Under $50', href: '/top-10-gifts-for-new-dads-under-50' }]} />

      <main id="main-content" className="flex-1">
        {/* Hero image */}
        <section className="max-w-5xl mx-auto px-4 pt-8">
          <div className="relative w-full rounded-2xl overflow-hidden" style={{ aspectRatio: '3/2', maxHeight: '420px' }}>
            <Image
              src="/images/heroes/top-10-gifts-for-new-dads-under-50.jpg"
              alt="A new dad holding his newborn with a gift nearby"
              fill
              className="object-cover"
              priority
              unoptimized
            />
          </div>
        </section>
        {/* Hero */}
        <section className="max-w-3xl mx-auto px-4 pt-10 pb-2 text-center">
          <h1 className="text-4xl sm:text-5xl font-extrabold mb-5 leading-tight" style={{ color: '#1A202C' }}>
            Top 10 Gifts for New Dads Under $50
          </h1>
          <p className="text-base sm:text-lg text-gray-700 leading-relaxed mb-3">
            New dad gift guides usually go one of two directions. Either they push novelty items (the
            World&apos;s Best Dad mug) or they pivot to the baby, which is not actually a gift for the
            dad. This list is different.
          </p>
          <p className="text-base text-gray-600 leading-relaxed">
            Every item here was picked because a first-year dad will use it in the first three months,
            and every item is real-world priced at fifty dollars or less. We skipped anything that
            needed multiple cords, two apps, and a Wi-Fi handshake. New parents are exhausted. The
            gift should not require a setup session.
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
                        View on Amazon
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
          <h2 className="text-2xl font-bold mb-4" style={{ color: '#1A202C' }}>How to Pick Between These</h2>
          <p className="text-gray-700 text-base leading-relaxed mb-4">
            Ask one question: does he sound tired or overwhelmed? If tired, pick something that gives
            him time (the gift card, the delivery credit, the coupon book). If overwhelmed by gear,
            pick something that solves a single problem he is having right now.
          </p>
          <h2 className="text-2xl font-bold mb-4 mt-6" style={{ color: '#1A202C' }}>Three Things to Skip</h2>
          <ul className="space-y-2 text-gray-700 text-base">
            <li><strong>Branded Dad apparel.</strong> Hats and t-shirts with Dad Mode get worn once for the social media photo and never again.</li>
            <li><strong>Father-baby matching outfits</strong>, unless he has explicitly mentioned wanting one.</li>
            <li><strong>Anything requiring assembly past opening the box.</strong> A new dad does not have the bandwidth to thread a screw the size of a grain of rice into a swing at 2 a.m.</li>
          </ul>
          <p className="mt-4 text-gray-600 text-base leading-relaxed">
            The pattern in our reader feedback is consistent. Useful beats clever, and quiet beats loud,
            in the first year of fatherhood.
          </p>
        </section>

        {/* Timing note */}
        <section className="max-w-3xl mx-auto px-4 py-6 border-t border-[#E2E8F0]">
          <h2 className="text-2xl font-bold mb-4" style={{ color: '#1A202C' }}>A Note on Timing</h2>
          <p className="text-gray-700 text-base leading-relaxed">
            Aim for delivery in week three through week eight postpartum. The first two weeks are
            flooded with family and casseroles. By week three, the visitors thin out and the long
            stretch of solo parenting begins. That is when a useful gift lands hardest.
          </p>
          <p className="mt-3 text-gray-600 text-base leading-relaxed">
            With Father&apos;s Day coming up, this is also a strong category for anyone shopping for a new
            dad in the family. For more Father&apos;s Day ideas across all budgets, see our{' '}
            <Link href="/fathers-day-gifts-under-50" className="underline" style={{ color: '#F04E30' }}>
              Father&apos;s Day gifts under $50
            </Link>{' '}
            and{' '}
            <Link href="/gift-ideas-for-dad" className="underline" style={{ color: '#F04E30' }}>
              gift ideas for dad
            </Link>{' '}
            guides.
          </p>
        </section>

        {/* Shuffle Widget */}
        <section className="max-w-3xl mx-auto px-4 py-8 border-t border-[#E2E8F0]">
          <p className="text-gray-600 text-sm mb-5">
            Not sure which one fits? Use the shuffle below to explore more gift ideas.
          </p>
          <InlineShuffle products={shufflePool.length > 0 ? shufflePool : products.slice(0, 12)} heading="More Gift Ideas for Him" />
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
              { href: '/fathers-day-gifts-under-50', label: "Father's Day Gifts Under $50" },
              { href: '/gift-ideas-for-dad', label: 'Gift Ideas for Dad' },
              { href: '/gift-ideas-for-him', label: 'Gift Ideas for Him' },
              { href: '/gifts-under-50', label: 'Gifts Under $50' },
              { href: '/top-10-gifts-that-arrive-in-24-hours', label: 'Gifts That Arrive in 24 Hours' },
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
