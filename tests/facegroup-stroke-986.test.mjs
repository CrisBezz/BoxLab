import test from 'node:test';
import assert from 'node:assert/strict';
import * as THREE from 'three';
import {EditableMesh} from '../src/mesh.js';
import {createFacegroupStroke} from '../src/facegroup-stroke.js';
import {pencilSelectionRuntime} from './helpers/pencil-selection-runtime.mjs';
function fixture(){
 const mesh=EditableMesh.cube(1),controls={enabled:true},object={id:'a',mesh},snapshots=[],messages=[];
 const manager={activeId:'a',objects:[object],replaceActiveMesh(next){object.mesh=next;return true;}};
 const c={mesh,controls,manager,selection:{mode:()=> 'face'},look:'facegroups',history:{capture:()=>object.mesh.clone(),checkpointSnapshot:m=>snapshots.push(m)}};
 const brush=createFacegroupStroke({context:()=>c,notify:m=>messages.push(m)});assert.equal(brush.arm('Roof'),true);
 return {mesh,object,c,brush,snapshots,messages};
}
test('Pencil stroke stages unique faces, commits on lift once, and preserves source/selection/geometry',()=>{
 const f=fixture(),snapshot=()=>JSON.stringify([f.mesh.vertices,f.mesh.faces,f.mesh.faceGroups]),before=snapshot();assert.equal(f.brush.begin(7,0),true);assert.equal(f.c.controls.enabled,false);
 f.brush.add(7,1);f.brush.add(7,1);f.brush.add(7,999);assert.equal(snapshot(),before);assert.equal(f.snapshots.length,0);
 assert.equal(f.brush.finish(8),false);assert.equal(f.brush.finish(7),true);assert.equal(f.c.controls.enabled,true);assert.equal(f.snapshots.length,1);
 assert.deepEqual(f.object.mesh.faceGroups,['Roof','Roof',null,null,null,null]);assert.equal(snapshot(),before);
 const after=f.object.mesh;f.object.mesh=f.snapshots[0];assert.ok(f.object.mesh.faceGroups.every(x=>x===null));f.object.mesh=after;assert.equal(f.object.mesh.faceGroups[1],'Roof');
});
test('cancel, stale context, mode/session/lock refusal, no-op and control-state restoration are safe',()=>{
 for(const mutate of [f=>f.brush.cancel(),f=>f.c.manager.activeId='b',f=>f.mesh.faceGroups[3]='Other',f=>f.c.look='clay',f=>f.c.selection={mode:()=> 'object'},f=>f.c.session={isActive:()=>true}]){
  const f=fixture();f.c.controls.enabled=false;assert.equal(f.brush.begin(1,0),true);mutate(f);f.brush.finish(1);assert.equal(f.snapshots.length,0);assert.equal(f.c.controls.enabled,false);
 }
 for(const mutate of [f=>f.object.locked=true,f=>f.c.session={isActive:()=>true},f=>f.c.look='clay',f=>f.c.history=null]){const f=fixture();mutate(f);assert.equal(f.brush.begin(1,0),false);assert.equal(f.c.controls.enabled,true);}
 const f=fixture();f.mesh.faceGroups[0]='Roof';f.brush.begin(1,0);f.brush.finish(1);assert.equal(f.snapshots.length,0);assert.equal(f.brush.arm(''),false);f.brush.stop();assert.equal(f.brush.armed,false);
});
test('actual selection brush and Pencil gate route facegroup stroke, release and cancellation without orbit or selection edits',()=>{
 const mesh=new EditableMesh([[-2,-1,0],[0,-1,0],[0,1,0],[-2,1,0],[2,-1,0],[2,1,0]],[[0,1,2,3],[1,4,5,2]]);
 const f=pencilSelectionRuntime(mesh);f.setMode('face');f.setIds([]);const c=f.context,snapshots=[];
 const faces=new Map(mesh.faces.map((face,i)=>{const part=new EditableMesh(mesh.vertices,[face]);const body=new THREE.Mesh(part.triangulatedGeometry(),new THREE.MeshBasicMaterial({side:THREE.DoubleSide}));body.userData={index:i,kind:'body'};body.updateMatrixWorld();return [i,body];}));f.state.faceObjects=faces;for(const body of faces.values())f.state.scene.add(body);
 const object={id:'a',mesh};c.__boxlabObjectManager.objects=[object];c.__boxlabObjectManager.replaceActiveMesh=next=>{object.mesh=next;return true;};
 const brush=createFacegroupStroke({context:()=>({mesh:f.state.mesh,manager:c.__boxlabObjectManager,controls:f.state.controls,selection:c.__boxlabSelectionBridge,look:'facegroups',history:{capture:()=>object.mesh.clone(),checkpointSnapshot:m=>snapshots.push(m)}})});c.__boxlabFacegroupStroke=brush;brush.arm('Walls');
 const a=f.screen(new THREE.Vector3(-1,0,0)),b=f.screen(new THREE.Vector3(1,0,0));
 f.pointer('pointerdown',{clientX:a.x,clientY:a.y});assert.equal(brush.pointerId,1);f.pointer('pointermove',{clientX:b.x,clientY:b.y});assert.equal(f.orbit().down,0);assert.equal(snapshots.length,0);f.pointer('pointerup',{clientX:b.x,clientY:b.y});assert.equal(snapshots.length,1);assert.deepEqual(object.mesh.faceGroups,['Walls','Walls']);assert.deepEqual(f.ids(),[]);assert.equal(f.state.controls.enabled,true);
 f.pointer('pointerdown',{clientX:a.x,clientY:a.y});f.pointer('pointercancel',{clientX:a.x,clientY:a.y});assert.equal(snapshots.length,1);assert.equal(brush.pointerId,null);assert.equal(f.state.controls.enabled,true);
 f.pointer('pointerdown',{clientX:a.x,clientY:a.y});f.pointer('pointerdown',{pointerId:2,pointerType:'touch',clientX:b.x,clientY:b.y});assert.equal(brush.pointerId,null);assert.equal(f.state.controls.enabled,true);f.pointer('pointerup',{clientX:a.x,clientY:a.y});assert.equal(snapshots.length,1);
 f.pointer('pointerdown',{clientX:a.x,clientY:a.y});f.pointer('lostpointercapture',{clientX:a.x,clientY:a.y});assert.equal(brush.pointerId,null);assert.equal(f.state.controls.enabled,true);
 f.pointer('pointerdown',{clientX:a.x,clientY:a.y});c.window.dispatchEvent({type:'pagehide'});assert.equal(brush.pointerId,null);assert.equal(f.state.controls.enabled,true);assert.equal(snapshots.length,1);
 brush.stop();const orbitBefore=f.orbit().down;f.pointer('pointerdown',{clientX:999,clientY:599});assert.equal(f.orbit().down,orbitBefore+1,'background Pencil navigation remains available');
});
