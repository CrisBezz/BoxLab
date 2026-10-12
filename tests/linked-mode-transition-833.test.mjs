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
 const c={objects:[a,b],linkedSources:new Map([['source-1',pool]]),activeObject:()=>b,state:()=>({mesh:live}),currentMode:()=>mode,captureSettings:()=>({}),captureHistory:()=>({undo:[],redo:[]}),matrixForInstance,setInstanceMatrix,localMeshFromWorld,meshesNear,transformEditableMesh,deriveInstancePlacement};
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
