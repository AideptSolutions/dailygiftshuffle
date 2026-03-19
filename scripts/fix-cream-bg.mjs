import { readFileSync, writeFileSync } from 'fs';

const CREAM = '#FEFCF0';

// ── HomeFeaturedSection ─────────────────────────────────────────────────────
{
  const file = 'components/HomeFeaturedSection.tsx';
  let c = readFileSync(file, 'utf8');

  // 1. Gift tile cards: bg-white → cream style
  c = c.replace(
    /(\$\{animating \? 'tile-tumble' : 'opacity-0'\}) bg-white (rounded-2xl)/g,
    `$1 $2`
  );
  // Add inline background to the tile wrapper (safer than class replacement)
  c = c.replace(
    /className=\{`\$\{animating \? 'tile-tumble' : 'opacity-0'\} (rounded-2xl overflow-hidden shadow-sm border border-\[#E2E8F0\] hover:shadow-md hover:border-\[#F04E30\]\/30 transition-shadow flex flex-col cursor-pointer)`\}/,
    `className={\`\${animating ? 'tile-tumble' : 'opacity-0'} $1\`} style={{ background: '${CREAM}' }}`
  );

  // 2. Custom Shuffle section box: bg-white rounded-3xl → cream
  c = c.replace(
    'className="bg-white rounded-3xl shadow-sm border border-[#E2E8F0] p-6 sm:p-8"',
    `className="rounded-3xl shadow-sm border border-[#E2E8F0] p-6 sm:p-8" style={{ background: '${CREAM}' }}`
  );

  writeFileSync(file, c, 'utf8');
  console.log('HomeFeaturedSection updated');
  console.log('  tile cream:', c.includes(`background: '${CREAM}'`));
  console.log('  shuffle box cream:', c.includes(`background: '${CREAM}'`));
}

// ── ProductCard (shared component) ─────────────────────────────────────────
{
  const file = 'components/ProductCard.tsx';
  let c = readFileSync(file, 'utf8');
  c = c.replace(
    'className="bg-white rounded-2xl overflow-hidden shadow-sm border border-[#E2E8F0] hover:shadow-md hover:border-[#F04E30]/30 transition-shadow flex flex-col"',
    `className="rounded-2xl overflow-hidden shadow-sm border border-[#E2E8F0] hover:shadow-md hover:border-[#F04E30]/30 transition-shadow flex flex-col" style={{ background: '${CREAM}' }}`
  );
  writeFileSync(file, c, 'utf8');
  console.log('ProductCard updated:', c.includes(`background: '${CREAM}'`));
}

// ── ShuffleClient (wizard) ─────────────────────────────────────────────────
{
  const file = 'app/shuffle/ShuffleClient.tsx';
  let c = readFileSync(file, 'utf8');
  c = c.replace(
    'className="bg-white rounded-2xl overflow-hidden shadow-sm border border-[#E2E8F0] hover:shadow-md hover:border-[#F04E30]/30 transition-shadow flex flex-col"',
    `className="rounded-2xl overflow-hidden shadow-sm border border-[#E2E8F0] hover:shadow-md hover:border-[#F04E30]/30 transition-shadow flex flex-col" style={{ background: '${CREAM}' }}`
  );
  writeFileSync(file, c, 'utf8');
  console.log('ShuffleClient updated:', c.includes(`background: '${CREAM}'`));
}
