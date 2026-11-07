import {curveProfileUIRuntime as ui} from './helpers/curve-profile-ui-runtime.mjs';
import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import * as THREE from 'three';
import {EditableMesh} from '../src/mesh.js';
import {installLooseTopology} from '../src/loose-topology.js';
import {appendStrokePoint,simplifyStroke} from '../src/stroke-sampling.js';
import {curvePoints,makeCurveProfile,editableCurveProfile} from '../src/curve-profile-core.js';
import {editableBooleanRuntime} from './helpers/editable-boolean-runtime.mjs';
import {orderedDOM} from './helpers/ordered-dom.mjs';
installLooseTopology(EditableMesh);
const profile=()=>({version:1,points:[{x:-.4,y:-.2},{x:.3,y:-.3},{x:.4,y:.2},{x:-.2,y:.4}],closed:true,smooth:true,detail:32});
test('808 shared Lasso sampler preserves 4px threshold; simplification retains stroke endpoints and bends',()=>{
 const points=[{x:0,y:0}];assert.equal(appendStrokePoint(points,{x:3,y:0}),false);assert.equal(appendStrokePoint(points,{x:4,y:0}),true);
 const raw=Array.from({length:1001},(_,i)=>({x:i/10,y:Math.sin(i/100)*20})),simple=simplifyStroke(raw,2);
 assert.deepEqual(simple[0],raw[0]);assert.deepEqual(simple.at(-1),raw.at(-1));assert(simple.length<30);assert(simple.length>3);
});
test('808 open/closed smooth curve geometry has bounded density, unit fit, connected loose topology and no solid faces',()=>{
 for(const closed of [true,false])for(const smooth of [true,false]){const p={...profile(),closed,smooth},m=makeCurveProfile(p);assert.equal(m.faces.length,0);assert.equal(m.looseEdges.size,closed?m.vertices.length:m.vertices.length-1);
 const box=new THREE.Box3().setFromPoints(m.vertices),size=box.getSize(new THREE.Vector3());assert(Math.abs(Math.max(size.x,size.y,size.z)-1)<1e-10);assert.equal(size.z,0);assert.equal(m.clone().looseEdges.size,m.looseEdges.size);
 assert.equal(m.vertices.length,smooth?closed?32:33:4);}
 const p=profile();p.detail=128;assert.equal(curvePoints(p).length,128);assert.throws(()=>makeCurveProfile({...p,points:[{x:NaN,y:0},{x:1,y:1}]}));
});
test('808 curve recipe reopens after existing affine object transforms, rejects component/topology edits and unsupported owners',()=>{
 const p=profile(),m=makeCurveProfile(p),matrix=new THREE.Matrix4().makeRotationY(.7).multiply(new THREE.Matrix4().makeScale(2,.7,1));matrix.setPosition(3,-1,.5);m.vertices.forEach(v=>v.applyMatrix4(matrix));
 const o={mesh:m,curveProfile:p,settings:{},kind:'editable'};const edited=editableCurveProfile(o);assert(edited);const rebuilt=makeCurveProfile(edited);m.vertices.forEach((v,i)=>assert(v.distanceTo(rebuilt.vertices[i])<1e-6));
 assert.equal(editableCurveProfile({...o,locked:true}),null);assert.equal(editableCurveProfile({...o,sourceId:1}),null);
 const changed=m.clone();changed.vertices[4].z+=.2;assert.equal(editableCurveProfile({...o,mesh:changed}),null);changed.vertices[4].copy(m.vertices[4]);changed.looseEdges.delete([...changed.looseEdges][0]);assert.equal(editableCurveProfile({...o,mesh:changed}),null);
});
test('808 whole editor candidate draw/edit/Undo/Cancel leaves actual scene/history unchanged and cleans restored host node',()=>{
 const u=ui(),before=u.r.snapshot(),undo=u.r.h.undoStack.length;assert.equal(u.api.open(),true);u.draw();assert.equal(u.button('apply').disabled,false);
 u.pointer('pointerdown',40,130);u.pointer('pointermove',55,120);u.pointer('pointercancel',55,120);assert.equal(u.api.dragging,false);u.button('undo').click();u.draw();assert.deepEqual(u.r.snapshot(),before);assert.equal(u.r.h.undoStack.length,undo);
 u.button('cancel').click();assert.equal(u.api.active(),false);assert.equal(u.current(),null);assert.equal(u.host.children.length,0);assert.equal(u.wrap.children.length,0);assert.deepEqual(u.r.snapshot(),before);
});
test('808 actual create/edit recipes and geometry survive scene Undo/Redo; creation uses existing manager/history',()=>{
 const u=ui(),before=u.r.snapshot(),undo=u.r.h.undoStack.length;u.api.open();u.draw();assert.equal(u.api.apply(),true);const id=u.r.manager.activeId,curve=u.r.objects.find(o=>o.id===id);assert(curve.curveProfile);assert(curve.mesh.looseEdges.size>0);assert.equal(u.r.h.undoStack.length,undo+1);
 const saved=structuredClone(curve.curveProfile);u.r.manager.replaceActiveMesh(u.r.h.undo(u.r.live));assert.deepEqual(u.r.snapshot(),before);u.r.manager.replaceActiveMesh(u.r.h.redo(u.r.live));assert.deepEqual(JSON.parse(JSON.stringify(u.r.objects.find(o=>o.id===id).curveProfile)),saved);assert(u.api.eligible());
 const old=u.r.snapshot(),depth=u.r.h.undoStack.length;assert(u.api.open(true));u.button('smooth').click();assert(u.api.apply());assert.equal(u.r.h.undoStack.length,depth+1);assert.equal(u.r.objects.length,5);u.r.manager.replaceActiveMesh(u.r.h.undo(u.r.live));assert.deepEqual(u.r.snapshot(),old);u.r.manager.replaceActiveMesh(u.r.h.redo(u.r.live));assert.equal(u.r.objects.find(o=>o.id===id).curveProfile.smooth,false);
});
