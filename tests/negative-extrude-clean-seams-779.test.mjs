import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import * as THREE from 'three';
import {EditableMesh} from '../src/mesh.js';
import {parseEditableOBJ} from '../src/obj-facegroups-core.js';
import {buildNegativeExtrude,validateThrough} from '../src/through-kernel.js';
import {faceRuntime,snapshot,volume} from './helpers/negative-extrude-runtime.mjs';
const load=name=>{const p=parseEditableOBJ(fs.readFileSync(new URL(`./fixtures/negative-extrude-779-${name}.obj`,import.meta.url),'utf8'))[0].mesh;return new EditableMesh(p.vertices,p.faces,p.creases,p.faceGroups);};
const source=fs.readFileSync(new URL('../src/through-kernel.js',import.meta.url),'utf8');
function privateKernel(transform=s=>s){
  const c={THREE,__boxlabTopology:globalThis.__boxlabTopology};vm.createContext(c);
  vm.runInContext(transform(source).replace(/^import .*;\n/gm,'').replace(/export function/g,'function')+'\nglobalThis.kernel={buildNegativeExtrude,coalesceBoundaryParts,areaVector};',c);return c.kernel;
}
const near=(a,b)=>assert.ok(Math.abs(a-b)<1e-7,`${a} != ${b}`);
function cleanCut(m,d){const before=snapshot(m),r=buildNegativeExtrude(m,[0],d);assert.equal(r.ok,true,r.reason);assert.equal(snapshot(m),before);assert.equal(validateThrough(r.mesh).ok,true);assert.equal(r.mesh.vertices.length,110);assert.equal(r.mesh.faces.length,114);assert.equal(r.mesh.faces.filter(f=>f.length===3).length,0);assert.equal(r.faceIndices.length,1);assert.equal(r.mesh.faces[r.faceIndices[0]].length,4);near(volume(m)-volume(r.mesh),1.772**2*-d);return r;}
test('779 supplied before/after identify source0 and reproduce prior fragmented cap',()=>{
  const before=load('before'),after=load('after');assert.equal(before.vertices.length,106);assert.equal(before.faces.length,110);assert.equal(after.vertices.length,149);assert.equal(after.faces.length,123);assert.ok(before.faces[0].every(i=>before.vertices[i].z===-1));
  const prior=privateKernel(s=>s.replace('coalesceBoundaryParts(accepted,eps)','mergeBoundaryParts(accepted,eps)')).buildNegativeExtrude(before,[0],-.161517);
  assert.equal(prior.ok,true,prior.reason);assert.deepEqual(Array.from(prior.mesh.faces,f=>Array.from(f)),after.faces);
  // Both exports round source coordinates to six decimals; intersecting slanted
  // planes amplify that rounding slightly. Topology is exact, points within 1e-4.
  prior.mesh.vertices.forEach((v,i)=>assert.ok(v.distanceTo(after.vertices[i])<1e-4));assert.equal(prior.faceIndices.length,3);
});
for(const d of [-.01,-.161517,-.5,-1,-2.2])test(`779 supplied recess ${d} retains one quad cap and four walls`,()=>cleanCut(load('before'),d));
test('779 unrelated faces retain exact cycles and points, labels/crease survive',()=>{
  const m=load('before');m.faceGroups=m.faces.map((_,i)=>`g${i}`);const edge=m.faces[1].slice(0,2);m.creases.set(m.edgeKey(...edge),.7);const r=cleanCut(m,-.161517);
  for(let i=1;i<106;i++){const fi=r.mesh.faceGroups.indexOf(`g${i}`);assert.ok(fi>=0);assert.deepEqual(r.mesh.faces[fi].map(id=>r.mesh.vertices[id].toArray()),m.faces[i].map(id=>m.vertices[id].toArray()));}
  assert.ok(r.faceIndices.every(i=>r.mesh.faceGroups[i]==='g0'));assert.equal(r.mesh.faceGroups.length,r.mesh.faces.length);assert.ok([...r.mesh.creases.values()].includes(.7));
});
test('779 rotated/translated/scaled source keeps simple cap and exact prism volume',()=>{
  const m=load('before'),q=new THREE.Quaternion().setFromEuler(new THREE.Euler(.4,.7,.2));m.vertices.forEach(v=>v.multiplyScalar(3).applyQuaternion(q).add(new THREE.Vector3(4,-2,7)));
  const r=buildNegativeExtrude(m,[0],-.161517*3);assert.equal(r.ok,true,r.reason);assert.equal(validateThrough(r.mesh).ok,true);assert.equal(r.mesh.faces.length,114);assert.equal(r.mesh.faces[r.faceIndices[0]].length,4);near(volume(m)-volume(r.mesh),1.772**2*.161517*27);
});
for(const method of ['physical','exact','replay'])test(`779 actual ${method} owner commits clean supplied cut once with Undo/Redo`,()=>{
  const m=load('before'),f=faceRuntime(m,[0],{fallback:true}),before=snapshot(m);
  if(method==='physical')f.physicalCut(-.161517);else if(method==='exact')f.exact(-.161517);else assert.equal(f.api.replay('extrude',-.161517,0),true);
  assert.equal(f.history.undoStack.length,1);assert.equal(m.vertices.length,110);assert.equal(m.faces.length,114);assert.equal(f.selected().length,1);assert.equal(m.faces[f.selected()[0]].length,4);const after=snapshot(m),undo=f.history.undo(m);assert.equal(snapshot(undo),before);assert.equal(snapshot(f.history.redo(undo)),after);
});
test('779 preview reversal and Cancel restore supplied source, groups and redo',()=>{
  const m=load('before'),f=faceRuntime(m,[0],{fallback:true}),before=snapshot(m);f.history.redoStack.push(m.clone());assert.equal(f.start(),true);f.move(-.161517);assert.equal(m.faces.length,114);f.move(.2);f.move(-.5);assert.equal(m.faces.length,114);f.finish('pointercancel');assert.equal(snapshot(m),before);assert.equal(f.history.undoStack.length,0);assert.equal(f.history.redoStack.length,1);assert.deepEqual(f.selected(),[0]);
});
test('779 private boundary union conforms mismatched seams but retains holes/disconnected pieces',()=>{
  const k=privateKernel(),p=coords=>coords.map(([x,y])=>new THREE.Vector3(x,y,0));
  const parts=[p([[0,0],[1,0],[1,2],[0,2]]),p([[1,0],[2,0],[2,1],[1,1]]),p([[1,1],[2,1],[2,2],[1,2]])];
  const r=k.coalesceBoundaryParts(parts,1e-7);assert.equal(r.length,1);assert.equal(r[0].length,4);near(k.areaVector(r[0]).z,4);
  const ring=[p([[0,0],[3,0],[3,1],[0,1]]),p([[0,2],[3,2],[3,3],[0,3]]),p([[0,1],[1,1],[1,2],[0,2]]),p([[2,1],[3,1],[3,2],[2,2]])];
  const holes=k.coalesceBoundaryParts(ring,1e-7);assert.ok(holes.length>1);near(holes.reduce((s,p)=>s+k.areaVector(p).z,0),8);
  const disconnected=k.coalesceBoundaryParts([parts[0],p([[4,0],[5,0],[5,1],[4,1]])],1e-7);assert.equal(disconnected.length,2);near(disconnected.reduce((s,p)=>s+k.areaVector(p).z,0),3);
});
