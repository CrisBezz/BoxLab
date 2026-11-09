import test from 'node:test';import assert from 'node:assert/strict';import fs from 'node:fs';
import * as THREE from 'three';
import {cornerBand,quadBand} from './helpers/corner-band-fixture.mjs';import {previewRuntime} from './helpers/dense-edit-runtime.mjs';
import {snapshot,volume} from './helpers/negative-extrude-runtime.mjs';
import {buildNegativeExtrude,validateThrough,planThrough} from '../src/through-kernel.js';
// Mutation reconstructs the exact old cutter start plane, keeping every other
// kernel operation identical. This test proves the repair, not just its guard.
const kernel=fs.readFileSync(new URL('../src/through-kernel.js',import.meta.url),'utf8');
const oldKernel=kernel.replace("from 'three'",`from '${new URL('../node_modules/three/build/three.module.js',import.meta.url).href}'`).replace("'./topology-foundation.js?v=0.36.16.0'",`'${new URL('../src/topology-foundation.js',import.meta.url).href}'`).replace('[...sides,plane(n,source[0]),plane(dir,end[0])]','[...sides,plane(n,source[0].clone().addScaledVector(n,eps*32)),plane(dir,end[0])]');
assert.notEqual(oldKernel,kernel);const {buildNegativeExtrude:oldCut}=await import('data:text/javascript;base64,'+Buffer.from(oldKernel).toString('base64'));
const near=(a,b)=>assert.ok(Math.abs(a-b)<1e-7,`${a} != ${b}`);
function valid(mesh){assert.equal(validateThrough(mesh).ok,true);assert.equal(new Set(mesh.faces.flat()).size,mesh.vertices.length,'no orphan vertices');for(const f of mesh.faces){const n=mesh.faceNormal(mesh.faces.indexOf(f));assert.ok(n.length()>.99);}}
function outset(){const f=cornerBand({subdivisions:2}),r=previewRuntime(f.mesh,f.ids);assert.equal(r.begin(),true);r.preview(.2);assert.equal(r.owner.drag().preview,true);r.finish();f.mesh.faceGroups=f.mesh.faces.map((_,i)=>f.mesh.faceGroups?.[i]??null);return f;}
test('1120 original source-plane overshoot reproduces both corner-band and single-Face refusals',()=>{
 const f=cornerBand({subdivisions:2});assert.equal(oldCut(f.mesh,f.ids,-.1).reason,'invalid-edge-or-face-topology');
 const g=outset();assert.equal(oldCut(g.mesh,[27],-.15).reason,'invalid-edge-or-face-topology');

});
for(const d of [-.02,-.1,-.3,-.49])test(`1120 inward L-band ${d} closes seams without epsilon slivers or extra triangle fans`,()=>{
 const {mesh,ids}=cornerBand({subdivisions:2}),before=snapshot(mesh),v=volume(mesh),result=buildNegativeExtrude(mesh,ids,d);assert.equal(result.ok,true,result.reason);assert.equal(snapshot(mesh),before);valid(result.mesh);
 // L profile area4, perimeter10; the uncollapsed inward annulus removes
 // .2*(10*d - 5*d*d): five disjoint convex corner overlaps in the union of sweeps.
 const depth=-d;near(volume(result.mesh),v-.2*(10*depth-5*depth*depth));
 assert.equal(result.mesh.faces.filter(f=>f.length===3).length,mesh.faces.filter(f=>f.length===3).length,'no new wall triangles');
 assert.ok(result.mesh.faces.length<=mesh.faces.length+ids.length*2+2,'bounded source splitting plus boundary walls');
});
test('1120 selected original corner Face recesses and cuts THROUGH without outward priming',()=>{
 const {mesh}=outset(),before=snapshot(mesh),v=volume(mesh),plan=planThrough(mesh,27);assert.equal(plan.ok,true);near(-plan.distance,1.4);
 for(const d of [.02,.15,.3,.9,1.3,1.4,2]){const result=buildNegativeExtrude(mesh,[27],-d);assert.equal(result.ok,true,result.reason);valid(result.mesh);assert.equal(snapshot(mesh),before);near(volume(result.mesh),v-.1*Math.min(d,1.4));assert.equal(result.faceIndices.length,d<1.4?1:0);assert.ok(result.mesh.faces.length<=mesh.faces.length+10,'one opening does not add a fan grid');}
});
test('1120 actual connected controller supports progressive inward preview, Cancel, Done and exact UndoRedo',()=>{
 const {mesh,ids}=cornerBand({subdivisions:2}),before=snapshot(mesh),r=previewRuntime(mesh,ids);r.begin();for(const d of [-.02,-.1,-.3]){assert.equal(r.preview(d).length,1);assert.equal(r.owner.drag().preview,true,r.owner.drag().failureReason);valid(mesh);}r.finish('pointercancel');assert.equal(snapshot(mesh),before);assert.equal(r.history.undoStack.length,0);
 const commit=previewRuntime(mesh,ids);commit.begin();commit.preview(-.1);const after=snapshot(mesh);commit.finish();assert.equal(commit.history.undoStack.length,1);const undone=commit.history.undo(mesh);assert.equal(snapshot(undone),before);assert.equal(snapshot(commit.history.redo(undone)),after);
});
test('1120 actual single-Face controller cuts directly and THROUGH with one history checkpoint',()=>{
 for(const d of [-.15,-2]){const {mesh}=outset(),before=snapshot(mesh),r=previewRuntime(mesh,[27]);r.begin();assert.equal(r.preview(d).length,1);assert.equal(r.owner.drag().preview,true,r.owner.drag().failureReason);valid(mesh);const after=snapshot(mesh);r.finish();assert.equal(r.history.undoStack.length,1);const undone=r.history.undo(mesh);assert.equal(snapshot(undone),before);assert.equal(snapshot(r.history.redo(undone)),after);}
});
test('1120 transformed corner band keeps exact cut volume and closed winding',()=>{
 const {mesh,ids}=cornerBand({subdivisions:2});const rotation=new THREE.Quaternion().setFromEuler(new THREE.Euler(.3,.7,.2));mesh.vertices.forEach(v=>v.multiplyScalar(3).applyQuaternion(rotation).add(new THREE.Vector3(4,-2,7)));const result=buildNegativeExtrude(mesh,ids,-.3);assert.equal(result.ok,true,result.reason);valid(result.mesh);near(volume(result.mesh),7.81*27);
});

test('1120 all-quad gridded source keeps clean recess walls with bounded actual topology counts',()=>{
 const f=quadBand();assert.equal(f.mesh.faces.every(f=>f.length===4),true);const b=buildNegativeExtrude(f.mesh,f.ids,-.1);assert.equal(b.ok,true,b.reason);valid(b.mesh);assert.equal(b.mesh.faces.length,134);assert.equal(b.mesh.faces.filter(f=>f.length===3).length,0);
 const g=quadBand(),r=previewRuntime(g.mesh,g.ids);r.begin();r.preview(.2);r.finish();const a=buildNegativeExtrude(g.mesh,[27],-.15);assert.equal(a.ok,true,a.reason);valid(a.mesh);assert.equal(a.mesh.faces.length,138);assert.equal(a.mesh.faces.filter(f=>f.length===3).length,0);
});
