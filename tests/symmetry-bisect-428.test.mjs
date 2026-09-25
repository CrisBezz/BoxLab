import test from 'node:test';
import assert from 'node:assert/strict';
import * as THREE from 'three';
import fs from 'node:fs';
import {EditableMesh} from '../src/mesh.js';
import {bisectMesh,symmetryBisect} from '../src/symmetry-bisect-core.js';
const version=JSON.parse(fs.readFileSync(new URL('../version.json',import.meta.url),'utf8')).version;

function approx(a,b,eps=1e-8){return Math.abs(a-b)<=eps;}

test('428 bisect keeps only the requested positive half and creates plane intersections',()=>{
  const source=EditableMesh.cube(2);
  const result=bisectMesh(source,{axis:'x',keep:'positive'});
  assert.ok(result.ok);
  assert.equal(result.mesh.faces.length,5);
  assert.ok(result.cutVertices>0);
  assert.ok(result.mesh.vertices.every(v=>v.x>=-1e-8));
  assert.ok(result.mesh.vertices.some(v=>approx(v.x,0)));
});

test('428 bisect keep negative mirrors the side choice correctly',()=>{
  const source=EditableMesh.cube(2);
  const result=bisectMesh(source,{axis:'y',keep:'negative'});
  assert.ok(result.ok);
  assert.ok(result.mesh.vertices.every(v=>v.y<=1e-8));
  assert.ok(result.mesh.vertices.some(v=>approx(v.y,0)));
});

test('428 symmetry mirrors the kept half and welds centre-plane vertices',()=>{
  const source=EditableMesh.cube(2);
  const result=symmetryBisect(source,{axis:'x',keep:'positive',mirror:true});
  assert.ok(result.ok);
  assert.equal(result.mirrored,true);
  assert.ok(result.mesh.vertices.some(v=>v.x<-.9));
  assert.ok(result.mesh.vertices.some(v=>v.x>.9));
  const seam=result.mesh.vertices.filter(v=>approx(v.x,0));
  const keys=seam.map(v=>`${v.y.toFixed(8)}:${v.z.toFixed(8)}`);
  assert.equal(new Set(keys).size,keys.length);
});

test('428 symmetry result has no collapsed or duplicate vertex references per face',()=>{
  const source=EditableMesh.cube(2);
  for(const axis of ['x','y','z']){
    for(const keep of ['positive','negative']){
      const result=symmetryBisect(source,{axis,keep,mirror:true});
      assert.ok(result.ok);
      for(const face of result.mesh.faces){
        assert.ok(face.length>=3);
        assert.equal(new Set(face).size,face.length);
        face.forEach(i=>assert.ok(i>=0&&i<result.mesh.vertices.length));
      }
    }
  }
});

test('428 UI uses Tool Session and preserves frozen Beta 4 version',()=>{
  const ui=fs.readFileSync(new URL('../src/symmetry-bisect.js',import.meta.url),'utf8');
  const index=fs.readFileSync(new URL('../index.html',import.meta.url),'utf8');
  const beta4=fs.readFileSync(new URL('../beta-4/version.json',import.meta.url),'utf8');
  assert.ok(ui.includes("id:'symmetry-bisect'"));
  assert.ok(ui.includes("data-sym-axis"));
  assert.ok(ui.includes("data-sym-keep"));
  assert.ok(ui.includes("Mirror kept half"));
  assert.ok(ui.includes("turn off the non-destructive Mirror modifier first"));
  assert.ok(index.includes('src/symmetry-bisect.js?v='+version));
  assert.equal(JSON.parse(beta4).version,'0.36.18.427');
});


test('433 moved bisect plane clips at non-zero offset',()=>{
  const source=EditableMesh.cube(2);
  const result=bisectMesh(source,{axis:'x',keep:'positive',offset:0.35});
  assert.ok(result.ok);
  assert.equal(result.offset,0.35);
  assert.ok(result.mesh.vertices.every(v=>v.x>=0.35-1e-8));
  assert.ok(result.mesh.vertices.some(v=>approx(v.x,0.35)));
});

test('433 moved symmetry mirrors around the moved plane and welds that seam',()=>{
  const source=EditableMesh.cube(2);
  const result=symmetryBisect(source,{axis:'x',keep:'positive',offset:0.25,mirror:true});
  assert.ok(result.ok);
  assert.equal(result.offset,0.25);
  const seam=result.mesh.vertices.filter(v=>approx(v.x,0.25));
  assert.ok(seam.length>0);
  const seamKeys=seam.map(v=>`${v.y.toFixed(8)}:${v.z.toFixed(8)}`);
  assert.equal(new Set(seamKeys).size,seamKeys.length);
  const reflectedXs=result.mesh.vertices.map(v=>v.x);
  assert.ok(reflectedXs.some(x=>x>0.9));
  assert.ok(reflectedXs.some(x=>x<-.4));
});

test('433 UI exposes movable plane, reset and geometry snapping while keeping touch navigation free',()=>{
  const ui=fs.readFileSync(new URL('../src/symmetry-bisect.js',import.meta.url),'utf8');
  assert.ok(ui.includes('Move Plane'));
  assert.ok(ui.includes('Reset Origin'));
  assert.ok(ui.includes("event.pointerType==='touch'"));
  assert.ok(ui.includes('nearestCrossObjectSnap'));
  assert.ok(ui.includes("type:'Face'"));
  assert.ok(ui.includes('offset=snap.position[axis]'));
  assert.ok(ui.includes('symmetryBisect(source,{axis,keep,offset'));
});
