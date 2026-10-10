import test from 'node:test';
import assert from 'node:assert/strict';
import * as THREE from 'three';
import fs from 'node:fs';
import {revolveRuntime} from './helpers/revolve-runtime.mjs';
import {snapshot} from './helpers/negative-extrude-runtime.mjs';
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

function currentEditing(sourceTransform){
  const f=revolveRuntime(sourceTransform);
  const object=f.add(),meta=object.revolveProfile;
  assert.equal(meta.edit,true,'new construction starts editing');
  assert.equal(meta.segments,24);
  assert.equal(f.session().id,'revolve-profile');
  assert.equal(f.fields.get('#revolveProfileEditBtn').textContent,'Editing Profile');
  const plane=snapshot(f.state.mesh),depth=f.history.undoStack.length;
  f.tap(new THREE.Vector3(0,-1,0),{pointerType:'touch'});
  assert.equal(meta.points.length,0,'touch yields to navigation');
  assert.equal(f.state.controls.enabled,true);
  f.tap(new THREE.Vector3(0,-1,0));
  f.tap(new THREE.Vector3(0,1,0));
  assert.equal(meta.points.length,2,'Pencil authors plane-relative points');
  assert.equal(snapshot(f.state.mesh),plane,'preview leaves construction unchanged');
  assert.equal(f.history.undoStack.length,depth);
  assert.equal(f.state.controls.enabled,true);
  f.click('#revolveProfileEditBtn');f.frame();
  assert.equal(meta.edit,false,'editing can yield to Object positioning');
  const points=JSON.stringify(meta.points);
  const event=f.pointer('pointerdown',new THREE.Vector3(1,0,0));
  assert.equal(event.prevented,undefined,'nonediting Pencil yields');
  f.pointer('pointerup',new THREE.Vector3(1,0,0));
  assert.equal(JSON.stringify(meta.points),points);
  f.state.mesh.vertices.forEach(v=>v.x+=1);f.frame();
  assert.equal(JSON.stringify(meta.points),points,'plane-relative points survive reposition');
  assert.equal(f.session().id,'revolve-profile');
  f.click('#revolveProfileEditBtn');f.frame();
  assert.equal(meta.edit,true);
  f.tap(new THREE.Vector3(1.5,1.5,0));
  assert.equal(meta.points.length,3);
  const beforeApply=snapshot(f.state.mesh);
  f.click('#revolveProfileApplyBtn');f.frame();
  assert.equal(f.owner.active,false);
  assert.equal(f.session(),null);
  assert.equal(meta.edit,false);
  assert.equal(meta.applied,true);
  assert.equal(f.selected(),object.id);
  assert.equal(f.saved(),1);
  assert.equal(f.history.undoStack.length,depth+1);
  assert.ok(f.state.mesh.faces.length>1);
  // Mesh.clone normalizes missing Facegroup slots to null, matching history.
  const afterApply=snapshot(f.state.mesh.clone()),undo=f.history.undo(f.state.mesh);
  assert.equal(snapshot(undo),beforeApply);
  assert.equal(snapshot(f.history.redo(undo)),afterApply);
  assert.equal(f.launchRow().hidden,false);
}

test('389 current construction starts editing and can yield for plane positioning',()=>currentEditing());

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


test('788 current Revolve contract rejects retired default',()=>{
 let changed=false;
 assert.throws(()=>currentEditing((source,name)=>{
  if(name!=='revolve-profile.js')return source;
  const needle='points:[],segments:24,edit:true,applied:false,pointHistory:[],selectedPoint:null,interacted:true';
  assert.ok(source.includes(needle));changed=true;
  return source.replace(needle,'points:[],segments:24,edit:false,applied:false,pointHistory:[],selectedPoint:null,interacted:true');
 }),/new construction starts editing/);
 assert.equal(changed,true);
});
