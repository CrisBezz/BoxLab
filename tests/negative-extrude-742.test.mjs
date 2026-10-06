import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import * as THREE from 'three';
import {EditableMesh} from '../src/mesh.js';
import {History} from '../src/history.js';
import {installLooseTopology} from '../src/loose-topology.js';
import {buildNegativeExtrude,validateThrough,planThrough} from '../src/through-kernel.js';
import {bands,uploadedFixture,snapshot,volume,faceRuntime} from './helpers/negative-extrude-runtime.mjs';

const cut=(m,ids,d)=>{const before=snapshot(m),r=buildNegativeExtrude(m,ids,d);assert.equal(r.ok,true,r.reason);assert.equal(snapshot(m),before,'source retained');assert.equal(validateThrough(r.mesh).ok,true);assert.ok(volume(r.mesh)>0);return r;};
const near=(a,b)=>assert.ok(Math.abs(a-b)<1e-6,`${a} != ${b}`);

test('742 uploaded geometry reproduces four coplanar overlapping side walls',()=>{
  const after=uploadedFixture(),before=uploadedFixture({before:true});
  assert.equal(validateThrough(after).ok,true,'old edge-manifold gate masks geometric overlap');
  assert.equal(validateThrough(before).ok,true);near(volume(before),8);
  for(const fi of [14,15,18,19,22,23,26,27])assert.ok(after.faces[fi].every(id=>Math.abs(Math.abs(after.vertices[id].z)-1)<1e-8));
  for(const fi of bands)assert.ok(before.faceNormal(fi).dot(new THREE.Vector3(1,0,0))>.999);
});
for(const distance of [-.1,-.5,-1.080418,-2,-2.2])test(`742 four bands finite subtraction ${distance} has exact volume and no triangulation`,()=>{
  const r=cut(uploadedFixture({before:true}),bands,distance);
  near(volume(r.mesh),8-2*Math.min(2,-distance));
  assert.equal(r.mesh.faces.filter(f=>f.length===3).length,0,'rectangular bands need no triangles');
  assert.equal(r.faceIndices.length,distance>-2?4:0);
  const used=new Set(r.mesh.faces.flat());assert.equal(used.size,r.mesh.vertices.length,'no orphan vertices');
  for(const f of r.mesh.faces)assert.ok(r.mesh.faceNormal(r.mesh.faces.indexOf(f)).length()>.99);
});
test('742 side faces contain no material within removed band rectangles',()=>{
  const r=cut(uploadedFixture({before:true}),bands,-1.080418),mesh=r.mesh;
  // Centroids of every planar fragment must lie outside the removed side strips.
  for(const face of mesh.faces){const p=face.map(id=>mesh.vertices[id]);if(!p.every(v=>Math.abs(Math.abs(v.z)-1)<1e-7))continue;const center=p.reduce((s,v)=>s.add(v),new THREE.Vector3()).multiplyScalar(1/p.length);
    for(const lo of [-.75,-.25,.25,.75])assert.ok(!(center.x>-.080418+1e-6&&center.y>lo+1e-6&&center.y<lo+.25-1e-6));}
});
test('742 untouched original polygon remains a polygon with its group',()=>{
  const m=uploadedFixture({before:true});m.faceGroups=m.faces.map((_,i)=>`group ${i}`);const r=cut(m,bands,-1.08);
  assert.ok(r.mesh.faces.some((f,i)=>r.mesh.faceGroups[i]==='group 2'&&f.length>=4&&f.every(id=>Math.abs(r.mesh.vertices[id].x+1)<1e-8)),'one polygon retained, with conforming boundary subdivisions');
  for(const fi of r.faceIndices)assert.ok(bands.map(id=>`group ${id}`).includes(r.mesh.faceGroups[fi]));
  assert.equal(r.mesh.faceGroups.length,r.mesh.faces.length);
});
test('742 enclosed inset creates a shallow recess and a clean full tunnel',()=>{
  const m=EditableMesh.cube(),f=m.faces[1],ids=f.map(id=>{m.vertices.push(m.vertices[id].clone().multiplyScalar(.5).setZ(1));return m.vertices.length-1;});
  m.faces[1]=ids;f.forEach((a,i)=>m.faces.push([a,f[(i+1)%4],ids[(i+1)%4],ids[i]]));
  const recess=cut(m,[1],-.5);near(volume(recess.mesh),7.5);assert.equal(recess.faceIndices.length,1);assert.equal(recess.mesh.faces.filter(f=>f.length===3).length,0);
  const through=cut(m,[1],-2);near(volume(through.mesh),6);assert.equal(through.faceIndices.length,0);
});
test('742 shared-edge coplanar bands subtract as a union',()=>{
  const m=uploadedFixture({before:true}),r=cut(m,[3,6],-.5);near(volume(r.mesh),7.5);
  assert.ok(!r.mesh.faces.some(f=>f.every(id=>Math.abs(r.mesh.vertices[id].y+.5)<1e-7)&&f.some(id=>r.mesh.vertices[id].x>.5+1e-6)),'no internal cutter wall');
});
test('742 corner faces subtract their intersecting swept volumes without internal walls',()=>{
  const m=EditableMesh.cube(),r=cut(m,[1,3],-.5);near(volume(r.mesh),4.5);assert.equal(r.mesh.faces.filter(f=>f.length===3).length,0);
});
test('742 cut remains valid after rotation, translation and scale',()=>{
  const m=uploadedFixture({before:true}),rotation=new THREE.Quaternion().setFromEuler(new THREE.Euler(.3,.7,.2));m.vertices.forEach(v=>v.multiplyScalar(3).applyQuaternion(rotation).add(new THREE.Vector3(4,-2,7)));
  const r=cut(m,bands,-1.080418*3);near(volume(r.mesh),5.839164*27);assert.equal(r.mesh.faces.filter(f=>f.length===3).length,0);
});
test('742 established corner, Loop and Knife Through fixtures use finite cutter successfully',()=>{
  for(const [name,indices] of [['BoxLab-v0.36.14.8-base.obj',[1,2,3]],['BoxLab-v0.36.14.14-base (1).obj',Array.from({length:16},(_,i)=>i)],['BoxLab-v0.36.14.14-base (2).obj',[0,1,2,3]]]){
    const vertices=[],faces=[];for(const line of fs.readFileSync(new URL(`./fixtures/${name}`,import.meta.url),'utf8').split('\n')){const s=line.trim().split(/\s+/);if(s[0]==='v')vertices.push(s.slice(1).map(Number));if(s[0]==='f')faces.push(s.slice(1).map(x=>Number(x)-1));}
    const m=new EditableMesh(vertices,faces);for(const fi of indices){const plan=planThrough(m,fi);assert.equal(plan.ok,true,plan.reason);const r=cut(m,[fi],plan.distance);assert.ok(volume(r.mesh)<volume(m));assert.equal(r.faceIndices.length,0);}
  }
});
test('742 separate source order yields equal volumes',()=>{
  const a=cut(uploadedFixture({before:true}),bands,-1.08),b=cut(uploadedFixture({before:true}),[...bands].reverse(),-1.08);near(volume(a.mesh),volume(b.mesh));assert.equal(a.faceIndices.length,b.faceIndices.length);
});
test('742 surviving creases and loose geometry retain their positions',()=>{
  installLooseTopology(EditableMesh);const m=uploadedFixture({before:true});m.creases.set(m.edgeKey(0,4),.7);m.addLooseVertex(new THREE.Vector3(8,8,8));m.addLooseVertex(new THREE.Vector3(9,8,8));m.addLooseEdge(22,23);
  const r=cut(m,bands,-1.08);assert.ok([...r.mesh.creases.values()].includes(.7));assert.equal(r.mesh.looseEdges.size,1);assert.equal(r.mesh.looseVertices.size,2);
  for(const id of r.mesh.looseVertices)assert.ok(r.mesh.vertices[id].x>=8);
});
test('742 rejection is transactional for invalid input, tiny cut and total solid removal',()=>{
  for(const distance of [0,NaN,-1e-10,-3]){const m=EditableMesh.cube(),s=snapshot(m),h=new History();h.push(m);h.redoStack.push(m.clone());const undo=h.undoStack.length,redo=h.redoStack.length;
    assert.equal(buildNegativeExtrude(m,[1],distance).ok,false);assert.equal(snapshot(m),s);assert.equal(h.undoStack.length,undo);assert.equal(h.redoStack.length,redo);}
  const m=EditableMesh.cube();m.faces.pop();const s=snapshot(m);assert.equal(buildNegativeExtrude(m,[1],-.5).ok,false);assert.equal(snapshot(m),s);
});
test('742 actual Face drag commits once, selects caps and undoes/redoes exact geometry',()=>{
  const m=uploadedFixture({before:true}),s=snapshot(m),runtime=faceRuntime(m,bands);assert.equal(runtime.start(),true);runtime.move(-1.080418);
  assert.equal(runtime.history.undoStack.length,0);assert.equal(runtime.selected().length,4);runtime.finish();
  assert.equal(runtime.history.undoStack.length,1);near(volume(m),5.839164);assert.equal(validateThrough(m).ok,true);assert.equal(runtime.selected().length,4);
  const after=snapshot(m),undone=runtime.history.undo(m);assert.equal(snapshot(undone),s);assert.equal(snapshot(runtime.history.redo(undone)),after);
  assert.ok(runtime.events.some(e=>e.type==='boxlab-face-direct-committed'&&Math.abs(e.detail.value+1.080418)<1e-8));
});
test('742 actual cancelled Face cut restores source, selection and both history stacks',()=>{
  const m=uploadedFixture({before:true}),s=snapshot(m),runtime=faceRuntime(m,bands);runtime.history.redoStack.push(m.clone());runtime.start();runtime.move(-1.08);runtime.finish('pointercancel');
  assert.equal(snapshot(m),s);assert.deepEqual(runtime.selected(),bands);assert.equal(runtime.history.undoStack.length,0);assert.equal(runtime.history.redoStack.length,1);
});
test('742 actual through-cut disarms Face tool and clears disappeared selection',()=>{
  const m=uploadedFixture({before:true}),runtime=faceRuntime(m,bands);runtime.start();runtime.move(-2.2);runtime.finish();assert.equal(runtime.selected().length,0);assert.equal(runtime.api.active(),false);assert.equal(runtime.history.undoStack.length,1);
});
test('742 actual replay uses finite subtraction and preserves source on refusal',()=>{
  const m=uploadedFixture({before:true}),runtime=faceRuntime(m,[3]);assert.equal(runtime.api.replay('extrude',-.5,3),true);near(volume(m),7.75);assert.equal(runtime.history.undoStack.length,1);assert.equal(runtime.selected().length,1);
  const whole=EditableMesh.cube(),s=snapshot(whole),blocked=faceRuntime(whole,[1]);assert.equal(blocked.api.replay('extrude',-3,1),false);assert.equal(snapshot(whole),s);assert.equal(blocked.history.undoStack.length,0);
});
test('742 Exact synthetic pointer path performs four-region cut with one history step',()=>{
  const m=uploadedFixture({before:true}),runtime=faceRuntime(m,bands);runtime.exact(-1.080418);near(volume(m),5.839164);assert.equal(runtime.history.undoStack.length,1);assert.equal(runtime.selected().length,4);assert.equal(validateThrough(m).ok,true);
});
test('742 Exact supports small negative, positive and zero values without changing physical drag origin',()=>{
  for(const [distance,expected,steps] of [[-.01,7.98,1],[.5,9,1],[0,8,0]]){const m=uploadedFixture({before:true}),runtime=faceRuntime(m,bands);runtime.exact(distance);near(volume(m),expected);assert.equal(runtime.history.undoStack.length,steps);}
});
test('742 refused full-solid Exact cut leaves source, selection and redo history intact',()=>{
  const m=EditableMesh.cube(),s=snapshot(m),runtime=faceRuntime(m,[1]);runtime.history.redoStack.push(m.clone());runtime.exact(-3);assert.equal(snapshot(m),s);assert.deepEqual(runtime.selected(),[1]);assert.equal(runtime.history.undoStack.length,0);assert.equal(runtime.history.redoStack.length,1);
});
test('742 physical Pencil press still waits for deliberate drag threshold',()=>{
  const m=uploadedFixture({before:true}),s=snapshot(m),runtime=faceRuntime(m,bands);runtime.smallPhysicalMove();assert.equal(runtime.owner.drag(),null);assert.ok(runtime.api.pending());assert.equal(snapshot(m),s);assert.equal(runtime.history.undoStack.length,0);
});
test('742 positive band extrusion retains connected-miter path',()=>{
  const m=uploadedFixture({before:true}),runtime=faceRuntime(m,bands);runtime.start();runtime.move(.5);runtime.finish();near(volume(m),9);assert.equal(runtime.history.undoStack.length,1);assert.equal(runtime.api.active(),true);
});
test('742 drag direction reversal replaces private cut preview and cancellation restores groups',()=>{
  const m=uploadedFixture({before:true});m.faceGroups=m.faces.map((_,i)=>`group ${i}`);const s=snapshot(m),runtime=faceRuntime(m,bands);runtime.start();runtime.move(-.5);near(volume(m),7);runtime.move(.5);near(volume(m),9);runtime.move(-1.08);near(volume(m),5.84);runtime.finish('pointercancel');assert.equal(snapshot(m),s);assert.equal(runtime.history.undoStack.length,0);
});
test('742 Add Vertex real splitter replaces manifold, boundary and loose edges with two children',()=>{
  const source=fs.readFileSync(new URL('../src/add-vertex-edge-snap.js',import.meta.url),'utf8'),start=source.indexOf('function splitFaceEdge('),end=source.indexOf('function addLooseVertex('),split=Function(source.slice(start,end)+';return splitEdge;')();
  for(const kind of ['manifold','boundary','loose']){
    const m=kind==='manifold'?EditableMesh.cube():new EditableMesh([[0,0,0],[2,0,0],[2,2,0],[0,2,0]],kind==='boundary'?[[0,1,2,3]]:[]);
    if(kind==='loose')m.addLooseEdge(0,1);const edge=m.edges()[0],key=m.edgeKey(edge.a,edge.b);m.creases.set(key,.7);const r=split(m,0,.5),edges=m.edges(),keys=edges.map(e=>m.edgeKey(e.a,e.b));
    assert.ok(!keys.includes(key));assert.ok(keys.includes(m.edgeKey(r.a,r.vertex)));assert.ok(keys.includes(m.edgeKey(r.vertex,r.b)));assert.equal(m.creases.get(m.edgeKey(r.a,r.vertex)),.7);assert.equal(m.creases.get(m.edgeKey(r.vertex,r.b)),.7);
    for(const fi of edge.faces.filter(i=>i>=0))assert.ok(m.faces[fi].includes(r.vertex));
    if(kind==='boundary'){
      const lines=edges.map((e,i)=>{const line=new THREE.Line(new THREE.BufferGeometry().setFromPoints([m.vertices[e.a],m.vertices[e.b]]),new THREE.LineBasicMaterial());line.userData.index=i;return line;});
      const ray=new THREE.Raycaster();ray.params.Line.threshold=.01;
      for(const x of [.5,1.5]){ray.set(new THREE.Vector3(x,0,5),new THREE.Vector3(0,0,-1));const hits=ray.intersectObjects(lines);assert.equal(hits.length,1);assert.ok(edges[hits[0].object.userData.index].a===r.vertex||edges[hits[0].object.userData.index].b===r.vertex);}
      assert.notEqual(edges.findIndex(e=>m.edgeKey(e.a,e.b)===m.edgeKey(r.a,r.vertex)),edges.findIndex(e=>m.edgeKey(e.a,e.b)===m.edgeKey(r.vertex,r.b)));
      for(const line of lines){line.geometry.dispose();line.material.dispose();}
    }
  }
});
