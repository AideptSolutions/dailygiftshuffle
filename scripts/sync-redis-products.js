/**
 * sync-redis-products.js
 * Syncs admin-products.json to Redis (overwrites admin:products key)
 */
const https = require('https');
const fs = require('fs');
const path = require('path');

const UPSTASH_URL = process.env.UPSTASH_REDIS_REST_URL;
const UPSTASH_TOKEN = process.env.UPSTASH_REDIS_REST_TOKEN;
const PRODUCTS_FILE = path.join(__dirname, '../data/admin-products.json');

if (!UPSTASH_URL || !UPSTASH_TOKEN) {
  console.error('Missing UPSTASH_REDIS_REST_URL or UPSTASH_REDIS_REST_TOKEN');
  process.exit(1);
}

const products = JSON.parse(fs.readFileSync(PRODUCTS_FILE, 'utf8'));
console.log(`Syncing ${products.length} products to Redis...`);

// Use Upstash REST API: SET admin:products <json>
const payload = JSON.stringify(['SET', 'admin:products', JSON.stringify(products)]);

const url = new URL(UPSTASH_URL);
const req = https.request({
  hostname: url.hostname,
  path: '/',
  method: 'POST',
  headers: {
    'Authorization': `Bearer ${UPSTASH_TOKEN}`,
    'Content-Type': 'application/json',
    'Content-Length': Buffer.byteLength(payload),
  }
}, (res) => {
  let data = '';
  res.on('data', c => data += c);
  res.on('end', () => {
    const result = JSON.parse(data);
    if (result.result === 'OK') {
      console.log(`✅ Synced ${products.length} products to Redis`);
      const withImages = products.filter(p => p.image && !p.image.includes('categories')).length;
      console.log(`   ${withImages} products have real image URLs`);
    } else {
      console.error('❌ Redis error:', JSON.stringify(result));
    }
  });
});
req.on('error', e => console.error('Request error:', e));
req.write(payload);
req.end();
