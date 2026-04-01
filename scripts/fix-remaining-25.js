const { Redis } = require('@upstash/redis');
const https = require('https');

const redis = new Redis({
  url: 'https://social-slug-73085.upstash.io',
  token: process.env.UPSTASH_REDIS_REST_TOKEN,
});

const GOOGLE_AI_API_KEY = process.env.GOOGLE_AI_API_KEY;

const fixes = {
  'B000CBSNRY': 'MAGNA-TILES Classic 100-Piece Magnetic Construction Set',
  'B072B9V2KB': 'Loog Mini Acoustic Guitar for Kids — 3-String, Ages 3+',
  'B082KFTF41': 'KOKODI LCD Writing Tablet — 10 Inch Colorful Doodle Board for Kids',
  'B0CYT85XT6': 'Play-Act Montessori Learning Farm Train — Counting, Matching & Sorting Toy for Toddlers',
  'B0CSDSYR5K': 'Baby Musical Instruments Set — Montessori Wooden Percussion Toys for Toddlers 1-3',
  'B0F3XF1SH8': "Joyreal Wooden Noah's Ark Toy — Montessori Animal Shape Sorter, Baptism Gift",
  'B0DHPT6ZXK': 'Montessori Mama USA Map Wooden Puzzle for Kids Ages 4-6',
  'B0BWDWNH5G': 'Instant Print Camera for Kids — Portable Toy Camera with 32GB SD Card',
  'B0FBBV27FC': 'Preston Lane Mayfair Decorative Tray — Vegan Leather, Brushed Brass Handles, Espresso',
  'B0865LF8BY': 'Modern Wedge Marble Bookends — Light Green Onyx',
  'B002WJI54U': 'Berard Olive Wood Handcrafted Utensil Canister',
  'B0CSLHL3MG': 'Tov Furniture Positano Black Striped Papier Mache Table Lamp',
  'B0BYJSZ3TH': 'Black Shagreen Faux Leather Decorative Boxes with Lids — Set of 3',
  'B09C154HVX': 'WallBeyond Asymmetrical Wood Wall Mirror — 30" H x 19" W, Mid-Century Modern',
  'B09BDL522H': 'Philips Hue Signe Smart Table Lamp — White & Color Ambiance, Alexa Compatible',
  'B0CN6NDMQ5': '5-Candle Cast Iron Candelabra Candlestick Holder — 15 inch, Brass Gold',
  'B0CMVBLH36': 'Cloudnola Reversible Glass Flower Vase Set of 2 — Pink & Blue, Green & Yellow',
  'B09WMPDVZX': 'kitCom Crystal Flower Vase — 8.27 inch Lead-Free European Crystal, Home Decor',
  'B09P2YTJF6': 'Music Note Sculpture Treble Clef Figurine — 23 inch Polyresin Art Decor',
  'B005IDC31S': 'Bulova Usonian II Frank Lloyd Wright Mantel Clock',
  'B0CD15C641': 'Meta Quest Elite Strap — Works with Meta Quest 3/3S, Ergonomic Adjustable Fit',
  'B0FTQ5RJM7': 'Xbox Wireless Gaming Controller — Fallout Pip-Boy Edition',
  'B0DB6S6R89': 'Razer Wolverine V3 Pro Wireless Gaming Controller for Xbox Series X|S and PC',
  'B0CYWFH5Y9': 'Turtle Beach Stealth 600 Wireless Gaming Headset — Xbox, PC, PS5, PS4, Mobile',
  'B09NBWL8J5': 'Logitech G PRO X Superlight 2 Wireless Gaming Mouse — 60g, 44k DPI, USB-C',
};

function generateImage(name) {
  return new Promise((resolve, reject) => {
    const prompt = `Professional product photo of "${name}" on a clean white background. Editorial style, soft studio lighting, sharp focus, high quality commercial photography. No text overlays.`;
    const body = JSON.stringify({
      contents: [{ parts: [{ text: prompt }] }],
      generationConfig: { responseModalities: ['TEXT', 'IMAGE'] },
    });
    const req = https.request({
      hostname: 'generativelanguage.googleapis.com',
      path: `/v1beta/models/gemini-3-pro-image-preview:generateContent?key=${GOOGLE_AI_API_KEY}`,
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Content-Length': Buffer.byteLength(body) },
    }, res => {
      const chunks = [];
      res.on('data', c => chunks.push(c));
      res.on('end', () => {
        try {
          const data = JSON.parse(Buffer.concat(chunks).toString());
          const parts = data?.candidates?.[0]?.content?.parts ?? [];
          const imgPart = parts.find(p => p.inlineData?.data);
          if (imgPart) resolve(`data:${imgPart.inlineData.mimeType || 'image/png'};base64,${imgPart.inlineData.data}`);
          else reject(new Error('No image: ' + JSON.stringify(data).slice(0, 150)));
        } catch (e) { reject(e); }
      });
    });
    req.on('error', reject);
    req.write(body);
    req.end();
  });
}

async function run() {
  const products = await redis.get('admin:products');
  let updated = [...products];
  let fixedNames = 0, fixedImages = 0;

  const asins = Object.keys(fixes);
  for (let i = 0; i < asins.length; i++) {
    const asin = asins[i];
    const newName = fixes[asin];
    const idx = updated.findIndex(p => {
      const pAsin = p.asin || p.affiliateUrl?.match(/\/dp\/([A-Z0-9]{10})/)?.[1];
      return pAsin === asin;
    });
    if (idx === -1) { console.log(`⚠️  ${asin} not found`); continue; }

    console.log(`\n[${i+1}/${asins.length}] ${newName}`);
    updated[idx] = { ...updated[idx], name: newName };
    fixedNames++;

    try {
      const dataUrl = await generateImage(newName);
      updated[idx] = { ...updated[idx], image: dataUrl, updatedAt: new Date().toISOString() };
      console.log(`  ✅ Name + image`);
      fixedImages++;
    } catch (err) {
      console.log(`  ⚠️  Name fixed, image failed: ${err.message.slice(0,80)}`);
      updated[idx] = { ...updated[idx], updatedAt: new Date().toISOString() };
    }

    // Save progress every 5 products so we don't lose work if interrupted
    if ((i + 1) % 5 === 0) {
      await redis.set('admin:products', updated);
      console.log(`  💾 Progress saved (${i+1}/${asins.length})`);
    }

    await new Promise(r => setTimeout(r, 800));
  }

  await redis.set('admin:products', updated);
  console.log(`\n✅ Done — ${fixedNames} names fixed, ${fixedImages} images generated.`);
}

run().catch(console.error);
