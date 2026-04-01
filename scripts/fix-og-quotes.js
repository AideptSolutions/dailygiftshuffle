const fs = require('fs');
const path = require('path');

function walk(dir) {
  const results = [];
  for (const f of fs.readdirSync(dir)) {
    const full = path.join(dir, f);
    if (fs.statSync(full).isDirectory() && !['node_modules','.next'].includes(f)) walk(full).forEach(r => results.push(r));
    else if (f === 'page.tsx') results.push(full);
  }
  return results;
}

const files = walk(path.join(__dirname, '..', 'app'));
let fixed = 0;

for (const f of files) {
  let content = fs.readFileSync(f, 'utf8');
  // Replace single-quoted OG URL strings that contain apostrophes with backtick template literals
  const updated = content.replace(
    /url: '(https:\/\/www\.thegiftshuffle\.com\/api\/og\?title=[^']*)'/g,
    'url: `$1`'
  );
  if (updated !== content) {
    fs.writeFileSync(f, updated, 'utf8');
    console.log('Fixed:', path.relative(process.cwd(), f));
    fixed++;
  }
}
console.log(`\nFixed ${fixed} files.`);
