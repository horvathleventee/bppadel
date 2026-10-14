import assert from 'node:assert/strict';
import { readFile, stat } from 'node:fs/promises';
import { load } from 'cheerio';
const origin=process.env.SEO_EXPECT_ORIGIN || 'https://budapestpadel.hu';
const noindex=process.env.SEO_EXPECT_NOINDEX==='true';
const xml=load(await readFile('out/sitemap.xml','utf8'),{xmlMode:true});
const urls=xml('loc').toArray().map(el=>xml(el).text());
assert.equal(new Set(urls).size,urls.length);
const titles=new Set(),descriptions=new Set();
for(const url of urls){
  assert.equal(new URL(url).origin,origin);
  const pathname=new URL(url).pathname;
  const $=load(await readFile(`out${pathname}index.html`,'utf8'));
  const title=$('title').text(),description=$('meta[name="description"]').attr('content');
  assert.ok(title && !titles.has(title),`Duplicate/empty title: ${url}`);titles.add(title);
  assert.ok(description && !descriptions.has(description),`Duplicate/empty description: ${url}`);descriptions.add(description);
  assert.equal($('link[rel="canonical"]').attr('href'),url);
  assert.equal($('h1').length,1);
  assert.equal($('meta[property="og:url"]').attr('content'),url);
  assert.equal($('meta[property="og:image"]').attr('content'),`${origin}/images/social-cover.jpg`);
  assert.ok($('meta[name="twitter:image"]').attr('content'));
  const robots=$('meta[name="robots"]').attr('content')||'';
  assert.equal(robots.includes('noindex'),noindex,`Indexing mismatch: ${url}`);
  const schemas=$('script[type="application/ld+json"]').toArray().map(el=>JSON.parse($(el).text()));
  assert.ok(schemas.some(s=>s['@type']==='SportsActivityLocation'));
  if(pathname!=='/') assert.ok(schemas.some(s=>s['@type']==='BreadcrumbList'));
}
const robots=await readFile('out/robots.txt','utf8');
assert.equal(/^Disallow: \/$/m.test(robots),noindex);
assert.ok(robots.includes(`Sitemap: ${origin}/sitemap.xml`));
const config=JSON.parse(await readFile('vercel.json','utf8'));
for(const rule of config.redirects){
  assert.equal(rule.statusCode,301);
  assert.ok(!('permanent' in rule));
  if(rule.has) continue;
  assert.notEqual(rule.source,rule.destination);
  assert.ok(!config.redirects.some(r=>!r.has && r.source===rule.destination),`Redirect chain: ${rule.source}`);
  const file='out'+rule.destination+(rule.destination.endsWith('/')?'index.html':'');
  assert.ok((await stat(file)).isFile(),`Missing redirect target: ${rule.destination}`);
}
const legacy=JSON.parse(await readFile('docs/legacy-url-audit.json','utf8'));
for(const row of legacy.urls){
  if(row.action==='keep') assert.ok(urls.includes(origin+row.path));
  else assert.ok(config.redirects.some(r=>r.source===row.path&&r.destination===row.newPath));
}
console.log(`PASS SEO: ${urls.length} unique titles, descriptions, canonicals, OG images, schema, sitemap, robots; ${config.redirects.length} Vercel 301 definitions. Runtime Vercel responses require a deployed domain.`);
