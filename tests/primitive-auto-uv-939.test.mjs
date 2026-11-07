import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import {EditableMesh} from '../src/mesh.js';
import {History} from '../src/history.js';
import {makePrimitive} from '../src/primitive-factory.js';
import {fitAddObjectToUnitCube} from '../src/add-object-fit.js';
import {meshTopologySignature} from '../src/mesh-topology-signature.js';
import {createNativeUVCandidate,createBoxUV,createPlanarUV,createCylinderUV,createSphereUV,createTorusUV} from '../src/imported-uv-edit.js';
import {inspectImportedUV} from '../src/imported-uv-inspection.js';
import {encodeBoxlabScene,decodeBoxlabScene} from '../src/boxlab-project-codec.js';
import {buildNomadProject,readNomadProject} from '../src/nomad-export-core.js';
import {addObjectRuntime} from './helpers/add-object-runtime.mjs';
import {glbOwnerRuntime} from './helpers/glb-owner-runtime.mjs';
import {viewportPaintRuntime,viewportPaintUIRuntime} from './helpers/viewport-paint-runtime.mjs';
const mappings={cube:'box',plane:'xz',cylinder:'cylinder',cone:'cylinder',sphere:'sphere',torus:'torus'};
const read=p=>fs.readFileSync(new URL('../src/'+p,import.meta.url),'utf8');
const toggle=(r,value)=>{const n=r.find(n=>n.dataset.addSetting==='uv');assert(n);n.checked=value;n.dispatchEvent({type:'change'});};
function startRuntime(){
 const source=read('multi-object.js'),h=new History(),live=EditableMesh.cube(1),settings={mirror:{x:false,y:false,z:false},subd:false,subdLevel:1,cage:true};
 const c={Map,Set,Array,EditableMesh,createNativeUVCandidate,live,h,initialized:false,nextId:1,activeId:null,objects:[],soloId:null,linkedSources:new Map(),state:()=>({mesh:live}),history:()=>h,captureSettings:()=>settings,captureHistory:()=>({undo:[],redo:[]}),restoreSettings(){},forceRender(){},renderOutliner(){}};vm.createContext(c);
 vm.runInContext(source.slice(source.indexOf('function cloneLooseValue('),source.indexOf('function captureSettings()'))+source.slice(source.indexOf('function cloneSettings('),source.indexOf('function restoreSettings(')),c);
 // Execute the real startup construction before render/DOM installation; reset is
 // complete original owner. No replacement geometry or UV generator in this fixture.
 const a=source.indexOf('function initialize()'),b=source.indexOf('  installRenderObserver();',a);
 vm.runInContext(source.slice(a,b)+'return true;}',c);assert(c.initialize());
 vm.runInContext(source.slice(source.indexOf('function resetAll()'),source.indexOf('function setPointer(')),c);
 return {c,h,live};
}
test('939 startup and Reset use original unit cube with complete six-island UVs and no added history',()=>{
 const r=startRuntime();for(let i=0;i<2;i++){const o=r.c.objects[0];assert.equal(r.c.objects.length,1);assert.equal(o.name,'Cube');assert.equal(o.glbPassthrough.source,'boxlab');assert.equal(inspectImportedUV(o.mesh,o.glbPassthrough,meshTopologySignature).islandCount,6);assert.equal(meshTopologySignature(r.live),o.glbPassthrough.uvTopologySignature);assert.deepEqual(r.live.vertices.map(v=>v.toArray()),EditableMesh.cube(1).vertices.map(v=>v.toArray()));assert.equal(r.h.undoStack.length,0);assert.equal(r.h.redoStack.length,0);if(!i){r.h.push(r.live);r.live.vertices[0].x=20;r.c.soloId=1;r.c.linkedSources.set('old',{});assert(r.c.resetAll());assert.equal(r.c.soloId,null);assert.equal(r.c.linkedSources.size,0);}}
});
test('939 candidate projections exactly reuse original owners at asymmetric and extreme Add densities without geometry mutation',()=>{
 for(const [type,projection]of Object.entries(mappings))for(const [x,y]of [[3,1],[7,3],[12,6],[32,32]]){
  const mesh=fitAddObjectToUnitCube(makePrimitive(type,{x,y})),before=JSON.stringify(mesh),payload=createNativeUVCandidate(mesh,projection),object={},history={capture:()=>({}),checkpointSnapshot:()=>true};
  const fn={box:createBoxUV,cylinder:createCylinderUV,sphere:createSphereUV,torus:createTorusUV,xz:(...a)=>createPlanarUV(...a,'xz')}[projection];assert(fn(object,mesh,meshTopologySignature,history).ok,type);assert.deepEqual(payload,object.glbPassthrough);assert.equal(JSON.stringify(mesh),before);const report=inspectImportedUV(mesh,payload,meshTopologySignature);assert.equal(report.state,'ready');assert.equal(report.missingFaces,0);assert(payload.uvCorners.flat(2).every(Number.isFinite));
 }
 assert.throws(()=>createNativeUVCandidate(makePrimitive('torus'),'unsupported'),/no automatic/);const bad=makePrimitive('cube');bad.vertices[0].x=NaN;assert.throws(()=>createNativeUVCandidate(bad,'box'),/coordinates/);const o={};assert.equal(createBoxUV(o,makePrimitive('cube'),meshTopologySignature,null).ok,false);assert.equal(o.glbPassthrough,undefined,'scene UV projection still requires history');
});
test('939 actual Add defaults UVs on, offers plain mesh, creates one object/checkpoint and retains exact payload through Undo/Redo',()=>{
 for(const type of Object.keys(mappings))for(const uv of [true,false]){
  const r=addObjectRuntime(),before=r.snapshot();r.open(type[0].toUpperCase()+type.slice(1));assert(r.find(n=>n.dataset.addSetting==='uv').checked);toggle(r,uv);r.input('x',7);r.input('y',3);assert.deepEqual(r.snapshot(),before,'staging has no scene/history effects');r.action('apply').click();const o=r.manager.objects.at(-1);assert.equal(r.manager.objects.length,6);assert.equal(!!o.glbPassthrough,uv,type);if(uv){assert.equal(inspectImportedUV(o.mesh,o.glbPassthrough,meshTopologySignature).state,'ready');assert.equal(o.settings.subd,false);assert.deepEqual({...o.settings.mirror},{x:false,y:false,z:false});}const after=r.snapshot();assert.equal(r.history.undoStack.length,1);r.undo();assert.deepEqual(r.snapshot(),before);r.redo();assert.deepEqual(r.snapshot(),after);
 }
});
test('939 Cancel keeps redo; unsupported Text remains plain; candidate failure never adds or checkpoints',async()=>{
 const r=addObjectRuntime();r.open('Cube');r.action('apply').click();r.undo();const before=r.snapshot();r.open('Sphere');toggle(r,false);r.action('cancel').click();assert.deepEqual(r.snapshot(),before);r.redo();assert.equal(r.manager.objects.length,6);
 for(const name of ['Text']){const s=addObjectRuntime();s.open(name);if(name==='Text')await s.flush();assert.equal(s.find(n=>n.dataset.addSetting==='uv'),undefined);s.action('apply').click();assert.equal(s.manager.objects.at(-1).glbPassthrough,undefined);}
 const s=addObjectRuntime(),saved=s.snapshot();s.open('Cylinder');s.c.createNativeUVCandidate=()=>{throw Error('UV projection refused');};s.action('apply').click();assert.deepEqual(s.snapshot(),saved);assert.match(s.readout(),/projection refused/);assert(s.panel());
});
test('939 automatically generated UVs survive real project transport and actual NOM/GLB corner output',async()=>{
 const exporter=glbOwnerRuntime(),template=fs.readFileSync(new URL('../src/templates/nomad-tube.nom',import.meta.url));
 for(const type of Object.keys(mappings)){
  const r=addObjectRuntime();r.open(type[0].toUpperCase()+type.slice(1));r.action('apply').click();const o=r.manager.objects.at(-1),scene=decodeBoxlabScene(JSON.parse(JSON.stringify(encodeBoxlabScene(r.c.__boxlabObjectHistory.capture()))),(...a)=>new EditableMesh(...a)),copy=scene.objects.find(x=>x.id===o.id);assert.deepEqual(copy.glbPassthrough,o.glbPassthrough);
  const nom=readNomadProject(buildNomadProject([copy],template,{topologySignature:exporter.c.topologySignature}).bytes),m=nom.json.meshes[0],uv=new DataView(nom.bin.buffer,nom.bin.byteOffset+m.uvs.offset,m.uvs.length),ids=new DataView(nom.bin.buffer,nom.bin.byteOffset+m.faces_uv.offset,m.faces_uv.length);
  // N-gon caps may be triangulated by the existing writer; every emitted UV must
  // be one of the original per-corner variants, including seam/pole splits.
  const expected=copy.glbPassthrough.uvCorners.flat().map(p=>p.map(Math.fround));assert(m.count_uv>0);assert(ids.byteLength>0);for(let i=0;i<m.count_uv;i++)assert(expected.some(p=>p[0]===uv.getFloat32(i*8,true)&&p[1]===uv.getFloat32(i*8+4,true)));
  const glb=await exporter.build([copy]);assert.equal(glb.uvRestoredCount,1);const mesh=await exporter.decode(glb.buffer);mesh.traverse(n=>{if(n.isMesh){const a=n.geometry.getAttribute('uv');assert(a?.count);for(let i=0;i<a.count;i++)assert(expected.some(p=>p[0]===a.getX(i)&&p[1]===a.getY(i)));}});
 }
});
test('939 startup UV cube paints immediately through actual production UI at1024, history and persistence retain binding',async()=>{
 const initial=startRuntime().c.objects[0],r=viewportPaintRuntime();r.manager.replaceActiveMesh(initial.mesh);r.target().glbPassthrough=initial.glbPassthrough;r.body.geometry.dispose();r.body.geometry=r.owner.buildUVPreviewGeometry(r.target().mesh,initial.glbPassthrough);const u=viewportPaintUIRuntime(r),n=r.h.undoStack.length;await u.api.open();assert(u.api.active);assert.equal(u.nodes.get('paint-resolution').textContent,'1024 × 1024');u.emit('pointerdown');u.emit('pointerup');const paint=r.target().colourPaint;assert(paint);assert(paint.pixels.some(v=>v!==255));assert.equal(r.h.undoStack.length,n+1);assert.equal(paint.width,1024);u.api.close();const opened=decodeBoxlabScene(JSON.parse(JSON.stringify(encodeBoxlabScene(r.c.__boxlabObjectHistory.capture()))),(...a)=>new EditableMesh(...a));assert.deepEqual(opened.objects.find(o=>o.id===3).colourPaint,paint);assert.equal(inspectImportedUV(r.target().mesh,r.target().glbPassthrough,meshTopologySignature).state,'ready');
});
