import test from 'node:test';
import assert from 'node:assert/strict';
import * as THREE from 'three';
import { EditableMesh } from '../src/mesh.js';
import { analyzeShellInput, shellClosedMesh } from '../src/shell-core.js';
import { __solidifyInternals } from '../src/solidify-core.js';

test('377 Shell removes one cube face and creates a watertight hollow solid',()=>{
  const mesh=EditableMesh.cube(2);
  const result=shellClosedMesh(mesh,[0],0.2);
  assert.equal(result.ok,true);
  assert.equal(result.removedFaces,1);
  assert.equal(result.openingBoundaryEdges,4);
  assert.equal(__solidifyInternals.inspectClosed(mesh).ok,true);
  assert.equal(mesh.vertices.length,16);
  assert.equal(mesh.faces.length,14);
});

test('377 Shell supports one connected two-face opening',()=>{
  const mesh=EditableMesh.cube(2);
  const first=mesh.faces[0];
  let adjacent=-1;
  for(let i=1;i<mesh.faces.length;i++){
    const shared=mesh.faces[i].filter(v=>first.includes(v));
    if(shared.length===2){adjacent=i;break;}
  }
  assert.notEqual(adjacent,-1);
  const result=shellClosedMesh(mesh,[0,adjacent],0.15);
  assert.equal(result.ok,true);
  assert.equal(result.removedFaces,2);
  assert.equal(__solidifyInternals.inspectClosed(mesh).ok,true);
});

test('377 Shell refuses an open sheet because input must be a closed solid',()=>{
  const mesh=new EditableMesh([
    new THREE.Vector3(0,0,0),new THREE.Vector3(1,0,0),
    new THREE.Vector3(1,1,0),new THREE.Vector3(0,1,0)
  ],[[0,1,2,3]]);
  const before=mesh.clone(),result=shellClosedMesh(mesh,[0],0.2);
  assert.equal(result.ok,false);
  assert.equal(result.reason,'needs-closed-solid');
  assert.deepEqual(mesh.faces,before.faces);
});

test('377 Shell refuses selecting every face without mutation',()=>{
  const mesh=EditableMesh.cube(2),before=mesh.clone();
  const ids=mesh.faces.map((_,i)=>i);
  const result=shellClosedMesh(mesh,ids,0.2);
  assert.equal(result.ok,false);
  assert.equal(result.reason,'all-faces-selected');
  assert.deepEqual(mesh.faces,before.faces);
});

test('377 Shell analyze refuses no Face selection',()=>{
  const mesh=EditableMesh.cube(2);
  const result=analyzeShellInput(mesh,[]);
  assert.equal(result.ok,false);
  assert.equal(result.reason,'no-selected-faces');
});
