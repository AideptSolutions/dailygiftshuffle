import type { Metadata } from 'next';
import GiftGuideTemplate from '@/components/GiftGuideTemplate';
import { curate, shufflePool, ALL } from '@/lib/giftSelect';

const URL = 'https://www.thegiftshuffle.com/camping-gifts-for-men';

export const metadata: Metadata = {
  title: 'Camping Gifts for Men: Top Outdoor Picks He Will Actually Use | TheGiftShuffle',
  description:
    'The best camping gifts for men in 2026: top-rated, genuinely useful outdoor picks for the guy who loves to camp, hike and get outside, from trail essentials to campsite upgrades.',
  keywords: [
    'camping gifts for men',
    'camping gifts for him',
    'outdoor gifts for men',
    'gifts for men who camp',
    'hiking gifts for men',
    'camping gift ideas for him',
    'best camping gifts for men',
    'gifts for outdoorsy men',
  ],
  openGraph: {
    title: 'Camping Gifts for Men: Top Outdoor Picks He Will Actually Use | TheGiftShuffle',
    description: 'Top-rated camping gifts for men in 2026, from trail essentials to campsite upgrades.',
    type: 'website',
    url: URL,
    images: [{ url: 'https://www.thegiftshuffle.com/api/og?title=Camping%20Gifts%20for%20Men%20%7C%20TheGiftShuffle', width: 1200, height: 630 }],
  },
  alternates: { canonical: URL },
};

const match = (p: { tags?: string[]; recipients?: string[] }) =>
  !!p.tags?.includes('outdoors') && !!p.recipients?.includes('him');
const grid = curate({ match, minRating: 4.3, sort: 'social', recipientCap: 30, limit: 30, pool: ALL });
const shuffle = shufflePool(match, ALL);

export default function Page() {
  return (
    <GiftGuideTemplate
      canonicalUrl={URL}
      schemaName="Camping Gifts for Men"
      schemaDescription="The best camping gifts for men in 2026, curated by TheGiftShuffle"
      breadcrumbLabel="Camping Gifts for Men"
      breadcrumbHref="/camping-gifts-for-men"
      heroSrc="/images/heroes/best-camping-gifts.jpg"
      heroAlt="Camping gifts for men laid out with a multitool, headlamp and outdoor gear"
      h1="Camping Gifts for Men"
      intro={
        <>
          <p>
            These are the <strong>best camping gifts for men</strong> in 2026: top-rated, genuinely
            useful outdoor picks for the guy who counts down to the next trip. Every one is chosen to
            actually get used at the campsite or on the trail, not left in the garage.
          </p>
          <p className="text-base text-gray-600">
            From a do-everything multitool and a rechargeable headlamp to a hammock and a rugged
            insulated mug, this list covers him whether he car-camps or backpacks. Scroll the picks
            below, or hit shuffle for a fresh idea every click.
          </p>
        </>
      }
      shuffleHeading="Shuffle Camping Gifts for Him"
      shuffleProducts={shuffle}
      gridHeading="Best Camping Gifts for Men, Ranked"
      gridProducts={grid}
      ctaHeading="Not Sure Which Outdoor Pick to Get?"
      ctaText="Tell TheGiftShuffle who it is for and your budget, and get an instant camping gift idea in one click."
      faqs={[
        { q: 'What are the best camping gifts for men?', a: 'The best camping gifts for men are genuinely useful upgrades: an 18-in-1 multitool, a rechargeable headlamp, a double hammock, a rugged insulated tumbler, or telescoping s’mores sticks for the fire. Match the gift to how he camps and it always lands.' },
        { q: 'What is a good camping gift for a man on a budget?', a: 'Under $25, a multitool, a Happy Camper mug, s’mores roasting sticks, camp string lights, or a rechargeable headlamp are inexpensive but constantly used. They make easy add-ons or stocking stuffers for the outdoorsy guy.' },
        { q: 'What do you get a man who has all the camping gear?', a: 'For the guy who owns the tent and the pack, go for upgrades and comfort: a packable puffy blanket, a hammock with a bug net, warm campsite lighting, or a premium insulated mug. These improve the experience rather than duplicating his kit.' },
        { q: 'What are good camping gifts for a man who backpacks?', a: 'For a backpacker, lightweight and packable wins: a compact multitool, a rechargeable headlamp, packable lighting, and a durable insulated mug. Prioritize gear that earns its weight in the pack.' },
        { q: 'Are these camping gifts good for Father’s Day?', a: 'Yes. A multitool, an insulated tumbler, or a hammock all make strong Father’s Day gifts for the dad who loves the outdoors. Pair a couple of items for a ready-made camping gift set.' },
      ]}
      relatedHeading="More Gift Guides"
      relatedLinks={[
        { href: '/best-camping-gifts', label: 'Best Camping Gifts 2026' },
        { href: '/camping-gifts-for-women', label: 'Camping Gifts for Women' },
        { href: '/gifts-for-camping-and-outdoors', label: 'Camping & Outdoors Gifts' },
        { href: '/category/outdoors', label: 'All Outdoor Gifts' },
        { href: '/gift-ideas-for-him', label: 'Gift Ideas for Him' },
        { href: '/gift-ideas-for-dad', label: 'Gift Ideas for Dad' },
      ]}
    />
  );
}
