import type { Metadata } from 'next';
import GiftGuideTemplate from '@/components/GiftGuideTemplate';
import { curate, shufflePool, ALL } from '@/lib/giftSelect';

const URL = 'https://www.thegiftshuffle.com/stocking-stuffers-for-her';

export const metadata: Metadata = {
  title: 'Stocking Stuffers for Her 2026: 30 Small Gifts She Will Actually Use | TheGiftShuffle',
  description:
    'The best stocking stuffers for her in 2026: top-rated small gifts under $25 for wives, girlfriends, moms and sisters. Beauty minis, cozy picks and clever finds she will use all year.',
  keywords: [
    'stocking stuffers for her',
    'stocking stuffers for women',
    'stocking stuffers for wife',
    'stocking stuffers for girlfriend',
    'stocking stuffers for mom',
    'small gifts for her under 25',
  ],
  openGraph: {
    title: 'Stocking Stuffers for Her 2026: 30 Small Gifts She Will Actually Use',
    description: 'Top-rated stocking stuffers for wives, girlfriends, moms and sisters, all under $25.',
    type: 'website',
    url: URL,
    images: [{ url: 'https://www.thegiftshuffle.com/images/heroes/stocking-stuffers-for-her.jpg', width: 1200, height: 800 }],
  },
  alternates: { canonical: URL },
};

const match = (p: { price?: number; recipients?: string[] }) =>
  (p.price ?? 999) <= 25 && (p.price ?? 0) >= 4 && !!p.recipients?.some((r) => r === 'her' || r === 'mom' || r === 'sister');
const grid = curate({ match, minRating: 4.5, sort: 'social', recipientCap: 15, limit: 30, pool: ALL });
const shuffle = shufflePool(match, ALL);

export default function Page() {
  return (
    <GiftGuideTemplate
      canonicalUrl={URL}
      schemaName="Stocking Stuffers for Her 2026"
      schemaDescription="The best stocking stuffers for her in 2026, curated by TheGiftShuffle"
      breadcrumbLabel="Stocking Stuffers for Her"
      breadcrumbHref="/stocking-stuffers-for-her"
      heroSrc="/images/heroes/stocking-stuffers-for-her.jpg"
      heroAlt="Elegant small stocking stuffer gifts for her around a cream Christmas stocking"
      h1="Stocking Stuffers for Her, 2026 Edition"
      intro={
        <>
          <p>
            The best <strong>stocking stuffers for her</strong> are the small things she would
            never buy herself but uses constantly once she has them: beauty minis, cozy upgrades,
            and clever little finds. Every pick here is under $25 and rated{' '}
            <strong>4.5 stars or higher</strong> by real buyers.
          </p>
          <p className="text-base text-gray-600">
            Shopping for a wife, girlfriend, mom or sister? Shuffle below for a fresh idea every
            click, or pin a few favorites and let the Gift Genie read her taste.
          </p>
        </>
      }
      answer={{
        heading: 'What Are the Best Stocking Stuffers for Her?',
        body: (
          <p>
            The best stocking stuffers for her mix pampering with daily use:{' '}
            <strong>quality hand cream</strong>, <strong>silk scrunchies</strong>, a{' '}
            <strong>jade roller or gua sha tool</strong>, <strong>fuzzy socks</strong>, a{' '}
            <strong>mini candle</strong>, <strong>lip mask or balm</strong>, delicate{' '}
            <strong>earrings</strong>, or a <strong>travel-size favorite fragrance</strong>. Aim
            for two pampering picks, one cozy pick and one practical pick per stocking; everything
            on this page is under $25 and rated 4.5 stars or higher.
          </p>
        ),
      }}
      shuffleHeading="Shuffle Stuffers for Her"
      shuffleProducts={shuffle}
      gridHeading={`${grid.length} Best Stocking Stuffers for Her, Ranked`}
      gridProducts={grid}
      ctaHeading="Not Sure What She Would Love?"
      ctaText="Tell TheGiftShuffle who she is and your budget, and get an instant idea in one click."
      faqs={[
        {
          q: 'What are the best stocking stuffers for her in 2026?',
          a: 'The standouts for 2026 are beauty minis (lip masks, hand cream, travel skincare), silk scrunchies and hair accessories, fuzzy socks, mini candles, jade rollers, and small jewelry. Small pampering items she uses daily beat novelty gifts she uses once.',
        },
        {
          q: 'What stocking stuffers work for a wife or girlfriend?',
          a: 'For a wife or girlfriend, lean slightly romantic and personal: a lip mask she mentioned, a delicate pair of earrings, her favorite travel-size fragrance, silk scrunchies, or a mini candle in a scent tied to a shared memory. One personal pick elevates the whole stocking.',
        },
        {
          q: 'What stocking stuffers do moms actually want?',
          a: 'Moms consistently love the self-care they skip for themselves: quality hand cream, a sleep mask, cozy socks, a good lip balm, bath salts, and a small candle. Practical-but-premium is the sweet spot.',
        },
        {
          q: 'How much should you spend on stocking stuffers for her?',
          a: 'A well-packed stocking runs 4 to 6 items at $5 to $25 each, so $40 to $80 total. The trick is range: mix a couple of $6 to $10 items with one or two $20 picks so the stocking has both volume and a small wow.',
        },
      ]}
      relatedHeading="More Gift Guides"
      relatedLinks={[
        { href: '/stocking-stuffers', label: 'All Stocking Stuffers' },
        { href: '/stocking-stuffers-under-10', label: 'Stocking Stuffers Under $10' },
        { href: '/stocking-stuffers-for-him', label: 'Stocking Stuffers for Him' },
        { href: '/christmas-gifts-for-her', label: 'Christmas Gifts for Her' },
        { href: '/gift-ideas-for-her', label: 'Gift Ideas for Her' },
        { href: '/stocking-stuffers-for-mom', label: 'Stocking Stuffers for Mom' },
        { href: '/best-beauty-gifts-2026', label: 'Best Beauty Gifts' },
        { href: '/gifts-under-25', label: 'Gifts Under $25' },
      ]}
    />
  );
}
