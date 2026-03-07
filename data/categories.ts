import { NicheTag, Recipient, BudgetTier } from './products';

export interface CategoryConfig {
  slug: string;
  tag: NicheTag;
  title: string;
  emoji: string;
  subtitle: string;
  description: string;
  intro: string;
  relatedSlugs: string[];
  faqs: { q: string; a: string }[];
}

export const CATEGORIES: CategoryConfig[] = [
  {
    slug: 'tech-gadgets',
    tag: 'tech',
    title: 'Tech & Gadgets Gifts',
    emoji: '💻',
    subtitle: 'Curated gifts for the tech lover in your life',
    description: 'Smart devices, accessories, and the coolest gadgets for every budget.',
    intro: 'Finding the perfect tech gift doesn\'t have to be overwhelming. From smart home devices and wireless earbuds to professional-grade gadgets, our curated selection covers every budget and every type of tech enthusiast. Whether they\'re a gaming fanatic, a productivity nerd, or a smart home early adopter, we\'ve got the ideal gift.',
    relatedSlugs: ['tech-gadgets', 'office-professional', 'fitness-biohacking'],
    faqs: [
      { q: 'What are the best tech gifts under $50?', a: 'Some of the best tech gifts under $50 include wireless earbuds, smart plugs, USB-C hubs, LED strip lights, and portable power banks. These are practical, well-reviewed, and compatible with most devices.' },
      { q: 'What tech gifts do gadget lovers actually want?', a: 'Gadget lovers tend to appreciate items that are truly useful and innovative: mechanical keyboards, noise-canceling headphones, smart speakers, adjustable laptop stands, and ergonomic mice top the lists.' },
      { q: 'Are smart home gifts a good idea?', a: 'Yes — smart plugs, smart bulbs, and smart speakers are consistently popular gifts. They\'re affordable, easy to set up, and compatible with Alexa and Google Home, making them a practical upgrade for any home.' },
      { q: 'What tech gift is best for someone who has everything?', a: 'For the person who has everything tech-wise, consider experiential or premium options: an Ember smart mug, a Raspberry Pi kit, a Oura Ring sleep tracker, or a professional-grade webcam setup.' },
    ],
  },
  {
    slug: 'diy-tools',
    tag: 'diy-tools',
    title: 'Home Improvement & DIY Gifts',
    emoji: '🔨',
    subtitle: 'Gifts for the fixer-upper, decorator, and homeowner',
    description: 'Tools, smart home upgrades, and DIY kits for every level of home enthusiast.',
    intro: 'Whether they\'re a weekend warrior DIYer or just moved into a new home, a great home improvement gift is always appreciated. From precision tools and smart thermostats to home décor kits, our selection covers everything from practical fixes to fun creative projects. Perfect for homeowners, renters upgrading their space, or anyone who loves making things better.',
    relatedSlugs: ['kitchen-cooking', 'tech-gadgets', 'luxury-premium'],
    faqs: [
      { q: 'What are the best DIY gift ideas for homeowners?', a: 'Top DIY gifts for homeowners include cordless drills, laser levels, stud finders, smart thermostats, and tool organizers. These practical tools are used frequently and always welcome.' },
      { q: 'What are good housewarming gift ideas?', a: 'Great housewarming gifts include smart plugs, tool kits, himalayan salt lamps, charcuterie boards, and home repair books. These are useful from day one and make a new home feel complete.' },
      { q: 'What\'s a good DIY gift for someone who isn\'t handy?', a: 'For those new to DIY, gift beginner-friendly items: a basic tool set, a home repair book, a stud finder, or a laser level. These boost confidence and tackle the most common household tasks.' },
      { q: 'What tools are worth gifting?', a: 'The most-loved tool gifts are cordless drills, multi-tools, magnetic wristbands, rotary tool kits, and drill bit sets. Milwaukee, DeWalt, and Dremel are trusted brands that any DIYer will appreciate.' },
    ],
  },
  {
    slug: 'finance-productivity',
    tag: 'finance',
    title: 'Finance & Productivity Gifts',
    emoji: '📊',
    subtitle: 'Gifts that help people work smarter and grow their wealth',
    description: 'Planners, ergonomic office tools, and productivity systems for ambitious people.',
    intro: 'The best gifts for ambitious, goal-driven people combine practicality with inspiration. Our finance and productivity gift picks include personal finance planners, ergonomic office tools, focus timers, and career-building resources that help recipients level up their work and financial life. These gifts show you support their goals — not just their hobbies.',
    relatedSlugs: ['office-professional', 'tech-gadgets', 'hobby-enthusiasts'],
    faqs: [
      { q: 'What are good gifts for someone who loves personal finance?', a: 'Great finance-themed gifts include personal finance planners, goal-setting journals, standing desk converters, and blue light glasses. Books by popular finance authors also make excellent, affordable gifts.' },
      { q: 'What productivity gifts are most useful?', a: 'The most useful productivity gifts are time cube timers (for Pomodoro technique), noise-canceling headphones, ergonomic mice, standing desk mats, and monitor light bars — all proven to improve focus and reduce fatigue.' },
      { q: 'What gift helps someone work from home better?', a: 'For remote workers, consider: a laptop stand, wireless charger, USB-C hub, desk pad, monitor light bar, or standing desk converter. These upgrades make a home office feel professional and comfortable.' },
      { q: 'Are journals good gifts for productivity?', a: 'Absolutely. Goal-setting journals, bullet journals, and finance planners are among the highest-rated gift items for productive people — they\'re personal, actionable, and show thoughtfulness.' },
    ],
  },
  {
    slug: 'fitness-biohacking',
    tag: 'fitness',
    title: 'Fitness & Biohacking Gifts',
    emoji: '💪',
    subtitle: 'Gifts for gym-goers, wellness obsessives, and peak performers',
    description: 'Fitness gear, recovery tools, and biohacking devices for the health-conscious.',
    intro: 'From resistance bands and yoga mats to red light therapy wands and sleep trackers, this category covers the full spectrum of health-optimized gifting. Whether your recipient is a casual gym-goer, a serious athlete, or a biohacking enthusiast, our fitness gift selection has something at every price point to support their wellness journey.',
    relatedSlugs: ['tech-gadgets', 'luxury-premium', 'office-professional'],
    faqs: [
      { q: 'What are the best fitness gifts under $25?', a: 'Great fitness gifts under $25 include resistance bands, foam rollers, jump ropes, and protein shaker bottles. These are practical, used daily, and appreciated by fitness enthusiasts at any level.' },
      { q: 'What biohacking gifts are trending right now?', a: 'Popular biohacking gifts include the Oura Ring sleep tracker, red light therapy wands, infrared sauna blankets, HRV monitors, and cold therapy tools. These are popular with the health-optimization community.' },
      { q: 'What\'s a good gift for someone who goes to the gym?', a: 'Top gym gifts include a quality gym bag, wireless earbuds, shaker bottle, resistance bands, and a foam roller. For premium budgets, a massage gun or smart watch fitness tracker is a standout choice.' },
      { q: 'Are fitness gifts appropriate for any age?', a: 'Yes — fitness gifts scale to any age and ability. Yoga mats and walking poles suit older recipients, while resistance bands and jump ropes work for all ages. Focus on the recipient\'s current activity level.' },
    ],
  },
  {
    slug: 'parenting-baby',
    tag: 'parenting',
    title: 'Parenting & Baby Gifts',
    emoji: '👶',
    subtitle: 'Thoughtful gifts for new parents and growing families',
    description: 'Baby essentials, parent self-care, and clever parenting tools for every stage.',
    intro: 'New parents are exhausted, overwhelmed, and deeply grateful for practical gifts that make the early days easier. Our parenting and baby gift guide covers everything from white noise machines and diaper bag backpacks to postpartum recovery kits and baby food makers. These are gifts that parents will actually use — and thank you for.',
    relatedSlugs: ['luxury-premium', 'tech-gadgets', 'kitchen-cooking'],
    faqs: [
      { q: 'What are the best gifts for new parents?', a: 'The most appreciated new parent gifts are practical: white noise machines, diaper bag backpacks, portable changing pads, baby food makers, and postpartum care kits for mom. Avoid items that require specific sizing.' },
      { q: 'What should I get a new baby?', a: 'Safe, practical baby gifts include organic bandana bibs, plush loveys, shape sorter toys, activity gyms, and baby memory books. For bigger budgets, video baby monitors and convertible cribs are top choices.' },
      { q: 'What gift do new parents NOT need?', a: 'Avoid clothes in newborn sizes (they outgrow them fast), distracting toys, and items that require a specific nursery theme. Stick to practical, multi-use items in neutral colors.' },
      { q: 'What\'s a thoughtful gift for a baby shower?', a: 'Thoughtful baby shower gifts include baby memory books, growth chart rulers, ring sling carriers, baby food makers, and sound machines. These show genuine consideration for both baby and parents\' needs.' },
    ],
  },
  {
    slug: 'office-professional',
    tag: 'office',
    title: 'Office & Professional Gifts',
    emoji: '💼',
    subtitle: 'Gifts for the career-driven, desk-worker, and entrepreneur',
    description: 'Ergonomic tools, desk upgrades, and stylish office accessories for professionals.',
    intro: 'The modern professional spends more time at their desk than ever — which makes office gifts both practical and deeply appreciated. Our office and professional gift guide features ergonomic tools, stylish desk accessories, smart charging solutions, and focus aids that turn any workspace into a productivity powerhouse. Perfect for coworkers, bosses, graduates, and work-from-home pros.',
    relatedSlugs: ['tech-gadgets', 'finance-productivity', 'luxury-premium'],
    faqs: [
      { q: 'What are good office gifts for coworkers?', a: 'Popular coworker gifts include wireless chargers, blue light glasses, time cube timers, desk succulents, funny mugs, and cable organizers. Keep it practical and not too personal for workplace appropriateness.' },
      { q: 'What is a good gift for someone starting a new job?', a: 'New job gifts that impress include a quality notebook, leather card holder, wireless charger, adjustable laptop stand, or a nice desk pad. These are polished, professional, and genuinely useful.' },
      { q: 'What are the best desk setup gifts?', a: 'Top desk setup gifts include a monitor light bar, ergonomic mouse, cable organizer box, large desk pad, adjustable laptop stand, and a USB-C hub. These upgrades make any setup cleaner and more comfortable.' },
      { q: 'What\'s a good gift for a boss or manager?', a: 'For managers, choose premium items: a leather journal, Ember temperature mug, quality pen set, or a monogrammed card holder. These are professional, personal, and appropriate for any relationship level.' },
    ],
  },
  {
    slug: 'luxury-premium',
    tag: 'luxury',
    title: 'Luxury & Premium Gifts',
    emoji: '✨',
    subtitle: 'When only the best will do — premium gifts worth the splurge',
    description: 'Cashmere, crystal, leather, spa experiences, and premium brand gifts for every occasion.',
    intro: 'Some occasions call for something truly special. Our luxury gift selection spans cashmere sweaters and silk pajamas to crystal barware, premium spa experiences, and iconic brand-name gifts. Whether you\'re celebrating a milestone birthday, anniversary, or simply want to make a lasting impression, these premium gifts deliver wow-factor at every price point — including budget-friendly luxuries under $50.',
    relatedSlugs: ['kitchen-cooking', 'fitness-biohacking', 'office-professional'],
    faqs: [
      { q: 'What are considered luxury gifts?', a: 'Luxury gifts typically feature premium materials (cashmere, silk, leather, crystal), iconic brand names (KitchenAid, Dyson, Le Creuset, YETI), or unique experiences (spa days, cooking classes, hot air balloon rides).' },
      { q: 'What are affordable luxury gifts under $50?', a: 'Affordable luxury gifts include silk scrunchie sets, cashmere socks, luxury candles, jade face rollers, monogrammed leather journals, and premium tea gift sets — all under $50 but genuinely indulgent.' },
      { q: 'What\'s the most luxurious gift for her?', a: 'Top luxury gifts for women include the Dyson Airwrap, silk pajama sets, birthstone charm bracelets, spa day experiences, cashmere sweaters, and personalized jewelry boxes.' },
      { q: 'What\'s the best luxury gift for him?', a: 'Men\'s luxury gifts that impress include a full-grain leather weekender bag, Ray-Ban aviators, whiskey decanter set, watch winder box, or a premium pellet grill for the outdoor cook.' },
    ],
  },
  {
    slug: 'hobby-enthusiasts',
    tag: 'hobby',
    title: 'Gifts for Hobby Enthusiasts',
    emoji: '🎨',
    subtitle: 'Gifts for crafters, makers, gamers, and creative minds',
    description: 'Art supplies, music, DIY crafts, puzzles, and passion-project gear for every hobbyist.',
    intro: 'The best gift for a hobby enthusiast is something that fuels their passion. Whether they\'re into embroidery, leather crafting, rock tumbling, diamond painting, playing guitar, or building robots, our hobby gift guide has something to spark joy for every kind of maker and creator. These gifts show you know them well — and you support what they love.',
    relatedSlugs: ['tech-gadgets', 'kids-toys', 'luxury-premium'],
    faqs: [
      { q: 'What are good gifts for someone with creative hobbies?', a: 'Creative hobby gifts include calligraphy sets, embroidery kits, diamond painting sets, macrame kits, watercolor paint sets, and origami paper. These are affordable, engaging, and genuinely enjoyable.' },
      { q: 'What gifts do gamers actually want?', a: 'Gamers appreciate practical upgrades: mechanical keyboards, RGB gaming headsets, comfortable gaming chairs, controller stands, and gift cards for their preferred platform (Steam, PlayStation, Xbox).' },
      { q: 'What hobby gift is good for someone just starting out?', a: 'Starter kits are perfect: rock tumbler kits, leather craft sets, beginner guitar packs, embroidery kits, and watercolor sets all come with everything needed to get started right away.' },
      { q: 'What are unique hobby gifts most people haven\'t seen?', a: 'Unique hobby gifts include a lino printing kit, resin art starter set, macro photography lens set, miniature painting kit, and wooden ship model kit — all unexpectedly engaging and conversation-starting.' },
    ],
  },
  {
    slug: 'kitchen-cooking',
    tag: 'kitchen',
    title: 'Kitchen & Cooking Gifts',
    emoji: '🍳',
    subtitle: 'Gifts for home chefs, foodies, bakers, and coffee lovers',
    description: 'Cookware, baking tools, specialty foods, and kitchen gadgets for every foodie.',
    intro: 'From Le Creuset Dutch ovens and Japanese chef knives to sourdough starter kits and sushi-making sets, our kitchen gift guide is a food lover\'s paradise. Whether your recipient is a serious home chef or a curious kitchen beginner, these gifts inspire creativity, improve skills, and make cooking genuinely more enjoyable. Perfect for hosts, bakers, foodies, and everyone in between.',
    relatedSlugs: ['luxury-premium', 'diy-tools', 'parenting-baby'],
    faqs: [
      { q: 'What are the best kitchen gifts for home cooks?', a: 'Top kitchen gifts for home cooks include Japanese chef knives, Dutch ovens, cast iron skillets, digital meat thermometers, and pasta makers. These are tools they\'ll use every single week.' },
      { q: 'What are unique cooking gifts under $30?', a: 'Unique cooking gifts under $30 include sourdough starter kits, silicone baking mats, sushi making kits, air fryer cookbooks, and magnetic spice racks — all practical and a little unexpected.' },
      { q: 'What kitchen gift is best for a baker?', a: 'For bakers, choose from: silicone baking mats, a KitchenAid stand mixer, a kitchen scale, a proofing basket, or a quality rolling pin. For premium budgets, the KitchenAid Artisan is the ultimate baker\'s gift.' },
      { q: 'What\'s a good gift for a coffee lover?', a: 'Coffee lover gifts include an Ember temperature mug, Nespresso machine, pour-over coffee setup, coffee subscription box, or a burr grinder. These upgrades elevate the daily coffee ritual significantly.' },
    ],
  },
  {
    slug: 'pets',
    tag: 'pets',
    title: 'Gifts for Pet Lovers',
    emoji: '🐾',
    subtitle: 'Gifts for dog parents, cat people, and everyone in between',
    description: 'Toys, beds, tech, treats, and accessories for beloved furry family members.',
    intro: 'Pet parents are passionate, devoted, and always on the lookout for ways to make their pets happier and healthier. Our pet gift guide covers everything from interactive puzzle toys and orthopedic beds to DNA test kits and GPS trackers. Whether the recipient has a dog, cat, or both, these gifts show you know exactly how much their pet means to them.',
    relatedSlugs: ['tech-gadgets', 'luxury-premium', 'parenting-baby'],
    faqs: [
      { q: 'What are the best gifts for dog owners?', a: 'Top gifts for dog owners include GPS trackers, automatic ball launchers, orthopedic beds, DNA test kits, training clicker sets, and the Furbo dog camera. These make pet ownership easier and more fun.' },
      { q: 'What are good gifts for cat owners?', a: 'Cat owner favorites include interactive catnip toys, cat tree towers, window hammock perches, self-cleaning litter boxes, and custom pet portraits. These are thoughtful and genuinely used daily.' },
      { q: 'What\'s a unique pet gift that most people haven\'t given?', a: 'Unique pet gifts include a dog DNA test kit (breed + health), a custom watercolor pet portrait, a dog puzzle IQ toy, or a pet GPS tracker. These stand out from the usual toy or treat basket.' },
      { q: 'Are expensive pet gifts worth it?', a: 'High-end pet gifts like GPS trackers, self-cleaning litter boxes, and automatic feeders are genuinely worth the investment. They save time, provide peace of mind, and pet owners use them every single day.' },
    ],
  },
  {
    slug: 'home-decor',
    tag: 'home',
    title: 'Home Decor & Gifts',
    emoji: '🏠',
    subtitle: 'Cozy, stylish gifts for any home',
    description: 'Candles, decor, bedding, and thoughtful pieces to make any home feel warm and special.',
    intro: 'Home gifts are always in style. Whether you\'re shopping for a housewarming, a birthday, or just because, a beautifully chosen home gift shows real thoughtfulness. Our curated home gift picks range from cozy throw blankets and premium candles to stylish wall art and tableware — gifts that transform everyday spaces into places people love to be.',
    relatedSlugs: ['diy-tools', 'kitchen-cooking', 'luxury-premium'],
    faqs: [
      { q: 'What are good home decor gifts for a housewarming?', a: 'Personalized doormats, high-quality candles, cozy throw blankets, stylish planters, and beautiful serving boards are crowd-pleasing housewarming gifts anyone will appreciate.' },
      { q: 'What home gifts work for any style?', a: 'Neutral-toned throw pillows, minimalist candles, simple ceramic vases, and quality cotton blankets complement almost any interior style.' },
      { q: 'What home gifts are good under $50?', a: 'A premium scented candle, a linen napkin set, a decorative tray, or a set of matching coffee mugs make excellent home gifts under $50.' },
      { q: 'What home gifts do couples love?', a: 'Couples appreciate gifts for their shared space — matching mugs, a quality cheese board, a soft throw blanket, or a beautiful wall art print are all great options.' },
    ],
  },
  {
    slug: 'gardening-gifts',
    tag: 'gardening',
    title: 'Gardening Gifts & Tools',
    emoji: '🌱',
    subtitle: 'Gifts for every green thumb and outdoor gardener',
    description: 'Premium tools, planters, seed kits, and outdoor living gifts for passionate gardeners.',
    intro: 'Gardening gifts are a natural fit for anyone who loves spending time outdoors growing things. From beginner starter kits and beautiful ceramic planters to professional-grade pruners and rare seed collections, our gardening gift picks cover every skill level and garden size. Give a gift that keeps on growing.',
    relatedSlugs: ['diy-tools', 'home-decor', 'hobby-enthusiasts'],
    faqs: [
      { q: 'What are good gardening gifts for beginners?', a: 'Raised bed starter kits, beginner seed collections, a basic hand tool set, and a gardening journal give new gardeners everything they need to get started confidently.' },
      { q: 'What gardening gifts work for small spaces?', a: 'Self-watering planters, vertical wall pockets, compact herb kits, and balcony railing planters are perfect for apartment balconies and small patios.' },
      { q: 'What do experienced gardeners actually want?', a: 'Experienced gardeners appreciate premium tools like Felco pruners, a soil moisture meter, a quality kneeling bench, or heirloom seed collections they can\'t find locally.' },
      { q: 'What are unique gardening gifts that stand out?', a: 'A mushroom growing kit, a bonsai starter set, a personalized garden stone, or a subscription to a rare plant delivery service are memorable and unexpected.' },
    ],
  },
  {
    slug: 'sports-gifts',
    tag: 'sports',
    title: 'Sports Gifts & Gear',
    emoji: '🏆',
    subtitle: 'Gifts for every athlete, fan, and weekend warrior',
    description: 'Training equipment, apparel, fan gear, and recovery tools for every sport and skill level.',
    intro: 'Sports gifts score big whether the recipient is a die-hard fan, a weekend warrior, or a competitive athlete. Our curated sports gift picks cover every sport and budget — from personalized fan gear and premium training equipment to recovery tools that serious athletes actually want. Find the perfect gift that keeps them in the game.',
    relatedSlugs: ['fitness-biohacking', 'hobby-enthusiasts', 'gaming-gifts'],
    faqs: [
      { q: 'What are the best sports gifts under $50?', a: 'A quality water bottle, resistance bands, a foam roller, personalized team gear, or sport-specific accessories are great sports gifts under $50.' },
      { q: 'What sports gifts work for any athlete?', a: 'Versatile gifts like a premium gym bag, performance socks, a portable foam roller, compression sleeves, or a sports nutrition bundle work for any sport.' },
      { q: 'What gifts do sports fans love?', a: 'Sports fans love team jerseys, signed memorabilia, stadium seat cushions, team-branded drinkware, and personalized fan gear for their favorite team.' },
      { q: 'What are good recovery gifts for athletes?', a: 'Massage guns, foam rollers, compression sleeves, ice bath kits, and sports nutrition bundles are deeply appreciated by serious athletes.' },
    ],
  },
  {
    slug: 'gaming-gifts',
    tag: 'gaming',
    title: 'Gaming Gifts & Accessories',
    emoji: '🎮',
    subtitle: 'Level up any gamer\'s setup',
    description: 'Controllers, headsets, gaming chairs, and accessories for every type of gamer and budget.',
    intro: 'Gaming gifts are a surefire win for anyone who spends time at a console or PC. From budget-friendly accessories to premium gear upgrades, our gaming gift picks cover every platform and play style. Whether they\'re a casual mobile gamer, a console enthusiast, or a hardcore PC gamer, you\'ll find the perfect gift to level up their experience.',
    relatedSlugs: ['tech-gadgets', 'hobby-enthusiasts', 'office-professional'],
    faqs: [
      { q: 'What are the best gaming gifts under $50?', a: 'A gaming headset, controller stand, LED strip lights, a large gaming mouse pad, or a gift card to their preferred platform are all excellent gaming gifts under $50.' },
      { q: 'What gaming gifts work for casual gamers?', a: 'Casual gamers love a comfortable gaming chair, a wireless headset, or a gift card to the Nintendo eShop, PlayStation Store, or Xbox marketplace.' },
      { q: 'What gaming gifts are good for teenagers?', a: 'Teens love gaming accessories like mechanical keyboards, gaming headsets, custom controller skins, and RGB LED desk lamps for their setup.' },
      { q: 'What are good gifts for PC gamers?', a: 'PC gamers appreciate a quality gaming mouse, mechanical keyboard, cable management kit, high-refresh-rate monitor, or a Steam gift card.' },
    ],
  },
];

export function getCategoryBySlug(slug: string): CategoryConfig | undefined {
  return CATEGORIES.find((c) => c.slug === slug);
}

export const ALL_CATEGORY_SLUGS = CATEGORIES.map((c) => c.slug);
