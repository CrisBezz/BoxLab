import test from 'node:test';
import assert from 'node:assert/strict';
import * as THREE from 'three';
import { EditableMesh } from '../src/mesh.js';
import { deriveInstancePlacement, transformEditableMesh, localMeshFromWorld, meshesNear } from '../src/instance-core.js';

function apply(mesh,matrix){return transformEditableMesh(mesh,matrix);}

test('343 instance placement solves a transformed solid mesh',()=>{
  const source=EditableMesh.cube(2);
  const matrix=new THREE.Matrix4().compose(
    new THREE.Vector3(3,-2,5),
    new THREE.Quaternion().setFromEuler(new THREE.Euler(.35,-.62,.21)),
    new THREE.Vector3(1.5,.8,2.2)
  );
  const world=apply(source,matrix);
  const solved=deriveInstancePlacement(source,world);
  assert.ok(solved);
  const evaluated=apply(source,solved);
  assert.ok(meshesNear(evaluated,world,2e-6));
  const local=localMeshFromWorld(world,solved);
  assert.ok(meshesNear(local,source,2e-6));
});

test('343 instance placement solves planar linked geometry',()=>{
  const source=new EditableMesh([
    new THREE.Vector3(0,0,0),
    new THREE.Vector3(2,0,0),
    new THREE.Vector3(2,1,0),
    new THREE.Vector3(0,1,0)
  ],[[0,1,2,3]]);
  const matrix=new THREE.Matrix4().compose(
    new THREE.Vector3(-4,3,2),
    new THREE.Quaternion().setFromEuler(new THREE.Euler(.45,.2,-.3)),
    new THREE.Vector3(1.8,.65,1)
  );
  const world=apply(source,matrix);
  const solved=deriveInstancePlacement(source,world);
  assert.ok(solved);
  assert.ok(meshesNear(apply(source,solved),world,2e-6));
});

test('343 placement solver refuses topology changes',()=>{
  const source=EditableMesh.cube(2),world=EditableMesh.cube(2);
  world.faces.pop();
  assert.equal(deriveInstancePlacement(source,world),null);
});
