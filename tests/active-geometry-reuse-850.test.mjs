import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import * as THREE from 'three';
import {EditableMesh} from '../src/mesh.js';
import {subdivide} from '../src/subdivision.js';
import {applyMirror} from '../src/mirror.js';
import {createSubdDisplayCache} from '../src/subd-display-cache.js';
const source=fs.readFileSync(new URL('../src/main.js',import.meta.url),'utf8');
function fixture(){
 const c={THREE,mesh:EditableMesh.cube(1),subdDisplayCache:createSubdDisplayCache(subdivide,applyMirror),applyMirror,mirrorAxes:{},subdLevel:2,subdEnabled:true,showCage:false,selection:null,drag:null,root:new THREE.Group(),baseMaterial:new THREE.MeshBasicMaterial(),subdMaterial:new THREE.MeshBasicMaterial(),activeLoopSlides:[]};
 for(const name of ['updateStatus','updateActionAvailability','syncDirectToolControls','syncTransformButtons','syncSelectionModeButtons','syncCreaseControl','syncMirrorAlignControl'])c[name]=()=>{};
 const line=name=>{const i=source.indexOf('function '+name+'(');return source.slice(i,source.indexOf('\n',i));};vm.createContext(c);vm.runInContext(['clearGroup','modifiedBaseMesh','renderMesh'].map(line).join('\n'),c);return c;
}
test('850 native active render reuses exact geometry across unchanged selections; edits and Undo invalidate with one disposal',()=>{
 const c=fixture();c.renderMesh();const first=c.root.children[0].geometry;let disposed=0;first.addEventListener('dispose',()=>disposed++);
 const cageGeometry=new THREE.BufferGeometry();let cageDisposed=0;cageGeometry.addEventListener('dispose',()=>cageDisposed++);c.root.add(new THREE.Mesh(cageGeometry));
 const original=c.mesh.clone();for(let i=0;i<20;i++)c.renderMesh();assert.equal(c.root.children[0].geometry,first);assert.equal(disposed,0);assert.equal(cageDisposed,1);
 c.mesh.vertices[0].x+=.2;c.renderMesh();const edited=c.root.children[0].geometry;assert.notEqual(edited,first);assert.equal(disposed,1);
 const native=applyMirror(subdivide(c.mesh,2),{}).triangulatedGeometry();assert.deepEqual(Array.from(edited.attributes.position.array),Array.from(native.attributes.position.array));native.dispose();
 c.mesh=original;c.renderMesh();assert.notEqual(c.root.children[0].geometry,edited);assert.deepEqual(Array.from(c.root.children[0].geometry.attributes.position.array),Array.from(first.attributes.position.array));
});
test('850 modifier and source replacement invalidate; leaving SubD releases cache and normal cage cleanup remains independent',()=>{
 const c=fixture();c.renderMesh();let previous=c.root.children[0].geometry;
 for(const change of [()=>c.subdLevel=1,()=>c.mirrorAxes={x:true},()=>c.mesh=c.mesh.clone()]){let disposed=0;previous.addEventListener('dispose',()=>disposed++);change();c.renderMesh();assert.notEqual(c.root.children[0].geometry,previous);assert.equal(disposed,1);previous=c.root.children[0].geometry;}
 let released=0;previous.addEventListener('dispose',()=>released++);c.subdEnabled=false;c.addCage=()=>{};c.addMirrorCage=()=>{};c.renderMesh();assert.equal(released,1);assert.equal(c.root.userData.activeSubdGeometry,undefined);
 const plain=c.root.children[0].geometry;let plainDisposed=0;plain.addEventListener('dispose',()=>plainDisposed++);c.renderMesh();assert.equal(plainDisposed,1);assert.notEqual(c.root.children[0].geometry,plain);
});


test('852 active SubD skips unused base evaluation, keeps mirror cage and native surface parity across modifier toggles',()=>{
 const c=fixture();let baseCalls=0,cage=null;const native=c.applyMirror;c.applyMirror=(...args)=>{baseCalls++;return native(...args);};c.addCage=()=>{};c.addMirrorCage=m=>{cage=m;};
 for(const [subd,show,axes,expected] of [[true,false,{},0],[true,true,{},0],[true,false,{x:true},0],[true,true,{x:true},1],[true,true,{},0],[false,false,{},1],[false,true,{x:true},1]]){
  c.subdEnabled=subd;c.showCage=show;c.mirrorAxes=axes;const before=baseCalls;cage=null;c.renderMesh();assert.equal(baseCalls-before,expected);
  const display=native(subd?subdivide(c.mesh,c.subdLevel):c.mesh,axes),g=display.triangulatedGeometry();assert.deepEqual(Array.from(c.root.children[0].geometry.attributes.position.array),Array.from(g.attributes.position.array));g.dispose();
  if(show&&axes.x||!subd&&axes.x){assert(cage);assert.deepEqual(cage.vertices.map(v=>v.toArray()),native(c.mesh,axes).vertices.map(v=>v.toArray()));}else assert.equal(cage,null);
 }
});
test('852 SubD without base still handles direct edits and Undo replacement; explicit base export stays fresh and independently owned',()=>{
 const c=fixture(),original=c.mesh.clone();c.renderMesh();c.mesh.vertices[0].x+=.25;c.renderMesh();const edited=Array.from(c.root.children[0].geometry.attributes.position.array);c.mesh=original;c.renderMesh();assert.notDeepEqual(Array.from(c.root.children[0].geometry.attributes.position.array),edited);
 const exported=c.modifiedBaseMesh();assert.notEqual(exported,c.mesh);exported.vertices[0].x+=10;assert.equal(c.mesh.vertices[0].x,original.vertices[0].x);
 c.mirrorAxes={x:true};const mirrored=c.modifiedBaseMesh();assert.deepEqual(mirrored.vertices.map(v=>v.toArray()),applyMirror(c.mesh,c.mirrorAxes).vertices.map(v=>v.toArray()));
});
