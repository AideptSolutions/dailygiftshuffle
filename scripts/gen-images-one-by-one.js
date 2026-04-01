const { Redis } = require('@upstash/redis');
const https = require('https');

const redis = new Redis({ url: 'https://social-slug-73085.upstash.io', token: process.env.UPSTASH_REDIS_REST_TOKEN });
const GOOGLE_AI_API_KEY = process.env.GOOGLE_AI_API_KEY;

// Products that need images (no image or empty)
const TARGET_ASINS = [
  'B000CBSNRY','B072B9V2KB','B082KFTF41','B0CYT85XT6','B0CSDSYR5K',
  'B0F3XF1SH8','B0DHPT6ZXK','B0BWDWNH5G','B0FBBV27FC','B0865LF8BY',
  'B002WJI54U','B0CSLHL3MG','B0BYJSZ3TH','B09C154HVX','B09BDL522H',
  'B0CN6NDMQ5','B0CMVBLH36','B09WMPDVZX','B09P2YTJF6','B005IDC31S',
  'B0CD15C641','B0FTQ5RJM7','B0DB6S6R89','B0CYWFH5Y9','B09NBWL8J5',
  // Also regenerate the 10 from earlier whose images got stripped
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
          if (imgPart) resolve(`data:${imgPart.inlineData.mimeType || 'image/png'};base64,${imgPart.inlineData.data}`);
          else reject(new Error('No image'));
        } catch (e) { reject(e); }
      });
    });
    req.on('error', reject);
    req.write(body);
    req.end();
  });
}

async function run() {
  const startArg = parseInt(process.argv[2] || '0');
  const targets = TARGET_ASINS.slice(startArg);
  console.log(`Processing ${targets.length} products (starting at index ${startArg})...\n`);

  for (let i = 0; i < targets.length; i++) {
    const asin = targets[i];
    const globalIdx = startArg + i;

    // Fresh read each time to avoid stale state
    const products = await redis.get('admin:products');
    const pIdx = products.findIndex(p => {
      const pa = p.asin || p.affiliateUrl?.match(/\/dp\/([A-Z0-9]{10})/)?.[1];
      return pa === asin;
    });
    if (pIdx === -1) { console.log(`[${globalIdx+1}] ⚠️  ${asin} not found`); continue; }

    const product = products[pIdx];
    console.log(`[${globalIdx+1}/${TARGET_ASINS.length}] ${product.name}`);

    try {
      const dataUrl = await generateImage(product.name);
      // Save only this one product's image — keep others as-is (no base64 bloat)
      // Store image separately as a compact key
      await redis.set(`product-img:${product.id}`, dataUrl);
      // Update the product record with a reference
      products[pIdx] = { ...product, image: dataUrl, updatedAt: new Date().toISOString() };
      // Strip other base64 images before saving to stay under limit
      const toSave = products.map(p => p.image?.startsWith('data:') && p.id !== product.id ? { ...p, image: `data:ref:${p.id}` } : p);
      await redis.set('admin:products', toSave);
      console.log(`  ✅ Done`);
    } catch (err) {
      console.log(`  ❌ ${err.message.slice(0,60)}`);
    }

    await new Promise(r => setTimeout(r, 800));
  }
  console.log('\nAll done.');
}

run().catch(console.error);
