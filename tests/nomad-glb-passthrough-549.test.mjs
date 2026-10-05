import {assertAssetReference,assertShellRelease} from './helpers/release-contract.mjs';
import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';

const importer=fs.readFileSync(new URL('../src/import-mesh.js',import.meta.url),'utf8');
const exporter=fs.readFileSync(new URL('../src/export-as-panel.js',import.meta.url),'utf8');
const multi=fs.readFileSync(new URL('../src/multi-object.js',import.meta.url),'utf8');
const index=fs.readFileSync(new URL('../index.html',import.meta.url),'utf8');
const beta5=fs.readFileSync(new URL('../beta-5/index.html',import.meta.url),'utf8');

test('549 import captures opaque Nomad GLB payload',()=>{
  assert.match(importer,/function parseGLBPassthrough\(/);
  assert.match(importer,/meshExtras:cloneJSON\(mesh\.extras\|\|null\)/);
  assert.match(importer,/nodeExtras:cloneJSON\(nodeInfo\?\.node\?\.extras\|\|null\)/);
  assert.match(importer,/materials:cloneJSON\(json\.materials\|\|\[\]\)/);
  assert.match(importer,/images,/);
  assert.match(importer,/topologyBoundPreserved:true/);
});

test('549 object manager stores passthrough payload',()=>{
  assert.match(multi,/if\(options\.glbPassthrough\)object\.glbPassthrough=options\.glbPassthrough/);
  assert.match(importer,/glbPassthrough:entry\.glbPassthrough\|\|null/);
});

test('549 export reattaches safe Nomad metadata and texture bytes',()=>{
  assert.match(exporter,/function patchNomadFaceGroupGLB\(/);
  assert.match(exporter,/passthrough\?\.meshExtras\?\.nomad/);
  assert.match(exporter,/passthrough\.images/);
  assert.match(exporter,/appendBinary\(imageEntry\.data\)/);
  assert.match(exporter,/primitive\.material=materialIndex/);
  assert.match(exporter,/passthrough:object\.glbPassthrough\|\|null/);
});

test('549 runtime pins current and Beta 5 protected',()=>{
  assertAssetReference(index,'multi-object.js');
  assertAssetReference(index,'export-as-panel.js');
  assertAssetReference(index,'import-mesh.js');
  assertShellRelease(index);
  assert.match(index,/src\/multi-object-transform\.js\?v=0\.36\.1\.0/);
  assert.match(beta5,/data-release-version="0\.36\.18\.538"/);
});
