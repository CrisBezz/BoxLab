import test from 'node:test';
import assert from 'node:assert/strict';
import * as THREE from 'three';
import fs from 'node:fs';
import {circleLoopInfo,circularizeLoop} from '../src/component-circle-core.js';

function mesh(){
  return {
    vertices:[
      new THREE.Vector3(-2,0,0),
      new THREE.Vector3(0,1.5,0),
      new THREE.Vector3(2.5,0,0),
      new THREE.Vector3(0,-1,0),
      new THREE.Vector3(4,4,0)
    ],
    faces:[[0,1,2,3]],
    edges(){return[
      {a:0,b:1},{a:1,b:2},{a:2,b:3},{a:3,b:0},
      {a:2,b:4}
    ];}
  };
}

test('331 circle loop detects one simple closed Vertex ring',()=>{
  const m=mesh();
  const info=circleLoopInfo(m,'vertex',[0,1,2,3]);
  assert.equal(info.ok,true);
  assert.equal(info.ordered.length,4);
});

test('331 circle loop detects one simple closed Edge ring',()=>{
  const m=mesh();
  const info=circleLoopInfo(m,'edge',[0,1,2,3]);
  assert.equal(info.ok,true);
  assert.equal(info.ordered.length,4);
});

test('331 circle rejects an open chain',()=>{
  const m=mesh();
  const info=circleLoopInfo(m,'edge',[0,1,2]);
  assert.equal(info.ok,false);
});

test('331 circularize preserves centre and makes equal radius spacing',()=>{
  const m=mesh();
  const beforeCenter=new THREE.Vector3();
  [0,1,2,3].forEach(i=>beforeCenter.add(m.vertices[i]));
  beforeCenter.multiplyScalar(.25);
  const info=circleLoopInfo(m,'vertex',[0,1,2,3]);
  const result=circularizeLoop(m,info);
  assert.equal(result.count,4);
  const afterCenter=new THREE.Vector3();
  [0,1,2,3].forEach(i=>afterCenter.add(m.vertices[i]));
  afterCenter.multiplyScalar(.25);
  assert.ok(afterCenter.distanceTo(beforeCenter)<1e-9);
  const radii=[0,1,2,3].map(i=>m.vertices[i].distanceTo(afterCenter));
  assert.ok(Math.max(...radii)-Math.min(...radii)<1e-9);
  assert.ok([0,1,2,3].every(i=>Math.abs(m.vertices[i].z)<1e-9));
});

test('Circle has one authoritative drawer loader and no direct index load',()=>{
  const drawer=fs.readFileSync(new URL('../src/drawer-ui.js',import.meta.url),'utf8');
  const index=fs.readFileSync(new URL('../index.html',import.meta.url),'utf8');
  assert.equal((drawer.match(/component-circle\.js\?v=/g)||[]).length,1);
  assert.doesNotMatch(index,/component-circle\.js\?v=/);
});


test('drawer UI cache key exposes the current dynamic Circle loader',()=>{
  const index=fs.readFileSync(new URL('../index.html',import.meta.url),'utf8');
  assert.match(index,/drawer-ui\.js\?v=0\.36\.18\.333/);
});

test('Circle remains visible for discovery outside supported modes',()=>{
  const ui=fs.readFileSync(new URL('../src/component-circle.js',import.meta.url),'utf8');
  assert.match(ui,/row\.style\.display='';/);
  assert.match(ui,/Circle works in Vertex, Edge or Face mode/);
});


test('333 Circle accepts one selected Face boundary',()=>{
  const m=mesh();
  const info=circleLoopInfo(m,'face',[0]);
  assert.equal(info.ok,true);
  assert.deepEqual(info.ordered,[0,1,2,3]);
});

test('333 Circle refuses multiple selected Faces',()=>{
  const m=mesh();
  m.faces.push([1,2,4]);
  const info=circleLoopInfo(m,'face',[0,1]);
  assert.equal(info.ok,false);
});

test('333 Face Circle UI and loader pins are current',()=>{
  const ui=fs.readFileSync(new URL('../src/component-circle.js',import.meta.url),'utf8');
  const drawer=fs.readFileSync(new URL('../src/drawer-ui.js',import.meta.url),'utf8');
  const index=fs.readFileSync(new URL('../index.html',import.meta.url),'utf8');
  assert.match(ui,/\['vertex','edge','face'\]/);
  assert.match(ui,/component-circle-core\.js\?v=0\.36\.18\.333/);
  assert.match(drawer,/component-circle\.js\?v=0\.36\.18\.333/);
  assert.match(index,/drawer-ui\.js\?v=0\.36\.18\.333/);
});
