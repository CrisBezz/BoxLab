import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';

const importer=fs.readFileSync(new URL('../src/import-mesh.js',import.meta.url),'utf8');
const exporter=fs.readFileSync(new URL('../src/export-as-panel.js',import.meta.url),'utf8');
const index=fs.readFileSync(new URL('../index.html',import.meta.url),'utf8');
const beta5=fs.readFileSync(new URL('../beta-5/index.html',import.meta.url),'utf8');

test('552 captures morph POSITION deltas per face corner',()=>{
  assert.match(importer,/morphPositions = source\.morphAttributes\?\.position\|\|\[\]/);
  assert.match(importer,/morphTargets\.forEach/);
  assert.match(importer,/passthrough\.morphTargets=nextMorphTargets/);
  assert.match(importer,/passthrough\.morphTopologySignature=topologySignature\(next\)/);
});

test('552 carries morph targets through conservative quad reconstruction',()=>{
  assert.match(importer,/morphQuads=\(morphTargets\|\|\[\]\)\.map/);
  assert.match(importer,/replacement\.morphs/);
  assert.match(importer,/nextMorphTargets/);
});

test('552 restores relative morph targets and preserved weights only on compatible topology',()=>{
  assert.match(exporter,/morphTopologySignature===topology/);
  assert.match(exporter,/geometry\.morphAttributes\.position=morphPositionArrays\.map/);
  assert.match(exporter,/geometry\.morphTargetsRelative=true/);
  assert.match(exporter,/mesh\.weights=cloneJSON\(passthrough\.meshWeights\)/);
  assert.match(exporter,/node\.weights=cloneJSON\(passthrough\.nodeWeights\)/);
  assert.match(exporter,/morphTargetsRestoredCount/);
});

test('552 runtime pins current and protected baselines remain intact',()=>{
  assert.match(index,/src\/export-as-panel\.js\?v=0\.36\.18\.552/);
  assert.match(index,/src\/import-mesh\.js\?v=0\.36\.18\.552/);
  assert.match(index,/data-release-version="0\.36\.18\.552"/);
  assert.match(index,/src\/multi-object-transform\.js\?v=0\.36\.1\.0/);
  assert.match(beta5,/data-release-version="0\.36\.18\.538"/);
});
