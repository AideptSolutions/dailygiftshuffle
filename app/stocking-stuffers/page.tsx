import type { Metadata } from 'next';
import GiftGuideTemplate from '@/components/GiftGuideTemplate';
import { curate, shufflePool, ALL } from '@/lib/giftSelect';

const URL = 'https://www.thegiftshuffle.com/stocking-stuffers';

export const metadata: Metadata = {
  title: 'Best Stocking Stuffers 2026: 40 Small Gifts That Feel Big | TheGiftShuffle',
  description:
    'The best stocking stuffers for 2026: fun, useful, top-rated small gifts under $25 for him, her, kids and teens. Stocking stuffer ideas that get used, not tossed.',
  keywords: [
    'stocking stuffers',
    'stocking stuffer ideas',
    'best stocking stuffers 2026',
    'stocking stuffers for him',
    'stocking stuffers for her',
    'stocking stuffers for kids',
    'stocking stuffers for teens',
    'stocking stuffers under 25',
    'cheap stocking stuffers',
    'unique stocking stuffers',
  ],
  openGraph: {
    title: 'Best Stocking Stuffers 2026: 40 Small Gifts That Feel Big | TheGiftShuffle',
    description: 'Fun, useful, top-rated stocking stuffers under $25 for everyone on your list.',
    type: 'website',
    url: URL,
    images: [{ url: 'https://www.thegiftshuffle.com/api/og?title=Best%20Stocking%20Stuffers%20%7C%20TheGiftShuffle', width: 1200, height: 630 }],
  },
  alternates: { canonical: URL },
};

// Curated stuffer- items lead, then fill with top-rated small gifts under $25.
const isStuffer = (p: { id?: string }) => !!p.id?.startsWith('stuffer-');
const isStufferSized = (p: { price?: number }) => (p.price ?? 999) <= 25 && (p.price ?? 0) >= 5;

const stufferItems = curate({ match: isStuffer, minRating: 4.3, sort: 'social', recipientCap: 30, limit: 12, pool: ALL });
const fillItems = curate({ match: isStufferSized, minRating: 4.6, sort: 'social', recipientCap: 8, limit: 50, pool: ALL });
const seen = new Set(stufferItems.map((p) => p.id));
const grid = [...stufferItems, ...fillItems.filter((p) => !seen.has(p.id))].slice(0, 40);
const shuffle = shufflePool((p) => isStuffer(p) || isStufferSized(p), ALL);

export default function Page() {
  return (
    <GiftGuideTemplate
      canonicalUrl={URL}
      schemaName="Best Stocking Stuffers 2026"
      schemaDescription="The best stocking stuffer ideas for 2026, curated by TheGiftShuffle"
      breadcrumbLabel="Stocking Stuffers"
      breadcrumbHref="/stocking-stuffers"
      heroSrc="/images/heroes/stocking-stuffers.jpg"
      heroAlt="Christmas stockings filled with small wrapped gifts"
      h1="Best Stocking Stuffers for 2026"
      intro={
        <>
          <p>
            The best <strong>stocking stuffers</strong> are small gifts that punch above their size:
            fun, useful, top-rated picks under $25 that get used the same week instead of tossed in a
            drawer. This list covers <strong>him, her, kids and teens</strong>, from clever gadgets and
            cozy classics to a few laugh-out-loud surprises.
          </p>
          <p className="text-base text-gray-600">
            Stuffing more than one stocking? Hit shuffle for a fresh set of small-gift ideas every
            click, or browse the full ranked list below.
          </p>
        </>
      }
      answer={{
        heading: 'What Are the Best Stocking Stuffers?',
        body: (
          <p>
            The best stocking stuffers are small, useful and a little fun: an <strong>Apple
            AirTag</strong>, <strong>colorful socks</strong>, a <strong>credit-card multitool</strong>,{' '}
            <strong>hand warmers</strong>, a <strong>fun card game</strong>, quality{' '}
            <strong>lip balm or hand cream</strong>, a <strong>keychain flashlight</strong>, or their
            favorite <strong>candy or hot sauce</strong>. Aim for $5 to $25 per item and mix one
            practical pick, one cozy pick and one silly pick per stocking, and every stocking feels
            thoughtfully packed. Not sure? Hit shuffle below for instant small-gift ideas.
          </p>
        ),
      }}
      shuffleHeading="Shuffle Stocking Stuffer Ideas"
      shuffleProducts={shuffle}
      gridHeading="Top-Rated Stocking Stuffers, Ranked"
      gridProducts={grid}
      ctaHeading="Filling More Than One Stocking?"
      ctaText="Tell TheGiftShuffle who it is for and your budget, and get an instant, top-rated small gift idea in one click."
      faqs={[
        { q: 'What are good stocking stuffers for adults?', a: 'Great adult stocking stuffers include an Apple AirTag, a quality lip balm or hand cream, fun socks, a credit-card multitool, a keychain flashlight, gourmet hot sauce or chocolate, and a small desk toy. Useful beats novelty for adults, so pick things they will actually carry or use.' },
        { q: 'How much should you spend on stocking stuffers?', a: 'Most stocking stuffers land between $5 and $25 per item, with three to six items per stocking. The trick is mixing price points: one slightly nicer anchor item like an AirTag or nice hand cream, plus a few small fun or practical picks around $10.' },
        { q: 'What are good stocking stuffers for him?', a: 'For him, reliable stocking stuffers are a credit-card multitool, a keychain flashlight, bold socks, hot sauce, hand warmers for the outdoorsman, a desk fidget toy, or an AirTag for his keys. Small, practical and a little fun always lands.' },
        { q: 'What are good stocking stuffers for her?', a: 'For her, think a silk scrunchie set, a cult-favorite lip mask or hand cream, a mini candle, cozy socks, a nice tea sampler, or an AirTag for her bag. Small luxuries she would not buy herself make the best stuffers.' },
        { q: 'What are good stocking stuffers for kids and teens?', a: 'Kids love card games like UNO, crayons and small craft kits, fun bandages and little toys. Teens go for fidget toys, funky socks, phone accessories, mini skincare and candy. Keep it playful and small enough to actually fit in the stocking.' },
        { q: 'What are unique stocking stuffers people do not expect?', a: 'To surprise people, skip candy and go for a mini gag gift like a screaming goat figurine, a wallet multitool, a tiny but bright keychain light, gourmet hot sauce, or magnetic desk spheres. Unexpected but useful is the sweet spot.' },
      ]}
      relatedHeading="More Holiday Gift Guides"
      relatedLinks={[
        { href: '/christmas-gift-ideas', label: 'Christmas Gift Ideas' },
        { href: '/white-elephant-gifts', label: 'White Elephant Gifts' },
        { href: '/secret-santa-gifts', label: 'Secret Santa Gifts' },
        { href: '/gifts-under-25', label: 'Gifts Under $25' },
        { href: '/christmas-gifts-for-her', label: 'Christmas Gifts for Her' },
        { href: '/christmas-gifts-for-him', label: 'Christmas Gifts for Him' },
      ]}
    />
  );
}
