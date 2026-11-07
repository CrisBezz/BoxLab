import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';

const main=fs.readFileSync(new URL('../src/main.js',import.meta.url),'utf8');
const direct=fs.readFileSync(new URL('../src/multi-face-direct.js',import.meta.url),'utf8');
const index=fs.readFileSync(new URL('../index.html',import.meta.url),'utf8');

test('489 selection bridge exposes exact native component picker',()=>{
  assert.match(main,/pick:\(type,event\)=>pickKind\(event,type\)/);
});

test('489 armed Face tools call native bridge picker directly',()=>{
  assert.match(direct,/const m=mesh\(\),picker=bridge\(\)\?\.pick/);
  assert.match(direct,/const hit=picker\('face',event\)\?\.index/);
});

test('489 direct controller owns both additive and subtractive tap resolution',()=>{
  assert.match(direct,/workingFaces=hitWasSelected\?\[\.\.\.selectionBefore\]:\[\.\.\.selectionBefore,hit\]/);
  assert.match(direct,/const next=d\.hitWasSelected/);
  assert.match(direct,/bridge\(\)\?\.set\?\.\('face',next\)/);
});

test('489 contains no stale native handoff state',()=>{
  assert.doesNotMatch(direct,/pendingNativePress/);
});

test('489 cache-hops only intended runtimes and preserves protected multi-object pin',()=>{
  assert.match(index,/src\/main\.js\?v=0\.36\.18\.489/);
  assert.match(index,/src\/multi-face-direct\.js\?v=0\.36\.18\.489/);
  assert.match(index,/src\/rotate-transform\.js\?v=0\.36\.18\.483/);
  assert.match(index,/src\/multi-object-transform\.js\?v=0\.36\.1\.0/);
});
