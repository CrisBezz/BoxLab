import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';

const index=fs.readFileSync(new URL('../index.html',import.meta.url),'utf8');
const precision=fs.readFileSync(new URL('../src/precision-face.js',import.meta.url),'utf8');
const repeat=fs.readFileSync(new URL('../src/repeat-face-previous.js',import.meta.url),'utf8');

test('327 live app loads Precision Face before Repeat Previous',()=>{
  const multi=index.indexOf('multi-face-direct.js?v=0.36.18.242');
  const p=index.indexOf('precision-face.js?v=0.36.18.327');
  const r=index.indexOf('repeat-face-previous.js?v=0.36.18.327');
  assert.ok(multi>=0&&p>multi&&r>p);
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
