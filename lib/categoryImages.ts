/**
 * Maps niche tags to local SVG category icon paths.
 * These icons replace Amazon CDN product images to comply with
 * Amazon Associates Operating Agreement §7.
 */

export const CATEGORY_IMAGES: Record<string, string> = {
  gaming:           '/img/categories/gaming.svg',
  tech:             '/img/categories/tech.svg',
  fitness:          '/img/categories/fitness.svg',
  kitchen:          '/img/categories/kitchen.svg',
  sports:           '/img/categories/sports.svg',
  hobby:            '/img/categories/hobby.svg',
  gardening:        '/img/categories/gardening.svg',
  finance:          '/img/categories/finance.svg',
  'car-accessories':'/img/categories/car-accessories.svg',
  pets:             '/img/categories/pets.svg',
  kids:             '/img/categories/kids.svg',
  parenting:        '/img/categories/parenting.svg',
  'diy-tools':      '/img/categories/diy-tools.svg',
  office:           '/img/categories/office.svg',
  home:             '/img/categories/home.svg',
  luxury:           '/img/categories/luxury.svg',
};

/**
 * Priority order for tag-to-icon resolution.
 * More specific / distinctive niches win over broad ones.
 */
const TAG_PRIORITY = [
  'luxury', 'gaming', 'fitness', 'kitchen', 'sports', 'hobby',
  'gardening', 'finance', 'car-accessories', 'pets', 'kids',
  'parenting', 'diy-tools', 'office', 'home', 'tech',
];

/**
 * Returns the best-matching local SVG icon path for a given tags array.
 * Falls back to the generic gift-box icon if no niche matches.
 */
export function getCategoryImageUrl(tags: string[]): string {
  for (const t of TAG_PRIORITY) {
    if (tags.includes(t)) return CATEGORY_IMAGES[t];
  }
  return '/img/categories/gift.svg';
}

/**
 * Returns true if the URL points to an Amazon CDN (violation of Associates TOS §7).
 */
export function isAmazonCdnUrl(url: string): boolean {
  return /media-amazon\.com|images\.amazon\.com/i.test(url);
}
