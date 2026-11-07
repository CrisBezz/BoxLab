import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import * as THREE from 'three';
import {EditableMesh} from '../src/mesh.js';
import {matrixForInstance,setInstanceMatrix,localMeshFromWorld,meshesNear,transformEditableMesh,deriveInstancePlacement} from '../src/instance-core.js';
const src=fs.readFileSync(new URL('../src/multi-object.js',import.meta.url),'utf8');
function fixture(){
 const base=EditableMesh.cube(2),a={id:1,sourceId:'source-1',mesh:base.clone(),instanceMatrix:new THREE.Matrix4().elements},b={id:2,sourceId:'source-1',mesh:base.clone(),instanceMatrix:new THREE.Matrix4().elements};
 const pool={mesh:base.clone(),revision:0},live=transformEditableMesh(base,new THREE.Matrix4().makeTranslation(4,1,0));let mode='object';
 const c={objects:[a,b],linkedSources:new Map([['source-1',pool]]),activeObject:()=>b,state:()=>({mesh:live}),currentMode:()=>mode,traceLinkedSourceWrite(){},captureSettings:()=>({}),captureHistory:()=>({undo:[],redo:[]}),linkedModeTrace(){},setTimeout:fn=>fn(),matrixForInstance,setInstanceMatrix,localMeshFromWorld,meshesNear,transformEditableMesh,deriveInstancePlacement};
 vm.createContext(c);vm.runInContext(src.slice(src.indexOf('function syncLinkedPeers('),src.indexOf('function evaluatedLinkedMesh('))+src.slice(src.indexOf('function saveActive()'),src.indexOf('function activeShouldShow()'))+src.slice(src.indexOf('function flushLinkedPlacementOnModeChange('),src.indexOf('function installUI()')),c);
 return {c,base,a,b,pool,live,setMode:x=>mode=x};
}
test('833 real outgoing placement flush prevents moved linked copy from becoming a shared Face-mode translation',()=>{
 for(const next of ['face','edge','vertex']){
 const f=fixture();f.c.flushLinkedPlacementOnModeChange({target:{closest:()=>({dataset:{mode:next}})}});f.setMode(next);f.c.saveActive();
 assert(meshesNear(f.pool.mesh,f.base));assert.equal(f.pool.revision,0);assert(meshesNear(f.a.mesh,f.base));assert(meshesNear(transformEditableMesh(f.pool.mesh,matrixForInstance(f.b)),f.live));
 // Subsequent genuine component edit still shares through the original owner.
 f.live.vertices[0].z+=.2;f.c.saveActive();assert.equal(f.pool.revision,1);assert(meshesNear(f.a.mesh,f.pool.mesh));assert(meshesNear(f.b.mesh,transformEditableMesh(f.pool.mesh,matrixForInstance(f.b))));
 }
});
test('833 transition guard yields unrelated clicks and registers before document mode owners',()=>{
 const f=fixture();f.c.flushLinkedPlacementOnModeChange({target:{closest:()=>null}});assert.deepEqual(f.b.instanceMatrix,new THREE.Matrix4().elements);
 assert.match(src,/window.addEventListener\('click',flushLinkedPlacementOnModeChange,true\)/);
 const broken=fixture();broken.setMode('face');broken.c.saveActive();assert(!meshesNear(broken.pool.mesh,broken.base),'fixture reproduces the former shared-source corruption');
});

test('834 linked trace is off by default and reports live/stored/evaluated placement without mutating geometry',()=>{
 const f=fixture(),lines=[];Object.assign(f.c,{THREE,soloId:null,activeBody:{visible:true},inactiveBodies:[],document:{querySelector:()=>({dataset:{mode:'object'}})},__boxlabGestureDebug:{enabled:false,log:(...args)=>lines.push(args)}});
 vm.runInContext(src.slice(src.indexOf('function linkedModeTrace('),src.indexOf('function flushLinkedPlacementOnModeChange(')),f.c);
 const before=f.live.vertices.map(v=>v.toArray());f.c.linkedModeTrace('BEFORE');assert.equal(lines.length,0);
 f.c.__boxlabGestureDebug.enabled=true;f.c.linkedModeTrace('BEFORE');assert.equal(lines[0][0],'LINKED BEFORE');assert.equal(lines[0][1].live,'4,1,0');assert.equal(lines[0][1].evaluated,'0,0,0');assert.equal(lines[0][1].body,true);assert.equal(lines[0][1].ui,'object');assert.equal(lines[0][1].inactive,0);assert.match(lines[0][1].peers,/2:/);
 assert.deepEqual(f.live.vertices.map(v=>v.toArray()),before);assert.equal(f.pool.revision,0);
});

test('835 after-event trace runs after native mode handlers rather than an early microtask checkpoint',()=>{
 const f=fixture(),timers=[],lines=[];f.c.setTimeout=fn=>timers.push(fn);f.c.linkedModeTrace=stage=>lines.push([stage,f.c.currentMode()]);
 f.c.flushLinkedPlacementOnModeChange({target:{closest:()=>({dataset:{mode:'face'}})}});
 assert.deepEqual(lines,[['BEFORE face','object'],['SAVED','object']]);f.setMode('face');timers[0]();assert.deepEqual(lines.at(-1),['AFTER face','face']);
});
test('835 runtime and async errors are pinned through existing debug logger only when enabled',()=>{
 const listeners={},lines=[],c={enabled:false,log:(...args)=>lines.push(args),window:{addEventListener:(type,fn)=>listeners[type]=fn}};vm.createContext(c);
 const debug=fs.readFileSync(new URL('../src/gesture-debug.js',import.meta.url),'utf8');vm.runInContext(debug.slice(debug.indexOf('// Keep real browser failures'),debug.indexOf('// .965 UI evidence')),c);
 listeners.error({message:'render failed',filename:'https://x/main.js',lineno:358});assert.equal(lines.length,0);c.enabled=true;listeners.error({message:'render failed',filename:'https://x/main.js',lineno:358});listeners.unhandledrejection({reason:Error('async failed')});assert.equal(lines[0][0],'LINKED RUNTIME ERROR');assert.equal(lines[0][1].file,'main.js');assert.equal(lines[1][1].message,'async failed');
});
