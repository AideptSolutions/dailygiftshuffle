import type { Metadata } from 'next';
import GiftGuideTemplate from '@/components/GiftGuideTemplate';
import { curate, shufflePool, ALL } from '@/lib/giftSelect';

const URL = 'https://www.thegiftshuffle.com/gifts-for-people-who-have-everything';

export const metadata: Metadata = {
  title: 'Gifts for People Who Have Everything: 35 Ideas They Do Not Own Yet | TheGiftShuffle',
  description:
    'Gift ideas for the person who has everything: unique, experiential and upgrade-everything picks for mom, dad, grandparents or the friend who is impossible to shop for.',
  keywords: [
    'gifts for people who have everything',
    'gifts for someone who has everything',
    'gifts for the man who has everything',
    'gifts for the woman who has everything',
    'gifts for parents who have everything',
    'gifts for grandparents who have everything',
    'unique gift ideas',
    'gifts for someone impossible to shop for',
  ],
  openGraph: {
    title: 'Gifts for People Who Have Everything: 35 Ideas They Do Not Own Yet | TheGiftShuffle',
    description: 'Unique, experiential and upgrade-everything gift ideas for the impossible-to-shop-for person.',
    type: 'website',
    url: URL,
    images: [{ url: 'https://www.thegiftshuffle.com/api/og?title=Gifts%20for%20People%20Who%20Have%20Everything%20%7C%20TheGiftShuffle', width: 1200, height: 630 }],
  },
  alternates: { canonical: URL },
};

// "Has everything" gifting = novel, personalized, consumable-luxury or premium
// upgrades they would not buy themselves. Keyword-gated for the unique angle.
const UNIQUE_KW =
  /personalized|custom|engraved|star map|smart|heated|massage|scratch.?off|subscription|experience|aroma|silk|cashmere|premium|luxury|decanter|telescope|projector|kit|set|tracker|airtag|ember|kindle|instax|polaroid|theragun|weighted/i;
const match = (p: { name?: string; rating?: number; price?: number }) =>
  (p.price ?? 0) >= 25 && !!p.name && UNIQUE_KW.test(p.name);
const grid = curate({ match, minRating: 4.6, sort: 'social', recipientCap: 8, limit: 35, pool: ALL });
const shuffle = shufflePool(match, ALL);

export default function Page() {
  return (
    <GiftGuideTemplate
      canonicalUrl={URL}
      schemaName="Gifts for People Who Have Everything"
      schemaDescription="Unique gift ideas for the person who has everything, curated by TheGiftShuffle"
      breadcrumbLabel="Gifts for People Who Have Everything"
      breadcrumbHref="/gifts-for-people-who-have-everything"
      heroSrc="/images/heroes/gifts-for-people-who-have-everything.jpg"
      heroAlt="An unusual, beautifully wrapped gift that stands out from the pile"
      h1="Gifts for People Who Have Everything"
      intro={
        <>
          <p>
            Shopping for the person who <strong>already has everything</strong>? The trick is to stop
            looking for things they lack and start looking for things they would never think to buy:
            clever upgrades to daily rituals, personalized keepsakes, small luxuries and
            experience-adjacent gifts that feel new even to someone with a full house.
          </p>
          <p className="text-base text-gray-600">
            Every pick below is top-rated and chosen for surprise value, whether it is for mom, dad,
            grandparents or the friend who is impossible to shop for. Shuffle for instant ideas, or
            browse the list.
          </p>
        </>
      }
      answer={{
        heading: 'What Do You Get Someone Who Has Everything?',
        body: (
          <p>
            For someone who has everything, give one of four things: a <strong>personalized
            keepsake</strong> they cannot already own, a custom star map or engraved piece, an{' '}
            <strong>upgrade to a daily ritual</strong> like an Ember mug or silk pillowcase, a{' '}
            <strong>consumable luxury</strong> like great whiskey, coffee or a spa set that never
            clutters, or an <strong>experience</strong>, tickets, a class, a scratch-off travel map
            to plan around. They have the things; give them something personal, temporary or
            experiential instead. Not sure? Hit shuffle below for an instant idea.
          </p>
        ),
      }}
      shuffleHeading="Shuffle Unique Gift Ideas"
      shuffleProducts={shuffle}
      gridHeading="Gifts They Do Not Own Yet, Ranked"
      gridProducts={grid}
      ctaHeading="Truly Impossible to Shop For?"
      ctaText="Tell TheGiftShuffle who it is and your budget, and get an instant idea they will not see coming."
      faqs={[
        { q: 'What do you get someone who has everything?', a: 'Give something personal, consumable or experiential instead of another object: a personalized or engraved keepsake, an upgrade to a daily ritual like a temperature-control mug or silk pillowcase, a premium consumable like great whiskey or a spa set, or an experience such as tickets or a class.' },
        { q: 'What do you get parents or grandparents who have everything?', a: 'For parents and grandparents, sentimental and useful wins: a digital photo frame the family can send pictures to, a custom keepsake with names or dates, a talking photo album, a premium version of something they use daily, or an experience with the family. Connection beats stuff at this stage.' },
        { q: 'What do you get the man who has everything?', a: 'For the man who has everything, upgrade a ritual or feed a hobby: a premium whiskey decanter set, top-tier headphones, a heated massage gun, an engraved leather piece, or gear for the hobby he never spends on himself. If he buys everything he wants, buy the version he considers an indulgence.' },
        { q: 'What do you get the woman who has everything?', a: 'For the woman who has everything, small luxuries and personalization work best: a silk pillowcase or robe, a designer fragrance, a custom star map or engraved jewelry, a luxe spa set, or a premium upgrade to her coffee or skincare routine. It should feel indulgent, not needed.' },
        { q: 'What are good inexpensive gifts for someone who has everything?', a: 'Under $50, go consumable or clever: a premium candle, gourmet hot sauce or chocolate, a cult-favorite skincare item, a fun desk gadget, or a personalized small keepsake. The surprise factor matters more than the price for someone with a full house.' },
      ]}
      relatedHeading="More Gift Guides"
      relatedLinks={[
        { href: '/retirement-gifts', label: 'Retirement Gifts' },
        { href: '/gift-ideas-for-grandparents', label: 'Gifts for Grandparents' },
        { href: '/best-luxury-gifts-2026', label: 'Best Luxury Gifts 2026' },
        { href: '/unique-birthday-gifts', label: 'Unique Birthday Gifts' },
        { href: '/self-care-gifts', label: 'Self-Care & Wellness Gifts' },
        { href: '/help-me-pick-a-gift', label: 'Help Me Pick a Gift' },
      ]}
    />
  );
}
