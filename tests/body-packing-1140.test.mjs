import test from 'node:test';import assert from 'node:assert/strict';import fs from 'node:fs';import * as THREE from 'three';
import {EditableMesh} from '../src/mesh.js';import {prior} from './fixtures/performance/body-geometry-1139.mjs';
const bytes=a=>Buffer.from(a.buffer,a.byteOffset,a.byteLength);
function parity(mesh){const snapshot=JSON.stringify(mesh),a=prior.call(mesh),b=mesh.triangulatedGeometry();try{for(const key of ['position','normal']){assert.deepEqual(bytes(a.attributes[key].array),bytes(b.attributes[key].array));assert.equal(b.attributes[key].itemSize,3);assert(b.attributes[key].array instanceof Float32Array);assert.equal(b.attributes[key].normalized,a.attributes[key].normalized);}assert.equal(b.index,null);assert.deepEqual(b.groups,a.groups);assert.deepEqual(b.drawRange,a.drawRange);assert.equal(JSON.stringify(mesh),snapshot);assert.notEqual(a.attributes.position.array.buffer,b.attributes.position.array.buffer);return b.attributes.position.count;}finally{a.dispose();b.dispose();}}
test('1140 original body owner retains byte-exact triangle fan order, winding and normals for polygons, degenerates, empty and loose meshes',()=>{
 const vertices=[[0,0,0],[2,0,0],[2,2,.1],[1,1,0],[0,2,0],[0,0,0],[7,8,9]],faces=[[],[0],[0,1],[0,1,2],[2,1,0],[0,1,2,3,4],[0,5,1],[0,0,0]];
 const m=new EditableMesh(vertices,faces,new Map([['0:1',.7]]),faces.map((_,i)=>'group'+i));assert.equal(parity(m),21);assert.equal(parity(new EditableMesh(vertices,[])),0);parity(EditableMesh.cube());
});
test('1140 repeated body builds remain independent and reflect in-place coordinates, face edits and mode-independent source metadata',()=>{
 const m=EditableMesh.cube(),first=m.triangulatedGeometry(),saved=bytes(first.attributes.position.array).toString('hex');try{
 m.vertices[0].set(-3,.125,4);m.faces[0].reverse();m.faces.push([0,1,4]);parity(m);assert.equal(bytes(first.attributes.position.array).toString('hex'),saved);
 const second=m.triangulatedGeometry();let disposal=0;second.addEventListener('dispose',()=>disposal++);second.dispose();assert.equal(disposal,1);assert.equal(bytes(first.attributes.position.array).toString('hex'),saved);
 }finally{first.dispose();}
});
test('1140 body ray hits retain original face indices, positions and distances on cube and concave fan',()=>{
 for(const m of [EditableMesh.cube(),new EditableMesh([[0,0,0],[2,0,0],[2,2,0],[1,1,0],[0,2,0]],[[0,1,2,3,4]])]){
 const geometries=[prior.call(m),m.triangulatedGeometry()],material=new THREE.MeshBasicMaterial({side:THREE.DoubleSide}),objects=geometries.map(g=>new THREE.Mesh(g,material));objects.forEach(o=>o.updateMatrixWorld(true));
 for(let x=-2;x<=3;x+=.2){const ray=new THREE.Raycaster(new THREE.Vector3(x,.4,5),new THREE.Vector3(0,0,-1)),hit=o=>ray.intersectObject(o).map(h=>({faceIndex:h.faceIndex,point:h.point.toArray(),distance:h.distance,normal:h.face.normal.toArray()}));assert.deepEqual(hit(objects[0]),hit(objects[1]));}geometries.forEach(g=>g.dispose());material.dispose();
 }
});
test('1140 shell refreshes legacy mesh imports while preserving the two existing constructor identities',()=>{
 const index=fs.readFileSync(new URL('../index.html',import.meta.url),'utf8'),imports=JSON.parse(index.match(/<script type="importmap">([\s\S]*?)<\/script>/)[1]).imports,base='https://example.test/BoxLab/',resolve=s=>new URL(imports[s]||s,base).href;
 assert.equal(resolve('./src/mesh.js'),resolve('./src/mesh.js?v=0.12'));assert.notEqual(resolve('./src/mesh.js?v=0.12'),resolve('./src/mesh.js?v=0.21.2'));
 for(const key of ['./src/mesh.js','./src/mesh.js?v=0.12','./src/mesh.js?v=0.21.2'])assert.match(resolve(key),/1140$/);
 const srcDir=new URL('../src/',import.meta.url);for(const file of fs.readdirSync(srcDir).filter(n=>n.endsWith('.js'))){const source=fs.readFileSync(new URL(file,srcDir),'utf8');for(const [,specifier] of source.matchAll(/from\s*['"](\.\/mesh\.js(?:\?[^'"]+)?)['"]/g)){const key='./src/'+specifier.slice(2);assert(imports[key],file+' mesh dependency is covered by shell import map');}}
});
