import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import * as THREE from 'three';
import {EditableMesh} from '../src/mesh.js';
import {createArrayRecipe,evaluateArray,reopenArray} from '../src/live-array-core.js';
import {transformEditableMesh,meshesNear} from '../src/instance-core.js';
import {encodeBoxlabScene,decodeBoxlabScene} from '../src/boxlab-project-codec.js';
import {editableBooleanRuntime} from './helpers/editable-boolean-runtime.mjs';
const ui=fs.readFileSync(new URL('../src/linear-array.js',import.meta.url),'utf8');
function fixture(){
 const r=editableBooleanRuntime(),{c,manager}=r;manager.activate(3);
 const object=manager.objects.find(o=>o.id===3);
 object.arrayRecipe=createArrayRecipe(EditableMesh.cube(1),4,[6,1,-2],{rotation:[0,90,0],scale:[2,3,.5]});
 manager.replaceActiveMesh(transformEditableMesh(evaluateArray(object.arrayRecipe),new THREE.Matrix4().makeRotationZ(.3).premultiply(new THREE.Matrix4().makeTranslation(3,2,1))));
 const opened=reopenArray(object);
 Object.assign(c,{createArrayRecipe,evaluateArray,sessionSource:opened.source,previewObjectId:3,endpointLength:()=>opened.endpoint.length(),count:()=>opened.count,liveInput:{checked:true},localEndpoint:()=>opened.endpoint.clone(),transformOptions:()=>opened,restoreResult(){},setStatus(){}});
 vm.runInContext(ui.slice(ui.indexOf('function applyArray('),ui.indexOf('function installPenRange(')),c);
 return {...r,object,opened};
}
test('843 Convert preserves placed geometry and one object; native Undo/Redo restores recipe and basic project remains editable',()=>{
 const r=fixture(),{c,manager,h,object}=r,original=object.mesh.clone(),recipe=JSON.parse(JSON.stringify(object.arrayRecipe)),size=manager.objects.length,n=h.undoStack.length;
 assert.equal(c.applyArray({convert:true}),true);assert.equal(manager.objects.length,size);assert.equal(h.undoStack.length,n+1);
 assert.equal(object.arrayRecipe,undefined);assert(meshesNear(object.mesh,original));
 const encoded=encodeBoxlabScene(c.__boxlabObjectHistory.capture()),decoded=decodeBoxlabScene(encoded,(...args)=>new EditableMesh(...args));
 const restored=decoded.objects.find(o=>o.id===3);assert.equal(restored.arrayRecipe,undefined);assert(meshesNear(restored.mesh,original));
 manager.replaceActiveMesh(h.undo(r.live));const undone=manager.objects.find(o=>o.id===3);assert.deepEqual(JSON.parse(JSON.stringify(undone.arrayRecipe)),recipe);assert(meshesNear(undone.mesh,original));
 manager.replaceActiveMesh(h.redo(r.live));const redone=manager.objects.find(o=>o.id===3);assert.equal(redone.arrayRecipe,undefined);assert(meshesNear(redone.mesh,original));
 // Component editing is ordinary geometry after conversion, with no procedural regeneration.
 r.live.vertices[0].x+=.2;manager.saveActive();assert.equal(manager.objects.find(o=>o.id===3).mesh.vertices[0].x,r.live.vertices[0].x);
});
test('843 Convert commits staged count/transforms and closes the actual session button once',()=>{
 const r=fixture(),{c,manager,h,opened}=r;
 c.count=()=>6;c.transformOptions=()=>({...opened,rotation:[20,45,180],scale:[3,2,1]});
 const expected=evaluateArray(createArrayRecipe(opened.source,6,opened.endpoint.toArray(),c.transformOptions())),n=h.undoStack.length;let click,ends=0,releases=0;
 Object.assign(c,{previewArmed:true,convertButton:{addEventListener(event,fn){assert.equal(event,'click');click=fn;}},endEndpointDrag(){releases++;},disposePreview(){},endArraySession(){ends++;}});
 vm.runInContext(ui.slice(ui.indexOf("convertButton?.addEventListener('click'"),ui.indexOf("window.addEventListener('boxlab-object-manager-ready'")),c);
 click();assert(meshesNear(manager.objects.find(o=>o.id===3).mesh,expected));assert.equal(h.undoStack.length,n+1);assert.equal(c.previewArmed,false);assert.equal(c.previewObjectId,null);assert.equal(c.sessionSource,null);assert.equal(ends,1);assert.equal(releases,1);
 click();assert.equal(h.undoStack.length,n+1);assert.equal(ends,1);
});
test('843 unavailable or invalid conversion never removes live recipe or changes scene/history',()=>{
 for(const kind of ['locked','reference','wrong-object','unchecked','no-recipe','invalid-scale']){
  const r=fixture(),{c,object,h}=r;
  if(kind==='locked')object.locked=true;if(kind==='reference')object.kind='reference';if(kind==='wrong-object')c.previewObjectId=999;if(kind==='unchecked')c.liveInput.checked=false;if(kind==='no-recipe')delete object.arrayRecipe;if(kind==='invalid-scale')c.transformOptions=()=>({scale:[0,1,1]});
  const before=r.snapshot(),n=h.undoStack.length;assert.equal(c.applyArray({convert:true}),false,kind);assert.deepEqual(r.snapshot(),before,kind);assert.equal(h.undoStack.length,n,kind);
 }
});
