import test from 'node:test';
import assert from 'node:assert/strict';
import * as THREE from 'three';
import fs from 'node:fs';
import {EditableMesh} from '../src/mesh.js';
import {analyzeMeshHealth} from '../src/mesh-health-core.js';

test('439 Mesh Health identifies a clean closed cube',()=>{
  const result=analyzeMeshHealth(EditableMesh.cube(2));
  assert.equal(result.state,'closed-clean');
  assert.equal(result.boundaryEdges,0);
  assert.equal(result.nonManifoldEdges,0);
  assert.equal(result.orphanVertices,0);
  assert.equal(result.issues.length,0);
  assert.equal(result.quads,6);
});

test('439 Mesh Health treats a valid open sheet as open clean rather than an error',()=>{
  const mesh=new EditableMesh([
    new THREE.Vector3(0,0,0),new THREE.Vector3(1,0,0),
    new THREE.Vector3(1,1,0),new THREE.Vector3(0,1,0)
  ],[[0,1,2,3]]);
  const result=analyzeMeshHealth(mesh);
  assert.equal(result.state,'open-clean');
  assert.equal(result.boundaryEdges,4);
  assert.equal(result.issues.length,0);
  assert.ok(result.warnings.some(x=>x.code==='boundary-edges'));
});

test('439 Mesh Health reports duplicate faces orphan verts and winding faults',()=>{
  const mesh=new EditableMesh([
    new THREE.Vector3(0,0,0),new THREE.Vector3(1,0,0),new THREE.Vector3(0,1,0),new THREE.Vector3(9,9,9)
  ],[[0,1,2],[0,1,2]]);
  const result=analyzeMeshHealth(mesh);
  assert.equal(result.state,'issues');
  assert.equal(result.duplicateFaces,1);
  assert.equal(result.orphanVertices,1);
  assert.ok(result.inconsistentWindingEdges>0);
});

test('439 Mesh Health UI is non-destructive Tool Session and current shell loads it',()=>{
  const ui=fs.readFileSync(new URL('../src/mesh-health.js',import.meta.url),'utf8');
  const index=fs.readFileSync(new URL('../index.html',import.meta.url),'utf8');
  const beta4=JSON.parse(fs.readFileSync(new URL('../beta-4/version.json',import.meta.url),'utf8'));
  assert.match(ui,/Inspect · non-destructive/);
  assert.match(ui,/id:'mesh-health'/);
  assert.doesNotMatch(ui,/checkpoint|push\(|restoreMesh|vertices\s*=/);
  assert.match(index,/src\/mesh-health\.js\?v=0\.36\.18\.439/);
  assert.match(index,/multi-object-transform\.js\?v=0\.36\.1\.0/);
  assert.equal(beta4.version,'0.36.18.427');
});
