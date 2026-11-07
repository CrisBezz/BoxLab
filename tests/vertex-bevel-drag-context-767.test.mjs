import test from 'node:test';
import assert from 'node:assert/strict';
import {EditableMesh} from './helpers/modelling-combinations-runtime.mjs';
import {installVertexBevelTopology} from '../src/vertex-bevel-topology.js';
import {installMultiVertexBevelTopology} from '../src/multi-vertex-bevel-topology.js';
import {vertexBevelRuntime} from './helpers/vertex-bevel-runtime.mjs';
import {snapshot} from './helpers/negative-extrude-runtime.mjs';
installVertexBevelTopology(EditableMesh);installMultiVertexBevelTopology(EditableMesh);
function launch(ids=[0,1],start=true){const m=EditableMesh.cube(),f=vertexBevelRuntime(m,ids);let mode='vertex',locked=false,releases=0;f.ctx.__boxlabSelectionBridge.mode=()=>mode;f.node('#app').classList.contains=()=>locked;f.node('#viewport').releasePointerCapture=()=>releases++;f.arm();f.ctx.__boxlabHistory.redoStack.push(m.clone());if(start)f.pointer('pointerdown');return{m,f,mode:v=>mode=v,lock:()=>locked=true,releases:()=>releases};}
for(const afterPreview of [false,true])for(const terminal of ['pointermove','pointerup','pointercancel','disarm'])test(`Vertex Bevel preserves newer source ${afterPreview?'after':'before'} preview on ${terminal}`,()=>{
 const {m,f,releases}=launch();if(afterPreview)f.pointer('pointermove',20);m.vertices[0].x+=.125;m.faceGroups[0]='New';const current=snapshot(m);if(terminal==='disarm')f.owner.disarm();else f.pointer(terminal,40);assert.equal(snapshot(m),current);assert.equal(f.ctx.__boxlabHistory.undoStack.length,0);assert.equal(f.ctx.__boxlabHistory.redoStack.length,1);assert.equal(f.owner.busy(),false);assert.equal(releases(),1);
});
for(const change of ['mode','object','lock','mesh'])for(const terminal of ['pointermove','pointerup'])test(`Vertex Bevel rejects ${change} on ${terminal} and rolls back only owned preview`,()=>{
 const {m,f,mode,lock,releases}=launch(),before=snapshot(m);f.pointer('pointermove',20);let replacement;
 if(change==='mode')mode('face');if(change==='object')f.ctx.__boxlabObjectManager.activeId=2;if(change==='lock')lock();if(change==='mesh'){replacement=EditableMesh.cube();replacement.vertices[0].x+=5;f.ctx.__boxlabBridgeState.mesh=replacement;}const other=replacement&&snapshot(replacement),selection=[...f.ids()];
 f.pointer(terminal,40);assert.equal(snapshot(m),before);if(replacement)assert.equal(snapshot(replacement),other);assert.deepEqual(f.ids(),selection);assert.equal(f.ctx.__boxlabHistory.undoStack.length,0);assert.equal(f.ctx.__boxlabHistory.redoStack.length,1);assert.equal(f.owner.busy(),false);assert.equal(releases(),1);
});
for(const change of ['groups','creases','looseEdges','looseVertices','topology'])test(`Vertex Bevel preserves newer ${change} values on release`,()=>{
 const {m,f}=launch();f.pointer('pointermove',20);if(change==='groups')m.faceGroups[0]='Reassigned';if(change==='creases')m.creases.set('0:1',.75);if(change==='looseEdges')m.looseEdges=new Set(['0:1']);if(change==='looseVertices')m.looseVertices=new Set([0]);if(change==='topology')m.faces[0].reverse();const current=snapshot(m);f.pointer('pointerup');assert.equal(snapshot(m),current);assert.equal(f.ctx.__boxlabHistory.undoStack.length,0);assert.equal(f.ctx.__boxlabHistory.redoStack.length,1);
});
for(const terminal of ['pointerup','pointercancel','disarm'])test(`normal repeated Vertex Bevel ${terminal} retains exact history and rollback`,()=>{
 const {m,f,releases}=launch(),before=snapshot(m);f.pointer('pointermove',20);f.pointer('pointermove',40);assert.notEqual(snapshot(m),before);if(terminal==='disarm')f.owner.disarm();else f.pointer(terminal);const h=f.ctx.__boxlabHistory;if(terminal==='pointerup'){assert.equal(h.undoStack.length,1);const after=snapshot(m),undo=h.undo(m);assert.equal(snapshot(undo),before);assert.equal(snapshot(h.redo(undo)),after);}else{assert.equal(snapshot(m),before);assert.equal(h.undoStack.length,0);assert.equal(h.redoStack.length,1);}assert.equal(releases(),1);
});
test('equal-value replaced Vertex preview arrays remain valid',()=>{const {m,f}=launch();f.pointer('pointermove',20);m.vertices=m.vertices.map(v=>v.clone());m.faces=m.faces.map(face=>[...face]);m.faceGroups=[...m.faceGroups];f.pointer('pointerup');assert.equal(f.ctx.__boxlabHistory.undoStack.length,1);});
for(const context of ['locked','Face'])test(`armed Vertex Bevel cannot start on ${context} context`,()=>{const {m,f,mode,lock,releases}=launch([0,1],false),before=snapshot(m);if(context==='locked')lock();else mode('face');f.pointer('pointerdown');f.pointer('pointermove',40);f.pointer('pointerup');assert.equal(snapshot(m),before);assert.equal(f.owner.busy(),false);assert.equal(f.ctx.__boxlabHistory.undoStack.length,0);assert.equal(f.ctx.__boxlabHistory.redoStack.length,1);assert.equal(releases(),0);});
test('Vertex Bevel press without movement releases capture and preserves redo',()=>{const {m,f,releases}=launch(),before=snapshot(m);f.pointer('pointerup');assert.equal(snapshot(m),before);assert.equal(f.ctx.__boxlabHistory.undoStack.length,0);assert.equal(f.ctx.__boxlabHistory.redoStack.length,1);assert.equal(releases(),1);assert.equal(f.owner.busy(),false);});
