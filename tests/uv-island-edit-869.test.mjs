import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import {EditableMesh} from '../src/mesh.js';
import {rotateImportedUV,flipImportedUV} from '../src/imported-uv-edit.js';
import {inspectImportedUV} from '../src/imported-uv-inspection.js';
import {encodeBoxlabScene,decodeBoxlabScene} from '../src/boxlab-project-codec.js';
import {buildNomadProject,readNomadProject} from '../src/nomad-export-core.js';
import {editableBooleanRuntime} from './helpers/editable-boolean-runtime.mjs';
import {glbOwnerRuntime} from './helpers/glb-owner-runtime.mjs';
const exporter=glbOwnerRuntime(),signature=m=>exporter.c.topologySignature(m),template=fs.readFileSync(new URL('../src/templates/nomad-tube.nom',import.meta.url));
function fixture(){const r=editableBooleanRuntime();r.manager.activate(3);r.manager.replaceActiveMesh(new EditableMesh([[0,0,0],[1,0,0],[0,1,0],[1,1,0],[2,0,0],[3,0,0],[2,1,0]],[[0,1,2],[1,3,2],[4,5,6]]));const o=r.manager.objects.find(o=>o.id===3),payload={version:1,source:'glb',uvTopologySignature:signature(r.live),uvCorners:[[[0,0],[.25,0],[0,.5]],[[.25,0],[.25,.5],[0,.5]],[[.75,.75],[1,.75],[.75,1]]],images:[{data:new Uint8Array([1,2])}],tangentCorners:[[],[],[]],meshExtras:{keep:true}};o.glbPassthrough=payload;r.manager.objects.find(o=>o.id===2).glbPassthrough=payload;return {...r,o,payload,owner:r.c.__boxlabObjectHistory};}
const edit=(r,op,island=0,payload=r.o.glbPassthrough)=>op==='rotate'?rotateImportedUV(r.o,r.live,signature,r.owner,{island,payload}):flipImportedUV(r.o,r.live,signature,r.owner,op,{island,payload});
test('869 selected rotate/flip use full authoritative connectivity, preserve other islands/resources/geometry and native UndoRedo',()=>{
 for(const op of ['rotate','u','v']){const r=fixture(),before=JSON.stringify(r.payload),geometry=JSON.stringify(r.live.toData?.()||r.live.vertices),n=r.h.undoStack.length;
 const result=edit(r,op);assert.deepEqual(result,{ok:true,changed:true,selectedFaces:[0,1]});const next=r.o.glbPassthrough;
 for(let fi=0;fi<2;fi++)r.payload.uvCorners[fi].forEach(([u,v],j)=>assert.deepEqual(next.uvCorners[fi][j],op==='u'?[.25-u,v]:op==='v'?[u,.5-v]:[.125+(.25-v),.25+(u-.125)]));
 assert.equal(next.uvCorners[2],r.payload.uvCorners[2]);assert.equal(next.images,r.payload.images);assert.equal(next.meshExtras,r.payload.meshExtras);assert.equal(next.tangentCorners,undefined);assert.equal(JSON.stringify(r.payload),before);assert.equal(JSON.stringify(r.live.toData?.()||r.live.vertices),geometry);assert.equal(r.manager.objects.find(o=>o.id===2).glbPassthrough,r.payload);assert.equal(r.h.undoStack.length,n+1);
 r.manager.replaceActiveMesh(r.h.undo(r.live));assert.equal(r.manager.objects.find(o=>o.id===3).glbPassthrough,r.payload);r.manager.replaceActiveMesh(r.h.redo(r.live));assert.equal(r.manager.objects.find(o=>o.id===3).glbPassthrough,next);
 }
 const r=fixture(),report=inspectImportedUV(r.live,r.payload,signature,{maxPreviewCorners:3});assert.equal(report.previewFaces.length,1);assert.deepEqual(report.faceIslands,[0,0,1]);assert.deepEqual(edit(r,'u').selectedFaces,[0,1]);assert(edit(r,'u').changed);assert.deepEqual(r.o.glbPassthrough.uvCorners,r.payload.uvCorners);
});
test('869 island edits survive project and actual native NOM UV bytes/seams and GLB export',async()=>{
 const r=fixture();assert(edit(r,'rotate').changed);const encoded=encodeBoxlabScene(r.owner.capture()),decoded=decodeBoxlabScene(JSON.parse(JSON.stringify(encoded)),(...a)=>new EditableMesh(...a)),o=decoded.objects.find(o=>o.id===3);assert.deepEqual(o.glbPassthrough.uvCorners,r.o.glbPassthrough.uvCorners);
 const nom=readNomadProject(buildNomadProject([o],template,{topologySignature:signature}).bytes),m=nom.json.meshes[0],field=k=>new DataView(nom.bin.buffer,nom.bin.byteOffset+m[k].offset,m[k].length),uv=field('uvs'),indices=field('faces_uv');for(let fi=0;fi<3;fi++)for(let j=0;j<4;j++){const id=indices.getInt32(fi*16+j*4,true);o.glbPassthrough.uvCorners[fi][Math.min(j,2)].forEach((v,k)=>assert.equal(uv.getFloat32(id*8+k*4,true),v));}
 const result=await exporter.build([o]);assert.equal(result.uvRestoredCount,1);assert.equal(result.tangentsRestoredCount,0);const scene=await exporter.decode(result.buffer);let count=0;scene.traverse(n=>{if(n.isMesh){count+=n.geometry.index?.count||n.geometry.getAttribute('uv').count;const a=n.geometry.getAttribute('uv');for(let i=0;i<a.count;i++)assert(o.glbPassthrough.uvCorners.flat().some(p=>p[0]===a.getX(i)&&p[1]===a.getY(i)));}});assert.equal(count,9);
});
test('869 stale selection, invalid index, stale topology, locked context and overflow refuse without checkpoint or data changes',()=>{
 for(const change of [r=>({island:0,payload:{...r.payload}}),r=>({island:-1,payload:r.payload}),r=>({island:99,payload:r.payload}),r=>{r.live.faces[0].reverse();return {island:0,payload:r.payload};},r=>{r.o.locked=true;return {island:0,payload:r.payload};}]){const r=fixture(),scope=change(r),n=r.h.undoStack.length;assert.equal(rotateImportedUV(r.o,r.live,signature,r.owner,scope).ok,false);assert.equal(r.o.glbPassthrough,r.payload);assert.equal(r.h.undoStack.length,n);}
 const r=fixture();r.payload.uvCorners[0]=[[-1.7e308,1.5e308],[1.7e308,1.5e308],[-1.7e308,1.7e308]];r.payload.uvCorners[1]=[[1.7e308,1.5e308],[1.7e308,1.7e308],[-1.7e308,1.7e308]];const n=r.h.undoStack.length;assert.equal(edit(r,'rotate').ok,false);assert.equal(r.o.glbPassthrough,r.payload);assert.equal(r.h.undoStack.length,n);
});
test('869 actual Mesh Health original buttons pass selected scope and retain only matching island membership after refresh',()=>{
 const source=fs.readFileSync(new URL('../src/mesh-health.js',import.meta.url),'utf8'),r=fixture(),retained=[];const workspace={active:true,selectedIsland:0,retainSelection:faces=>retained.push(faces)};
 const c={active:true,objectId:3,uvWorkspace:workspace,uvPayload:r.payload,currentMode:()=> 'object',activeObject:()=>r.o,liveMesh:()=>r.live,rotateImportedUV,flipImportedUV,__boxlabExportAs:{topologySignature:signature},__boxlabObjectHistory:r.owner,renderReport(){c.uvPayload=r.o.glbPassthrough;},setStatus(){}};vm.createContext(c);vm.runInContext(source.slice(source.indexOf('function rotateUVs(){'),source.indexOf('function manager(){')).replace(/uvRotate.addEventListener[^\n]*\n|uvFlipU.addEventListener[^\n]*\n|uvFlipV.addEventListener[^\n]*\n/g,''),c);
 assert.equal(c.rotateUVs(),true);assert.deepEqual(retained[0],[0,1]);assert.equal(r.o.glbPassthrough.uvCorners[2],r.payload.uvCorners[2]);assert.equal(c.flipUVs('u'),true);assert.deepEqual(retained[1],[0,1]);
});
