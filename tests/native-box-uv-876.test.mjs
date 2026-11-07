import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import {EditableMesh} from '../src/mesh.js';
import {inspectImportedUV} from '../src/imported-uv-inspection.js';
import {createPlanarUV,createBoxUV,moveImportedUV,scaleImportedUV,rotateImportedUVByAngle,fitImportedUVToTile} from '../src/imported-uv-edit.js';
import {encodeBoxlabScene,decodeBoxlabScene} from '../src/boxlab-project-codec.js';
import {buildNomadProject,readNomadProject} from '../src/nomad-export-core.js';
import {editableBooleanRuntime} from './helpers/editable-boolean-runtime.mjs';
import {glbOwnerRuntime} from './helpers/glb-owner-runtime.mjs';
const exporter=glbOwnerRuntime(),signature=m=>exporter.c.topologySignature(m),near=(a,b)=>assert(Math.abs(a-b)<1e-12,`${a} != ${b}`);
function fixture(){const r=editableBooleanRuntime();r.manager.activate(3);return {...r,object:r.manager.objects.find(o=>o.id===3),owner:r.c.__boxlabObjectHistory};}
const project=r=>createBoxUV(r.object,r.live,signature,r.owner),scope=r=>({island:0,payload:r.object.glbPassthrough});
test('876 cube Box UVs make six separated islands/12 seams, no collapsed faces or geometry changes and one native Undo',()=>{
 const r=fixture(),mesh=r.live,before=JSON.stringify(mesh.vertices),n=r.h.undoStack.length;assert.deepEqual(project(r),{ok:true,changed:true});const payload=r.object.glbPassthrough,report=inspectImportedUV(mesh,payload,signature);assert.equal(report.islandCount,6);assert.equal(report.seamEdges,12);assert.equal(report.mappedFaces,6);assert.equal(payload.source,'boxlab');assert.equal(r.live,mesh);assert.equal(JSON.stringify(mesh.vertices),before);assert.equal(r.h.undoStack.length,n+1);
 const boxes=payload.uvCorners.map(face=>{const xs=face.map(p=>p[0]),ys=face.map(p=>p[1]);const b={minU:Math.min(...xs),maxU:Math.max(...xs),minV:Math.min(...ys),maxV:Math.max(...ys)};near(b.maxU-b.minU,b.maxV-b.minV);assert(b.minU>=.02-1e-12&&b.maxU<=.98+1e-12&&b.minV>0&&b.maxV<1);return b;});
 for(let i=0;i<boxes.length;i++)for(let j=i+1;j<boxes.length;j++){const a=boxes[i],b=boxes[j];assert(a.maxU<b.minU||b.maxU<a.minU||a.maxV<b.minV||b.maxV<a.minV);}
 assert.equal(project(r).changed,false);assert.equal(r.h.undoStack.length,n+1);r.manager.replaceActiveMesh(r.h.undo(r.live));assert.equal(r.manager.objects.find(o=>o.id===3).glbPassthrough,undefined);r.manager.replaceActiveMesh(r.h.redo(r.live));assert.equal(r.manager.objects.find(o=>o.id===3).glbPassthrough,payload);
});
test('876 box projection preserves rectangular proportions/equal UV density, same-direction subdivisions and finite extremes',()=>{
 for(const factor of [1,1e308,1e-320]){const r=fixture();r.live.vertices.forEach(v=>{v.x*=factor;v.x*=2;v.y*=factor;v.z*=factor;v.z*=.5;});assert(project(r).ok);const p=r.object.glbPassthrough;
 assert(p.uvCorners.flat(2).every(Number.isFinite));assert.equal(inspectImportedUV(r.live,p,signature).islandCount,6);
 if(factor===1){const ratios=[];r.live.faces.forEach((f,fi)=>{for(let j=0;j<f.length;j++){const a=r.live.vertices[f[j]],b=r.live.vertices[f[(j+1)%f.length]],u=p.uvCorners[fi][j],v=p.uvCorners[fi][(j+1)%f.length];ratios.push(Math.hypot(u[0]-v[0],u[1]-v[1])/a.distanceTo(b));}});ratios.forEach(v=>near(v,ratios[0]));}
 }
 const r=fixture();r.manager.replaceActiveMesh(new EditableMesh([[0,0,0],[1,0,0],[0,1,0],[1,1,0]],[[0,1,2],[1,3,2]]));assert(project(r).ok);const report=inspectImportedUV(r.live,r.object.glbPassthrough,signature);assert.equal(report.islandCount,1);assert.equal(report.seamEdges,0);
});
test('876 Box replaces native planar UVs with one checkpoint, retains peer resources and selected-island edit ownership',()=>{
 const r=fixture();assert(createPlanarUV(r.object,r.live,signature,r.owner,'xy').ok);const old=r.object.glbPassthrough,oldJSON=JSON.stringify(old),copy=r.manager.addMesh(r.live,'Peer',{glbPassthrough:old,enterObjectMode:false});r.manager.activate(3);const n=r.h.undoStack.length;assert(project(r).ok);const box=r.object.glbPassthrough;assert.equal(copy.glbPassthrough,old);assert.equal(JSON.stringify(old),oldJSON);assert.equal(r.h.undoStack.length,n+1);
 const report=inspectImportedUV(r.live,box,signature),island=report.faceIslands[0],scope={island,payload:box};assert(moveImportedUV(r.object,r.live,signature,r.owner,.1,0,scope).ok);const next=r.object.glbPassthrough;for(let fi=0;fi<6;fi++)if(report.faceIslands[fi]!==island)assert.equal(next.uvCorners[fi],box.uvCorners[fi]);
 r.manager.replaceActiveMesh(r.h.undo(r.live));assert.equal(r.manager.objects.find(o=>o.id===3).glbPassthrough,box);r.manager.replaceActiveMesh(r.h.undo(r.live));assert.equal(r.manager.objects.find(o=>o.id===3).glbPassthrough,old);
});
test('876 Box UVs survive native project/NOM/GLB UV seams and actual MeshHealth callback/context checks',async()=>{
 const r=fixture(),source=fs.readFileSync(new URL('../src/mesh-health.js',import.meta.url),'utf8');let renders=0;const c={active:true,objectId:3,currentMode:()=> 'object',activeObject:()=>r.object,liveMesh:()=>r.live,createBoxUV,__boxlabExportAs:{topologySignature:signature},__boxlabObjectHistory:r.owner,renderReport(){renders++;},setStatus(){}};vm.createContext(c);vm.runInContext(source.slice(source.indexOf('function boxUVs('),source.indexOf('uvBox.addEventListener')),c);assert.equal(c.boxUVs(),true);assert.equal(renders,1);c.objectId=1;assert.equal(c.boxUVs(),false);assert.equal(renders,1);
 const encoded=encodeBoxlabScene(r.owner.capture()),decoded=decodeBoxlabScene(JSON.parse(JSON.stringify(encoded)),(...a)=>new EditableMesh(...a)),o=decoded.objects.find(o=>o.id===3);assert.equal(o.glbPassthrough.source,'boxlab');assert.equal(JSON.stringify(o.glbPassthrough.uvCorners),JSON.stringify(r.object.glbPassthrough.uvCorners));assert.equal(inspectImportedUV(o.mesh,o.glbPassthrough,signature).islandCount,6);
 const nom=readNomadProject(buildNomadProject([o],fs.readFileSync(new URL('../src/templates/nomad-tube.nom',import.meta.url)),{topologySignature:signature}).bytes),m=nom.json.meshes[0],field=k=>new DataView(nom.bin.buffer,nom.bin.byteOffset+m[k].offset,m[k].length),uv=field('uvs'),indices=field('faces_uv');assert(m.count_uv>m.count_vertex);for(let fi=0;fi<6;fi++)for(let j=0;j<4;j++){const id=indices.getInt32(fi*16+j*4,true);o.glbPassthrough.uvCorners[fi][j].forEach((v,k)=>assert.equal(uv.getFloat32(id*8+k*4,true),Math.fround(v)));}
 const glb=await exporter.build([o]);assert.equal(glb.uvRestoredCount,1);const scene=await exporter.decode(glb.buffer);scene.traverse(n=>{if(n.isMesh){const a=n.geometry.getAttribute('uv');for(let i=0;i<a.count;i++)assert(o.glbPassthrough.uvCorners.flat().some(p=>Math.fround(p[0])===a.getX(i)&&Math.fround(p[1])===a.getY(i)));}});
});
test('876 Box projection refuses imported/procedural/modifier/invalid/degenerate contexts before mutation/history',()=>{
 for(const values of [{locked:true},{kind:'reference'},{sourceId:'link'},{arrayRecipe:{}},{booleanRecipe:{}},{curveProfile:{}},{settings:{subd:true}},{settings:{mirror:{x:true}}},{glbPassthrough:{version:1,source:'glb'}}]){const r=fixture();Object.assign(r.object,values);const before=r.object.glbPassthrough,n=r.h.undoStack.length;assert.equal(project(r).ok,false);assert.equal(r.object.glbPassthrough,before);assert.equal(r.h.undoStack.length,n);}
 for(const mutate of [r=>r.live.faces[0]=[0,0,0],r=>r.live.faces[0][0]=999,r=>r.live.vertices[0].x=Infinity]){const r=fixture();mutate(r);const n=r.h.undoStack.length;assert.equal(project(r).ok,false);assert.equal(r.object.glbPassthrough,undefined);assert.equal(r.h.undoStack.length,n);}
 const r=fixture();assert.equal(createBoxUV(r.object,r.live,signature,null).ok,false);assert.equal(r.object.glbPassthrough,undefined);
});
