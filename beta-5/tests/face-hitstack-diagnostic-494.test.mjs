import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';

const main=fs.readFileSync(new URL('../src/main.js',import.meta.url),'utf8');
const direct=fs.readFileSync(new URL('../src/multi-face-direct.js',import.meta.url),'utf8');
const index=fs.readFileSync(new URL('../index.html',import.meta.url),'utf8');

test('494 native picker can expose ordered hit stack',()=>{
  assert.match(main,/function pickKindHits\(event,kind\)/);
  assert.match(main,/pickHits:\(type,event\)=>pickKindHits\(event,type\)/);
});

test('494 FaceTap trace includes face indices and distances',()=>{
  assert.match(direct,/stack=hits\.map\(item=>/);
  assert.match(direct,/stack=\[\$\{stack\}\]/);
});

test('494 keeps native primary pick and toggle behavior',()=>{
  assert.match(direct,/const hit=picker\('face',event\)\?\.index/);
  assert.match(direct,/bridge\(\)\?\.toggle\?\.\('face',p\.hit\)/);
});

test('494 cache hops only diagnostic runtimes and protects multi-object pin',()=>{
  assert.match(index,/src\/main\.js\?v=0\.36\.18\.494/);
  assert.match(index,/src\/multi-face-direct\.js\?v=0\.36\.18\.494/);
  assert.match(index,/src\/multi-object-transform\.js\?v=0\.36\.1\.0/);
});
