import {dragWorkingSet,explicitResets,selectedPriority,sequentialScope,tapToggle} from './helpers/armed-face-behavior.mjs';
import {assertAssetReference} from './helpers/release-contract.mjs';
import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';

const index=fs.readFileSync(new URL('../index.html',import.meta.url),'utf8');

test('523 current hit-stack continuation protects Inset and deliberate selection',()=>{
  sequentialScope();selectedPriority();explicitResets();
});

test('523 hit resolution hands off the intended modelling set',()=>{
  dragWorkingSet();tapToggle();
});

test('523 current runtime pins are protected',()=>{
  assertAssetReference(index,'multi-face-direct.js');
  assertAssetReference(index,'main.js');
  assert.match(index,/src\/multi-object-transform\.js\?v=0\.36\.1\.0/);
});
