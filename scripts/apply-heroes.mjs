// Insert a hero <Image> section (with SEO alt from the manifest) into each page.
// Idempotent: skips pages that already reference their hero. Reports any page
// whose structure it can't safely match instead of guessing.
//
// Usage: node scripts/apply-heroes.mjs [--dry-run]

import { readFileSync, writeFileSync, existsSync } from 'fs';
import path from 'path';

const ROOT = 'C:/Users/allan/projects/dailygiftshuffle';
const MANIFEST = JSON.parse(readFileSync(path.join(ROOT, 'data', 'hero-manifest.json'), 'utf8'));
const DRY = process.argv.includes('--dry-run');

const MAIN_ANCHOR = '<main id="main-content" className="flex-1">';

function heroSection(slug, alt) {
  return `
        {/* Hero image */}
        <section className="max-w-5xl mx-auto px-4 pt-8">
          <div className="relative w-full rounded-2xl overflow-hidden" style={{ aspectRatio: '3/2', maxHeight: '420px' }}>
            <Image
              src="/images/heroes/${slug}.jpg"
              alt="${alt}"
              fill
              className="object-cover"
              priority
              unoptimized
            />
          </div>
        </section>`;
}

const results = { ok: [], skip: [], nofile: [], nomatch: [] };

for (const [slug, meta] of Object.entries(MANIFEST)) {
  const heroFile = path.join(ROOT, 'public', 'images', 'heroes', `${slug}.jpg`);
  const pageFile = path.join(ROOT, 'app', slug, 'page.tsx');
  if (!existsSync(heroFile) || !existsSync(pageFile)) { results.nofile.push(slug); continue; }
  let text = readFileSync(pageFile, 'utf8');

  if (text.includes(`/images/heroes/${slug}.jpg`)) { results.skip.push(slug); continue; }
  if (!text.includes(MAIN_ANCHOR)) { results.nomatch.push(slug); continue; }

  // ensure Image import
  if (!/from ['"]next\/image['"]/.test(text)) {
    text = text.replace(
      /(import Navbar from '@\/components\/Navbar';)/,
      "import Image from 'next/image';\n$1",
    );
  }
  // insert hero right after the <main> open tag
  text = text.replace(MAIN_ANCHOR, `${MAIN_ANCHOR}${heroSection(slug, meta.alt)}`);

  if (!DRY) writeFileSync(pageFile, text);
  results.ok.push(slug);
}

console.log(`inserted: ${results.ok.length}  skipped(existing): ${results.skip.length}  no-file: ${results.nofile.length}  no-anchor: ${results.nomatch.length}`);
if (results.nomatch.length) console.log('NO ANCHOR (needs manual):', results.nomatch.join(', '));
if (results.nofile.length) console.log('NO FILE:', results.nofile.join(', '));
if (DRY) console.log('(dry-run, nothing written)');
