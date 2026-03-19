import { readFileSync, writeFileSync } from 'fs';

const CREAM = '#FEFCF0';
const file = 'components/HomeFeaturedSection.tsx';
let c = readFileSync(file, 'utf8');

// Merge the two style props on the tile div into one
c = c.replace(
  /className=\{`\$\{animating \? 'tile-tumble' : 'opacity-0'\} (rounded-2xl overflow-hidden shadow-sm border border-\[#E2E8F0\] hover:shadow-md hover:border-\[#F04E30\]\/30 transition-shadow flex flex-col cursor-pointer)`\} style=\{ \{ background: '#FEFCF0' \} \}\s*style=\{ \{ animationDelay: `\$\{i \* 65\}ms` \} \}/,
  `className={\`\${animating ? 'tile-tumble' : 'opacity-0'} $1\`} style={{ background: '${CREAM}', animationDelay: \`\${i * 65}ms\` }}`
);

writeFileSync(file, c, 'utf8');

// verify no dupe style
const dupeCheck = c.match(/style=.*\n.*style=/g);
console.log('Dupe style props:', dupeCheck ? dupeCheck.length : 0);
console.log('Merged style found:', c.includes(`background: '${CREAM}', animationDelay`));
