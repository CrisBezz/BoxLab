import test from 'node:test';
import assert from 'node:assert/strict';
import * as THREE from 'three';
import {buildSweepProfile,__sweepInternals} from '../src/sweep-core.js';

function sharedEdgeConflicts(faces){
  const map=new Map(),key=(a,b)=>a<b?`${a}:${b}`:`${b}:${a}`;
  for(let fi=0;fi<faces.length;fi++){
    const face=faces[fi];
    for(let i=0;i<face.length;i++){
      const a=face[i],b=face[(i+1)%face.length],k=key(a,b);
      if(!map.has(k))map.set(k,[]);
      map.get(k).push({a,b,fi});
    }
  }
  let conflicts=0;
  for(const entries of map.values()){
    if(entries.length!==2)continue;
    const [a,b]=entries;
    if(a.a===b.a&&a.b===b.b)conflicts++;
  }
  return conflicts;
}

test('407 repairs an isolated reversed face by shared-edge winding',()=>{
  const faces=[
    [0,3,2,1],
    [4,5,6,7],
    [0,1,5,4],
    [1,2,6,5],
    [2,3,7,6],
    [3,0,4,7]
  ];
  faces[3].reverse();
  assert.ok(sharedEdgeConflicts(faces)>0);
  const result=__sweepInternals.unifyFaceWinding(faces);
  assert.ok(result.components.length>=1);
  assert.equal(sharedEdgeConflicts(faces),0);
});

test('407 bent closed Sweep has no shared-edge winding conflicts',()=>{
  const path=[
    new THREE.Vector3(0,0,0),
    new THREE.Vector3(0,0,2),
    new THREE.Vector3(2,0,2),
    new THREE.Vector3(2,1,2)
  ];
  const profile=[
    {x:-.5,y:-.25},{x:.5,y:-.25},{x:.5,y:.25},{x:-.5,y:.25}
  ];
  const result=buildSweepProfile(path,profile,{
    profileClosed:true,capStart:true,capEnd:true,
    profileU:new THREE.Vector3(1,0,0),
    profileV:new THREE.Vector3(0,1,0),
    profileNormal:new THREE.Vector3(0,0,1)
  });
  assert.equal(result.ok,true);
  assert.equal(sharedEdgeConflicts(result.mesh.faces),0);
  assert.ok(__sweepInternals.signedMeshVolume(result.mesh.vertices,result.mesh.faces)>0);
});

test('407 local winding unification also protects concave selected-style sections',()=>{
  const path=[
    new THREE.Vector3(0,0,0),
    new THREE.Vector3(0,0,2),
    new THREE.Vector3(1.5,0,2),
    new THREE.Vector3(1.5,1.5,2)
  ];
  const profile=[
    {x:-1,y:-1},{x:1,y:-1},{x:1,y:-.4},{x:-.2,y:-.4},
    {x:-.2,y:.4},{x:1,y:.4},{x:1,y:1},{x:-1,y:1}
  ];
  const result=buildSweepProfile(path,profile,{
    profileClosed:true,capStart:true,capEnd:true,
    profileU:new THREE.Vector3(1,0,0),
    profileV:new THREE.Vector3(0,1,0),
    profileNormal:new THREE.Vector3(0,0,1)
  });
  assert.equal(result.ok,true);
  assert.equal(sharedEdgeConflicts(result.mesh.faces),0);
  assert.ok(__sweepInternals.signedMeshVolume(result.mesh.vertices,result.mesh.faces)>0);
});
