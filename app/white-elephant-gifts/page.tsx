import type { Metadata } from 'next';
import GiftGuideTemplate from '@/components/GiftGuideTemplate';
import { curate, shufflePool, ALL } from '@/lib/giftSelect';

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

// Curated elephant- gag items lead, then fill with fun, broadly appealing
// under-$30 picks that make good "steal" gifts.
const isElephant = (p: { id?: string }) => !!p.id?.startsWith('elephant-');
const isStealable = (p: { price?: number }) => (p.price ?? 999) <= 30 && (p.price ?? 0) >= 10;

const elephantItems = curate({ match: isElephant, minRating: 4.2, sort: 'social', recipientCap: 30, limit: 12, pool: ALL });
const fillItems = curate({ match: isStealable, minRating: 4.6, sort: 'social', recipientCap: 6, limit: 40, pool: ALL });
const seen = new Set(elephantItems.map((p) => p.id));
const grid = [...elephantItems, ...fillItems.filter((p) => !seen.has(p.id))].slice(0, 30);
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
      heroAlt="A wrapped gift exchange present with a playful bow"
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
            fresh idea every click, or browse the ranked list below.
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
      gridHeading="White Elephant Gifts People Fight Over, Ranked"
      gridProducts={grid}
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
