import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import * as THREE from 'three';
import {parseEditableOBJ} from '../src/obj-facegroups-core.js';
import {faceRuntime,snapshot,volume} from './helpers/negative-extrude-runtime.mjs';
import {planThrough,validateThrough} from '../src/through-kernel.js';
const original=parseEditableOBJ(fs.readFileSync(new URL('./fixtures/bevel-inset-750.obj',import.meta.url),'utf8'))[0].mesh;
const precision=fs.readFileSync(new URL('../src/precision-face.js',import.meta.url),'utf8');
const helpers=precision.slice(precision.indexOf('function centerOfFace('),precision.indexOf('function minBoundaryEdge('));
function setup(offset,source=helpers){
 const m=original.clone(),fi=7,r=faceRuntime(m,[fi],{fallback:true}),center=m.faces[fi].reduce((v,i)=>v.add(m.vertices[i]),new THREE.Vector3()).multiplyScalar(1/m.faces[fi].length),normal=m.faceNormal(fi),camera=r.state.camera;
 camera.position.copy(center).addScaledVector(normal,5).add(new THREE.Vector3(0,offset,0));camera.lookAt(center);camera.updateMatrixWorld();
 const c={THREE,canvas:r.elements.get('#viewport')};vm.createContext(c);vm.runInContext(source,c);
 return{m,r,fi,c,camera};
}
function exact(s,value){
 const {m,r,fi,c,camera}=s,n=c.faceNormalScreen(m,fi,camera);
 r.owner.setTool('extrude');r.pointer('pointerdown',{pointerId:9876});r.pointer('pointermove',{pointerId:9876,clientX:400+n.x*value/.006,clientY:300+n.y*value/.006});r.pointer('pointerup',{pointerId:9876});
}
test('977 precision-generated inward values reach same closed Through result at head-on, threshold band and oblique views',()=>{
 let expected=null;
 for(const offset of [0,1e-8,1e-7,3e-7,1e-6,3e-6,1e-5,.01,1,3]){
  const s=setup(offset),before=snapshot(s.m);exact(s,-2.2);
  assert.equal(s.r.history.undoStack.length,1);assert.equal(s.r.selected().length,0);assert.equal(validateThrough(s.m).ok,true);assert.ok(volume(s.m)<volume(original));
  const after=snapshot(s.m);expected??=after;assert.equal(after,expected);
  const undo=s.r.history.undo(s.m);assert.equal(snapshot(undo),before);assert.equal(snapshot(s.r.history.redo(undo)),after);
 }
});
test('977 camera regression detects former mismatched fallback, without changing production source',()=>{
 const old=setup(1e-6,helpers.replace('l>1e-4?','l>1e-5?'));exact(old,-2.2);
 assert.equal(old.r.selected().length,1);assert.ok(volume(old.m)>volume(original),'old precision direction incorrectly extrudes outward');
});
test('977 physical projected-normal drag remains consistent and pure Through plan remains camera independent',()=>{
 const expected=planThrough(original,7);let result=null;
 for(const offset of [0,1e-6,.01,1,3]){
  const s=setup(offset);assert.deepEqual(planThrough(s.m,7),expected);s.r.physicalCut(-2.2);assert.equal(validateThrough(s.m).ok,true);assert.equal(s.r.selected().length,0);assert.equal(s.r.history.undoStack.length,1);result??=snapshot(s.m);assert.equal(snapshot(s.m),result);
 }
});
