import test from 'node:test';
import assert from 'node:assert/strict';
import * as THREE from 'three';
import {EditableMesh} from './helpers/modelling-combinations-runtime.mjs';
import {knifeScreenRuntime} from './helpers/knife-screen-runtime.mjs';
const snapshot=m=>({v:m.vertices.map(v=>v.toArray()),f:Array.from(m.faces,f=>Array.from(f)),g:Array.from(m.faceGroups),c:[...m.creases],le:[...m.looseEdges||[]],lv:[...m.looseVertices||[]]});
function fixture(){
 const m=EditableMesh.cube();m.faceGroups.fill('Shell');m.creases.set('4:5',.7);const camera=new THREE.PerspectiveCamera(45,1,.1,100);camera.position.set(0,0,8);camera.updateMatrixWorld();const f=knifeScreenRuntime(m,camera),a=f.point(4,5,.3),b=f.point(6,7,.6);a.y-=2;b.y+=2;f.ctx.__boxlabHistory.redoStack.push(m.clone());
 return{m,f,a,b,start:()=>{f.arm();f.pointer('pointerdown',a);f.pointer('pointermove',b);assert.equal(f.captures.size,1);assert.ok(f.markers.size)}};
}
for(const phase of ['pointermove','pointerup'])for(const change of ['mesh','object','lock','mode'])test(`Knife ${phase} after ${change} change cancels without cutting or clearing redo`,()=>{
 const {m,f,a,b,start}=fixture(),before=snapshot(m),replacement=m.clone();start();if(change==='mesh')f.ctx.__boxlabBridgeState.mesh=replacement;else if(change==='object')f.ctx.__boxlabObjectManager.activeId=2;else if(change==='lock')f.setLocked(true);else f.setMode('edge');f.pointer(phase,b);f.pointer('pointerup',b);assert.deepEqual(snapshot(m),before);assert.deepEqual(snapshot(replacement),before);assert.equal(f.ctx.__boxlabHistory.undoStack.length,0);assert.equal(f.ctx.__boxlabHistory.redoStack.length,1);assert.equal(f.ctx.__boxlabKnifeTool.armed(),false);assert.equal(f.captures.size,0);assert.equal(f.markers.size,0);assert.ok(f.events.some(e=>e.type==='boxlab-knife-disarmed'));
});
test('locked object cannot arm Knife or receive a Pencil cut from an already armed tool',()=>{
 for(const beforeArm of [true,false]){const {m,f,a,b}=fixture(),before=snapshot(m);if(beforeArm)f.setLocked(true);f.arm();if(!beforeArm)f.setLocked(true);f.pointer('pointerdown',a);f.pointer('pointermove',b);f.pointer('pointerup',b);assert.deepEqual(snapshot(m),before);assert.equal(f.ctx.__boxlabHistory.undoStack.length,0);assert.equal(f.ctx.__boxlabHistory.redoStack.length,1);assert.equal(f.captures.size,0);assert.equal(f.markers.size,0);assert.equal(f.ctx.__boxlabKnifeTool.armed(),false)}
});
for(const exit of ['pointercancel','lostpointercapture','escape','blur','done','exclusive','bridge'])test(`Knife ${exit} releases gesture capture/markers without a cut or history`,()=>{
 const {m,f,b,start}=fixture(),before=snapshot(m);start();if(exit==='pointercancel'||exit==='lostpointercapture')f.pointer(exit,b);else if(exit==='escape')f.emitWindow('keydown',{key:'Escape'});else if(exit==='blur')f.emitWindow('blur');else if(exit==='done')f.ctx.__boxlabKnifeTool.disarm('selection-hub-done');else if(exit==='exclusive')f.emitDocument('boxlab-direct-tool-exclusive',{tool:'bevel'});else{f.ctx.__boxlabObjectManager.activeId=2;f.emitWindow('boxlab-bridge-state')};assert.deepEqual(snapshot(m),before);assert.equal(f.ctx.__boxlabHistory.undoStack.length,0);assert.equal(f.ctx.__boxlabHistory.redoStack.length,1);assert.equal(f.captures.size,0);assert.equal(f.markers.size,0);f.pointer('pointerup',b);assert.deepEqual(snapshot(m),before);
});
test('ordinary Knife repeat remains armed with one history step per cut and exact Undo/Redo',()=>{
 const {m,f,a,b,start}=fixture(),before=snapshot(m);start();f.pointer('pointerup',b);assert.equal(f.ctx.__boxlabKnifeTool.armed(),true);assert.equal(f.captures.size,0);assert.equal(f.markers.size,0);assert.equal(f.ctx.__boxlabHistory.undoStack.length,1);const after=snapshot(m),undo=f.ctx.__boxlabHistory.undo(m);assert.deepEqual(snapshot(undo),before);assert.deepEqual(snapshot(f.ctx.__boxlabHistory.redo(undo)),after);
 const p=f.point(4,5,.7),q=f.point(6,7,.3);p.y-=2;q.y+=2;f.pointer('pointerdown',p);f.pointer('pointermove',q);f.pointer('pointerup',q);assert.equal(f.ctx.__boxlabHistory.undoStack.length,2);assert.equal(f.ctx.__boxlabKnifeTool.armed(),true);for(const e of m.edges())assert.equal(e.faces.length,2);assert.ok(m.faceGroups.every(g=>g==='Shell'));
});
