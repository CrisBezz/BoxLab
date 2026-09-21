import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
const index=fs.readFileSync(new URL('../index.html',import.meta.url),'utf8');
const primitive=fs.readFileSync(new URL('../src/primitive-ui.js',import.meta.url),'utf8');
const ui=fs.readFileSync(new URL('../src/sweep-path.js',import.meta.url),'utf8');
const version=JSON.parse(fs.readFileSync(new URL('../version.json',import.meta.url),'utf8')).version;

test('Sweep Path is wired into Add and current runtime',()=>{
  const wrapper=index.match(/sweep-path\.js\?v=([^"]+)/)?.[1];
  assert.equal(wrapper,version);
  assert.match(primitive,/Sweep Path/);
  assert.match(primitive,/boxlab-add-sweep-path/);
  assert.match(ui,new RegExp("const VERSION='"+version.replaceAll('.','\\.')+"'"));
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
