import test from 'node:test';
import assert from 'node:assert/strict';
import * as THREE from 'three';
import { EditableMesh } from '../src/mesh.js';
import { analyzeSolidifyInput, solidifyOpenMesh, __solidifyInternals } from '../src/solidify-core.js';

function quad(){
  return new EditableMesh([
    new THREE.Vector3(-1,-1,0),new THREE.Vector3(1,-1,0),
    new THREE.Vector3(1,1,0),new THREE.Vector3(-1,1,0)
  ],[[0,1,2,3]]);
}
test('372 Solidify turns one open quad into a closed six-face solid',()=>{
  const mesh=quad(),result=solidifyOpenMesh(mesh,0.25);
  assert.equal(result.ok,true);
  assert.equal(result.changed,true);
  assert.equal(mesh.vertices.length,8);
  assert.equal(mesh.faces.length,6);
  assert.equal(result.sideFaces,4);
  assert.equal(__solidifyInternals.inspectClosed(mesh).ok,true);
  for(let i=4;i<8;i++)assert.ok(Math.abs(mesh.vertices[i].z+0.25)<1e-12);
});
test('372 Solidify closes a two-quad strip and preserves shared topology',()=>{
  const mesh=new EditableMesh([
    new THREE.Vector3(0,0,0),new THREE.Vector3(1,0,0),new THREE.Vector3(2,0,0),
    new THREE.Vector3(0,1,0),new THREE.Vector3(1,1,0),new THREE.Vector3(2,1,0)
  ],[[0,1,4,3],[1,2,5,4]]);
  const result=solidifyOpenMesh(mesh,0.1);
  assert.equal(result.ok,true);
  assert.equal(result.before.boundaryEdges,6);
  assert.equal(result.sideFaces,6);
  assert.equal(mesh.vertices.length,12);
  assert.equal(mesh.faces.length,10);
  assert.equal(__solidifyInternals.inspectClosed(mesh).ok,true);
});
test('372 Solidify refuses an already closed mesh without mutation',()=>{
  const mesh=EditableMesh.cube(2),before=mesh.clone();
  const result=solidifyOpenMesh(mesh,0.2);
  assert.equal(result.ok,false);
  assert.equal(result.reason,'closed-mesh');
  assert.equal(mesh.vertices.length,before.vertices.length);
  assert.deepEqual(mesh.faces,before.faces);
});
test('372 Solidify preflight rejects inconsistent winding',()=>{
  const mesh=new EditableMesh([
    new THREE.Vector3(0,0,0),new THREE.Vector3(1,0,0),new THREE.Vector3(0,1,0),new THREE.Vector3(1,1,0)
  ],[[0,1,2],[1,2,3]]);
  const result=analyzeSolidifyInput(mesh);
  assert.equal(result.ok,false);
  assert.equal(result.reason,'inconsistent-winding');
});
test('372 Solidify refuses zero thickness without mutation',()=>{
  const mesh=quad(),before=mesh.clone(),result=solidifyOpenMesh(mesh,0);
  assert.equal(result.ok,false);
  assert.equal(result.reason,'invalid-thickness');
  assert.deepEqual(mesh.faces,before.faces);
  assert.equal(mesh.vertices.length,before.vertices.length);
});
test('372 Solidify duplicates existing crease weights onto the inner shell',()=>{
  const mesh=quad(),key=mesh.edgeKey(0,1);
  mesh.creases.set(key,0.75);
  const result=solidifyOpenMesh(mesh,0.2);
  assert.equal(result.ok,true);
  assert.equal(mesh.creases.get(mesh.edgeKey(0,1)),0.75);
  assert.equal(mesh.creases.get(mesh.edgeKey(4,5)),0.75);
});
