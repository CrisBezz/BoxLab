import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import * as THREE from 'three';
import {rotateOwnerRuntime} from './helpers/rotate-owner-runtime.mjs';
const read=p=>fs.readFileSync(new URL('../src/'+p,import.meta.url),'utf8');
const source=read('transform-upgrade.js').replace("const axisSnapToggle=document.querySelector('#axisSnapToggle');","const axisSnapToggle={checked:true,addEventListener(){}};");
const snapshot=m=>m.vertices.map(v=>v.toArray());
const idsFor=mode=>mode==='vertex'?[0,1,2]:[0];
function indices(r,mode,ids){return mode==='object'?r.mesh.vertices.map((_,i)=>i):mode==='vertex'?ids:mode==='edge'?[r.mesh.edges()[0].a,r.mesh.edges()[0].b]:r.mesh.faces[0];}
function point(v,camera){const p=v.clone().project(camera);return new THREE.Vector2((p.x*.5+.5)*640,(-p.y*.5+.5)*480);}
function setup(mode='object',position=[4,3,8],up=[0,1,0]){const ids=idsFor(mode),r=rotateOwnerRuntime({mode,ids,upgradeSource:source});r.camera.position.fromArray(position);r.camera.up.fromArray(up);r.camera.lookAt(0,0,0);r.camera.updateMatrixWorld();return {r,ids,selected:indices(r,mode,ids)};}
function begin(r,x,y,spec,pointerType='pen'){
 return r.c.__boxlabTransformUpgrade.beginGizmoGesture(spec,{pointerType,isPrimary:true,pointerId:1,clientX:x,clientY:y});
}
test('1016 explicit component handles accept touch as well as Pencil/mouse; only selected vertices move with one history entry',()=>{
 for(const mode of ['vertex','edge','face'])for(const pointerType of ['touch','pen','mouse']){
  const {r,ids,selected}=setup(mode),before=snapshot(r.mesh),p=r.centre(),spec={tool:'move',constraint:'x'};
  assert.equal(begin(r,p.x+40,p.y,spec,pointerType),true,mode+' '+pointerType);
  r.c.__boxlabActiveGizmoDrag=spec;
  const rail=point(new THREE.Vector3(1,0,0),r.camera).sub(point(new THREE.Vector3(),r.camera)).normalize().multiplyScalar(35);
  r.dispatch('pointermove',p.x+40+rail.x,p.y+rail.y,{pointerType});r.dispatch('pointerup',p.x+40+rail.x,p.y+rail.y,{pointerType});
  r.mesh.vertices.forEach((v,i)=>{if(selected.includes(i)){assert(v.x>before[i][0]);assert.equal(v.y,before[i][1]);assert.equal(v.z,before[i][2]);}else assert.deepEqual(v.toArray(),before[i]);});
  assert.deepEqual(r.selected(),ids);assert.equal(r.history.undoStack.length,1);
 }
});
test('1016 XYZ rotation follows clockwise screen drag on either camera side and inverted views, retaining the explicit axis with Axis Snap ON',()=>{
 for(const mode of ['object','vertex','edge','face'])for(const position of [[4,3,8],[-4,-3,-8]])for(const up of [[0,1,0],[0,-1,0]])for(const axis of ['x','y','z']){
  const {r,selected}=setup(mode,position,up),before=snapshot(r.mesh),center=new THREE.Vector3();selected.forEach(i=>center.add(r.mesh.vertices[i]));center.divideScalar(selected.length);
  const p=point(center,r.camera),start=new THREE.Vector2(50,0),end=new THREE.Vector2(0,50),spec={tool:'rotate',constraint:axis};
  assert(begin(r,p.x+start.x,p.y+start.y,spec));r.c.__boxlabActiveGizmoDrag=spec;
  r.dispatch('pointermove',p.x+end.x,p.y+end.y);r.dispatch('pointerup',p.x+end.x,p.y+end.y);
  const av=new THREE.Vector3(axis==='x'?1:0,axis==='y'?1:0,axis==='z'?1:0),sign=Math.sign(av.dot(r.camera.getWorldDirection(new THREE.Vector3()))),q=new THREE.Quaternion().setFromAxisAngle(av,sign*Math.PI/2);
  r.mesh.vertices.forEach((v,i)=>{const expected=new THREE.Vector3(...before[i]);if(selected.includes(i))expected.sub(center).applyQuaternion(q).add(center);assert(v.distanceTo(expected)<1e-9,mode+' '+axis+' '+position+' '+up);});
  assert.equal(r.history.undoStack.length,1);
 }
});
test('1016 uniform scale grows outward and shrinks inward at all ring quadrants with Axis Snap ON, for every selection mode',()=>{
 for(const mode of ['object','vertex','edge','face'])for(const angle of [0,Math.PI/2,Math.PI,3*Math.PI/2])for(const distance of [35,-35]){
  const {r,selected}=setup(mode),before=snapshot(r.mesh),center=new THREE.Vector3();selected.forEach(i=>center.add(r.mesh.vertices[i]));center.divideScalar(selected.length);
  const p=point(center,r.camera),v=new THREE.Vector2(Math.cos(angle),Math.sin(angle)),start=v.clone().multiplyScalar(78),end=v.clone().multiplyScalar(78+distance),spec={tool:'scale',constraint:'free',kind:'uniform'};
  assert(begin(r,p.x+start.x,p.y+start.y,spec));r.c.__boxlabActiveGizmoDrag=spec;
  r.dispatch('pointermove',p.x+end.x,p.y+end.y);r.dispatch('pointerup',p.x+end.x,p.y+end.y);
  const beforeRadius=selected.reduce((n,i)=>n+new THREE.Vector3(...before[i]).distanceToSquared(center),0),afterRadius=selected.reduce((n,i)=>n+r.mesh.vertices[i].distanceToSquared(center),0);
  assert(distance>0?afterRadius>beforeRadius:afterRadius<beforeRadius,mode+' '+angle+' '+distance);
  const factor=Math.sqrt(afterRadius/beforeRadius);
  r.mesh.vertices.forEach((point,i)=>{const expected=new THREE.Vector3(...before[i]);if(selected.includes(i))expected.sub(center).multiplyScalar(factor).add(center);assert(point.distanceTo(expected)<1e-9);});
  assert.equal(r.history.undoStack.length,1);
 }
});
test('1016 actual component handle handoff accepts touch and captures the handle without synthetic canvas replay; cancel/tap clears gizmo state',()=>{
 const gizmo=read('total-gizmo.js');
 for(const mode of ['vertex','edge','face'])for(const tool of ['move','rotate','scale']){
  const {r}=setup(mode),p=r.centre(),spec={tool,constraint:'free',kind:tool==='scale'?'uniform':tool==='rotate'?'screen':'free'},before=snapshot(r.mesh);
  let captured=0,replayed=0,resets=0;
  const el={dataset:spec,classList:{add(){}},setPointerCapture(){captured++;}};
  Object.assign(r.c,{currentMode:()=>mode,state:()=>({mesh:r.mesh}),expanded:true,selectionAvailable:()=>true,hideFloatInput(){},vertexExtrudeConstraintSession:()=>false,edgeExtrudeConstraintSession:false,gestureDebug(){},arm:()=>true,root:{dataset:{},querySelectorAll:()=>[]},hud:null,status:r.status,syntheticDown(){replayed++;}});
  r.c.__boxlabTotalGizmo.resetTransient=()=>{resets++;r.c.__boxlabActiveGizmoDrag=null;};
  vm.runInContext(gizmo.slice(gizmo.indexOf('function handleSpec('),gizmo.indexOf('function clearTransientHandleState(')),r.c);
  r.c.onHandleDown({currentTarget:el,pointerType:'touch',pointerId:1,isPrimary:true,clientX:p.x+50,clientY:p.y,preventDefault(){},stopPropagation(){}});
  assert.equal(captured,1);assert.equal(replayed,0);assert.equal(r.c.root.dataset.dragging,'true');
  r.dispatch('pointermove',p.x+80,p.y+35,{pointerType:'touch'});assert.notDeepEqual(snapshot(r.mesh),before);
  r.dispatch('pointercancel',p.x+80,p.y+35,{pointerType:'touch'});assert.deepEqual(snapshot(r.mesh),before);assert.equal(resets,1);assert.equal(r.c.__boxlabActiveGizmoDrag,null);
  r.c.onHandleDown({currentTarget:el,pointerType:'touch',pointerId:1,isPrimary:true,clientX:p.x+50,clientY:p.y,preventDefault(){},stopPropagation(){}});
  r.dispatch('pointerup',p.x+50,p.y,{pointerType:'touch'});assert.equal(resets,2);assert.deepEqual(snapshot(r.mesh),before);
 }
});
function multiRuntime(spec,position=[4,3,8],up=[0,1,0]){
 const r=rotateOwnerRuntime({mode:'object'}),a=r.mesh,b=r.mesh.clone();b.vertices.forEach(v=>v.x+=4);
 const objects=[{id:1,mesh:a,origin:{x:0,y:0,z:0}},{id:2,mesh:b,origin:{x:4,y:0,z:0}}];
 r.camera.position.fromArray(position);r.camera.up.fromArray(up);r.camera.lookAt(2,0,0);r.camera.updateMatrixWorld();
 const selected={dataset:{mode:'object'}},tool={dataset:{tool:spec.tool}},snap={checked:true},status={},marker={style:{}};
 const c={THREE,Event:class{},document:{body:{append(){}},createElement:()=>marker,querySelector:q=>({'#viewport':r.canvas,'#selectionStatus':status,'#selectionModes button.active':selected,'#toolModes button.active':tool,'#axisSnapToggle':snap}[q]||null)},
 __boxlabBridgeState:{mesh:a,camera:r.camera},__boxlabObjectManager:{activeId:1,objects,saveActive(){}},__boxlabObjectSelection:{ids:new Set([1,2])},__boxlabActiveGizmoDrag:spec,__boxlabTransformArming:{constraint:()=>spec.constraint},__boxlabHistory:r.history};
 vm.createContext(c);const src=read('object-origin.js');vm.runInContext(src.slice(src.indexOf('const canvas'),src.indexOf("window.addEventListener('pointerdown',beginMoveWatch")),c);
 const event=(x,y,type='pointermove')=>({target:r.canvas,pointerType:'pen',isPrimary:true,pointerId:1,clientX:x,clientY:y,type,preventDefault(){},stopImmediatePropagation(){}});
 return{c,r,objects,event,center:new THREE.Vector3(2,0,0)};
}
test('1016 original Multi/group owner retains XYZ rotation direction/constraint on either camera side, pivots, origins and cancel',()=>{
 for(const position of [[4,3,8],[-4,-3,-8]])for(const axis of ['x','y','z']){
  const {c,r,objects,event,center}=multiRuntime({tool:'rotate',constraint:axis},position),p=c.screenPoint(center,r.camera),before=objects.map(o=>snapshot(o.mesh)),origins=objects.map(o=>({...o.origin}));
  c.startMultiPivotGesture(event(p.x+50,p.y,'pointerdown'));c.moveMultiPivotGesture(event(p.x,p.y+50));
  const av=new THREE.Vector3(axis==='x'?1:0,axis==='y'?1:0,axis==='z'?1:0),q=new THREE.Quaternion().setFromAxisAngle(av,Math.sign(av.dot(r.camera.getWorldDirection(new THREE.Vector3())))*Math.PI/2);
  objects.forEach((o,j)=>{o.mesh.vertices.forEach((v,i)=>assert(v.distanceTo(new THREE.Vector3(...before[j][i]).sub(center).applyQuaternion(q).add(center))<1e-9));assert(new THREE.Vector3(o.origin.x,o.origin.y,o.origin.z).distanceTo(new THREE.Vector3(origins[j].x,origins[j].y,origins[j].z).sub(center).applyQuaternion(q).add(center))<1e-9);});
  assert.equal(r.history.undoStack.length,1);c.endMultiPivotGesture(event(p.x,p.y+50,'pointercancel'));objects.forEach((o,j)=>{assert.deepEqual(snapshot(o.mesh),before[j]);assert.deepEqual({...o.origin},origins[j]);});
 }
});
test('1016 original Multi/group scale follows uniform ring radius in every quadrant and axis node projection, with exact cancel',()=>{
 for(const constraint of ['free','x','y','z'])for(const angle of [0,Math.PI/2,Math.PI,3*Math.PI/2])for(const sign of [-1,1]){
  const {c,r,objects,event,center}=multiRuntime({tool:'scale',constraint,kind:constraint==='free'?'uniform':''}),p=c.screenPoint(center,r.camera),before=objects.map(o=>snapshot(o.mesh)),origins=objects.map(o=>({...o.origin}));
  const v=constraint==='free'?new THREE.Vector2(Math.cos(angle),Math.sin(angle)):c.screenAxes(center,r.camera)[constraint].normalize(),start=v.clone().multiplyScalar(78),end=v.clone().multiplyScalar(78+sign*35);
  c.startMultiPivotGesture(event(p.x+start.x,p.y+start.y,'pointerdown'));c.moveMultiPivotGesture(event(p.x+end.x,p.y+end.y));
  const factor=Math.exp(sign*35*(constraint==='free'?.006:.012));
  objects.forEach((o,j)=>o.mesh.vertices.forEach((v,i)=>{const expected=new THREE.Vector3(...before[j][i]).sub(center);if(constraint==='free')expected.multiplyScalar(factor);else expected[constraint]*=factor;expected.add(center);assert(v.distanceTo(expected)<1e-9);}));
  assert.equal(r.history.undoStack.length,1);c.endMultiPivotGesture(event(p.x+end.x,p.y+end.y,'pointercancel'));objects.forEach((o,j)=>{assert.deepEqual(snapshot(o.mesh),before[j]);assert.deepEqual({...o.origin},origins[j]);});
 }
});
