// Client-side error reporting. A script error that reaches the root of the app
// replaces the page for that visitor (and for a search engine's renderer), so
// every one is worth knowing about. Reports go to GA4 as an `exception` event
// and to /api/client-error, which keeps a short capped log with the user agent
// (GA4 filters known bots, so it alone cannot show a crawler's render failing).

const MAX_PER_PAGE = 5;
const seen = new Set<string>();

// Noise that is not a fault in this site's code.
const IGNORE = [
  /^Script error\.?$/i,          // cross-origin script, no detail available
  /ResizeObserver loop/i,        // benign browser notice
  /chrome-extension:|moz-extension:|safari-extension:/i,
];

export function reportClientError(input: { message: string; source?: string; fatal?: boolean }): void {
  try {
    if (typeof window === 'undefined') return;
    const message = String(input.message || 'unknown').slice(0, 300);
    const source = String(input.source || '').slice(0, 200);
    if (IGNORE.some((re) => re.test(message) || re.test(source))) return;
    if (seen.has(message) || seen.size >= MAX_PER_PAGE) return;
    seen.add(message);

    const fatal = Boolean(input.fatal);
    const gtag = (window as unknown as { gtag?: (...args: unknown[]) => void }).gtag;
    if (typeof gtag === 'function') gtag('event', 'exception', { description: message, fatal });

    const body = JSON.stringify({ message, source, fatal, path: window.location.pathname });
    if (typeof navigator.sendBeacon === 'function') {
      navigator.sendBeacon('/api/client-error', new Blob([body], { type: 'application/json' }));
    } else {
      void fetch('/api/client-error', { method: 'POST', body, keepalive: true, headers: { 'content-type': 'application/json' } }).catch(() => {});
    }
  } catch {
    // Reporting must never be the thing that breaks the page.
  }
}
