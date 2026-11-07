import {assertAssetReference} from './helpers/release-contract.mjs';
import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';

const direct=fs.readFileSync(new URL('../src/multi-face-direct.js',import.meta.url),'utf8');
const repeat=fs.readFileSync(new URL('../src/repeat-face-previous.js',import.meta.url),'utf8');
const drawer=fs.readFileSync(new URL('../src/drawer-ui.js',import.meta.url),'utf8');
const index=fs.readFileSync(new URL('../index.html',import.meta.url),'utf8');

test('531 Face direct exposes transactional replay API',()=>{
  assert.match(direct,/function replayFaceOperation\(tool,value,faceIndex\)/);
  assert.match(direct,/replay:replayFaceOperation/);
});

test('531 Repeat routes through direct replay and no longer uses precision applyFor',()=>{
  assert.match(repeat,/const direct=globalThis\.__boxlabFaceDirect/);
  assert.match(repeat,/direct\.replay\(op\.tool,op\.value,faceIndex\)===true/);
  assert.doesNotMatch(repeat,/api\.applyFor\(op\.tool,op\.value\)/);
});

test('531 direct Repeat Extrude is transactional and Through-safe',()=>{
  assert.match(direct,/const before=m\.clone\(\)/);
  assert.match(direct,/if\(distance<0\)/);
  assert.match(direct,/if\(contact\.mode!=='extrude'\)return false/);
  assert.match(direct,/gateClosedEdit\(before,m\)/);
  assert.match(direct,/__boxlabHistory\?\.push\(before\)/);
});

test('531 direct Repeat Inset converts stored distance on target Face',()=>{
  assert.match(direct,/const amount=THREE\.MathUtils\.clamp\(Math\.abs\(distance\)\/\(minEdge\*\.5\),\.01,\.95\)/);
  assert.match(direct,/m\.insetFaceRegions\?\.\(\[faceIndex\],amount\)/);
});

test('531 runtime pins current replay modules and protected transform',()=>{
  assertAssetReference(index,'multi-face-direct.js');
  assertAssetReference(index,'drawer-ui.js');
  assertAssetReference(drawer,'repeat-face-previous.js');
  assert.match(index,/src\/multi-object-transform\.js\?v=0\.36\.1\.0/);
});
