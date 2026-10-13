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
