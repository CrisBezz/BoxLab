import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import * as THREE from 'three';
import {frontDragRuntime} from './helpers/front-drag-selection-runtime.mjs';
import {selectionHubRuntime,gizmoSource} from './helpers/selection-hub-runtime.mjs';
import {createSelectionInputOptions} from '../src/selection-input-controls.js';
import {bindDragSelectionPuck} from '../src/drag-selection-puck.js';

test('1130 starting selected subtracts along the entire DRAG stroke without toggling re-crossed faces',()=>{
 const f=frontDragRuntime();f.setIds([0,1,2,3]);f.input.setDrag(true);
 const before=JSON.stringify(f.state.mesh);f.history.redoStack.push(f.state.mesh.clone());
 f.pen('pointerdown',0);f.pen('pointermove',2);f.pen('pointermove',0);f.pen('pointerup',0);
 assert.deepEqual(f.ids(),[3]);assert(f.input.dragFaces());assert(f.input.dragPuck());
 assert.equal(f.state.controls.enabled,true);assert.equal(JSON.stringify(f.state.mesh),before);
 assert.equal(f.history.undoStack.length,0);assert.equal(f.history.redoStack.length,1);
 // Starting unselected adds, and stays additive when crossing selected faces.
 f.pen('pointerdown',0);f.pen('pointermove',2);f.pen('pointerup',2);assert.deepEqual(f.ids(),[3,0,1,2]);assert(f.input.dragFaces());
});
test('1130 erase cancellation restores seed; all deselected still retains a ready puck; stale object cannot reuse it',()=>{
 const f=frontDragRuntime();f.setIds([0,1,2]);f.input.setDrag(true);f.pen('pointerdown',0);f.pen('pointermove',2);f.pen('pointercancel',2);
 assert.deepEqual(f.ids(),[0,1,2]);assert.equal(f.input.dragPuck(),null);
 f.pen('pointerdown',0);f.pen('pointermove',2);f.pen('pointerup',2);assert.deepEqual(f.ids(),[]);assert(f.input.dragPuck());assert(f.input.dragFaces());
 f.context.__boxlabObjectManager.activeId='other';assert.equal(f.input.dragPuck(),null);
});
test('1142 original gizmo shows only ready DRAG puck, tap enters transforms, drag and cancel keep DRAG active',()=>{
 const r=selectionHubRuntime(),input=createSelectionInputOptions(r.c);r.c.__boxlabSelectionInput=input;
 input.setDrag(true);r.sync();assert(r.c.root.hidden);
 input.showDragPuck({clientX:300,clientY:250});r.sync();assert.equal(r.c.root.hidden,false);assert.equal(r.c.root.dataset.dragSelection,'true');assert.equal(r.c.hubState,'closed');
 const handlers=new Map(),puck={addEventListener:(t,fn)=>handlers.set(t,fn),setPointerCapture(){},releasePointerCapture(){}};
 r.c.activator=puck;r.c.bindDragSelectionPuck=bindDragSelectionPuck;r.c.cancelAnimationFrame=()=>{};r.c.raf=0;
 const start=gizmoSource.indexOf('bindDragSelectionPuck(activator,{'),end=gizmoSource.indexOf('const edgeExtrudeStyle=',start);vm.runInContext(gizmoSource.slice(start,end),r.c);
 let finished=0;input.subscribe(()=>{if(!input.dragFaces())finished++;r.sync();});
 const send=(type,x=0,extra={})=>handlers.get(type)({type,isPrimary:true,pointerId:7,button:0,clientX:x,clientY:0,preventDefault(){},stopImmediatePropagation(){},...extra});
 send('pointerdown');send('pointermove',20);send('pointerup',0);assert(input.dragFaces());assert.equal(finished,0);
 send('pointerdown');send('pointercancel');assert(input.dragFaces());assert.equal(finished,0);
 send('pointerdown');send('pointerup');assert.equal(input.dragFaces(),false);assert.equal(finished,1);assert.equal(r.c.hubState,'transform');assert.equal(r.c.expanded,true);assert.equal(r.c.root.dataset.hubState,'transform');assert.equal(r.c.root.dataset.dragSelection,'false');r.sync();assert.equal(r.c.hubState,'transform');assert.deepEqual(Array.from(r.c.__boxlabSelectionBridge.indices()),[0]);
});
test('1142 empty DRAG puck exits to a hidden gizmo until there is a selection',()=>{
 const r=selectionHubRuntime({ids:[]}),input=createSelectionInputOptions(r.c);r.c.__boxlabSelectionInput=input;input.setDrag(true);input.showDragPuck({clientX:300,clientY:250});r.sync();
 assert.equal(r.c.root.hidden,false);assert.equal(r.c.root.style.left,'300px');assert.equal(r.c.root.style.top,'250px');
 const handlers=new Map();r.c.activator={addEventListener:(t,fn)=>handlers.set(t,fn)};r.c.bindDragSelectionPuck=bindDragSelectionPuck;r.c.cancelAnimationFrame=()=>{};r.c.raf=0;const start=gizmoSource.indexOf('bindDragSelectionPuck(activator,{'),end=gizmoSource.indexOf('const edgeExtrudeStyle=',start);vm.runInContext(gizmoSource.slice(start,end),r.c);handlers.get('click')({detail:0,preventDefault(){}});assert.equal(input.dragFaces(),false);assert.equal(r.c.root.hidden,true);assert.equal(r.c.hubState,'transform');
 r.c.__boxlabObjectManager.activeId=2;r.sync();assert.equal(r.c.root.hidden,true,'empty gizmo cannot follow a stale object anchor');
});
test('1130 actual selection material offsets coplanar highlight without depth writes or seeing through occluders',()=>{
 const source=fs.readFileSync(new URL('../src/main.js',import.meta.url),'utf8');const line=source.split('\n').find(l=>l.startsWith('const selectedMaterial='));
 const material=vm.runInNewContext(line+'\nselectedMaterial;',{THREE});
 assert.equal(material.depthTest,true);assert.equal(material.depthWrite,false);assert.equal(material.polygonOffset,true);assert(material.polygonOffsetFactor<0);assert(material.polygonOffsetUnits<0);assert.equal(material.side,THREE.DoubleSide);
});
