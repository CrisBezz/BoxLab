import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {EditableMesh} from '../src/mesh.js';
import {History} from '../src/history.js';
import {planThrough,buildThrough,validateThrough} from '../src/through-kernel.js';
function fixture(name){const v=[],f=[];for(const l of fs.readFileSync(new URL('./fixtures/'+name,import.meta.url),'utf8').split('\n')){const s=l.trim().split(/\s+/);if(s[0]==='v')v.push(s.slice(1).map(Number));if(s[0]==='f')f.push(s.slice(1).map(x=>Number(x)-1));}return new EditableMesh(v,f);}
const snapshot=m=>JSON.stringify({v:m.vertices,f:m.faces,c:[...m.creases],e:[...(m.looseEdges||[])],l:[...(m.looseVertices||[])]});
function volume(m){let v=0;for(const f of m.faces)for(let i=1;i<f.length-1;i++)v+=m.vertices[f[0]].dot(m.vertices[f[i]].clone().cross(m.vertices[f[i+1]]))/6;return v;}
function cut(m,fi){const before=snapshot(m),p=planThrough(m,fi);assert.equal(p.ok,true,p.reason);const b=buildThrough(m,p);assert.equal(snapshot(m),before,'kernel mutated input');assert.equal(b.ok,true,b.reason);assert.equal(validateThrough(b.mesh).ok,true);for(let i=0;i<b.mesh.faces.length;i++)assert(b.mesh.faceNormal(i).length()>.99,'output must work with native faceNormal');assert(volume(b.mesh)>0);assert(volume(b.mesh)<volume(m)-1e-6);return b.mesh;}
function inset(){const m=EditableMesh.cube();m.insetFace?.(1,.5);return m;}
const loop='BoxLab-v0.36.14.14-base (1).obj';
test('A/F: clean inset quad through, exact volume and history',()=>{const m=EditableMesh.cube();const source=m.faces[1],ids=source.map(id=>{m.vertices.push(m.vertices[id].clone().multiplyScalar(.5).setZ(1));return m.vertices.length-1;});m.faces[1]=ids;source.forEach((a,i)=>m.faces.push([a,source[(i+1)%4],ids[(i+1)%4],ids[i]]));const result=cut(m,1);assert(Math.abs(volume(result)-6)<1e-5);const h=new History();h.push(m);assert.equal(snapshot(h.undo(result)),snapshot(m));assert.equal(snapshot(h.redo(m)),snapshot(result));});
test('B: known corner arrangement and all front polygons',()=>{const m=fixture('BoxLab-v0.36.14.8-base.obj');for(const fi of [1,2,3])cut(m,fi);});
test('C/F: double-Knife front polygons over existing tunnel',()=>{const m=fixture('BoxLab-v0.36.14.14-base (2).obj');for(const fi of [0,1,2,3])cut(m,fi);});
test('D: all sixteen Loop Cut source faces',()=>{for(let fi=0;fi<16;fi++)cut(fixture(loop),fi);});
test('E: sequential Through on remaining front face',()=>{const first=cut(fixture(loop),7);const fi=first.faces.findIndex(f=>f.every(id=>Math.abs(first.vertices[id].z-1)<1e-7)&&f.some(id=>first.vertices[id].y>0.9));assert(fi>=0);cut(first,fi);});
test('G: damaged regression inputs reject without changes',()=>{for(const name of ['BoxLab-v0.36.14.15-base.obj','BoxLab-v0.36.14.15-base (1).obj']){const m=fixture(name),before=snapshot(m);for(let fi=0;fi<m.faces.length;fi++){assert.equal(planThrough(m,fi).ok,false);assert.equal(buildThrough(m,{sourceFaceIndex:fi}).ok,false);}assert.equal(snapshot(m),before);}});
test('G: cancellation equivalent / full solid removal leaves input untouched',()=>{const m=EditableMesh.cube(),before=snapshot(m),p=planThrough(m,1);assert.equal(buildThrough(m,p).reason,'entire-solid-removal');assert.equal(snapshot(m),before);});
test('F/H: triangulated target and permuted face ownership',()=>{const m=fixture(loop);m.faces=m.faces.flatMap(f=>[[f[0],f[1],f[2]],[f[0],f[2],f[3]]]).reverse();cut(m,16);});
test('protected transform and retired handler imports',()=>{const html=fs.readFileSync(new URL('../index.html',import.meta.url),'utf8');assert(html.includes('src/multi-object-transform.js?v=0.36.1.0'));const ui=fs.readFileSync(new URL('../src/drawer-ui.js',import.meta.url),'utf8');assert(!/import\('\.\/(transactional-through|extrude-region-through|extrude-corner-through|through-breakout-cleanup|extrude-through-viability)/.test(ui));});

test('G: diagonal sequential cut rejects four-owner edge and preserves mesh',()=>{const first=cut(fixture(loop),7),before=snapshot(first);const fi=first.faces.findIndex(f=>f.every(id=>Math.abs(first.vertices[id].z-1)<1e-7));const b=buildThrough(first,planThrough(first,fi));assert.equal(b.ok,false);assert.equal(b.validation.details.nonManifold[0].faces.length,4);assert.equal(snapshot(first),before);});
test('E: native Loop Cut crosses rebuilt tunnel, then another Through',()=>{const m=cut(fixture(loop),7);const edge=m.edges().findIndex(e=>e.a===13&&e.b===16);assert(edge>=0);assert.equal(m.loopCut(edge,.5).splitFaces,8);assert.equal(validateThrough(m).ok,true);cut(m,4);});
test('canonical crease splitting and loose data remain transactional',()=>{const m=fixture('BoxLab-v0.36.14.8-base.obj');m.creases.set(m.edgeKey(0,1),.7);m.looseVertices=new Set([2]);const before=snapshot(m);const result=cut(m,2);assert.equal(snapshot(m),before);assert.deepEqual([...result.looseVertices],[2]);for(const [key,strength]of result.creases){assert.equal(strength,.7);assert(result.edges().some(e=>result.edgeKey(e.a,e.b)===key));}});
