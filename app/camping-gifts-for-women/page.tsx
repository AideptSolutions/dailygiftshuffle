import type { Metadata } from 'next';
import GiftGuideTemplate from '@/components/GiftGuideTemplate';
import { curate, shufflePool, ALL } from '@/lib/giftSelect';

const URL = 'https://www.thegiftshuffle.com/camping-gifts-for-women';

export const metadata: Metadata = {
  title: 'Camping Gifts for Women: Top Outdoor Picks She Will Actually Use | TheGiftShuffle',
  description:
    'The best camping gifts for women in 2026: top-rated, genuinely useful outdoor picks for the woman who loves to camp, hike and get outside, from cozy upgrades to trail essentials.',
  keywords: [
    'camping gifts for women',
    'camping gifts for her',
    'outdoor gifts for women',
    'gifts for women who camp',
    'hiking gifts for women',
    'camping gift ideas for her',
    'best camping gifts for women',
    'gifts for outdoorsy women',
  ],
  openGraph: {
    title: 'Camping Gifts for Women: Top Outdoor Picks She Will Actually Use | TheGiftShuffle',
    description: 'Top-rated camping gifts for women in 2026, from cozy upgrades to trail essentials.',
    type: 'website',
    url: URL,
    images: [{ url: 'https://www.thegiftshuffle.com/api/og?title=Camping%20Gifts%20for%20Women%20%7C%20TheGiftShuffle', width: 1200, height: 630 }],
  },
  alternates: { canonical: URL },
};

const match = (p: { tags?: string[]; recipients?: string[] }) =>
  !!p.tags?.includes('outdoors') && !!p.recipients?.includes('her');
const grid = curate({ match, minRating: 4.3, sort: 'social', recipientCap: 30, limit: 30, pool: ALL });
const shuffle = shufflePool(match, ALL);

export default function Page() {
  return (
    <GiftGuideTemplate
      canonicalUrl={URL}
      schemaName="Camping Gifts for Women"
      schemaDescription="The best camping gifts for women in 2026, curated by TheGiftShuffle"
      breadcrumbLabel="Camping Gifts for Women"
      breadcrumbHref="/camping-gifts-for-women"
      heroSrc="/images/heroes/best-camping-gifts.jpg"
      heroAlt="Camping gifts for women laid out with a hammock, mug and outdoor gear"
      h1="Camping Gifts for Women"
      intro={
        <>
          <p>
            These are the <strong>best camping gifts for women</strong> in 2026: top-rated, genuinely
            useful outdoor picks for the woman who would rather be at a trailhead than anywhere else.
            Every one is chosen to actually get used on the next trip, not stuffed in a drawer.
          </p>
          <p className="text-base text-gray-600">
            From cozy upgrades like a hammock and a puffy blanket to trail essentials like a headlamp
            and a multitool, this list covers her whether she car-camps or backpacks. Scroll the picks
            below, or hit shuffle for a fresh idea every click.
          </p>
        </>
      }
      shuffleHeading="Shuffle Camping Gifts for Her"
      shuffleProducts={shuffle}
      gridHeading="Best Camping Gifts for Women, Ranked"
      gridProducts={grid}
      ctaHeading="Not Sure Which Outdoor Pick to Get?"
      ctaText="Tell TheGiftShuffle who it is for and your budget, and get an instant camping gift idea in one click."
      faqs={[
        { q: 'What are the best camping gifts for women?', a: 'The best camping gifts for women are genuinely useful upgrades: a comfortable double hammock, a packable puffy blanket, a rechargeable headlamp, a set of enamel camp mugs, or string lights to make a campsite cozy. Match the gift to how she camps and it always lands.' },
        { q: 'What is a good camping gift for a woman on a budget?', a: 'Under $25, a Happy Camper mug, enamel camp mugs, s’mores roasting sticks, camp string lights, or a campsite sign are inexpensive but genuinely used. They are easy add-ons or stocking stuffers for the outdoorsy woman.' },
        { q: 'What do you get a woman who has all the camping gear?', a: 'For the woman who owns the tent and the pack, go for comfort and ambiance: a puffy camp blanket, a hammock with a bug net, warm camp lighting, or a premium insulated mug. These elevate the experience rather than duplicating her kit.' },
        { q: 'What are good camping gifts for a woman who backpacks?', a: 'For a backpacker, lightweight and packable wins: a rechargeable headlamp, a compact multitool, packable lighting, and an insulated mug. Prioritize gear that earns its weight in the pack.' },
        { q: 'Are these camping gifts good for couples too?', a: 'Many of these work for a couple who camps together: a double hammock, a four-pack of enamel mugs, or a shared blanket all suit two people. Pair a couple of items for a ready-made camping gift set.' },
      ]}
      relatedHeading="More Gift Guides"
      relatedLinks={[
        { href: '/best-camping-gifts', label: 'Best Camping Gifts 2026' },
        { href: '/camping-gifts-for-men', label: 'Camping Gifts for Men' },
        { href: '/gifts-for-camping-and-outdoors', label: 'Camping & Outdoors Gifts' },
        { href: '/category/outdoors', label: 'All Outdoor Gifts' },
        { href: '/best-gifts-for-her-2026', label: 'Best Gifts for Her 2026' },
        { href: '/gift-ideas-for-her', label: 'Gift Ideas for Her' },
      ]}
    />
  );
}
