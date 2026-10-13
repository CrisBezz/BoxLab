import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import * as THREE from 'three';
import {EditableMesh} from '../src/mesh.js';
import {localMeshFromWorld,transformEditableMesh,meshesNear} from '../src/instance-core.js';
const source=fs.readFileSync(new URL('../src/live-mesh-bridge.js',import.meta.url),'utf8').replace(/^import .*;\n/gm,'');
function fixture(){
 class Mesh extends EditableMesh{clone(){const m=new Mesh(this.vertices.map(v=>v.clone()),this.faces.map(f=>[...f]),new Map(this.creases),[...this.faceGroups]);m.looseEdges=new Set(this.looseEdges||[]);m.looseVertices=new Set(this.looseVertices||[]);return m;}}
 class Group extends THREE.Group{}
 const root=new Group(),events=[],state={};const c={THREE:{...THREE,Group},EditableMesh:Mesh,__boxlabBridgeState:state,window:{dispatchEvent:e=>events.push(e)},Event:class{constructor(t){this.type=t;}},queueMicrotask(){},document:{querySelector:()=>null}};vm.createContext(c);vm.runInContext(source,c);
 const cube=()=>{const m=EditableMesh.cube(2);return new Mesh(m.vertices,m.faces);};
 const edge=()=>{const e=new THREE.Object3D();e.userData.kind='edge';return e;};const body=()=>{const b=new THREE.Object3D();b.userData.kind='body';return b;};
 return {cube,root,state,events,c,edge,body};
}
test('839 published main world mesh remains authoritative despite intervening inverse-placement/helper edge queries',()=>{
 const f=fixture(),base=f.cube(),placement=new THREE.Matrix4().makeTranslation(1.65,1.2,2),world=transformEditableMesh(base,placement);
 f.state.mesh=world;world.edges();f.root.add(f.edge());
 // Real inverse-placement calculation invokes edges() on a different local mesh.
 const local=localMeshFromWorld(world,placement);local.edges();f.root.add(f.edge());
 assert.equal(f.state.mesh,world);assert.equal(f.c.__boxlabLiveMeshBridge.mesh(),world);assert(meshesNear(localMeshFromWorld(f.state.mesh,placement),base));
 const next=world.clone();f.state.mesh=next;local.edges();f.root.add(f.body());assert.equal(f.state.mesh,next);assert.equal(f.events.length,2);
});
test('839 repeated cage events cannot subtract instance placement again from shared source',()=>{
 const f=fixture(),base=f.cube(),placement=new THREE.Matrix4().makeTranslation(0,0,1.6875733),world=transformEditableMesh(base,placement);let shared=base.clone();
 f.state.mesh=world;
 for(let i=0;i<20;i++){
 const local=localMeshFromWorld(f.state.mesh,placement);local.edges();f.root.add(f.edge());shared=localMeshFromWorld(f.state.mesh,placement);
 assert(meshesNear(shared,base));assert.equal(f.state.mesh,world);
 }
});
test('839 legacy cage inference still works until main explicitly publishes an owner',()=>{
 const f=fixture(),m=f.cube();m.edges();f.root.add(f.edge());assert.equal(f.state.mesh,m);
 const diagnostic=f.cube();diagnostic.edges();assert.equal(f.state.mesh,m);
});

import {matrixForInstance,setInstanceMatrix,deriveInstancePlacement} from '../src/instance-core.js';
test('839 actual linked save owner and bridge-state observers retain world identity and source over repeated redraws',()=>{
 const f=fixture(),base=f.cube(),placement=new THREE.Matrix4().makeTranslation(1.65,1.2,2),world=transformEditableMesh(base,placement),original={id:1,sourceId:'source-1',mesh:base.clone(),instanceMatrix:new THREE.Matrix4().elements},copy={id:2,sourceId:'source-1',mesh:world.clone(),instanceMatrix:placement.elements},pool={mesh:base.clone(),revision:0};
 Object.assign(f.c,{objects:[original,copy],linkedSources:new Map([['source-1',pool]]),activeObject:()=>copy,state:()=>f.state,currentMode:()=> 'face',captureSettings:()=>({}),captureHistory:()=>({}),traceLinkedSourceWrite(){},matrixForInstance,setInstanceMatrix,deriveInstancePlacement,localMeshFromWorld,transformEditableMesh,meshesNear});
 const manager=fs.readFileSync(new URL('../src/multi-object.js',import.meta.url),'utf8');vm.runInContext(manager.slice(manager.indexOf('function syncLinkedPeers('),manager.indexOf('function evaluatedLinkedMesh('))+manager.slice(manager.indexOf('function saveActive()'),manager.indexOf('function activeShouldShow()')),f.c);
 f.c.window.dispatchEvent=e=>{f.events.push(e);f.c.saveActive();};
 f.state.mesh=world;
 for(let i=0;i<20;i++){f.root.add(f.body());f.c.saveActive();localMeshFromWorld(world,placement).edges();f.root.add(f.edge());assert.equal(f.state.mesh,world);assert(meshesNear(pool.mesh,base));assert(meshesNear(original.mesh,base));}
 assert.equal(pool.revision,0);assert.equal(f.events.length,1);
 world.vertices[0].z+=.1;f.c.saveActive();assert.equal(pool.revision,1);assert(meshesNear(original.mesh,pool.mesh));
});
