import test from 'node:test';
import assert from 'node:assert/strict';
import * as THREE from 'three';
import {buildSweepProfile,__sweepInternals} from '../src/sweep-core.js';

function faceNormal(mesh,face){
  const [a,b,c]=face.slice(0,3).map(i=>mesh.vertices[i]);
  return new THREE.Vector3().crossVectors(b.clone().sub(a),c.clone().sub(a)).normalize();
}

test('399 side outward helper respects profile winding',()=>{
  const a={x:-1,y:-1},b={x:1,y:-1};
  const ccw=__sweepInternals.sideOutward2D(a,b,false);
  const cw=__sweepInternals.sideOutward2D(b,a,true);
  assert.ok(ccw.y<-.99);
  assert.ok(cw.y<-.99);
});

test('399 concave C-profile side faces point outward on a straight sweep',()=>{
  const profile=[
    {x:-1,y:-1},{x:1,y:-1},{x:1,y:-.45},{x:-.25,y:-.45},
    {x:-.25,y:.45},{x:1,y:.45},{x:1,y:1},{x:-1,y:1}
  ];
  const path=[new THREE.Vector3(0,0,0),new THREE.Vector3(0,0,2)];
  const result=buildSweepProfile(path,profile,{
    profileClosed:true,
    profileU:new THREE.Vector3(1,0,0),
    profileV:new THREE.Vector3(0,1,0),
    profileNormal:new THREE.Vector3(0,0,1),
    capStart:false,capEnd:false
  });
  assert.equal(result.ok,true);
  for(let j=0;j<profile.length;j++){
    const k=(j+1)%profile.length;
    const normal=faceNormal(result.mesh,result.mesh.faces[j]);
    const out=__sweepInternals.sideOutward2D(profile[j],profile[k],false);
    const expected=new THREE.Vector3(out.x,out.y,0);
    assert.ok(normal.dot(expected)>.99,`side ${j} should face outward`);
  }
});

test('399 side normals remain outward through a bent path',()=>{
  const profile=[{x:-.5,y:-.5},{x:.5,y:-.5},{x:.5,y:.5},{x:-.5,y:.5}];
  const path=[new THREE.Vector3(0,0,0),new THREE.Vector3(0,0,2),new THREE.Vector3(2,0,2)];
  const result=buildSweepProfile(path,profile,{
    profileClosed:true,
    profileU:new THREE.Vector3(1,0,0),
    profileV:new THREE.Vector3(0,1,0),
    profileNormal:new THREE.Vector3(0,0,1),
    capStart:false,capEnd:false
  });
  assert.equal(result.ok,true);
  assert.equal(result.mesh.faces.length,8);
  for(const face of result.mesh.faces) assert.ok(faceNormal(result.mesh,face).length()>.99);
});
