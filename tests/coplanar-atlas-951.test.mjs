import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import {EditableMesh} from '../src/mesh.js';
import {parseEditableOBJ} from '../src/obj-facegroups-core.js';
import {createCoplanarAtlasUV,createFaceAtlasUV,moveImportedUV} from '../src/imported-uv-edit.js';
import {meshTopologySignature as signature} from '../src/mesh-topology-signature.js';
import {inspectImportedUV,importedUVIslandBounds} from '../src/imported-uv-inspection.js';
import {glbOwnerRuntime} from './helpers/glb-owner-runtime.mjs';
import {viewportPaintRuntime} from './helpers/viewport-paint-runtime.mjs';
import {encodeBoxlabScene,decodeBoxlabScene} from '../src/boxlab-project-codec.js';
const owner=glbOwnerRuntime().c,history={capture:()=>({}),checkpointSnapshot:()=>true};
const project=(o,m,h=history,p=owner)=>createCoplanarAtlasUV(o,m,signature,h,p);
const supplied=()=>parseEditableOBJ(fs.readFileSync(new URL('./fixtures/extrude-and-scale-950.obj',import.meta.url),'utf8'))[0].mesh;
const patch=()=>new EditableMesh([[0,0,0],[1,0,0],[0,1,0],[1,1,0],[2,0,0],[2,1,0]],[[0,1,3,2],[1,4,5,3]]);
function check(m,o){
 const p=o.glbPassthrough,r=inspectImportedUV(m,p,signature);assert.equal(r.state,'ready');assert.equal(r.mappedFaces,m.faces.length);
 const bounds=Array.from({length:r.islandCount},(_,id)=>importedUVIslandBounds(p.uvCorners,r.faceIslands.flatMap((n,fi)=>n===id?[fi]:[])));
 for(const b of bounds)assert(b.minU>=.02-1e-12&&b.minV>=.02-1e-12&&b.maxU<=.98+1e-12&&b.maxV<=.98+1e-12);
 for(let i=0;i<bounds.length;i++)for(let j=i+1;j<bounds.length;j++){const a=bounds[i],b=bounds[j];assert(a.maxU<b.minU||b.maxU<a.minU||a.maxV<b.minV||b.maxV<a.minV);}
 const g=owner.buildUVPreviewGeometry(m,p,{faceIndices:true}),ratios=[],areas=Array(r.islandCount).fill(0),uvAreas=[...areas];
 for(let t=0;t<g.userData.boxlabTriangleFaces.length;t++){
  const fi=g.userData.boxlabTriangleFaces[t],ids=g.userData.boxlabTriangleVertices.slice(t*3,t*3+3),[a,b,c]=ids.map(id=>m.vertices[id]),[x,y,z]=ids.map(id=>p.uvCorners[fi][m.faces[fi].indexOf(id)]),island=r.faceIslands[fi];
  areas[island]+=b.clone().sub(a).cross(c.clone().sub(a)).length();uvAreas[island]+=Math.abs((y[0]-x[0])*(z[1]-x[1])-(y[1]-x[1])*(z[0]-x[0]));
 }
 g.dispose();areas.forEach((a,i)=>ratios.push(uvAreas[i]/a));for(const v of ratios)assert(Math.abs(v/ratios[0]-1)<1e-9);return r;
}
test('951 connected coplanar patches share exact endpoints, bounds and original island editing; Face atlas remains separate',()=>{
 const m=patch(),o={},before=JSON.stringify(m);assert(project(o,m).changed);const r=check(m,o);assert.equal(r.islandCount,1);assert.equal(r.seamEdges,0);assert.deepEqual(o.glbPassthrough.uvCorners[0][1],o.glbPassthrough.uvCorners[1][0]);assert.equal(JSON.stringify(m),before);assert.equal(project(o,m).changed,false);
 const old=structuredClone(o.glbPassthrough.uvCorners);assert(moveImportedUV(o,m,signature,history,.01,.02,{payload:o.glbPassthrough,island:0}).ok);for(let fi=0;fi<2;fi++)old[fi].forEach((p,j)=>assert.deepEqual(o.glbPassthrough.uvCorners[fi][j],[p[0]+.01,p[1]+.02]));
 assert(createFaceAtlasUV(o,m,signature,history,owner).changed);assert.equal(check(m,o).islandCount,2);
});
test('951 genuine bends, warped polygons, opposite/same-winding overlaps, disconnected positions and ambiguous edges stay separate',()=>{
 const cases=[];
 const bend=patch();bend.vertices[4].z=bend.vertices[5].z=.01;cases.push(bend);
 const warped=patch();warped.vertices[5].z=.01;cases.push(warped);
 cases.push(new EditableMesh([[0,0,0],[1,0,0],[0,1,0]],[[0,1,2],[0,1,2]]));
 cases.push(new EditableMesh([[0,0,0],[1,0,0],[0,1,0]],[[0,1,2],[2,1,0]]));
 cases.push(new EditableMesh([[0,0,0],[1,0,0],[0,1,0],[1,0,0],[1,1,0],[0,1,0]],[[0,1,2],[3,4,5]]));
 cases.push(new EditableMesh([[0,0,0],[1,0,0],[0,1,0],[1,1,0],[.5,-1,0]],[[0,1,2],[1,3,2],[2,1,4]]));
 for(const m of cases){const o={},before=JSON.stringify(m);assert(project(o,m).ok);assert.equal(check(m,o).islandCount,m.faces.length);assert.equal(JSON.stringify(m),before);}
});
test('951 exact supplied extrusion/scale model retains warped-face repair, equal island density and original geometry; planar grouping is scale/translation stable',()=>{
 const m=supplied(),o={},before=JSON.stringify(m);assert(project(o,m).ok);const r=check(m,o);assert(r.islandCount<20);assert(r.islandCount>1);assert.equal(JSON.stringify(m),before);assert.equal(project(o,m).changed,false);
 for(let fi=0;fi<4;fi++)assert.equal(r.faceIslands.filter(id=>id===r.faceIslands[fi]).length,1);
 for(const scale of [.001,1,10000]){const m=patch();m.vertices.forEach(v=>v.multiplyScalar(scale).addScalar(3*scale));const o={};assert(project(o,m).ok);assert.equal(check(m,o).islandCount,1);}
});
test('951 shared atlas guards refuse all paint channels, unsupported owners, over-limit work and failed history before mutation',()=>{
 for(const patch of [{colourPaint:{}},{roughnessPaint:{}},{metalnessPaint:{}},{locked:true},{sourceId:1},{settings:{subd:true}},{glbPassthrough:{source:'glb'}}]){const o={...patch},before=JSON.stringify(o);let captures=0;assert(!project(o,EditableMesh.cube(2),{capture(){captures++;return{};},checkpointSnapshot:()=>true}).ok);assert.equal(captures,0);assert.equal(JSON.stringify(o),before);}
 for(const h of [null,{capture:()=>null,checkpointSnapshot:()=>true},{capture:()=>({}),checkpointSnapshot:()=>false}]){const o={};assert(!project(o,patch(),h).ok);assert.equal(o.glbPassthrough,undefined);}
 const m=patch();m.faces=Array.from({length:129},()=>[...m.faces[0]]);assert.match(project({},m).reason,/128/);assert(!project({},supplied(),history,null).ok);
});
test('951 exact original checkpoint Undo/Redo, painted shared patch and project/GLB transport retain chart membership',async()=>{
 const r=viewportPaintRuntime(),m=patch();r.manager.replaceActiveMesh(m);delete r.target().glbPassthrough;const n=r.h.undoStack.length;
 assert(project(r.target(),r.live,r.c.__boxlabObjectHistory).changed);const atlas=r.target().glbPassthrough;assert.equal(r.h.undoStack.length,n+1);r.manager.replaceActiveMesh(r.h.undo(r.live));assert.equal(r.target().glbPassthrough,undefined);r.manager.replaceActiveMesh(r.h.redo(r.live));assert.equal(r.target().glbPassthrough,atlas);
 r.body.geometry.dispose();r.body.geometry=owner.buildUVPreviewGeometry(r.live,atlas);r.body.updateMatrixWorld(true);await r.painter.open();r.painter.begin({x:450,y:300,width:900,height:600,pressure:1},{radius:8,colour:'#2244ee',opacity:1,hardness:1,pressure:false});r.painter.finish();r.painter.close();assert(r.target().colourPaint);
 const data=encodeBoxlabScene(r.c.__boxlabObjectHistory.capture()),opened=decodeBoxlabScene(JSON.parse(JSON.stringify(data)),(...a)=>new EditableMesh(...a)),o=opened.objects.find(o=>o.id===3);assert.equal(JSON.stringify(o.glbPassthrough),JSON.stringify(atlas));assert.deepEqual(o.colourPaint,r.target().colourPaint);assert.equal(check(o.mesh,o).islandCount,1);
 // Export UVs via original GLB owner; image transport already covered by .950.
 delete o.colourPaint;const glb=await glbOwnerRuntime().build([o]);assert.equal(glb.uvRestoredCount,1);
});
test('951 original UV panel exposes optional coplanar atlas and uses current preview/history/selection guards',()=>{
 const m=supplied(),o={id:7},source=fs.readFileSync(new URL('../src/mesh-health.js',import.meta.url),'utf8');let reports=0,status='';
 const c={active:true,objectId:7,activeObject:()=>o,liveMesh:()=>m,currentMode:()=> 'object',createCoplanarAtlasUV,__boxlabExportAs:{...owner,topologySignature:signature},__boxlabObjectHistory:history,renderReport:()=>reports++,setStatus:s=>status=s};vm.createContext(c);vm.runInContext(source.slice(source.indexOf('function coplanarAtlasUVs('),source.indexOf('uvCoplanarAtlas.addEventListener')),c);
 assert(c.coplanarAtlasUVs());assert.match(status,/Coplanar atlas created/);assert.equal(reports,1);assert(check(m,o).islandCount<20);o.roughnessPaint={};assert(!c.coplanarAtlasUVs());assert.match(status,/Clear paint/);c.objectId=8;assert(!c.coplanarAtlasUVs());assert.equal(reports,2);assert.match(source,/uvCoplanarAtlas.disabled=!nativeReady\|\|hasPaint/);
});
