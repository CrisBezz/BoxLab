import test from 'node:test';
import assert from 'node:assert/strict';
import * as THREE from 'three';
import {makeCurveProfile,curvePoints} from '../src/curve-profile-core.js';
import {curveProfileUIRuntime} from './helpers/curve-profile-ui-runtime.mjs';
// Approximate control positions transcribed from the user's .813 screenshot;
// these are a reproduction, not the original authored recipe/file.
const xy=[[127,314],[133,268],[171,216],[215,185],[312,150],[387,136],[471,129],[548,137],[589,160],[619,182],[625,224],[604,269],[583,305],[536,347],[475,379],[385,397],[276,397],[178,375],[147,349]];
const recipe=()=>({version:1,output:'balloon',closed:true,smooth:true,detail:48,depth:.55,points:xy.map(([x,y])=>({x:(x-372)/360,y:(264-y)/360}))});
const frame=u=>u.draws.slice(u.draws.findLastIndex(d=>d.clear)+1);
function sketch(u){u.pointer('pointerdown',(xy[0][0]-52)/2,(xy[0][1]-84)/2);for(const [x,y] of xy.slice(1))u.pointer('pointermove',(x-52)/2,(y-84)/2);u.pointer('pointerup',(xy[0][0]-52)/2,(xy[0][1]-84)/2);}
test('814 screenshot oval survives tiny spline concavity, both windings and detail/depth controls',()=>{
 const p=recipe(),pts=curvePoints(p);assert(pts.some((a,i)=>{const b=pts[(i+1)%pts.length],c=pts[(i+2)%pts.length];return (b.x-a.x)*(c.y-b.y)-(b.y-a.y)*(c.x-b.x)>0;}),'fixture reproduces old strict turn rejection');
 for(const detail of [16,32,48,64,128])for(const depth of [.05,.55,.8])for(const reverse of [false,true]){
  const r={...p,detail,depth,points:reverse?[...p.points].reverse():p.points},m=makeCurveProfile(r);const edges=new Map();let volume=0;
  for(const f of m.faces){const [a,b,c]=f.map(i=>m.vertices[i]);assert(new THREE.Vector3().crossVectors(b.clone().sub(a),c.clone().sub(a)).lengthSq()>1e-20);volume+=a.dot(new THREE.Vector3().crossVectors(b,c))/6;for(let i=0;i<3;i++){const a=f[i],b=f[(i+1)%3],key=m.edgeKey(a,b);if(!edges.has(key))edges.set(key,[]);edges.get(key).push(a<b?1:-1);}}
  assert(volume>0);assert.equal(m.vertices.length-edges.size+m.faces.length,2);for(const uses of edges.values())assert.deepEqual(uses.sort(),[-1,1]);assert.deepEqual(r.points,reverse?[...p.points].reverse():p.points);
 }
});
test('814 whole editor draws actual triangles, changes preview, commits and reopens screenshot-style oval',()=>{
 const u=curveProfileUIRuntime(),before=u.r.snapshot();u.api.open(false,true);sketch(u);assert.equal(u.button('apply').disabled,false);assert(frame(u).filter(d=>d.path).length>0);assert(frame(u).every(d=>!d.path||d.path.flat().every(Number.isFinite)));assert.deepEqual(u.r.snapshot(),before);
 const first=JSON.stringify(frame(u));u.button('depth').value='.55';u.button('depth').dispatchEvent({type:'change'});assert.notEqual(JSON.stringify(frame(u)),first);const canvas=u.find(n=>n.dataset?.addPreview==='mesh');
 const pointer=(type,x,y)=>canvas.dispatchEvent({type,pointerId:2,clientX:x,clientY:y,button:0,preventDefault(){},stopPropagation(){}});const old=JSON.stringify(frame(u));pointer('pointerdown',20,20);pointer('pointermove',60,40);pointer('pointerup',60,40);assert.notEqual(JSON.stringify(frame(u)),old);assert.deepEqual(u.r.snapshot(),before);assert(u.api.apply());assert(u.api.open(true));assert(frame(u).filter(d=>d.path).length>0);u.api.cancel();
});
test('814 invalid outline explains refusal inside preview and never mutates scene/history',()=>{
 const u=curveProfileUIRuntime(),before=u.r.snapshot();u.api.open(false,true);sketch(u);u.button('closed').click();assert.equal(u.button('apply').disabled,true);assert(frame(u).some(d=>/closed outline/.test(d.message)));assert.equal(frame(u).filter(d=>d.path).length,0);assert.equal(u.api.apply(),false);assert.deepEqual(u.r.snapshot(),before);u.button('closed').click();assert.equal(u.button('apply').disabled,false);assert(frame(u).filter(d=>d.path).length>0);u.api.cancel();
});
test('814 deep dents and crossing silhouettes still refuse despite tolerance',()=>{
 const p=recipe();for(const points of [[{x:0,y:0},{x:1,y:0},{x:.4,y:.4},{x:1,y:1},{x:0,y:1}],[{x:0,y:0},{x:1,y:1},{x:0,y:1},{x:1,y:0}]])assert.throws(()=>makeCurveProfile({...p,smooth:false,points}),/outline|area/);
});
