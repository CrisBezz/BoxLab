import {installFacegroupUVWorkflow} from '../src/facegroup-uv-workflow.js';
import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import {EditableMesh} from '../src/mesh.js';
import {inspectImportedUV,drawImportedUV} from '../src/imported-uv-inspection.js';
import {analyzeMeshHealth} from '../src/mesh-health-core.js';
import {safeRepairMesh} from '../src/mesh-health-repair-core.js';
import {autoCloseSimpleHoles,simpleBoundaryLoops} from '../src/mesh-auto-close-core.js';
import {boundaryDiagnostics} from '../src/mesh-boundary-diagnostics-core.js';
import {unifyFaceWinding,flipAllFaces,triangulateMesh} from '../src/mesh-normals-triangulate-core.js';
import {encodeBoxlabScene,decodeBoxlabScene} from '../src/boxlab-project-codec.js';
import {glbOwnerRuntime} from './helpers/glb-owner-runtime.mjs';
const owner=glbOwnerRuntime(),signature=mesh=>owner.c.topologySignature(mesh);
function fixture(){
 const mesh=new EditableMesh([[0,0,0],[1,0,0],[1,1,0],[0,1,0]],[[0,1,2,3]]);
 return {id:1,name:'UV quad',kind:'editable',mesh,settings:{mirror:{},subd:false,subdLevel:1},glbPassthrough:{version:1,source:'glb',uvTopologySignature:signature(mesh),uvCorners:[[[0,0],[1,0],[1,1],[0,1]]]}};
}
function freeze(x){if(x&&typeof x==='object'){Object.values(x).forEach(freeze);Object.freeze(x);}return x;}
function canvas(){const calls=[],ctx=Object.fromEntries(['clearRect','fillRect','strokeRect','beginPath','moveTo','lineTo','closePath','stroke'].map(k=>[k,(...args)=>calls.push([k,...args])]));return {width:256,height:200,getContext:()=>ctx,calls};}
test('862 inspection reads actual imported UVs and native project roundtrip without changing resources or export',async()=>{
 const r=glbOwnerRuntime(),original=fixture(),glb=await r.build([original]);await r.import(glb.buffer);const imported=r.added[0],before=JSON.stringify(imported.glbPassthrough);
 const report=inspectImportedUV(imported.mesh,imported.glbPassthrough,signature);assert.equal(report.state,'ready');assert.equal(report.mappedFaces,imported.mesh.faces.length);
 const encoded=encodeBoxlabScene({activeId:1,objects:[{...imported,id:1,kind:'editable'}]}),decoded=decodeBoxlabScene(JSON.parse(JSON.stringify(encoded)),(...a)=>new EditableMesh(...a)),restored=decoded.objects[0];
 assert.equal(inspectImportedUV(restored.mesh,restored.glbPassthrough,signature).state,'ready');assert.equal(JSON.stringify(encodeBoxlabScene(decoded)),JSON.stringify(encoded));
 const out=await r.build([restored]);assert.equal(out.uvRestoredCount,1);assert.equal(JSON.stringify(imported.glbPassthrough),before);
 freeze(original.glbPassthrough);assert.equal(inspectImportedUV(original.mesh,original.glbPassthrough,signature).state,'ready');
});
test('862 UV inspection distinguishes absent, stale, partial and invalid channels and retains the export topology rule',()=>{
 const o=fixture();assert.equal(inspectImportedUV(o.mesh,null,signature).state,'absent');assert.equal(inspectImportedUV(o.mesh,o.glbPassthrough,null).state,'unavailable');
 o.mesh.vertices[0].x=-2;assert.equal(inspectImportedUV(o.mesh,o.glbPassthrough,signature).state,'ready');
 o.mesh.faces[0].reverse();assert.equal(inspectImportedUV(o.mesh,o.glbPassthrough,signature).state,'stale');o.mesh.faces[0].reverse();
 for(const uvCorners of [[],[[[0,0]]],[[[0,0],[1,0],[NaN,1],[0,1]]]]){
  const r=inspectImportedUV(o.mesh,{...o.glbPassthrough,uvCorners},signature);assert(['absent','invalid'].includes(r.state));assert.equal(drawImportedUV(canvas(),r),false);
 }
 const mesh=EditableMesh.cube(1),uvCorners=mesh.faces.map((f,i)=>i?null:[[0,0],[2,0],[2,1],[0,1]]),payload={uvCorners,uvTopologySignature:signature(mesh)};
 const r=inspectImportedUV(mesh,payload,signature);assert.equal(r.state,'ready');assert.equal(r.mappedFaces,1);assert.equal(r.missingFaces,5);assert.equal(r.outsideCorners,2);assert.equal(r.bounds.maxU,2);
 mesh.faceGroups[0]='changed';assert.equal(inspectImportedUV(mesh,payload,signature).state,'stale');
});
test('862 preview preserves UV orientation and tile reference, bounds dense drawing and keeps huge finite tiled values finite',()=>{
 const o=fixture(),r=inspectImportedUV(o.mesh,o.glbPassthrough,signature),c=canvas();assert.equal(drawImportedUV(c,r),true);
 assert.deepEqual(c.calls.find(x=>x[0]==='strokeRect'),['strokeRect',12,12,176,176]);
 assert.deepEqual(c.calls.find(x=>x[0]==='moveTo'),['moveTo',12,188]);assert(c.calls.some(x=>JSON.stringify(x)===JSON.stringify(['lineTo',188,12])));
 const bounded=inspectImportedUV(o.mesh,o.glbPassthrough,signature,{maxPreviewCorners:3});assert.equal(bounded.mappedFaces,1);assert.equal(bounded.previewCorners,0);assert.equal(bounded.previewFaces.length,0);
 o.glbPassthrough.uvCorners[0][0]=[-1e308,1e308];const large=canvas();drawImportedUV(large,inspectImportedUV(o.mesh,o.glbPassthrough,signature));assert(large.calls.flat().filter(x=>typeof x==='number').every(Number.isFinite));
 assert.equal(drawImportedUV(null,r),false);
});
function uiFixture(){
 const object=fixture(),nodes=new Map(),events=new Map();
 const node=id=>{if(nodes.has(id))return nodes.get(id);const listeners=new Map(),n={id,hidden:false,style:{},dataset:{},children:[],open:false,addEventListener(t,fn){listeners.set(t,fn);},fire(t){listeners.get(t)?.({});},append(...x){this.children.push(...x);},appendChild(x){this.append(x);},replaceChildren(){this.children=[];},querySelector(s){return node(s.slice(1));},getContext:()=>canvas().getContext()};nodes.set(id,n);return n;};
 const launch=node('meshHealthBtn'),activeMode=node('mode');activeMode.dataset.mode='object';const session=[];
 const context={installFacegroupUVWorkflow:options=>installFacegroupUVWorkflow({...options,requestFrame:()=>0,cancelFrame(){}}),console,inspectImportedUV,drawImportedUV,analyzeMeshHealth,safeRepairMesh,autoCloseSimpleHoles,simpleBoundaryLoops,boundaryDiagnostics,unifyFaceWinding,flipAllFaces,triangulateMesh,
 document:{createElement:()=>node('element'+nodes.size),querySelector:s=>s.includes('button.active')?activeMode:s.startsWith('#')?node(s.slice(1)):node('tools'),querySelectorAll:()=>[]},
 window:{addEventListener:(t,fn)=>events.set(t,fn)},__boxlabObjectManager:{activeId:1,objects:[object],saveActive(){}},__boxlabBridgeState:{mesh:object.mesh},__boxlabExportAs:{topologySignature:signature},__boxlabToolSession:{begin:x=>session.push(x.id),end:x=>session.push('end:'+x)},__boxlabObjectHistory:{checkpointSnapshot(){throw Error('Inspection must not write history');}}};
 vm.createContext(context);const source=fs.readFileSync(new URL('../src/mesh-health.js',import.meta.url),'utf8');vm.runInContext(source.replace(/^import .*;\n/gm,''),context);
 node('meshHealthUVPreview').width=256;node('meshHealthUVPreview').height=200;
 return {object,node,context,launch,activeMode,events,session};
}
test('862 existing Mesh Health launch/expand/Refresh/close owns read-only UV inspection and clears stale previews',()=>{
 const r=uiFixture(),before=JSON.stringify(r.object.glbPassthrough);r.launch.fire('click');assert.equal(r.context.__boxlabMeshHealth.active,true);assert.match(r.node('meshHealthUVSummary').textContent,/1 \/ 1 faces/);assert.equal(r.node('meshHealthUVPreview').hidden,false);
 r.node('meshHealthUVDetails').open=true;r.node('meshHealthUVDetails').fire('toggle');r.object.mesh.faces[0].reverse();r.node('meshHealthRefresh').fire('click');assert.match(r.node('meshHealthUVSummary').textContent,/no longer match/);assert.equal(r.node('meshHealthUVPreview').hidden,true);assert.equal(JSON.stringify(r.object.glbPassthrough),before);
 r.node('meshHealthClose').fire('click');assert.equal(r.context.__boxlabMeshHealth.active,false);assert.deepEqual(r.session,['mesh-health','end:mesh-health']);
 r.launch.fire('click');r.activeMode.dataset.mode='face';r.events.get('boxlab-bridge-state')();assert.equal(r.context.__boxlabMeshHealth.active,false);
});

test('1000 missing-UV handoff opens the original UV session and puts its reminder at the top without inspecting repairs',()=>{
 const r=uiFixture();delete r.object.glbPassthrough;
 assert.equal(r.context.__boxlabUVTools.open({notice:'Valid UVs required for UV Paint.'}),true);
 assert.equal(r.node('uvToolsNotice').hidden,false);assert.equal(r.node('uvToolsNotice').textContent,'Valid UVs required for UV Paint.');
 assert.equal(r.node('meshHealthTitle').textContent,'UV');assert.deepEqual(r.session,['uv-tools']);assert.equal(r.context.__boxlabUVTools.busy,false);
 r.context.__boxlabUVTools.close();assert.equal(r.context.__boxlabUVTools.active,false);
});
