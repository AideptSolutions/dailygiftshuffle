import type { Metadata } from 'next';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Breadcrumbs from '@/components/Breadcrumbs';
import { products } from '@/data/products';
import ProductCard from '@/components/ProductCard';
import InlineShuffle from '@/components/InlineShuffle';

export const metadata: Metadata = {
  title: "Mother's Day Gifts — The Best Picks for 2026 | TheGiftShuffle",
  description:
    "Find the best Mother's Day gifts for 2026 — personalized jewelry, spa sets, premium kitchen gadgets, and thoughtful picks for every budget. Don't wait until the last minute.",
  keywords: [
    "mothers day gifts",
    "mothers day gift ideas",
    "best mothers day gifts 2026",
    "unique mothers day gifts",
    "mothers day gifts for mom",
  ],
  openGraph: {
    title: "Mother's Day Gifts — The Best Picks for 2026 | TheGiftShuffle",
    description:
      "Browse the best Mother's Day gifts for 2026 — personalized jewelry, spa sets, kitchen upgrades, and more.",
    type: 'website',
    url: 'https://thegiftshuffle.com/mothers-day-gifts',
    images: [
      {
        url: 'https://www.thegiftshuffle.com/api/og?title=Mother%27s%20Day%20Gifts%20%7C%20TheGiftShuffle',
        width: 1200,
        height: 630,
      },
    ],
  },
  alternates: {
    canonical: 'https://thegiftshuffle.com/mothers-day-gifts',
  },
};

const mothersDayProducts = products.filter(
  (p) =>
    p.topicTags?.includes('mothers-day') ||
    p.topicTags?.includes('for-mom') ||
    p.recipients.includes('mom') ||
    p.recipients.includes('her')
);

const faqs = [
  {
    q: "What are the best Mother's Day gifts in 2026?",
    a: "The best Mother's Day gifts in 2026 are personalized jewelry (name necklaces, birthstone rings), premium spa and self-care sets, experience gifts (cooking classes, afternoon tea, wine tasting), smart kitchen gadgets she wouldn't buy herself, and subscription boxes tailored to her interests. These are the categories with the highest gifting satisfaction scores — she actually uses and remembers them.",
  },
  {
    q: "What does every mom want for Mother's Day?",
    a: "Most moms say they want to feel seen and appreciated — not just gifted. The gifts that land best are ones that reflect her specific personality: a spa set for the mom who never makes time for herself, a premium kitchen tool for the mom who loves to cook, a personalized keepsake for the sentimental mom. Avoid generic; lean specific.",
  },
  {
    q: "What are unique Mother's Day gift ideas?",
    a: "Unique Mother's Day gifts include: a custom star map of the day she became a mom, a handwriting necklace with her child's writing, a DNA ancestry kit, a personalized recipe book with family favorites, a day spa experience gift card, or a subscription to an online cooking class. These are the gifts she talks about years later.",
  },
  {
    q: "What are good Mother's Day gifts under $50?",
    a: "Under $50, you can find excellent Mother's Day gifts: a luxury tea gift set, a botanical puzzle, a personalized name necklace, a silk sleep eye mask and spa set, an aromatherapy diffuser, or a cozy sherpa throw blanket. These feel genuinely thoughtful at a price that doesn't require group contributions.",
  },
  {
    q: "What do moms want instead of flowers?",
    a: "While flowers are always appreciated, the gifts that outlast them are: a quality spa or self-care set, a kitchen upgrade she has been eyeing, personalized jewelry, a subscription box she will receive every month, or an experience (cooking class, local food tour). These create memories and daily use — flowers fade in a week.",
  },
  {
    q: "What are last-minute Mother's Day gift ideas?",
    a: "Last-minute Mother's Day gifts that still feel intentional: a same-day-delivery spa set or candle collection, an insulated tumbler in her favorite color, a digital gift card for a spa or restaurant experience, or a next-day-delivery personalized mug. If you have more time, even a hand-written letter with a printed photo can be more meaningful than a rushed purchase.",
  },
  {
    q: "What are the best self-care gifts for Mom in 2026?",
    a: "The best self-care gifts for Mom in 2026 center on her daily rituals: aromatherapy shower steamers that turn her morning shower into a spa moment, under-eye patches and sheet masks she can use during a quiet evening, luxury skincare serums that improve how her skin looks and feels, and soft loungewear or pajamas that upgrade her downtime. Gifts that improve her everyday routine are what resonate most this year.",
  },
  {
    q: "What Mother's Day gifts are trending in 2026?",
    a: "The biggest Mother's Day gift trends in 2026: shower steamers and aromatherapy products (fastest-growing self-care category), Korean beauty-inspired skincare rituals (sheet masks, serums, under-eye patches), luxury pajamas and satin loungewear sets, curated spa gift boxes, and premium skincare from La Roche-Posay, The Ordinary, Sunday Riley, and Shiseido. Experiential, restorative gifts are outperforming traditional flower/candy gifting.",
  },
];

const itemListSchema = {
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  name: "Mother's Day Gifts",
  description: "Hand-picked Mother's Day gift ideas curated by TheGiftShuffle",
  url: 'https://thegiftshuffle.com/mothers-day-gifts',
  numberOfItems: mothersDayProducts.length,
  itemListElement: mothersDayProducts.map((p, i) => ({
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

export default function MothersDayGiftsPage() {
  return (
    <div className="min-h-screen flex flex-col" style={{ background: '#FFFAF5' }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <Navbar />
      <Breadcrumbs items={[{ label: "Mother's Day Gifts", href: '/mothers-day-gifts' }]} />

      <main id="main-content" className="flex-1">
        {/* Hero */}
        <section className="max-w-5xl mx-auto px-4 pt-8 pb-6 text-center">
          <h1 className="text-4xl sm:text-5xl font-extrabold mb-4" style={{ color: '#1A202C' }}>
            Mother&apos;s Day Gifts
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed mb-4">
            Mother&apos;s Day is May 11 — and this year, the gifts that matter most aren&apos;t the flashiest ones. They&apos;re the ones that give her something she&apos;d never carve out for herself: time to slow down, a bathroom that feels like a spa, skin that finally gets the care it deserves, and the kind of cozy comfort that doesn&apos;t require an occasion.
          </p>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Every pick below is hand-curated for 2026 — shower steamers she&apos;ll actually use, skincare from brands worth the investment, pajamas soft enough to change how her mornings feel, and spa sets that turn an ordinary Tuesday night into something she looks forward to.
          </p>
        </section>

        {/* Inline Shuffle */}
        <section className="max-w-5xl mx-auto px-4 py-6">
          <InlineShuffle products={mothersDayProducts} heading="Shuffle Mother's Day Picks" />
        </section>

        {/* Full Product Grid */}
        <section className="max-w-5xl mx-auto px-4 py-8">
          <h2 className="text-2xl font-bold mb-6" style={{ color: '#1A202C' }}>
            All Mother&apos;s Day Gift Ideas
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {mothersDayProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>

        {/* Editorial Content */}
        <section className="max-w-3xl mx-auto px-4 py-10">

          {/* Hero image */}
          <div className="rounded-2xl overflow-hidden mb-8 shadow-sm">
            <img
              src="/img/mothers-day-hero-2026.jpg"
              alt="Mother's Day self-care gifts including skincare, shower steamers, satin pajamas, and face masks"
              className="w-full h-auto object-cover"
              style={{ maxHeight: '420px', objectPosition: 'center' }}
            />
          </div>

          <h2 className="text-2xl font-bold mb-5" style={{ color: '#1A202C' }}>
            What Mom Actually Wants This Mother&apos;s Day
          </h2>

          <p className="text-gray-700 leading-relaxed mb-4">
            Here&apos;s what nobody says out loud but everyone knows: Mom spends most of the year taking care of other people. She&apos;s the one who notices when you&apos;re running low on things. She&apos;s the one who reorganizes the fridge and remembers the dentist appointment and stays up worrying when she should be sleeping. The best Mother&apos;s Day gift in 2026 isn&apos;t a nice thing to own. It&apos;s a signal — that you see her, and that you want her to finally have a moment that&apos;s entirely her own.
          </p>

          <p className="text-gray-700 leading-relaxed mb-8">
            This year, the gifts that are landing — the ones moms are actually talking about — are the ones built around her daily rituals. Not flowers that wilt in a week. Not another candle to sit on a shelf. Things she&apos;ll reach for at 6 AM before anyone else wakes up. Things that make her bathroom feel like a spa and her Sunday morning feel like a slow exhale.
          </p>

          <h3 className="text-xl font-semibold mb-3" style={{ color: '#1A202C' }}>
            🚿 The Shower Steamer Moment
          </h3>
          <p className="text-gray-700 leading-relaxed mb-6">
            If you haven&apos;t heard a mom rave about shower steamers yet, you will. They&apos;re the self-care product that finally makes sense for the woman who doesn&apos;t have time to draw a bath. Drop one on the shower floor and it dissolves into a cloud of essential oils — eucalyptus to clear her head in the morning, lavender when she needs to come down from the day, citrus when she needs to feel like a person again. The best sets come with eight to ten varieties so she can match the scent to the mood. No tub required. No forty-minute ritual required. Just five minutes and hot water.
          </p>

          <h3 className="text-xl font-semibold mb-3" style={{ color: '#1A202C' }}>
            ✨ Skincare That Says &ldquo;You Deserve This&rdquo;
          </h3>
          <p className="text-gray-700 leading-relaxed mb-6">
            There&apos;s a version of skincare gifting that misses the point — a generic lotion set, a drugstore face wash. And then there&apos;s the version that actually lands: a Sunday Riley vitamin C serum she&apos;d never spend that much on herself, an Estée Lauder night repair that she&apos;s heard about for years, a La Roche-Posay retinol she keeps putting back at the store because it feels like too much. These aren&apos;t gifts about vanity. They&apos;re about restoration. They&apos;re about giving her skin care that actually works, paired with a ritual that&apos;s quietly, entirely hers.
          </p>

          <h3 className="text-xl font-semibold mb-3" style={{ color: '#1A202C' }}>
            😴 Face Masks: Her Official Permission Slip to Unplug
          </h3>
          <p className="text-gray-700 leading-relaxed mb-6">
            Korean beauty figured something out that the rest of us are only just catching up to: sometimes you need a physical reason to stop. A face mask or a set of gold under-eye patches does exactly that. The moment it goes on, the phone goes down. She has twenty minutes where the answer to every ask is &ldquo;I&apos;m doing my mask.&rdquo; Collagen patches for the under-eye circles she&apos;s been hiding. Hydrating sheet masks for the skin that&apos;s been running on stress and not enough sleep. Give her a full month&apos;s supply. Give her something to look forward to every Sunday night.
          </p>

          <h3 className="text-xl font-semibold mb-3" style={{ color: '#1A202C' }}>
            🩷 The Pajama Upgrade She Won&apos;t Buy Herself
          </h3>
          <p className="text-gray-700 leading-relaxed mb-6">
            Ask most moms what they&apos;re wearing to bed and the answer is some combination of old, worn-out, and &ldquo;it still works.&rdquo; A satin pajama set that actually fits and feels like something — soft against the skin, pretty enough that she feels good putting it on — is one of those gifts that changes her daily life in a small, quiet way. Same goes for sherpa slipper socks she won&apos;t take off all winter, or a plush loungewear set that makes Saturday morning feel like something she earned. Comfort is care. Especially when it&apos;s for someone who&apos;s never the first one to ask for it.
          </p>

          <h3 className="text-xl font-semibold mb-3" style={{ color: '#1A202C' }}>
            🛁 The Spa Night In a Box
          </h3>
          <p className="text-gray-700 leading-relaxed mb-2">
            There&apos;s something about a beautifully packaged spa gift set that does something no individual product can — it gives her a full evening. A bath bomb for the tub, a face mask for after, a silk sleep mask for when she finally gets into bed. The best sets in 2026 are gift-ready out of the box (no wrapping required), filled with enough variety that she can mix and match depending on how much time and energy she has, and good enough that she&apos;ll actually use everything in it. You&apos;re not just giving her products. You&apos;re giving her a night to herself.
          </p>
        </section>

        {/* How TheGiftShuffle Works */}
        <section className="bg-white py-12 px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl font-bold mb-4" style={{ color: '#1A202C' }}>
              How TheGiftShuffle Works
            </h2>
            <p className="text-gray-600 mb-6">
              Not finding the right fit? Use TheGiftShuffle — pick Mom, set your budget, and get
              a personalized Mother&apos;s Day gift recommendation in seconds.
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
              { href: '/gift-ideas-for-mom', label: 'Gift Ideas for Mom' },
              { href: '/mothers-day-gifts-under-50', label: "Mother's Day Gifts Under $50" },
              { href: '/mothers-day-gifts-under-25', label: "Mother's Day Gifts Under $25" },
              { href: '/gift-ideas-for-her', label: 'Gift Ideas for Her' },
              { href: '/gifts-under-50', label: 'Gifts Under $50' },
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
