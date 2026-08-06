import type { Metadata } from 'next';
import GiftGuideTemplate from '@/components/GiftGuideTemplate';
import { curate, shufflePool, ALL } from '@/lib/giftSelect';

const URL = 'https://www.thegiftshuffle.com/gift-ideas-for-brother';

export const metadata: Metadata = {
  title: 'Gift Ideas for Your Brother: 40 Picks He Will Actually Use (2026) | TheGiftShuffle',
  description:
    'The best gift ideas for your brother in 2026: top-rated picks for big brothers, little brothers and brothers-in-law, from tech and gaming to practical upgrades at every budget.',
  keywords: [
    'gift ideas for brother',
    'gifts for brother',
    'best gifts for brother',
    'birthday gifts for brother',
    'christmas gifts for brother',
    'gifts for big brother',
    'gifts for little brother',
    'gifts for brother in law',
  ],
  openGraph: {
    title: 'Gift Ideas for Your Brother: 40 Picks He Will Actually Use (2026) | TheGiftShuffle',
    description: 'Top-rated gift ideas for big brothers, little brothers and brothers-in-law at every budget.',
    type: 'website',
    url: URL,
    images: [{ url: 'https://www.thegiftshuffle.com/api/og?title=Gift%20Ideas%20for%20Brother%20%7C%20TheGiftShuffle', width: 1200, height: 630 }],
  },
  alternates: { canonical: URL },
};

// Brother-tagged items lead the pool; broaden with him-suited picks since the
// dedicated brother recipient set is small.
const match = (p: { recipients?: string[] }) =>
  !!(p.recipients?.includes('brother') || p.recipients?.includes('him') || p.recipients?.includes('teens'));
const grid = curate({ match, minPrice: 15, minRating: 4.5, sort: 'social', recipientCap: 30, limit: 40, pool: ALL });
const shuffle = shufflePool(match, ALL);

export default function Page() {
  return (
    <GiftGuideTemplate
      canonicalUrl={URL}
      schemaName="Gift Ideas for Your Brother"
      schemaDescription="The best gift ideas for your brother in 2026, curated by TheGiftShuffle"
      breadcrumbLabel="Gift Ideas for Brother"
      breadcrumbHref="/gift-ideas-for-brother"
      heroSrc="/images/heroes/gift-ideas-for-brother.jpg"
      heroAlt="A gift for a brother wrapped in kraft paper"
      h1="Gift Ideas for Your Brother"
      intro={
        <>
          <p>
            Brothers are famously hard to shop for and famously easy to please once you find the
            lane. These <strong>top-rated gift ideas for brothers</strong> cover the gamer, the gym
            guy, the new-apartment brother and the brother-in-law you see at holidays: tech he
            wants, gear he uses and a few things guaranteed to get a laugh.
          </p>
          <p className="text-base text-gray-600">
            Works for birthdays, holidays or a just-because moment. Hit shuffle for a fresh idea
            every click, or browse the ranked list below.
          </p>
        </>
      }
      answer={{
        heading: 'What Should I Get My Brother?',
        body: (
          <p>
            The gifts brothers actually use are <strong>tied to their thing</strong>: gaming gear for
            the gamer, gym accessories for the lifter, tools or grill gear for the new homeowner,
            earbuds or a smartwatch for the commuter, or a quality wallet and watch upgrade for the
            one who never buys nice things for himself. When in doubt, a top-rated gadget or a funny
            gift with real utility, like a giant coffee mug, always lands with a brother. For a
            brother-in-law, keep it practical and low-risk. Not sure? Hit shuffle below.
          </p>
        ),
      }}
      shuffleHeading="Shuffle Gifts for Your Brother"
      shuffleProducts={shuffle}
      gridHeading="Top-Rated Gifts for Brothers, Ranked"
      gridProducts={grid}
      ctaHeading="Brothers Never Say What They Want"
      ctaText="Tell TheGiftShuffle a little about him and your budget, and get an instant idea he will actually use."
      faqs={[
        { q: 'What is a good gift for my brother?', a: 'Good brother gifts are tied to his main interest: gaming gear, gym accessories, tools or grill equipment, tech like earbuds or a smartwatch, or an upgrade to a daily item like his wallet or tumbler. Practical with a bit of personality beats generic every time.' },
        { q: 'What should I get my brother for his birthday?', a: 'For his birthday, pick the hobby he spends the most time on and buy the top-rated accessory in that lane: a headset for the gamer, a massage gun for the lifter, a multi-tool for the DIY guy. Add something funny as a second small gift and you have the full brother formula.' },
        { q: 'What is a good gift for a brother-in-law?', a: 'For a brother-in-law, safe and useful wins: a quality insulated tumbler, grilling accessories, a multi-tool, bold socks in a gift box, gourmet hot sauce, or a top-rated gadget under $50. Practical picks with mass appeal avoid taste guessing.' },
        { q: 'What are good gifts for a teenage brother?', a: 'Teen brothers want gaming accessories, headphones or earbuds, LED room lighting, a fun desk gadget, trendy socks or hoodies, and snacks. Whatever he is into online, buy the top-rated real-world version of it.' },
        { q: 'What are good gifts for my brother under $50?', a: 'Under $50, reliable picks are a credit-card multitool, a keychain flashlight, hot sauce or beef jerky sets, gaming accessories like grips or an RGB mouse pad, fun socks, or an insulated tumbler. Useful, giftable and zero size guessing.' },
      ]}
      relatedHeading="More Gift Guides"
      relatedLinks={[
        { href: '/gift-ideas-for-him', label: 'Gift Ideas for Him' },
        { href: '/gift-ideas-for-sister', label: 'Gift Ideas for Sister' },
        { href: '/gifts-for-teenage-boys', label: 'Gifts for Teenage Boys' },
        { href: '/best-gaming-gifts-2026', label: 'Best Gaming Gifts 2026' },
        { href: '/gifts-under-50', label: 'Gifts Under $50' },
        { href: '/birthday-gift-ideas', label: 'Birthday Gift Ideas' },
      ]}
    />
  );
}
