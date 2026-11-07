import test from 'node:test';
import assert from 'node:assert/strict';
import * as THREE from 'three';
import {EditableMesh} from '../src/mesh.js';
import {combineEditableMeshes} from '../src/object-join-core.js';

test('463 Object Join preserves source Facegroups in face order',()=>{
 const a=new EditableMesh([new THREE.Vector3(0,0,0),new THREE.Vector3(1,0,0),new THREE.Vector3(0,1,0)],[[0,1,2]],null,['A']);
 const b=new EditableMesh([new THREE.Vector3(2,0,0),new THREE.Vector3(3,0,0),new THREE.Vector3(2,1,0)],[[0,1,2]],null,['B']);
 const joined=combineEditableMeshes([a,b]);
 assert.ok(joined); assert.equal(joined.faces.length,2); assert.deepEqual(joined.faceGroups,['A','B']);
});

test('463 Object Join preserves ungrouped faces',()=>{
 const a=EditableMesh.cube(2),b=EditableMesh.cube(1); a.faceGroups=a.faces.map(()=> 'CubeA'); b.faceGroups=b.faces.map(()=>null);
 const joined=combineEditableMeshes([a,b]);
 assert.equal(joined.faceGroups.length,joined.faces.length);
 assert.ok(joined.faceGroups.slice(0,a.faces.length).every(g=>g==='CubeA'));
 assert.ok(joined.faceGroups.slice(a.faces.length).every(g=>g===null));
});
