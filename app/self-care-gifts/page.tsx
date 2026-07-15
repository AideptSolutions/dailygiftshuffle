import type { Metadata } from 'next';
import GiftGuideTemplate from '@/components/GiftGuideTemplate';
import { curate, shufflePool, ALL } from '@/lib/giftSelect';

const URL = 'https://www.thegiftshuffle.com/self-care-gifts';

export const metadata: Metadata = {
  title: 'Self-Care & Wellness Gifts 2026: 30+ Relaxing, Top-Rated Picks | TheGiftShuffle',
  description:
    'The best self-care and wellness gifts for 2026: massage guns, spa sets, aromatherapy, silk sleep masks, cozy relaxation picks and more. Top-rated self-care gift ideas for every budget.',
  keywords: [
    'self care gifts',
    'wellness gifts',
    'spa gifts',
    'self care gift box',
    'relaxation gifts',
    'self care gifts for women',
    'wellness gift ideas 2026',
    'cozy self care gifts',
    'gifts for relaxation',
    'stress relief gifts',
  ],
  openGraph: {
    title: 'Self-Care & Wellness Gifts 2026: 30+ Relaxing, Top-Rated Picks | TheGiftShuffle',
    description: 'Massage guns, spa sets, aromatherapy and cozy relaxation picks. Top-rated self-care gift ideas for every budget.',
    type: 'website',
    url: URL,
    images: [{ url: 'https://www.thegiftshuffle.com/api/og?title=Self-Care%20%26%20Wellness%20Gifts%20%7C%20TheGiftShuffle', width: 1200, height: 630 }],
  },
  alternates: { canonical: URL },
};

// Curated self-care set (id-prefixed) leads, then fills with genuinely
// self-care-relevant products already in the catalog (spa/relaxation/recovery
// gear), gated by a keyword list so nothing off-theme sneaks in.
const SELFCARE_KW =
  /massage|\bspa\b|diffuser|silk|weighted blanket|\bbath\b|candle|robe|foam roller|aromatherapy|yoga|sleep mask|gua sha|jade|pillowcase|\bblanket\b|\btea\b|shower steamer|salt lamp|essential oil|meditation|journal|slipper|steamer|sauna|eye mask|\bneck\b|scrunchie|bath bomb|hand balm|hand cream/i;
const isSelfCare = (p: { id?: string }) => !!p.id?.startsWith('selfcare-');
const isSelfCareRelevant = (p: { name?: string; price?: number; tags?: string[] }) =>
  (p.price ?? 999) <= 150 &&
  !!p.tags?.some((t) => ['beauty', 'fitness', 'home'].includes(t)) &&
  !!p.name && SELFCARE_KW.test(p.name);

const selfcareItems = curate({ match: isSelfCare, minRating: 4.3, sort: 'social', recipientCap: 30, limit: 20, pool: ALL });
const broadItems = curate({ match: isSelfCareRelevant, minRating: 4.4, sort: 'social', recipientCap: 6, limit: 40, pool: ALL });
const seen = new Set(selfcareItems.map((p) => p.id));
const grid = [...selfcareItems, ...broadItems.filter((p) => !seen.has(p.id))].slice(0, 40);
const shuffle = shufflePool((p) => isSelfCare(p) || isSelfCareRelevant(p), ALL);

export default function Page() {
  return (
    <GiftGuideTemplate
      canonicalUrl={URL}
      schemaName="Self-Care & Wellness Gifts 2026"
      schemaDescription="The best self-care and wellness gifts for 2026, curated by TheGiftShuffle"
      breadcrumbLabel="Self-Care & Wellness Gifts"
      breadcrumbHref="/self-care-gifts"
      heroSrc="/images/heroes/self-care-gifts.jpg"
      heroAlt="A calming self-care spread with a candle, towels and spa items"
      h1="Self-Care & Wellness Gifts for 2026"
      intro={
        <>
          <p>
            The <strong>best self-care and wellness gifts for 2026</strong> help someone actually
            slow down: a percussion massage gun for sore muscles, a heated eye massager for screen
            fatigue, a spa set or shower steamers for an at-home spa night, or a diffuser and silk
            sleep mask for better rest. Self-care is one of the biggest gifting trends right now,
            and these picks are the ones people genuinely use.
          </p>
          <p className="text-base text-gray-600">
            Every idea below is top-rated and chosen to feel like a small luxury, not a chore.
            Not sure which fits? Hit shuffle for an instant self-care gift, or browse the full list.
          </p>
        </>
      }
      shuffleHeading="Shuffle Self-Care Gift Ideas"
      shuffleProducts={shuffle}
      gridHeading="Top-Rated Self-Care & Wellness Gifts, Ranked"
      gridProducts={grid}
      ctaHeading="Not Sure Which to Pick?"
      ctaText="Tell TheGiftShuffle who it is for and your budget, and get an instant, top-rated self-care gift idea in one click."
      faqs={[
        {
          q: 'What are the best self-care gifts for 2026?',
          a: 'The best self-care gifts in 2026 help someone relax and recover: a percussion massage gun, a heated eye massager, a spa or shower-steamer set, an aromatherapy diffuser, a silk sleep mask, a weighted blanket, or a cozy tea sampler. The winners feel like a small luxury they would not buy for themselves.',
        },
        {
          q: 'What is a good self-care gift for someone stressed or busy?',
          a: 'For someone stressed or overworked, go for quick, tangible relief: a shiatsu neck and shoulder massager with heat, a heated eye massager for screen fatigue, an aromatherapy diffuser, or a bath tray for a proper wind-down. Gifts that create a five-minute ritual land better than one more thing to do.',
        },
        {
          q: 'What are good wellness gifts under $50?',
          a: 'Great wellness gifts under $50 include an aromatherapy diffuser, a silk sleep mask, a spa gift set, shower steamers, a Himalayan salt lamp, a tea sampler, or a guided gratitude journal. Each creates a calming ritual without a big price tag.',
        },
        {
          q: 'What are good self-care gifts for women?',
          a: 'Women love self-care gifts that turn everyday routines into a treat: a spa or shower-steamer set, a silk sleep mask, a plush robe, a facial or eye massager, a candle, or a bath tray. Pair a relaxation item with a scent she loves and it always feels considered.',
        },
        {
          q: 'What should a self-care gift box include?',
          a: 'A well-rounded self-care gift box mixes a relaxation ritual, a cozy comfort, and a treat: for example a candle or diffuser, a bath or shower-steamer set, a silk sleep mask or plush socks, and a nice tea or chocolate. The mix of senses is what makes it feel indulgent.',
        },
      ]}
      relatedHeading="More Gift Guides"
      relatedLinks={[
        { href: '/self-care-gifts-for-her', label: 'Self-Care Gifts for Her' },
        { href: '/best-beauty-gifts-2026', label: 'Best Beauty Gifts 2026' },
        { href: '/best-gifts-for-her-2026', label: 'Best Gifts for Her 2026' },
        { href: '/best-fitness-gifts-2026', label: 'Best Fitness Gifts 2026' },
        { href: '/luxury-gifts-for-her', label: 'Luxury Gifts for Her' },
        { href: '/help-me-pick-a-gift', label: 'Help Me Pick a Gift' },
      ]}
    />
  );
}
