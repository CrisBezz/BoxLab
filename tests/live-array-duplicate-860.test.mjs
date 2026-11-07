import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import * as THREE from 'three';
import {EditableMesh} from '../src/mesh.js';
import {createArrayRecipe,evaluateArray,reopenArray} from '../src/live-array-core.js';
import {createArraySourceEditor} from '../src/live-array-source-core.js';
import {transformEditableMesh,meshesNear} from '../src/instance-core.js';
import {encodeBoxlabScene,decodeBoxlabScene} from '../src/boxlab-project-codec.js';
import {editableBooleanRuntime} from './helpers/editable-boolean-runtime.mjs';
const read=name=>fs.readFileSync(new URL('../src/'+name,import.meta.url),'utf8');
const json=value=>JSON.parse(JSON.stringify(value));
function fixture(multi=false){
 const r=editableBooleanRuntime(),{c,manager}=r,source=read('multi-object.js'),management=read('object-management.js');
 vm.runInContext(source.slice(source.indexOf('function duplicateStem('),source.indexOf('function addObject(')).replace(/\bobjects\b/g,'sceneObjects')+source.slice(source.indexOf('function duplicateActive('),source.indexOf('function linkedDuplicateActive(')),c);
 vm.runInContext(management.slice(management.indexOf('function nextGroupId('),management.indexOf('function cleanupSingletonGroups('))+management.slice(management.indexOf('function duplicateSelection('),management.indexOf('function linkedDuplicateSelection(')),c);manager.nextDuplicateName=c.nextDuplicateName;
 manager.activate(3);const original=manager.objects.find(o=>o.id===3);original.arrayRecipe=createArrayRecipe(EditableMesh.cube(1),4,[6,1,-2],{rotation:[20,90,360],scale:[2,.7,1.3]});
 const placement=new THREE.Matrix4().set(0,-2,0,3,1,0,0,-2,0,0,2,1,0,0,0,1);
 manager.replaceActiveMesh(transformEditableMesh(evaluateArray(original.arrayRecipe),placement));c.restoreSettings({...original.settings,subd:true,subdLevel:2});manager.saveActive();c.selectedIds=new Set([3]);c.multiEnabled=multi;
 const before={recipe:json(original.arrayRecipe),mesh:original.mesh.clone()},duplicate=()=>{const ids=new Set(manager.objects.map(o=>o.id));multi?c.duplicateSelection():c.duplicateActive();return manager.objects.filter(o=>!ids.has(o.id));};
 const controller=createArraySourceEditor({manager:()=>manager,objectHistory:()=>c.__boxlabObjectHistory,history:()=>r.h});
 return {...r,original,before,duplicate,controller};
}
test('860 ordinary single and Multi Duplicate retain independent Live Array recipes, placed geometry, SubD settings and Move handoff',()=>{
 for(const multi of [false,true]){
  const r=fixture(multi);let moves=0;r.c.requestAnimationFrame=fn=>fn();r.c.__boxlabTransformArming={activateRealMove:()=>moves++};const [copy]=r.duplicate();
  assert(copy.arrayRecipe);assert.deepEqual(json(copy.arrayRecipe),r.before.recipe);assert.notEqual(copy.arrayRecipe,r.original.arrayRecipe);assert.notEqual(copy.arrayRecipe.source,r.original.arrayRecipe.source);assert.notEqual(copy.arrayRecipe.source.vertices[0],r.original.arrayRecipe.source.vertices[0]);assert.notEqual(copy.arrayRecipe.endpoint,r.original.arrayRecipe.endpoint);assert.notEqual(copy.arrayRecipe.rotation,r.original.arrayRecipe.rotation);assert.notEqual(copy.arrayRecipe.scale,r.original.arrayRecipe.scale);assert(meshesNear(copy.mesh,r.before.mesh));assert.equal(copy.settings.subd,true);assert.equal(copy.settings.subdLevel,2);assert.equal(copy.sourceId,undefined);assert.equal(moves,1);
  r.move(new THREE.Vector3(5,2,-3));const opened=reopenArray(copy),expected=evaluateArray(createArrayRecipe(opened.source,opened.count,opened.endpoint.toArray(),opened));assert(meshesNear(copy.mesh,expected));assert(meshesNear(r.original.mesh,r.before.mesh));assert.deepEqual(json(r.original.arrayRecipe),r.before.recipe);
 }
 const r=fixture(true),plain=r.manager.objects.find(o=>o.id===2);plain.groupId=9;r.original.groupId=9;r.c.selectedIds=new Set([2,3]);const copies=r.duplicate();assert.equal(copies.length,2);assert.equal(copies[0].arrayRecipe,undefined);assert(copies[1].arrayRecipe);assert.equal(copies[0].groupId,copies[1].groupId);assert.notEqual(copies[0].groupId,9);
});
test('860 duplicated Live Array count/END Apply and source Apply/Cancel/history use existing owners without changing the original',()=>{
 for(const multi of [false,true]){
  const r=fixture(multi),[copy]=r.duplicate(),{c,manager,h,controller}=r;assert(copy.arrayRecipe);const opened=reopenArray(copy),n=manager.objects.length;
  Object.assign(c,{createArrayRecipe,evaluateArray,sessionSource:opened.source,previewObjectId:copy.id,endpointLength:()=>opened.endpoint.length(),count:()=>5,liveInput:{checked:true},localEndpoint:()=>opened.endpoint.clone(),transformOptions:()=>({...opened,rotation:[0,180,45],scale:[1.4,2,.8]}),restoreResult(){},setStatus(){}});const array=read('linear-array.js');vm.runInContext(array.slice(array.indexOf('function applyArray('),array.indexOf('function installPenRange(')),c);
  assert.equal(c.applyArray(),true);let edited=manager.objects.find(o=>o.id===copy.id);assert.equal(edited.arrayRecipe.count,5);assert.equal(edited.settings.subd,true);assert.equal(manager.objects.length,n);assert.equal(reopenArray(edited).count,5);assert(meshesNear(r.original.mesh,r.before.mesh));assert.deepEqual(json(r.original.arrayRecipe),r.before.recipe);
  const beforeSource=r.snapshot();assert.deepEqual(controller.open(copy.id),{ok:true});c.currentMode=()=> 'face';h.push(r.live);r.live.vertices[0].x+=.25;manager.saveActive();assert.equal(controller.cancel(),true);assert.deepEqual(r.snapshot(),beforeSource);
  assert.deepEqual(controller.open(copy.id),{ok:true});h.push(r.live);r.live.extrudeFace(0,.15);manager.saveActive();assert.equal(controller.apply().ok,true);edited=manager.objects.find(o=>o.id===copy.id);assert.equal(edited.arrayRecipe.source.faces.length,r.before.recipe.source.faces.length+4);assert(meshesNear(edited.mesh,evaluateArray(edited.arrayRecipe)));assert.equal(edited.settings.subd,true);
  manager.replaceActiveMesh(h.undo(r.live));assert.equal(manager.objects.find(o=>o.id===copy.id).arrayRecipe.source.faces.length,r.before.recipe.source.faces.length);manager.replaceActiveMesh(h.redo(r.live));assert.equal(manager.objects.find(o=>o.id===copy.id).arrayRecipe.source.faces.length,r.before.recipe.source.faces.length+4);assert.deepEqual(json(manager.objects.find(o=>o.id===3).arrayRecipe),r.before.recipe);assert(meshesNear(manager.objects.find(o=>o.id===3).mesh,r.before.mesh));
 }
});
test('860 duplicated Live Arrays remain independently reopenable after pooled/plain project roundtrip and native scene replacement',()=>{
 for(const multi of [false,true]){
  const r=fixture(multi),[copy]=r.duplicate();assert(copy.arrayRecipe);r.move(new THREE.Vector3(2,0,0));const encoded=encodeBoxlabScene(r.c.__boxlabObjectHistory.capture()),loaded=decodeBoxlabScene(json(encoded),(...a)=>new EditableMesh(...a));assert.equal(JSON.stringify(encodeBoxlabScene(loaded)),JSON.stringify(encoded));
  r.c.soloId=null;r.c.nextSourceId=1;const source=read('multi-object.js');vm.runInContext(source.slice(source.indexOf('function projectLinkedSources('),source.indexOf('function newLinkedSource(')),r.c);
  const method=source.slice(source.indexOf('    replaceBasicProjectScene('),source.indexOf('    addMesh(',source.indexOf('    replaceBasicProjectScene('))).trim().replace(/,$/,'').replace(/\bsceneObjects\b/g,'incoming').replace(/\bobjects\b/g,'sceneObjects').replace(/\bactiveId\b/g,'sceneActiveId');assert(vm.runInContext('({'+method+'})',r.c).replaceBasicProjectScene(loaded.objects,loaded.activeId));
  const a=r.c.sceneObjects.find(o=>o.id===3),b=r.c.sceneObjects.find(o=>o.id===copy.id);assert.equal(reopenArray(a).count,4);assert.equal(reopenArray(b).count,4);assert.notEqual(a.arrayRecipe,b.arrayRecipe);assert.notEqual(a.arrayRecipe.source.vertices,b.arrayRecipe.source.vertices);assert.equal(b.settings.subd,true);assert.equal(r.h.undoStack.length,0);
  b.arrayRecipe.source.vertices[0][0]+=.2;assert.deepEqual(json(a.arrayRecipe),r.before.recipe);
 }
});
