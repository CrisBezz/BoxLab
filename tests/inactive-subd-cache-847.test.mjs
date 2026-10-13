import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import * as THREE from 'three';
import {EditableMesh} from '../src/mesh.js';
import {subdivide} from '../src/subdivision.js';
import {applyMirror} from '../src/mirror.js';
import {createSubdDisplayCache} from '../src/subd-display-cache.js';
import {transformEditableMesh,matrixForInstance} from '../src/instance-core.js';
const source=fs.readFileSync(new URL('../src/multi-object.js',import.meta.url),'utf8');
const data=m=>JSON.stringify([m.vertices.map(v=>v.toArray()),m.faces,[...m.creases],m.faceGroups]);
function fixture(){
 let calls=0;const counts=[],scene=new THREE.Scene(),a={id:1,mesh:EditableMesh.cube(1),visible:true,settings:{}},b={id:2,mesh:EditableMesh.cube(1),visible:true,settings:{subd:true,subdLevel:2,mirror:{x:true}}};b.mesh.vertices.forEach(v=>v.x+=3);
 const c={THREE,objects:[a,b],activeId:1,soloId:null,activeObject:()=>c.objects.find(o=>o.id===c.activeId),linkedSources:new Map(),matrixForInstance,transformEditableMesh,subdivide:(m,l)=>{calls++;return subdivide(m,l);},applyMirror,createSubdDisplayCache,state:()=>({scene}),inactiveLayer:null,inactiveBodies:[],__boxlabPerformance:{cache:value=>counts.push(value),start(){},stage(){}},console};vm.createContext(c);
 vm.runInContext(source.slice(source.indexOf('function activeShouldShow()'),source.indexOf('function queueOutliner()')),c);
 vm.runInContext(source.slice(source.indexOf('function ensureInactiveLayer()'),source.indexOf('function installRenderObserver()')),c);
 return{c,a,b,scene,calls:()=>calls,counts};
}
test('847 existing inactive display owner reuses native SubD/Mirror output without changing source or input identity',()=>{
 const f=fixture(),before=data(f.b.mesh),first=f.c.displayMeshFor(f.b);assert.equal(data(first),data(applyMirror(subdivide(f.b.mesh,2),f.b.settings.mirror)));
 for(let i=0;i<50;i++)assert.equal(f.c.displayMeshFor(f.b),first);
 assert.equal(f.calls(),1);assert.equal(f.counts.filter(Boolean).length,50);assert.equal(data(f.b.mesh),before);
});
test('847 exact component/metadata/settings/source replacement invalidate; disabled SubD retires its cached result',()=>{
 const f=fixture();let previous=f.c.displayMeshFor(f.b);
 for(const edit of [()=>f.b.mesh.vertices[0].x+=1e-12,()=>f.b.mesh.faces[0].reverse(),()=>f.b.mesh.creases.set('0:1',.7),()=>f.b.mesh.faceGroups[0]='group',()=>f.b.mesh.looseVertices=new Set([0]),()=>f.b.settings.subdLevel=1,()=>f.b.settings.mirror={y:true},()=>f.b.mesh=f.b.mesh.clone()]){
  edit();const next=f.c.displayMeshFor(f.b);assert.notEqual(next,previous);assert.equal(data(next),data(applyMirror(subdivide(f.b.mesh,f.b.settings.subdLevel),f.b.settings.mirror)));previous=next;
 }
 const n=f.calls();f.b.settings.subd=false;f.c.displayMeshFor(f.b);assert.equal(f.calls(),n);f.b.settings.subd=true;assert.notEqual(f.c.displayMeshFor(f.b),previous);assert.equal(f.calls(),n+1);
 const restored={...f.b,mesh:f.b.mesh.clone()};assert.notEqual(f.c.displayMeshFor(restored),previous);
});
test('847 native inactive scene rebuild preserves owned GPU geometry, preserves raycast IDs and visibility, while avoiding repeated subdivision',()=>{
 const f=fixture(),body=new THREE.Mesh(new THREE.BoxGeometry(),new THREE.MeshStandardMaterial());f.c.rebuildInactiveLayer(body);const first=f.c.inactiveBodies[0];let disposed=0;first.geometry.addEventListener('dispose',()=>disposed++);f.scene.updateMatrixWorld(true);
 const ray=new THREE.Raycaster(new THREE.Vector3(3,0,5),new THREE.Vector3(0,0,-1));const hits=()=>ray.intersectObjects(f.c.inactiveBodies,false).map(h=>[h.object.userData.objectId,h.distance]);const before=hits();assert(before.length);
 for(let i=0;i<10;i++)f.c.rebuildInactiveLayer(body);f.scene.updateMatrixWorld(true);assert.equal(f.calls(),1);assert.equal(disposed,0);assert.equal(f.c.inactiveBodies[0].geometry,first.geometry);assert.deepEqual(hits(),before);assert.equal(f.scene.children.length,1);
 f.b.visible=false;f.c.rebuildInactiveLayer(body);assert.equal(f.c.inactiveBodies.length,0);assert.equal(disposed,1);f.b.visible=true;f.c.rebuildInactiveLayer(body);assert.equal(f.calls(),1);
 f.c.activeId=2;f.c.rebuildInactiveLayer(body);assert.equal(f.c.inactiveBodies[0].userData.objectId,1);
});
test('847 linked source placement always follows authoritative uncached evaluator; source edits refresh immediately',()=>{
 const f=fixture();f.b.sourceId='link';f.b.instanceMatrix=new THREE.Matrix4().makeTranslation(4,0,0).elements;const local=EditableMesh.cube(1);f.c.linkedSources.set('link',{mesh:local});
 for(let i=0;i<3;i++){const result=f.c.displayMeshFor(f.b),world=transformEditableMesh(local,matrixForInstance(f.b));assert.equal(data(result),data(applyMirror(subdivide(world,2),f.b.settings.mirror)));}
 assert.equal(f.calls(),3);assert.equal(f.counts.length,0);local.vertices[0].x+=.2;const result=f.c.displayMeshFor(f.b);assert.equal(data(result),data(applyMirror(subdivide(transformEditableMesh(local,matrixForInstance(f.b)),2),f.b.settings.mirror)));assert.equal(f.calls(),4);
});
