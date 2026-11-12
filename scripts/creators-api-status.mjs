// Shows how much of the Amazon Creators API allowance this project has used.
//
//   node scripts/creators-api-status.mjs           usage only, sends nothing
//   node scripts/creators-api-status.mjs 540       also: can a pass over 540 products run now?
//   node scripts/creators-api-status.mjs --ping    one real call (1 product) to confirm access
//
// Run this before any job that calls the API. The limits and the guard are
// described at the top of scripts/lib/creators-api.mjs.
import { loadEnv, apiUsage, callsNeeded, getItems, lastRateHeaders, RateLimitError, BudgetError } from './lib/creators-api.mjs';

loadEnv();
const args = process.argv.slice(2);
const count = Number(args.find((a) => /^\d+$/.test(a)) || 0);

const show = () => {
  const u = apiUsage();
  console.log(`calls in the last 24 hours: ${u.usedLast24h} of a self-imposed cap of ${u.cap} (${u.remaining} left)`);
  console.log(`pacing: one call every ${u.minIntervalMs} ms at most`);
  if (u.throttledUntil) console.log(`COOLING OFF after a throttle: no calls until ${u.throttledUntil}`);
  if (u.lastThrottle) console.log(`last throttle: ${u.lastThrottle.at} on ${u.lastThrottle.op} after ${u.lastThrottle.callsInLast24h} calls`);
  return u;
};

const u = show();
if (count) {
  const need = callsNeeded(count);
  const secs = Math.ceil((need * u.minIntervalMs) / 1000);
  console.log(`a pass over ${count} products needs ${need} calls and about ${secs} seconds`);
  console.log(u.throttledUntil ? 'NOT NOW: cooling off' : need <= u.remaining ? 'OK to run now' : `NOT NOW: ${need - u.remaining} calls over what is left today`);
}

if (args.includes('--ping')) {
  try {
    const { items, errors } = await getItems(['B004QF0TFQ'], ['itemInfo.title']);
    console.log(`ping: ${items.length ? 'OK, product data returned' : 'no item returned'}${errors.length ? ' errors ' + JSON.stringify(errors).slice(0, 200) : ''}`);
    const names = Object.keys(lastRateHeaders);
    console.log(names.length ? 'allowance headers from Amazon: ' + JSON.stringify(lastRateHeaders) : 'Amazon sent no allowance headers with the response');
  } catch (e) {
    const kind = e instanceof RateLimitError ? 'THROTTLED' : e instanceof BudgetError ? 'CAP REACHED' : 'FAILED';
    console.log(`ping ${kind}: ${String(e.message).slice(0, 300)}`);
  }
  show();
}
