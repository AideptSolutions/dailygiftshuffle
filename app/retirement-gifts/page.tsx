import type { Metadata } from 'next';
import GiftGuideTemplate from '@/components/GiftGuideTemplate';
import { curate, shufflePool, ALL } from '@/lib/giftSelect';

const URL = 'https://www.thegiftshuffle.com/retirement-gifts';

export const metadata: Metadata = {
  title: 'Best Retirement Gifts 2026: 30 Ideas for a Well-Earned Next Chapter | TheGiftShuffle',
  description:
    'The best retirement gifts for 2026: thoughtful ideas for mom, dad, a coworker or boss, from new-hobby kits and travel gear to relaxing upgrades for slower mornings.',
  keywords: [
    'retirement gifts',
    'retirement gift ideas',
    'retirement gifts for mom',
    'retirement gifts for dad',
    'retirement gifts for men',
    'retirement gifts for women',
    'retirement gifts for coworkers',
    'retirement gift for boss',
    'best retirement gifts 2026',
  ],
  openGraph: {
    title: 'Best Retirement Gifts 2026: 30 Ideas for a Well-Earned Next Chapter | TheGiftShuffle',
    description: 'Thoughtful retirement gift ideas for mom, dad, a coworker or boss, from hobby kits to travel gear.',
    type: 'website',
    url: URL,
    images: [{ url: 'https://www.thegiftshuffle.com/api/og?title=Retirement%20Gifts%20%7C%20TheGiftShuffle', width: 1200, height: 630 }],
  },
  alternates: { canonical: URL },
};

// Curated retire- items lead, then fill with hobby/travel/relaxation picks that
// suit the new-chapter theme (keyword-gated so nothing off-theme sneaks in).
const RETIRE_KW =
  /golf|garden|bird|puzzle|hammock|travel|luggage|packing|grill|bbq|whiskey|wine|coffee|espresso|book|reading|kindle|massage|recliner|patio|fishing|hiking|camping|bocce|pickleball|telescope|binocular|yoga|walking|national park|scratch.?off|hobby|paint|knit|crochet/i;
const isRetire = (p: { id?: string }) => !!p.id?.startsWith('retire-');
const isRetireRelevant = (p: { name?: string; recipients?: string[] }) =>
  !!(p.recipients?.includes('grandparents') || p.recipients?.includes('mom') || p.recipients?.includes('dad')) &&
  !!p.name && RETIRE_KW.test(p.name);

const retireItems = curate({ match: isRetire, minRating: 4.2, sort: 'social', recipientCap: 30, limit: 12, pool: ALL });
const fillItems = curate({ match: isRetireRelevant, minRating: 4.5, sort: 'social', recipientCap: 10, limit: 40, pool: ALL });
const seen = new Set(retireItems.map((p) => p.id));
const grid = [...retireItems, ...fillItems.filter((p) => !seen.has(p.id))].slice(0, 30);
const shuffle = shufflePool((p) => isRetire(p) || isRetireRelevant(p), ALL);

export default function Page() {
  return (
    <GiftGuideTemplate
      canonicalUrl={URL}
      schemaName="Best Retirement Gifts 2026"
      schemaDescription="The best retirement gift ideas for 2026, curated by TheGiftShuffle"
      breadcrumbLabel="Retirement Gifts"
      breadcrumbHref="/retirement-gifts"
      heroSrc="/images/heroes/retirement-gifts.jpg"
      heroAlt="A relaxing retirement scene with a lounge chair and travel gear"
      h1="Best Retirement Gifts for 2026"
      intro={
        <>
          <p>
            A great <strong>retirement gift</strong> celebrates the years of work and points at the
            fun ahead. These top-rated picks for <strong>mom, dad, a coworker or a boss</strong> lean
            into the new chapter: hobby kits worth getting obsessed with, travel gear for the
            bucket-list years, and relaxing upgrades for slower mornings.
          </p>
          <p className="text-base text-gray-600">
            Shopping with a group or solo, there is a fit at every budget. Hit shuffle for a fresh
            idea every click, or browse the ranked list below.
          </p>
        </>
      }
      answer={{
        heading: 'What Is a Good Retirement Gift?',
        body: (
          <p>
            The best retirement gifts point at what comes next: a <strong>new-hobby kit</strong> like
            bocce, pickleball or a garden starter, <strong>travel gear</strong> like a scratch-off
            national parks map or quality luggage, <strong>slow-morning upgrades</strong> like a
            window bird feeder, great coffee gear or a zero-gravity patio chair, or a{' '}
            <strong>celebratory keepsake</strong> like a whiskey decanter set. Match the gift to what
            they always said they would do when they finally had time, and it lands every time. Not
            sure? Hit shuffle below for an instant idea.
          </p>
        ),
      }}
      shuffleHeading="Shuffle Retirement Gift Ideas"
      shuffleProducts={shuffle}
      gridHeading="Top-Rated Retirement Gifts, Ranked"
      gridProducts={grid}
      ctaHeading="Shopping for a Specific Retiree?"
      ctaText="Tell TheGiftShuffle who is retiring and your budget, and get an instant, top-rated idea in one click."
      faqs={[
        { q: 'What is a good retirement gift?', a: 'A good retirement gift celebrates the milestone and feeds the next chapter: a new-hobby kit like bocce or a garden starter, travel gear like a scratch-off parks map, a relaxing upgrade like a zero-gravity chair or window bird feeder, or a celebratory whiskey decanter set. Point the gift at what they finally have time for.' },
        { q: 'What is a good retirement gift for mom?', a: 'For a retiring mom, think slower-morning luxuries and new routines: a garden or bird-feeding setup, a spa or self-care set, a puzzle habit upgrade, an Ember mug for unhurried coffee, or a travel keepsake for trips she has been postponing. Comfort plus a new pastime is the formula.' },
        { q: 'What is a good retirement gift for dad or a boss?', a: 'For a retiring dad or boss, reliable winners are a whiskey decanter set, golf or bocce gear, a grill upgrade, a national parks scratch-off poster, or a quality zero-gravity chair for the patio. For a boss, add a well-written card; the words matter as much as the gift.' },
        { q: 'How much should you spend on a retirement gift?', a: 'From a coworker, $20 to $50 is typical; from a team pooling together, $50 to $200 opens up bigger gifts like chairs, luggage or premium sets. From family, spend what fits the relationship; thoughtfulness about their plans matters more than the number.' },
        { q: 'What do you get someone who is retiring and has everything?', a: 'For a retiree who has everything, gift the next chapter instead of another object: a scratch-off travel map to fill in, a class or membership tied to a hobby, a new game like pickleball to learn, or an experience to share. See our gifts for people who have everything guide for more.' },
      ]}
      relatedHeading="More Gift Guides"
      relatedLinks={[
        { href: '/gifts-for-people-who-have-everything', label: 'Gifts for People Who Have Everything' },
        { href: '/gift-ideas-for-grandparents', label: 'Gifts for Grandparents' },
        { href: '/gift-ideas-for-dad', label: 'Gift Ideas for Dad' },
        { href: '/gift-ideas-for-mom', label: 'Gift Ideas for Mom' },
        { href: '/gifts-for-boss', label: 'Gifts for Your Boss' },
        { href: '/gifts-for-coworkers', label: 'Gifts for Coworkers' },
      ]}
    />
  );
}
