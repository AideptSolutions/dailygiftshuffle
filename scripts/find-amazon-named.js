const { Redis } = require('@upstash/redis');
const redis = new Redis({
  url: 'https://social-slug-73085.upstash.io',
  token: process.env.UPSTASH_REDIS_REST_TOKEN,
});

async function run() {
  const products = await redis.get('admin:products');
  const bad = products.filter(p =>
    p.name?.toLowerCase().includes('amazon') ||
    p.name?.toLowerCase().includes('amazon.com') ||
    p.name?.length < 5
  );
  console.log(`Found ${bad.length} bad products:\n`);
  bad.forEach((p, i) => {
    console.log(`${i+1}. ID: ${p.id}`);
    console.log(`   Name: "${p.name}"`);
    console.log(`   URL: ${p.affiliateUrl}`);
    console.log(`   Tags: ${p.tags?.join(', ')}`);
    console.log(`   Status: ${p.status}`);
    console.log();
  });
}
run().catch(console.error);
