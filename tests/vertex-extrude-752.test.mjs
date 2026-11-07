import test from 'node:test';
import assert from 'node:assert/strict';
import * as THREE from 'three';
import {EditableMesh} from '../src/mesh.js';
import {buildVertexExtrude} from '../src/vertex-extrude-core.js';
import {vertexRuntime} from './helpers/vertex-extrude-runtime.mjs';
import {snapshot} from './helpers/negative-extrude-runtime.mjs';
import fs from 'node:fs';
import vm from 'node:vm';

test('Vertex Extrude extends attached/boundary/loose vertices without changing faces, groups or creases',()=>{
  const m=EditableMesh.cube();m.faceGroups.fill('source');m.creases.set('0:1',.7);const loose=m.addLooseVertex(new THREE.Vector3(4,0,0));m.addLooseEdge(0,loose);
  const before=snapshot(m),r=buildVertexExtrude(m,[0,loose,0],new THREE.Vector3(0,2,0));assert.equal(r.ok,true);assert.equal(snapshot(m),before);
  assert.deepEqual(r.mesh.faces.map(f=>[...f]),m.faces.map(f=>[...f]));assert.deepEqual(r.mesh.faceGroups,m.faceGroups);assert.deepEqual(r.mesh.creases,m.creases);
  assert.equal(r.tips.length,2);assert.equal(r.mesh.vertices.length,m.vertices.length+2);assert.equal(r.mesh.looseEdges.size,3);
  r.tips.forEach((tip,i)=>{assert.ok(r.mesh.vertices[tip].equals(m.vertices[[0,loose][i]].clone().add(new THREE.Vector3(0,2,0))));assert.ok(r.mesh.edges().some(e=>e.a===[0,loose][i]&&e.b===tip));});
});
test('invalid selection/zero/nonfinite deltas refuse on private candidates without source mutation',()=>{
  const m=EditableMesh.cube(),before=snapshot(m);for(const [ids,d] of [[[],new THREE.Vector3(1,0,0)],[[999],new THREE.Vector3(1,0,0)],[[0],new THREE.Vector3()],[[0],new THREE.Vector3(Infinity,0,0)],[[0],new THREE.Vector3(NaN,0,0)]])assert.equal(buildVertexExtrude(m,ids,d).ok,false);assert.equal(snapshot(m),before);
});
test('radial and drawer share one top-centre session; exact multi XYZ continues from selected tips with one history per pull',()=>{
  const f=vertexRuntime(EditableMesh.cube(),[0,1]),before=snapshot(f.state.mesh);f.radial();assert.equal(f.session.active(),true);assert.equal(f.owner.isArmed(),true);assert.equal(f.session.element.style.top,'12px');assert.equal(f.context.root.hidden,true);
  f.owner.setDirection('y');f.input(2);f.click('.vts-apply');assert.deepEqual(Array.from(f.ids()),[8,9]);assert.equal(f.history.undoStack.length,1);assert.equal(f.session.active(),true);
  f.click('.vts-apply');assert.deepEqual(Array.from(f.ids()),[10,11]);assert.equal(f.history.undoStack.length,2);assert.equal(f.state.mesh.faces.length,6);assert.equal(f.state.mesh.looseEdges.size,4);
  const after=snapshot(f.state.mesh),once=f.history.undo(f.state.mesh),original=f.history.undo(once);assert.equal(snapshot(original),before);const redo=f.history.redo(original);assert.equal(snapshot(f.history.redo(redo)),after);
  f.click('.vts-done');f.flush();assert.equal(f.owner.isArmed(),false);assert.equal(f.session.active(),false);assert.equal(f.events.at(-1).type,'boxlab-selection-hub-session-complete');assert.deepEqual(Array.from(f.ids()),[10,11]);
});
test('actual rendered Vertex pick and document owner prevent canvas move/orbit stealing and repeat new-tip Free drags',()=>{
  const m=new EditableMesh([[0,0,0]],[]),f=vertexRuntime(m);let canvasDown=0;f.canvas.addEventListener('pointerdown',()=>canvasDown++);f.session.openFromHub({tool:'Extrude'});
  const start=m.vertices[0].clone();f.pull(0,80,-40);assert.equal(canvasDown,0);assert.ok(m.vertices[0].equals(start));assert.equal(m.vertices.length,2);assert.deepEqual(Array.from(f.ids()),[1]);assert.equal(f.history.undoStack.length,1);assert.equal(f.state.controls.enabled,true);
  const delta=m.vertices[1].clone().sub(m.vertices[0]);f.pull(1,80,-40);assert.equal(m.vertices.length,3);assert.ok(m.vertices[2].clone().sub(m.vertices[1]).distanceTo(delta)<1e-8);assert.deepEqual(Array.from(f.ids()),[2]);assert.equal(f.session.active(),true);
});
test('Free Exact follows last drag direction; Repeat Previous taps create matching vector without arming a transform',()=>{
  const m=new EditableMesh([[0,0,0],[0,-2,0]],[]),f=vertexRuntime(m);f.session.openFromHub({tool:'Extrude'});f.pull(0,60,-30);const delta=f.owner.last();
  f.input(delta.length()*2);f.click('.vts-apply');assert.ok(m.vertices[3].clone().sub(m.vertices[2]).distanceTo(delta.clone().multiplyScalar(2))<1e-8);
  f.owner.toggleRepeat();f.tap(1);assert.ok(m.vertices[4].clone().sub(m.vertices[1]).distanceTo(delta.clone().multiplyScalar(2))<1e-8);assert.equal(f.owner.repeat(),true);assert.equal(f.history.undoStack.length,3);
});
test('pointer cancellation and tiny/no-op pulls preserve redo, selection and all mesh metadata',()=>{
  const f=vertexRuntime(),m=f.state.mesh,before=snapshot(m);f.history.redoStack.push(m.clone());f.session.openFromHub({tool:'Extrude'});f.pull(0,80,0,'pointercancel');assert.equal(snapshot(m),before);assert.equal(f.history.undoStack.length,0);assert.equal(f.history.redoStack.length,1);assert.deepEqual(Array.from(f.ids()),[0]);assert.equal(f.state.controls.enabled,true);
  f.pull(0,3,2);assert.equal(snapshot(m),before);assert.equal(f.history.undoStack.length,0);assert.equal(f.history.redoStack.length,1);
});
test('signed XYZ exact controls, blank/zero values and view-parallel axis refuse safely',()=>{
  const f=vertexRuntime();f.session.openFromHub({tool:'Extrude'});for(const value of ['',0,'NaN']){f.input(value);assert.equal(f.fields.get('.vts-apply').disabled,true);f.click('.vts-apply');}assert.equal(f.history.undoStack.length,0);
  for(const [axis,amount] of [['x',-.25],['y',.5],['z',1]]){const tip=f.ids()[0],before=f.state.mesh.vertices[tip].clone();f.owner.setDirection(axis);f.input(amount);f.click('.vts-apply');const v=f.state.mesh.vertices[f.ids()[0]].clone().sub(before);assert.equal(v[axis],amount);assert.equal(v.length(),Math.abs(amount));}
  const g=vertexRuntime(new EditableMesh([[0,0,0]],[]));g.session.openFromHub({tool:'Extrude'});const before=snapshot(g.state.mesh);g.owner.setDirection('z');g.pull(0,80,0);assert.equal(snapshot(g.state.mesh),before);assert.equal(g.history.undoStack.length,0);
});
test('selection taps stay additive while armed; second contact cancels preview; background leaves navigation available',()=>{
  const f=vertexRuntime(),m=f.state.mesh,before=snapshot(m);f.session.openFromHub({tool:'Extrude'});f.tap(1);assert.deepEqual(Array.from(f.ids()),[0,1]);f.tap(1);assert.deepEqual(Array.from(f.ids()),[0]);
  const start=f.screen(m.vertices[0]);f.pointer('pointerdown',{clientX:start.x,clientY:start.y,pointerType:'touch'});f.pointer('pointermove',{clientX:start.x+50,clientY:start.y,pointerType:'touch'});assert.equal(m.vertices.length,9);
  f.pointer('pointerdown',{pointerId:2,pointerType:'touch',isPrimary:false});assert.equal(snapshot(m),before);assert.equal(f.owner.busy(),false);assert.equal(f.state.controls.enabled,true);assert.equal(f.history.undoStack.length,0);
  f.pointer('pointerup',{pointerType:'touch'});f.pointer('pointerup',{pointerId:2,pointerType:'touch',isPrimary:false});
  const e=f.pointer('pointerdown',{clientX:990,clientY:590});assert.equal(e.stopped,undefined);assert.equal(f.history.undoStack.length,0);
  f.load('tool-background-exit.js');f.background();assert.equal(f.session.active(),false);assert.equal(f.owner.isArmed(),false);
});
test('locked/reference context, changed mesh/object/mode and competing Build Edge cannot commit or retain stale captures',()=>{
  for(const kind of ['locked','mesh','object','mode']){const f=vertexRuntime(),m=f.state.mesh,before=snapshot(m);f.session.openFromHub({tool:'Extrude'});const start=f.screen(m.vertices[0]);f.pointer('pointerdown',{clientX:start.x,clientY:start.y});f.pointer('pointermove',{clientX:start.x+60,clientY:start.y});
    if(kind==='locked')f.setLocked(true);if(kind==='mesh')f.state.mesh=EditableMesh.cube();if(kind==='object')f.context.__boxlabObjectManager.activeId='b';if(kind==='mode')f.setMode('edge');f.session.sync();f.flush();assert.equal(snapshot(m),before);assert.equal(f.session.active(),false);assert.equal(f.owner.isArmed(),false);assert.equal(f.canvas.capture,null);assert.equal(f.history.undoStack.length,0);}
  const f=vertexRuntime();f.setLocked(true);assert.equal(f.session.openFromHub({tool:'Extrude'}),false);f.setLocked(false);f.load('add-edge-ui.js');f.session.openFromHub({tool:'Extrude'});f.fields.get('#buildEdgeBtn').id='buildEdgeBtn';f.click('#buildEdgeBtn');assert.equal(f.owner.isArmed(),false);assert.equal(f.context.__boxlabBuildEdge.isArmed(),true);
});
test('scaffold from two extruded boundary vertices works with original Join and Create Face owners',()=>{
  const m=new EditableMesh([[0,0,0],[2,0,0]],[]);m.addLooseEdge(0,1);const f=vertexRuntime(m,[0,1]);f.session.openFromHub({tool:'Extrude'});f.owner.setDirection('y');f.input(2);f.click('.vts-apply');f.click('.vts-done');f.flush();
  assert.equal(m.faces.length,0);assert.equal(m.connectVertices(2,3).ok,true);f.load('face-reconstruct.js');f.setIds([0,1,2,3]);const info=f.context.__boxlabFaceReconstruct.info(m,f.ids());assert.equal(info.ok,true);assert.equal(info.order.length,4);
});

test('actual Pencil background policy cannot close Extrude when a loose-tip Repeat tap completes',()=>{
  const f=vertexRuntime(new EditableMesh([[0,0,0],[0,-2,0]],[]));
  f.load('pencil-orbit-gate.js');f.load('tool-background-exit.js');
  // Execute the actual main semantic Pencil-background listener. The gate sees
  // no polygon on a scaffold tip and emits a candidate; session policy rejects it.
  const s=fs.readFileSync(new URL('../src/main.js',import.meta.url),'utf8'),a=s.indexOf("window.addEventListener('boxlab-pencil-background-tap',event=>{"),b=s.indexOf("canvas.addEventListener('pointermove'",a);
  Object.assign(f.context,{completedBackgroundRelease:null,backgroundTap:null,completeBackgroundSelectionTap:()=>{throw new Error('Scaffold tip was incorrectly treated as background');}});
  vm.runInContext(s.slice(a,b),f.context);
  f.session.openFromHub({tool:'Extrude'});f.owner.setDirection('x');f.input(1);f.click('.vts-apply');f.owner.toggleRepeat();f.tap(1);
  assert.equal(f.state.mesh.vertices.length,4);assert.equal(f.history.undoStack.length,2);assert.equal(f.session.active(),true);assert.equal(f.owner.repeat(),true);
  assert.equal(f.context.__boxlabToolBackgroundExit.ownsPoint({clientX:990,clientY:590,pointerId:99}),false);
});

test('rotated camera touch pull keeps Free displacement in view plane; Escape/blur discard live preview',()=>{
  for(const exit of ['Escape','blur','lostcapture']){
    const f=vertexRuntime(new EditableMesh([[0,0,0]],[])),m=f.state.mesh;f.state.camera.position.set(5,3,6);f.state.camera.lookAt(0,0,0);f.state.camera.updateMatrixWorld();f.session.openFromHub({tool:'Extrude'});
    const start=f.screen(m.vertices[0]),before=snapshot(m);f.pointer('pointerdown',{clientX:start.x,clientY:start.y,pointerType:'touch'});f.pointer('pointermove',{clientX:start.x+60,clientY:start.y-20,pointerType:'touch'});
    const normal=new THREE.Vector3();f.state.camera.getWorldDirection(normal);assert.ok(Math.abs(m.vertices[1].dot(normal))<1e-8);
    const e={type:exit==='lostcapture'?'lostpointercapture':exit==='blur'?'blur':'keydown',pointerId:1,key:exit,target:f.canvas,preventDefault(){},stopImmediatePropagation(){}};
    (exit==='lostcapture'?f.canvas:exit==='blur'?f.context.window:f.context.document).dispatchEvent(e);if(exit==='lostcapture')f.click('.vts-done');f.flush();assert.equal(snapshot(m),before);assert.equal(f.history.undoStack.length,0);assert.equal(f.canvas.capture,null);assert.equal(f.session.active(),false);
  }
});
