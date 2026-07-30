import type { Metadata } from 'next';
import GiftGuideTemplate from '@/components/GiftGuideTemplate';
import { curate, shufflePool, ALL } from '@/lib/giftSelect';

const URL = 'https://www.thegiftshuffle.com/gifts-for-crafters';

export const metadata: Metadata = {
  title: 'Gifts for Crafters & Creative People: 30+ Top-Rated Craft & Art Gifts | TheGiftShuffle',
  description:
    'The best gifts for crafters, artists and creative people: pottery wheels, art supplies, crochet and knitting kits, resin, candle-making and more. Top-rated craft gift ideas for every maker.',
  keywords: [
    'gifts for crafters',
    'gifts for creative people',
    'gifts for artists',
    'craft gifts',
    'art gifts',
    'gifts for makers',
    'gifts for knitters',
    'gifts for painters',
    'gifts for someone who likes crafts',
    'creative gift ideas',
  ],
  openGraph: {
    title: 'Gifts for Crafters & Creative People: 30+ Top-Rated Craft & Art Gifts | TheGiftShuffle',
    description: 'Pottery wheels, art supplies, crochet and knitting kits, resin, candle-making and more. Top-rated craft gift ideas for every maker.',
    type: 'website',
    url: URL,
    images: [{ url: 'https://www.thegiftshuffle.com/api/og?title=Gifts%20for%20Crafters%20%7C%20TheGiftShuffle', width: 1200, height: 630 }],
  },
  alternates: { canonical: URL },
};

// Curated craft set (id-prefixed) leads, then fills with genuinely craft-relevant
// products already in the catalog (embroidery, macrame, calligraphy, diamond
// painting, watercolor, leather craft), gated by a craft-specific keyword list.
const CRAFT_KW =
  /\b(paint|acrylic|watercolor|gouache|canvas|pottery|clay|sculpt|crochet|knit|knitting|yarn|embroider|cross.?stitch|sewing|calligraph|lettering|sketch|drawing|origami|macrame|resin|candle.?making|wood.?burn|needle.?felt|punch.?needle|beading|jewelry.?making|diamond.?paint|easel|sketchbook|paint.?brush|brush.?pen|leather.?craft|art.?set|craft.?kit)\b/i;
const isCraft = (p: { id?: string }) => !!p.id?.startsWith('craft-');
const isCraftRelevant = (p: { name?: string; tags?: string[] }) =>
  !!p.tags?.includes('hobby') && !!p.name && CRAFT_KW.test(p.name);

// Craft products naturally run lower on review counts, so the lead set uses a 4.0 bar.
const craftItems = curate({ match: isCraft, minRating: 4.0, sort: 'social', recipientCap: 30, limit: 26, pool: ALL });
const broadItems = curate({ match: isCraftRelevant, minRating: 4.2, sort: 'social', recipientCap: 8, limit: 40, pool: ALL });
const seen = new Set(craftItems.map((p) => p.id));
const grid = [...craftItems, ...broadItems.filter((p) => !seen.has(p.id))].slice(0, 36);
const shuffle = shufflePool((p) => isCraft(p) || isCraftRelevant(p), ALL);

export default function Page() {
  return (
    <GiftGuideTemplate
      canonicalUrl={URL}
      schemaName="Gifts for Crafters & Creative People"
      schemaDescription="The best craft and art gifts for crafters, artists and creative people, curated by TheGiftShuffle"
      breadcrumbLabel="Gifts for Crafters"
      breadcrumbHref="/gifts-for-crafters"
      heroSrc="/images/heroes/gifts-for-crafters.jpg"
      heroAlt="A creative craft table with art supplies, paint brushes and yarn"
      h1="Gifts for Crafters & Creative People"
      intro={
        <>
          <p>
            These are the <strong>best gifts for crafters and creative people</strong> in 2026: quality
            supplies and all-in-one kits for the craft they already love, or a fun way to try a new one.
            From <strong>pottery wheels and art supplies</strong> to <strong>crochet and knitting kits</strong>,
            resin, candle-making and hand-lettering, every pick is top-rated and chosen to actually get used.
          </p>
          <p className="text-base text-gray-600">
            Not sure which craft is theirs? A versatile paint set, a beautiful sketchbook, or a beginner kit
            is always welcome. Browse the picks below, or hit shuffle for an instant idea in your budget.
          </p>
        </>
      }
      answer={{
        heading: 'What Are the Best Gifts for Crafters?',
        body: (
          <p>
            The best gifts for crafters are quality supplies for the craft they love, or a beginner kit to
            try a new one: a <strong>mini pottery wheel</strong>, a <strong>professional paint or gouache
            set</strong>, a <strong>crochet or knitting kit</strong>, an <strong>epoxy resin</strong> or{' '}
            <strong>candle-making kit</strong>, or a <strong>wood-burning or hand-lettering set</strong>.
            Match the gift to their craft, or pick an all-in-one starter kit so they can finish a first
            project, and skip generic supplies they may already own. Not sure? Hit shuffle below for an
            instant, top-rated pick.
          </p>
        ),
      }}
      shuffleHeading="Shuffle Craft Gift Ideas"
      shuffleProducts={shuffle}
      gridHeading="Top-Rated Gifts for Crafters & Creatives, Ranked"
      gridProducts={grid}
      ctaHeading="Not Sure Which Craft Is Theirs?"
      ctaText="Tell TheGiftShuffle who it is for and your budget, and get an instant, top-rated craft gift idea in one click."
      faqs={[
        {
          q: 'What are the best gifts for crafters?',
          a: 'The best gifts for crafters are quality supplies for a craft they love, or a beginner kit to try a new one: a mini pottery wheel, a professional acrylic or gouache paint set, a crochet or knitting kit, an epoxy resin kit, a candle-making kit, or a hand-lettering brush-pen set. Match it to their craft and it always lands.',
        },
        {
          q: 'What do you get someone who likes arts and crafts?',
          a: 'For an arts-and-crafts lover, pair supplies with a project: a paint-by-numbers or diamond-painting kit, a bead and jewelry-making kit, an embroidery or macrame kit, or a good set of brushes with a sketchbook. A kit that includes everything to finish one project is the most satisfying gift for any crafter.',
        },
        {
          q: 'What are good gifts for artists and creative people?',
          a: 'Creative people appreciate an upgrade to their materials: a professional paint or pencil set, quality brushes, a large sketchbook, an LED tracing pad, or a gouache set. If you are unsure of their medium, a versatile set of acrylics or a beautiful sketchbook is a safe and welcome gift.',
        },
        {
          q: 'What is a good gift for a knitter or crocheter?',
          a: 'For knitters and crocheters, an ergonomic hook or needle set (Clover Amour is the favorite), a soft chunky-yarn bundle, a project bag, or a beginner kit with yarn and patterns all get used. Quality tools that stay gentle on the hands over long projects are especially appreciated.',
        },
        {
          q: 'What are unique craft gifts for beginners?',
          a: 'Great beginner craft gifts are all-in-one kits that make success easy: a learn-to-crochet or knit kit, a paint-by-numbers canvas, an air-dry clay set, a candle-making kit, or a resin starter kit. They include everything needed to finish a first project, which is what keeps a new hobby from stalling.',
        },
        {
          q: 'What craft gift do you get someone who has everything?',
          a: 'For a crafter who has it all, introduce a new medium or upgrade a well-worn tool: a mini pottery wheel, an epoxy resin or wood-burning kit, a premium gouache set, or a top-tier ergonomic hook set. Trying a fresh craft, or upgrading a tool they use constantly, feels fresh even to a seasoned maker.',
        },
      ]}
      relatedHeading="More Gift Guides"
      relatedLinks={[
        { href: '/category/hobby', label: 'All Hobby Gifts' },
        { href: '/self-care-gifts', label: 'Self-Care & Wellness Gifts' },
        { href: '/gifts-under-50', label: 'Gifts Under $50' },
        { href: '/birthday-gift-ideas', label: 'Birthday Gift Ideas' },
        { href: '/best-gifts-for-her-2026', label: 'Best Gifts for Her 2026' },
        { href: '/category/diy-tools', label: 'DIY & Tools Gifts' },
      ]}
    />
  );
}
