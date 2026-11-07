import test from 'node:test';
import assert from 'node:assert/strict';
import * as THREE from 'three';
import {EditableMesh} from '../src/mesh.js';
import {installLooseTopology} from '../src/loose-topology.js';
import {analyzeRevolveInput,buildRevolveMesh} from '../src/revolve-core.js';

installLooseTopology(EditableMesh);

function profile(points,edges){
  const m=new EditableMesh(points.map(p=>new THREE.Vector3(...p)),[]);
  m.looseEdges=new Set();m.looseVertices=new Set(points.map((_,i)=>i));
  for(const [a,b] of edges)m.addLooseEdge(a,b);
  return m;
}
function selectedAll(m){return m.edges().map((e,i)=>e.loose?i:null).filter(Number.isInteger);}

test('386 simple Y-axis profile revolves into quads',()=>{
  const m=profile([[1,-1,0],[1,0,0],[.5,1,0]],[[0,1],[1,2]]);
  const r=buildRevolveMesh(m,selectedAll(m),{axis:'y',origin:new THREE.Vector3(),segments:12});
  assert.equal(r.ok,true,r.reason);
  assert.equal(r.faces,24);
  assert.equal(r.vertices,36);
  assert.equal(r.closedEnds.start,false);
  assert.equal(r.closedEnds.end,false);
});

test('386 endpoint on axis collapses to one pole',()=>{
  const m=profile([[0,-1,0],[1,0,0],[1,1,0]],[[0,1],[1,2]]);
  const r=buildRevolveMesh(m,selectedAll(m),{axis:'y',origin:new THREE.Vector3(),segments:16});
  assert.equal(r.ok,true,r.reason);
  assert.equal(r.closedEnds.start,true);
  assert.equal(r.vertices,33);
  assert.equal(r.faces,32);
});

test('386 branches reject transactionally',()=>{
  const m=profile([[1,-1,0],[1,0,0],[1,1,0],[2,0,0]],[[0,1],[1,2],[1,3]]);
  const before=JSON.stringify({v:m.vertices.map(v=>v.toArray()),f:m.faces,e:[...m.looseEdges]});
  const r=buildRevolveMesh(m,selectedAll(m),{axis:'y',origin:new THREE.Vector3(),segments:12});
  assert.equal(r.ok,false);
  assert.match(r.reason,/branch/i);
  assert.equal(JSON.stringify({v:m.vertices.map(v=>v.toArray()),f:m.faces,e:[...m.looseEdges]}),before);
});

test('386 closed loose loop rejects',()=>{
  const m=profile([[1,-1,0],[2,0,0],[1,1,0]],[[0,1],[1,2],[2,0]]);
  const r=analyzeRevolveInput(m,selectedAll(m),{axis:'y',origin:new THREE.Vector3(),segments:12});
  assert.equal(r.ok,false);
  assert.match(r.reason,/open chain/i);
});

test('386 partial profile selection rejects',()=>{
  const m=profile([[1,-1,0],[1,0,0],[1,1,0]],[[0,1],[1,2]]);
  const all=selectedAll(m);
  const r=analyzeRevolveInput(m,[all[0]],{axis:'y',origin:new THREE.Vector3(),segments:12});
  assert.equal(r.ok,false);
  assert.match(r.reason,/entire/i);
});
