import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import {EditableMesh} from '../src/mesh.js';
import {meshTopologySignature as signature} from '../src/mesh-topology-signature.js';
import {createFaceAtlasUV,createBoxUV,clearNativePaint} from '../src/imported-uv-edit.js';
import {inspectImportedUV,importedUVIslandBounds} from '../src/imported-uv-inspection.js';
import {encodeBoxlabScene,decodeBoxlabScene} from '../src/boxlab-project-codec.js';
import {buildNomadProject,readNomadProject} from '../src/nomad-export-core.js';
import {editableBooleanRuntime} from './helpers/editable-boolean-runtime.mjs';
import {glbOwnerRuntime} from './helpers/glb-owner-runtime.mjs';
import {viewportPaintRuntime} from './helpers/viewport-paint-runtime.mjs';

const history={capture:()=>({}),checkpointSnapshot:()=>true};
const project=(o,m,h=history)=>createFaceAtlasUV(o,m,signature,h);
function check(mesh,payload){
 const report=inspectImportedUV(mesh,payload,signature);assert.equal(report.state,'ready');assert.equal(report.islandCount,mesh.faces.length);assert.equal(report.missingFaces,0);
 const boxes=mesh.faces.map((_,fi)=>importedUVIslandBounds(payload.uvCorners,[fi]));
 for(const b of boxes){assert(b.minU>=.02-1e-12&&b.maxU<=.98+1e-12&&b.minV>=.02-1e-12&&b.maxV<=.98+1e-12);assert(b.maxU>b.minU&&b.maxV>b.minV);}
 for(let i=0;i<boxes.length;i++)for(let j=i+1;j<boxes.length;j++){const a=boxes[i],b=boxes[j];assert(a.maxU<b.minU||b.maxU<a.minU||a.maxV<b.minV||b.maxV<a.minV);}
 // Independent analytical average density check, including rotated/concave faces.
 const ratios=mesh.faces.map((face,fi)=>{
  const a=mesh.vertices[face[0]],sum=a.clone().set(0,0,0);let uvArea=0;
  for(let i=1;i<face.length-1;i++)sum.add(mesh.vertices[face[i]].clone().sub(a).cross(mesh.vertices[face[i+1]].clone().sub(a)));
  const uv=payload.uvCorners[fi],p=uv[0];for(let i=1;i<uv.length-1;i++)uvArea+=(uv[i][0]-p[0])*(uv[i+1][1]-p[1])-(uv[i][1]-p[1])*(uv[i+1][0]-p[0]);
  return Math.abs(uvArea)/sum.length();
 });for(const ratio of ratios)assert(Math.abs(ratio/ratios[0]-1)<1e-9);return report;
}

test('949 Face atlas separates overlapping and subdivided faces, equalizes average density and keeps exact geometry/face corners without touching Box UV behavior',()=>{
 const mesh=new EditableMesh([[0,0,0],[3,0,0],[3,1,0],[1,1,0],[1,2,0],[0,2,0],[0,0,1],[2,0,3],[0,1,1]],[[0,1,2,3,4,5],[6,7,8]]),object={settings:{}};
 const before=JSON.stringify(mesh);assert(project(object,mesh).changed);check(mesh,object.glbPassthrough);assert.equal(JSON.stringify(mesh),before);assert.equal(object.glbPassthrough.uvCorners[0].length,6);assert.equal(project(object,mesh).changed,false);
 const shared=new EditableMesh([[0,0,0],[1,0,0],[0,1,0],[1,1,0]],[[0,1,2],[1,3,2]]),box={};assert(createBoxUV(box,shared,signature,history).ok);assert.equal(inspectImportedUV(shared,box.glbPassthrough,signature).islandCount,1);assert(project(box,shared).changed);check(shared,box.glbPassthrough);
});

test('949 Face atlas supports 128 planar faces and stable scales/translations, refuses unavailable warped preview/degenerate/invalid/over-limit work before history',()=>{
 for(const scale of [.001,1,1e100]){const mesh=EditableMesh.cube(2);mesh.vertices.forEach(v=>v.multiplyScalar(scale).addScalar(3*scale));const o={};assert(project(o,mesh).ok);const report=inspectImportedUV(mesh,o.glbPassthrough,signature);assert.equal(report.islandCount,6);assert(o.glbPassthrough.uvCorners.flat(2).every(Number.isFinite));}
 const vertices=[],faces=[];for(let i=0;i<129;i++){const n=vertices.length;vertices.push([i*2,0,0],[i*2+1,0,0],[i*2,1,0]);faces.push([n,n+1,n+2]);}
 const limit=new EditableMesh(vertices,faces.slice(0,128)),o={};assert(project(o,limit).ok);check(limit,o.glbPassthrough);
 for(const mesh of [new EditableMesh(vertices,faces),new EditableMesh([[0,0,0],[1,0,0],[1,1,.1],[0,1,0]],[[0,1,2,3]]),new EditableMesh([[0,0,0],[1,0,0],[2,0,0]],[[0,1,2]]),new EditableMesh([[0,0,0],[1,0,0],[0,1,0]],[[0,0,2]])]){let captures=0;const obj={};assert(!project(obj,mesh,{capture(){captures++;return{};},checkpointSnapshot:()=>true}).ok);assert.equal(captures,0);assert.equal(obj.glbPassthrough,undefined);}
});

test('949 one original checkpoint replaces UVs, exact Undo/Redo and idempotence preserve shared peer resources; paint must be explicitly cleared first',async()=>{
 const r=viewportPaintRuntime(),o=r.target(),old=o.glbPassthrough,peer=r.manager.objects.find(o=>o.id===2);peer.glbPassthrough=old;const n=r.h.undoStack.length,before=JSON.stringify(r.live);
 assert(project(o,r.live,r.c.__boxlabObjectHistory).changed);const atlas=o.glbPassthrough;assert.equal(r.h.undoStack.length,n+1);assert.equal(peer.glbPassthrough,old);assert.equal(JSON.stringify(r.live),before);assert.equal(project(o,r.live,r.c.__boxlabObjectHistory).changed,false);assert.equal(r.h.undoStack.length,n+1);
 r.manager.replaceActiveMesh(r.h.undo(r.live));assert.equal(r.target().glbPassthrough,old);r.manager.replaceActiveMesh(r.h.redo(r.live));assert.equal(r.target().glbPassthrough,atlas);
 await r.painter.open();r.painter.begin({x:450,y:300,width:900,height:600,pressure:1},{radius:7,colour:'#ff0000',opacity:1,hardness:1,pressure:false});r.painter.finish();r.painter.close();const paint=r.target().colourPaint,count=r.h.undoStack.length;
 assert.match(project(r.target(),r.live,r.c.__boxlabObjectHistory).reason,/Clear paint/);assert.equal(r.target().colourPaint,paint);assert.equal(r.h.undoStack.length,count);
 assert(clearNativePaint(r.target(),r.live,r.c.__boxlabObjectHistory,true).changed);assert(project(r.target(),r.live,r.c.__boxlabObjectHistory).changed);await r.painter.open();assert(r.painter.pixels.every(v=>v===255));r.painter.close();
});

test('949 Face atlas refuses incompatible owners, every paint channel and unavailable/refused history without changing resources',()=>{
 const mesh=EditableMesh.cube(2);
 for(const patch of [{locked:true},{kind:'reference'},{sourceId:1},{arrayRecipe:{}},{booleanRecipe:{}},{curveProfile:{}},{settings:{subd:true}},{settings:{mirror:{x:true}}},{materials:[]},{textures:[]},{glbPassthrough:{source:'glb',version:1}},{colourPaint:{}},{roughnessPaint:{}},{metalnessPaint:{}}]){const o={...patch},old=o.glbPassthrough;let captures=0;assert(!project(o,mesh,{capture(){captures++;return{};},checkpointSnapshot:()=>true}).ok);assert.equal(captures,0);assert.equal(o.glbPassthrough,old);}
 for(const h of [null,{capture:()=>null,checkpointSnapshot:()=>true},{capture:()=>({}),checkpointSnapshot:()=>false}]){const o={};assert(!project(o,mesh,h).ok);assert.equal(o.glbPassthrough,undefined);}
});

test('949 Face atlas uses existing native codec and NOM/GLB UV writers with exact independent corner indices',async()=>{
 const mesh=EditableMesh.cube(2),object={id:1,name:'Atlas',mesh,settings:{}};assert(project(object,mesh).ok);
 const saved=encodeBoxlabScene({objects:[object],activeId:1}),opened=decodeBoxlabScene(JSON.parse(JSON.stringify(saved)),(...a)=>new EditableMesh(...a)),o=opened.objects[0];assert.deepEqual(o.glbPassthrough,object.glbPassthrough);check(o.mesh,o.glbPassthrough);
 const nom=readNomadProject(buildNomadProject([o],fs.readFileSync(new URL('../src/templates/nomad-tube.nom',import.meta.url)),{topologySignature:signature}).bytes),m=nom.json.meshes[0],uv=new DataView(nom.bin.buffer,nom.bin.byteOffset+m.uvs.offset,m.uvs.length),indices=new DataView(nom.bin.buffer,nom.bin.byteOffset+m.faces_uv.offset,m.faces_uv.length);
 for(let fi=0;fi<6;fi++)for(let j=0;j<4;j++){const id=indices.getInt32(fi*16+j*4,true);o.glbPassthrough.uvCorners[fi][j].forEach((v,k)=>assert.equal(uv.getFloat32(id*8+k*4,true),Math.fround(v)));}
 const exporter=glbOwnerRuntime(),glb=await exporter.build([o]);assert.equal(glb.uvRestoredCount,1);const scene=await exporter.decode(glb.buffer);scene.traverse(n=>{if(n.isMesh){const a=n.geometry.getAttribute('uv');for(let i=0;i<a.count;i++)assert(o.glbPassthrough.uvCorners.flat().some(p=>Math.fround(p[0])===a.getX(i)&&Math.fround(p[1])===a.getY(i)));}});
});

test('949 original UV panel Face atlas callback uses current target/history, refreshes report, refuses stale selection and exposes clear-paint requirement',()=>{
 const r=editableBooleanRuntime();r.manager.activate(3);const object=()=>r.manager.objects.find(o=>o.id===3),source=fs.readFileSync(new URL('../src/mesh-health.js',import.meta.url),'utf8');let reports=0,message='';
 const c={active:true,objectId:3,currentMode:()=> 'object',activeObject:object,liveMesh:()=>r.live,createFaceAtlasUV,__boxlabExportAs:{topologySignature:signature},__boxlabObjectHistory:r.c.__boxlabObjectHistory,renderReport:()=>reports++,setStatus:s=>message=s};vm.createContext(c);vm.runInContext(source.slice(source.indexOf('function faceAtlasUVs('),source.indexOf('uvFaceAtlas.addEventListener')),c);
 assert(c.faceAtlasUVs());assert.equal(reports,1);assert.match(message,/Face atlas created/);object().colourPaint={};assert(!c.faceAtlasUVs());assert.match(message,/Clear paint/);assert.equal(reports,2);c.objectId=99;assert(!c.faceAtlasUVs());assert.equal(reports,2);
 assert.match(source,/id="meshHealthUVFaceAtlas"/);assert.match(source,/uvFaceAtlas\.disabled=!nativeReady\|\|hasPaint/);assert.match(source,/one island per face, up to 128 faces/i);
});
