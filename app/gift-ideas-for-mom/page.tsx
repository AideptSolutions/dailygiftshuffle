import type { Metadata } from 'next';
import GiftGuideTemplate from '@/components/GiftGuideTemplate';
import { curate, shufflePool, ALL } from '@/lib/giftSelect';

const URL = 'https://www.thegiftshuffle.com/gift-ideas-for-mom';

export const metadata: Metadata = {
  title: 'Gift Ideas for Mom: 45 Picks She Will Actually Love (2026) | TheGiftShuffle',
  description:
    'The best gift ideas for mom in 2026: top-rated picks for her birthday, Christmas, or just because. Cozy comforts, spa and self-care, kitchen upgrades and keepsakes at every budget.',
  keywords: [
    'gift ideas for mom',
    'gifts for mom',
    'best gifts for mom',
    'birthday gifts for mom',
    'christmas gifts for mom',
    'what to get my mom',
    'gifts for mom who has everything',
    'thoughtful gifts for mom',
    'gifts for mom 2026',
  ],
  openGraph: {
    title: 'Gift Ideas for Mom: 45 Picks She Will Actually Love (2026) | TheGiftShuffle',
    description: 'Top-rated gift ideas for mom for any occasion: cozy comforts, spa and self-care, kitchen upgrades and keepsakes.',
    type: 'website',
    url: URL,
    images: [{ url: 'https://www.thegiftshuffle.com/api/og?title=Gift%20Ideas%20for%20Mom%20%7C%20TheGiftShuffle', width: 1200, height: 630 }],
  },
  alternates: { canonical: URL },
};

// Evergreen mom gifting (any occasion). /mothers-day-gifts covers the seasonal
// Mother's Day angle; this page owns the year-round "gifts for mom" intent.
const match = (p: { recipients?: string[] }) => !!p.recipients?.includes('mom');
// Mom's buyer is usually a son, daughter or husband. Favour gift-shaped
// categories and keep garage/auto/tool items out of a gift guide for mom.
const PREFER = ['beauty', 'luxury', 'home', 'fitness', 'kitchen'];
const DEPRIORITIZE = ['car-accessories', 'ai-smart-home', 'diy-tools', 'gaming', 'finance', 'outdoors'];

const grid = curate({
  match,
  minPrice: 15,
  minRating: 4.5,
  sort: 'social',
  preferTags: PREFER,
  deprioritizeTags: DEPRIORITIZE,
  recipientCap: 30,
  limit: 45,
  pool: ALL,
});
const shuffle = shufflePool(match, ALL, { excludeTags: DEPRIORITIZE });

export default function Page() {
  return (
    <GiftGuideTemplate
      canonicalUrl={URL}
      schemaName="Gift Ideas for Mom"
      schemaDescription="The best gift ideas for mom in 2026, curated by TheGiftShuffle"
      breadcrumbLabel="Gift Ideas for Mom"
      breadcrumbHref="/gift-ideas-for-mom"
      heroSrc="/images/heroes/gift-ideas-for-mom.jpg"
      heroAlt="Thoughtful gifts for mom with a candle, tea, plant and soft throw"
      h1="Gift Ideas for Mom"
      intro={
        <>
          <p>
            These are the <strong>best gift ideas for mom</strong> in 2026: top-rated picks that
            work for her birthday, Christmas, or a just-because moment. Cozy comforts, spa and
            self-care sets, kitchen upgrades she will use weekly, and keepsakes that actually mean
            something.
          </p>
          <p className="text-base text-gray-600">
            Every budget is covered, from a small treat to a proper splurge. Hit shuffle for a fresh
            idea every click, or browse the ranked picks below.
          </p>
        </>
      }
      answer={{
        heading: 'What Should I Get My Mom?',
        body: (
          <p>
            The gifts moms actually love turn a daily routine into a small ritual: a{' '}
            <strong>premium candle or diffuser</strong>, a <strong>spa or skincare set</strong>, a{' '}
            <strong>cozy robe, throw or slippers</strong>, a <strong>temperature-control mug</strong>{' '}
            for her coffee or tea, a <strong>kitchen upgrade</strong> she would not buy herself, or a{' '}
            <strong>personalized keepsake</strong> like engraved jewelry or a photo book. If she
            insists she needs nothing, upgrade something worn out or give an experience you share.
            The picks here average <strong>4.7 stars across millions of verified Amazon
            reviews</strong>. Not sure? Hit shuffle below for an instant idea in your budget.
          </p>
        ),
      }}
      shuffleHeading="Shuffle Gift Ideas for Mom"
      shuffleProducts={shuffle}
      gridHeading="Top-Rated Gifts for Mom, Ranked"
      gridProducts={grid}
      ctaHeading="Still Not Sure What She Would Love?"
      ctaText="Tell TheGiftShuffle a little about her and your budget, and get an instant, top-rated gift idea for mom in one click."
      faqs={[
        { q: 'What are the best gift ideas for mom?', a: 'The best gifts for mom blend comfort with a small luxury: a premium candle or diffuser, a spa or skincare set, a cozy robe or throw, a temperature-control mug, a kitchen upgrade, or a personalized keepsake. The winning pattern is something she would enjoy but would never buy for herself.' },
        { q: 'What should I get my mom for her birthday?', a: 'For her birthday, pair something she wants with a small surprise: a skincare or spa set plus her favorite treat, a piece of personalized jewelry, a hobby upgrade, or an experience like a nice dinner or class. Add a handwritten note and it lands far harder than the price suggests.' },
        { q: 'What are good Christmas gifts for mom?', a: 'Christmas gifts moms love include a cozy throw and slipper set, a premium candle, an Ember mug for unhurried coffee, a luxe skincare or bath set, a digital photo frame the family can send pictures to, or a nice kitchen tool. Comfort plus a touch of luxury is the reliable formula.' },
        { q: 'What do you get a mom who has everything?', a: 'For a mom who has everything, go experiential or sentimental: a digital photo frame the family updates remotely, a custom keepsake with names or dates, a class or membership tied to a hobby, or a premium upgrade to a daily ritual. Connection beats another object at this stage.' },
        { q: 'What are good gifts for mom under $50?', a: 'Under $50, strong picks include a premium candle, a silk pillowcase, a cult-favorite hand cream or lip mask, cozy socks and a throw, an aromatherapy diffuser, a nice tea sampler, or a small personalized keepsake. Wrap it well and it feels far more expensive.' },
        { q: 'What is a good last-minute gift for mom?', a: 'For a last-minute gift, go with fast-shipping crowd-pleasers she will genuinely use: a candle set, a cozy blanket, a quality mug with great coffee or tea, or a spa set. Pair it with a handwritten card, which is the part she will actually keep.' },
      ]}
      relatedHeading="More Gift Guides"
      relatedLinks={[
        { href: '/mothers-day-gifts', label: "Mother's Day Gifts" },
        { href: '/gift-ideas-for-dad', label: 'Gift Ideas for Dad' },
        { href: '/self-care-gifts', label: 'Self-Care & Wellness Gifts' },
        { href: '/gifts-for-people-who-have-everything', label: 'Gifts for People Who Have Everything' },
        { href: '/christmas-gifts-for-her', label: 'Christmas Gifts for Her' },
        { href: '/best-gifts-for-her-2026', label: 'Best Gifts for Her 2026' },
      ]}
    />
  );
}
