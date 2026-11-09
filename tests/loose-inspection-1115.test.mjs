import test from 'node:test';import assert from 'node:assert/strict';
import {looseRuntime,plain} from './helpers/loose-inspector-runtime.mjs';
function pair(mesh,markers){return [looseRuntime(mesh,markers),looseRuntime(mesh,markers,{legacy:true})];}
const point=(x,y=0,z=0)=>({x,y,z});
const mesh=vertices=>({vertices,faces:vertices.length>=3?[[0,1,2]]:[]});
function equalInspection(m,markers){const [a,b]=pair(m,markers);assert.deepEqual(plain(a.api.inspect(m)),plain(b.api.inspect(m)));return [a,b];}
test('1115 snapshot compaction maps original live IDs, unclaimed coincident points and isolated/wire markers exactly as before',()=>{
 const m=mesh([point(0),point(1),point(2)]),markers=[{index:50,...point(2)},{index:2,...point(0)},{index:9,...point(1)},{index:4,...point(0)},{index:90,...point(8)}];
 const [a,b]=equalInspection(m,markers);a.api.apply();b.api.apply();assert.deepEqual(a.selected,b.selected);assert.deepEqual(a.selected[0].ids,[4,90]);assert.equal(a.status.textContent,b.status.textContent);
 for(const r of [a,b])r.listeners.find(l=>l.target==='document'&&l.type==='pointerup').fn();
 assert.equal(a.nodes.find(n=>n.id==='selectLooseVerticesBtn').title,b.nodes.find(n=>n.id==='selectLooseVerticesBtn').title);
 assert.equal(a.counts().objectReads,b.counts().objectReads);
});
test('1115 equal-distance ties retain original index/traversal order; used indexes remain unavailable',()=>{
 const m=mesh([point(0),point(0),point(0)]),markers=[{index:8,...point(0)},{index:3,...point(0)},{index:3,...point(0)},{index:5,...point(0)},{index:1,...point(0)}];
 const [a]=equalInspection(m,markers);assert.deepEqual(Array.from(a.api.inspect(m).indices),[8]);
});
test('1115 exact tolerance boundaries, nearest misses, large offsets and all widest axes retain legacy results',()=>{
 for(const axis of ['x','y','z'])for(const offset of [0,1e8,1e15])for(const delta of [0,1e-7,1e-7*(1-Number.EPSILON),1e-7*(1+Number.EPSILON),2e-7]){
  const p=point(0);p[axis]=offset;const near={index:3,...p};near[axis]+=delta;
  const m=mesh([p,p,p]);equalInspection(m,[near,{index:10,...p}]);
 }
 // With zero span the minimum1e-7 tolerance applies; same distance arithmetic at boundary.
 for(const delta of [1e-7,1e-7+1e-20,-1e-7,-1e-7-1e-20])equalInspection(mesh([point(delta),point(delta),point(delta)]),[{index:0,...point(0)}]);
});
test('1115 nonfinite positions/overflow tolerance, missing mesh and absent markers retain legacy refusal/miss results',()=>{
 for(const value of [NaN,Infinity,-Infinity,1e308]){
  equalInspection(mesh([point(value),point(1),point(2)]),[{index:0,...point(value)},{index:1,...point(1)},{index:2,...point(2)}]);
 }
 const m=mesh([point(0),point(1),point(2)]);const [a,b]=pair(m,[]);assert.deepEqual(plain(a.api.inspect(m)),plain(b.api.inspect(m)));assert.deepEqual(plain(a.api.inspect(null)),plain(b.api.inspect(null)));
});
test('1115 seeded randomized coincident, perturbed and unmatched snapshots preserve complete reports',()=>{
 let seed=12345;const random=()=>((seed=(1664525*seed+1013904223)>>>0)/2**32);
 for(let run=0;run<40;run++){
  const markers=Array.from({length:60},(_,i)=>({index:i*2,x:Math.round(random()*10),y:Math.round(random()*10),z:Math.round(random()*10)}));
  const vertices=Array.from({length:45},(_,i)=>{const p=markers[Math.floor(random()*markers.length)];return point(p.x+(i%4===0?1e-6:0),p.y,p.z);});
  const m={vertices,faces:Array.from({length:15},(_,i)=>[3*i,3*i+1,3*i+2])};equalInspection(m,markers);
 }
});
test('1115 fresh lookup follows edits, marker changes, restoration and manager fallback without touching source geometry',()=>{
 const m=mesh([point(0),point(1),point(2)]),markers=[{index:0,...point(0)},{index:1,...point(1)},{index:2,...point(2)},{index:3,...point(8)}];const [a,b]=pair(m,markers);
 for(let i=0;i<4;i++){
  const before=structuredClone(m);assert.deepEqual(plain(a.api.inspect(m)),plain(b.api.inspect(m)));assert.deepEqual(m,before);
  if(i===0)m.vertices[0].x=.5;if(i===1)markers[0].x=.5;if(i===2){m.vertices[0].x=0;markers[0].x=0;}
 }
 const noManager=looseRuntime(m,markers,{manager:false});noManager.api.apply();assert.deepEqual(noManager.selected[0].ids,[3]);
});
test('1115 all original listeners, timers, apply and manager snapshot reader are preserved; search avoids all-pairs distance work',()=>{
 const vertices=Array.from({length:300},(_,i)=>point(i)),m={vertices,faces:Array.from({length:100},(_,i)=>[i*3,i*3+1,i*3+2])},markers=vertices.map((p,index)=>({index,...p})),[a,b]=pair(m,markers);
 assert.equal(a.source.slice(a.source.indexOf('function apply(')),b.source.slice(b.source.indexOf('function apply(')));
 assert.equal(a.source.slice(a.source.indexOf('function mesh(){'),a.source.indexOf('function render(')),b.source.slice(b.source.indexOf('function mesh(){'),b.source.indexOf('function render(')));
 assert.deepEqual(plain(a.api.inspect(m)),plain(b.api.inspect(m)));assert.equal(b.counts().distanceChecks,45150);assert.equal(a.counts().distanceChecks,300);
});
