import type { Metadata } from 'next';
import GiftGuideTemplate from '@/components/GiftGuideTemplate';
import { curate, shufflePool, ALL } from '@/lib/giftSelect';

const URL = 'https://www.thegiftshuffle.com/luxury-gifts-under-50';

export const metadata: Metadata = {
  title: 'Luxury Gifts Under $50: Affordable Picks That Feel Expensive | TheGiftShuffle',
  description:
    'Luxury gifts under $50 for 2026: top-rated picks that look and feel far more expensive than they are, from designer candles to silk, leather and marble. Affordable luxury for him and her.',
  keywords: [
    'luxury gifts under 50',
    'luxury gifts under $50',
    'affordable luxury gifts',
    'luxury gifts under 50 for her',
    'cheap luxury gifts',
    'inexpensive luxury gifts',
    'luxury gifts on a budget',
    'premium gifts under 50',
  ],
  openGraph: {
    title: 'Luxury Gifts Under $50: Affordable Picks That Feel Expensive | TheGiftShuffle',
    description: 'Top-rated luxury gifts under $50 for 2026 that look far more expensive than they are.',
    type: 'website',
    url: URL,
    images: [{ url: 'https://www.thegiftshuffle.com/api/og?title=Luxury%20Gifts%20Under%20%2450%20%7C%20TheGiftShuffle', width: 1200, height: 630 }],
  },
  alternates: { canonical: URL },
};

const match = (p: { tags?: string[]; price?: number }) =>
  !!p.tags?.includes('luxury') && (p.price ?? 0) <= 50;
const grid = curate({ match, minRating: 4.3, sort: 'social', recipientCap: 30, limit: 30, pool: ALL });
const shuffle = shufflePool(match, ALL);

export default function Page() {
  return (
    <GiftGuideTemplate
      canonicalUrl={URL}
      schemaName="Luxury Gifts Under $50"
      schemaDescription="The best luxury gifts under $50 for 2026, curated by TheGiftShuffle"
      breadcrumbLabel="Luxury Gifts Under $50"
      breadcrumbHref="/luxury-gifts-under-50"
      heroSrc="/images/heroes/best-luxury-gifts-2026.jpg"
      heroAlt="Affordable luxury gifts under $50 presented in an elegant gift box"
      h1="Luxury Gifts Under $50"
      intro={
        <>
          <p>
            You do not need to spend a fortune to give something that feels genuinely luxurious.
            These <strong>luxury gifts under $50</strong> look and feel far more expensive than they
            are, thanks to real materials and thoughtful presentation rather than a big price tag.
          </p>
          <p className="text-base text-gray-600">
            From a designer candle and silk accessories to marble, leather and a spa-worthy bath
            upgrade, every pick here lands under $50 while still reading as a splurge. Scroll the
            picks below, or hit shuffle for a fresh idea every click.
          </p>
        </>
      }
      shuffleHeading="Shuffle Luxury Gifts Under $50"
      shuffleProducts={shuffle}
      gridHeading="Best Luxury Gifts Under $50, Ranked"
      gridProducts={grid}
      ctaHeading="Looking for the Perfect Affordable Splurge?"
      ctaText="Tell TheGiftShuffle who it is for and your budget, and get an instant luxury gift idea in one click."
      faqs={[
        { q: 'What are the best luxury gifts under $50?', a: 'The best luxury gifts under $50 are items where materials and presentation do the work: a designer candle, silk scrunchies or a silk pillowcase, agate-and-gold coasters, a leather accessory, or a bamboo bath caddy. Each feels considered and high-end without the splurge price.' },
        { q: 'Can a gift under $50 really feel luxurious?', a: 'Yes. Luxury comes from materials, craftsmanship and presentation as much as price: natural fibers, real leather, marble or crystal, and thoughtful packaging. A beautifully presented sub-$50 item often feels more luxurious than a carelessly chosen expensive one.' },
        { q: 'What are good luxury gifts under $50 for her?', a: 'For her under $50, think a designer candle, a silk pillowcase or scrunchies, a velvet jewelry case, marble-and-gold coasters, or a bamboo bath caddy. Each feels like a small indulgence she would not buy herself.' },
        { q: 'What are good luxury gifts under $50 for him?', a: 'For him under $50, a leather passport holder or card case, premium barware accessories, marble coasters, or cashmere-blend socks all feel elevated without crossing into splurge territory.' },
        { q: 'What if I want to spend a bit more?', a: 'If your budget stretches to $200, the same principles apply with even better materials and brands. Browse our luxury gifts under $200 guide for the next tier up.' },
      ]}
      relatedHeading="More Gift Guides"
      relatedLinks={[
        { href: '/luxury-gifts-under-200', label: 'Luxury Gifts Under $200' },
        { href: '/luxury-gifts-for-her', label: 'Luxury Gifts for Her' },
        { href: '/best-luxury-gifts-2026', label: 'Best Luxury Gifts 2026' },
        { href: '/gifts-under-50', label: 'Gifts Under $50' },
        { href: '/best-beauty-gifts-2026', label: 'Best Beauty Gifts 2026' },
        { href: '/category/luxury', label: 'All Luxury Gifts' },
      ]}
    />
  );
}
