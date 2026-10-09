import type { Metadata } from 'next';
import GiftGuideTemplate from '@/components/GiftGuideTemplate';
import { curate, shufflePool, ALL } from '@/lib/giftSelect';

const URL = 'https://www.thegiftshuffle.com/stocking-stuffers-for-him';

export const metadata: Metadata = {
  title: 'Stocking Stuffers for Him 2026: 30 Small Gifts He Will Actually Use | TheGiftShuffle',
  description:
    'The best stocking stuffers for him in 2026: top-rated small gifts under $25 for husbands, boyfriends, dads and brothers. Pocket tools, snacks and clever gear he will use all year.',
  keywords: [
    'stocking stuffers for him',
    'stocking stuffers for men',
    'stocking stuffers for husband',
    'stocking stuffers for boyfriend',
    'stocking stuffers for dad',
    'small gifts for men under 25',
  ],
  openGraph: {
    title: 'Stocking Stuffers for Him 2026: 30 Small Gifts He Will Actually Use',
    description: 'Top-rated stocking stuffers for husbands, boyfriends, dads and brothers, all under $25.',
    type: 'website',
    url: URL,
    images: [{ url: 'https://www.thegiftshuffle.com/images/heroes/stocking-stuffers-for-him.jpg', width: 1200, height: 800 }],
  },
  alternates: { canonical: URL },
};

const match = (p: { price?: number; recipients?: string[] }) =>
  (p.price ?? 999) <= 25 && (p.price ?? 0) >= 4 && !!p.recipients?.some((r) => r === 'him' || r === 'dad' || r === 'brother');
const grid = curate({ match, minRating: 4.5, sort: 'social', recipientCap: 15, limit: 30, pool: ALL });
const shuffle = shufflePool(match, ALL);

export default function Page() {
  return (
    <GiftGuideTemplate
      canonicalUrl={URL}
      schemaName="Stocking Stuffers for Him 2026"
      schemaDescription="The best stocking stuffers for him in 2026, curated by TheGiftShuffle"
      breadcrumbLabel="Stocking Stuffers for Him"
      breadcrumbHref="/stocking-stuffers-for-him"
      heroSrc="/images/heroes/stocking-stuffers-for-him.jpg"
      heroAlt="Practical small stocking stuffer gifts for him around a gray Christmas stocking"
      h1="Stocking Stuffers for Him, 2026 Edition"
      intro={
        <>
          <p>
            The best <strong>stocking stuffers for him</strong> are small, genuinely useful and a
            little clever: pocket tools, upgraded everyday carry, snacks with a story, and the gear
            he did not know existed. Every pick here is under $25 and rated{' '}
            <strong>4.5 stars or higher</strong> by real buyers.
          </p>
          <p className="text-base text-gray-600">
            Shopping for a husband, boyfriend, dad or brother? Shuffle below for a fresh idea every
            click, or pin a few and let the Gift Genie read his taste.
          </p>
        </>
      }
      answer={{
        heading: 'What Are the Best Stocking Stuffers for Him?',
        body: (
          <p>
            The best stocking stuffers for him are compact and functional: a{' '}
            <strong>credit-card multitool</strong>, a <strong>keychain flashlight</strong>, good{' '}
            <strong>wool socks</strong>, <strong>beef jerky or hot sauce</strong>, a{' '}
            <strong>pocket knife</strong>, a <strong>cable organizer</strong>, a{' '}
            <strong>deck of cards</strong>, or an <strong>insulated tumbler</strong>. One tool, one
            treat, one cozy pick and one surprise fills a stocking he will actually dig through;
            everything on this page is under $25 and rated 4.5 stars or higher.
          </p>
        ),
      }}
      shuffleHeading="Shuffle Stuffers for Him"
      shuffleProducts={shuffle}
      gridHeading={`${grid.length} Best Stocking Stuffers for Him, Ranked`}
      gridProducts={grid}
      ctaHeading="Not Sure What He Would Use?"
      ctaText="Tell TheGiftShuffle who he is and your budget, and get an instant idea in one click."
      faqs={[
        {
          q: 'What are the best stocking stuffers for him in 2026?',
          a: 'The reliable winners are everyday-carry upgrades: a credit-card multitool, keychain flashlight, quality wool socks, a compact pocket knife, cable organizers, jerky or hot sauce, and card games. Small tools he keeps in a pocket or bag beat gag gifts every time.',
        },
        {
          q: 'What stocking stuffers work for a husband or boyfriend?',
          a: 'For a husband or boyfriend, mix one practical upgrade (a nicer version of something he already carries), one treat tied to his taste, and one small surprise linked to his hobby: golf balls, guitar picks, game accessories, or grill tools depending on the man.',
        },
        {
          q: 'What are good stocking stuffers for dad?',
          a: 'Dads love compact utility: a pocket multitool, a magnetic flashlight, warm socks, a bottle opener with a story, hot sauce or coffee he has not tried, and anything that lives in the garage or glovebox. Useful plus a little indulgent is the formula.',
        },
        {
          q: 'How much should stocking stuffers for him cost?',
          a: 'Plan on 4 to 6 items between $5 and $25, or $40 to $80 for a full stocking. Spend the top of the budget on one hero item like a quality pocket knife or insulated tumbler and fill around it with $5 to $10 picks.',
        },
      ]}
      relatedHeading="More Gift Guides"
      relatedLinks={[
        { href: '/stocking-stuffers', label: 'All Stocking Stuffers' },
        { href: '/stocking-stuffers-under-10', label: 'Stocking Stuffers Under $10' },
        { href: '/stocking-stuffers-for-her', label: 'Stocking Stuffers for Her' },
        { href: '/christmas-gifts-for-him', label: 'Christmas Gifts for Him' },
        { href: '/gift-ideas-for-him', label: 'Gift Ideas for Him' },
        { href: '/gift-ideas-for-dad', label: 'Gift Ideas for Dad' },
        { href: '/best-gaming-gifts-2026', label: 'Best Gaming Gifts' },
        { href: '/gifts-under-25', label: 'Gifts Under $25' },
      ]}
    />
  );
}
