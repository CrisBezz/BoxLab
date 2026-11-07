import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import * as THREE from 'three';
import {rotateOwnerRuntime} from './helpers/rotate-owner-runtime.mjs';
const read=p=>fs.readFileSync(new URL('../'+p,import.meta.url),'utf8');
const gizmo=read('src/total-gizmo.js');
const snapshot=m=>m.vertices.map(v=>v.toArray());
test('1012 grey ball replaces inner screen circle, sits behind original handles and retains transparent/yellow styling and orange scale ring',()=>{
 const ball=gizmo.indexOf('class="tg-handle tg-screen-ring tg-rotation-ball"');
 assert(ball>0&&ball<gizmo.indexOf('<g class="tg-rotate tg-axis-rotate">'));
 assert.equal((gizmo.match(/class="tg-handle tg-screen-ring/g)||[]).length,1);
 assert.match(gizmo,/#totalGizmo \.tg-rotation-ball\{pointer-events:all;fill:rgba\(200,204,210,\.025\);stroke:#34373b/);
 assert.match(gizmo,/tg-rotation-ball\.active\{fill:rgba\(255,221,80,\.055\)/);
 assert.match(gizmo,/tg-scale-ring" data-tool="scale" data-constraint="free" data-kind="uniform"[^\n]+r="78"/);
 assert(gizmo.includes(".tg-handle:not(.tg-center):not(.tg-plane):not(.tg-rotation-ball)"));
});
function ringRuntime(){
 const paths=new Map(),root={hidden:false,getBoundingClientRect:()=>({width:196,height:196}),querySelector:q=>paths.get(q)||null},camera=new THREE.PerspectiveCamera(45,1.5,.01,100);
 camera.position.set(4.2,3.1,4.6);camera.lookAt(0,0,0);camera.updateMatrixWorld();
 const c=vm.createContext({THREE,root,SIZE:196,HALF:98,canvas:{getBoundingClientRect:()=>({width:900,height:600})}});
 vm.runInContext(gizmo.slice(gizmo.indexOf('function screenPoint('),gizmo.indexOf('function axisScreen('))+gizmo.slice(gizmo.indexOf('function ringWorldRadius('),gizmo.indexOf('function syncAxisVisuals(')),c);
 return{c,root,camera,paths};
}
test('1012 all three actual front-arc paths and hit proxies exclude rear hemisphere with open ends; edge-on silhouette remains selectable',()=>{
 const r=ringRuntime(),center=new THREE.Vector3();
 for(const axis of ['x','y','z']){
  const path={attrs:{},setAttribute(k,v){this.attrs[k]=v;},__hitProxy:{attrs:{},setAttribute(k,v){this.attrs[k]=v;}}};
  r.paths.set(`.tg-handle.tg-arc[data-ring-axis="${axis}"]`,path);
 }
 r.c.syncRotationRings(center,r.camera);
 for(const axis of ['x','y','z']){
  const [u,v]=r.c.ringBasis(axis),toward=r.camera.position.clone().sub(center),radius=r.c.ringWorldRadius(center,r.camera);
  const start=Math.atan2(v.dot(toward),u.dot(toward))-Math.PI/2;
  const d=r.paths.get(`.tg-handle.tg-arc[data-ring-axis="${axis}"]`).attrs.d;
  assert(!d.endsWith('Z'));assert.equal((d.match(/L/g)||[]).length,48);
  const coordinates=d.match(/-?\d+(?:\.\d+)?/g).map(Number),origin=r.c.screenPoint(center,r.camera);
  for(let i=0;i<=48;i++){
   const a=start+i/48*Math.PI,offset=u.clone().multiplyScalar(Math.cos(a)*radius).addScaledVector(v,Math.sin(a)*radius);
   assert(offset.dot(toward)>-1e-10);
   const expected=r.c.screenPoint(center.clone().add(offset),r.camera);
   assert(Math.abs(coordinates[i*2]-(98+expected.x-origin.x))<.006);
   assert(Math.abs(coordinates[i*2+1]-(98+expected.y-origin.y))<.006);
  }
  const path=r.paths.get(`.tg-handle.tg-arc[data-ring-axis="${axis}"]`);assert.equal(path.attrs.d,path.__hitProxy.attrs.d);
 }
 r.camera.position.set(0,0,5);r.camera.lookAt(0,0,0);r.camera.updateMatrixWorld();
 assert(r.c.projectedRingPath(center,r.camera,'z').endsWith(' Z'));
});
test('1012 grey ball rotates selected geometry around an oblique view axis even with Axis Snap on; one Undo/Redo and no camera change',()=>{
 const source=read('src/transform-upgrade.js').replace("const axisSnapToggle=document.querySelector('#axisSnapToggle');","const axisSnapToggle={checked:true,addEventListener(){}};");
 for(const mode of ['object','face','edge','vertex']){
  const ids=mode==='vertex'?[0,1]:[0],r=rotateOwnerRuntime({mode,ids,upgradeSource:source});
  r.camera.position.set(4,3,8);r.camera.lookAt(0,0,0);r.camera.updateMatrixWorld();
  const camera=r.camera.matrixWorld.toArray(),before=snapshot(r.mesh),p=r.centre();
  const selected=mode==='object'?r.mesh.vertices.map((_,i)=>i):mode==='face'?r.mesh.faces[0]:mode==='edge'?[r.mesh.edges()[0].a,r.mesh.edges()[0].b]:ids;
  const centre=new THREE.Vector3();selected.forEach(i=>centre.add(r.mesh.vertices[i]));centre.divideScalar(selected.length);
  assert(r.begin(p.x+40,p.y,{tool:'rotate',constraint:'free',kind:'screen'}));
  r.c.__boxlabActiveGizmoDrag={tool:'rotate',constraint:'free',kind:'screen'};
  r.dispatch('pointermove',p.x,p.y+40);r.dispatch('pointerup',p.x,p.y+40);
  const q=new THREE.Quaternion().setFromAxisAngle(r.camera.getWorldDirection(new THREE.Vector3()),Math.PI/2);
  r.mesh.vertices.forEach((v,i)=>{const expected=new THREE.Vector3(...before[i]);if(selected.includes(i))expected.sub(centre).applyQuaternion(q).add(centre);assert(v.distanceTo(expected)<1e-9);});
  assert.deepEqual(r.camera.matrixWorld.toArray(),camera);assert.equal(r.history.undoStack.length,1);assert.deepEqual(r.selected(),ids);
  const after=snapshot(r.mesh),undo=r.history.undo(r.mesh);assert.deepEqual(snapshot(undo),before);assert.deepEqual(snapshot(r.history.redo(undo)),after);
 }
});
test('1012 grey ball tap does not edit/history; cancel restores original geometry',()=>{
 const r=rotateOwnerRuntime({mode:'object'}),p=r.centre(),before=snapshot(r.mesh),spec={tool:'rotate',constraint:'free',kind:'screen'};
 assert(r.begin(p.x+40,p.y,spec));r.dispatch('pointerup',p.x+40,p.y);assert.deepEqual(snapshot(r.mesh),before);assert.equal(r.history.undoStack.length,0);
 assert(r.begin(p.x+40,p.y,spec));r.dispatch('pointermove',p.x,p.y+40);assert.notDeepEqual(snapshot(r.mesh),before);r.dispatch('pointercancel',p.x,p.y+40);assert.deepEqual(snapshot(r.mesh),before);
});
test('1012 original Multi/group owner uses view axis with Axis Snap enabled, updates origins and cancels without camera motion',()=>{
 const r=rotateOwnerRuntime({mode:'object'}),a=r.mesh,b=r.mesh.clone();b.vertices.forEach(v=>v.x+=4);
 const objects=[{id:1,mesh:a,origin:{x:0,y:0,z:0}},{id:2,mesh:b,origin:{x:4,y:0,z:0}}],canvas=r.canvas;
 r.camera.position.set(4,3,8);r.camera.lookAt(2,0,0);r.camera.updateMatrixWorld();
 const selected={dataset:{mode:'object'}},tool={dataset:{tool:'rotate'}},snap={checked:true},status={},marker={style:{}};
 const c={THREE,Event:class{},document:{body:{append(){}},createElement:()=>marker,querySelector:q=>({'#viewport':canvas,'#selectionStatus':status,'#selectionModes button.active':selected,'#toolModes button.active':tool,'#axisSnapToggle':snap}[q]||null)},
  __boxlabBridgeState:{mesh:a,camera:r.camera},__boxlabObjectManager:{activeId:1,objects,saveActive(){}},__boxlabObjectSelection:{ids:new Set([1,2])},__boxlabActiveGizmoDrag:{tool:'rotate',kind:'screen'},__boxlabTransformArming:{constraint:()=> 'free'},__boxlabHistory:r.history};
 vm.createContext(c);const source=read('src/object-origin.js');vm.runInContext(source.slice(source.indexOf('const canvas'),source.indexOf("window.addEventListener('pointerdown',beginMoveWatch")),c);
 const before=objects.map(o=>snapshot(o.mesh)),cam=r.camera.matrixWorld.toArray(),centre=new THREE.Vector3(2,0,0),p=c.screenPoint(centre,r.camera),event=(x,y,type='pointermove')=>({target:canvas,pointerType:'pen',isPrimary:true,pointerId:1,clientX:x,clientY:y,type,preventDefault(){},stopImmediatePropagation(){}});
 c.startMultiPivotGesture(event(p.x+40,p.y,'pointerdown'));c.moveMultiPivotGesture(event(p.x,p.y+40));
 const q=new THREE.Quaternion().setFromAxisAngle(r.camera.getWorldDirection(new THREE.Vector3()),Math.PI/2);
 objects.forEach((o,j)=>o.mesh.vertices.forEach((v,i)=>assert(v.distanceTo(new THREE.Vector3(...before[j][i]).sub(centre).applyQuaternion(q).add(centre))<1e-9)));
 assert.equal(r.history.undoStack.length,1);assert.deepEqual(r.camera.matrixWorld.toArray(),cam);
 c.endMultiPivotGesture(event(p.x,p.y+40,'pointercancel'));
 objects.forEach((o,j)=>assert.deepEqual(snapshot(o.mesh),before[j]));assert.equal(objects[1].origin.x,4);assert.equal(objects[1].origin.y,0);
});
