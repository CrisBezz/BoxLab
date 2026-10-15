import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import {EditableMesh} from '../src/mesh.js';
import {moveImportedUV,scaleImportedUV} from '../src/imported-uv-edit.js';
import {inspectImportedUV} from '../src/imported-uv-inspection.js';
import {encodeBoxlabScene,decodeBoxlabScene} from '../src/boxlab-project-codec.js';
import {buildNomadProject,readNomadProject} from '../src/nomad-export-core.js';
import {editableBooleanRuntime} from './helpers/editable-boolean-runtime.mjs';
import {glbOwnerRuntime} from './helpers/glb-owner-runtime.mjs';
const exporter=glbOwnerRuntime(),signature=m=>exporter.c.topologySignature(m),template=fs.readFileSync(new URL('../src/templates/nomad-tube.nom',import.meta.url));
function fixture(){const r=editableBooleanRuntime();r.manager.activate(3);r.manager.replaceActiveMesh(new EditableMesh([[0,0,0],[1,0,0],[0,1,0],[1,1,0],[2,0,0],[3,0,0],[2,1,0]],[[0,1,2],[1,3,2],[4,5,6]]));const o=r.manager.objects.find(o=>o.id===3),payload={version:1,source:'glb',uvTopologySignature:signature(r.live),uvCorners:[[[0,0],[.25,0],[0,.5]],[[.25,0],[.25,.5],[0,.5]],[[.75,.75],[1,.75],[.75,1]]],images:[{data:new Uint8Array([1,2])}],tangentCorners:[[],[],[]],meshExtras:{keep:true}};o.glbPassthrough=payload;r.manager.objects.find(o=>o.id===2).glbPassthrough=payload;return {...r,o,payload,owner:r.c.__boxlabObjectHistory};}
const move=(r,u,v)=>moveImportedUV(r.o,r.live,signature,r.owner,u,v,{island:0,payload:r.o.glbPassthrough});
const scale=(r,f)=>scaleImportedUV(r.o,r.live,signature,r.owner,f,{island:0,payload:r.o.glbPassthrough});
test('870 selected numeric Move and uniform Scale preserve other islands/geometry/shared payload and native UndoRedo',()=>{
 for(const kind of ['move','scale']){const r=fixture(),before=JSON.stringify(r.payload),n=r.h.undoStack.length,mesh=r.live;const result=kind==='move'?move(r,.125,-.25):scale(r,2);assert.deepEqual(result,{ok:true,changed:true,selectedFaces:[0,1]});const next=r.o.glbPassthrough;
 for(let fi=0;fi<2;fi++)r.payload.uvCorners[fi].forEach(([u,v],j)=>assert.deepEqual(next.uvCorners[fi][j],kind==='move'?[u+.125,v-.25]:[.125+(u-.125)*2,.25+(v-.25)*2]));
 assert.equal(next.uvCorners[2],r.payload.uvCorners[2]);assert.equal(next.images,r.payload.images);assert.equal(next.meshExtras,r.payload.meshExtras);assert.equal(next.tangentCorners,undefined);assert.equal(JSON.stringify(r.payload),before);assert.equal(r.live,mesh);assert.equal(r.manager.objects.find(o=>o.id===2).glbPassthrough,r.payload);assert.equal(r.h.undoStack.length,n+1);
 r.manager.replaceActiveMesh(r.h.undo(r.live));assert.equal(r.manager.objects.find(o=>o.id===3).glbPassthrough,r.payload);r.manager.replaceActiveMesh(r.h.redo(r.live));assert.equal(r.manager.objects.find(o=>o.id===3).glbPassthrough,next);
 }
});
test('870 numeric move/scale survive project, actual NOM corner bytes and indexed GLB UV attributes',async()=>{
 const r=fixture();assert(move(r,.125,-.25).changed);assert(scale(r,.5).changed);const encoded=encodeBoxlabScene(r.owner.capture()),decoded=decodeBoxlabScene(JSON.parse(JSON.stringify(encoded)),(...a)=>new EditableMesh(...a)),o=decoded.objects.find(o=>o.id===3);assert.deepEqual(o.glbPassthrough.uvCorners,r.o.glbPassthrough.uvCorners);
 const nom=readNomadProject(buildNomadProject([o],template,{topologySignature:signature}).bytes),m=nom.json.meshes[0],field=k=>new DataView(nom.bin.buffer,nom.bin.byteOffset+m[k].offset,m[k].length),uv=field('uvs'),indices=field('faces_uv');for(let fi=0;fi<3;fi++)for(let j=0;j<4;j++){const id=indices.getInt32(fi*16+j*4,true);o.glbPassthrough.uvCorners[fi][Math.min(j,2)].forEach((v,k)=>assert.equal(uv.getFloat32(id*8+k*4,true),v));}
 const result=await exporter.build([o]);assert.equal(result.uvRestoredCount,1);assert.equal(result.tangentsRestoredCount,0);const scene=await exporter.decode(result.buffer);let count=0;scene.traverse(n=>{if(n.isMesh){count+=n.geometry.index?.count||n.geometry.getAttribute('uv').count;const a=n.geometry.getAttribute('uv');for(let i=0;i<a.count;i++)assert(o.glbPassthrough.uvCorners.flat().some(p=>p[0]===a.getX(i)&&p[1]===a.getY(i)));}});assert.equal(count,9);
});
test('870 numeric no-ops add no history; invalid/absent/stale scope, nonpositive scale, unsupported context and overflow refuse',()=>{
 const r=fixture(),n=r.h.undoStack.length;assert.equal(move(r,0,0).changed,false);assert.equal(scale(r,1).changed,false);assert.equal(r.o.glbPassthrough,r.payload);assert.equal(r.h.undoStack.length,n);
 for(const f of [0,-1,NaN,Infinity])assert.equal(scale(r,f).ok,false);for(const a of [NaN,Infinity])assert.equal(move(r,a,0).ok,false);
 assert.equal(moveImportedUV(r.o,r.live,signature,r.owner,1,0).ok,false);assert.equal(scaleImportedUV(r.o,r.live,signature,r.owner,2).ok,false);assert.equal(moveImportedUV(r.o,r.live,signature,r.owner,1,0,{island:0,payload:{...r.payload}}).ok,false);
 r.o.locked=true;assert.equal(move(r,1,0).ok,false);r.o.locked=false;r.payload.uvCorners[0][0][0]=1e308;assert.equal(move(r,1e308,0).ok,false);assert.equal(r.o.glbPassthrough,r.payload);assert.equal(r.h.undoStack.length,n);
});
test('870 actual Mesh Health numeric callback guards context and uses original resource/history and selection retention',()=>{
 const source=fs.readFileSync(new URL('../src/mesh-health.js',import.meta.url),'utf8'),r=fixture(),retained=[];const workspace={active:true,selectedIsland:0,retainSelection:faces=>retained.push(faces)};
 const c={active:true,objectId:3,uvWorkspace:workspace,uvPayload:r.payload,currentMode:()=> 'object',activeObject:()=>r.o,liveMesh:()=>r.live,moveImportedUV,scaleImportedUV,__boxlabExportAs:{topologySignature:signature},__boxlabObjectHistory:r.owner,renderReport(){c.uvPayload=r.o.glbPassthrough;},setStatus(){}};vm.createContext(c);vm.runInContext(source.slice(source.indexOf('function transformUVs('),source.indexOf('function manager(){')),c);
 assert.equal(c.transformUVs('move',.125,-.25),true);assert.deepEqual(retained[0],[0,1]);assert.equal(c.transformUVs('scale',2),true);assert.deepEqual(retained[1],[0,1]);workspace.selectedIsland=null;const before=r.o.glbPassthrough;assert.equal(c.transformUVs('move',1,1),false);assert.equal(r.o.glbPassthrough,before);
});
