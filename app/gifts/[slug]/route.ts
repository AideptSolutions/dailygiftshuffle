// 410 Gone for the retired programmatic /gifts/{combo} pages.
//
// ~650 template-generated doorway pages (best-gifts-for-{recipient}-{occasion}
// etc., padded with slug-hash-random products when few matched) lived here
// from the March launch until 2026-08. They earned 1-2 impressions each and
// pattern-matched Google's scaled-content/doorway policies; the sitewide
// ranking collapse observed in the 2026-08-26 Search Console export made them
// a liability worth removing outright.
//
// A hard 410 (rather than 404) tells crawlers the removal is permanent, which
// drops the URLs from the index faster. Hand-built static siblings (e.g.
// /gifts/last-minute-mothers-day) take routing precedence over this dynamic
// segment and are unaffected.

const GONE_BODY = 'This page has been permanently removed.';

export function GET() {
  return new Response(GONE_BODY, {
    status: 410,
    headers: { 'Content-Type': 'text/plain', 'X-Robots-Tag': 'noindex' },
  });
}
