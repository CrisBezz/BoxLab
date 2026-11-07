import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';

const direct=fs.readFileSync(new URL('../src/multi-face-direct.js',import.meta.url),'utf8');
const index=fs.readFileSync(new URL('../index.html',import.meta.url),'utf8');

test('492 adds persistent FaceTap diagnostic readout',()=>{
  assert.match(direct,/faceTapDebug/);
  assert.match(direct,/FaceTap •/);
});

test('492 records staged selection state around native toggle',()=>{
  assert.match(direct,/up hit=\$\{p\.hit\} ok=\$\{ok\} before=/);
  assert.match(direct,/queueMicrotask\(\(\)=>setFaceTapDebug/);
  assert.match(direct,/requestAnimationFrame\(\(\)=>setFaceTapDebug/);
});

test('492 keeps current native picker/toggle behavior unchanged',()=>{
  assert.match(direct,/bridge\(\)\?\.toggle\?\.\('face',p\.hit\)/);
  assert.match(direct,/const hit=picker\('face',event\)\?\.index/);
});

test('492 cache hop and protected pins',()=>{
  assert.match(index,/src\/multi-face-direct\.js\?v=0\.36\.18\.492/);
  assert.match(index,/src\/main\.js\?v=0\.36\.18\.491/);
  assert.match(index,/src\/rotate-transform\.js\?v=0\.36\.18\.483/);
  assert.match(index,/src\/multi-object-transform\.js\?v=0\.36\.1\.0/);
});
