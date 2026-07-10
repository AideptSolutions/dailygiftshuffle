import type { Metadata } from 'next';
import GiftGuideTemplate from '@/components/GiftGuideTemplate';
import { curate, shufflePool, ALL } from '@/lib/giftSelect';

const URL = 'https://www.thegiftshuffle.com/best-gaming-gifts-2026';

export const metadata: Metadata = {
  title: 'Best Gaming Gifts for 2026: 38 Top-Rated Picks for Gamers | TheGiftShuffle',
  description:
    'The best gaming gifts for 2026: top-rated headsets, mechanical keyboards, controllers, stream decks and RGB gear for PC, PlayStation and Xbox gamers, every budget.',
  keywords: [
    'best gaming gifts 2026',
    'gaming gifts',
    'gifts for gamers',
    'best gifts for gamers 2026',
    'best gamer gifts 2026',
    'gaming gift ideas',
    'best pc gaming gifts 2026',
    'gifts for gamers under 50',
  ],
  openGraph: {
    title: 'Best Gaming Gifts for 2026: 38 Top-Rated Picks for Gamers | TheGiftShuffle',
    description: 'The best gaming gifts for 2026 for PC, PlayStation and Xbox gamers. Every budget covered.',
    type: 'website',
    url: URL,
    images: [{ url: 'https://www.thegiftshuffle.com/api/og?title=Best%20Gaming%20Gifts%202026%20%7C%20TheGiftShuffle', width: 1200, height: 630 }],
  },
  alternates: { canonical: URL },
};

const match = (p: { tags?: string[] }) => !!p.tags?.includes('gaming');
const grid = curate({ match, minRating: 4.3, sort: 'social', recipientCap: 50, limit: 40, pool: ALL });
const shuffle = shufflePool(match, ALL);

export default function Page() {
  return (
    <GiftGuideTemplate
      canonicalUrl={URL}
      schemaName="Best Gaming Gifts for 2026"
      schemaDescription="The best gaming gifts for 2026, curated by TheGiftShuffle"
      breadcrumbLabel="Best Gaming Gifts 2026"
      breadcrumbHref="/best-gaming-gifts-2026"
      heroSrc="/images/heroes/best-gaming-gifts-2026.jpg"
      heroAlt="The best gaming gifts for 2026 including keyboard, headset and RGB gear"
      h1="The Best Gaming Gifts for 2026"
      intro={
        <>
          <p>
            These are the <strong>best gaming gifts for 2026</strong>, top-rated upgrades to the
            gear gamers actually live in: headsets, mechanical keyboards, precision mice, stream
            decks and the RGB lighting that ties a setup together. Every pick works whether they
            game on PC, PlayStation or Xbox.
          </p>
          <p className="text-base text-gray-600">
            Not a gamer yourself? Stick to the cross-platform gear here, confirm their console, and
            you will hand over something they genuinely wanted. Budgets run from a sub-$25 accessory
            to a flagship centerpiece upgrade.
          </p>
        </>
      }
      shuffleHeading="Shuffle Gaming Gift Picks"
      shuffleProducts={shuffle}
      gridHeading="38 Best Gaming Gifts, Ranked"
      gridProducts={grid}
      ctaHeading="Not Sure Which Upgrade to Pick?"
      ctaText="Tell TheGiftShuffle who it is for and your budget, and get an instant gaming gift idea in one click."
      faqs={[
        { q: 'What are the best gaming gifts for 2026?', a: 'The best gaming gifts in 2026 are upgrades to the gear gamers use most: a wireless headset like the SteelSeries Arctis Nova or HyperX Cloud II, a mechanical keyboard, a high-precision wireless mouse, an Elgato Stream Deck for streamers, or RGB lighting to finish the setup. Match the gift to their platform and it always lands.' },
        { q: 'What are good gaming gifts under $50?', a: 'Under $50, the standout gaming gifts are a quality wired headset, controller thumb-grip sets, an extended RGB mouse pad, a controller charging station, or a wall mount to show off their controllers. Inexpensive but genuinely used every day.' },
        { q: 'What do you get a gamer who has everything?', a: 'For the gamer who has it all, go for finishing-touch upgrades: an Elgato Stream Deck, a premium gaming chair, RGB ambient lighting, a wireless charging station, or platform-specific collector accessories. These polish the setup rather than duplicating what they own.' },
        { q: 'What is the best gaming gift for a PC gamer?', a: 'PC gamers value precision and comfort: a flagship mechanical keyboard, a lightweight high-DPI wireless mouse, a large extended mouse pad, a quality headset, or a webcam and microphone if they stream. These improve the experience across every title.' },
        { q: 'How do you pick a gaming gift if you are not a gamer?', a: 'Stick to gear that works across every game: a comfortable headset, a good mouse pad, controller accessories, or RGB lighting. Just confirm their platform (PC, PlayStation or Xbox) before buying anything controller or console specific.' },
      ]}
      relatedHeading="More Gift Guides"
      relatedLinks={[
        { href: '/retro-gaming-gifts', label: 'Retro Gaming Gifts' },
        { href: '/category/gaming', label: 'All Gaming Gifts' },
        { href: '/birthday-gifts-for-gamers', label: 'Birthday Gifts for Gamers' },
        { href: '/gift-ideas-for-teens', label: 'Gift Ideas for Teens' },
        { href: '/gift-ideas-for-him', label: 'Gift Ideas for Him' },
        { href: '/gifts-under-50', label: 'Gifts Under $50' },
        { href: '/gifts-under-100', label: 'Gifts Under $100' },
      ]}
    />
  );
}
