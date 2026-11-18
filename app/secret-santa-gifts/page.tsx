import type { Metadata } from 'next';
import GiftGuideTemplate, { type GiftGuideGroup } from '@/components/GiftGuideTemplate';
import { byIds } from '@/lib/giftSelect';
import type { CompactProduct } from '@/components/ProductCard';

const URL = 'https://www.thegiftshuffle.com/secret-santa-gifts';

// Title and description approved by the owner on 2026-11-17. The "44" must
// match the number of gifts on the page (grid.length below).
export const metadata: Metadata = {
  title: 'Best Secret Santa Gifts 2026: 44 Ideas for Any Budget',
  description:
    'The best Secret Santa gifts for 2026: 44 hand-picked ideas sorted by budget ($15, $25 and $50), plus picks for coworkers, the boss and couples.',
  keywords: [
    'secret santa gifts',
    'secret santa gift ideas',
    'best secret santa gifts 2026',
    'secret santa gifts for coworkers',
    'secret santa gifts under 15',
    'secret santa gifts under 25',
    'secret santa gifts under 50',
    'office secret santa ideas',
    'secret santa gifts for couples',
    'secret santa for someone you dont know',
  ],
  openGraph: {
    title: 'Best Secret Santa Gifts 2026: 44 Ideas for Any Budget',
    description: '44 hand-picked Secret Santa gifts sorted by budget ($15, $25 and $50), plus picks for coworkers, the boss and couples.',
    type: 'website',
    url: URL,
    images: [{ url: 'https://www.thegiftshuffle.com/api/og?title=Secret%20Santa%20Gifts%20%7C%20TheGiftShuffle', width: 1200, height: 630 }],
  },
  alternates: { canonical: URL },
};

// This page is hand-picked, one product at a time, so nothing here is chosen
// or ordered by a star rating. /white-elephant-gifts owns the gag-gift lane;
// this page is the gift you would be glad to receive from a coworker.

// Budget picks, in the order they should appear. Each is placed in a budget
// section by its price on the day of the build, so a section heading never
// promises a price the card does not show.
const BUDGET_PICKS = [
  // $15 and under
  'santa-ferrero-rocher',
  'santa-harney-hot-cinnamon',
  'santa-happy-salmon',
  'santa-mug-warmer',
  'santa-yankee-balsam-cedar',
  'santa-burts-bees-hand-repair',
  'santa-parker-jotter',
  'santa-zulay-frother',
  'santa-mikes-hot-honey',
  'santa-flybyjing-chili-crisp',
  'santa-taco-vs-burrito',
  'santa-paint-by-sticker',
  // $15 to $25
  'santa-yeti-lowball',
  'santa-lego-happy-plants',
  'santa-codenames',
  'santa-hydro-flask-mug',
  'santa-barefoot-dreams-socks',
  'santa-jlab-earbuds',
  'santa-ravensburger-reading-room',
  'santa-hot-chocolate-set',
  // $25 to $50
  'santa-jbl-go-4',
  'santa-atlas-coffee',
  'forher2-capri-blue-candle',
  'fri-006', // Catan
  'elephant-the-comfy',
  'trv26-crock-pot-lunch-box',
  'sport-owala-40oz',
  'selfcare-journal', // The Five Minute Journal
];
// Stand-ins, used only if a pick above climbs past $50, to keep the count.
const BUDGET_RESERVE = ['stuffer-bananagrams', 'wed26-godonlif-candle-warmer', 'cpl-003', 'lux-voluspa-candle'];
const BUDGET_COUNT = BUDGET_PICKS.length;

const affordable = (p: { price: number }) => p.price <= 50;
const budget = byIds(BUDGET_PICKS).filter(affordable);
for (const p of byIds(BUDGET_RESERVE)) {
  if (budget.length >= BUDGET_COUNT) break;
  if (affordable(p)) budget.push(p);
}

const asCards = (list: ReturnType<typeof byIds>) => list as CompactProduct[];

const groups: GiftGuideGroup[] = [
  {
    id: 'under-15',
    label: '$15 and under',
    heading: 'Secret Santa Gifts for $15 and Under',
    blurb: 'For the office exchange with a tight limit: small, well-made and easy to like.',
    products: asCards(budget.filter((p) => p.price <= 15)),
  },
  {
    id: 'under-25',
    label: '$15 to $25',
    heading: 'Secret Santa Gifts from $15 to $25',
    blurb: 'The most common budget, and enough for a name-brand gift people keep.',
    products: asCards(budget.filter((p) => p.price > 15 && p.price <= 25)),
  },
  {
    id: 'under-50',
    label: '$25 to $50',
    heading: 'Secret Santa Gifts from $25 to $50',
    blurb: 'For family and close-friend exchanges with room for something bigger.',
    products: asCards(budget.filter((p) => p.price > 25)),
  },
  {
    id: 'coworker',
    label: 'A coworker you barely know',
    heading: 'For a Coworker You Barely Know',
    blurb: 'Safe ground: coffee, a good notebook, a snack to share, a light for reading.',
    products: asCards(byIds(['digital-starbucks-25', 'off-006', 'wed26-urban-accents-movie-night', 'admin-1772857976780-x8wha'])),
  },
  {
    id: 'boss',
    label: 'The boss',
    heading: 'For the Boss',
    blurb: 'Desk-worthy and modest. Nothing personal, nothing that looks like trying too hard.',
    products: asCards(byIds(['off-003', 'fin-005', 'selfcare-tea-sampler', 'gdn26-lego-botanicals-succulents'])),
  },
  {
    id: 'funny',
    label: 'Funny but office-safe',
    heading: 'Funny but Office-Safe',
    blurb: 'A laugh nobody has to explain to HR.',
    products: asCards(byIds(['elephant-desk-punching-bag', 'elephant-useless-box', 'santa-tube-guy', 'elephant-magic-8-ball'])),
  },
  {
    id: 'couples',
    label: 'Couples',
    heading: 'Secret Santa Gifts for Couples',
    blurb: 'For a couples exchange, or when the name you drew comes as a pair.',
    products: asCards(byIds(['couples-anv-2', 'wed26-lets-get-deep', 'couples-anv-3', 'wed26-electric-fondue-set'])),
  },
].filter((g) => g.products.length > 0);

const grid = groups.flatMap((g) => g.products);

export default function Page() {
  return (
    <GiftGuideTemplate
      canonicalUrl={URL}
      schemaName="Best Secret Santa Gifts 2026"
      schemaDescription="The best secret santa gift ideas for 2026, hand-picked by TheGiftShuffle and sorted by budget"
      breadcrumbLabel="Secret Santa Gifts"
      breadcrumbHref="/secret-santa-gifts"
      heroSrc="/images/heroes/secret-santa-gifts.jpg"
      heroAlt="Secret Santa gifts on cream linen: a ceramic mug, wool socks, a succulent, playing cards, a candle and two kraft-wrapped presents with tags"
      h1="Best Secret Santa Gifts for 2026"
      intro={
        <>
          <p>
            Drew a name you barely know? These are the <strong>best secret santa gifts</strong> for
            2026: {grid.length} hand-picked ideas sorted by budget, so you can jump straight to the
            $15, $25 or $50 limit your exchange set. Every one is safe enough to never miss and good
            enough to never feel phoned in.
          </p>
          <p className="text-base text-gray-600">
            Further down are picks for a coworker you barely know, for the boss, for an office that
            likes a laugh, and for couples. Shuffle for an instant idea or browse the list below.
          </p>
        </>
      }
      answer={{
        heading: 'What Should I Get for Secret Santa?',
        body: (
          <p>
            For secret santa, pick something <strong>broadly likeable and well made</strong>, right
            at the budget. For <strong>$15 and under</strong>, a box of Ferrero Rocher, a tin of
            Harney &amp; Sons tea, a mug warmer or a quick card game like Happy Salmon. For{' '}
            <strong>$25</strong>, a YETI lowball, Codenames, an insulated coffee mug or a LEGO desk
            plant. For <strong>$50</strong>, a JBL Go 4 speaker, a coffee sampler or a Capri Blue
            candle. Use the one thing you know about them, their desk, their coffee habit, their
            sense of humor, to pick a lane, and avoid anything too personal like perfume or clothing
            sizes.
          </p>
        ),
      }}
      shuffleHeading="Shuffle Secret Santa Ideas"
      shuffleProducts={grid}
      gridHeading={`${grid.length} Secret Santa Gifts, by Budget and by Person`}
      gridProducts={grid}
      gridGroups={groups}
      ctaHeading="Drew a Name You Know Nothing About?"
      ctaText="Tell TheGiftShuffle the budget, and get an instant, safe-but-good gift idea in one click."
      faqs={[
        { q: 'What is a good secret santa gift for a coworker?', a: 'For a coworker, safe and appreciated picks are a mug warmer, an insulated coffee mug or tumbler, a good notebook or pen, a candle, tea or chocolate, or a coffee gift card. Office-appropriate, useful, and no guessing at personal taste required.' },
        { q: 'How much do you spend on secret santa?', a: 'Most secret santa exchanges set a budget of $20 to $30, and office exchanges sometimes $15 to $25. Spend right at the budget; the goal is the most thoughtful gift within the limit, not going under or over it.' },
        { q: 'What are the top 10 secret santa gifts for 2026?', a: 'Ten that suit almost any exchange: Ferrero Rocher chocolates, Harney & Sons Hot Cinnamon Spice tea, a Mr. Coffee mug warmer, a Yankee Candle in a holiday scent, the Happy Salmon card game, a YETI Rambler lowball, Codenames, the LEGO Botanicals Happy Plants set, a Hydro Flask coffee mug and a JBL Go 4 speaker.' },
        { q: 'What are good secret santa gifts under $15?', a: 'For $15 and under, strong picks include a box of Ferrero Rocher, a tin of Harney & Sons tea, a milk frother, a jar of chili crisp or hot honey, a Parker Jotter pen, a hand cream set, or a card game like Happy Salmon or Taco vs Burrito. Small but well made beats big and generic.' },
        { q: 'What are good secret santa gifts under $25?', a: 'Up to $25 you can give a name-brand gift people keep: a YETI Rambler lowball, a Hydro Flask coffee mug, Codenames, a LEGO desk plant set, soft Barefoot Dreams socks, wireless earbuds, a 1000 piece puzzle or a hot chocolate gift set.' },
        { q: 'What do you get for secret santa when you do not know the person?', a: 'When you barely know them, stay on universal ground: chocolate, tea or coffee, a candle, a nice mug or tumbler, a notebook, or a coffee gift card. Things people use up or use daily are the closest thing to a guaranteed hit.' },
        { q: 'What is a good secret santa gift for your boss?', a: 'Keep it modest and desk-worthy: a good pen such as a Lamy Safari or Parker Jotter, a quality notebook, a tea assortment, or a small desk plant that needs no care. Avoid anything personal, expensive or jokey unless you know them well.' },
        { q: 'What are good secret santa gifts for couples?', a: 'For a couple, choose something they can share: a date night book like The Adventure Challenge, a question card game, a two-person journal, a fondue set, or a board game such as Codenames or Catan.' },
        { q: 'Should a secret santa gift be funny or practical?', a: 'Read the room: office exchanges usually reward practical with a touch of personality, while friend groups often want funny. A safe play is practical-but-fun, like a desktop punching bag or a clever desk toy, which lands in both settings. For pure gag gifts, see our white elephant guide.' },
        { q: 'What should you not give for secret santa?', a: 'Skip anything that depends on size or personal taste, such as clothing and perfume, anything that could read as a comment on the person, such as diet or grooming products, and alcohol unless you are sure they drink. Going far over the budget is also a mistake: it makes other gifts look small.' },
      ]}
      relatedHeading="More Holiday Gift Guides"
      relatedLinks={[
        { href: '/white-elephant-gifts', label: 'White Elephant Gifts' },
        { href: '/stocking-stuffers', label: 'Stocking Stuffers' },
        { href: '/gifts-for-coworkers', label: 'Gifts for Coworkers' },
        { href: '/gifts-under-25', label: 'Gifts Under $25' },
        { href: '/gifts-under-50', label: 'Gifts Under $50' },
        { href: '/christmas-gift-ideas', label: 'Christmas Gift Ideas' },
      ]}
    />
  );
}
