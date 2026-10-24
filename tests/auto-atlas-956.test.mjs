import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import {EditableMesh} from '../src/mesh.js';
import {meshTopologySignature as signature} from '../src/mesh-topology-signature.js';
import {createCoplanarAtlasUV,createFaceAtlasUV,packImportedUVIslands,equalizeImportedUVDensity} from '../src/imported-uv-edit.js';
import {inspectImportedUV,importedUVIslandBounds} from '../src/imported-uv-inspection.js';
import {viewportPaintRuntime} from './helpers/viewport-paint-runtime.mjs';
import {glbOwnerRuntime} from './helpers/glb-owner-runtime.mjs';
import {encodeBoxlabScene,decodeBoxlabScene} from '../src/boxlab-project-codec.js';
const h={capture:()=>({}),checkpointSnapshot:()=>true},owner=glbOwnerRuntime().c;
function grid(n){const v=[],f=[];for(let y=0;y<=n;y++)for(let x=0;x<=n;x++)v.push([x,y,0]);for(let y=0;y<n;y++)for(let x=0;x<n;x++){const a=y*(n+1)+x;f.push([a,a+1,a+n+2,a+n+1]);}return new EditableMesh(v,f);}
const auto=(o,m,history=h)=>createCoplanarAtlasUV(o,m,signature,history,owner);
const report=(o,m)=>inspectImportedUV(m,o.glbPassthrough,signature);
function check(o,m,n){const r=report(o,m);assert.equal(r.state,'ready');assert.equal(r.islandCount,n);assert.equal(r.mappedFaces,m.faces.length);for(const face of o.glbPassthrough.uvCorners)for(const p of face)assert(p.every(v=>v>=.02-1e-12&&v<=.98+1e-12&&Number.isFinite(v)));return r;}
test('956 4096-face native mesh automatically stitches into one chart in one transaction; raw Face atlas remains available and repack/density support 4096 charts',()=>{
 const m=grid(64),o={},before=JSON.stringify(m);let captures=0;assert(auto(o,m,{capture:()=>({}),checkpointSnapshot:()=>{captures++;return true;}}).changed);check(o,m,1);assert.equal(captures,1);assert.equal(auto(o,m).changed,false);assert.equal(JSON.stringify(m),before);
 const joined=o.glbPassthrough,uv=o.glbPassthrough.uvCorners;assert.deepEqual(uv[0][1],uv[1][0]);assert.deepEqual(uv[0][2],uv[1][3]);assert(createFaceAtlasUV(o,m,signature,h,owner).changed);check(o,m,4096);assert.equal(JSON.stringify(m),before);
 const scope=()=>({payload:o.glbPassthrough,island:null});assert(packImportedUVIslands(o,m,signature,h,scope()).ok);assert(equalizeImportedUVDensity(o,m,signature,h,scope()).ok);check(o,m,4096);
 // Joining saves island gaps/fragmentation; it does not increase texture dimensions.
 const area=corners=>corners.reduce((total,f)=>{let a=0;for(let i=0;i<f.length;i++){const p=f[i],q=f[(i+1)%f.length];a+=p[0]*q[1]-p[1]*q[0];}return total+Math.abs(a)/2;},0);
 assert(area(joined.uvCorners)>area(o.glbPassthrough.uvCorners)*1.4);
});
test('956 large atlas keeps bends/warps/disconnected planes and fixed seed boundaries separate; original warped-triangle fallback remains usable',()=>{
 const m=grid(16);m.vertices[8*17+8].z=.01;const o={},before=JSON.stringify(m);assert(auto(o,m).changed);const r=report(o,m);assert(r.islandCount>1);assert(r.islandCount<10);assert.equal(JSON.stringify(m),before);assert.equal(auto(o,m).changed,false);
 const v=[],f=[];for(let i=0;i<160;i++){const start=v.length,z=i*1e-12;v.push([0,0,z],[1,0,z],[0,1,z]);f.push([start,start+1,start+2]);}const separate=new EditableMesh(v,f),target={};assert(auto(target,separate).ok);check(target,separate,160);
});
test('956 face/corner/work/paint/target/history guards refuse before mutation; actual new 4096-face boundary is enforced',()=>{
 const m=grid(65),o={};let captures=0;assert.match(auto(o,m,{capture(){captures++;return{};},checkpointSnapshot:()=>true}).reason,/4096/);assert.equal(captures,0);assert.equal(o.glbPassthrough,undefined);
 const many=grid(64);many.faces[0]=Array(5000).fill(0);assert.match(auto({},many).reason,/20,000/);
 for(const extra of [{colourPaint:{}},{roughnessPaint:{}},{metalnessPaint:{}},{locked:true},{sourceId:3},{arrayRecipe:{}},{settings:{subd:true}},{glbPassthrough:{source:'glb'}}]){const target={...extra},before=JSON.stringify(target);assert(!auto(target,grid(16),{capture(){throw Error('no checkpoint');}}).ok);assert.equal(JSON.stringify(target),before);}
 for(const history of [null,{capture:()=>null,checkpointSnapshot:()=>true},{capture:()=>({}),checkpointSnapshot:()=>false}]){const target={};assert(!auto(target,grid(16),history).ok);assert.equal(target.glbPassthrough,undefined);}
});
test('956 original native history/UV edit/paint and exact project+GLB transport handle 1024 faces automatically joined',async()=>{
 const r=viewportPaintRuntime();r.manager.replaceActiveMesh(grid(32));delete r.target().glbPassthrough;const n=r.h.undoStack.length;assert(auto(r.target(),r.live,r.c.__boxlabObjectHistory).changed);const result=r.target().glbPassthrough;assert.equal(r.h.undoStack.length,n+1);r.manager.replaceActiveMesh(r.h.undo(r.live));assert.equal(r.target().glbPassthrough,undefined);r.manager.replaceActiveMesh(r.h.redo(r.live));assert.equal(r.target().glbPassthrough,result);check(r.target(),r.live,1);
 const glb=glbOwnerRuntime();r.body.geometry.dispose();r.body.geometry=glb.c.buildUVPreviewGeometry(r.live,result);r.body.updateMatrixWorld(true);await r.painter.open();assert(r.painter.begin({x:500,y:250,width:900,height:600,pressure:1},{radius:8,colour:'#3355dd',opacity:1,hardness:1,pressure:false}));r.painter.finish();r.painter.close();assert(r.target().colourPaint);
 const opened=decodeBoxlabScene(JSON.parse(JSON.stringify(encodeBoxlabScene(r.c.__boxlabObjectHistory.capture()))),(...a)=>new EditableMesh(...a)),o=opened.objects.find(o=>o.id===3);assert.equal(JSON.stringify(o.glbPassthrough),JSON.stringify(result));assert.deepEqual(o.colourPaint,r.target().colourPaint);delete o.colourPaint;const built=await glb.build([o]);assert.equal(built.uvRestoredCount,1);const imported=await glb.import(built.buffer);assert.equal(report(imported[0],imported[0].mesh).islandCount,1);
});
test('956 existing automatic atlas action is primary, labelled Auto atlas and delegates original grouping/history; explicit per-face action retained',()=>{
 const source=fs.readFileSync(new URL('../src/mesh-health.js',import.meta.url),'utf8'),m=grid(16),o={id:7};let status='';const c={active:true,objectId:7,activeObject:()=>o,liveMesh:()=>m,currentMode:()=> 'object',uvAtlasAngle:{value:'15'},createCoplanarAtlasUV,__boxlabExportAs:{...owner,topologySignature:signature},__boxlabObjectHistory:h,renderReport(){},setStatus:s=>status=s};vm.createContext(c);vm.runInContext(source.slice(source.indexOf('function coplanarAtlasUVs('),source.indexOf('uvCoplanarAtlas.addEventListener')),c);assert(c.coplanarAtlasUVs());check(o,m,1);assert.match(status,/atlas created/);assert(source.indexOf('id="meshHealthUVCoplanarAtlas"')<source.indexOf('id="meshHealthUVFaceAtlas"'));assert.match(source,/>Auto atlas<\/button>/);assert.match(source,/up to 4096 faces/);assert.match(source,/20,000 corners maximum/);
});
test('956 actual project Save uses the user filename unchanged on repeated downloads; no app-side numbering or promised filesystem overwrite',()=>{
 const r=viewportPaintRuntime(),source=fs.readFileSync(new URL('../src/object-management.js',import.meta.url),'utf8'),names=[],originalQuery=r.c.document.querySelector.bind(r.c.document);Object.assign(r.c,{Blob,URL:{createObjectURL:()=> 'blob:test',revokeObjectURL(){}},manager:()=>r.manager,encodeBoxlabScene,decodeBoxlabScene});r.c.document.querySelector=q=>q==='#exportFileName'?{value:'My Work v2'}:originalQuery(q);r.c.document.createElement=()=>({click(){names.push(this.download);},remove(){}});r.c.document.body={appendChild(){}};vm.runInContext(source.slice(source.indexOf('function projectFileName('),source.indexOf('async function openBasicProject(')),r.c);const out={};r.c.exportBasicProject({},out);r.c.exportBasicProject({},out);assert.deepEqual(names,['My Work v2.boxlab','My Work v2.boxlab']);assert.match(out.textContent,/download requested/);
});
test('956 join angle groups shallow bends and keeps sharp edges; fixed seed cone prevents accumulated angle drift on long strips; invalid angle is atomic',()=>{
 function strip(angles){const v=[[0,0,0],[0,1,0]],f=[];let x=0,z=0;for(const a of angles){const t=a*Math.PI/180;x+=Math.cos(t);z+=Math.sin(t);v.push([x,0,z],[x,1,z]);const i=f.length*2;f.push([i,i+2,i+3,i+1]);}return new EditableMesh(v,f);}
 for(const [angle,count] of [[0,2],[5,2],[15,1]]){const m=strip([0,10]),o={};assert(createCoplanarAtlasUV(o,m,signature,h,owner,angle).ok);check(o,m,count);}
 const sharp=strip([0,35]),s={};assert(createCoplanarAtlasUV(s,sharp,signature,h,owner,30).ok);check(s,sharp,2);
 const drift=strip([0,10,20,30]),d={};assert(createCoplanarAtlasUV(d,drift,signature,h,owner,15).ok);assert.deepEqual(report(d,drift).faceIslands,[0,0,1,1]);
 const long=strip(Array.from({length:256},(_,i)=>(i%4)*10)),l={},before=JSON.stringify(long);assert(createCoplanarAtlasUV(l,long,signature,h,owner,15).ok);check(l,long,128);assert.equal(JSON.stringify(long),before);
 for(const angle of [-1,31,NaN,Infinity,'15']){let captured=0;const old=l.glbPassthrough;assert(!createCoplanarAtlasUV(l,long,signature,{capture(){captured++;return{};}},owner,angle).ok);assert.equal(captured,0);assert.equal(l.glbPassthrough,old);}
});
