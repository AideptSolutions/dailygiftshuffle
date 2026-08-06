import type { Metadata } from 'next';
import GiftGuideTemplate from '@/components/GiftGuideTemplate';
import { curate, shufflePool, ALL } from '@/lib/giftSelect';

const URL = 'https://www.thegiftshuffle.com/housewarming-gifts';

export const metadata: Metadata = {
  title: 'Best Housewarming Gifts 2026: 30 Ideas for a New Home | TheGiftShuffle',
  description:
    'The best housewarming gifts for 2026: top-rated ideas for couples, friends, family and first-time homeowners, from cozy home upgrades to kitchen essentials they will use daily.',
  keywords: [
    'housewarming gifts',
    'housewarming gift ideas',
    'best housewarming gifts 2026',
    'housewarming gifts for couples',
    'housewarming gifts for friends',
    'housewarming gifts for family',
    'first home gifts',
    'new home gift ideas',
    'unique housewarming gifts',
  ],
  openGraph: {
    title: 'Best Housewarming Gifts 2026: 30 Ideas for a New Home | TheGiftShuffle',
    description: 'Top-rated housewarming gift ideas for couples, friends and first-time homeowners.',
    type: 'website',
    url: URL,
    images: [{ url: 'https://www.thegiftshuffle.com/api/og?title=Housewarming%20Gifts%20%7C%20TheGiftShuffle', width: 1200, height: 630 }],
  },
  alternates: { canonical: URL },
};

// Housewarming = home/kitchen upgrades + the occasion tag where present.
const HOME_KW =
  /candle|diffuser|throw|blanket|vase|plant|planter|cutting board|serving|coaster|barware|wine|cocktail|glasses|mug set|frame|salt lamp|kitchen|knife|cookware|apron|doormat|tray|pillow|organizer|speaker|smart plug|echo|toolkit|tool kit|bird feeder/i;
const match = (p: { name?: string; tags?: string[]; occasions?: string[] }) =>
  !!p.occasions?.includes('housewarming') ||
  (!!p.tags?.some((t) => ['home', 'kitchen'].includes(t)) && !!p.name && HOME_KW.test(p.name));
const grid = curate({ match, minPrice: 15, minRating: 4.5, sort: 'social', recipientCap: 10, limit: 30, pool: ALL });
const shuffle = shufflePool(match, ALL);

export default function Page() {
  return (
    <GiftGuideTemplate
      canonicalUrl={URL}
      schemaName="Best Housewarming Gifts 2026"
      schemaDescription="The best housewarming gift ideas for 2026, curated by TheGiftShuffle"
      breadcrumbLabel="Housewarming Gifts"
      breadcrumbHref="/housewarming-gifts"
      heroSrc="/images/heroes/housewarming-gifts.jpg"
      heroAlt="A cozy housewarming gift with a candle, plant and throw blanket"
      h1="Best Housewarming Gifts for 2026"
      intro={
        <>
          <p>
            The best <strong>housewarming gifts</strong> make a new place feel like home on day one:
            a great candle, a cozy throw, a cutting board that gets used every week, or the clever
            upgrade they did not know they needed. These top-rated picks work for{' '}
            <strong>couples, friends, family and first-time homeowners</strong> alike.
          </p>
          <p className="text-base text-gray-600">
            Whether you are walking into a housewarming party tonight or shipping congratulations
            across the country, shuffle for an instant idea or browse the ranked list below.
          </p>
        </>
      }
      answer={{
        heading: 'What Is a Good Housewarming Gift?',
        body: (
          <p>
            A good housewarming gift is <strong>useful, neutral and a little elevated</strong>: a
            premium candle or diffuser, a quality cutting board or serving tray, a cozy throw
            blanket, a plant in a nice pot, good barware, or a practical upgrade like a smart plug or
            toolkit for the endless first-year fixes. Skip strong decor opinions, you do not know
            their style yet, and pick something every home uses. Consumables like great coffee or
            wine paired with a small keeper gift also land well. Not sure? Hit shuffle below.
          </p>
        ),
      }}
      shuffleHeading="Shuffle Housewarming Ideas"
      shuffleProducts={shuffle}
      gridHeading="Top-Rated Housewarming Gifts, Ranked"
      gridProducts={grid}
      ctaHeading="Party Is Tonight?"
      ctaText="Tell TheGiftShuffle your budget, and get an instant housewarming idea in one click."
      faqs={[
        { q: 'What is a good housewarming gift?', a: 'A good housewarming gift is useful and style-neutral: a premium candle, a quality cutting board, a cozy throw, a plant in a nice pot, good glassware, or a practical toolkit. Every home uses these regardless of taste, which makes them safe and appreciated.' },
        { q: 'What is a good housewarming gift for a couple?', a: 'For a couple, go shareable: a nice barware or wine set, matching mugs with great coffee, a serving board for hosting, or a cozy oversized throw. Gifts that support their first hosting moments in the new place always land well.' },
        { q: 'How much should you spend on a housewarming gift?', a: 'For a friend or coworker, $20 to $50 is standard; for close friends or family, $50 to $100 or more is common, especially for a first home. A well-chosen $30 gift beats a generic $80 one, so spend on usefulness rather than size.' },
        { q: 'What do you bring to a housewarming party?', a: 'Bring something usable that night or soon after: a candle, a bottle of wine with nice stemware, a plant, gourmet snacks on a serving board, or great coffee with mugs. Pair a consumable with one small keeper item and you cover both the party and the memory.' },
        { q: 'What are unique housewarming gifts?', a: 'To stand out, go for the clever upgrade: a smart plug starter set, a salt lamp or diffuser, a window bird feeder, a personalized cutting board, or a quality doormat with personality. Useful-but-unexpected is what gets remembered and mentioned later.' },
      ]}
      relatedHeading="More Gift Guides"
      relatedLinks={[
        { href: '/category/home', label: 'Home & Decor Gifts' },
        { href: '/category/kitchen', label: 'Kitchen Gifts' },
        { href: '/gifts-under-50', label: 'Gifts Under $50' },
        { href: '/category/wedding', label: 'Wedding Gifts' },
        { href: '/gifts-for-people-who-have-everything', label: 'Gifts for People Who Have Everything' },
        { href: '/help-me-pick-a-gift', label: 'Help Me Pick a Gift' },
      ]}
    />
  );
}
