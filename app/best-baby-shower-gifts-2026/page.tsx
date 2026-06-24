import type { Metadata } from 'next';
import GiftGuideTemplate from '@/components/GiftGuideTemplate';
import { curate, shufflePool, ALL, type AnyProduct } from '@/lib/giftSelect';

const URL = 'https://www.thegiftshuffle.com/best-baby-shower-gifts-2026';

export const metadata: Metadata = {
  title: 'Best Baby Shower Gifts for 2026: 48 Top-Rated Picks New Parents Love | TheGiftShuffle',
  description:
    'The best baby shower gifts for 2026, hand-picked for new and expecting parents. 48 top-rated, registry-worthy baby gift ideas at every budget, from under $15 to splurge-worthy.',
  keywords: [
    'best baby shower gifts',
    'baby shower gifts',
    'baby shower gift ideas',
    'best baby shower gifts 2026',
    'gifts for new parents',
    'newborn gifts',
    'baby registry gifts',
    'unique baby shower gifts',
  ],
  openGraph: {
    title: 'Best Baby Shower Gifts for 2026: 48 Top-Rated Picks | TheGiftShuffle',
    description:
      '48 top-rated baby shower gift ideas for 2026, for new and expecting parents, every budget.',
    type: 'website',
    url: URL,
    images: [{ url: 'https://www.thegiftshuffle.com/api/og?title=Best%20Baby%20Shower%20Gifts%202026%20%7C%20TheGiftShuffle', width: 1200, height: 630 }],
  },
  alternates: { canonical: URL },
};

// "Best baby shower gifts" = items a new or expecting parent actually wants,
// drawn from the combined catalog. Match anything tagged baby-shower OR aimed at
// the baby recipient, then drop two things that pollute the list: consumables
// that win on review volume but are not gifts (diapers, wipes, rash cream), and
// older-kid items that are not baby-shower appropriate (Magna-Tiles, splash
// pads, swim hats). Rank by social proof so the registry staples lead.
const EXCLUDE = /pampers|desitin|johnson|happy baby organic|avent pacifier|prcsee|magna-?tiles|bluey|splash|water table|swim hat|step2/i;
const match = (p: AnyProduct) =>
  ((p.tags ?? []).includes('baby-shower') ||
    (p.occasions ?? []).includes('baby-shower') ||
    (p.recipients ?? []).includes('baby')) &&
  !EXCLUDE.test(p.name);

const grid = curate({
  match,
  minRating: 4.3,
  sort: 'social',
  excludeRecipients: [],
  excludeTags: [],
  recipientCap: 50,
  limit: 48,
  pool: ALL,
});
const shuffle = shufflePool(match, ALL);

export default function Page() {
  return (
    <GiftGuideTemplate
      canonicalUrl={URL}
      schemaName="Best Baby Shower Gifts for 2026"
      schemaDescription="The best baby shower gift ideas for 2026, curated by TheGiftShuffle"
      breadcrumbLabel="Best Baby Shower Gifts 2026"
      breadcrumbHref="/best-baby-shower-gifts-2026"
      heroSrc="/images/heroes/best-baby-shower-gifts-2026.jpg"
      heroAlt="The best baby shower gifts arranged with neutral baby clothes, a teether and gift wrap"
      h1="The Best Baby Shower Gifts for 2026"
      intro={
        <>
          <p>
            These are the <strong>48 best baby shower gifts for 2026</strong>, chosen for the people
            actually living the newborn stage rather than the same recycled registry filler. Every
            pick is top-rated, genuinely useful in the first year, and the kind of thing new parents
            keep reaching for instead of stashing in a closet.
          </p>
          <p className="text-base text-gray-600">
            From under-$15 essentials like a Haakaa pump and a NoseFrida, to splurge-worthy gifts
            like the Owlet Dream Sock and a Baby Brezza, this list covers feeding, sleep, soothing,
            on-the-go and keepsakes, plus a few thoughtful picks for mom. Scroll the picks below, or
            hit shuffle to find a fresh idea every click.
          </p>
        </>
      }
      shuffleHeading="Shuffle Baby Shower Gift Picks"
      shuffleProducts={shuffle}
      gridHeading="48 Best Baby Shower Gifts, Ranked"
      gridProducts={grid}
      ctaHeading="Not Sure What to Get the New Parents?"
      ctaText="Tell TheGiftShuffle the budget and the stage, and get an instant baby shower gift idea in one click."
      faqs={[
        { q: 'What are the best baby shower gifts for 2026?', a: 'The best baby shower gifts in 2026 are the items new parents use every single day: a soft swaddle or sleep sack, a Comotomo or Dr. Brown\'s bottle set, a Boppy nursing pillow, a quality diaper bag, and soothing staples like a WubbaNub and a NoseFrida. The pattern is practical over novelty, and registry-proven over trendy.' },
        { q: 'What are good baby shower gifts under $50?', a: 'Standout baby shower gifts under $50 include a Kyte Baby sleep sack, an aden + anais swaddle set, a Frida Mom postpartum kit, a Sophie la Girafe teether, a Skip Hop Moby bath tub, and a Haakaa breast pump. They are affordable, used constantly, and almost always welcome even if the parents already have the basics.' },
        { q: 'What do you give for a baby shower if you want to stand out?', a: 'To stand out, skip another pack of onesies and gift something parents would not splurge on themselves: an Owlet Dream Sock monitor, a Baby Brezza formula dispenser, a designer-look Itzy Ritzy diaper bag, or a keepsake handprint frame. Pairing one practical item with one sentimental keepsake is the combination people remember.' },
        { q: 'What is the best baby shower gift for the mom, not just the baby?', a: 'Mom-focused gifts are often the most appreciated and the most overlooked. A Frida Mom postpartum recovery kit, a Haakaa silicone pump, a soft robe, or a Tubby Todd skincare set all support the person doing the recovering. Gifting the parent, not only the baby, is a thoughtful move that stands out at any shower.' },
        { q: 'What are practical baby shower gifts new parents actually use?', a: 'The most-used baby shower gifts are the unglamorous essentials: bottles, swaddles and sleep sacks, a diaper bag, a nursing pillow, a bath tub, a NoseFrida, and a sound machine. If you want a safe bet, choose something from the parents\' registry or a top-rated version of a daily-use item, and add a gift receipt.' },
      ]}
      relatedHeading="More Gift Guides"
      relatedLinks={[
        { href: '/category/baby-shower', label: 'All Baby Shower Gifts' },
        { href: '/mothers-day-gifts', label: 'Gifts for Mom' },
        { href: '/gift-ideas-for-kids', label: 'Gift Ideas for Kids' },
        { href: '/gift-ideas-for-grandparents', label: 'Gift Ideas for Grandparents' },
        { href: '/best-gifts-for-her-2026', label: 'Best Gifts for Her 2026' },
        { href: '/gifts-under-50', label: 'Gifts Under $50' },
      ]}
    />
  );
}
