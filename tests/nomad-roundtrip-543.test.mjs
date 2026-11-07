import {checkImportDiagnostics} from './helpers/glb-owner-checks.mjs';
import {assertAssetReference,assertShellRelease} from './helpers/release-contract.mjs';
import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';

const index=fs.readFileSync(new URL('../index.html',import.meta.url),'utf8');
const exporter=fs.readFileSync(new URL('../src/export-as-panel.js',import.meta.url),'utf8');
const importer=fs.readFileSync(new URL('../src/import-mesh.js',import.meta.url),'utf8');
const beta5=fs.readFileSync(new URL('../beta-5/index.html',import.meta.url),'utf8');

test('543 GLB exporter performs in-memory structural verification',()=>{
  assert.match(exporter,/import \{GLTFLoader\}/);
  assert.match(exporter,/async function verifyGLB\(/);
  assert.match(exporter,/boxlabRoundTripObject=true/);
  assert.match(exporter,/lastExportVerification=report/);
  assert.match(exporter,/GLB self-check failed/);
});

test('543 GLB verifier checks logical objects and primitive group slots',()=>{
  assert.match(exporter,/node\.userData\?\.boxlabRoundTripObject!==true/);
  assert.match(exporter,/part\.geometry\.groups\?\.length/);
  assert.match(exporter,/expectedGroupSlots/);
});

test('543 import records round-trip object and facegroup details',async ()=>{
  await checkImportDiagnostics();
});

test('543 runtime pins current and Beta 5 stays frozen',()=>{
  assertAssetReference(index,'export-as-panel.js');
  assertAssetReference(index,'import-mesh.js');
  assertShellRelease(index);
  assert.match(index,/src\/multi-object-transform\.js\?v=0\.36\.1\.0/);
  assert.match(beta5,/data-release-version="0\.36\.18\.538"/);
});
