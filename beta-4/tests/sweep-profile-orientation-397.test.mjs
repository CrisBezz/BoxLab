import test from 'node:test';
import assert from 'node:assert/strict';
import * as THREE from 'three';
import {buildSweepProfile} from '../src/sweep-core.js';

test('397 preserves authored profile point order when closing clockwise profile',()=>{
  const path=[new THREE.Vector3(0,0,0),new THREE.Vector3(0,0,1)];
  const profile=[{x:-.4,y:-.2},{x:-.4,y:.2},{x:.4,y:.2},{x:.4,y:-.2}];
  const result=buildSweepProfile(path,profile,{profileClosed:true,profileU:new THREE.Vector3(1,0,0),profileV:new THREE.Vector3(0,1,0)});
  assert.equal(result.ok,true);
  assert.deepEqual(result.profile,profile);
  const firstSide=result.mesh.faces[0];
  assert.ok(firstSide.includes(0));
  assert.ok(firstSide.includes(1));
});

test('397 profile plane left stays left when path runs opposite plane normal',()=>{
  const path=[new THREE.Vector3(0,0,0),new THREE.Vector3(0,0,-1)];
  const profile=[{x:-.5,y:-.2},{x:.5,y:-.2},{x:.5,y:.2},{x:-.5,y:.2}];
  const result=buildSweepProfile(path,profile,{profileClosed:true,profileU:new THREE.Vector3(1,0,0),profileV:new THREE.Vector3(0,1,0)});
  assert.equal(result.ok,true);
  const first=result.mesh.vertices[0];
  const second=result.mesh.vertices[1];
  assert.ok(first.x<second.x,'left/right orientation should not mirror');
  assert.ok(Math.abs(first.x+0.5)<1e-6);
  assert.ok(Math.abs(second.x-0.5)<1e-6);
});

test('397 initial frame preserves both profile plane axes',async()=>{
  const {__sweepInternals}=await import('../src/sweep-core.js');
  const t=new THREE.Vector3(0,0,-1),u=new THREE.Vector3(1,0,0),v=new THREE.Vector3(0,1,0);
  const frame=__sweepInternals.initialFrame(t,u,v);
  assert.ok(frame.n.dot(u)>.999);
  assert.ok(frame.b.dot(v)>.999);
});
