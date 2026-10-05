import {assertAssetReference} from './helpers/release-contract.mjs';
import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';

const bevel=fs.readFileSync(new URL('../src/precision-bevel.js',import.meta.url),'utf8');
const merge=fs.readFileSync(new URL('../src/vertex-merge.js',import.meta.url),'utf8');
const drawer=fs.readFileSync(new URL('../src/drawer-ui.js',import.meta.url),'utf8');
const index=fs.readFileSync(new URL('../index.html',import.meta.url),'utf8');

test('513 Vertex Bevel exact row is placed immediately after Width',()=>{
  assert.match(bevel,/const vertexBevelOptions=document\.querySelector\('\.vertex-bevel-options'\)/);
  assert.match(bevel,/vertexBevelOptions\.insertAdjacentElement\('afterend',vertexUi\.row\)/);
  assert.match(bevel,/vertexUi\.row\.insertAdjacentElement\('afterend',vertexUi\.readout\)/);
});

test('513 Merge to First preserves selection chronology locally',()=>{
  assert.match(merge,/let selectionOrder=\[\]/);
  assert.match(merge,/selectionOrder=selectionOrder\.filter\(id=>set\.has\(id\)\)/);
  assert.match(merge,/for\(const id of ids\)if\(!selectionOrder\.includes\(id\)\)selectionOrder\.push\(id\)/);
  assert.match(merge,/mode==='first'\?orderedSelectedVertices\(\):selectedVertices\(\)/);
  assert.match(merge,/selectionOrder=\[resultVertex\]/);
});

test('513 cache-hops only Vertex-owned modules and preserves protected pins',()=>{
  assertAssetReference(drawer,'precision-bevel.js');
  assertAssetReference(drawer,'vertex-merge.js');
  assertAssetReference(index,'drawer-ui.js');
  assertAssetReference(index,'tool-session-ui.js');
  assertAssetReference(index,'main.js');
  assertAssetReference(index,'multi-face-direct.js');
  assertAssetReference(index,'rotate-transform.js');
  assert.match(index,/src\/multi-object-transform\.js\?v=0\.36\.1\.0/);
});
