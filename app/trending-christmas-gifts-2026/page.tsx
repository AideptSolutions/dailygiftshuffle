import type { Metadata } from 'next';
import GiftGuideTemplate from '@/components/GiftGuideTemplate';
import { curate, shufflePool, byIds, ALL } from '@/lib/giftSelect';
import { PickThumb, PickThumbLink } from '@/components/AmazonPicks';

const URL = 'https://www.thegiftshuffle.com/trending-christmas-gifts-2026';

export const metadata: Metadata = {
  title: 'Trending Christmas Gifts 2026: What Search Data Says Is Hot',
  description:
    'The trending Christmas gifts of 2026, measured with US Google search data: medicube, the Nintendo Switch 2, rhode blush and HydroJug are rising, while Labubu and KPop Demon Hunters have cooled.',
  keywords: [
    'trending christmas gifts 2026',
    'hottest gifts 2026',
    'popular christmas gifts 2026',
    'hot toys 2026',
    'most wanted gifts 2026',
    'is labubu still popular',
  ],
  openGraph: {
    title: 'Trending Christmas Gifts 2026: What Search Data Says Is Hot',
    description: 'Which gifts US shoppers are searching for more this fall, and which of last year\'s crazes have cooled.',
    type: 'website',
    url: URL,
    images: [{ url: 'https://www.thegiftshuffle.com/images/heroes/trending-christmas-gifts-2026.jpg', width: 1200, height: 800 }],
  },
  alternates: { canonical: URL },
};

// The 2026 trending batch plus catalog products that are on this year's hot
// lists or rising in search (Owala, Stanley, AirPods Pro 3, Switch 2, Kindle,
// Instax, Govee, Summer Fridays, Laneige, Theragun Mini, Squishmallows,
// medicube, rhode).
const ALSO_TRENDING = new Set([
  'sport-owala-40oz', 'dad-fd-8', 'college-airpods', 'gg-mariokart-world', 'admin-1772855047803-flwbb',
  'forher-instax-mini12', 'tech-005', 'stuffer-lip-butter', 'her-bty-1', 'bday-theragun-mini', 'stuffer-squishmallow',
  'bty-004', 'her-trend-2',
]);
const match = (p: { id: string }) => p.id.startsWith('trend26-') || ALSO_TRENDING.has(p.id);
const grid = curate({ match, minRating: 4.3, sort: 'social', recipientCap: 40, limit: 40, pool: ALL });
const shuffle = shufflePool(match, ALL);

// US Google Trends, weekly. Average interest Sep 27 to Nov 7, 2026 vs the same
// weeks of 2025, pulled Nov 9, 2026. Raw data: research/google-trends-2026-11-09.json
// Third value: catalog product id for the shop link (verified ASIN, local image).
const TRENDS: { group: string; rows: [string, string, string?][] }[] = [
  {
    group: 'Rising',
    rows: [
      ['medicube skincare', '+119%', 'trend26-medicube-pdrn-mask'],
      ['rhode blush', '+58%', 'her-trend-2'],
      ['Nintendo Switch 2', '+57%', 'gg-mariokart-world'],
      ['HydroJug', '+33%', 'trend26-hydrojug-traveler'],
      ['Toniebox', '+21%', 'trend26-toniebox2-teal'],
      ['Kindle Paperwhite', '+17%', 'tech-002'],
      ['Theragun Mini', '+17%', 'bday-theragun-mini'],
      ['Fitbit', '+14%'],
    ],
  },
  {
    group: 'Steady',
    rows: [
      ['Olaplex', '+5%', 'beauty-olaplex-kit'],
      ['Govee lights', '+3%', 'tech-005'],
      ['Lovevery', '0%', 'par-008'],
      ['LEGO advent calendar', '-4%', 'trend26-lego-marvel-advent'],
    ],
  },
  {
    group: 'Cooling',
    rows: [
      ['Squishmallows', '-23%', 'stuffer-squishmallow'],
      ['AirPods Pro 3', '-24%', 'college-airpods'],
      ['Summer Fridays lip balm', '-25%', 'stuffer-lip-butter'],
      ['Sol de Janeiro', '-31%', 'trend26-cheirosa-mist'],
      ['Stanley cup', '-32%', 'dad-fd-8'],
      ['KPop Demon Hunters', '-85%', 'trend26-kpop-zoey-doll'],
      ['Labubu', '-92%', 'trend26-labubu-big-into-energy'],
    ],
  },
];

const PICKS = new Map(
  byIds(TRENDS.flatMap((g) => g.rows.map((r) => r[2]).filter((id): id is string => !!id))).map((p) => [p.id, p])
);

export default function Page() {
  return (
    <GiftGuideTemplate
      canonicalUrl={URL}
      schemaName="Trending Christmas Gifts 2026"
      schemaDescription="The trending Christmas gifts of 2026, measured with US Google search data by TheGiftShuffle"
      breadcrumbLabel="Trending Christmas Gifts 2026"
      breadcrumbHref="/trending-christmas-gifts-2026"
      heroSrc="/images/heroes/trending-christmas-gifts-2026.jpg"
      heroAlt="Rising 2026 gifts on cream linen: a skincare jelly mask and serums, a handheld game console, a large insulated water bottle, a kids audio speaker with a plush figure, an e-reader and a blush stick, with pine and coral ribbon"
      h1="Trending Christmas Gifts of 2026"
      updated="2026-11-09"
      intro={
        <>
          <p>
            These are the <strong>trending Christmas gifts of 2026</strong>, measured rather than
            guessed. We compared US Google search interest for about 30 popular gifts this fall with
            the same weeks last year, and checked the results against Google&apos;s own Holiday 100
            list, published November 9.
          </p>
          <p className="text-base text-gray-600">
            The short version: skincare, the Switch 2 and practical everyday gifts are up, while
            last year&apos;s viral crazes have cooled sharply.
          </p>
          <div className="overflow-x-auto">
            <table className="w-full text-sm sm:text-base text-left border border-[#E2E8F0] rounded-xl overflow-hidden bg-white">
              <caption className="text-xs text-gray-500 text-left px-3 pb-2">
                Change in US Google search interest, Sep 27 to Nov 7, 2026 vs the same weeks of 2025
              </caption>
              <thead>
                <tr className="bg-gray-50 text-xs uppercase tracking-wide text-gray-500">
                  <th scope="col" className="py-2 px-3">Gift</th>
                  <th scope="col" className="py-2 px-3 text-right">Search change</th>
                  <th scope="col" className="py-2 px-3 text-right"><span className="sr-only">Shop</span></th>
                </tr>
              </thead>
              {TRENDS.map((g) => (
                <tbody key={g.group}>
                  <tr>
                    <th scope="rowgroup" colSpan={3} className="pt-3 pb-1 px-3 text-xs uppercase tracking-wide text-[#F04E30]">
                      {g.group}
                    </th>
                  </tr>
                  {g.rows.map(([name, change, id]) => {
                    const pick = id ? PICKS.get(id) : undefined;
                    return (
                      <tr key={name} className="border-t border-gray-100">
                        <td className="py-1.5 px-3">
                          <div className="flex items-center gap-3">
                            {pick ? <PickThumb product={pick} /> : <span className="h-11 w-11 shrink-0" aria-hidden="true" />}
                            <div className="min-w-0">
                              <span className="block font-medium text-gray-900">{name}</span>
                              {pick && <span className="block text-xs text-gray-500">{pick.name}</span>}
                            </div>
                          </div>
                        </td>
                        <td className="py-1.5 px-3 text-right font-semibold tabular-nums">{change}</td>
                        <td className="py-1.5 px-3 text-right">{pick && <PickThumbLink product={pick} />}</td>
                      </tr>
                    );
                  })}
                </tbody>
              ))}
            </table>
          </div>
          <p className="text-sm text-gray-500">
            How we measured: weekly US Google Trends data, pulled November 9, 2026. Each figure is the
            change in average search interest over six weeks. Google Trends shows relative interest,
            not search counts, so we left out gifts with too little search volume to measure reliably.
          </p>
        </>
      }
      answer={{
        heading: 'What Are the Trending Christmas Gifts in 2026?',
        body: (
          <p>
            By US search growth this fall, the trending Christmas gifts of 2026 are{' '}
            <strong>medicube skincare</strong> (up 119%), <strong>rhode blush</strong> (up 58%), the{' '}
            <strong>Nintendo Switch 2</strong> (up 57%), <strong>HydroJug</strong> bottles (up 33%)
            and the <strong>Toniebox</strong> (up 21%). Google&apos;s Holiday 100 adds the Fujifilm
            instax holiday set, the Nike V5 RNR and perfume sampler sets. Last year&apos;s crazes have
            cooled: Labubu searches are down 92% and KPop Demon Hunters down 85%.
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
          a: 'By search growth, the Nintendo Switch 2 is the hottest big-ticket gift for kids and teens, with US searches up 57% this fall compared with last year, and the Toniebox audio player is up 21%. Google\'s Holiday 100 also highlights the FAO Schwarz piano mat (searches up 180%), the Bluey Toniebox starter set and classic toy train sets (up 240%). KPop Demon Hunters toys are still widely known, but searches are down 85% from last fall\'s peak.',
        },
        {
          q: 'Is Labubu still popular in 2026?',
          a: 'Labubu is still collected, but the craze has cooled a lot. US searches for Labubu peaked in June 2025, and this fall they are 92% lower than at the same point last year. If you buy one, counterfeit "Lafufu" figures are common, so buy from the official POP MART store. The Labubu pick on this page is sold by the POP MART Official Online Store.',
        },
        {
          q: 'What are the trending gifts for adults this year?',
          a: 'For adults, the gifts gaining the most search interest this fall are medicube skincare (up 119%), rhode blush (up 58%), HydroJug bottles (up 33%), the Kindle Paperwhite (up 17%) and the Theragun Mini (up 17%). Google\'s Holiday 100 reports that perfume sampler sets were the most-searched gift set of 2026, with the Fujifilm instax holiday set up 190% and the Nike V5 RNR running shoe up 150%.',
        },
        {
          q: 'How does TheGiftShuffle measure what is trending?',
          a: 'We compare US Google Trends search interest for each gift over the six weeks from September 27 to November 7, 2026 with the same six weeks of 2025, using weekly data pulled on November 9, 2026. A gift is rising if its average interest grew. Google Trends shows relative interest rather than search counts, so gifts with very little search volume are left out, and Holiday 100 figures are quoted as Google reported them.',
        },
        {
          q: 'Are LEGO advent calendars a good Christmas gift?',
          a: 'Yes, and they are best given early: a LEGO advent calendar starts December 1 and gives a small build every morning until Christmas. Search interest is steady this year, almost exactly level with last fall, and the 2026 Marvel and Friends calendars are both rated 4.8 stars or higher.',
        },
        {
          q: 'When should I buy trending Christmas gifts?',
          a: 'As early as you can. The hottest toys and viral gifts sell out first, often before December. Buying in November locks in availability and usually better prices.',
        },
      ]}
      relatedHeading="More Christmas Gift Guides"
      relatedLinks={[
        { href: '/holiday-shopping-statistics-2026', label: 'Holiday Shopping Statistics 2026' },
        { href: '/christmas-gift-ideas', label: 'Christmas Gift Ideas' },
        { href: '/christmas-gifts-for-her', label: 'Christmas Gifts for Her' },
        { href: '/christmas-gifts-for-him', label: 'Christmas Gifts for Him' },
        { href: '/stocking-stuffers', label: 'Stocking Stuffers' },
        { href: '/christmas-gifts-for-kids', label: 'Christmas Gifts for Kids' },
        { href: '/christmas-gifts-for-teens', label: 'Christmas Gifts for Teens' },
        { href: '/secret-santa-gifts', label: 'Secret Santa Gifts' },
        { href: '/white-elephant-gifts', label: 'White Elephant Gifts' },
        { href: '/last-minute-christmas-gifts', label: 'Last-Minute Christmas Gifts' },
      ]}
    />
  );
}
