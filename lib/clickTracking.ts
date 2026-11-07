// Affiliate click tracking — shared helpers used by the global ClickTracker,
// the FavoritesSidebar "Shop All" button, and the server-side count/admin routes.
//
// We key every click by the Amazon ASIN (the 10-char id in /dp/XXXXXXXXXX), which
// is present in essentially every affiliate URL on the site and is stable per
// product across all the data sources. If no ASIN can be parsed we fall back to
// the raw URL so the click is still counted.

const ASIN_RE = /\/(?:dp|gp\/product|gp\/aw\/d|o\/ASIN|product)\/([A-Z0-9]{10})(?:[/?#]|$)/i;

/** Extract the Amazon ASIN from a product URL, or null if there isn't one. */
export function parseAsin(url: string): string | null {
  if (!url) return null;
  try {
    const u = new URL(url, 'https://www.amazon.com');
    const m = u.pathname.match(ASIN_RE);
    return m ? m[1].toUpperCase() : null;
  } catch {
    return null;
  }
}

/** True if the URL points at an Amazon domain (incl. amzn.to short links). */
export function isAmazonUrl(url: string): boolean {
  try {
    const h = new URL(url).hostname.toLowerCase();
    return h === 'amazon.com' || h.endsWith('.amazon.com') || h === 'amzn.to';
  } catch {
    return false;
  }
}

/** Daily click counts: hash per UTC day, field = "<key>|<path>", value = clicks. */
export const clickDayKey = (d: Date): string => `clicks:day:${d.toISOString().slice(0, 10)}`;
export const UNKNOWN_CLICK_PATH = '(unknown)';

/** Keep only a bounded pathname, so query strings are never stored. */
export function cleanClickPath(v: unknown): string {
  if (typeof v !== 'string' || !v.startsWith('/')) return UNKNOWN_CLICK_PATH;
  const path = v.split(/[?#|]/)[0];
  return path.length <= 120 ? path : UNKNOWN_CLICK_PATH;
}

/** Link text like "Buy on Amazon" says nothing about the product. */
export function isGenericClickName(name: string): boolean {
  return /^(buy|shop|view|see|check)\b.*\b(amazon|price|now|deal)\b/i.test(name.trim());
}

/** A 10-char ASIN (vs. a raw-URL fallback key). */
export function isAsin(key: string): boolean {
  return /^[A-Z0-9]{10}$/.test(key);
}

interface TrackArgs {
  url: string;
  name?: string;
}

/**
 * Client-side: record one affiliate click. Fires a same-origin beacon to the
 * first-party counter (reliable, not blocked by ad-blockers) and a GA4
 * `select_item` event. Safe no-op during SSR or if the APIs are unavailable.
 */
export function trackAffiliateClick({ url, name }: TrackArgs): void {
  if (typeof window === 'undefined') return;
  const asin = parseAsin(url);

  // First-party count via sendBeacon (survives the new-tab navigation).
  try {
    const body = JSON.stringify({ asin, url, name, path: window.location.pathname });
    const blob = new Blob([body], { type: 'application/json' });
    navigator.sendBeacon?.('/api/clicks', blob);
  } catch {
    /* ignore */
  }

  // GA4 custom event (shows under Engagement → Events).
  try {
    const w = window as unknown as { gtag?: (...args: unknown[]) => void };
    w.gtag?.('event', 'select_item', {
      item_list_name: 'affiliate_click',
      items: [{ item_id: asin ?? url, item_name: name }],
    });
  } catch {
    /* ignore */
  }
}
