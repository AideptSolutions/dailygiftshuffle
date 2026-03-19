import { readFileSync, writeFileSync } from 'fs';

const file = 'app/shuffle/ShuffleClient.tsx';
let content = readFileSync(file, 'utf8');

content = content.replace(
  'className="text-sm font-extrabold mt-1.5" style={{ color: \'#1A202C\' }}',
  'className="text-sm font-extrabold mt-auto pt-2" style={{ color: \'#1A202C\' }}'
);

writeFileSync(file, content, 'utf8');
console.log('Done');

// verify
const check = readFileSync(file, 'utf8');
const idx = check.indexOf('mt-auto pt-2');
console.log('mt-auto found at index:', idx);
