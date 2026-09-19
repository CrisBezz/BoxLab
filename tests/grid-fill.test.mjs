import test from 'node:test';
import assert from 'node:assert/strict';
import * as THREE from 'three';
import fs from 'node:fs';
import {gridFillPlan,applyGridFill} from '../src/grid-fill-core.js';

function makeLoop(points){
  const vertices=points.map(([x,y,z=0])=>new THREE.Vector3(x,y,z));
  const edgeList=vertices.map((_,i)=>({a:i,b:(i+1)%vertices.length,faces:[],loose:true}));
  return{
    vertices,
    faces:[],
    creases:new Map(),
    looseEdges:new Set(edgeList.map(e=>e.a<e.b?`${e.a}:${e.b}`:`${e.b}:${e.a}`)),
    looseVertices:new Set(),
    edges(){return edgeList;},
    edgeKey(a,b){return a<b?`${a}:${b}`:`${b}:${a}`;}
  };
}
function twoByTwo(){
  return makeLoop([
    [0,0],[1,0],[2,0],[2,1],
    [2,2],[1,2],[0,2],[0,1]
  ]);
}

test('338 Grid Fill recognizes a four-sided 2x2 segmented boundary',()=>{
  const m=twoByTwo();
  const plan=gridFillPlan(m,[0,1,2,3,4,5,6,7]);
  assert.equal(plan.ok,true);
  assert.equal(plan.uSegments,2);
  assert.equal(plan.vSegments,2);
  assert.deepEqual(plan.segments,[2,2,2,2]);
});

test('338 Grid Fill creates four quads and one interior vertex for a 2x2 patch',()=>{
  const m=twoByTwo();
  const before=m.vertices.map(v=>v.clone());
  const plan=gridFillPlan(m,[0,1,2,3,4,5,6,7]);
  const result=applyGridFill(m,plan);
  assert.equal(result.quads,4);
  assert.equal(result.vertexIndices.length,1);
  assert.equal(m.vertices.length,9);
  assert.equal(m.faces.length,4);
  assert.ok(m.faces.every(face=>face.length===4&&new Set(face).size===4));
  assert.ok(m.vertices[8].distanceTo(new THREE.Vector3(1,1,0))<1e-9);
  for(let i=0;i<8;i++)assert.ok(m.vertices[i].distanceTo(before[i])<1e-12);
  assert.equal(m.looseEdges.size,0);
});

test('338 Grid Fill rejects mismatched opposite side segment counts',()=>{
  const m=makeLoop([
    [0,0],[1,0],[2,0],[3,0],[3,2],
    [1.5,2],[0,2],[0,1]
  ]);
  const plan=gridFillPlan(m,[0,1,2,3,4,5,6,7]);
  assert.equal(plan.ok,false);
  assert.match(plan.reason,/Opposite Grid Fill sides/);
});

test('338 Grid Fill leaves simple four-edge cap to existing Fill',()=>{
  const m=makeLoop([[0,0],[2,0],[2,2],[0,2]]);
  const plan=gridFillPlan(m,[0,1,2,3]);
  assert.equal(plan.ok,false);
  assert.match(plan.reason,/at least 6 edges|Use Fill/);
});

test('338 Grid Fill has one authoritative dynamic loader and sits beside Fill',()=>{
  const ui=fs.readFileSync(new URL('../src/grid-fill.js',import.meta.url),'utf8');
  const drawer=fs.readFileSync(new URL('../src/drawer-ui.js',import.meta.url),'utf8');
  const index=fs.readFileSync(new URL('../index.html',import.meta.url),'utf8');
  assert.match(ui,/#fillFaceBtn/);
  assert.match(ui,/fillButton\.insertAdjacentElement\('afterend',button\)/);
  assert.match(ui,/repeat\(3,minmax\(0,1fr\)\)/);
  assert.equal((drawer.match(/grid-fill\.js\?v=0\.36\.18\.338/g)||[]).length,1);
  assert.match(index,/drawer-ui\.js\?v=/);
  assert.doesNotMatch(index,/grid-fill\.js\?v=/);
});
