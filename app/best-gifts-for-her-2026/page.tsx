import type { Metadata } from 'next';
import GiftGuideTemplate from '@/components/GiftGuideTemplate';
import { curate, shufflePool, ALL } from '@/lib/giftSelect';

const URL = 'https://www.thegiftshuffle.com/best-gifts-for-her-2026';

export const metadata: Metadata = {
  title: 'Best Gifts for Her in 2026: 72 Top-Rated Picks She Will Love | TheGiftShuffle',
  description:
    'The best gifts for her in 2026, ranked by what women actually love. 72 top-rated gift ideas for your wife, girlfriend, mom or best friend, spanning every budget.',
  keywords: [
    'best gifts for her',
    'best gifts for her 2026',
    'best gift ideas for her',
    'great gift ideas for her',
    'gifts for her',
    'top gift ideas for her',
    'thoughtful gifts for her',
    'gift ideas for her',
  ],
  openGraph: {
    title: 'Best Gifts for Her in 2026: 72 Top-Rated Picks She Will Love | TheGiftShuffle',
    description: 'The 72 best gifts for her in 2026, ranked by what women actually love. Every budget covered.',
    type: 'website',
    url: URL,
    images: [{ url: 'https://www.thegiftshuffle.com/api/og?title=Best%20Gifts%20for%20Her%202026%20%7C%20TheGiftShuffle', width: 1200, height: 630 }],
  },
  alternates: { canonical: URL },
};

// Draw from the full combined catalog (products.ts + products-catalog.ts) so the
// beauty/luxury/home her-tagged picks all surface, with high caps and a larger
// limit to give a wide selection to shuffle through.
const match = (p: { recipients?: string[] }) => !!p.recipients?.includes('her');
const grid = curate({ match, minPrice: 15, minRating: 4.5, sort: 'social', recipientCap: 30, limit: 72, pool: ALL });
const shuffle = shufflePool(match, ALL);

export default function Page() {
  return (
    <GiftGuideTemplate
      canonicalUrl={URL}
      schemaName="Best Gifts for Her in 2026"
      schemaDescription="The 72 best, top-rated gifts for her in 2026, curated by TheGiftShuffle"
      breadcrumbLabel="Best Gifts for Her 2026"
      breadcrumbHref="/best-gifts-for-her-2026"
      heroSrc="/images/heroes/best-gifts-for-her-2026.jpg"
      heroAlt="The best gifts for her in 2026 wrapped with ribbon"
      h1="The Best Gifts for Her in 2026"
      intro={
        <>
          <p>
            These are the <strong>72 best gifts for her in 2026</strong>, ranked by what women
            actually love rather than what shows up in every recycled gift guide. Whether you are
            shopping for your wife, girlfriend, mom or best friend, every pick here is top-rated,
            in stock now, and chosen to feel thoughtful instead of last-minute.
          </p>
          <p className="text-base text-gray-600">
            The list spans every budget, from a sub-$25 treat to a genuine splurge, and every
            style, from cozy and practical to a little bit luxe. Scroll the picks below, or hit
            shuffle to discover something new every click.
          </p>
        </>
      }
      shuffleHeading="Shuffle Gifts for Her"
      shuffleProducts={shuffle}
      gridHeading="72 Best Gifts for Her, Ranked"
      gridProducts={grid}
      ctaHeading="Still Not Sure What She Would Love?"
      ctaText="Tell TheGiftShuffle who she is and your budget, and get an instant, personalized gift idea in one click."
      faqs={[
        { q: 'What are the best gifts for her in 2026?', a: 'The best gifts for her in 2026 blend a little luxury with everyday usefulness: a silk pillowcase, a personalized name necklace, a premium candle set, a weighted blanket, a skincare gift set, or wireless earbuds. The pattern that wins is something she would love but rarely buys for herself.' },
        { q: 'What is a good gift for her that is not cliche?', a: 'Skip the generic flowers-and-chocolate default and go personal: an engraved piece of jewelry, a custom star map, a high-end candle in a scent she loves, a cozy cashmere-blend wrap, or a hobby upgrade tied to something she already enjoys. Specific always beats generic.' },
        { q: 'What are the best gifts for her under $50?', a: 'Great gifts for her under $50 include a silk scrunchie or pillowcase set, a personalized necklace, a premium candle, an aromatherapy diffuser, a cozy throw blanket, or a self-care gift box. Tie it to something she enjoys and a sub-$50 gift still feels intentional.' },
        { q: 'What do you get a woman who has everything?', a: 'For the woman who has everything, go experiential or hyper-personal: a spa day, a cooking or wine-tasting class, a custom piece of jewelry, or a premium upgrade to a daily ritual like her coffee or skincare. These feel fresh because they are unique to her or a memory rather than another object.' },
        { q: 'What are thoughtful gifts for her?', a: 'Thoughtful gifts reference something specific about her: her favorite scent, a hobby, an inside joke, or a milestone. A monogrammed journal, a curated book-and-tea set, a personalized keepsake, or a self-care bundle all read as considered rather than convenient.' },
      ]}
      relatedHeading="More Gift Guides for Her"
      relatedLinks={[
        { href: '/romantic-gifts-for-her', label: 'Romantic Gifts for Her' },
        { href: '/gifts-for-girlfriend', label: 'Gifts for Your Girlfriend' },
        { href: '/best-beauty-gifts-2026', label: 'Best Beauty Gifts 2026' },
        { href: '/best-luxury-gifts-2026', label: 'Best Luxury Gifts 2026' },
        { href: '/gift-ideas-for-her', label: 'Gift Ideas for Her' },
        { href: '/birthday-gift-ideas', label: 'Birthday Gift Ideas' },
        { href: '/gifts-under-50', label: 'Gifts Under $50' },
      ]}
    />
  );
}
