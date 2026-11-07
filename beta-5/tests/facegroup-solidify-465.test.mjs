import test from 'node:test';
import assert from 'node:assert/strict';
import * as THREE from 'three';
import fs from 'node:fs';
import {EditableMesh} from '../src/mesh.js';
import {solidifyOpenMesh} from '../src/solidify-core.js';

test('465 Solidify inherits source Facegroup to inner face and leaves side walls ungrouped',()=>{
 const mesh=new EditableMesh([new THREE.Vector3(0,0,0),new THREE.Vector3(1,0,0),new THREE.Vector3(1,1,0),new THREE.Vector3(0,1,0)],[[0,1,2,3]],null,['Panel']);
 const result=solidifyOpenMesh(mesh,.1); assert.equal(result.ok,true); assert.deepEqual(mesh.faceGroups.slice(0,2),['Panel','Panel']); assert.ok(mesh.faceGroups.slice(2).every(g=>g===null));
});

test('465 does not touch Shell core',()=>{
 const s=fs.readFileSync(new URL('../src/shell-core.js',import.meta.url),'utf8');
 assert.doesNotMatch(s,/target\.faceGroups=/);
 assert.doesNotMatch(s,/faceGroups=mesh\.faces/);
});
