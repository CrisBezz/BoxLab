import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import * as THREE from 'three';
import {EditableMesh} from '../src/mesh.js';
import {vertexRuntime} from './helpers/vertex-extrude-runtime.mjs';
import {edgeRuntime} from './helpers/edge-extrude-runtime.mjs';
import {snapshot} from './helpers/negative-extrude-runtime.mjs';
import {extrudePlaneExactDirection} from '../src/extrude-plane-constraints.js';
const omitted={xy:'z',xz:'y',yz:'x'};
function oblique(f){f.state.camera.position.set(8,6,9);f.state.camera.lookAt(0,0,0);f.state.camera.updateMatrixWorld();f.render();}

for(const plane of ['xy','xz','yz'])test(`975 Vertex ${plane}: actual multi-tip Pencil/Exact/Repeat keep omitted coordinate, one history entry and cancel cleanly`,()=>{
 const f=vertexRuntime(undefined,[0,1]);oblique(f);f.session.openFromHub({tool:'Extrude'});f.owner.setDirection(plane);
 const original=f.state.mesh.clone(),before=snapshot(original);f.pull(0,55,-42);
 assert.equal(f.history.undoStack.length,1);assert.equal(f.ids().length,2);assert.equal(f.owner.direction(),plane);
 f.ids().forEach((id,i)=>assert.equal(f.state.mesh.vertices[id][omitted[plane]],original.vertices[i][omitted[plane]]));
 const source=f.state.mesh.vertices[f.ids()[0]].clone();assert.equal(f.owner.apply(-.4).ok,true);const tip=f.state.mesh.vertices[f.ids()[0]],delta=tip.clone().sub(source);assert(Math.abs(delta.length()-.4)<1e-9);assert.equal(delta[omitted[plane]],0);assert.equal(f.history.undoStack.length,2);
 f.owner.toggleRepeat();const n=f.state.mesh.vertices.length;f.tap(f.ids()[0]);assert.equal(f.state.mesh.vertices.length,n+1);assert.equal(f.history.undoStack.length,3);
 const done=snapshot(f.state.mesh);f.pull(f.ids()[0],35,-20,'pointercancel');assert.equal(snapshot(f.state.mesh),done);assert.equal(f.history.undoStack.length,3);assert.equal(f.state.controls.enabled,true);assert.equal(f.canvas.capture,null);
 let m=f.state.mesh;for(let i=0;i<3;i++)m=f.history.undo(m);assert.equal(snapshot(m),before);
 for(let i=0;i<3;i++)m=f.history.redo(m);assert.equal(snapshot(m),done);
});

for(const plane of ['xy','xz','yz'])test(`975 Edge ${plane}: actual ribbon Pencil/Exact/Repeat preserve world plane and original history/cancel`,()=>{
 const f=edgeRuntime();oblique(f);f.edgeSession.openFromHub();f.flush();f.choose(plane);const before=snapshot(f.state.mesh),original=f.state.mesh.clone();
 f.edgePull(0,30,-60);assert.equal(f.history.undoStack.length,1);assert.equal(f.state.mesh.faces.length,1);assert.equal(f.edge.direction(),plane);
 for(let i=0;i<2;i++)assert.equal(f.state.mesh.vertices[2+i][omitted[plane]],original.vertices[i][omitted[plane]]);
 const n=f.state.mesh.vertices.length;assert.equal(f.edge.apply(.35).ok,true);assert.equal(f.state.mesh.vertices.length,n+2);assert.equal(f.history.undoStack.length,2);assert.equal(f.edge.last()[omitted[plane]],0);
 f.edge.toggleRepeat();f.edgeTap(f.ids()[0]);assert.equal(f.state.mesh.faces.length,3);assert.equal(f.history.undoStack.length,3);
 const done=snapshot(f.state.mesh);f.edgePull(f.ids()[0],20,-40,'pointercancel');assert.equal(snapshot(f.state.mesh),done);assert.equal(f.history.undoStack.length,3);assert.equal(f.canvas.capture,null);assert.equal(f.state.controls.enabled,true);
 let m=f.state.mesh;for(let i=0;i<3;i++)m=f.history.undo(m);assert.equal(snapshot(m),before);for(let i=0;i<3;i++)m=f.history.redo(m);assert.equal(snapshot(m),done);
});

test('975 edge-on world plane refuses drag without geometry/history/capture; first Exact still has a useful plane direction',()=>{
 for(const mode of ['vertex','edge'])for(const plane of ['xz','yz']){
  const f=mode==='vertex'?vertexRuntime(new EditableMesh([[0,0,0]],[])):edgeRuntime(),owner=mode==='vertex'?f.owner:f.edge;
  if(mode==='vertex')f.session.openFromHub({tool:'Extrude'});else{f.edgeSession.openFromHub();f.flush();}
  owner.setDirection(plane);const before=snapshot(f.state.mesh);
  if(mode==='vertex')f.pull(0,60,-25);else f.edgePull(0,60,-25);
  assert.equal(snapshot(f.state.mesh),before);assert.equal(f.history.undoStack.length,0);assert.equal(owner.busy(),false);assert.equal(f.canvas.capture??null,null);assert.equal(f.state.controls.enabled,true);
  assert.equal(owner.apply(.5).ok,true);assert.equal(owner.last()[omitted[plane]],0);assert.equal(f.history.undoStack.length,1);
 }
 const edge=new THREE.Vector3(1,0,0),d=extrudePlaneExactDirection('xz',null,new THREE.Vector3(0,1,0),edge);assert.equal(d.y,0);assert(d.clone().cross(edge).length()>0);
});

test('975 selected plane pads delegate to real Edge/Vertex owners without moving geometry; squares stay visible and selected',()=>{
 const source=fs.readFileSync(new URL('../src/total-gizmo.js',import.meta.url),'utf8');
 for(const mode of ['vertex','edge']){
  const f=mode==='vertex'?vertexRuntime():edgeRuntime(),c=f.context;
  if(mode==='vertex')f.session.openFromHub({tool:'Extrude'});else{f.edgeSession.openFromHub();f.flush();}
  const owner=mode==='vertex'?f.owner:f.edge,controls=new Map(),badge={hidden:true,querySelector:()=>({replaceChildren(){}})},root={dataset:{},querySelectorAll(q){if(!controls.has(q))controls.set(q,[{style:{},selected:false,classList:{add(){controls.get(q)[0].selected=true;},remove(){controls.get(q)[0].selected=false;}}}]);return controls.get(q);},querySelector(){return null;}};
  Object.assign(c,{root,expanded:true,selectionAvailable:()=>true,status:f.fields.get('#selectionStatus'),edgeExtrudeBadge:badge,edgeExtrudeConstraintSession:mode==='edge',currentMode:()=>mode,state:()=>f.state,hideFloatInput(){},handleSpec:e=>e.dataset,gestureDebug(){}});c.document.createTextNode=t=>t;
  vm.runInContext(source.slice(source.indexOf('function vertexExtrudeConstraintSession(){'),source.indexOf('function setHubState(')),c);
  vm.runInContext(source.slice(source.indexOf('function syncEdgeExtrudeConstraintVisuals(){'),source.indexOf('function syncContextToolAvailability(){')),c);
  const start=source.indexOf('function onHandleDown(');vm.runInContext(source.slice(start,source.indexOf('\nfunction ',start+10)),c);
  const before=snapshot(f.state.mesh);
  for(const plane of ['xy','xz','yz']){
   c.onHandleDown({currentTarget:{dataset:{tool:'move',constraint:plane,kind:'plane'}},preventDefault(){},stopPropagation(){},stopImmediatePropagation(){}});
   assert.equal(owner.direction(),plane);assert.equal(snapshot(f.state.mesh),before);assert.equal(f.history.undoStack.length,0);
   assert.equal(controls.get('.tg-move-axes,.tg-center,.tg-plane-handles')[0].style.display,'');assert(controls.get(`.tg-handle[data-tool="move"][data-constraint="${plane}"]`)[0].selected);
   assert(source.includes(`aria-label="${plane.toUpperCase()} plane"`));
  }
 }
});
