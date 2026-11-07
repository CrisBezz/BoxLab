import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import * as THREE from 'three';
import {History} from '../src/history.js';
import {parseEditableOBJ} from '../src/obj-facegroups-core.js';
import {pickScreenEdges} from '../src/edge-screen-picking.js';
import {mainPickerRuntime} from './helpers/main-picker-runtime.mjs';
import {pencilSelectionRuntime} from './helpers/pencil-selection-runtime.mjs';
const read=p=>fs.readFileSync(new URL('../src/'+p,import.meta.url),'utf8');
const supplied=()=>parseEditableOBJ(fs.readFileSync(new URL('./fixtures/convex-edge-954.obj',import.meta.url),'utf8'))[0].mesh;
const rect={left:80,top:50,width:1366,height:900},canvas={getBoundingClientRect:()=>rect};
function line(root,a,b,index){const o=new THREE.Line(new THREE.BufferGeometry().setFromPoints([a,b]),new THREE.LineBasicMaterial({visible:false}));o.userData={kind:'edge',index};root.add(o);return o;}
function proxies(m,root=new THREE.Group()){for(const o of [...root.children]){o.geometry?.dispose();o.material?.dispose();root.remove(o);}m.edges().forEach((e,i)=>line(root,m.vertices[e.a],m.vertices[e.b],i));root.updateMatrixWorld(true);return root;}
function camera(scale=1){const c=new THREE.PerspectiveCamera(42,rect.width/rect.height,.01*scale,100*scale);c.position.set(2.2,1.4,2.7).multiplyScalar(scale);c.lookAt(0,.5*scale,0);c.updateMatrixWorld();return c;}
function at(world,c){const p=world.clone().project(c);return {clientX:rect.left+(p.x*.5+.5)*rect.width,clientY:rect.top+(-p.y*.5+.5)*rect.height,pointerType:'pen',isPrimary:true};}
function edgeAt(m,i,c,t=.5){const e=m.edges()[i];return at(m.vertices[e.a].clone().lerp(m.vertices[e.b],t),c);}
test('954 exact supplied 60-vertex/84-face OBJ: native picker selects twelve previously depth-stolen line midpoints; old world-radius ranking fails all twelve',()=>{
 const m=supplied(),root=proxies(m),c=camera(),f=mainPickerRuntime({root,camera:c,canvas}),before=JSON.stringify(m),raw=new THREE.Raycaster();raw.params.Line.threshold=.09;assert.equal(m.vertices.length,60);assert.equal(m.faces.length,84);
 for(const index of [19,34,42,44,45,47,48,49,50,56,57,59]){const event=edgeAt(m,index,c);raw.setFromCamera(new THREE.Vector2((event.clientX-rect.left)/rect.width*2-1,-((event.clientY-rect.top)/rect.height*2-1)),c);assert.notEqual(raw.intersectObjects(root.children,false)[0]?.object.userData.index,index,'fixture must expose original failure');assert.equal(f.bridge.pick('edge',event)?.index,index);assert.equal(f.bridge.pickHits('edge',event)[0].index,index);}
 assert.equal(JSON.stringify(m),before);
});
test('954 actual original Flip Edge owner plus native picker selects new convex/concave diagonal immediately after rebuild, Undo and Redo',()=>{
 let m=supplied(),ids=[49];const root=proxies(m),camera_=camera(),f=mainPickerRuntime({root,camera:camera_,canvas}),history=new History(),source=read('rotate-edge.js');const c={THREE,mesh:()=>m,selectedEdges:()=>ids,edgeKey:(m,a,b)=>m.edgeKey(a,b),__boxlabHistory:history,bridge:()=>({set:(mode,next)=>ids=Array.from(next)}),render:()=>proxies(m,root),status:{},sync(){},queueMicrotask:f=>f()};vm.createContext(c);vm.runInContext(source.slice(source.indexOf('function directedEdge('),source.indexOf('function sync(){')),c);
 const before=JSON.stringify(m),plan=c.info(m,49);assert(plan.ok);assert.equal(f.bridge.pick('edge',edgeAt(m,49,camera_)).index,49);assert(c.apply());assert.equal(history.undoStack.length,1);assert.equal(m.edges()[ids[0]].a+':'+m.edges()[ids[0]].b,plan.newKey);assert.equal(f.bridge.pick('edge',edgeAt(m,ids[0],camera_)).index,ids[0]);const after=JSON.stringify(m);
 m=history.undo(m);proxies(m,root);assert.equal(JSON.stringify(m),before);assert.equal(f.bridge.pick('edge',edgeAt(m,49,camera_)).index,49);m=history.redo(m);proxies(m,root);assert.equal(JSON.stringify(m),after);const i=m.edges().findIndex(e=>m.edgeKey(e.a,e.b)===plan.newKey);assert.equal(f.bridge.pick('edge',edgeAt(m,i,camera_)).index,i);
});
test('954 12 CSS-pixel radius is invariant under model scale, perspective/orthographic zoom, canvas backing resolution and transformed proxy parents',()=>{
 for(const scale of [.001,1,10000])for(const orthographic of [false,true]){const root=new THREE.Group(),group=new THREE.Group();root.add(group);group.position.set(.1,0,0).multiplyScalar(scale);group.rotation.z=.3;group.scale.setScalar(scale);line(group,new THREE.Vector3(-.5,0,0),new THREE.Vector3(.5,0,0),7);root.updateMatrixWorld(true);
 const c=orthographic?new THREE.OrthographicCamera(-scale,scale,scale,-scale,.01*scale,100*scale):new THREE.PerspectiveCamera(42,rect.width/rect.height,.01*scale,100*scale);c.position.set(0,0,3*scale);c.lookAt(0,0,0);c.updateMatrixWorld();const middle=group.localToWorld(new THREE.Vector3()),event=at(middle,c),normal={x:-Math.sin(.3),y:-Math.cos(.3)};
 // Orthographic camera's unequal viewport scale requires screen-space perpendicular.
 const end=at(group.localToWorld(new THREE.Vector3(.5,0,0)),c),dx=end.clientX-event.clientX,dy=end.clientY-event.clientY,length=Math.hypot(dx,dy);normal.x=-dy/length;normal.y=dx/length;
 const hit=offset=>pickScreenEdges({...event,clientX:event.clientX+normal.x*offset,clientY:event.clientY+normal.y*offset},c,{...canvas,width:2732,height:1800},group.children);
 assert.equal(hit(10)[0]?.index,7);assert.equal(hit(13).length,0);assert.equal(hit(0)[0].type,'edge');}
});
test('954 screen ties keep nearer-depth order; hidden parents, off-viewport, behind-camera and far-plane proxies do not acquire targets; near-crossing lines clip safely',()=>{
 const root=new THREE.Group(),c=new THREE.PerspectiveCamera(60,1,.1,20);c.position.set(0,0,0);c.lookAt(0,0,-1);c.updateMatrixWorld();const localCanvas={getBoundingClientRect:()=>({left:0,top:0,width:600,height:600})},event={clientX:300,clientY:300};
 line(root,new THREE.Vector3(-1,0,-4),new THREE.Vector3(1,0,-4),2);line(root,new THREE.Vector3(-1,0,-2),new THREE.Vector3(1,0,-2),1);line(root,new THREE.Vector3(-1,0,2),new THREE.Vector3(1,0,2),3);line(root,new THREE.Vector3(-1,0,-25),new THREE.Vector3(1,0,-25),4);root.updateMatrixWorld(true);
 assert.deepEqual(pickScreenEdges(event,c,localCanvas,root.children).map(h=>h.index),[1,2]);root.children[1].visible=false;assert.equal(pickScreenEdges(event,c,localCanvas,root.children)[0].index,2);root.visible=false;assert.equal(pickScreenEdges(event,c,localCanvas,root.children).length,0);root.visible=true;
 assert.equal(pickScreenEdges({...event,clientX:-5},c,localCanvas,root.children).length,0);assert.equal(pickScreenEdges({...event,clientX:NaN},c,localCanvas,root.children).length,0);
 const clipped=new THREE.Group();line(clipped,new THREE.Vector3(0,0,1),new THREE.Vector3(0,0,-2),8);clipped.updateMatrixWorld(true);assert.equal(pickScreenEdges(event,c,localCanvas,clipped.children)[0].index,8);
});
test('954 original selected-component toggle uses the SAME native Edge pick: neighbouring unselected edge is not stolen; selected tap still removes exactly that edge without history',()=>{
 const m=supplied(),c=camera(),root=proxies(m),f=mainPickerRuntime({root,camera:c,canvas});let ids=[49],handler;const history=new History();history.redoStack.push(m.clone());const before=JSON.stringify(m),context={THREE,__boxlabSelectionBridge:{...f.bridge,mode:()=> 'edge',indices:()=>ids,set:(mode,next)=>ids=Array.from(next)},__boxlabBridgeState:{mesh:m,camera:c},document:{querySelector:q=>q==='#viewport'?canvas:null,addEventListener:(type,fn)=>handler=fn}};vm.createContext(context);vm.runInContext(read('component-tap-toggle.js').replace(/^import .*\n/,''),context);
 const near=edgeAt(m,50,c,.85);assert.equal(f.bridge.pick('edge',near).index,50);let consumed=false;handler({...near,target:canvas,preventDefault(){consumed=true;},stopImmediatePropagation(){}});assert.equal(consumed,false);assert.deepEqual(ids,[49]);
 handler({...edgeAt(m,49,c),target:canvas,preventDefault(){consumed=true;},stopImmediatePropagation(){}});assert(consumed);assert.deepEqual(ids,[]);assert.equal(JSON.stringify(m),before);assert.equal(history.undoStack.length,0);assert.equal(history.redoStack.length,1);
});
test('954 original Edge paint selector delegates native hit ordering for visible and through while retaining exact event, unique IDs and original non-Edge fallback',()=>{
 const s=read('edge-paint-select.js'),event={clientX:123,clientY:456};let calls=[];const context={selection:()=>({pickHits:(type,e)=>{calls.push([type,e]);return [{index:5},{index:2},{index:5}];}}),paintDepth:'visible'};vm.createContext(context);vm.runInContext(s.slice(s.indexOf('function hitIndices('),s.indexOf('function addHits(')),context);assert.deepEqual(Array.from(context.hitIndices(event,'edge')),[5]);context.paintDepth='through';assert.deepEqual(Array.from(context.hitIndices(event,'edge')),[5,2]);assert(calls.every(([type,e])=>type==='edge'&&e===event));
});
test('954 actual Pencil orbit gate and paint-selection owner share repaired native edge hit; release/cancel and later finger orbit retain selection with no history',()=>{
 const m=supplied(),f=pencilSelectionRuntime(m),camera_=f.state.camera,rect_=f.canvas.getBoundingClientRect();camera_.copy(camera());camera_.aspect=rect_.width/rect_.height;camera_.updateProjectionMatrix();camera_.updateMatrixWorld();const native=mainPickerRuntime({root:proxies(m),camera:camera_,canvas:f.canvas});
 f.context.__boxlabSelectionBridge.pick=(type,event)=>native.bridge.pick(type,event);f.context.__boxlabSelectionBridge.pickHits=(type,event)=>native.bridge.pickHits(type,event);
 const e=m.edges()[49],p=f.screen(m.vertices[e.a].clone().lerp(m.vertices[e.b],.5)),before=JSON.stringify(m);f.pointer('pointerdown',{clientX:p.x,clientY:p.y});assert.deepEqual(Array.from(f.ids()),[49]);assert.equal(f.orbit().down,0);f.pointer('pointerup',{clientX:p.x,clientY:p.y});assert.deepEqual(Array.from(f.ids()),[49]);assert.equal(f.context.__boxlabPaintSelectDebug.pending(),null);assert(!f.events.some(e=>e.type==='boxlab-pencil-background-tap'));
 f.pointer('pointerdown',{clientX:p.x,clientY:p.y,pointerId:2});f.pointer('pointercancel',{clientX:p.x,clientY:p.y,pointerId:2});assert.equal(f.context.__boxlabPaintSelectDebug.active(),null);assert.equal(f.context.__boxlabPaintSelectDebug.pending(),null);
 f.pointer('pointerdown',{clientX:990,clientY:590,pointerType:'touch',pointerId:3});assert.equal(f.orbit().down,1);f.pointer('pointerup',{clientX:990,clientY:590,pointerType:'touch',pointerId:3});assert.deepEqual(Array.from(f.ids()),[49]);assert.equal(JSON.stringify(m),before);assert.equal(f.history.undoStack.length,0);
});
