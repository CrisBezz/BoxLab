import test from 'node:test';
import assert from 'node:assert/strict';
import * as THREE from 'three';
import {EditableMesh} from '../src/mesh.js';
import {solidifyOpenMesh} from '../src/solidify-core.js';
import {shellClosedMesh} from '../src/shell-core.js';

test('462 Solidify copies parent groups to inner faces and leaves side walls ungrouped',()=>{
 const mesh=new EditableMesh([new THREE.Vector3(0,0,0),new THREE.Vector3(1,0,0),new THREE.Vector3(1,1,0),new THREE.Vector3(0,1,0)],[[0,1,2,3]],null,['Panel']);
 const result=solidifyOpenMesh(mesh,.1); assert.equal(result.ok,true); assert.equal(mesh.faceGroups[0],'Panel'); assert.equal(mesh.faceGroups[1],'Panel'); assert.ok(mesh.faceGroups.slice(2).every(group=>group===null));
});

test('462 Shell preserves surviving groups and leaves generated side walls ungrouped',()=>{
 const mesh=EditableMesh.cube(2); mesh.faceGroups=mesh.faces.map((_,i)=>`G${i}`); const openingGroup=mesh.faceGroups[0];
 const result=shellClosedMesh(mesh,[0],.1); assert.equal(result.ok,true); assert.ok(!mesh.faceGroups.includes(openingGroup)); assert.equal(mesh.faceGroups.length,mesh.faces.length); assert.ok(mesh.faceGroups.some(group=>group===null));
});
