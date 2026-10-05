import {assertAssetReference} from './helpers/release-contract.mjs';
import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';

const index=fs.readFileSync(new URL('../index.html',import.meta.url),'utf8');
const ui=fs.readFileSync(new URL('../src/solidify.js',import.meta.url),'utf8');
const core=fs.readFileSync(new URL('../src/solidify-core.js',import.meta.url),'utf8');
const version=JSON.parse(fs.readFileSync(new URL('../version.json',import.meta.url),'utf8')).version;

test('Solidify live wrapper uses its reviewed runtime cache pin while hard-fold core stays pinned',()=>{
  const wrapper=index.match(/solidify\.js\?v=([^"]+)/)?.[1];
  assertAssetReference(index,'solidify.js');
  assertAssetReference(ui,'solidify-core.js');
});

test('374 Solidify uses explicit preview then apply workflow',()=>{
  assert.match(ui,/solidifyApplyBtn/);
  assert.match(ui,/previewEvaluatedSource\(live\)/);
  assert.match(ui,/previewArmed=false/);
  assert.match(ui,/applyButton\?\.addEventListener\('click'/);
});

test('374 hard-fold core uses plane-intersection solver rather than averaged vertex normal',()=>{
  assert.match(core,/function solveOffsetVector\(/);
  assert.match(core,/const denom=1\+c/);
  assert.match(core,/matrix\.clone\(\)\.invert\(\)/);
  assert.doesNotMatch(core,/addScaledVector\(analysis\.normals\[i\]/);
});
