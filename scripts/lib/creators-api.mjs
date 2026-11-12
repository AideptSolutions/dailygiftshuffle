// Amazon Creators API client (the successor to PA-API 5, which is deprecated).
//
// This is the authoritative source for price, title and product links. See
// CATALOG-DATA-QUALITY.md for what the account is and is not served.
//
// Credentials come from .env.all (gitignored) and are never logged:
//   AMAZON_CREATORS_CLIENT_ID      credential id from Associates Central
//   AMAZON_CREATORS_CLIENT_SECRET  credential secret (shown once at creation)
//   AMAZON_PARTNER_TAG             store id, e.g. dailygiftshuf-20
//
// Credential version -> token endpoint (the API endpoint is the same globally;
// credentials work across marketplaces, only the token host differs):
//   3.1 NA  api.amazon.com      3.2 EU  api.amazon.co.uk    3.3 FE  api.amazon.co.jp
//
// RATE LIMITS (Amazon "API Rates" page, read 2026-11-11). Every call is one
// transaction, whether it carries 1 product or 10.
//   - 1 call per second.
//   - A daily allowance: 8,640 calls for the first 30 days after a credential
//     is created, then 1 call per day for every 5 cents of shipped revenue
//     Amazon attributes to Creators API links in the previous 30 days. At this
//     site's volume that can be a small number, and Amazon does not publish the
//     current figure, so this client assumes it is small.
//   - Going over returns 429 TooManyRequests.
// What this client does about it, for every script that uses it:
//   1. Waits 2 seconds after each response before the next call, across
//      separate runs too (see minIntervalMs for why not 1 second).
//   2. Counts calls over a rolling 24 hours in .cache/creators-api.json and
//      refuses to go past a self-imposed cap (AMAZON_API_DAILY_CAP, default 300).
//   3. On a 429 it stops at once, does not retry, and refuses further calls
//      for a cooling-off period (Retry-After if Amazon sends one, else 30 min).
//   4. Reuses the access token for its full hour instead of asking for a new
//      one each run (Amazon's own best-practice note).
//   5. Sends up to 10 products per call, so a full catalog pass is ~110 calls.
//
// OTHER RULES FROM AMAZON'S "BEST PROGRAMMING PRACTICES" PAGE (read 2026-11-11):
//   - Never call the API while rendering a page. Crawler traffic would spend
//     the allowance. Calls belong in scripts or scheduled jobs only.
//   - How long a response may be kept: offers (prices) 1 hour, everything else
//     (title, images, links) 1 day. The license allows prices to be shown for
//     up to 24 hours if a date and time stamp is displayed beside them.
//   - Links returned by the API (detailPageURL) must be used unaltered, or the
//     sale is not attributed and the allowance does not grow.
//   - Ask only for the resources a job needs.
import { mkdirSync, readFileSync, writeFileSync } from 'fs';
import path from 'path';

const ROOT = path.resolve(path.dirname(new URL(import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, '$1')), '..', '..');
const STATE_FILE = path.join(ROOT, '.cache', 'creators-api.json'); // gitignored
const DAY_MS = 24 * 60 * 60 * 1000;

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

// Associates Program IP License, section 4 (Agents): software acting on the
// account's behalf must identify itself in every request with a user agent of
// the form "Agent/[agent name]". Set AMAZON_AGENT_NAME to say who is running
// the script (for example ClaudeCode); the default names this project's tools.
export function agentUserAgent() {
  const name = (process.env.AMAZON_AGENT_NAME || 'TheGiftShuffleCatalogTools').replace(/[^A-Za-z0-9._-]/g, '');
  return `Agent/${name} (+https://www.thegiftshuffle.com)`;
}

// ---------------------------------------------------------------------------
// Rate-limit guard
// ---------------------------------------------------------------------------

/** Thrown when Amazon throttled us, or we are inside a cooling-off period. */
export class RateLimitError extends Error {
  constructor(message, until) {
    super(message);
    this.name = 'RateLimitError';
    this.until = until;
  }
}

/** Thrown when the self-imposed daily cap is reached. No request was sent. */
export class BudgetError extends Error {
  constructor(message) {
    super(message);
    this.name = 'BudgetError';
  }
}

const num = (v, fallback) => (Number.isFinite(Number(v)) && Number(v) > 0 ? Number(v) : fallback);
// Two seconds between calls, measured from when the previous response ARRIVED,
// and never less than 1.5 s whatever the environment says. On 2026-11-11 a run
// paced at 1.1 s between request starts was throttled after 130 calls in a row:
// network timing can bunch two requests into the same second at Amazon's end.
const minIntervalMs = () => Math.max(1500, num(process.env.AMAZON_API_MIN_INTERVAL_MS, 2000));
// A backstop against a runaway script, not Amazon's limit (which is unknown and
// at least 148). The first throttle, at 147 calls in 24 hours, turned out to be
// the per-second limit: a call 31 minutes later went through. Raise the cap for
// one run with AMAZON_API_DAILY_CAP when a job needs more.
const dailyCap = () => num(process.env.AMAZON_API_DAILY_CAP, 300);
const COOL_OFF_MS = 30 * 60 * 1000;

function readState() {
  try {
    const s = JSON.parse(readFileSync(STATE_FILE, 'utf8'));
    return { calls: Array.isArray(s.calls) ? s.calls : [], lastDoneAt: s.lastDoneAt || 0, throttledUntil: s.throttledUntil || 0, token: s.token || null, lastThrottle: s.lastThrottle || null };
  } catch {
    return { calls: [], lastDoneAt: 0, throttledUntil: 0, token: null, lastThrottle: null };
  }
}

function writeState(state) {
  try {
    mkdirSync(path.dirname(STATE_FILE), { recursive: true });
    writeFileSync(STATE_FILE, JSON.stringify(state));
  } catch {
    // The guard is best effort: failing to save state must not break a run.
  }
}

const prune = (state, now = Date.now()) => {
  state.calls = state.calls.filter((t) => now - t < DAY_MS);
  return state;
};

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

/** Calls used in the last 24 hours, the cap, and any cooling-off in force. */
export function apiUsage() {
  const state = prune(readState());
  const cap = dailyCap();
  return {
    usedLast24h: state.calls.length,
    cap,
    remaining: Math.max(0, cap - state.calls.length),
    minIntervalMs: minIntervalMs(),
    throttledUntil: state.throttledUntil > Date.now() ? new Date(state.throttledUntil).toISOString() : null,
    lastThrottle: state.lastThrottle,
  };
}

/** Allowance-related response headers from the most recent call, if any. */
export let lastRateHeaders = {};

/** How many calls a pass over `count` products needs (10 products per call). */
export const callsNeeded = (count) => Math.ceil(count / 10);

/**
 * The one place a request leaves for the catalog API. Paces, counts, and stops
 * dead on a 429. `op` is the operation path segment, e.g. "getItems".
 */
async function apiCall(op, body) {
  let state = prune(readState());
  const now = Date.now();
  if (state.throttledUntil > now) {
    throw new RateLimitError(`cooling off after a throttle; no calls until ${new Date(state.throttledUntil).toISOString()}`, state.throttledUntil);
  }
  const cap = dailyCap();
  if (state.calls.length >= cap) {
    throw new BudgetError(`daily cap reached: ${state.calls.length} calls in the last 24 hours (cap ${cap}). Raise AMAZON_API_DAILY_CAP only if Amazon's allowance is known to be higher.`);
  }

  // Pace against the most recent call, including one made by an earlier run:
  // from when it finished if known, otherwise from when it started.
  const last = Math.max(state.lastDoneAt || 0, state.calls.length ? Math.max(...state.calls) : 0);
  const wait = last + minIntervalMs() - Date.now();
  if (wait > 0) await sleep(wait);

  const token = await getAccessToken();

  // Count the call before sending it, so a crash cannot hide usage.
  state = prune(readState());
  state.calls.push(Date.now());
  writeState(state);

  const r = await fetch(`${API_BASE}/catalog/v1/${op}`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
      'x-marketplace': MARKETPLACE,
      'User-Agent': agentUserAgent(),
    },
    body: JSON.stringify({ marketplace: MARKETPLACE, partnerTag: process.env.AMAZON_PARTNER_TAG, ...body }),
  });
  const text = await r.text();
  state = prune(readState());
  state.lastDoneAt = Date.now();
  writeState(state);

  // Keep any allowance-related response headers from the latest call, in case
  // Amazon reports the limit there (it does not publish the current figure).
  lastRateHeaders = {};
  r.headers.forEach((value, name) => {
    if (/rate|limit|quota|throttl|retry/i.test(name)) lastRateHeaders[name] = value;
  });

  if (r.status === 429) {
    const retryAfter = Number(r.headers.get('retry-after'));
    const until = Date.now() + Math.max(COOL_OFF_MS, Number.isFinite(retryAfter) ? retryAfter * 1000 : 0);
    state = prune(readState());
    state.throttledUntil = until;
    state.lastThrottle = { at: new Date().toISOString(), op, callsInLast24h: state.calls.length, message: text.slice(0, 200) };
    writeState(state);
    throw new RateLimitError(`${op} 429 TooManyRequests after ${state.calls.length} calls in 24 hours; stopping until ${new Date(until).toISOString()}`, until);
  }
  if (!r.ok) throw new Error(`${op} ${r.status}: ${text.slice(0, 300)}`);
  return JSON.parse(text);
}

// ---------------------------------------------------------------------------
// Auth
// ---------------------------------------------------------------------------

let cached = null; // { token, expiresAt }

export async function getAccessToken() {
  if (cached && Date.now() < cached.expiresAt - 60_000) return cached.token;

  const id = process.env.AMAZON_CREATORS_CLIENT_ID;
  const secret = process.env.AMAZON_CREATORS_CLIENT_SECRET;
  const version = process.env.AMAZON_CREATORS_VERSION || '3.1';
  if (!id || !secret) {
    throw new Error('AMAZON_CREATORS_CLIENT_ID / AMAZON_CREATORS_CLIENT_SECRET missing from .env.all');
  }

  // Reuse a token saved by an earlier run while it is still valid. Tokens last
  // an hour; the file is gitignored and holds nothing longer-lived than that.
  const state = readState();
  if (state.token && state.token.clientIdTail === id.slice(-6) && Date.now() < state.token.expiresAt - 60_000) {
    cached = { token: state.token.value, expiresAt: state.token.expiresAt };
    return cached.token;
  }

  const host = TOKEN_HOST[version];
  if (!host) throw new Error(`unknown credential version ${version} (expected 3.1, 3.2 or 3.3)`);

  const r = await fetch(`${host}/auth/o2/token`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'User-Agent': agentUserAgent() },
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
  const fresh = readState();
  fresh.token = { value: cached.token, expiresAt: cached.expiresAt, clientIdTail: id.slice(-6) };
  writeState(fresh);
  return cached.token;
}

// ---------------------------------------------------------------------------
// Operations
// ---------------------------------------------------------------------------

// customerReviews.* is accepted but returns nothing for this account (checked
// 2026-11-11), so it is not requested by default.
export const DEFAULT_RESOURCES = [
  'itemInfo.title',
  'offersV2.listings.price',
  'images.primary.large',
  'parentASIN',
];

/**
 * Fetch up to 10 ASINs in one call (the documented GetItems batch limit).
 * Returns the raw `itemsResult.items` array plus any per-item errors.
 */
export async function getItems(asins, resources = DEFAULT_RESOURCES) {
  if (!asins.length) return { items: [], errors: [] };
  if (asins.length > 10) throw new Error('getItems accepts at most 10 ASINs per call');
  const j = await apiCall('getItems', { itemIds: asins, itemIdType: 'ASIN', resources });
  return { items: j.itemsResult?.items ?? [], errors: j.errors ?? [] };
}

/** Keyword search. One call, up to 10 results. */
export async function searchItems(keywords, { itemCount = 5, resources = ['itemInfo.title', 'itemInfo.byLineInfo', 'offersV2.listings.price'] } = {}) {
  const j = await apiCall('searchItems', { keywords, itemCount: Math.min(10, itemCount), resources });
  return { items: j.searchResult?.items ?? [], total: j.searchResult?.totalResultCount ?? 0, errors: j.errors ?? [] };
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

/**
 * Fetch any number of ASINs, 10 per call. Pacing and the daily cap are enforced
 * centrally, so `delayMs` is accepted for older callers but no longer needed.
 * If Amazon throttles or the cap is reached, the pass STOPS and returns what it
 * has, with `stopped` saying why and `remaining` listing the ASINs not fetched.
 */
export async function getAllItems(asins, { resources = DEFAULT_RESOURCES, onBatch } = {}) {
  const out = new Map();
  const failures = [];
  const unique = [...new Set(asins)];
  let stopped = null;
  let done = 0;
  for (let i = 0; i < unique.length; i += 10) {
    const batch = unique.slice(i, i + 10);
    try {
      const { items, errors } = await getItems(batch, resources);
      for (const it of items) out.set(it.asin, normalize(it));
      for (const e of errors) failures.push({ batch, error: e?.code || e?.message || String(e) });
    } catch (e) {
      if (e instanceof RateLimitError || e instanceof BudgetError) {
        stopped = `${e.name}: ${e.message}`;
        break;
      }
      failures.push({ batch, error: String(e.message || e).slice(0, 160) });
    }
    done = Math.min(i + 10, unique.length);
    onBatch?.(done, unique.length);
  }
  return { data: out, failures, stopped, remaining: unique.slice(done) };
}
