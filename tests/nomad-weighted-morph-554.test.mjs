import {assertAssetReference,assertShellRelease} from './helpers/release-contract.mjs';
import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';

const importer=fs.readFileSync(new URL('../src/import-mesh.js',import.meta.url),'utf8');
const exporter=fs.readFileSync(new URL('../src/export-as-panel.js',import.meta.url),'utf8');
const index=fs.readFileSync(new URL('../index.html',import.meta.url),'utf8');

test('554 applies active morph weights to imported editable vertices',()=>{
  assert.match(importer,/node\.morphTargetInfluences/);
  assert.match(importer,/readMorphDelta/);
  assert.match(importer,/multiplyScalar\(weight\)/);
});

test('554 keeps morph deltas in editable world scale',()=>{
  assert.match(importer,/setFromMatrix4\(matrixWorld\)/);
  assert.match(importer,/delta\[0\]\*=scale/);
  assert.match(importer,/activeMorphWeights/);
});

test('554 reconstructs undeformed base positions before GLB morph export',()=>{
  assert.match(exporter,/px-=delta\[0\]\*weight/);
  assert.match(exporter,/morphWeights:morphCompatible\?passthrough\.activeMorphWeights:null/);
  assert.match(exporter,/activeWeights/);
});

test('554 runtime pins current',()=>{
  assertAssetReference(index,'import-mesh.js');
  assertAssetReference(index,'export-as-panel.js');
  assertShellRelease(index);
  assert.match(index,/src\/multi-object-transform\.js\?v=0\.36\.1\.0/);
});
