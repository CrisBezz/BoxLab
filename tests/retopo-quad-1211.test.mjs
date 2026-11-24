import test from 'node:test';import assert from 'node:assert/strict';import * as THREE from 'three';
import {EditableMesh} from '../src/mesh.js';import {installLooseTopology} from '../src/loose-topology.js';import {buildRetopoQuad} from '../src/retopo-quad.js';
import {fixture} from './helpers/retopo-runtime.mjs';
installLooseTopology(EditableMesh);
const point=(x,y,z=1)=>({index:null,point:new THREE.Vector3(x,y,z)}),index=i=>({index:i}),normal=new THREE.Vector3(0,0,1);
test('Retopo builds a private native quad and reuses shared boundary vertices with opposite winding',()=>{
 const source=new EditableMesh([],[]),first=buildRetopoQuad(source,[point(0,0),point(1,0),point(1,1),point(0,1)],normal);assert.equal(first.ok,true);assert.equal(source.vertices.length,0);assert.equal(first.mesh.faces.length,1);assert.equal(first.mesh.looseVertices.size,0);
 const before=JSON.stringify(first.mesh),second=buildRetopoQuad(first.mesh,[index(1),point(2,0),point(2,1),index(2)],normal);assert.equal(second.ok,true);assert.equal(JSON.stringify(first.mesh),before);assert.equal(second.mesh.vertices.length,6);assert.equal(second.mesh.faces.length,2);
 const edge=second.mesh.edges().find(e=>e.a===1&&e.b===2);assert.equal(edge.faces.length,2);assert.equal(second.mesh.faceGroups.length,2);
});
test('duplicate, crossed, collinear, invalid and third-owner faces refuse without source changes',()=>{
 const source=new EditableMesh([],[]);
 for(const corners of [[point(0,0),point(1,1),point(0,1),point(1,0)],[point(0,0),point(1,0),point(2,0),point(3,0)],[point(0,0),point(1,0),point(NaN,1),point(0,1)]])assert.equal(buildRetopoQuad(source,corners,normal).ok,false);
 const first=buildRetopoQuad(source,[point(0,0),point(1,0),point(1,1),point(0,1)],normal).mesh,before=JSON.stringify(first);
 assert.equal(buildRetopoQuad(first,[index(0),index(1),index(2),index(3)],normal).ok,false);assert.equal(buildRetopoQuad(first,[index(0),index(0),index(2),index(3)],normal).ok,false);assert.equal(JSON.stringify(first),before);
 const second=buildRetopoQuad(first,[index(1),point(2,0),point(2,1),index(2)],normal).mesh,old=JSON.stringify(second);
 assert.equal(buildRetopoQuad(second,[index(1),point(3,0),point(3,1),index(2)],normal).ok,false);assert.equal(JSON.stringify(second),old);
});
test('actual Quad tool stages corners without edits, commits one face, shares vertices, and supports Undo/Redo',()=>{
 const f=fixture(),original=JSON.stringify(f.objects[0].mesh);f.api.start();f.field('#retopoQuad').click();
 const tap=(x,y)=>{f.pointer('pointerdown',x,y);f.pointer('pointerup',x,y);};
 tap(340,450);tap(400,450);tap(400,390);assert.equal(f.objects.length,1);assert.equal(f.h.undoStack.length,0);tap(340,390);
 assert.equal(f.api.active,true);assert.equal(f.objects.length,2);assert.equal(f.state.mesh.faces.length,1);assert.equal(f.state.mesh.vertices.length,4);assert.equal(f.h.undoStack.length,1);assert.equal(JSON.stringify(f.objects[0].mesh),original);
 tap(400,450);tap(460,450);tap(460,390);tap(400,390);assert.equal(f.state.mesh.faces.length,2);assert.equal(f.state.mesh.vertices.length,6);assert.equal(f.h.undoStack.length,2);
 f.history('undo');assert.equal(f.state.mesh.faces.length,1);f.history('redo');assert.equal(f.state.mesh.faces.length,2);
 f.api.close();assert.equal(JSON.stringify(f.objects[0].mesh),original);
});
test('Clear corners and tool switches discard partial quads without geometry/history; original vertex editing remains',()=>{
 const f=fixture();f.api.start();f.field('#retopoQuad').click();f.pointer('pointerdown',340,450);f.pointer('pointerup',340,450);f.field('#retopoClear').click();assert.equal(f.objects.length,1);assert.equal(f.h.undoStack.length,0);
 f.field('#retopoVertex').click();f.pointer('pointerdown');f.pointer('pointerup');assert.equal(f.state.mesh.vertices.length,1);assert.equal(f.state.mesh.faces.length,0);
});

test('Quad defaults to one closed stroke, snaps to the source, and commits one undo step',()=>{
 const f=fixture(),source=JSON.stringify(f.objects[0].mesh);
 f.api.start();
 assert.equal(f.field('#retopoQuad').attributes.get('aria-pressed'),'true');
 const stroke=(type='pointerup',end=[400,450])=>{
   f.pointer('pointerdown',400,450);
   for(const [x,y] of [[460,450],[460,350],[340,350],[340,450]])f.pointer('pointermove',x,y);
   assert.equal(f.objects.length,1);
   f.pointer(type,...end);
 };
 stroke('pointercancel');
 stroke('pointerup',[340,450]);
 assert.equal(f.h.undoStack.length,0);
 stroke();
 assert.equal(f.state.mesh.faces.length,1);
 assert.equal(f.state.mesh.vertices.length,4);
 assert.equal(f.h.undoStack.length,1);
 assert.equal(JSON.stringify(f.objects[0].mesh),source);
 f.history('undo');
 assert.equal(f.objects.length,1);
 f.history('redo');
 assert.equal(f.state.mesh.faces.length,1);
});
