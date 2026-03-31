/**
 * generate-catalog-images.js
 * Generates AI product images for products-catalog.ts (category/slug pages).
 * Uses Nano Banana 2 for cost efficiency.
 */
const https = require('https');
const fs = require('fs');
const path = require('path');

const MODEL_ID = 'gemini-3.1-flash-image-preview';
const API_KEY = process.env.GOOGLE_AI_API_KEY;
const OUTPUT_DIR = path.join(__dirname, '../public/images/products');
const CATALOG_FILE = path.join(__dirname, '../data/products-catalog.ts');
const PROGRESS_FILE = path.join(__dirname, 'catalog-image-progress.json');

function generateImage(prompt) {
  return new Promise((resolve, reject) => {
    const body = JSON.stringify({
      contents: [{ parts: [{ text: prompt }] }],
      generationConfig: { responseModalities: ['IMAGE', 'TEXT'] }
    });
    const urlPath = `/v1beta/models/${MODEL_ID}:generateContent?key=${API_KEY}`;
    const req = https.request({
      hostname: 'generativelanguage.googleapis.com',
      path: urlPath, method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Content-Length': Buffer.byteLength(body) }
    }, (res) => {
      const chunks = [];
      res.on('data', c => chunks.push(c));
      res.on('end', () => {
        try {
          const parsed = JSON.parse(Buffer.concat(chunks).toString());
          if (res.statusCode !== 200) return reject(new Error(`API ${res.statusCode}: ${JSON.stringify(parsed).slice(0, 200)}`));
          const parts = parsed.candidates?.[0]?.content?.parts || [];
          const imgPart = parts.find(p => p.inlineData?.mimeType?.startsWith('image/'));
          if (!imgPart) return reject(new Error('No image in response'));
          resolve(imgPart.inlineData.data);
        } catch (e) { reject(e); }
      });
    });
    req.on('error', reject);
    req.write(body);
    req.end();
  });
}

function buildPrompt(name, tags = []) {
  let style = 'warm aspirational lifestyle editorial';
  if (tags.includes('tech') || tags.includes('ai-smart-home')) style = 'sleek modern tech editorial, cool blue-white lighting, dark minimal setting';
  else if (tags.includes('luxury')) style = 'opulent high-end magazine editorial, warm golden light, marble surface';
  else if (tags.includes('outdoors') || tags.includes('sports')) style = 'adventurous outdoor editorial, golden hour, natural textures';
  else if (tags.includes('beauty')) style = 'soft feminine beauty editorial, peachy window light, botanicals';
  else if (tags.includes('fitness')) style = 'energetic athletic editorial, bright clean lighting';
  else if (tags.includes('kitchen')) style = 'warm kitchen lifestyle, golden afternoon light, rustic wood';
  else if (tags.includes('gaming')) style = 'dramatic RGB gaming editorial, dark moody with color pops';
  else if (tags.includes('travel')) style = 'wanderlust travel editorial, golden hour, adventurous';
  return `Editorial lifestyle product photography of: "${name}". Style: ${style}. Square format. No text, watermarks, or logos. Photorealistic, high quality, premium gift guide magazine aesthetic.`;
}

function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }
function loadProgress() { try { return JSON.parse(fs.readFileSync(PROGRESS_FILE, 'utf8')); } catch { return { completed: [] }; } }
function saveProgress(p) { fs.writeFileSync(PROGRESS_FILE, JSON.stringify(p, null, 2)); }

async function main() {
  if (!API_KEY) { console.error('GOOGLE_AI_API_KEY not set'); process.exit(1); }
  if (!fs.existsSync(OUTPUT_DIR)) fs.mkdirSync(OUTPUT_DIR, { recursive: true });

  const content = fs.readFileSync(CATALOG_FILE, 'utf8');

  // Parse products: find id, name, tags
  const productBlocks = [...content.matchAll(/\{[^{}]*id:\s*'([^']+)'[^{}]*name:\s*'([^']+)'[^{}]*\}/gs)];
  const tagMap = {};
  const tagMatches = [...content.matchAll(/id:\s*'([^']+)'[\s\S]*?tags:\s*\[([^\]]*)\]/g)];
  tagMatches.forEach(m => {
    tagMap[m[1]] = m[2].match(/'([^']+)'/g)?.map(t => t.replace(/'/g, '')) || [];
  });

  // Filter to only ones still using placehold.co
  const allProducts = productBlocks.map(m => ({ id: m[1], name: m[2], tags: tagMap[m[1]] || [] }));

  const progress = loadProgress();
  const done = new Set(progress.completed);
  const todo = allProducts.filter(p => {
    const outPath = path.join(OUTPUT_DIR, `${p.id}.jpg`);
    return !done.has(p.id) && !fs.existsSync(outPath);
  });

  console.log(`\n🎨 Catalog Image Generator — Nano Banana 2`);
  console.log(`   Total catalog products: ${allProducts.length}`);
  console.log(`   Already done: ${done.size}`);
  console.log(`   To generate: ${todo.length}\n`);

  let generated = 0, failed = 0;
  for (let i = 0; i < todo.length; i++) {
    const { id, name, tags } = todo[i];
    const outPath = path.join(OUTPUT_DIR, `${id}.jpg`);
    console.log(`[${i+1}/${todo.length}] ${id} — ${name.slice(0, 50)}`);
    try {
      const b64 = await generateImage(buildPrompt(name, tags));
      fs.writeFileSync(outPath, Buffer.from(b64, 'base64'));
      progress.completed.push(id);
      saveProgress(progress);
      generated++;
      console.log(`  ✅ ${id}.jpg`);
    } catch (e) {
      console.error(`  ❌ ${e.message.slice(0, 80)}`);
      failed++;
    }
    if (i < todo.length - 1) await sleep(1500);
  }

  console.log(`\n✅ Done: ${generated} generated | ❌ ${failed} failed`);
  console.log(`\nRun: node scripts/patch-catalog-images.js to update products-catalog.ts`);
}

main().catch(e => { console.error('Fatal:', e); process.exit(1); });
