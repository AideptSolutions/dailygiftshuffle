import type { Metadata } from 'next';
import GiftGuideTemplate from '@/components/GiftGuideTemplate';
import { curate, shufflePool, ALL } from '@/lib/giftSelect';

const URL = 'https://www.thegiftshuffle.com/retro-gaming-gifts';

export const metadata: Metadata = {
  title: 'Retro Gaming Gifts: Nostalgic Picks Gamers Love in 2026 | TheGiftShuffle',
  description:
    'The best retro gaming gifts for 2026: nostalgic arcade machines, 8-bit decor, classic console accessories and pixel-art picks for the gamer who grew up on the classics.',
  keywords: [
    'retro gaming gifts',
    'retro gamer gifts',
    'gifts for retro gamers',
    'arcade gifts',
    'nostalgic gaming gifts',
    'classic gaming gifts',
    '8 bit gifts',
    'retro video game gifts',
  ],
  openGraph: {
    title: 'Retro Gaming Gifts: Nostalgic Picks Gamers Love in 2026 | TheGiftShuffle',
    description: 'Nostalgic retro gaming gifts for 2026: arcade machines, 8-bit decor and classic console picks.',
    type: 'website',
    url: URL,
    images: [{ url: 'https://www.thegiftshuffle.com/api/og?title=Retro%20Gaming%20Gifts%20%7C%20TheGiftShuffle', width: 1200, height: 630 }],
  },
  alternates: { canonical: URL },
};

const RETRO = /retro|arcade|\bnes\b|snes|8-?bit|16-?bit|pixel|tetris|pac-?man|cartridge|game ?boy|atari/i;
const match = (p: { tags?: string[]; name?: string }) =>
  !!p.tags?.includes('gaming') && RETRO.test(p.name ?? '');
const grid = curate({ match, minRating: 4.3, sort: 'social', recipientCap: 30, limit: 30, pool: ALL });
const shuffle = shufflePool(match, ALL);

export default function Page() {
  return (
    <GiftGuideTemplate
      canonicalUrl={URL}
      schemaName="Retro Gaming Gifts"
      schemaDescription="The best retro gaming gifts for 2026, curated by TheGiftShuffle"
      breadcrumbLabel="Retro Gaming Gifts"
      breadcrumbHref="/retro-gaming-gifts"
      heroSrc="/images/heroes/best-gaming-gifts-2026.jpg"
      heroAlt="Retro gaming gifts including an arcade machine and classic console decor"
      h1="Retro Gaming Gifts"
      intro={
        <>
          <p>
            These are the <strong>best retro gaming gifts</strong> for the player who grew up on
            arcades, cartridges and 8-bit classics. Every pick leans into nostalgia, from countertop
            arcade cabinets to pixel-art decor and classic console accessories.
          </p>
          <p className="text-base text-gray-600">
            Whether they still have the original console hooked up or just love the aesthetic, these
            gifts hit the nostalgia note without breaking the bank. Scroll the picks below, or hit
            shuffle for a fresh idea every click.
          </p>
        </>
      }
      shuffleHeading="Shuffle Retro Gaming Picks"
      shuffleProducts={shuffle}
      gridHeading="Best Retro Gaming Gifts, Ranked"
      gridProducts={grid}
      ctaHeading="Not Sure Which Retro Pick to Get?"
      ctaText="Tell TheGiftShuffle who it is for and your budget, and get an instant gamer gift idea in one click."
      faqs={[
        { q: 'What are the best retro gaming gifts?', a: 'The best retro gaming gifts lean into nostalgia: a countertop arcade machine, a stackable Tetris light, NES cartridge coasters, a classic controller plush, or a working mini-arcade keychain. Match the gift to the era they grew up on and it always lands.' },
        { q: 'What is a good retro gaming gift on a budget?', a: 'Under $25, retro cartridge coasters, a controller plush pillow, a mini-arcade keychain, or 8-bit decor are inexpensive but genuinely fun. They scratch the nostalgia itch without a big spend.' },
        { q: 'What do you get a retro gamer who has every console?', a: 'For the collector who owns the hardware, go for decor and experience instead: a countertop arcade cabinet, themed lighting, framed pixel art, or a premium reproduction controller. These complement the collection rather than duplicating it.' },
        { q: 'Are retro gaming gifts good for non-gamers too?', a: 'Many retro gaming gifts double as decor and pop-culture nostalgia, so they land with anyone who grew up in the 80s or 90s, not just active gamers. A Tetris light or arcade cabinet is as much design piece as toy.' },
        { q: 'What is the best retro gaming gift for a milestone birthday?', a: 'For a 30th, 40th or 50th birthday, a countertop arcade cabinet loaded with the games they grew up on is the showstopper gift. It is nostalgic, interactive, and becomes the centerpiece of the room.' },
      ]}
      relatedHeading="More Gift Guides"
      relatedLinks={[
        { href: '/best-gaming-gifts-2026', label: 'Best Gaming Gifts 2026' },
        { href: '/birthday-gifts-for-gamers', label: 'Birthday Gifts for Gamers' },
        { href: '/category/gaming', label: 'All Gaming Gifts' },
        { href: '/gift-ideas-for-him', label: 'Gift Ideas for Him' },
        { href: '/gift-ideas-for-teens', label: 'Gift Ideas for Teens' },
        { href: '/best-luxury-gifts-2026', label: 'Best Luxury Gifts 2026' },
      ]}
    />
  );
}
