import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import {inspectPNG} from './helpers/png-inspect.mjs';
import {parseEditableOBJ} from '../src/obj-facegroups-core.js';
import {EditableMesh} from '../src/mesh.js';
import {createFaceAtlasUV,createBoxUV,equalizeImportedUVDensity} from '../src/imported-uv-edit.js';
import {meshTopologySignature as signature} from '../src/mesh-topology-signature.js';
import {inspectImportedUV,importedUVIslandBounds} from '../src/imported-uv-inspection.js';
import {glbOwnerRuntime} from './helpers/glb-owner-runtime.mjs';
import {viewportPaintRuntime} from './helpers/viewport-paint-runtime.mjs';
import {encodeBoxlabScene,decodeBoxlabScene} from '../src/boxlab-project-codec.js';
import {buildNomadProject,readNomadProject} from '../src/nomad-export-core.js';

// Exact user-supplied OBJ, unmodified; parser is the production editable OBJ owner.
const source=fs.readFileSync(new URL('./fixtures/extrude-and-scale-950.obj',import.meta.url),'utf8');
const mesh=()=>parseEditableOBJ(source)[0].mesh;
// Prepare through the actual native writer's pinned module-local capture owner.
const writerSource=fs.readFileSync(new URL('../src/nomad-export-core.js',import.meta.url),'utf8');
const captureURL=writerSource.match(/from '(\.\/paint-export\.js[^']+)'/)[1];
const {capturePaintExportObjects,preparePaintExportObjects}=await import(new URL(captureURL,new URL('../src/nomad-export-core.js',import.meta.url)));
const owner=glbOwnerRuntime().c,history={capture:()=>({}),checkpointSnapshot:()=>true};
const project=(o,m,h=history,preview=owner)=>createFaceAtlasUV(o,m,signature,h,preview);
function check(m,o){
 const p=o.glbPassthrough,report=inspectImportedUV(m,p,signature);assert.equal(report.state,'ready');assert.equal(report.islandCount,m.faces.length);assert.equal(report.missingFaces,0);
 const bounds=m.faces.map((_,fi)=>importedUVIslandBounds(p.uvCorners,[fi]));
 for(const b of bounds)assert(b.minU>=.02-1e-12&&b.minV>=.02-1e-12&&b.maxU<=.98+1e-12&&b.maxV<=.98+1e-12);
 for(let i=0;i<bounds.length;i++)for(let j=i+1;j<bounds.length;j++){const a=bounds[i],b=bounds[j];assert(a.maxU<b.minU||b.maxU<a.minU||a.maxV<b.minV||b.maxV<a.minV);}
 const g=owner.buildUVPreviewGeometry(m,p,{faceIndices:true}),areas=m.faces.map(()=>0),uvAreas=m.faces.map(()=>0),f=g.userData.boxlabTriangleFaces,v=g.userData.boxlabTriangleVertices;
 for(let i=0;i<f.length;i++){const fi=f[i],ids=v.slice(i*3,i*3+3),[a,b,c]=ids.map(id=>m.vertices[id]);areas[fi]+=b.clone().sub(a).cross(c.clone().sub(a)).length();const [x,y,z]=ids.map(id=>p.uvCorners[fi][m.faces[fi].indexOf(id)]);uvAreas[fi]+=Math.abs((y[0]-x[0])*(z[1]-x[1])-(y[1]-x[1])*(z[0]-x[0]));}
 const ratios=areas.map((a,i)=>uvAreas[i]/a);for(const r of ratios)assert(Math.abs(r/ratios[0]-1)<1e-9);g.dispose();
}

test('950 exact supplied 24-vertex/20-face extrusion mesh maps all faces with separated equal-density islands and unchanged quads/ngons',()=>{
 const m=mesh(),o={},before=JSON.stringify(m);assert.equal(m.vertices.length,24);assert.equal(m.faces.length,20);assert.equal(m.faces.filter(f=>f.length===4).length,14);
 assert(createBoxUV(o,m,signature,history).ok);assert.match(equalizeImportedUVDensity(o,m,signature,history,{payload:o.glbPassthrough}).reason,/planar/);
 let freed=0;const preview={buildUVPreviewGeometry(...args){const g=owner.buildUVPreviewGeometry(...args);g.addEventListener('dispose',()=>freed++);return g;}};
 assert(project(o,m,history,preview).changed);assert.equal(freed,1);check(m,o);assert.equal(JSON.stringify(m),before);assert.equal(project(o,m).changed,false);
 // The standalone density rule is still strict; atlas alone uses measured triangles.
 assert.match(equalizeImportedUVDensity(o,m,signature,history,{payload:o.glbPassthrough}).reason,/planar/);
});

test('950 ordinary extrusion plus axis scale reproducer maps warped quads without changing geometry at small/normal/large supported scale',()=>{
 for(const scale of [.01,1,10000]){
  const m=EditableMesh.cube(2);m.extrudeFace(5,.6);m.scaleComponent({type:'face',index:5},.6);m.extrudeFace(6,.4);const c=m.faceCenter(6);for(const id of m.faces[6])m.vertices[id].x=c.x+(m.vertices[id].x-c.x)*.6;
  m.vertices.forEach(v=>v.multiplyScalar(scale));const before=JSON.stringify(m),o={};assert(project(o,m).ok);check(m,o);assert.equal(JSON.stringify(m),before);
 }
});

test('950 exact user mesh uses original scene Undo/Redo, paints after atlas and retains exact UV/paint through project and native/GLB export',async()=>{
 const r=viewportPaintRuntime(),m=mesh();r.manager.replaceActiveMesh(m);const o=r.target();delete o.glbPassthrough;const before=JSON.stringify(r.live),n=r.h.undoStack.length;
 assert(project(o,r.live,r.c.__boxlabObjectHistory).changed);const atlas=o.glbPassthrough;assert.equal(r.h.undoStack.length,n+1);assert.equal(JSON.stringify(r.live),before);
 r.manager.replaceActiveMesh(r.h.undo(r.live));assert.equal(r.target().glbPassthrough,undefined);r.manager.replaceActiveMesh(r.h.redo(r.live));assert.equal(r.target().glbPassthrough,atlas);
 r.body.geometry.dispose();r.body.geometry=owner.buildUVPreviewGeometry(r.live,atlas);r.body.updateMatrixWorld(true);await r.painter.open();
 r.painter.begin({x:450,y:300,width:900,height:600,pressure:1},{radius:8,colour:'#2244ee',opacity:1,hardness:1,pressure:false});r.painter.finish();r.painter.close();assert(r.target().colourPaint);const paint=r.target().colourPaint;
 const saved=encodeBoxlabScene(r.c.__boxlabObjectHistory.capture()),loaded=decodeBoxlabScene(JSON.parse(JSON.stringify(saved)),(...a)=>new EditableMesh(...a)),reopened=loaded.objects.find(o=>o.id===3);assert.equal(JSON.stringify(reopened.glbPassthrough),JSON.stringify(atlas));assert.deepEqual(reopened.colourPaint,paint);
 const prepared=capturePaintExportObjects([reopened]);await preparePaintExportObjects(prepared,{subd:false,owner});const nom=readNomadProject(buildNomadProject(prepared,fs.readFileSync(new URL('../src/templates/nomad-tube.nom',import.meta.url)),{topologySignature:signature}).bytes);assert(nom.json.meshes[0].uvs.length>0);
 const oldSelf=globalThis.self,oldBitmap=globalThis.createImageBitmap;globalThis.self=globalThis;
 globalThis.createImageBitmap=async blob=>{const p=inspectPNG(new Uint8Array(await blob.arrayBuffer()));return {width:p.width,height:p.height,close(){}};};
 try{const glb=await glbOwnerRuntime().build([reopened]);assert.equal(glb.objectDetails.filter(o=>o.paintImage).length,1);assert.equal(glb.uvRestoredCount,1);}
 finally{if(oldSelf===undefined)delete globalThis.self;else globalThis.self=oldSelf;if(oldBitmap===undefined)delete globalThis.createImageBitmap;else globalThis.createImageBitmap=oldBitmap;}
});

test('950 absent/invalid/folded preview and refused history stay atomic, dispose temporary geometry and preserve paint guard',()=>{
 const m=mesh();
 for(const preview of [null,{buildUVPreviewGeometry:()=>null},{buildUVPreviewGeometry(){throw Error('unavailable');}}]){let captured=0;const o={};const r=project(o,m,{capture(){captured++;return{};},checkpointSnapshot:()=>true},preview);assert(!r.ok);assert.equal(captured,0);assert.equal(o.glbPassthrough,undefined);}
 let freed=0;const bad={buildUVPreviewGeometry(...args){const g=owner.buildUVPreviewGeometry(...args);const v=[...g.userData.boxlabTriangleVertices];v[0]=v[1];g.userData.boxlabTriangleVertices=v;g.addEventListener('dispose',()=>freed++);return g;}};const o={};assert.match(project(o,m,history,bad).reason,/Face 1.*ownership/);assert.equal(freed,1);assert.equal(o.glbPassthrough,undefined);
 const flipped={buildUVPreviewGeometry(...args){const g=owner.buildUVPreviewGeometry(...args),v=[...g.userData.boxlabTriangleVertices];[v[0],v[1]]=[v[1],v[0]];g.userData.boxlabTriangleVertices=v;g.addEventListener('dispose',()=>freed++);return g;}};assert.match(project({},m,history,flipped).reason,/Face 1 folds/);assert.equal(freed,2);
 assert(!project(o,m,{capture:()=>({}),checkpointSnapshot:()=>false}).ok);assert.equal(o.glbPassthrough,undefined);
 const painted={colourPaint:{}};assert.match(project(painted,m,history,bad).reason,/Clear paint/);assert.equal(freed,2);
});


test('950 actual Face atlas panel forwards its current preview owner for the supplied warped mesh and preserves target guards',()=>{
 const m=mesh(),o={id:7},text=fs.readFileSync(new URL('../src/mesh-health.js',import.meta.url),'utf8');let reports=0,status='';
 const c={active:true,objectId:7,activeObject:()=>o,liveMesh:()=>m,currentMode:()=> 'object',createFaceAtlasUV,__boxlabExportAs:{...owner,topologySignature:signature},__boxlabObjectHistory:history,renderReport:()=>reports++,setStatus:s=>status=s};vm.createContext(c);vm.runInContext(text.slice(text.indexOf('function faceAtlasUVs('),text.indexOf('uvFaceAtlas.addEventListener')),c);
 assert(c.faceAtlasUVs());assert.equal(reports,1);assert.match(status,/Face atlas created/);check(m,o);c.objectId=8;assert(!c.faceAtlasUVs());assert.equal(reports,1);
});
