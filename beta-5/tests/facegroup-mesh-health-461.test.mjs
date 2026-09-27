import test from 'node:test';
import assert from 'node:assert/strict';
import * as THREE from 'three';
import {EditableMesh} from '../src/mesh.js';
import {triangulateMesh,flipAllFaces} from '../src/mesh-normals-triangulate-core.js';
import {autoCloseSimpleHoles} from '../src/mesh-auto-close-core.js';

test('461 triangulation children inherit parent Facegroup',()=>{
 const mesh=new EditableMesh([new THREE.Vector3(0,0,0),new THREE.Vector3(1,0,0),new THREE.Vector3(1,1,0),new THREE.Vector3(0,1,0)],[[0,1,2,3]],null,['Panel']);
 const result=triangulateMesh(mesh); assert.equal(result.ok,true); assert.equal(mesh.faces.length,2); assert.deepEqual(mesh.faceGroups,['Panel','Panel']);
});

test('461 flip normals preserves Facegroup',()=>{
 const mesh=EditableMesh.cube(2); mesh.faceGroups=mesh.faces.map((_,i)=>`G${i}`); const before=[...mesh.faceGroups];
 const result=flipAllFaces(mesh); assert.equal(result.ok,true); assert.deepEqual(mesh.faceGroups,before);
});

test('461 Auto Close caps are ungrouped',()=>{
 const mesh=EditableMesh.cube(2); mesh.faceGroups=mesh.faces.map((_,i)=>`G${i}`); mesh.deleteFace(0); const before=[...mesh.faceGroups];
 const result=autoCloseSimpleHoles(mesh); assert.equal(result.ok,true); assert.equal(result.changed,true); assert.deepEqual(mesh.faceGroups.slice(0,before.length),before); assert.equal(mesh.faceGroups.at(-1),null);
});
