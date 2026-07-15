import type { Metadata } from 'next';
import GiftGuideTemplate from '@/components/GiftGuideTemplate';
import { curate, shufflePool, ALL } from '@/lib/giftSelect';

const URL = 'https://www.thegiftshuffle.com/self-care-gifts-for-her';

export const metadata: Metadata = {
  title: 'Self-Care Gifts for Her 2026: 30 Every Woman Actually Wants | TheGiftShuffle',
  description:
    'Self-care gifts for her that every woman actually deserves: spa sets, massagers, silk sleep masks, aromatherapy and cozy relaxation picks. The safe, thoughtful gift for your wife or girlfriend.',
  keywords: [
    'self care gifts for her',
    'self care gifts every woman deserves',
    'self care gifts for women',
    'spa gifts for her',
    'relaxation gifts for her',
    'wellness gifts for her',
    'self care gifts for wife',
    'self care gifts for girlfriend',
    'pampering gifts for her',
    'self care gift box for her',
  ],
  openGraph: {
    title: 'Self-Care Gifts for Her 2026: 30 Every Woman Actually Wants | TheGiftShuffle',
    description: 'Self-care gifts every woman actually deserves: spa sets, massagers, silk sleep masks and cozy relaxation picks. The safe, thoughtful gift for your wife or girlfriend.',
    type: 'website',
    url: URL,
    images: [{ url: 'https://www.thegiftshuffle.com/api/og?title=Self-Care%20Gifts%20for%20Her%20%7C%20TheGiftShuffle', width: 1200, height: 630 }],
  },
  alternates: { canonical: URL },
};

// Self-care items (curated selfcare- OR self-care-relevant catalog) that suit a
// female recipient. Built for the "shopping for my wife/girlfriend and clueless"
// buyer, so it leans her while staying top-rated.
const SELFCARE_KW =
  /massage|\bspa\b|diffuser|silk|weighted blanket|\bbath\b|candle|robe|foam roller|aromatherapy|yoga|sleep mask|gua sha|jade|pillowcase|\bblanket\b|\btea\b|shower steamer|salt lamp|essential oil|meditation|journal|slipper|steamer|sauna|eye mask|\bneck\b|scrunchie|bath bomb|hand balm|hand cream/i;
const isSelfCareForHer = (p: { id?: string; name?: string; price?: number; tags?: string[]; recipients?: string[] }) => {
  const her = !!p.recipients?.some((r) => r === 'her' || r === 'mom');
  if (!her) return false;
  if (p.id?.startsWith('selfcare-')) return true;
  return (
    (p.price ?? 999) <= 150 &&
    !!p.tags?.some((t) => ['beauty', 'fitness', 'home'].includes(t)) &&
    !!p.name && SELFCARE_KW.test(p.name)
  );
};
const grid = curate({ match: isSelfCareForHer, minRating: 4.3, sort: 'social', recipientCap: 30, limit: 30, pool: ALL });
const shuffle = shufflePool(isSelfCareForHer, ALL);

export default function Page() {
  return (
    <GiftGuideTemplate
      canonicalUrl={URL}
      schemaName="Self-Care Gifts for Her 2026"
      schemaDescription="The best self-care gifts for her in 2026, curated by TheGiftShuffle"
      breadcrumbLabel="Self-Care Gifts for Her"
      breadcrumbHref="/self-care-gifts-for-her"
      heroSrc="/images/heroes/self-care-gifts.jpg"
      heroAlt="A calming self-care spread for her with a candle, towels and spa items"
      h1="Self-Care Gifts for Her"
      intro={
        <>
          <p>
            Shopping for your wife or girlfriend and drawing a total blank? A self-care gift is the
            safe, thoughtful win. These are the <strong>self-care gifts for her that every woman
            actually deserves</strong>: spa sets, massagers, silk sleep masks, aromatherapy and cozy
            relaxation picks that turn a normal evening into a treat.
          </p>
          <p className="text-base text-gray-600">
            You do not need to know her exact taste. Every pick below is top-rated and hard to get
            wrong, chosen to feel indulgent rather than practical. Not sure which? Hit shuffle for an
            instant idea, or browse the full list.
          </p>
        </>
      }
      shuffleHeading="Shuffle Self-Care Gifts for Her"
      shuffleProducts={shuffle}
      gridHeading="Self-Care Gifts Every Woman Actually Wants, Ranked"
      gridProducts={grid}
      ctaHeading="Still Not Sure What She Would Love?"
      ctaText="Tell TheGiftShuffle it is for her and your budget, and get an instant, top-rated self-care gift idea in one click. No guessing required."
      faqs={[
        {
          q: 'What are the best self-care gifts for her?',
          a: 'The best self-care gifts for her turn a routine into a treat: a spa or shower-steamer set, a silk sleep mask, a plush robe, a facial or heated eye massager, an aromatherapy diffuser, a bath tray, or a cozy tea sampler. Pair a relaxation item with a scent she loves and it always feels considered.',
        },
        {
          q: 'What self-care gift should I get my wife or girlfriend?',
          a: 'If you are unsure, you cannot go wrong with a small at-home spa experience: a spa gift set, aromatherapy shower steamers, a silk sleep mask, or a neck and shoulder massager with heat. These feel indulgent, do not require knowing her exact taste, and she will actually use them.',
        },
        {
          q: 'What are self-care gifts every woman deserves?',
          a: 'The self-care gifts nearly every woman appreciates are the small luxuries she would not buy herself: a silk pillowcase or sleep mask, a quality candle or diffuser, a plush robe, a spa or bath set, and a massager for tension. They signal you want her to slow down and be pampered.',
        },
        {
          q: 'What is a good self-care gift for her under $50?',
          a: 'Under $50, standout self-care gifts for her include an aromatherapy diffuser, a silk sleep mask, a spa gift set, shower steamers, a Himalayan salt lamp, a tea sampler, or a bamboo bath tray. Each creates a calming ritual without a big price tag.',
        },
        {
          q: 'Are self-care gifts a good idea for a wife or girlfriend who has everything?',
          a: 'Yes. For someone who has everything, self-care gifts work because they are about an experience, not another object: a facial or eye massager, a premium candle, a spa night set, or a plush robe give her permission to relax. Make it feel like a treat, not a chore.',
        },
      ]}
      relatedHeading="More Gift Guides for Her"
      relatedLinks={[
        { href: '/self-care-gifts', label: 'All Self-Care & Wellness Gifts' },
        { href: '/best-gifts-for-her-2026', label: 'Best Gifts for Her 2026' },
        { href: '/best-beauty-gifts-2026', label: 'Best Beauty Gifts 2026' },
        { href: '/luxury-gifts-for-her', label: 'Luxury Gifts for Her' },
        { href: '/gifts-for-girlfriend', label: 'Gifts for Your Girlfriend' },
        { href: '/help-me-pick-a-gift', label: 'Help Me Pick a Gift' },
      ]}
    />
  );
}
