import type { Metadata } from 'next';
import GiftGuideTemplate from '@/components/GiftGuideTemplate';
import { curate, shufflePool, ALL } from '@/lib/giftSelect';

const URL = 'https://www.thegiftshuffle.com/luxury-gifts-for-her';

export const metadata: Metadata = {
  title: 'Luxury Gifts for Her 2026: 30 Premium Picks Women Actually Want | TheGiftShuffle',
  description:
    'Luxury gifts for her, for women, and for your wife: 30 premium, top-rated picks she actually wants, from elevated everyday upgrades to true splurges. Unique luxury gift ideas at every budget.',
  keywords: [
    'luxury gifts for her',
    'best luxury gifts for women 2026',
    'luxury gifts for women',
    'unusual luxury gifts for her',
    'luxury gifts under 200',
    'premium gifts for her',
    'high end gifts for women',
    'luxury gift ideas for her',
  ],
  openGraph: {
    title: 'Luxury Gifts for Her 2026: 30 Premium Picks Women Actually Want | TheGiftShuffle',
    description: '30 premium, top-rated luxury gifts for her in 2026, from everyday upgrades to true splurges.',
    type: 'website',
    url: URL,
    images: [{ url: 'https://www.thegiftshuffle.com/api/og?title=Luxury%20Gifts%20for%20Her%202026%20%7C%20TheGiftShuffle', width: 1200, height: 630 }],
  },
  alternates: { canonical: URL },
};

// Luxury, skewed to her: anything tagged luxury that suits a female recipient.
const match = (p: { tags?: string[]; recipients?: string[] }) =>
  !!p.tags?.includes('luxury') &&
  !!(p.recipients?.includes('her') || p.recipients?.includes('mom'));
const grid = curate({ match, minRating: 4.4, sort: 'social', recipientCap: 30, limit: 30, pool: ALL });
const shuffle = shufflePool(match, ALL);

export default function Page() {
  return (
    <GiftGuideTemplate
      canonicalUrl={URL}
      schemaName="Luxury Gifts for Her 2026"
      schemaDescription="The best luxury gifts for her in 2026, curated by TheGiftShuffle"
      breadcrumbLabel="Luxury Gifts for Her"
      breadcrumbHref="/luxury-gifts-for-her"
      heroSrc="/images/heroes/best-gifts-for-her-2026.jpg"
      heroAlt="Luxury gifts for her arranged with ribbon and an elegant gift box"
      h1="Luxury Gifts for Her in 2026"
      intro={
        <>
          <p>
            These are the <strong>best luxury gifts for her in 2026</strong>: premium, top-rated
            picks that feel genuinely special the moment she unwraps them. Every one is chosen to
            read as considered and high-end, whether you are elevating a daily ritual or going all
            in on a true splurge.
          </p>
          <p className="text-base text-gray-600">
            From fine jewelry and designer leather to luxe skincare, silk and beauty tools she
            would never buy herself, this list covers unusual luxury at every budget, including
            plenty under $200. Scroll the picks below, or hit shuffle for a fresh idea every click.
          </p>
        </>
      }
      answer={{
        heading: 'What Are the Best Luxury Gifts for Her?',
        body: (
          <p>
            The best luxury gifts for her are the pieces she would love but rarely buys herself:{' '}
            <strong>fine or personalized jewelry</strong>, a <strong>designer fragrance</strong>, a{' '}
            <strong>silk pillowcase or robe</strong>, a <strong>quality leather accessory</strong>, a{' '}
            <strong>luxe skincare or beauty set</strong>, or a high-end beauty tool. Luxury comes from
            materials, craftsmanship and presentation as much as price, so a beautifully presented
            mid-range piece often feels more special than a carelessly given expensive one. The 30
            picks on this page average <strong>4.7 stars across more than 1.1 million verified
            Amazon reviews</strong> combined. Match it to something she already loves and it always
            feels considered.
          </p>
        ),
      }}
      shuffleHeading="Shuffle Luxury Gifts for Her"
      shuffleProducts={shuffle}
      gridHeading="30 Best Luxury Gifts for Her, Ranked"
      gridProducts={grid}
      ctaHeading="Looking for the Perfect Splurge?"
      ctaText="Tell TheGiftShuffle who it is for and your budget, and get an instant luxury gift idea for her in one click."
      faqs={[
        { q: 'What are the best luxury gifts for her in 2026?', a: 'The best luxury gifts for her in 2026 are premium upgrades to everyday life: fine or personalized jewelry, a designer handbag or wallet, a luxe skincare or fragrance set, a silk pillowcase or robe, and high-end beauty tools. The best ones feel personal and elevated rather than just expensive.' },
        { q: 'What are the best luxury gifts for women and for your wife?', a: 'For women and for a wife specifically, the luxury gifts that land are personal and lasting: fine or engraved jewelry, a designer handbag or wallet, a premium fragrance, a cashmere wrap or silk robe, and a high-end skincare or beauty set. Adding a personal touch, like an engraving or her favorite scent, makes an expensive gift feel meaningful rather than generic.' },
        { q: 'What are good designer gifts for her?', a: 'Good designer gifts for her do not have to mean a four-figure handbag: a designer fragrance, a small leather-goods piece like a cardholder or wallet, designer sunglasses, a silk scarf, or a fine-jewelry piece all carry the brand cachet at a friendlier price. Choose a house she already likes and even a small designer item feels special.' },
        { q: 'What are affordable luxury gifts for her under $200?', a: 'Under $200 you can still give something that feels genuinely luxurious: a designer fragrance, a premium skincare set, a silk pillowcase, starter fine or costume jewelry, or a quality leather accessory. Presentation matters as much as price, so wrap it well. See our luxury gifts under $200 guide for a full list.' },
        { q: 'What are unusual luxury gifts for her?', a: 'Unusual luxury gifts go past the obvious: a premium silk sleep set, a high-end skincare device, a designer fragrance layering set, a fine-jewelry piece with a hidden engraving, or a beautifully made leather accessory. They feel luxurious precisely because most people do not think of them.' },
        { q: 'What are good luxury gifts for her under $200?', a: 'Under $200 you can still give something that feels genuinely luxurious: a designer fragrance, a premium skincare set, a silk pillowcase, fine costume or starter fine jewelry, or a quality leather accessory. Presentation matters as much as price, so wrap it well.' },
        { q: 'What makes a gift feel luxurious?', a: 'Luxury comes from materials, craftsmanship and presentation as much as price: real leather over bonded, solid metal over plated, natural fibers like silk and cashmere, and thoughtful packaging. A beautifully presented mid-range item often feels more luxurious than a carelessly given expensive one.' },
        { q: 'What is a good luxury anniversary gift for her?', a: 'For a luxury anniversary gift, think lasting and personal: fine jewelry, a premium watch, a designer leather piece engraved with a date, or a high-end experience like a getaway or spa day. See our anniversary gift guide for more ideas at every level.' },
      ]}
      relatedHeading="More Gift Guides"
      relatedLinks={[
        { href: '/best-luxury-gifts-2026', label: 'Best Luxury Gifts 2026' },
        { href: '/luxury-gifts-under-200', label: 'Luxury Gifts Under $200' },
        { href: '/best-gifts-for-her-2026', label: 'Best Gifts for Her 2026' },
        { href: '/best-beauty-gifts-2026', label: 'Best Beauty Gifts 2026' },
        { href: '/best-anniversary-gifts-2026', label: 'Best Anniversary Gifts 2026' },
        { href: '/category/luxury', label: 'All Luxury Gifts' },
      ]}
    />
  );
}
