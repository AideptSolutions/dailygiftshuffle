import type { Metadata } from 'next';
import GiftGuideTemplate from '@/components/GiftGuideTemplate';
import { curate, shufflePool, ALL } from '@/lib/giftSelect';

const URL = 'https://www.thegiftshuffle.com/help-me-pick-a-gift';

export const metadata: Metadata = {
  title: 'Help Me Pick a Gift: 30 Foolproof Ideas That Cannot Go Wrong | TheGiftShuffle',
  description:
    "Bad at picking gifts? Stop guessing. Get an instant pick from our gift tool, or choose from 30 foolproof, top-rated gifts that are genuinely hard to get wrong, for anyone on your list.",
  keywords: [
    'help me pick a gift',
    'bad at picking gifts',
    'i never know what to get people',
    'foolproof gifts',
    'gifts that cant go wrong',
    'what should i get someone',
    'crowd pleaser gifts',
    'gifts anyone will love',
    'pick a gift for me',
    'gift for someone i barely know',
  ],
  openGraph: {
    title: 'Help Me Pick a Gift: 30 Foolproof Ideas That Cannot Go Wrong | TheGiftShuffle',
    description: "Bad at picking gifts? Get an instant pick from our tool, or browse 30 foolproof, top-rated gifts that are hard to get wrong.",
    type: 'website',
    url: URL,
    images: [{ url: 'https://www.thegiftshuffle.com/api/og?title=Help%20Me%20Pick%20a%20Gift%20%7C%20TheGiftShuffle', width: 1200, height: 630 }],
  },
  alternates: { canonical: URL },
};

// "Foolproof" = the safest, most universally loved picks: highest social proof
// across the whole catalog, with the default consumable/niche exclusions on so
// nothing weird sneaks in. recipientCap keeps the grid varied across audiences.
const match = () => true;
const grid = curate({ match, minRating: 4.6, sort: 'social', recipientCap: 5, limit: 30, pool: ALL });
const shuffle = shufflePool((p) => p.rating >= 4.5, ALL);

export default function Page() {
  return (
    <GiftGuideTemplate
      canonicalUrl={URL}
      schemaName="Help Me Pick a Gift: Foolproof Gift Ideas"
      schemaDescription="Foolproof, top-rated gift ideas for people who are bad at picking gifts, curated by TheGiftShuffle"
      breadcrumbLabel="Help Me Pick a Gift"
      breadcrumbHref="/help-me-pick-a-gift"
      heroSrc="/images/heroes/help-me-pick-a-gift.jpg"
      heroAlt="A spread of assorted wrapped gifts to choose from"
      h1="Bad at Picking Gifts? Let Us Pick for You"
      intro={
        <>
          <p>
            If you are <strong>bad at picking gifts</strong>, the fix is simple: stop guessing. Tell
            TheGiftShuffle who it is for and your budget, and it picks a top-rated, crowd-pleasing
            gift in one click. Prefer to browse? Every idea below is a <strong>foolproof gift that is
            genuinely hard to get wrong</strong>, universally loved, top-reviewed, and safe for
            almost anyone.
          </p>
          <p className="text-base text-gray-600">
            Whether you never know what to get people, you are shopping for someone you barely know,
            or you just hate the pressure of choosing, this page is built for you. Hit shuffle for an
            instant answer, or pick from the crowd-pleasers below. No gift-giving talent required.
          </p>
        </>
      }
      shuffleHeading="Not Sure? Shuffle for an Instant Gift"
      shuffleProducts={shuffle}
      gridHeading="30 Foolproof Gifts That Are Hard to Get Wrong"
      gridProducts={grid}
      ctaHeading="Still Stuck? Let the Shuffle Decide"
      ctaText="Tell us who it is for and your budget, and get a foolproof, top-rated gift idea in one click. Shuffle as many times as you like until one feels right."
      faqs={[
        {
          q: 'What do I get someone when I have no idea what they want?',
          a: 'When you have no idea, default to a universally loved, top-rated item instead of guessing at their taste: a Stanley tumbler, an Ember temperature-control mug, a premium candle, a cozy weighted blanket, or quality wireless earbuds all land well with almost anyone. Or skip the guesswork entirely and use TheGiftShuffle, which picks a crowd-pleaser for you based on who it is for and your budget.',
        },
        {
          q: 'What is a gift that cannot go wrong?',
          a: 'The safest gifts are practical-but-a-little-luxurious items most people would not buy themselves: a temperature-control mug, a weighted blanket, a premium candle, a nice insulated water bottle, or a top-rated kitchen gadget. They feel thoughtful without requiring you to nail someone exact taste, which is exactly why they are hard to get wrong.',
        },
        {
          q: 'I am bad at picking gifts. How do I get better at it?',
          a: 'You do not have to get better at it, you just need a better method. Anchor on one thing you know about the person (a hobby, a daily annoyance you could solve, or a small luxury they would never splurge on) and pick a top-rated version of it. If even that feels like too much, TheGiftShuffle does the matching for you in a single click.',
        },
        {
          q: 'What is a good gift for someone I barely know?',
          a: 'For someone you barely know, stay on safe, universal ground: consumable or practical gifts like a nice candle, gourmet chocolate or coffee, a quality tumbler, or a bestselling book are all hard to get wrong. Avoid anything that assumes a strong personal taste, such as clothing, strong fragrances, or very specific home decor.',
        },
        {
          q: 'Can you just pick a gift for me?',
          a: 'Yes, that is exactly what TheGiftShuffle is for. Tell it who the gift is for and your budget, hit shuffle, and it instantly returns a top-rated, crowd-pleasing gift. You can shuffle again as many times as you like until one clicks, so you never have to make the call alone.',
        },
        {
          q: 'What are the safest last-minute gifts?',
          a: 'The safest last-minute gifts are crowd-pleasers that ship fast or arrive digitally: a popular tumbler or mug, a premium candle set, a quality blanket, or a digital gift card to a place they actually go. Pair any of them with a short handwritten note and a rushed gift still feels considered.',
        },
      ]}
      relatedHeading="More Ways to Find the Perfect Gift"
      relatedLinks={[
        { href: '/shuffle', label: 'Try the Gift Shuffle' },
        { href: '/gifts-under-50', label: 'Gifts Under $50' },
        { href: '/best-birthday-gifts-2026', label: 'Best Birthday Gifts 2026' },
        { href: '/unique-birthday-gifts', label: 'Unique Gift Ideas' },
        { href: '/best-gifts-for-her-2026', label: 'Best Gifts for Her' },
        { href: '/gift-ideas-for-him', label: 'Gift Ideas for Him' },
      ]}
    />
  );
}
