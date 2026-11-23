import test from 'node:test';import assert from 'node:assert/strict';import fs from 'node:fs';import vm from 'node:vm';
import * as THREE from 'three';import {EditableMesh} from '../src/mesh.js';import {installLooseTopology} from '../src/loose-topology.js';import {History} from '../src/history.js';import {createRetopoSurface,nearestRetopoVertex} from '../src/retopo-surface.js';
installLooseTopology(EditableMesh);
function fixture(){
 const fields=new Map();let mode='face';
 function element(id=''){const el={id,children:[],hidden:false,style:{},dataset:{},listeners:new Map(),attributes:new Map(),classList:{add(){},remove(){}},setAttribute(k,v){this.attributes.set(k,String(v));},appendChild(e){this.children.push(e);},querySelector(s){return field(s);},addEventListener(t,f){if(!this.listeners.has(t))this.listeners.set(t,[]);this.listeners.get(t).push(f);},dispatchEvent(e){for(const f of this.listeners.get(e.type)||[])f(e);},click(){this.dispatchEvent({type:'click'});},getBoundingClientRect(){return{left:0,top:0,width:800,height:800};},setPointerCapture(){},releasePointerCapture(){}};return el;}
 function field(s){if(!fields.has(s))fields.set(s,element(s));return fields.get(s);}
 const window=element(),document={querySelector:field,createElement:element,head:element(),addEventListener:window.addEventListener.bind(window),dispatchEvent:window.dispatchEvent.bind(window)};
 for(const m of ['vertex','edge','face','object'])field(`#selectionModes [data-mode="${m}"]`).click=()=>{mode=m;};
 const camera=new THREE.PerspectiveCamera(45,1,.01,100);camera.position.set(0,0,5);camera.lookAt(0,0,0);camera.updateMatrixWorld();
 const state={mesh:EditableMesh.cube(),camera,scene:new THREE.Scene(),controls:{enabled:true}},h=new History(),objects=[{id:1,name:'Source',visible:true,mesh:state.mesh.clone()}];let activeId=1;
 function restoreMesh(src){state.mesh=src.clone();}
 const manager={objects,get activeId(){return activeId;},saveActive(){objects.find(o=>o.id===activeId).mesh=state.mesh.clone();},addMesh(mesh,name){this.saveActive();const o={id:2,name,mesh:mesh.clone(),visible:true};objects.push(o);activeId=2;restoreMesh(mesh);h.clear();return o;}};
 const capture=()=>{manager.saveActive();return {activeId,objects:objects.map(o=>({...o,mesh:o.mesh.clone()}))};},meta=new WeakMap();
 const objectHistory={capture,checkpointSnapshot(s,m=state.mesh){h.push(m);meta.set(h.undoStack.at(-1),s);}};
 const baseUndo=h.undo.bind(h),baseRedo=h.redo.bind(h);
 function history(which){manager.saveActive();const stack=which==='undo'?h.undoStack:h.redoStack,s=meta.get(stack.at(-1)),before=s?capture():null;const result=(which==='undo'?baseUndo:baseRedo)(state.mesh);if(s&&result){objects.splice(0,objects.length,...s.objects.map(o=>({...o,mesh:o.mesh.clone()})));activeId=s.activeId;meta.set((which==='undo'?h.redoStack:h.undoStack).at(-1),before);}if(result)restoreMesh(result);manager.saveActive();}
 field('#undoBtn').click=()=>history('undo');field('#redoBtn').click=()=>history('redo');
 const context={THREE,EditableMesh,createRetopoSurface,nearestRetopoVertex,placeToolSessionPanel(){},document,window,Event:class{},CustomEvent:class{},queueMicrotask:fn=>fn(),__boxlabBridgeState:state,__boxlabObjectManager:manager,__boxlabHistory:h,__boxlabObjectHistory:objectHistory,__boxlabSelectionBridge:{mode:()=>mode,clear(){}}};
 vm.runInNewContext(fs.readFileSync(new URL('../src/retopo-workspace.js',import.meta.url),'utf8').replace(/^import .*;\n/gm,''),context);
 function pointer(type,x=400,y=400,extra={}){const e={type,target:field('#viewport'),pointerType:'pen',pointerId:9,button:0,pressure:type==='pointerup'?0:.5,clientX:x,clientY:y,preventDefault(){this.prevented=true;},stopImmediatePropagation(){},...extra};window.dispatchEvent(e);return e;}
 return{api:context.__boxlabRetopo,state,objects,manager,h,pointer,field,history};
}
test('actual Retopo session creates separate loose geometry, cancels drags, preserves source and uses native Undo/Redo',()=>{
 const f=fixture(),source=JSON.stringify(f.objects[0].mesh);assert.equal(f.api.start(),true);
 f.pointer('pointerdown');f.pointer('pointerup');assert.equal(f.objects.length,2);assert.equal(f.state.mesh.vertices.length,1);assert.equal(f.state.mesh.looseVertices.size,1);assert.equal(JSON.stringify(f.objects[0].mesh),source);
 f.history('undo');assert.equal(f.objects.length,1);assert.equal(f.state.mesh.vertices.length,8);
 f.history('redo');assert.equal(f.objects.length,2);assert.equal(f.state.mesh.vertices.length,1);
 const before=f.state.mesh.vertices[0].clone();f.pointer('pointerdown');f.pointer('pointermove',425);f.pointer('pointerup',425);assert.ok(f.state.mesh.vertices[0].x>before.x);assert.equal(f.state.mesh.vertices[0].z,1);
 const after=f.state.mesh.vertices[0].clone();f.history('undo');assert.ok(f.state.mesh.vertices[0].equals(before));f.history('redo');assert.ok(f.state.mesh.vertices[0].equals(after));
 f.pointer('pointerdown',425);f.pointer('pointermove',440);f.pointer('pointercancel',440);assert.ok(f.state.mesh.vertices[0].equals(after));
 f.api.close();assert.equal(f.api.active,false);assert.equal(f.state.controls.enabled,true);assert.equal(JSON.stringify(f.objects[0].mesh),source);
});
test('empty-space contacts, free drags and touch navigation do not create geometry or history',()=>{
 const f=fixture();f.api.start();assert.equal(f.pointer('pointerdown',400,400,{pointerType:'touch'}).prevented,undefined);f.pointer('pointerup',400,400,{pointerType:'touch'});
 f.pointer('pointerdown',0,0);f.pointer('pointerup',0,0);f.pointer('pointerdown');f.pointer('pointermove',430);f.pointer('pointerup',430);assert.equal(f.objects.length,1);assert.equal(f.h.undoStack.length,0);
});
test('context change during a drag never edits another object; Done retains vertices',()=>{
 const f=fixture();f.api.start();f.pointer('pointerdown');f.pointer('pointerup');f.pointer('pointerdown');f.pointer('pointermove',420);const m=f.state.mesh;f.state.mesh=EditableMesh.cube();f.pointer('pointercancel');assert.equal(f.state.mesh.vertices.length,8);assert.equal(f.state.controls.enabled,true);assert.equal(m.vertices.length,1);f.api.close();
});
