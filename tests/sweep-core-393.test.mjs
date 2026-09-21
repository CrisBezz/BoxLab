import test from 'node:test';
import assert from 'node:assert/strict';
import * as THREE from 'three';
import {buildSweepTube} from '../src/sweep-core.js';

test('393 straight sweep builds quad tube with capped ends',()=>{
  const r=buildSweepTube([new THREE.Vector3(0,0,0),new THREE.Vector3(0,2,0)],{radius:.5,sides:8});
  assert.equal(r.ok,true);
  assert.equal(r.mesh.vertices.length,16);
  assert.equal(r.mesh.faces.length,10);
  assert.equal(r.mesh.faces.filter(f=>f.length===4).length,8);
});
test('393 open caps option leaves only side quads',()=>{
  const r=buildSweepTube([new THREE.Vector3(0,0,0),new THREE.Vector3(0,1,0),new THREE.Vector3(1,2,0)],{sides:6,capStart:false,capEnd:false});
  assert.equal(r.ok,true);
  assert.equal(r.mesh.faces.length,12);
});
test('393 duplicate consecutive points are ignored',()=>{
  const r=buildSweepTube([new THREE.Vector3(),new THREE.Vector3(),new THREE.Vector3(0,1,0)],{sides:4});
  assert.equal(r.ok,true);
  assert.equal(r.points.length,2);
});
test('393 one-point path refuses without mutation',()=>{
  const r=buildSweepTube([new THREE.Vector3()],{sides:8});
  assert.equal(r.ok,false);
});
