import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import crypto from 'node:crypto';
import vm from 'node:vm';
import * as THREE from 'three';
import {makeCurveProfile,editableCurveProfile,curvePoints} from '../src/curve-profile-core.js';
import {buildOutlineBalloon} from '../src/vendor/meshutilz-outline-balloon.js';
import {fitAddObjectToUnitCube} from '../src/add-object-fit.js';
import {EditableMesh} from '../src/mesh.js';
import {curveProfileUIRuntime} from './helpers/curve-profile-ui-runtime.mjs';
import {addObjectRuntime} from './helpers/add-object-runtime.mjs';
const profile=()=>({version:1,output:'balloon',depth:.25,closed:true,smooth:true,detail:16,points:Array.from({length:8},(_,i)=>({x:.6*Math.cos(i*Math.PI/4),y:.4*Math.sin(i*Math.PI/4)}))});
test('813 imported generator matches exact audited MeshUtilz source bytes',()=>{
 const bytes=fs.readFileSync(new URL('../src/vendor/meshutilz-outline-balloon.js',import.meta.url));
 assert.match(bytes.toString('utf8'),/outlineSegments=null,sectionRings=null/); // .816 extended donor options; original defaults preserved.
});
test('813 actual Add menu delegates Balloon and Edit Balloon to original shared editor',()=>{
 const r=addObjectRuntime(),calls=[];r.c.__boxlabCurveProfile={open:(...args)=>calls.push(args),eligible:()=>true};
 r.add.click();r.click('Balloon');assert.deepEqual(calls[0],[false,true]);assert.equal(r.panel(),undefined);
 const active=r.manager.objects.find(o=>o.id===r.manager.activeId);active.curveProfile=profile();r.add.click();r.click('Edit Balloon');assert.deepEqual(calls[1],[true]);assert.equal(r.panel(),undefined);assert.equal(r.manager.objects.length,5);
});
test('813 adapter retains exact MeshUtilz positions/triangles, closed shared rim and positive shell volume',()=>{
 for(const depth of [.05,.25,.8])for(const reverse of [false,true]){
  const p={...profile(),depth};if(reverse)p.points.reverse();const m=makeCurveProfile(p),g=buildOutlineBalloon(curvePoints(p),{depth,smooth:2}),a=g.attributes.position,index=g.index,expected=new EditableMesh(Array.from({length:a.count},(_,i)=>new THREE.Vector3().fromBufferAttribute(a,i)),Array.from({length:index.count/3},(_,i)=>[index.getX(i*3),index.getX(i*3+1),index.getX(i*3+2)]));fitAddObjectToUnitCube(expected);
  assert.deepEqual(m.vertices.map(v=>v.toArray()),expected.vertices.map(v=>v.toArray()));assert.deepEqual(m.faces,expected.faces);assert.equal(m.looseEdges.size,0);
  const edges=new Map();let volume=0;for(const face of m.faces){const [a,b,c]=face.map(i=>m.vertices[i]);assert(new THREE.Vector3().crossVectors(b.clone().sub(a),c.clone().sub(a)).lengthSq()>1e-20);volume+=a.dot(new THREE.Vector3().crossVectors(b,c))/6;for(let i=0;i<3;i++){const a=face[i],b=face[(i+1)%3],key=m.edgeKey(a,b);if(!edges.has(key))edges.set(key,[]);edges.get(key).push(a<b?1:-1);}}
  assert(volume>0);assert.equal(m.vertices.length-edges.size+m.faces.length,2);for(const uses of edges.values())assert.deepEqual(uses.sort(),[-1,1]);g.dispose();
 }
});
test('813 invalid/open/concave/crossing outlines refuse; native wire Curve remains supported',()=>{
 assert.throws(()=>makeCurveProfile({...profile(),closed:false}),/closed/);assert.throws(()=>makeCurveProfile({...profile(),depth:NaN}),/Depth/);
 for(const points of [[{x:0,y:0},{x:1,y:1},{x:0,y:1},{x:1,y:0}],[{x:0,y:0},{x:1,y:0},{x:2,y:0}]])assert.throws(()=>makeCurveProfile({...profile(),points,smooth:false}),/outline|area/);
 const m=makeCurveProfile({...profile(),output:undefined,closed:false});assert.equal(m.faces.length,0);assert(m.looseEdges.size>0);
});
test('813 Balloon recipe preserves affine placement and rejects component/topology/crease changes',()=>{
 const p=profile(),m=makeCurveProfile(p),matrix=new THREE.Matrix4().makeRotationY(.8).multiply(new THREE.Matrix4().makeScale(1.5,.7,1.2));matrix.setPosition(2,-1,3);m.vertices.forEach(v=>v.applyMatrix4(matrix));const object={mesh:m,curveProfile:p,settings:{}};
 const record=editableCurveProfile(object);assert(record);const rebuilt=makeCurveProfile(record);for(let i=0;i<m.vertices.length;i++)assert(m.vertices[i].distanceTo(rebuilt.vertices[i])<1e-6);
 const changed=m.clone();changed.vertices[10].x+=.1;assert.equal(editableCurveProfile({...object,mesh:changed}),null);const creased=m.clone();creased.creases.set('0:1',1);assert.equal(editableCurveProfile({...object,mesh:creased}),null);
});
function drawOval(u){u.pointer('pointerdown',268,90);for(let i=1;i<=32;i++){const a=i*Math.PI/16;u.pointer('pointermove',160+108*Math.cos(a),90+65*Math.sin(a));}u.pointer('pointerup',268,90);}
test('813 whole Balloon editor uses existing scene transaction, preview cleanup and depth edit Undo/Redo',()=>{
 const u=curveProfileUIRuntime(),before=u.r.snapshot(),initial=u.r.h.undoStack.length;assert(u.api.open(false,true));drawOval(u);assert.equal(u.button('apply').disabled,false);assert(u.find(n=>n.dataset?.addPreview==='mesh'));
 const depth=u.button('depth');depth.value='.4';depth.dispatchEvent({type:'change'});assert(u.api.apply());assert.equal(u.r.h.undoStack.length,initial+1);assert.equal(u.find(n=>n.dataset?.addPreview==='mesh'),null);
 const id=u.r.manager.activeId,balloon=u.r.objects.find(o=>o.id===id);assert.equal(balloon.name,'Balloon');assert.equal(balloon.curveProfile.depth,.4);assert(balloon.mesh.faces.length>0);assert(u.api.eligible());
 const saved=u.r.snapshot();u.r.manager.replaceActiveMesh(u.r.h.undo(u.r.live));assert.deepEqual(u.r.snapshot(),before);u.r.manager.replaceActiveMesh(u.r.h.redo(u.r.live));assert.deepEqual(u.r.snapshot(),saved);
 assert(u.api.open(true));const input=u.button('depth');input.value='.2';input.dispatchEvent({type:'change'});u.button('undo').click();assert.equal(input.value,'0.4');input.value='.2';input.dispatchEvent({type:'change'});assert(u.api.apply());assert.equal(u.r.h.undoStack.length,initial+2);
 u.r.manager.replaceActiveMesh(u.r.h.undo(u.r.live));assert.deepEqual(u.r.snapshot(),saved);u.r.manager.replaceActiveMesh(u.r.h.redo(u.r.live));assert.equal(u.r.objects.find(o=>o.id===id).curveProfile.depth,.2);
 const management=fs.readFileSync(new URL('../src/object-management.js',import.meta.url),'utf8'),start=management.indexOf('function duplicateSelection(){');vm.runInContext(management.slice(start,management.indexOf('\n',start)),u.c);u.c.duplicateSelection();const copy=u.r.objects.at(-1);assert.notEqual(copy.id,id);assert.equal(copy.curveProfile.output,'balloon');assert(editableCurveProfile(copy));assert.notEqual(copy.curveProfile,u.r.objects.find(o=>o.id===id).curveProfile);
});
test('813 invalid candidate and Cancel leave scene/history untouched and remove preview',()=>{
 const u=curveProfileUIRuntime(),before=u.r.snapshot(),depth=u.r.h.undoStack.length;u.api.open(false,true);drawOval(u);u.button('closed').click();assert.equal(u.button('apply').disabled,true);assert.equal(u.api.apply(),false);u.api.cancel();assert.deepEqual(u.r.snapshot(),before);assert.equal(u.r.h.undoStack.length,depth);assert.equal(u.find(n=>n.dataset?.addPreview==='mesh'),null);assert.equal(u.api.active(),false);
});


test('817 star-shaped concave Balloon is accepted at low Density while crossed outlines refuse',()=>{
 const p={...profile(),smooth:false,balloonResolution:4,points:[{x:-.8,y:-.6},{x:.8,y:-.6},{x:.8,y:.6},{x:.2,y:.6},{x:0,y:.15},{x:-.2,y:.6},{x:-.8,y:.6}]};
 const mesh=makeCurveProfile(p);assert(mesh.faces.length>0);assert(mesh.faces.length<1000);
 const expected=buildOutlineBalloon(curvePoints(p),{depth:p.depth,smooth:2,outlineSegments:24,sectionRings:4});assert.equal(mesh.faces.length,expected.index.count/3);expected.dispose();
 assert.throws(()=>makeCurveProfile({...p,points:[{x:0,y:0},{x:1,y:1},{x:0,y:1},{x:1,y:0}]}),/crossings|area/);
});

test('818 optional quad Balloon uses fewer editable faces, keeps pole triangles and preserves legacy triangle default',()=>{
 const p={...profile(),balloonResolution:4};const tris=makeCurveProfile(p),quads=makeCurveProfile({...p,balloonTopology:'quads'});
 assert(quads.faces.length<tris.faces.length);
 assert(quads.faces.some(f=>f.length===4));
 assert(quads.faces.some(f=>f.length===3));
 assert(tris.faces.every(f=>f.length===3));
 assert.equal(quads.vertices.length,tris.vertices.length);
 const edges=new Map();for(const f of quads.faces)for(let i=0;i<f.length;i++){const a=f[i],b=f[(i+1)%f.length],key=quads.edgeKey(a,b);if(!edges.has(key))edges.set(key,[]);edges.get(key).push(a<b?1:-1);}
 for(const uses of edges.values())assert.deepEqual(uses.sort(),[-1,1]);
 assert.throws(()=>makeCurveProfile({...p,balloonTopology:'invalid'}),/Unsupported/);
});

test('819 optional paired pole quads retain watertight oriented face cycles and fallback',()=>{
 const p={...profile(),balloonResolution:4,balloonTopology:'quads',balloonPoleQuads:true};
 const a=makeCurveProfile(p),legacy=makeCurveProfile({...p,balloonPoleQuads:false});
 assert(a.faces.length<legacy.faces.length);
 assert(a.faces.every(face=>face.length===4));
 const edges=new Map();
 for(const f of a.faces)for(let i=0;i<f.length;i++){
  const x=f[i],y=f[(i+1)%f.length],key=a.edgeKey(x,y);
  if(!edges.has(key))edges.set(key,[]);
  edges.get(key).push(x<y?1:-1);
 }
 assert.equal(a.vertices.length-edges.size+a.faces.length,2);
 for(const uses of edges.values())assert.deepEqual(uses.sort(),[-1,1]);
 assert(legacy.faces.some(f=>f.length===3));
});


test('820 quadball replaces both pole fans with a manifold quad grid',()=>{
 for(const density of [4,6,8]){
  const p={...profile(),balloonResolution:density,balloonTopology:'quads',balloonPolePatch:'grid'};
  const mesh=makeCurveProfile(p);
  assert(mesh.faces.every(f=>f.length===4),'all faces should be quads');
  const edgeMap=new Map();
  for(const f of mesh.faces)for(let i=0;i<f.length;i++){
   const a=f[i],b=f[(i+1)%f.length],key=mesh.edgeKey(a,b);
   if(!edgeMap.has(key))edgeMap.set(key,[]);
   edgeMap.get(key).push(a<b?1:-1);
  }
  for(const uses of edgeMap.values())assert.deepEqual(uses.sort(),[-1,1]);
  assert.equal(mesh.vertices.length-edgeMap.size+mesh.faces.length,2);
  assert(mesh.vertices.length>makeCurveProfile({...p,balloonPolePatch:undefined}).vertices.length);
 }
});


test('821 shared Curve editor Pencil drag-to-merge removes one point and Undo restores it',()=>{
 const u=curveProfileUIRuntime();assert(u.api.open(false,true));
 const pts=[[35,130],[80,30],[200,25],[275,130],[160,155]];
 u.pointer('pointerdown',...pts[0]);for(const xy of pts.slice(1))u.pointer('pointermove',...xy);u.pointer('pointerup',...pts.at(-1));
 const before=u.find(n=>n.id==='curveProfilePad').children[1].children.length;
 assert(before>=3);
 const dots=u.find(n=>n.id==='curveProfilePad').children[1].children;
 const a=dots[0],b=dots[1];const ax=Number(a.attributes.cx),ay=Number(a.attributes.cy),bx=Number(b.attributes.cx),by=Number(b.attributes.cy);
 u.pointer('pointerdown',ax,ay);u.pointer('pointermove',bx,by);
 assert.equal(b.style.fill,'#e34b4b');
 u.pointer('pointerup',bx,by);
 assert.equal(u.find(n=>n.id==='curveProfilePad').children[1].children.length,before-1);
 u.button('undo').click();
 assert.equal(u.find(n=>n.id==='curveProfilePad').children[1].children.length,before);
});
