import type { Metadata } from 'next';
import GiftGuideTemplate from '@/components/GiftGuideTemplate';
import { curate, shufflePool, ALL } from '@/lib/giftSelect';

const URL = 'https://www.thegiftshuffle.com/gift-ideas-for-sister';

export const metadata: Metadata = {
  title: 'Gift Ideas for Your Sister: 40 Picks She Will Actually Love (2026) | TheGiftShuffle',
  description:
    'The best gift ideas for your sister in 2026: top-rated picks for big sisters, little sisters and sisters-in-law, from cozy and beauty favorites to fun surprises at every budget.',
  keywords: [
    'gift ideas for sister',
    'gifts for sister',
    'best gifts for sister',
    'birthday gifts for sister',
    'christmas gifts for sister',
    'gifts for big sister',
    'gifts for little sister',
    'gifts for sister in law',
  ],
  openGraph: {
    title: 'Gift Ideas for Your Sister: 40 Picks She Will Actually Love (2026) | TheGiftShuffle',
    description: 'Top-rated gift ideas for big sisters, little sisters and sisters-in-law at every budget.',
    type: 'website',
    url: URL,
    images: [{ url: 'https://www.thegiftshuffle.com/api/og?title=Gift%20Ideas%20for%20Sister%20%7C%20TheGiftShuffle', width: 1200, height: 630 }],
  },
  alternates: { canonical: URL },
};

// Sister-tagged items lead the pool; broaden with her-suited picks since the
// dedicated sister recipient set is small.
const match = (p: { recipients?: string[] }) =>
  !!(p.recipients?.includes('sister') || p.recipients?.includes('her') || p.recipients?.includes('teens'));
const grid = curate({ match, minPrice: 15, minRating: 4.5, sort: 'social', recipientCap: 30, limit: 40, pool: ALL });
const shuffle = shufflePool(match, ALL);

export default function Page() {
  return (
    <GiftGuideTemplate
      canonicalUrl={URL}
      schemaName="Gift Ideas for Your Sister"
      schemaDescription="The best gift ideas for your sister in 2026, curated by TheGiftShuffle"
      breadcrumbLabel="Gift Ideas for Sister"
      breadcrumbHref="/gift-ideas-for-sister"
      heroSrc="/images/heroes/gift-ideas-for-sister.jpg"
      heroAlt="A cheerful gift for a sister wrapped with a bright ribbon"
      h1="Gift Ideas for Your Sister"
      intro={
        <>
          <p>
            Shopping for your sister? These <strong>top-rated gift ideas for sisters</strong> cover
            every kind: the big sister who has her life together, the little sister glued to her
            phone, and the sister-in-law you want to win over. Cozy favorites, cult beauty picks,
            fun surprises and a few small luxuries she would never buy herself.
          </p>
          <p className="text-base text-gray-600">
            Works for birthdays, holidays or a just-because moment. Hit shuffle for a fresh idea
            every click, or browse the ranked list below.
          </p>
        </>
      }
      answer={{
        heading: 'What Should I Get My Sister?',
        body: (
          <p>
            The gifts sisters actually love are <strong>personal without being risky</strong>: a
            cult-favorite beauty or skincare item, a cozy blanket or silk pillowcase, jewelry she
            would really wear, a fun gadget or game you can play together, or an upgrade to something
            she uses daily like her tumbler or headphones. Lean on what you uniquely know, her shows,
            her scent, her hobby, and add an inside-joke card. For a sister-in-law, stay one notch
            safer: candles, spa sets and cozy picks. Not sure? Hit shuffle below.
          </p>
        ),
      }}
      shuffleHeading="Shuffle Gifts for Your Sister"
      shuffleProducts={shuffle}
      gridHeading="Top-Rated Gifts for Sisters, Ranked"
      gridProducts={grid}
      ctaHeading="Sisters Are Hard to Surprise"
      ctaText="Tell TheGiftShuffle a little about her and your budget, and get an instant idea she has not seen before."
      faqs={[
        { q: 'What is a good gift for my sister?', a: 'Good sister gifts blend personal knowledge with broad appeal: a cult beauty item, cozy blanket or robe, jewelry she would actually wear, a fun game or gadget, or a small luxury like a silk pillowcase. Use what only a sibling knows about her and even a modest gift feels special.' },
        { q: 'What should I get my sister for her birthday?', a: 'For her birthday, combine one thing she wants with one surprise: a skincare or spa set plus her favorite candy, jewelry plus a funny card, or a hobby upgrade plus a childhood inside joke. Sisters value the personal touch more than the price tag.' },
        { q: 'What is a good gift for a sister-in-law?', a: 'For a sister-in-law, warm but safe wins: a premium candle, a spa or self-care set, a cozy throw, a nice tumbler, or a top-rated beauty pick with mass appeal. Thoughtful and low-risk beats bold guesses about her taste.' },
        { q: 'What are good gifts for a teenage sister?', a: 'Teen sisters go for fun and current: trendy skincare, an instant camera, fuzzy blankets and socks, phone accessories, room decor like LED lights, or a popular game. If in doubt, ask what everyone at her school is into and buy the top-rated version.' },
        { q: 'What are good gifts for my sister under $50?', a: 'Under $50, reliable picks include a silk scrunchie set, a cult lip mask or hand cream, a candle, cozy socks and a throw, a fun card game, or a mini beauty tool. Add a handwritten note and it beats most pricier gifts.' },
      ]}
      relatedHeading="More Gift Guides"
      relatedLinks={[
        { href: '/best-gifts-for-her-2026', label: 'Best Gifts for Her 2026' },
        { href: '/gift-ideas-for-brother', label: 'Gift Ideas for Brother' },
        { href: '/gifts-for-teenage-girls', label: 'Gifts for Teenage Girls' },
        { href: '/best-beauty-gifts-2026', label: 'Best Beauty Gifts 2026' },
        { href: '/self-care-gifts-for-her', label: 'Self-Care Gifts for Her' },
        { href: '/birthday-gift-ideas', label: 'Birthday Gift Ideas' },
      ]}
    />
  );
}
