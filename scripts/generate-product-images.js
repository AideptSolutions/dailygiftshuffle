/**
 * generate-product-images.js
 * Generates editorial/mood-based AI product images for all GiftShuffle products.
 * Uses Nano Banana 2 (gemini-3.1-flash-image-preview) for cost efficiency.
 * Saves images to public/images/products/ and tracks progress.
 *
 * Usage:
 *   node scripts/generate-product-images.js           # generate all
 *   node scripts/generate-product-images.js --limit 5 # test first 5
 *   node scripts/generate-product-images.js --dry-run # preview only
 *   node scripts/generate-product-images.js --resume   # skip already done
 */

const https = require('https');
const fs = require('fs');
const path = require('path');

const MODEL_ID = 'gemini-3.1-flash-image-preview'; // Nano Banana 2
const API_KEY = process.env.GOOGLE_AI_API_KEY;
const OUTPUT_DIR = path.join(__dirname, '../public/images/products');
const PRODUCTS_FILE = path.join(__dirname, '../data/products.ts');
const PROGRESS_FILE = path.join(__dirname, 'image-gen-progress.json');

// ── Mood-based editorial prompt builder ───────────────────────────────────────
function buildPrompt(name, tags = []) {
  let mood, lighting, setting, style;

  if (tags.includes('luxury')) {
    mood = 'opulent, sophisticated, aspirational';
    lighting = 'warm golden hour, soft rim lighting, candlelit warmth';
    setting = 'marble surface, velvet draped background, bokeh gold accents';
    style = 'high-end magazine editorial, Vogue gift guide';
  } else if (tags.includes('ai-smart-home') || tags.includes('tech')) {
    mood = 'modern, sleek, innovative, futuristic';
    lighting = 'cool blue-white studio glow, subtle neon accent lighting';
    setting = 'dark matte surface, clean geometric props, soft ambient blue light';
    style = 'Wired magazine tech editorial, Apple campaign aesthetic';
  } else if (tags.includes('outdoors') || tags.includes('sports')) {
    mood = 'adventurous, energetic, free, natural';
    lighting = 'dramatic golden hour sunlight, long shadows';
    setting = 'rugged outdoor environment, natural textures, mountain or forest backdrop';
    style = 'REI catalog meets National Geographic adventure editorial';
  } else if (tags.includes('beauty')) {
    mood = 'soft, luxurious, self-care, feminine';
    lighting = 'diffused natural window light, peachy warm tones, soft shadows';
    setting = 'marble or travertine surface, fresh botanicals, linen texture, pastel accents';
    style = 'Vogue beauty editorial, Glossier campaign aesthetic';
  } else if (tags.includes('fitness')) {
    mood = 'energetic, focused, motivated, clean';
    lighting = 'bright natural morning light or clean studio lighting';
    setting = 'minimal athletic setting, wood floor or outdoor fresh air environment';
    style = 'Nike/Lululemon campaign, clean and aspirational';
  } else if (tags.includes('kids')) {
    mood = 'playful, joyful, colorful, whimsical';
    lighting = 'bright cheerful warm daylight';
    setting = 'colorful playroom with soft textures, pastel backgrounds, playful props';
    style = 'modern children brand editorial, Pottery Barn Kids aesthetic';
  } else if (tags.includes('pets')) {
    mood = 'warm, cozy, heartwarming, loyal';
    lighting = 'soft natural indoor light, golden warmth';
    setting = 'cozy home living room with lifestyle pet props, wood floors, warm tones';
    style = 'premium pet lifestyle brand editorial';
  } else if (tags.includes('kitchen')) {
    mood = 'warm, inviting, delicious, home comfort';
    lighting = 'warm golden kitchen window light, soft shadows on textures';
    setting = 'rustic wood counter, fresh ingredients nearby, cozy kitchen atmosphere';
    style = 'Bon Appétit / Food52 editorial photography';
  } else if (tags.includes('home') || tags.includes('diy-tools')) {
    mood = 'cozy, aspirational, livable, considered';
    lighting = 'warm interior natural light, afternoon sun through windows';
    setting = 'styled home interior, complementary modern decor, warm wood tones';
    style = 'Architectural Digest / West Elm catalog editorial';
  } else if (tags.includes('office') || tags.includes('finance')) {
    mood = 'professional, focused, aspirational, sharp';
    lighting = 'clean cool natural light, minimal shadows';
    setting = 'clean desk setup, minimal props, subtle texture background';
    style = 'premium office brand editorial, Bloomberg Businessweek aesthetic';
  } else if (tags.includes('gardening')) {
    mood = 'fresh, natural, earthy, peaceful';
    lighting = 'soft morning garden light, dappled sun';
    setting = 'garden setting with plants, soil, natural textures';
    style = 'garden lifestyle editorial, Martha Stewart aesthetic';
  } else if (tags.includes('gaming')) {
    mood = 'immersive, exciting, high-energy, dramatic';
    lighting = 'dramatic RGB accent lighting, dark moody atmosphere with color pops';
    setting = 'gaming setup environment, dark background with colorful glow';
    style = 'Razer/gaming brand editorial, cinematic game art aesthetic';
  } else if (tags.includes('travel')) {
    mood = 'wanderlust, freedom, adventure, discovery';
    lighting = 'golden hour travel lighting, warm sunlight';
    setting = 'travel-inspired setting: airport, world map, passport, luggage context';
    style = 'Travel + Leisure editorial, Condé Nast Traveler aesthetic';
  } else {
    mood = 'warm, inviting, aspirational, thoughtful';
    lighting = 'soft natural lifestyle lighting with warm golden tones';
    setting = 'clean lifestyle setting with complementary textures and soft background';
    style = 'modern premium lifestyle editorial, O Magazine gift guide';
  }

  return `Editorial lifestyle product photography of: "${name}".

Visual mood: ${mood}
Lighting: ${lighting}
Setting: ${setting}
Photographic style: ${style}

The product is the clear hero subject of the image. Composition: product centered with intentional negative space. Square 1:1 format. No text overlays, no watermarks, no brand logos. Photorealistic, high quality, could appear in a premium gift guide magazine spread. Professional product editorial photography.`;
}

// ── API call ──────────────────────────────────────────────────────────────────
function generateImage(prompt) {
  return new Promise((resolve, reject) => {
    const body = JSON.stringify({
      contents: [{ parts: [{ text: prompt }] }],
      generationConfig: { responseModalities: ['IMAGE', 'TEXT'] }
    });
    const urlPath = `/v1beta/models/${MODEL_ID}:generateContent?key=${API_KEY}`;
    const req = https.request({
      hostname: 'generativelanguage.googleapis.com',
      path: urlPath,
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Content-Length': Buffer.byteLength(body) }
    }, (res) => {
      const chunks = [];
      res.on('data', c => chunks.push(c));
      res.on('end', () => {
        try {
          const parsed = JSON.parse(Buffer.concat(chunks).toString());
          if (res.statusCode !== 200) return reject(new Error(`API ${res.statusCode}: ${JSON.stringify(parsed).slice(0, 300)}`));
          const parts = parsed.candidates?.[0]?.content?.parts || [];
          const imgPart = parts.find(p => p.inlineData?.mimeType?.startsWith('image/'));
          if (!imgPart) return reject(new Error('No image in response. Parts: ' + JSON.stringify(parts).slice(0, 200)));
          resolve(imgPart.inlineData.data); // base64
        } catch (e) { reject(e); }
      });
    });
    req.on('error', reject);
    req.write(body);
    req.end();
  });
}

function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }

function loadProgress() {
  try { return JSON.parse(fs.readFileSync(PROGRESS_FILE, 'utf8')); }
  catch { return { completed: [], failed: [] }; }
}
function saveProgress(p) { fs.writeFileSync(PROGRESS_FILE, JSON.stringify(p, null, 2)); }

// ── Parse products from TS file ───────────────────────────────────────────────
function parseProducts(tsContent) {
  const products = [];
  // Match each product object: { id:'xxx', name:'xxx', ... tags:[...] }
  const productRegex = /\{\s*id:'([^']+)',\s*name:'([^']+)'[\s\S]*?(?:tags:\s*\[([^\]]*)\])?(?:\s*\}(?=\s*[,\]]))/g;
  let match;
  while ((match = productRegex.exec(tsContent)) !== null) {
    const id = match[1];
    const name = match[2];
    const tagsRaw = match[3] || '';
    const tags = tagsRaw.match(/'([^']+)'/g)?.map(t => t.replace(/'/g, '')) || [];
    products.push({ id, name, tags });
  }
  return products;
}

// ── Main ─────────────────────────────────────────────────────────────────────
async function main() {
  if (!API_KEY) { console.error('❌ GOOGLE_AI_API_KEY not set'); process.exit(1); }

  const args = process.argv.slice(2);
  const isDryRun = args.includes('--dry-run');
  const isResume = args.includes('--resume');
  const limitIdx = args.indexOf('--limit');
  const limit = limitIdx !== -1 ? parseInt(args[limitIdx + 1]) : Infinity;

  if (!fs.existsSync(OUTPUT_DIR)) fs.mkdirSync(OUTPUT_DIR, { recursive: true });

  const tsContent = fs.readFileSync(PRODUCTS_FILE, 'utf8');
  const allProducts = parseProducts(tsContent);

  if (allProducts.length === 0) {
    console.error('No products parsed. Check regex vs file format.');
    process.exit(1);
  }

  const progress = loadProgress();
  const alreadyDone = new Set(progress.completed);

  const toProcess = isResume
    ? allProducts.filter(p => !alreadyDone.has(p.id))
    : allProducts;

  const batch = toProcess.slice(0, limit === Infinity ? undefined : limit);

  console.log(`\n🎨 GiftShuffle Product Image Generator`);
  console.log(`   Model: Nano Banana 2 (${MODEL_ID})`);
  console.log(`   Total products: ${allProducts.length}`);
  console.log(`   Already done: ${alreadyDone.size}`);
  console.log(`   This batch: ${batch.length}`);
  console.log(`   Output: public/images/products/`);
  if (isDryRun) console.log('   DRY RUN — no API calls\n');
  else console.log('');

  let generated = 0;
  let failed = 0;

  for (let i = 0; i < batch.length; i++) {
    const { id, name, tags } = batch[i];
    const filename = `${id}.jpg`;
    const outputPath = path.join(OUTPUT_DIR, filename);

    // Skip if file already exists
    if (fs.existsSync(outputPath)) {
      console.log(`[${i+1}/${batch.length}] SKIP (exists): ${id}`);
      if (!alreadyDone.has(id)) { progress.completed.push(id); saveProgress(progress); }
      continue;
    }

    console.log(`[${i+1}/${batch.length}] ${id} — ${name.slice(0, 50)}`);

    if (isDryRun) {
      const prompt = buildPrompt(name, tags);
      console.log(`  Prompt preview: ${prompt.slice(0, 100)}...`);
      continue;
    }

    try {
      const prompt = buildPrompt(name, tags);
      const b64 = await generateImage(prompt);
      fs.writeFileSync(outputPath, Buffer.from(b64, 'base64'));
      progress.completed.push(id);
      saveProgress(progress);
      generated++;
      console.log(`  ✅ ${filename}`);
    } catch (err) {
      console.error(`  ❌ ${err.message.slice(0, 100)}`);
      if (!progress.failed.find(f => f.id === id)) {
        progress.failed.push({ id, error: err.message.slice(0, 200) });
      }
      saveProgress(progress);
      failed++;
    }

    // 1.5 sec between requests — safe rate limit
    if (i < batch.length - 1) await sleep(1500);
  }

  console.log(`\n📊 Results: ✅ ${generated} generated | ❌ ${failed} failed | ⏭️  ${batch.length - generated - failed} skipped`);
  console.log(`\nNext: Run 'node scripts/patch-product-images.js' to update products.ts`);
}

main().catch(err => { console.error('Fatal:', err); process.exit(1); });
