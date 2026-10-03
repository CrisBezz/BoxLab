import test from 'node:test';
import assert from 'node:assert/strict';
import * as THREE from 'three';
import {EditableMesh} from '../src/mesh.js';
import {planFaceAlignment} from '../src/component-align-core.js';

function fixture(){
  const m=new EditableMesh([[0,0,0],[2,0,0],[2,2,0],[0,2,0],[5,0,2],[5,2,2],[5,2,4],[5,0,4]],[[0,1,2,3],[4,5,6,7]]);
  const q=new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(1,2,3).normalize(),.72);
  for(const p of m.vertices)p.applyQuaternion(q).add(new THREE.Vector3(1,-2,3));
  return m;
}
const near=(a,b)=>assert.ok(Math.abs(a-b)<1e-6,`${a} != ${b}`);
test('arbitrary-plane alignment preserves anchor, source shape and tangential centre placement',()=>{
  const m=fixture(),before=m.clone(),plan=planFaceAlignment(m,[0,1],0);
  assert.equal(plan.ok,true);assert.equal(plan.changed,true);assert.deepEqual(m.vertices,before.vertices);
  for(const i of m.faces[0])assert.deepEqual(plan.candidate.vertices[i],m.vertices[i]);
  const normal=m.faceNormal(0),target=m.faceCenter(0),a=m.faceCenter(1),b=plan.candidate.faceCenter(1);
  for(const i of m.faces[1])near(plan.candidate.vertices[i].clone().sub(target).dot(normal),0);
  const shift=b.clone().sub(a);near(shift.clone().cross(normal).length(),0);
  for(const i of m.faces[1])for(const j of m.faces[1])near(m.vertices[i].distanceTo(m.vertices[j]),plan.candidate.vertices[i].distanceTo(plan.candidate.vertices[j]));
  assert.deepEqual(plan.candidate.faces,m.faces);
});
test('coplanar multi-Face group moves rigidly as a single selection',()=>{
  const m=fixture();m.faces.splice(1,1,[4,5,6],[4,6,7]);
  const p=planFaceAlignment(m,[0,1,2],0);assert.equal(p.ok,true);
  const n=m.faceNormal(0),target=m.faceCenter(0);
  for(const i of [4,5,6,7])near(p.candidate.vertices[i].clone().sub(target).dot(n),0);
  near(p.candidate.vertices[4].distanceTo(p.candidate.vertices[6]),m.vertices[4].distanceTo(m.vertices[6]));
});
test('shared planar boundary edge acts as a hinge without moving fixed vertices',()=>{
  const m=new EditableMesh([[0,0,0],[1,0,0],[1,1,0],[0,1,0],[0,0,1],[1,0,1]],[[0,1,2,3],[0,4,5,1]]);
  const p=planFaceAlignment(m,[0,1],0);assert.equal(p.ok,true);
  for(const i of [0,1,2,3])assert.deepEqual(p.candidate.vertices[i],m.vertices[i]);
  near(p.candidate.vertices[4].z,0);near(p.candidate.vertices[5].z,0);
  near(p.candidate.vertices[4].distanceTo(p.candidate.vertices[1]),m.vertices[4].distanceTo(m.vertices[1]));
});
test('bent moving groups and warped fixed Faces reject without mutation',()=>{
  const m=fixture();m.faces.push([4,5,0]);const before=m.clone();
  assert.equal(planFaceAlignment(m,[0,1,2],0).ok,false);assert.deepEqual(m.vertices,before.vertices);
  const warped=fixture();warped.vertices[0].addScaledVector(warped.faceNormal(0),.2);
  assert.equal(planFaceAlignment(warped,[0,1],0).ok,false);
});
test('opposite winding on an already coplanar group does not force a rotation or history change',()=>{
  const m=new EditableMesh([[0,0,0],[1,0,0],[0,1,0],[3,0,0],[3,1,0],[4,0,0]],[[0,1,2],[3,4,5]]);
  const p=planFaceAlignment(m,[0,1],0);assert.equal(p.ok,true);assert.equal(p.changed,false);
  assert.deepEqual(p.candidate.vertices,m.vertices);
});
test('invalid anchor and malformed selected Faces reject',()=>{
  const m=fixture();assert.equal(planFaceAlignment(m,[0,1],3).ok,false);
  m.faces[1]=[4,4,6];assert.equal(planFaceAlignment(m,[0,1],0).ok,false);
  const invalid=fixture();invalid.faces.push(null);assert.equal(planFaceAlignment(invalid,[0,1],0).ok,false);
});
test('coincident non-adjacent vertices in a neighbouring Face reject before commit',()=>{
  const m=new EditableMesh([[0,0,0],[2,0,0],[2,2,0],[0,2,0],[0,0,2],[2,0,2],[2,2,2],[0,2,2]],[[0,1,2,3],[4,5,6,7],[0,1,4,7]]);
  const before=m.clone(),p=planFaceAlignment(m,[0,1],0);
  assert.equal(p.ok,false);assert.match(p.reason,/collapse neighbouring/);
  assert.deepEqual(m.vertices,before.vertices);
});
