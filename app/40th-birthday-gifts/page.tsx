import type { Metadata } from 'next';
import GiftGuideTemplate from '@/components/GiftGuideTemplate';
import { curate, shufflePool, ALL } from '@/lib/giftSelect';

const URL = 'https://www.thegiftshuffle.com/40th-birthday-gifts';

export const metadata: Metadata = {
  title: '40th Birthday Gifts: 30 Milestone Ideas Worth the Occasion (2026) | TheGiftShuffle',
  description:
    'The best 40th birthday gifts for 2026: elevated, milestone-worthy ideas for men and women turning 40, from premium upgrades to memorable keepsakes at every budget.',
  keywords: [
    '40th birthday gifts',
    '40th birthday gift ideas',
    '40th birthday gifts for men',
    '40th birthday gifts for women',
    '40th birthday gifts for him',
    '40th birthday gifts for her',
    'milestone birthday gifts',
    'turning 40 gift ideas',
  ],
  openGraph: {
    title: '40th Birthday Gifts: 30 Milestone Ideas Worth the Occasion (2026) | TheGiftShuffle',
    description: 'Elevated, milestone-worthy 40th birthday gift ideas for men and women at every budget.',
    type: 'website',
    url: URL,
    images: [{ url: 'https://www.thegiftshuffle.com/api/og?title=40th%20Birthday%20Gifts%20%7C%20TheGiftShuffle', width: 1200, height: 630 }],
  },
  alternates: { canonical: URL },
};

// Milestone birthdays skew elevated: birthday occasion, adult recipients, $25+.
const match = (p: { occasions?: string[] }) => !!p.occasions?.includes('birthday');
const grid = curate({
  match,
  minPrice: 25,
  minRating: 4.5,
  sort: 'social',
  excludeRecipients: ['baby', 'pets', 'kids', 'teens'],
  limit: 30,
  pool: ALL,
});
const shuffle = shufflePool(match, ALL);

export default function Page() {
  return (
    <GiftGuideTemplate
      canonicalUrl={URL}
      schemaName="40th Birthday Gifts"
      schemaDescription="The best 40th birthday gift ideas, curated by TheGiftShuffle"
      breadcrumbLabel="40th Birthday Gifts"
      breadcrumbHref="/40th-birthday-gifts"
      heroSrc="/images/heroes/40th-birthday-gifts.jpg"
      heroAlt="40th birthday gifts with celebration balloons and confetti"
      h1="40th Birthday Gifts"
      intro={
        <>
          <p>
            Forty deserves better than a gag mug. These <strong>best 40th birthday gifts</strong> are
            elevated, top-rated picks that match the milestone: premium versions of things they use
            daily, keepsakes that mark the year, and a few well-earned indulgences for men and women
            hitting the big 4-0.
          </p>
          <p className="text-base text-gray-600">
            From a considered small gift to a proper splurge, every budget is covered. Hit shuffle
            for a fresh idea every click, or browse the ranked list below.
          </p>
        </>
      }
      answer={{
        heading: 'What Is a Good 40th Birthday Gift?',
        body: (
          <p>
            A good 40th birthday gift is an <strong>upgrade, not another object</strong>: a premium
            watch or piece of jewelry, top-tier headphones, a luxury version of a daily ritual like
            an Ember mug or silk pillowcase, a whiskey decanter set, or an experience they keep
            postponing. At 40 people own plenty; what lands is the noticeably nicer version of
            something they already love, or a keepsake that marks the milestone. Pair it with a card
            that actually says something. Not sure? Hit shuffle below for an instant idea.
          </p>
        ),
      }}
      shuffleHeading="Shuffle 40th Birthday Ideas"
      shuffleProducts={shuffle}
      gridHeading="Milestone-Worthy 40th Birthday Gifts, Ranked"
      gridProducts={grid}
      ctaHeading="Make the Big 4-0 Feel Big"
      ctaText="Tell TheGiftShuffle who is turning 40 and your budget, and get an instant, milestone-worthy idea in one click."
      faqs={[
        { q: 'What is a good 40th birthday gift?', a: 'Good 40th birthday gifts are elevated upgrades: a quality watch, premium headphones, fine or personalized jewelry, a luxe daily-ritual upgrade like a temperature-control mug or silk pillowcase, a whiskey decanter set, or a memorable experience. At 40, noticeably nicer beats novel.' },
        { q: 'What is a good 40th birthday gift for a man?', a: 'For a man turning 40, reliable winners are a premium watch or wallet, top-tier headphones, a whiskey or grilling upgrade, quality luggage, or gear for the hobby he finally has time and budget for. Skip the over-the-hill gags unless the card carries them.' },
        { q: 'What is a good 40th birthday gift for a woman?', a: 'For a woman turning 40, think fine or engraved jewelry, a designer fragrance, a luxury skincare or spa set, a silk or cashmere upgrade, or an experience like a getaway or tasting. The winning theme is a well-earned indulgence she would not buy herself.' },
        { q: 'How much should you spend on a 40th birthday gift?', a: 'For friends, $30 to $75 is typical; for close family or a partner, $100 to $300 or more fits the milestone. Whatever the number, put it into one meaningful upgrade instead of several small items; milestones reward focus.' },
        { q: 'What are funny 40th birthday gift ideas?', a: 'If the birthday person loves a laugh, pair one real gift with one gag: an over-the-hill survival kit, a funny mug or socks, or a joke trophy. Keep the gag as the opener and the real gift as the finish so the milestone still feels celebrated.' },
      ]}
      relatedHeading="More Birthday Gift Guides"
      relatedLinks={[
        { href: '/birthday-gift-ideas', label: 'Birthday Gift Ideas' },
        { href: '/30th-birthday-gifts', label: '30th Birthday Gifts' },
        { href: '/50th-birthday-gifts', label: '50th Birthday Gifts' },
        { href: '/best-luxury-gifts-2026', label: 'Best Luxury Gifts 2026' },
        { href: '/unique-birthday-gifts', label: 'Unique Birthday Gifts' },
        { href: '/best-birthday-gifts-2026', label: 'Best Birthday Gifts 2026' },
      ]}
    />
  );
}
