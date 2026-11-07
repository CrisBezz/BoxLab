import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import crypto from 'node:crypto';
const root=new URL('../beta-7/',import.meta.url),freeze=JSON.parse(fs.readFileSync(new URL('freeze.json',root))),assets=JSON.parse(fs.readFileSync(new URL('runtime-assets.json',root)));
test('Beta7 immutable accepted runtime assets and release markers match freeze record',()=>{
 assert.equal(freeze.version,'0.36.18.807');assert.match(freeze.source_commit,/^[a-f0-9]{40}$/);
 assert.equal(Object.keys(assets).length,303);
 for(const [path,hash] of Object.entries(assets))assert.equal(crypto.createHash('sha256').update(fs.readFileSync(new URL(path,root))).digest('hex'),hash,path);
 assert.equal(JSON.parse(fs.readFileSync(new URL('version.json',root))).version,freeze.version);
 const html=fs.readFileSync(new URL('index.html',root),'utf8');assert.match(html,/BoxLab v0\.36\.18\.807/);assert.match(html,/data-release-version="0\.36\.18\.807"/);
});
test('Beta7 local shell/import/template references remain within frozen directory and exist',()=>{
 for(const path of Object.keys(assets).filter(p=>/\.(js|html)$/.test(p))){
  const source=fs.readFileSync(new URL(path,root),'utf8');
  const refs=path.endsWith('.html')?[...source.matchAll(/(?:src|href)="(\.[^"]+)"/g)].map(m=>({ref:m[1]})):[...source.matchAll(/(?:from\s*|import\s*\(\s*)['"](\.[^'"]+)['"]/g)].map(m=>({ref:m[1]}));
  if(path.endsWith('.js'))for(const m of source.matchAll(/new URL\(\s*['"](\.[^'"]+)['"],\s*(import.meta.url|window.location.href)/g))refs.push({ref:m[1],documentBase:m[2]==='window.location.href'});
  for(const {ref,documentBase} of refs){const url=new URL(ref,documentBase?root:new URL(path,root));url.search='';assert.ok(url.href.startsWith(root.href),path+' → '+ref);assert.ok(fs.existsSync(url),path+' → '+ref);}

 }
 const base='https://crisbezz.github.io/BoxLab/beta-7/';
 assert.equal(new URL('./version.json',base).href,base+'version.json');
 assert.equal(new URL('../version.json',base+'src/release-version.js').href,base+'version.json');
 assert.equal(JSON.parse(fs.readFileSync(new URL('manifest.webmanifest',root))).start_url,'./');
 assert.ok(!fs.readFileSync(new URL('src/pwa-install.js',root),'utf8').includes('serviceWorker.register'));
});
