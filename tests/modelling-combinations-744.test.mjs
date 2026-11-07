import test from 'node:test';import assert from 'node:assert/strict';
import {EditableMesh,knife} from './helpers/modelling-combinations-runtime.mjs';
import {History} from '../src/history.js';
const snapshot=m=>({vertices:m.vertices.map(v=>v.toArray()),faces:m.faces,groups:m.faceGroups,creases:[...m.creases]});
function closed(m){for(const e of m.edges())assert.equal(e.faces.length,2,`unmatched ${e.a}:${e.b}`);for(const f of m.faces){assert.equal(new Set(f).size,f.length);assert.ok(f.length>=3);}}
const volume=m=>m.faces.reduce((sum,f)=>{const a=m.vertices[f[0]];for(let i=1;i<f.length-1;i++)sum+=a.dot(m.vertices[f[i]].clone().cross(m.vertices[f[i+1]]))/6;return sum},0);
for(const segments of [1,3])for(const count of [1,3])test(`Bevel ${segments} segments → Loop ${count} cuts: every seed preserves closed shell and volume`,()=>{
 const m=EditableMesh.cube();assert.ok(m.generalBevelSelection([0],.2,segments));closed(m);
 for(let seed=0;seed<m.edges().length;seed++){const trial=m.clone(),v=volume(trial),r=count===1?trial.loopCut(seed,.4):trial.loopCuts(seed,count);if(!r)continue;closed(trial);assert.ok(Math.abs(volume(trial)-v)<1e-8);}
});
for(const count of [1,3])test(`actual Knife release → Loop ${count}: every seed preserves prior subdivisions`,()=>{
 const m=EditableMesh.cube(),h=new History();knife(m,h);assert.equal(h.undoStack.length,1);closed(m);
 for(let seed=0;seed<m.edges().length;seed++){const trial=m.clone(),r=count===1?trial.loopCut(seed,.4):trial.loopCuts(seed,count);if(!r)continue;closed(trial);assert.ok(Math.abs(volume(trial)-8)<1e-8);for(const old of m.vertices)assert.ok(trial.vertices.some(v=>v.equals(old)));}
});
for(const count of [1,3])test(`Loop ${count} after Knife → Slide → one Undo/Redo preserves complete mesh`,()=>{
 const m=EditableMesh.cube(),h=new History();knife(m,h);const before=snapshot(m.clone());h.push(m);const r=count===1?m.loopCut(11,.4):m.loopCuts(11,count);assert.ok(r);for(const group of r.slideGroups)assert.ok(m.loopSlide(group,.6));closed(m);const after=snapshot(m.clone());assert.equal(h.undoStack.length,2);const undo=h.undo(m);assert.deepEqual(snapshot(undo),before);assert.deepEqual(snapshot(h.redo(undo)),after);
});
test('Loop terminal n-gons retain facegroups and inherit split-edge creases',()=>{
 const m=EditableMesh.cube();m.faceGroups=m.faces.map((_,i)=>`group${i}`);const edge=m.edges()[0];m.creases.set(m.edgeKey(edge.a,edge.b),.7);const r=m.loopCut(0,.4);assert.ok(r);closed(m);assert.equal(m.faceGroups.length,m.faces.length);assert.equal(m.faceGroups.filter(g=>g==='group0').length,2);assert.equal([...m.creases.values()].filter(v=>v===.7).length,2);assert.ok(!m.creases.has(m.edgeKey(edge.a,edge.b)));
});
test('unmodified cube Loop still has four cuts, all quads, and exact requested placement',()=>{const m=EditableMesh.cube(),r=m.loopCut(0,.7);assert.equal(r.splitFaces,4);assert.equal(r.slideData.length,4);assert.equal(r.position,.7);assert.ok(m.faces.every(f=>f.length===4));closed(m);});
test('Bevel → Knife → Loop retains a closed shell and complete Knife history',()=>{
 const m=EditableMesh.cube(),h=new History();assert.ok(m.generalBevelSelection([0],.2,3));const fi=m.faces.findIndex(f=>f.length===4);const before=snapshot(m.clone());knife(m,h,fi);assert.equal(h.undoStack.length,1);closed(m);assert.deepEqual(snapshot(h.undo(m)),before);for(let seed=0;seed<m.edges().length;seed++){const trial=m.clone(),r=trial.loopCut(seed,.4);if(r)closed(trial);}
});
test('Loop → Bevel → Knife → another Loop stays closed for supported cuts',()=>{
 const m=EditableMesh.cube();assert.ok(m.loopCut(0,.4));const seed=m.edges().findIndex((e,i)=>m.clone().generalBevelSelection([i],.15,1));assert.ok(seed>=0);assert.ok(m.generalBevelSelection([seed],.15,1));closed(m);const fi=m.faces.findIndex(f=>f.length===4);const h=new History();knife(m,h,fi);assert.equal(h.undoStack.length,1);closed(m);for(let i=0;i<m.edges().length;i++){const trial=m.clone(),r=trial.loopCut(i,.6);if(r)closed(trial);}
});
test('coincident disconnected shells remain separate during Loop boundary conformance',()=>{
 const m=EditableMesh.cube();assert.ok(m.generalBevelSelection([0],.2,1));const other=m.clone(),offset=m.vertices.length;m.vertices.push(...other.vertices.map(v=>v.clone()));m.faces.push(...other.faces.map(f=>f.map(v=>v+offset)));const old=m.faces.filter(f=>f.every(v=>v<offset)).map(f=>[...f]);const seed=m.edges().findIndex(e=>e.a>=offset&&e.b>=offset);assert.ok(m.loopCuts(seed,3));closed(m);assert.deepEqual(Array.from(m.faces.filter(f=>f.every(v=>v<offset)),f=>Array.from(f)),old);assert.ok(m.faces.every(f=>f.every(v=>v<offset)||f.every(v=>v>=offset)));
});
