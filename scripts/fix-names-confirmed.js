const { Redis } = require('@upstash/redis');
const redis = new Redis({
  url: 'https://social-slug-73085.upstash.io',
  token: process.env.UPSTASH_REDIS_REST_TOKEN,
});

const fixes = {
  'B0DR9Q4HJG': 'Stanley IceFlow 2.0 Flip Straw Tumbler with Handle 30 oz',
  'B07S1BNNYD': 'HAPPY NUTS Comfort Cream Deodorant For Men — Anti-Chafing, Aluminum-Free, 3.4 oz',
  'B00V5Y9P5G': 'Lincoln Logs Collector\'s Edition Village Set — 327 Real Wood Pieces, Ages 3+',
  'B00006JZCG': 'Melissa & Doug Pattern Blocks and Boards — 120 Multi-Colored Wooden Shapes, 5 Puzzle Boards',
  'B0FBC31SFR': 'Wooden Playing Card & Dice Set with Velvet Lining — Luxury Game Box',
  'B0FN5NY3TB': 'Blueair Mini Restful Air Purifier and Sunrise Alarm Clock',
  'B09BDLV9BV': 'Philips Hue Signe Smart Color Changing Floor Lamp — White & Color Ambiance, Alexa Compatible',
  'B0B9T2LW6R': 'Philips Hue Go Smart Portable Table Lamp — White & Color Ambiance, Indoor/Outdoor',
  'B09MJR9T2P': 'Meta Quest Compact Charging Dock — Works with Meta Quest 3/3S, Wireless Controller Charging',
  'B08SBYHYJV': 'Mini Massage Gun — Portable Deep Tissue Percussion Muscle Massager for Pain Relief',
};

async function run() {
  const products = await redis.get('admin:products');
  let fixed = 0;
  const updated = products.map(p => {
    const asin = p.asin || (p.affiliateUrl?.match(/\/dp\/([A-Z0-9]{10})/)?.[1]);
    if (asin && fixes[asin]) {
      console.log(`Fixed: "${p.name}" → "${fixes[asin]}"`);
      fixed++;
      return { ...p, name: fixes[asin] };
    }
    return p;
  });
  if (fixed > 0) {
    await redis.set('admin:products', updated);
    console.log(`\n✅ Fixed ${fixed} products.`);
  } else {
    console.log('No matches found — check ASINs.');
  }
}
run().catch(console.error);
