import {assertAssetReference} from './helpers/release-contract.mjs';
import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';

const precision=fs.readFileSync(new URL('../src/precision-face.js',import.meta.url),'utf8');
const repeat=fs.readFileSync(new URL('../src/repeat-face-previous.js',import.meta.url),'utf8');
const drawer=fs.readFileSync(new URL('../src/drawer-ui.js',import.meta.url),'utf8');

test('532 replay-generated direct commits do not overwrite last real operation',()=>{
  assert.match(precision,/if\(detail\.replay\)return;/);
});

test('532 real Inset direct commits can update precision last operation',()=>{
  assert.match(precision,/detail\.tool==='inset'.*commitOperation\('inset'/s);
});

test('532 armed Repeat always accepts a new real face value commit',()=>{
  assert.match(repeat,/armedOperation=\{tool:detail\.tool,value:Number\(detail\.value\)\}/);
  assert.doesNotMatch(repeat,/if\(!applying&&event\.detail/);
});

test('532 drawer pins updated state-sync modules',()=>{
  assertAssetReference(drawer,'precision-face.js');
  assertAssetReference(drawer,'repeat-face-previous.js');
});
