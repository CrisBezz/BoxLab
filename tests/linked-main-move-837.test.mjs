import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import * as THREE from 'three';
import {EditableMesh} from '../src/mesh.js';
import {History} from '../src/history.js';
import {matrixForInstance,setInstanceMatrix,localMeshFromWorld,meshesNear,transformEditableMesh,deriveInstancePlacement} from '../src/instance-core.js';
const main=fs.readFileSync(new URL('../src/main.js',import.meta.url),'utf8'),manager=fs.readFileSync(new URL('../src/multi-object.js',import.meta.url),'utf8');
function fixture(){
 const base=EditableMesh.cube(2),copy={id:2,sourceId:'source-1',mesh:base.clone(),instanceMatrix:new THREE.Matrix4().elements},original={id:1,sourceId:'source-1',mesh:base.clone(),instanceMatrix:new THREE.Matrix4().elements},pool={mesh:base.clone(),revision:0};let mode='object';const events={};
 const c={THREE,mesh:base.clone(),drag:null,objects:[original,copy],linkedSources:new Map([['source-1',pool]]),activeObject:()=>copy,currentMode:()=>mode,state:()=>({mesh:c.mesh}),history:new History(),captureSettings:()=>({}),captureHistory:()=>({}),matrixForInstance,setInstanceMatrix,localMeshFromWorld,meshesNear,transformEditableMesh,deriveInstancePlacement,
 canvas:{addEventListener:(t,fn)=>{(events[t]||=[]).push(fn);}},window:{addEventListener(){},dispatchEvent(){}},controls:{enabled:false},CustomEvent:class{},resetEdgeHoldCycle(){},toolMode:'move',axisSnapEnabled:false,inferenceSnapEnabled:false,EDIT_DRAG_THRESHOLD:8,rayPlanePoint:e=>new THREE.Vector3(e.clientX/100,e.clientY/100,0),clearLoopSlide(){},componentVertexIndicesOn:(m)=>m.vertices.map((_,i)=>i),crossObjectMoveSnap:()=>null};
 c.renderMesh=()=>c.saveActive();vm.createContext(c);vm.runInContext(manager.slice(manager.indexOf('function syncLinkedPeers('),manager.indexOf('function evaluatedLinkedMesh('))+manager.slice(manager.indexOf('function saveActive()'),manager.indexOf('function activeShouldShow()')),c);
 const move=main.split('\n').find(s=>s.startsWith("canvas.addEventListener('pointermove',event=>{if(!drag"));
 const end=main.split('\n').find(s=>s.startsWith('function endDrag(event)'));
 vm.runInContext(main.match(/function beginDragChange\(\)[^\n]*/)[0]+'\n'+main.match(/function moveSelection\(sel,delta\)[^\n]*/)[0]+'\n'+move+'\n'+end+'\n'+main.slice(main.indexOf('function finishPendingObjectMove('),main.indexOf('function transferSelection(')),c);
 c.drag={kind:'component',pointerId:7,selection:{type:'object',index:0},startMesh:base.clone(),start:new THREE.Vector3(),last:new THREE.Vector3(),plane:{},startX:0,startY:0,center:new THREE.Vector3(),axisScreens:{},liveDelta:new THREE.Vector3(),armed:false,changed:false};
 return {c,base,pool,original,copy,setMode:v=>mode=v,move:(x,y)=>events.pointermove[0]({pointerId:7,clientX:x,clientY:y})};
}
test('837 real main diagonal move cannot leak through mode switch into linked source',()=>{
 for(const [x,y] of [[165,0],[165,120],[-130,75]]){
 const f=fixture();const placement=new THREE.Matrix4().makeTranslation(4,-2,0),arrayPeer={id:3,sourceId:'source-1',instanceMatrix:placement.elements,mesh:transformEditableMesh(f.base,placement)};f.c.objects.push(arrayPeer);const peerBefore=arrayPeer.mesh.vertices.map(v=>v.toArray());f.move(x,y);const before=f.c.mesh.vertices.map(v=>v.toArray());f.c.finishPendingObjectMove();f.setMode('face');f.c.saveActive();f.move(-1800,-1300);
 assert.deepEqual(f.c.mesh.vertices.map(v=>v.toArray()),before);assert.deepEqual(arrayPeer.mesh.vertices.map(v=>v.toArray()),peerBefore);assert(meshesNear(f.pool.mesh,f.base));assert(meshesNear(f.original.mesh,f.base));assert.equal(f.pool.revision,0);assert.equal(f.c.history.undoStack.length,1);
 }
});
test('837 fixture exposes source jump if native main drag is not completed',()=>{
 const f=fixture();f.move(165,120);f.setMode('face');f.move(-1800,-1300);assert(!meshesNear(f.pool.mesh,f.base));assert.notEqual(f.pool.revision,0);
});
