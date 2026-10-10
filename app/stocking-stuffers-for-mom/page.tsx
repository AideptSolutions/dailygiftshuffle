import type { Metadata } from 'next';
import GiftGuideTemplate from '@/components/GiftGuideTemplate';
import { curate, shufflePool, ALL } from '@/lib/giftSelect';

const URL = 'https://www.thegiftshuffle.com/stocking-stuffers-for-mom';

export const metadata: Metadata = {
  title: 'Stocking Stuffers for Mom 2026: Small Gifts She Will Treasure | TheGiftShuffle',
  description:
    'The best stocking stuffers for mom in 2026: top-rated small comforts under $25, from hand cream and cozy socks to the little luxuries she never buys herself. All verified this season.',
  keywords: [
    'stocking stuffers for mom',
    'stocking stuffers for grandma',
    'mom stocking stuffer ideas',
    'small gifts for mom under 25',
    'stocking stuffers for wife mom',
  ],
  openGraph: {
    title: 'Stocking Stuffers for Mom 2026: Small Gifts She Will Treasure',
    description: 'Top-rated small comforts under $25, from hand cream and cozy socks to little luxuries.',
    type: 'website',
    url: URL,
    images: [{ url: 'https://www.thegiftshuffle.com/images/heroes/stocking-stuffers-for-mom.jpg', width: 1200, height: 800 }],
  },
  alternates: { canonical: URL },
};

const match = (p: { price?: number; recipients?: string[] }) =>
  (p.price ?? 999) <= 25 && (p.price ?? 0) >= 4 && !!p.recipients?.includes('mom');
const grid = curate({ match, minRating: 4.5, sort: 'social', recipientCap: 40, limit: 30, pool: ALL });
const shuffle = shufflePool(match, ALL);

export default function Page() {
  return (
    <GiftGuideTemplate
      canonicalUrl={URL}
      schemaName="Stocking Stuffers for Mom 2026"
      schemaDescription="The best stocking stuffers for mom in 2026, curated by TheGiftShuffle"
      breadcrumbLabel="Stocking Stuffers for Mom"
      breadcrumbHref="/stocking-stuffers-for-mom"
      heroSrc="/images/heroes/stocking-stuffers-for-mom.jpg"
      heroAlt="Comforting stocking stuffers for mom including hand cream, a candle and cozy socks around a cream stocking"
      h1="Stocking Stuffers for Mom, 2026 Edition"
      intro={
        <>
          <p>
            The best <strong>stocking stuffers for mom</strong> are the small comforts she skips
            for herself all year: real hand cream, cozy socks, a good candle, the nice lip balm.
            Every pick here is under $25 and rated <strong>4.5 stars or higher</strong> by real
            buyers.
          </p>
          <p className="text-base text-gray-600">
            Stuffing a stocking for mom or grandma? Shuffle below for a fresh idea every click, or
            pin a few and let the Gift Genie read her taste.
          </p>
        </>
      }
      answer={{
        heading: 'What Are the Best Stocking Stuffers for Mom?',
        body: (
          <p>
            The best stocking stuffers for mom are the self-care basics she never buys herself:{' '}
            <strong>O&apos;Keeffe&apos;s or quality hand cream</strong>, <strong>fuzzy socks</strong>, a{' '}
            <strong>mini candle</strong>, a <strong>lip balm trio</strong>, a{' '}
            <strong>silk scrunchie</strong>, <strong>nice chocolate</strong>, or a{' '}
            <strong>sleep mask</strong>. Two pampering picks, one cozy pick and one small treat
            makes the stocking she mentions all week; everything here is under $25 and rated 4.5
            stars or higher.
          </p>
        ),
      }}
      shuffleHeading="Shuffle Stuffers for Mom"
      shuffleProducts={shuffle}
      gridHeading={`${grid.length} Best Stocking Stuffers for Mom, Ranked`}
      gridProducts={grid}
      ctaHeading="Not Sure What Mom Would Love?"
      ctaText="Tell TheGiftShuffle who she is and your budget, and get an instant idea in one click."
      faqs={[
        {
          q: 'What are the best stocking stuffers for mom in 2026?',
          a: 'The picks that land every year: a serious hand cream like O Keeffes Working Hands, fuzzy or wool socks, a mini soy candle, a quality lip balm set, silk scrunchies, good chocolate, and a silk sleep mask. Practical pampering beats novelty for moms.',
        },
        {
          q: 'What stocking stuffers work for grandma?',
          a: 'Grandmas love the same comforts with a gentler skew: hand cream, warm socks, a lavender candle, a large-print puzzle book, nice tea or chocolate, and a cozy scarf if the stocking is big enough. Useful and warm wins over trendy.',
        },
        {
          q: 'What small luxury stuffers feel special for mom?',
          a: 'The under-$25 luxuries that feel far more expensive: a Summer Fridays lip butter balm, a silk scrunchie set, a travel-size designer hand cream, or a boxed mini perfume. One of these elevates a stocking of practical picks.',
        },
        {
          q: 'How much should you spend on stocking stuffers for mom?',
          a: 'Four to six items between $5 and $25, or about $50 to $80 total. Anchor with one small luxury around $20, then fill with the cozy and practical picks she will use daily.',
        },
      ]}
      relatedHeading="More Gift Guides"
      relatedLinks={[
        { href: '/stocking-stuffers', label: 'All Stocking Stuffers' },
        { href: '/stocking-stuffers-for-her', label: 'Stocking Stuffers for Her' },
        { href: '/stocking-stuffers-under-10', label: 'Stocking Stuffers Under $10' },
        { href: '/stocking-stuffers-for-dad', label: 'Stocking Stuffers for Dad' },
        { href: '/gift-ideas-for-mom', label: 'Gift Ideas for Mom' },
        { href: '/christmas-gifts-for-her', label: 'Christmas Gifts for Her' },
        { href: '/best-beauty-gifts-2026', label: 'Best Beauty Gifts' },
        { href: '/gifts-under-25', label: 'Gifts Under $25' },
      ]}
    />
  );
}
