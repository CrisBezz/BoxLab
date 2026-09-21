import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';

const ui=fs.readFileSync(new URL('../src/sweep-path.js',import.meta.url),'utf8');
const index=fs.readFileSync(new URL('../index.html',import.meta.url),'utf8');
const version=JSON.parse(fs.readFileSync(new URL('../version.json',import.meta.url),'utf8')).version;

test('394 Sweep Apply forces immediate viewport rebuild',()=>{
  assert.match(ui,/disposeOverlay\(\);controls\.hidden=true;lastSignature='';document\.querySelector\('#cageToggle'\)\?\.dispatchEvent/);
});

test('394 Sweep path points support construction-local depth',()=>{
  assert.match(ui,/addScaledVector\(frame\.normal,Number\(p\.w\)\|\|0\)/);
  assert.match(ui,/w:rel\.dot\(frame\.normal\)/);
  assert.match(ui,/Number\(p\.w\|\|0\)\.toFixed/);
});

test('394 Geometry Snap targets visible external vertices edges and faces',()=>{
  assert.match(ui,/geometryToggle=document\.querySelector\('#inferenceSnapToggle'\)/);
  assert.match(ui,/kind:'Vertex'/);
  assert.match(ui,/kind:'Edge'/);
  assert.match(ui,/kind:'Face'/);
  assert.match(ui,/triangulatedGeometry/);
  assert.match(ui,/object\.id===activeId\|\|object\.visible===false/);
});

test('394 snapped points are not flattened back to construction plane',()=>{
  assert.match(ui,/if\(snap\)return\{local:localFor\(frame,snap\.point\),snap\}/);
  assert.match(ui,/clampToPlane:true/);
});

test('394 release wrapper follows current build',()=>{
  const wrapper=index.match(/sweep-path\.js\?v=([^"]+)/)?.[1];
  assert.equal(wrapper,version);
});
