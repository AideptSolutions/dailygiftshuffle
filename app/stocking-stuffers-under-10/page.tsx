import type { Metadata } from 'next';
import GiftGuideTemplate from '@/components/GiftGuideTemplate';
import { curate, shufflePool, ALL } from '@/lib/giftSelect';

const URL = 'https://www.thegiftshuffle.com/stocking-stuffers-under-10';

export const metadata: Metadata = {
  title: 'Stocking Stuffers Under $10 (2026): 30 Tiny Gifts That Feel Big | TheGiftShuffle',
  description:
    'The best stocking stuffers under $10 for 2026: top-rated small gifts for him, her, kids and teens that feel way more expensive than they are. Fill every stocking without blowing the budget.',
  keywords: [
    'stocking stuffers under 10',
    'stocking stuffers under $10',
    'cheap stocking stuffers',
    'budget stocking stuffers',
    'inexpensive stocking stuffers',
    'small gifts under 10 dollars',
    'stocking stuffer ideas cheap',
  ],
  openGraph: {
    title: 'Stocking Stuffers Under $10 (2026): 30 Tiny Gifts That Feel Big',
    description: 'Top-rated stocking stuffers under $10 that feel way more expensive than they are.',
    type: 'website',
    url: URL,
    images: [{ url: 'https://www.thegiftshuffle.com/images/heroes/stocking-stuffers-under-10.jpg', width: 1200, height: 800 }],
  },
  alternates: { canonical: URL },
};

const match = (p: { price?: number }) => (p.price ?? 999) <= 10 && (p.price ?? 0) >= 3;
const grid = curate({ match, minRating: 4.5, sort: 'social', recipientCap: 10, limit: 30, pool: ALL });
const shuffle = shufflePool(match, ALL);

export default function Page() {
  return (
    <GiftGuideTemplate
      canonicalUrl={URL}
      schemaName="Stocking Stuffers Under $10 (2026)"
      schemaDescription="The best stocking stuffers under $10 for 2026, curated by TheGiftShuffle"
      breadcrumbLabel="Stocking Stuffers Under $10"
      breadcrumbHref="/stocking-stuffers-under-10"
      heroSrc="/images/heroes/stocking-stuffers-under-10.jpg"
      heroAlt="Small inexpensive stocking stuffer gifts spilling from a red Christmas stocking"
      h1="Stocking Stuffers Under $10 for 2026"
      intro={
        <>
          <p>
            These are the best <strong>stocking stuffers under $10</strong>: the tiny gifts that get
            an actual reaction on Christmas morning instead of a polite nod. Every pick is rated{' '}
            <strong>4.5 stars or higher</strong> by real buyers, and every one costs less than two
            fancy coffees.
          </p>
          <p className="text-base text-gray-600">
            Filling stockings for the whole house? Shuffle below for a fresh under-$10 idea every
            click, and see the{' '}
            <a href="/stocking-stuffers" className="font-semibold underline underline-offset-2">
              full stocking stuffer guide
            </a>{' '}
            when the budget stretches a little further.
          </p>
        </>
      }
      answer={{
        heading: 'What Are Good Stocking Stuffers Under $10?',
        body: (
          <p>
            The best stocking stuffers under $10 are small items people use constantly:{' '}
            <strong>fuzzy or funny socks</strong>, <strong>lip balm</strong>, a{' '}
            <strong>keychain flashlight</strong>, <strong>hand warmers</strong>, a{' '}
            <strong>deck of cards or mini game</strong>, <strong>hair scrunchies</strong>, a{' '}
            <strong>pocket multitool</strong>, or a favorite <strong>candy or hot sauce</strong>.
            One practical pick plus one cozy pick plus one silly pick fills a stocking for under
            $30 total, and every item on this page clears a 4.5-star rating from real buyers.
          </p>
        ),
      }}
      shuffleHeading="Shuffle Under-$10 Stuffers"
      shuffleProducts={shuffle}
      gridHeading={`${grid.length} Best Stocking Stuffers Under $10, Ranked`}
      gridProducts={grid}
      ctaHeading="Stuffing More Than One Stocking?"
      ctaText="Tell TheGiftShuffle who it is for and get an instant small-gift idea in one click."
      faqs={[
        {
          q: 'What are the best stocking stuffers under $10?',
          a: 'The best stocking stuffers under $10 are small daily-use items: quality socks, lip balm, hand warmers, a keychain flashlight, a deck of cards, scrunchies, travel-size skincare, or a favorite candy. Useful beats novel: the $8 thing they use every week lands better than a $10 gag.',
        },
        {
          q: 'How many stocking stuffers should go in one stocking?',
          a: 'Four to six items fills a standard stocking well: one practical pick, one cozy pick, one fun or silly pick, one treat, and one or two tiny extras. At under $10 per item that is a full, satisfying stocking for $30 to $50.',
        },
        {
          q: 'What cheap stocking stuffers do not feel cheap?',
          a: 'Pick items where the budget version is the normal version: lip balm, socks, playing cards, hand warmers, hot sauce, and keychain tools. Nobody expects a luxury deck of cards, so a well-made $7 one reads as thoughtful rather than cheap.',
        },
        {
          q: 'What are good stocking stuffers under $10 for kids?',
          a: 'Kids do best with small activity items: card games, glow sticks, mini puzzles, slime or putty, fun socks, and character bandages. Skip anything with tiny batteries for young children and lean on the classics that survive every trend cycle.',
        },
      ]}
      relatedHeading="More Gift Guides"
      relatedLinks={[
        { href: '/stocking-stuffers', label: 'All Stocking Stuffers' },
        { href: '/stocking-stuffers-for-her', label: 'Stocking Stuffers for Her' },
        { href: '/stocking-stuffers-for-him', label: 'Stocking Stuffers for Him' },
        { href: '/gifts-under-25', label: 'Gifts Under $25' },
        { href: '/christmas-gift-ideas', label: 'Christmas Gift Ideas' },
        { href: '/secret-santa-gifts', label: 'Secret Santa Gifts' },
        { href: '/stocking-stuffers-for-kids', label: 'Stocking Stuffers for Kids' },
        { href: '/help-me-pick-a-gift', label: 'Help Me Pick a Gift' },
      ]}
    />
  );
}
