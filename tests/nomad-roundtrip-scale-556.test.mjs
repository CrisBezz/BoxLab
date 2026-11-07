import {assertAssetReference,assertShellRelease} from './helpers/release-contract.mjs';
import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';

const importer=fs.readFileSync(new URL('../src/import-mesh.js',import.meta.url),'utf8');
const exporter=fs.readFileSync(new URL('../src/export-as-panel.js',import.meta.url),'utf8');
const index=fs.readFileSync(new URL('../index.html',import.meta.url),'utf8');

test('556 records import fit transform',()=>{
  assert.match(importer,/const importFit=fitMeshesToBoxLabScale\(meshes\)/);
  assert.match(importer,/passthrough\.boxlabImportFit/);
  assert.match(importer,/return \{scale,center\}/);
});

test('556 restores original position scale on Base GLB export',()=>{
  assert.match(exporter,/px=px\/fitScale/);
  assert.match(exporter,/py=py\/fitScale/);
  assert.match(exporter,/pz=pz\/fitScale/);
});

test('556 restores morph delta scale on export',()=>{
  assert.match(exporter,/const inv=restoreFit\?1\/fitScale:1/);
  assert.match(exporter,/morphPositionArrays\[targetIndex\]\.push\(delta\[0\]\*inv/);
});

test('556 runtime pins current and protected transform pin stays fixed',()=>{
  assertAssetReference(index,'import-mesh.js');
  assertAssetReference(index,'export-as-panel.js');
  assertShellRelease(index);
  assert.match(index,/src\/multi-object-transform\.js\?v=0\.36\.1\.0/);
});
