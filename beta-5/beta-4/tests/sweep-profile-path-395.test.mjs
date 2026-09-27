import test from 'node:test';
import assert from 'node:assert/strict';
import * as THREE from 'three';
import {buildSweepProfile} from '../src/sweep-core.js';

test('custom square profile sweeps to a capped quad tube',()=>{
  const path=[new THREE.Vector3(0,0,0),new THREE.Vector3(0,0,2)];
  const profile=[{x:-.5,y:-.5},{x:.5,y:-.5},{x:.5,y:.5},{x:-.5,y:.5}];
  const result=buildSweepProfile(path,profile,{capStart:true,capEnd:true,profileU:new THREE.Vector3(1,0,0),profileV:new THREE.Vector3(0,1,0)});
  assert.equal(result.ok,true);
  assert.equal(result.mesh.vertices.length,8);
  assert.equal(result.mesh.faces.length,6);
  assert.deepEqual(result.mesh.faces.map(f=>f.length),[4,4,4,4,4,4]);
});

test('custom profile follows a bent three-point path without changing ring size',()=>{
  const path=[new THREE.Vector3(0,0,0),new THREE.Vector3(0,0,2),new THREE.Vector3(2,0,2)];
  const profile=[{x:-.4,y:-.2},{x:.4,y:-.2},{x:.4,y:.2},{x:-.4,y:.2}];
  const result=buildSweepProfile(path,profile,{profileU:new THREE.Vector3(1,0,0),profileV:new THREE.Vector3(0,1,0)});
  assert.equal(result.ok,true);
  assert.equal(result.mesh.vertices.length,12);
  assert.equal(result.mesh.faces.length,10);
  const ringLengths=[0,1,2].map(r=>{
    const a=result.mesh.vertices[r*4],b=result.mesh.vertices[r*4+1];
    return a.distanceTo(b);
  });
  for(const length of ringLengths)assert.ok(Math.abs(length-.8)<1e-6);
});

test('Sweep runtime exposes profile-first dual path workflow',async()=>{
  const fs=await import('node:fs/promises');
  const source=await fs.readFile(new URL('../src/sweep-path.js',import.meta.url),'utf8');
  assert.match(source,/function constructionPlane\(\)/);
  assert.match(source,/Profile source/);
  assert.match(source,/Follow Edges/);
  assert.match(source,/Draw Path/);
  assert.match(source,/profileType/);
  assert.match(source,/pathMode/);
  assert.match(source,/pointOnViewPlane/);
  assert.match(source,/externalEdgeSnap\(event,railRefs\(\)\)/);
  assert.doesNotMatch(source,/Sweep Path added • position\/snap the plane first/);
});
