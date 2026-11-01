import type { Metadata } from 'next';
import GiftGuideTemplate from '@/components/GiftGuideTemplate';
import { curate, shufflePool, variantKey, ALL_INCL_SEASONAL as POOL } from '@/lib/giftSelect';

const URL = 'https://www.thegiftshuffle.com/hanukkah-gifts';

export const metadata: Metadata = {
  title: 'Hanukkah Gifts 2026: Ideas for All Eight Nights | TheGiftShuffle',
  description:
    'Hanukkah gift ideas for 2026: menorahs, dreidel sets and gelt, plus top-rated gifts for kids, teens and adults to cover all eight nights, at every budget.',
  keywords: [
    'hanukkah gifts',
    'hanukkah gift ideas',
    'chanukah gifts',
    'hanukkah gifts for kids',
    'hanukkah gifts for adults',
    '8 nights of hanukkah gift ideas',
  ],
  openGraph: {
    title: 'Hanukkah Gifts 2026: Ideas for All Eight Nights',
    description: 'Menorahs, dreidels and gelt, plus top-rated gifts for every night of Hanukkah.',
    type: 'website',
    url: URL,
    images: [{ url: 'https://www.thegiftshuffle.com/images/heroes/hanukkah-gifts.jpg', width: 1200, height: 800 }],
  },
  alternates: { canonical: URL },
};

// Hanukkah essentials (hanuk-*) lead; the rest are top-rated gifts suited to
// eight nights of giving, with anything Christmas-themed filtered out.
const isHanukkah = (p: { id?: string }) => !!p.id && p.id.startsWith('hanuk-');
const CHRISTMAS = /\b(christmas|xmas|santa|advent|stocking|nutcracker|elf|reindeer|snowman)\b/i;
const OFF_SEASON = /\b(pool|float|beach|sprinkler|pumpkin|halloween|organizer)\b/i;
// Made-to-order items may not arrive in time for the first night.
const MADE_TO_ORDER = /\b(custom|personalized|engraved|monogram\w*)\b/i;

const essentials = curate({ match: isHanukkah, minRating: 4.4, sort: 'social', recipientCap: 40, limit: 12, pool: POOL });
const eightNights = curate({
  match: (p) =>
    !isHanukkah(p) && !!p.occasions?.includes('holiday') &&
    !CHRISTMAS.test(p.name) && !OFF_SEASON.test(p.name) && !MADE_TO_ORDER.test(p.name),
  minPrice: 10,
  minRating: 4.6,
  sort: 'social',
  preferTags: ['kids', 'home', 'hobby', 'kitchen', 'beauty'],
  deprioritizeTags: ['diy-tools', 'car-accessories', 'office', 'finance', 'parenting', 'baby-shower', 'wedding'],
  recipientCap: 6,
  limit: 40,
  pool: POOL,
});
const seen = new Set<string>();
const grid = [...essentials, ...eightNights]
  .filter((p) => {
    const k = variantKey(p.name) || p.id;
    return seen.has(k) ? false : (seen.add(k), true);
  })
  .slice(0, 36);
const shuffle = shufflePool(
  (p) => isHanukkah(p) || (!!p.occasions?.includes('holiday') && !CHRISTMAS.test(p.name) && !OFF_SEASON.test(p.name)),
  POOL,
);

export default function Page() {
  return (
    <GiftGuideTemplate
      canonicalUrl={URL}
      schemaName="Hanukkah Gifts 2026"
      schemaDescription="Hanukkah gift ideas for 2026, curated by TheGiftShuffle"
      breadcrumbLabel="Hanukkah Gifts"
      breadcrumbHref="/hanukkah-gifts"
      heroSrc="/images/heroes/hanukkah-gifts.jpg"
      heroAlt="Hanukkah gifts on cream linen: a silver menorah with blue and white candles, wooden dreidels, chocolate gelt, a blue-wrapped gift and a knit scarf with olive branches"
      h1="Hanukkah Gifts for All Eight Nights"
      updated="2026-11-01"
      intro={
        <>
          <p>
            Hanukkah 2026 begins at sundown on <strong>Friday, December 4</strong> and runs through{' '}
            <strong>Saturday, December 12</strong>. These <strong>Hanukkah gift ideas</strong> cover every
            night: the essentials (a menorah, dreidels and gelt) plus top-rated gifts for kids, teens
            and adults, every one rated <strong>4.4 stars or higher</strong>.
          </p>
          <p className="text-base text-gray-600">
            Planning eight nights? Mix small treats with one bigger gift, and hit shuffle for a
            fresh idea every click.
          </p>
        </>
      }
      answer={{
        heading: 'What Are Good Hanukkah Gifts?',
        body: (
          <p>
            Good Hanukkah gifts start with the traditions: a <strong>menorah</strong> for the
            home, a <strong>dreidel set</strong> and <strong>chocolate gelt</strong> for the game,
            and a Hanukkah book or craft for kids. For the eight nights, many families mix small
            gifts (books, games, cozy socks, treats) with one bigger gift on a single night, and
            some set aside a night for giving to others. Thoughtful and personal matters more than
            the price.
          </p>
        ),
      }}
      shuffleHeading="Shuffle Hanukkah Gift Ideas"
      shuffleProducts={shuffle}
      gridHeading={`${grid.length} Top-Rated Hanukkah Gifts`}
      gridProducts={grid}
      ctaHeading="Shopping for Someone Specific?"
      ctaText="Tell TheGiftShuffle who it is for and your budget, and get a top-rated Hanukkah gift idea in one click."
      faqs={[
        { q: 'When is Hanukkah in 2026?', a: 'Hanukkah 2026 begins at sundown on Friday, December 4, when the first candle is lit, and ends at nightfall on Saturday, December 12. The dates move each year because Hanukkah follows the Hebrew calendar (it starts on the 25th of Kislev).' },
        { q: 'Do you give a gift every night of Hanukkah?', a: 'Many families do, but there is no single rule. Some give one gift each night, some give small treats most nights and one bigger gift on a single night, and some save gifts for the kids and keep the other nights for family time, games and giving to charity.' },
        { q: 'What are traditional Hanukkah gifts?', a: 'Traditional Hanukkah gifts include gelt (originally real coins, now often chocolate coins), dreidels, a menorah, Hanukkah books, and candles. Small gifts each night became common more recently, especially for children.' },
        { q: 'What are good Hanukkah gifts for kids?', a: 'Kids love a dreidel game with chocolate gelt, a Hanukkah picture book or craft kit, and then the toys on their wish list: building sets, plush, games and creative kits. Spreading smaller gifts across the eight nights keeps the excitement going all week.' },
      ]}
      relatedHeading="More Holiday Gift Guides"
      relatedLinks={[
        { href: '/christmas-gifts-for-kids', label: 'Gifts for Kids This Season' },
        { href: '/gifts-under-25', label: 'Gifts Under $25' },
        { href: '/gift-ideas-for-mom', label: 'Gift Ideas for Mom' },
        { href: '/gift-ideas-for-dad', label: 'Gift Ideas for Dad' },
        { href: '/gift-ideas-for-teens', label: 'Gift Ideas for Teens' },
        { href: '/gifts-for-people-who-have-everything', label: 'For People Who Have Everything' },
        { href: '/self-care-gifts', label: 'Self-Care Gifts' },
      ]}
    />
  );
}
