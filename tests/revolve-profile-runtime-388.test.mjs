import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';

const index=fs.readFileSync(new URL('../index.html',import.meta.url),'utf8');
const ui=fs.readFileSync(new URL('../src/revolve-profile.js',import.meta.url),'utf8');
const primitive=fs.readFileSync(new URL('../src/primitive-ui.js',import.meta.url),'utf8');

test('388 live Revolve Profile runtime is loaded and exposed from Add',()=>{
  assert.match(index,/revolve-profile\.js\?v=0\.36\.18\.388/);
  assert.match(index,/data-release-version="0\.36\.18\.388"/);
  assert.match(primitive,/Revolve Profile/);
  assert.match(primitive,/boxlab-add-revolve-profile/);
});

test('388 construction plane left edge is the explicit axis',()=>{
  assert.match(ui,/axisOrigin:p0\.clone\(\),axisDirection:v\.clone\(\)/);
  assert.match(ui,/lineBetween\(frame\.p0,frame\.p3/);
  assert.match(ui,/0x4f86ff/);
});

test('388 profile points use normalized plane UV and snap to axis',()=>{
  assert.match(ui,/profile.*points.*u.*v/is);
  assert.match(ui,/rel\.dot\(frame\.u\)\/frame\.width/);
  assert.match(ui,/rel\.dot\(frame\.v\)\/frame\.height/);
  assert.match(ui,/if\(u<0\.025\)u=0/);
});

test('388 direct profile point drag rebuilds live preview',()=>{
  assert.match(ui,/nearestProfilePoint/);
  assert.match(ui,/pointermove/);
  assert.match(ui,/meta\.points\[drag\.index\]=planeUV/);
  assert.match(ui,/buildRevolveFromPoints/);
  assert.match(ui,/MeshBasicMaterial\(\{color:0x62d8ff/);
});

test('388 construction has Edit, Undo Point, Clear, Segments and Apply',()=>{
  for(const token of ['Edit Profile','Undo Point','Clear','Segments','Apply Revolve'])assert.match(ui,new RegExp(token));
  assert.match(ui,/min="6" max="64"/);
  assert.match(ui,/function installPenRange/);
});

test('388 Apply uses one mesh-history commit and ordinary mesh replacement',()=>{
  assert.match(ui,/__boxlabHistory\?\.push\(before\)/);
  assert.match(ui,/replaceMesh\(mesh,result\.mesh\)/);
  assert.match(ui,/manager\(\)\?\.saveActive\?\.\(\)/);
});
