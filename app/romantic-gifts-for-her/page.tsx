import type { Metadata } from 'next';
import GiftGuideTemplate from '@/components/GiftGuideTemplate';
import { curate, shufflePool } from '@/lib/giftSelect';

const URL = 'https://www.thegiftshuffle.com/romantic-gifts-for-her';

export const metadata: Metadata = {
  title: 'Romantic Gifts for Her: 30 Sweet, Thoughtful Ideas for 2026 | TheGiftShuffle',
  description:
    'Romantic gifts for her, for your girlfriend, or for your wife that feel personal, not predictable. 30 sweet, thoughtful and unique romantic gift ideas from cozy to luxe, every budget.',
  keywords: [
    'romantic gift ideas for her',
    'romantic gifts for her',
    'sweet gift ideas for her',
    'thoughtful gifts for her',
    'loving gifts for her',
    'heartfelt gifts for her',
    'just because gifts for her',
    'gifts for the woman i love',
  ],
  openGraph: {
    title: 'Romantic Gifts for Her: 30 Sweet, Thoughtful Ideas for 2026 | TheGiftShuffle',
    description: '30 romantic gift ideas for her that feel personal, not predictable. Every budget covered.',
    type: 'website',
    url: URL,
    images: [{ url: 'https://www.thegiftshuffle.com/api/og?title=Romantic%20Gifts%20for%20Her%20%7C%20TheGiftShuffle', width: 1200, height: 630 }],
  },
  alternates: { canonical: URL },
};

const match = (p: { recipients?: string[]; occasions?: string[] }) =>
  (!!p.recipients?.includes('her') || !!p.recipients?.includes('couples')) &&
  (!!p.occasions?.includes('valentines') || !!p.occasions?.includes('anniversary'));
const grid = curate({ match, sort: 'rating', recipientCap: 50 });
const shuffle = shufflePool(match);

export default function Page() {
  return (
    <GiftGuideTemplate
      canonicalUrl={URL}
      schemaName="Romantic Gifts for Her"
      schemaDescription="Romantic, sweet and thoughtful gift ideas for her, curated by TheGiftShuffle"
      breadcrumbLabel="Romantic Gifts for Her"
      breadcrumbHref="/romantic-gifts-for-her"
      heroSrc="/images/heroes/romantic-gifts-for-her.jpg"
      heroAlt="A romantic gift for her with roses and a wrapped present"
      h1="Romantic Gifts for Her"
      intro={
        <>
          <p>
            These <strong>30 romantic gift ideas for her</strong> are the sweet, thoughtful picks
            that say more than a card ever could, without tipping into cliche. Every one is chosen
            to feel personal and considered, whether it is for an anniversary, Valentine&apos;s
            Day, or a just-because moment that matters more because there was no occasion at all.
          </p>
          <p className="text-base text-gray-600">
            From cozy keepsakes to a small touch of luxury, this list works for your wife or
            girlfriend at any budget. Browse the picks below, or hit shuffle for a fresh romantic
            idea every click.
          </p>
        </>
      }
      answer={{
        heading: 'What Are the Best Romantic Gifts for Her?',
        body: (
          <p>
            The best romantic gifts for her are personal, not predictable: an{' '}
            <strong>engraved necklace or bracelet</strong>, a <strong>custom star map</strong> of a
            date that matters, a <strong>memory or love-letter book</strong>, a{' '}
            <strong>couples experience or date-night box</strong>, or a{' '}
            <strong>luxe candle</strong> in a scent she loves. The romance lives in the thought and
            specificity, not the price, so tie it to your story and it always lands. Not sure which
            fits? Hit shuffle below for an instant romantic pick in your budget.
          </p>
        ),
      }}
      shuffleHeading="Shuffle Romantic Picks"
      shuffleProducts={shuffle}
      gridHeading="30 Romantic Gift Ideas for Her"
      gridProducts={grid}
      ctaHeading="Want Something Even More Her Style?"
      ctaText="Tell TheGiftShuffle who she is and your budget, and get an instant romantic gift idea in one click."
      faqs={[
        { q: 'What are romantic gift ideas for her?', a: 'Romantic gifts for her work best when they are personal: an engraved necklace or bracelet, a custom star map of a date that matters, a love-letter or memory book, a couples experience, or a luxe candle in a scent she loves. The romance is in the thought, not the price tag.' },
        { q: 'What is a sweet gift for your girlfriend or wife?', a: 'Sweet, romantic gifts include a personalized keepsake, a curated date-night box, a cozy matching set, a piece of jewelry with meaning, or a framed photo of a shared memory. Anything that references your relationship specifically lands harder than a generic luxury item.' },
        { q: 'What are romantic gifts for your girlfriend?', a: 'For a girlfriend, romantic gifts that land are personal but not too heavy: a dainty piece of jewelry, a custom star map or photo book of your time together, a date-night experience box, a cozy matching set, or her favorite scent. Early in a relationship, thoughtful and specific beats expensive, so reference an inside joke or a shared memory and it feels just right.' },
        { q: 'What are unique romantic gifts for her?', a: 'Unique romantic gifts skip the flowers-and-chocolate default: a custom star map of your first date, a soundwave print of a saved voice message, a personalized book of reasons you love her, a scent-memory candle, or a surprise recreation of an early date. They feel romantic precisely because they are one of a kind and clearly took thought.' },
        { q: 'What are romantic Christmas gifts for her?', a: 'Romantic Christmas gifts for her blend the season with something personal: an engraved piece of jewelry, a cozy cashmere wrap, a couples experience for the new year, a custom ornament marking the year, or a luxe candle and bath set for winter nights. Wrap it well and pair it with a handwritten note to make the romance land.' },
        { q: 'What is a romantic gift on a budget?', a: 'Under $50, romantic gifts that feel anything but cheap include a custom star map, an engraved keychain or bracelet, a love-notes jar, a scented candle and bath set, or a memory photo book. Personalization is what makes a small gift feel romantic.' },
        { q: 'What is a good just-because gift for her?', a: 'Just-because gifts are romantic precisely because nothing prompted them. A surprise bouquet paired with her favorite treat, a thoughtful book, a cozy throw, or a small piece of jewelry delivered for no reason at all carries more weight than the same gift on a scheduled holiday.' },
        { q: 'What is the most romantic gift you can give?', a: 'The most romantic gifts are experiential or deeply personal: a planned getaway, a recreated first-date night, a custom piece tied to your story, or a heartfelt keepsake. Effort and specificity read as far more romantic than expense.' },
      ]}
      relatedHeading="More Gift Guides for Her"
      relatedLinks={[
        { href: '/best-gifts-for-her-2026', label: 'Best Gifts for Her 2026' },
        { href: '/gifts-for-girlfriend', label: 'Gifts for Your Girlfriend' },
        { href: '/best-anniversary-gifts-2026', label: 'Best Anniversary Gifts 2026' },
        { href: '/best-beauty-gifts-2026', label: 'Best Beauty Gifts 2026' },
        { href: '/gift-ideas-for-her', label: 'Gift Ideas for Her' },
        { href: '/gifts-under-50', label: 'Gifts Under $50' },
      ]}
    />
  );
}
