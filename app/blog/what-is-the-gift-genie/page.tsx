import type { Metadata } from 'next';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import JsonLd from '@/components/JsonLd';

const URL = 'https://www.thegiftshuffle.com/blog/what-is-the-gift-genie';
const IMG = 'https://www.thegiftshuffle.com/img/blog/what-is-the-gift-genie.jpg';

export const metadata: Metadata = {
  title: 'What Is the Gift Genie? Inside Our Free AI Gift Finder | TheGiftShuffle',
  description:
    'A plain-English breakdown of the Gift Genie: what it is, how the pin-reading AI actually works, why it beats gift quizzes, and how to get the best reading. Free, no sign-up.',
  openGraph: {
    title: 'What Is the Gift Genie? Inside Our Free AI Gift Finder',
    description:
      'What the Gift Genie is, how the pin-reading AI works, and why it beats gift quizzes. Free, no sign-up.',
    type: 'article',
    url: URL,
    images: [{ url: IMG, width: 1200, height: 675, alt: 'Meet the Gift Genie, the free AI gift finder from TheGiftShuffle' }],
    publishedTime: '2026-09-04T08:00:00Z',
  },
  alternates: { canonical: URL },
};

const articleSchema = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'What Is the Gift Genie? Inside Our Free AI Gift Finder',
  description:
    'What the Gift Genie is, how the pin-reading AI works, why it beats gift quizzes, and how to get the best reading.',
  image: IMG,
  datePublished: '2026-09-04T08:00:00Z',
  author: { '@type': 'Organization', name: 'TheGiftShuffle' },
  publisher: {
    '@type': 'Organization',
    name: 'TheGiftShuffle',
    logo: { '@type': 'ImageObject', url: 'https://www.thegiftshuffle.com/logo.png' },
  },
  url: URL,
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Is the Gift Genie really free?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. Every visitor gets 3 readings per day and up to 15 per week, with no account, no email, and no card. The limits exist only to keep the AI costs sane.',
      },
    },
    {
      '@type': 'Question',
      name: 'How is the Gift Genie different from a gift quiz?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Quizzes only know what you tell them in dropdowns. The Genie also reads the gifts you pinned while browsing, which capture taste that questions miss, the same way a friend infers what someone likes from what catches their eye in a store.',
      },
    },
    {
      '@type': 'Question',
      name: 'Where do the Gift Genie recommendations come from?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Only from the hand-curated TheGiftShuffle catalog of highly rated gifts. The AI cannot invent products or pull from anywhere else, which keeps every pick a real, vetted item.',
      },
    },
    {
      '@type': 'Question',
      name: 'What information does the Gift Genie collect?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Just your pinned gifts and quiz answers. It never asks for your name or email, and readings are stored anonymously so you can share them by link.',
      },
    },
  ],
};

function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="text-2xl font-bold mt-10 mb-3" style={{ color: '#1A202C' }}>
      {children}
    </h2>
  );
}

export default function WhatIsTheGiftGeniePage() {
  return (
    <div className="min-h-screen flex flex-col" style={{ background: '#FFFFFF' }}>
      <JsonLd data={articleSchema} id="genie-article-schema" />
      <JsonLd data={faqSchema} id="genie-article-faq-schema" />
      <Navbar />

      <main className="flex-1">
        <article className="max-w-2xl mx-auto px-4 py-10">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wide text-[#F04E30] mb-3">
            <span>Product</span>
            <span className="text-gray-300">&bull;</span>
            <span className="text-gray-400 normal-case font-medium">September 4, 2026</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold leading-tight mb-4" style={{ color: '#1A202C' }}>
            What Is the Gift Genie? Inside Our Free AI Gift Finder
          </h1>

          {/* Direct answer up front, for readers and answer engines alike. */}
          <p className="text-lg text-gray-600 leading-relaxed mb-6">
            The Gift Genie is a free AI gift finder built into TheGiftShuffle. You pin
            gifts that feel close to right while you browse, answer three quick
            questions about the person, and the Genie reads your pins to write a short
            profile of their taste and recommend 5 matched gifts, each with a
            confidence score. It needs no account and costs nothing: every visitor
            gets 3 readings a day.
          </p>

          <img
            src="/img/blog/what-is-the-gift-genie.jpg"
            alt="Meet the Gift Genie, the free AI gift finder from TheGiftShuffle"
            className="w-full rounded-2xl border border-[#E2E8F0] mb-2"
          />
          <p className="text-xs text-gray-400 text-center mb-8">
            Pin gifts, answer three questions, get five matched picks.
          </p>

          <SectionHeading>The problem it solves</SectionHeading>
          <p className="text-gray-600 leading-relaxed mb-4">
            Everyone knows the feeling: you scroll a hundred gift lists, a few things
            seem <em>almost</em> right, and an hour later you still have nothing. The
            almost-right ones are the interesting part. They carry real information
            about the person you are shopping for, but no gift site does anything
            with them. You close the tab and the signal is gone.
          </p>
          <p className="text-gray-600 leading-relaxed mb-4">
            The Gift Genie exists to catch that signal. Instead of asking you to
            describe someone from scratch, it lets your browsing do the describing.
          </p>

          <SectionHeading>How it works, step by step</SectionHeading>
          <p className="text-gray-600 leading-relaxed mb-4">
            <strong>1. You pin.</strong> Every gift card on the site has a small pin
            button. Pinning holds that card in place while you shuffle for new ideas,
            and your pins follow you from page to page. Three to five pins is the
            sweet spot.
          </p>
          <p className="text-gray-600 leading-relaxed mb-4">
            <strong>2. You answer three quick questions.</strong> Who the gift is for,
            the occasion, and your budget, plus a check-all-that-apply list of
            personality traits (outdoorsy, fancy, techy, loves a laugh, and so on) and
            an optional free-text note. Twenty seconds of input.
          </p>
          <p className="text-gray-600 leading-relaxed mb-4">
            <strong>3. The Genie reads.</strong> An AI model looks at your pins the
            way a perceptive friend would: what do these choices have in common, and
            what kind of person do they add up to? It writes a short, playful profile
            of the recipient, then scores our entire hand-curated catalog against
            that read.
          </p>
          <p className="text-gray-600 leading-relaxed mb-4">
            <strong>4. You get five picks.</strong> Ranked by confidence, each with a
            one-line reason. Up to three of your own pins can make the list, but only
            when they genuinely fit; at least two picks are always discoveries you had
            not seen. Every reading gets a share link with a preview card, so you can
            send it to a friend for a second opinion.
          </p>

          <SectionHeading>Why the pins matter so much</SectionHeading>
          <p className="text-gray-600 leading-relaxed mb-4">
            Gift quizzes have existed forever, and they all share a flaw: dropdowns
            flatten people. &quot;Woman, 60s, likes gardening&quot; describes a million
            different grandmothers. But the specific three gifts that made you pause,
            a copper herb planter, a linen apron, a novel about a botanist, describe
            exactly one. Taste lives in choices, not categories, and pins are choices.
          </p>
          <p className="text-gray-600 leading-relaxed mb-4">
            That is also why the Genie is entertaining rather than clinical. The
            profile it writes back (&quot;equally at home firing up the grill as he is
            tinkering in the garage&quot;) is the fun of showing a friend three photos and
            hearing them nail the person. Half tool, half party trick, and it makes
            the picks easier to trust because you can see the reasoning.
          </p>

          <SectionHeading>What it will not do</SectionHeading>
          <p className="text-gray-600 leading-relaxed mb-4">
            The Genie only recommends from our own catalog of highly rated,
            hand-vetted gifts. It cannot invent products, link to junk, or push
            anything we would not put in a guide ourselves. It also collects nothing
            about you: no account, no email, no tracking profile. Your pins live in
            your own browser, and readings are stored anonymously so share links work.
          </p>

          <SectionHeading>Getting the best reading</SectionHeading>
          <ul className="list-disc pl-5 text-gray-600 leading-relaxed mb-4 space-y-2">
            <li>
              Pin 3 to 5 gifts, ideally from different pages. Variety gives the Genie
              more to triangulate from than five versions of the same idea.
            </li>
            <li>
              Pin for the <em>person</em>, not the occasion. The almost-right things
              you would not actually buy are still great signals.
            </li>
            <li>
              Use the traits and the free-text note. One concrete detail (&quot;loves
              grilling, hates clutter&quot;) sharpens the whole reading.
            </li>
            <li>
              Out of ideas to pin? Hit shuffle a few times first. That is what it is
              for.
            </li>
          </ul>

          <div className="rounded-3xl border border-[#DDD6FE] p-6 my-8 text-center" style={{ background: '#F5F3FF' }}>
            <p className="font-bold text-gray-800 mb-2">Ready to try it?</p>
            <p className="text-sm text-gray-500 mb-4">
              Three readings a day, free, no sign-up. The lamp is waiting.
            </p>
            <Link
              href="/gift-genie"
              className="btn-genie inline-block text-white font-bold px-8 py-3 rounded-full text-sm"
            >
              Summon the Gift Genie
            </Link>
          </div>

          <SectionHeading>Quick answers</SectionHeading>
          <div className="space-y-4 mb-8">
            <div>
              <h3 className="font-bold text-gray-800">Is it really free?</h3>
              <p className="text-gray-600 leading-relaxed">
                Yes: 3 readings a day, up to 15 a week, no account or card. The limits
                just keep our AI costs sane.
              </p>
            </div>
            <div>
              <h3 className="font-bold text-gray-800">How is it different from a gift quiz?</h3>
              <p className="text-gray-600 leading-relaxed">
                Quizzes only know your dropdown answers. The Genie also reads the
                gifts you pinned, which capture taste that questions miss.
              </p>
            </div>
            <div>
              <h3 className="font-bold text-gray-800">Where do the recommendations come from?</h3>
              <p className="text-gray-600 leading-relaxed">
                Only the hand-curated TheGiftShuffle catalog. The AI cannot pull from
                anywhere else.
              </p>
            </div>
            <div>
              <h3 className="font-bold text-gray-800">What does it collect about me?</h3>
              <p className="text-gray-600 leading-relaxed">
                Just your pins and quiz answers. No name, no email, no profile.
              </p>
            </div>
          </div>

          <p className="text-sm text-gray-500">
            More from TheGiftShuffle:{' '}
            <Link href="/gift-genie" className="text-[#F04E30] font-semibold underline underline-offset-2">
              the Gift Genie page
            </Link>
            {', '}
            <Link href="/shuffle" className="text-[#F04E30] font-semibold underline underline-offset-2">
              the gift shuffle
            </Link>
            {', or '}
            <Link href="/blog" className="text-[#F04E30] font-semibold underline underline-offset-2">
              the blog
            </Link>
            .
          </p>
        </article>
      </main>
    </div>
  );
}
