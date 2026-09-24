import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';

test('340 Offset Loop commits through topology validation and rollback guard',()=>{
  const src=fs.readFileSync(new URL('../src/loop-offset.js',import.meta.url),'utf8');
  assert.match(src,/validateTopology\?\.\(current\.mesh,\{allowBoundary:true\}\)/);
  assert.match(src,/__boxlabTopologyGate/);
  assert.match(src,/validation failed • rolled back/);
  assert.match(src,/restore\(current\.mesh,current\.before\)/);
});

test('340 Offset Loop selects created support rails through canonical selection bridge',()=>{
  const src=fs.readFileSync(new URL('../src/loop-offset.js',import.meta.url),'utf8');
  assert.match(src,/__boxlabSelectionBridge\?\.set\?\.\('edge',ids\)/);
  assert.doesNotMatch(src,/multiToggle\.checked=false/);
  assert.doesNotMatch(src,/multiToggle\.checked=true/);
});

test('340 exact Offset Loop validates and rolls back before history commit',()=>{
  const src=fs.readFileSync(new URL('../src/precision-offset-loop.js',import.meta.url),'utf8');
  const validation=src.indexOf('validateTopology?.(m,{allowBoundary:true})');
  const history=src.indexOf('__boxlabHistory?.push(before)');
  assert.ok(validation>=0&&history>validation);
  assert.match(src,/validation failed • rolled back/);
  assert.match(src,/m\.vertices=before\.vertices\.map/);
});

test('340 canonical Edge paint selection yields while Offset Loop is armed',()=>{
  const src=fs.readFileSync(new URL('../src/edge-paint-select.js',import.meta.url),'utf8');
  assert.match(src,/__boxlabOffsetLoop\?\.isArmed\?\.\(\)/);
});

test('340 Offset Loop exposes one armed-state controller and current cache chain',()=>{
  const loop=fs.readFileSync(new URL('../src/loop-offset.js',import.meta.url),'utf8');
  const drawer=fs.readFileSync(new URL('../src/drawer-ui.js',import.meta.url),'utf8');
  const index=fs.readFileSync(new URL('../index.html',import.meta.url),'utf8');
  assert.match(loop,/__boxlabOffsetLoop=\{version:'0\.36\.18\.340',isArmed:\(\)=>armed,disarm,info\}/);
  assert.equal((drawer.match(/loop-offset\.js\?v=0\.36\.18\.340/g)||[]).length,1);
  assert.equal((drawer.match(/precision-offset-loop\.js\?v=0\.36\.18\.340/g)||[]).length,1);
  assert.match(index,/edge-paint-select\.js\?v=0\.36\.18\.461/);
  assert.match(index,/drawer-ui\.js\?v=/);
});
