import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import * as THREE from 'three';
import {EditableMesh} from '../src/mesh.js';
import {installFaceRegion} from '../src/face-region.js';
import {parseEditableOBJ} from '../src/obj-facegroups-core.js';
import {faceRuntime,snapshot,volume} from './helpers/negative-extrude-runtime.mjs';
globalThis.document={querySelector:()=>null};installFaceRegion(EditableMesh);delete globalThis.document;
vm.runInNewContext(fs.readFileSync(new URL('../src/uniform-inset.js',import.meta.url),'utf8').replace(/^import .*;\n/gm,''),{EditableMesh,THREE});
const precision=fs.readFileSync(new URL('../src/precision-face.js',import.meta.url),'utf8').replace(/^import .*;\n/gm,'');
function runtime(mesh,ids){
 const r=faceRuntime(mesh,ids,{fallback:true}),created=[],observers=[];
 const element=()=>{const e={style:{},value:'',textContent:'',append(){},addEventListener(){},blur(){}};created.push(e);return e;};
 r.context.document.createElement=element;
 r.context.document.querySelector('[data-mode-tools="face"]').append=()=>{};
 for(const [selector,tool] of [['#extrudeBtn','extrude'],['#insetBtn','inset']]){
  const e=r.context.document.querySelector(selector);e.classList.contains=()=>r.api.tool()===tool;e.click=()=>r.owner.setTool(r.api.tool()===tool?null:tool);
 }
 r.elements.get('#inferenceSnapToggle').checked=true;
 r.context.MutationObserver=class{constructor(callback){observers.push(callback);}observe(){}};
 vm.runInContext('(function(){'+precision+'\n})();',r.context);
 return{...r,observe:()=>observers.forEach(fn=>fn()),precision:r.context.window.__boxlabPrecisionFace,readout:()=>created.find(e=>e.id==='precisionFaceReadout').textContent};
}
function sample(){const p=parseEditableOBJ(fs.readFileSync(new URL('./fixtures/bevel-inset-750.obj',import.meta.url),'utf8'))[0].mesh;return new EditableMesh(p.vertices,p.faces,p.creases,p.faceGroups);}
test('979 actual precision entry ignores inference for exact distance across camera views, retains toggle and one history step',()=>{
 for(const pos of [[5,3,5],[0,0,6],[-4,2,3]]){
  const m=EditableMesh.cube(2),r=runtime(m,[1]),before=m.clone();r.state.camera.position.set(...pos);r.state.camera.lookAt(0,0,0);r.state.camera.updateMatrixWorld();
  assert.equal(r.precision.applyFor('extrude',.37),true);assert.ok(Math.abs(m.faceCenter(1).clone().sub(before.faceCenter(1)).dot(before.faceNormal(1))-.37)<1e-8);assert.equal(r.history.undoStack.length,1);assert.equal(r.elements.get('#inferenceSnapToggle').checked,true);assert.equal(r.precision.last().source,'exact');assert.ok(Math.abs(r.precision.last().value-.37)<1e-8);
  const undo=r.history.undo(m);assert.equal(snapshot(undo),snapshot(before));assert.equal(snapshot(r.history.redo(undo)),snapshot(m));
 }
});
test('979 Through Exact records committed shell depth instead of requested overshoot, across near-front/orbited views',()=>{
 for(const epsilon of [0,1e-6,.01,1]){
  const m=sample(),before=m.clone(),r=runtime(m,[7]),c=m.faceCenter(7),n=m.faceNormal(7);r.state.camera.position.copy(c).addScaledVector(n,5).add(new THREE.Vector3(0,epsilon,0));r.state.camera.lookAt(c);r.state.camera.updateMatrixWorld();
  assert.equal(r.precision.applyFor('extrude',-2.2),true);assert.equal(r.selected().length,0);assert.equal(r.history.undoStack.length,1);assert.ok(volume(m)<volume(before));assert.ok(Math.abs(r.precision.last().value+2)<1e-8);assert.match(r.readout(),/-2\.000/);
 }
});
test('979 downstream refusal preserves mesh/history and last successful Repeat value; no success event for failure',()=>{
 const m=EditableMesh.cube(2),r=runtime(m,[1]);r.precision.commit('extrude',.123,'geometry');const previous=r.precision.last(),before=snapshot(m),events=r.events.filter(e=>e.type==='boxlab-face-value-committed').length;
 assert.equal(r.precision.applyFor('extrude',-100),false);assert.equal(snapshot(m),before);assert.equal(r.history.undoStack.length,0);assert.equal(r.precision.last(),previous);assert.equal(r.precision.value(),.123);assert.match(r.readout(),/refused/);assert.equal(r.events.filter(e=>e.type==='boxlab-face-value-committed').length,events);
});
test('979 Inset Exact ignores inference and reports the actual clamped inset distance',()=>{
 const m=EditableMesh.cube(2),r=runtime(m,[1]);assert.equal(r.precision.applyFor('inset',100),true);assert.equal(r.history.undoStack.length,1);assert.ok(Math.abs(r.precision.last().value-.95)<1e-8);assert.match(r.readout(),/0\.950/);
});
test('979 zero, nonfinite and unavailable history do not dispatch numeric geometry operations',()=>{
 for(const value of [0,NaN,Infinity]){const m=EditableMesh.cube(2),r=runtime(m,[1]),before=snapshot(m);assert.equal(r.precision.applyFor('extrude',value),false);assert.equal(snapshot(m),before);assert.equal(r.history.undoStack.length,0);assert.equal(r.precision.last(),null);}
 const m=EditableMesh.cube(2),r=runtime(m,[1]),before=snapshot(m);r.context.__boxlabHistory=null;assert.equal(r.precision.applyFor('extrude',.3),false);assert.equal(snapshot(m),before);
});
test('979 real inference owner still picks physical vertex references but refuses the identical numeric synthetic contact',()=>{
 const m=EditableMesh.cube(2),r=runtime(m,[1]),vi=m.vertices.findIndex((_,i)=>!m.faces[1].includes(i)),point=r.context.screenPoint(m.vertices[vi],r.state.camera),d={before:m,faces:[1],camera:r.state.camera},e={clientX:point.x,clientY:point.y};
 assert.equal(r.context.referenceUnderPointer({...e,pointerId:22},d)?.type,'Vertex');assert.equal(r.context.referenceUnderPointer({...e,pointerId:9876},d),null);assert.equal(r.elements.get('#inferenceSnapToggle').checked,true);
});

test('979 refusal stays visible through later status observer callbacks even with no prior successful value',()=>{
 const m=EditableMesh.cube(2),r=runtime(m,[1]);assert.equal(r.precision.applyFor('extrude',-100),false);const error=r.readout();assert.match(error,/refused/);r.observe();assert.equal(r.readout(),error);assert.equal(r.precision.last(),null);
});
