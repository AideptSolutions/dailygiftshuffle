import type { Metadata } from 'next';
import GiftGuideTemplate from '@/components/GiftGuideTemplate';
import { curate, shufflePool, ALL } from '@/lib/giftSelect';

const URL = 'https://www.thegiftshuffle.com/best-anniversary-gifts-2026';

export const metadata: Metadata = {
  title: 'Best Anniversary Gifts for 2026: 30 Romantic Picks for Couples | TheGiftShuffle',
  description:
    'The best anniversary gifts for 2026: 30 romantic, top-rated picks for him and her, from personalized keepsakes to luxury splurges. Every budget and every year covered.',
  keywords: [
    'best anniversary gifts 2026',
    'best luxury anniversary gifts 2026',
    'best luxury anniversary gift sets 2026',
    'anniversary gift ideas',
    'anniversary gifts for her',
    'anniversary gifts for him',
    'romantic anniversary gifts',
    'wedding anniversary gifts',
  ],
  openGraph: {
    title: 'Best Anniversary Gifts for 2026: 30 Romantic Picks for Couples | TheGiftShuffle',
    description: '30 romantic, top-rated anniversary gifts for 2026 for him and her. Every budget covered.',
    type: 'website',
    url: URL,
    images: [{ url: 'https://www.thegiftshuffle.com/api/og?title=Best%20Anniversary%20Gifts%202026%20%7C%20TheGiftShuffle', width: 1200, height: 630 }],
  },
  alternates: { canonical: URL },
};

const match = (p: { occasions?: string[] }) => !!p.occasions?.includes('anniversary');

// Ranking by review volume alone put a $370 Le Creuset dutch oven and an
// 8-quart Instant Pot at the top of a page promising romantic picks for
// couples: kitchen appliances carry the biggest review counts in the catalog,
// so they win any purely social sort. Same failure the for-her page had.
// Favour the romantic and keepsake categories, push the appliances down, and
// draw from the combined pool, which holds 53 anniversary-eligible products
// against the 19 the recipient-only default could reach.
const PREFER = ['luxury', 'beauty', 'home', 'wedding'];
const DEPRIORITIZE = [
  'kitchen', 'tech', 'ai-smart-home', 'office', 'diy-tools',
  'fitness', 'outdoors', 'gaming', 'car-accessories', 'sports', 'finance',
];

const grid = curate({
  match,
  sort: 'social',
  minRating: 4.5,
  preferTags: PREFER,
  deprioritizeTags: DEPRIORITIZE,
  recipientCap: 50,
  limit: 30,
  pool: ALL,
});
const shuffle = shufflePool(match, ALL, { excludeTags: DEPRIORITIZE });

export default function Page() {
  return (
    <GiftGuideTemplate
      canonicalUrl={URL}
      schemaName="Best Anniversary Gifts for 2026"
      schemaDescription="The best anniversary gift ideas for 2026, curated by TheGiftShuffle"
      breadcrumbLabel="Best Anniversary Gifts 2026"
      breadcrumbHref="/best-anniversary-gifts-2026"
      heroSrc="/images/heroes/best-anniversary-gifts-2026.jpg"
      heroAlt="The best anniversary gifts for 2026 with roses and a wrapped present"
      h1="The Best Anniversary Gifts for 2026"
      intro={
        <>
          <p>
            These are the <strong>best anniversary gifts for 2026</strong>: romantic, top-rated
            picks chosen to mark the milestone without resorting to the same predictable bouquet.
            Whether it is your first year or your fortieth, every gift here is meant to feel
            personal, lasting and worth remembering.
          </p>
          <p className="text-base text-gray-600">
            From a heartfelt keepsake to a genuine luxury splurge, this list covers anniversary
            gifts for both him and her at every budget. Scroll the picks below, or hit shuffle for
            a fresh idea every click.
          </p>
        </>
      }
      shuffleHeading="Shuffle Anniversary Gift Picks"
      shuffleProducts={shuffle}
      gridHeading="30 Best Anniversary Gifts, Ranked"
      gridProducts={grid}
      ctaHeading="Looking for the Perfect Anniversary Gift?"
      ctaText="Tell TheGiftShuffle who it is for and your budget, and get an instant anniversary gift idea in one click."
      faqs={[
        { q: 'What are the best anniversary gifts for 2026?', a: 'The best anniversary gifts in 2026 are personal and lasting: engraved or fine jewelry, a custom star map of your wedding date, a premium watch, a leather keepsake, or a shared experience like a getaway or tasting. The most memorable ones reference your relationship specifically.' },
        { q: 'What is a good anniversary gift for her?', a: 'For her, strong anniversary gifts include personalized jewelry, a luxe candle or fragrance, a custom keepsake, a silk robe or cashmere wrap, or a planned date night. Pairing a luxury item with a personal touch makes it land harder.' },
        { q: 'What is a good anniversary gift for him?', a: 'For him, anniversary gifts that hit include an engraved leather wallet or watch, a premium whiskey or cocktail set, a quality everyday-carry upgrade, or an experience you can share. Tie it to a hobby he loves for extra points.' },
        { q: 'What is a good luxury anniversary gift?', a: 'Luxury anniversary gifts focus on heirloom-quality pieces: fine jewelry, a premium watch, a designer leather item engraved with your date, or a high-end experience. See our best luxury gifts guide for more premium ideas.' },
        { q: 'What is a good first-anniversary or budget anniversary gift?', a: 'You do not need to spend a lot to be romantic: a custom star map, an engraved keepsake, a memory photo book, a paired keepsake set, or a planned at-home date night all carry weight because they are personal, not pricey.' },
      ]}
      relatedHeading="More Gift Guides"
      relatedLinks={[
        { href: '/romantic-gifts-for-her', label: 'Romantic Gifts for Her' },
        { href: '/best-gifts-for-her-2026', label: 'Best Gifts for Her 2026' },
        { href: '/best-luxury-gifts-2026', label: 'Best Luxury Gifts 2026' },
        { href: '/gifts-for-girlfriend', label: 'Gifts for Your Girlfriend' },
        { href: '/gift-ideas-for-her', label: 'Gift Ideas for Her' },
        { href: '/gifts-under-100', label: 'Gifts Under $100' },
      ]}
    />
  );
}
