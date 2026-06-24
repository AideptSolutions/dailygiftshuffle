import type { Metadata } from 'next';
import GiftGuideTemplate from '@/components/GiftGuideTemplate';
import { byTheme } from '@/data/seasonal-products';

const URL = 'https://www.thegiftshuffle.com/world-cup-gifts';
const products = byTheme('worldcup');

export const metadata: Metadata = {
  title: 'World Cup 2026 Gifts: Soccer Fan Gift Ideas | TheGiftShuffle',
  description:
    'The best World Cup 2026 gifts for soccer fans: USA & Argentina jerseys, fan scarves, official soccer balls, foosball, a Messi Funko, and watch-party gear. Every budget.',
  keywords: [
    'world cup gifts',
    'world cup 2026 gifts',
    'soccer fan gifts',
    'soccer gifts',
    'gifts for soccer fans',
    'usmnt gifts',
    'soccer gift ideas',
    'world cup party',
  ],
  openGraph: {
    title: 'World Cup 2026 Gifts: Soccer Fan Gift Ideas | TheGiftShuffle',
    description:
      'Jerseys, fan scarves, soccer balls, foosball, a Messi Funko, and watch-party gear. The best World Cup 2026 gifts for soccer fans.',
    type: 'website',
    url: URL,
    images: [{ url: 'https://www.thegiftshuffle.com/api/og?title=World%20Cup%202026%20Gifts%20%7C%20TheGiftShuffle', width: 1200, height: 630 }],
  },
  alternates: { canonical: URL },
};

export default function WorldCupGiftsPage() {
  return (
    <GiftGuideTemplate
      canonicalUrl={URL}
      schemaName="World Cup 2026 Gifts"
      schemaDescription="The best World Cup 2026 gifts for soccer fans, curated by TheGiftShuffle"
      breadcrumbLabel="World Cup Gifts"
      breadcrumbHref="/world-cup-gifts"
      heroSrc="/images/heroes/world-cup-gifts.jpg"
      heroAlt="A soccer ball on the pitch with cheering fans in a stadium"
      h1="World Cup 2026 Gifts for Soccer Fans"
      intro={
        <>
          <p>
            The world&apos;s biggest tournament is here, and it is on home soil. These are the best{' '}
            <strong>World Cup 2026 gifts</strong> for the soccer fans in your life: national-team
            jerseys and scarves, official-design match balls, a Messi Funko, foosball for halftime,
            and everything you need to throw a watch party.
          </p>
          <p className="text-base text-gray-600">
            From a stocking-stuffer pair of grip socks to a splurge-worthy Argentina kit, every pick
            is hand-chosen for fans and players alike. Scroll the picks below, or hit shuffle for a
            fresh soccer gift idea every click.
          </p>
        </>
      }
      shuffleHeading="Shuffle Soccer Gift Picks"
      shuffleProducts={products}
      gridHeading="Top World Cup & Soccer Fan Gifts"
      gridProducts={products}
      ctaHeading="Not Sure What Your Fan Wants?"
      ctaText="Tell TheGiftShuffle who it is for and your budget, and get an instant soccer gift idea in one click."
      faqs={[
        { q: 'What are good gifts for soccer fans?', a: 'The best soccer fan gifts are wearable and watch-party ready: their national-team jersey or a supporters scarf, an official-design match ball, a Messi or favorite-player Funko, soccer-themed glassware, and foosball or a rebound net for the active fan. Match the gift to their team and it always lands.' },
        { q: 'What are good World Cup 2026 gifts?', a: 'For the 2026 World Cup, think fan gear and party gear: a USA Soccer scarf, an Adidas or Nike match ball, a country jersey for their favorite side, a soccer party kit for watch parties, and a Funko of a star player. The tournament being hosted in North America makes it the perfect summer to gift soccer.' },
        { q: 'What is a good soccer gift for kids?', a: 'For young players, the standouts are a quality size-5 ball, anti-slip grip socks, a backyard rebound net to practice solo, and a Funko of their favorite star. Practical gear that builds skills beats novelty for kids who actually play.' },
        { q: 'What is a good soccer gift under $25?', a: 'Under $25, strong soccer gifts include a USA fan scarf, grip socks, a soccer drinking glass, a Messi Funko Pop, or a soccer party-supplies set. Festive, fan-worthy, and easy to pair with a card.' },
        { q: 'What is a good splurge gift for a soccer fan?', a: 'For a splurge, an authentic national-team jersey (an Argentina Messi #10 kit is a dream for many) or a premium ball-and-gear bundle makes a statement. Pick their team and their favorite player and it becomes a keepsake.' },
      ]}
      relatedHeading="More Gift Guides"
      relatedLinks={[
        { href: '/patriotic-gifts', label: '4th of July & Patriotic Gifts' },
        { href: '/gift-ideas-for-him', label: 'Gift Ideas for Him' },
        { href: '/gift-ideas-for-teens', label: 'Gift Ideas for Teens' },
        { href: '/gift-ideas-for-kids', label: 'Gift Ideas for Kids' },
        { href: '/best-gaming-gifts-2026', label: 'Best Gaming Gifts' },
        { href: '/gifts-under-50', label: 'Gifts Under $50' },
      ]}
    />
  );
}
