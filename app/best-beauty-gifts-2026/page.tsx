import type { Metadata } from 'next';
import GiftGuideTemplate from '@/components/GiftGuideTemplate';
import { curate, shufflePool } from '@/lib/giftSelect';

const URL = 'https://www.thegiftshuffle.com/best-beauty-gifts-2026';

export const metadata: Metadata = {
  title: 'Best Beauty Gifts for 2026: 30 Skincare & Makeup Picks She Will Love | TheGiftShuffle',
  description:
    'The best beauty gifts for 2026: 30 top-rated skincare, makeup and self-care picks, from affordable favorites to luxe sets. Hand-picked gift ideas for her at every budget.',
  keywords: [
    'best beauty gifts 2026',
    'best skincare gifts 2026',
    'beauty gift sets',
    'skincare gift sets',
    'makeup gifts',
    'self care gifts for her',
    'beauty gifts for her',
    'best mothers day gift sets',
  ],
  openGraph: {
    title: 'Best Beauty Gifts for 2026: 30 Skincare & Makeup Picks She Will Love | TheGiftShuffle',
    description: '30 top-rated beauty, skincare and self-care gifts for 2026. Hand-picked for her at every budget.',
    type: 'website',
    url: URL,
    images: [{ url: 'https://www.thegiftshuffle.com/api/og?title=Best%20Beauty%20Gifts%202026%20%7C%20TheGiftShuffle', width: 1200, height: 630 }],
  },
  alternates: { canonical: URL },
};

const match = (p: { tags?: string[] }) => !!p.tags?.includes('beauty');
const grid = curate({ match, minRating: 4.3, sort: 'social', recipientCap: 50 });
const shuffle = shufflePool(match);

export default function Page() {
  return (
    <GiftGuideTemplate
      canonicalUrl={URL}
      schemaName="Best Beauty Gifts for 2026"
      schemaDescription="The best beauty and skincare gift ideas for 2026, curated by TheGiftShuffle"
      breadcrumbLabel="Best Beauty Gifts 2026"
      breadcrumbHref="/best-beauty-gifts-2026"
      heroSrc="/images/heroes/best-beauty-gifts-2026.jpg"
      heroAlt="The best beauty gifts for 2026 including a skincare and cosmetics set"
      h1="The Best Beauty Gifts for 2026"
      intro={
        <>
          <p>
            These are the <strong>best beauty gifts for 2026</strong>: top-rated skincare, makeup
            and self-care picks that feel like a treat the moment they are opened. Every one is
            chosen to be genuinely loved and actually used, not left to gather dust on a shelf.
          </p>
          <p className="text-base text-gray-600">
            From an affordable everyday hero to a luxe gift set worth the splurge, this list covers
            beauty gifts for her at every budget and every routine. Scroll the picks below, or hit
            shuffle for a fresh idea every click.
          </p>
        </>
      }
      shuffleHeading="Shuffle Beauty Gift Picks"
      shuffleProducts={shuffle}
      gridHeading="30 Best Beauty Gifts, Ranked"
      gridProducts={grid}
      ctaHeading="Not Sure Which Beauty Gift to Pick?"
      ctaText="Tell TheGiftShuffle who it is for and your budget, and get an instant beauty gift idea in one click."
      faqs={[
        { q: 'What are the best beauty gifts for 2026?', a: 'The best beauty gifts in 2026 mix everyday favorites with a touch of luxury: a quality skincare set, a hydrating serum, a premium lip or fragrance product, a beauty tool like a facial roller or styling device, or a curated self-care box. Pick something that fits her routine and it always lands.' },
        { q: 'What are the best skincare gifts?', a: 'The best skincare gifts are a hydrating serum, a vitamin C or retinol hero product, a gentle cleanser-and-moisturizer duo, a facial roller or gua sha, or a curated skincare set. When in doubt, a well-reviewed set lets her sample a full routine.' },
        { q: 'What are good beauty gifts under $50?', a: 'Under $50, standout beauty gifts include a skincare gift set, a premium lip set, an aromatherapy or self-care box, a facial roller, or a fragrance rollerball. Beautifully packaged and genuinely useful without the luxury price tag.' },
        { q: 'What is a good beauty gift for someone picky about products?', a: 'For someone particular about beauty, lean toward universally loved categories that are hard to get wrong: a quality silk pillowcase, a facial roller or gua sha, a premium hand cream, a luxe candle, or a gift card paired with a curated sample set so she can choose.' },
        { q: 'What is a good luxury beauty gift set?', a: 'Luxury beauty gift sets center on a premium skincare regimen, a designer fragrance, or a high-end tool like a styling device or LED mask. See our best luxury gifts guide for more premium ideas that feel genuinely special.' },
      ]}
      relatedHeading="More Gift Guides for Her"
      relatedLinks={[
        { href: '/best-gifts-for-her-2026', label: 'Best Gifts for Her 2026' },
        { href: '/best-luxury-gifts-2026', label: 'Best Luxury Gifts 2026' },
        { href: '/romantic-gifts-for-her', label: 'Romantic Gifts for Her' },
        { href: '/gifts-for-girlfriend', label: 'Gifts for Your Girlfriend' },
        { href: '/gift-ideas-for-her', label: 'Gift Ideas for Her' },
        { href: '/gifts-under-50', label: 'Gifts Under $50' },
      ]}
    />
  );
}
