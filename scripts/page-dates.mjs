// Builds lib/pageDates.json: for every page route, the date its file was first
// committed (published) and last changed (modified), read from git history.
//
//   node scripts/page-dates.mjs            all pages, history up to HEAD
//   node scripts/page-dates.mjs <rev>      history up to <rev>
//   node scripts/page-dates.mjs HEAD /a /b only refresh the listed routes
//
// The sitemap lastmod, the visible "Updated" line and Article dateModified all
// read this file, so a date here is a public claim that the page changed.
// Refresh a route only after its content was really reviewed. A site-wide
// template or markup change is NOT a reason to re-run this for every page:
// a blanket date bump teaches search engines to ignore the dates.
import { execFileSync } from 'child_process';
import fs from 'fs';
import path from 'path';

const [rev = 'HEAD', ...only] = process.argv.slice(2);
const OUT = 'lib/pageDates.json';
const files = execFileSync('git', ['ls-files', 'app'], { encoding: 'utf8' })
  .split('\n')
  .filter((f) => /(^|\/)page\.tsx$/.test(f) && !/^app\/(admin|api)\//.test(f));

const routeOf = (f) => '/' + path.posix.dirname(f).replace(/^app\/?/, '');
const existing = fs.existsSync(OUT) ? JSON.parse(fs.readFileSync(OUT, 'utf8')) : {};
const out = only.length ? { ...existing } : {};

for (const f of files) {
  const route = routeOf(f) === '/' ? '/' : routeOf(f).replace(/\/$/, '');
  if (only.length && !only.includes(route)) continue;
  const dates = execFileSync('git', ['log', rev, '--follow', '--format=%ad', '--date=short', '--', f], { encoding: 'utf8' })
    .split('\n')
    .filter(Boolean);
  if (!dates.length) continue; // not committed yet
  out[route] = { published: dates[dates.length - 1], modified: dates[0] };
}

const sorted = Object.fromEntries(Object.entries(out).sort(([a], [b]) => a.localeCompare(b)));
fs.writeFileSync(OUT, JSON.stringify(sorted, null, 2) + '\n');
console.log(`${OUT}: ${Object.keys(sorted).length} routes (history up to ${rev})`);
