import type { Metadata } from 'next';
import GiftGuideTemplate from '@/components/GiftGuideTemplate';
import { curate, shufflePool, ALL } from '@/lib/giftSelect';

const URL = 'https://www.thegiftshuffle.com/gifts-for-teenage-girls';

export const metadata: Metadata = {
  title: 'Gifts for Teenage Girls 2026: 35 Picks They Actually Want | TheGiftShuffle',
  description:
    'The best gifts for teenage girls in 2026: trendy skincare, cozy room upgrades, tech and fun surprises that pass the teen approval test, at every budget.',
  keywords: [
    'gifts for teenage girls',
    'gifts for teen girls',
    'best gifts for teenage girls 2026',
    'birthday gifts for teenage girls',
    'christmas gifts for teen girls',
    'gifts for 13 year old girls',
    'gifts for 16 year old girls',
    'trendy gifts for teens',
  ],
  openGraph: {
    title: 'Gifts for Teenage Girls 2026: 35 Picks They Actually Want | TheGiftShuffle',
    description: 'Trendy skincare, cozy room upgrades, tech and fun surprises that pass the teen approval test.',
    type: 'website',
    url: URL,
    images: [{ url: 'https://www.thegiftshuffle.com/api/og?title=Gifts%20for%20Teenage%20Girls%20%7C%20TheGiftShuffle', width: 1200, height: 630 }],
  },
  alternates: { canonical: URL },
};

const match = (p: { recipients?: string[] }) =>
  !!p.recipients?.includes('teens') || !!(p.recipients?.includes('her') && p.recipients?.includes('friends'));
const grid = curate({ match, minPrice: 10, minRating: 4.5, sort: 'social', recipientCap: 30, limit: 35, pool: ALL });
const shuffle = shufflePool(match, ALL);

export default function Page() {
  return (
    <GiftGuideTemplate
      canonicalUrl={URL}
      schemaName="Gifts for Teenage Girls 2026"
      schemaDescription="The best gifts for teenage girls in 2026, curated by TheGiftShuffle"
      breadcrumbLabel="Gifts for Teenage Girls"
      breadcrumbHref="/gifts-for-teenage-girls"
      heroSrc="/images/heroes/gifts-for-teenage-girls.jpg"
      heroAlt="Trendy gifts for teenage girls with skincare and cozy accessories"
      h1="Gifts for Teenage Girls"
      intro={
        <>
          <p>
            Shopping for a teen girl is high-stakes: the wrong pick gets a polite thanks and a spot
            in the closet. These <strong>gifts for teenage girls</strong> pass the approval test in
            2026: trendy skincare and beauty, cozy room upgrades, the tech she actually uses and a
            few fun surprises, all top-rated with serious review counts.
          </p>
          <p className="text-base text-gray-600">
            For birthdays, holidays or earned rewards, every budget is covered. Hit shuffle for a
            fresh idea every click, or browse the ranked list below.
          </p>
        </>
      }
      answer={{
        heading: 'What Do Teenage Girls Actually Want?',
        body: (
          <p>
            Teen girls in 2026 consistently want <strong>trendy skincare and beauty</strong>, the
            cult brands their feeds love, <strong>cozy everything</strong>, blankets, slippers,
            oversized comfort, <strong>room upgrades</strong> like LED lighting and photo prints,{' '}
            <strong>tech</strong>, earbuds, an instant camera, phone accessories, and{' '}
            <strong>small luxuries</strong> like a silk scrunchie set or a fun tumbler. The safest
            play is the top-rated version of whatever her friend group is into. When in doubt, hit
            shuffle below with your budget for an instant idea.
          </p>
        ),
      }}
      shuffleHeading="Shuffle Gifts for Teen Girls"
      shuffleProducts={shuffle}
      gridHeading="Teen-Approved Gifts for Girls, Ranked"
      gridProducts={grid}
      ctaHeading="Scared of Picking Wrong?"
      ctaText="Tell TheGiftShuffle her age range and your budget, and get an instant, teen-approved idea in one click."
      faqs={[
        { q: 'What are the best gifts for teenage girls?', a: 'The best gifts for teen girls are trendy skincare and beauty, cozy blankets and slippers, LED room lighting, an instant camera, wireless earbuds, silk scrunchies, and fun tumblers or water bottles. Top-rated versions of whatever her friend group loves are the safest wins.' },
        { q: 'What do you get a 13 year old girl?', a: 'For 13, keep it fun and low-pressure: a craft or jewelry-making kit, an instant camera, cozy room decor, age-appropriate skincare, fun socks and accessories, or a popular game. Playful beats sophisticated at this age.' },
        { q: 'What do you get a 16 year old girl?', a: 'For 16, lean more grown-up: quality earbuds or headphones, trendy skincare sets, a silk pillowcase or scrunchie set, a cozy oversized blanket, room upgrades, or a gift tied to her specific obsession, her sport, her fandom, her aesthetic.' },
        { q: 'What are good gifts for teen girls under $25?', a: 'Under $25, reliable picks include silk scrunchies, a cult lip mask, fuzzy socks, LED string lights, a mini candle, a card game for sleepovers, or fun phone accessories. Small and on-trend beats big and generic with teens.' },
        { q: 'What should you avoid gifting a teenage girl?', a: 'Avoid clothes without her exact size and style, strong fragrances, anything babyish, and school-adjacent gifts. Taste risk is the main danger, so favor universal cozy, beauty and tech picks unless you know her specific wishlist.' },
      ]}
      relatedHeading="More Gift Guides"
      relatedLinks={[
        { href: '/gift-ideas-for-teens', label: 'Gift Ideas for Teens' },
        { href: '/gifts-for-teenage-boys', label: 'Gifts for Teenage Boys' },
        { href: '/gift-ideas-for-sister', label: 'Gift Ideas for Sister' },
        { href: '/best-beauty-gifts-2026', label: 'Best Beauty Gifts 2026' },
        { href: '/gifts-under-25', label: 'Gifts Under $25' },
        { href: '/self-care-gifts', label: 'Self-Care & Wellness Gifts' },
      ]}
    />
  );
}
