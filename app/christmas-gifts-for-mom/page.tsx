import type { Metadata } from 'next';
import GiftGuideTemplate from '@/components/GiftGuideTemplate';
import { curate, shufflePool, ALL } from '@/lib/giftSelect';

const URL = 'https://www.thegiftshuffle.com/christmas-gifts-for-mom';

export const metadata: Metadata = {
  title: 'Christmas Gifts for Mom 2026: Cozy, Thoughtful Ideas She Will Use | TheGiftShuffle',
  description:
    'The best Christmas gifts for mom in 2026: cozy robes and slippers, candles, self-care sets and this season\'s trending picks, all top-rated, at every budget.',
  keywords: [
    'christmas gifts for mom',
    'christmas gift ideas for mom',
    'best christmas gifts for mom 2026',
    'christmas presents for mom',
    'cozy christmas gifts for mom',
    'christmas gifts for mom who has everything',
  ],
  openGraph: {
    title: 'Christmas Gifts for Mom 2026: Cozy, Thoughtful Ideas She Will Use',
    description: 'Cozy, top-rated Christmas gifts for mom, from robes and candles to this season\'s trending picks.',
    type: 'website',
    url: URL,
    images: [{ url: 'https://www.thegiftshuffle.com/images/heroes/christmas-gifts-for-mom.jpg', width: 1200, height: 800 }],
  },
  alternates: { canonical: URL },
};

const match = (p: { recipients?: string[]; occasions?: string[] }) =>
  !!p.recipients?.includes('mom') && !!p.occasions?.includes('holiday');
// Christmas-morning angle: cozy winter comforts and this season's trending
// picks lead, which keeps the grid distinct from the evergreen mom guide.
const TRENDING = new Set(['trend26-cheirosa-mist', 'trend26-lego-pretty-pink-bouquet', 'trend26-medicube-pdrn-mask']);
// Whole words only: a bare "ugg" matched "Luggage", "tea" matched "steamer".
const COZY = /\b(robes?|slippers?|blankets?|throws?|candles?|pajamas?|mugs?|cashmere|fleece|sherpa|tea|cocoa|bouquet|diffuser|heated|ugg)\b/i;
const isPick = (p: { id?: string; name?: string }) => (!!p.id && TRENDING.has(p.id)) || (!!p.name && COZY.test(p.name));
const DEPRIORITIZE = ['diy-tools', 'car-accessories', 'gaming', 'office', 'finance', 'sports', 'outdoors', 'travel', 'ai-smart-home'];

const grid = curate({
  match,
  minPrice: 15,
  minRating: 4.5,
  sort: 'social',
  preferTags: ['home', 'beauty'],
  deprioritizeTags: DEPRIORITIZE,
  preferMatch: isPick,
  recipientCap: 40,
  limit: 36,
  pool: ALL,
});
const shuffle = shufflePool(match, ALL, { excludeTags: DEPRIORITIZE, keepMatch: isPick });

export default function Page() {
  return (
    <GiftGuideTemplate
      canonicalUrl={URL}
      schemaName="Christmas Gifts for Mom 2026"
      schemaDescription="The best Christmas gifts for mom in 2026, curated by TheGiftShuffle"
      breadcrumbLabel="Christmas Gifts for Mom"
      breadcrumbHref="/christmas-gifts-for-mom"
      heroSrc="/images/heroes/christmas-gifts-for-mom.jpg"
      heroAlt="Christmas gifts for mom on cream linen: a plush robe, sheepskin slippers, an amber candle, a mug of cocoa and a gold bangle with pine and coral ribbon"
      h1="Christmas Gifts for Mom"
      updated="2026-11-01"
      intro={
        <>
          <p>
            The best <strong>Christmas gifts for mom</strong> make December mornings slower and
            cozier: a plush robe, slippers she will wear daily, a candle for the long evenings, or a
            little luxury she keeps putting off buying. Every pick here is rated
            <strong> 4.5 stars or higher</strong> and chosen for the season, not just the occasion.
          </p>
          <p className="text-base text-gray-600">
            Shopping for a mom who says she wants nothing? Start with comfort, then add one small
            treat. Hit shuffle for a fresh idea every click.
          </p>
        </>
      }
      answer={{
        heading: 'What Should I Get My Mom for Christmas?',
        body: (
          <p>
            Get mom something that upgrades a winter ritual she already has: a <strong>plush robe
            and slippers</strong> for Christmas morning, a <strong>premium candle</strong> or
            diffuser for the long evenings, a <strong>self-care set</strong> she would not buy for
            herself, or a cozy throw for the couch. If she loves flowers, a
            <strong> LEGO Botanicals bouquet</strong> lasts all year. Comfort she uses every day
            beats a showpiece she saves for later, and a handwritten card does the rest.
          </p>
        ),
      }}
      shuffleHeading="Shuffle Christmas Gifts for Mom"
      shuffleProducts={shuffle}
      gridHeading={`${grid.length} Top-Rated Christmas Gifts for Mom`}
      gridProducts={grid}
      ctaHeading="Know Her Style but Not the Gift?"
      ctaText="Tell TheGiftShuffle about her and your budget, and get a top-rated Christmas idea for mom in one click."
      faqs={[
        { q: 'What is a good Christmas gift for mom in 2026?', a: 'This season the strongest picks for mom are cozy and practical: a plush robe and sheepskin-style slippers, a premium candle or diffuser, a heated blanket, a self-care set, and trending treats like the Sol de Janeiro Cheirosa mist or a LEGO Botanicals bouquet. Pick the one that fits how she spends a winter evening.' },
        { q: 'What do you get a mom who says she wants nothing?', a: 'Give her comfort and time back. Moms who want nothing still love an upgrade to something they use daily (slippers, a robe, a favorite mug, a better blanket) or a small luxury they never buy themselves. Pair it with a plan to spend an afternoon together and it becomes the gift she talks about.' },
        { q: 'How much should I spend on a Christmas gift for my mom?', a: 'There is no right number. Most people spend somewhere between $25 and $100 on a parent, and a thoughtful $30 gift often lands better than an expensive one picked in a hurry. Every budget is covered on this page, from small treats to a splurge.' },
        { q: 'What are good last-minute Christmas gifts for mom?', a: 'If time is short, choose a gift that is easy to find and hard to get wrong: a cozy robe or slippers, a candle, a self-care set, or a digital gift card for something she enjoys. Our last-minute Christmas gift guide covers the fastest options.' },
      ]}
      relatedHeading="More Christmas Gift Guides"
      relatedLinks={[
        { href: '/christmas-gifts-for-dad', label: 'Christmas Gifts for Dad' },
        { href: '/christmas-gifts-for-her', label: 'Christmas Gifts for Her' },
        { href: '/stocking-stuffers-for-mom', label: 'Stocking Stuffers for Mom' },
        { href: '/gift-ideas-for-mom', label: 'Gift Ideas for Mom' },
        { href: '/trending-christmas-gifts-2026', label: 'Trending Christmas Gifts 2026' },
        { href: '/christmas-gift-ideas', label: 'Christmas Gift Ideas' },
        { href: '/self-care-gifts', label: 'Self-Care Gifts' },
      ]}
    />
  );
}
