import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import {EditableMesh} from '../src/mesh.js';
import {inspectImportedUV} from '../src/imported-uv-inspection.js';
import {createPlanarUV,moveImportedUV,scaleImportedUV,rotateImportedUVByAngle,fitImportedUVToTile} from '../src/imported-uv-edit.js';
import {encodeBoxlabScene,decodeBoxlabScene} from '../src/boxlab-project-codec.js';
import {buildNomadProject,readNomadProject} from '../src/nomad-export-core.js';
import {editableBooleanRuntime} from './helpers/editable-boolean-runtime.mjs';
import {glbOwnerRuntime} from './helpers/glb-owner-runtime.mjs';
const exporter=glbOwnerRuntime(),signature=m=>exporter.c.topologySignature(m),near=(a,b)=>assert(Math.abs(a-b)<1e-12,`${a} != ${b}`);
function fixture(){const r=editableBooleanRuntime();r.manager.activate(3);return {...r,object:r.manager.objects.find(o=>o.id===3),owner:r.c.__boxlabObjectHistory};}
const project=(r,plane='xy')=>createPlanarUV(r.object,r.live,signature,r.owner,plane),scope=r=>({island:0,payload:r.object.glbPassthrough});
test('875 plain BoxLab mesh gets honest native planar XY/XZ/YZ UVs, same mesh and one native Undo; reproject/no-op safe',()=>{
 for(const plane of ['xy','xz','yz']){const r=fixture(),mesh=r.live,vertices=JSON.stringify(mesh.vertices),n=r.h.undoStack.length;assert.deepEqual(project(r,plane),{ok:true,changed:true});const payload=r.object.glbPassthrough;assert.equal(payload.source,'boxlab');assert.deepEqual(Object.keys(payload).sort(),['source','uvCorners','uvTopologySignature','version']);assert.equal(payload.uvCorners.length,mesh.faces.length);assert.equal(r.live,mesh);assert.equal(JSON.stringify(mesh.vertices),vertices);assert.equal(r.h.undoStack.length,n+1);assert.equal(inspectImportedUV(mesh,payload,signature).state,'ready');
 const axes={xy:['x','y'],xz:['x','z'],yz:['y','z']}[plane];for(let fi=0;fi<mesh.faces.length;fi++)mesh.faces[fi].forEach((id,j)=>axes.forEach((axis,k)=>near(payload.uvCorners[fi][j][k],.5+mesh.vertices[id][axis]/.4*.96)));
 assert.equal(project(r,plane).changed,false);assert.equal(r.h.undoStack.length,n+1);r.manager.replaceActiveMesh(r.h.undo(r.live));assert.equal(r.manager.objects.find(o=>o.id===3).glbPassthrough,undefined);r.manager.replaceActiveMesh(r.h.redo(r.live));assert.equal(r.manager.objects.find(o=>o.id===3).glbPassthrough,payload);
 }
 const r=fixture();assert(project(r).changed);const original=r.object.glbPassthrough;assert(project(r,'xz').changed);assert.notEqual(r.object.glbPassthrough,original);assert.equal(r.h.undoStack.length,2);
});
test('875 native UVs reuse Move/Scale/Rotate/Fit, duplicate/resource COW, native history and project replacement',()=>{
 const r=fixture();project(r);const payload=r.object.glbPassthrough,copy=r.manager.addMesh(r.live,'Native copy',{glbPassthrough:payload,enterObjectMode:false});assert.equal(copy.glbPassthrough,payload);r.manager.activate(3);assert(moveImportedUV(r.object,r.live,signature,r.owner,.125,.25,scope(r)).ok);assert(scaleImportedUV(r.object,r.live,signature,r.owner,.5,scope(r)).ok);assert(rotateImportedUVByAngle(r.object,r.live,signature,r.owner,30,scope(r)).ok);assert(fitImportedUVToTile(r.object,r.live,signature,r.owner,scope(r)).ok);assert.equal(copy.glbPassthrough,payload);
 const snap=r.owner.capture(),encoded=encodeBoxlabScene(snap);assert.equal(encoded.objects.find(o=>o.id===3).glbResource.version,3);assert.equal(encoded.objects.find(o=>o.id===3).glbResource.payload.source,'boxlab');const decoded=decodeBoxlabScene(JSON.parse(JSON.stringify(encoded)),(...a)=>new EditableMesh(...a));assert.equal(JSON.stringify(encodeBoxlabScene(decoded)),JSON.stringify(encoded));const source=fs.readFileSync(new URL('../src/multi-object.js',import.meta.url),'utf8');r.c.soloId=null;r.c.nextSourceId=1;vm.runInContext(source.slice(source.indexOf('function projectLinkedSources('),source.indexOf('function newLinkedSource(')),r.c);const method=source.slice(source.indexOf('    replaceBasicProjectScene('),source.indexOf('    addMesh(',source.indexOf('    replaceBasicProjectScene('))).trim().replace(/,$/,'').replace(/\bsceneObjects\b/g,'incoming').replace(/\bobjects\b/g,'sceneObjects').replace(/\bactiveId\b/g,'sceneActiveId');assert(vm.runInContext('({'+method+'})',r.c).replaceBasicProjectScene(decoded.objects,decoded.activeId));assert.equal(r.c.sceneObjects.find(o=>o.id===3).glbPassthrough.source,'boxlab');assert.deepEqual(r.c.sceneObjects.find(o=>o.id===3).glbPassthrough.uvCorners,snap.objects.find(o=>o.id===3).glbPassthrough.uvCorners);
});
test('875 native UV project v3 rejects malformed/nonfinite/foreign material payloads and retains imported/plain formats',()=>{
 const r=fixture();project(r);const encoded=encodeBoxlabScene(r.owner.capture()),index=encoded.objects.findIndex(o=>o.id===3),decode=d=>decodeBoxlabScene(d,(...a)=>new EditableMesh(...a));
 for(const mutate of [p=>p.source='glb',p=>p.version=2,p=>p.images=[],p=>p.uvTopologySignature='',p=>p.uvCorners[0][0]=[1],p=>p.uvCorners[0][0][0]=null]){const d=structuredClone(encoded);mutate(d.objects[index].glbResource.payload);assert.throws(()=>decode(d),/native BoxLab UV/);}
 r.object.glbPassthrough.uvCorners[0][0][0]=Infinity;assert.throws(()=>encodeBoxlabScene(r.owner.capture()),/native BoxLab UV/);
 const plain=fixture(),p=encodeBoxlabScene(plain.owner.capture());assert.equal(p.objects[2].glbResource,undefined);assert.deepEqual(encodeBoxlabScene(decode(p)),p);
 const imported=fixture();imported.object.glbPassthrough={version:1,source:'glb',uvTopologySignature:signature(imported.live),uvCorners:imported.live.faces.map(f=>f.map(()=>[0,0]))};const e=encodeBoxlabScene(imported.owner.capture());assert.equal(e.objects.find(o=>o.id===3).glbResource.version,1);assert.deepEqual(encodeBoxlabScene(decode(e)),e);
});
test('875 native planar UVs write actual NOM corner indices and real GLB UV attributes; topology-stale inspection stays hidden',async()=>{
 const r=fixture();project(r);const o=r.object,template=fs.readFileSync(new URL('../src/templates/nomad-tube.nom',import.meta.url)),nom=readNomadProject(buildNomadProject([o],template,{topologySignature:signature}).bytes),m=nom.json.meshes[0],field=k=>new DataView(nom.bin.buffer,nom.bin.byteOffset+m[k].offset,m[k].length),uv=field('uvs'),indices=field('faces_uv');for(let fi=0;fi<o.mesh.faces.length;fi++)for(let j=0;j<4;j++){const id=indices.getInt32(fi*16+j*4,true);o.glbPassthrough.uvCorners[fi][j].forEach((v,k)=>assert.equal(uv.getFloat32(id*8+k*4,true),Math.fround(v)));}
 const glb=await exporter.build([o]);assert.equal(glb.uvRestoredCount,1);const scene=await exporter.decode(glb.buffer);let count=0;scene.traverse(n=>{if(n.isMesh){const a=n.geometry.getAttribute('uv');count+=a.count;for(let i=0;i<a.count;i++)assert(o.glbPassthrough.uvCorners.flat().some(p=>Math.fround(p[0])===a.getX(i)&&Math.fround(p[1])===a.getY(i)));}});assert(count>0);
 const before=o.glbPassthrough;r.live.faces.pop();assert.equal(inspectImportedUV(r.live,before,signature).state,'stale');assert.equal(moveImportedUV(o,r.live,signature,r.owner,1,1,scope(r)).ok,false);assert.equal(o.glbPassthrough,before);
});
test('875 planar projection refuses imported/procedural/locked/modifier/invalid contexts before history, handles tiny/huge extents',()=>{
 for(const values of [{locked:true},{kind:'reference'},{sourceId:'link'},{arrayRecipe:{}},{booleanRecipe:{}},{curveProfile:{}},{settings:{subd:true}},{settings:{mirror:{x:true}}},{glbPassthrough:{version:1,source:'glb'}}]){const r=fixture();Object.assign(r.object,values);const n=r.h.undoStack.length;assert.equal(project(r).ok,false);assert.equal(r.h.undoStack.length,n);}
 for(const plane of ['toString','__proto__','bad']){const r=fixture();assert.equal(project(r,plane).ok,false);assert.equal(r.h.undoStack.length,0);}
 for(const factor of [1e308,1e-320]){const r=fixture();r.live.vertices.forEach(v=>{v.x*=factor;v.y*=factor;v.z*=factor;});assert(project(r).ok);assert(r.object.glbPassthrough.uvCorners.flat(2).every(Number.isFinite));}
 const r=fixture();r.live.vertices.forEach(v=>{v.x=0;v.y=0;});assert.equal(project(r).ok,false);assert.equal(r.h.undoStack.length,0);
});
test('875 actual MeshHealth Planar callback respects session/object context and original render/report owner',()=>{
 const r=fixture(),source=fs.readFileSync(new URL('../src/mesh-health.js',import.meta.url),'utf8');let renders=0;const c={active:true,objectId:3,currentMode:()=> 'object',activeObject:()=>r.object,liveMesh:()=>r.live,createPlanarUV,__boxlabExportAs:{topologySignature:signature},__boxlabObjectHistory:r.owner,renderReport(){renders++;},setStatus(){}};vm.createContext(c);vm.runInContext(source.slice(source.indexOf('function projectUVs('),source.indexOf('uvPlanar.forEach')),c);assert.equal(c.projectUVs('xy'),true);assert.equal(renders,1);c.objectId=2;assert.equal(c.projectUVs('xz'),false);assert.equal(renders,1);
});
test('875 actual ordinary single/Multi duplicate and deleted-copy Undo preserve native channels; linked creation refuses safely',()=>{
 const source=fs.readFileSync(new URL('../src/multi-object.js',import.meta.url),'utf8'),management=fs.readFileSync(new URL('../src/object-management.js',import.meta.url),'utf8');
 for(const multi of [false,true]){
  const r=fixture();project(r);const payload=r.object.glbPassthrough;
  vm.runInContext(source.slice(source.indexOf('function duplicateStem('),source.indexOf('function addObject(')).replace(/\bobjects\b/g,'sceneObjects')+source.slice(source.indexOf('function duplicateActive('),source.indexOf('function linkedDuplicateActive(')),r.c);
  vm.runInContext(management.slice(management.indexOf('function nextGroupId('),management.indexOf('function cleanupSingletonGroups('))+management.slice(management.indexOf('function duplicateSelection('),management.indexOf('function linkedDuplicateSelection(')),r.c);r.manager.nextDuplicateName=r.c.nextDuplicateName;r.c.selectedIds=new Set([3]);r.c.multiEnabled=multi;
  const ids=new Set(r.manager.objects.map(o=>o.id));r.owner.checkpoint();multi?r.c.duplicateSelection():r.c.duplicateActive();const copy=r.manager.objects.find(o=>!ids.has(o.id));assert(copy);assert.equal(copy.glbPassthrough,payload);assert.notEqual(copy.mesh,r.object.mesh);
  r.c.status={textContent:''};vm.runInContext(source.slice(source.indexOf('function linkedDuplicateObject('),source.indexOf('function traceLinkedSourceWrite(')),r.c);const count=r.manager.objects.length;assert.equal(r.c.linkedDuplicateObject(copy),null);assert.equal(r.manager.objects.length,count);assert.equal(copy.sourceId,undefined);
  r.owner.checkpoint();r.manager.objects.splice(r.manager.objects.findIndex(o=>o.id===copy.id),1);assert(r.h.undo(r.live));assert.equal(r.manager.objects.find(o=>o.id===copy.id).glbPassthrough,payload);
 }
});
