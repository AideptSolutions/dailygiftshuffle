import type { Metadata } from 'next';
import GiftGuideTemplate from '@/components/GiftGuideTemplate';
import { curate, shufflePool } from '@/lib/giftSelect';

const URL = 'https://www.thegiftshuffle.com/best-fitness-gifts-2026';

export const metadata: Metadata = {
  title: 'Best Fitness Gifts for 2026: 30 Top Picks for People Who Work Out | TheGiftShuffle',
  description:
    'The best fitness gifts for 2026 for gym-goers, runners and home-workout fans. 30 top-rated picks from recovery tools to activewear and smart trackers, every budget.',
  keywords: [
    'best fitness gifts 2026',
    'best fitness gifts for men 2026',
    'fitness gifts',
    'gifts for fitness enthusiasts',
    'gifts for people who love working out',
    'workout gifts',
    'gym gifts',
    'best gifts for athletes',
  ],
  openGraph: {
    title: 'Best Fitness Gifts for 2026: 30 Top Picks for People Who Work Out | TheGiftShuffle',
    description: '30 top-rated fitness gifts for 2026 for gym-goers, runners and home-workout fans. Every budget covered.',
    type: 'website',
    url: URL,
    images: [{ url: 'https://www.thegiftshuffle.com/api/og?title=Best%20Fitness%20Gifts%202026%20%7C%20TheGiftShuffle', width: 1200, height: 630 }],
  },
  alternates: { canonical: URL },
};

const match = (p: { tags?: string[] }) => !!p.tags?.includes('fitness');
const grid = curate({ match, minRating: 4.3, sort: 'social' });
const shuffle = shufflePool(match);

export default function Page() {
  return (
    <GiftGuideTemplate
      canonicalUrl={URL}
      schemaName="Best Fitness Gifts for 2026"
      schemaDescription="The best fitness gift ideas for 2026, curated by TheGiftShuffle"
      breadcrumbLabel="Best Fitness Gifts 2026"
      breadcrumbHref="/best-fitness-gifts-2026"
      heroSrc="/images/heroes/best-fitness-gifts-2026.jpg"
      heroAlt="The best fitness gifts for 2026 including workout gear"
      h1="The Best Fitness Gifts for 2026"
      intro={
        <>
          <p>
            These are the <strong>best fitness gifts for 2026</strong>, top-rated picks for the
            people who actually train, from gym regulars and runners to home-workout devotees.
            Every one supports the habit instead of guilting them into it: recovery tools,
            activewear, smart trackers and the gear they reach for every session.
          </p>
          <p className="text-base text-gray-600">
            Whether they are chasing a PR or just staying consistent, this list spans every budget
            from a sub-$25 accessory to a centerpiece recovery device. Scroll the picks below, or
            hit shuffle for a fresh idea every click.
          </p>
        </>
      }
      shuffleHeading="Shuffle Fitness Gift Picks"
      shuffleProducts={shuffle}
      gridHeading="The Best Fitness Gifts, Ranked"
      gridProducts={grid}
      ctaHeading="Not Sure What Their Training Needs?"
      ctaText="Tell TheGiftShuffle who it is for and your budget, and get an instant fitness gift idea in one click."
      faqs={[
        { q: 'What are the best fitness gifts for 2026?', a: 'The best fitness gifts in 2026 support recovery and consistency: a percussion massage gun, a smart watch or fitness tracker, quality resistance bands, a foam roller, premium activewear, or a shaker and supplement bundle. The pattern that wins is anything that makes their routine easier to stick to.' },
        { q: 'What are good fitness gifts for men?', a: 'Standout fitness gifts for men include a massage gun, a barbell-ready lifting belt, a smart watch, wireless workout earbuds, a quality gym bag, or a recovery tool like a foam roller or compression sleeves. Match the gift to whether they lift, run or train at home.' },
        { q: 'What are good fitness gifts under $50?', a: 'Under $50, the best fitness gifts are resistance bands, a foam roller, a quality jump rope, an insulated shaker bottle, workout gloves, or a set of compression sleeves. Inexpensive but used in nearly every session.' },
        { q: 'What do you get someone who loves working out?', a: 'For a dedicated gym-goer, upgrade the gear they use most: a better pair of training shoes (if you know their size), a massage gun for recovery, a smart watch to track progress, or premium activewear. Recovery tools are the most universally appreciated.' },
        { q: 'What is a good gift for a home-workout fan?', a: 'Home-workout fans love space-efficient, versatile gear: adjustable dumbbells, a set of resistance bands, a quality yoga mat, a foam roller, or a doorway pull-up bar. These pack a full routine into a small footprint.' },
      ]}
      relatedHeading="More Gift Guides"
      relatedLinks={[
        { href: '/category/fitness', label: 'All Fitness Gifts' },
        { href: '/best-camping-gifts', label: 'Best Camping Gifts 2026' },
        { href: '/gift-ideas-for-him', label: 'Gift Ideas for Him' },
        { href: '/gift-ideas-for-her', label: 'Gift Ideas for Her' },
        { href: '/gifts-under-50', label: 'Gifts Under $50' },
        { href: '/gifts-under-100', label: 'Gifts Under $100' },
      ]}
    />
  );
}
