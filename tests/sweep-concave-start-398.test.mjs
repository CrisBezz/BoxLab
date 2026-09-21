import test from 'node:test';
import assert from 'node:assert/strict';
import * as THREE from 'three';
import {buildSweepProfile,__sweepInternals} from '../src/sweep-core.js';

const U=new THREE.Vector3(1,0,0),V=new THREE.Vector3(0,1,0),N=new THREE.Vector3(0,0,1);

test('398 ring zero is the exact authored Profile Plane section',()=>{
  const path=[new THREE.Vector3(0,0,0),new THREE.Vector3(1,0,1),new THREE.Vector3(2,0,1)];
  const profile=[{x:-.6,y:-.2},{x:.4,y:-.3},{x:.5,y:.4},{x:-.2,y:.55}];
  const result=buildSweepProfile(path,profile,{profileClosed:true,profileU:U,profileV:V,profileNormal:N,capStart:false,capEnd:false});
  assert.equal(result.ok,true);
  for(let i=0;i<profile.length;i++){
    const v=result.mesh.vertices[i];
    assert.ok(Math.abs(v.x-profile[i].x)<1e-9);
    assert.ok(Math.abs(v.y-profile[i].y)<1e-9);
    assert.ok(Math.abs(v.z)<1e-9);
  }
  assert.equal(result.frames[0].exactProfile,true);
});

test('398 concave C profile caps are triangulated instead of emitted as one bad ngon',()=>{
  const c=[
    {x:-1,y:-1},{x:1,y:-1},{x:1,y:-.45},{x:-.25,y:-.45},
    {x:-.25,y:.45},{x:1,y:.45},{x:1,y:1},{x:-1,y:1}
  ];
  const path=[new THREE.Vector3(0,0,0),new THREE.Vector3(0,0,2)];
  const result=buildSweepProfile(path,c,{profileClosed:true,profileU:U,profileV:V,profileNormal:N,capStart:true,capEnd:true});
  assert.equal(result.ok,true);
  const capTriangles=__sweepInternals.triangulateCap(c);
  assert.equal(capTriangles.length,c.length-2);
  assert.equal(result.mesh.faces.filter(f=>f.length===3).length,(c.length-2)*2);
  assert.equal(result.mesh.faces.filter(f=>f.length===4).length,c.length);
  assert.equal(result.mesh.faces.some(f=>f.length>4),false);
});

test('398 cap normals face outward at both ends',()=>{
  const profile=[{x:-.5,y:-.5},{x:.5,y:-.5},{x:.5,y:.5},{x:-.5,y:.5}];
  const path=[new THREE.Vector3(0,0,0),new THREE.Vector3(0,0,2)];
  const result=buildSweepProfile(path,profile,{profileClosed:true,profileU:U,profileV:V,profileNormal:N});
  assert.equal(result.ok,true);
  const triFaces=result.mesh.faces.filter(f=>f.length===3);
  const normal=face=>{
    const [a,b,c]=face.map(i=>result.mesh.vertices[i]);
    return new THREE.Vector3().crossVectors(b.clone().sub(a),c.clone().sub(a)).normalize();
  };
  const start=normal(triFaces[0]),end=normal(triFaces.at(-1));
  assert.ok(start.z<-.99);
  assert.ok(end.z>.99);
});
