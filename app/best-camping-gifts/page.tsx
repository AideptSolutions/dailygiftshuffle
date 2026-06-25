import type { Metadata } from 'next';
import GiftGuideTemplate from '@/components/GiftGuideTemplate';
import { curate, shufflePool, ALL } from '@/lib/giftSelect';

const URL = 'https://www.thegiftshuffle.com/best-camping-gifts';

export const metadata: Metadata = {
  title: 'Best Camping Gifts for 2026: 30 Top Picks for Campers & Hikers | TheGiftShuffle',
  description:
    'The best camping gifts for 2026, hand-picked for campers, hikers and anyone who prefers trees over Wi-Fi. 30 top-rated outdoor gift ideas at every budget.',
  keywords: [
    'best camping gifts',
    'camping gifts',
    'camping gift ideas',
    'best gifts for campers',
    'gifts for camping lovers',
    'cool camping gifts',
    'camping and hiking gifts',
    'best gifts for camping',
  ],
  openGraph: {
    title: 'Best Camping Gifts for 2026: 30 Top Picks for Campers & Hikers | TheGiftShuffle',
    description: '30 top-rated camping and outdoor gift ideas for 2026, for campers, hikers and weekend adventurers.',
    type: 'website',
    url: URL,
    images: [{ url: 'https://www.thegiftshuffle.com/api/og?title=Best%20Camping%20Gifts%202026%20%7C%20TheGiftShuffle', width: 1200, height: 630 }],
  },
  alternates: { canonical: URL },
};

const match = (p: { tags?: string[] }) => !!p.tags?.includes('outdoors');
const grid = curate({ match, minRating: 4.3, sort: 'social', recipientCap: 50, pool: ALL });
const shuffle = shufflePool(match, ALL);

export default function Page() {
  return (
    <GiftGuideTemplate
      canonicalUrl={URL}
      schemaName="Best Camping Gifts for 2026"
      schemaDescription="The best camping and outdoor gift ideas for 2026, curated by TheGiftShuffle"
      breadcrumbLabel="Best Camping Gifts 2026"
      breadcrumbHref="/best-camping-gifts"
      heroSrc="/images/heroes/best-camping-gifts.jpg"
      heroAlt="The best camping gifts including gear laid out at a campsite"
      h1="The Best Camping Gifts for 2026"
      intro={
        <>
          <p>
            These are the <strong>best camping gifts for 2026</strong>, hand-picked for the people
            who would rather be at a campsite than anywhere else. Every pick is top-rated, genuinely
            useful on a real trip, and the kind of gear a camper actually reaches for instead of
            leaving in the garage.
          </p>
          <p className="text-base text-gray-600">
            From sub-$25 trail essentials to a centerpiece upgrade, this list covers car campers,
            backpackers, hikers and festival-goers alike. Scroll the picks below, or hit shuffle to
            find a fresh idea every click.
          </p>
        </>
      }
      shuffleHeading="Shuffle Camping Gift Picks"
      shuffleProducts={shuffle}
      gridHeading="30 Best Camping Gifts, Ranked"
      gridProducts={grid}
      ctaHeading="Not Sure Which Camper You Are Shopping For?"
      ctaText="Tell TheGiftShuffle who it is for and your budget, and get an instant outdoor gift idea in one click."
      faqs={[
        { q: 'What are the best camping gifts for 2026?', a: 'The best camping gifts in 2026 are the reliable, every-trip pieces of gear: a quality headlamp, a packable hammock, a LifeStraw water filter, a compact camp stove, a durable insulated tumbler, or a solar power bank. Function and packability matter more than novelty for anyone who actually camps.' },
        { q: 'What are good camping gifts under $50?', a: 'Standout camping gifts under $50 include a LifeStraw water filter, stormproof matches, a quality headlamp, a camping hammock, or a packable daypack. They are compact, functional, and exactly the kind of gear every camper uses on every trip.' },
        { q: 'What do you get someone who loves camping?', a: 'For a dedicated camper, upgrade the gear they use most: a better headlamp, a four-season sleeping pad, a titanium cook set, a rugged cooler, or a solar charger to keep devices alive off-grid. Match the gift to whether they car camp or backpack and it always lands.' },
        { q: 'What are good camping gifts for beginners?', a: 'First-time campers need the basics done well: a reliable headlamp, a two-burner camp stove, a sleeping pad, and fire-starting tools. A bundle covering lighting, warmth and cooking is far more useful than one expensive specialized item.' },
        { q: 'What camping gifts work for hikers and festivals too?', a: 'A packable hammock, a waterproof power bank, a quality daypack, or merino wool layers work just as well at a music festival, beach trip or day hike as they do at a campsite. The best outdoor gifts travel well and fit into everyday life, not just dedicated trips.' },
      ]}
      relatedHeading="More Gift Guides"
      relatedLinks={[
        { href: '/camping-gifts-for-women', label: 'Camping Gifts for Women' },
        { href: '/camping-gifts-for-men', label: 'Camping Gifts for Men' },
        { href: '/gifts-for-camping-and-outdoors', label: 'Camping & Outdoors Gifts' },
        { href: '/category/outdoors', label: 'All Outdoor Gifts' },
        { href: '/best-fitness-gifts-2026', label: 'Best Fitness Gifts 2026' },
        { href: '/gift-ideas-for-him', label: 'Gift Ideas for Him' },
        { href: '/gift-ideas-for-dad', label: 'Gift Ideas for Dad' },
        { href: '/gifts-under-50', label: 'Gifts Under $50' },
      ]}
    />
  );
}
