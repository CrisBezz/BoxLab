import {assertFaceRows,assertFaceContext,assertFaceDiagnostics,assertFaceJoin} from './helpers/face-layout-runtime.mjs';
import {assertAssetReference} from './helpers/release-contract.mjs';
import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';

const drawer=fs.readFileSync(new URL('../src/drawer-ui.js',import.meta.url),'utf8');
const index=fs.readFileSync(new URL('../index.html',import.meta.url),'utf8');

test('505 creates current six compact Face modelling rows',()=>{
  assertFaceRows();
});

test('505 keeps armed contextual controls between primary and next modelling row',()=>{
  assertFaceContext();
});

test('505 puts diagnostics below the entire compact modelling block',()=>{
  assertFaceDiagnostics();
});

test('505 Join Coplanar honors current third row after late startup and relocation',()=>{
  assertFaceJoin();
  assertAssetReference(drawer,'join-selected-coplanar-faces.js');
});

test('505 preserves frozen interaction pins',()=>{
  assertAssetReference(index,'tool-session-ui.js');
  assertAssetReference(index,'multi-face-direct.js');
  assertAssetReference(index,'main.js');
  assertAssetReference(index,'rotate-transform.js');
  assert.match(index,/src\/multi-object-transform\.js\?v=0\.36\.1\.0/);
});
