const https = require('https');
const fs = require('fs');

const token = JSON.parse(fs.readFileSync(
  process.env.APPDATA + '\\com.vercel.cli\\Data\\auth.json', 'utf8'
)).token;

// Get project ID
function request(method, path, body) {
  return new Promise((resolve, reject) => {
    const data = body ? JSON.stringify(body) : null;
    const req = https.request({
      hostname: 'api.vercel.com',
      path,
      method,
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
        ...(data ? { 'Content-Length': Buffer.byteLength(data) } : {}),
      }
    }, res => {
      let d = '';
      res.on('data', c => d += c);
      res.on('end', () => resolve({ status: res.statusCode, body: JSON.parse(d) }));
    });
    req.on('error', reject);
    if (data) req.write(data);
    req.end();
  });
}

async function run() {
  // Find project
  const projects = await request('GET', '/v9/projects?limit=20');
  const proj = projects.body.projects.find(p => p.name === 'dailygiftshuffle');
  if (!proj) { console.error('Project not found'); return; }
  console.log('Project ID:', proj.id);

  // Add env var for all environments
  const r = await request('POST', `/v10/projects/${proj.id}/env`, {
    key: 'GOOGLE_AI_API_KEY',
    value: 'AIzaSyAuxqKUI3zww13W9khbkn0xg_Wyt-6PBB4',
    type: 'encrypted',
    target: ['production', 'preview', 'development'],
  });
  console.log('Add env result:', r.status, r.body?.error || 'OK');
}

run().catch(console.error);
