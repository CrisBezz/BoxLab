import test from 'node:test';import assert from 'node:assert/strict';import fs from 'node:fs';import vm from 'node:vm';import * as THREE from 'three';
import {createSelectionInputOptions,installSelectionInputControls} from '../src/selection-input-controls.js';import {frontDragRuntime} from './helpers/front-drag-selection-runtime.mjs';import {mainPickerRuntime} from './helpers/main-picker-runtime.mjs';import {faceRuntime,snapshot} from './helpers/negative-extrude-runtime.mjs';import {EditableMesh} from '../src/mesh.js';
test('1126 FRONT actual main picker keeps nearest front face and never tunnels behind a back-facing occluder',()=>{
 const f=mainPickerRuntime(),input=createSelectionInputOptions(f.context);f.context.__boxlabSelectionInput=input;const near=f.add('face',0,1);f.add('face',1,0);
 assert.deepEqual(Array.from(f.bridge.pickHits('face',f.event),h=>h.index),[0]);near.rotation.y=Math.PI;f.root.updateMatrixWorld(true);assert.equal(f.bridge.pick('face',f.event),null);input.setFront(false);assert.equal(f.bridge.pick('face',f.event).index,0);assert(f.bridge.pickHits('face',f.event).some(h=>h.index===1));
});
test('1126 FRONT overrides armed selected-face priority behind the visible surface, OFF retains legacy priority',()=>{
 for(const front of [true,false]){const m=EditableMesh.cube(),f=faceRuntime(m,[0]),camera=f.context.__boxlabBridgeState.camera;camera.position.set(0,0,5);camera.lookAt(0,0,0);camera.updateMatrixWorld();const input=createSelectionInputOptions(f.context);input.setFront(front);f.context.__boxlabSelectionInput=input;const b=f.context.__boxlabSelectionBridge;b.pick=()=>({index:1});b.pickHits=()=>[{index:1,distance:4},{index:0,distance:6}];f.owner.setTool('extrude');f.pointer('pointerdown',{pointerType:'pen',pointerId:2,clientX:450,clientY:300});assert.equal(f.api.pending().hit,front?1:0);f.pointer('pointercancel',{pointerId:2});assert.equal(f.history.undoStack.length,0);}
});
test('DRAG add stroke starts on an unselected seed and samples skipped faces with coalesced Pencil movement',()=>{
 const f=frontDragRuntime(),before=snapshot(f.state.mesh);f.setIds([3]);f.input.setDrag(true);f.history.redoStack.push(f.state.mesh.clone());let publishes=0;const b=f.context.__boxlabSelectionBridge,originalSet=b.set;b.set=(...a)=>{publishes++;return originalSet(...a);};const down=f.pen('pointerdown',0);assert(down.stopped);assert.equal(f.state.controls.enabled,false);assert.equal(f.context.__boxlabPaintSelectDebug.active().type,'face');
 const afterDown=publishes,middle=f.point(1);f.pen('pointermove',2,{getCoalescedEvents:()=>[{clientX:middle.x,clientY:middle.y}]});f.pen('pointerup',2,{buttons:0,pressure:0});assert.deepEqual(f.ids(),[3,0,1,2]);assert.equal(publishes-afterDown,1,'one selection publication per sampled event');assert.equal(f.state.controls.enabled,true);assert.equal(f.context.__boxlabPaintSelectDebug.active(),null);assert.equal(f.orbit().down,0);assert.equal(snapshot(f.state.mesh),before);assert.equal(f.history.undoStack.length,0);assert.equal(f.history.redoStack.length,1);
});
test('1126 FRONT off allows through painting, while OFF DRAG yields to existing directional/hold owners',()=>{
 const f=frontDragRuntime();f.setIds([]);f.input.setFront(false);f.input.setDrag(true);f.pen('pointerdown',0);f.pen('pointermove',2);f.pen('pointerup',2);assert.deepEqual([...f.ids()].sort(),[0,1,2,3,4,5]);
 const idle=frontDragRuntime();let received=0;idle.context.document.addEventListener('pointerdown',()=>received++);idle.pen('pointerdown',0);assert.equal(received,1);assert.equal(idle.context.__boxlabPaintSelectDebug.active(),null);assert.equal(idle.input.dragFaces(),false);idle.pen('pointerup',0);
});
test('1126 cancellation, lost capture, secondary touch and preference change restore seed and controls',()=>{
 for(const reason of ['cancel','lost','touch','toggle','blur','pagehide']){const f=frontDragRuntime();f.setIds([3]);f.input.setDrag(true);f.pen('pointerdown',0);f.pen('pointermove',2);assert(f.ids().length>1);if(reason==='cancel')f.pen('pointercancel',2);if(reason==='lost')f.canvas.dispatchEvent({type:'lostpointercapture',pointerId:1});if(reason==='touch')f.pointer('pointerdown',{pointerType:'touch',pointerId:2});if(reason==='toggle')f.input.setDrag(false);if(reason==='blur'||reason==='pagehide')f.context.window.dispatchEvent({type:reason});assert.deepEqual(f.ids(),[3],reason);assert.equal(f.state.controls.enabled,true,reason);assert.equal(f.context.__boxlabPaintSelectDebug.active(),null,reason);assert.equal(f.history.undoStack.length,0);}
});
test('1126 context change never restores stale selection into a different mesh',()=>{
 const f=frontDragRuntime();f.input.setDrag(true);f.pen('pointerdown',0);f.pen('pointermove',1);f.state.mesh=EditableMesh.cube();f.setIds([5]);f.pen('pointermove',2);assert.deepEqual(f.ids(),[5]);assert.equal(f.state.controls.enabled,true);
});
test('1126 actual Lasso obeys FRONT visibility and its original through path; arming Lasso turns DRAG off',()=>{
 for(const front of [true,false]){const f=frontDragRuntime();f.setIds([]);f.input.setFront(front);f.input.setDrag(true);const a=f.screen(new THREE.Vector3(-1.4,.7,0)),b=f.screen(new THREE.Vector3(1.4,-.7,0));f.lassoPoly([{x:a.x,y:a.y},{x:b.x,y:a.y},{x:b.x,y:b.y},{x:a.x,y:b.y},{x:a.x-12,y:a.y+12}]);assert.equal(f.input.dragFaces(),false);assert.equal(f.ids().length,front?3:6);}
});
test('1126 controls have requested icons, pressed states, face scope and real owner disarm/busy gates',()=>{
 const f=frontDragRuntime(),bar=f.context.document.createElement('div');f.context.__boxlabSelectionInput=undefined;const input=installSelectionInputControls(f.context.document,bar,f.context),front=f.fields.get('#frontSelectBtn'),drag=f.fields.get('#dragSelectBtn');assert.match(front.innerHTML,/FRONT/);assert.match(front.innerHTML,/circle/);assert.match(drag.innerHTML,/DRAG/);assert.match(drag.innerHTML,/stroke-dasharray/);assert.equal(front.getAttribute('aria-pressed'),'true');assert.equal(drag.getAttribute('aria-pressed'),'false');front.click();assert.equal(input.frontOnly(),false);let calls=0;f.context.__boxlabFaceDirect={disarmForSelection:()=>{calls++;return true;}};drag.click();assert.equal(input.dragFaces(),true);assert.equal(calls,1);drag.click();assert.equal(input.dragFaces(),false);f.context.__boxlabToolSession={isActive:()=>true};drag.click();assert.equal(input.dragFaces(),false);f.setMode('edge');f.context.window.dispatchEvent({type:'boxlab-bridge-state'});assert(front.disabled);assert(drag.disabled);
});
test('1126 original gizmo owner hides transform/radial target during explicit Face DRAG',()=>{
 const source=fs.readFileSync(new URL('../src/total-gizmo.js',import.meta.url),'utf8'),start=source.indexOf('function sync(){\n  const perf='),end=source.indexOf('\nsync();',start),root={hidden:false,dataset:{}};let hidden=0;
 const c={state:()=>({mesh:EditableMesh.cube(),camera:{}}),currentMode:()=> 'face',requestAnimationFrame:()=>1,root,hideFloatInput:()=>hidden++,__boxlabSelectionInput:{dragFaces:()=>true}};vm.createContext(c);vm.runInContext(source.slice(start,end)+'\nsync();',c);assert(root.hidden);assert.equal(hidden,1);
});

test('1126 original bridge supports explicit primary for batched painting and preserves its old default',()=>{
 const source=fs.readFileSync(new URL('../src/main.js',import.meta.url),'utf8'),make=source.split('\n').find(s=>s.startsWith('function makeSelection(')),assignment=source.split('\n').find(s=>s.startsWith('globalThis.__boxlabSelectionBridge='));let renders=0;
 const c={selectionMode:'face',selection:null,selectionHas:()=>false,selectionIndices:()=>[],pickKind(){},pickKindHits(){},pickObject(){},toggleSelection(){},renderMesh:()=>renders++};vm.createContext(c);vm.runInContext(make+'\n'+assignment,c);c.__boxlabSelectionBridge.set('face',[3,1,2],1);assert.equal(c.selection.index,1);assert.deepEqual(Array.from(c.selection.indices),[1,2,3]);c.__boxlabSelectionBridge.set('face',[3,1,2]);assert.equal(c.selection.index,3);assert.equal(renders,2);
});


test('1126 a fresh down recovers a missed release even on background with a reused pointer ID',()=>{
 const f=frontDragRuntime();f.setIds([3]);f.input.setDrag(true);f.pen('pointerdown',0);f.pen('pointermove',2);assert(f.ids().length>1);f.pointer('pointerdown',{clientX:20,clientY:20});assert.equal(f.context.__boxlabPaintSelectDebug.active(),null);assert.equal(f.state.controls.enabled,true);assert.deepEqual(f.ids(),[3]);
});


test('1126 switching tools exits DRAG before a document-capture tool owner consumes its click',()=>{
 const f=frontDragRuntime();f.context.document.addEventListener('click',event=>event.stopImmediatePropagation());f.context.__boxlabSelectionInput=undefined;const input=installSelectionInputControls(f.context.document,f.context.document.createElement('div'),f.context);input.setDrag(true);assert(input.dragFaces());f.pointer('click',{target:{closest:s=>s.includes('.mode-tools button')?{}:null}});assert.equal(input.dragFaces(),false);
});
