import {assertFaceContext} from './helpers/face-layout-runtime.mjs';
import {assertAssetReference} from './helpers/release-contract.mjs';
import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';

const ui=fs.readFileSync(new URL('../src/tool-session-ui.js',import.meta.url),'utf8');
const index=fs.readFileSync(new URL('../index.html',import.meta.url),'utf8');

test('503 installs Face contextual controls directly after primary Face row',()=>{
  assertFaceContext();
});

test('503 keeps Face contextual controls hidden until Extrude or Inset is armed',()=>{
  assert.match(ui,/#precisionFaceRow,/);
  assert.match(ui,/#repeatFacePreviousRow\{display:none!important\}/);
  assert.match(ui,/:has\(#extrudeBtn\.active\) #precisionFaceRow/);
  assert.match(ui,/:has\(#insetBtn\.active\) #precisionFaceRow/);
});

test('503 preserves frozen Face and Rotate runtime pins',()=>{
  assertAssetReference(index,'tool-session-ui.js');
  assertAssetReference(index,'multi-face-direct.js');
  assertAssetReference(index,'main.js');
  assertAssetReference(index,'rotate-transform.js');
  assert.match(index,/src\/multi-object-transform\.js\?v=0\.36\.1\.0/);
});
