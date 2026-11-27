import test from 'node:test';
import assert from 'node:assert/strict';
import * as THREE from 'three';
import {EditableMesh} from '../src/mesh.js';
import {planarizeSelectedFaces} from '../src/make-planar-core.js';

function sample(warp=.08){
 return new EditableMesh([
  [0,0,0],[1,0,0],[2,0,0],[0,1,0],[1,1,warp],[2,1,0]
 ].map(p=>new THREE.Vector3(...p)),[[0,1,4,3],[1,2,5,4]]);
}
function deviation(mesh,face){
 const [a,b,c,d]=face.map(i=>mesh.vertices[i]),normal=b.clone().sub(a).cross(c.clone().sub(a)).normalize();
 return Math.abs(d.clone().sub(a).dot(normal));
}
test('Make Planar jointly solves adjacent selected quads with shared vertices and immutable source',()=>{
 const source=sample(),original=JSON.stringify(source),result=planarizeSelectedFaces(source,[0,1]);
 assert.equal(result.ok,true,result.reason);
 assert(result.moved>0);
 assert(result.mesh.faces.every(face=>deviation(result.mesh,face)<result.tolerance));
 assert.deepEqual(result.mesh.faces,source.faces);
 assert.equal(JSON.stringify(source),original);
});
test('Make Planar refuses a selection that demands excessive vertex movement',()=>{
 const source=sample(1),original=JSON.stringify(source),result=planarizeSelectedFaces(source,[0,1]);
 assert.equal(result.ok,false);
 assert.equal(JSON.stringify(source),original);
});
