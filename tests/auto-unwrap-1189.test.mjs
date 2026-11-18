import test from 'node:test';import assert from 'node:assert/strict';import fs from 'node:fs';import crypto from 'node:crypto';import * as THREE from 'three';
import * as backend from '../src/uv-vendor/watlas.js';import {prepareAutoUnwrapMesh,runAutoUnwrap,validateAutoUnwrapResult,autoUnwrapSeams,guidedUnwrapSeams} from '../src/auto-unwrap-core.js';import {startAutoUnwrapJob} from '../src/auto-unwrap-job.js';import {installAutoUnwrapWorkflow} from '../src/auto-unwrap-workflow.js';
import {EditableMesh} from '../src/mesh.js';import {makeSphere,makeTorus,makeCylinder} from '../src/primitive-factory.js';import {glbOwnerRuntime} from './helpers/glb-owner-runtime.mjs';import {commitAutoUnwrapUV,autoUnwrapTargetError} from '../src/imported-uv-edit.js';import {inspectImportedUV} from '../src/imported-uv-inspection.js';import {encodeBoxlabScene,decodeBoxlabScene} from '../src/boxlab-project-codec.js';import {buildNomadProject,readNomadProject} from '../src/nomad-export-core.js';
const wasm=Buffer.from(fs.readFileSync(new URL('../src/uv-vendor/watlas.wasm.base64',import.meta.url),'utf8'),'base64');await backend.Initialize({wasmBinary:wasm});const owner=glbOwnerRuntime().c,signature=owner.topologySignature;
const ring=()=>new EditableMesh([[-2,-2,0],[2,-2,0],[2,2,0],[-2,2,0],[-1,-1,0],[1,-1,0],[1,1,0],[-1,1,0]],[[0,1,5,4],[1,2,6,5],[2,3,7,6],[3,0,4,7]]);
const concave=()=>new EditableMesh([[0,0,0],[2,0,0],[2,2,0],[1,1,0],[0,2,0]],[[0,1,2,3,4]]);
const strip=()=>new EditableMesh([[0,0,0],[1,0,0],[2,0,.3],[3,0,.7],[0,1,0],[1,1,0],[2,1,.3],[3,1,.7]],[[0,1,5,4],[1,2,6,5],[2,3,7,6]]);
for(const [name,make] of [['cube',()=>EditableMesh.cube()],['ring',ring],['concave ngon',concave],['curved strip',strip],['sphere',()=>makeSphere(1,12,6)],['torus',()=>makeTorus(.7,.2,12,6)],['cylinder',()=>makeCylinder(1,2,12)]])test(`1189 actual WASM ${name} unwrap preserves original polygons and complete corner UVs`,async()=>{
 const mesh=make();mesh.faceGroups=mesh.faces.map(()=> 'One group');const source=JSON.stringify(mesh),input=prepareAutoUnwrapMesh(mesh,owner),result=await runAutoUnwrap(input,backend);assert(validateAutoUnwrapResult(input,result));assert.equal(JSON.stringify(mesh),source);assert.deepEqual(result.uvCorners.map(f=>f.length),mesh.faces.map(f=>f.length));assert(result.chartCount>=1);if(name==='sphere')assert(result.chartCount<mesh.faces.length/2);if(name==='ring')assert.equal(result.chartCount,1);assert(autoUnwrapSeams(mesh,result.uvCorners).length>0);
});
test('1189 real UV commit one checkpoint, Save/Open and NOM/GLB UV export preserve corner correspondence',async()=>{
 const mesh=EditableMesh.cube(),source=JSON.stringify(mesh),o={id:1,name:'Auto cube',mesh,settings:{}},r=await runAutoUnwrap(prepareAutoUnwrapMesh(mesh,owner),backend);let n=0,prior;const history={capture:()=>{prior=o.glbPassthrough;return{};},checkpointSnapshot:()=>{n++;return true;}};assert(commitAutoUnwrapUV(o,mesh,signature,history,r).ok);assert.equal(n,1);assert.equal(prior,undefined);assert.equal(JSON.stringify(mesh),source);assert.equal(inspectImportedUV(mesh,o.glbPassthrough,signature).state,'ready');assert.equal(commitAutoUnwrapUV(o,mesh,signature,history,r).changed,false);assert.equal(n,1);
 const restored=decodeBoxlabScene(encodeBoxlabScene({objects:[o]}),(...a)=>new EditableMesh(...a)).objects[0];assert.deepEqual(restored.glbPassthrough.uvCorners,r.uvCorners);const nom=buildNomadProject([restored],fs.readFileSync(new URL('../src/templates/nomad-tube.nom',import.meta.url)),{topologySignature:signature});assert.equal(nom.uvObjects,1);assert.equal(readNomadProject(nom.bytes).json.meshes[0].count_face,6);const glb=await glbOwnerRuntime().build([restored]);assert(glb.verification.pass);o.glbPassthrough=prior;assert.equal(o.glbPassthrough,undefined);
});
test('1189 invalid geometry, overlap and unsafe painted targets refuse without mutation',()=>{
 const m=EditableMesh.cube();m.faces[0].reverse();assert.throws(()=>prepareAutoUnwrapMesh(m,owner),/winding/);const input=prepareAutoUnwrapMesh(concave(),owner);assert.throws(()=>validateAutoUnwrapResult(input,{uvCorners:[[[0,0],[1,0],[0,1],[1,1],[0,0]]]}),/fold|collapse|overlap/);for(const patch of [{locked:true},{colourPaint:{}},{glbPassthrough:{version:1,source:'glb'}},{settings:{mirror:{x:true}}},{glbPassthrough:{version:1,source:'boxlab',images:[{retained:true}]}}])assert(autoUnwrapTargetError({settings:{},...patch},EditableMesh.cube(),signature));
 const two=new EditableMesh([[0,0,0],[1,0,0],[0,1,0],[0,0,1],[1,0,1],[0,1,1]],[[0,1,2],[3,4,5]]),p=prepareAutoUnwrapMesh(two,owner);assert.throws(()=>validateAutoUnwrapResult(p,{uvCorners:[[[0,0],[1,0],[0,1]],[[0,0],[1,0],[0,1]]]}),/overlapping/);
});
test('1189 worker cancellation/timeout terminate native work and ignore late results',async()=>{
 const instances=[];class FakeWorker{constructor(){instances.push(this);}postMessage(){}terminate(){this.terminated=true;}}
 const j=startAutoUnwrapJob({}, {WorkerClass:FakeWorker});j.cancel();await assert.rejects(j.promise,/cancelled/);assert(instances[0].terminated);instances[0].onmessage({data:{result:{bad:true}}});const timed=startAutoUnwrapJob({}, {WorkerClass:FakeWorker,timeoutMs:5});await assert.rejects(timed.promise,/45 seconds/);assert(instances[1].terminated);
});
function workflow(){
 const mesh=EditableMesh.cube(),object={id:1,mesh,settings:{}},scene=new THREE.Scene(),body=new THREE.Group();scene.add(body);const nodes=new Map(),row={querySelector:s=>nodes.get(s.match(/"([^"]+)"/)[1]),set innerHTML(html){for(const [,id]of html.matchAll(/data-autouv="([^"]+)"/g))nodes.set(id,{hidden:false,disabled:false,addEventListener(){}});}},notice={},frames=new Map();let id=0,resolveJob,cancelled=false,checkpoints=0,commits=0,live=true;const context={object,mesh,scene,body,owner,history:{capture:()=>({}),checkpointSnapshot:()=>{checkpoints++;return true;}}};const api=installAutoUnwrapWorkflow({document:{createElement:()=>row},host:{prepend(){}},notice,getContext:()=>live?context:null,onCommit:()=>commits++,say(){},startJob:()=>({promise:new Promise(r=>resolveJob=r),cancel(){cancelled=true;}}),requestFrame:f=>{frames.set(++id,f);return id;},cancelFrame:i=>frames.delete(i)});
 return {api,object,mesh,scene,nodes,notice,frames,resolve:r=>resolveJob(r),flush(){const jobs=[...frames.values()];frames.clear();jobs.forEach(f=>f());},setLive:v=>live=v,get cancelled(){return cancelled;},get checkpoints(){return checkpoints;},get commits(){return commits;}};
}
test('1189 preview is private; Apply commits once and cleanup removes checker/seam geometry',async()=>{
 const f=workflow(),before=JSON.stringify(f.object),r=await runAutoUnwrap(prepareAutoUnwrapMesh(f.mesh,owner),backend),p=f.api.preview();f.resolve(r);assert(await p);assert.equal(JSON.stringify(f.object),before);assert.equal(f.checkpoints,0);assert(f.scene.children.length>1);assert(f.api.apply());assert.equal(f.checkpoints,1);assert.equal(f.commits,1);assert.equal(f.scene.children.length,1);assert.equal(f.frames.size,0);
});
test('1189 Cancel, changed mesh and changed UV payload cannot publish a late worker result',async()=>{
 for(const kind of ['cancel','mesh','payload','inplace','settings','context']){const f=workflow(),r=await runAutoUnwrap(prepareAutoUnwrapMesh(f.mesh,owner),backend),p=(kind==='inplace'?(f.object.glbPassthrough={version:1,source:'boxlab',uvTopologySignature:signature(f.mesh),uvCorners:f.mesh.faces.map(face=>face.map(()=>[0,0]))},f.api.preview()):f.api.preview());if(kind==='cancel')f.api.cancel();if(kind==='mesh')f.mesh.vertices[0].x+=.1;if(kind==='payload')f.object.glbPassthrough={kept:true};if(kind==='inplace')f.object.glbPassthrough.uvCorners[0][0][0]=.4;if(kind==='settings')f.object.settings.mirror={x:true};if(kind==='context')f.setLive(false);f.flush();f.resolve(r);assert.equal(await p,false);assert.equal(f.checkpoints,0);assert.equal(f.scene.children.length,1);assert.equal(f.frames.size,0);}
});
test('1189 pinned WASM bytes match provenance and do not require external CDN assets',()=>{const provenance=fs.readFileSync(new URL('../src/uv-vendor/UPSTREAM.txt',import.meta.url),'utf8');assert(provenance.includes(crypto.createHash('sha256').update(wasm).digest('hex')));});

for(const guided of [false,true])test(`1192 ${guided?'guided':'auto'}-unwrapped cube paints at1024 through original Paint UI and survives native map export`,async()=>{
 const {viewportPaintRuntime,viewportPaintUIRuntime}=await import('./helpers/viewport-paint-runtime.mjs'),{buildNomadProjectWithMaps}=await import('../src/nomad-packed-maps.js'),r=viewportPaintRuntime(),m=EditableMesh.cube();if(guided)m.faceGroups.fill("Body");r.manager.replaceActiveMesh(m);const candidate=await runAutoUnwrap(prepareAutoUnwrapMesh(m,r.owner,{guided}),backend);assert(commitAutoUnwrapUV(r.target(),m,r.owner.topologySignature,r.c.__boxlabObjectHistory,candidate).ok);r.body.geometry.dispose();r.body.geometry=r.owner.buildUVPreviewGeometry(m,r.target().glbPassthrough);const u=viewportPaintUIRuntime(r);await u.api.open();assert(u.api.active);u.nodes.get('paint-pressure').checked=false;u.emit('pointerdown');u.emit('pointerup');const paint=r.target().colourPaint;assert(paint?.pixels.some(v=>v!==255));assert.equal(paint.width,1024);u.api.close();const nom=await buildNomadProjectWithMaps([r.target()],fs.readFileSync(new URL('../src/templates/nomad-tube.nom',import.meta.url)),{topologySignature:r.owner.topologySignature});assert.equal(nom.uvObjects,1);assert.equal(nom.colourTextureObjects,1);
});

test('1189 thin corner-relieved recessed solid unwraps without dropping small original triangles',async()=>{const {closedGrid}=await import('./helpers/through-validation-profile.mjs'),{buildNegativeExtrude}=await import('../src/through-kernel.js');const cut=buildNegativeExtrude(closedGrid(4,EditableMesh),[21,16],-.1);assert(cut.ok);const before=JSON.stringify(cut.mesh),input=prepareAutoUnwrapMesh(cut.mesh,owner),result=await runAutoUnwrap(input,backend);assert(validateAutoUnwrapResult(input,result));assert.equal(JSON.stringify(cut.mesh),before);assert.equal(result.uvCorners.length,cut.mesh.faces.length);});

test('1192 guided WASM splits coplanar groups and preserves a holed or closed group',async()=>{
 const planar=strip();
 for(const vertex of planar.vertices)vertex.z=0;
 assert.equal((await runAutoUnwrap(prepareAutoUnwrapMesh(planar,owner),backend)).chartCount,1);
 for(const [mesh,groups,expect] of [
  [planar,['A','B','B'],[1,2]],
  [ring(),['Ring','Ring','Ring','Ring'],[0,1]],
  [EditableMesh.cube(),Array(6).fill('Body'),[0,1]],
 ]){
  mesh.faceGroups=groups;
  const before=JSON.stringify(mesh);
  const input=prepareAutoUnwrapMesh(mesh,owner,{guided:true});
  const layout=await runAutoUnwrap(input,backend);
  assert.equal(input.borders.length,expect[0]);
  const payload={version:1,source:'boxlab',uvTopologySignature:signature(mesh),uvCorners:layout.uvCorners};
  assert.equal(inspectImportedUV(mesh,payload,signature).islandCount,expect[1]);
  if(mesh.faces.length===6)assert.equal(autoUnwrapSeams(mesh,layout.uvCorners).length,7);
  assert.equal(layout.chartCount,expect[1]);
  assert.doesNotThrow(()=>guidedUnwrapSeams(mesh,layout.uvCorners,input.borders));
  assert.equal(JSON.stringify(mesh),before);
 }
});

test('1191 guided assigns distinct region IDs to disconnected faces with the same label',async()=>{
 const mesh=new EditableMesh([[0,0,0],[1,0,0],[0,1,0],[1,0,0],[1,1,0],[0,1,0]],[[0,1,2],[3,4,5]]);
 assert.throws(()=>prepareAutoUnwrapMesh(mesh,owner,{guided:true}),/Assign at least one Facegroup/);
 mesh.faceGroups=['Same','Same'];
 const input=prepareAutoUnwrapMesh(mesh,owner,{guided:true});
 assert.deepEqual(input.regions,[0,1]);
 assert.equal((await runAutoUnwrap(input,backend)).chartCount,2);
});

test('1191 guided preview draws distinct group borders and invalidates on Facegroup changes',async()=>{
 const f=workflow();
 f.mesh.faceGroups=['A','B','B','B','B','B'];
 const result=await runAutoUnwrap(prepareAutoUnwrapMesh(f.mesh,owner,{guided:true}),backend);
 const p=f.api.previewGuided();
 f.resolve(result);
 assert(await p);
 assert(f.scene.children.some(node=>node.material?.color?.getHex()===0x47d8ff));
 assert(f.scene.children.some(node=>node.material?.color?.getHex()===0xffb23e));
 assert.match(f.notice.textContent,/cyan group borders/);
 f.mesh.faceGroups[0]='Changed';
 assert.equal(f.api.apply(),false);
 assert.equal(f.checkpoints,0);
 assert.equal(f.scene.children.length,1);
});

test('1192 six multi-face regions retain one packed island each and preserve seam boundaries',async()=>{
 const cube=EditableMesh.cube();
 // Three edge-connected faces on each of two regions per cube.
 const mesh=new EditableMesh(
  Array.from({length:3},(_,copy)=>cube.vertices.map(v=>[v.x+copy*4,v.y,v.z])).flat(),
  Array.from({length:3},(_,copy)=>cube.faces.map(face=>face.map(i=>i+copy*8))).flat(),
  null,Array.from({length:18},(_,face)=>`Panel ${Math.floor(face/3)+1}`));
 const input=prepareAutoUnwrapMesh(mesh,owner,{guided:true});
 const result=await runAutoUnwrap(input,backend);
 assert.deepEqual(result.regionCounts,[1,1,1,1,1,1]);
 assert.equal(result.chartCount,6);
 assert(input.borders.length>0);
 assert.doesNotThrow(()=>guidedUnwrapSeams(mesh,result.uvCorners,input.borders));
 const payload={version:1,source:'boxlab',uvTopologySignature:signature(mesh),uvCorners:result.uvCorners};
 assert.equal(inspectImportedUV(mesh,payload,signature).islandCount,6);
});

test('1192 guided warped polygons fall back to validated charting',async()=>{
 const mesh=new EditableMesh([[0,0,0],[1,0,0],[1,1,.05],[0,1,0]],[[0,1,2,3]],null,['Panel']);
 const input=prepareAutoUnwrapMesh(mesh,owner,{guided:true});
 assert(validateAutoUnwrapResult(input,await runAutoUnwrap(input,backend)));
});

test('1193 explicit cylinder slit, torus loop and planar ring cut survive atlas welding',async()=>{
 const cylinder=makeCylinder(1,2,12,2);
 cylinder.faceGroups=cylinder.faces.map((_,i)=>i<24?'Wall':'Cap');
 const torus=makeTorus(.7,.2,12,6);
 for(const [mesh,markedEdges,guided] of [
  [cylinder,[[0,12],[12,24]],true],
  [torus,Array.from({length:6},(_,i)=>[i,(i+1)%6]),false],
  [ring(),[[0,4]],false],
 ]){
  const before=JSON.stringify(mesh);
  const input=prepareAutoUnwrapMesh(mesh,owner,{guided,markedEdges});
  const result=await runAutoUnwrap(input,backend);
  const edgeKey=pair=>[...pair].sort((a,b)=>a-b).join(':');
  const seams=new Set(autoUnwrapSeams(mesh,result.uvCorners).map(edgeKey));
  for(const edge of markedEdges)assert(seams.has(edgeKey(edge)));
  if(guided)assert.doesNotThrow(()=>guidedUnwrapSeams(mesh,result.uvCorners,input.borders));
  assert.equal(JSON.stringify(mesh),before);
 }
});

test('1194 packing reserves pixel gutters at 1024 and 2048 and reports finite layout quality',async()=>{
 const mesh=new EditableMesh(
  [[0,0,0],[4,0,0],[4,1,0],[0,1,0],[6,0,0],[10,0,0],[10,1,0],[6,1,0]],
  [[0,1,2,3],[4,5,6,7]]);
 for(const [mapSize,gutter,rotate] of [[1024,16,false],[2048,8,true]]){
  const input=prepareAutoUnwrapMesh(mesh,owner);
  input.packing={mapSize,gutter,rotate};
  const calls=[];
  const Atlas=class extends backend.Atlas {
   packCharts(options){calls.push({...options});return super.packCharts(options);}
  };
  const result=await runAutoUnwrap(input,{Initialize:backend.Initialize,Atlas});
  assert.equal(result.chartCount,2);
  assert(calls.every(c=>c.rotateCharts===rotate&&c.rotateChartsToAxis===rotate));
  const bounds=result.uvCorners.map(face=>[0,1].map(axis=>{
   const values=face.map(uv=>uv[axis]*mapSize);
   return [Math.min(...values),Math.max(...values)];
  }));
  for(const box of bounds)for(const [min,max] of box){
   assert(min>=gutter-1e-6);
   assert(max<=mapSize-gutter+1e-6);
  }
  const gaps=bounds[0].map(([lo,hi],i)=>Math.max(0,lo-bounds[1][i][1],bounds[1][i][0]-hi));
  assert(Math.hypot(...gaps)>=2*gutter-1e-6);
  assert(result.quality.coverage>0&&result.quality.coverage<1);
  assert(result.quality.texelsPerUnit>0);
  assert(result.quality.maxStretch>=1&&result.quality.maxStretch<1.02);
 }
});
