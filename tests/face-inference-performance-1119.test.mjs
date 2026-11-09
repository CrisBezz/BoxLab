import test from 'node:test';import assert from 'node:assert/strict';
import {EditableMesh} from '../src/mesh.js';import {grid} from './helpers/cage-group-profile.mjs';
import {inferenceRuntime,referenceSignature} from './helpers/face-inference-runtime.mjs';
function pair(mesh,ids){return [true,false].map(legacy=>inferenceRuntime(mesh.clone(),ids,{legacy}));}
function compare(rs,event,faces){const results=rs.map(r=>referenceSignature(r.pick(event,faces)));assert.deepEqual(results[1],results[0]);return results[1];}
function screen(r,p){return r.context.screenPoint(p,r.state.camera);}
test('1119 physical inference preserves Vertex, Edge, Face, miss, priority, distances and tie order',()=>{
 const mesh=EditableMesh.cube(2),rs=pair(mesh,[1]),r=rs[0],types=new Set();
 const targets=[...mesh.vertices,...mesh.edges().map(e=>mesh.vertices[e.a].clone().lerp(mesh.vertices[e.b],.5)),...mesh.faces.map((_,fi)=>mesh.faceCenter(fi))];
 for(const p of targets){const q=screen(r,p);for(const dx of [0,8,17,19]){const ref=compare(rs,{clientX:q.x+dx,clientY:q.y});if(ref)types.add(ref.type);}}
 assert.deepEqual([...types].sort(),['Edge','Face','Vertex']);assert.equal(compare(rs,{clientX:-10000,clientY:-10000}),null);
 // Seeded screen grid covers nearest and crossing projected edges, plus all-selected exclusion.
 for(let x=100;x<850;x+=41)for(let y=50;y<600;y+=43)compare(rs,{clientX:x,clientY:y});
 for(const p of targets){const q=screen(r,p);compare(rs,{clientX:q.x,clientY:q.y},mesh.faces.map((_,i)=>i));}
});
test('1119 complete Edge inference projects each endpoint at most once and reads bounds once',()=>{
 const mesh=grid(24),rs=pair(mesh,[]),r=rs[0];
 r.state.camera.position.set(12,35,12);r.state.camera.lookAt(12,0,12);r.state.camera.updateMatrixWorld();rs[1].state.camera.copy(r.state.camera);rs[1].state.camera.updateMatrixWorld();
 // Long projected edge: its midpoint is outside the Vertex snap radius.
 rs.forEach(r=>{r.rect.width=9000;r.rect.height=6000;});const edge=mesh.edges().find(e=>e.a===0&&e.b===1),p=screen(r,mesh.vertices[edge.a].clone().lerp(mesh.vertices[edge.b],.5));rs.forEach(r=>r.reset());
 const hit=compare(rs,{clientX:p.x,clientY:p.y});assert.equal(hit?.type,'Edge');
 const [before,after]=rs.map(r=>r.counts());assert.equal(after.bounds,1);assert.equal(after.projections,mesh.vertices.length);assert.ok(before.bounds>after.bounds*1000);assert.ok(before.projections>after.projections*4);
});
test('1119 invocation-local reuse follows camera, resize, vertex edits and selection without stale state',()=>{
 const rs=pair(EditableMesh.cube(2),[1]);for(let step=0;step<5;step++){
  rs.forEach(r=>{r.state.camera.position.set(5-step,3+step,5);r.state.camera.lookAt(0,0,0);r.state.camera.updateMatrixWorld();r.rect.left=step*11;r.rect.top=step*5;r.rect.width=900+step*80;r.rect.height=600-step*20;r.state.mesh.vertices[0].x+=.1;});
  const q=screen(rs[0],rs[0].state.mesh.vertices[0]);compare(rs,{clientX:q.x,clientY:q.y},step%2?[1]:[]);
 }
});
test('1119 disabled and numeric Exact bypass projection; inference is read-only and keeps original handlers',()=>{
 const rs=pair(EditableMesh.cube(2),[1]);for(const r of rs){const before=r.signature();r.reset();assert.equal(r.pick({pointerId:9876,clientX:400,clientY:300}),null);assert.deepEqual(r.counts(),{bounds:0,projections:0});r.elements.get('#inferenceSnapToggle').checked=false;assert.equal(r.pick({clientX:400,clientY:300}),null);assert.deepEqual(r.counts(),{bounds:0,projections:0});r.elements.get('#inferenceSnapToggle').checked=true;r.pick({clientX:-1,clientY:-1});assert.equal(r.signature(),before);assert.equal(r.history.undoStack.length,0);}
});
