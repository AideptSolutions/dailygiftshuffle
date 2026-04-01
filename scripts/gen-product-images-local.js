const { Redis } = require('@upstash/redis');
const https = require('https');
const fs = require('fs');
const path = require('path');

const redis = new Redis({ url: 'https://social-slug-73085.upstash.io', token: process.env.UPSTASH_REDIS_REST_TOKEN });
const GOOGLE_AI_API_KEY = process.env.GOOGLE_AI_API_KEY;
const OUT_DIR = path.join(__dirname, '..', 'public', 'img', 'products');

// All ASINs needing images
const TARGET_ASINS = [
  'B000CBSNRY','B072B9V2KB','B082KFTF41','B0CYT85XT6','B0CSDSYR5K',
  'B0F3XF1SH8','B0DHPT6ZXK','B0BWDWNH5G','B0FBBV27FC','B0865LF8BY',
  'B002WJI54U','B0CSLHL3MG','B0BYJSZ3TH','B09C154HVX','B09BDL522H',
  'B0CN6NDMQ5','B0CMVBLH36','B09WMPDVZX','B09P2YTJF6','B005IDC31S',
  'B0CD15C641','B0FTQ5RJM7','B0DB6S6R89','B0CYWFH5Y9','B09NBWL8J5',
  'B0DR9Q4HJG','B07S1BNNYD','B00V5Y9P5G','B00006JZCG','B0FBC31SFR',
  'B0FN5NY3TB','B09BDLV9BV','B0B9T2LW6R','B09MJR9T2P','B08SBYHYJV',
];

function generateImage(name) {
  return new Promise((resolve, reject) => {
    const prompt = `Product photo: ${name}. Clean white background, soft studio lighting, editorial commercial photography style.`;
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
          if (imgPart) resolve(Buffer.from(imgPart.inlineData.data, 'base64'));
          else reject(new Error('No image in response'));
        } catch (e) { reject(e); }
      });
    });
    req.on('error', reject);
    req.write(body);
    req.end();
  });
}

async function run() {
  fs.mkdirSync(OUT_DIR, { recursive: true });
  const products = await redis.get('admin:products');
  const updates = {}; // id -> new image path

  for (let i = 0; i < TARGET_ASINS.length; i++) {
    const asin = TARGET_ASINS[i];
    const product = products.find(p => {
      const pa = p.asin || p.affiliateUrl?.match(/\/dp\/([A-Z0-9]{10})/)?.[1];
      return pa === asin;
    });
    if (!product) { console.log(`[${i+1}] ⚠️  ${asin} not found`); continue; }

    const filename = `${product.id}.jpg`;
    const filepath = path.join(OUT_DIR, filename);
    const imgUrl = `/img/products/${filename}`;

    // Skip if already generated
    if (fs.existsSync(filepath)) {
      console.log(`[${i+1}/${TARGET_ASINS.length}] ⏩ Already exists: ${product.name.slice(0,50)}`);
      updates[product.id] = imgUrl;
      continue;
    }

    console.log(`[${i+1}/${TARGET_ASINS.length}] Generating: ${product.name.slice(0,60)}`);
    try {
      const buffer = await generateImage(product.name);
      fs.writeFileSync(filepath, buffer);
      updates[product.id] = imgUrl;
      console.log(`  ✅ Saved: ${filename}`);
    } catch (err) {
      console.log(`  ❌ Failed: ${err.message.slice(0,60)}`);
    }

    await new Promise(r => setTimeout(r, 600));
  }

  // Update Redis — replace data URLs with file paths, no bloat
  const updatedProducts = products.map(p => {
    const newPath = updates[p.id];
    if (newPath) return { ...p, image: newPath, updatedAt: new Date().toISOString() };
    // Strip leftover data URLs (too big for Redis)
    if (p.image?.startsWith('data:')) return { ...p, image: '' };
    return p;
  });

  await redis.set('admin:products', updatedProducts);
  console.log(`\n✅ Done. ${Object.keys(updates).length} images generated. Run: git add -A && git commit && vercel --prod`);
}

run().catch(console.error);
