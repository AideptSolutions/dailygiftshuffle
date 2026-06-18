// Provider-agnostic product image search.
//
// One interface, swappable adapters. Pick the provider with IMAGE_PROVIDER
// (serper | serpapi), or pass { provider } explicitly. This keeps us from
// being locked to any single SERP vendor and lets us spread load across
// multiple free tiers.
//
// searchImages(query, opts) -> normalized candidates:
//   [{ imageUrl, link, source, domain, width, height }]
// pickBestImage(candidates, { name }) -> { best, ranked }

import { readFileSync } from 'fs';

// ---- env loading (scripts run outside Next, so load .env.all manually) ----
export function loadEnv(file = 'C:/Users/allan/projects/dailygiftshuffle/.env.all') {
  try {
    const text = readFileSync(file, 'utf8');
    for (const line of text.split('\n')) {
      const m = line.match(/^([A-Z0-9_]+)=(.*)$/);
      if (m && !process.env[m[1]]) process.env[m[1]] = m[2].replace(/^"|"$/g, '').trim();
    }
  } catch { /* file optional */ }
}

function domainOf(urlOrDomain = '') {
  try { return new URL(urlOrDomain).hostname.replace(/^www\./, ''); }
  catch { return String(urlOrDomain).replace(/^www\./, ''); }
}

// ---------------------------------------------------------------------------
// Adapters: each returns the raw normalized list. Never throws on empty.
// ---------------------------------------------------------------------------

async function serperAdapter(query, { num = 20 } = {}) {
  const key = process.env.SERPER_API_KEY;
  if (!key) throw new Error('SERPER_API_KEY not set');
  const res = await fetch('https://google.serper.dev/images', {
    method: 'POST',
    headers: { 'X-API-KEY': key, 'Content-Type': 'application/json' },
    body: JSON.stringify({ q: query, num, gl: 'us', location: 'United States' }),
  });
  if (!res.ok) throw new Error(`serper ${res.status}: ${(await res.text()).slice(0, 200)}`);
  const data = await res.json();
  return (data.images || []).map((x) => ({
    imageUrl: x.imageUrl,
    link: x.link,
    source: x.source,
    domain: domainOf(x.domain || x.link || x.imageUrl),
    width: x.imageWidth || 0,
    height: x.imageHeight || 0,
  }));
}

async function serpapiAdapter(query, { num = 20 } = {}) {
  const key = process.env.SERPAPI_KEY || process.env.SERP_API_KEY;
  if (!key) throw new Error('SERPAPI_KEY not set');
  const u = new URL('https://serpapi.com/search.json');
  u.searchParams.set('engine', 'google_images');
  u.searchParams.set('q', query);
  u.searchParams.set('gl', 'us');
  u.searchParams.set('api_key', key);
  const res = await fetch(u);
  if (!res.ok) throw new Error(`serpapi ${res.status}: ${(await res.text()).slice(0, 200)}`);
  const data = await res.json();
  return (data.images_results || []).slice(0, num).map((x) => ({
    imageUrl: x.original,
    link: x.link,
    source: x.source,
    domain: domainOf(x.source || x.link || x.original),
    width: x.original_width || 0,
    height: x.original_height || 0,
  }));
}

const ADAPTERS = { serper: serperAdapter, serpapi: serpapiAdapter };

export async function searchImages(query, opts = {}) {
  const provider = opts.provider || process.env.IMAGE_PROVIDER || 'serper';
  const adapter = ADAPTERS[provider];
  if (!adapter) throw new Error(`unknown image provider: ${provider}`);
  return adapter(query, opts);
}

// ---------------------------------------------------------------------------
// Ranking. Goal: a clean, accurate, retailer/brand product shot — NOT an
// Amazon-hosted image (Associates ToS) and NOT an editorial/lifestyle photo.
// ---------------------------------------------------------------------------

// Amazon-hosted images: excluded outright to stay clear of Associates ToS.
const BLOCKED = [/(^|\.)amazon\./i, /media-amazon/i, /ssl-images-amazon/i, /amzn\./i];

// Clean catalog-style product shots tend to come from these.
const PREFERRED = [
  'walmart.com', 'target.com', 'bestbuy.com', 'wayfair.com', 'macys.com',
  'kohls.com', 'homedepot.com', 'lowes.com', 'crateandbarrel.com',
  'williams-sonoma.com', 'rei.com', 'nordstrom.com',
  'walmartimages.com', 'bedbathandbeyond.com', 'overstock.com', 'qvc.com',
  'containerstore.com', 'anthropologie.com', 'westelm.com', 'ulta.com',
  'sephora.com', 'chewy.com', 'pcrichard.com', 'newegg.com', 'staples.com',
];

// Editorial / social / aggregator domains: usually lifestyle or review shots,
// not clean product photos. Heavily down-ranked, not blocked.
const DEMOTED = [
  'pinterest.', 'reddit.', 'youtube.', 'youtu.be', 'cnn.', 'cnet.',
  'nytimes.', 'theverge.', 'wirecutter.', 'buzzfeed.', 'instagram.',
  'facebook.', 'tiktok.', 'wikipedia.', 'wikimedia.', 'businessinsider.',
  'forbes.', 'goodhousekeeping.', 'tomsguide.', 'engadget.', 'medium.',
];

export function isBlocked(c) {
  const hay = `${c.domain} ${c.imageUrl}`;
  return BLOCKED.some((re) => re.test(hay));
}

function brandTokens(name = '') {
  // First couple of capitalized words tend to be the brand.
  return (name.match(/\b[A-Z][a-zA-Z]{2,}\b/g) || []).slice(0, 2).map((w) => w.toLowerCase());
}

export function scoreCandidate(c, { name = '' } = {}) {
  let score = 0;
  const d = c.domain || '';
  const area = (c.width || 0) * (c.height || 0);

  if (PREFERRED.some((p) => d.endsWith(p) || d.includes(p))) score += 50;
  if (DEMOTED.some((p) => d.includes(p))) score -= 60;

  // Brand's own site (brand token appears in the domain) is gold.
  const brands = brandTokens(name);
  if (brands.some((b) => d.includes(b))) score += 40;

  // Prefer larger images, capped.
  if (area >= 1_000_000) score += 25;
  else if (area >= 400_000) score += 15;
  else if (area >= 150_000) score += 5;
  else if (area > 0 && area < 40_000) score -= 20; // thumbnail-ish

  // Prefer near-square (catalog product shots), penalize extreme banners.
  if (c.width && c.height) {
    const ar = c.width / c.height;
    if (ar >= 0.8 && ar <= 1.25) score += 20;
    else if (ar < 0.4 || ar > 2.5) score -= 25;
  }

  if (/^https:/.test(c.imageUrl || '')) score += 3;
  return score;
}

export function pickBestImage(candidates, { name = '' } = {}) {
  const eligible = candidates.filter((c) => c.imageUrl && !isBlocked(c));
  const ranked = eligible
    .map((c) => ({ ...c, score: scoreCandidate(c, { name }) }))
    .sort((a, b) => b.score - a.score);
  return { best: ranked[0] || null, ranked };
}
