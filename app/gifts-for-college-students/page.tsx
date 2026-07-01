import type { Metadata } from 'next';
import GiftGuideTemplate from '@/components/GiftGuideTemplate';
import { curate, shufflePool, ALL } from '@/lib/giftSelect';

const URL = 'https://www.thegiftshuffle.com/gifts-for-college-students';

export const metadata: Metadata = {
  title: 'Best Gifts for New College Students 2026: Dorm, Tech & Essentials | TheGiftShuffle',
  description:
    'The best gifts for new college students in 2026: dorm decor, tech like earbuds and headphones, and the everyday essentials first-year students actually need. Top-rated picks for every budget.',
  keywords: [
    'gifts for college students',
    'best gifts for college students',
    'college student gifts',
    'gifts for college freshmen',
    'dorm room gifts',
    'dorm essentials gifts',
    'college tech gifts',
    'going away to college gifts',
    'gifts for new college students',
    'first year college gifts',
  ],
  openGraph: {
    title: 'Best Gifts for New College Students 2026: Dorm, Tech & Essentials | TheGiftShuffle',
    description: 'Dorm decor, tech and everyday essentials first-year college students actually need. Top-rated picks for every budget.',
    type: 'website',
    url: URL,
    images: [{ url: 'https://www.thegiftshuffle.com/api/og?title=Gifts%20for%20College%20Students%20%7C%20TheGiftShuffle', width: 1200, height: 630 }],
  },
  alternates: { canonical: URL },
};

// Curated college-student set (id-prefixed), drawn from the combined catalog so
// the dorm/tech/essentials picks surface together. recipientCap is high so all
// of them show rather than getting capped per primary recipient.
// Relaxed quality bar for this page (4.0): dorm commodities like mini fridges,
// fans and storage sit a bit lower than gift-grade items, and selection breadth
// matters more here than a high star floor. To widen the list beyond the curated
// college- items, also pull in genuinely college-relevant products already in the
// catalog (dorm/tech/study gear, student recipients, dorm-budget price) gated by a
// keyword list so nothing off-theme sneaks in.
const COLLEGE_KW =
  /earbud|airpod|headphone|speaker|charger|power ?bank|backpack|blanket|throw|string light|led strip|lamp|organizer|storage|caddy|hamper|laundry|tapestry|poster|planner|water bottle|tumbler|mug|kettle|\bfan\b|desk|monitor|keyboard|mouse|notebook|journal|pillow|robe|slipper|shower|coffee|hoodie|backrest/i;
const STUDENT = ['teens', 'him', 'her', 'friends'];
const isCollege = (p: { id?: string }) => !!p.id?.startsWith('college-');
const isCollegeRelevant = (p: { name?: string; price?: number; tags?: string[]; recipients?: string[] }) =>
  (p.price ?? 999) <= 120 &&
  !!p.recipients?.some((r) => STUDENT.includes(r)) &&
  !!p.tags?.some((t) => ['tech', 'home', 'office', 'kitchen', 'fitness'].includes(t)) &&
  !!p.name && COLLEGE_KW.test(p.name);

// The hand-picked dorm/tech items lead (so the dorm character is not buried by
// high-review catalog tech), then fill the grid with broader college-relevant
// picks from the existing catalog. Relaxed 4.0 star floor for this page.
const collegeItems = curate({ match: isCollege, minRating: 4.0, sort: 'social', recipientCap: 30, limit: 30, pool: ALL });
const broadItems = curate({ match: isCollegeRelevant, minRating: 4.0, sort: 'social', recipientCap: 6, limit: 40, pool: ALL });
const seen = new Set(collegeItems.map((p) => p.id));
const grid = [...collegeItems, ...broadItems.filter((p) => !seen.has(p.id))].slice(0, 48);
const shuffle = shufflePool((p) => isCollege(p) || isCollegeRelevant(p), ALL);

export default function Page() {
  return (
    <GiftGuideTemplate
      canonicalUrl={URL}
      schemaName="Best Gifts for New College Students 2026"
      schemaDescription="The best dorm, tech and everyday gifts for new college students, curated by TheGiftShuffle"
      breadcrumbLabel="Gifts for College Students"
      breadcrumbHref="/gifts-for-college-students"
      heroSrc="/images/heroes/gifts-for-college-students.jpg"
      heroAlt="A decorated college dorm room with a laptop, desk and string lights"
      h1="Best Gifts for New College Students"
      intro={
        <>
          <p>
            The <strong>best gifts for new college students</strong> solve real first-year problems:
            making a bare dorm feel like home, surviving shared bathrooms and tiny desks, and
            powering through late-night study sessions. Every pick below is top-rated and genuinely
            useful, so it gets used all year rather than shoved in a closet.
          </p>
          <p className="text-base text-gray-600">
            You will find <strong>dorm decor</strong> (LED strips, a tapestry, cozy bedding),
            <strong> tech</strong> (earbuds, noise-canceling headphones, a power bank), and the
            unglamorous essentials first-years always forget. Not sure which to pick? Hit shuffle for
            an instant idea, or browse the full list.
          </p>
        </>
      }
      shuffleHeading="Shuffle College Gift Ideas"
      shuffleProducts={shuffle}
      gridHeading="Dorm, Tech & Everyday Essentials They Will Actually Use"
      gridProducts={grid}
      ctaHeading="Not Sure Which to Pick?"
      ctaText="Tell TheGiftShuffle who it is for and your budget, and get an instant, top-rated college gift idea in one click."
      faqs={[
        {
          q: 'What are the best gifts for a new college student?',
          a: 'The best gifts for a new college student combine dorm comfort, tech and practical essentials: RGB LED strip lights, a Twin XL comforter, wireless earbuds or noise-canceling headphones, a portable power bank, a mesh shower caddy, and an insulated water bottle. The winners are the items they will reach for every single day.',
        },
        {
          q: 'What tech gifts do college students actually want?',
          a: 'The most-wanted college tech gifts are wireless earbuds (AirPods are the default), over-ear noise-canceling headphones for studying, a 10,000mAh portable charger, a Bluetooth speaker, and a laptop stand. They are useful across every major and survive all four years.',
        },
        {
          q: 'What are the best dorm decorations to gift?',
          a: 'The best dorm decorations are renter-friendly and quick to put up: RGB LED strip lights (the number-one dorm upgrade), a large wall tapestry to cover bare cinderblock, fairy string lights, and a cozy throw blanket. They personalize a room in minutes without nails or paint.',
        },
        {
          q: 'What size bedding do dorm beds use?',
          a: 'Most dorm beds are Twin XL, not standard Twin, so always check before buying sheets or a comforter. A Twin XL comforter set is a genuinely thoughtful gift precisely because it is the size first-years often get wrong.',
        },
        {
          q: 'What is a good going-away-to-college gift on a budget?',
          a: 'Under $25, the standout college gifts are a mesh shower caddy, a wall tapestry, fairy string lights, a laundry backpack bag, or a quality water bottle. They are inexpensive but solve real dorm problems, which is exactly why they get used.',
        },
      ]}
      relatedHeading="More Gift Guides"
      relatedLinks={[
        { href: '/graduation-gifts', label: 'Graduation Gifts' },
        { href: '/gift-ideas-for-teens', label: 'Gift Ideas for Teens' },
        { href: '/best-gaming-gifts-2026', label: 'Best Gaming Gifts 2026' },
        { href: '/gifts-under-50', label: 'Gifts Under $50' },
        { href: '/help-me-pick-a-gift', label: 'Help Me Pick a Gift' },
        { href: '/category/tech', label: 'All Tech Gifts' },
      ]}
    />
  );
}
