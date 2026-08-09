import type { Metadata } from 'next';
import GiftGuideTemplate from '@/components/GiftGuideTemplate';
import { curate, shufflePool, ALL } from '@/lib/giftSelect';

const URL = 'https://www.thegiftshuffle.com/christmas-gifts-for-him';

export const metadata: Metadata = {
  title: 'Christmas Gifts for Him 2026: 45 Ideas He Will Actually Use | TheGiftShuffle',
  description:
    'The best Christmas gifts for him in 2026: top-rated ideas for your husband, boyfriend, dad or brother, from tech and tools to cozy upgrades, at every budget.',
  keywords: [
    'christmas gifts for him',
    'christmas gift ideas for him',
    'christmas gifts for husband',
    'christmas gifts for boyfriend',
    'christmas gifts for dad',
    'best christmas gifts for him 2026',
    'christmas gifts for men',
    'unique christmas gifts for him',
  ],
  openGraph: {
    title: 'Christmas Gifts for Him 2026: 45 Ideas He Will Actually Use | TheGiftShuffle',
    description: 'Top-rated Christmas gift ideas for your husband, boyfriend, dad or brother, at every budget.',
    type: 'website',
    url: URL,
    images: [{ url: 'https://www.thegiftshuffle.com/api/og?title=Christmas%20Gifts%20for%20Him%20%7C%20TheGiftShuffle', width: 1200, height: 630 }],
  },
  alternates: { canonical: URL },
};

const match = (p: { recipients?: string[]; occasions?: string[] }) =>
  !!(p.recipients?.includes('him') || p.recipients?.includes('dad')) &&
  !!(p.occasions?.includes('holiday') || p.occasions?.includes('christmas'));
const grid = curate({ match, minPrice: 15, minRating: 4.5, sort: 'social', recipientCap: 30, limit: 45, pool: ALL });
const shuffle = shufflePool(match, ALL);

export default function Page() {
  return (
    <GiftGuideTemplate
      canonicalUrl={URL}
      schemaName="Christmas Gifts for Him 2026"
      schemaDescription="The best Christmas gifts for him in 2026, curated by TheGiftShuffle"
      breadcrumbLabel="Christmas Gifts for Him"
      breadcrumbHref="/christmas-gifts-for-him"
      heroSrc="/images/heroes/christmas-gifts-for-him.jpg"
      heroAlt="Christmas gifts for him wrapped in kraft paper with festive trim"
      h1="Christmas Gifts for Him"
      intro={
        <>
          <p>
            These are the <strong>best Christmas gifts for him in 2026</strong>: top-rated picks for
            your husband, boyfriend, dad or brother that he will genuinely use, not politely shelve.
            Tech he wants, tools he trusts, gear for his hobbies and a few cozy upgrades he would
            never buy himself.
          </p>
          <p className="text-base text-gray-600">
            Every budget is covered, from stocking-size wins to a big-morning centerpiece. Hit
            shuffle for a fresh idea every click, or browse the ranked picks below.
          </p>
        </>
      }
      answer={{
        heading: 'What Should I Get Him for Christmas?',
        body: (
          <p>
            The Christmas gifts that land best for him are <strong>upgrades to things he already
            does</strong>: noise-canceling headphones or earbuds, a quality watch or wallet, grilling
            and BBQ gear, a great multi-tool, gear for his hobby, gaming, golf, the gym, the garage,
            or a premium version of a daily item like his tumbler or dopp kit. Skip novelty and
            upgrade something real. Match it to one hobby or habit you know he has and it beats any
            generic gift: the 45 picks on this page average <strong>4.7 stars across more than 3.1
            million verified Amazon reviews</strong> combined. Not sure? Hit shuffle below for an
            instant idea in your budget.
          </p>
        ),
      }}
      shuffleHeading="Shuffle Christmas Gifts for Him"
      shuffleProducts={shuffle}
      gridHeading="Top-Rated Christmas Gifts for Him, Ranked"
      gridProducts={grid}
      ctaHeading="Still Not Sure What He Would Use?"
      ctaText="Tell TheGiftShuffle who he is and your budget, and get an instant, top-rated Christmas gift idea in one click."
      faqs={[
        { q: 'What are the best Christmas gifts for him in 2026?', a: 'The best Christmas gifts for him in 2026 are practical upgrades: noise-canceling headphones, a quality watch or leather wallet, grilling accessories, a rugged multi-tool, gaming gear, or a premium daily-carry item. The pattern that wins is upgrading something he already uses every week.' },
        { q: 'What should I get my husband for Christmas?', a: 'For a husband, aim for the hobby he loves or the daily ritual he never upgrades: premium headphones, a smoker or grill accessory set, a nice watch, quality tools, or an experience you can share. Personal beats generic, so tie it to something he has mentioned wanting.' },
        { q: 'What should I get my boyfriend for Christmas?', a: 'For a boyfriend, reliable wins are earbuds or headphones, a sleek wallet or watch, gaming gear if he plays, a hoodie-and-cozy upgrade, or tickets to something you can do together. Reference his specific interests and keep it fun rather than formal.' },
        { q: 'What are good Christmas gifts for dad?', a: 'Dads appreciate useful over flashy: a grilling tool set, a multi-tool or compact flashlight, an insulated tumbler, a bag of great coffee with a nice mug, or gear for his hobby. If he says he needs nothing, upgrade something worn out; he will use it daily.' },
        { q: 'What are good Christmas gifts for him under $50?', a: 'Under $50, strong picks include a credit-card multitool, bold socks in a gift box, gourmet hot sauce, a keychain flashlight, an insulated tumbler, a grooming kit, or a fun desk gadget for the office. Practical with personality is the sweet spot.' },
      ]}
      relatedHeading="More Holiday Gift Guides"
      relatedLinks={[
        { href: '/christmas-gift-ideas', label: 'Christmas Gift Ideas' },
        { href: '/christmas-gifts-for-her', label: 'Christmas Gifts for Her' },
        { href: '/gift-ideas-for-him', label: 'Gift Ideas for Him' },
        { href: '/gift-ideas-for-dad', label: 'Gift Ideas for Dad' },
        { href: '/stocking-stuffers', label: 'Stocking Stuffers' },
        { href: '/best-gaming-gifts-2026', label: 'Best Gaming Gifts 2026' },
      ]}
    />
  );
}
