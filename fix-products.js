const https = require('https');

const UPSTASH_URL = 'https://social-slug-73085.upstash.io';
const UPSTASH_TOKEN = 'gQAAAAAAAR19AAIncDFjYmM1MjBkYTJhODA0N2E2YTBkZTc4MDJiNzlkYmU1YnAxNzMwODU';

function upstashGet() {
  return new Promise((resolve, reject) => {
    const body = JSON.stringify([['GET', 'admin:products']]);
    const req = https.request(new URL('/pipeline', UPSTASH_URL), {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${UPSTASH_TOKEN}`, 'Content-Type': 'application/json' }
    }, (res) => {
      let data = ''; res.on('data', d => data += d);
      res.on('end', () => resolve(JSON.parse(data)));
    });
    req.on('error', reject); req.write(body); req.end();
  });
}

function upstashSet(value) {
  return new Promise((resolve, reject) => {
    const body = JSON.stringify([['SET', 'admin:products', value]]);
    const req = https.request(new URL('/pipeline', UPSTASH_URL), {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${UPSTASH_TOKEN}`, 'Content-Type': 'application/json' }
    }, (res) => {
      let data = ''; res.on('data', d => data += d);
      res.on('end', () => resolve(JSON.parse(data)));
    });
    req.on('error', reject); req.write(body); req.end();
  });
}

// Decode HTML entities
function decodeHtml(str) {
  return str
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#x27;/g, "'")
    .replace(/&#39;/g, "'")
    .replace(/&apos;/g, "'")
    .replace(/&#x2F;/g, '/')
    .replace(/&#x60;/g, '`')
    .replace(/&#x3D;/g, '=')
    .replace(/&#\d+;/g, match => String.fromCharCode(parseInt(match.slice(2, -1))));
}

// Clean Amazon page title to just the product name
function cleanAmazonTitle(name) {
  if (!name) return name;
  // Remove "Amazon.com: " or "Amazon.com : " prefix
  let cleaned = name.replace(/^Amazon\.com\s*:\s*/i, '');
  // Remove trailing " : Category > Sub" style suffix (last " : Something" block)
  // Find the last occurrence of " : " or " :" that precedes known category patterns
  const categoryPatterns = /\s*:\s*(Sports\s*&|Toys\s*&|Home\s*&|Electronics|Video Games|Everything Else|Grocery|Health|Beauty|Clothing|Kitchen|Books|Music|Movies|Tools|Garden|Baby|Pet|Office|Automotive|Industrial).*/i;
  cleaned = cleaned.replace(categoryPatterns, '');
  // Also strip " : Home & Kitchen", " : Electronics" at the end more broadly
  cleaned = cleaned.replace(/\s*:\s*[^:]{0,40}(Kitchen|Electronics|Outdoors|Games|Else|Grocery|Food)\s*$/, '');
  // Decode HTML entities
  cleaned = decodeHtml(cleaned);
  // Trim
  return cleaned.trim();
}

// Try to fetch Amazon product title
function fetchAmazonTitle(asin) {
  return new Promise((resolve) => {
    const url = `https://www.amazon.com/dp/${asin}`;
    const options = {
      hostname: 'www.amazon.com',
      path: `/dp/${asin}`,
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml',
        'Accept-Language': 'en-US,en;q=0.9',
        'Accept-Encoding': 'identity',
        'Cache-Control': 'no-cache',
      },
      timeout: 8000,
    };
    const req = https.get(options, (res) => {
      let data = '';
      res.on('data', d => data += d);
      res.on('end', () => {
        // Extract product title from <title> tag
        const titleMatch = data.match(/<title[^>]*>([^<]+)<\/title>/i);
        if (!titleMatch) { resolve(null); return; }
        const pageTitle = decodeHtml(titleMatch[1].trim());
        // Amazon title format: "Product Name : Amazon.com" or "Amazon.com: Product Name"
        // Filter out robot check / sign-in pages
        if (pageTitle.includes('Robot Check') || pageTitle.includes('Sign in') || pageTitle.includes('Sorry')) {
          resolve(null); return;
        }
        let cleaned = pageTitle
          .replace(/\s*:\s*Amazon\.com.*$/i, '')
          .replace(/^Amazon\.com\s*:\s*/i, '')
          .replace(/\s*\|\s*Amazon\.com.*$/i, '')
          .trim();
        resolve(cleaned || null);
      });
    });
    req.on('error', () => resolve(null));
    req.on('timeout', () => { req.destroy(); resolve(null); });
  });
}

function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }

async function main() {
  const result = await upstashGet();
  const products = JSON.parse(result[0]?.result || '[]');
  let fixed = 0;

  for (const p of products) {
    let newName = p.name;

    // Fix full Amazon page titles (has "Amazon.com:" prefix or HTML entities)
    if (p.name && (p.name.startsWith('Amazon.com') || p.name.includes('&amp;') || p.name.includes('&#'))) {
      newName = cleanAmazonTitle(p.name);
      if (newName !== p.name) {
        console.log(`[CLEAN] ${p.id}: "${p.name.substring(0,60)}" → "${newName.substring(0,60)}"`);
        p.name = newName;
        fixed++;
      }
    }

    // Try to fetch real name for placeholder products
    if (/^Product [A-Z0-9]{10}$/.test(p.name) || p.name === 'New Product') {
      if (p.asin && p.asin !== 'none') {
        process.stdout.write(`[FETCH] ${p.asin} ... `);
        const fetched = await fetchAmazonTitle(p.asin);
        if (fetched && fetched.length > 5 && !fetched.includes('Product')) {
          console.log(`"${fetched.substring(0, 60)}"`);
          p.name = fetched;
          fixed++;
        } else {
          console.log(`failed (${fetched || 'null'})`);
        }
        await sleep(1500); // polite delay
      }
    }
  }

  console.log(`\n${fixed} names fixed out of ${products.length} products.`);

  if (fixed > 0) {
    const setResult = await upstashSet(JSON.stringify(products));
    console.log('Redis write:', setResult[0]?.result);
  }
}

main().catch(console.error);
