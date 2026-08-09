import type { Metadata } from 'next';
import GiftGuideTemplate from '@/components/GiftGuideTemplate';
import { curate, shufflePool, ALL } from '@/lib/giftSelect';

const URL = 'https://www.thegiftshuffle.com/secret-santa-gifts';

export const metadata: Metadata = {
  title: 'Best Secret Santa Gifts 2026: 35 Ideas for Coworkers & Friends | TheGiftShuffle',
  description:
    'The best secret santa gift ideas for 2026: thoughtful, safe-but-not-boring picks under $50 for coworkers, friends and family exchanges. Ideas for the person you barely know.',
  keywords: [
    'secret santa gifts',
    'secret santa gift ideas',
    'best secret santa gifts 2026',
    'secret santa gifts for coworkers',
    'secret santa gifts under 25',
    'secret santa gifts under 50',
    'office secret santa ideas',
    'secret santa for someone you dont know',
  ],
  openGraph: {
    title: 'Best Secret Santa Gifts 2026: 35 Ideas for Coworkers & Friends | TheGiftShuffle',
    description: 'Thoughtful, safe-but-not-boring secret santa picks under $50 for any exchange.',
    type: 'website',
    url: URL,
    images: [{ url: 'https://www.thegiftshuffle.com/api/og?title=Secret%20Santa%20Gifts%20%7C%20TheGiftShuffle', width: 1200, height: 630 }],
  },
  alternates: { canonical: URL },
};

// Broadly likeable picks in the classic secret santa budget window. Leans on
// coworker/friends-suitable items with high social proof.
// Office-exchange lane: $20-50 and suited to a coworker or friend. Keeps this
// distinct from /white-elephant-gifts, which owns the cheaper gag-gift band.
const match = (p: { price?: number; recipients?: string[] }) =>
  (p.price ?? 999) <= 50 &&
  (p.price ?? 0) >= 20 &&
  !!p.recipients?.some((r) => ['coworker', 'friends', 'employees', 'him', 'her'].includes(r));
const grid = curate({ match, minRating: 4.6, sort: 'social', recipientCap: 8, limit: 35, pool: ALL });
const shuffle = shufflePool(match, ALL);

export default function Page() {
  return (
    <GiftGuideTemplate
      canonicalUrl={URL}
      schemaName="Best Secret Santa Gifts 2026"
      schemaDescription="The best secret santa gift ideas for 2026, curated by TheGiftShuffle"
      breadcrumbLabel="Secret Santa Gifts"
      breadcrumbHref="/secret-santa-gifts"
      heroSrc="/images/heroes/secret-santa-gifts.jpg"
      heroAlt="A neatly wrapped secret santa gift with a name tag"
      h1="Best Secret Santa Gifts for 2026"
      intro={
        <>
          <p>
            Drew a name you barely know? These are the <strong>best secret santa gifts</strong> for
            2026: thoughtful, broadly likeable picks under $50 that work for a coworker, a friend of
            a friend, or the in-law you see twice a year. Safe enough to never miss, good enough to
            never feel phoned in.
          </p>
          <p className="text-base text-gray-600">
            Every pick is top-rated with serious review counts, which is exactly what you want when
            you cannot ask them what they like. Shuffle for instant ideas or browse the list below.
          </p>
        </>
      }
      answer={{
        heading: 'What Should I Get for Secret Santa?',
        body: (
          <p>
            For secret santa, pick something <strong>broadly likeable and high quality</strong>: a
            premium candle, an insulated tumbler, a cozy blanket, gourmet chocolate or hot sauce, a
            fun desk accessory, a nice mug, or a top-rated gadget under the budget. Use the one thing
            you know about them, their desk, their coffee habit, their team, to pick a lane, keep it
            around the set budget of <strong>$20 to $50</strong>, and avoid anything too personal like
            perfume or clothing sizes. Not sure? Hit shuffle below with your budget for an instant
            crowd-pleaser.
          </p>
        ),
      }}
      shuffleHeading="Shuffle Secret Santa Ideas"
      shuffleProducts={shuffle}
      gridHeading="Crowd-Pleasing Secret Santa Gifts, Ranked"
      gridProducts={grid}
      ctaHeading="Drew a Name You Know Nothing About?"
      ctaText="Tell TheGiftShuffle the budget, and get an instant, safe-but-good gift idea in one click."
      faqs={[
        { q: 'What is a good secret santa gift for a coworker?', a: 'For a coworker, safe and appreciated picks are a quality insulated tumbler, a premium candle, a desk organizer or fun desk toy, gourmet coffee or chocolate, cozy socks, or a nice notebook. Office-appropriate, useful, and no personal-taste guessing required.' },
        { q: 'How much do you spend on secret santa?', a: 'Most secret santa exchanges set a budget of $20 to $30, and office exchanges sometimes $15 to $25. Spend right at the budget; the goal is maximizing thoughtfulness within the limit, not under- or over-shooting it.' },
        { q: 'What do you get for secret santa when you do not know the person?', a: 'When you barely know them, stay on universal ground: a top-rated candle, a nice tumbler or mug, quality chocolate, a cozy throw, or a clever desk accessory. Things with thousands of five-star reviews are the closest thing to a guaranteed hit.' },
        { q: 'What are good secret santa gifts under $25?', a: 'Under $25, strong picks include fun socks in a gift box, a scented candle, an insulated tumbler, a card game, gourmet hot sauce, a mini desk toy, hand cream, or a tea sampler. Small but well-made beats big and generic.' },
        { q: 'Should a secret santa gift be funny or practical?', a: 'Read the room: office exchanges usually reward practical with a touch of personality, while friend groups often want funny. A safe play is practical-but-fun, like a giant mug or a clever gadget, which lands in both settings. For pure gag gifts, see our white elephant guide.' },
      ]}
      relatedHeading="More Holiday Gift Guides"
      relatedLinks={[
        { href: '/white-elephant-gifts', label: 'White Elephant Gifts' },
        { href: '/stocking-stuffers', label: 'Stocking Stuffers' },
        { href: '/gifts-for-coworkers', label: 'Gifts for Coworkers' },
        { href: '/gifts-under-25', label: 'Gifts Under $25' },
        { href: '/gifts-under-50', label: 'Gifts Under $50' },
        { href: '/christmas-gift-ideas', label: 'Christmas Gift Ideas' },
      ]}
    />
  );
}
