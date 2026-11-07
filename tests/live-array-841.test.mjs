import test from 'node:test';
import assert from 'node:assert/strict';
import * as THREE from 'three';
import {EditableMesh} from '../src/mesh.js';
import {createArrayRecipe,evaluateArray,reopenArray} from '../src/live-array-core.js';
import {transformEditableMesh,meshesNear} from '../src/instance-core.js';
import {encodeBoxlabScene,decodeBoxlabScene} from '../src/boxlab-project-codec.js';
import fs from 'node:fs';
import vm from 'node:vm';
test('841 live Array generates disconnected copies without mutating source and reopens transformed placement',()=>{
 const source=EditableMesh.cube(1),recipe=createArrayRecipe(source,5,[8,2,-4]),result=evaluateArray(recipe);
 assert.equal(result.vertices.length,40);assert.equal(result.faces.length,30);assert.equal(source.vertices.length,8);
 for(let i=0;i<5;i++)assert.deepEqual(result.vertices[i*8].toArray(),source.vertices[0].clone().add(new THREE.Vector3(2*i,.5*i,-i)).toArray());
 const matrix=new THREE.Matrix4().makeRotationY(.4).premultiply(new THREE.Matrix4().makeScale(2,2,2)).premultiply(new THREE.Matrix4().makeTranslation(3,1,-2));
 const object={arrayRecipe:recipe,mesh:transformEditableMesh(result,matrix)},opened=reopenArray(object);
 const next=createArrayRecipe(opened.source,opened.count,opened.endpoint.toArray(),opened);assert(meshesNear(evaluateArray(next),object.mesh));
 object.mesh.vertices[1].x+=.2;assert.throws(()=>reopenArray(object),/geometry changed/);
});
test('841 recipe persists through actual scene snapshots and codec; invalid recipes refuse',()=>{
 const source=EditableMesh.cube(1),recipe=createArrayRecipe(source,3,[4,0,0]),object={id:1,name:'Array',kind:'editable',arrayRecipe:recipe,mesh:evaluateArray(recipe),settings:{},history:{undo:[],redo:[]}};
 const code=fs.readFileSync(new URL('../src/object-management.js',import.meta.url),'utf8');
 const c={cloneSettings:s=>s};vm.createContext(c);vm.runInContext(code.slice(code.indexOf('function cloneBooleanRecipe('),code.indexOf('function groupMetadataSnapshot(')),c);
 const snap=c.snapshotObject(object);assert.notEqual(snap.arrayRecipe,recipe);snap.arrayRecipe.count=4;assert.equal(recipe.count,3);
 const encoded=encodeBoxlabScene({activeId:1,objects:[object]});const decoded=decodeBoxlabScene(encoded,(...args)=>new EditableMesh(...args));
 assert.deepEqual(encodeBoxlabScene(decoded),encoded);assert.equal(decoded.objects.length,1);assert(meshesNear(evaluateArray(decoded.objects[0].arrayRecipe),object.mesh));
 for(const bad of [{...recipe,count:100},{...recipe,endpoint:[NaN,0,0]},{...recipe,source:{vertices:[[0,0,0]],faces:[[0,1,2]]}}])assert.throws(()=>evaluateArray(bad));
});
import {editableBooleanRuntime} from './helpers/editable-boolean-runtime.mjs';
test('841 actual Array Apply and scene-history owners keep one object and restore recipes on Undo/Redo',()=>{
 const r=editableBooleanRuntime(),{c,manager,h}=r;manager.activate(3);
 const beforeCount=manager.objects.length,initial=manager.objects.find(o=>o.id===3).mesh.clone();
 const ui=fs.readFileSync(new URL('../src/linear-array.js',import.meta.url),'utf8');
 Object.assign(c,{createArrayRecipe,evaluateArray,sessionSource:null,previewObjectId:3,endpoint:new THREE.Vector3(4,0,2),endpointLength:()=>Math.hypot(4,2),count:()=>4,liveInput:{checked:true},localEndpoint:()=>new THREE.Vector3(4,0,2),transformOptions:()=>({}),restoreResult(){},setStatus(){}});
 vm.runInContext(ui.slice(ui.indexOf('function applyArray('),ui.indexOf('function installPenRange(')),c);
 const historyBefore=h.undoStack.length;assert.equal(c.applyArray(),true);
 assert.equal(manager.objects.length,beforeCount);assert.equal(h.undoStack.length,historyBefore+1);
 assert.equal(manager.objects.find(o=>o.id===3).arrayRecipe.count,4);assert.equal(r.live.vertices.length,32);
 manager.replaceActiveMesh(h.undo(r.live));assert.equal(manager.objects.find(o=>o.id===3).arrayRecipe,undefined);assert(meshesNear(manager.objects.find(o=>o.id===3).mesh,initial));
 manager.replaceActiveMesh(h.redo(r.live));assert.equal(manager.objects.find(o=>o.id===3).arrayRecipe.count,4);assert.equal(manager.objects.find(o=>o.id===3).mesh.vertices.length,32);
});
test('841 Undo during Array session cancels preview without consuming history or changing scene',()=>{
 const r=editableBooleanRuntime(),before=r.snapshot(),length=r.h.undoStack.length;let cancelled=0;
 r.c.__boxlabLinearArray={active:true,cancel(){cancelled++;this.active=false;}};
 assert.equal(r.h.undo(r.live),null);assert.equal(cancelled,1);assert.equal(r.h.undoStack.length,length);assert.deepEqual(r.snapshot(),before);
});
