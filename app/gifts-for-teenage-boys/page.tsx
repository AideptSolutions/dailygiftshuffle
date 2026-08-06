import type { Metadata } from 'next';
import GiftGuideTemplate from '@/components/GiftGuideTemplate';
import { curate, shufflePool, ALL } from '@/lib/giftSelect';

const URL = 'https://www.thegiftshuffle.com/gifts-for-teenage-boys';

export const metadata: Metadata = {
  title: 'Gifts for Teenage Boys 2026: 35 Picks They Actually Want | TheGiftShuffle',
  description:
    'The best gifts for teenage boys in 2026: gaming gear, tech, room upgrades and fun surprises that get used daily instead of shelved, at every budget.',
  keywords: [
    'gifts for teenage boys',
    'gifts for teen boys',
    'best gifts for teenage boys 2026',
    'birthday gifts for teenage boys',
    'christmas gifts for teen boys',
    'gifts for 13 year old boys',
    'gifts for 16 year old boys',
    'gaming gifts for teens',
  ],
  openGraph: {
    title: 'Gifts for Teenage Boys 2026: 35 Picks They Actually Want | TheGiftShuffle',
    description: 'Gaming gear, tech, room upgrades and fun surprises teen boys actually use.',
    type: 'website',
    url: URL,
    images: [{ url: 'https://www.thegiftshuffle.com/api/og?title=Gifts%20for%20Teenage%20Boys%20%7C%20TheGiftShuffle', width: 1200, height: 630 }],
  },
  alternates: { canonical: URL },
};

const match = (p: { recipients?: string[]; tags?: string[] }) =>
  !!p.recipients?.includes('teens') ||
  !!(p.recipients?.includes('him') && p.tags?.some((t) => ['gaming', 'tech', 'sports'].includes(t)));
const grid = curate({ match, minPrice: 10, minRating: 4.5, sort: 'social', recipientCap: 30, limit: 35, pool: ALL });
const shuffle = shufflePool(match, ALL);

export default function Page() {
  return (
    <GiftGuideTemplate
      canonicalUrl={URL}
      schemaName="Gifts for Teenage Boys 2026"
      schemaDescription="The best gifts for teenage boys in 2026, curated by TheGiftShuffle"
      breadcrumbLabel="Gifts for Teenage Boys"
      breadcrumbHref="/gifts-for-teenage-boys"
      heroSrc="/images/heroes/gifts-for-teenage-boys.jpg"
      heroAlt="Gifts for teenage boys with gaming gear and tech accessories"
      h1="Gifts for Teenage Boys"
      intro={
        <>
          <p>
            Teen boys are simple to please and impossible to guess for. These{' '}
            <strong>gifts for teenage boys</strong> solve it with 2026&apos;s reliable winners:
            gaming gear he will use nightly, tech that upgrades his setup, room improvements, sports
            gear and a few fun surprises, all top-rated with serious review counts.
          </p>
          <p className="text-base text-gray-600">
            For birthdays, holidays or just-because, every budget is covered. Hit shuffle for a fresh
            idea every click, or browse the ranked list below.
          </p>
        </>
      }
      answer={{
        heading: 'What Do Teenage Boys Actually Want?',
        body: (
          <p>
            Teen boys in 2026 reliably want <strong>gaming gear</strong>, a headset, controller
            accessories, RGB lighting, <strong>tech</strong>, earbuds, a speaker, a smartwatch,{' '}
            <strong>room upgrades</strong> like LED panels and a mini fridge, <strong>sports and
            hobby gear</strong> for whatever he plays, and <strong>snack-adjacent fun</strong> like
            hot sauce sets or a giant mug. Match the gift to his main screen or sport and buy the
            top-rated version. When in doubt, hit shuffle below with your budget for an instant idea.
          </p>
        ),
      }}
      shuffleHeading="Shuffle Gifts for Teen Boys"
      shuffleProducts={shuffle}
      gridHeading="Teen-Approved Gifts for Boys, Ranked"
      gridProducts={grid}
      ctaHeading="He Said He Wants Nothing?"
      ctaText="Tell TheGiftShuffle his age range and your budget, and get an instant idea he will actually use."
      faqs={[
        { q: 'What are the best gifts for teenage boys?', a: 'The best gifts for teen boys are gaming accessories like headsets and RGB lighting, tech like earbuds and speakers, room upgrades, sports gear for their sport, and fun extras like hot sauce sets or a giant mug. If it plugs in or levels up their setup, it gets used.' },
        { q: 'What do you get a 13 year old boy?', a: 'For 13, go fun and hands-on: a controller or gaming accessory, a building or model kit, a Bluetooth speaker, sports gear, trendy socks or a hoodie, and snacks. Playful and instantly usable wins at this age.' },
        { q: 'What do you get a 16 year old boy?', a: 'For 16, upgrade his daily kit: quality earbuds or a headset, a smartwatch or speaker, gaming peripherals, gym accessories if he lifts, or gear for his car if he drives. Practical upgrades to what he already does daily are the reliable lane.' },
        { q: 'What are good gifts for teen boys under $25?', a: 'Under $25, dependable picks include controller grips, an RGB mouse pad or LED strip, a card multitool, hot sauce or jerky sets, fun socks, a desk fidget toy, or a phone stand. Small, useful and a little fun is the formula.' },
        { q: 'What should you avoid gifting a teenage boy?', a: 'Avoid clothes without exact size and brand knowledge, anything babyish, school supplies framed as gifts, and hobby gear for a hobby he quit last year. When unsure, current-setup upgrades and top-rated tech are the safe zone.' },
      ]}
      relatedHeading="More Gift Guides"
      relatedLinks={[
        { href: '/gift-ideas-for-teens', label: 'Gift Ideas for Teens' },
        { href: '/gifts-for-teenage-girls', label: 'Gifts for Teenage Girls' },
        { href: '/gift-ideas-for-brother', label: 'Gift Ideas for Brother' },
        { href: '/best-gaming-gifts-2026', label: 'Best Gaming Gifts 2026' },
        { href: '/gifts-under-25', label: 'Gifts Under $25' },
        { href: '/birthday-gifts-for-gamers', label: 'Birthday Gifts for Gamers' },
      ]}
    />
  );
}
