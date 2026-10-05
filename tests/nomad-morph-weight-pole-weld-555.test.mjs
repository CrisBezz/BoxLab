import {assertAssetReference,assertShellRelease} from './helpers/release-contract.mjs';
import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';

const importer=fs.readFileSync(new URL('../src/import-mesh.js',import.meta.url),'utf8');
const exporter=fs.readFileSync(new URL('../src/export-as-panel.js',import.meta.url),'utf8');
const index=fs.readFileSync(new URL('../index.html',import.meta.url),'utf8');

test('555 records original morph weight location',()=>{
  assert.match(importer,/morphWeightSource:Array\.isArray\(nodeInfo\?\.node\?\.weights\)\?'node'/);
});

test('555 restores morph weights in one location only',()=>{
  assert.match(exporter,/const weightSource=passthrough\?\.morphWeightSource\|\|'none'/);
  assert.match(exporter,/if\(weightSource==='node'\)/);
  assert.match(exporter,/delete mesh\.weights/);
  assert.match(exporter,/if\(weightSource==='mesh'\)/);
  assert.match(exporter,/delete node\.weights/);
});

test('555 welds high-valence UV singularities while preserving ordinary seams',()=>{
  assert.match(exporter,/const collapseUVVertices=new Set\(\)/);
  assert.match(exporter,/if\(set\.size>=3\)collapseUVVertices\.add\(index\)/);
  assert.match(exporter,/if\(uvComplete&&!collapseUV\)parts\.push\('u:'/);
  assert.match(exporter,/if\(tangentComplete&&!collapseUV\)parts\.push\('t:'/);
});

test('555 runtime pins current',()=>{
  assertAssetReference(index,'import-mesh.js');
  assertAssetReference(index,'export-as-panel.js');
  assertShellRelease(index);
  assert.match(index,/src\/multi-object-transform\.js\?v=0\.36\.1\.0/);
});
