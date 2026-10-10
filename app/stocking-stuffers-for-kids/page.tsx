import type { Metadata } from 'next';
import GiftGuideTemplate from '@/components/GiftGuideTemplate';
import { curate, shufflePool, ALL } from '@/lib/giftSelect';

const URL = 'https://www.thegiftshuffle.com/stocking-stuffers-for-kids';

export const metadata: Metadata = {
  title: 'Stocking Stuffers for Kids 2026: Small Gifts They Will Actually Play With | TheGiftShuffle',
  description:
    'The best stocking stuffers for kids in 2026: top-rated small toys, games and activities under $25 that survive past Christmas morning. Screen-free picks by age, all verified this season.',
  keywords: [
    'stocking stuffers for kids',
    'kids stocking stuffers',
    'stocking stuffers for boys',
    'stocking stuffers for girls',
    'stocking stuffers for toddlers',
    'small gifts for kids under 25',
  ],
  openGraph: {
    title: 'Stocking Stuffers for Kids 2026: Small Gifts They Will Actually Play With',
    description: 'Top-rated small toys, games and activities under $25 that survive past Christmas morning.',
    type: 'website',
    url: URL,
    images: [{ url: 'https://www.thegiftshuffle.com/images/heroes/stocking-stuffers-for-kids.jpg', width: 1200, height: 800 }],
  },
  alternates: { canonical: URL },
};

const match = (p: { price?: number; recipients?: string[] }) =>
  (p.price ?? 999) <= 25 && (p.price ?? 0) >= 3 && !!p.recipients?.includes('kids');
const grid = curate({ match, minRating: 4.5, sort: 'social', recipientCap: 40, limit: 30, pool: ALL });
const shuffle = shufflePool(match, ALL);

export default function Page() {
  return (
    <GiftGuideTemplate
      canonicalUrl={URL}
      schemaName="Stocking Stuffers for Kids 2026"
      schemaDescription="The best stocking stuffers for kids in 2026, curated by TheGiftShuffle"
      breadcrumbLabel="Stocking Stuffers for Kids"
      breadcrumbHref="/stocking-stuffers-for-kids"
      heroSrc="/images/heroes/stocking-stuffers-for-kids.jpg"
      heroAlt="Kids stocking stuffers including a puzzle cube, toy cars, crayons and games around a red stocking"
      h1="Stocking Stuffers for Kids, 2026 Edition"
      intro={
        <>
          <p>
            The best <strong>stocking stuffers for kids</strong> are the small things still being
            played with in February: card games, puzzle cubes, toy cars and mess-free activities.
            Every pick here is under $25, rated <strong>4.5 stars or higher</strong>, and verified
            in stock this season.
          </p>
          <p className="text-base text-gray-600">
            Filling stockings for more than one kid? Shuffle below for a fresh idea every click,
            and mix ages freely: half of these work for grown-ups too.
          </p>
        </>
      }
      answer={{
        heading: 'What Are the Best Stocking Stuffers for Kids?',
        body: (
          <p>
            The best stocking stuffers for kids are screen-free and instantly playable: a{' '}
            <strong>Hot Wheels pack</strong>, <strong>UNO or a card game</strong>, a{' '}
            <strong>Rubik&apos;s Cube</strong>, <strong>Mad Libs</strong>,{' '}
            <strong>Water Wow mess-free coloring</strong>, <strong>glow sticks</strong>, and{' '}
            <strong>Bananagrams</strong> for older kids. One activity, one toy, one game and one
            treat fills a stocking that stays interesting past breakfast; everything on this page
            is under $25 and rated 4.5 stars or higher.
          </p>
        ),
      }}
      shuffleHeading="Shuffle Kids Stuffers"
      shuffleProducts={shuffle}
      gridHeading={`${grid.length} Best Stocking Stuffers for Kids, Ranked`}
      gridProducts={grid}
      ctaHeading="Shopping for a Specific Age?"
      ctaText="Tell TheGiftShuffle who it is for and get an instant kid-approved idea in one click."
      faqs={[
        {
          q: 'What are the best stocking stuffers for kids in 2026?',
          a: 'The reliable winners are classics with staying power: Hot Wheels packs, UNO, a Rubiks Cube, Mad Libs, Water Wow mess-free coloring for little ones, glow sticks, and Bananagrams for readers. Small activities beat small trinkets: anything they can DO on Christmas morning wins.',
        },
        {
          q: 'What stocking stuffers work for toddlers?',
          a: 'For toddlers, stick to mess-free and chunky: Water Wow water-reveal pads, board books, bath toys, chunky crayons and character socks. Skip anything with small parts or button batteries.',
        },
        {
          q: 'What stocking stuffers do older kids and tweens actually like?',
          a: 'Tweens want small things that feel grown up: a Rubiks Cube, card games they can play with friends, glow gear, fun socks, a mini light-up gadget, or craft kits. Game-like beats babyish every time.',
        },
        {
          q: 'How much should you spend on kids stocking stuffers?',
          a: 'Kids stockings are the cheapest to fill well: 5 or 6 items at $5 to $15 each makes an overflowing stocking for $30 to $60. Spend the top of the range on one anchor item like a card game or puzzle cube and fill around it.',
        },
      ]}
      relatedHeading="More Gift Guides"
      relatedLinks={[
        { href: '/stocking-stuffers', label: 'All Stocking Stuffers' },
        { href: '/stocking-stuffers-under-10', label: 'Stocking Stuffers Under $10' },
        { href: '/stocking-stuffers-for-mom', label: 'Stocking Stuffers for Mom' },
        { href: '/stocking-stuffers-for-dad', label: 'Stocking Stuffers for Dad' },
        { href: '/gift-ideas-for-kids', label: 'Gift Ideas for Kids' },
        { href: '/gift-ideas-for-teens', label: 'Gift Ideas for Teens' },
        { href: '/christmas-gift-ideas', label: 'Christmas Gift Ideas' },
        { href: '/gifts-under-25', label: 'Gifts Under $25' },
      ]}
    />
  );
}
