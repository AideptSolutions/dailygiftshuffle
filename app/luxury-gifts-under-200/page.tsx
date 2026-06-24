import type { Metadata } from 'next';
import GiftGuideTemplate from '@/components/GiftGuideTemplate';
import { curate, shufflePool } from '@/lib/giftSelect';

const URL = 'https://www.thegiftshuffle.com/luxury-gifts-under-200';

export const metadata: Metadata = {
  title: 'Luxury Gifts Under $200: 30 Premium Picks That Punch Above Their Price | TheGiftShuffle',
  description:
    'Luxury gifts under $200 for 2026: 30 premium, top-rated picks that feel high-end without the four-figure price tag. Luxury gift ideas for him and her under $200.',
  keywords: [
    'luxury gifts under 200',
    'luxury gifts under $200',
    'affordable luxury gifts',
    'luxury gifts under 500',
    'premium gifts under 200',
    'best luxury gifts on a budget',
    'high end gifts under 200',
    'luxury gift ideas 2026',
  ],
  openGraph: {
    title: 'Luxury Gifts Under $200: 30 Premium Picks That Punch Above Their Price | TheGiftShuffle',
    description: '30 premium, top-rated luxury gifts under $200 for 2026, for him and her. High-end without the four-figure price.',
    type: 'website',
    url: URL,
    images: [{ url: 'https://www.thegiftshuffle.com/api/og?title=Luxury%20Gifts%20Under%20%24200%20%7C%20TheGiftShuffle', width: 1200, height: 630 }],
  },
  alternates: { canonical: URL },
};

// Luxury, capped at $200 (price lives on the product, so filter in the predicate).
const match = (p: { tags?: string[]; price?: number }) =>
  !!p.tags?.includes('luxury') && (p.price ?? 0) <= 200;
const grid = curate({ match, minRating: 4.4, sort: 'social', recipientCap: 30, limit: 30 });
const shuffle = shufflePool(match);

export default function Page() {
  return (
    <GiftGuideTemplate
      canonicalUrl={URL}
      schemaName="Luxury Gifts Under $200"
      schemaDescription="The best luxury gifts under $200 for 2026, curated by TheGiftShuffle"
      breadcrumbLabel="Luxury Gifts Under $200"
      breadcrumbHref="/luxury-gifts-under-200"
      heroSrc="/images/heroes/best-luxury-gifts-2026.jpg"
      heroAlt="Luxury gifts under $200 presented in an elegant gift box"
      h1="Luxury Gifts Under $200"
      intro={
        <>
          <p>
            You do not need four figures to give something that feels genuinely luxurious. These are
            the <strong>best luxury gifts under $200</strong> for 2026: premium, top-rated picks that
            read as high-end thanks to real materials, craftsmanship and presentation, not just a big
            price tag.
          </p>
          <p className="text-base text-gray-600">
            From designer fragrances and fine leather to luxe skincare, silk and premium barware,
            every pick here lands under $200 while still feeling like a splurge. Scroll the picks
            below, or hit shuffle for a fresh idea every click.
          </p>
        </>
      }
      shuffleHeading="Shuffle Luxury Gifts Under $200"
      shuffleProducts={shuffle}
      gridHeading="30 Best Luxury Gifts Under $200, Ranked"
      gridProducts={grid}
      ctaHeading="Looking for the Perfect Splurge?"
      ctaText="Tell TheGiftShuffle who it is for and your budget, and get an instant luxury gift idea in one click."
      faqs={[
        { q: 'What are the best luxury gifts under $200?', a: 'The best luxury gifts under $200 are premium upgrades to everyday life: a designer fragrance, a quality leather accessory, a luxe skincare or beauty set, a silk pillowcase, premium barware, or top-rated headphones. The trick is choosing items where materials and presentation do the heavy lifting.' },
        { q: 'Can a gift under $200 actually feel luxurious?', a: 'Absolutely. Luxury comes from materials, craftsmanship and presentation as much as price: real leather over bonded, solid metal over plated, natural fibers, and thoughtful packaging. A beautifully presented sub-$200 item often feels more luxurious than a carelessly given expensive one.' },
        { q: 'What are good luxury gifts under $200 for her?', a: 'For her under $200, think a designer fragrance, a premium skincare set, a silk pillowcase, starter fine jewelry, or a quality leather accessory. See our luxury gifts for her guide for a full list focused on female recipients.' },
        { q: 'What are good luxury gifts under $200 for him?', a: 'For him under $200, a premium leather wallet or dopp kit, a quality watch, top-rated headphones, a nice fragrance, or premium barware all feel elevated without crossing into splurge territory.' },
        { q: 'What if I want to spend a little more?', a: 'If your budget stretches toward $500, the same principles apply with even better materials and brands. Browse our full best luxury gifts guide for premium picks across every price level.' },
      ]}
      relatedHeading="More Gift Guides"
      relatedLinks={[
        { href: '/best-luxury-gifts-2026', label: 'Best Luxury Gifts 2026' },
        { href: '/luxury-gifts-for-her', label: 'Luxury Gifts for Her' },
        { href: '/gifts-under-100', label: 'Gifts Under $100' },
        { href: '/best-anniversary-gifts-2026', label: 'Best Anniversary Gifts 2026' },
        { href: '/best-gifts-for-her-2026', label: 'Best Gifts for Her 2026' },
        { href: '/category/luxury', label: 'All Luxury Gifts' },
      ]}
    />
  );
}
