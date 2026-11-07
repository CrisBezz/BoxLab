import test from 'node:test';
import assert from 'node:assert/strict';
import {EditableMesh,knife} from './helpers/modelling-combinations-runtime.mjs';
import {installVertexBevelTopology} from '../src/vertex-bevel-topology.js';
import {installMultiVertexBevelTopology} from '../src/multi-vertex-bevel-topology.js';
import {vertexBevelRuntime} from './helpers/vertex-bevel-runtime.mjs';
import {History} from '../src/history.js';
import * as THREE from 'three';
installVertexBevelTopology(EditableMesh);installMultiVertexBevelTopology(EditableMesh);
const snapshot=m=>({v:m.vertices.map(v=>v.toArray()),f:Array.from(m.faces,f=>Array.from(f)),g:Array.from(m.faceGroups),c:[...m.creases],le:[...m.looseEdges||[]],lv:[...m.looseVertices||[]]});
function cage(mixed=false){const m=EditableMesh.cube();m.faceGroups=m.faces.map((_,i)=>mixed?`g${i}`:'Shell');m.creases.set('0:1',.7);const a=m.addLooseVertex(new THREE.Vector3(4,4,4)),b=m.addLooseVertex(new THREE.Vector3(5,4,4));m.addLooseEdge(a,b);return m;}
function closed(m){assert.equal(m.faceGroups.length,m.faces.length);for(const e of m.edges())if(!e.loose){assert.equal(e.faces.length,2);const directions=e.faces.map(i=>m.faces[i].some((v,j)=>v===e.a&&m.faces[i][(j+1)%m.faces[i].length]===e.b));assert.notEqual(...directions);}}
for(const ids of [[0],[0,1],[0,6]])for(const mixed of [false,true])test(`Vertex bevel ${ids} retains source groups and ${mixed?'mixed':'uniform'} cap provenance`,()=>{
 const m=cage(mixed),before=snapshot(m);assert.ok(m.bevelVertices(ids,.2));closed(m);assert.deepEqual(m.faceGroups.slice(0,6),before.g);assert.deepEqual(m.faceGroups.slice(6),ids.map(()=>mixed?null:'Shell'));assert.equal(m.looseEdges.size,1);assert.equal(m.looseVertices.size,2);
});
for(const ids of [[0],[0,1]])for(const action of ['cancel','apply'])test(`actual Vertex blue preview ${ids} ${action} preserves groups and history`,()=>{
 const m=cage(),before=snapshot(m),f=vertexBevelRuntime(m,ids);f.ctx.__boxlabHistory.redoStack.push(m.clone());f.arm();f.owner.setPopupPreview(true);assert.equal(f.owner.previewWidth(30).ok,true);assert.deepEqual(snapshot(m),before);
 if(action==='cancel'){f.owner.disarm();assert.deepEqual(snapshot(m),before);assert.equal(f.ctx.__boxlabHistory.undoStack.length,0);assert.equal(f.ctx.__boxlabHistory.redoStack.length,1)}else{assert.equal(f.owner.applyPreview(30).ok,true);closed(m);assert.ok(m.faceGroups.every(g=>g==='Shell'));assert.equal(f.ctx.__boxlabHistory.undoStack.length,1);const after=snapshot(m),undo=f.ctx.__boxlabHistory.undo(m);assert.deepEqual(snapshot(undo),before);assert.deepEqual(snapshot(f.ctx.__boxlabHistory.redo(undo)),after)}
});
for(const action of ['pointercancel','pointerup','disarm'])test(`actual Vertex repeated drag ${action} preserves exact groups and history`,()=>{
 const m=cage(),before=snapshot(m),f=vertexBevelRuntime(m,[0,1]);f.arm();f.pointer('pointerdown');f.pointer('pointermove',20);f.pointer('pointermove',40);closed(m);assert.ok(m.faceGroups.every(g=>g==='Shell'));
 if(action==='disarm')f.owner.disarm();else f.pointer(action);
 if(action==='pointerup'){assert.equal(f.ctx.__boxlabHistory.undoStack.length,1);const after=snapshot(m),undo=f.ctx.__boxlabHistory.undo(m);assert.deepEqual(snapshot(undo),before);assert.deepEqual(snapshot(f.ctx.__boxlabHistory.redo(undo)),after)}else{assert.deepEqual(snapshot(m),before);assert.equal(f.ctx.__boxlabHistory.undoStack.length,0)}
});
test('changed groups invalidate Vertex preview without history or overwriting labels',()=>{
 const m=cage(),f=vertexBevelRuntime(m);f.arm();f.owner.setPopupPreview(true);m.faceGroups[0]='Reassigned';const before=snapshot(m);assert.equal(f.owner.applyPreview(20).ok,false);assert.deepEqual(snapshot(m),before);assert.equal(f.ctx.__boxlabHistory.undoStack.length,0);
});
for(const operation of ['Loop','Knife'])test(`${operation} → Vertex Bevel preserves groups, closed shell and export`,async()=>{
 const m=cage(),h=new History();if(operation==='Loop')assert.ok(m.loopCut(0,.4));else knife(m,h);const ids=m.vertices.flatMap((_,i)=>m.multiVertexBevelInfo([i])?[i]:[]);assert.ok(ids.length);for(const id of ids){const trial=m.clone();assert.ok(trial.bevelVertices([id],.2));closed(trial);assert.ok(trial.faceGroups.every(g=>g==='Shell'));}const {buildSceneOBJ}=await import('../src/scene-obj-export-core.js'),{parseEditableOBJ}=await import('../src/obj-facegroups-core.js');assert.ok(m.bevelVertices([ids[0]],.2));const [parsed]=parseEditableOBJ(buildSceneOBJ([{name:'VertexBevel',mesh:m,settings:{}}]).content);assert.deepEqual(parsed.mesh.faceGroups,m.faceGroups);
});
