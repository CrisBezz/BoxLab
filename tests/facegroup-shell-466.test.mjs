import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {EditableMesh} from '../src/mesh.js';
import {shellClosedMesh} from '../src/shell-core.js';

test('466 Shell preserves surviving Facegroups and removes opening group',()=>{
 const mesh=EditableMesh.cube(2); mesh.faceGroups=mesh.faces.map((_,i)=>`G${i}`); const removed=mesh.faceGroups[0];
 const result=shellClosedMesh(mesh,[0],.1); assert.equal(result.ok,true); assert.equal(mesh.faceGroups.length,mesh.faces.length); assert.ok(!mesh.faceGroups.includes(removed)); assert.ok(mesh.faceGroups.some(g=>g===null));
});

test('466 does not alter Solidify core',()=>{
 const s=fs.readFileSync(new URL('../src/solidify-core.js',import.meta.url),'utf8');
 assert.match(s,/mesh\.faceGroups=\[\.\.\.originalGroups,\.\.\.originalGroups,\.\.\.sideFaces\.map\(\(\)=>null\)\]/);
});
