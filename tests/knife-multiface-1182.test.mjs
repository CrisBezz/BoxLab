import test from 'node:test';
import assert from 'node:assert/strict';
import * as THREE from 'three';
import {EditableMesh} from './helpers/modelling-combinations-runtime.mjs';
import {knifeScreenRuntime} from './helpers/knife-screen-runtime.mjs';
const snapshot=m=>({v:m.vertices.map(v=>v.toArray()),f:m.faces.map(f=>[...f]),g:[...m.faceGroups],c:[...m.creases]});
function fixture(kind='orthographic'){
 const vertices=[];for(const y of [-1,1])for(const x of [-1.5,-.5,.5,1.5])vertices.push(new THREE.Vector3(x,y,0));
 const mesh=new EditableMesh(vertices,[[0,1,5,4],[1,2,6,5],[2,3,7,6]],null,['A','B','C']);
 const camera=kind==='perspective'?new THREE.PerspectiveCamera(45,1,.1,100):new THREE.OrthographicCamera(-2,2,2,-2,.1,100);camera.position.z=8;camera.updateMatrixWorld();return{mesh,f:knifeScreenRuntime(mesh,camera)};
}
for(const kind of ['orthographic','perspective'])test(`1182 ${kind} straight Knife crosses two shared edges, keeps facegroups/creases and one Undo`,()=>{
 const {mesh,f}=fixture(kind);mesh.creases.set(mesh.edgeKey(1,5),.7);const before=snapshot(mesh);
 const a=f.point(0,4,.4),b=f.point(3,7,.65);a.x+=2;b.x-=2;
 f.arm();f.pointer('pointerdown',a);f.pointer('pointermove',b);f.pointer('pointerup',b);
 assert.equal(f.ctx.__boxlabHistory.undoStack.length,1,f.node('#selectionStatus').textContent);assert.equal(mesh.faces.length,6);assert.equal(mesh.vertices.length,12);assert.equal(mesh.faceGroups.filter(g=>g==='A').length,2);assert.equal(mesh.faceGroups.filter(g=>g==='B').length,2);assert.equal(mesh.faceGroups.filter(g=>g==='C').length,2);assert.equal([...mesh.creases.values()].filter(v=>v===.7).length,2);
 assert(mesh.edges().every(e=>e.faces.length<=2));const after=snapshot(mesh),undo=f.ctx.__boxlabHistory.undo(mesh);assert.deepEqual(snapshot(undo),before);assert.deepEqual(snapshot(f.ctx.__boxlabHistory.redo(undo)),after);
});

test('1182 vertex endpoints and midpoint inference both work across a three-face strip',()=>{
 for(const vertices of [false,true]){const {mesh,f}=fixture();f.node('#inferenceSnapToggle').checked=true;
 const a=vertices?f.screen(mesh.vertices[0]):f.point(0,4,.5),b=vertices?f.screen(mesh.vertices[7]):f.point(3,7,.5);a.x+=2;b.x-=2;if(vertices){a.y-=2;b.y+=2;}
 f.arm();f.pointer('pointerdown',a);f.pointer('pointermove',b);f.pointer('pointerup',b);assert.equal(mesh.faces.length,6,f.node('#selectionStatus').textContent);assert.equal(mesh.vertices.length,vertices?10:12);assert.match(f.node('#selectionStatus').textContent,vertices?/END → END/:/MID → MID/);
 }
});
test('1182 disconnected gap refuses the complete stroke unchanged',()=>{
 const {mesh,f}=fixture();mesh.faces.splice(1,1);mesh.faceGroups.splice(1,1);const before=snapshot(mesh),a=f.point(0,4,.4),b=f.point(3,7,.65);a.x+=2;b.x-=2;f.arm();f.pointer('pointerdown',a);f.pointer('pointermove',b);f.pointer('pointerup',b);assert.deepEqual(snapshot(mesh),before);assert.equal(f.ctx.__boxlabHistory.undoStack.length,0);
});
test('1182 later splitter failure rolls back the whole strip and preserves redo',()=>{
 const {mesh,f}=fixture(),before=snapshot(mesh),connect=mesh.connectVertices.bind(mesh);let calls=0;mesh.connectVertices=(a,b)=>{if(++calls===2)throw Error('late refusal');return connect(a,b);};f.ctx.__boxlabHistory.redoStack.push(mesh.clone());const a=f.point(0,4,.4),b=f.point(3,7,.65);a.x+=2;b.x-=2;f.arm();f.pointer('pointerdown',a);f.pointer('pointermove',b);f.pointer('pointerup',b);assert.equal(calls,2);assert.deepEqual(snapshot(mesh),before);assert.equal(f.ctx.__boxlabHistory.undoStack.length,0);assert.equal(f.ctx.__boxlabHistory.redoStack.length,1);
});
test('1182 covered back faces remain untouched',()=>{
 const {mesh,f}=fixture();const backVertices=mesh.vertices.map(v=>v.clone().add(new THREE.Vector3(0,0,-1))),backFaces=mesh.faces.map(face=>face.map(i=>i+8));mesh.vertices.push(...backVertices);mesh.faces.push(...backFaces);mesh.faceGroups.push('Back','Back','Back');
 const a=f.point(0,4,.4),b=f.point(3,7,.65);a.x+=2;b.x-=2;f.arm();f.pointer('pointerdown',a);f.pointer('pointermove',b);f.pointer('pointerup',b);assert.equal(mesh.faces.length,9,f.node('#selectionStatus').textContent);assert.deepEqual(Array.from(mesh.faces.filter(face=>face.every(i=>i>=8&&i<16)),face=>Array.from(face)),backFaces);assert.equal(f.ctx.__boxlabHistory.undoStack.length,1);
});

test('1182 perspective stroke follows a folded visible face strip',()=>{
 const {mesh,f}=fixture('perspective');for(let i=0;i<mesh.vertices.length;i++)mesh.vertices[i].z=[0,.35,.1,0][i%4];const a=f.point(0,4,.4),b=f.point(3,7,.65);a.x+=2;b.x-=2;f.arm();f.pointer('pointerdown',a);f.pointer('pointermove',b);f.pointer('pointerup',b);assert.equal(mesh.faces.length,6,f.node('#selectionStatus').textContent);assert.equal(f.ctx.__boxlabHistory.undoStack.length,1);
});
