import test from 'node:test';
import assert from 'node:assert/strict';
import * as THREE from 'three';
import fs from 'node:fs';
import {EditableMesh} from '../src/mesh.js';
import {splitMeshByPlane} from '../src/symmetry-bisect-core.js';

function approx(a,b,eps=1e-8){return Math.abs(a-b)<=eps;}

test('473 Bisect Only splits crossed faces and keeps both sides',()=>{
  const source=EditableMesh.cube(2);
  const result=splitMeshByPlane(source,{axis:'x'});
  assert.ok(result.ok);
  assert.ok(result.cutVertices>0);
  assert.ok(result.mesh.vertices.some(v=>v.x<-.9));
  assert.ok(result.mesh.vertices.some(v=>v.x>.9));
  assert.ok(result.mesh.vertices.some(v=>approx(v.x,0)));
  assert.ok(result.mesh.faces.length>source.faces.length);
  for(const face of result.mesh.faces){
    assert.ok(face.length>=3);
    assert.equal(new Set(face).size,face.length);
  }
});

test('473 Bisect Only supports moved and oblique planes',()=>{
  const source=EditableMesh.cube(2);
  const normal=new THREE.Vector3(1,1,0).normalize();
  const point=new THREE.Vector3(.15,-.05,0);
  const result=splitMeshByPlane(source,{planeNormal:normal,planePoint:point});
  assert.ok(result.ok);
  assert.ok(result.cutVertices>0);
  const distances=result.mesh.vertices.map(v=>normal.dot(v.clone().sub(point)));
  assert.ok(distances.some(d=>d<-.1));
  assert.ok(distances.some(d=>d>.1));
  assert.ok(distances.some(d=>Math.abs(d)<1e-8));
});

test('473 Bisect Only preserves facegroup identity across split faces',()=>{
  const source=EditableMesh.cube(2);
  source.faceGroups=source.faces.map((_,i)=>i+1);
  const result=splitMeshByPlane(source,{axis:'x'});
  assert.ok(result.ok);
  assert.equal(result.mesh.faceGroups.length,result.mesh.faces.length);
  assert.ok(result.mesh.faceGroups.every(g=>g>=1&&g<=source.faces.length));
});

test('473 Symmetry UI exposes explicit Bisect Only action and no longer calls keep-half mode Bisect only',()=>{
  const ui=fs.readFileSync(new URL('../src/symmetry-bisect.js',import.meta.url),'utf8');
  const index=fs.readFileSync(new URL('../index.html',import.meta.url),'utf8');
  assert.match(ui,/id="symmetryBisectOnlyBtn"/);
  assert.match(ui,/splitMeshByPlane\(source/);
  assert.match(ui,/both sides kept/);
  assert.match(ui,/Keep half/);
  assert.match(index,/src\/symmetry-bisect\.js\?v=0\.36\.18\.473/);
});
