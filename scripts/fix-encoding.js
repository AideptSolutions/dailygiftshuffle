const { Redis } = require('@upstash/redis');

const redis = new Redis({
  url: 'https://social-slug-73085.upstash.io',
  token: process.env.UPSTASH_REDIS_REST_TOKEN,
});

function fixEncoding(str) {
  if (!str || typeof str !== 'string') return str;
  return str
    .replace(/â€"/g, '—')
    .replace(/â€˜/g, '\u2018')  // left single quote
    .replace(/â€™/g, '\u2019')  // right single quote / apostrophe
    .replace(/â€œ/g, '\u201C')  // left double quote
    .replace(/â€/g, '\u201D')   // right double quote
    .replace(/â€¦/g, '…')       // ellipsis
    .replace(/â€¢/g, '•')       // bullet
    .replace(/Â®/g, '®')
    .replace(/Â©/g, '©')
    .replace(/Â™/g, '™')
    .replace(/Ã©/g, 'é')
    .replace(/â‚¬/g, '€');
}

async function run() {
  const products = await redis.get('admin:products');
  if (!products || !Array.isArray(products)) {
    console.log('No products found at admin:products');
    return;
  }
  console.log(`Found ${products.length} products`);

  let fixed = 0;
  const patched = products.map(p => {
    const fixedName = fixEncoding(p.name);
    const fixedDesc = fixEncoding(p.description);
    if (fixedName !== p.name || fixedDesc !== p.description) {
      console.log(`Fixed: "${p.name}" → "${fixedName}"`);
      fixed++;
      return { ...p, name: fixedName, description: fixedDesc };
    }
    return p;
  });

  if (fixed > 0) {
    await redis.set('admin:products', patched);
    console.log(`\n✅ Fixed ${fixed} products and saved to Redis.`);
  } else {
    console.log('\nNo encoding issues found.');
  }
}

run().catch(console.error);
