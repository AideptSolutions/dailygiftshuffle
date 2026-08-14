import type { Metadata } from 'next';
import GiftGuideTemplate from '@/components/GiftGuideTemplate';
import { curate, shufflePool, ALL } from '@/lib/giftSelect';

const URL = 'https://www.thegiftshuffle.com/gifts-for-wife';

export const metadata: Metadata = {
  title: 'Gifts for Your Wife 2026: 40 Ideas She Will Actually Love | TheGiftShuffle',
  description:
    'Gift ideas for your wife she will actually love: romantic, thoughtful and luxe picks for her birthday, your anniversary, or just because. The best gifts for your wife in 2026 at every budget.',
  keywords: [
    'gifts for wife',
    'gift ideas for my wife',
    'gifts for wife 2026',
    'best gifts for wife',
    'romantic gifts for wife',
    'anniversary gifts for wife',
    'what to get my wife',
    'gift ideas for wife 2026',
    'thoughtful gifts for wife',
  ],
  openGraph: {
    title: 'Gifts for Your Wife 2026: 40 Ideas She Will Actually Love | TheGiftShuffle',
    description: 'Romantic, thoughtful and luxe gift ideas for your wife in 2026, for her birthday, your anniversary, or just because.',
    type: 'website',
    url: URL,
    images: [{ url: 'https://www.thegiftshuffle.com/api/og?title=Gifts%20for%20Your%20Wife%20%7C%20TheGiftShuffle', width: 1200, height: 630 }],
  },
  alternates: { canonical: URL },
};

// Broad, quality set of her-suited gifts, framed for a wife (romantic + everyday luxe).
const match = (p: { recipients?: string[] }) =>
  !!(p.recipients?.includes('her') || p.recipients?.includes('mom') || p.recipients?.includes('couples'));
// Same buyer as /best-gifts-for-her-2026 (a husband), so the same category
// affinity applies: gift-shaped categories first, utility categories behind.
const grid = curate({
  match,
  minPrice: 20,
  minRating: 4.5,
  sort: 'social',
  preferTags: ['beauty', 'luxury', 'home', 'fitness'],
  deprioritizeTags: ['kitchen', 'tech', 'diy-tools', 'car-accessories', 'outdoors', 'gaming', 'office', 'finance', 'sports'],
  recipientCap: 30,
  limit: 48,
  pool: ALL,
});
const shuffle = shufflePool(match, ALL);

export default function Page() {
  return (
    <GiftGuideTemplate
      canonicalUrl={URL}
      schemaName="Gifts for Your Wife 2026"
      schemaDescription="The best gift ideas for your wife in 2026, curated by TheGiftShuffle"
      breadcrumbLabel="Gifts for Your Wife"
      breadcrumbHref="/gifts-for-wife"
      heroSrc="/images/heroes/gifts-for-wife.jpg"
      heroAlt="A romantic gift for a wife with roses and an elegant wrapped present"
      h1="Gifts for Your Wife"
      intro={
        <>
          <p>
            Looking for <strong>gift ideas for your wife</strong>? These are the top-rated picks
            wives actually love in 2026: a little romantic, a little luxe, and always thoughtful.
            Whether it is for her birthday, your anniversary, the holidays, or a just-because
            surprise, every idea here is chosen to feel considered rather than last-minute.
          </p>
          <p className="text-base text-gray-600">
            The list spans every budget, from a small treat to a genuine splurge. Scroll the picks
            below, or hit shuffle for a fresh idea every click.
          </p>
        </>
      }
      answer={{
        heading: 'What Should I Get My Wife?',
        body: (
          <p>
            The gifts that land best for a wife are personal and a touch romantic: <strong>fine or
            personalized jewelry</strong>, a <strong>designer fragrance</strong>, a{' '}
            <strong>silk pillowcase or plush robe</strong>, a <strong>luxe skincare or spa set</strong>,
            or a shared <strong>experience</strong> like a weekend away or a nice dinner. The move that
            never misses is upgrading something she already loves, her coffee, her skincare, a hobby,
            and pairing it with a handwritten note. Not sure? Hit shuffle below for an instant,
            top-rated pick in your budget.
          </p>
        ),
      }}
      shuffleHeading="Shuffle Gifts for Your Wife"
      shuffleProducts={shuffle}
      gridHeading="Top-Rated Gifts for Your Wife, Ranked"
      gridProducts={grid}
      ctaHeading="Still Not Sure What She Would Love?"
      ctaText="Tell TheGiftShuffle a little about her and your budget, and get an instant, personalized gift idea in one click."
      faqs={[
        { q: 'What are good gift ideas for my wife?', a: 'Good gift ideas for your wife blend a little luxury with everyday use: fine or personalized jewelry, a designer fragrance, a silk pillowcase, a plush robe, a premium skincare set, or a shared experience. Tie it to something she already loves and add a handwritten note, and even a modest gift feels deeply personal.' },
        { q: 'What should I get my wife for her birthday?', a: 'For her birthday, combine something she wants with a touch of surprise: a piece of jewelry, a luxe beauty or skincare set, a hobby upgrade, or an experience like a spa day or getaway. If she is hard to shop for, upgrade a daily ritual, her coffee, her skincare, to a premium version.' },
        { q: 'What is a romantic gift for my wife?', a: 'Romantic gifts for a wife are personal and lasting: an engraved bracelet or necklace, a custom star map of a date that matters, a memory photo book, or a planned date night or getaway. Effort and specificity read as far more romantic than simply spending more.' },
        { q: 'What is a good anniversary gift for my wife?', a: 'For an anniversary, think meaningful and enduring: fine jewelry, a premium watch, a designer leather piece engraved with your date, a silk or cashmere upgrade, or an experience you will share. See our anniversary gift guide for ideas at every level.' },
        { q: 'What do you get a wife who has everything?', a: 'For a wife who has everything, go experiential or hyper-personal: a spa day, a cooking or wine-tasting class, a custom keepsake, or a premium upgrade to a daily ritual she loves. These feel fresh because they are about an experience or a memory rather than another object.' },
      ]}
      relatedHeading="More Gift Guides for Her"
      relatedLinks={[
        { href: '/self-care-gifts-for-her', label: 'Self-Care Gifts for Her' },
        { href: '/best-gifts-for-her-2026', label: 'Best Gifts for Her 2026' },
        { href: '/romantic-gifts-for-her', label: 'Romantic Gifts for Her' },
        { href: '/luxury-gifts-for-her', label: 'Luxury Gifts for Her' },
        { href: '/best-anniversary-gifts-2026', label: 'Best Anniversary Gifts 2026' },
        { href: '/gifts-for-girlfriend', label: 'Gifts for Your Girlfriend' },
        { href: '/gift-ideas-for-her', label: 'Gift Ideas for Her' },
      ]}
    />
  );
}
