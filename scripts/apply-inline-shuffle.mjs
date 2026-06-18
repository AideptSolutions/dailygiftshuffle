// Insert an <InlineShuffle> section just above the product grid on pages that
// have a ProductCard grid but no shuffle widget. Idempotent; reports anything
// it can't match instead of guessing.
//
// Usage: node scripts/apply-inline-shuffle.mjs [--dry-run]

import { readFileSync, writeFileSync } from 'fs';
import path from 'path';

const ROOT = 'C:/Users/allan/projects/dailygiftshuffle';
const DRY = process.argv.includes('--dry-run');
const GRID = 'grid grid-cols-2 sm:grid-cols-4';

// slug -> { v: existing product-array var, h: shuffle heading }
const MAP = {
  'ai-personalized-gifts':          { v: 'aiProducts',       h: 'Shuffle AI Gift Picks' },
  'birthday-gift-ideas':            { v: 'birthdayProducts', h: 'Shuffle Birthday Picks' },
  'christmas-gift-ideas':           { v: 'christmasProducts', h: 'Shuffle Christmas Picks' },
  'gift-ideas-for-dad':             { v: 'dadProducts',      h: 'Shuffle Dad Picks' },
  'gift-ideas-for-her':             { v: 'herProducts',      h: 'Shuffle Picks for Her' },
  'gift-ideas-for-him':             { v: 'himProducts',      h: 'Shuffle Picks for Him' },
  'gift-ideas-for-kids':            { v: 'kidsProducts',     h: 'Shuffle Kids Picks' },
  'gifts-for-camping-and-outdoors': { v: 'outdoorsProducts', h: 'Shuffle Outdoor Picks' },
  'gifts-under-50':                 { v: 'under50Products',  h: 'Shuffle Under-$50 Picks' },
  'sustainable-eco-gifts':          { v: 'ecoProducts',      h: 'Shuffle Eco Picks' },
};

const res = { ok: [], skip: [], nomatch: [] };
for (const [slug, { v, h }] of Object.entries(MAP)) {
  const file = path.join(ROOT, 'app', slug, 'page.tsx');
  let text = readFileSync(file, 'utf8');
  if (text.includes('<InlineShuffle')) { res.skip.push(slug); continue; }
  const gridIdx = text.indexOf(GRID);
  if (gridIdx < 0) { res.nomatch.push(slug); continue; }

  // ensure import
  if (!text.includes("from '@/components/InlineShuffle'")) {
    text = text.replace(
      /(import Navbar from '@\/components\/Navbar';)/,
      "$1\nimport InlineShuffle from '@/components/InlineShuffle';",
    );
  }
  // recompute gridIdx after possible import insert
  const gIdx = text.indexOf(GRID);
  const sectionStart = text.lastIndexOf('<section', gIdx);
  const lineStart = text.lastIndexOf('\n', sectionStart) + 1;
  const indent = text.slice(lineStart, sectionStart);
  const block =
    `${indent}{/* Inline Shuffle */}\n` +
    `${indent}<section className="max-w-5xl mx-auto px-4 py-6">\n` +
    `${indent}  <InlineShuffle products={${v}} heading="${h}" />\n` +
    `${indent}</section>\n\n`;
  text = text.slice(0, lineStart) + block + text.slice(lineStart);

  if (!DRY) writeFileSync(file, text);
  res.ok.push(slug);
}
console.log(`inserted: ${res.ok.length}  skipped: ${res.skip.length}  no-match: ${res.nomatch.length}`);
if (res.nomatch.length) console.log('NO MATCH:', res.nomatch.join(', '));
if (DRY) console.log('(dry-run)');
