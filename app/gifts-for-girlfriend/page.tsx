import type { Metadata } from 'next';
import GiftGuideTemplate from '@/components/GiftGuideTemplate';
import { curate, shufflePool, ALL } from '@/lib/giftSelect';

const URL = 'https://www.thegiftshuffle.com/gifts-for-girlfriend';

const match = (p: { recipients?: string[]; occasions?: string[] }) =>
  (!!p.recipients?.includes('her') || !!p.recipients?.includes('couples')) &&
  (!!p.occasions?.includes('valentines') ||
    !!p.occasions?.includes('anniversary') ||
    !!p.occasions?.includes('justBecause') ||
    !!p.occasions?.includes('birthday'));
const grid = curate({ match, minPrice: 20, minRating: 4.5, sort: 'social', recipientCap: 30, limit: 40, pool: ALL });
const shuffle = shufflePool(match, ALL);

export const metadata: Metadata = {
  title: `Gifts for Your Girlfriend: ${grid.length} Ideas She Will Actually Love (2026) | TheGiftShuffle`,
  description:
    'Stuck on what to get your girlfriend? 30 top-rated gift ideas for your girlfriend in 2026, from sweet and romantic to fun and practical, at every budget.',
  keywords: [
    'gifts for girlfriend',
    'gift ideas for girlfriend',
    'what to get my girlfriend',
    'gift ideas for your girlfriend',
    'best gift ideas for your girlfriend',
    'cute gift ideas for wife',
    'what should i get my girlfriend',
    'gift for my girlfriend ideas',
    'gift ideas for my girlfriend',
    'gift ideas for my girlfriend 2026',
    'gifts for girlfriend 2026',
  ],
  openGraph: {
    title: `Gifts for Your Girlfriend: ${grid.length} Ideas She Will Actually Love (2026) | TheGiftShuffle`,
    description: '30 top-rated gift ideas for your girlfriend in 2026, from sweet to practical. Every budget covered.',
    type: 'website',
    url: URL,
    images: [{ url: 'https://www.thegiftshuffle.com/api/og?title=Gifts%20for%20Your%20Girlfriend%20%7C%20TheGiftShuffle', width: 1200, height: 630 }],
  },
  alternates: { canonical: URL },
};


export default function Page() {
  return (
    <GiftGuideTemplate
      canonicalUrl={URL}
      schemaName="Gifts for Your Girlfriend"
      schemaDescription="The best gift ideas for your girlfriend, curated by TheGiftShuffle"
      breadcrumbLabel="Gifts for Your Girlfriend"
      breadcrumbHref="/gifts-for-girlfriend"
      heroSrc="/images/heroes/gifts-for-girlfriend.jpg"
      heroAlt="A thoughtful gift for a girlfriend with flowers and a present"
      h1="Gifts for Your Girlfriend"
      intro={
        <>
          <p>
            Stuck on what to get your girlfriend? These <strong>30 gift ideas for your
            girlfriend</strong> in 2026 are top-rated and chosen to feel thoughtful, whether you
            want something sweet and romantic, fun and unexpected, or genuinely useful. No guessing,
            no last-minute panic.
          </p>
          <p className="text-base text-gray-600">
            From a birthday or anniversary to a just-because surprise, this list works for any
            moment and any budget. Scroll the picks below, or hit shuffle for a fresh idea every
            click.
          </p>
        </>
      }
      answer={{
        heading: 'What Should I Get My Girlfriend?',
        body: (
          <p>
            The best gift ideas for your girlfriend feel <strong>personal, not generic</strong>: a
            piece of <strong>jewelry she would actually wear</strong>, a <strong>cozy set in her
            favorite color</strong>, a <strong>designer fragrance or luxe beauty item</strong>, a{' '}
            <strong>hobby upgrade</strong>, or an <strong>experience for the two of you</strong>. Anchor
            it to something she already loves, a scent, a show she is obsessed with, a daily ritual, and
            add a handwritten note. Specific and thoughtful beats generically expensive every time. Not
            sure? Hit shuffle below for an instant, top-rated pick in your budget.
          </p>
        ),
      }}
      shuffleHeading="Shuffle Girlfriend Gift Picks"
      shuffleProducts={shuffle}
      gridHeading={`${grid.length} Gift Ideas for Your Girlfriend`}
      gridProducts={grid}
      ctaHeading="Want Something Even More Her Style?"
      ctaText="Tell TheGiftShuffle a little about her and your budget, and get an instant gift idea in one click."
      faqs={[
        { q: 'What is a good gift for your girlfriend?', a: 'A good gift for your girlfriend matches her specific taste and feels personal: a piece of jewelry she would actually wear, a cozy set in her favorite color, a hobby upgrade, or a curated experience for the two of you. Specific and thoughtful beats generically expensive every time.' },
        { q: 'What should I get my girlfriend who is hard to shop for?', a: 'If she is hard to shop for, anchor on something she already loves and upgrade it: a premium version of her daily coffee or skincare, a gift tied to a hobby, or an experience you can share. When in doubt, a thoughtful personalized item rarely misses.' },
        { q: 'What are good girlfriend gifts under $50?', a: 'Under $50, strong girlfriend gifts include a personalized necklace, a silk pillowcase or scrunchie set, a premium candle, an aromatherapy diffuser, a cozy throw, or a self-care gift box. Add a handwritten note and a small gift feels intentional.' },
        { q: 'What is a romantic gift for a girlfriend?', a: 'Romantic girlfriend gifts are personal: an engraved bracelet or necklace, a custom star map of a date that matters, a memory photo book, or a planned date night. See our romantic gifts for her guide for more ideas that feel personal rather than predictable.' },
        { q: 'What do you get your girlfriend for her birthday?', a: 'For her birthday, combine something she wants with a touch of surprise: jewelry, a luxe beauty or skincare set, a hobby upgrade, or an experience. Browse our best gifts for her and best birthday gifts guides for top-rated picks across every budget.' },
      ]}
      relatedHeading="More Gift Guides for Her"
      relatedLinks={[
        { href: '/best-gifts-for-her-2026', label: 'Best Gifts for Her 2026' },
        { href: '/romantic-gifts-for-her', label: 'Romantic Gifts for Her' },
        { href: '/best-anniversary-gifts-2026', label: 'Best Anniversary Gifts 2026' },
        { href: '/best-beauty-gifts-2026', label: 'Best Beauty Gifts 2026' },
        { href: '/gift-ideas-for-her', label: 'Gift Ideas for Her' },
        { href: '/gifts-under-50', label: 'Gifts Under $50' },
      ]}
    />
  );
}
