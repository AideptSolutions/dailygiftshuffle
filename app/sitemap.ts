import { MetadataRoute } from 'next';
import { giftSlugs } from '@/data/gift-slugs';

const BASE_URL = 'https://thegiftshuffle.com';

const NICHES = [
  'tech', 'diy-tools', 'home', 'gaming', 'sports', 'gardening', 'finance', 'fitness', 'parenting',
  'office', 'luxury', 'hobby', 'kitchen', 'pets',
  'kids', 'car-accessories',
];

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: BASE_URL, changeFrequency: 'weekly', priority: 1.0 },
    { url: `${BASE_URL}/shuffle`, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${BASE_URL}/wishlist`, changeFrequency: 'monthly', priority: 0.5 },
    { url: `${BASE_URL}/about`, changeFrequency: 'monthly', priority: 0.4 },
  ];

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

  const occasionBudgetLandingPages: MetadataRoute.Sitemap = [
    '/gifts-under-25',
    '/gifts-under-50',
    '/gifts-under-100',
    '/christmas-gift-ideas',
    '/birthday-gift-ideas',
    '/mothers-day-gifts',
    '/fathers-day-gifts',
    '/blog',
  ].map((path) => ({
    url: `${BASE_URL}${path}`,
    changeFrequency: 'weekly' as const,
    priority: 0.85,
  }));

  const categoryRoutes: MetadataRoute.Sitemap = NICHES.map((niche) => ({
    url: `${BASE_URL}/category/${niche}`,
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  const giftRoutes: MetadataRoute.Sitemap = giftSlugs.map((slug) => ({
    url: `${BASE_URL}/gifts/${slug}`,
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }));

  return [
    ...staticRoutes,
    ...recipientLandingPages,
    ...occasionBudgetLandingPages,
    ...categoryRoutes,
    ...giftRoutes,
  ];
}
