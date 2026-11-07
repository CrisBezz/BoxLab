import test from 'node:test';
import assert from 'node:assert/strict';
import * as THREE from 'three';
import fs from 'node:fs';
import {buildRevolveFromPoints} from '../src/revolve-core.js';

const ui=fs.readFileSync(new URL('../src/revolve-profile.js',import.meta.url),'utf8');

function sharedEdgeDirections(mesh){
  const owners=new Map();
  mesh.faces.forEach((face,fi)=>{
    for(let i=0;i<face.length;i++){
      const a=face[i],b=face[(i+1)%face.length],key=a<b?`${a}:${b}`:`${b}:${a}`;
      if(!owners.has(key))owners.set(key,[]);
      owners.get(key).push({fi,a,b});
    }
  });
  return [...owners.values()].filter(list=>list.length===2);
}

test('389 new construction starts positioned before profile editing',()=>{
  assert.match(ui,/points:\[\],segments:24,edit:false/);
  assert.match(ui,/position\/snap the plane first/);
});

test('389 touch remains navigation while Pencil or mouse edits profile',()=>{
  const begin=ui.slice(ui.indexOf('function beginProfilePointer'),ui.indexOf('function moveProfilePointer'));
  assert.match(begin,/if\(event\.pointerType==='touch'\)return/);
  assert.doesNotMatch(begin,/controls\.enabled=false.*touch/s);
});

test('389 Segments minimum is 3',()=>{
  assert.match(ui,/min="3" max="64"/);
  assert.match(ui,/Math\.max\(3,Math\.min\(64/);
  const r=buildRevolveFromPoints([new THREE.Vector3(1,0,0),new THREE.Vector3(1,1,0)],{
    axisOrigin:new THREE.Vector3(),axisDirection:new THREE.Vector3(0,1,0),segments:3
  });
  assert.equal(r.ok,true,r.reason);
  assert.equal(r.segments,3);
  assert.equal(r.faces,3);
});

test('389 concave revolve uses unified winding across shared edges',()=>{
  const points=[
    new THREE.Vector3(0,0,0),
    new THREE.Vector3(1.3,.35,0),
    new THREE.Vector3(.55,.8,0),
    new THREE.Vector3(1.2,1.25,0),
    new THREE.Vector3(.7,1.8,0),
    new THREE.Vector3(0,2.1,0)
  ];
  const r=buildRevolveFromPoints(points,{
    axisOrigin:new THREE.Vector3(),axisDirection:new THREE.Vector3(0,1,0),segments:12
  });
  assert.equal(r.ok,true,r.reason);
  const shared=sharedEdgeDirections(r.mesh);
  assert.ok(shared.length>0);
  for(const owners of shared){
    const [a,b]=owners;
    assert.equal(a.a===b.b&&a.b===b.a,true,`shared edge winding mismatch faces ${a.fi}/${b.fi}`);
  }
});

test('389 core no longer independently flips every face away from axis',()=>{
  const core=fs.readFileSync(new URL('../src/revolve-core.js',import.meta.url),'utf8');
  assert.match(core,/unifyFaceWinding/);
  assert.doesNotMatch(core,/faces\.push\(orientOutward/);
});
