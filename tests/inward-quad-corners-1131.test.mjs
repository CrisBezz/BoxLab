import test from 'node:test';import assert from 'node:assert/strict';
import * as THREE from 'three';
import {cornerBand} from './helpers/corner-band-fixture.mjs';
import {previewRuntime} from './helpers/dense-edit-runtime.mjs';
import {snapshot,volume} from './helpers/negative-extrude-runtime.mjs';
import {buildNegativeExtrude,validateThrough} from '../src/through-kernel.js';
import {assemblyProfile} from './helpers/through-assembly-profile.mjs';
import {EditableMesh} from '../src/mesh.js';
const legacy=assemblyProfile({transform:s=>s.replace('trial=rebuildInwardBandFrames(before,trial,ids,eps);','')});
const fixture=(subdivisions=.5)=>cornerBand({subdivisions,profile:[[0,0],[2,0],[2,2],[0,2]]});
const near=(a,b)=>assert(Math.abs(a-b)<1e-7,`${a} != ${b}`);
function cornerEdges(m,d=.2,transform=p=>p){
 for(const z of [-.1,.1])for(const [x,y]of [[0,0],[2,0],[2,2],[0,2]]){
  const a=transform(new THREE.Vector3(x,y,z)),b=transform(new THREE.Vector3(x===0?d:2-d,y===0?d:2-d,z));
  const ai=m.vertices.findIndex(v=>v.distanceTo(a)<1e-7),bi=m.vertices.findIndex(v=>v.distanceTo(b)<1e-7);
  assert(ai>=0&&bi>=0);assert(m.edges().some(e=>e.a===ai&&e.b===bi||e.a===bi&&e.b===ai),'corner must connect outer to inset corner diagonally');
 }
}
test('1131 inward rectangular band has eight actual diagonal corner joins and minimum quad wall strips',()=>{
 const {mesh,ids}=fixture(),before=snapshot(mesh),r=buildNegativeExtrude(mesh,ids,-.2);assert(r.ok,r.reason);assert.equal(snapshot(mesh),before);assert(validateThrough(r.mesh).ok);cornerEdges(r.mesh);
 for(const z of [-.1,.1]){const wall=r.mesh.faces.filter(f=>f.every(i=>Math.abs(r.mesh.vertices[i].z-z)<1e-8));assert.equal(wall.length,4);assert(wall.every(f=>f.length===4));}
 assert.equal(r.mesh.vertices.length,24);assert.equal(r.mesh.faces.length,24);near(volume(r.mesh),8-.2*(4-1.6*1.6));
});
test('1131 original subdivided boundary and cap seams survive as corresponding wall quads',()=>{
 for(const subdivisions of [1,2]){
  const {mesh,ids}=fixture(subdivisions),r=buildNegativeExtrude(mesh,ids,-.2);assert(r.ok,r.reason);cornerEdges(r.mesh);assert(validateThrough(r.mesh).ok);
  for(const z of [-.1,.1]){const wall=r.mesh.faces.filter(f=>f.every(i=>Math.abs(r.mesh.vertices[i].z-z)<1e-8));assert.equal(wall.length,subdivisions*8);assert(wall.every(f=>f.length===4));}
  for(const v of mesh.vertices)assert(r.mesh.vertices.some(p=>p.distanceTo(v)<1e-8));
 }
});
const point=v=>v.toArray().map(x=>Math.round(x*1e8)/1e8).join(',');
const creases=m=>[...m.creases].map(([key,value])=>[key.split(':').map(Number).map(i=>point(m.vertices[i])).sort().join('|'),value]).sort();
function shapes(m){return Array.from(m.faces,f=>{
 const corners=f.filter((id,i)=>{const a=m.vertices[f[(i+f.length-1)%f.length]],b=m.vertices[id],c=m.vertices[f[(i+1)%f.length]];return b.clone().sub(a).cross(c.clone().sub(b)).length()>1e-7;});
 return corners.map(i=>point(m.vertices[i])).sort().join('|');
}).sort();}
test('1131 old clipping layout fails diagonals; repaired non-wall surfaces and exact volume match it',()=>{
 const {mesh,ids}=fixture(),old=legacy.run('buildNegativeExtrude',mesh,ids,-.2).result,r=buildNegativeExtrude(mesh,ids,-.2);assert(old.ok);assert.throws(()=>cornerEdges(old.mesh),{name:'AssertionError'});cornerEdges(r.mesh);
 near(volume(r.mesh),volume(old.mesh));
 const nonwall=m=>({...m,faces:m.faces.filter(f=>![-.1,.1].some(z=>f.every(i=>Math.abs(m.vertices[i].z-z)<1e-7)))});
 assert.deepEqual(shapes(nonwall(r.mesh)),shapes(nonwall(old.mesh)));
});
test('1131 uniform labels permit frames; authored boundary creases keep their exact geometry/value',()=>{
 for(const crease of [false,true]){
  const {mesh,ids}=fixture();mesh.faceGroups=mesh.faces.map(()=> 'band');if(crease)mesh.creases.set(mesh.edgeKey(4,5),.7);
  const before=snapshot(mesh),old=legacy.run('buildNegativeExtrude',mesh,ids,-.2).result,r=buildNegativeExtrude(mesh,ids,-.2);assert(r.ok,r.reason);assert(validateThrough(r.mesh).ok);assert.equal(snapshot(mesh),before);near(volume(r.mesh),volume(old.mesh));
  assert.deepEqual(creases(r.mesh),creases(old.mesh));assert(r.mesh.faceGroups.every(g=>g==='band'));
  if(!crease)cornerEdges(r.mesh);else assert.equal(r.mesh.faces.filter(f=>f.every(i=>Math.abs(r.mesh.vertices[i].z-.1)<1e-8)).length,4,'uncreased opposite wall still repairs independently');
 }
});
test('1131 mixed wall groups, concave bands and unequal collapsed subdivisions retain exact accepted cut output',()=>{
 const mixed=fixture();mixed.mesh.faceGroups=mixed.mesh.faces.map((_,i)=> 'group '+i);
 const concave=cornerBand({subdivisions:2}),collapsed=fixture(2);
 for(const [f,d]of [[mixed,-.2],[concave,-.2],[collapsed,-.6]]){const old=legacy.run('buildNegativeExtrude',f.mesh,f.ids,d).result,r=buildNegativeExtrude(f.mesh,f.ids,d);assert(r.ok,r.reason);assert.equal(snapshot(r.mesh),snapshot(old.mesh));assert.deepEqual(r.faceIndices,Array.from(old.faceIndices));}
});
test('1131 rotated/scaled inward frame keeps exact surface volume and diagonal correspondence',()=>{
 const {mesh,ids}=fixture(),q=new THREE.Quaternion().setFromEuler(new THREE.Euler(.3,.7,.2));
 const transform=p=>p.multiplyScalar(3).applyQuaternion(q).add(new THREE.Vector3(4,-2,7));mesh.vertices.forEach(transform);
 const r=buildNegativeExtrude(mesh,ids,-.6);assert(r.ok,r.reason);assert(validateThrough(r.mesh).ok);cornerEdges(r.mesh,.2,transform);near(volume(r.mesh),(8-.2*(4-1.6*1.6))*27);
});
test('1131 real inward controller retains progressive preview, Cancel, selection and one-step UndoRedo',()=>{
 const {mesh,ids}=fixture(),before=snapshot(mesh),r=previewRuntime(mesh,ids);r.begin();for(const d of [-.02,-.1,-.3]){r.preview(d);assert(r.owner.drag().preview);cornerEdges(mesh,-d);assert(validateThrough(mesh).ok);}r.finish('pointercancel');assert.equal(snapshot(mesh),before);assert.equal(r.history.undoStack.length,0);
 const c=previewRuntime(mesh,ids);c.begin();c.preview(-.2);const after=snapshot(mesh);c.finish();assert.equal(c.history.undoStack.length,1);const undo=c.history.undo(mesh);assert.equal(snapshot(undo),before);assert.equal(snapshot(c.history.redo(undo)),after);
});
test('1131 hollow rectangular collar fixes rear shoulder diagonals and retains accepted front opening frame',()=>{
 const ring=[[-1,-1],[1,-1],[1,1],[-1,1]],vertices=[...[-1,.6,1].flatMap(z=>ring.map(([x,y])=>[x,y,z])),...[-1,1].flatMap(z=>ring.map(([x,y])=>[x*.6,y*.6,z]))],faces=[],ids=[];
 for(let k=0;k<2;k++)for(let i=0;i<4;i++){const j=(i+1)%4;if(k===1)ids.push(faces.length);faces.push([k*4+i,k*4+j,(k+1)*4+j,(k+1)*4+i]);}
 for(let i=0;i<4;i++){const j=(i+1)%4;faces.push([12+i,16+i,16+j,12+j],[8+i,8+j,16+j,16+i],[i,12+i,12+j,j]);}
 const mesh=new EditableMesh(vertices,faces),before=snapshot(mesh),old=legacy.run('buildNegativeExtrude',mesh,ids,-.2).result,r=buildNegativeExtrude(mesh,ids,-.2);assert(r.ok,r.reason);assert.equal(snapshot(mesh),before);assert(validateThrough(r.mesh).ok);near(volume(r.mesh),4.544);near(volume(old.mesh),volume(r.mesh));
 const edge=(m,a,b)=>m.edges().some(e=>{const p=m.vertices[e.a],q=m.vertices[e.b];return p.distanceTo(a)<1e-7&&q.distanceTo(b)<1e-7||p.distanceTo(b)<1e-7&&q.distanceTo(a)<1e-7;});
 for(const [x,y]of ring){const a=new THREE.Vector3(x,y,.6),b=new THREE.Vector3(x*.8,y*.8,.6);assert.equal(edge(old.mesh,a,b),false);assert(edge(r.mesh,a,b));assert(edge(r.mesh,new THREE.Vector3(x*.8,y*.8,1),new THREE.Vector3(x*.6,y*.6,1)));}
 assert.equal(r.mesh.faces.filter(f=>f.every(i=>Math.abs(r.mesh.vertices[i].z-.6)<1e-7)).length,4);
});
