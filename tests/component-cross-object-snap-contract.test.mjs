import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';

const main=fs.readFileSync(new URL('../src/main.js',import.meta.url),'utf8');
const index=fs.readFileSync(new URL('../index.html',import.meta.url),'utf8');

test('325 component Move runtime uses shared cross-object snap core',()=>{
  assert.match(main,/nearestCrossObjectSnap/);
  assert.match(main,/componentSnapDelta/);
  assert.match(main,/function crossObjectMoveSnap/);
  assert.match(main,/inferenceSnapEnabled/);
});

test('326 component Move snap stays out of Object mode and keeps protected transform pin',()=>{
  assert.match(main,/sel\?\.type==='object'\)return null/);
  assert.match(index,/main\.js\?v=0\.36\.18\.464/);
  assert.match(index,/multi-object-transform\.js\?v=0\.36\.1\.0/);
});
