import test from 'node:test';import assert from 'node:assert/strict';import fs from 'node:fs';import vm from 'node:vm';import * as THREE from 'three';
import {facePivotFrame,edgePivotFrame,nearestPivotEdge,pivotQuaternion,localScaleVector,pickPivotFace} from '../src/gizmo-local-pivot.js';
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
 r.emit('pointerdown');r.emit('pointerup');assert(r.api.frame().center.distanceTo(new THREE.Vector3(0,0,1))<1e-8);assert.deepEqual(snap(r.mesh),before);assert.deepEqual(r.a.origin,original);
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

function screenAt(r,point){const p=point.clone().project(r.camera),rect=r.canvas.getBoundingClientRect();return{x:rect.left+(p.x*.5+.5)*rect.width,y:rect.top+(-p.y*.5+.5)*rect.height};}
function at(r,type,point,extra={}){const p=screenAt(r,point);return r.emit(type,p.x,p.y,extra);}
test('1019 edge frame chooses nearest X or Z and sign without reversing green normal, including oblique and reversed edges',()=>{
 for(const normal of [new THREE.Vector3(0,0,1),new THREE.Vector3(1,-2,3).normalize()]){
  const initial=facePivotFrame(new THREE.Vector3(),normal),q=pivotQuaternion(initial),x=world('x').applyQuaternion(q),z=world('z').applyQuaternion(q);
  for(const [axis,direction] of [['x',x.clone().addScaledVector(z,.2)],['z',z.clone().addScaledVector(x,.2)]])for(const sign of [1,-1]){
   const edge=direction.clone().multiplyScalar(sign),result=edgePivotFrame(new THREE.Vector3(1,2,3),normal,edge,initial),out=pivotQuaternion(result.record);
   assert.equal(result.axis,axis);assert(world('y').applyQuaternion(out).distanceTo(normal)<1e-10);assert(Math.abs(world(axis).applyQuaternion(out).dot(edge.normalize()))>1-1e-10);
   assert(world(axis).applyQuaternion(out).dot(axis==='x'?x:z)>0);assert(world('x').applyQuaternion(out).cross(world('y').applyQuaternion(out)).distanceTo(world('z').applyQuaternion(out))<1e-10);
  }
 }
 assert.equal(edgePivotFrame(new THREE.Vector3(),new THREE.Vector3(0,1,0),new THREE.Vector3(),{}),null);
 assert.equal(edgePivotFrame(new THREE.Vector3(),new THREE.Vector3(0,1,0),new THREE.Vector3(0,1,0),{}),null);
 function world(a){return new THREE.Vector3(a==='x'?1:0,a==='y'?1:0,a==='z'?1:0);}
});
test('1019 actual face-boundary drag previews before release, snaps only polygon edges, keeps geometry/selection untouched and commits one scene UndoRedo/SaveOpen',()=>{
 for(const pointerType of ['touch','pen','mouse']){
  const r=fixture(),before=snap(r.mesh),origin={...r.a.origin},selected=r.selected();let released=0;r.canvas.releasePointerCapture=()=>released++;
  r.api.toggleEdit();at(r,'pointerdown',new THREE.Vector3(0,0,1),{pointerType});assert.equal(r.captured(),1);
  const hit=pickPivotFace(r.c.__boxlabBridgeState,r.canvas,{clientX:320,clientY:240});assert.equal(hit.faceIndex,1);assert.equal(hit.boundary.length,4);assert.equal(r.root.dataset.pivotSnap,''); // Not the fan diagonal.
  at(r,'pointermove',new THREE.Vector3(.3,.2,1),{pointerType,target:{}});assert(r.api.frame().center.distanceTo(new THREE.Vector3(.3,.2,1))<1e-8);assert.equal(r.history.undoStack.length,0);
  at(r,'pointermove',new THREE.Vector3(.97,.25,1),{pointerType,target:{}});const frame=r.api.frame();assert(Math.abs(frame.center.x-1)<1e-10);assert.equal(r.root.dataset.pivotSnap,'z');assert(new THREE.Vector3(0,1,0).applyQuaternion(frame.quaternion).distanceTo(new THREE.Vector3(0,0,1))<1e-10);assert(Math.abs(new THREE.Vector3(0,0,1).applyQuaternion(frame.quaternion).y)>1-1e-10);
  assert.deepEqual(snap(r.mesh),before);assert.deepEqual(r.a.origin,origin);assert.deepEqual(r.selected(),selected);
  at(r,'pointerup',new THREE.Vector3(.97,.25,1),{pointerType});assert.equal(released,1);assert.equal(r.history.undoStack.length,0);r.api.finish(true);assert.equal(r.history.undoStack.length,1);
  const saved={...r.manager.objects[0].origin};r.history.undo(r.c.__boxlabBridgeState.mesh);assert.deepEqual({...r.manager.objects[0].origin},origin);r.history.redo(r.c.__boxlabBridgeState.mesh);assert.deepEqual({...r.manager.objects[0].origin},saved);
  const opened=decodeBoxlabScene(JSON.parse(JSON.stringify(encodeBoxlabScene(r.c.captureScene()))),(...a)=>new EditableMesh(...a));assert.deepEqual({...opened.objects[0].origin},JSON.parse(JSON.stringify(saved)));assert.deepEqual(snap(r.mesh),before);
 }
});
test('1019 oblique silhouette snapping latches starting face normal, releases magnet away from edge and ignores secondary pointers',()=>{
 const r=fixture();r.camera.position.set(4,3,8);r.camera.lookAt(0,0,0);r.camera.updateMatrixWorld();r.api.toggleEdit();
 at(r,'pointerdown',new THREE.Vector3(0,0,1));at(r,'pointermove',new THREE.Vector3(1.02,.25,1));
 let frame=r.api.frame();assert(Math.abs(frame.center.x-1)<1e-8);assert.equal(r.root.dataset.pivotSnap,'z');assert(new THREE.Vector3(0,1,0).applyQuaternion(frame.quaternion).distanceTo(new THREE.Vector3(0,0,1))<1e-9);
 const snapped=frame.center.clone();at(r,'pointerdown',new THREE.Vector3(-.6,0,1),{pointerId:2,isPrimary:false});at(r,'pointermove',new THREE.Vector3(-.6,0,1),{pointerId:2});assert(r.api.frame().center.distanceTo(snapped)<1e-9);
 at(r,'pointermove',new THREE.Vector3(.2,.2,1));frame=r.api.frame();assert.equal(r.root.dataset.pivotSnap,'');assert(frame.center.distanceTo(new THREE.Vector3(.2,.2,1))<1e-8);
 at(r,'pointerup',new THREE.Vector3(.2,.2,1));r.api.finish(false);assert.equal(r.c.__boxlabBridgeState.controls.enabled,true);assert.equal(r.history.undoStack.length,0);
});
test('1019 cancellation restores pre-drag draft; Escape/pagehide clean capture/listeners with no geometry/history edits',()=>{
 for(const end of ['pointercancel','lostpointercapture','Escape','pagehide']){
  const r=fixture(),before=snap(r.mesh),origin={...r.a.origin};let released=0;r.canvas.releasePointerCapture=()=>released++;
  r.api.toggleEdit();const draft=r.api.frame();at(r,'pointerdown',new THREE.Vector3(0,0,1));at(r,'pointermove',new THREE.Vector3(.97,.25,1));
  if(end==='Escape')r.emit('keydown',0,0,{key:'Escape'});else if(end==='pagehide')r.emit('pagehide');else at(r,end,new THREE.Vector3(.97,.25,1));
  if(['pointercancel','lostpointercapture'].includes(end)){assert(r.api.frame().center.distanceTo(draft.center)<1e-10);assert(r.api.frame().quaternion.angleTo(draft.quaternion)<1e-7);r.api.finish(false);}
  assert.equal(released,1);assert.equal(r.api.editing(),false);assert.equal(r.c.__boxlabBridgeState.controls.enabled,true);assert.deepEqual(r.a.origin,origin);assert.deepEqual(snap(r.mesh),before);assert.equal(r.history.undoStack.length,0);
  assert.equal((r.c.window.listeners.get('lostpointercapture')||[]).length,0);assert.equal((r.c.window.listeners.get('pointermove')||[]).length,0);
 }
});
test('1019 hidden boundary refuses snap through inactive occluder; resumed visible face restores live preview',()=>{
 const r=fixture(),s=r.c.__boxlabBridgeState;r.api.toggleEdit();at(r,'pointerdown',new THREE.Vector3(0,0,1));const start=r.api.frame().center.clone();
 const block=new THREE.Mesh(r.mesh.triangulatedGeometry(),new THREE.MeshBasicMaterial());block.position.z=3;block.userData.kind='boxlab-inactive-body';s.scene.add(block);block.updateMatrixWorld();
 at(r,'pointermove',new THREE.Vector3(.97,.25,1));assert(r.api.frame().center.distanceTo(start)<1e-10);assert.equal(r.root.dataset.pivotSnap,'');
 block.visible=false;at(r,'pointermove',new THREE.Vector3(.97,.25,1));assert.equal(r.root.dataset.pivotSnap,'z');assert(Math.abs(r.api.frame().center.x-1)<1e-10);r.api.finish(false);
});
test('1019 projected edge snaps perspective-correctly under pointer, and explicit indexed renderer ownership excludes internal diagonals',()=>{
 const r=fixture(),a=new THREE.Vector3(-1,0,2),b=new THREE.Vector3(1,0,-2),point=a.clone().lerp(b,.73),p=screenAt(r,point),surface={normal:new THREE.Vector3(0,1,0),boundary:[a,b],basis:{}};
 const edge=nearestPivotEdge(surface,{clientX:p.x,clientY:p.y},r.camera,r.canvas);assert(edge);assert(edge.point.distanceTo(point)<1e-9);
 const s=r.c.__boxlabBridgeState,body=s.scene.children[0],g=body.geometry;g.setIndex(Array.from({length:g.attributes.position.count},(_,i)=>i));g.userData.boxlabTriangleFaces=r.mesh.faces.flatMap((face,index)=>Array(face.length-2).fill(index));
 const hit=pickPivotFace(s,r.canvas,{clientX:320,clientY:240});assert.equal(hit.faceIndex,1);assert.equal(hit.boundary.length,4);
 const noDiagonal=nearestPivotEdge({...hit,basis:{}},{clientX:320,clientY:240},r.camera,r.canvas);assert.equal(noDiagonal,null);
});
test('1019 actual Total Gizmo projection follows draft placement and edge yaw before release, including front ring hit paths',()=>{
 const r=fixture(),initial=facePivotFrame(new THREE.Vector3(),new THREE.Vector3(0,0,1)),q=pivotQuaternion(initial).premultiply(new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(0,0,1),.25));
 Object.assign(r.a.origin,initial,{qx:q.x,qy:q.y,qz:q.z,qw:q.w});
 const nodes=new Map(),node=()=>({attrs:{},setAttribute(k,v){this.attrs[k]=v;}});
 for(const a of ['x','y','z']){nodes.set(`.tg-${a}-group`,node());const p=node();p.__hitProxy=node();nodes.set(`.tg-handle.tg-arc[data-ring-axis="${a}"]`,p);}
 for(const a of ['xy','xz','yz'])nodes.set('.tg-plane-'+a,node());
 Object.assign(r.root,{hidden:false,getBoundingClientRect:()=>({width:196,height:196}),querySelector:s=>nodes.get(s)||null});Object.assign(r.c,{root:r.root,canvas:r.canvas,SIZE:196,HALF:98});
 const g=source('total-gizmo.js');vm.runInContext(g.slice(g.indexOf('function centerOf('),g.indexOf('function arm('))+g.slice(g.indexOf('function planePoints('),g.indexOf('\nfunction sync(){')),r.c);
 r.api.toggleEdit();at(r,'pointerdown',new THREE.Vector3(.1,.1,1));r.c.syncAxisVisuals(r.c.centerOf(r.mesh,'object'),r.camera);const x=nodes.get('.tg-x-group').attrs.transform,path=nodes.get('.tg-handle.tg-arc[data-ring-axis="x"]').attrs.d;
 at(r,'pointermove',new THREE.Vector3(.97,.25,1));const anchor=r.c.centerOf(r.mesh,'object');r.c.syncAxisVisuals(anchor,r.camera);
 assert(Math.abs(anchor.x-1)<1e-10);assert.notEqual(nodes.get('.tg-x-group').attrs.transform,x);assert.notEqual(nodes.get('.tg-handle.tg-arc[data-ring-axis="x"]').attrs.d,path);
 for(const a of ['x','y','z']){const p=nodes.get(`.tg-handle.tg-arc[data-ring-axis="${a}"]`);assert(p.attrs.d.length>0);assert.equal(p.attrs.d,p.__hitProxy.attrs.d);}
 assert.equal(r.history.undoStack.length,0);r.api.finish(false);
});

// Face-mode placement must use the selected polygon at a shared-edge hit, rather
// than whichever adjacent render triangle wins a floating-point depth tie.
test('1023 selected Face owns shared-edge placement and tangential edge snap without moving the model',()=>{
 const r=fixture('face',[1]);r.camera.position.set(4,3,8);r.camera.lookAt(0,0,0);r.camera.updateMatrixWorld();
 const shared=new THREE.Vector3(1,0,1),p=screenAt(r,shared),unfiltered=pickPivotFace(r.c.__boxlabBridgeState,r.canvas,{clientX:p.x,clientY:p.y});
 assert([1,3].includes(unfiltered.faceIndex));const selected=unfiltered.faceIndex===1?3:1;
 r.c.__boxlabSelectionBridge.set('face',[selected]);const before=snap(r.mesh),origin={...r.a.origin};
 assert(pickPivotFace(r.c.__boxlabBridgeState,r.canvas,{clientX:p.x,clientY:p.y},[selected]),'selected shared-edge hit exists');
 r.api.toggleEdit();at(r,'pointerdown',shared);
 const normal=r.mesh.faceNormal(selected);assert(new THREE.Vector3(0,1,0).applyQuaternion(r.api.frame().quaternion).distanceTo(normal)<1e-8,'green Y must use selected face at shared edge');
 assert(r.root.dataset.pivotSnap,'shared edge snaps immediately');
 const next=selected===1?new THREE.Vector3(.3,.97,1):new THREE.Vector3(1,.97,.3);
 at(r,'pointermove',next);const frame=r.api.frame();assert(r.root.dataset.pivotSnap);assert(Math.abs(frame.center.y-1)<1e-8);assert(new THREE.Vector3(0,1,0).applyQuaternion(frame.quaternion).distanceTo(normal)<1e-8);
 assert.deepEqual(snap(r.mesh),before);assert.deepEqual(r.a.origin,origin);assert.deepEqual(r.selected(),[selected]);
 at(r,'pointerup',next);r.api.finish(true);assert.equal(r.history.undoStack.length,1);
});

test('1023 Face interior drag matches Object/Edge on tilted real polygon edges; selected-only picking refuses hidden/unselected interiors',()=>{
 for(const [mode,pointerType] of [['object','mouse'],['edge','pen'],['face','touch']]){
  const r=fixture(mode,[1]),s=r.c.__boxlabBridgeState;
  for(const v of r.mesh.vertices)v.applyAxisAngle(new THREE.Vector3(0,0,1),.4);
  const body=s.scene.children[0];body.geometry.dispose();body.geometry=r.mesh.triangulatedGeometry();body.updateMatrixWorld();
  r.camera.position.set(4,3,8);r.camera.lookAt(0,0,0);r.camera.updateMatrixWorld();
  const before=snap(r.mesh),center=r.mesh.faceCenter(1),a=r.mesh.vertices[5],b=r.mesh.vertices[6],edge=a.clone().lerp(b,.35),near=edge.clone().lerp(center,.02);
  r.api.toggleEdit();at(r,'pointerdown',center,{pointerType});at(r,'pointermove',near,{pointerType});
  const frame=r.api.frame(),axis=r.root.dataset.pivotSnap;assert(axis);const direction=b.clone().sub(a).normalize();assert(Math.abs(new THREE.Vector3(axis==='x'?1:0,0,axis==='z'?1:0).applyQuaternion(frame.quaternion).dot(direction))>1-1e-9);
  assert(frame.center.distanceTo(new THREE.Line3(a,b).closestPointToPoint(frame.center,true,new THREE.Vector3()))<1e-7);assert(new THREE.Vector3(0,1,0).applyQuaternion(frame.quaternion).distanceTo(r.mesh.faceNormal(1))<1e-9);assert.deepEqual(snap(r.mesh),before);r.api.finish(false);
 }
 const r=fixture('face',[0]),p=screenAt(r,new THREE.Vector3(0,0,1));assert.equal(pickPivotFace(r.c.__boxlabBridgeState,r.canvas,{clientX:p.x,clientY:p.y},[0]),null,'back selected face cannot be picked through front');
 r.api.toggleEdit();const before=r.api.frame().center.clone();at(r,'pointerdown',new THREE.Vector3(0,0,1));assert(r.api.frame().center.equals(before));r.api.finish(false);assert.equal(r.history.undoStack.length,0);
});
