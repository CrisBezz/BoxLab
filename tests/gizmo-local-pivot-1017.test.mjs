import test from 'node:test';import assert from 'node:assert/strict';import fs from 'node:fs';import vm from 'node:vm';import * as THREE from 'three';
import {facePivotFrame,pivotQuaternion,localScaleVector,pickPivotFace} from '../src/gizmo-local-pivot.js';
import {rotateOwnerRuntime} from './helpers/rotate-owner-runtime.mjs';import {EditableMesh} from '../src/mesh.js';import {encodeBoxlabScene,decodeBoxlabScene} from '../src/boxlab-project-codec.js';
const source=p=>fs.readFileSync(new URL('../src/'+p,import.meta.url),'utf8'),snap=m=>m.vertices.map(v=>v.toArray());
function fixture(mode='object',ids=[0]){
 const r=rotateOwnerRuntime({mode,ids}),c=r.c,a={id:1,name:'A',mesh:r.mesh,settings:{},origin:{x:0,y:0,z:0}},b={id:2,name:'B',mesh:r.mesh.clone(),settings:{},origin:{x:4,y:0,z:0}};
 const manager=c.__boxlabObjectManager;Object.assign(manager,{objects:[a,b],activeId:1,activate(id){this.activeId=id;c.__boxlabBridgeState.mesh=this.objects.find(o=>o.id===id).mesh;}});
 c.__boxlabBridgeState.controls={enabled:true};c.__boxlabBridgeState.scene=new THREE.Scene();const body=new THREE.Mesh(r.mesh.triangulatedGeometry(),new THREE.MeshBasicMaterial());body.userData.kind='body';c.__boxlabBridgeState.scene.add(body);body.updateMatrixWorld();
 Object.assign(c,{selectedIds:new Set([1]),multiEnabled:false,groupNames:new Map(),collapsedGroups:new Set(),historyBridgeInstalled:false,updateUI(){}});
 const mg=source('object-management.js');vm.runInContext(mg.slice(mg.indexOf('function manager(){'),mg.indexOf('function injectStyle(){')),c);c.currentMode=()=>mode;c.forceRender=()=>manager.activate(manager.activeId);
 vm.runInContext(mg.slice(mg.indexOf('function installHistoryBridge(){'),mg.indexOf('function auditProjectSnapshot(){'))+'installHistoryBridge();',c);
 c.window.removeEventListener=(type,fn)=>c.window.listeners.set(type,(c.window.listeners.get(type)||[]).filter(f=>f!==fn));
 vm.runInContext(source('gizmo-local-pivot.js').replace(/^import .*;\n/gm,'').replaceAll('export ',''),c);
 const root={dataset:{},contains:()=>true},api=c.installLocalPivot({root,canvas:r.canvas,status:r.status,getMode:()=>mode});
 function emit(type,x=320,y=240,extra={}){const e={type,target:r.canvas,pointerId:1,pointerType:'pen',isPrimary:true,clientX:x,clientY:y,preventDefault(){},stopImmediatePropagation(){this.stopped=true;},...extra};c.window.dispatchEvent(e);return e;}
 return{...r,c,manager,a,b,api,root,emit};
}
test('1017 face frame puts Y on normal, preserves right-handed XZ tangent basis and rejects degenerate inputs',()=>{
 for(const normal of [new THREE.Vector3(0,0,1),new THREE.Vector3(1,0,0),new THREE.Vector3(1,-2,3).normalize()]){
  const frame=facePivotFrame(new THREE.Vector3(2,3,4),normal),q=pivotQuaternion(frame),x=new THREE.Vector3(1,0,0).applyQuaternion(q),y=new THREE.Vector3(0,1,0).applyQuaternion(q),z=new THREE.Vector3(0,0,1).applyQuaternion(q);
  assert(y.distanceTo(normal)<1e-10);assert(Math.abs(x.dot(normal))<1e-10);assert(Math.abs(z.dot(normal))<1e-10);assert(x.clone().cross(y).distanceTo(z)<1e-10);
 }
 assert.equal(facePivotFrame(new THREE.Vector3(),new THREE.Vector3()),null);
});
test('1017 actual renderer ray picking uses visible active body and refuses an occluding inactive object',()=>{
 const r=fixture(),s=r.c.__boxlabBridgeState;assert(pickPivotFace(s,r.canvas,{clientX:320,clientY:240}).normal.z>.99);
 const block=new THREE.Mesh(r.mesh.triangulatedGeometry(),new THREE.MeshBasicMaterial());block.position.z=3;block.userData.kind='boxlab-inactive-body';s.scene.add(block);block.updateMatrixWorld();assert.equal(pickPivotFace(s,r.canvas,{clientX:320,clientY:240}),null);
 block.visible=false;assert(pickPivotFace(s,r.canvas,{clientX:320,clientY:240}));
});
test('1017 place/centre/Y turn changes only draft, finishes one original scene checkpoint, UndoRedo restores frame and Save/Open retains it',()=>{
 const r=fixture(),before=snap(r.mesh),original={...r.a.origin};assert(r.api.toggleEdit());assert.equal(r.c.__boxlabBridgeState.controls.enabled,false);
 r.emit('pointerdown');assert(r.api.frame().center.distanceTo(new THREE.Vector3(0,0,1))<1e-8);assert.deepEqual(snap(r.mesh),before);assert.deepEqual(r.a.origin,original);
 const target={setPointerCapture(){}};r.api.handle({tool:'move',constraint:'free'},{pointerId:1,clientX:320,clientY:240,currentTarget:target,preventDefault(){},stopImmediatePropagation(){}});r.emit('pointerup');
 r.api.handle({tool:'rotate',constraint:'y'},{pointerId:1,clientX:360,clientY:240,currentTarget:target,preventDefault(){},stopImmediatePropagation(){}});r.emit('pointermove',320,280);r.emit('pointerup',320,280);
 const q=r.api.frame().quaternion;assert(new THREE.Vector3(0,1,0).applyQuaternion(q).distanceTo(new THREE.Vector3(0,0,1))<1e-9);assert(Math.abs(q.x)>0.1);assert.deepEqual(snap(r.mesh),before);
 r.api.finish(true);assert.equal(r.history.undoStack.length,1);assert.equal(r.c.__boxlabBridgeState.controls.enabled,true);const stored={...r.manager.objects[0].origin};
 r.history.undo(r.c.__boxlabBridgeState.mesh);assert.deepEqual({...r.manager.objects[0].origin},original);r.history.redo(r.c.__boxlabBridgeState.mesh);assert.deepEqual({...r.manager.objects[0].origin},stored);
 const encoded=encodeBoxlabScene(r.c.captureScene()),opened=decodeBoxlabScene(JSON.parse(JSON.stringify(encoded)),(...a)=>new EditableMesh(...a));assert.deepEqual({...opened.objects[0].origin},stored);
});
test('1017 Escape/cancel is geometry/history neutral; per-object space and origins return on reselection; locked/Multi targets refuse',()=>{
 const r=fixture(),before={...r.a.origin};r.api.toggleEdit();r.emit('pointerdown');r.emit('keydown',0,0,{key:'Escape'});assert.deepEqual(r.a.origin,before);assert.equal(r.history.undoStack.length,0);assert.equal(r.api.editing(),false);
 r.api.toggleSpace();assert(r.api.frame());r.manager.activate(2);assert.equal(r.api.frame(),null);r.api.toggleSpace();assert.equal(r.api.frame().center.x,4);r.manager.activate(1);assert.equal(r.api.frame().center.x,0);
 r.a.locked=true;assert.equal(r.api.toggleEdit(),false);r.a.locked=false;r.c.__boxlabObjectSelection.ids=new Set([1,2]);assert.equal(r.api.toggleEdit(),false);assert.equal(r.api.frame(),null);
 // Real manager's getter saves/clones active geometry. Repeated projections must
 // reuse its mutable array, yet see new object instances after scene restore.
 r.c.__boxlabObjectSelection.ids=new Set([1]);r.api.available();const list=r.manager.objects;let reads=0;Object.defineProperty(r.manager,'objects',{get(){reads++;return list;}});
 for(let i=0;i<100;i++)r.api.frame();assert.equal(reads,0);
 list.splice(0,1,{...list[0],origin:{...list[0].origin,x:9,gizmoLocal:true}});assert.equal(r.api.frame().center.x,9);assert.equal(reads,0);
});
test('1017 original exact owner uses local move/rotation/scale and pivot; geometry plus origin UndoRedo are one scene transaction',()=>{
 for(const tool of ['move','rotate','scale']){
  const r=fixture(),o=r.manager.objects[0];o.origin=facePivotFrame(new THREE.Vector3(2,0,1),new THREE.Vector3(0,0,1));
  const before=snap(r.mesh),original={...o.origin},frame=r.api.frame();assert(r.c.__boxlabTransformUpgrade.applyExact(tool,'y',tool==='rotate'?90:2));
  const rotation=new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(0,0,1),Math.PI/2);
  r.mesh.vertices.forEach((v,i)=>{const p=new THREE.Vector3(...before[i]);if(tool==='move')p.z+=2;else if(tool==='rotate')p.sub(frame.center).applyQuaternion(rotation).add(frame.center);else localScaleVector(p,frame.center,'y',2,frame);assert(v.distanceTo(p)<1e-9);});
  const after=snap(r.mesh),afterOrigin={...o.origin};assert.equal(r.history.undoStack.length,1);r.history.undo(r.c.__boxlabBridgeState.mesh);assert.deepEqual(snap(r.c.__boxlabBridgeState.mesh),before);assert.deepEqual({...r.manager.objects[0].origin},original);r.history.redo(r.c.__boxlabBridgeState.mesh);assert.deepEqual(snap(r.c.__boxlabBridgeState.mesh),after);assert.deepEqual({...r.manager.objects[0].origin},afterOrigin);
 }
});
test('1017 component exact uses object-local frame only on selected corners; local drag cancels both geometry and pivot state',()=>{
 for(const mode of ['vertex','edge','face']){
  const ids=mode==='vertex'?[0,1,2]:[0],r=fixture(mode,ids);r.a.origin=facePivotFrame(new THREE.Vector3(2,0,1),new THREE.Vector3(0,0,1));const before=snap(r.mesh);
  const selected=mode==='vertex'?ids:mode==='edge'?[r.mesh.edges()[0].a,r.mesh.edges()[0].b]:r.mesh.faces[0];r.c.__boxlabTransformUpgrade.applyExact('move','y',2);
  r.mesh.vertices.forEach((v,i)=>assert(v.distanceTo(new THREE.Vector3(...before[i]).add(new THREE.Vector3(0,0,selected.includes(i)?2:0)))<1e-9));assert.equal(r.a.origin.z,1);
 }
 const r=fixture();r.a.origin=facePivotFrame(new THREE.Vector3(2,0,1),new THREE.Vector3(0,0,1));const before=snap(r.mesh),o={...r.a.origin};assert(r.begin(350,200,{tool:'move',constraint:'x'}));r.c.__boxlabActiveGizmoDrag={tool:'move',constraint:'x'};r.dispatch('pointermove',400,200);assert.notDeepEqual(snap(r.mesh),before);r.dispatch('pointercancel',400,200);assert.deepEqual(snap(r.mesh),before);assert.deepEqual({...r.a.origin},o);
});
test('1017 real local drag freezes start basis, follows projected local rail, carries origin with object and does not compound rotation',()=>{
 for(const tool of ['move','rotate','scale']){
  const r=fixture();r.camera.position.set(4,3,8);r.camera.lookAt(0,0,0);r.camera.updateMatrixWorld();r.a.origin=facePivotFrame(new THREE.Vector3(1,0,1),new THREE.Vector3(1,1,1).normalize());
  const frame=r.api.frame(),before=snap(r.mesh),axis=new THREE.Vector3(1,0,0).applyQuaternion(frame.quaternion),project=v=>{const p=v.clone().project(r.camera);return new THREE.Vector2((p.x*.5+.5)*640,(-p.y*.5+.5)*480);},p=project(frame.center),rail=project(frame.center.clone().add(axis)).sub(p),spec={tool,constraint:'x'};
  const start=p.clone().add(new THREE.Vector2(50,0)),end=tool==='rotate'?p.clone().add(new THREE.Vector2(0,50)):start.clone().add(rail.clone().normalize().multiplyScalar(35));
  assert(r.begin(start.x,start.y,spec));r.c.__boxlabActiveGizmoDrag=spec;r.dispatch('pointermove',end.x,end.y);const first=snap(r.mesh),origin={...r.a.origin};r.dispatch('pointermove',end.x,end.y);assert.deepEqual(snap(r.mesh),first);assert.deepEqual({...r.a.origin},origin);
  if(tool==='move'){const delta=axis.clone().multiplyScalar(35/rail.length());r.mesh.vertices.forEach((v,i)=>assert(v.distanceTo(new THREE.Vector3(...before[i]).add(delta))<1e-9));assert(r.api.frame().center.distanceTo(frame.center.clone().add(delta))<1e-9);}
  if(tool==='rotate'){const q=new THREE.Quaternion().setFromAxisAngle(axis,Math.sign(axis.dot(r.camera.getWorldDirection(new THREE.Vector3())))*Math.PI/2);r.mesh.vertices.forEach((v,i)=>assert(v.distanceTo(new THREE.Vector3(...before[i]).sub(frame.center).applyQuaternion(q).add(frame.center))<1e-9));}
  if(tool==='scale'){const old=before.map(v=>new THREE.Vector3(...v).sub(frame.center).applyQuaternion(frame.quaternion.clone().invert())),now=r.mesh.vertices.map(v=>v.clone().sub(frame.center).applyQuaternion(frame.quaternion.clone().invert()));now.forEach((v,i)=>{assert(Math.abs(v.y-old[i].y)<1e-9);assert(Math.abs(v.z-old[i].z)<1e-9);});}
  r.dispatch('pointerup',end.x,end.y);assert.equal(r.history.undoStack.length,1);
 }
});
