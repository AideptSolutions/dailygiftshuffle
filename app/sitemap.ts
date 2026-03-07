import { MetadataRoute } from 'next';
import { giftSlugs } from '@/data/gift-slugs';

const BASE_URL = 'https://dailygiftshuffle.com';

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

  return [...staticRoutes, ...categoryRoutes, ...giftRoutes];
}
