import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';

const index=fs.readFileSync(new URL('../index.html',import.meta.url),'utf8');
const ui=fs.readFileSync(new URL('../src/linear-array.js',import.meta.url),'utf8');

test('383 Array direct spacing runtime is loaded',()=>{
  assert.match(index,/linear-array\.js\?v=0\.36\.18\.383/);
  assert.match(index,/data-release-version="0\.36\.18\.383"/);
});

test('383 preview children carry array index for grab-correct spacing',()=>{
  assert.match(ui,/fill\.userData\.arrayIndex=i/);
  assert.match(ui,/wire\.userData\.arrayIndex=i/);
  assert.match(ui,/worldDelta\/Math\.max\(1,spacingDrag\.arrayIndex\)/);
});

test('383 direct spacing projects current world axis and ray-picks preview',()=>{
  assert.match(ui,/function projectedArrayAxis\(point\)/);
  assert.match(ui,/axisVector\(\)/);
  assert.match(ui,/intersectObject\(preview,true\)/);
});

test('383 direct spacing pauses orbit only during drag and keeps slider synchronized',()=>{
  assert.match(ui,/if\(ctl\)ctl\.enabled=false/);
  assert.match(ui,/if\(ctl\)ctl\.enabled=spacingDrag\.controlsWereEnabled/);
  assert.match(ui,/setSpacing\(/);
  assert.match(ui,/spacingInput\.value=/);
});

test('383 direct spacing has no history commit path',()=>{
  const drag=ui.slice(ui.indexOf('function beginSpacingDrag'),ui.indexOf('function installPenRange'));
  assert.doesNotMatch(drag,/checkpoint|capture\?\.\(/);
});
