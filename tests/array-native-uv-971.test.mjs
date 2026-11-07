import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import * as THREE from 'three';
import {EditableMesh} from '../src/mesh.js';
import {createArrayRecipe,evaluateArray,reopenArray} from '../src/live-array-core.js';
import {createNativeUVCandidate} from '../src/imported-uv-edit.js';
import {arrayNativeUVSource,arrayNativeUVResult} from '../src/array-native-uv.js';
import {inspectImportedUV} from '../src/imported-uv-inspection.js';
import {meshTopologySignature} from '../src/mesh-topology-signature.js';
import {encodeBoxlabScene,decodeBoxlabScene} from '../src/boxlab-project-codec.js';
import {editableBooleanRuntime} from './helpers/editable-boolean-runtime.mjs';
const ui=fs.readFileSync(new URL('../src/linear-array.js',import.meta.url),'utf8');
function fixture(live=false){
  const r=editableBooleanRuntime(),{c,manager}=r;manager.activate(3);
  const o=manager.objects.find(o=>o.id===3);o.glbPassthrough=createNativeUVCandidate(o.mesh,'box');
  // Deliberately authored UV offsets must survive; do not silently reproject.
  o.glbPassthrough.uvCorners[0][0][0]+=.03125;
  Object.assign(c,{arrayNativeUVSource,arrayNativeUVResult,createArrayRecipe,evaluateArray,sessionSource:null,previewObjectId:3,endpoint:new THREE.Vector3(6,1,2),endpointLength:()=>Math.hypot(6,1,2),count:()=>6,liveInput:{checked:live},localEndpoint:()=>new THREE.Vector3(6,1,2),transformOptions:()=>({}),restoreResult(){},setStatus:s=>r.message=s});
  vm.runInContext(ui.slice(ui.indexOf('function nudgeLive('),ui.indexOf('function installPenRange(')),c);
  return {...r,o};
}
const ready=o=>assert.equal(inspectImportedUV(o.mesh,o.glbPassthrough,meshTopologySignature).state,'ready');
test('971 default native UV cube ordinary Array creates five independent UV copies with one Undo/Redo and project roundtrip',()=>{
  const r=fixture(),{c,manager,h,o}=r,before=manager.objects.length,n=h.undoStack.length,uv=JSON.stringify(o.glbPassthrough),v=o.mesh.vertices[0].clone();
  assert.equal(c.applyArray(),true);assert.equal(manager.objects.length,before+5);assert.equal(h.undoStack.length,n+1);
  const ids=c.__boxlabLinearArrayLastResult.createdIds;
  ids.forEach((id,i)=>{const copy=manager.objects.find(o=>o.id===id);assert(!copy.sourceId);ready(copy);assert.equal(JSON.stringify(copy.glbPassthrough),uv);assert(copy.mesh.vertices[0].distanceTo(v.clone().addScaledVector(c.endpoint,(i+1)/5))<1e-9);});
  const encoded=encodeBoxlabScene(c.__boxlabObjectHistory.capture()),decoded=decodeBoxlabScene(encoded,(...a)=>new EditableMesh(...a));assert.deepEqual(encodeBoxlabScene(decoded),encoded);
  manager.replaceActiveMesh(h.undo(r.live));assert.equal(manager.objects.length,before);ready(manager.objects.find(o=>o.id===3));
  manager.replaceActiveMesh(h.redo(r.live));assert.equal(manager.objects.length,before+5);ids.forEach(id=>ready(manager.objects.find(o=>o.id===id)));
});
test('971 native UV Live Array retains exact source UVs across count edit, reopen, Convert, codec and Undo/Redo',()=>{
  const r=fixture(true),{c,manager,h,o}=r,uv=JSON.parse(JSON.stringify(o.glbPassthrough.uvCorners)),n=h.undoStack.length;
  assert.equal(c.applyArray(),true);assert.equal(h.undoStack.length,n+1);ready(o);assert.equal(o.glbPassthrough.uvCorners.length,36);
  for(let i=0;i<6;i++)assert.deepEqual(o.glbPassthrough.uvCorners.slice(i*6,i*6+6),uv);
  manager.replaceActiveMesh(h.undo(r.live));assert(!manager.objects.find(o=>o.id===3).arrayRecipe);ready(manager.objects.find(o=>o.id===3));
  manager.replaceActiveMesh(h.redo(r.live));const current=manager.objects.find(o=>o.id===3),opened=reopenArray(current);
  c.sessionSource=opened.source;c.count=()=>3;assert.equal(c.applyArray(),true);ready(current);assert.equal(current.glbPassthrough.uvCorners.length,18);assert.equal(reopenArray(current).count,3);
  const encoded=encodeBoxlabScene(c.__boxlabObjectHistory.capture()),decoded=decodeBoxlabScene(encoded,(...a)=>new EditableMesh(...a));assert.deepEqual(encodeBoxlabScene(decoded),encoded);
  assert.equal(c.applyArray({convert:true}),true);assert(!current.arrayRecipe);ready(current);
  manager.replaceActiveMesh(h.undo(r.live));assert.equal(manager.objects.find(o=>o.id===3).arrayRecipe.count,3);ready(manager.objects.find(o=>o.id===3));
});
test('971 stale or painted native Array refuses atomically; independent copy failure rolls back all created objects',()=>{
  for(const live of [false,true])for(const bad of ['stale','paint']){const r=fixture(live);if(bad==='stale')r.o.glbPassthrough.uvTopologySignature='stale';else r.o.colourPaint={};const before=r.snapshot(),n=r.h.undoStack.length;assert.equal(r.c.applyArray(),false);assert.deepEqual(r.snapshot(),before);assert.equal(r.h.undoStack.length,n);}
  const r=fixture(),before=r.snapshot(),n=r.h.undoStack.length,add=r.manager.addMesh;let calls=0;r.manager.addMesh=(...args)=>++calls===2?null:add(...args);
  assert.equal(r.c.applyArray(),false);assert.deepEqual(r.snapshot(),before);assert.equal(r.h.undoStack.length,n);assert.equal(r.manager.activeId,3);
});
test('971 remaining transient SVG glow filters removed without changing hit ownership or .967 composition rules',()=>{
  const g=fs.readFileSync(new URL('../src/total-gizmo.js',import.meta.url),'utf8');
  assert(!g.includes('drop-shadow('));assert(g.includes('hover-proxy'));assert(g.includes('stroke-width:3!important;opacity:1!important'));
});
