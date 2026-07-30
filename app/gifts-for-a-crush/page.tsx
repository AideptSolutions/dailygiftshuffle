import type { Metadata } from 'next';
import GiftGuideTemplate from '@/components/GiftGuideTemplate';
import { curate, shufflePool, ALL } from '@/lib/giftSelect';

const URL = 'https://www.thegiftshuffle.com/gifts-for-a-crush';

export const metadata: Metadata = {
  title: 'Gifts for a Crush 2026: 30 Thoughtful (Not Too Much) Ideas | TheGiftShuffle',
  description:
    'Gift ideas for a crush or new love interest that are thoughtful but not too much: fun, sweet, mostly under-$50 picks for someone you just started dating or a guy or girl you like.',
  keywords: [
    'gifts for a crush',
    'gift ideas for my crush',
    'gift for someone i like',
    'gift for love interest',
    'early relationship gifts',
    'gift for someone i just started dating',
    'gift for a guy i like',
    'gift for a girl i like',
    'new relationship gift ideas',
  ],
  openGraph: {
    title: 'Gifts for a Crush 2026: 30 Thoughtful (Not Too Much) Ideas | TheGiftShuffle',
    description: 'Fun, sweet, not-too-much gift ideas for a crush or new love interest, mostly under $50.',
    type: 'website',
    url: URL,
    images: [{ url: 'https://www.thegiftshuffle.com/api/og?title=Gifts%20for%20a%20Crush%20%7C%20TheGiftShuffle', width: 1200, height: 630 }],
  },
  alternates: { canonical: URL },
};

// Early-relationship gifting: thoughtful, fun, and low-stakes. Keep it broadly
// unisex (a crush can be any gender) and capped in price so nothing reads as
// "too much" too soon.
const match = (p: { recipients?: string[]; price?: number }) =>
  !!(p.recipients?.includes('her') || p.recipients?.includes('him')) && (p.price ?? 999) <= 50;
const grid = curate({ match, minPrice: 10, minRating: 4.6, sort: 'social', recipientCap: 10, limit: 40, pool: ALL });
const shuffle = shufflePool(match, ALL);

export default function Page() {
  return (
    <GiftGuideTemplate
      canonicalUrl={URL}
      schemaName="Gifts for a Crush 2026"
      schemaDescription="Thoughtful, not-too-much gift ideas for a crush or new love interest, curated by TheGiftShuffle"
      breadcrumbLabel="Gifts for a Crush"
      breadcrumbHref="/gifts-for-a-crush"
      heroSrc="/images/heroes/gifts-for-a-crush.jpg"
      heroAlt="A few small cheerful wrapped gifts with ribbons"
      h1="Gifts for a Crush"
      intro={
        <>
          <p>
            Shopping for a <strong>crush or new love interest</strong> is a tightrope: you want
            something thoughtful, but not so much that it feels intense before you are there yet.
            These are the <strong>best gifts for a crush</strong> in 2026, fun, sweet and genuinely
            considered, that land the tone just right whether you just started dating or are still
            testing the waters.
          </p>
          <p className="text-base text-gray-600">
            Every pick is top-rated and mostly under $50, safe ground for a guy or a girl you like.
            Scroll the ideas below, or hit shuffle for an instant suggestion in your budget.
          </p>
        </>
      }
      answer={{
        heading: 'What Do You Get a Crush or New Love Interest?',
        body: (
          <p>
            For a crush, aim for <strong>thoughtful but light</strong>: something that shows you pay
            attention without declaring undying love. Safe, charming picks are their <strong>favorite
            snack or coffee</strong> done nicely, a <strong>book in a genre they love</strong>, a{' '}
            <strong>fun game or gadget</strong>, a <strong>quality candle or cozy item</strong>, or
            concert or movie tickets you can enjoy <strong>together</strong>. Keep it roughly{' '}
            <strong>under $50</strong>, tie it to something they have mentioned, and skip anything too
            personal or pricey this early. Not sure? Hit shuffle below for an instant idea.
          </p>
        ),
      }}
      shuffleHeading="Shuffle Gifts for a Crush"
      shuffleProducts={shuffle}
      gridHeading="Thoughtful (Not Too Much) Gifts for a Crush, Ranked"
      gridProducts={grid}
      ctaHeading="Want an Instant Idea That Hits the Right Note?"
      ctaText="Tell TheGiftShuffle who it is for and your budget, and get an instant, not-too-much gift idea in one click."
      faqs={[
        { q: 'What do you get a crush for a gift?', a: 'For a crush, keep it thoughtful but light: their favorite snack or specialty coffee, a book in a genre they love, a fun game or gadget, a nice candle, or tickets to something you can do together. The goal is to show you pay attention without coming on too strong.' },
        { q: 'How much should you spend on a gift for a crush?', a: 'For a crush or someone you just started dating, roughly $15 to $50 is the sweet spot. Under that can feel like an afterthought; much over it can feel intense too soon. Thoughtfulness matters far more than price this early, so spend on getting the idea right, not on getting it expensive.' },
        { q: 'What is a good gift for a guy I like?', a: 'For a guy you like, safe and charming picks include a quality snack or hot-sauce set, a fun desk gadget, a good book or game, a nice beanie or socks, or tickets to something. Tie it to a hobby or something he has mentioned and keep it under about $50.' },
        { q: 'What is a good gift for a girl I like?', a: 'For a girl you like, think a nice candle or lip balm, her favorite treat done well, a cute plant, a book or game she would enjoy, or a small cozy item. Keep it thoughtful and light rather than romantic or expensive, especially early on.' },
        { q: 'What should I get my crush for Valentine\'s Day if it is early?', a: 'If Valentine\'s Day lands early in a new relationship, dial it down a notch: a small box of good chocolate, a single flower or a fun bouquet, a handwritten card, or a low-key shared activity. Keep it warm but casual so it matches where things actually are.' },
        { q: 'What gift is too much for a crush?', a: 'Skip anything that implies a bigger commitment than exists yet: expensive jewelry, anything engraved or hyper-personal, big-ticket tech, or a grand romantic gesture. Those can feel like pressure early on. Save the meaningful splurges for once you are actually together.' },
      ]}
      relatedHeading="More Gift Guides"
      relatedLinks={[
        { href: '/gifts-under-25', label: 'Gifts Under $25' },
        { href: '/gifts-under-50', label: 'Gifts Under $50' },
        { href: '/gifts-for-girlfriend', label: 'Gifts for Your Girlfriend' },
        { href: '/romantic-gifts-for-her', label: 'Romantic Gifts for Her' },
        { href: '/best-gifts-for-her-2026', label: 'Best Gifts for Her 2026' },
        { href: '/help-me-pick-a-gift', label: 'Help Me Pick a Gift' },
      ]}
    />
  );
}
