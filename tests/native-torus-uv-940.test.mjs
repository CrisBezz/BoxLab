import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import * as THREE from 'three';
import {makeTorus,makePrimitive} from '../src/primitive-factory.js';
import {fitAddObjectToUnitCube} from '../src/add-object-fit.js';
import {meshTopologySignature as signature} from '../src/mesh-topology-signature.js';
import {createTorusUV,createBoxUV,moveImportedUV} from '../src/imported-uv-edit.js';
import {inspectImportedUV} from '../src/imported-uv-inspection.js';
import {encodeBoxlabScene,decodeBoxlabScene} from '../src/boxlab-project-codec.js';
import {EditableMesh} from '../src/mesh.js';
import {buildNomadProjectWithMaps} from '../src/nomad-packed-maps.js';
import {readNomadProject} from '../src/nomad-export-core.js';
import {inspectPNG} from './helpers/png-inspect.mjs';
import {glbOwnerRuntime} from './helpers/glb-owner-runtime.mjs';
import {editableBooleanRuntime} from './helpers/editable-boolean-runtime.mjs';
import {addObjectRuntime} from './helpers/add-object-runtime.mjs';
import {viewportPaintRuntime,viewportPaintUIRuntime} from './helpers/viewport-paint-runtime.mjs';
const plain=()=>({settings:{mirror:{x:false,y:false,z:false},subd:false}});
const project=(o,m,h)=>createTorusUV(o,m,signature,h);
const noHistory={capture:()=>({}),checkpointSnapshot:()=>true};
const shape=(x=12,y=6)=>fitAddObjectToUnitCube(makeTorus(.72,.28,x,y));
function fixture(){const r=editableBooleanRuntime();r.manager.activate(3);r.manager.replaceActiveMesh(shape());return {...r,object:r.manager.objects.find(o=>o.id===3),history:r.c.__boxlabObjectHistory};}
test('940 Torus UVs cover every original quad once, split both seams, form one island and preserve source geometry at odd/dense counts',()=>{
 for(const x of [3,4,5,7,12,32])for(const y of [3,4,5,7,12,32]){
  const mesh=shape(x,y),before=JSON.stringify(mesh),o=plain();assert(project(o,mesh,noHistory).ok,`${x}/${y}`);const p=o.glbPassthrough,report=inspectImportedUV(mesh,p,signature);assert.equal(report.state,'ready');assert.equal(report.islandCount,1);assert.equal(report.seamEdges,x+y);assert.equal(report.missingFaces,0);assert.equal(JSON.stringify(mesh),before);
  const variants=new Set(p.uvCorners.flat().map(v=>v.join(',')));assert.equal(variants.size,(x+1)*(y+1));let area=0;
  for(const face of p.uvCorners){assert(face.flat().every(n=>Number.isFinite(n)&&n>=.02-1e-12&&n<=.98+1e-12));const us=face.map(p=>p[0]),vs=face.map(p=>p[1]),a=(Math.max(...us)-Math.min(...us))*(Math.max(...vs)-Math.min(...vs));assert(Math.abs(a-.96*.96/x/y)<1e-12);area+=a;}
  assert(Math.abs(area-.96*.96)<1e-12);assert.deepEqual(project(o,mesh,null),{ok:true,changed:false});
 }
});
test('940 Y-rotated/translated, scaled and renumbered regular torus grids retain complete mapping; no vertex-order dependency',()=>{
 for(const scale of [1e-150,1,1e150]){const m=shape(7,5);m.vertices.forEach(p=>p.applyAxisAngle(new THREE.Vector3(0,1,0),.37).add(new THREE.Vector3(3,-2,4)).multiplyScalar(scale));const order=m.vertices.map((_,i)=>m.vertices.length-1-i),inverse=new Map(order.map((old,i)=>[old,i])),mesh=new EditableMesh(order.map(i=>m.vertices[i]),m.faces.slice().reverse().map(face=>face.map(id=>inverse.get(id))));const before=JSON.stringify(mesh),o=plain();assert(project(o,mesh,noHistory).ok);assert.equal(inspectImportedUV(mesh,o.glbPassthrough,signature).islandCount,1);assert.equal(JSON.stringify(mesh),before);}
});
test('940 malformed/deformed/non-torus and unsupported owners refuse without metadata or checkpoints',()=>{
 const mutations=[m=>m.vertices.forEach(p=>p.x*=1.2),m=>m.vertices.forEach(p=>p.applyAxisAngle(new THREE.Vector3(1,0,0),.3)),m=>m.vertices[0].y+=.03,m=>m.faces.pop(),m=>m.faces[0]=m.faces[1].slice(),m=>m.vertices.push(new THREE.Vector3()),m=>{const f=m.faces[0];m.faces[0]=[f[0],f[2],f[1],f[3]];},m=>m.vertices[0].x=NaN,m=>m.faces[0][0]=99999];
 for(const mutate of mutations){const m=shape(),o=plain();assert(createBoxUV(o,m,signature,noHistory).ok);const old=o.glbPassthrough;mutate(m);let checkpoints=0;assert.equal(project(o,m,{capture:()=>({}),checkpointSnapshot(){checkpoints++;return true;}}).ok,false);assert.equal(o.glbPassthrough,old);assert.equal(checkpoints,0);}
 for(const type of ['cube','sphere','cylinder','cone'])assert.equal(project(plain(),makePrimitive(type),noHistory).ok,false);
 for(const patch of [{locked:true},{kind:'reference'},{sourceId:1},{booleanRecipe:{}},{arrayRecipe:{}},{curveProfile:{}},{materials:[]},{textures:[]},{settings:{subd:true}},{settings:{mirror:{x:true}}},{glbPassthrough:{version:1,source:'glb'}}]){const o={...plain(),...patch},before=o.glbPassthrough;assert.equal(project(o,shape(),noHistory).ok,false);assert.equal(o.glbPassthrough,before);}
 for(const history of [null,{capture:()=>null,checkpointSnapshot:()=>true},{capture:()=>({}),checkpointSnapshot:()=>false}]){const o=plain();assert.equal(project(o,shape(),history).ok,false);assert.equal(o.glbPassthrough,undefined);}
});
test('940 real scene projection is one checkpoint/no-op, copy-on-write, Undo/Redo and existing island edits retain original owners',()=>{
 const r=fixture(),n=r.h.undoStack.length;assert(project(r.object,r.live,r.history).ok);const resource=r.object.glbPassthrough;assert.equal(r.h.undoStack.length,n+1);assert(!project(r.object,r.live,r.history).changed);assert.equal(r.h.undoStack.length,n+1);
 r.manager.replaceActiveMesh(r.h.undo(r.live));assert.equal(r.manager.objects.find(o=>o.id===3).glbPassthrough,undefined);r.manager.replaceActiveMesh(r.h.redo(r.live));assert.equal(r.manager.objects.find(o=>o.id===3).glbPassthrough,resource);
 const peer=r.manager.addMesh(r.live,'Peer',{glbPassthrough:resource,enterObjectMode:false});r.manager.activate(3);const o=r.manager.objects.find(o=>o.id===3);assert(moveImportedUV(o,r.live,signature,r.history,.01,0,{island:0,payload:resource}).ok);assert.equal(peer.glbPassthrough,resource);assert.notEqual(o.glbPassthrough,resource);r.manager.replaceActiveMesh(r.h.undo(r.live));assert.equal(r.manager.objects.find(o=>o.id===3).glbPassthrough,resource);
});
test('940 UV Tools Torus action uses existing context/history, and Add keeps checked/unchecked one-step creation',()=>{
 const r=fixture(),source=fs.readFileSync(new URL('../src/mesh-health.js',import.meta.url),'utf8');let renders=0;const c={active:true,objectId:3,currentMode:()=> 'object',activeObject:()=>r.object,liveMesh:()=>r.live,createTorusUV,__boxlabExportAs:{topologySignature:signature},__boxlabObjectHistory:r.history,renderReport(){renders++;},setStatus(){}};vm.createContext(c);vm.runInContext(source.slice(source.indexOf('function torusUVs('),source.indexOf('uvTorus.addEventListener')),c);assert(c.torusUVs());assert.equal(renders,1);c.objectId=1;assert.equal(c.torusUVs(),false);assert.equal(renders,1);assert.match(source,/id="meshHealthUVTorus"/);assert.match(source,/uvTorus\.disabled=!nativeReady/);
 for(const uv of [true,false]){const a=addObjectRuntime(),before=a.snapshot();a.open('Torus');const checkbox=a.find(n=>n.dataset.addSetting==='uv');assert(checkbox.checked);checkbox.checked=uv;checkbox.dispatchEvent({type:'change'});a.input('x',7);a.input('y',5);a.action('apply').click();const o=a.manager.objects.at(-1);assert.equal(!!o.glbPassthrough,uv);assert.equal(o.mesh.faces.length,35);assert.equal(a.history.undoStack.length,1);const after=a.snapshot();a.undo();assert.deepEqual(a.snapshot(),before);a.redo();assert.deepEqual(a.snapshot(),after);}
});
test('940 automatically mapped Torus paints immediately at1024 and retains exact pixels through Paint history, Save/Open and native PNG',async()=>{
 const add=addObjectRuntime();add.open('Torus');add.action('apply').click();const torus=add.manager.objects.at(-1),r=viewportPaintRuntime();r.manager.replaceActiveMesh(torus.mesh);r.target().glbPassthrough=torus.glbPassthrough;r.body.geometry.dispose();r.body.geometry=r.owner.buildUVPreviewGeometry(torus.mesh,torus.glbPassthrough);const u=viewportPaintUIRuntime(r);await u.api.open();assert(u.api.active);u.nodes.get('paint-pressure').checked=false;u.emit('pointerdown');u.emit('pointerup');const paint=r.target().colourPaint;assert(paint?.pixels.some(v=>v!==255));assert.equal(paint.width,1024);
 const wait=async()=>{for(let i=0;i<500&&!u.api.active;i++)await new Promise(r=>setTimeout(r,5));assert(u.api.active);};let reopen=u.api.beforeHistory();assert(r.h.undo(r.live));reopen();await wait();assert.equal(r.target().colourPaint,undefined);reopen=u.api.beforeHistory();assert(r.h.redo(r.live));reopen();await wait();assert.equal(r.target().colourPaint,paint);u.api.close();
 const loaded=decodeBoxlabScene(JSON.parse(JSON.stringify(encodeBoxlabScene(r.c.__boxlabObjectHistory.capture()))),(...a)=>new EditableMesh(...a)),o=loaded.objects.find(o=>o.id===3);assert.deepEqual(o.colourPaint,paint);assert.deepEqual(o.glbPassthrough,torus.glbPassthrough);
 const result=await buildNomadProjectWithMaps([o],fs.readFileSync(new URL('../src/templates/nomad-tube.nom',import.meta.url)),{topologySignature:r.owner.topologySignature}),nom=readNomadProject(result.bytes),m=nom.json.materials[nom.json.meshes[0].material],image=nom.json.images[m.textures.color.index];assert.deepEqual(inspectPNG(nom.bin.slice(image.offset,image.offset+image.length)).rgba,paint.pixels);
});
