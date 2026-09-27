import test from 'node:test';
import assert from 'node:assert/strict';
import * as THREE from 'three';
import {buildRevolveFromPoints} from '../src/revolve-core.js';

test('388 arbitrary-axis Revolve works around a plane edge',()=>{
  const points=[
    new THREE.Vector3(0,0,0),
    new THREE.Vector3(1,1,0),
    new THREE.Vector3(.6,2,0)
  ];
  const r=buildRevolveFromPoints(points,{
    axisOrigin:new THREE.Vector3(0,0,0),
    axisDirection:new THREE.Vector3(0,2,0),
    segments:12
  });
  assert.equal(r.ok,true,r.reason);
  assert.equal(r.closedEnds.start,true);
  assert.equal(r.vertices,25);
  assert.equal(r.faces,24);
});

test('388 arbitrary axis is normalized internally',()=>{
  const points=[new THREE.Vector3(1,0,0),new THREE.Vector3(1,1,0)];
  const a=buildRevolveFromPoints(points,{axisOrigin:new THREE.Vector3(),axisDirection:new THREE.Vector3(0,1,0),segments:8});
  const b=buildRevolveFromPoints(points,{axisOrigin:new THREE.Vector3(),axisDirection:new THREE.Vector3(0,50,0),segments:8});
  assert.equal(a.ok,true);assert.equal(b.ok,true);
  assert.deepEqual(a.mesh.vertices.map(v=>v.toArray().map(n=>Number(n.toFixed(8)))),b.mesh.vertices.map(v=>v.toArray().map(n=>Number(n.toFixed(8)))));
});

test('388 point Revolve refuses fewer than two profile points',()=>{
  const r=buildRevolveFromPoints([new THREE.Vector3(1,0,0)],{segments:12});
  assert.equal(r.ok,false);
  assert.match(r.reason,/at least two/i);
});
