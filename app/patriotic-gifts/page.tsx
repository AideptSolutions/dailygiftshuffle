import type { Metadata } from 'next';
import GiftGuideTemplate from '@/components/GiftGuideTemplate';
import { byTheme } from '@/data/seasonal-products';

const URL = 'https://www.thegiftshuffle.com/patriotic-gifts';
const products = byTheme('patriotic');

export const metadata: Metadata = {
  title: 'Patriotic Gifts: American Flag Gift Ideas for 2026 | TheGiftShuffle',
  description:
    'The best patriotic gifts for 2026: American flag apparel, USA accessories, red-white-and-blue gear, and Americana decor for Independence Day, Memorial Day, Veterans Day, and year-round. Hand-picked, every budget.',
  keywords: [
    'patriotic gifts',
    'american flag gifts',
    'usa gifts',
    'patriotic gift ideas',
    'americana gifts',
    'red white and blue gifts',
    'gifts for veterans',
    'memorial day gifts',
  ],
  openGraph: {
    title: 'Patriotic Gifts: American Flag Gift Ideas for 2026 | TheGiftShuffle',
    description:
      'American flag apparel, USA accessories, and Americana decor. The best patriotic gifts for 2026, for every patriotic occasion.',
    type: 'website',
    url: URL,
    images: [{ url: 'https://www.thegiftshuffle.com/api/og?title=Patriotic%20Gifts%20%7C%20TheGiftShuffle', width: 1200, height: 630 }],
  },
  alternates: { canonical: URL },
};

export default function PatrioticGiftsPage() {
  return (
    <GiftGuideTemplate
      canonicalUrl={URL}
      schemaName="Patriotic Gifts"
      schemaDescription="The best patriotic and American flag gift ideas, curated by TheGiftShuffle"
      breadcrumbLabel="Patriotic Gifts"
      breadcrumbHref="/patriotic-gifts"
      heroSrc="/images/heroes/patriotic-gifts-evergreen.jpg"
      heroAlt="An American flag waving against a blue sky"
      h1="Patriotic Gifts: American Flag & USA Gift Ideas"
      intro={
        <>
          <p>
            These are the best <strong>patriotic gifts</strong> for 2026 &mdash; American flag
            apparel, USA accessories, and Americana decor for the person who flies the flag proudly
            all year, for Independence Day, Memorial Day, Veterans Day, a new home, or just because.
          </p>
          <p className="text-base text-gray-600">
            Star-spangled tees, tumblers, hats, and decor at every budget, all hand-picked. Scroll
            the picks, or hit shuffle for a fresh patriotic idea every click.
          </p>
        </>
      }
      shuffleHeading="Shuffle Patriotic Picks"
      shuffleProducts={products}
      gridHeading="Top Patriotic & American Flag Gifts"
      gridProducts={products}
      ctaHeading="Need a Patriotic Gift Fast?"
      ctaText="Tell TheGiftShuffle who it is for and your budget, and get an instant red-white-and-blue gift idea in one click."
      faqs={[
        { q: 'What are good patriotic gifts?', a: 'The best patriotic gifts work all year: American flag apparel (tees, hats, bucket hats), a durable embroidered outdoor US flag, an insulated USA tumbler, a flag trucker hat, and patriotic socks. Pick something they can wear, use, or display and you cannot go wrong. They are also perfect for the 4th of July, Memorial Day, and Veterans Day.' },
        { q: 'What are good patriotic gifts beyond the 4th of July?', a: 'Patriotic gifts work year-round for Memorial Day, Veterans Day, election season, and new homeowners: a durable embroidered outdoor American flag, a flag door wreath, an everyday flag trucker hat, or an insulated USA tumbler. These show pride without being tied to a single holiday.' },
        { q: 'What is a good patriotic gift under $25?', a: 'Under $25, strong patriotic gifts include an American flag bandana, a 3-pack of stars-and-stripes socks, a USA trucker hat, a flag beach towel, or a patriotic headband set. Small, festive, and easy to pair with a card.' },
        { q: 'What do you get someone who loves America?', a: 'For the truly patriotic, go for a quality embroidered outdoor flag, a We the People insulated tumbler, a flag-print cooler backpack for tailgates, or a full American flag cape for the person who commits to the bit. Match the gift to whether they decorate, grill, or celebrate loudest.' },
        { q: 'What are good patriotic gifts for a 4th of July party?', a: 'For a party, think shareable and photogenic: flag bucket hats and capes for the group, patriotic headbands, a stars-and-stripes apron for the grill master, festive tumblers, and a flag door wreath to greet guests. Outfit the whole crew and the photos take care of themselves.' },
      ]}
      relatedHeading="More Gift Guides"
      relatedLinks={[
        { href: '/world-cup-gifts', label: 'World Cup Gifts' },
        { href: '/best-camping-gifts', label: 'Camping & Outdoor Gifts' },
        { href: '/gift-ideas-for-dad', label: 'Gift Ideas for Dad' },
        { href: '/best-gifts-for-her-2026', label: 'Best Gifts for Her' },
        { href: '/gifts-under-50', label: 'Gifts Under $50' },
        { href: '/gifts-under-25', label: 'Gifts Under $25' },
      ]}
    />
  );
}
