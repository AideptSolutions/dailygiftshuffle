import type { Metadata } from 'next';
import GiftGuideTemplate from '@/components/GiftGuideTemplate';
import { curate, shufflePool, ALL } from '@/lib/giftSelect';

const URL = 'https://www.thegiftshuffle.com/stocking-stuffers-for-dad';

export const metadata: Metadata = {
  title: 'Stocking Stuffers for Dad 2026: Small Gifts He Will Actually Use | TheGiftShuffle',
  description:
    'The best stocking stuffers for dad in 2026: top-rated small gifts under $25, from golf balls and work socks to pocket tools and jerky. Practical picks he will use all year, verified this season.',
  keywords: [
    'stocking stuffers for dad',
    'dad stocking stuffer ideas',
    'stocking stuffers for grandpa',
    'small gifts for dad under 25',
    'practical stocking stuffers for men',
  ],
  openGraph: {
    title: 'Stocking Stuffers for Dad 2026: Small Gifts He Will Actually Use',
    description: 'Top-rated small gifts under $25, from golf balls and work socks to pocket tools and jerky.',
    type: 'website',
    url: URL,
    images: [{ url: 'https://www.thegiftshuffle.com/images/heroes/stocking-stuffers-for-dad.jpg', width: 1200, height: 800 }],
  },
  alternates: { canonical: URL },
};

const match = (p: { price?: number; recipients?: string[] }) =>
  (p.price ?? 999) <= 25 && (p.price ?? 0) >= 4 && !!p.recipients?.includes('dad');
const grid = curate({ match, minRating: 4.5, sort: 'social', recipientCap: 40, limit: 30, pool: ALL });
const shuffle = shufflePool(match, ALL);

export default function Page() {
  return (
    <GiftGuideTemplate
      canonicalUrl={URL}
      schemaName="Stocking Stuffers for Dad 2026"
      schemaDescription="The best stocking stuffers for dad in 2026, curated by TheGiftShuffle"
      breadcrumbLabel="Stocking Stuffers for Dad"
      breadcrumbHref="/stocking-stuffers-for-dad"
      heroSrc="/images/heroes/stocking-stuffers-for-dad.jpg"
      heroAlt="Practical stocking stuffers for dad including golf balls, soap, socks and playing cards on a plaid blanket"
      h1="Stocking Stuffers for Dad, 2026 Edition"
      intro={
        <>
          <p>
            The best <strong>stocking stuffers for dad</strong> are small, practical and a little
            indulgent: golf balls, serious socks, a brick of soap with a story, jerky and the
            pocket tool he did not know he needed. Every pick here is under $25 and rated{' '}
            <strong>4.5 stars or higher</strong> by real buyers.
          </p>
          <p className="text-base text-gray-600">
            Shopping for dad or grandpa? Shuffle below for a fresh idea every click, or pin a few
            and let the Gift Genie read his taste.
          </p>
        </>
      }
      answer={{
        heading: 'What Are the Best Stocking Stuffers for Dad?',
        body: (
          <p>
            The best stocking stuffers for dad are things he uses up and replaces:{' '}
            <strong>Callaway golf balls</strong>, <strong>Dickies work socks</strong>, a{' '}
            <strong>Duke Cannon brick of soap</strong>, <strong>beef sticks</strong>,{' '}
            <strong>O&apos;Keeffe&apos;s hand cream</strong>, a <strong>keychain flashlight</strong>, or a{' '}
            <strong>credit-card multitool</strong>. One hobby pick, one practical pick, one treat
            and one tool fills a stocking he will actually dig through; everything on this page is
            under $25 and rated 4.5 stars or higher.
          </p>
        ),
      }}
      shuffleHeading="Shuffle Stuffers for Dad"
      shuffleProducts={shuffle}
      gridHeading={`${grid.length} Best Stocking Stuffers for Dad, Ranked`}
      gridProducts={grid}
      ctaHeading="Not Sure What Dad Would Use?"
      ctaText="Tell TheGiftShuffle who he is and your budget, and get an instant idea in one click."
      faqs={[
        {
          q: 'What are the best stocking stuffers for dad in 2026?',
          a: 'The reliable winners: a dozen Callaway Supersoft golf balls for the golfer, Dickies work socks, a Duke Cannon brick of soap, zero-sugar beef sticks, O Keeffes hand cream for hard-working hands, and a keychain flashlight or multitool. Consumable and replaceable beats decorative.',
        },
        {
          q: 'What stocking stuffers work for grandpa?',
          a: 'Grandpas appreciate comfort and utility: warm socks, hand cream, a magnifying pocket light, nice coffee or chocolate, playing cards, and anything tied to a lifelong hobby like golf tees or fishing lures.',
        },
        {
          q: 'What stocking stuffers work for the dad who has everything?',
          a: 'Go consumable: the premium version of something he already buys. Fancy jerky, a big brick of quality soap, top-shelf golf balls, or a hot sauce he has not tried. He cannot already own something that gets used up.',
        },
        {
          q: 'How much should you spend on stocking stuffers for dad?',
          a: 'Four to six items between $5 and $25, or $50 to $80 total. Anchor with one hobby pick like a dozen golf balls, then fill with socks, soap, a treat, and one small tool.',
        },
      ]}
      relatedHeading="More Gift Guides"
      relatedLinks={[
        { href: '/stocking-stuffers', label: 'All Stocking Stuffers' },
        { href: '/stocking-stuffers-for-him', label: 'Stocking Stuffers for Him' },
        { href: '/stocking-stuffers-under-10', label: 'Stocking Stuffers Under $10' },
        { href: '/stocking-stuffers-for-kids', label: 'Stocking Stuffers for Kids' },
        { href: '/gift-ideas-for-dad', label: 'Gift Ideas for Dad' },
        { href: '/christmas-gifts-for-him', label: 'Christmas Gifts for Him' },
        { href: '/top-10-fathers-day-gifts-2026', label: 'Top Gifts for Dad' },
        { href: '/gifts-under-25', label: 'Gifts Under $25' },
      ]}
    />
  );
}
