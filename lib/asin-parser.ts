/**
 * Extracts ASIN and affiliate tag from an Amazon URL (SiteStripe or direct dp link).
 * Handles formats like:
 *   https://www.amazon.com/dp/B077Z1R28P/?tag=mytag-20
 *   https://www.amazon.com/Product-Name/dp/B077Z1R28P?tag=mytag-20&...
 *   https://amzn.to/3AbcXYZ  (short link — ASIN not directly extractable)
 */
export function parseAmazonUrl(url: string): { asin: string | null; tag: string | null; cleanUrl: string } {
  const asinMatch = url.match(/\/dp\/([A-Z0-9]{10})/i);
  const tagMatch = url.match(/[?&]tag=([^&]+)/i);

  const asin = asinMatch ? asinMatch[1].toUpperCase() : null;
  const tag = tagMatch ? tagMatch[1] : null;

  // Build a clean dp URL if we have an ASIN
  const cleanUrl = asin
    ? `https://www.amazon.com/dp/${asin}${tag ? `?tag=${tag}` : ''}`
    : url;

  return { asin, tag, cleanUrl };
}

/**
 * Try to fetch the Amazon product page and pull og:title and og:image.
 * Amazon blocks most bots so this often fails gracefully.
 */
export async function fetchAmazonMeta(asin: string): Promise<{ title: string; image: string; price: string }> {
  const url = `https://www.amazon.com/dp/${asin}`;
  try {
    const res = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept-Language': 'en-US,en;q=0.9',
        'Accept': 'text/html,application/xhtml+xml',
      },
      signal: AbortSignal.timeout(8000),
    });

    if (!res.ok) return { title: '', image: '', price: '' };

    const html = await res.text();

    const titleMatch = html.match(/<meta[^>]+property="og:title"[^>]+content="([^"]+)"/i)
      || html.match(/<title>([^<]+)<\/title>/i);
    const imageMatch = html.match(/<meta[^>]+property="og:image"[^>]+content="([^"]+)"/i);
    const priceMatch = html.match(/class="[^"]*a-price-whole[^"]*"[^>]*>([0-9,]+)/i);

    return {
      title: titleMatch ? titleMatch[1].replace(/\s*:\s*Amazon\.com.*/, '').trim() : '',
      image: imageMatch ? imageMatch[1] : '',
      price: priceMatch ? priceMatch[1].replace(',', '') : '',
    };
  } catch {
    return { title: '', image: '', price: '' };
  }
}
