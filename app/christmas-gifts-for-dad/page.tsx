import type { Metadata } from 'next';
import GiftGuideTemplate from '@/components/GiftGuideTemplate';
import { curate, shufflePool, ALL } from '@/lib/giftSelect';

const URL = 'https://www.thegiftshuffle.com/christmas-gifts-for-dad';

export const metadata: Metadata = {
  title: 'Christmas Gifts for Dad 2026: Gifts He Will Actually Use',
  description:
    'The best Christmas gifts for dad in 2026: winter gear, grilling and coffee upgrades, cozy flannel and this season\'s trending gadgets, all top-rated, at every budget.',
  keywords: [
    'christmas gifts for dad',
    'christmas gift ideas for dad',
    'best christmas gifts for dad 2026',
    'christmas presents for dad',
    'christmas gifts for dad who has everything',
    'christmas gifts for dad from daughter',
  ],
  openGraph: {
    title: 'Christmas Gifts for Dad 2026: Gifts He Will Actually Use',
    description: 'Top-rated Christmas gifts for dad: winter gear, grilling and coffee upgrades, and trending gadgets.',
    type: 'website',
    url: URL,
    images: [{ url: 'https://www.thegiftshuffle.com/images/heroes/christmas-gifts-for-dad.jpg', width: 1200, height: 800 }],
  },
  alternates: { canonical: URL },
};

const match = (p: { recipients?: string[]; occasions?: string[] }) =>
  !!p.recipients?.includes('dad') && !!p.occasions?.includes('holiday');
// Winter angle: cold-weather gear, cozy flannel, coffee and grilling, plus the
// season's trending gadgets, so the grid differs from the evergreen dad guide.
const TRENDING = new Set(['trend26-mens-flannel-pajamas', 'trend26-bluetooth-beanie', 'trend26-ninja-slushi']);
// Whole words only: a bare "thermos" matched "Thermostat".
const WINTER = /\b(flannel|pajamas?|slippers?|grill|smoker|whiskey|bourbon|coffee|espresso|thermos|beanie|gloves?|heated|jacket|hoodie|blanket|stanley|yeti|meater|cast iron|fire pit|solo stove|socks|carhartt|hand warmers?)\b/i;
const isPick = (p: { id?: string; name?: string }) => (!!p.id && TRENDING.has(p.id)) || (!!p.name && WINTER.test(p.name));
const DEPRIORITIZE = ['beauty', 'parenting', 'baby-shower', 'wedding', 'ai-smart-home', 'car-accessories', 'office', 'travel'];

const grid = curate({
  match,
  minPrice: 15,
  minRating: 4.5,
  sort: 'social',
  deprioritizeTags: DEPRIORITIZE,
  preferMatch: isPick,
  recipientCap: 40,
  limit: 36,
  pool: ALL,
});
const shuffle = shufflePool(match, ALL, { excludeTags: DEPRIORITIZE, keepMatch: isPick });

export default function Page() {
  return (
    <GiftGuideTemplate
      canonicalUrl={URL}
      schemaName="Christmas Gifts for Dad 2026"
      schemaDescription="The best Christmas gifts for dad in 2026, curated by TheGiftShuffle"
      breadcrumbLabel="Christmas Gifts for Dad"
      breadcrumbHref="/christmas-gifts-for-dad"
      heroSrc="/images/heroes/christmas-gifts-for-dad.jpg"
      heroAlt="Christmas gifts for dad on cream linen: leather gloves, a steel thermos, a knit beanie, coffee beans, a multitool and wool socks with pine and coral ribbon"
      h1="Christmas Gifts for Dad"
      updated="2026-11-01"
      intro={
        <>
          <p>
            The best <strong>Christmas gifts for dad</strong> earn a spot in his winter routine:
            gear for cold mornings, a better coffee or grill setup, cozy flannel for Christmas Day,
            or the gadget everyone is talking about this year. Every pick is rated
            <strong> 4.5 stars or higher</strong> and chosen for the season.
          </p>
          <p className="text-base text-gray-600">
            Dad says he does not need anything? Upgrade something he already uses every day. Hit
            shuffle for a fresh idea every click.
          </p>
        </>
      }
      answer={{
        heading: 'What Should I Get My Dad for Christmas?',
        body: (
          <p>
            Get dad an upgrade to something he does every winter day: an
            <strong> insulated tumbler or thermos</strong> for the commute, <strong>warm gloves or
            a beanie</strong> for the cold, a <strong>grilling or coffee upgrade</strong> for the
            weekend, or <strong>flannel pajamas</strong> for Christmas morning. If he likes gadgets,
            this year&apos;s standouts are the Ninja SLUSHi and a Bluetooth beanie. Useful and
            well made beats novelty every time.
          </p>
        ),
      }}
      shuffleHeading="Shuffle Christmas Gifts for Dad"
      shuffleProducts={shuffle}
      gridHeading={`${grid.length} Top-Rated Christmas Gifts for Dad`}
      gridProducts={grid}
      ctaHeading="Still Stuck on Dad?"
      ctaText="Tell TheGiftShuffle what he is into and your budget, and get a top-rated Christmas idea for dad in one click."
      faqs={[
        { q: 'What is a good Christmas gift for dad in 2026?', a: 'For 2026, strong Christmas picks for dad are winter-ready and practical: an insulated tumbler or thermos, leather gloves, a Bluetooth beanie, flannel pajamas, a grilling thermometer or cast iron upgrade, and better coffee gear. For a bigger splurge, the Ninja SLUSHi frozen drink maker is one of the season\'s most talked-about gadgets.' },
        { q: 'What do you get a dad who has everything for Christmas?', a: 'Skip new categories and upgrade what he already uses: a better version of his travel mug, wallet, gloves or grill tool, or a consumable he enjoys like premium coffee or a hot sauce set. An experience you share, like a day out together, also lands with dads who own it all.' },
        { q: 'What can I get my dad for Christmas on a budget?', a: 'Under $50 there are plenty of good options: wool socks and a beanie, a quality multitool, an insulated tumbler, a hot sauce or coffee sampler, or warm gloves. Small and useful beats big and gimmicky. See also our stocking stuffers for dad.' },
        { q: 'What are good Christmas gifts for dad from a daughter or son?', a: 'Personal touches matter more than price: pair a practical gift he will use daily with a handwritten note, a printed photo, or a plan to do something together, like cooking his favorite meal or a round of golf in spring.' },
      ]}
      relatedHeading="More Christmas Gift Guides"
      relatedLinks={[
        { href: '/christmas-gifts-for-mom', label: 'Christmas Gifts for Mom' },
        { href: '/christmas-gifts-for-him', label: 'Christmas Gifts for Him' },
        { href: '/stocking-stuffers-for-dad', label: 'Stocking Stuffers for Dad' },
        { href: '/gift-ideas-for-dad', label: 'Gift Ideas for Dad' },
        { href: '/trending-christmas-gifts-2026', label: 'Trending Christmas Gifts 2026' },
        { href: '/christmas-gift-ideas', label: 'Christmas Gift Ideas' },
        { href: '/gifts-for-people-who-have-everything', label: 'For People Who Have Everything' },
      ]}
    />
  );
}
