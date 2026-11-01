import type { Metadata } from 'next';
import GiftGuideTemplate from '@/components/GiftGuideTemplate';
import { curate, shufflePool, ALL } from '@/lib/giftSelect';

const URL = 'https://www.thegiftshuffle.com/christmas-gifts-for-kids';

export const metadata: Metadata = {
  title: 'Christmas Gifts for Kids 2026: The Toys on Every Wish List | TheGiftShuffle',
  description:
    'The best Christmas gifts for kids in 2026: the hot toys of the year, LEGO and advent calendars, building sets and creative kits, all top-rated and checked this season.',
  keywords: [
    'christmas gifts for kids',
    'christmas gift ideas for kids',
    'best christmas gifts for kids 2026',
    'christmas toys 2026',
    'hot toys christmas 2026',
    'christmas presents for kids',
  ],
  openGraph: {
    title: 'Christmas Gifts for Kids 2026: The Toys on Every Wish List',
    description: 'The hot toys of 2026, LEGO, advent calendars and creative kits for Christmas morning.',
    type: 'website',
    url: URL,
    images: [{ url: 'https://www.thegiftshuffle.com/images/heroes/christmas-gifts-for-kids.jpg', width: 1200, height: 800 }],
  },
  alternates: { canonical: URL },
};

// Christmas-morning angle: 2026's hot toys lead, then the classics kids put on
// their lists by name. New hot-toy listings have young review counts, so they
// are named rather than left to the social sort.
const isPick = (p: { id?: string; name?: string }) =>
  (!!p.id && p.id.startsWith('trend26-') && p.id !== 'trend26-ninja-slushi' && p.id !== 'trend26-mens-flannel-pajamas') ||
  (!!p.name && /\b(lego|advent|nerf|squishmallows?|pokemon|magna-tiles|bluey|barbie|hot wheels|play-doh|yoshi|mario|slime|tonies|kpop)\b/i.test(p.name));
// Toys only: many household items also list 'kids' as a recipient (a pool
// float, taco holders, a desk lamp), so require the kids tag or a named pick.
const OFF_SEASON = /\b(pool|float|beach|sprinkler|pumpkin|halloween)\b/i;
const match = (p: { id?: string; name?: string; recipients?: string[]; occasions?: string[]; tags?: string[] }) =>
  !!p.recipients?.includes('kids') &&
  !!p.occasions?.includes('holiday') &&
  !OFF_SEASON.test(p.name ?? '') &&
  (!!p.tags?.includes('kids') || isPick(p));

const grid = curate({
  match,
  minPrice: 10,
  minRating: 4.4,
  sort: 'social',
  preferMatch: isPick,
  recipientCap: 40,
  limit: 36,
  pool: ALL,
});
const shuffle = shufflePool(match, ALL);

export default function Page() {
  return (
    <GiftGuideTemplate
      canonicalUrl={URL}
      schemaName="Christmas Gifts for Kids 2026"
      schemaDescription="The best Christmas gifts for kids in 2026, curated by TheGiftShuffle"
      breadcrumbLabel="Christmas Gifts for Kids"
      breadcrumbHref="/christmas-gifts-for-kids"
      heroSrc="/images/heroes/christmas-gifts-for-kids.jpg"
      heroAlt="Christmas gifts for kids on cream linen: a wooden toy train, a teddy bear, crayons, building bricks and a picture book with pine and coral ribbon"
      h1="Christmas Gifts for Kids"
      updated="2026-11-01"
      intro={
        <>
          <p>
            These are the <strong>Christmas gifts for kids</strong> that make the morning: this
            year&apos;s hot toys (KPop Demon Hunters, Bluey, Hatchin&apos; Yoshi), LEGO sets and
            advent calendars, and the building and creative kits that keep them busy well past
            December. Every pick is rated <strong>4.4 stars or higher</strong>.
          </p>
          <p className="text-base text-gray-600">
            Hot toys sell out first, so if one is on their list, buy it early. Shuffle below for a
            fresh idea every click.
          </p>
        </>
      }
      answer={{
        heading: 'What Are the Best Christmas Gifts for Kids This Year?',
        body: (
          <p>
            The Christmas gifts kids are asking for in 2026 are <strong>KPop Demon Hunters</strong>{' '}
            dolls and plush, the <strong>Bluey Light and Surprise Heeler House</strong>,{' '}
            <strong>Hatchin&apos; Yoshi</strong>, <strong>LEGO advent calendars</strong> and the
            <strong> GUI GUI Mega Slime Haul</strong>. For lasting play, building sets like
            Magna-Tiles and LEGO beat single-use toys. A good rule: one hot toy they asked for, plus
            one open-ended toy they will still use in March.
          </p>
        ),
      }}
      shuffleHeading="Shuffle Christmas Gifts for Kids"
      shuffleProducts={shuffle}
      gridHeading={`${grid.length} Top-Rated Christmas Gifts for Kids`}
      gridProducts={grid}
      ctaHeading="Shopping for a Specific Age?"
      ctaText="Tell TheGiftShuffle who it is for and your budget, and get a kid-approved Christmas idea in one click."
      faqs={[
        { q: 'What is the hottest toy for Christmas 2026?', a: 'KPop Demon Hunters is the biggest toy story of 2026: the Mattel singing dolls and the official Squishmallows plush appear on most hot toy lists. Bluey\'s Heeler House, Hatchin\' Yoshi, furReal Gabby and Tickle Me Elmo are close behind. See the full 2026 hot list on our trending Christmas gifts page.' },
        { q: 'What are good Christmas gifts for kids that are not toys?', a: 'Experiences and creative kits work well: a kids camera, an art set, a science or STEM kit, a Tonies audio player with stories, a subscription box, or tickets to something they love. Books and cozy pajamas for Christmas Eve are classic non-toy picks.' },
        { q: 'When should I buy Christmas toys?', a: 'Buy the hot toys as early as you can. The most-wanted toys usually sell out or jump in price by early December, while classic toys and building sets stay easy to find. Buying in November gives the best mix of stock and price.' },
        { q: 'Are advent calendars a good Christmas gift for kids?', a: 'Yes, and they are best given before December 1 so the countdown can start on time. LEGO\'s 2026 advent calendars give a small build every morning until Christmas and are among the top-rated kids\' gifts this season.' },
      ]}
      relatedHeading="More Christmas Gift Guides"
      relatedLinks={[
        { href: '/christmas-gifts-for-teens', label: 'Christmas Gifts for Teens' },
        { href: '/trending-christmas-gifts-2026', label: 'Trending Christmas Gifts 2026' },
        { href: '/stocking-stuffers-for-kids', label: 'Stocking Stuffers for Kids' },
        { href: '/gift-ideas-for-kids', label: 'Gift Ideas for Kids' },
        { href: '/christmas-gift-ideas', label: 'Christmas Gift Ideas' },
        { href: '/hanukkah-gifts', label: 'Hanukkah Gifts' },
        { href: '/gifts-under-25', label: 'Gifts Under $25' },
      ]}
    />
  );
}
