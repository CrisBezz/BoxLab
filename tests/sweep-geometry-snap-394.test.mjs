import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';

const ui=fs.readFileSync(new URL('../src/sweep-path.js',import.meta.url),'utf8');
const index=fs.readFileSync(new URL('../index.html',import.meta.url),'utf8');
const version=JSON.parse(fs.readFileSync(new URL('../version.json',import.meta.url),'utf8')).version;

test('394 Apply immediate viewport rebuild remains protected',()=>{
  assert.match(ui,/disposeOverlay\(\);(?:hotRailHit=null;)?controls\.hidden=true;endSweepSession\(\);lastSignature='';document\.querySelector\('#cageToggle'\)\?\.dispatchEvent/);
});

test('395 Draw Path stores genuine world-space 3D points',()=>{
  assert.match(ui,/pathPoints\.push\(\{x:world\.x,y:world\.y,z:world\.z\}\)/);
  assert.match(ui,/new THREE\.Vector3\(Number\(p\.x\)\|\|0,Number\(p\.y\)\|\|0,Number\(p\.z\)\|\|0\)/);
  assert.match(ui,/pointOnViewPlane/);
});

test('394 Geometry Snap targets visible external vertices edges and faces',()=>{
  assert.match(ui,/geometryToggle=document\.querySelector\('#inferenceSnapToggle'\)/);
  assert.match(ui,/kind:'Vertex'/);
  assert.match(ui,/kind:'Edge'/);
  assert.match(ui,/kind:'Face'/);
  assert.match(ui,/triangulatedGeometry/);
  assert.match(ui,/object\.id===activeId\|\|object\.visible===false/);
});

test('395 Draw Path preserves snapped point depth and Follow Edges can force edge picking',()=>{
  assert.match(ui,/snap=geometryToggle\?\.checked\?externalGeometrySnap\(event,refs\):null/);
  assert.match(ui,/snap\?\.point\|\|pointOnViewPlane/);
  assert.match(ui,/externalGeometrySnap\(event,captureSnapReferences\(\),true\)/);
});

test('Sweep release wrapper follows current build',()=>{
  const wrapper=index.match(/sweep-path\.js\?v=([^"]+)/)?.[1];
  assert.equal(wrapper,version);
});
