import fs from 'node:fs';
import vm from 'node:vm';
import assert from 'node:assert/strict';
import * as THREE from 'three';
import {EditableMesh} from '../../src/mesh.js';
import {applyMirror} from '../../src/mirror.js';
import {subdivide} from '../../src/subdivision.js';
import {applyFaceGroupColours,normaliseFacegroupView,DEFAULT_FACEGROUP_VIEW} from '../../src/facegroup-colours-core.js';

// Actual render-owner functions with real geometry/colours/evaluation. Controlled
// DOM, frame scheduling and Studio/UI callbacks; no WebGL/browser propagation.
export function facegroupsRuntime(transform=s=>s){
 const frames=[],evaluations=[],events=[];
 const scene=new THREE.Scene(),source=EditableMesh.cube(2);source.faceGroups=source.faces.map((_,i)=>'G'+i);
 const inactive=EditableMesh.cube(1);inactive.faceGroups=inactive.faces.map(()=> 'Other');
 const activeObject={id:'active',mesh:inactive,settings:{}},other={id:'other',mesh:inactive,settings:{}};
 const manager={activeId:'active',objects:[activeObject,other]};
 const bridge={mesh:source,scene};
 const original=new THREE.MeshStandardMaterial();
 const body=new THREE.Mesh(source.triangulatedGeometry(),original);body.userData.kind='body';scene.add(body);
 const c={THREE,applyFaceGroupColours,normaliseFacegroupView,DEFAULT_FACEGROUP_VIEW,
  subdivide:(mesh,n)=>{evaluations.push('subd');return subdivide(mesh,n);},
  applyMirror:(mesh,axes)=>{evaluations.push('mirror');return applyMirror(mesh,axes);},
  __boxlabBridgeState:bridge,__boxlabObjectManager:manager,
  frontMaterialCache:new WeakMap(),facegroupMaterial:new THREE.MeshStandardMaterial({vertexColors:true}),
  backfaceMaterial:new THREE.MeshStandardMaterial({side:THREE.BackSide}),clayMaterial:new THREE.MeshStandardMaterial(),
  mode:'studio',lastBody:null,facegroupView:{...DEFAULT_FACEGROUP_VIEW,saturation:99},status:{},
  syncStudio(){},refreshStudio(){},syncFacegroupControls(){},
  requestAnimationFrame:fn=>frames.push(fn),Event:class{constructor(type){this.type=type;}},
  CustomEvent:class{constructor(type,options){this.type=type;this.detail=options.detail;}},
  document:{querySelector:s=>s==='#cageToggle'?{dispatchEvent:e=>events.push(e.type)}:null,querySelectorAll:()=>[],dispatchEvent:e=>events.push(e.type)}};
 vm.createContext(c);
 const sourceText=fs.readFileSync(new URL('../../src/render-modes.js',import.meta.url),'utf8');
 const slice=(a,b)=>{const start=sourceText.indexOf(a),end=sourceText.indexOf(b,start);assert.ok(start>=0&&end>start);return sourceText.slice(start,end);};
 const code=slice('function bridge(){','const clayMaterial=')+slice('function clearRenderChildren(','function ensureStudioRig(')+slice('function applyMode(','const baseAdd=');
 vm.runInContext(transform(code)+'\nglobalThis.lookup=sourceMeshForBody;globalThis.evaluate=evaluatedFacegroupMesh;globalThis.set=setMode;',c);
 return {c,body,source,other,bridge,manager,activeObject,original,frames,evaluations,events,scene,
  frame(){const queue=frames.splice(0);for(const fn of queue)fn();},
  flush(){let n=0;while(frames.length){assert.ok(n++<20);this.frame();}}};
}
const state=mesh=>JSON.stringify({vertices:mesh.vertices.map(v=>v.toArray()),faces:mesh.faces,groups:mesh.faceGroups,creases:[...mesh.creases]});

export function assertFacegroupSources(transform){
 const f=facegroupsRuntime(transform);
 assert.equal(f.c.lookup(f.body),f.source,'active body uses authoritative bridge mesh over manager mesh');
 const b=new THREE.Mesh();b.userData={kind:'boxlab-inactive-body',objectId:'other'};
 assert.equal(f.c.lookup(b),f.other.mesh,'inactive body uses its own object ID');
 b.userData.objectId='missing';assert.equal(f.c.lookup(b),null);
 assert.equal(f.c.lookup({userData:{editableMesh:f.source}}),f.source);
 f.bridge.mesh=null;assert.equal(f.c.lookup(f.body),null,'no stale active-manager fallback');
}

export function assertFacegroupEvaluation(transform){
 const f=facegroupsRuntime(transform),settings={subd:true,subdLevel:2,mirror:{x:true}},before=state(f.source);
 f.activeObject.settings=settings;
 const actual=f.c.lookup(f.body),expected=applyMirror(subdivide(f.source,2),settings.mirror);
 assert.deepEqual(f.evaluations,['subd','mirror']);assert.equal(state(actual),state(expected));assert.equal(state(f.source),before);
 f.body.geometry=expected.triangulatedGeometry();f.c.mode='facegroups';f.c.__boxlabRenderModes.apply(f.body);
 assert.equal(f.body.material,f.c.facegroupMaterial);assert.equal(f.body.userData.boxlabFacegroupCount,6);
 assert.equal(f.body.geometry.getAttribute('color').count,f.body.geometry.getAttribute('position').count);
 assert.equal(f.body.userData.boxlabFacegroupPending,undefined);
}

export function assertFacegroupRetry(transform){
 const f=facegroupsRuntime(transform);
 f.body.geometry=new THREE.BufferGeometry();f.c.set('facegroups');
 assert.equal(f.events[0],'change');assert.equal(f.c.facegroupView.saturation,1.8);
 f.frame();assert.equal(f.body.userData.boxlabFacegroupPending,true);assert.notEqual(f.body.material,f.c.facegroupMaterial);
 f.frame();assert.equal(f.body.userData.boxlabFacegroupPending,true);
 f.body.geometry=f.source.triangulatedGeometry();f.frame();
 assert.equal(f.body.material,f.c.facegroupMaterial);assert.equal(f.body.userData.boxlabFacegroupPending,undefined);assert.equal(f.frames.length,0);
 assert.equal(f.body.userData.boxlabFacegroupCount,6);
}

export function assertFacegroupRetryExit(){
 const f=facegroupsRuntime();f.body.geometry=new THREE.BufferGeometry();f.c.set('facegroups');f.frame();
 f.c.set('clay');f.body.geometry=f.source.triangulatedGeometry();f.flush();
 assert.equal(f.body.material,f.c.clayMaterial,'queued retry cannot override new look');
 assert.equal(f.body.geometry.getAttribute('color'),undefined);
}
