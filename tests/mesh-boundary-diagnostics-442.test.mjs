import test from 'node:test';
import assert from 'node:assert/strict';
import * as THREE from 'three';
import fs from 'node:fs';
import {EditableMesh} from '../src/mesh.js';
import {boundaryDiagnostics} from '../src/mesh-boundary-diagnostics-core.js';

test('442 Boundary Diagnostics identifies one closed boundary loop',()=>{
  const mesh=EditableMesh.cube(2);
  mesh.faces.splice(0,1);
  const d=boundaryDiagnostics(mesh);
  assert.equal(d.boundaryEdges,4);
  assert.equal(d.components.length,1);
  assert.equal(d.loops,1);
  assert.equal(d.chains,0);
  assert.equal(d.branched,0);
  assert.equal(d.boundaryEdgeIndices.length,4);
});

test('442 Boundary Diagnostics classifies a branched boundary graph',()=>{
  const mesh=new EditableMesh([
    new THREE.Vector3(0,0,0),new THREE.Vector3(1,0,0),new THREE.Vector3(0,1,0),
    new THREE.Vector3(-1,0,0),new THREE.Vector3(0,-1,0)
  ],[[0,1,2],[0,3,4]]);
  const d=boundaryDiagnostics(mesh);
  assert.equal(d.branched,1);
  assert.equal(d.components.length,1);
});

test('442 Boundary Diagnostics maps non-manifold edges to selectable edge indices',()=>{
  const mesh=new EditableMesh([
    new THREE.Vector3(0,0,0),new THREE.Vector3(1,0,0),new THREE.Vector3(0,1,0),
    new THREE.Vector3(0,-1,0),new THREE.Vector3(0,0,1)
  ],[[0,1,2],[1,0,3],[0,1,4]]);
  const d=boundaryDiagnostics(mesh);
  assert.equal(d.nonManifoldEdges,1);
  assert.equal(d.nonManifoldEdgeIndices.length,1);
});

test('442 UI exposes boundary diagnostic selection handoff and preserves frozen baselines',()=>{
  const ui=fs.readFileSync(new URL('../src/mesh-health.js',import.meta.url),'utf8');
  const index=fs.readFileSync(new URL('../index.html',import.meta.url),'utf8');
  const beta4=JSON.parse(fs.readFileSync(new URL('../beta-4/version.json',import.meta.url),'utf8'));
  assert.match(ui,/meshHealthSelectBoundary/);
  assert.match(ui,/meshHealthSelectNonManifold/);
  assert.match(ui,/boundaryDiagnostics/);
  assert.match(ui,/set\?\.\('edge'/);
  assert.match(index,/src\/mesh-health\.js\?v=0\.36\.18\.445/);
  assert.match(index,/multi-object-transform\.js\?v=0\.36\.1\.0/);
  assert.equal(beta4.version,'0.36.18.427');
});
