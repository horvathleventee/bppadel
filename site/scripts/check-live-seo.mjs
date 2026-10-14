import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
const base=process.argv[2];
if(!base) throw new Error('Usage: node scripts/check-live-seo.mjs https://your-deployed-domain');
const origin=new URL(base).origin;
const config=JSON.parse(await readFile('vercel.json','utf8'));
for(const r of config.redirects.filter(r=>!r.has)){
  const response=await fetch(origin+r.source,{redirect:'manual'});
  assert.equal(response.status,301,`${r.source}: expected 301, got ${response.status}`);
  const target=new URL(response.headers.get('location'),origin);
  assert.equal(target.pathname,r.destination);
  const next=await fetch(target,{redirect:'manual'});
  assert.equal(next.status,200,`${r.source}: destination is not directly 200`);
}
const missing=await fetch(origin+'/seo-check-nonexistent-page-714c/',{redirect:'manual'});
assert.equal(missing.status,404,'Unknown URLs must return 404, not homepage/soft 404');
console.log('PASS: deployed legacy redirects return 301, destinations 200, unknown URL 404.');
