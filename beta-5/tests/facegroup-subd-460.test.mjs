import test from 'node:test';
import assert from 'node:assert/strict';
import * as THREE from 'three';
import fs from 'node:fs';
import {EditableMesh} from '../src/mesh.js';
import {subdivide} from '../src/subdivision.js';

test('460 SubD descendants inherit parent facegroups',()=>{
 const mesh=new EditableMesh([new THREE.Vector3(0,0,0),new THREE.Vector3(1,0,0),new THREE.Vector3(1,1,0),new THREE.Vector3(0,1,0)],[[0,1,2,3]],null,['Panel']);
 const out=subdivide(mesh,2);
 assert.equal(out.faceGroups.length,out.faces.length);
 assert.ok(out.faceGroups.every(group=>group==='Panel'));
});

test('460 Facegroups viewport evaluates SubD before Mirror',()=>{
 const s=fs.readFileSync(new URL('../src/render-modes.js',import.meta.url),'utf8');
 assert.match(s,/import \{subdivide\}/);
 assert.match(s,/if\(settings\?\.subd\)out=subdivide/);
 assert.match(s,/if\(settings\?\.mirror\)out=applyMirror/);
 assert.ok(s.indexOf('out=subdivide')<s.indexOf('out=applyMirror'));
});
