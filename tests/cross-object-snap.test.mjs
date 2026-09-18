import test from 'node:test';
import assert from 'node:assert/strict';
import * as THREE from 'three';
import { EditableMesh } from '../src/mesh.js';
import { nearestCrossObjectSnap, crossObjectSnapCandidates } from '../src/cross-object-snap-core.js';

const project=v=>({x:v.x*100,y:v.y*100});

test('324 cross-object snap ignores active and hidden objects',()=>{
  const active={id:1,visible:true,mesh:new EditableMesh([[0,0,0],[1,0,0]],[])};
  const visible={id:2,visible:true,mesh:new EditableMesh([[2,0,0],[3,0,0]],[])};
  const hidden={id:3,visible:false,mesh:new EditableMesh([[4,0,0],[5,0,0]],[])};
  const candidates=crossObjectSnapCandidates({objects:[active,visible,hidden],activeId:1,project});
  assert.ok(candidates.length>0);
  assert.equal(candidates.some(c=>c.objectId===1),false);
  assert.equal(candidates.some(c=>c.objectId===3),false);
  assert.equal(candidates.every(c=>c.objectId===2),true);
});

test('324 cross-object snap prefers a target vertex over midpoint and edge',()=>{
  const mesh=new EditableMesh([
    new THREE.Vector3(0,0,0),
    new THREE.Vector3(1,0,0),
    new THREE.Vector3(10,10,0)
  ],[[0,1,2]]);
  const snap=nearestCrossObjectSnap({
    objects:[{id:2,visible:true,mesh}],
    activeId:1,
    project,
    clientX:2,
    clientY:1
  });
  assert.equal(snap.type,'Vertex');
  assert.equal(snap.objectId,2);
  assert.ok(snap.position.distanceTo(mesh.vertices[0])<1e-12);
});

test('324 cross-object snap finds midpoint before generic edge point',()=>{
  const mesh=new EditableMesh([
    new THREE.Vector3(0,0,0),
    new THREE.Vector3(1,0,0),
    new THREE.Vector3(10,10,0)
  ],[[0,1,2]]);
  const snap=nearestCrossObjectSnap({
    objects:[{id:2,visible:true,mesh}],
    activeId:1,
    project,
    clientX:51,
    clientY:1
  });
  assert.equal(snap.type,'Midpoint');
  assert.ok(snap.position.distanceTo(new THREE.Vector3(.5,0,0))<1e-12);
});

test('324 cross-object snap can target an arbitrary point along another-object edge',()=>{
  const mesh=new EditableMesh([
    new THREE.Vector3(0,0,0),
    new THREE.Vector3(1,0,0),
    new THREE.Vector3(10,10,0)
  ],[[0,1,2]]);
  const snap=nearestCrossObjectSnap({
    objects:[{id:2,visible:true,mesh}],
    activeId:1,
    project,
    clientX:74,
    clientY:2,
    midpointPx:5
  });
  assert.equal(snap.type,'Edge');
  assert.ok(Math.abs(snap.t-.74)<1e-12);
  assert.ok(snap.position.distanceTo(new THREE.Vector3(.74,0,0))<1e-12);
});

test('324 cross-object snap respects solo visibility',()=>{
  const a=new EditableMesh([[0,0,0],[1,0,0]],[]);
  const b=new EditableMesh([[2,0,0],[3,0,0]],[]);
  const snap=nearestCrossObjectSnap({
    objects:[{id:2,visible:true,mesh:a},{id:3,visible:true,mesh:b}],
    activeId:1,
    soloId:3,
    project,
    clientX:1,
    clientY:0
  });
  assert.equal(snap,null);
});
