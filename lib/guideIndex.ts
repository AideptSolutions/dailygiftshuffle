// Every gift guide on the site, grouped for the "Every Gift Guide" directory on
// /category. The directory is what guarantees no guide is an orphan: /category
// is linked from the footer of every page, and it links to each guide here.
//
// WHEN YOU ADD A GUIDE PAGE: add it to app/sitemap.ts AND to a group below.

export interface GuideIndexLink {
  href: string;
  label: string;
}

export interface GuideIndexGroup {
  heading: string;
  links: GuideIndexLink[];
}

export const GUIDE_INDEX: GuideIndexGroup[] = [
  {
    heading: 'Christmas and Holidays',
    links: [
      { href: '/christmas-gift-ideas', label: 'Christmas Gift Ideas' },
      { href: '/trending-christmas-gifts-2026', label: 'Trending Christmas Gifts of 2026' },
      { href: '/christmas-gifts-for-her', label: 'Christmas Gifts for Her' },
      { href: '/christmas-gifts-for-him', label: 'Christmas Gifts for Him' },
      { href: '/christmas-gifts-for-mom', label: 'Christmas Gifts for Mom' },
      { href: '/christmas-gifts-for-dad', label: 'Christmas Gifts for Dad' },
      { href: '/christmas-gifts-for-kids', label: 'Christmas Gifts for Kids' },
      { href: '/christmas-gifts-for-teens', label: 'Christmas Gifts for Teens' },
      { href: '/last-minute-christmas-gifts', label: 'Last-Minute Christmas Gifts' },
      { href: '/hanukkah-gifts', label: 'Hanukkah Gifts' },
      { href: '/white-elephant-gifts', label: 'White Elephant Gifts' },
      { href: '/secret-santa-gifts', label: 'Secret Santa Gifts' },
      { href: '/holiday-shopping-statistics-2026', label: 'Holiday Shopping Statistics 2026' },
    ],
  },
  {
    heading: 'Stocking Stuffers',
    links: [
      { href: '/stocking-stuffers', label: 'Best Stocking Stuffers' },
      { href: '/stocking-stuffers-under-10', label: 'Stocking Stuffers Under $10' },
      { href: '/stocking-stuffers-for-her', label: 'Stocking Stuffers for Her' },
      { href: '/stocking-stuffers-for-him', label: 'Stocking Stuffers for Him' },
      { href: '/stocking-stuffers-for-kids', label: 'Stocking Stuffers for Kids' },
      { href: '/stocking-stuffers-for-mom', label: 'Stocking Stuffers for Mom' },
      { href: '/stocking-stuffers-for-dad', label: 'Stocking Stuffers for Dad' },
    ],
  },
  {
    heading: 'For Her',
    links: [
      { href: '/gift-ideas-for-her', label: 'Gift Ideas for Her' },
      { href: '/best-gifts-for-her-2026', label: 'Best Gifts for Her in 2026' },
      { href: '/gifts-for-wife', label: 'Gifts for Your Wife' },
      { href: '/gifts-for-girlfriend', label: 'Gifts for Your Girlfriend' },
      { href: '/romantic-gifts-for-her', label: 'Romantic Gifts for Her' },
      { href: '/gifts-for-a-crush', label: 'Gifts for a Crush' },
      { href: '/luxury-gifts-for-her', label: 'Luxury Gifts for Her' },
      { href: '/self-care-gifts-for-her', label: 'Self-Care Gifts for Her' },
      { href: '/best-anniversary-gifts-2026', label: 'Anniversary Gifts' },
    ],
  },
  {
    heading: 'For Him and Family',
    links: [
      { href: '/gift-ideas-for-him', label: 'Gift Ideas for Him' },
      { href: '/gift-ideas-for-mom', label: 'Gift Ideas for Mom' },
      { href: '/gift-ideas-for-dad', label: 'Gift Ideas for Dad' },
      { href: '/top-10-gifts-for-new-dads-under-50', label: 'Gifts for New Dads Under $50' },
      { href: '/gift-ideas-for-kids', label: 'Gift Ideas for Kids and Grandkids' },
      { href: '/gift-ideas-for-teens', label: 'Gift Ideas for Teens' },
      { href: '/gifts-for-teenage-girls', label: 'Gifts for Teenage Girls' },
      { href: '/gifts-for-teenage-boys', label: 'Gifts for Teenage Boys' },
      { href: '/gift-ideas-for-sister', label: 'Gift Ideas for Your Sister' },
      { href: '/gift-ideas-for-brother', label: 'Gift Ideas for Your Brother' },
      { href: '/gift-ideas-for-grandparents', label: 'Gift Ideas for Grandparents' },
      { href: '/top-10-gifts-for-grandparents-who-have-everything', label: 'Gifts for Grandparents Who Have Everything' },
      { href: '/gift-ideas-for-friends', label: 'Gift Ideas for Friends' },
    ],
  },
  {
    heading: 'Birthdays',
    links: [
      { href: '/birthday-gift-ideas', label: 'Birthday Gift Ideas' },
      { href: '/best-birthday-gifts-2026', label: 'Best Birthday Gifts for 2026' },
      { href: '/unique-birthday-gifts', label: 'Unique Birthday Gifts' },
      { href: '/birthday-gifts-for-gamers', label: 'Birthday Gifts for Gamers' },
      { href: '/30th-birthday-gifts', label: '30th Birthday Gifts' },
      { href: '/40th-birthday-gifts', label: '40th Birthday Gifts' },
      { href: '/50th-birthday-gifts', label: '50th Birthday Gifts' },
    ],
  },
  {
    heading: 'By Budget',
    links: [
      { href: '/gifts-under-25', label: 'Gifts Under $25' },
      { href: '/gifts-under-50', label: 'Gifts Under $50' },
      { href: '/gifts-under-100', label: 'Gifts Under $100' },
      { href: '/luxury-gifts-under-50', label: 'Luxury Gifts Under $50' },
      { href: '/luxury-gifts-under-200', label: 'Luxury Gifts Under $200' },
      { href: '/best-luxury-gifts-2026', label: 'Best Luxury Gifts for 2026' },
    ],
  },
  {
    heading: 'By Interest',
    links: [
      { href: '/best-gaming-gifts-2026', label: 'Gaming Gifts' },
      { href: '/retro-gaming-gifts', label: 'Retro Gaming Gifts' },
      { href: '/tech-gadgets', label: 'Tech Gifts and Gadgets' },
      { href: '/ai-personalized-gifts', label: 'AI-Powered Personalized Gifts' },
      { href: '/best-fitness-gifts-2026', label: 'Fitness Gifts' },
      { href: '/best-beauty-gifts-2026', label: 'Beauty Gifts' },
      { href: '/self-care-gifts', label: 'Self-Care and Wellness Gifts' },
      { href: '/gifts-for-crafters', label: 'Gifts for Crafters' },
      { href: '/best-camping-gifts', label: 'Camping Gifts' },
      { href: '/camping-gifts-for-men', label: 'Camping Gifts for Men' },
      { href: '/camping-gifts-for-women', label: 'Camping Gifts for Women' },
      { href: '/gifts-for-camping-and-outdoors', label: 'Gifts for Camping and the Outdoors' },
      { href: '/sustainable-eco-gifts', label: 'Sustainable Eco-Friendly Gifts' },
      { href: '/top-10-gifts-that-dont-need-batteries-or-wifi', label: 'Gifts That Need No Batteries or Wi-Fi' },
    ],
  },
  {
    heading: 'Occasions and Milestones',
    links: [
      { href: '/graduation-gifts', label: 'Graduation Gifts' },
      { href: '/graduation-gifts-under-50', label: 'Graduation Gifts Under $50' },
      { href: '/graduation-gifts-under-100', label: 'Graduation Gifts Under $100' },
      { href: '/gifts-for-college-students', label: 'Gifts for New College Students' },
      { href: '/best-baby-shower-gifts-2026', label: 'Baby Shower Gifts' },
      { href: '/housewarming-gifts', label: 'Housewarming Gifts' },
      { href: '/retirement-gifts', label: 'Retirement Gifts' },
      { href: '/halloween-party-gifts', label: 'Halloween Party Essentials' },
      { href: '/patriotic-gifts', label: 'Patriotic Gifts' },
      { href: '/world-cup-gifts', label: 'World Cup Gifts for Soccer Fans' },
    ],
  },
  {
    heading: "Mother's Day and Father's Day",
    links: [
      { href: '/mothers-day-gifts', label: "Mother's Day Gifts" },
      { href: '/mothers-day-gifts-for-wife', label: "Mother's Day Gifts for Wife" },
      { href: '/mothers-day-gifts-under-25', label: "Mother's Day Gifts Under $25" },
      { href: '/mothers-day-gifts-under-50', label: "Mother's Day Gifts Under $50" },
      { href: '/mothers-day-gifts-under-100', label: "Mother's Day Gifts Under $100" },
      { href: '/last-minute-mothers-day-gifts', label: "Last-Minute Mother's Day Gifts" },
      { href: '/fathers-day-gifts', label: "Father's Day Gifts" },
      { href: '/fathers-day-gifts-under-25', label: "Father's Day Gifts Under $25" },
      { href: '/fathers-day-gifts-under-50', label: "Father's Day Gifts Under $50" },
      { href: '/fathers-day-gifts-under-100', label: "Father's Day Gifts Under $100" },
      { href: '/top-10-fathers-day-gifts', label: "Top 10 Father's Day Gifts" },
    ],
  },
  {
    heading: 'Work and Thank-You Gifts',
    links: [
      { href: '/gifts-for-coworkers', label: 'Gifts for Coworkers' },
      { href: '/gifts-for-boss', label: 'Gifts for Your Boss' },
      { href: '/gift-ideas-for-teachers', label: 'Teacher Appreciation Gifts' },
    ],
  },
  {
    heading: 'Not Sure Where to Start?',
    links: [
      { href: '/help-me-pick-a-gift', label: 'Help Me Pick a Gift' },
      { href: '/gifts-for-people-who-have-everything', label: 'Gifts for People Who Have Everything' },
      { href: '/last-minute-gift-ideas', label: 'Last-Minute Gift Ideas' },
      { href: '/gift-genie', label: 'Gift Genie (AI Gift Finder)' },
      { href: '/blog', label: 'The GiftShuffle Blog' },
    ],
  },
];
