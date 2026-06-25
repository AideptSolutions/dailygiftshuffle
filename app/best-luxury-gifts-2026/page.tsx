import type { Metadata } from 'next';
import GiftGuideTemplate from '@/components/GiftGuideTemplate';
import { curate, shufflePool } from '@/lib/giftSelect';

const URL = 'https://www.thegiftshuffle.com/best-luxury-gifts-2026';

export const metadata: Metadata = {
  title: 'Best Luxury Gifts for 2026: 30 Premium Picks Worth the Splurge | TheGiftShuffle',
  description:
    'The best luxury gifts for 2026: premium, top-rated picks that feel genuinely special. 30 luxury gift ideas for him and her, from elevated everyday upgrades to true splurges.',
  keywords: [
    'best luxury gifts 2026',
    'luxury gift ideas 2026',
    'best luxury gifts for women 2026',
    'best luxury lifestyle gifts 2026',
    'most popular luxury gifts 2026',
    'best luxury gift ideas 2026',
    'premium gift ideas',
    'high end gifts',
  ],
  openGraph: {
    title: 'Best Luxury Gifts for 2026: 30 Premium Picks Worth the Splurge | TheGiftShuffle',
    description: '30 premium, top-rated luxury gift ideas for 2026 for him and her. Worth the splurge.',
    type: 'website',
    url: URL,
    images: [{ url: 'https://www.thegiftshuffle.com/api/og?title=Best%20Luxury%20Gifts%202026%20%7C%20TheGiftShuffle', width: 1200, height: 630 }],
  },
  alternates: { canonical: URL },
};

const match = (p: { tags?: string[] }) => !!p.tags?.includes('luxury');
const grid = curate({ match, minPrice: 25, sort: 'social' });
const shuffle = shufflePool(match);

export default function Page() {
  return (
    <GiftGuideTemplate
      canonicalUrl={URL}
      schemaName="Best Luxury Gifts for 2026"
      schemaDescription="The best luxury gift ideas for 2026, curated by TheGiftShuffle"
      breadcrumbLabel="Best Luxury Gifts 2026"
      breadcrumbHref="/best-luxury-gifts-2026"
      heroSrc="/images/heroes/best-luxury-gifts-2026.jpg"
      heroAlt="The best luxury gifts for 2026 presented in an elegant gift box"
      h1="The Best Luxury Gifts for 2026"
      intro={
        <>
          <p>
            These are the <strong>best luxury gifts for 2026</strong>: premium, top-rated picks
            that feel genuinely special the moment they are unwrapped. Every one is chosen to read
            as considered and high-end, whether you are elevating a daily ritual or going all-in on
            a true splurge.
          </p>
          <p className="text-base text-gray-600">
            From the kind of everyday upgrade they would never buy themselves to a statement gift
            for a milestone, this list covers luxury for both him and her. Scroll the picks below,
            or hit shuffle for a fresh idea every click.
          </p>
        </>
      }
      shuffleHeading="Shuffle Luxury Gift Picks"
      shuffleProducts={shuffle}
      gridHeading="30 Best Luxury Gifts, Ranked"
      gridProducts={grid}
      ctaHeading="Looking for the Perfect Splurge?"
      ctaText="Tell TheGiftShuffle who it is for and your budget, and get an instant luxury gift idea in one click."
      faqs={[
        { q: 'What are the best luxury gifts for 2026?', a: 'The best luxury gifts in 2026 are premium upgrades to everyday life: a high-end watch, fine jewelry, a designer leather piece, a premium fragrance, a luxury skincare set, or top-tier headphones. The best ones feel personal and elevated rather than just expensive.' },
        { q: 'What are the best luxury gifts for women in 2026?', a: 'Luxury gifts women love in 2026 include fine or personalized jewelry, a designer handbag or wallet, a premium skincare or fragrance set, a silk robe or cashmere wrap, and high-end beauty tools. Pair a luxury item with a personal touch and it lands even harder.' },
        { q: 'What is a good luxury gift on a (relative) budget?', a: 'You do not need four figures to give something that feels luxurious: a premium candle, a quality leather accessory, a designer fragrance rollerball, a silk pillowcase, or a high-end skincare hero product all deliver a genuine luxury feel for far less.' },
        { q: 'What makes a gift feel luxurious?', a: 'Luxury comes from materials, craftsmanship and presentation as much as price: real leather over bonded, solid metal over plated, natural fibers, and thoughtful packaging. A beautifully presented mid-range item often feels more luxurious than a carelessly given expensive one.' },
        { q: 'What is a good luxury anniversary gift?', a: 'For a luxury anniversary gift, think lasting and personal: fine jewelry, a premium watch, a designer leather piece engraved with a date, or a high-end experience like a getaway or tasting. See our anniversary gift guide for more ideas at every level.' },
      ]}
      relatedHeading="More Gift Guides"
      relatedLinks={[
        { href: '/luxury-gifts-for-her', label: 'Luxury Gifts for Her' },
        { href: '/luxury-gifts-under-200', label: 'Luxury Gifts Under $200' },
        { href: '/luxury-gifts-under-50', label: 'Luxury Gifts Under $50' },
        { href: '/category/luxury', label: 'All Luxury Gifts' },
        { href: '/best-gifts-for-her-2026', label: 'Best Gifts for Her 2026' },
        { href: '/best-anniversary-gifts-2026', label: 'Best Anniversary Gifts 2026' },
        { href: '/best-beauty-gifts-2026', label: 'Best Beauty Gifts 2026' },
      ]}
    />
  );
}
