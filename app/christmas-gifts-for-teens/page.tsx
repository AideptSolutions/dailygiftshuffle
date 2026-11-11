import type { Metadata } from 'next';
import GiftGuideTemplate from '@/components/GiftGuideTemplate';
import { curate, shufflePool, ALL } from '@/lib/giftSelect';

const URL = 'https://www.thegiftshuffle.com/christmas-gifts-for-teens';

export const metadata: Metadata = {
  title: 'Christmas Gifts for Teens 2026: What They Actually Want',
  description:
    'The best Christmas gifts for teens in 2026: the viral bottles, beauty and tech they are asking for, plus Labubu and KPop Demon Hunters picks, all top-rated and checked this season.',
  keywords: [
    'christmas gifts for teens',
    'christmas gift ideas for teens',
    'best christmas gifts for teens 2026',
    'christmas gifts for teenage girls',
    'christmas gifts for teenage boys',
    'trending christmas gifts for teens',
  ],
  openGraph: {
    title: 'Christmas Gifts for Teens 2026: What They Actually Want',
    description: 'The viral bottles, beauty, tech and collectibles teens are asking for this Christmas.',
    type: 'website',
    url: URL,
    images: [{ url: 'https://www.thegiftshuffle.com/images/heroes/christmas-gifts-for-teens.jpg', width: 1200, height: 800 }],
  },
  alternates: { canonical: URL },
};

const match = (p: { recipients?: string[]; occasions?: string[] }) =>
  !!p.recipients?.includes('teens') && !!p.occasions?.includes('holiday');
// What teens are asking for this season: the 2026 trending picks lead, then
// the tech, beauty and collectibles teens name on their lists.
const TRENDING = new Set([
  'trend26-labubu-big-into-energy', 'trend26-kpop-zoey-doll', 'trend26-kpop-rumi-plush', 'trend26-hydrojug-traveler',
  'trend26-cheirosa-mist', 'trend26-medicube-pdrn-mask', 'trend26-bluetooth-beanie', 'sport-owala-40oz',
  'forher-instax-mini12', 'college-airpods', 'gg-mariokart-world',
]);
// Whole words only: a bare "lip" matched "Non-Slip".
const TEEN = /\b(instax|polaroid|airpods|beats|jbl|skullcandy|owala|stanley|hydrojug|labubu|squishmallows?|lip|mist|hoodie|sol de janeiro|laneige)\b/i;
const isPick = (p: { id?: string; name?: string }) => (!!p.id && TRENDING.has(p.id)) || (!!p.name && TEEN.test(p.name));

const grid = curate({
  match,
  minPrice: 10,
  minRating: 4.4,
  sort: 'social',
  preferMatch: isPick,
  deprioritizeTags: ['parenting', 'baby-shower', 'wedding', 'finance', 'fitness'],
  recipientCap: 40,
  limit: 36,
  pool: ALL,
});
const shuffle = shufflePool(match, ALL);

export default function Page() {
  return (
    <GiftGuideTemplate
      canonicalUrl={URL}
      schemaName="Christmas Gifts for Teens 2026"
      schemaDescription="The best Christmas gifts for teens in 2026, curated by TheGiftShuffle"
      breadcrumbLabel="Christmas Gifts for Teens"
      breadcrumbHref="/christmas-gifts-for-teens"
      heroSrc="/images/heroes/christmas-gifts-for-teens.jpg"
      heroAlt="Christmas gifts for teens on cream linen: wireless earbuds, an instant camera, a water bottle, a knit beanie, a vinyl figure and lip gloss with pine and coral ribbon"
      h1="Christmas Gifts for Teens"
      updated="2026-11-01"
      intro={
        <>
          <p>
            Teens know exactly what they want, and in 2026 it is mostly what is all over their
            feeds: <strong>Labubu</strong>, <strong>KPop Demon Hunters</strong>, a{' '}
            <strong>HydroJug or Owala</strong> bottle, an <strong>Instax camera</strong>, and
            cult beauty like <strong>Sol de Janeiro</strong>. These are the <strong>Christmas gifts
            for teens</strong> that land, every one rated <strong>4.4 stars or higher</strong>.
          </p>
          <p className="text-base text-gray-600">
            Not sure what is cool this month? Shuffle below for a fresh idea every click.
          </p>
        </>
      }
      answer={{
        heading: 'What Do Teens Want for Christmas in 2026?',
        body: (
          <p>
            Teens want the things their friends have this year: <strong>Labubu blind
            boxes</strong>, <strong>KPop Demon Hunters</strong> merch, an oversized{' '}
            <strong>HydroJug or Owala</strong> bottle, an <strong>Instax instant camera</strong>,{' '}
            <strong>AirPods</strong>, a <strong>Bluetooth beanie</strong>, and beauty favorites like
            the <strong>Sol de Janeiro Cheirosa mist</strong> and the <strong>medicube</strong>{' '}
            jelly mask. For gamers, <strong>Mario Kart World</strong> on Switch 2 is the pick. When
            in doubt, a gift card to a store they love beats a guess.
          </p>
        ),
      }}
      shuffleHeading="Shuffle Christmas Gifts for Teens"
      shuffleProducts={shuffle}
      gridHeading={`${grid.length} Top-Rated Christmas Gifts for Teens`}
      gridProducts={grid}
      ctaHeading="Shopping for a Teen You Barely Understand?"
      ctaText="Tell TheGiftShuffle their age and your budget, and get a teen-approved Christmas idea in one click."
      faqs={[
        { q: 'What is the most popular Christmas gift for teens in 2026?', a: 'The most requested teen gifts this season are Labubu blind boxes, KPop Demon Hunters dolls and plush, HydroJug and Owala bottles, Instax cameras, AirPods, and beauty picks like Sol de Janeiro mists and Summer Fridays lip balm. Collectibles and viral beauty are the two big trends.' },
        { q: 'What are good Christmas gifts for teenage girls?', a: 'Teen girls tend to love cult beauty (Sol de Janeiro, Laneige, medicube), an Instax camera, a trendy bottle, cozy loungewear, Labubu, and KPop Demon Hunters merch. Our gifts for teenage girls guide has more ideas by interest.' },
        { q: 'What are good Christmas gifts for teenage boys?', a: 'Teen boys usually go for gaming (Mario Kart World, controllers, gift cards), audio like AirPods or a Bluetooth speaker, a Bluetooth beanie, sports gear, and a big insulated bottle. See our gifts for teenage boys guide for more.' },
        { q: 'Is a gift card a good Christmas gift for a teen?', a: 'Yes. Teens often prefer choosing for themselves, and a gift card for a store, game platform or app they already use is one of the safest teen gifts. Pair it with a small physical treat so there is something to unwrap.' },
      ]}
      relatedHeading="More Christmas Gift Guides"
      relatedLinks={[
        { href: '/christmas-gifts-for-kids', label: 'Christmas Gifts for Kids' },
        { href: '/trending-christmas-gifts-2026', label: 'Trending Christmas Gifts 2026' },
        { href: '/gifts-for-teenage-girls', label: 'Gifts for Teenage Girls' },
        { href: '/gifts-for-teenage-boys', label: 'Gifts for Teenage Boys' },
        { href: '/gift-ideas-for-teens', label: 'Gift Ideas for Teens' },
        { href: '/stocking-stuffers', label: 'Stocking Stuffers' },
        { href: '/christmas-gift-ideas', label: 'Christmas Gift Ideas' },
      ]}
    />
  );
}
