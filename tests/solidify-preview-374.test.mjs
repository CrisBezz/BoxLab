import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';

const index=fs.readFileSync(new URL('../index.html',import.meta.url),'utf8');
const ui=fs.readFileSync(new URL('../src/solidify.js',import.meta.url),'utf8');
const core=fs.readFileSync(new URL('../src/solidify-core.js',import.meta.url),'utf8');

test('374 Solidify loaders are pinned to hard-fold/preview build',()=>{
  assert.match(index,/solidify\.js\?v=0\.36\.18\.374/);
  assert.match(ui,/solidify-core\.js\?v=0\.36\.18\.374/);
});

test('374 Solidify uses explicit preview then apply workflow',()=>{
  assert.match(ui,/button\.textContent='Apply Solidify'/);
  assert.match(ui,/const working=live\.clone\(\)/);
  assert.match(ui,/if\(previewArmed\)buildPreview\(\)/);
  assert.match(ui,/previewArmed=false/);
});

test('374 hard-fold core uses plane-intersection solver rather than averaged vertex normal',()=>{
  assert.match(core,/function solveOffsetVector\(/);
  assert.match(core,/const denom=1\+c/);
  assert.match(core,/matrix\.clone\(\)\.invert\(\)/);
  assert.doesNotMatch(core,/addScaledVector\(analysis\.normals\[i\]/);
});
