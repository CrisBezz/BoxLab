import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import {EditableMesh} from '../src/mesh.js';
import {rotateImportedUV} from '../src/imported-uv-edit.js';
import {inspectImportedUV} from '../src/imported-uv-inspection.js';
import {encodeBoxlabScene,decodeBoxlabScene} from '../src/boxlab-project-codec.js';
import {editableBooleanRuntime} from './helpers/editable-boolean-runtime.mjs';
import {glbOwnerRuntime} from './helpers/glb-owner-runtime.mjs';
const exporter=glbOwnerRuntime(),signature=m=>exporter.c.topologySignature(m);
function fixture(){
 const r=editableBooleanRuntime();r.manager.activate(3);
 r.manager.replaceActiveMesh(new EditableMesh([[0,0,0],[1,0,0],[1,1,0],[0,1,0]],[[0,1,2,3]]));
 const o=r.manager.objects.find(o=>o.id===3),payload={version:1,source:'glb',uvCorners:[[[.1,.2],[.8,.2],[.8,.7],[.1,.7]]],uvTopologySignature:signature(o.mesh),tangentCorners:[Array.from({length:4},()=>[1,0,0,1])],tangentTopologySignature:signature(o.mesh),tangentGeometrySignature:exporter.c.geometrySignature(o.mesh),images:[{mimeType:'image/png',data:new Uint8Array([1,2,3])}],materials:[],meshExtras:{custom:'keep'}};
 o.glbPassthrough=payload;r.manager.objects.find(o=>o.id===2).glbPassthrough=payload;
 return {...r,o,payload,owner:r.c.__boxlabObjectHistory};
}
test('864 UV rotation replaces shared payload, preserves geometry/images/metadata and uses one native scene Undo/Redo step',()=>{
 const r=fixture(),before=JSON.stringify(r.payload),mesh=r.live,vertices=mesh.vertices.map(v=>v.toArray()),n=r.h.undoStack.length;
 assert.deepEqual(rotateImportedUV(r.o,r.live,signature,r.owner),{ok:true,changed:true});
 const next=r.o.glbPassthrough;assert.notEqual(next,r.payload);assert.notEqual(next.uvCorners,r.payload.uvCorners);assert.deepEqual(next.uvCorners[0][0],[.8,.1]);assert.equal(next.images,r.payload.images);assert.equal(next.meshExtras,r.payload.meshExtras);assert.equal(next.tangentCorners,undefined);assert.equal(next.tangentTopologySignature,undefined);assert.equal(next.tangentGeometrySignature,undefined);assert.equal(JSON.stringify(r.payload),before);assert.equal(r.manager.objects.find(o=>o.id===2).glbPassthrough,r.payload);assert.equal(r.h.undoStack.length,n+1);assert.equal(r.live,mesh);assert.deepEqual(mesh.vertices.map(v=>v.toArray()),vertices);
 r.manager.replaceActiveMesh(r.h.undo(r.live));let restored=r.manager.objects.find(o=>o.id===3);assert.equal(restored.glbPassthrough,r.payload);assert.equal(restored.glbPassthrough.tangentCorners,r.payload.tangentCorners);
 r.manager.replaceActiveMesh(r.h.redo(r.live));restored=r.manager.objects.find(o=>o.id===3);assert.equal(restored.glbPassthrough,next);assert.equal(inspectImportedUV(restored.mesh,next,signature).state,'ready');assert.equal(r.manager.objects.find(o=>o.id===2).glbPassthrough,r.payload);
});
test('864 rotated UVs roundtrip native project and real GLB UV attributes, with stale tangent basis excluded',async()=>{
 const r=fixture();assert(rotateImportedUV(r.o,r.live,signature,r.owner).changed);
 const encoded=encodeBoxlabScene(r.owner.capture()),decoded=decodeBoxlabScene(JSON.parse(JSON.stringify(encoded)),(...a)=>new EditableMesh(...a)),o=decoded.objects.find(o=>o.id===3);
 assert.equal(JSON.stringify(encodeBoxlabScene(decoded)),JSON.stringify(encoded));assert.deepEqual(o.glbPassthrough.uvCorners,r.o.glbPassthrough.uvCorners);
 const result=await exporter.build([o]);assert.equal(result.uvRestoredCount,1);assert.equal(result.tangentsRestoredCount,0);const scene=await exporter.decode(result.buffer);let seen=0;
 scene.traverse(node=>{if(!node.isMesh)return;const uv=node.geometry.getAttribute('uv');assert(uv);assert.equal(node.geometry.getAttribute('tangent'),undefined);const expected=o.glbPassthrough.uvCorners[0];for(let i=0;i<uv.count;i++)assert(expected.some(p=>Math.abs(p[0]-uv.getX(i))<1e-6&&Math.abs(p[1]-uv.getY(i))<1e-6));seen++;});assert.equal(seen,1);
 for(let i=0;i<3;i++)assert(rotateImportedUV(r.o,r.live,signature,r.owner).ok);
 r.o.glbPassthrough.uvCorners[0].forEach((p,i)=>p.forEach((v,k)=>assert(Math.abs(v-r.payload.uvCorners[0][i][k])<1e-14)));
});
test('864 UV authoring refuses stale/partial/locked/linked/procedural contexts or missing history without writes; degenerate no-op adds no history',()=>{
 for(const change of [o=>o.locked=true,o=>o.kind='reference',o=>o.sourceId=1,o=>o.booleanRecipe={},o=>o.arrayRecipe={},o=>o.curveProfile={},(o,mesh)=>mesh.faces[0].reverse(),o=>o.glbPassthrough.uvCorners[0]=null]){
  const r=fixture();change(r.o,r.live);const payload=r.o.glbPassthrough,n=r.h.undoStack.length;assert.equal(rotateImportedUV(r.o,r.live,signature,r.owner).ok,false);assert.equal(r.o.glbPassthrough,payload);assert.equal(r.h.undoStack.length,n);
 }
 const r=fixture();assert.equal(rotateImportedUV(r.o,r.live,signature,null).ok,false);const payload=r.o.glbPassthrough;assert.equal(rotateImportedUV(r.o,r.live,signature,{capture:()=>({}),checkpointSnapshot:()=>false}).ok,false);assert.equal(r.o.glbPassthrough,payload);
 payload.uvCorners=[Array.from({length:4},()=>[.5,.5])];const n=r.h.undoStack.length;assert.deepEqual(rotateImportedUV(r.o,r.live,signature,r.owner),{ok:true,changed:false});assert.equal(r.h.undoStack.length,n);
});
test('864 actual Mesh Health action delegates UV ownership and refreshes inspector without geometry or repair actions',()=>{
 const r=fixture(),source=fs.readFileSync(new URL('../src/mesh-health.js',import.meta.url),'utf8');let refreshed=0,message='';
 const c={active:true,objectId:3,currentMode:()=> 'object',activeObject:()=>r.o,liveMesh:()=>r.live,rotateImportedUV,__boxlabExportAs:{topologySignature:signature},__boxlabObjectHistory:r.owner,renderReport:()=>refreshed++,setStatus:s=>message=s};vm.createContext(c);vm.runInContext(source.slice(source.indexOf('function rotateUVs(){'),source.indexOf("uvRotate.addEventListener")),c);
 assert.equal(c.rotateUVs(),true);assert.equal(refreshed,1);assert.match(message,/rotated 90/);assert.deepEqual(r.o.glbPassthrough.uvCorners[0][0],[.8,.1]);c.currentMode=()=> 'face';assert.equal(c.rotateUVs(),false);assert.equal(refreshed,1);
});
