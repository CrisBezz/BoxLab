import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';

const rotate=fs.readFileSync(new URL('../src/rotate-transform.js',import.meta.url),'utf8');
const index=fs.readFileSync(new URL('../index.html',import.meta.url),'utf8');

test('480 Face Rotate starts before the canvas Pencil orbit gate',()=>{
  assert.match(rotate,/document\.addEventListener\('pointerdown', event => \{/);
  assert.match(rotate,/event\.target!==canvas/);
  assert.doesNotMatch(rotate,/canvas\?\.addEventListener\('pointerdown'/);
});

test('480 Face Rotate gesture lifecycle stays on document capture',()=>{
  assert.match(rotate,/document\.addEventListener\('pointermove'/);
  assert.match(rotate,/document\.addEventListener\('pointerup', finish, true\)/);
  assert.match(rotate,/document\.addEventListener\('pointercancel', finish, true\)/);
});

test('480 retains authoritative Face selection bridge and single-owner split',()=>{
  assert.match(rotate,/selectedIndices\('face'\)/);
  assert.match(index,/src\/transform-upgrade\.js\?v=0\.36\.18\.479/);
  assert.match(index,/src\/rotate-transform\.js\?v=0\.36\.18\.480/);
});

test('480 protected transform core pins remain untouched',()=>{
  assert.match(index,/src\/main\.js\?v=0\.36\.18\.366/);
  assert.match(index,/src\/multi-object-transform\.js\?v=0\.36\.1\.0/);
});
