import test from 'node:test';
import assert from 'node:assert/strict';
import * as THREE from 'three';
import fs from 'node:fs';
import {EditableMesh} from '../src/mesh.js';
import {simpleBoundaryLoops,autoCloseSimpleHoles} from '../src/mesh-auto-close-core.js';
import {analyzeMeshHealth} from '../src/mesh-health-core.js';

test('441 Auto Close finds and closes one simple cube hole',()=>{
  const mesh=EditableMesh.cube(2);
  mesh.faces.splice(1,1);
  const loops=simpleBoundaryLoops(mesh);
  assert.equal(loops.ok,true);
  assert.equal(loops.loops.length,1);
  assert.equal(loops.loops[0].length,4);
  const result=autoCloseSimpleHoles(mesh);
  assert.equal(result.ok,true);
  assert.equal(result.changed,true);
  assert.equal(result.holesClosed,1);
  assert.equal(analyzeMeshHealth(mesh).state,'closed-clean');
});

test('441 Auto Close can close multiple disjoint simple holes transactionally',()=>{
  const mesh=EditableMesh.cube(2);
  mesh.faces=mesh.faces.filter((_,i)=>i!==0&&i!==1);
  const result=autoCloseSimpleHoles(mesh);
  assert.equal(result.ok,true);
  assert.equal(result.holesClosed,2);
  assert.equal(analyzeMeshHealth(mesh).state,'closed-clean');
});

test('441 Auto Close refuses branched boundary graphs',()=>{
  const mesh=new EditableMesh([
    new THREE.Vector3(0,0,0),new THREE.Vector3(1,0,0),new THREE.Vector3(0,1,0),
    new THREE.Vector3(-1,0,0),new THREE.Vector3(0,-1,0)
  ],[[0,1,2],[0,3,4]]);
  const info=simpleBoundaryLoops(mesh);
  assert.equal(info.ok,false);
  assert.equal(info.reason,'branched-boundary');
  const before=mesh.faces.map(f=>[...f]);
  const result=autoCloseSimpleHoles(mesh);
  assert.equal(result.changed,false);
  assert.deepEqual(mesh.faces,before);
});

test('441 Auto Close refuses meshes with pre-existing topology issues',()=>{
  const mesh=new EditableMesh([
    new THREE.Vector3(0,0,0),new THREE.Vector3(1,0,0),new THREE.Vector3(0,1,0)
  ],[[0,1,2],[0,1,2]]);
  const result=autoCloseSimpleHoles(mesh);
  assert.equal(result.ok,false);
  assert.equal(result.reason,'mesh-not-clean-open');
});

test('441 UI exposes Auto Close in Mesh Health and protects frozen baselines',()=>{
  const ui=fs.readFileSync(new URL('../src/mesh-health.js',import.meta.url),'utf8');
  const index=fs.readFileSync(new URL('../index.html',import.meta.url),'utf8');
  const beta4=JSON.parse(fs.readFileSync(new URL('../beta-4/version.json',import.meta.url),'utf8'));
  assert.match(ui,/meshHealthAutoClose/);
  assert.match(ui,/autoCloseSimpleHoles/);
  assert.match(ui,/checkpointSnapshot/);
  assert.match(index,/src\/mesh-health\.js\?v=0\.36\.18\.445/);
  assert.match(index,/multi-object-transform\.js\?v=0\.36\.1\.0/);
  assert.equal(beta4.version,'0.36.18.427');
});
