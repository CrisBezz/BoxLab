import {assertAssetReference} from './helpers/release-contract.mjs';
import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {assertEdgePrecision} from './helpers/edge-layout-runtime.mjs';

const sweep=fs.readFileSync(new URL('../src/sweep-path.js',import.meta.url),'utf8');
const bevel=fs.readFileSync(new URL('../src/precision-bevel.js',import.meta.url),'utf8');
const drawer=fs.readFileSync(new URL('../src/drawer-ui.js',import.meta.url),'utf8');
const index=fs.readFileSync(new URL('../index.html',import.meta.url),'utf8');

test('472 Sweep transaction state is declared before Add uses it',()=>{
  assert.match(sweep,/sweepBeforeScene=null,sweepUndoEntries=null,sweepRedoEntries=null/);
  assert.match(sweep,/sweepBeforeScene=before/);
  assert.match(sweep,/sweepUndoEntries=Array\.isArray/);
  assert.match(sweep,/sweepRedoEntries=Array\.isArray/);
});

test('472 current Edge Bevel Exact lives inside Bevel settings and retains delegation',()=>assertEdgePrecision());

test('472 changed runtime loaders are cache-hopped',()=>{
  assertAssetReference(drawer,'precision-bevel.js');
  assertAssetReference(index,'drawer-ui.js');
  assertAssetReference(index,'sweep-path.js');
});


test('790 Edge precision contract rejects leaving Exact outside Bevel settings',()=>{
 assert.throws(()=>assertEdgePrecision((source,name)=>name==='precision-bevel.js'?source.replace('if(edgeUi&&edgeBevelOptions){','if(false){'):source),/Exact belongs inside Bevel options/);
});
