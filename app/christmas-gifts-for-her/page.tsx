import type { Metadata } from 'next';
import GiftGuideTemplate from '@/components/GiftGuideTemplate';
import { curate, shufflePool, ALL } from '@/lib/giftSelect';

const URL = 'https://www.thegiftshuffle.com/christmas-gifts-for-her';

export const metadata: Metadata = {
  title: 'Christmas Gifts for Her 2026: 45 Ideas She Will Actually Love | TheGiftShuffle',
  description:
    'The best Christmas gifts for her in 2026: top-rated ideas for your wife, girlfriend, mom or sister, from cozy and luxe to personal and fun, at every budget.',
  keywords: [
    'christmas gifts for her',
    'christmas gift ideas for her',
    'christmas gifts for wife',
    'christmas gifts for girlfriend',
    'christmas gifts for mom',
    'best christmas gifts for her 2026',
    'luxury christmas gifts for her',
    'unique christmas gifts for her',
  ],
  openGraph: {
    title: 'Christmas Gifts for Her 2026: 45 Ideas She Will Actually Love | TheGiftShuffle',
    description: 'Top-rated Christmas gift ideas for your wife, girlfriend, mom or sister, at every budget.',
    type: 'website',
    url: URL,
    images: [{ url: 'https://www.thegiftshuffle.com/api/og?title=Christmas%20Gifts%20for%20Her%20%7C%20TheGiftShuffle', width: 1200, height: 630 }],
  },
  alternates: { canonical: URL },
};

const match = (p: { recipients?: string[]; occasions?: string[] }) =>
  !!(p.recipients?.includes('her') || p.recipients?.includes('mom')) &&
  !!(p.occasions?.includes('holiday') || p.occasions?.includes('christmas'));
const grid = curate({ match, minPrice: 15, minRating: 4.5, sort: 'social', recipientCap: 30, limit: 45, pool: ALL });
const shuffle = shufflePool(match, ALL);

export default function Page() {
  return (
    <GiftGuideTemplate
      canonicalUrl={URL}
      schemaName="Christmas Gifts for Her 2026"
      schemaDescription="The best Christmas gifts for her in 2026, curated by TheGiftShuffle"
      breadcrumbLabel="Christmas Gifts for Her"
      breadcrumbHref="/christmas-gifts-for-her"
      heroSrc="/images/heroes/christmas-gifts-for-her.jpg"
      heroAlt="Christmas gifts for her wrapped in festive paper with ribbon"
      h1="Christmas Gifts for Her"
      intro={
        <>
          <p>
            These are the <strong>best Christmas gifts for her in 2026</strong>: top-rated picks for
            your wife, girlfriend, mom or sister that feel considered instead of last-minute. From
            cozy and luxe, silk, cashmere-soft throws, spa sets, to personal and fun, every idea here
            is chosen to be the one she remembers from under the tree.
          </p>
          <p className="text-base text-gray-600">
            The list spans every budget, from stocking-size treats to a genuine splurge. Hit shuffle
            for a fresh idea every click, or browse the ranked picks below.
          </p>
        </>
      }
      answer={{
        heading: 'What Should I Get Her for Christmas?',
        body: (
          <p>
            The Christmas gifts that land best for her are <strong>small luxuries she would not buy
            herself</strong>: a silk pillowcase or plush robe, a designer fragrance, a luxe skincare
            or spa set, fine or personalized jewelry, a cult-favorite beauty item, or a cozy upgrade
            like a premium blanket. Anchor the gift to something she already loves, her coffee ritual,
            her skincare shelf, a hobby, and pair it with a handwritten card. Specific and thoughtful
            beats expensive every time: the National Retail Federation put average winter-holiday
            spending at a record <strong>$902 per person in 2024</strong>, but the 45 picks here
            average <strong>4.7 stars across more than 3.3 million verified Amazon reviews</strong>{' '}
            at every budget. Not sure? Hit shuffle below for an instant idea.
          </p>
        ),
      }}
      shuffleHeading="Shuffle Christmas Gifts for Her"
      shuffleProducts={shuffle}
      gridHeading="Top-Rated Christmas Gifts for Her, Ranked"
      gridProducts={grid}
      ctaHeading="Still Not Sure What She Would Love?"
      ctaText="Tell TheGiftShuffle who she is and your budget, and get an instant, top-rated Christmas gift idea in one click."
      faqs={[
        { q: 'What are the best Christmas gifts for her in 2026?', a: 'The best Christmas gifts for her in 2026 mix small luxury with everyday use: a silk pillowcase, a designer fragrance, a spa or skincare set, personalized jewelry, a plush robe or premium blanket, and cult-favorite beauty picks. The winning pattern is something she loves but rarely buys for herself.' },
        { q: 'What should I get my wife for Christmas?', a: 'For a wife, go personal and a touch romantic: fine or engraved jewelry, a designer fragrance, a luxe spa set, a silk or cashmere upgrade, or a shared experience for the new year. Pair the gift with a handwritten note and it lands twice as hard.' },
        { q: 'What should I get my girlfriend for Christmas?', a: 'For a girlfriend, think jewelry she would actually wear, a cozy set in her favorite color, a cult beauty item, a hobby upgrade, or a date-night experience. Reference something specific about her and even a modest gift feels deeply considered.' },
        { q: 'What are good Christmas gifts for mom?', a: 'Moms love gifts that turn routines into rituals: a spa or bath set, a premium candle, a cozy robe and slippers, an Ember mug for her coffee, a silk pillowcase, or a personalized keepsake. Comfort plus a little luxury is the reliable formula.' },
        { q: 'What are good Christmas gifts for her under $50?', a: 'Under $50, strong picks include a silk scrunchie or pillowcase set, a premium candle, a cult-favorite lip mask or hand cream set, cozy socks and a throw, an aromatherapy diffuser, or a self-care gift box. Wrap it beautifully and it feels far more expensive.' },
      ]}
      relatedHeading="More Holiday Gift Guides"
      relatedLinks={[
        { href: '/christmas-gift-ideas', label: 'Christmas Gift Ideas' },
        { href: '/christmas-gifts-for-him', label: 'Christmas Gifts for Him' },
        { href: '/best-gifts-for-her-2026', label: 'Best Gifts for Her 2026' },
        { href: '/luxury-gifts-for-her', label: 'Luxury Gifts for Her' },
        { href: '/stocking-stuffers', label: 'Stocking Stuffers' },
        { href: '/gifts-for-wife', label: 'Gifts for Your Wife' },
      ]}
    />
  );
}
