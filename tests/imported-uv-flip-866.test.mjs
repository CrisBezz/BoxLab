import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import {EditableMesh} from '../src/mesh.js';
import {flipImportedUV} from '../src/imported-uv-edit.js';
import {inspectImportedUV} from '../src/imported-uv-inspection.js';
import {buildNomadProject,readNomadProject} from '../src/nomad-export-core.js';
import {encodeBoxlabScene,decodeBoxlabScene} from '../src/boxlab-project-codec.js';
import {editableBooleanRuntime} from './helpers/editable-boolean-runtime.mjs';
import {glbOwnerRuntime} from './helpers/glb-owner-runtime.mjs';
const exporter=glbOwnerRuntime(),signature=m=>exporter.c.topologySignature(m),template=fs.readFileSync(new URL('../src/templates/nomad-tube.nom',import.meta.url));
function fixture(){
 const r=editableBooleanRuntime();r.manager.activate(3);r.manager.replaceActiveMesh(new EditableMesh([[0,0,0],[1,0,0],[1,1,0],[0,1,0]],[[0,1,2],[0,2,3]]));
 const o=r.manager.objects.find(o=>o.id===3),payload={version:1,source:'glb',uvCorners:[[[.125,.25],[.75,.25],[.75,.875]],[[.25,.125],[.875,.75],[.125,.875]]],uvTopologySignature:signature(o.mesh),tangentCorners:[[],[]],tangentTopologySignature:signature(o.mesh),tangentGeometrySignature:'old basis',images:[{mimeType:'image/png',data:new Uint8Array([1,2,3])}],materials:[],meshExtras:{keep:true}};
 o.glbPassthrough=payload;r.manager.objects.find(o=>o.id===2).glbPassthrough=payload;return {...r,o,payload,owner:r.c.__boxlabObjectHistory};
}
const flip=(r,axis)=>flipImportedUV(r.o,r.live,signature,r.owner,axis);
test('866 Flip U/V reuse one native history transaction and isolate UV edits from geometry, shared resources and peers',()=>{
 for(const axis of ['u','v']){
  const r=fixture(),before=JSON.stringify(r.payload),mesh=r.live,vertices=mesh.vertices.map(v=>v.toArray()),n=r.h.undoStack.length;
  assert.deepEqual(flip(r,axis),{ok:true,changed:true});const next=r.o.glbPassthrough;
  r.payload.uvCorners.forEach((face,i)=>face.forEach(([u,v],j)=>assert.deepEqual(next.uvCorners[i][j],axis==='u'?[1-u,v]:[u,1-v])));
  assert.equal(next.images,r.payload.images);assert.equal(next.meshExtras,r.payload.meshExtras);assert.equal(next.tangentCorners,undefined);assert.equal(next.tangentGeometrySignature,undefined);assert.equal(next.tangentTopologySignature,undefined);assert.equal(JSON.stringify(r.payload),before);assert.equal(r.manager.objects.find(o=>o.id===2).glbPassthrough,r.payload);assert.equal(r.h.undoStack.length,n+1);assert.equal(r.live,mesh);assert.deepEqual(mesh.vertices.map(v=>v.toArray()),vertices);
  const report=inspectImportedUV(r.live,next,signature);assert.equal(report.islandCount,2);assert.equal(report.seamEdges,1);
  r.manager.replaceActiveMesh(r.h.undo(r.live));assert.equal(r.manager.objects.find(o=>o.id===3).glbPassthrough,r.payload);
  r.manager.replaceActiveMesh(r.h.redo(r.live));assert.equal(r.manager.objects.find(o=>o.id===3).glbPassthrough,next);
 }
});
test('866 both UV flips survive project, native NOM seam indices and real GLB UV export; a repeated flip restores the original map',async()=>{
 for(const axis of ['u','v']){
  const r=fixture();assert(flip(r,axis).changed);const encoded=encodeBoxlabScene(r.owner.capture()),decoded=decodeBoxlabScene(JSON.parse(JSON.stringify(encoded)),(...a)=>new EditableMesh(...a)),o=decoded.objects.find(o=>o.id===3);
  assert.equal(JSON.stringify(encodeBoxlabScene(decoded)),JSON.stringify(encoded));
  const nom=readNomadProject(buildNomadProject([o],template,{topologySignature:signature}).bytes),m=nom.json.meshes[0],field=k=>new DataView(nom.bin.buffer,nom.bin.byteOffset+m[k].offset,m[k].length),uv=field('uvs'),indices=field('faces_uv');assert.equal(m.count_vertex,4);assert.equal(m.count_uv,6);
  for(let fi=0;fi<2;fi++)for(let j=0;j<4;j++){const ui=indices.getInt32(fi*16+j*4,true);o.glbPassthrough.uvCorners[fi][Math.min(j,2)].forEach((v,k)=>assert.equal(uv.getFloat32(ui*8+k*4,true),v));}
  const result=await exporter.build([o]),scene=await exporter.decode(result.buffer);assert.equal(result.uvRestoredCount,1);assert.equal(result.tangentsRestoredCount,0);let seen=0;scene.traverse(node=>{if(!node.isMesh)return;const data=node.geometry.getAttribute('uv'),expected=o.glbPassthrough.uvCorners.flat();assert.equal(data.count,6);for(let i=0;i<data.count;i++)assert(expected.some(p=>Math.abs(p[0]-data.getX(i))<1e-6&&Math.abs(p[1]-data.getY(i))<1e-6));seen++;});assert.equal(seen,1);
  assert(flip(r,axis).changed);assert.deepEqual(r.o.glbPassthrough.uvCorners,r.payload.uvCorners);
 }
});
test('866 flip guards reject invalid axes, stale/partial/procedural contexts and unavailable history; axis-centred no-ops add no history',()=>{
 for(const axis of ['u','v']){
  for(const change of [(r)=>r.o.locked=true,r=>r.o.kind='reference',r=>r.o.sourceId=1,r=>r.o.arrayRecipe={},r=>r.o.booleanRecipe={},r=>r.o.curveProfile={},r=>r.live.faces[0].reverse(),r=>r.payload.uvCorners[0]=null]){const r=fixture();change(r);const n=r.h.undoStack.length;assert.equal(flip(r,axis).ok,false);assert.equal(r.o.glbPassthrough,r.payload);assert.equal(r.h.undoStack.length,n);}
  const r=fixture();assert.equal(flipImportedUV(r.o,r.live,signature,null,axis).ok,false);assert.equal(flipImportedUV(r.o,r.live,signature,r.owner,'x').ok,false);
  r.payload.uvCorners=r.live.faces.map(f=>f.map(()=>axis==='u'?[.5,.25]:[.25,.5]));const n=r.h.undoStack.length;assert.deepEqual(flip(r,axis),{ok:true,changed:false});assert.equal(r.h.undoStack.length,n);
 }
});
test('866 actual Mesh Health flip actions use existing context, refresh and UV transaction owner',()=>{
 const r=fixture(),source=fs.readFileSync(new URL('../src/mesh-health.js',import.meta.url),'utf8');let refreshed=0,message='';
 const c={active:true,objectId:3,currentMode:()=> 'object',activeObject:()=>r.o,liveMesh:()=>r.live,flipImportedUV,__boxlabExportAs:{topologySignature:signature},__boxlabObjectHistory:r.owner,renderReport:()=>refreshed++,setStatus:s=>message=s};vm.createContext(c);vm.runInContext(source.slice(source.indexOf('function flipUVs(axis){'),source.indexOf("uvFlipU.addEventListener")),c);
 assert.equal(c.flipUVs('u'),true);assert.match(message,/flipped U/);assert.equal(c.flipUVs('v'),true);assert.match(message,/flipped V/);assert.equal(refreshed,2);c.objectId=2;assert.equal(c.flipUVs('u'),false);assert.equal(refreshed,2);
});
