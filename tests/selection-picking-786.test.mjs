import test from 'node:test';
import assert from 'node:assert/strict';
import * as THREE from 'three';
import {EditableMesh} from '../src/mesh.js';
import {vertexRuntime} from './helpers/vertex-extrude-runtime.mjs';
import {nativeOwner} from './helpers/background-selection-runtime.mjs';
import {mainPickerRuntime} from './helpers/main-picker-runtime.mjs';
import {snapshot} from './helpers/negative-extrude-runtime.mjs';
import {frontFaceTap} from './helpers/armed-face-behavior.mjs';

// Main window background classification precedes Vertex assist document capture.
// Real markers/raycasts and complete assist owner; controlled DOM/dispatch/render.
function vertexFixture(sourceTransform=source=>source){
 const m=new EditableMesh([[-1,0,1],[0,0,-1],[.12,0,1]],[]),f=vertexRuntime(m,[0],{sourceTransform});
 const body=new THREE.Mesh(new THREE.BoxGeometry(2,2,2),new THREE.MeshBasicMaterial({side:THREE.DoubleSide}));body.userData.kind='body';
 const addBody=()=>{f.state.scene.add(body);f.state.scene.updateMatrixWorld(true);};addBody();
 const render=f.render;f.context.__boxlabSelectionBridge.set=(type,ids)=>{f.setMode(type);f.setIds(ids);render();addBody();};
 const native=mainPickerRuntime({camera:f.state.camera,canvas:f.canvas,root:f.state.scene});
 const bg=nativeOwner({sourceTransform});bg.c.canvas=f.canvas;bg.c.selectionMode='vertex';bg.c.selectionIndices=f.ids;bg.c.clearSelection=()=>f.setIds([]);
 bg.c.pick=e=>native.bridge.pick('vertex',e);bg.c.__boxlabVertexPickAssist=f.context.__boxlabVertexPickAssist;
 let stamp=1000;
 const tap=(x,y)=>{const extra={target:f.canvas,pointerType:'pen',buttons:1,pressure:.5,clientY:y};bg.send('pointerdown',stamp,x,extra);f.pointer('pointerdown',{clientX:x,clientY:y});bg.send('pointerup',stamp+70,x,{...extra,pressure:0,buttons:0});f.pointer('pointerup',{clientX:x,clientY:y,pressure:0,buttons:0});stamp+=500;};
 return {f,bg,m,tap};
}
test('786 assisted Vertex add/remove shares background hit classification and retains other selections',()=>{
 const r=vertexFixture(),p=r.f.screen(r.m.vertices[2]),before=snapshot(r.m);r.f.history.redoStack.push(r.m.clone());
 r.tap(p.x+8,p.y);assert.deepEqual(Array.from(r.f.ids()),[0,2]);
 r.tap(p.x+8,p.y);assert.deepEqual(Array.from(r.f.ids()),[0]);
 assert.equal(snapshot(r.m),before);assert.equal(r.f.history.undoStack.length,0);assert.equal(r.f.history.redoStack.length,1);
});
test('786 rendered front Vertex wins over hidden rear marker near its centre',()=>{
 const r=vertexFixture();assert.equal(r.f.context.__boxlabVertexPickAssist.nearestVertexAt(500,300)?.i,2);
});
test('786 armed Face taps use native front hit despite rear selected priority or Extrude continuation',()=>frontFaceTap());


test('786 regressions reject restored background conflict, hidden-marker priority and rear-Face tap routing',()=>{
 const bg=vertexFixture(source=>source.replace("  if(selectionMode==='vertex'&&globalThis.__boxlabVertexPickAssist?.pick?.(event)){backgroundSelectionTap.reset('vertex-assist-hit');backgroundTap=null;return;}",''));
 const p=bg.f.screen(bg.m.vertices[2]);bg.tap(p.x+8,p.y);assert.notDeepEqual(Array.from(bg.f.ids()),[0,2]);
 const hidden=vertexFixture(source=>source.replace('return !surface||surface.distance>=distance-Math.max(1e-5,distance*1e-5);','return true;'));
 assert.notEqual(hidden.f.context.__boxlabVertexPickAssist.nearestVertexAt(500,300)?.i,2);
 assert.throws(()=>frontFaceTap(source=>source.replace('if(Number.isInteger(p.tapHit))p.hit=p.tapHit;','')),{name:'AssertionError'});
});
