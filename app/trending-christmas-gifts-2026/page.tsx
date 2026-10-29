import type { Metadata } from 'next';
import GiftGuideTemplate from '@/components/GiftGuideTemplate';
import { curate, shufflePool, ALL } from '@/lib/giftSelect';

const URL = 'https://www.thegiftshuffle.com/trending-christmas-gifts-2026';

export const metadata: Metadata = {
  title: 'Trending Christmas Gifts 2026: The Hottest Gifts Everyone Wants | TheGiftShuffle',
  description:
    'The trending Christmas gifts of 2026: KPop Demon Hunters dolls, the Ninja SLUSHi, Labubu, HydroJug, LEGO advent calendars and the rest of this year\'s hot list, all top-rated and checked this season.',
  keywords: [
    'trending christmas gifts 2026',
    'hottest gifts 2026',
    'popular christmas gifts 2026',
    'hot toys 2026',
    'most wanted gifts 2026',
    'viral gifts 2026',
  ],
  openGraph: {
    title: 'Trending Christmas Gifts 2026: The Hottest Gifts Everyone Wants',
    description: 'The 2026 hot list: KPop Demon Hunters, the Ninja SLUSHi, Labubu, HydroJug, LEGO advent calendars and more.',
    type: 'website',
    url: URL,
    images: [{ url: 'https://www.thegiftshuffle.com/images/heroes/trending-christmas-gifts-2026.jpg', width: 1200, height: 800 }],
  },
  alternates: { canonical: URL },
};

// The 2026 trending batch plus catalog products that are on this year's hot
// lists (Owala, Stanley, AirPods Pro 3, Switch 2, Kindle, Instax, Govee,
// Summer Fridays, Laneige, Theragun Mini, Squishmallows).
const ALSO_TRENDING = new Set([
  'sport-owala-40oz', 'dad-fd-8', 'college-airpods', 'gg-mariokart-world', 'admin-1772855047803-flwbb',
  'forher-instax-mini12', 'tech-005', 'stuffer-lip-butter', 'her-bty-1', 'bday-theragun-mini', 'stuffer-squishmallow',
]);
const match = (p: { id: string }) => p.id.startsWith('trend26-') || ALSO_TRENDING.has(p.id);
const grid = curate({ match, minRating: 4.3, sort: 'social', recipientCap: 40, limit: 40, pool: ALL });
const shuffle = shufflePool(match, ALL);

export default function Page() {
  return (
    <GiftGuideTemplate
      canonicalUrl={URL}
      schemaName="Trending Christmas Gifts 2026"
      schemaDescription="The trending Christmas gifts of 2026, curated by TheGiftShuffle"
      breadcrumbLabel="Trending Christmas Gifts 2026"
      breadcrumbHref="/trending-christmas-gifts-2026"
      heroSrc="/images/heroes/trending-christmas-gifts-2026.jpg"
      heroAlt="Trending 2026 gifts: a KPop Demon Hunters doll, Ninja SLUSHi, Labubu pendants, HydroJug, LEGO advent calendar and Sol de Janeiro mist"
      h1="Trending Christmas Gifts of 2026"
      intro={
        <>
          <p>
            These are the <strong>trending Christmas gifts of 2026</strong>: the toys topping
            Amazon, Target and Toy Insider hot lists, the products leading this year&apos;s
            holiday wishlists, and the viral finds everyone is asking for. Every pick is rated
            <strong> 4.3 stars or higher</strong> and was checked live this season.
          </p>
          <p className="text-base text-gray-600">
            Hot gifts sell out first. If something here is on your list, it pays to buy early.
          </p>
        </>
      }
      answer={{
        heading: 'What Are the Most Popular Christmas Gifts in 2026?',
        body: (
          <p>
            The most popular Christmas gifts of 2026 are <strong>KPop Demon Hunters</strong> dolls
            and plush, <strong>Labubu</strong> blind boxes, the <strong>Ninja SLUSHi</strong>{' '}
            frozen drink maker, <strong>HydroJug and Owala</strong> bottles, <strong>LEGO advent
            calendars</strong>, and beauty favorites like <strong>Sol de Janeiro</strong> mists and
            <strong> Summer Fridays</strong> lip balm. For kids, the hot toys are the Bluey Heeler
            House, Hatchin&apos; Yoshi, furReal Gabby and Tickle Me Elmo.
          </p>
        ),
      }}
      shuffleHeading="Shuffle the 2026 Hot List"
      shuffleProducts={shuffle}
      gridHeading={`${grid.length} Trending Christmas Gifts for 2026`}
      gridProducts={grid}
      ctaHeading="Shopping for Someone Specific?"
      ctaText="Tell TheGiftShuffle who it is for and your budget, and get a top-rated match in one click."
      faqs={[
        {
          q: 'What is the hottest toy for Christmas 2026?',
          a: 'KPop Demon Hunters is the toy story of 2026: the Mattel HUNTR/X singing dolls and the official Squishmallows plush are on nearly every hot list. Close behind are the Bluey Light and Surprise Heeler House, Hatchin\' Yoshi, furReal Gabby the tiger, Tickle Me Elmo and the GUI GUI Mega Slime Haul.',
        },
        {
          q: 'What are the trending gifts for adults this year?',
          a: 'For adults, 2026\'s trending gifts are the Ninja SLUSHi frozen drink maker, HydroJug and Owala bottles, Labubu collectibles, Sol de Janeiro Cheirosa mists, the medicube PDRN jelly mask, LEGO Botanicals bouquets and cozy flannel pajamas.',
        },
        {
          q: 'Are LEGO advent calendars a good Christmas gift?',
          a: 'Yes, and they are best given early: a LEGO advent calendar starts December 1 and gives a small build every morning until Christmas. The 2026 Marvel and Friends calendars are both rated 4.8 stars or higher.',
        },
        {
          q: 'Is Labubu on Amazon real?',
          a: 'It can be. Counterfeit "Lafufu" figures are common, so buy from the official POP MART store. The Labubu pick on this page is sold by the POP MART Official Online Store and ships from Amazon.',
        },
        {
          q: 'When should I buy trending Christmas gifts?',
          a: 'As early as you can. The hottest toys and viral gifts sell out first, often before December. Buying in November locks in availability and usually better prices.',
        },
      ]}
      relatedHeading="More Christmas Gift Guides"
      relatedLinks={[
        { href: '/christmas-gift-ideas', label: 'Christmas Gift Ideas' },
        { href: '/christmas-gifts-for-her', label: 'Christmas Gifts for Her' },
        { href: '/christmas-gifts-for-him', label: 'Christmas Gifts for Him' },
        { href: '/stocking-stuffers', label: 'Stocking Stuffers' },
        { href: '/gift-ideas-for-kids', label: 'Gift Ideas for Kids' },
        { href: '/secret-santa-gifts', label: 'Secret Santa Gifts' },
        { href: '/white-elephant-gifts', label: 'White Elephant Gifts' },
        { href: '/gifts-under-50', label: 'Gifts Under $50' },
      ]}
    />
  );
}
