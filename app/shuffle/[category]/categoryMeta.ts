// Shared metadata for the /shuffle/[category] pages: display copy + the rich
// guide pages each shuffle category should cross-link to. Imported by both the
// server page (hero/intro/SEO/links) and the client grid (label).

export interface ShuffleCategoryMeta {
  label: string;
  desc: string;
  intro: string;
  related: { href: string; label: string }[];
}

export const CATEGORY_META: Record<string, ShuffleCategoryMeta> = {
  tech: {
    label: 'Tech & Gadgets',
    desc: 'Gadgets, smart home, wearables, and all things tech.',
    intro: 'From wireless earbuds and smart-home upgrades to the gadget they keep almost buying, shuffle through top-rated tech gifts for every budget.',
    related: [
      { href: '/category/tech', label: 'All Tech Gifts' },
      { href: '/tech-gadgets', label: 'Tech Gadget Guide' },
      { href: '/gift-ideas-for-him', label: 'Gift Ideas for Him' },
    ],
  },
  gaming: {
    label: 'Gaming',
    desc: 'Controllers, headsets, keyboards, and gear for every gamer.',
    intro: 'Headsets, mechanical keyboards, controllers and RGB upgrades for PC, PlayStation and Xbox players. Hit shuffle for a fresh gamer gift every click.',
    related: [
      { href: '/category/gaming', label: 'All Gaming Gifts' },
      { href: '/best-gaming-gifts-2026', label: 'Best Gaming Gifts 2026' },
      { href: '/birthday-gifts-for-gamers', label: 'Birthday Gifts for Gamers' },
    ],
  },
  fitness: {
    label: 'Fitness',
    desc: 'Equipment, wearables, and gear for active people.',
    intro: 'Recovery tools, smart trackers, activewear and home-gym gear for the people who actually train. Shuffle for a fresh fitness gift idea.',
    related: [
      { href: '/category/fitness', label: 'All Fitness Gifts' },
      { href: '/best-fitness-gifts-2026', label: 'Best Fitness Gifts 2026' },
      { href: '/gift-ideas-for-him', label: 'Gift Ideas for Him' },
    ],
  },
  home: {
    label: 'Home & Decor',
    desc: 'Cozy decor, candles, and thoughtful pieces for any home.',
    intro: 'Candles, cozy textiles and the little upgrades that make a space feel finished. Shuffle through home and decor gifts for any housewarming or just because.',
    related: [
      { href: '/category/home', label: 'All Home Gifts' },
      { href: '/best-gifts-for-her-2026', label: 'Best Gifts for Her' },
      { href: '/gifts-under-50', label: 'Gifts Under $50' },
    ],
  },
  kitchen: {
    label: 'Kitchen',
    desc: 'Appliances, tools, and gadgets for food lovers.',
    intro: 'Appliances, premium tools and clever gadgets for anyone who loves to cook. Shuffle through kitchen gifts for foodies at every budget.',
    related: [
      { href: '/category/kitchen', label: 'All Kitchen Gifts' },
      { href: '/best-anniversary-gifts-2026', label: 'Anniversary Gifts' },
      { href: '/gifts-under-50', label: 'Gifts Under $50' },
    ],
  },
  sports: {
    label: 'Sports',
    desc: 'Gear, apparel, and fan gifts for every sport.',
    intro: 'Gear, apparel and fan favorites for every sport and every level. Shuffle for a sports gift that matches how they play.',
    related: [
      { href: '/category/sports', label: 'All Sports Gifts' },
      { href: '/best-camping-gifts', label: 'Camping & Outdoor Gifts' },
      { href: '/gift-ideas-for-him', label: 'Gift Ideas for Him' },
    ],
  },
  pets: {
    label: 'Pets',
    desc: 'Toys, treats, and accessories for beloved pets.',
    intro: 'Toys, treats and upgrades for the dog or cat who runs the house. Shuffle through pet gifts they will actually use.',
    related: [
      { href: '/category/pets', label: 'All Pet Gifts' },
      { href: '/gifts-under-50', label: 'Gifts Under $50' },
      { href: '/gifts-under-25', label: 'Gifts Under $25' },
    ],
  },
  kids: {
    label: 'Kids',
    desc: 'Fun, educational, and creative gifts for children.',
    intro: 'Fun, creative and screen-free gifts that keep kids busy. Shuffle through top-rated kids gifts by age and interest.',
    related: [
      { href: '/category/kids', label: 'All Kids Gifts' },
      { href: '/gift-ideas-for-kids', label: 'Gift Ideas for Kids' },
      { href: '/gift-ideas-for-teens', label: 'Gift Ideas for Teens' },
    ],
  },
  hobby: {
    label: 'Hobbies',
    desc: 'Gifts for makers, collectors, and passionate hobbyists.',
    intro: 'Supplies, kits and upgrades for makers, collectors and weekend obsessives. Shuffle for a hobby gift tied to what they already love.',
    related: [
      { href: '/category/hobby', label: 'All Hobby Gifts' },
      { href: '/unique-birthday-gifts', label: 'Unique Birthday Gifts' },
      { href: '/gifts-under-50', label: 'Gifts Under $50' },
    ],
  },
  luxury: {
    label: 'Luxury',
    desc: 'Premium and elevated gifts worth splurging on.',
    intro: 'Premium picks that feel special the moment they are unwrapped. Shuffle through luxury gifts worth the splurge for him and her.',
    related: [
      { href: '/category/luxury', label: 'All Luxury Gifts' },
      { href: '/best-luxury-gifts-2026', label: 'Best Luxury Gifts 2026' },
      { href: '/best-anniversary-gifts-2026', label: 'Anniversary Gifts' },
    ],
  },
  office: {
    label: 'Office',
    desc: 'Desk upgrades, productivity tools, and WFH essentials.',
    intro: 'Desk upgrades, productivity tools and work-from-home essentials. Shuffle for an office gift for a coworker, boss or yourself.',
    related: [
      { href: '/category/office', label: 'All Office Gifts' },
      { href: '/gifts-for-coworkers', label: 'Gifts for Coworkers' },
      { href: '/gifts-for-boss', label: 'Gifts for Your Boss' },
    ],
  },
  gardening: {
    label: 'Gardening',
    desc: 'Tools, planters, and gifts for green thumbs.',
    intro: 'Tools, planters and clever upgrades for green thumbs of every level. Shuffle through gardening gifts for the plant lover in your life.',
    related: [
      { href: '/category/gardening', label: 'All Gardening Gifts' },
      { href: '/gifts-under-50', label: 'Gifts Under $50' },
      { href: '/gift-ideas-for-grandparents', label: 'Gifts for Grandparents' },
    ],
  },
  parenting: {
    label: 'Parenting',
    desc: 'Practical and thoughtful gifts for parents and caregivers.',
    intro: 'Practical, thoughtful upgrades for new and seasoned parents alike. Shuffle through parenting gifts that genuinely help.',
    related: [
      { href: '/category/parenting', label: 'All Parenting Gifts' },
      { href: '/gift-ideas-for-kids', label: 'Gift Ideas for Kids' },
      { href: '/gifts-under-50', label: 'Gifts Under $50' },
    ],
  },
  'diy-tools': {
    label: 'DIY & Tools',
    desc: 'Power tools, hand tools, and workshop essentials.',
    intro: 'Power tools, hand tools and workshop upgrades for the fixer and the builder. Shuffle for a DIY gift they will actually reach for.',
    related: [
      { href: '/category/diy-tools', label: 'All DIY & Tool Gifts' },
      { href: '/gift-ideas-for-dad', label: 'Gift Ideas for Dad' },
      { href: '/gift-ideas-for-him', label: 'Gift Ideas for Him' },
    ],
  },
  finance: {
    label: 'Finance',
    desc: 'Books, courses, and gifts for money-minded people.',
    intro: 'Books, planners and smart picks for the money-minded. Shuffle through finance gifts for the saver, investor or new grad.',
    related: [
      { href: '/category/finance', label: 'All Finance Gifts' },
      { href: '/graduation-gifts', label: 'Graduation Gifts' },
      { href: '/gift-ideas-for-him', label: 'Gift Ideas for Him' },
    ],
  },
  'car-accessories': {
    label: 'Car Accessories',
    desc: 'Dash cams, organizers, and must-haves for drivers.',
    intro: 'Dash cams, organizers and upgrades for the daily commute or the road trip. Shuffle for a car gift any driver will appreciate.',
    related: [
      { href: '/category/car-accessories', label: 'All Car Gifts' },
      { href: '/gift-ideas-for-dad', label: 'Gift Ideas for Dad' },
      { href: '/gift-ideas-for-him', label: 'Gift Ideas for Him' },
    ],
  },
  outdoors: {
    label: 'Outdoors & Camping',
    desc: 'Camping gear, hiking essentials, and adventure gifts.',
    intro: 'Camping gear, hiking essentials and adventure-ready upgrades. Shuffle through outdoor gifts for campers, hikers and weekend explorers.',
    related: [
      { href: '/category/outdoors', label: 'All Outdoor Gifts' },
      { href: '/best-camping-gifts', label: 'Best Camping Gifts' },
      { href: '/gifts-for-camping-and-outdoors', label: 'Camping & Outdoors' },
    ],
  },
  travel: {
    label: 'Travel',
    desc: 'Packing cubes, adapters, chargers and carry-on upgrades for travelers.',
    intro: 'Packing cubes, universal adapters, AirTags, power banks and carry-on upgrades for the frequent flyer and the weekend explorer. Shuffle for a fresh travel gift every click.',
    related: [
      { href: '/category/travel', label: 'All Travel Gifts' },
      { href: '/gifts-for-camping-and-outdoors', label: 'Camping & Outdoors Gifts' },
      { href: '/gifts-under-50', label: 'Gifts Under $50' },
    ],
  },
  beauty: {
    label: 'Beauty',
    desc: 'Skincare, haircare, fragrance and self-care gifts.',
    intro: 'Cult skincare serums, hair repair treatments, fragrance and at-home spa picks, all rated 4.3 stars or higher. Shuffle through beauty gifts she will actually use up.',
    related: [
      { href: '/category/beauty', label: 'All Beauty Gifts' },
      { href: '/best-beauty-gifts-2026', label: 'Best Beauty Gifts 2026' },
      { href: '/self-care-gifts', label: 'Self-Care Gifts' },
    ],
  },
  'ai-smart-home': {
    label: 'AI & Smart Home',
    desc: 'Smart speakers, displays, trackers and connected home upgrades.',
    intro: 'Echo and Nest smart speakers, smart displays, learning thermostats, trackers and security cams for the connected home. Shuffle for a smart home gift that gets used daily.',
    related: [
      { href: '/category/ai-smart-home', label: 'All AI & Smart Home Gifts' },
      { href: '/tech-gadgets', label: 'Tech Gadget Guide' },
      { href: '/ai-personalized-gifts', label: 'AI Personalized Gifts' },
    ],
  },
  'baby-shower': {
    label: 'Baby Shower',
    desc: 'Registry favorites, keepsakes and new-parent essentials.',
    intro: 'Swaddles, sound machines, carriers, keepsake frames and postpartum care kits that new parents actually reach for. Shuffle through baby shower gifts beyond the registry.',
    related: [
      { href: '/category/baby-shower', label: 'All Baby Shower Gifts' },
      { href: '/best-baby-shower-gifts-2026', label: 'Best Baby Shower Gifts 2026' },
      { href: '/top-10-gifts-for-new-dads-under-50', label: 'Gifts for New Dads' },
    ],
  },
  wedding: {
    label: 'Wedding',
    desc: 'Registry classics, personalized keepsakes and gifts for the couple.',
    intro: 'Registry classics like a Le Creuset Dutch oven, champagne flutes and personalized keepsakes engraved with names and the date. Shuffle for a wedding gift the couple will keep.',
    related: [
      { href: '/category/wedding', label: 'All Wedding Gifts' },
      { href: '/best-anniversary-gifts-2026', label: 'Best Anniversary Gifts 2026' },
      { href: '/housewarming-gifts', label: 'Housewarming Gifts' },
    ],
  },
  halloween: {
    label: 'Halloween Party',
    desc: 'Party decor, serveware, games and glow gear for Halloween hosts.',
    intro: 'Floating candles, cauldron serveware, party games and glow gear. Shuffle through top-rated Halloween party picks for hosts and guests.',
    related: [
      { href: '/category/halloween', label: 'All Halloween Gifts' },
      { href: '/halloween-party-gifts', label: 'Halloween Party Essentials' },
      { href: '/gifts-under-25', label: 'Gifts Under $25' },
    ],
  },
};
