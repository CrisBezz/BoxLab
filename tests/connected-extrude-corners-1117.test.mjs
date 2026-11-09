import test from 'node:test';import assert from 'node:assert/strict';
import * as THREE from 'three';
import {cornerBand} from './helpers/corner-band-fixture.mjs';
import {previewRuntime} from './helpers/dense-edit-runtime.mjs';
import {snapshot} from './helpers/negative-extrude-runtime.mjs';
import {topologySummary} from '../src/topology-seam-conformance.js';
import {EditableMesh} from '../src/mesh.js';
const stableSnapshot=m=>{const value=JSON.parse(snapshot(m));value.groups=m.faces.map((_,i)=>m.faceGroups?.[i]??null);return JSON.stringify(value);};
const area=p=>Math.abs(p.reduce((s,a,i)=>{const b=p[(i+1)%p.length];return s+a.x*b.y-a.y*b.x;},0)/2);
const cross=(a,b,c)=>(b.x-a.x)*(c.y-a.y)-(b.y-a.y)*(c.x-a.x);
function overlap(a,b){
 if(cross(b[0],b[1],b[2])<0)b=[b[0],b[2],b[1]];
 let poly=[...a];
 for(let i=0;i<3&&poly.length;i++){
  const u=b[i],v=b[(i+1)%3],out=[];
  for(let j=0;j<poly.length;j++){
   const p=poly[j],q=poly[(j+1)%poly.length],cp=cross(u,v,p),cq=cross(u,v,q),pin=cp>=-1e-12,qin=cq>=-1e-12;
   if(pin)out.push(p);if(pin!==qin){const t=cp/(cp-cq);out.push({x:p.x+(q.x-p.x)*t,y:p.y+(q.y-p.y)*t});}
  }
  poly=out;
 }
 return poly.length>=3?area(poly):0;
}
function capReversals(before,after,ids){let count=0;for(const fi of ids){const f=after.faces[fi],normal=before.faceNormal(fi);for(let j=1;j<f.length-1;j++){const [a,b,c]=[f[0],f[j],f[j+1]].map(i=>after.vertices[i]);if(b.clone().sub(a).cross(c.clone().sub(a)).dot(normal)<=1e-12)count++;}}return count;}
function directedManifold(mesh){
 const uses=new Map();for(const f of mesh.faces)for(let i=0;i<f.length;i++){const a=f[i],b=f[(i+1)%f.length],k=a<b?`${a}:${b}`:`${b}:${a}`;if(!uses.has(k))uses.set(k,[]);uses.get(k).push([a,b]);}
 assert.ok([...uses.values()].every(u=>u.length===2&&u[0][0]===u[1][1]&&u[0][1]===u[1][0]),'all shared edge directions oppose');
}
function sideOverlap(mesh,start){
 const faces=mesh.faces.slice(start),tris=[];
 for(const f of faces)for(let i=1;i<f.length-1;i++)tris.push([f[0],f[i],f[i+1]].map(v=>mesh.vertices[v]));
 let total=0;
 for(let i=0;i<tris.length;i++)for(let j=i+1;j<tris.length;j++)if(Math.abs(tris[i][0].z-tris[j][0].z)<1e-8)total+=overlap(tris[i],tris[j]);
 return total;
}
test('1117 reproduces .1116 closed-but-folded caps and overlapping walls; repaired L band has neither',()=>{
 const {mesh,ids}=cornerBand(),before=mesh.clone(),old=previewRuntime(mesh,ids,{legacy:true}),start=mesh.faces.length;old.begin();old.preview(.6);
 assert.equal(topologySummary(mesh).closed,true);assert.ok(capReversals(before,mesh,ids)>0);assert.ok(sideOverlap(mesh,start)>.01);
 const f=cornerBand(),r=previewRuntime(f.mesh,f.ids);r.begin();r.preview(.6);
 assert.equal(r.owner.drag().preview,true);assert.equal(capReversals(before,f.mesh,f.ids),0);assert.ok(sideOverlap(f.mesh,start)<1e-8);assert.equal(topologySummary(f.mesh).closed,true);directedManifold(f.mesh);
});
for(const d of [.02,.1,.25,.4,.6,1,2])test(`1117 segmented concave band at distance ${d}: valid winding, no cap reversal or wall overlap, one preview rebuild`,()=>{
 const {mesh,ids}=cornerBand({subdivisions:3}),before=mesh.clone(),start=mesh.faces.length,r=previewRuntime(mesh,ids);assert.equal(r.begin(),true);assert.equal(r.preview(d).length,1);assert.equal(r.owner.drag().preview,true,r.owner.drag().failureReason);
 assert.equal(capReversals(before,mesh,ids),0);assert.ok(sideOverlap(mesh,start)<1e-8);assert.equal(topologySummary(mesh).closed,true);directedManifold(mesh);
});
test('1117 offset that closes a narrow U notch is refused before mutation or history; dragging back to valid distance recovers',()=>{
 const {mesh,ids}=cornerBand({subdivisions:2,profile:[[0,0],[3,0],[3,3],[2,3],[2,1],[1,1],[1,3],[0,3]]}),before=snapshot(mesh),r=previewRuntime(mesh,ids);r.begin();r.preview(.7);
 assert.equal(r.owner.drag().blocked,true);assert.equal(snapshot(mesh),before);r.finish();assert.equal(r.history.undoStack.length,0);assert.equal(snapshot(mesh),before);
 const again=previewRuntime(mesh,ids);again.begin();again.preview(.7);again.preview(.2);assert.equal(again.owner.drag().blocked,false);again.finish();assert.equal(again.history.undoStack.length,1);assert.equal(topologySummary(mesh).closed,true);
});
test('1117 progressive previews preserve labels/creases, Cancel source, selection and commit/Undo/Redo',()=>{
 const {mesh,ids}=cornerBand({subdivisions:2});mesh.faceGroups=mesh.faces.map((_,i)=>`Group ${i%3}`);mesh.creases.set(mesh.edgeKey(mesh.faces[0][0],mesh.faces[0][1]),.7);
 const before=snapshot(mesh),labels=[...mesh.faceGroups],r=previewRuntime(mesh,ids);r.begin();for(const d of [.1,.6,.4,1]){r.preview(d);assert.deepEqual(mesh.faceGroups,labels);assert.equal(mesh.creases.size,1);assert.deepEqual(r.selection(),ids);}
 r.finish('pointercancel');assert.equal(snapshot(mesh),before);assert.equal(r.history.undoStack.length,0);
 const commit=previewRuntime(mesh,ids);commit.begin();commit.preview(.6);const final=stableSnapshot(mesh);commit.finish();assert.equal(commit.history.undoStack.length,1);assert.equal(stableSnapshot(mesh),final);const undone=commit.history.undo(mesh);assert.equal(snapshot(undone),before);assert.equal(stableSnapshot(commit.history.redo(undone)),final);
});
test('1117 convex bands and ordinary connected selections preserve accepted .1116 geometry exactly',()=>{
 const variants=[()=>cornerBand({profile:[[0,0],[2,0],[2,2],[0,2]],subdivisions:3}),()=>({mesh:EditableMesh.cube(),ids:[0,2]})];
 for(const build of variants){const a=build(),b=build(),r=previewRuntime(a.mesh,a.ids),old=previewRuntime(b.mesh,b.ids,{legacy:true});r.begin();old.begin();r.preview(.6);old.preview(.6);assert.equal(snapshot(a.mesh),snapshot(b.mesh));}
});
test('1117 scaled/rotated planar band retains closed oriented geometry and positive selected Face areas',()=>{
 for(const scale of [.01,1,10]){
  const {mesh,ids}=cornerBand({subdivisions:2}),rotation=new THREE.Matrix4().makeRotationFromEuler(new THREE.Euler(.3,.7,.4));mesh.vertices.forEach(v=>v.multiplyScalar(scale).applyMatrix4(rotation));const before=mesh.clone(),r=previewRuntime(mesh,ids);r.begin();r.preview(.6*scale);assert.equal(r.owner.drag().preview,true,r.owner.drag().failureReason);assert.equal(capReversals(before,mesh,ids),0);assert.equal(topologySummary(mesh).closed,true);directedManifold(mesh);
 }
});

test('1117 blocked explanation survives both main rebuild and subsequent tool status refresh; valid drag clears it',()=>{
 const {mesh,ids}=cornerBand({subdivisions:2,profile:[[0,0],[3,0],[3,3],[2,3],[2,1],[1,1],[1,3],[0,3]]});
 let r;r=previewRuntime(mesh,ids,{onRender:()=>{r.context.document.querySelector('#selectionStatus').textContent='regular selection refresh';}});r.begin();r.preview(.7);
 const status=r.context.document.querySelector('#selectionStatus');assert.match(status.textContent,/Extrude blocked/);r.context.updateStatus();assert.match(status.textContent,/Extrude blocked/);r.preview(.2);r.context.updateStatus();assert.doesNotMatch(status.textContent,/blocked/);
});
