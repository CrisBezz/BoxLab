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

test('543 import records round-trip object and facegroup details',()=>{
  assert.match(importer,/importedFaceGroups/);
  assert.match(importer,/lastImport=\{objects:meshes\.length,faceGroups:groupCount,details:perObject\}/);
});

test('543 runtime pins current and Beta 5 stays frozen',()=>{
  assert.match(index,/src\/export-as-panel\.js\?v=0\.36\.18\.543/);
  assert.match(index,/src\/import-mesh\.js\?v=0\.36\.18\.543/);
  assert.match(index,/data-release-version="0\.36\.18\.543"/);
  assert.match(index,/src\/multi-object-transform\.js\?v=0\.36\.1\.0/);
  assert.match(beta5,/data-release-version="0\.36\.18\.538"/);
});
