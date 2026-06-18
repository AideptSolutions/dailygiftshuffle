import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Breadcrumbs from '@/components/Breadcrumbs';
import InlineShuffle from '@/components/InlineShuffle';
import { products } from '@/data/products';

export const metadata: Metadata = {
  title: "Top 10 Gifts That Don't Need Batteries or Wi-Fi | TheGiftShuffle",
  description:
    "The best analog, unplugged gifts that never need charging, an app, or a software update. Real picks for kids, adults, and screen-fatigued recipients with price bands.",
  keywords: [
    'gifts that dont need batteries',
    'screen free gifts',
    'unplugged gift ideas',
    'analog gifts no charging',
    'gifts without technology',
  ],
  openGraph: {
    title: "Top 10 Gifts That Don't Need Batteries or Wi-Fi | TheGiftShuffle",
    description:
      "No power button, no app, no firmware update. Ten gifts that work the moment they come out of the box and keep working for years.",
    type: 'website',
    url: 'https://thegiftshuffle.com/top-10-gifts-that-dont-need-batteries-or-wifi',
    images: [{ url: 'https://thegiftshuffle.com/images/hero-gifts-no-batteries.png', width: 1792, height: 1024, alt: "Gifts that don't need batteries - journal, fountain pen, wool blanket, playing cards" }],
  },
  alternates: {
    canonical: 'https://thegiftshuffle.com/top-10-gifts-that-dont-need-batteries-or-wifi',
  },
};

const gifts = [
  {
    rank: 1,
    image: '/images/products/analog-lodge-skillet.jpg',
    name: 'Lodge Cast Iron 10.25-inch Skillet',
    why: 'A piece of cookware that gets better with every meal and can be handed down to grandchildren. Lodge has made cast iron in the US since 1896, and this skillet is pre-seasoned and ready to use out of the box.',
    bestFor: 'New homeowners, college grads with their first apartment, and anyone who cooks at least twice a week.',
    price: '$25 to $35',
    link: 'https://www.amazon.com/dp/B00006JSUA?th=1&linkCode=ll2&tag=dailygiftshuf-20&linkId=f09c50accfc526fe15e27aeeebe1f846&language=en_US&ref_=as_li_ss_tl',
  },
  {
    rank: 2,
    image: '/images/products/analog-moleskine-notebook.jpg',
    name: 'Moleskine Classic Notebook (Large, Hardcover)',
    why: 'A notebook that survives backpacks and decades, with the page texture that fountain pen people care about. Hard cover, elastic band, and an expandable inner pocket keep it from falling apart in a bag.',
    bestFor: 'Writers, students, planners, anyone who likes paper better than apps.',
    price: '$20 to $28',
    link: 'https://www.amazon.com/dp/8883701127?&linkCode=ll2&tag=dailygiftshuf-20&linkId=7cfc9b448d857f5381f4168c80d91985&language=en_US&ref_=as_li_ss_tl',
  },
  {
    rank: 3,
    image: '/images/products/analog-catan-board-game.jpg',
    name: 'Catan (Base Game, 2024 Edition)',
    why: 'A board game that anchors family nights and survives the kids\' annual reorganization of the closet. Catan plays 3 to 4 people in 60 to 90 minutes and has no screen component at all.',
    bestFor: 'Families with kids 10 and up, board game first-timers, or game-night regulars who lost the old box.',
    price: '$40 to $55',
    link: 'https://www.amazon.com/dp/B00U26V4VQ?th=1&linkCode=ll2&tag=dailygiftshuf-20&linkId=eb63334bae018c1ed97bf1b01aae9a68&language=en_US&ref_=as_li_ss_tl',
  },
  {
    rank: 4,
    image: '/images/products/analog-field-notes.jpg',
    name: 'Field Notes Original Kraft 3-Pack',
    why: 'Pocket-sized notebooks that go everywhere a phone goes, with the bonus of not lighting up at 2 a.m. Memo-book sized, with a sturdy cardstock cover and graph, ruled, or plain options.',
    bestFor: 'Tradespeople, hikers, runners, journalists, anyone whose hands are dirty when an idea hits.',
    price: '$13 to $16 for the 3-pack',
    link: 'https://www.amazon.com/dp/B0034KDEMO?th=1&linkCode=ll2&tag=dailygiftshuf-20&linkId=a9f320f9302bb2a9d086e79aa684188f&language=en_US&ref_=as_li_ss_tl',
  },
  {
    rank: 5,
    image: '/images/products/analog-lamy-safari-pen.jpg',
    name: 'LAMY Safari Fountain Pen',
    why: 'A real entry-level fountain pen that writes like one twice its price, with no charging cable in the box. The medium nib is the safest pick for first-time fountain pen users.',
    bestFor: 'Anyone moving from disposable pens, students who take notes by hand, gift-card-fatigued teachers.',
    price: '$30 to $40',
    link: 'https://www.amazon.com/dp/B00133X1V8?th=1&linkCode=ll2&tag=dailygiftshuf-20&linkId=2c9f685cb0779a69cc4b8259d0f67a0e&language=en_US&ref_=as_li_ss_tl',
  },
  {
    rank: 6,
    image: '/images/products/analog-pendleton-blanket.jpg',
    name: 'Pendleton Yakima Camp Blanket',
    why: 'A wool blanket that lives on a couch, in a truck bed, or at a picnic for decades and never needs Wi-Fi. Pendleton wool blankets are made in the US and have a 100-plus-year track record.',
    bestFor: 'Camper-truck owners, anyone with a cabin or a cold living room, grandparents who like to bundle up.',
    price: '$140 to $200',
    link: 'https://www.amazon.com/dp/B00EYPH5OQ?th=1&linkCode=ll2&tag=dailygiftshuf-20&linkId=891dc2830a9c7923add861ddf06c314e&language=en_US&ref_=as_li_ss_tl',
  },
  {
    rank: 7,
    image: '/images/products/analog-le-creuset-dutch-oven.jpg',
    name: 'Le Creuset Signature Round Dutch Oven (5.5 qt)',
    why: 'Goes from stovetop to oven to table for a slow-cooked Sunday and outlasts every smart appliance on the counter. Last-season colors often drop significantly on sale.',
    bestFor: 'Home cooks, newlyweds, anyone making bread or braised meats.',
    price: '$350 to $400 (last-season colors often $200 to $260 on sale)',
    link: 'https://www.amazon.com/dp/B00VA5HG0Q?th=1&linkCode=ll2&tag=dailygiftshuf-20&linkId=51fc51c980ca9dffb26dfded5bfe0d1e&language=en_US&ref_=as_li_ss_tl',
  },
  {
    rank: 8,
    image: '/images/products/analog-hydro-flask-32oz.jpg',
    name: 'Hydro Flask 32oz Wide Mouth',
    why: 'A water bottle that holds ice for 24 hours and never has to be plugged in or paired to anything. The wide mouth opening fits ice cubes and is easy to clean.',
    bestFor: 'Outdoor people, parents driving kids to practice, office workers who hate room-temperature water.',
    price: '$45 to $50',
    link: 'https://www.amazon.com/dp/B083GC98D8?&linkCode=ll2&tag=dailygiftshuf-20&linkId=51dcb96d0748278776103bbe5fe5b889&language=en_US&ref_=as_li_ss_tl',
  },
  {
    rank: 9,
    image: '/images/products/analog-bicycle-playing-cards.jpg',
    name: 'Standard Bicycle Playing Cards (Pack of 2)',
    why: 'The cheapest gift on the list, and probably the highest hours-of-use ratio for the price. Two decks cover every card game a group of adults will want to play.',
    bestFor: 'Travelers, parents on long road trips, college students in dorm common rooms.',
    price: '$7 to $10 for two decks',
    link: 'https://www.amazon.com/dp/B00E4AMFKK?th=1&linkCode=ll2&tag=dailygiftshuf-20&linkId=15dbfe195735ad3ae5700eacff0c392c&language=en_US&ref_=as_li_ss_tl',
  },
  {
    rank: 10,
    image: '/images/products/analog-hasami-mug.jpg',
    name: 'Hasami Porcelain Mug',
    why: 'A Japanese-made porcelain mug that stacks neatly, fits any hand, and survives the dishwasher. The minimalist design means it works on every desk and in every kitchen.',
    bestFor: 'Coffee or tea drinkers, anyone who works from home and lives by their morning cup.',
    price: '$24 to $34 per mug',
    link: 'https://hasami-porcelain.com/',
  },
];

const faqs = [
  {
    q: 'What is the best unplugged gift under $25?',
    a: 'A double pack of Bicycle playing cards or a Lodge cast iron 8-inch skillet. Both deliver decades of use for under $25.',
  },
  {
    q: 'Are board games still a good gift in 2026?',
    a: 'Yes. The American Tabletop Association reported continued category growth into 2025, and gift surveys consistently rank board games in the top five family gifts.',
  },
  {
    q: "What's a good unplugged gift for kids?",
    a: 'A wooden puzzle, a deck of playing cards, a set of Caran d\'Ache crayons, or a small Lodge cast iron pan for kids who help cook. Always age-check small parts.',
  },
  {
    q: 'Will a fountain pen feel old-fashioned?',
    a: 'The LAMY Safari and Pilot Metropolitan are both very modern entry-level designs and have a strong following among college students and young professionals.',
  },
  {
    q: 'Are wool blankets worth the price?',
    a: 'A quality wool blanket lasts 30 to 50 years with reasonable care. The cost per year tends to come in well under any synthetic alternative.',
  },
];

const shufflePool = products.filter(
  (p) =>
    p.recipients?.includes('him') ||
    p.recipients?.includes('her') ||
    p.recipients?.includes('friends') ||
    p.recipients?.includes('dad'),
);

const itemListSchema = {
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  name: "Top 10 Gifts That Don't Need Batteries or Wi-Fi",
  url: 'https://thegiftshuffle.com/top-10-gifts-that-dont-need-batteries-or-wifi',
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

export default function GiftsNoBatteriesPage() {
  return (
    <div className="min-h-screen flex flex-col" style={{ background: '#FFFAF5' }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <Navbar />
      <Breadcrumbs
        items={[
          {
            label: "Top 10 Gifts That Don't Need Batteries or Wi-Fi",
            href: '/top-10-gifts-that-dont-need-batteries-or-wifi',
          },
        ]}
      />

      <main id="main-content" className="flex-1">
        {/* Hero Image */}
        <section className="max-w-3xl mx-auto px-4 pt-8">
          <div className="relative w-full rounded-2xl overflow-hidden" style={{ aspectRatio: '16/9' }}>
            <Image
              src="/images/hero-gifts-no-batteries.png"
              alt="Gifts that don't need batteries, leather journal, fountain pen, wool blanket, and playing cards on a wooden desk"
              fill
              className="object-cover"
              priority
            />
          </div>
        </section>

        {/* Hero */}
        <section className="max-w-3xl mx-auto px-4 pt-8 pb-2 text-center">
          <h1 className="text-4xl sm:text-5xl font-extrabold mb-5 leading-tight" style={{ color: '#1A202C' }}>
            Top 10 Gifts That Don&apos;t Need Batteries or Wi-Fi
          </h1>
          <p className="text-base sm:text-lg text-gray-700 leading-relaxed mb-3">
            Some of the best gifts have no power button, no app, and no firmware update. They work
            the moment they come out of the box and keep working for years. This list is for anyone
            tired of yet another gadget on the charging pile.
          </p>
          <p className="text-base text-gray-600 leading-relaxed">
            Each pick below gets a pitch, a fit profile, and a real price band so you can shop fast.
            These are tactile, durable, and built to outlast the trend cycle.
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
                <div className="rounded-2xl border border-[#E2E8F0] bg-white shadow-sm overflow-hidden">
                  <div className="flex items-start gap-4 p-5">
                  <div className="flex-shrink-0 relative w-20 h-20 rounded-xl overflow-hidden bg-gray-50">
                    <Image src={g.image} alt={g.name} fill className="object-cover" />
                    <span
                      className="absolute top-1 left-1 w-6 h-6 rounded-full flex items-center justify-center text-xs font-extrabold text-white"
                      style={{ background: '#F04E30' }}
                    >
                      {g.rank}
                    </span>
                  </div>
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
                        Shop Now
                      </a>
                    )}
                  </div>
                  </div>
                </div>
              </li>
            ))}
          </ol>
        </section>

        {/* Why Unplugged */}
        <section className="max-w-3xl mx-auto px-4 py-6 border-t border-[#E2E8F0]">
          <h2 className="text-2xl font-bold mb-4" style={{ color: '#1A202C' }}>
            When an Unplugged Gift Is the Right Call
          </h2>
          <p className="text-gray-700 text-sm leading-relaxed mb-3">
            A few reasons keep coming up when people search for this kind of gift:
          </p>
          <ul className="space-y-2 list-disc list-inside text-gray-700 text-sm leading-relaxed">
            <li>The recipient already has too many cables, chargers, and gadgets.</li>
            <li>The gift is for a small child and parents do not want another battery hazard.</li>
            <li>The recipient is older and finds new tech genuinely irritating.</li>
            <li>The setting makes electronics impractical: a cabin, boat, camp, or hospital room.</li>
            <li>The recipient is doing a digital detox or a screen-free month.</li>
          </ul>
          <p className="text-gray-700 text-sm leading-relaxed mt-3">
            In any of those cases, an analog gift sidesteps the friction entirely.
          </p>
        </section>

        {/* Price Cheat Sheet */}
        <section className="max-w-3xl mx-auto px-4 py-6 border-t border-[#E2E8F0]">
          <h2 className="text-2xl font-bold mb-4" style={{ color: '#1A202C' }}>Price Range Cheat Sheet</h2>
          <div className="space-y-3">
            {[
              {
                tier: 'Under $25',
                items: 'Bicycle playing cards (2-pack), Lodge 8-inch cast iron skillet, Field Notes 3-pack, a single Hasami mug, a small Moleskine pocket notebook.',
              },
              {
                tier: '$25 to $50',
                items: 'Lodge 10.25-inch skillet, LAMY Safari fountain pen, Moleskine Classic hardcover (large), a wool watch cap or scarf, Hydro Flask 32oz, Areaware Cubebot.',
              },
              {
                tier: '$50 to $100',
                items: 'Caran d\'Ache Neocolor II crayons (40 set), a quality glass French press, a heavyweight cast iron griddle, a wool throw from a small mill.',
              },
              {
                tier: '$100 to $200',
                items: 'Pendleton Yakima Camp Blanket, a starter kitchen knife from a Japanese maker, a leather journal cover, a hand-thrown ceramic mug set.',
              },
              {
                tier: '$200 and up',
                items: 'Le Creuset Dutch Oven, a pair of hand-sewn leather slippers, a wool overshirt, a small piece of original art.',
              },
            ].map((tier) => (
              <div key={tier.tier} className="rounded-xl border border-[#E2E8F0] bg-white p-4">
                <p className="text-sm font-bold text-gray-900 mb-1">{tier.tier}</p>
                <p className="text-sm text-gray-600">{tier.items}</p>
              </div>
            ))}
          </div>
        </section>

        {/* What NOT to Give */}
        <section className="max-w-3xl mx-auto px-4 py-6 border-t border-[#E2E8F0]">
          <h2 className="text-2xl font-bold mb-4" style={{ color: '#1A202C' }}>What Not to Give as an Unplugged Gift</h2>
          <p className="text-gray-700 text-sm leading-relaxed mb-3">
            A few popular suggestions that sound great in theory but often disappoint:
          </p>
          <ul className="space-y-2 list-disc list-inside text-gray-700 text-sm leading-relaxed">
            <li><strong>A puzzle the recipient has no flat surface to leave out.</strong> Puzzles need dedicated space for days.</li>
            <li><strong>A cookbook for someone who never cooks.</strong> It becomes a guilt object on the shelf.</li>
            <li><strong>A bonsai or houseplant for someone who travels.</strong> Living gifts need consistent attention.</li>
            <li><strong>A leather-bound poetry book the recipient has never asked for.</strong> Poetry is personal.</li>
            <li><strong>A coffee press without coffee, or a teapot without tea you know they drink.</strong> Pair the gear with a starter consumable.</li>
          </ul>
        </section>

        {/* Honorable Mentions */}
        <section className="max-w-3xl mx-auto px-4 py-6 border-t border-[#E2E8F0]">
          <h2 className="text-2xl font-bold mb-4" style={{ color: '#1A202C' }}>Honorable Mentions</h2>
          <div className="flex flex-col gap-3">
            {[
              {
                name: "Caran d'Ache Neocolor II Watercolor Crayons (Set of 40)",
                desc: "$65 to $80. A gift for adults who love to color or for kids old enough to care for nice supplies.",
              },
              {
                name: 'Areaware Cubebot Wooden Puzzle',
                desc: '$35 to $50. A desk toy that doubles as a fidget object and a small sculpture.',
              },
              {
                name: 'A Wool Throw From a Small Mill',
                desc: '$60 to $120. Chunky knit throws from Pendleton, Faribault, or smaller mills feel personal and never need charging.',
              },
            ].map((item) => (
              <div key={item.name} className="rounded-xl border border-[#E2E8F0] bg-white p-4">
                <p className="text-sm font-bold text-gray-900 mb-1">{item.name}</p>
                <p className="text-sm text-gray-600">{item.desc}</p>
              </div>
            ))}
          </div>
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
              { href: '/top-10-gifts-that-arrive-in-24-hours', label: 'Gifts That Arrive Fast' },
              { href: '/gifts-for-camping-and-outdoors', label: 'Camping & Outdoors Gifts' },
              { href: '/gifts-under-50', label: 'Gifts Under $50' },
              { href: '/gift-ideas-for-him', label: 'Gift Ideas for Him' },
              { href: '/gift-ideas-for-her', label: 'Gift Ideas for Her' },
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
