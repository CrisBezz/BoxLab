import {checkImportUV,checkExportUV} from './helpers/glb-owner-checks.mjs';
import {assertAssetReference,assertShellRelease} from './helpers/release-contract.mjs';
import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';

const importer=fs.readFileSync(new URL('../src/import-mesh.js',import.meta.url),'utf8');
const exporter=fs.readFileSync(new URL('../src/export-as-panel.js',import.meta.url),'utf8');
const index=fs.readFileSync(new URL('../index.html',import.meta.url),'utf8');
const beta5=fs.readFileSync(new URL('../beta-5/index.html',import.meta.url),'utf8');

test('550 captures GLB UVs per face corner',()=>{
  checkImportUV();
});

test('550 stores topology signature after import reconstruction',()=>{
  assert.match(importer,/function topologySignature\(mesh\)/);
  assert.match(importer,/passthrough\.uvTopologySignature=topologySignature\(next\)/);
});

test('550 restores UV attribute only when topology still matches',async ()=>{
  await checkExportUV();
});

test('550 runtime pins current and Beta 5 protected',()=>{
  assertAssetReference(index,'export-as-panel.js');
  assertAssetReference(index,'import-mesh.js');
  assertShellRelease(index);
  assert.match(index,/src\/multi-object-transform\.js\?v=0\.36\.1\.0/);
  assert.match(beta5,/data-release-version="0\.36\.18\.538"/);
});
