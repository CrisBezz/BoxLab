import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';

const repeat=fs.readFileSync(new URL('../src/repeat-face-previous.js',import.meta.url),'utf8');
const drawer=fs.readFileSync(new URL('../src/drawer-ui.js',import.meta.url),'utf8');

test('533 replay cleanup never rewrites armed operation',()=>{
  assert.doesNotMatch(repeat,/setTimeout\(\(\)=>\{applying=false;armedOperation=op;/);
  assert.match(repeat,/setTimeout\(\(\)=>\{applying=false;forcePaintBurst\(\);\},0\);/);
});

test('533 real Face commits remain sole source of armed operation replacement',()=>{
  assert.match(repeat,/armedOperation=\{tool:detail\.tool,value:Number\(detail\.value\)\}/);
});

test('533 runtime loads updated Repeat module',()=>{
  assert.match(drawer,/repeat-face-previous\.js\?v=0\.36\.18\.533/);
});
