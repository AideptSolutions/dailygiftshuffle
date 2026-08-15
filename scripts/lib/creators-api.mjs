// Amazon Creators API client (the successor to PA-API 5, which is deprecated).
//
// This is the authoritative source for price, rating, review count and images -
// the fields scripts/enrich-products.mjs got wrong for 205 products because it
// read them from Google Shopping, which carries no Amazon data. See
// CATALOG-DATA-QUALITY.md.
//
// Credentials come from .env.all (gitignored) and are never logged:
//   AMAZON_CREATORS_CLIENT_ID      credential id from Associates Central
//   AMAZON_CREATORS_CLIENT_SECRET  credential secret (shown once at creation)
//   AMAZON_PARTNER_TAG             store id, e.g. dailygiftshuf-20
//
// Credential version -> token endpoint (the API endpoint is the same globally;
// credentials work across marketplaces, only the token host differs):
//   3.1 NA  api.amazon.com      3.2 EU  api.amazon.co.uk    3.3 FE  api.amazon.co.jp
import { readFileSync } from 'fs';
import path from 'path';

const ROOT = path.resolve(path.dirname(new URL(import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, '$1')), '..', '..');

export function loadEnv() {
  for (const ef of ['.env.all', '.env.local']) {
    try {
      for (const line of readFileSync(path.join(ROOT, ef), 'utf8').split('\n')) {
        const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)$/);
        if (m && !process.env[m[1]]) process.env[m[1]] = m[2].replace(/^["']|["']$/g, '').trim();
      }
    } catch {}
  }
}

const TOKEN_HOST = {
  '3.1': 'https://api.amazon.com',
  '3.2': 'https://api.amazon.co.uk',
  '3.3': 'https://api.amazon.co.jp',
};

export const API_BASE = 'https://creatorsapi.amazon';
export const MARKETPLACE = process.env.AMAZON_MARKETPLACE || 'www.amazon.com';

let cached = null; // { token, expiresAt }

export async function getAccessToken() {
  if (cached && Date.now() < cached.expiresAt - 60_000) return cached.token;

  const id = process.env.AMAZON_CREATORS_CLIENT_ID;
  const secret = process.env.AMAZON_CREATORS_CLIENT_SECRET;
  const version = process.env.AMAZON_CREATORS_VERSION || '3.1';
  if (!id || !secret) {
    throw new Error('AMAZON_CREATORS_CLIENT_ID / AMAZON_CREATORS_CLIENT_SECRET missing from .env.all');
  }
  const host = TOKEN_HOST[version];
  if (!host) throw new Error(`unknown credential version ${version} (expected 3.1, 3.2 or 3.3)`);

  const r = await fetch(`${host}/auth/o2/token`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      grant_type: 'client_credentials',
      client_id: id,
      client_secret: secret,
      scope: 'creatorsapi::default',
    }),
  });
  const body = await r.text();
  if (!r.ok) {
    // Never echo the secret back out, only the status and Amazon's own message.
    throw new Error(`token ${r.status}: ${body.slice(0, 200)}`);
  }
  const j = JSON.parse(body);
  cached = { token: j.access_token, expiresAt: Date.now() + (j.expires_in || 3600) * 1000 };
  return cached.token;
}

export const DEFAULT_RESOURCES = [
  'itemInfo.title',
  'customerReviews.count',
  'customerReviews.starRating',
  'offersV2.listings.price',
  'images.primary.large',
  'parentASIN',
];

/**
 * Fetch up to 10 ASINs per call (the documented GetItems batch limit).
 * Returns the raw `itemsResult.items` array plus any per-item errors.
 */
export async function getItems(asins, resources = DEFAULT_RESOURCES) {
  if (!asins.length) return { items: [], errors: [] };
  if (asins.length > 10) throw new Error('getItems accepts at most 10 ASINs per call');
  const token = await getAccessToken();
  const r = await fetch(`${API_BASE}/catalog/v1/getItems`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
      'x-marketplace': MARKETPLACE,
    },
    body: JSON.stringify({
      itemIds: asins,
      itemIdType: 'ASIN',
      marketplace: MARKETPLACE,
      partnerTag: process.env.AMAZON_PARTNER_TAG,
      resources,
    }),
  });
  const text = await r.text();
  if (!r.ok) throw new Error(`getItems ${r.status}: ${text.slice(0, 300)}`);
  const j = JSON.parse(text);
  return { items: j.itemsResult?.items ?? [], errors: j.errors ?? [] };
}

/** Flatten one API item into the fields the catalog stores. */
export function normalize(item) {
  const price = item?.offersV2?.listings?.[0]?.price;
  return {
    asin: item.asin,
    title: item?.itemInfo?.title?.displayValue ?? null,
    rating: item?.customerReviews?.starRating?.value ?? null,
    reviewCount: item?.customerReviews?.count ?? null,
    // Shape varies by locale; take whichever numeric amount is present.
    price: price?.money?.amount ?? price?.amount ?? null,
    priceDisplay: price?.money?.displayAmount ?? price?.displayAmount ?? null,
    image: item?.images?.primary?.large?.url ?? null,
    detailPageURL: item?.detailPageURL ?? null,
    parentASIN: item?.parentASIN ?? null,
  };
}

/** Fetch any number of ASINs, batching by 10 and pacing between calls. */
export async function getAllItems(asins, { resources = DEFAULT_RESOURCES, delayMs = 400, onBatch } = {}) {
  const out = new Map();
  const failures = [];
  const unique = [...new Set(asins)];
  for (let i = 0; i < unique.length; i += 10) {
    const batch = unique.slice(i, i + 10);
    try {
      const { items, errors } = await getItems(batch, resources);
      for (const it of items) out.set(it.asin, normalize(it));
      for (const e of errors) failures.push({ batch, error: e?.code || e?.message || String(e) });
    } catch (e) {
      failures.push({ batch, error: String(e.message || e).slice(0, 160) });
    }
    onBatch?.(Math.min(i + 10, unique.length), unique.length);
    if (i + 10 < unique.length) await new Promise((r) => setTimeout(r, delayMs));
  }
  return { data: out, failures };
}
