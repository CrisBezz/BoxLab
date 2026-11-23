import test from 'node:test';import assert from 'node:assert/strict';
import {EditableMesh} from '../src/mesh.js';import {fixture} from './helpers/retopo-runtime.mjs';
function reference(f){const mesh=EditableMesh.cube();mesh.vertices.forEach(v=>v.z+=2);mesh.ensureLooseTopology();const o={id:3,name:'Imported Reference',kind:'reference',locked:true,visible:true,mesh};f.objects.push(o);return o;}
test('Retopo picker accepts a locked inactive reference and keeps both source objects unchanged',()=>{
 const f=fixture(),ref=reference(f),before=JSON.stringify(ref),source=JSON.stringify(f.objects[0]);f.api.start();
 f.api.selectReference(3);
 assert.equal(f.api.active,true);assert.equal(f.api.referenceId,3);assert.equal(f.manager.activeId,1);assert.equal(f.h.undoStack.length,0);
 f.pointer('pointerdown');f.pointer('pointerup');assert.equal(f.state.mesh.vertices.length,1);assert.ok(Math.abs(f.state.mesh.vertices[0].z-3)<1e-8);assert.equal(f.manager.activeId,2);
 assert.equal(JSON.stringify(f.objects.find(o=>o.id===3)),before);assert.equal(JSON.stringify(f.objects[0]),source);
 f.history('undo');assert.equal(f.objects.length,2);assert.equal(f.manager.activeId,1);assert.equal(f.objects.find(o=>o.id===3).locked,true);
 f.history('redo');assert.equal(f.state.mesh.vertices.length,1);assert.equal(f.objects.find(o=>o.id===3).kind,'reference');f.api.close();f.api.start();assert.equal(f.api.referenceId,3);
});
test('Quad creation directly on an inactive reference uses a separate editable object and one Undo step',()=>{
 const f=fixture(),ref=reference(f),before=JSON.stringify(ref);assert.equal(f.api.start({reference:3}),true);f.field('#retopoQuad').click();
 for(const [x,y] of [[340,450],[400,450],[400,390],[340,390]]){f.pointer('pointerdown',x,y);f.pointer('pointerup',x,y);}
 assert.equal(f.state.mesh.faces.length,1);assert.equal(f.state.mesh.vertices.length,4);assert.equal(f.h.undoStack.length,1);assert.ok(f.state.mesh.vertices.every(v=>Math.abs(v.z-3)<1e-8));assert.equal(JSON.stringify(f.objects.find(o=>o.id===3)),before);
});
test('Switching reference clears partial corners atomically; hidden or missing references refuse',()=>{
 const f=fixture(),ref=reference(f);f.api.start();f.field('#retopoQuad').click();f.pointer('pointerdown',340,450);f.pointer('pointerup',340,450);
 f.api.selectReference(3);assert.equal(f.h.undoStack.length,0);assert.equal(f.objects.length,2);assert.equal(f.api.referenceId,3);
 f.api.close();ref.visible=false;assert.equal(f.api.start({reference:3}),false);assert.equal(f.api.start({reference:999}),false);assert.equal(f.h.undoStack.length,0);
});

test('Retopo mode waits for a viewport tap and keeps orbit gestures from choosing a source',()=>{
 const f=fixture();
 f.objects.push({id:3,name:'Locked reference',kind:'reference',locked:true,visible:true,mesh:f.state.mesh.clone()});
 f.manager.pickObject=(e,options)=>{assert.equal(options.anyMode,true);return e.clientX===400?{id:3}:null;};
 f.field('#selectionModes').children[0].click();
 assert.match(f.field('#retopoHint').textContent,/Tap the mesh/);
 const finger={pointerType:'touch',isPrimary:true};
 f.pointer('pointerdown',400,400,finger);f.pointer('pointermove',430,400,finger);f.pointer('pointerup',400,400,finger);
 assert.equal(f.api.referenceId,null);
 f.pointer('pointerdown',350,400,finger);f.pointer('pointerup',350,400,finger);
 assert.equal(f.api.referenceId,null);
 f.pointer('pointerdown',400,400,finger);
 f.pointer('pointerdown',400,400,{...finger,pointerId:10,isPrimary:false});
 f.pointer('pointerup',400,400,finger);
 assert.equal(f.api.referenceId,null);
 const contact=f.pointer('pointerdown',400,400,finger);f.pointer('pointerup',400,400,finger);
 assert.equal(contact.prevented,undefined);
 assert.equal(f.api.referenceId,3);
 assert.equal(f.manager.activeId,1);
 assert.equal(f.objects.length,2);
 assert.equal(f.h.undoStack.length,0);
 f.pointer('pointerdown');f.pointer('pointerup');
 assert.equal(f.objects.length,3);
 assert.equal(f.objects[1].locked,true);
 assert.equal(f.state.mesh.vertices.length,1);
});
