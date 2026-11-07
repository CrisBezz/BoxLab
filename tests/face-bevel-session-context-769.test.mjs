import test from 'node:test';
import assert from 'node:assert/strict';
import {fixture} from './helpers/face-bevel-geometry-runtime.mjs';
import {EditableMesh} from '../src/mesh.js';
const snapshot=m=>({v:m.vertices.map(v=>v.toArray()),f:Array.from(m.faces,f=>Array.from(f)),g:Array.from(m.faceGroups),c:[...m.creases],le:[...m.looseEdges||[]],lv:[...m.looseVertices||[]]});
function launch(){const m=EditableMesh.cube();m.faceGroups.fill('Original');const f=fixture(m);f.context.__boxlabObjectManager={activeId:'a'};let released=0,captured=0;f.node('#viewport').releasePointerCapture=()=>released++;f.node('#viewport').setPointerCapture=()=>captured++;f.launch();f.context.__boxlabHistory.redoStack.push(m.clone());return{m,f,released:()=>released,captured:()=>captured};}
function unchanged(m,f,before){assert.deepEqual(snapshot(m),before);assert.equal(f.context.__boxlabHistory.undoStack.length,0);assert.equal(f.context.__boxlabHistory.redoStack.length,1);}
for(const action of ['Apply','slider','press'])test(`Face Bevel ${action} refuses a different active object sharing the same mesh`,()=>{
 const {m,f,captured}=launch(),before=snapshot(m);f.context.__boxlabObjectManager.activeId='b';
 if(action==='Apply')assert.equal(f.owner.applyExact(30).ok,false);
 if(action==='slider'){assert.equal(f.owner.previewFaces(30).ok,false);assert.equal(f.context.__boxlabBridgeState.scene.children.length,0);}
 if(action==='press'){f.pointer('pointerdown');assert.equal(f.owner.busy(),false);assert.equal(f.owner.faceActive(),false);assert.equal(captured(),0);}
 unchanged(m,f,before);
});
for(const terminal of ['pointermove','pointerup','pointercancel'])test(`Face Bevel ${terminal} retires a drag after active object changes without mesh replacement`,()=>{
 const {m,f,released}=launch(),before=snapshot(m);f.pointer('pointerdown');f.pointer('pointermove',20);assert.equal(f.owner.busy(),true);f.context.__boxlabObjectManager.activeId='b';f.pointer(terminal,40);
 assert.equal(f.owner.busy(),false);assert.equal(f.owner.faceActive(),false);assert.equal(released(),1);assert.equal(f.context.__boxlabBridgeState.controls.enabled,true);assert.equal(f.context.__boxlabBridgeState.scene.children.length,0);unchanged(m,f,before);
});
for(const action of ['Cancel','pointercancel'])test(`Face Bevel ${action} preserves a newer Face selection`,()=>{
 const {m,f}=launch(),before=snapshot(m);if(action==='pointercancel')f.pointer('pointerdown');f.setIds([1]);if(action==='Cancel')f.action('cancel');else f.pointer('pointercancel');assert.deepEqual(Array.from(f.ids()),[1]);assert.equal(f.owner.faceActive(),false);unchanged(m,f,before);
});
for(const change of ['object','mesh','mode','lock'])test(`Face Bevel Cancel preserves current ${change} context and newer selection`,()=>{
 const {m,f}=launch(),before=snapshot(m);f.pointer('pointerdown');let other;
 if(change==='object')f.context.__boxlabObjectManager.activeId='b';if(change==='mesh'){other=EditableMesh.cube();other.vertices[0].x+=5;f.context.__boxlabBridgeState.mesh=other;}if(change==='mode')f.setMode('edge');if(change==='lock')f.setLocked(true);f.setIds([1]);const replacement=other&&snapshot(other);f.action('cancel');assert.deepEqual(Array.from(f.ids()),[1]);assert.equal(f.owner.busy(),false);assert.equal(f.context.__boxlabBridgeState.controls.enabled,true);unchanged(m,f,before);if(other)assert.deepEqual(snapshot(other),replacement);
});
for(const terminal of ['Apply','Cancel','pointercancel'])test(`unchanged Face Bevel ${terminal} keeps blue preview and original history contract`,()=>{
 const {m,f,released}=launch(),before=snapshot(m);f.pointer('pointerdown');f.pointer('pointermove',20);assert.equal(f.context.__boxlabBridgeState.scene.children.length>0,true);unchanged(m,f,before);
 if(terminal==='pointercancel')f.pointer('pointercancel');else{f.pointer('pointerup',20);assert.equal(f.owner.busy(),false);assert.equal(f.owner.faceActive(),true);if(terminal==='Apply'){assert.equal(f.owner.applyExact(25).ok,true);const result=snapshot(m),h=f.context.__boxlabHistory;assert.equal(h.undoStack.length,1);const undone=h.undo(m);assert.deepEqual(snapshot(undone),before);assert.deepEqual(snapshot(h.redo(undone)),result);}else f.action('cancel');}
 if(terminal!=='Apply'){unchanged(m,f,before);assert.deepEqual(Array.from(f.ids()),[0]);}assert.equal(f.owner.faceActive(),false);assert.equal(released(),1);assert.equal(f.context.__boxlabBridgeState.controls.enabled,true);assert.equal(f.context.__boxlabBridgeState.scene.children.length,0);
});
test('Face Bevel panel sync closes stale object preview and preserves current selection',()=>{
 const {m,f}=launch(),before=snapshot(m);f.context.__boxlabObjectManager.activeId='b';f.setIds([1]);f.panel.sync();assert.equal(f.panel.active(),false);assert.equal(f.owner.faceActive(),false);assert.deepEqual(Array.from(f.ids()),[1]);assert.equal(f.context.__boxlabBridgeState.scene.children.length,0);unchanged(m,f,before);
});
test('Face Bevel relaunch on the current object uses fresh selection and commits once',()=>{
 const {m,f}=launch();f.context.__boxlabObjectManager.activeId='b';f.setIds([2]);f.panel.sync();f.launch();const before=snapshot(m);assert.equal(f.owner.applyExact(20).ok,true);const result=snapshot(m),h=f.context.__boxlabHistory;assert.equal(h.undoStack.length,1);const undone=h.undo(m);assert.deepEqual(snapshot(undone),before);assert.deepEqual(snapshot(h.redo(undone)),result);
});
for(const action of ['Apply','Cancel'])test(`connected multi-Face Bevel ${action} retains current object ownership and history`,()=>{
 const {m,f}=launch();f.action('cancel');f.setIds([0,2]);f.launch();const before=snapshot(m);assert.equal(f.owner.previewState()?.ok,true);if(action==='Apply'){assert.equal(f.owner.applyExact(20).ok,true);assert.equal(f.context.__boxlabHistory.undoStack.length,1);assert.deepEqual(snapshot(f.context.__boxlabHistory.undo(m)),before);}else{f.action('cancel');assert.deepEqual(Array.from(f.ids()),[0,2]);unchanged(m,f,before);}
});
