import test from 'node:test';
import assert from 'node:assert/strict';
import * as THREE from 'three';
import { EditableMesh } from '../src/mesh.js';
import { evaluateTrianglePair, quadCleanTrianglePairs } from '../src/quad-clean-core.js';

test('290 merges a clean triangulated quad without moving vertices',()=>{
  const verts=[
    new THREE.Vector3(0,0,0),new THREE.Vector3(1,0,0),
    new THREE.Vector3(1,1,0),new THREE.Vector3(0,1,0)
  ];
  const mesh=new EditableMesh(verts,[[0,1,2],[0,2,3]]);
  const before=mesh.vertices.map(v=>v.clone());
  const result=quadCleanTrianglePairs(mesh);
  assert.equal(result.ok,true);
  assert.equal(result.changed,true);
  assert.equal(result.merged,1);
  assert.equal(result.before.triangles,2);
  assert.equal(result.after.triangles,0);
  assert.equal(result.after.quads,1);
  assert.equal(mesh.faces.length,1);
  assert.equal(mesh.faces[0].length,4);
  assert.equal(new Set(mesh.faces[0]).size,4);
  assert.equal(mesh.vertices.length,4);
  for(let i=0;i<4;i++)assert.ok(mesh.vertices[i].distanceTo(before[i])<1e-12);
});

test('290 preserves a creased triangle diagonal',()=>{
  const verts=[
    new THREE.Vector3(0,0,0),new THREE.Vector3(1,0,0),
    new THREE.Vector3(1,1,0),new THREE.Vector3(0,1,0)
  ];
  const mesh=new EditableMesh(verts,[[0,1,2],[0,2,3]],[[meshKey(0,2),1]]);
  const pair=evaluateTrianglePair(mesh,0,1);
  assert.equal(pair.ok,false);
  assert.equal(pair.reason,'creased-edge');
  const result=quadCleanTrianglePairs(mesh);
  assert.equal(result.changed,false);
  assert.equal(mesh.faces.length,2);
});

test('290 refuses triangle pairs across a sharp surface break',()=>{
  const verts=[
    new THREE.Vector3(0,0,0),new THREE.Vector3(1,0,0),
    new THREE.Vector3(1,1,0),new THREE.Vector3(0,1,1)
  ];
  const mesh=new EditableMesh(verts,[[0,1,2],[0,2,3]]);
  const pair=evaluateTrianglePair(mesh,0,1);
  assert.equal(pair.ok,false);
  assert.equal(pair.reason,'normal-break');
});

test('290 greedily converts two independent triangulated quads',()=>{
  const verts=[
    new THREE.Vector3(0,0,0),new THREE.Vector3(1,0,0),new THREE.Vector3(1,1,0),new THREE.Vector3(0,1,0),
    new THREE.Vector3(2,0,0),new THREE.Vector3(3,0,0),new THREE.Vector3(3,1,0),new THREE.Vector3(2,1,0)
  ];
  const mesh=new EditableMesh(verts,[[0,1,2],[0,2,3],[4,5,6],[4,6,7]]);
  const result=quadCleanTrianglePairs(mesh);
  assert.equal(result.merged,2);
  assert.equal(result.after.triangles,0);
  assert.equal(result.after.quads,2);
  assert.equal(mesh.faces.length,2);
});

function meshKey(a,b){return a<b?`${a}:${b}`:`${b}:${a}`;}
