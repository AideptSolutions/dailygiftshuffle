import type { Metadata } from 'next';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import JsonLd from '@/components/JsonLd';
import InlineShuffle from '@/components/InlineShuffle';
import { LampIcon, SparkleIcon, TokenIcon } from '@/components/genie/GenieIcons';
import { curate, ALL } from '@/lib/giftSelect';

const URL = 'https://www.thegiftshuffle.com/gift-genie';

export const metadata: Metadata = {
  title: 'Gift Genie: Free AI Gift Finder | TheGiftShuffle',
  description:
    'The Gift Genie is a free AI gift finder. Pin gifts you like, answer three quick questions, and it reads your picks to conjure 5 matched gifts with confidence scores. No sign-up, 3 readings a day.',
  keywords: [
    'AI gift finder',
    'gift genie',
    'AI gift recommendations',
    'free gift finder',
    'gift picker AI',
    'personalized gift ideas',
    'what to buy for someone',
  ],
  openGraph: {
    title: 'Gift Genie: Free AI Gift Finder',
    description:
      'Pin gifts you like, answer three quick questions, and the Genie conjures 5 AI-matched gifts. Free, no sign-up.',
    type: 'website',
    url: URL,
  },
  alternates: { canonical: URL },
};

const appSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'Gift Genie',
  url: URL,
  applicationCategory: 'ShoppingApplication',
  operatingSystem: 'Web',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
  description:
    'A free AI gift finder that reads the gifts you pin, asks three quick questions about the recipient, and returns 5 matched gift ideas ranked by confidence.',
  publisher: { '@type': 'Organization', name: 'TheGiftShuffle' },
};

const FAQS = [
  {
    q: 'What is the Gift Genie?',
    a: 'The Gift Genie is a free AI gift finder on TheGiftShuffle. You pin gifts that feel close to right while browsing, answer three quick questions about the person, and the Genie reads your pins to infer their taste, then recommends 5 gifts from our hand-curated catalog, ranked by confidence.',
  },
  {
    q: 'How does the Gift Genie work?',
    a: 'Your pinned gifts act as taste signals. The Genie combines them with your answers (who it is for, the occasion, budget, and personality traits), writes a short read of the recipient, and picks 5 matches. Up to 3 of your own pins can make the list if they genuinely fit; at least 2 are always fresh discoveries.',
  },
  {
    q: 'Is the Gift Genie free?',
    a: 'Yes. Everyone gets 3 readings per day (up to 15 per week) with no sign-up, no account, and no card. Just pin a few gifts and summon it.',
  },
  {
    q: 'What are pins and how do I add them?',
    a: 'Every gift card on TheGiftShuffle has a small pin button in its corner. Pinning holds that card in place while you shuffle and tells the Genie what caught your eye. Pins are saved in your browser and follow you across every page.',
  },
  {
    q: 'Can I share my Genie results?',
    a: 'Yes. Every reading gets its own share link with a preview card, so you can send the recipient profile and the 5 picks to a friend or post it anywhere.',
  },
  {
    q: 'Does the Gift Genie need my personal information?',
    a: 'No. It never asks for your name, email, or any account. The only things it reads are the gifts you pinned and the quiz answers you type.',
  },
];

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: FAQS.map((f) => ({
    '@type': 'Question',
    name: f.q,
    acceptedAnswer: { '@type': 'Answer', text: f.a },
  })),
};

// A broad, giftable pool so visitors can pin right on this page. The GeniePanel
// rides inside InlineShuffle, so this page is a working demo, not a brochure.
const demoPool = curate({
  match: () => true,
  sort: 'social',
  minRating: 4.5,
  minPrice: 20,
  limit: 40,
  pool: ALL,
});

const STEPS = [
  {
    icon: <TokenIcon className="w-7 h-7" />,
    title: '1. Pin what feels close',
    desc: 'Shuffle gifts anywhere on the site and tap the pin on anything that seems almost right. Pins stick while you browse.',
  },
  {
    icon: <SparkleIcon className="w-7 h-7" />,
    title: '2. Answer three questions',
    desc: 'Who it is for, the occasion, your budget, and a few check-the-box personality traits. Twenty seconds, tops.',
  },
  {
    icon: <LampIcon className="w-7 h-7" />,
    title: '3. Get your reading',
    desc: 'The Genie writes a playful read of your person and conjures 5 matched gifts ranked by confidence, with a link to share.',
  },
];

export default function GiftGeniePage() {
  return (
    <div className="min-h-screen flex flex-col" style={{ background: '#FFFFFF' }}>
      <JsonLd data={appSchema} id="gift-genie-app-schema" />
      <JsonLd data={faqSchema} id="gift-genie-faq-schema" />
      <Navbar />

      <main className="flex-1">
        {/* Hero: the first paragraph is a direct answer for search and AI
            answer engines. */}
        <section className="max-w-3xl mx-auto px-4 pt-12 pb-8 text-center">
          <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wide text-[#F04E30] mb-3">
            <LampIcon className="w-4 h-4" />
            New on TheGiftShuffle
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold leading-tight mb-4" style={{ color: '#1A202C' }}>
            Meet the <span style={{ color: '#F04E30' }}>Gift Genie</span>
          </h1>
          <p className="text-lg text-gray-600 leading-relaxed">
            The Gift Genie is a free AI gift finder. Pin gifts that feel close, answer
            three quick questions, and it reads your picks to conjure 5 matched gifts,
            ranked by confidence. No sign-up, no card, 3 readings a day.
          </p>
        </section>

        {/* How it works */}
        <section className="max-w-4xl mx-auto px-4 py-8">
          <h2 className="text-2xl font-bold mb-6 text-center" style={{ color: '#1A202C' }}>
            How it works
          </h2>
          <div className="grid sm:grid-cols-3 gap-4">
            {STEPS.map((s) => (
              <div key={s.title} className="rounded-3xl border border-[#E2E8F0] p-6" style={{ background: '#F0F4F8' }}>
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-white border border-[#E2E8F0] text-[#F04E30] mb-3">
                  {s.icon}
                </div>
                <h3 className="font-bold text-gray-800 mb-1.5">{s.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Live demo: shuffle to pin, Genie panel included below the grid */}
        <section className="max-w-5xl mx-auto px-4 py-8">
          <h2 className="text-2xl font-bold mb-2 text-center" style={{ color: '#1A202C' }}>
            Try it right here
          </h2>
          <p className="text-sm text-gray-500 text-center mb-6">
            Shuffle the cards, pin a few that feel close, then summon the Genie below the grid.
          </p>
          <InlineShuffle products={demoPool} heading="Pin a few of these" />
        </section>

        {/* Why it is useful */}
        <section className="max-w-4xl mx-auto px-4 py-8">
          <h2 className="text-2xl font-bold mb-6 text-center" style={{ color: '#1A202C' }}>
            Why it beats guessing
          </h2>
          <div className="grid sm:grid-cols-3 gap-4">
            <div className="rounded-3xl border border-[#E2E8F0] p-6 bg-white">
              <h3 className="font-bold text-gray-800 mb-1.5">Your pins do the talking</h3>
              <p className="text-sm text-gray-500 leading-relaxed">
                Quizzes alone miss taste. The gifts you almost picked say more about a
                person than any dropdown, and the Genie reads exactly that.
              </p>
            </div>
            <div className="rounded-3xl border border-[#E2E8F0] p-6 bg-white">
              <h3 className="font-bold text-gray-800 mb-1.5">Curated, not scraped</h3>
              <p className="text-sm text-gray-500 leading-relaxed">
                It only recommends from our hand-curated catalog of highly rated gifts,
                so every pick is something we would put in a guide ourselves.
              </p>
            </div>
            <div className="rounded-3xl border border-[#E2E8F0] p-6 bg-white">
              <h3 className="font-bold text-gray-800 mb-1.5">Honest confidence</h3>
              <p className="text-sm text-gray-500 leading-relaxed">
                Each pick carries a confidence score and a one-line reason, and your own
                pins only make the top 5 when they genuinely fit.
              </p>
            </div>
          </div>
        </section>

        {/* FAQ (visible text mirrors the FAQPage schema) */}
        <section className="max-w-3xl mx-auto px-4 py-8">
          <h2 className="text-2xl font-bold mb-6 text-center" style={{ color: '#1A202C' }}>
            Gift Genie FAQ
          </h2>
          <div className="space-y-4">
            {FAQS.map((f) => (
              <div key={f.q} className="rounded-2xl border border-[#E2E8F0] p-5" style={{ background: '#F0F4F8' }}>
                <h3 className="font-bold text-gray-800 mb-1">{f.q}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{f.a}</p>
              </div>
            ))}
          </div>
          <p className="text-sm text-gray-500 text-center mt-8">
            Want the full story?{' '}
            <Link href="/blog/what-is-the-gift-genie" className="text-[#F04E30] font-semibold underline underline-offset-2">
              Read how the Gift Genie works under the hood
            </Link>
            , or{' '}
            <Link href="/shuffle" className="text-[#F04E30] font-semibold underline underline-offset-2">
              start shuffling gifts
            </Link>{' '}
            to build your pins.
          </p>
        </section>
      </main>
    </div>
  );
}
