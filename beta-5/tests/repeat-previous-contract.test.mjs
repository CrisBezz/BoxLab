import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';

const index=fs.readFileSync(new URL('../index.html',import.meta.url),'utf8');
const drawer=fs.readFileSync(new URL('../src/drawer-ui.js',import.meta.url),'utf8');
const precision=fs.readFileSync(new URL('../src/precision-face.js',import.meta.url),'utf8');
const repeat=fs.readFileSync(new URL('../src/repeat-face-previous.js',import.meta.url),'utf8');

test('328 Repeat Previous has one authoritative loader through drawer UI',()=>{
  assert.doesNotMatch(index,/precision-face\.js\?v=/);
  assert.doesNotMatch(index,/repeat-face-previous\.js\?v=/);
  assert.match(drawer,/import\('\.\/precision-face\.js\?v=0\.36\.18\.327'\)/);
  assert.match(drawer,/import\('\.\/repeat-face-previous\.js\?v=0\.36\.18\.327'\)/);
  assert.equal((drawer.match(/precision-face\.js\?v=/g)||[]).length,1);
  assert.equal((drawer.match(/repeat-face-previous\.js\?v=/g)||[]).length,1);
});

test('327 precision Face exposes exact replay API and committed last operation',()=>{
  assert.match(precision,/function commitOperation\(tool,value,source='drag'\)/);
  assert.match(precision,/globalThis\.__boxlabLastFaceOperation=saved/);
  assert.match(precision,/function applyFor\(tool,value\)/);
  assert.match(precision,/window\.__boxlabPrecisionFace=\{version:'0\.36\.18\.327'/);
});

test('327 Repeat Previous replays only Extrude or Inset committed values',()=>{
  assert.match(repeat,/direct\.tool==='extrude'\|\|direct\.tool==='inset'/);
  assert.match(repeat,/api\.applyFor\(op\.tool,op\.value\)/);
  assert.match(repeat,/globalThis\.__boxlabRepeatFacePrevious=\{version:'0\.36\.18\.327'/);
});

test('327 Through and rollback states remain excluded from repeat capture',()=>{
  assert.match(precision,/THROUGH READY\|Extrude Through\|BLOCKED\|rollback/i);
  assert.match(precision,/gesture\.repeatable=false/);
});
