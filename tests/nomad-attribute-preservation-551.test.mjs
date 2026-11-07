import {assertAssetReference,assertShellRelease} from './helpers/release-contract.mjs';
import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';

const importer=fs.readFileSync(new URL('../src/import-mesh.js',import.meta.url),'utf8');
const exporter=fs.readFileSync(new URL('../src/export-as-panel.js',import.meta.url),'utf8');
const index=fs.readFileSync(new URL('../index.html',import.meta.url),'utf8');
const beta5=fs.readFileSync(new URL('../beta-5/index.html',import.meta.url),'utf8');

test('551 captures tangent and colour attributes per face corner',()=>{
  assert.match(importer,/getAttribute\('tangent'\)/);
  assert.match(importer,/getAttribute\('color'\)/);
  assert.match(importer,/cornerTangents\.push\(/);
  assert.match(importer,/cornerColors\.push\(/);
  assert.match(importer,/passthrough\.tangentCorners=nextTangents/);
  assert.match(importer,/passthrough\.vertexColorCorners=nextColors/);
});

test('551 preserves channels through conservative quad reconstruction',()=>{
  assert.match(importer,/quadCornerChannel\(/);
  assert.match(importer,/tangentQuad=quadCornerChannel/);
  assert.match(importer,/colorQuad=quadCornerChannel/);
  assert.match(importer,/cornerValueClose\(/);
});

test('551 restores vertex colours by topology and tangents only by unchanged geometry',()=>{
  assert.match(exporter,/vertexColorTopologySignature===topology/);
  assert.match(exporter,/tangentTopologySignature===topology/);
  assert.match(exporter,/tangentGeometrySignature===geometryState/);
  assert.match(exporter,/setAttribute\('tangent',new THREE\.Float32BufferAttribute\(tangents,4\)\)/);
  assert.match(exporter,/setAttribute\('color',new THREE\.Float32BufferAttribute\(colors,colorItemSize\)\)/);
  assert.match(exporter,/tangentsRestoredCount/);
  assert.match(exporter,/vertexColorsRestoredCount/);
});

test('551 runtime pins current and Beta 5 remains protected',()=>{
  assertAssetReference(index,'export-as-panel.js');
  assertAssetReference(index,'import-mesh.js');
  assertShellRelease(index);
  assert.match(index,/src\/multi-object-transform\.js\?v=0\.36\.1\.0/);
  assert.match(beta5,/data-release-version="0\.36\.18\.538"/);
});
