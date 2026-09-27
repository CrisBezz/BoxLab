import test from 'node:test';
import assert from 'node:assert/strict';
import * as THREE from 'three';
import fs from 'node:fs';
import {EditableMesh} from '../src/mesh.js';
import {unifyFaceWinding,flipAllFaces,triangulateMesh} from '../src/mesh-normals-triangulate-core.js';
import {analyzeMeshHealth} from '../src/mesh-health-core.js';

test('443 Unify Winding fixes one reversed cube face without changing topology counts',()=>{
  const mesh=EditableMesh.cube(2);
  mesh.faces[0].reverse();
  const before=analyzeMeshHealth(mesh);
  assert.ok(before.inconsistentWindingEdges>0);
  const result=unifyFaceWinding(mesh);
  assert.equal(result.ok,true);
  assert.equal(result.changed,true);
  assert.ok(result.flippedFaces>0);
  const after=analyzeMeshHealth(mesh);
  assert.equal(after.inconsistentWindingEdges,0);
  assert.equal(after.vertices,before.vertices);
  assert.equal(after.faces,before.faces);
  assert.equal(after.edges,before.edges);
});

test('443 Flip Normals reverses every face and preserves topology',()=>{
  const mesh=EditableMesh.cube(2),first=[...mesh.faces[0]];
  const result=flipAllFaces(mesh);
  assert.equal(result.ok,true);
  assert.equal(result.flippedFaces,6);
  assert.deepEqual(mesh.faces[0],[...first].reverse());
  assert.equal(analyzeMeshHealth(mesh).state,'closed-clean');
});

test('443 Triangulate converts cube quads to twelve triangles',()=>{
  const mesh=EditableMesh.cube(2);
  const result=triangulateMesh(mesh);
  assert.equal(result.ok,true);
  assert.equal(result.changed,true);
  assert.equal(result.polygonFaces,6);
  assert.equal(mesh.faces.length,12);
  assert.ok(mesh.faces.every(face=>face.length===3));
  assert.equal(analyzeMeshHealth(mesh).state,'closed-clean');
});

test('443 Triangulate handles a concave ngon with ear clipping',()=>{
  const mesh=new EditableMesh([
    new THREE.Vector3(0,0,0),new THREE.Vector3(2,0,0),new THREE.Vector3(2,2,0),
    new THREE.Vector3(1,1,0),new THREE.Vector3(0,2,0)
  ],[[0,1,2,3,4]]);
  const result=triangulateMesh(mesh);
  assert.equal(result.ok,true);
  assert.equal(result.changed,true);
  assert.equal(mesh.faces.length,3);
  assert.ok(mesh.faces.every(face=>face.length===3));
});

test('443 UI exposes normals and triangulation controls and preserves frozen baselines',()=>{
  const ui=fs.readFileSync(new URL('../src/mesh-health.js',import.meta.url),'utf8');
  const index=fs.readFileSync(new URL('../index.html',import.meta.url),'utf8');
  const beta4=JSON.parse(fs.readFileSync(new URL('../beta-4/version.json',import.meta.url),'utf8'));
  assert.match(ui,/meshHealthUnifyWinding/);
  assert.match(ui,/meshHealthFlipNormals/);
  assert.match(ui,/meshHealthTriangulate/);
  assert.match(ui,/unifyFaceWinding/);
  assert.match(ui,/flipAllFaces/);
  assert.match(ui,/triangulateMesh/);
  assert.match(ui,/checkpointSnapshot/);
  assert.match(index,/src\/mesh-health\.js\?v=0\.36\.18\.443/);
  assert.match(index,/multi-object-transform\.js\?v=0\.36\.1\.0/);
  assert.equal(beta4.version,'0.36.18.427');
});
