import type { Metadata } from 'next';
import GiftGuideTemplate, { type GiftGuideGroup } from '@/components/GiftGuideTemplate';
import { forPage, byIds, ALL } from '@/lib/giftSelect';
import type { CompactProduct } from '@/components/ProductCard';

// The shuffle on this page ranks by whichever rating the page uses
// (lib/ratingMode.ts). The list itself is hand-picked, see below.
const { shufflePool } = forPage('/white-elephant-gifts');

const URL = 'https://www.thegiftshuffle.com/white-elephant-gifts';

export const metadata: Metadata = {
  title: 'Best White Elephant Gifts 2026: 30 Ideas People Actually Fight Over | TheGiftShuffle',
  description:
    'The best white elephant gift ideas for 2026: funny gag gifts and genuinely good steals under $30 that get stolen every round. Perfect for office parties and gift exchanges.',
  keywords: [
    'white elephant gifts',
    'white elephant gift ideas',
    'best white elephant gifts 2026',
    'funny white elephant gifts',
    'white elephant gifts under 25',
    'white elephant gifts under 30',
    'gift exchange ideas',
    'yankee swap gifts',
    'office party gifts',
  ],
  openGraph: {
    title: 'Best White Elephant Gifts 2026: 30 Ideas People Actually Fight Over | TheGiftShuffle',
    description: 'Funny gag gifts and genuinely good steals under $30 for any gift exchange.',
    type: 'website',
    url: URL,
    images: [{ url: 'https://www.thegiftshuffle.com/api/og?title=White%20Elephant%20Gifts%20%7C%20TheGiftShuffle', width: 1200, height: 630 }],
  },
  alternates: { canonical: URL },
};

const isElephant = (p: { id?: string }) => !!p.id?.startsWith('elephant-');
const isStealable = (p: { price?: number }) => (p.price ?? 999) <= 30 && (p.price ?? 0) >= 10;

// The list is hand-picked, one product at a time, and shown in six groups with
// jump links (owner decision, 2026-11-18). Nothing in it is chosen or ordered
// by a star rating. The title promises "30 Ideas" and the description "under
// $30": the lists below hold 30 ids, and anything priced over $30 on the day
// of the build is left out and replaced from RESERVE, so both stay true.

// Budget picks, in the order they should appear. Each is placed in a budget
// group by its price on the day of the build, so a group heading never
// promises a price the card does not show.
const BUDGET_PICKS = [
  // $10 and under
  'elephant-magic-8-ball',
  'elephant-screaming-goat',
  'elephant-slinky',
  'elephant-finger-hands',
  // $10 to $20
  'elephant-burrito-blanket',
  'elephant-rock-em-sock-em',
  'elephant-tamagotchi',
  'elephant-lite-brite',
  'elephant-useless-box',
  'elephant-pizza-socks',
  'elephant-shark-blanket',
  'elephant-toilet-night-light',
  // $20 to $25
  'elephant-chia-bob-ross',
  'elephant-snuggie',
  'elephant-bigfoot-slippers',
  'elephant-desk-punching-bag',
  'elephant-etch-a-sketch',
  'her-25-3', // Cozy sherpa blanket
  // $25 to $30
  'elephant-shark-slippers',
  'elephant-pet-rock',
  'elephant-bob-ross-clapper',
  'elephant-viking-beanie',
];
// Picked for the laugh, whatever the price (all well under $30).
const FUNNY_PICKS = ['elephant-yodeling-pickle', 'elephant-potty-putter', 'elephant-dundie', 'elephant-bacon-bandages'];
// Useful with a twist: the ones that change hands every round.
const STOLEN_PICKS = ['elephant-giant-mug', 'dad-fd-8' /* Stanley Quencher */, 'elephant-mini-waffle-maker', 'elephant-sipski'];
// Stand-ins, used only if a pick above climbs past $30, to keep the count.
const RESERVE = ['elephant-trex-onesie', 'elephant-taco-holder', 'elephant-wine-bottle-glass', 'elephant-view-master', 'elephant-sea-monkeys'];
const TOTAL = BUDGET_PICKS.length + FUNNY_PICKS.length + STOLEN_PICKS.length;

const underLimit = (p: { price: number }) => p.price <= 30;
const funny = byIds(FUNNY_PICKS).filter(underLimit);
const stolen = byIds(STOLEN_PICKS).filter(underLimit);
const budget = byIds(BUDGET_PICKS).filter(underLimit);
for (const p of byIds(RESERVE)) {
  if (budget.length + funny.length + stolen.length >= TOTAL) break;
  if (underLimit(p)) budget.push(p);
}

const asCards = (list: ReturnType<typeof byIds>) => list as CompactProduct[];

const groups: GiftGuideGroup[] = [
  {
    id: 'under-10',
    label: '$10 and under',
    heading: 'White Elephant Gifts for $10 and Under',
    blurb: 'Small money, big reaction. Good for a low limit or as an add-on to a bigger gift.',
    products: asCards(budget.filter((p) => p.price <= 10)),
  },
  {
    id: 'under-20',
    label: '$10 to $20',
    heading: 'White Elephant Gifts from $10 to $20',
    blurb: 'The sweet spot for most office exchanges: retro toys, silly blankets and desk toys.',
    products: asCards(budget.filter((p) => p.price > 10 && p.price <= 20)),
  },
  {
    id: 'under-25',
    label: '$20 to $25',
    heading: 'White Elephant Gifts from $20 to $25',
    blurb: 'Right at the most common limit, and good enough that people plan their steal.',
    products: asCards(budget.filter((p) => p.price > 20 && p.price <= 25)),
  },
  {
    id: 'under-30',
    label: '$25 to $30',
    heading: 'White Elephant Gifts from $25 to $30',
    blurb: 'For a $30 exchange, when the gift has to look the part once it is unwrapped.',
    products: asCards(budget.filter((p) => p.price > 25)),
  },
  {
    id: 'funny',
    label: 'Funny gag gifts',
    heading: 'Funny White Elephant Gag Gifts',
    blurb: 'Bought for the laugh. Absurd, but well made enough to survive the party.',
    products: asCards(funny),
  },
  {
    id: 'most-stolen',
    label: 'Most likely to get stolen',
    heading: 'White Elephant Gifts That Get Stolen',
    blurb: 'Useful with a twist. If half the room would use it weekly, it moves every round.',
    products: asCards(stolen),
  },
].filter((g) => g.products.length > 0);

// The ItemList markup is built from this, in the same order as the groups.
const grid = groups.flatMap((g) => g.products);
const shuffle = shufflePool((p) => isElephant(p) || isStealable(p), ALL);

export default function Page() {
  return (
    <GiftGuideTemplate
      canonicalUrl={URL}
      schemaName="Best White Elephant Gifts 2026"
      schemaDescription="The best white elephant gift ideas for 2026, curated by TheGiftShuffle"
      breadcrumbLabel="White Elephant Gifts"
      breadcrumbHref="/white-elephant-gifts"
      heroSrc="/images/heroes/white-elephant-gifts.jpg"
      heroAlt="White elephant gifts on cream linen: a rubber duck, an oversized mug, a hot sauce trio, paw slippers, a puzzle cube and a tiny cactus"
      h1="Best White Elephant Gifts for 2026"
      intro={
        <>
          <p>
            A great <strong>white elephant gift</strong> does one of two things: gets the biggest
            laugh of the night, or gets stolen every single round. This list has both, from
            legendary gags like the yodelling pickle to genuinely good under-$30 picks people fight
            over at office parties and family exchanges.
          </p>
          <p className="text-base text-gray-600">
            Most picks land between $15 and $30, the classic gift exchange budget. Hit shuffle for a
            fresh idea every click, or jump to your budget in the list below.
          </p>
        </>
      }
      answer={{
        heading: 'What Is a Good White Elephant Gift?',
        body: (
          <p>
            The best white elephant gifts are either <strong>hilarious</strong>, a yodelling pickle,
            toilet golf, a Nicolas Cage sequin pillow, or <strong>steal-worthy</strong>, a giant
            coffee mug, a taco holder truck, a desk punching bag, cozy blankets, or anything with a
            cult following. Aim for the party budget, usually <strong>$20 to $30</strong>, and pick
            something that shows well when unwrapped in front of a crowd. Funny wins the moment;
            genuinely useful wins the steals. The perfect pick does a little of both.
          </p>
        ),
      }}
      shuffleHeading="Shuffle White Elephant Ideas"
      shuffleProducts={shuffle}
      gridHeading="White Elephant Gifts People Fight Over, by Budget"
      gridProducts={grid}
      gridGroups={groups}
      ctaHeading="Need a Gift for a Specific Budget?"
      ctaText="Tell TheGiftShuffle your gift exchange budget, and get an instant crowd-pleasing idea in one click."
      faqs={[
        { q: 'What is a good white elephant gift?', a: 'A good white elephant gift is either funny enough to get a laugh when unwrapped or useful enough to get stolen: gag classics like a yodelling pickle or toilet golf, or steal-worthy picks like a giant coffee mug, a cozy blanket, or a fun kitchen gadget. The best ones are both.' },
        { q: 'How much should you spend on a white elephant gift?', a: 'Most white elephant exchanges set a budget between $20 and $30, with $25 the most common. Stay at or just under the limit; going way under feels cheap and going over breaks the game. Spend it on maximum entertainment or usefulness rather than generic value.' },
        { q: 'What are funny white elephant gift ideas?', a: 'Proven crowd-pleasers include the yodelling pickle, a Nicolas Cage sequin pillow, bacon-strip bandages, a desktop punching bag, toilet golf, a screaming goat figurine, and an official Dundie award. Absurd but well-made beats cheap junk.' },
        { q: 'What white elephant gifts get stolen the most?', a: 'The most-stolen gifts are useful with a twist: giant coffee mugs, shower wine glass holders, cozy blankets, mini waffle makers, taco holders, and anything from a cult brand like Stanley. If half the room would use it weekly, it will move every round.' },
        { q: 'What is the difference between white elephant and secret santa?', a: 'In white elephant, gifts go into a pool and players draw and steal in turns, so gifts should entertain a crowd. In secret santa, you draw one specific person and buy for them, so gifts should feel a bit more personal. See our secret santa guide for that side.' },
      ]}
      relatedHeading="More Holiday Gift Guides"
      relatedLinks={[
        { href: '/secret-santa-gifts', label: 'Secret Santa Gifts' },
        { href: '/stocking-stuffers', label: 'Stocking Stuffers' },
        { href: '/gifts-for-coworkers', label: 'Gifts for Coworkers' },
        { href: '/christmas-gift-ideas', label: 'Christmas Gift Ideas' },
        { href: '/gifts-under-25', label: 'Gifts Under $25' },
        { href: '/gifts-under-50', label: 'Gifts Under $50' },
      ]}
    />
  );
}
