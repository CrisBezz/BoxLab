import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';

const direct=fs.readFileSync(new URL('../src/multi-face-direct.js',import.meta.url),'utf8');
const index=fs.readFileSync(new URL('../index.html',import.meta.url),'utf8');

test('484 remembers the selected face used to start the direct gesture',()=>{
  assert.match(direct,/hitFaceIndex:hit/);
});

test('484 tap on an already-selected face removes only that face',()=>{
  assert.match(direct,/if\(event\.type==='pointerup'&&!d\.changed\)/);
  assert.match(direct,/const remaining=d\.faces\.filter\(index=>index!==d\.hitFaceIndex\)/);
  assert.match(direct,/bridge\(\)\?\.set\?\.\('face',remaining\)/);
});

test('484 drag path remains unchanged and separate from tap toggle',()=>{
  assert.match(direct,/else if\(event\.type==='pointerup'&&d\.changed&&d\.preview&&!d\.blocked\)/);
  assert.match(direct,/if\(d\.tool==='extrude'&&d\.throughPlan\)/);
  assert.match(direct,/else if\(d\.tool==='extrude'\)/);
});

test('484 cache-hops only Face direct interaction runtime and preserves protected core',()=>{
  assert.match(index,/src\/multi-face-direct\.js\?v=0\.36\.18\.484/);
  assert.match(index,/src\/main\.js\?v=0\.36\.18\.366/);
  assert.match(index,/src\/multi-object-transform\.js\?v=0\.36\.1\.0/);
  assert.match(index,/src\/rotate-transform\.js\?v=0\.36\.18\.483/);
});
