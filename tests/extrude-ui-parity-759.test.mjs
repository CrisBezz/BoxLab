import test from 'node:test';
import fs from 'node:fs';
import vm from 'node:vm';
import assert from 'node:assert/strict';
import * as THREE from 'three';
import {edgeRuntime as fixture} from './helpers/edge-extrude-runtime.mjs';
import {EditableMesh} from '../src/mesh.js';
import {boundarySelectionInfo,extrudeBoundaryEdges,perpendicularAxisDirection,projectPerpendicularDelta} from '../src/edge-extrude-core.js';
import {snapshot} from './helpers/negative-extrude-runtime.mjs';
test('Edge and Vertex Extrude share the actual panel and same controls; old direction row hidden',()=>{
 const f=fixture();assert.equal(f.edgeSession.openFromHub(),true);assert.equal(f.edgeSession.element,f.session.element);assert.equal(f.fields.get('.vts-title').textContent,'Edge Extrude');assert.equal(f.fields.get('.vts-extrude-direction').hidden,true);assert.equal(f.fields.get('.vts-value-row').hidden,false);assert.equal(f.fields.get('.vts-extrude-repeat').hidden,false);assert.equal(f.fields.get('.vts-apply').textContent,'Apply Exact');assert.equal(f.fields.get('.vts-done').textContent,'Done');assert.equal(f.session.active(),false);assert.equal(f.edge.direction(),'plane');
 f.click('.vts-done');f.setMode('vertex');f.setIds([0]);assert.equal(f.session.openFromHub({tool:'Extrude'}),true);assert.equal(f.fields.get('.vts-title').textContent,'Vertex Extrude');assert.equal(f.fields.get('.vts-apply').textContent,'Apply Exact');assert.equal(f.fields.get('.vts-done').textContent,'Done');
});
test('Edge signed Exact reuses ribbon core, selects outer rail and gives exact one-step Undo/Redo',()=>{
 const f=fixture(),before=snapshot(f.state.mesh);f.edgeSession.openFromHub();f.choose('y');f.input(-2);f.click('.vts-apply');assert.equal(f.state.mesh.faces.length,1);assert.equal(f.state.mesh.vertices.length,4);assert.equal(f.state.mesh.vertices[2].y,-2);assert.equal(f.history.undoStack.length,1);assert.ok(boundarySelectionInfo(f.state.mesh,f.ids()));
 const after=snapshot(f.state.mesh),undone=f.history.undo(f.state.mesh);assert.equal(snapshot(undone),before);assert.equal(snapshot(f.history.redo(undone)),after);
});
test('Edge Exact refuses blank/zero/nonfinite/parallel axis without clearing redo or altering source',()=>{
 const f=fixture(),before=snapshot(f.state.mesh);f.history.redoStack.push(f.state.mesh.clone());f.edgeSession.openFromHub();for(const n of ['',0,'NaN']){f.input(n);assert.equal(f.fields.get('.vts-apply').disabled,true);}f.choose('x');assert.equal(f.edge.apply(1).ok,false);assert.equal(f.edge.apply(Infinity).ok,false);assert.equal(snapshot(f.state.mesh),before);assert.equal(f.history.undoStack.length,0);assert.equal(f.history.redoStack.length,1);
});
test('Edge Repeat button taps existing owner to repeat last vector; chooser change turns Repeat off',()=>{
 const f=fixture();f.edgeSession.openFromHub();f.choose('y');f.input(1);f.click('.vts-apply');f.click('.vts-extrude-repeat');assert.equal(f.edge.repeat(),true);f.edgeTap(f.ids()[0]);assert.equal(f.state.mesh.faces.length,2);assert.equal(f.history.undoStack.length,2);assert.equal(f.edge.repeat(),true);f.choose('z');assert.equal(f.edge.repeat(),false);f.click('.vts-done');assert.equal(f.edge.isArmed(),false);assert.equal(f.edgeSession.active(),false);
});
test('Edge Pencil pull keeps panel/rail, then cancel rolls preview back with metadata and redo intact',()=>{
 const f=fixture();f.edgeSession.openFromHub();f.choose('y');f.edgePull(0);assert.equal(f.state.mesh.faces.length,1);assert.equal(f.history.undoStack.length,1);assert.equal(f.edgeSession.active(),true);assert.ok(f.edge.last().y>0);
 const before=snapshot(f.state.mesh);f.history.redoStack.push(f.state.mesh.clone());f.edgePull(f.ids()[0],40,-60,'pointercancel');assert.equal(snapshot(f.state.mesh),before);assert.equal(f.history.undoStack.length,1);assert.equal(f.history.redoStack.length,1);assert.equal(f.canvas.capture,null);
});
test('Edge popup controls do not trigger document click disarm; Done emits Edge completion',()=>{
 const f=fixture();f.edgeSession.openFromHub();const b=f.fields.get('.vts-apply');b.closest=s=>s.includes('#vertexToolViewportSession')?f.session.element:s.includes('button')?b:null;f.choose('y');f.input(1);f.click('.vts-apply');assert.equal(f.edge.isArmed(),true);f.click('.vts-done');f.flush();assert.equal(f.events.at(-1).detail.mode,'edge');assert.equal(f.events.at(-1).detail.tool,'Extrude');
});
test('Edge context change / Escape / background retires shared panel and cancels active preview',()=>{
 for(const exit of ['mesh','object','mode','lock','escape','background']){const f=fixture(),m=f.state.mesh,before=snapshot(m);f.edgeSession.openFromHub();f.choose('y');const p=f.screen(new THREE.Vector3());f.pointer('pointerdown',{clientX:p.x,clientY:p.y});f.pointer('pointermove',{clientX:p.x,clientY:p.y-60});
 if(exit==='mesh')f.state.mesh=EditableMesh.cube();if(exit==='object')f.context.__boxlabObjectManager.activeId='other';if(exit==='mode')f.setMode('vertex');if(exit==='lock')f.setLocked(true);
 if(exit==='escape')f.context.document.dispatchEvent({type:'keydown',key:'Escape'});else if(exit==='background'){f.load('tool-background-exit.js');f.pointer('pointercancel');f.background();}else f.edgeSession.sync();
 assert.equal(snapshot(m),before,exit);
 assert.equal(f.edgeSession.active(),false,exit);assert.equal(f.edge.isArmed(),false,exit);assert.equal(f.history.undoStack.length,0,exit);
 }
});
test('grouped boundary ribbon Exact retains source groups/creases and rollback is private on validator refusal',()=>{
 const m=EditableMesh.cube();m.deleteFace(1);m.faceGroups.fill('wall');m.creases.set('0:1',.7);const f=fixture(m),id=m.edges().findIndex(e=>e.faces.length===1);f.setIds([id]);const before=snapshot(m);f.edgeSession.openFromHub();f.choose('free');f.context.__boxlabTopologyGate={validate:()=>({valid:false})};assert.equal(f.edge.apply(1).ok,false);assert.equal(snapshot(m),before);assert.equal(f.history.undoStack.length,0);
 delete f.context.__boxlabTopologyGate;f.choose('z');let r=f.edge.apply(.5);if(!r.ok){f.choose('y');r=f.edge.apply(.5);}assert.equal(r.ok,true);assert.deepEqual(Array.from(m.faceGroups.slice(0,5)),Array(5).fill('wall'));assert.equal(m.faceGroups[5],null);assert.equal(m.creases.get('0:1'),.7);const after=snapshot(m),undo=f.history.undo(m);assert.equal(snapshot(undo),before);assert.equal(snapshot(f.history.redo(undo)),after);
});
test('drawer Edge launch opens same panel and real radial semantic launch retains default and session',()=>{
 const f=fixture();f.click('#edgeExtrudeBtn');assert.equal(f.edgeSession.active(),true);assert.equal(f.edge.direction(),'plane');f.context.window.dispatchEvent(new f.context.CustomEvent('boxlab-selection-hub-tool',{detail:{mode:'edge',tool:'Extrude'}}));assert.equal(f.edgeSession.active(),true);assert.equal(f.edge.isArmed(),true);f.context.window.dispatchEvent(new f.context.CustomEvent('boxlab-selection-hub-tool',{detail:{mode:'edge',tool:'Bevel'}}));assert.equal(f.edgeSession.active(),false);
});
test('Edge Done completion reaches actual shared gizmo owner and returns selected puck',()=>{
 const f=fixture(),c=f.context,s=fs.readFileSync(new URL('../src/total-gizmo.js',import.meta.url),'utf8');
 const a=s.indexOf("  if(event.detail?.mode==='edge'&&['Extrude'"),b=s.indexOf("  if(event.detail?.mode!=='face'",a);let hub='transform';
 Object.assign(c,{root:{hidden:true},hubSuppressedKey:'old',lastSelectionKey:'',resetTransientState(){},selectionKey:()=>f.ids().join(','),state:()=>f.state,currentMode:()=> 'edge',selectionAvailable:()=>f.ids().length>0,setHubState:x=>{hub=x;}});
 c.window.addEventListener('boxlab-selection-hub-session-complete',event=>{c.event=event;vm.runInContext('(()=>{'+s.slice(a,b)+'})()',c);});
 f.edgeSession.openFromHub();f.choose('y');f.input(1);f.click('.vts-apply');f.click('.vts-done');f.flush();assert.equal(hub,'closed');assert.equal(c.root.hidden,false);assert.equal(c.hubSuppressedKey,'');assert.equal(f.edge.isArmed(),false);
});
