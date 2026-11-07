import test from 'node:test';
import assert from 'node:assert/strict';
import {EditableMesh,knife} from './helpers/modelling-combinations-runtime.mjs';
import {fixture} from './helpers/face-bevel-geometry-runtime.mjs';
const snapshot=m=>({v:m.vertices.map(v=>v.toArray()),f:Array.from(m.faces,f=>Array.from(f)),g:Array.from(m.faceGroups),c:[...m.creases],le:[...m.looseEdges||[]],lv:[...m.looseVertices||[]]});
function launch(mode){const m=EditableMesh.cube();m.faceGroups.fill('Original');const f=fixture(m);f.setMode(mode);f.setIds([0]);if(mode==='edge')f.node('#bevelBtn').listeners.get('click')({preventDefault(){},stopImmediatePropagation(){}});f.launch();f.context.__boxlabHistory.redoStack.push(m.clone());return{m,f};}
for(const mode of ['face','edge'])for(const labels of ['reassign','remove','resize'])test(`${mode} Bevel refuses stale ${labels} labels without history or source mutation`,()=>{
 const {m,f}=launch(mode);if(labels==='reassign')m.faceGroups[0]='New';else if(labels==='remove')m.faceGroups[0]=null;else m.faceGroups.pop();const current=snapshot(m);assert.equal(f.owner.applyExact(30).ok,false);assert.deepEqual(snapshot(m),current);assert.equal(f.context.__boxlabHistory.undoStack.length,0);assert.equal(f.context.__boxlabHistory.redoStack.length,1);
});
for(const mode of ['face','edge'])test(`${mode} slider sync and Cancel keep revised groups and redo`,()=>{
 const {m,f}=launch(mode);m.faceGroups[0]='New';const current=snapshot(m);if(mode==='face'){assert.equal(f.owner.previewFaces(25).ok,false);f.action('cancel')}else{f.owner.syncEdgePreview();assert.equal(f.owner.previewState(),null);f.action('cancel')}assert.deepEqual(snapshot(m),current);assert.equal(f.context.__boxlabHistory.undoStack.length,0);assert.equal(f.context.__boxlabHistory.redoStack.length,1);
});
for(const mode of ['face','edge'])test(`${mode} fresh preview after reassignment commits current provenance with exact Undo/Redo`,()=>{
 const {m,f}=launch(mode);m.faceGroups.fill('Reassigned');f.action('cancel');if(mode==='edge')f.node('#bevelBtn').listeners.get('click')({preventDefault(){},stopImmediatePropagation(){}});f.launch();const before=snapshot(m);f.node('#bevelSegments').value='3';f.node('#bevelSegments').listeners.get('input')();assert.equal(f.owner.applyExact(30).ok,true);assert.ok(m.faceGroups.every(g=>g==='Reassigned'));assert.equal(m.faceGroups.length,m.faces.length);const after=snapshot(m),h=f.context.__boxlabHistory;assert.equal(h.undoStack.length,1);assert.equal(h.redoStack.length,0);const undone=h.undo(m);assert.deepEqual(snapshot(undone),before);assert.deepEqual(snapshot(h.redo(undone)),after);for(const e of m.edges())assert.equal(e.faces.length,2);
});
for(const mode of ['face','edge'])test(`${mode} unchanged label values in a replaced array remain a valid preview`,()=>{
 const {m,f}=launch(mode);m.faceGroups=[...m.faceGroups];assert.equal(f.owner.applyExact(20).ok,true);assert.equal(f.context.__boxlabHistory.undoStack.length,1);assert.ok(m.faceGroups.every(g=>g==='Original'));
});
test('regrouped cage → Face Bevel → Knife → Loop retains current labels and closed topology',()=>{
 const {m,f}=launch('face');m.faceGroups.fill('New');assert.equal(f.owner.applyExact(20).ok,false);f.action('cancel');f.launch();assert.equal(f.owner.applyExact(20).ok,true);knife(m,f.context.__boxlabHistory,m.faces.findIndex(face=>face.length===4));assert.ok(m.faceGroups.every(g=>g==='New'));let successful=0;for(let seed=0;seed<m.edges().length;seed++){const trial=m.clone();if(!trial.loopCut(seed,.4))continue;successful++;assert.ok(trial.faceGroups.every(g=>g==='New'));assert.equal(trial.faceGroups.length,trial.faces.length);for(const e of trial.edges())assert.equal(e.faces.length,2)}assert.ok(successful);
});

for(const mode of ['face','edge'])test(`${mode} initially unlabelled legacy faces retain a usable preview`,()=>{
 const m=EditableMesh.cube();m.faceGroups=[];const f=fixture(m);f.setMode(mode);f.setIds([0]);if(mode==='edge')f.node('#bevelBtn').listeners.get('click')({preventDefault(){},stopImmediatePropagation(){}});const before=snapshot(m);f.launch();assert.equal(f.owner.previewState()?.ok,true);assert.deepEqual(snapshot(m),before);assert.equal(f.owner.applyExact(20).ok,true);assert.ok(m.faceGroups.every(g=>g===null));assert.equal(f.context.__boxlabHistory.undoStack.length,1);
});
