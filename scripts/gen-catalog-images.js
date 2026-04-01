const https = require('https');
const fs = require('fs');
const path = require('path');

const GOOGLE_AI_API_KEY = process.env.GOOGLE_AI_API_KEY;

const products = [
  { id: 'baby-shower-001', name: 'Hatch Rest+ Baby Sound Machine & Night Light', path: '/images/products/baby-shower-001.jpg' },
  { id: 'baby-shower-002', name: 'aden + anais Classic Swaddle Blankets 4-Pack', path: '/images/products/baby-shower-002.jpg' },
  { id: 'baby-shower-003', name: 'Frida Mom Postpartum Recovery Kit', path: '/images/products/baby-shower-003.jpg' },
  { id: 'baby-shower-004', name: 'Pearhead Baby Handprint and Footprint Keepsake Frame', path: '/images/products/baby-shower-004.jpg' },
  { id: 'baby-shower-005', name: 'Infantino Flip 4-in-1 Convertible Baby Carrier', path: '/images/products/baby-shower-005.jpg' },
  { id: 'baby-shower-006', name: 'The Very Hungry Caterpillar Baby Gift Set', path: '/images/products/baby-shower-006.jpg' },
  { id: 'wedding-001', name: 'Personalized Cutting Board with Names and Wedding Date', path: '/images/products/wedding-001.jpg' },
  { id: 'wedding-002', name: 'Riedel Champagne Flutes Gift Set 2-Pack', path: '/images/products/wedding-002.jpg' },
  { id: 'wedding-003', name: 'Le Creuset Signature Cast Iron Dutch Oven 5.5 qt', path: '/images/products/wedding-003.jpg' },
  { id: 'wedding-004', name: 'Custom Star Map Print Night You Met or Wedding Night', path: '/images/products/wedding-004.jpg' },
  { id: 'wedding-005', name: 'Brooklinen Classic Core Sheet Set', path: '/images/products/wedding-005.jpg' },
  { id: 'wedding-006', name: 'Fingerprint Tree Wedding Guest Book Alternative', path: '/images/products/wedding-006.jpg' },
];

function generateImage(name) {
  return new Promise((resolve, reject) => {
    const prompt = `Professional product photo of "${name}" on a clean white background. Soft studio lighting, sharp focus, editorial commercial photography. No text.`;
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
  for (let i = 0; i < products.length; i++) {
    const p = products[i];
    const fullPath = path.join(__dirname, '..', 'public', p.path);
    fs.mkdirSync(path.dirname(fullPath), { recursive: true });

    if (fs.existsSync(fullPath)) { console.log(`[${i+1}] ⏩ ${p.id}`); continue; }

    console.log(`[${i+1}/${products.length}] ${p.name}`);
    try {
      const buf = await generateImage(p.name);
      fs.writeFileSync(fullPath, buf);
      console.log(`  ✅ ${path.basename(fullPath)}`);
    } catch (e) {
      console.log(`  ❌ ${e.message.slice(0,60)}`);
    }
    await new Promise(r => setTimeout(r, 700));
  }
  console.log('\nDone! Run: git add -A && git commit && vercel --prod');
}
run().catch(console.error);
