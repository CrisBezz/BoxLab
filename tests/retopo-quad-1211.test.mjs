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

test('open strokes reuse one or two real boundary edges on Pencil lift',()=>{
 const f=fixture(),source=JSON.stringify(f.objects[0].mesh);
 f.api.start();
 function stroke(points){
   f.pointer('pointerdown',...points[0]);
   for(const point of points.slice(1,-1))f.pointer('pointermove',...point);
   f.pointer('pointerup',...points.at(-1));
 }
 stroke([[340,440],[400,440],[400,390],[340,390],[340,440]]);
 stroke([[402,441],[430,443],[457,440],[460,410],[460,389],[404,387]]);
 assert.equal(f.state.mesh.faces.length,2);
 assert.equal(f.state.mesh.vertices.length,6);
 stroke([[401,392],[400,340],[340,340],[338,387]]);
 assert.equal(f.state.mesh.faces.length,3);
 assert.equal(f.state.mesh.vertices.length,8);
 stroke([[401,342],[426,336],[460,340],[463,365],[462,388]]);
 assert.equal(f.state.mesh.faces.length,4);
 assert.equal(f.state.mesh.vertices.length,9);
 assert.equal(f.state.mesh.edges().filter(edge=>edge.faces.length===2).length,4);
 assert.equal(f.h.undoStack.length,4);
 f.history('undo');assert.equal(f.state.mesh.faces.length,3);
 f.history('redo');assert.equal(f.state.mesh.faces.length,4);
 assert.equal(JSON.stringify(f.objects[0].mesh),source);
});

function gestureFixture(){
 const f=fixture();
 f.api.start();
 const stroke=points=>{
   f.pointer('pointerdown',...points[0]);
   for(const p of points.slice(1,-1))f.pointer('pointermove',...p);
   f.pointer('pointerup',...points.at(-1));
 };
 const cell=(x,y,width=32,height=32)=>{
   for(const p of [[x,y],[x+width,y],[x+width,y+height],[x,y+height]])stroke([p,p]);
 };
 return {f,stroke,cell};
}

test('one line completes a three-edge gap and a cross fills an enclosed quad',()=>{
 const {f,stroke,cell}=gestureFixture();
 cell(352,384);cell(384,352);cell(416,384);
 const before=f.state.mesh.vertices.length;
 stroke([[385,415],[400,416],[415,415]]);
 assert.equal(f.state.mesh.faces.length,4);
 assert.equal(f.state.mesh.vertices.length,before);
 f.history('undo');
 cell(384,416);
 const enclosed=f.state.mesh.vertices.length;
 stroke([[389,389],[411,411],[389,411],[411,389]]);
 assert.equal(f.state.mesh.faces.length,5);
 assert.equal(f.state.mesh.vertices.length,enclosed);
 f.history('undo');assert.equal(f.state.mesh.faces.length,4);
});

test('a single ribbon outline carries five existing boundary segments into five welded quads',()=>{
 const {f,stroke,cell}=gestureFixture();
 for(let i=0;i<5;i++)cell(320+i*32,404);
 assert.equal(f.state.mesh.faces.length,5);
 stroke([[321,403],[320,369],[355,366],[390,367],[428,366],[480,370],[479,404]]);
 assert.equal(f.state.mesh.faces.length,10);
 assert.equal(f.state.mesh.vertices.length,18);
 assert.equal(f.state.mesh.edges().filter(edge=>edge.faces.length===2).length,13);
 f.history('undo');assert.equal(f.state.mesh.faces.length,5);
 f.history('redo');assert.equal(f.state.mesh.faces.length,10);
});

test('a continuous X deletes an existing quad in one undoable edit',()=>{
 const {f,stroke,cell}=gestureFixture();
 cell(384,384);
 stroke([[389,389],[411,411],[389,411],[411,389]]);
 assert.equal(f.state.mesh.faces.length,0);
 assert.equal(f.state.mesh.vertices.length,0);
 f.history('undo');assert.equal(f.state.mesh.faces.length,1);
 f.history('redo');assert.equal(f.state.mesh.faces.length,0);
});

test('a deep U from one existing edge extends a one-quad-wide ribbon',()=>{
 const {f,stroke,cell}=gestureFixture();
 cell(384,400);
 stroke([[384,400],[384,304],[416,304],[416,400]]);
 assert.equal(f.state.mesh.faces.length,4);
 assert.equal(f.state.mesh.vertices.length,10);
 f.history('undo');assert.equal(f.state.mesh.faces.length,1);
});

test('two drawn sides fill a 3 by 5 patch using both existing boundary runs',()=>{
 const {f,stroke,cell}=gestureFixture();
 for(let j=0;j<5;j++)cell(319,351+j*24,24,24);
 for(let i=0;i<3;i++)cell(343+i*24,471,24,24);
 assert.equal(f.state.mesh.faces.length,8);
 stroke([[343,351],[415,351],[415,471]]);
 assert.equal(f.state.mesh.faces.length,23);
 assert.equal(f.state.mesh.faces.every(face=>face.length===4),true);
 f.history('undo');assert.equal(f.state.mesh.faces.length,8);
 f.history('redo');assert.equal(f.state.mesh.faces.length,23);
});

test('sideways ribbons extend beyond sixteen segments and retain every existing segment',()=>{
 const {f,stroke,cell}=gestureFixture();
 f.state.camera.fov=20;f.state.camera.updateProjectionMatrix();
 for(let i=0;i<17;i++)cell(196+i*24,410,24,24);
 assert.equal(f.state.mesh.faces.length,17);
 stroke([[196,410],[196,384],[604,384],[604,410]]);
 assert.equal(f.state.mesh.faces.length,34);
 assert.equal(f.state.mesh.vertices.length,54);
 f.history('undo');assert.equal(f.state.mesh.faces.length,17);
});

test('Relax brushes a distorted quad patch on a curved reference with one Undo',()=>{
 const f=fixture();
 const vertices=[];
 for(const y of [-1,0,1]){
   for(const x of [-1,0,1])vertices.push(new THREE.Vector3(x,y,.45-.15*x*x-.1*y*y));
 }
 const faces=[[0,1,4,3],[1,2,5,4],[3,4,7,6],[4,5,8,7]];
 f.state.mesh=new EditableMesh(vertices,faces);
 const source=JSON.stringify(f.state.mesh.clone());
 f.api.start();
 const points=[[350,350],[400,350],[450,350],[350,400],[420,409],[450,400],[350,450],[400,450],[450,450]];
 for(const face of faces){
   for(const index of face){
     f.pointer('pointerdown',...points[index]);
     f.pointer('pointerup',...points[index]);
   }
 }
 const mesh=f.state.mesh, before=mesh.vertices.map(vertex=>vertex.clone()),count=f.h.undoStack.length;
 assert.equal(mesh.faces.length,4);
 const interior=mesh.edges().filter(edge=>edge.faces.length===2).flatMap(edge=>[edge.a,edge.b])
   .find(index=>mesh.faces.every(face=>face.includes(index)));
 f.field('#retopoRelax').click();
 f.pointer('pointerdown',406,411);f.pointer('pointermove',431,409);f.pointer('pointercancel',433,409);
 assert.deepEqual(mesh.vertices,before);
 f.pointer('pointerdown',406,411);f.pointer('pointermove',431,409);f.pointer('pointerup',433,409);
 assert.equal(f.h.undoStack.length,count+1);
 assert.ok(mesh.vertices[interior].x<before[interior].x);
 const moved=mesh.vertices[interior];
 assert.ok(Math.abs(moved.z-(.45-.15*Math.abs(moved.x)-.1*Math.abs(moved.y)))<1e-6);
 mesh.vertices.forEach((vertex,index)=>{if(index!==interior)assert.deepEqual(vertex,before[index]);});
 assert.equal(JSON.stringify(f.objects[0].mesh),source);
 f.history('undo');assert.deepEqual(f.state.mesh.vertices,before);
 f.history('redo');assert.deepEqual(f.state.mesh.vertices[interior],moved);
});

test('a Retopo stroke cuts three quads with one welded edge chain and one Undo',()=>{
 const {f,stroke,cell}=gestureFixture();
 for(let i=0;i<3;i++)cell(352+i*32,384);
 const before=JSON.stringify(f.state.mesh);
 stroke([[353,398],[398,400],[446,402]]);
 assert.equal(f.state.mesh.faces.length,6);
 assert.equal(f.state.mesh.vertices.length,12);
 assert.equal(f.state.mesh.faces.every(face=>face.length===4),true);
 const newPoints=f.state.mesh.vertices.slice(8);
 assert.ok(newPoints.every(point=>Math.abs(point.z-f.state.mesh.vertices[0].z)<1e-7));
 stroke([[398,385],[399,400],[399,416]]);
 assert.equal(f.state.mesh.faces.length,8);
 f.history('undo'); assert.equal(f.state.mesh.faces.length,6);
 f.history('undo'); assert.equal(JSON.stringify(f.state.mesh),before);
});

test('a deep sideways outline builds two evenly spaced rows rather than long narrow quads',()=>{
 const {f,stroke,cell}=gestureFixture();
 for(let i=0;i<3;i++)cell(352+i*32,402);
 stroke([[352,402],[351,338],[385,336],[422,342],[448,338],[448,402]]);
 const mesh=f.state.mesh;
 assert.equal(mesh.faces.length,9);
 assert.ok(mesh.faces.slice(3).every(face=>{
   const lengths=face.map((v,i)=>mesh.vertices[v].distanceTo(mesh.vertices[face[(i+1)%4]]));
   return Math.max(...lengths)/Math.min(...lengths)<1.25;
 }));
});

test('a snapped outline cannot bridge a hole in the reference',()=>{
 const f=fixture();
 const vertices=[[-1,-1],[1,-1],[1,1],[-1,1],[-.15,-.15],[.15,-.15],[.15,.15],[-.15,.15]]
   .map(([x,y])=>new THREE.Vector3(x,y,0));
 f.state.mesh=new EditableMesh(vertices,[[0,1,5,4],[1,2,6,5],[2,3,7,6],[3,0,4,7]]);
 f.api.start();
 f.pointer('pointerdown',350,350);
 for(const point of [[450,350],[450,450],[350,450]])f.pointer('pointermove',...point);
 f.pointer('pointerup',350,350);
 assert.equal(f.objects.length,1);
 assert.equal(f.h.undoStack.length,0);
 assert.match(f.field('#selectionStatus').textContent,/could not place/);
});

test('inconsistent reference winding still produces a front-facing snapped quad',()=>{
 const f=fixture();
 f.state.mesh=new EditableMesh([[-1,-1],[-1,1],[1,1],[1,-1]].map(([x,y])=>new THREE.Vector3(x,y,0)),[[0,1,2,3]]);
 f.api.start();
 for(const point of [[360,360],[440,360],[440,440],[360,440]]){
   f.pointer('pointerdown',...point);f.pointer('pointerup',...point);
 }
 const mesh=f.state.mesh;
 assert.equal(mesh.faces.length,1);
 const [a,b,c]=mesh.faces[0].map(index=>mesh.vertices[index]);
 assert.ok(b.clone().sub(a).cross(c.clone().sub(a)).z>0);
 assert.ok(mesh.vertices.every(point=>Math.abs(point.z)<1e-8));
});

test('welding to a reversed boundary cannot commit an inside-out extension',()=>{
 const {f,stroke,cell}=gestureFixture();
 cell(384,384);
 f.state.mesh.faces[0].reverse();
 const geometry=()=>JSON.stringify([f.state.mesh.vertices,f.state.mesh.faces]);
 const before=geometry(),steps=f.h.undoStack.length;
 stroke([[416,384],[448,384],[448,416],[416,416]]);
 assert.equal(geometry(),before);
 assert.equal(f.h.undoStack.length,steps);
 assert.match(f.field('#selectionStatus').textContent,/could not place/);
});
