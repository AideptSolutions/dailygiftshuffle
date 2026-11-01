import type { Metadata } from 'next';
import GiftGuideTemplate from '@/components/GiftGuideTemplate';
import { curate, shufflePool, variantKey, ALL } from '@/lib/giftSelect';

const URL = 'https://www.thegiftshuffle.com/last-minute-christmas-gifts';

export const metadata: Metadata = {
  title: 'Last-Minute Christmas Gifts 2026: Digital Gift Cards and Easy Wins | TheGiftShuffle',
  description:
    'Last-minute Christmas gifts that still feel thoughtful: digital gift cards delivered by email instead of shipped, plus top-rated crowd-pleasers that are easy to find and hard to get wrong.',
  keywords: [
    'last minute christmas gifts',
    'last minute gift ideas',
    'digital gift cards for christmas',
    'digital gift cards christmas',
    'last minute christmas gifts for him',
    'last minute christmas gifts for her',
  ],
  openGraph: {
    title: 'Last-Minute Christmas Gifts 2026: Digital Gift Cards and Easy Wins',
    description: 'Digital gift cards delivered by email, plus top-rated crowd-pleasers that are hard to get wrong.',
    type: 'website',
    url: URL,
    images: [{ url: 'https://www.thegiftshuffle.com/images/heroes/last-minute-christmas-gifts.jpg', width: 1200, height: 800 }],
  },
  alternates: { canonical: URL },
};

// Digital codes delivered by email lead the page; the rest are proven
// crowd-pleasers with very high review counts, the gifts that are easy to
// find at the last minute and hard to get wrong.
const DIGITAL = new Set(['gg-psn-giftcard', 'gg-nintendo-eshop', 'gg-gamepass-ultimate', 'kids-150-2']);
const isDigital = (p: { id?: string }) => !!p.id && (p.id.startsWith('digital-') || DIGITAL.has(p.id));
// Made-to-order items cannot be last-minute.
const MADE_TO_ORDER = /\b(custom|personalized|engraved|monogram\w*)\b/i;
const OFF_SEASON = /\b(pool|float|beach|sprinkler|pumpkin|halloween)\b/i;

const digital = curate({ match: isDigital, minRating: 4.4, sort: 'social', recipientCap: 40, limit: 12, pool: ALL });
const easyWins = curate({
  match: (p) => !isDigital(p) && !!p.occasions?.includes('holiday') && !OFF_SEASON.test(p.name) && !MADE_TO_ORDER.test(p.name) && p.price <= 100,
  minPrice: 15,
  minRating: 4.6,
  sort: 'social',
  deprioritizeTags: ['parenting', 'baby-shower', 'wedding', 'diy-tools', 'car-accessories'],
  recipientCap: 6,
  limit: 40,
  pool: ALL,
});
// Dedupe across the two lists by product variant (two Game Pass listings).
const seen = new Set<string>();
const grid = [...digital, ...easyWins]
  .filter((p) => {
    const k = variantKey(p.name) || p.id;
    return seen.has(k) ? false : (seen.add(k), true);
  })
  .slice(0, 36);
const shuffle = shufflePool((p) => isDigital(p) || (!!p.occasions?.includes('holiday') && p.price <= 100 && p.reviewCount >= 10000), ALL);

export default function Page() {
  return (
    <GiftGuideTemplate
      canonicalUrl={URL}
      schemaName="Last-Minute Christmas Gifts 2026"
      schemaDescription="Last-minute Christmas gifts for 2026, curated by TheGiftShuffle"
      breadcrumbLabel="Last-Minute Christmas Gifts"
      breadcrumbHref="/last-minute-christmas-gifts"
      heroSrc="/images/heroes/last-minute-christmas-gifts.jpg"
      heroAlt="Last-minute Christmas gifts on cream linen: a card and kraft envelope, a gift card, a small wrapped box, wireless earbuds and a candle with pine and coral ribbon"
      h1="Last-Minute Christmas Gifts"
      updated="2026-11-01"
      intro={
        <>
          <p>
            Out of time? The best <strong>last-minute Christmas gifts</strong> skip the shipping
            and still feel chosen: <strong>digital gift cards delivered by email</strong> for the
            games, apps and treats they already love, plus top-rated
            crowd-pleasers with tens of thousands of reviews that are easy to find and hard to get
            wrong.
          </p>
          <p className="text-base text-gray-600">
            Delivery is handled by the retailer, not by us: check the delivery details on the
            product page and the date shown at checkout before you order.
          </p>
        </>
      }
      answer={{
        heading: 'What Is the Best Last-Minute Christmas Gift?',
        body: (
          <p>
            The best last-minute Christmas gift is a <strong>digital gift card for something they
            already use</strong>: a PlayStation, Nintendo or Xbox code for a gamer, a Roblox card
            for a kid, or credit for a favorite app or coffee shop. It is delivered by email
            instead of shipped, so there is no package to wait on, and it lets them pick exactly
            what they want. Print the
            code inside a card or tuck it into a small wrapped treat so there is still something to
            open on Christmas morning.
          </p>
        ),
      }}
      shuffleHeading="Shuffle Last-Minute Gifts"
      shuffleProducts={shuffle}
      gridHeading={`${grid.length} Last-Minute Christmas Gifts, Digital Gift Cards First`}
      gridProducts={grid}
      ctaHeading="Need an Idea in the Next 30 Seconds?"
      ctaText="Tell TheGiftShuffle who it is for and your budget, and get a top-rated gift idea in one click."
      faqs={[
        { q: 'Can I give a gift card by email?', a: 'Yes. Digital gift cards and codes (PlayStation Store, Nintendo eShop, Xbox Game Pass, Roblox, Starbucks, Netflix and more) are delivered by email instead of shipped, which makes them the usual pick when time is short. Delivery is handled by the retailer, so check the delivery details on the product page before you buy. Send it to yourself to print, or straight to the recipient.' },
        { q: 'How do I make a gift card feel less last-minute?', a: 'Present it well: print the code inside a handwritten card, pair it with a small physical treat like their favorite snack or a candle, or wrap it inside a box with a note about what you hope they buy. A specific gift card (their favorite game store or coffee shop) always feels more thoughtful than a generic one.' },
        { q: 'What if a gift will not arrive before Christmas?', a: 'Give a photo or printout of the gift in a card with a note that it is on the way. Most people love the surprise either way, and it buys you a few extra days. If timing matters, a digital gift card avoids shipping altogether.' },
        { q: 'What is a good last-minute gift for someone who has everything?', a: 'Choose something consumable or experiential: a digital gift card for their favorite app or game store, a premium coffee or treat they will use up, or a plan to do something together in the new year. These never duplicate what they already own.' },
      ]}
      relatedHeading="More Christmas Gift Guides"
      relatedLinks={[
        { href: '/christmas-gift-ideas', label: 'Christmas Gift Ideas' },
        { href: '/trending-christmas-gifts-2026', label: 'Trending Christmas Gifts 2026' },
        { href: '/stocking-stuffers', label: 'Stocking Stuffers' },
        { href: '/christmas-gifts-for-her', label: 'Christmas Gifts for Her' },
        { href: '/christmas-gifts-for-him', label: 'Christmas Gifts for Him' },
        { href: '/gifts-for-people-who-have-everything', label: 'For People Who Have Everything' },
        { href: '/gifts-under-25', label: 'Gifts Under $25' },
      ]}
    />
  );
}
