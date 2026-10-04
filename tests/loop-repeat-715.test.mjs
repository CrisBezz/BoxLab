import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import {EditableMesh} from '../src/mesh.js';
import {History} from '../src/history.js';
const source=fs.readFileSync(new URL('../src/loop-cut-commit.js',import.meta.url),'utf8').replace(/^import .*\n/gm,'');
test('actual Loop commit owner defers radial release; slider position survives EXACT with one Undo/Redo',()=>{
 const history=new History();let mesh=EditableMesh.cube(),before=mesh.clone();history.push(before);const cut=mesh.loopCut(0,.5);assert.ok(cut);assert.ok(mesh.loopSlide(cut.slideData,.7));const placed=mesh.clone(),vertices=new Set(cut.slideData.map(i=>i.vertex));let edgeObjects=new Map(mesh.edges().map((e,i)=>[i,{material:{color:{getHex:()=>vertices.has(e.a)&&vertices.has(e.b)?0xffe14a:0}}}]));
 let release,ids=[],radial=true;const state={mesh,edgeObjects},canvas={addEventListener:(t,f)=>release=f},status={};
 const ctx={Map,Set,document:{querySelector:q=>q==='#viewport'?canvas:q==='#loopCutBtn'?{classList:{contains:()=>true}}:q==='#selectionStatus'?status:{click:()=>{mesh=q==='#undoBtn'?history.undo(mesh):history.redo(mesh);state.mesh=mesh;state.edgeObjects=new Map();}}},__boxlabBridgeState:state,__boxlabSelectionBridge:{set:(mode,next)=>{ids=next;}},__boxlabMainDirectTool:{busy:()=>false},__boxlabEdgeViewportSession:{loopActive:()=>radial},queueMicrotask:f=>f(),setTimeout:f=>f()};
 vm.runInNewContext(source,ctx);release({isPrimary:true});assert.equal(ctx.__boxlabLoopCutCommit.pending(),true);assert.equal(state.mesh,mesh);assert.equal(history.undoStack.length,1);
 assert.equal(ctx.__boxlabLoopCutCommit.commitCurrent(),true);assert.deepEqual(state.mesh.vertices,placed.vertices);assert.deepEqual(state.mesh.faces,placed.faces);assert.ok(ids.length);assert.equal(ctx.__boxlabLoopCutCommit.pending(),false);assert.equal(history.undoStack.length,1);const undone=history.undo(state.mesh);assert.deepEqual(undone,before);assert.deepEqual(history.redo(undone),placed);
});
