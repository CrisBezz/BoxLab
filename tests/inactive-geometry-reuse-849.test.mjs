import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import * as THREE from 'three';
import {EditableMesh} from '../src/mesh.js';
import {subdivide,subdivideWithCornerUVs} from '../src/subdivision.js';
import {applyMirror} from '../src/mirror.js';
import {createSubdDisplayCache,subdCornerUVPreviewSource} from '../src/subd-display-cache.js';
import {meshTopologySignature} from '../src/mesh-topology-signature.js';
import {transformEditableMesh,matrixForInstance} from '../src/instance-core.js';
const source=fs.readFileSync(new URL('../src/multi-object.js',import.meta.url),'utf8');
function fixture(){
 const a={id:1,mesh:EditableMesh.cube(1),visible:true,settings:{}},b={id:2,mesh:EditableMesh.cube(1),visible:true,settings:{subd:true,subdLevel:2}};
 const c={THREE,objects:[a,b],activeId:1,soloId:null,activeObject:()=>c.objects.find(o=>o.id===c.activeId),linkedSources:new Map(),matrixForInstance,transformEditableMesh,subdivide,subdivideWithCornerUVs,subdCornerUVPreviewSource,__boxlabExportAs:{topologySignature:meshTopologySignature},applyMirror,createSubdDisplayCache,scene:new THREE.Scene(),state:()=>({scene:c.scene}),inactiveLayer:null,inactiveBodies:[],console:{warn(){}},__boxlabRenderModes:{apply:body=>{const overlay=new THREE.Mesh(body.geometry,new THREE.MeshBasicMaterial({wireframe:true}));overlay.userData.boxlabRenderOverlay=true;body.add(overlay);},clear:body=>{for(const child of [...body.children]){body.remove(child);child.material.dispose();}}}};vm.createContext(c);
 vm.runInContext(source.slice(source.indexOf('function activeShouldShow()'),source.indexOf('function queueOutliner()')),c);vm.runInContext(source.slice(source.indexOf('function ensureInactiveLayer()'),source.indexOf('function installRenderObserver()')),c);
 const body=new THREE.Mesh(new THREE.BoxGeometry(),new THREE.MeshStandardMaterial());
 return{c,a,b,rebuild(){c.rebuildInactiveLayer(body);return c.inactiveBodies[0]?.geometry;}};
}
test('849 native buffer identity survives redraws and shared wire overlays; changed source invalidates and disposes exactly once',()=>{
 const f=fixture(),g=f.rebuild();let disposed=0;g.addEventListener('dispose',()=>disposed++);const bytes=Array.from(g.attributes.position.array);let materialDisposed=0;f.c.inactiveBodies[0].children[0].material.addEventListener('dispose',()=>materialDisposed++);
 for(let i=0;i<20;i++){assert.equal(f.rebuild(),g);assert.equal(f.c.inactiveBodies[0].children[0].geometry,g);}assert.equal(disposed,0);assert.equal(materialDisposed,1);assert.deepEqual(Array.from(g.attributes.position.array),bytes);
 f.b.mesh.vertices[0].x+=.2;const edited=f.rebuild();assert.notEqual(edited,g);assert.equal(disposed,1);
 const native=applyMirror(subdivide(f.b.mesh,2),{}).triangulatedGeometry();assert.deepEqual(Array.from(edited.attributes.position.array),Array.from(native.attributes.position.array));native.dispose();
 let released=0;edited.addEventListener('dispose',()=>released++);f.c.clearInactiveLayer();assert.equal(released,1);assert.equal(f.c.inactiveLayer.userData.boxlabGeometryCache.size,0);assert.equal(f.c.inactiveBodies.length,0);
});
test('849 hidden/active/deleted/replaced objects prune geometry; native scene change clears old cache without stale resource reuse',()=>{
 for(const change of [f=>f.b.visible=false,f=>f.c.activeId=2,f=>f.c.objects.splice(1,1),f=>f.c.objects[1]={...f.b,mesh:f.b.mesh.clone()},f=>f.c.scene=new THREE.Scene()]){
  const f=fixture(),g=f.rebuild(),oldLayer=f.c.inactiveLayer;let disposed=0;g.addEventListener('dispose',()=>disposed++);change(f);const next=f.rebuild();assert.equal(disposed,1);assert.notEqual(next,g);assert.equal(oldLayer.userData.boxlabGeometryCache.has(f.b),false);
 }
});
test('849 linked buffers remain uncached and cleanup preserves authoritative placement geometry',()=>{
 const f=fixture();f.b.sourceId='linked';f.b.instanceMatrix=new THREE.Matrix4().makeTranslation(3,0,0).elements;f.c.linkedSources.set('linked',{mesh:EditableMesh.cube(1)});
 const g=f.rebuild();let disposed=0;g.addEventListener('dispose',()=>disposed++);const next=f.rebuild();assert.notEqual(next,g);assert(disposed>=1);assert.equal(f.c.inactiveLayer.userData.boxlabGeometryCache.size,0);
 const native=applyMirror(subdivide(transformEditableMesh(f.c.linkedSources.get('linked').mesh,matrixForInstance(f.b)),2),{}).triangulatedGeometry();assert.deepEqual(Array.from(next.attributes.position.array),Array.from(native.attributes.position.array));native.dispose();
});
