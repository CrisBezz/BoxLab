import {assertAssetReference,assertShellRelease} from './helpers/release-contract.mjs';
import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';

const index=fs.readFileSync(new URL('../index.html',import.meta.url),'utf8');
const importer=fs.readFileSync(new URL('../src/import-mesh.js',import.meta.url),'utf8');
const exporter=fs.readFileSync(new URL('../src/export-as-panel.js',import.meta.url),'utf8');
const css=fs.readFileSync(new URL('../styles.css',import.meta.url),'utf8');
const beta5=fs.readFileSync(new URL('../beta-5/index.html',import.meta.url),'utf8');

test('540 GLB import maps primitive/material groups to BoxLab faceGroups',()=>{
  assert.match(importer,/decodeFaceGroup/);
  assert.match(importer,/geometry\.groups/);
  assert.match(importer,/faceGroups\.push\(groupForStart\(i\)\)/);
});

test('540 GLB export emits one mesh with material groups per facegroup',()=>{
  assert.match(exporter,/geometry\.addGroup\(group\.start,group\.count,index\)/);
  assert.match(exporter,/boxlabFaceGroup/);
  assert.match(exporter,/new THREE\.Mesh\(geometry,materials\.length===1\?materials\[0\]:materials\)/);
});

test('540 File menu sizing matches general BoxLab controls',()=>{
  assert.match(css,/export-file-name.*font-size:14px/s);
  assert.match(css,/export-choice button\{[^}]*min-height:38px[^}]*font-size:13px/);
  assert.match(css,/top-file-content button\{min-height:38px;font-size:13px\}/);
});

test('540 runtime pins current and Beta 5 remains frozen',()=>{
  assertAssetReference(index,'import-mesh.js');
  assertAssetReference(index,'export-as-panel.js');
  assertShellRelease(index);
  assert.match(index,/src\/multi-object-transform\.js\?v=0\.36\.1\.0/);
  assert.match(beta5,/data-release-version="0\.36\.18\.538"/);
  assert.doesNotMatch(beta5,/export-as-panel\.js/);
});
