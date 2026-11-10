import test from 'node:test';import assert from 'node:assert/strict';import * as THREE from 'three';
import {assemblyProfile} from './helpers/through-assembly-profile.mjs';import {closedGrid} from './helpers/through-validation-profile.mjs';import {EditableMesh} from '../src/mesh.js';import {snapshot} from './helpers/negative-extrude-runtime.mjs';import {cornerBand} from './helpers/corner-band-fixture.mjs';
const old=assemblyProfile({baseline:'1131'}),current=assemblyProfile(),plain=r=>JSON.parse(JSON.stringify({...r,mesh:r.mesh?JSON.parse(snapshot(r.mesh)):undefined}));
const pad=v=>{while(v.length<2100)v.push(new THREE.Vector3(1e20+v.length*1e10,1e20,1e20));return v;};
const lookup=(v,e)=>current.run('assemblyVertexLookup',v,e).result,linear=(v,p,e)=>v.findIndex(q=>q.distanceTo(p)<=e);
function parity(vertices,eps,queries){const find=lookup(vertices,eps);for(const p of queries)assert.equal(find(p),linear(vertices,p,eps));return find;}
test('1132 indexed lookup preserves earliest ID through ties, duplicate coordinates and out-of-order candidates',()=>{
 let seed=982451653;const random=()=>((seed=(Math.imul(seed,1664525)+1013904223)>>>0)/2**32);
 for(const scale of [1e-12,1,1e12]){const eps=scale*1e-5,v=Array.from({length:600},()=>new THREE.Vector3(random()*scale,random()*scale,random()*scale));v.push(v[0].clone(),v[2].clone());const q=v.flatMap(p=>[p.clone(),p.clone().add(new THREE.Vector3(eps*.5,0,0)),p.clone().add(new THREE.Vector3(eps*1.1,eps*1.1,0))]);parity(pad(v),eps,q);}
 const v=pad([new THREE.Vector3(.9,0,0),new THREE.Vector3(-.1,0,0),new THREE.Vector3(0,0,0)]);assert.equal(lookup(v,1)(new THREE.Vector3()),0);
 const edge=pad([new THREE.Vector3(-1,0,0),new THREE.Vector3(1+Number.EPSILON,0,0),new THREE.Vector3(1,0,0)]);parity(edge,1,[new THREE.Vector3(),new THREE.Vector3(-Number.EPSILON,0,0),new THREE.Vector3(Number.EPSILON,0,0)]);
});
test('1132 index includes direct and projected canonical appends at their original first matching ID',()=>{
 const v=pad([new THREE.Vector3(-1,-1,-1),new THREE.Vector3(1,-1,-1)]),first=v.length,find=lookup(v,1e-8),p=new THREE.Vector3(0,-1,-1);assert.equal(find(p),-1);
 v.push(p.clone().add(new THREE.Vector3(5e-9,0,0)),p.clone());assert.equal(find(p),first);
 for(let i=0;i<100;i++){const q=new THREE.Vector3(i/17,i%4,-i/13);v.push(q);assert.equal(find(q),linear(v,q,1e-8));}
 // Actual assembly executes canonicalEdgeSplit on a source edge, then queries
 // the newly appended projected vertex again without a stale broad phase.
 const m=EditableMesh.cube();pad(m.vertices);const edge=new THREE.Vector3(0,-1,-1),polys=[[edge,m.vertices[2],m.vertices[6]],[edge.clone().add(new THREE.Vector3(1e-9,0,0)),m.vertices[4],m.vertices[5]]];
 assert.equal(snapshot(current.run('assemble',m,polys,1e-8).result),snapshot(old.run('assemble',m,polys,1e-8).result));
});
test('1132 unsafe bounds, tolerance and nonfinite inputs retain the exact linear predicate',()=>{
 for(const eps of [0,-1,NaN,Infinity,1e-170,1e308]){const v=[new THREE.Vector3(),new THREE.Vector3(1e-163,0,0),new THREE.Vector3(1e308,0,0)];parity(pad(v),eps,[...v,new THREE.Vector3(NaN,0,0),new THREE.Vector3(Infinity,0,0)]);}
 const v=pad([new THREE.Vector3(2,3,4)]),find=lookup(v,.1);v.push(new THREE.Vector3(Infinity,0,0));for(const q of [...v,new THREE.Vector3()])assert.equal(find(q),linear(v,q,.1));
 parity([new THREE.Vector3(NaN,0,0),new THREE.Vector3()],.1,[new THREE.Vector3()]);
});
test('1132 complete inward/Through kernels retain exact .1131 output, metadata, cap IDs and source',()=>{
 const band=cornerBand({subdivisions:.5,profile:[[0,0],[2,0],[2,2],[0,2]]});
 for(const [m,ids]of [[closedGrid(20,EditableMesh),[210]],[band.mesh,band.ids]]){m.faceGroups=m.faces.map((_,i)=>'group '+i);m.creases.set(m.edgeKey(...m.faces[0].slice(0,2)),.5);const before=snapshot(m);
  for(const d of [-.1,-.2,-1,-2,-3]){const a=old.run('buildNegativeExtrude',m,ids,d).result,b=current.run('buildNegativeExtrude',m,ids,d).result;assert.deepEqual(plain(b),plain(a));}
  const plan=current.run('planThrough',m,ids[0]).result;if(plan.ok)assert.deepEqual(plain(current.run('buildThrough',m,plan).result),plain(old.run('buildThrough',m,plan).result));assert.equal(snapshot(m),before);
 }
});
test('1132 exact complete-cut output uses at least ten times fewer vertex distance predicates',()=>{
 const m=closedGrid(20,EditableMesh),a=old.run('buildNegativeExtrude',m,[210],-.25),b=current.run('buildNegativeExtrude',m,[210],-.25);assert(b.result.ok,b.result.reason);assert.deepEqual(plain(b.result),plain(a.result));assert(a.counts.vertexDistanceTests>100000);assert(b.counts.vertexDistanceTests<a.counts.vertexDistanceTests/10);
});

test('1132 small assemblies keep the original linear path and exact predicate count',()=>{const m=closedGrid(8,EditableMesh),a=old.run('buildNegativeExtrude',m,[36],-.25),b=current.run('buildNegativeExtrude',m,[36],-.25);assert.deepEqual(plain(b.result),plain(a.result));assert.equal(b.counts.vertexDistanceTests,a.counts.vertexDistanceTests);});
