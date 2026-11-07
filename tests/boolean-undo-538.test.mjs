import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {assertAssetReference} from './helpers/release-contract.mjs';

const boolean=fs.readFileSync(new URL('../src/boolean-prototype.js',import.meta.url),'utf8');
const index=fs.readFileSync(new URL('../index.html',import.meta.url),'utf8');

test('538 Boolean captures scene before result creation',()=>{
  assert.match(boolean,/const beforeScene=globalThis\.__boxlabObjectHistory\?\.capture\?\.\(\)\|\|null/);
});

test('538 Boolean checkpoints captured scene only after result activation',()=>{
  const add=boolean.indexOf('manager()?.addMesh?.(result.mesh');
  const checkpoint=boolean.indexOf('checkpointSnapshot?.(beforeScene)');
  assert.ok(add>=0&&checkpoint>add);
});

test('538 Boolean no longer checkpoints current active history before addMesh',()=>{
  const apply=boolean.slice(boolean.indexOf('function apply(operation)'),boolean.indexOf('ensureUI();'));
  assert.doesNotMatch(apply,/__boxlabObjectHistory\?\.checkpoint\?\.\(\)/);
});

test('538 runtime pin current and protected transform unchanged',()=>{
  assertAssetReference(index,'boolean-prototype.js');
  assert.match(index,/src\/multi-object-transform\.js\?v=0\.36\.1\.0/);
});
