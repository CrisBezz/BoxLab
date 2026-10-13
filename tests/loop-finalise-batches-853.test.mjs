import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import * as THREE from 'three';
import {EditableMesh} from '../src/mesh.js';
import {History} from '../src/history.js';
import {createCageBatch} from '../src/cage-render-batches.js';
const main=fs.readFileSync(new URL('../src/main.js',import.meta.url),'utf8');
const commit=fs.readFileSync(new URL('../src/loop-cut-commit.js',import.meta.url),'utf8').replace(/^import .*\n/gm,'');
const line=name=>{const i=main.indexOf('function '+name+'(');return main.slice(i,main.indexOf('\n',i));};
test('853 actual commit detects batched picking proxies for single and MultiLoop; EXACT keeps real cuts and one Undo/Redo',()=>{
 for(const count of [1,5]){
  let mesh=EditableMesh.cube();const before=mesh.clone(),history=new History();history.push(before);
  const cut=count===1?mesh.loopCut(0,.5):mesh.loopCuts(0,count);assert(cut);const groups=cut.slideGroups||[cut.slideData],current=groups[0];assert(mesh.loopSlide(current,.12));const placed=mesh.clone();assert(mesh.faces.length>before.faces.length);
  const root=new THREE.Group(),batch=createCageBatch(),yellow=new THREE.LineBasicMaterial({color:0xffe14a}),blue=new THREE.LineBasicMaterial({color:0x62d8ff});const verts=new Set(current.map(i=>i.vertex)),objects=new Map();
  mesh.edges().forEach((e,i)=>{const mat=verts.has(e.a)&&verts.has(e.b)?yellow:blue;const o=new THREE.Line(new THREE.BufferGeometry().setFromPoints([mesh.vertices[e.a],mesh.vertices[e.b]]),mat);o.userData={kind:'edge',index:i};batch.edge(o,mat);root.add(o);objects.set(i,o);});batch.finish(root);
  const state={mesh,edgeObjects:objects};let ids=[];const ctx={Map,Set,__boxlabBridgeState:state,__boxlabMainDirectTool:{busy:()=>false},__boxlabSelectionBridge:{set:(type,value)=>{assert.equal(type,'edge');ids=value;}},document:{querySelector:q=>q==='#viewport'?{addEventListener(){}}:q==='#selectionStatus'?{}:q==='#loopCutBtn'?{classList:{contains:()=>true}}:{click:()=>{mesh=q==='#undoBtn'?history.undo(mesh):history.redo(mesh);state.mesh=mesh;state.edgeObjects=new Map();}}},setTimeout:fn=>fn(),queueMicrotask:fn=>fn()};vm.runInNewContext(commit,ctx);
  assert.equal(ctx.__boxlabLoopCutCommit.pending(),true);assert.equal(ctx.__boxlabLoopCutCommit.commitCurrent(),true);assert.equal(ctx.__boxlabLoopCutCommit.pending(),false);assert(ids.length>0);assert.deepEqual(state.mesh.faces,placed.faces);assert.deepEqual(state.mesh.vertices,placed.vertices);assert.equal(history.undoStack.length,1);
  const undone=history.undo(state.mesh);assert.deepEqual(undone,before);assert.deepEqual(history.redo(undone),placed);
  const disposed=new Set();for(const o of root.children){if(o.geometry&&!disposed.has(o.geometry)){disposed.add(o.geometry);o.geometry.dispose();}}yellow.dispose();blue.dispose();
 }
});
test('853 native Loop exits clear private slide groups and slider without altering cuts/history, rearming stays persistent and busy exit is guarded',()=>{
 for(const count of [1,5]){
  const mesh=EditableMesh.cube(),history=new History();history.push(mesh);const cut=count===1?mesh.loopCut(0,.5):mesh.loopCuts(0,count),groups=cut.slideGroups||[cut.slideData],placed=mesh.clone(),slider={disabled:false};
  const c={mesh,history,directTool:'loopCut',drag:null,selectionMode:'edge',activeLoopSlides:groups,activeLoopSlide:groups[0],multiSelectEnabled:false,document:{querySelector:q=>q==='#loopSlide'?slider:null},clearSelection(){},renderMesh(){}};
  for(const fn of ['syncSelectionModeButtons','syncTransformButtons','syncDirectToolControls','updateStatus'])c[fn]=()=>{};
  vm.createContext(c);vm.runInContext(line('clearLoopSlide')+'\n'+line('setDirectTool'),c);
  const finish=main.match(/finishLoopCut:\(\)=>\{([^\n]+)\},/)[1];vm.runInContext('globalThis.finish=()=>{'+finish+'}',c);
  c.drag={};assert.equal(c.finish(),false);assert.equal(c.activeLoopSlides.length,count);c.drag=null;
  c.setDirectTool('loopCut');assert.equal(c.activeLoopSlides.length,count);assert.equal(c.finish(),true);assert.equal(c.directTool,null);assert.equal(c.activeLoopSlides.length,0);assert.equal(c.activeLoopSlide,null);assert.equal(slider.disabled,true);assert.deepEqual(mesh.vertices,placed.vertices);assert.deepEqual(mesh.faces,placed.faces);assert.deepEqual(mesh.creases,placed.creases);assert.equal(history.undoStack.length,1);
  c.directTool='loopCut';c.activeLoopSlides=groups;c.activeLoopSlide=groups[0];c.setDirectTool('extrude');assert.equal(c.selectionMode,'face');assert.equal(c.activeLoopSlides.length,0);assert.deepEqual(mesh.vertices,placed.vertices);assert.deepEqual(mesh.faces,placed.faces);assert.deepEqual(mesh.creases,placed.creases);
 }
});
