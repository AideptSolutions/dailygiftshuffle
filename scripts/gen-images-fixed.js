const { Redis } = require('@upstash/redis');
const https = require('https');

const redis = new Redis({
  url: 'https://social-slug-73085.upstash.io',
  token: process.env.UPSTASH_REDIS_REST_TOKEN,
});

const GOOGLE_AI_API_KEY = process.env.GOOGLE_AI_API_KEY;

// ASINs that were just fixed — generate fresh images for these
const TARGET_ASINS = [
  'B0DR9Q4HJG', // Stanley IceFlow Tumbler
  'B07S1BNNYD', // HAPPY NUTS Deodorant
  'B00V5Y9P5G', // Lincoln Logs
  'B00006JZCG', // Melissa & Doug Pattern Blocks
  'B0FBC31SFR', // Wooden Playing Card Set
  'B0FN5NY3TB', // Blueair Air Purifier + Clock
  'B09BDLV9BV', // Philips Hue Signe Floor Lamp
  'B0B9T2LW6R', // Philips Hue Go Table Lamp
  'B09MJR9T2P', // Meta Quest Charging Dock
  'B08SBYHYJV', // Mini Massage Gun
];

function generateImagePrompt(name) {
  return `Professional product photo of "${name}" on a clean white background. Editorial style, soft studio lighting, sharp focus, high quality commercial photography. No text overlays.`;
}

function generateImage(prompt) {
  return new Promise((resolve, reject) => {
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
          if (imgPart) {
            const mime = imgPart.inlineData.mimeType || 'image/png';
            resolve(`data:${mime};base64,${imgPart.inlineData.data}`);
          } else {
            reject(new Error('No image in response: ' + JSON.stringify(data).slice(0, 200)));
          }
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
  let count = 0;

  for (const asin of TARGET_ASINS) {
    const idx = updated.findIndex(p => {
      const pAsin = p.asin || p.affiliateUrl?.match(/\/dp\/([A-Z0-9]{10})/)?.[1];
      return pAsin === asin;
    });

    if (idx === -1) { console.log(`⚠️  ASIN ${asin} not found`); continue; }

    const product = updated[idx];
    console.log(`\n[${count+1}/10] Generating image for: ${product.name}`);

    try {
      const dataUrl = await generateImage(generateImagePrompt(product.name));
      updated[idx] = { ...product, image: dataUrl, updatedAt: new Date().toISOString() };
      console.log(`  ✅ Done`);
      count++;
    } catch (err) {
      console.log(`  ❌ Failed: ${err.message}`);
    }

    // Small delay between requests
    await new Promise(r => setTimeout(r, 1000));
  }

  if (count > 0) {
    await redis.set('admin:products', updated);
    console.log(`\n✅ Generated and saved images for ${count} products.`);
  }
}

run().catch(console.error);
