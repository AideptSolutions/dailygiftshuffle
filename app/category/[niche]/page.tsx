import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import Navbar from '@/components/Navbar';
import CategoryIcon from '@/components/CategoryIcon';
import Footer from '@/components/Footer';
import ProductCard from '@/components/ProductCard';
import InlineShuffle from '@/components/InlineShuffle';
import products from '@/data/products-catalog';
import type { NicheTag } from '@/data/products-catalog';

type Niche = NicheTag;

// Niches that have a dedicated "best [X] gifts" gold-standard guide. Surfaced as
// a featured cross-link so the rich category page funnels into the guide (and
// vice versa via the guide's related links).
const GUIDE_FOR: Partial<Record<Niche, { href: string; label: string }>> = {
  'baby-shower': { href: '/best-baby-shower-gifts-2026', label: 'See the 48 Best Baby Shower Gifts for 2026' },
  outdoors: { href: '/best-camping-gifts', label: 'See the Best Camping Gifts for 2026' },
  beauty: { href: '/best-beauty-gifts-2026', label: 'See the Best Beauty Gifts for 2026' },
  gaming: { href: '/best-gaming-gifts-2026', label: 'See the Best Gaming Gifts for 2026' },
  fitness: { href: '/best-fitness-gifts-2026', label: 'See the Best Fitness Gifts for 2026' },
  luxury: { href: '/best-luxury-gifts-2026', label: 'See the Best Luxury Gifts for 2026' },
};

interface NicheMeta {
  title: string;
  heading: string;
  description: string;
  coverImage: string;
  faqs: { q: string; a: string }[];
}

const NICHE_META: Record<Niche, NicheMeta> = {
  tech: {
    title: 'Best Tech Gifts & Gadgets 2026',
    heading: 'Best Tech Gifts & Gadgets',
    description: 'From wireless earbuds to smart home devices, find the best tech gifts for every gadget lover on your list.',
    coverImage: '/img/category-heroes/tech.jpg',
    faqs: [
      { q: 'What are the best tech gifts under $50?', a: 'Wireless earbuds, Bluetooth speakers, and smart plugs make excellent tech gifts under $50 that anyone will appreciate.' },
      { q: 'What tech gifts are best for someone who has everything?', a: 'Consider unique gadgets like a smart ring, portable projector, or a subscription to a premium streaming service.' },
      { q: 'Are tech gifts good for birthdays?', a: 'Absolutely! Tech gifts are among the most popular birthday gifts because they are practical, exciting, and available at every price point.' },
      { q: 'What tech gifts work for non-techies?', a: 'Smart speakers, e-readers, and simple fitness trackers are intuitive enough for anyone to enjoy.' },
      { q: 'What is a good tech gift for a teen?', a: 'Wireless earbuds, gaming accessories, and LED light strips are huge hits with teens right now.' },
    ],
  },
  'diy-tools': {
    title: 'Best DIY & Tools Gifts 2026',
    heading: 'Best DIY & Tools Gifts',
    description: 'Discover top-rated home and DIY gifts, from tool sets to smart home gadgets, perfect for the handy person in your life.',
    coverImage: '/img/category-heroes/diy-tools.jpg',
    faqs: [
      { q: 'What are good home gifts for a housewarming?', a: 'Popular housewarming gifts include essential oil diffusers, high-quality candles, personalized door mats, and smart home devices.' },
      { q: 'What DIY gifts do people actually use?', a: 'Practical DIY gifts like quality tool sets, magnetic wristbands, and workshop organizers get used constantly by hobbyist builders.' },
      { q: 'What home gifts are good for someone who loves to decorate?', a: 'Wall art prints, decorative throw pillows, stylish planters, and custom photo items are great for home decorators.' },
      { q: 'Are home gifts good for couples?', a: 'Yes! Couples love gifts that improve their shared space, like matching serveware sets, cozy blankets, and smart home gadgets.' },
    ],
  },
  finance: {
    title: 'Best Finance & Money Gifts 2026',
    heading: 'Best Finance & Money-Savvy Gifts',
    description: 'Help the financial-minded people in your life level up with books, tools, and experiences focused on wealth and smart money habits.',
    coverImage: '/img/category-heroes/finance.jpg',
    faqs: [
      { q: 'What are good gifts for someone interested in finance?', a: 'Books on personal finance, budgeting planners, investing courses, and premium financial apps make great gifts for money-minded people.' },
      { q: 'What finance gifts are good for young adults?', a: 'A budgeting journal, a book on building wealth, or a gift card to an investing platform are excellent choices for young adults.' },
      { q: 'Are there good finance gifts under $25?', a: 'Yes. Personal finance books, premium planners, and budgeting notebooks are all available under $25.' },
      { q: 'What finance gifts work for graduation?', a: 'Graduation is a perfect time to gift financial books, planners, or a small amount added to an investment account as a starter fund.' },
    ],
  },
  fitness: {
    title: 'Best Fitness & Wellness Gifts 2026',
    heading: 'Best Fitness & Wellness Gifts',
    description: 'Shop the best fitness gifts, from resistance bands to massage guns, for the health-conscious person on your list.',
    coverImage: '/img/category-heroes/fitness.jpg',
    faqs: [
      { q: 'What are the best fitness gifts under $50?', a: 'Resistance bands, foam rollers, a quality water bottle, and workout journals are fantastic fitness gifts under $50.' },
      { q: 'What fitness gifts are good for beginners?', a: 'Beginners love practical, easy-to-use gifts like yoga mats, pedometers, and motivational workout journals.' },
      { q: 'What wellness gifts help with stress relief?', a: 'Massage guns, aromatherapy diffusers, weighted blankets, and bath soak sets are all excellent for stress relief.' },
      { q: 'Are fitness trackers good gifts?', a: 'Yes! Fitness trackers like smartwatches are among the most popular health gifts because they motivate daily movement and sleep tracking.' },
      { q: 'What fitness gifts work for runners?', a: 'Runners love hydration vests, GPS watches, compression socks, and foam rollers for recovery.' },
    ],
  },
  parenting: {
    title: 'Best Parenting & Baby Gifts 2026',
    heading: 'Best Parenting & Baby Gifts',
    description: 'Find the best gifts for new parents and babies, from white noise machines to development toys, that actually make parenting easier.',
    coverImage: '/img/category-heroes/parenting.jpg',
    faqs: [
      { q: 'What are the best gifts for new parents?', a: 'New parents love practical gifts like a white noise machine, swaddle blankets, baby monitor, and a meal delivery subscription.' },
      { q: 'What baby shower gifts stand out?', a: 'Personalized items, premium diaper bags, smart baby monitors, and postpartum care kits for the mother stand out at any baby shower.' },
      { q: 'What are good gifts for a toddler?', a: 'Shape sorters, building blocks, watercolor sets, and soft plush toys are developmentally great gifts for toddlers.' },
      { q: 'What parenting gifts help with sleep?', a: 'White noise machines, blackout curtains, and baby sleep monitors are the most appreciated gifts by sleep-deprived parents.' },
      { q: 'Are educational toys good gifts for babies?', a: 'Yes! Soft books, shape sorters, and cause-and-effect toys are developmentally beneficial and make thoughtful gifts.' },
    ],
  },
  office: {
    title: 'Best Office & Desk Gifts 2026',
    heading: 'Best Office & Desk Gifts',
    description: "Level up anyone's workspace with the best office gifts, from ergonomic accessories to motivational desk decor.",
    coverImage: '/img/category-heroes/office.jpg',
    faqs: [
      { q: 'What are good office gifts for coworkers?', a: 'Desk organizers, quality notebooks, insulated mugs, and small succulents are universally loved office gifts for coworkers.' },
      { q: 'What office gifts are appropriate for a boss?', a: 'Premium desk accessories, a quality leather portfolio, a gift card to a coffee shop, or a high-end pen set are excellent boss gifts.' },
      { q: 'What desk gifts improve productivity?', a: 'Ergonomic accessories, a cable management kit, a high-quality task lamp, and a desk calendar all help boost workplace productivity.' },
      { q: 'What are good work-from-home gifts?', a: 'Webcam lights, ergonomic mouse pads, noise-cancelling headphones, and premium coffee sets are perfect for remote workers.' },
    ],
  },
  luxury: {
    title: 'Best Luxury Gifts 2026',
    heading: 'Best Luxury Gifts',
    description: 'Indulge someone special with our curated selection of luxury gifts, premium experiences and elevated everyday items.',
    coverImage: '/img/category-heroes/luxury.jpg',
    faqs: [
      { q: 'What are good luxury gifts under $100?', a: 'Silk pillowcases, premium skincare sets, cashmere scarves, high-end candles, and fine wine accessories make luxurious gifts under $100.' },
      { q: 'What luxury gifts are good for anniversaries?', a: 'Personalized jewelry, a couples spa package, premium spirits, a fine dining experience, or a luxury weekend getaway are all romantic anniversary gifts.' },
      { q: 'What luxury gifts do men actually like?', a: 'Men appreciate luxury gifts like high-end whiskey, premium leather goods, a quality watch, or a top-tier grooming set.' },
      { q: 'What luxury gifts are good for her?', a: 'Women love luxury gifts like silk robes, designer jewelry, premium skincare, beautiful stationery, and high-end fragrance.' },
      { q: 'What makes a gift feel luxurious?', a: 'Premium materials, thoughtful personalization, beautiful packaging, and attention to detail are what elevate a gift from ordinary to luxurious.' },
    ],
  },
  hobby: {
    title: 'Best Hobby & Craft Gifts 2026',
    heading: 'Best Hobby & Craft Gifts',
    description: 'Find the perfect gift for the hobbyist in your life, whether they love art, games, puzzles, or outdoor adventures.',
    coverImage: '/img/category-heroes/hobby.jpg',
    faqs: [
      { q: 'What are good gifts for someone who loves crafts?', a: 'High-quality sketchbooks, premium watercolor sets, embroidery kits, and resin art starter kits are perfect for craft lovers.' },
      { q: 'What hobby gifts are good for board game fans?', a: 'Premium strategy games, card games, or expansions to their favorite existing game make excellent gifts for board game enthusiasts.' },
      { q: 'What are good outdoor hobby gifts?', a: 'Hiking gear, a quality pocket knife, a portable hammock, or binoculars are great gifts for outdoor adventurers.' },
      { q: 'What hobby gifts work for introverts?', a: 'Puzzle sets, journaling kits, solo board games, e-readers, and arts and crafts supplies are perfect for introverts who love solo activities.' },
    ],
  },
  kitchen: {
    title: 'Best Kitchen & Cooking Gifts 2026',
    heading: 'Best Kitchen & Cooking Gifts',
    description: 'Shop the best kitchen gifts for home cooks and foodies, from chef-grade tools to fun novelty items for the kitchen.',
    coverImage: '/img/category-heroes/kitchen.jpg',
    faqs: [
      { q: 'What are good kitchen gifts for someone who loves to cook?', a: "A quality chef's knife, cast iron skillet, instant-read thermometer, or a premium spice collection are gifts any cook will treasure." },
      { q: 'What kitchen gifts are good under $30?', a: 'A stylish cutting board, quality measuring cups, a fun apron, or a cookbook by a favorite chef are excellent kitchen gifts under $30.' },
      { q: 'What kitchen gifts are good for bakers?', a: 'Stand mixer attachments, a digital kitchen scale, a premium rolling pin, or a beautiful cake stand are perfect for bakers.' },
      { q: 'What kitchen gifts are good for someone who just moved?', a: 'A complete spice rack, quality non-stick pan set, knife block, or a versatile cutting board set helps anyone settle into a new kitchen.' },
      { q: 'What kitchen gifts do foodies love?', a: "Foodies love unique ingredients, cooking class subscriptions, specialty cookbooks, and premium kitchen gadgets they've never tried before." },
    ],
  },
  pets: {
    title: 'Best Pet Lover Gifts 2026',
    heading: 'Best Gifts for Pet Lovers',
    description: 'Find the perfect gift for pet owners and their beloved animals, from cozy pet beds to fun interactive toys.',
    coverImage: '/img/category-heroes/pets.jpg',
    faqs: [
      { q: 'What are good gifts for dog owners?', a: 'Dog owners love personalized pet portraits, GPS trackers, premium treat boxes, interactive puzzle toys, and cozy dog beds.' },
      { q: 'What are good gifts for cat owners?', a: 'Cat owners appreciate automatic feeders, window-mounted cat shelves, premium catnip toys, and custom pet portraits.' },
      { q: 'What pet gifts are good under $25?', a: 'Interactive catnip toys, durable chew ropes, treat puzzle balls, and personalized pet ID tags are great under $25.' },
      { q: 'What gifts help with new puppy ownership?', a: 'New puppy owners benefit from a quality crate, puppy training pads, a long-lasting chew toy, and a comfortable puppy bed.' },
    ],
  },
  kids: {
    title: 'Best Gifts for Kids 2026',
    heading: 'Best Gifts for Kids',
    description: 'Discover the best gifts for kids of all ages, from creative art sets and STEM kits to outdoor toys that spark imagination and keep them moving.',
    coverImage: '/img/category-heroes/kids.jpg',
    faqs: [
      { q: 'What are the best gifts for kids aged 5-8?', a: 'LEGO sets, art kits, kinetic sand, and snap circuit kits are huge hits for kids aged 5-8 because they combine fun with hands-on learning.' },
      { q: 'What are good STEM gifts for kids?', a: 'Snap Circuits, National Geographic rock and fossil kits, coding robots, and science experiment kits are excellent STEM gifts that make learning exciting.' },
      { q: 'What kids gifts are best under $25?', a: 'LEGO Classic sets, Crayola art kits, glow-in-the-dark stars, and activity sticker books are all fantastic gifts for kids under $25.' },
      { q: 'What outdoor gifts do kids love?', a: 'Kick scooters, jump ropes, sidewalk chalk sets, and backyard water toys are perennial favorites for kids who love to play outside.' },
      { q: 'What are good educational gifts for kids?', a: 'The Osmo Genius Kit, National Geographic sets, puzzle books, and early reader chapter books are wonderful educational gifts that feel fun, not like homework.' },
    ],
  },
  'car-accessories': {
    title: 'Best Car Accessories & Gifts 2026',
    heading: 'Best Car Accessories & Gifts',
    description: 'Upgrade any ride with the best car accessories, from must-have dash cams and jump starters to clever organizers and phone mounts for the road.',
    coverImage: '/img/category-heroes/car-accessories.jpg',
    faqs: [
      { q: 'What are the best car accessories under $25?', a: 'A magnetic phone mount, seat gap filler organizer, and a hanging car trash can are practical car accessories that any driver will appreciate under $25.' },
      { q: 'What car accessories make great gifts for new drivers?', a: 'A portable jump starter, a dash cam, an emergency roadside kit, and a phone mount are the most practical gifts for new drivers.' },
      { q: 'What car accessories do men love?', a: 'Men love gadget-focused car accessories like dash cams, wireless chargers, portable tire inflators, and powerful car vacuums.' },
      { q: 'Are dash cams good gifts?', a: 'Absolutely. Dash cams are one of the most practical and appreciated car gifts. They provide security, help with insurance claims, and are easy to install.' },
      { q: 'What car accessories are good for road trips?', a: 'A car seat organizer, a phone mount with wireless charging, a portable power bank, and a travel cooler are essential road trip accessories.' },
    ],
  },
  home: {
    title: 'Best Home Gifts & Decor 2026',
    heading: 'Best Home Gifts & Decor',
    description: 'Find the best home gifts, from cozy throw blankets and scented candles to elegant decor pieces that make any space feel special.',
    coverImage: '/img/category-heroes/home.jpg',
    faqs: [
      { q: 'What are good home gifts for a housewarming?', a: 'Personalized doormats, high-quality candles, a beautiful serving board, cozy throw blankets, and stylish planters are all crowd-pleasing housewarming gifts.' },
      { q: 'What home decor gifts work for any style?', a: 'Neutral-toned throw pillows, minimalist candles, simple vases, and quality cotton blankets complement almost any interior style.' },
      { q: 'What home gifts are good under $50?', a: 'A premium scented candle, linen napkin set, decorative tray, or a set of matching coffee mugs make excellent home gifts under $50.' },
      { q: 'What home gifts do couples love?', a: 'Couples appreciate gifts for their shared space, matching mugs, a quality cheese board, soft throw blankets, or a beautiful wall art print.' },
      { q: 'What are the best home gifts for new homeowners?', a: 'New homeowners love practical-yet-stylish gifts like a smart doorbell, quality bedding, a kitchen herb garden kit, or a beautiful picture frame set.' },
    ],
  },
  gardening: {
    title: 'Best Gardening Gifts 2026',
    heading: 'Best Gardening Gifts',
    description: 'Find the best gardening gifts for every green thumb, from premium tool sets and raised bed kits to beautiful planters and seed subscription boxes.',
    coverImage: '/img/category-heroes/gardening.jpg',
    faqs: [
      { q: 'What are the best gardening gifts under $50?', a: 'A quality hand tool set, a set of ceramic herb planters, a seed subscription sampler, a kneeling pad, or a personalized garden marker set are all excellent gardening gifts under $50.' },
      { q: 'What gardening gifts work for beginners?', a: "Beginners love starter kits, a raised bed kit, a beginner seed collection, a basic tool set, and a beginner's gardening book give them everything they need to get started." },
      { q: 'What are good gifts for someone with a small garden or balcony?', a: 'Self-watering planters, vertical wall pockets, a compact herb growing kit, and a balcony railing planter are perfect for small-space gardeners.' },
      { q: 'What gardening gifts do experienced gardeners love?', a: 'Experienced gardeners appreciate premium tools like Felco pruners, a soil moisture meter, a quality kneeling bench, rare heirloom seed collections, or a personalized garden journal.' },
      { q: 'What are unique gardening gifts that stand out?', a: 'Unique gardening gifts include a mushroom growing kit, a bonsai starter set, a personalized garden stone, a vertical aeroponic tower garden, or a subscription to a rare plant delivery service.' },
    ],
  },
  sports: {
    title: 'Best Sports Gifts & Gear 2026',
    heading: 'Best Sports Gifts & Gear',
    description: 'Find the best sports gifts for every athlete and fan, from training equipment and apparel to stadium gear and recovery tools.',
    coverImage: '/img/category-heroes/sports.jpg',
    faqs: [
      { q: 'What are the best sports gifts under $50?', a: 'A quality water bottle, resistance bands, a foam roller, personalized jersey number keychain, or team-branded gear are great sports gifts under $50.' },
      { q: 'What sports gifts work for someone who plays multiple sports?', a: 'Versatile gifts like a premium gym bag, performance socks, a portable foam roller, compression sleeves, or a sports nutrition bundle work for any athlete.' },
      { q: 'What are good gifts for a sports fan?', a: 'Sports fans love team jerseys, signed memorabilia, stadium seat cushions, team-branded drinkware, and personalized fan gear for their favorite team.' },
      { q: 'What sports gifts are good for kids?', a: 'Kids love sport-specific starter sets, a basketball and hoop, soccer ball, baseball glove, or a jump rope set. These encourage active play and skill building.' },
      { q: 'What are good recovery gifts for athletes?', a: 'Recovery gifts like massage guns, foam rollers, compression sleeves, ice bath kits, and sports nutrition bundles are deeply appreciated by serious athletes.' },
    ],
  },
  gaming: {
    title: 'Best Gaming Gifts 2026',
    heading: 'Best Gaming Gifts',
    description: "Level up any gamer's setup with the best gaming gifts, from wireless controllers and headsets to gaming chairs and accessories for every console.",
    coverImage: '/img/category-heroes/gaming.jpg',
    faqs: [
      { q: 'What are the best gaming gifts under $50?', a: 'A gaming headset, controller stand, LED strip lights, a gaming mouse pad, or a gift card to their favorite platform are great gaming gifts under $50.' },
      { q: 'What gaming gifts work for casual gamers?', a: 'Casual gamers love a comfortable gaming chair, a nice headset, or a gift card to the Nintendo eShop, PlayStation Store, or Xbox marketplace.' },
      { q: 'What gaming gifts are good for teenagers?', a: 'Teens love gaming accessories like mechanical keyboards, gaming headsets, custom controller skins, and LED desk lamps for their setup.' },
      { q: 'What are good gaming gifts for PC gamers?', a: 'PC gamers appreciate a quality gaming mouse, mechanical keyboard, cable management kit, high-refresh-rate monitor, or a Steam gift card.' },
      { q: 'What gaming gifts are good for someone who plays mobile games?', a: 'A phone controller grip, gaming phone stand, charging dock, and a portable charger are perfect for mobile gamers.' },
    ],
  },
  outdoors: {
    title: 'Best Outdoors and Camping Gifts 2026',
    heading: 'Best Outdoors and Camping Gifts',
    description: 'Find the best gifts for campers, hikers, and outdoor adventurers. From ultralight gear to camp kitchen essentials, these are the picks serious outdoor people actually want.',
    coverImage: '/img/category-heroes/outdoors.jpg',
    faqs: [
      { q: 'What are the best camping gifts under $50?', a: 'A LifeStraw water filter, UCO stormproof matches, a Black Diamond headlamp, or an ENO hammock are all outstanding camping gifts under $50. These are the items experienced campers buy themselves anyway, which makes them genuinely appreciated when received as gifts.' },
      { q: 'What gifts do hikers and backpackers want most?', a: 'Serious hikers want practical gear upgrades: a quality sleeping pad, a GPS navigator, a solar power bank, or a merino wool base layer. The sweet spot is something they have been eyeing but have not bought for themselves. Premium brands like Osprey, Kelty, and Smartwool consistently rank at the top of wish lists.' },
      { q: 'What are good camping gifts for someone just getting started?', a: 'New campers benefit most from foundational gear: a reliable headlamp, a two-burner camp stove, a sleeping pad, and a stormproof fire kit. A beginner bundle covering these bases is far more useful than one flashy item. Focus on safety and comfort for first-time campers.' },
      { q: 'What are unique outdoor gifts that stand out?', a: 'The BioLite CampStove charges your phone while you cook over sticks. The Garmin eTrex GPS works anywhere on earth without cell service. A YETI cooler keeps ice for days. These are gifts that cause a genuine reaction when opened because they solve real problems in clever ways.' },
      { q: 'What camping gifts are good for families?', a: "Family camping gifts should prioritize setup speed and comfort. A quality two-burner stove, a large hammock, a group sleeping arrangement, and a rugged cooler cover the essentials. Kids love their own headlamp, and parents love a solar charger that keeps everyone's devices alive on longer trips." },
    ],
  },
  travel: {
    title: 'Best Travel Gifts for Frequent Flyers & Adventurers 2026',
    heading: 'Best Travel Gifts',
    description: 'Find the best gifts for travelers, frequent flyers, and adventure seekers, from smart luggage and packing cubes to travel pillows and portable chargers.',
    coverImage: '/img/category-heroes/travel.jpg',
    faqs: [
      { q: 'What are the best travel gifts under $50?', a: 'Packing cubes, a passport holder wallet, a travel neck pillow, a universal travel adapter, and a portable power bank are all outstanding travel gifts under $50. These are items frequent travelers use on every single trip.' },
      { q: 'What travel gifts do frequent flyers actually want?', a: 'Frequent flyers prioritize comfort and convenience: noise-canceling earbuds, a high-quality travel pillow, a lightweight carry-on, a fast-charging power bank, and a slim passport wallet top most wish lists.' },
      { q: 'What are good travel gifts for someone who travels for work?', a: 'Business travelers love practical upgrades: a TSA-approved toiletry bag, a laptop-friendly backpack, a portable luggage scale, a universal adapter with USB ports, and a travel-sized steamer for wrinkle-free clothes.' },
      { q: 'What are unique travel gifts that stand out?', a: 'Unique travel gifts include a scratch-off world map, a personalized luggage tag, a packable travel blanket, a GoPro action camera, and a subscription to a travel magazine or lounge access pass. These go beyond the basics and genuinely delight any traveler.' },
    ],
  },
  beauty: {
    title: 'Best Beauty & Self-Care Gifts 2026',
    heading: 'Best Beauty & Self-Care Gifts',
    description: 'Shop the best beauty and self-care gifts, from professional hair tools and skincare devices to luxurious bath sets and spa-worthy kits.',
    coverImage: '/img/category-heroes/beauty.jpg',
    faqs: [
      { q: 'What are the best beauty gifts under $50?', a: 'A gua sha facial tool set, a silk hair scrunchie set, a bath bomb collection, a premium face mask kit, and a jade roller are all beautiful self-care gifts under $50 that feel far more indulgent than their price tag.' },
      { q: 'What beauty gifts do women actually want?', a: 'Women consistently love skincare tools (gua sha, LED masks), professional-grade hair tools (Dyson, T3), luxury body care sets, and fragrance. The most appreciated beauty gifts combine quality with something they would not buy themselves.' },
      { q: 'What self-care gifts are good for stress relief?', a: 'Self-care gifts that target stress include aromatherapy diffusers with essential oils, weighted eye masks, bath soak sets, foam rollers, and calming skincare rituals. These help recipients slow down and recharge.' },
      { q: 'What are good beauty gifts for a teenager?', a: 'Teens love TikTok-famous skincare (CeraVe, The Ordinary), nail art kits, hair accessories, face masks, and mini perfume sets. Keep it fun, trendy, and skin-safe, avoid anything too harsh for young skin.' },
    ],
  },
  'baby-shower': {
    title: 'Best Baby Shower Gifts 2026',
    heading: 'Best Baby Shower Gifts',
    description: 'Find the perfect baby shower gift, from swaddle sets and baby monitors to postpartum care kits and keepsake boxes.',
    coverImage: '/img/category-heroes/baby-shower.jpg',
    faqs: [
      { q: 'What are the best baby shower gifts for new moms?', a: 'New moms appreciate practical gifts they truly need: a white noise machine, premium swaddle blankets, a postpartum recovery kit, and a comfortable baby carrier top the list. The best gifts address real needs in the first weeks home.' },
      { q: 'What baby shower gifts stand out from the rest?', a: 'Personalized keepsakes like a fingerprint frame, a custom name blanket, or a handprint kit stand out because they are sentimental and unique. Pairing a practical item with a keepsake creates a gift the family will always remember.' },
      { q: 'What is a good baby shower gift under $50?', a: 'Swaddle blanket sets, milestone card decks, baby bath kits, soft plush toys with matching books, and postpartum essentials kits are all thoughtful baby shower gifts under $50 that new parents genuinely need and use.' },
      { q: 'Should you buy from the baby registry or give something else?', a: 'Registry items are always a safe bet because parents chose them deliberately. However, off-registry gifts like premium swaddles, a keepsake box, or a self-care kit for mom are also deeply appreciated, especially when the registry is already mostly fulfilled.' },
    ],
  },
  wedding: {
    title: 'Best Wedding Gifts 2026',
    heading: 'Best Wedding Gifts',
    description: 'Find the perfect wedding gift, from personalized keepsakes and registry picks to honeymoon experiences and luxury home items.',
    coverImage: '/img/category-heroes/wedding.jpg',
    faqs: [
      { q: 'What are the best wedding gifts for a couple?', a: 'The best wedding gifts are either from the registry (which guarantees they want it) or a meaningful upgrade to something on the registry. Personalized items like an engraved cutting board, a custom star map, or monogrammed towels add a sentimental touch no registry item can match.' },
      { q: 'How much should you spend on a wedding gift?', a: 'A general guide: $50-$100 for coworkers or distant friends, $100-$150 for close friends or family, and $150-$300+ for very close relationships. The most important factor is thoughtfulness. A well-chosen $75 gift lands better than a generic $200 one.' },
      { q: 'What are unique wedding gifts that stand out?', a: 'A custom star map of their wedding night sky, a first-dance song portrait print, a personalized recipe book, an engraved champagne set, or a contribution to their honeymoon fund are all wedding gifts that go beyond the registry and create lasting memories.' },
      { q: 'What wedding gifts do couples actually use?', a: 'Quality kitchen items (especially Le Creuset, KitchenAid, or Vitamix), luxurious bedding sets, personalized barware, and travel accessories for the honeymoon are among the most-used wedding gifts. Practical luxury items that couples would not splurge on themselves are always a win.' },
    ],
  },
  'ai-smart-home': {
    title: 'Best AI & Smart Home Gifts 2026',
    heading: 'Best AI & Smart Home Gifts',
    description: 'Discover the best AI gadgets and smart home gifts, from voice assistants and smart displays to AI wearables and automated home devices for every tech lover.',
    coverImage: '/img/category-heroes/ai-smart-home.jpg',
    faqs: [
      { q: 'What are the best smart home gifts under $50?', a: 'Smart plugs, smart bulbs, Echo Dot speakers, and Bluetooth trackers are all excellent smart home gifts under $50. They are easy to set up, work with Alexa and Google Home, and immediately make any home feel more intelligent.' },
      { q: 'What AI gifts are trending in 2026?', a: 'AI wearables like the Oura Ring and Galaxy Ring, AI-powered cameras, smart home hubs with generative AI features, and AI art tools are among the most sought-after gifts in 2026. These represent the next wave of consumer AI going mainstream.' },
      { q: 'What smart home gifts work for non-techies?', a: 'Smart speakers (Echo Dot, Google Nest Mini), smart plugs, and video doorbells are the most user-friendly smart home gifts. They require minimal setup, are controlled by voice, and provide genuine daily utility with almost no learning curve.' },
      { q: 'What are good AI gifts for someone who already has smart home devices?', a: 'For someone already in the smart home ecosystem, consider upgrading their experience: a smart display (Echo Show), a Matter-compatible smart home hub, a whole-home Wi-Fi mesh system, or an AI-powered security camera system.' },
    ],
  },
};

// Editorial paragraphs stored as plain text arrays to avoid unescaped entity lint errors
const EDITORIAL: Record<Niche, string[]> = {
  tech: [
    'AI wearables are the standout category this year. Oura Ring, smart glasses, and AI-powered earbuds that translate in real time have moved from novelty to must-have. If you want to give a tech gift that actually changes how someone experiences their day, wearables are the place to start.',
    'The desk setup upgrade has also accelerated in 2026. Monitor arms, ambient lighting strips, and 4K webcams are now standard asks from anyone who works from home or streams. The gap between a $30 gift and a $150 gift is enormous in terms of daily use and impact.',
    'Under $50, you cannot go wrong with smart plugs, cable organizers, or MagSafe accessories. In the $50-$150 range, mechanical keyboards, noise-cancelling earbuds, and portable monitors all make strong impressions. These are the things people put off buying for themselves but use every single day once they have them.',
    'For the person who says they have everything: a smart ring or a compact 4K projector are still conversation-starters. Neither has gone mainstream enough to feel generic, but both solve real problems well enough to get regular use.',
  ],
  gaming: [
    'The gaming gift category split sharply in 2026 between console accessories and PC peripherals. For console players, the best gifts are comfort-focused: gaming chairs with lumbar support, headsets with spatial audio, and custom controller skins. These are things players notice every session.',
    'PC gamers want performance above everything else. High-refresh monitors, mechanical keyboards with tactile switches, and RGB lighting that actually serves a function are all strong choices. A good gaming mouse from Logitech or Razer at the $50-$80 price point is one of the most appreciated gifts in this category.',
    'The sleeper hit this year is retro gaming. Mini consoles, classic controller replicas, and pixel art prints are wildly popular across age groups. For someone who grew up playing SNES or N64, a retro-style gift lands with genuine nostalgia. Budget-friendly picks in the $25-$50 range: gaming headsets, controller stands, and gaming glasses.',
    'At the premium end ($100+), capture cards and streaming decks are the right choice for anyone who creates content or streams regularly. These are specific tools with real utility, not just decorative upgrades.',
  ],
  fitness: [
    'Recovery tools dominated fitness gifting in 2026. Massage guns, foam rollers, and red light therapy wands have moved from physical therapy offices into everyday households. For anyone who trains regularly, a quality percussion massager from Theragun or Hyperice is a gift that gets used after every workout.',
    'Wearables are still strong, but the focus has shifted from step-counting to sleep and HRV tracking. Oura Ring and Whoop have made sleep a performance metric. If the person on your list is serious about their health, a fitness tracker that goes beyond steps is a meaningful upgrade.',
    'For the casual exerciser, resistance band sets and yoga mats remain the sweet spot. A well-made set from a brand like Perform Better or a thick, non-slip yoga mat from Manduka holds up better than the generic alternatives and lasts for years.',
    'For the serious athlete, anything that aids recovery lands well: sauna blankets, cold plunge equipment, and compression boots are all gifts that read as genuinely thoughtful. These are things athletes research extensively but rarely buy for themselves.',
  ],
  home: [
    'The home gift category splits cleanly between practical and beautiful, and the best gifts manage both. Air purifiers, robotic vacuums with LiDAR mapping, and smart home hubs that actually reduce daily friction are at the top of the practical list. These are things people use every day without thinking about it.',
    'On the aesthetic side: handmade ceramics, weighted blankets, and premium candles from small brands are performing well. The anti-Amazon aesthetic is real in 2026. People want things that feel considered and specific, not just convenient. A candle from a small-batch maker in a beautiful vessel beats a generic option every time.',
    'Best price points: $30-$60 for candles, throw blankets, and storage solutions; $100-$200 for robot vacuums, air purifiers, and premium cookware. The sweet spot for a genuinely appreciated home gift is around $50-$75.',
    'For new homeowners specifically, lean practical: a quality doormat, a good set of picture hooks, or a smart plug pack all fill gaps that nobody thinks to register for but everyone needs in the first month of a new home.',
  ],
  kitchen: [
    'Kitchen gifts are having a real moment. The air fryer wave has peaked, but the category it opened, countertop appliances that actually get used, keeps expanding. Espresso machines, sous vide circulators, and electric pizza ovens are the new conversation pieces in kitchens this year.',
    'For the home baker: a Dutch oven from Lodge or Le Creuset, a banneton proofing basket, and a quality digital kitchen scale are all gifts that telegraph real attention. These are specific enough to show you know what they actually do in the kitchen.',
    'For the weeknight cook, solve a specific problem. A good chef knife from Wusthof or Global, a carbon steel pan that does not stick, an herb garden for the windowsill. The best kitchen gifts answer a question the recipient already has: how do I make this particular task easier?',
    'Instant Pot accessories, knife sharpeners, and specialty spice sets all work well under $40. At the premium end, the Breville espresso line and the Le Creuset Dutch oven remain perennial top-performers. Give one excellent thing rather than a set of mediocre things.',
  ],
  sports: [
    'Sports gifts in 2026 track the activity. Running is surging, which means GPS watches from Garmin or COROS, carbon-plated shoes gifted for birthdays and race completions, and recovery gear like compression socks and foam rollers are all strong choices right now.',
    'Pickleball is still growing fast, making it one of the best gifting categories for adults at every price point. A quality paddle from Selkirk or Joola, a ball hopper, or a court bag are all more affordable than equivalent tennis or golf gear and are almost guaranteed to get used.',
    'Golf is perennially strong for Father\'s Day and retirement gifts. Rangefinders, quality golf gloves, and a premium headcover are appreciated at every skill level. Avoid novelty golf gifts unless you know the person well enough to know they will find it funny.',
    'For multi-sport athletes or people you are not sure about, lean versatile: a premium gym bag from Lululemon or Nike, performance socks, or a high-quality water bottle from Hydro Flask or Stanley. These work regardless of what sport they play.',
  ],
  gardening: [
    'Gardening gifted well in 2025 and that momentum is continuing in 2026. Indoor growing has expanded well beyond herb kits into hydroponic setups, LED grow lights, and full tower gardens. A Lettuce Grow tower or an AeroGarden is a gift that keeps producing literally for years.',
    'Outdoor gardeners want quality tools. Stainless steel trowels, Japanese-style hori hori knives, and good pruning shears from Felco or Fiskars are the kind of tools that replace cheap ones someone has been tolerating for years. These land as genuine upgrades.',
    'The aesthetic garden is having a moment: terracotta planters, Japanese-style tools, and sculptural plant stands are all performing well as gifts. For new homeowners, a good hose, soaker irrigation system, or a raised bed kit from Vego Garden is genuinely useful and gets immediate use.',
    'For experienced gardeners, get specific: rare heirloom seeds from Baker Creek, a soil moisture meter, or a subscription to a specialty plant delivery service. Generic gardening kits do not impress someone who already knows what they are doing. The right gift for a serious gardener is the one thing they have not bought yet.',
  ],
  hobby: [
    'Hobby gifts work best when they are specific to one thing the person actually does. But the categories that convert best across a wide audience are art supplies for the person who used to draw and stopped, puzzles for the person who needs to put their phone down, and music-adjacent gifts for the person with a playlist for every mood.',
    'The crafting category is broad but cross-stitch kits, macrame sets, and book binding kits have all had breakout moments on TikTok in the past year. Klutz, Chronicle Books, and Leisure Arts make starter kits that are good enough to actually complete a project, which matters more than most people think when gifting crafts.',
    'For the reader: pair a specific book you have read and loved with a reading light from Glocusent and a handmade bookmark. The combination feels curated and personal. Generic "book lover" gift sets with a mug and a journal feel less intentional than a book you actually chose.',
    'For puzzle people: Ravensburger 1000-piece puzzles are the gold standard for quality. For the person who wants a real challenge: a 2000-piece or a gradient puzzle. For someone new to puzzles: a 500-piece with a subject they love. Specificity is everything in the hobby category.',
  ],
  finance: [
    'Finance gifts are growing as personal finance becomes a mainstream interest, especially among people in their 20s and 30s. Budget planners and financial journals are still the accessible entry point. Clever Fox and Panda Planner make ones that get consistent high reviews and actually encourage consistent use.',
    'The more thoughtful gifts in this category are tools and books that change how someone thinks about money. Morgan Housel\'s "The Psychology of Money," Ramit Sethi\'s "I Will Teach You to Be Rich," and "Die with Zero" by Bill Perkins are all books people share aggressively after reading. A well-chosen finance book paired with a good journal is one of the most efficient gift combinations in the category.',
    'Subscriptions to tools like Copilot or YNAB are genuinely useful gifts for someone trying to get serious about budgeting. These are things people consider buying but put off. A gift card or subscription removes the friction.',
    'For young adults starting out: combine a solid investing book with a contribution to their investment account if the relationship allows. For someone building a business: a productivity system, a copy of "The E-Myth Revisited," or a course from a credible voice in their industry. Finance gifts work best when they are specific to the stage of life the person is actually in.',
  ],
  office: [
    'The home office gift category peaked in 2021 but has found a real second wind in 2026. Ergonomics are now taken seriously as a daily health issue: desk converters, monitor arms, anti-fatigue mats, and ergonomic mice are no longer just corporate IT purchases. Anyone working from home every day has a reason to want one.',
    'The aesthetic office is a real gift category this year. Leather desk pads from Harber London or Grovemade, clean cable management solutions, and ambient lighting like the BenQ ScreenBar make workspaces feel intentional. These are gifts that change how someone feels about sitting down to work each morning.',
    'For the work-from-home person who sits at a cheap desk all day, almost any ergonomic upgrade lands well. Monitor light bars that reduce eye strain, blue light glasses, and desk organizers that clear visual clutter are all under $50 and immediately appreciated.',
    'At the premium end: standing desk converters from Flexispot, noise-cancelling headphones from Sony or Bose, and quality webcams from Logitech or Elgato are the gifts people research carefully and take time to buy for themselves. Getting there first is the whole point.',
  ],
  luxury: [
    'Luxury gifting in 2026 is about restraint and specificity. The era of the obvious luxury item is fading. A $300 cashmere sweater from a brand they have never heard of beats a $300 item from a brand they see in every mall. The signal is in the selection, not just the price.',
    'Leather goods, skincare, and experiences are the strongest luxury categories right now. A quality leather card holder from Ettinger or a silk scarf from a smaller brand says more than a recognizable logo at the same price point. In skincare: La Mer, Augustinus Bader, and Vintner\'s Daughter are the gifts that make an impression.',
    'Whiskey and wine gift sets have a ceiling. A good single bottle of Pappy Van Winkle, Hibiki, or a natural wine from a producer you discovered beats a generic gift tower every time. Include a handwritten tasting note.',
    'Candles and home fragrance from brands like Diptyque, Byredo, or Trudon remain strong performers. One thing, done well, in thoughtful packaging is the formula that works. The rule for luxury gifts has not changed: the thought behind the selection matters more than the price on the tag.',
  ],
  kids: [
    'Kids gifts in 2026 lean toward active, creative, and screen-free where possible. STEM kits, building sets, and art supplies remain perennial for good reason. Snap Circuits and LEGO Technic hold attention longer than most single-use toys, and they grow with the child over multiple years.',
    'Outdoor toys are strong, especially for ages 4-10. Bikes, scooters, and anything that gets children off a device are consistently appreciated by parents. A Strider balance bike for toddlers, a Razor scooter for elementary-age kids, and a good outdoor water table for summer are all gifts that earn real use.',
    'For tweens: skincare kits with gentle formulas (not adult-strength actives), journaling sets, and friendship bracelet kits are all performing well this year. The Lovery and Klutz make kits that are age-appropriate and actually produce a finished result the kid will be proud of.',
    'Age-specificity is everything. A gift that is right for a 7-year-old is wrong for a 10-year-old. When in doubt, check the recommended age on the box and give yourself a year of margin on either side. For teens: tech accessories, gaming gear, and gift cards to platforms they actually use beat any physical gift by a wide margin.',
  ],
  pets: [
    'Pet gifting is one of the fastest-growing gift categories, period. People spend on their pets the way they used to reserve for luxury items. DNA tests from Embark or Wisdom Panel, GPS collars from Fi or Tractive, and automatic feeders from SureFeed are the tech side of the category and all have strong reputations.',
    'On the comfort side: orthopedic beds from Big Barker, weighted anxiety blankets, and high-quality treats from The Farmer\'s Dog or Zuke\'s are the gifts that show real thought. These are things pet owners know they should get around to and appreciate when someone does it for them.',
    'Subscription boxes for pets are easy to gift and easy to receive. BarkBox and KitNipBox are well-run, use quality products, and arrive monthly as a recurring reminder of the gift. These work especially well for new pet owners still figuring out what their animal likes.',
    'The wellness direction is expanding: calming supplements from Zesty Paws, dental chews, and joint support products for older dogs are genuinely appreciated by pet owners who take their animal\'s health seriously. Budget-friendly: interactive puzzle toys and single-ingredient treat bags. Premium: GPS tracker subscription, automatic litter box, or a DNA test.',
  ],
  parenting: [
    'Parenting gifts in 2026 lean toward practicality for the parent and quality for the baby. Postpartum care sets are now widely available from brands like Frida Mom and FullWell, and they address something that genuinely gets overlooked: the person who just gave birth also needs recovery support.',
    'Baby monitoring technology has improved significantly. The Owlet Dream Sock, Nanit Pro, and Miku Smart Baby Monitor all track breathing and sleep patterns in ways that genuinely reduce new-parent anxiety. These are expensive enough that parents hesitate to buy them but appreciate enormously when received as gifts.',
    'For new parents, the best gifts solve a specific problem they have right now: a white noise machine from Hatch, a good nursing pillow from My Brest Friend, or a quality diaper bag from Itzy Ritzy. Solve one problem well rather than covering many problems superficially.',
    'For toddler parents: play mats from Lovevery, sensory toys, and anything that buys 30 minutes of occupied independent play. The Melissa and Doug wooden activity sets and the Lovevery Play Kit subscription are consistently top-rated by parents who have actually used them.',
  ],
  'car-accessories': [
    'Car accessories have expanded well beyond air fresheners. Dash cams are now considered essential, not optional. The Vantrue N4 and Nexar Pro give front-and-rear coverage with good night vision, and they are the kind of gift that matters enormously the one time you need footage after an incident.',
    'Portable jump starters and tire inflators are the category of gift that gets used once every two years but matters completely when it is needed. The NOCO Boost is the standard for jump starters. The Ryobi or CRAFTSMAN portable inflators handle both car and bike tires. Both read as practical and thoughtful at the same time.',
    'Interior upgrades that actually get used: seat organizers, wireless charging mounts, and custom-fit floor mats from WeatherTech. These solve specific inconveniences in cars that people drive every day. A Mophie or Belkin wireless charging mount ends the tangled charging cable problem permanently.',
    'For truck and SUV owners: cargo organizers, roof rack accessories from Yakima or Thule, and portable fridges from BougeRV or Dometic are all strong premium gifts. The sweet spot for a universally appreciated car gift is $40-$80: something specific, practical, and good enough to actually last.',
  ],
  outdoors: [
    'Outdoor and camping gifts track the activity level of the recipient. For the day hiker: a good hydration pack from Osprey or CamelBak, trekking poles from Black Diamond, or a compact first aid kit from Adventure Medical. These are things experienced hikers own but regularly wear out and need to replace.',
    'For the car camper: a quality camp chair from Helinox or REI, a portable speaker from JBL or Bose, or a propane stove from Camp Chef that actually produces enough heat to cook a real meal. These make the camping experience noticeably more comfortable without adding much weight.',
    'For the backpacker: ultralight gear is the obsession, and anything that shaves weight at the same durability is the right gift. A Thermarest NeoAir sleeping pad, a Sea to Summit Aeros pillow, or a titanium cookset from Snow Peak are gifts that serious backpackers notice and appreciate immediately.',
    'The overlapping category with survival and preparedness has grown. Fire starters from UCO, compact water filters from LifeStraw or Sawyer, and emergency kits from Adventure Medical are gifts that feel practical and genuinely thoughtful. A person who spends time outdoors appreciates being prepared, even if they hope never to need it.',
  ],
  travel: [
    'Travel gifts are strongest when they solve specific problems. Packing cubes have gone mainstream. The right gift now is the next level: compression packing cubes from Eagle Creek or Peak Design, a fast-charging power bank from Anker with enough capacity to top off a laptop, or a universal adapter that handles surge protection and USB-C in a single brick.',
    'For frequent flyers, noise-cancelling headphones remain one of the most consistently appreciated travel gifts. Sony WH-1000XM5 and Bose QuietComfort Ultra are both excellent. Pair them with a quality travel neck pillow from Trtl or Cabeau and you have a gift combination that makes any long flight more survivable.',
    'For adventure travelers: waterproof bags from Sea to Summit or Ortlieb, action cameras from GoPro, and satellite communicators from Garmin inReach are the tools that make remote trips feel safer and more documented. These are purchases people research for months and appreciate receiving.',
    'Passport holders and RFID wallets remain consistent performers at the $20-$40 price point. The Bellroy Travel Wallet and Ekster Passport Sleeve are both high-quality and easy to gift. These are things frequent travelers actually use on every single trip and replace every few years.',
  ],
  beauty: [
    'Beauty gifting in 2026 is driven by skincare and self-care. Facial tools, serums, and sheet mask sets are the fastest-growing categories. Korean beauty has fully gone mainstream, which means collagen patches, hydrogel masks, and essence toners from brands like COSRX, Some by Mi, and Laneige are now accessible and well-understood gifts.',
    'For skincare, give one excellent single product rather than a generic set. A bottle of SkinCeuticals C E Ferulic, a Tatcha Dewy Skin Cream, or a Paula\'s Choice BHA Exfoliant are the kind of gifts that get used completely and replaced at full price. That is the goal.',
    'For fragrance: a travel discovery set from Maison Margiela Replica, Le Labo, or Byredo is better than a full-size bottle of something they might not love. Discovery sets let them find a new favorite without the risk. These are available at most fragrance counters and Scentbird offers a subscription version.',
    'Makeup is personal, so gift cards beat guessing most of the time. If you do know their preferences: a quality lip liner and matching lipstick from Charlotte Tilbury, a new mascara from Rare Beauty, or a concealer in a shade you know they already use are all safe bets. Specific beats generic every time in the beauty category.',
  ],
  'ai-smart-home': [
    'AI home devices are in a clear second wave. The first wave was novelty, smart speakers and smart lights that were fun to demo. The second wave is utility: devices that make daily routines meaningfully easier. Robot vacuums with LiDAR mapping from iRobot Roomba or Roborock navigate furniture without getting stuck. Smart locks with facial recognition from Ultraloq cut down on lost keys permanently.',
    'AI-powered air purifiers from Dyson and Coway now adjust automatically to real-time air quality readings, which matters more than most people think for sleep and focus. For anyone who has never had a smart home device, starting with an Echo Dot or a Google Nest Mini is the right move. These are easy to set up, genuinely useful, and work as a gateway to the broader ecosystem.',
    'Smart displays have found their niche in kitchens and home offices. The Echo Show 8 and the Google Nest Hub Max are both well-reviewed and serve as recipe guides, video call stations, and home control panels in one device. These are more practically useful than a standard smart speaker for anyone who actually cooks.',
    'For someone already in a smart home ecosystem: add more sensors, upgrade to better security cameras, or give a smart home hub that ties multiple systems together. The Aeotec Smart Home Hub works with Z-Wave, Zigbee, and Matter devices, which matters when someone has accumulated products from different brands over time.',
  ],
  'baby-shower': [
    'Baby shower gifts in 2026 are increasingly practical and registry-driven. The safest approach: buy from the registry. Parents chose those items deliberately, and an off-registry duplicate is at best redundant. If the registry is fully fulfilled, shift to high-quality consumables they will go through fast: diapers from the brand they registered, nursing pads, and wipes in bulk.',
    'The most appreciated off-registry gifts are postpartum care items for the parent, not the baby. Frida Mom makes a complete recovery kit specifically for the weeks after birth. A meal delivery subscription for the first month home, a cleaning service visit, or a prepared meal from a local restaurant are all gifts that address real needs that nobody registers for but everyone has.',
    'For the aesthetic side: wooden toys from Grimm\'s or Hape, organic cotton onesies from Burt\'s Bees Baby, and hand-illustrated nursery prints from Etsy feel considered and personal. These are things parents keep and remember for years. They photograph well and go up on walls.',
    'Items for the second month are underrated. Everyone brings gifts in the first weeks. A gift that arrives six weeks in, when the new-parent rush has faded and real exhaustion has set in, lands harder than anything given at the shower. Think: a food delivery gift card, a house cleaning session, or a box of individually packaged snacks the new parent can eat one-handed.',
  ],
  wedding: [
    'Wedding gifts are evolving. The registry is still the safest and most appreciated route, but the couples who already live together present a specific challenge: they often already have the basics. In that case, the right move is the premium version of something they use every day. Le Creuset instead of a standard Dutch oven. Staub instead of a generic cast iron pan. Hedley and Bennett instead of a standard apron.',
    'Experiences are increasingly popular as wedding gifts. A cooking class for two from Sur La Table or a local culinary school, a wine tasting at a local winery, or a weekend getaway package all create memories rather than adding to a shelf. These work especially well for couples who are specific about their home aesthetic and hard to buy for.',
    'For the couple who already lives together: premium versions of things they already use every day. A Vitamix blender, a KitchenAid stand mixer in a color they would not have bought themselves, or a Breville espresso machine. These are aspirational purchases people live without for years until someone gives them one.',
    'Monogrammed items work when they are subtle. Embroidered linen napkins, engraved cocktail glasses, or a custom cutting board with the couple\'s last name and wedding date are all tasteful and personal. Cash and Venmo are more acceptable than ever for weddings. When in doubt, ask what they actually need and give that.',
  ],
  'diy-tools': [
    'DIY and tool gifts are having a strong run in 2026, driven by the home improvement wave that shows no sign of slowing. The best gifts in this category are quality versions of tools the person already owns a cheap version of. A proper set of chisels from Narex, a good combination square from Starrett, or a Milwaukee Packout storage system all replace frustration with capability.',
    'For the weekend builder: a cordless oscillating multi-tool from Milwaukee or DeWalt solves more problems than almost any other single tool in a workshop. A good Japanese pull saw, a quality marking gauge, or a set of layout tools from Bridge City Tool Works are the kind of gifts that enthusiasts research and then put off buying for themselves.',
    'Workbench organization is an underrated gift category. Magnetic tool holders, pegboard organizers, and stackable parts bins from Akro-Mils all make a workspace more functional. These are practical, reasonably priced, and immediately appreciated by anyone who has lost a drill bit in a cluttered drawer.',
    'For the smart-home adjacent builder: smart outlets, wire tracers, non-contact voltage testers from Klein Tools, and stud finders from Zircon are the tools that make home improvement projects go smoother. These sit in the $20-$60 range and are used on nearly every project.',
  ],
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
      images: [
        {
          url: `https://www.thegiftshuffle.com/api/og?title=${encodeURIComponent(meta.title)}`,
          width: 1200,
          height: 630,
        },
      ],
    },
  };
}

export default function CategoryPage({ params }: { params: { niche: string } }) {
  const meta = NICHE_META[params.niche as Niche];
  if (!meta) notFound();

  const filtered = products.filter((p) => p.tags.includes(params.niche as Niche));
  const trendingPicks = filtered.slice(0, 12);
  const editorialParas = EDITORIAL[params.niche as Niche] ?? [];

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

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: 'https://www.thegiftshuffle.com',
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: meta.heading,
        item: `https://www.thegiftshuffle.com/category/${params.niche}`,
      },
    ],
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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      {/* Hero image with overlaid heading */}
      <section className="relative w-full overflow-hidden" style={{ maxHeight: '320px' }}>
        <div className="relative w-full h-64 sm:h-80">
          <Image
            src={meta.coverImage}
            alt={meta.heading}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 px-6 pb-6">
            <div className="max-w-4xl mx-auto flex items-end gap-3">
              <CategoryIcon slug={params.niche} className="w-9 h-9 text-white shrink-0" aria-hidden="true" />
              <h1 className="text-2xl sm:text-4xl font-extrabold text-white leading-tight">
                {meta.heading}
              </h1>
            </div>
          </div>
        </div>
      </section>

      <main id="main-content" tabIndex={-1} className="flex-1">

        {/* Shuffle section */}
        <section className="max-w-5xl mx-auto px-4 py-10">
          <InlineShuffle
            products={filtered.length > 0 ? filtered : products.slice(0, 20)}
            heading={`Shuffle ${meta.heading}`}
          />
        </section>

        {/* Editorial content */}
        <section className="max-w-3xl mx-auto px-4 py-8 border-t border-gray-100">
          <h2 className="text-2xl font-extrabold text-gray-900 mb-6">
            {"What's Trending in "}{meta.heading.replace('Best ', '')}{" for 2026"}
          </h2>
          <div className="space-y-4 text-gray-700 leading-relaxed text-base">
            {editorialParas.map((para, i) => (
              <p key={i}>{para}</p>
            ))}
          </div>
        </section>

        {/* Trending Picks grid */}
        {trendingPicks.length > 0 && (
          <section className="max-w-5xl mx-auto px-4 py-10 border-t border-gray-100">
            <h2 className="text-2xl font-extrabold text-gray-900 mb-6">
              12 Trending {meta.heading.replace('Best ', '')} Picks for 2026
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {trendingPicks.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
            <p className="text-xs text-center text-gray-400 mt-6">
              Affiliate links. We may earn a commission at no extra cost to you.
            </p>
          </section>
        )}

        {/* FAQ Section */}
        <section className="max-w-3xl mx-auto px-4 py-10 border-t border-gray-100">
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

        {/* Featured guide cross-link */}
        {GUIDE_FOR[params.niche as Niche] && (
          <section className="max-w-5xl mx-auto px-4 py-8 border-t border-gray-100 text-center">
            <Link
              href={GUIDE_FOR[params.niche as Niche]!.href}
              className="inline-block bg-[#F04E30] text-white font-bold px-8 py-3.5 rounded-full hover:opacity-90 transition-opacity"
            >
              {GUIDE_FOR[params.niche as Niche]!.label} →
            </Link>
          </section>
        )}

        {/* Category Navigation */}
        <section className="max-w-5xl mx-auto px-4 py-10 border-t border-gray-100 text-center">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Browse Other Categories</h2>
          <div className="flex flex-wrap gap-2 justify-center">
            {VALID_NICHES.filter((n) => n !== params.niche).map((n) => (
              <Link
                key={n}
                href={`/category/${n}`}
                className="px-4 py-2 bg-white border border-gray-200 rounded-full text-sm text-gray-600 hover:border-[#F04E30] hover:text-[#F04E30] transition-colors capitalize"
              >
                {n.replace(/-/g, ' ')}
              </Link>
            ))}
          </div>
        </section>

      </main>

      <Footer />
    </div>
  );
}
