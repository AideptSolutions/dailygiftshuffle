import { MetadataRoute } from 'next';

const BASE_URL = 'https://www.thegiftshuffle.com';

const NICHES = [
  'tech', 'diy-tools', 'home', 'gaming', 'sports', 'gardening', 'finance', 'fitness', 'parenting',
  'office', 'luxury', 'hobby', 'kitchen', 'pets',
  'kids', 'car-accessories', 'outdoors', 'travel', 'beauty', 'ai-smart-home', 'baby-shower', 'wedding',
];

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: BASE_URL, changeFrequency: 'weekly', priority: 1.0 },
    { url: `${BASE_URL}/shuffle`, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${BASE_URL}/wishlist`, changeFrequency: 'monthly', priority: 0.5 },
    { url: `${BASE_URL}/about`, changeFrequency: 'monthly', priority: 0.4 },
  ];

  // Only include recipient pages that actually exist in /app
  const recipientLandingPages: MetadataRoute.Sitemap = [
    '/gift-ideas-for-mom',
    '/gift-ideas-for-dad',
    '/gift-ideas-for-him',
    '/gift-ideas-for-her',
    '/gift-ideas-for-kids',
    '/gift-ideas-for-teens',
    '/gift-ideas-for-grandparents',
    '/gift-ideas-for-friends',
  ].map((path) => ({
    url: `${BASE_URL}${path}`,
    changeFrequency: 'weekly' as const,
    priority: 0.9,
  }));

  // Only include occasion/budget pages that actually exist in /app
  const occasionBudgetLandingPages: MetadataRoute.Sitemap = [
    '/gifts-under-50',
    '/christmas-gift-ideas',
    '/birthday-gift-ideas',
    '/best-birthday-gifts-2026',
    '/unique-birthday-gifts',
    '/birthday-gifts-for-gamers',
    '/30th-birthday-gifts',
    '/best-gifts-for-her-2026',
    '/romantic-gifts-for-her',
    '/gifts-for-girlfriend',
    '/gifts-for-wife',
    '/gifts-for-a-crush',
    '/best-camping-gifts',
    '/best-gaming-gifts-2026',
    '/help-me-pick-a-gift',
    '/self-care-gifts',
    '/self-care-gifts-for-her',
    '/gifts-for-crafters',
    '/gifts-for-college-students',
    '/best-luxury-gifts-2026',
    '/luxury-gifts-for-her',
    '/luxury-gifts-under-200',
    '/luxury-gifts-under-50',
    '/retro-gaming-gifts',
    '/camping-gifts-for-women',
    '/camping-gifts-for-men',
    '/best-fitness-gifts-2026',
    '/best-anniversary-gifts-2026',
    '/best-beauty-gifts-2026',
    '/patriotic-gifts',
    '/world-cup-gifts',
    '/best-baby-shower-gifts-2026',
    '/gifts-for-camping-and-outdoors',
    '/gifts-under-25',
    '/gifts-under-100',
    '/mothers-day-gifts',
    '/mothers-day-gifts-under-50',
    '/mothers-day-gifts-under-25',
    '/mothers-day-gifts-for-wife',
    '/mothers-day-gifts-under-100',
    '/last-minute-mothers-day-gifts',
    '/gift-ideas-for-teachers',
    '/fathers-day-gifts',
    '/fathers-day-gifts-under-25',
    '/fathers-day-gifts-under-50',
    '/fathers-day-gifts-under-100',
    '/graduation-gifts',
    '/graduation-gifts-under-50',
    '/graduation-gifts-under-100',
    '/gifts-for-coworkers',
    '/gifts-for-boss',
    '/stocking-stuffers',
    '/white-elephant-gifts',
    '/secret-santa-gifts',
    '/christmas-gifts-for-her',
    '/christmas-gifts-for-him',
    '/retirement-gifts',
    '/gifts-for-people-who-have-everything',
    '/housewarming-gifts',
    '/gift-ideas-for-sister',
    '/gift-ideas-for-brother',
    '/40th-birthday-gifts',
    '/50th-birthday-gifts',
    '/gifts-for-teenage-girls',
    '/gifts-for-teenage-boys',
    '/gifts/last-minute-mothers-day',
    '/gift-genie',
    '/blog',
    '/blog/what-is-the-gift-genie',
  ].map((path) => ({
    url: `${BASE_URL}${path}`,
    changeFrequency: 'weekly' as const,
    priority: 0.85,
  }));

  // The interactive per-category shuffle pages are real, indexable pages, so
  // submit them alongside the category browse pages.
  const shuffleRoutes: MetadataRoute.Sitemap = NICHES.map((niche) => ({
    url: `${BASE_URL}/shuffle/${niche}`,
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }));

  const categoryRoutes: MetadataRoute.Sitemap = NICHES.map((niche) => ({
    url: `${BASE_URL}/category/${niche}`,
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  // The programmatic /gifts/[slug] combos (600+) are intentionally NOT submitted:
  // they are thin/near-duplicate and were flooding crawl budget (GSC showed ~600
  // "Discovered - currently not indexed"). The pages stay live and crawlable via
  // internal links; we just stop actively submitting them so crawl budget focuses
  // on the real guide, category and landing pages.
  return [
    ...staticRoutes,
    ...recipientLandingPages,
    ...occasionBudgetLandingPages,
    ...categoryRoutes,
    ...shuffleRoutes,
  ];
}
