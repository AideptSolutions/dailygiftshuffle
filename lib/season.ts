// Holiday season window, shared by server components (homepage, which
// revalidates every few minutes so it flips with no redeploy) and client
// components (Navbar, resolved after mount for hydration safety).
//
// The Christmas layer runs Nov 1 through Dec 25 in US Eastern time, then the
// site returns to its evergreen look on its own.

const TZ = 'America/New_York';

function easternParts(now: Date): { year: number; month: number; day: number } {
  const parts = new Intl.DateTimeFormat('en-US', {
    timeZone: TZ,
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
  }).formatToParts(now);
  const get = (t: string) => Number(parts.find((p) => p.type === t)?.value);
  return { year: get('year'), month: get('month'), day: get('day') };
}

export function isChristmasSeason(now: Date = new Date()): boolean {
  const { month, day } = easternParts(now);
  return month === 11 || (month === 12 && day <= 25);
}

/** Halloween party season: September and October, US Eastern. */
export function isHalloweenSeason(now: Date = new Date()): boolean {
  const { month } = easternParts(now);
  return month === 9 || month === 10;
}

/**
 * Seasonal catalog visibility. Halloween items (tag 'halloween') are offered
 * only in Halloween season; the rest of the year they are hidden from every
 * shuffle, guide, the Genie and the feed, and only the Halloween pages
 * themselves (which keep their rankings) still list them.
 */
export function isInSeason(p: { tags?: readonly string[] }, now: Date = new Date()): boolean {
  return !p.tags?.includes('halloween') || isHalloweenSeason(now);
}

/** Whole days from today (Eastern) until Dec 25; 0 on Christmas Day. */
export function daysUntilChristmas(now: Date = new Date()): number {
  const { year, month, day } = easternParts(now);
  const today = Date.UTC(year, month - 1, day);
  const christmas = Date.UTC(year, 11, 25);
  return Math.max(0, Math.round((christmas - today) / 86_400_000));
}
