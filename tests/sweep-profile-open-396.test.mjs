import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import * as THREE from 'three';
import {buildSweepProfile} from '../src/sweep-core.js';

test('396 open two-point profile previews as a swept surface',()=>{
  const path=[new THREE.Vector3(0,0,0),new THREE.Vector3(0,0,2)];
  const profile=[{x:-.5,y:0},{x:.5,y:0}];
  const result=buildSweepProfile(path,profile,{profileClosed:false,capStart:true,capEnd:true});
  assert.equal(result.ok,true);
  assert.equal(result.profileClosed,false);
  assert.equal(result.mesh.vertices.length,4);
  assert.equal(result.mesh.faces.length,1);
  assert.equal(result.capStart,false);
  assert.equal(result.capEnd,false);
});

test('396 closed profile still requires three points',()=>{
  const path=[new THREE.Vector3(0,0,0),new THREE.Vector3(0,0,2)];
  const result=buildSweepProfile(path,[{x:0,y:0},{x:1,y:0}],{profileClosed:true});
  assert.equal(result.ok,false);
  assert.match(result.reason,/at least three points/i);
});

test('396 Sweep Draw profile is open-by-default and can be explicitly closed',()=>{
  const source=fs.readFileSync(new URL('../src/sweep-path.js',import.meta.url),'utf8');
  assert.match(source,/const h=\.35/);
  assert.match(source,/sweepProfileClosed/);
  assert.match(source,/m\.profileClosed=false/);
  assert.match(source,/profileClosedBtn\.textContent=m\.profileClosed\?'Closed':'Open'/);
  assert.match(source,/m\.profileClosed&&hit===null&&m\.profilePoints\.length>2\?nearestProfileSegment/);
  assert.match(source,/profileClosed:m\.profileClosed/);
  assert.match(source,/Caps N\/A/);
});
