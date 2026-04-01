const { Redis } = require('@upstash/redis');
const redis = new Redis({ url: 'https://social-slug-73085.upstash.io', token: process.env.UPSTASH_REDIS_REST_TOKEN });

const fixes = {
  'B000CBSNRY': 'MAGNA-TILES Classic 100-Piece Magnetic Construction Set',
  'B072B9V2KB': 'Loog Mini Acoustic Guitar for Kids — 3-String, Ages 3+',
  'B082KFTF41': 'KOKODI LCD Writing Tablet — 10 Inch Colorful Doodle Board for Kids',
  'B0CYT85XT6': 'Play-Act Montessori Learning Farm Train — Counting, Matching & Sorting Toy for Toddlers',
  'B0CSDSYR5K': 'Baby Musical Instruments Set — Montessori Wooden Percussion Toys for Toddlers 1-3',
  'B0F3XF1SH8': "Joyreal Wooden Noah's Ark Toy — Montessori Animal Shape Sorter, Baptism Gift",
  'B0DHPT6ZXK': 'Montessori Mama USA Map Wooden Puzzle for Kids Ages 4-6',
  'B0BWDWNH5G': 'Instant Print Camera for Kids — Portable Toy Camera with 32GB SD Card',
  'B0FBBV27FC': 'Preston Lane Mayfair Decorative Tray — Vegan Leather, Brushed Brass Handles',
  'B0865LF8BY': 'Modern Wedge Marble Bookends — Light Green Onyx',
  'B002WJI54U': 'Berard Olive Wood Handcrafted Utensil Canister',
  'B0CSLHL3MG': 'Tov Furniture Positano Striped Papier Mache Table Lamp',
  'B0BYJSZ3TH': 'Black Shagreen Faux Leather Decorative Boxes with Lids — Set of 3',
  'B09C154HVX': 'WallBeyond Asymmetrical Wood Wall Mirror — 30" H x 19" W, Mid-Century Modern',
  'B09BDL522H': 'Philips Hue Signe Smart Table Lamp — White & Color Ambiance, Alexa Compatible',
  'B0CN6NDMQ5': '5-Candle Cast Iron Candelabra Candlestick Holder — 15 inch, Brass Gold',
  'B0CMVBLH36': 'Cloudnola Reversible Glass Flower Vase Set of 2',
  'B09WMPDVZX': 'kitCom Crystal Flower Vase — 8.27 inch Lead-Free European Crystal',
  'B09P2YTJF6': 'Music Note Treble Clef Figurine — 23 inch Polyresin Art Decor',
  'B005IDC31S': 'Bulova Usonian II Frank Lloyd Wright Mantel Clock',
  'B0CD15C641': 'Meta Quest Elite Strap — Works with Meta Quest 3/3S, Ergonomic Adjustable Fit',
  'B0FTQ5RJM7': 'Xbox Wireless Gaming Controller — Fallout Pip-Boy Edition',
  'B0DB6S6R89': 'Razer Wolverine V3 Pro Wireless Gaming Controller for Xbox Series X|S and PC',
  'B0CYWFH5Y9': 'Turtle Beach Stealth 600 Wireless Gaming Headset — Xbox, PC, PS5, PS4, Mobile',
  'B09NBWL8J5': 'Logitech G PRO X Superlight 2 Wireless Gaming Mouse — 60g, 44k DPI, USB-C',
};

async function run() {
  // Strip all base64 image data to reduce payload size, then patch names
  const products = await redis.get('admin:products');
  let fixed = 0;
  const updated = products.map(p => {
    const asin = p.asin || p.affiliateUrl?.match(/\/dp\/([A-Z0-9]{10})/)?.[1];
    // Strip oversized base64 data URLs from all products to keep Redis payload manageable
    const stripped = p.image?.startsWith('data:') ? { ...p, image: '' } : p;
    if (asin && fixes[asin]) {
      console.log(`Fixed: ${asin} → ${fixes[asin]}`);
      fixed++;
      return { ...stripped, name: fixes[asin] };
    }
    return stripped;
  });
  await redis.set('admin:products', updated);
  console.log(`\n✅ ${fixed} names fixed. Base64 images stripped to reduce payload.`);
}
run().catch(console.error);
