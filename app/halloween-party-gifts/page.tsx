import type { Metadata } from 'next';
import GiftGuideTemplate from '@/components/GiftGuideTemplate';
import { curate, shufflePool, ALL } from '@/lib/giftSelect';

const URL = 'https://www.thegiftshuffle.com/halloween-party-gifts';

export const metadata: Metadata = {
  title: 'Halloween Party Essentials 2026: 20 Host-Tested Picks | TheGiftShuffle',
  description:
    'Everything you need to throw a memorable Halloween party in 2026: floating candles, cauldron serveware, party games, glow gear and host gifts. 20 top-rated picks at every budget.',
  keywords: [
    'halloween party essentials',
    'halloween party supplies',
    'halloween party decorations',
    'halloween party ideas 2026',
    'gifts for halloween party host',
    'halloween hostess gifts',
    'adult halloween party games',
    'halloween party decor',
  ],
  openGraph: {
    title: 'Halloween Party Essentials 2026: 20 Host-Tested Picks | TheGiftShuffle',
    description:
      'Floating candles, cauldron serveware, party games and glow gear: 20 top-rated Halloween party picks for 2026.',
    type: 'website',
    url: URL,
    images: [{ url: 'https://www.thegiftshuffle.com/images/heroes/halloween-party-gifts.jpg', width: 1200, height: 800 }],
  },
  alternates: { canonical: URL },
};

const match = (p: { tags?: string[] }) => !!p.tags?.includes('halloween');
const grid = curate({ match, minRating: 4.2, sort: 'social', recipientCap: 50, pool: ALL });
const shuffle = shufflePool(match, ALL);

export default function Page() {
  return (
    <GiftGuideTemplate
      canonicalUrl={URL}
      schemaName="Halloween Party Essentials 2026"
      schemaDescription="Top-rated Halloween party decor, serveware, games and glow gear for 2026, curated by TheGiftShuffle"
      breadcrumbLabel="Halloween Party Essentials"
      breadcrumbHref="/halloween-party-gifts"
      heroSrc="/images/heroes/halloween-party-gifts.jpg"
      heroAlt="A Halloween party table with a smoking cauldron, skull glasses, jack-o-lantern and treats"
      h1="Halloween Party Essentials for 2026"
      intro={
        <>
          <p>
            These are the <strong>Halloween party essentials for 2026</strong>: the decor,
            serveware, games and glow gear that turn a get-together into the party people
            still mention at Thanksgiving. Every pick is top-rated, live-verified this
            season, and chosen for maximum effect per dollar.
          </p>
          <p className="text-base text-gray-600">
            Throwing the party yourself, or showing up as the guest who brought something
            better than a bag of candy? Either way: shuffle below, pin what fits your
            crowd, and build the whole night from one list.
          </p>
        </>
      }
      shuffleHeading="Shuffle Halloween Party Picks"
      shuffleProducts={shuffle}
      gridHeading={`${grid.length} Halloween Party Essentials, Ranked`}
      gridProducts={grid}
      ctaHeading="Hosting for a Mixed Crowd?"
      ctaText="Tell TheGiftShuffle who is coming and your budget, and get an instant party pick in one click."
      faqs={[
        {
          q: 'What do you need for a Halloween party in 2026?',
          a: 'A memorable Halloween party needs four things: atmosphere (floating LED candles, purple and orange string lights, a fog or projector effect), a serving station that photographs well (cauldron bowls, a coffin charcuterie board, skull ice cubes), one planned activity (a murder mystery kit or party game), and party favors like glow sticks or photo booth props.',
        },
        {
          q: 'What is a good gift for a Halloween party host?',
          a: 'The best Halloween host gifts are serveware they will reuse every October: a skull drink dispenser, a coffin charcuterie board, Halloween wine glasses, or a set of skull ice cube molds. They beat a bag of candy and come out again every year.',
        },
        {
          q: 'What are the best Halloween party games for adults?',
          a: 'For adults, a murder mystery dinner kit turns the whole evening into the entertainment, and a voting card game like BAD PEOPLE keeps a costume party laughing. For mixed ages, Halloween bingo runs up to 30 players and photo booth props entertain every generation.',
        },
        {
          q: 'How do you make a Halloween party look good on a budget?',
          a: 'Concentrate the budget on light: purple and orange string lights, black light bars, and floating LED candles transform a room for under $60 combined. Add a lace spiderweb tablecloth and hanging witch hats and the space reads fully decorated for less than one animatronic prop.',
        },
        {
          q: 'What Halloween party essentials work for trick-or-treaters too?',
          a: 'An animated candy bowl startles and delights trick-or-treaters between party duties, glow sticks double as favors and safety lights, and a projector or giant spider web keeps the front of the house in character all month.',
        },
      ]}
      relatedHeading="More Gift Guides"
      relatedLinks={[
        { href: '/category/halloween', label: 'All Halloween Party Gifts' },
        { href: '/white-elephant-gifts', label: 'White Elephant Gifts' },
        { href: '/gifts-under-25', label: 'Gifts Under $25' },
        { href: '/gifts-under-50', label: 'Gifts Under $50' },
        { href: '/gifts-for-coworkers', label: 'Gifts for Coworkers' },
        { href: '/christmas-gift-ideas', label: 'Christmas Gift Ideas' },
        { href: '/gift-ideas-for-her', label: 'Gift Ideas for Her' },
        { href: '/help-me-pick-a-gift', label: 'Help Me Pick a Gift' },
      ]}
    />
  );
}
