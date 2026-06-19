import type { Metadata } from 'next';
import GiftGuideTemplate from '@/components/GiftGuideTemplate';
import { curate, shufflePool } from '@/lib/giftSelect';

const URL = 'https://thegiftshuffle.com/30th-birthday-gifts';

export const metadata: Metadata = {
  title: '30th Birthday Gifts: 30 Ideas to Mark the Milestone (2026) | TheGiftShuffle',
  description:
    'The best 30th birthday gifts for 2026: 30 top-rated, milestone-worthy ideas for him and her, from upgraded everyday luxuries to experiences worth remembering.',
  keywords: [
    '30th birthday gifts',
    '30th birthday gift ideas',
    'milestone birthday gifts',
    '30th birthday gifts for her',
    '30th birthday gifts for him',
    'gifts for 30th birthday',
    'best 30th birthday gifts',
    'thirtieth birthday gifts',
  ],
  openGraph: {
    title: '30th Birthday Gifts: 30 Ideas to Mark the Milestone (2026) | TheGiftShuffle',
    description: '30 top-rated, milestone-worthy 30th birthday gift ideas for him and her. Every budget covered.',
    type: 'website',
    url: URL,
    images: [{ url: 'https://www.thegiftshuffle.com/api/og?title=30th%20Birthday%20Gifts%20%7C%20TheGiftShuffle', width: 1200, height: 630 }],
  },
  alternates: { canonical: URL },
};

const match = (p: { occasions?: string[] }) => !!p.occasions?.includes('birthday');
const grid = curate({
  match,
  minPrice: 25,
  sort: 'social',
  excludeRecipients: ['baby', 'pets', 'kids', 'teens'],
});
const shuffle = shufflePool(match);

export default function Page() {
  return (
    <GiftGuideTemplate
      canonicalUrl={URL}
      schemaName="30th Birthday Gifts"
      schemaDescription="The best 30th birthday gift ideas, curated by TheGiftShuffle"
      breadcrumbLabel="30th Birthday Gifts"
      breadcrumbHref="/30th-birthday-gifts"
      heroSrc="/images/heroes/30th-birthday-gifts.jpg"
      heroAlt="30th birthday gifts with celebration balloons and confetti"
      h1="30th Birthday Gifts"
      intro={
        <>
          <p>
            Turning 30 is a milestone, and these <strong>30 best 30th birthday gifts</strong> are
            chosen to match the moment. Each pick is top-rated and a little more elevated than an
            everyday gift, the kind of upgrade someone appreciates more at 30 than they would have
            at 20.
          </p>
          <p className="text-base text-gray-600">
            Whether you are shopping for him or her, this list balances practical luxury with
            experiences worth remembering, at every budget. Scroll the picks below, or hit shuffle
            for a fresh idea every click.
          </p>
        </>
      }
      shuffleHeading="Shuffle 30th Birthday Picks"
      shuffleProducts={shuffle}
      gridHeading="30 Best 30th Birthday Gifts, Ranked"
      gridProducts={grid}
      ctaHeading="Want to Make the Milestone Memorable?"
      ctaText="Tell TheGiftShuffle who is turning 30 and your budget, and get an instant gift idea in one click."
      faqs={[
        { q: 'What are the best 30th birthday gifts?', a: 'The best 30th birthday gifts lean into practical luxury, the upgrades someone appreciates more at this stage: a quality watch, a premium coffee setup, noise-canceling headphones, an Ember mug, a nice bottle with a personalized accessory, or an experience like a tasting or weekend away. Thirty is the age to upgrade an everyday ritual.' },
        { q: 'What is a good 30th birthday gift for her?', a: 'For her, milestone-worthy 30th birthday gifts include fine or personalized jewelry, a luxe skincare or fragrance set, a premium handbag or wallet, a spa or experience gift, or an upgraded version of a daily favorite. Pair it with something personal for extra impact.' },
        { q: 'What is a good 30th birthday gift for him?', a: 'For him, strong 30th birthday gifts include a quality watch, a premium whiskey or cocktail kit, noise-canceling headphones, a leather everyday-carry upgrade, or an experience tied to a hobby. The theme is upgrading something he uses or loves.' },
        { q: 'What is a memorable milestone birthday gift?', a: 'Milestone birthdays are the moment to go experiential or heirloom: a custom keepsake, a planned trip or experience, a piece that lasts for years, or a meaningful upgrade to a daily ritual. Memorable comes from significance, not just price.' },
        { q: 'What are good 30th birthday gifts on a budget?', a: 'Under $50, thoughtful 30th birthday gifts include a personalized keepsake, a premium candle or barware set, a quality everyday accessory, or a curated experience-in-a-box. Make it feel a notch more grown-up than a standard birthday gift and it suits the milestone.' },
      ]}
      relatedHeading="More Birthday Gift Guides"
      relatedLinks={[
        { href: '/best-birthday-gifts-2026', label: 'Best Birthday Gifts 2026' },
        { href: '/unique-birthday-gifts', label: 'Unique Birthday Gifts' },
        { href: '/birthday-gift-ideas', label: 'Birthday Gift Ideas' },
        { href: '/birthday-gifts-for-gamers', label: 'Birthday Gifts for Gamers' },
        { href: '/gift-ideas-for-him', label: 'Gift Ideas for Him' },
        { href: '/gift-ideas-for-her', label: 'Gift Ideas for Her' },
      ]}
    />
  );
}
