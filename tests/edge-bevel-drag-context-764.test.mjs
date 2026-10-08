import test from 'node:test';
import assert from 'node:assert/strict';
import {EditableMesh} from './helpers/modelling-combinations-runtime.mjs';
import {fixture} from './helpers/face-bevel-geometry-runtime.mjs';
const snap=m=>({v:m.vertices.map(v=>v.toArray()),f:Array.from(m.faces,f=>Array.from(f)),g:Array.from(m.faceGroups),c:[...m.creases],le:[...m.looseEdges||[]],lv:[...m.looseVertices||[]]});
function launch(){const m=EditableMesh.cube(),f=fixture(m);f.setMode('edge');f.setIds([0]);f.context.__boxlabObjectManager={activeId:'a'};f.node('#bevelBtn').listeners.get('click')({preventDefault(){},stopImmediatePropagation(){}});f.launch();let released=0;f.node('#viewport').releasePointerCapture=()=>released++;f.context.__boxlabHistory.redoStack.push(m.clone());f.pointer('pointerdown');return{m,f,released:()=>released};}
for(const afterPreview of [false,true])for(const terminal of ['pointermove','pointerup','pointercancel','disarm'])test(`Edge Bevel preserves newer geometry ${afterPreview?'after':'before'} preview on ${terminal}`,()=>{
 const {m,f,released}=launch();if(afterPreview)f.pointer('pointermove',20);m.vertices[0].x+=.125;m.faceGroups[0]='New';const current=snap(m);if(terminal==='disarm')f.owner.disarm();else f.pointer(terminal,40);assert.deepEqual(snap(m),current);assert.equal(f.context.__boxlabHistory.undoStack.length,0);assert.equal(f.context.__boxlabHistory.redoStack.length,1);assert.equal(f.owner.busy(),false);assert.equal(f.context.__boxlabBridgeState.controls.enabled,true);assert.equal(released(),1);
});
for(const change of ['mode','object','lock','mesh'])for(const terminal of ['pointermove','pointerup'])test(`Edge Bevel rejects ${change} context on ${terminal} and rolls back only its owned preview`,()=>{
 const {m,f,released}=launch(),before=snap(m);f.pointer('pointermove',20);let replacement;
 if(change==='mode')f.setMode('face');if(change==='object')f.context.__boxlabObjectManager.activeId='b';if(change==='lock')f.setLocked(true);if(change==='mesh'){replacement=EditableMesh.cube();replacement.vertices[0].x+=5;f.context.__boxlabBridgeState.mesh=replacement;}const other=replacement&&snap(replacement);
 f.pointer(terminal,40);assert.deepEqual(snap(m),before);if(replacement)assert.deepEqual(snap(replacement),other);assert.equal(f.context.__boxlabHistory.undoStack.length,0);assert.equal(f.context.__boxlabHistory.redoStack.length,1);assert.equal(f.owner.busy(),false);assert.equal(released(),1);
});
for(const terminal of ['pointerup','pointercancel','disarm'])test(`normal repeated Edge Bevel ${terminal} retains exact history and rollback`,()=>{
 const {m,f}=launch(),before=snap(m);f.pointer('pointermove',20);f.pointer('pointermove',40);assert.notDeepEqual(snap(m),before);if(terminal==='disarm')f.owner.disarm();else f.pointer(terminal,40);const h=f.context.__boxlabHistory;if(terminal==='pointerup'){assert.equal(h.undoStack.length,1);const after=snap(m),undo=h.undo(m);assert.deepEqual(snap(undo),before);assert.deepEqual(snap(h.redo(undo)),after);}else{assert.deepEqual(snap(m),before);assert.equal(h.undoStack.length,0);assert.equal(h.redoStack.length,1);}
});
for(const change of ['groups','creases','loose','topology'])test(`Edge Bevel refuses newer ${change} values without reverting them`,()=>{
 const {m,f}=launch();f.pointer('pointermove',20);if(change==='groups')m.faceGroups[0]='Reassigned';if(change==='creases')m.creases.set('0:1',.75);if(change==='loose')m.looseVertices=new Set([0]);if(change==='topology')m.faces[0].reverse();const current=snap(m);f.pointer('pointerup');assert.deepEqual(snap(m),current);assert.equal(f.context.__boxlabHistory.undoStack.length,0);assert.equal(f.context.__boxlabHistory.redoStack.length,1);
});
test('same-value Edge preview arrays remain valid and persistent session can repeat after commit',()=>{
 const {m,f}=launch();f.pointer('pointermove',20);m.vertices=m.vertices.map(v=>v.clone());m.faces=m.faces.map(face=>[...face]);m.faceGroups=[...m.faceGroups];f.pointer('pointerup');assert.equal(f.context.__boxlabHistory.undoStack.length,1);assert.equal(f.owner.active(),true);f.setIds([0]);f.pointer('pointerdown');f.pointer('pointermove',30);f.pointer('pointerup');assert.equal(f.context.__boxlabHistory.undoStack.length,2);assert.equal(f.owner.busy(),false);
});
