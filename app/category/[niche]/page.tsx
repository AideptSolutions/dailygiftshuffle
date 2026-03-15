import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import Navbar from '@/components/Navbar';
import AdSlot from '@/components/AdSlot';
import ProductCard from '@/components/ProductCard';
import products from '@/data/products-catalog';
import type { NicheTag } from '@/data/products-catalog';

type Niche = NicheTag;

interface NicheMeta {
  title: string;
  heading: string;
  description: string;
  emoji: string;
  coverImage: string;
  faqs: { q: string; a: string }[];
}

const NICHE_META: Record<Niche, NicheMeta> = {
  tech: {
    title: 'Best Tech Gifts & Gadgets 2025',
    heading: 'Best Tech Gifts & Gadgets',
    description: 'From wireless earbuds to smart home devices, find the best tech gifts for every gadget lover on your list.',
    emoji: '💻',
    coverImage: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=900&h=300&fit=crop&auto=format',
    faqs: [
      { q: 'What are the best tech gifts under $50?', a: 'Wireless earbuds, Bluetooth speakers, and smart plugs make excellent tech gifts under $50 that anyone will appreciate.' },
      { q: 'What tech gifts are best for someone who has everything?', a: 'Consider unique gadgets like a smart ring, portable projector, or a subscription to a premium streaming service.' },
      { q: 'Are tech gifts good for birthdays?', a: 'Absolutely! Tech gifts are among the most popular birthday gifts because they are practical, exciting, and available at every price point.' },
      { q: 'What tech gifts work for non-techies?', a: 'Smart speakers, e-readers, and simple fitness trackers are intuitive enough for anyone to enjoy.' },
      { q: 'What is a good tech gift for a teen?', a: 'Wireless earbuds, gaming accessories, and LED light strips are huge hits with teens right now.' },
    ],
  },
  'diy-tools': {
    title: 'Best DIY & Tools Gifts 2025',
    heading: 'Best DIY & Tools Gifts',
    description: 'Discover top-rated home and DIY gifts — from tool sets to smart home gadgets — perfect for the handy person in your life.',
    emoji: '🔨',
    coverImage: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=900&h=300&fit=crop&auto=format',
    faqs: [
      { q: 'What are good home gifts for a housewarming?', a: 'Popular housewarming gifts include essential oil diffusers, high-quality candles, personalized door mats, and smart home devices.' },
      { q: 'What DIY gifts do people actually use?', a: 'Practical DIY gifts like quality tool sets, magnetic wristbands, and workshop organizers get used constantly by hobbyist builders.' },
      { q: 'What home gifts are good for someone who loves to decorate?', a: 'Wall art prints, decorative throw pillows, stylish planters, and custom photo items are great for home decorators.' },
      { q: 'Are home gifts good for couples?', a: 'Yes! Couples love gifts that improve their shared space, like matching serveware sets, cozy blankets, and smart home gadgets.' },
    ],
  },
  finance: {
    title: 'Best Finance & Money Gifts 2025',
    heading: 'Best Finance & Money-Savvy Gifts',
    description: 'Help the financial-minded people in your life level up with books, tools, and experiences focused on wealth and smart money habits.',
    emoji: '💰',
    coverImage: 'https://images.unsplash.com/photo-1559526324-593bc073d938?w=900&h=300&fit=crop&auto=format',
    faqs: [
      { q: 'What are good gifts for someone interested in finance?', a: 'Books on personal finance, budgeting planners, investing courses, and premium financial apps make great gifts for money-minded people.' },
      { q: 'What finance gifts are good for young adults?', a: 'A budgeting journal, a book on building wealth, or a gift card to an investing platform are excellent choices for young adults.' },
      { q: 'Are there good finance gifts under $25?', a: 'Yes — personal finance books, premium planners, and budgeting notebooks are all available under $25.' },
      { q: 'What finance gifts work for graduation?', a: 'Graduation is a perfect time to gift financial books, planners, or a small amount added to an investment account as a starter fund.' },
    ],
  },
  fitness: {
    title: 'Best Fitness & Wellness Gifts 2025',
    heading: 'Best Fitness & Wellness Gifts',
    description: 'Shop the best fitness gifts — from resistance bands to massage guns — for the health-conscious person on your list.',
    emoji: '💪',
    coverImage: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=900&h=300&fit=crop&auto=format',
    faqs: [
      { q: 'What are the best fitness gifts under $50?', a: 'Resistance bands, foam rollers, a quality water bottle, and workout journals are fantastic fitness gifts under $50.' },
      { q: 'What fitness gifts are good for beginners?', a: 'Beginners love practical, easy-to-use gifts like yoga mats, pedometers, and motivational workout journals.' },
      { q: 'What wellness gifts help with stress relief?', a: 'Massage guns, aromatherapy diffusers, weighted blankets, and bath soak sets are all excellent for stress relief.' },
      { q: 'Are fitness trackers good gifts?', a: 'Yes! Fitness trackers like smartwatches are among the most popular health gifts because they motivate daily movement and sleep tracking.' },
      { q: 'What fitness gifts work for runners?', a: 'Runners love hydration vests, GPS watches, compression socks, and foam rollers for recovery.' },
    ],
  },
  parenting: {
    title: 'Best Parenting & Baby Gifts 2025',
    heading: 'Best Parenting & Baby Gifts',
    description: 'Find the best gifts for new parents and babies — from white noise machines to development toys — that actually make parenting easier.',
    emoji: '👶',
    coverImage: 'https://images.unsplash.com/photo-1555252333-9f8e92e65df9?w=900&h=300&fit=crop&auto=format',
    faqs: [
      { q: 'What are the best gifts for new parents?', a: 'New parents love practical gifts like a white noise machine, swaddle blankets, baby monitor, and a meal delivery subscription.' },
      { q: 'What baby shower gifts stand out?', a: 'Personalized items, premium diaper bags, smart baby monitors, and postpartum care kits for the mother stand out at any baby shower.' },
      { q: 'What are good gifts for a toddler?', a: 'Shape sorters, building blocks, watercolor sets, and soft plush toys are developmentally great gifts for toddlers.' },
      { q: 'What parenting gifts help with sleep?', a: 'White noise machines, blackout curtains, and baby sleep monitors are the most appreciated gifts by sleep-deprived parents.' },
      { q: 'Are educational toys good gifts for babies?', a: 'Yes! Soft books, shape sorters, and cause-and-effect toys are developmentally beneficial and make thoughtful gifts.' },
    ],
  },
  office: {
    title: 'Best Office & Desk Gifts 2025',
    heading: 'Best Office & Desk Gifts',
    description: 'Level up anyone\'s workspace with the best office gifts — from ergonomic accessories to motivational desk decor.',
    emoji: '🖥️',
    coverImage: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=900&h=300&fit=crop&auto=format',
    faqs: [
      { q: 'What are good office gifts for coworkers?', a: 'Desk organizers, quality notebooks, insulated mugs, and small succulents are universally loved office gifts for coworkers.' },
      { q: 'What office gifts are appropriate for a boss?', a: 'Premium desk accessories, a quality leather portfolio, a gift card to a coffee shop, or a high-end pen set are excellent boss gifts.' },
      { q: 'What desk gifts improve productivity?', a: 'Ergonomic accessories, a cable management kit, a high-quality task lamp, and a desk calendar all help boost workplace productivity.' },
      { q: 'What are good work-from-home gifts?', a: 'Webcam lights, ergonomic mouse pads, noise-cancelling headphones, and premium coffee sets are perfect for remote workers.' },
    ],
  },
  luxury: {
    title: 'Best Luxury Gifts 2025',
    heading: 'Best Luxury Gifts',
    description: 'Indulge someone special with our curated selection of luxury gifts — premium experiences and elevated everyday items.',
    emoji: '✨',
    coverImage: 'https://images.unsplash.com/photo-1548036161-98fefa92bde7?w=900&h=300&fit=crop&auto=format',
    faqs: [
      { q: 'What are good luxury gifts under $100?', a: 'Silk pillowcases, premium skincare sets, cashmere scarves, high-end candles, and fine wine accessories make luxurious gifts under $100.' },
      { q: 'What luxury gifts are good for anniversaries?', a: 'Personalized jewelry, a couples spa package, premium spirits, a fine dining experience, or a luxury weekend getaway are all romantic anniversary gifts.' },
      { q: 'What luxury gifts do men actually like?', a: 'Men appreciate luxury gifts like high-end whiskey, premium leather goods, a quality watch, or a top-tier grooming set.' },
      { q: 'What luxury gifts are good for her?', a: 'Women love luxury gifts like silk robes, designer jewelry, premium skincare, beautiful stationery, and high-end fragrance.' },
      { q: 'What makes a gift feel luxurious?', a: 'Premium materials, thoughtful personalization, beautiful packaging, and attention to detail are what elevate a gift from ordinary to luxurious.' },
    ],
  },
  hobby: {
    title: 'Best Hobby & Craft Gifts 2025',
    heading: 'Best Hobby & Craft Gifts',
    description: 'Find the perfect gift for the hobbyist in your life — whether they love art, games, puzzles, or outdoor adventures.',
    emoji: '🎨',
    coverImage: 'https://images.unsplash.com/photo-1452860606245-08befc0ff44b?w=900&h=300&fit=crop&auto=format',
    faqs: [
      { q: 'What are good gifts for someone who loves crafts?', a: 'High-quality sketchbooks, premium watercolor sets, embroidery kits, and resin art starter kits are perfect for craft lovers.' },
      { q: 'What hobby gifts are good for board game fans?', a: 'Premium strategy games, card games, or expansions to their favorite existing game make excellent gifts for board game enthusiasts.' },
      { q: 'What are good outdoor hobby gifts?', a: 'Hiking gear, a quality pocket knife, a portable hammock, or binoculars are great gifts for outdoor adventurers.' },
      { q: 'What hobby gifts work for introverts?', a: 'Puzzle sets, journaling kits, solo board games, e-readers, and arts and crafts supplies are perfect for introverts who love solo activities.' },
    ],
  },
  kitchen: {
    title: 'Best Kitchen & Cooking Gifts 2025',
    heading: 'Best Kitchen & Cooking Gifts',
    description: 'Shop the best kitchen gifts for home cooks and foodies — from chef-grade tools to fun novelty items for the kitchen.',
    emoji: '🍳',
    coverImage: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=900&h=300&fit=crop&auto=format',
    faqs: [
      { q: 'What are good kitchen gifts for someone who loves to cook?', a: 'A quality chef\'s knife, cast iron skillet, instant-read thermometer, or a premium spice collection are gifts any cook will treasure.' },
      { q: 'What kitchen gifts are good under $30?', a: 'A stylish cutting board, quality measuring cups, a fun apron, or a cookbook by a favorite chef are excellent kitchen gifts under $30.' },
      { q: 'What kitchen gifts are good for bakers?', a: 'Stand mixer attachments, a digital kitchen scale, a premium rolling pin, or a beautiful cake stand are perfect for bakers.' },
      { q: 'What kitchen gifts are good for someone who just moved?', a: 'A complete spice rack, quality non-stick pan set, knife block, or a versatile cutting board set helps anyone settle into a new kitchen.' },
      { q: 'What kitchen gifts do foodies love?', a: 'Foodies love unique ingredients, cooking class subscriptions, specialty cookbooks, and premium kitchen gadgets they\'ve never tried before.' },
    ],
  },
  pets: {
    title: 'Best Pet Lover Gifts 2025',
    heading: 'Best Gifts for Pet Lovers',
    description: 'Find the perfect gift for pet owners and their beloved animals — from cozy pet beds to fun interactive toys.',
    emoji: '🐾',
    coverImage: 'https://images.unsplash.com/photo-1518717758536-85ae29035b6d?w=900&h=300&fit=crop&auto=format',
    faqs: [
      { q: 'What are good gifts for dog owners?', a: 'Dog owners love personalized pet portraits, GPS trackers, premium treat boxes, interactive puzzle toys, and cozy dog beds.' },
      { q: 'What are good gifts for cat owners?', a: 'Cat owners appreciate automatic feeders, window-mounted cat shelves, premium catnip toys, and custom pet portraits.' },
      { q: 'What pet gifts are good under $25?', a: 'Interactive catnip toys, durable chew ropes, treat puzzle balls, and personalized pet ID tags are great under $25.' },
      { q: 'What gifts help with new puppy ownership?', a: 'New puppy owners benefit from a quality crate, puppy training pads, a long-lasting chew toy, and a comfortable puppy bed.' },
    ],
  },
  kids: {
    title: 'Best Gifts for Kids 2025',
    heading: 'Best Gifts for Kids',
    description: 'Discover the best gifts for kids of all ages — from creative art sets and STEM kits to outdoor toys that spark imagination and keep them moving.',
    emoji: '🧸',
    coverImage: 'https://images.unsplash.com/photo-1516627145497-ae6968895b74?w=900&h=300&fit=crop&auto=format',
    faqs: [
      { q: 'What are the best gifts for kids aged 5–8?', a: 'LEGO sets, art kits, kinetic sand, and snap circuit kits are huge hits for kids aged 5–8 because they combine fun with hands-on learning.' },
      { q: 'What are good STEM gifts for kids?', a: 'Snap Circuits, National Geographic rock and fossil kits, coding robots, and science experiment kits are excellent STEM gifts that make learning exciting.' },
      { q: 'What kids gifts are best under $25?', a: 'LEGO Classic sets, Crayola art kits, glow-in-the-dark stars, and activity sticker books are all fantastic gifts for kids under $25.' },
      { q: 'What outdoor gifts do kids love?', a: 'Kick scooters, jump ropes, sidewalk chalk sets, and backyard water toys are perennial favorites for kids who love to play outside.' },
      { q: 'What are good educational gifts for kids?', a: 'The Osmo Genius Kit, National Geographic sets, puzzle books, and early reader chapter books are wonderful educational gifts that feel fun, not like homework.' },
    ],
  },
  'car-accessories': {
    title: 'Best Car Accessories & Gifts 2025',
    heading: 'Best Car Accessories & Gifts',
    description: 'Upgrade any ride with the best car accessories — from must-have dash cams and jump starters to clever organizers and phone mounts for the road.',
    emoji: '🚗',
    coverImage: 'https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=900&h=300&fit=crop&auto=format',
    faqs: [
      { q: 'What are the best car accessories under $25?', a: 'A magnetic phone mount, seat gap filler organizer, and a hanging car trash can are practical car accessories that any driver will appreciate under $25.' },
      { q: 'What car accessories make great gifts for new drivers?', a: 'A portable jump starter, a dash cam, an emergency roadside kit, and a phone mount are the most practical gifts for new drivers.' },
      { q: 'What car accessories do men love?', a: 'Men love gadget-focused car accessories like dash cams, wireless chargers, portable tire inflators, and powerful car vacuums.' },
      { q: 'Are dash cams good gifts?', a: 'Absolutely — dash cams are one of the most practical and appreciated car gifts. They provide security, help with insurance claims, and are easy to install.' },
      { q: 'What car accessories are good for road trips?', a: 'A car seat organizer, a phone mount with wireless charging, a portable power bank, and a travel cooler are essential road trip accessories.' },
    ],
  },
  home: {
    title: 'Best Home Gifts & Decor 2025',
    heading: 'Best Home Gifts & Decor',
    description: 'Find the best home gifts — from cozy throw blankets and scented candles to elegant decor pieces that make any space feel special.',
    emoji: '🏠',
    coverImage: 'https://images.unsplash.com/photo-1484101403633-562f891dc89a?w=900&h=300&fit=crop&auto=format',
    faqs: [
      { q: 'What are good home gifts for a housewarming?', a: 'Personalized doormats, high-quality candles, a beautiful serving board, cozy throw blankets, and stylish planters are all crowd-pleasing housewarming gifts.' },
      { q: 'What home decor gifts work for any style?', a: 'Neutral-toned throw pillows, minimalist candles, simple vases, and quality cotton blankets complement almost any interior style.' },
      { q: 'What home gifts are good under $50?', a: 'A premium scented candle, linen napkin set, decorative tray, or a set of matching coffee mugs make excellent home gifts under $50.' },
      { q: 'What home gifts do couples love?', a: 'Couples appreciate gifts for their shared space — matching mugs, a quality cheese board, soft throw blankets, or a beautiful wall art print.' },
      { q: 'What are the best home gifts for new homeowners?', a: 'New homeowners love practical-yet-stylish gifts like a smart doorbell, quality bedding, a kitchen herb garden kit, or a beautiful picture frame set.' },
    ],
  },
  gardening: {
    title: 'Best Gardening Gifts 2025',
    heading: 'Best Gardening Gifts',
    description: 'Find the best gardening gifts for every green thumb — from premium tool sets and raised bed kits to beautiful planters and seed subscription boxes.',
    emoji: '🌱',
    coverImage: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=900&h=300&fit=crop&auto=format',
    faqs: [
      { q: 'What are the best gardening gifts under $50?', a: 'A quality hand tool set, a set of ceramic herb planters, a seed subscription sampler, a kneeling pad, or a personalized garden marker set are all excellent gardening gifts under $50.' },
      { q: 'What gardening gifts work for beginners?', a: 'Beginners love starter kits — a raised bed kit, a beginner seed collection, a basic tool set, and a beginner\'s gardening book give them everything they need to get started.' },
      { q: 'What are good gifts for someone with a small garden or balcony?', a: 'Self-watering planters, vertical wall pockets, a compact herb growing kit, and a balcony railing planter are perfect for small-space gardeners.' },
      { q: 'What gardening gifts do experienced gardeners love?', a: 'Experienced gardeners appreciate premium tools like Felco pruners, a soil moisture meter, a quality kneeling bench, rare heirloom seed collections, or a personalized garden journal.' },
      { q: 'What are unique gardening gifts that stand out?', a: 'Unique gardening gifts include a mushroom growing kit, a bonsai starter set, a personalized garden stone, a vertical aeroponic tower garden, or a subscription to a rare plant delivery service.' },
    ],
  },
  sports: {
    title: 'Best Sports Gifts & Gear 2025',
    heading: 'Best Sports Gifts & Gear',
    description: 'Find the best sports gifts for every athlete and fan — from training equipment and apparel to stadium gear and recovery tools.',
    emoji: '🏆',
    coverImage: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=900&h=300&fit=crop&auto=format',
    faqs: [
      { q: 'What are the best sports gifts under $50?', a: 'A quality water bottle, resistance bands, a foam roller, personalized jersey number keychain, or team-branded gear are great sports gifts under $50.' },
      { q: 'What sports gifts work for someone who plays multiple sports?', a: 'Versatile gifts like a premium gym bag, performance socks, a portable foam roller, compression sleeves, or a sports nutrition bundle work for any athlete.' },
      { q: 'What are good gifts for a sports fan?', a: 'Sports fans love team jerseys, signed memorabilia, stadium seat cushions, team-branded drinkware, and personalized fan gear for their favorite team.' },
      { q: 'What sports gifts are good for kids?', a: 'Kids love sport-specific starter sets — a basketball and hoop, soccer ball, baseball glove, or a jump rope set. These encourage active play and skill building.' },
      { q: 'What are good recovery gifts for athletes?', a: 'Recovery gifts like massage guns, foam rollers, compression sleeves, ice bath kits, and sports nutrition bundles are deeply appreciated by serious athletes.' },
    ],
  },
  gaming: {
    title: 'Best Gaming Gifts 2025',
    heading: 'Best Gaming Gifts',
    description: 'Level up any gamer\'s setup with the best gaming gifts — from wireless controllers and headsets to gaming chairs and accessories for every console.',
    emoji: '🎮',
    coverImage: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=900&h=300&fit=crop&auto=format',
    faqs: [
      { q: 'What are the best gaming gifts under $50?', a: 'A gaming headset, controller stand, LED strip lights, a gaming mouse pad, or a gift card to their favorite platform are great gaming gifts under $50.' },
      { q: 'What gaming gifts work for casual gamers?', a: 'Casual gamers love a comfortable gaming chair, a nice headset, or a gift card to the Nintendo eShop, PlayStation Store, or Xbox marketplace.' },
      { q: 'What gaming gifts are good for teenagers?', a: 'Teens love gaming accessories like mechanical keyboards, gaming headsets, custom controller skins, and LED desk lamps for their setup.' },
      { q: 'What are good gaming gifts for PC gamers?', a: 'PC gamers appreciate a quality gaming mouse, mechanical keyboard, cable management kit, high-refresh-rate monitor, or a Steam gift card.' },
      { q: 'What gaming gifts are good for someone who plays mobile games?', a: 'A phone controller grip, gaming phone stand, charging dock, and a portable charger are perfect for mobile gamers.' },
    ],
  },
};

const VALID_NICHES = Object.keys(NICHE_META) as Niche[];

export async function generateStaticParams() {
  return VALID_NICHES.map((niche) => ({ niche }));
}

export async function generateMetadata(
  { params }: { params: { niche: string } }
): Promise<Metadata> {
  const meta = NICHE_META[params.niche as Niche];
  if (!meta) return { title: 'Category Not Found' };
  return {
    title: `${meta.title} | TheGiftShuffle`,
    description: meta.description,
    openGraph: {
      title: `${meta.title} | TheGiftShuffle`,
      description: meta.description,
      url: `https://thegiftshuffle.com/category/${params.niche}`,
    },
  };
}



export default function CategoryPage({ params }: { params: { niche: string } }) {
  const meta = NICHE_META[params.niche as Niche];
  if (!meta) notFound();

  const filtered = products.filter((p) => p.tags.includes(params.niche as Niche));

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: meta.faqs.map(({ q, a }) => ({
      '@type': 'Question',
      name: q,
      acceptedAnswer: { '@type': 'Answer', text: a },
    })),
  };

  const itemListSchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: meta.title,
    numberOfItems: filtered.length,
    itemListElement: filtered.slice(0, 20).map((p, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: p.name,
      url: p.affiliateUrl,
    })),
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }}
      />

      {/* Leaderboard Ad */}
      <div className="bg-white border-b border-gray-100 py-3 flex justify-center">
        <AdSlot size="leaderboard" />
      </div>

      {/* Hero */}
      <section
        className="text-center"
        style={{ background: 'linear-gradient(135deg, #FFFAF5 0%, #fff9e6 100%)' }}
      >
        {meta.coverImage && (
          <div className="relative w-full h-48 sm:h-64 overflow-hidden">
            <Image
              src={meta.coverImage}
              alt={meta.heading}
              fill
              className="object-cover"
              unoptimized
              priority
            />
            <div className="absolute inset-0 bg-black/30" />
          </div>
        )}
        <div className="py-10 px-4">
          <div className="text-5xl mb-3">{meta.emoji}</div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-gray-900 mb-4 max-w-3xl mx-auto">
            {meta.heading}
          </h1>
          <p className="text-gray-600 text-lg max-w-xl mx-auto mb-6">{meta.description}</p>
          <Link
            href="/shuffle"
            className="btn-shuffle text-white font-bold px-8 py-3 rounded-full inline-block text-sm"
          >
            Find a Gift by Shuffle 🎲
          </Link>
        </div>
      </section>

      {/* Products Grid */}
      <main id="main-content" tabIndex={-1} className="max-w-6xl mx-auto w-full px-4 py-12">
        <h2 className="text-2xl font-extrabold text-gray-900 mb-6">
          {filtered.length > 0
            ? `${filtered.length} Curated ${meta.heading}`
            : 'Top Gift Picks'}
        </h2>

        {filtered.length === 0 && (
          <p className="text-gray-500 mb-8">
            Browse our full catalog — every item on TheGiftShuffle is hand-picked for quality.
          </p>
        )}

        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-12">
            {(filtered.length > 0 ? filtered : products.slice(0, 12)).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>

        <p className="text-xs text-center text-gray-400 mb-6">
          Affiliate links — we may earn a commission at no extra cost to you.
        </p>

        {/* Mid-page Rectangle Ad */}
        <div className="flex justify-center my-10">
          <AdSlot size="rectangle" />
        </div>

        {/* FAQ Section */}
        <section className="max-w-3xl mx-auto mt-12">
          <h2 className="text-2xl font-extrabold text-gray-900 mb-8">
            Frequently Asked Questions
          </h2>
          <div className="space-y-6">
            {meta.faqs.map(({ q, a }) => (
              <div key={q} className="bg-white rounded-2xl p-6 shadow-sm">
                <h3 className="font-bold text-gray-900 mb-2">{q}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{a}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Category Navigation */}
        <section className="mt-16 text-center">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Browse Other Categories</h2>
          <div className="flex flex-wrap gap-2 justify-center">
            {VALID_NICHES.filter((n) => n !== params.niche).map((n) => (
              <Link
                key={n}
                href={`/category/${n}`}
                className="px-4 py-2 bg-white border border-gray-200 rounded-full text-sm text-gray-600 hover:border-[#F04E30] hover:text-[#F04E30] transition-colors capitalize"
              >
                {n.replace('-', ' ')}
              </Link>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
