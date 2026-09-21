import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
const index=fs.readFileSync(new URL('../index.html',import.meta.url),'utf8');
const primitive=fs.readFileSync(new URL('../src/primitive-ui.js',import.meta.url),'utf8');
const ui=fs.readFileSync(new URL('../src/sweep-path.js',import.meta.url),'utf8');

test('393 Sweep Path is wired into Add and current runtime',()=>{
  assert.match(index,/sweep-path\.js\?v=0\.36\.18\.393/);
  assert.match(primitive,/Sweep Path/);
  assert.match(primitive,/boxlab-add-sweep-path/);
  assert.match(ui,/const VERSION='0\.36\.18\.393'/);
});
test('393 Sweep Path preserves touch navigation ownership',()=>{
  assert.match(ui,/event\.pointerType==='touch'/);
  assert.match(ui,/Pencil\/mouse draws • touch still orbits\/pans\/zooms/);
});
test('393 Apply returns to authoritative single selection and Boolean tint sync',()=>{
  assert.match(ui,/__boxlabObjectSelection\?\.single/);
  assert.match(ui,/__boxlabBooleanUX\?\.sync/);
});
test('393 Sweep exposes radius sides caps and non-destructive preview',()=>{
  assert.match(ui,/sweepRadius/);
  assert.match(ui,/sweepSides/);
  assert.match(ui,/sweepCapsBtn/);
  assert.match(ui,/buildSweepTube/);
  assert.match(ui,/Apply Sweep/);
});
