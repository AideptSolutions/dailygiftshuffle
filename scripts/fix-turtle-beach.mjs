import { readFileSync } from 'fs';
const envText = readFileSync('C:/Users/allan/projects/dailygiftshuffle/.env.local', 'utf8');
for (const line of envText.split('\n')) { const m = line.match(/^([^#=]+)=(.*)$/); if (m) process.env[m[1].trim()] = m[2].replace(/^"|"$/g,'').trim(); }
const REDIS_URL = process.env.UPSTASH_REDIS_REST_URL;
const REDIS_TOKEN = process.env.UPSTASH_REDIS_REST_TOKEN;
async function redisCmd(...args) {
  const res = await fetch(REDIS_URL, { method:'POST', headers:{ Authorization:'Bearer '+REDIS_TOKEN,'Content-Type':'application/json'}, body:JSON.stringify(args)});
  return (await res.json()).result;
}
const parsed = JSON.parse(await redisCmd('GET', 'admin:products'));
const idx = parsed.findIndex(p => p.id === 'admin-1773608696241-81xgn');
parsed[idx].price = 99.99;
parsed[idx].priceDisplay = '$99.99';
parsed[idx].rating = 4.4;
parsed[idx].reviewCount = 6100;
parsed[idx].image = '/images/products/admin-1773608696241-81xgn.jpg';
parsed[idx].updatedAt = new Date().toISOString();
await redisCmd('SET', 'admin:products', JSON.stringify(parsed));
const verify = JSON.parse(await redisCmd('GET', 'admin:products'));
const bad = verify.filter(p => p.name && p.name !== 'New Product' && (!p.price || p.price === 0));
console.log('Remaining at $0:', bad.length, '-- should be 0');
console.log('Turtle Beach fixed: $99.99, 4.4 stars, 6100 reviews');
