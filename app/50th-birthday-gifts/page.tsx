import type { Metadata } from 'next';
import GiftGuideTemplate from '@/components/GiftGuideTemplate';
import { curate, shufflePool, ALL } from '@/lib/giftSelect';

const URL = 'https://www.thegiftshuffle.com/50th-birthday-gifts';

export const metadata: Metadata = {
  title: '50th Birthday Gifts: 30 Golden-Milestone Ideas (2026) | TheGiftShuffle',
  description:
    'The best 50th birthday gifts for 2026: meaningful, elevated ideas for men and women turning 50, from keepsakes and premium upgrades to experiences worth remembering.',
  keywords: [
    '50th birthday gifts',
    '50th birthday gift ideas',
    '50th birthday gifts for men',
    '50th birthday gifts for women',
    '50th birthday gifts for him',
    '50th birthday gifts for her',
    'golden birthday gifts',
    'turning 50 gift ideas',
  ],
  openGraph: {
    title: '50th Birthday Gifts: 30 Golden-Milestone Ideas (2026) | TheGiftShuffle',
    description: 'Meaningful, elevated 50th birthday gift ideas for men and women at every budget.',
    type: 'website',
    url: URL,
    images: [{ url: 'https://www.thegiftshuffle.com/api/og?title=50th%20Birthday%20Gifts%20%7C%20TheGiftShuffle', width: 1200, height: 630 }],
  },
  alternates: { canonical: URL },
};

// Milestone birthdays skew elevated: birthday occasion, adult recipients, $25+.
const match = (p: { occasions?: string[] }) => !!p.occasions?.includes('birthday');
const grid = curate({
  match,
  minPrice: 25,
  minRating: 4.5,
  sort: 'social',
  excludeRecipients: ['baby', 'pets', 'kids', 'teens'],
  limit: 30,
  pool: ALL,
});
const shuffle = shufflePool(match, ALL);

export default function Page() {
  return (
    <GiftGuideTemplate
      canonicalUrl={URL}
      schemaName="50th Birthday Gifts"
      schemaDescription="The best 50th birthday gift ideas, curated by TheGiftShuffle"
      breadcrumbLabel="50th Birthday Gifts"
      breadcrumbHref="/50th-birthday-gifts"
      heroSrc="/images/heroes/50th-birthday-gifts.jpg"
      heroAlt="50th birthday gifts with gold balloons and celebration decor"
      h1="50th Birthday Gifts"
      intro={
        <>
          <p>
            Fifty is the golden milestone, and these <strong>best 50th birthday gifts</strong> treat
            it that way: meaningful keepsakes, premium upgrades and experience-ready gear for men and
            women who have earned something better than another sweater. Every pick is top-rated and
            chosen to match a half-century worth celebrating.
          </p>
          <p className="text-base text-gray-600">
            Shopping as a family, a partner or a friend, there is a fit at every budget. Hit shuffle
            for a fresh idea every click, or browse the ranked list below.
          </p>
        </>
      }
      answer={{
        heading: 'What Is a Good 50th Birthday Gift?',
        body: (
          <p>
            A good 50th birthday gift is <strong>meaningful first, premium second</strong>: a
            keepsake that marks the milestone, engraved jewelry or a watch, a memory book or custom
            star map, a serious upgrade to a beloved ritual, a whiskey decanter set, espresso gear,
            top-tier headphones, or an experience they will talk about, a trip, a tasting, great
            seats. At 50 the best gifts either honor the story so far or fund the next chapter.
            Sentiment plus quality is the formula. Not sure? Hit shuffle below for an instant idea.
          </p>
        ),
      }}
      shuffleHeading="Shuffle 50th Birthday Ideas"
      shuffleProducts={shuffle}
      gridHeading="Golden-Milestone 50th Birthday Gifts, Ranked"
      gridProducts={grid}
      ctaHeading="Half a Century Deserves a Great Gift"
      ctaText="Tell TheGiftShuffle who is turning 50 and your budget, and get an instant, milestone-worthy idea in one click."
      faqs={[
        { q: 'What is a good 50th birthday gift?', a: 'Good 50th birthday gifts are meaningful and elevated: engraved jewelry or a quality watch, a custom keepsake like a star map, a premium ritual upgrade such as a whiskey decanter or espresso setup, or an experience like a trip or tasting. Honor the milestone rather than just marking it.' },
        { q: 'What is a good 50th birthday gift for a man?', a: 'For a man turning 50, dependable winners are a quality watch, a whiskey decanter set, premium headphones, golf or grill upgrades, quality luggage for the travel years, or tickets to something he loves. A personal card with real words elevates any of them.' },
        { q: 'What is a good 50th birthday gift for a woman?', a: 'For a woman turning 50, think fine or engraved jewelry, a designer fragrance, a luxury spa or skincare set, a cashmere or silk upgrade, or a memorable experience like a getaway. The best picks feel like a celebration of her, not a reminder of the number.' },
        { q: 'How much should you spend on a 50th birthday gift?', a: 'Friends commonly spend $30 to $100; partners and close family often go $100 to $500 for the milestone, sometimes pooling for one big gift or trip. One substantial, considered gift beats a pile of small ones at 50.' },
        { q: 'What are sentimental 50th birthday gift ideas?', a: 'Sentimental winners include a photo book of 50 years, a custom star map of a meaningful date, engraved jewelry or a watch with a message, a memory jar filled by friends and family, or a framed print of a place that matters. Pair one sentimental piece with one indulgent pick for the full effect.' },
      ]}
      relatedHeading="More Birthday Gift Guides"
      relatedLinks={[
        { href: '/birthday-gift-ideas', label: 'Birthday Gift Ideas' },
        { href: '/40th-birthday-gifts', label: '40th Birthday Gifts' },
        { href: '/30th-birthday-gifts', label: '30th Birthday Gifts' },
        { href: '/best-luxury-gifts-2026', label: 'Best Luxury Gifts 2026' },
        { href: '/gifts-for-people-who-have-everything', label: 'Gifts for People Who Have Everything' },
        { href: '/retirement-gifts', label: 'Retirement Gifts' },
      ]}
    />
  );
}
