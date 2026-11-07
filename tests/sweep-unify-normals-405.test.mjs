import test from 'node:test';
import assert from 'node:assert/strict';
import * as THREE from 'three';
import {buildSweepProfile,__sweepInternals} from '../src/sweep-core.js';

test('405 closed capped Sweep shell is unified to positive signed volume',()=>{
  const path=[new THREE.Vector3(0,0,0),new THREE.Vector3(0,0,2)];
  const clockwise=[{x:-.5,y:-.5},{x:-.5,y:.5},{x:.5,y:.5},{x:.5,y:-.5}];
  const result=buildSweepProfile(path,clockwise,{
    profileClosed:true,capStart:true,capEnd:true,
    profileU:new THREE.Vector3(1,0,0),
    profileV:new THREE.Vector3(0,1,0),
    profileNormal:new THREE.Vector3(0,0,1)
  });
  assert.equal(result.ok,true);
  assert.ok(__sweepInternals.signedMeshVolume(result.mesh.vertices,result.mesh.faces)>0);
  assert.ok(result.shellOrientation.volume>0);
});

test('405 shell orientation helper flips an inward tetrahedron',()=>{
  const vertices=[
    new THREE.Vector3(0,0,0),new THREE.Vector3(1,0,0),
    new THREE.Vector3(0,1,0),new THREE.Vector3(0,0,1)
  ];
  const outward=[[0,2,1],[0,1,3],[1,2,3],[2,0,3]];
  const inward=outward.map(f=>[...f].reverse());
  assert.ok(__sweepInternals.signedMeshVolume(vertices,inward)<0);
  const result=__sweepInternals.orientClosedShellOutward(vertices,inward);
  assert.equal(result.flipped,true);
  assert.ok(__sweepInternals.signedMeshVolume(vertices,inward)>0);
});

test('405 open or uncapped Sweep is not shell-volume flipped',()=>{
  const path=[new THREE.Vector3(0,0,0),new THREE.Vector3(0,0,2)];
  const open=buildSweepProfile(path,[{x:-.5,y:0},{x:.5,y:0}],{profileClosed:false});
  assert.equal(open.ok,true);
  assert.equal(open.shellOrientation.flipped,false);
  assert.equal(open.shellOrientation.volume,0);
  const uncapped=buildSweepProfile(path,[{x:-.5,y:-.5},{x:.5,y:-.5},{x:.5,y:.5},{x:-.5,y:.5}],{profileClosed:true,capStart:false,capEnd:false});
  assert.equal(uncapped.ok,true);
  assert.equal(uncapped.shellOrientation.flipped,false);
  assert.equal(uncapped.shellOrientation.volume,0);
});
