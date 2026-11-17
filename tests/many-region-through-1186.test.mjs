import test from 'node:test';import assert from 'node:assert/strict';
import {EditableMesh} from '../src/mesh.js';import {closedGrid} from './helpers/through-validation-profile.mjs';
import {buildNegativeExtrude,validateThrough} from '../src/through-kernel.js';
import {snapshot,volume,faceRuntime} from './helpers/negative-extrude-runtime.mjs';
const selected=n=>Array.from({length:n*n},(_,i)=>i).filter(i=>(i%n+Math.floor(i/n))%2===0).map(i=>n*n+i);
for(const n of [6,8])test(`1186 ${n*n/2} corner-contact regions cut through rear surface`,()=>{
 const m=closedGrid(n,EditableMesh),before=snapshot(m),ids=selected(n),r=buildNegativeExtrude(m,ids,-2.1);
 assert(r.ok,r.reason);assert(validateThrough(r.mesh).ok);assert.equal(snapshot(m),before);assert.equal(r.faceIndices.length,0);
 assert(Math.abs(volume(r.mesh)-4)<.002,'half the solid removed; finite corner webs retained');
 // Openings must reach both exterior surfaces, with no recessed cap left inside.
 for(const fi of ids){const c=m.faceCenter(fi);for(const z of [-1,1])assert(!r.mesh.faces.some(f=>f.every(v=>Math.abs(r.mesh.vertices[v].z-z)<1e-7)&&f.every(v=>Math.abs(r.mesh.vertices[v].x-c.x)<1/n-1e-4)&&f.every(v=>Math.abs(r.mesh.vertices[v].y-c.y)<1/n-1e-4)));}
});
test('1186 five recessed regions in a dense sloped pattern cut through; source unchanged',()=>{
 const m=closedGrid(6,EditableMesh);for(const p of m.vertices)p.z+=.4*p.y;
 const first=buildNegativeExtrude(m,selected(6),-.2);assert(first.ok,first.reason);const before=snapshot(first.mesh),ids=first.faceIndices.slice(0,5);assert.equal(ids.length,5);
 const r=buildNegativeExtrude(first.mesh,ids,-2.5);assert(r.ok,r.reason);assert(validateThrough(r.mesh).ok);assert.equal(snapshot(first.mesh),before);assert.equal(r.faceIndices.length,0);assert(volume(r.mesh)<volume(first.mesh)-.5);
});
test('1186 real large-selection drag commits through once and Undo restores exact source',()=>{
 const m=closedGrid(6,EditableMesh),before=snapshot(m),f=faceRuntime(m,selected(6));assert(f.start());f.move(-2.1);assert(f.owner.drag().preview,f.owner.drag().failureReason);f.finish();assert(validateThrough(m).ok);assert.equal(f.history.undoStack.length,1);const after=snapshot(m);assert.equal(snapshot(f.history.undo(m)),before);assert.equal(snapshot(f.history.redo(m)),after);
});
