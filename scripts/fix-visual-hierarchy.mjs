import { readFileSync, writeFileSync } from 'fs';

const TILE_BG = '#FFF8EE';   // warm cream for cards/tiles — pops on white sections
const WHITE   = '#FFFFFF';   // pure white for sections — pops on cream page body

// ── 1. app/page.tsx ──────────────────────────────────────────────────────────
{
  const file = 'app/page.tsx';
  let c = readFileSync(file, 'utf8');

  // Hero section: cream gradient → white
  c = c.replace(
    `style={{ background: 'linear-gradient(135deg, #FFFAF5 0%, #FFF9E6 100%)' }}`,
    `style={{ background: '${WHITE}' }}`
  );

  // Features section: #FFFAF5 → white
  c = c.replace(
    `<section className="py-16 px-4" style={{ background: '#FFFAF5' }}>`,
    `<section className="py-16 px-4" style={{ background: '${WHITE}' }}>`
  );

  // Step number circles: #FFFAF5 background → tile cream
  c = c.replace(
    `style={{ background: '#FFFAF5', border: '2px solid #F04E30', color: '#F04E30' }}`,
    `style={{ background: '${TILE_BG}', border: '2px solid #F04E30', color: '#F04E30' }}`
  );

  writeFileSync(file, c, 'utf8');
  console.log('page.tsx updated');
}

// ── 2. components/HomeFeaturedSection.tsx ───────────────────────────────────
{
  const file = 'components/HomeFeaturedSection.tsx';
  let c = readFileSync(file, 'utf8');

  // Tile cards: #FEFCF0 → tile cream
  c = c.replace(/background: '#FEFCF0'/g, `background: '${TILE_BG}'`);

  // ShuffleClient wrapper gradient (if present)
  c = c.replace(
    `style={{ background: 'linear-gradient(135deg, #FFFAF5 0%, #FFF9E6 100%)' }}`,
    `style={{ background: '${WHITE}' }}`
  );

  writeFileSync(file, c, 'utf8');
  console.log('HomeFeaturedSection.tsx updated');
}

// ── 3. components/ProductCard.tsx ───────────────────────────────────────────
{
  const file = 'components/ProductCard.tsx';
  let c = readFileSync(file, 'utf8');
  c = c.replace(/background: '#FEFCF0'/g, `background: '${TILE_BG}'`);
  writeFileSync(file, c, 'utf8');
  console.log('ProductCard.tsx updated');
}

// ── 4. app/shuffle/ShuffleClient.tsx ───────────────────────────────────────
{
  const file = 'app/shuffle/ShuffleClient.tsx';
  let c = readFileSync(file, 'utf8');

  // Card tiles: #FEFCF0 → tile cream
  c = c.replace(/background: '#FEFCF0'/g, `background: '${TILE_BG}'`);

  // Shuffle wizard wrapper: cream gradient → white
  c = c.replace(
    `style={{ background: 'linear-gradient(135deg, #FFFAF5 0%, #FFF9E6 100%)' }}`,
    `style={{ background: '${WHITE}' }}`
  );

  writeFileSync(file, c, 'utf8');
  console.log('ShuffleClient.tsx updated');
}

console.log('\nDone. Visual hierarchy:');
console.log(`  Page body:     #FFFAF5 (warm cream)`);
console.log(`  Sections:      ${WHITE} (white — pops on cream page)`);
console.log(`  Tiles / cards: ${TILE_BG} (warm cream — pops on white sections)`);
