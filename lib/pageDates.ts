// Page dates: when each route was first published and last changed.
//
// lib/pageDates.json is generated from git history by scripts/page-dates.mjs.
// LAST_REVIEWED holds hand-set content-review dates, which win over the
// generated ones. The sitemap lastmod, the visible "Updated" line and the
// Article markup all read from here, so the three always agree.
//
// Real dates only. Bing weighs lastmod for seasonal queries: never bump a date
// without a content review, and never bump every page at once.

import generated from './pageDates.json';

export const LAST_REVIEWED: Record<string, string> = {
  '/stocking-stuffers': '2026-11-04',
  '/trending-christmas-gifts-2026': '2026-11-09',
  '/holiday-shopping-statistics-2026': '2026-11-09',
  '/christmas-gifts-for-mom': '2026-11-01',
  '/christmas-gifts-for-dad': '2026-11-01',
  '/christmas-gifts-for-kids': '2026-11-01',
  '/christmas-gifts-for-teens': '2026-11-01',
  '/last-minute-christmas-gifts': '2026-11-01',
  '/hanukkah-gifts': '2026-11-01',
  '/last-minute-gift-ideas': '2026-11-01',
  '/mothers-day-gifts': '2026-11-01',
  '/mothers-day-gifts-for-wife': '2026-11-01',
  '/mothers-day-gifts-under-25': '2026-11-01',
  '/mothers-day-gifts-under-50': '2026-11-01',
  '/mothers-day-gifts-under-100': '2026-11-01',
  '/last-minute-mothers-day-gifts': '2026-11-01',
  '/gifts/last-minute-mothers-day': '2026-11-01',
  '/fathers-day-gifts': '2026-11-01',
  '/fathers-day-gifts-under-25': '2026-11-01',
  '/fathers-day-gifts-under-50': '2026-11-01',
  '/fathers-day-gifts-under-100': '2026-11-01',
  '/top-10-fathers-day-gifts': '2026-11-01',
};

const GENERATED = generated as Record<string, { published: string; modified: string }>;

export interface PageDates {
  published?: string;
  modified?: string;
}

/** Dates for a route path such as "/stocking-stuffers". `fileRoute` is the
 *  manifest key when it differs from the path, e.g. "/category/[niche]". */
export function pageDates(path: string, fileRoute?: string): PageDates {
  const g = GENERATED[fileRoute ?? path];
  const modified = LAST_REVIEWED[path] ?? g?.modified;
  return { published: g?.published, modified };
}

/** Accepts a route path or a full canonical URL. */
export function pathOf(urlOrPath: string): string {
  let p = urlOrPath;
  const scheme = p.indexOf('://');
  if (scheme >= 0) {
    const slash = p.indexOf('/', scheme + 3);
    p = slash >= 0 ? p.slice(slash) : '/';
  }
  p = p.split('?')[0].split('#')[0];
  if (p.length > 1 && p.endsWith('/')) p = p.slice(0, -1);
  return p || '/';
}

/** "November 4, 2026" for an ISO date, fixed to UTC noon so it never shifts a day. */
export function formatPageDate(iso: string): string {
  return new Date(`${iso}T12:00:00Z`).toLocaleDateString('en-US', {
    year: 'numeric', month: 'long', day: 'numeric', timeZone: 'UTC',
  });
}
