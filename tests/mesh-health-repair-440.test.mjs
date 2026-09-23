import test from 'node:test';
import assert from 'node:assert/strict';
import * as THREE from 'three';
import fs from 'node:fs';
import {EditableMesh} from '../src/mesh.js';
import {safeRepairMesh} from '../src/mesh-health-repair-core.js';
import {analyzeMeshHealth} from '../src/mesh-health-core.js';

test('440 Safe Repair removes exact directed duplicates and compacts resulting orphan vertices',()=>{
  const mesh=new EditableMesh([
    new THREE.Vector3(0,0,0),new THREE.Vector3(1,0,0),new THREE.Vector3(0,1,0),new THREE.Vector3(9,9,9)
  ],[[0,1,2],[1,2,0]]);
  const before=analyzeMeshHealth(mesh);
  assert.equal(before.duplicateFaces,1);
  assert.equal(before.orphanVertices,1);
  const result=safeRepairMesh(mesh);
  assert.equal(result.ok,true);
  assert.equal(result.changed,true);
  assert.equal(result.duplicatesRemoved,1);
  assert.equal(mesh.faces.length,1);
  assert.equal(mesh.vertices.length,3);
});

test('440 Safe Repair removes a zero-area face without touching a healthy face',()=>{
  const mesh=new EditableMesh([
    new THREE.Vector3(0,0,0),new THREE.Vector3(1,0,0),new THREE.Vector3(0,1,0),
    new THREE.Vector3(2,0,0),new THREE.Vector3(3,0,0),new THREE.Vector3(4,0,0)
  ],[[0,1,2],[3,4,5]]);
  const result=safeRepairMesh(mesh);
  assert.equal(result.ok,true);
  assert.equal(result.zeroAreaRemoved,1);
  assert.deepEqual(mesh.faces,[[0,1,2]]);
});

test('440 Safe Repair does not remove opposite-winding coincident faces as an exact duplicate',()=>{
  const mesh=new EditableMesh([
    new THREE.Vector3(0,0,0),new THREE.Vector3(1,0,0),new THREE.Vector3(0,1,0)
  ],[[0,1,2],[0,2,1]]);
  const result=safeRepairMesh(mesh);
  assert.equal(result.changed,false);
  assert.equal(mesh.faces.length,2);
});

test('440 UI exposes Safe Repair transactionally inside Mesh Health and keeps protected baselines',()=>{
  const ui=fs.readFileSync(new URL('../src/mesh-health.js',import.meta.url),'utf8');
  const index=fs.readFileSync(new URL('../index.html',import.meta.url),'utf8');
  const beta4=JSON.parse(fs.readFileSync(new URL('../beta-4/version.json',import.meta.url),'utf8'));
  assert.match(ui,/meshHealthRepair/);
  assert.match(ui,/safeRepairMesh/);
  assert.match(ui,/checkpointSnapshot/);
  assert.match(ui,/capture\?\.\(\)/);
  assert.match(index,/src\/mesh-health\.js\?v=0\.36\.18\.441/);
  assert.match(index,/multi-object-transform\.js\?v=0\.36\.1\.0/);
  assert.equal(beta4.version,'0.36.18.427');
});
