import {assertFacegroupEvaluation} from './helpers/facegroups-render-runtime.mjs';
import test from 'node:test';
import assert from 'node:assert/strict';
import * as THREE from 'three';
import {EditableMesh} from '../src/mesh.js';
import {applyMirror} from '../src/mirror.js';

test('459 Mirror descendants inherit source facegroups',()=>{
 const mesh=new EditableMesh([new THREE.Vector3(0,0,0),new THREE.Vector3(1,0,0),new THREE.Vector3(1,1,0),new THREE.Vector3(0,1,0)],[[0,1,2,3]],null,['Panel']);
 const mirrored=applyMirror(mesh,{x:true,y:false,z:false});
 assert.ok(mirrored.faces.length>=1);
 assert.equal(mirrored.faceGroups.length,mirrored.faces.length);
 assert.ok(mirrored.faceGroups.every(group=>group==='Panel'));
});

test('459 current Facegroups viewport evaluates SubD before Mirror with inherited labels',()=>{
 assertFacegroupEvaluation();
});
