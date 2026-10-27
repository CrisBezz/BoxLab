import test from 'node:test';
import assert from 'node:assert/strict';
import {EditableMesh} from '../src/mesh.js';
import {createFacegroupStroke} from '../src/facegroup-stroke.js';
function fixture(){
 const mesh=EditableMesh.cube(1);mesh.faceGroups=['Roof','Wall','Roof',null,null,null];
 const object={id:'a',mesh},history=[],controls={enabled:true},messages=[];
 const manager={activeId:'a',objects:[object],replaceActiveMesh(next){Object.assign(mesh,next);return true;}};
 const brush=createFacegroupStroke({context:()=>({mesh,manager,controls,look:'facegroups',selection:{mode:()=> 'face'},history:{capture:()=>mesh.clone(),checkpointSnapshot:before=>history.push(before)}}),notify:m=>messages.push(m)});
 return {mesh,brush,history,controls,messages};
}
test('eraser stages then clears only crossed faces once, preserving other groups and geometry',()=>{
 const f=fixture(),geometry=JSON.stringify([f.mesh.vertices,f.mesh.faces]);assert.equal(f.brush.arm(null),true);assert.equal(f.brush.group,null);
 f.brush.begin(1,0);f.brush.add(1,2);assert.equal(f.mesh.faceGroups[0],'Roof');assert.equal(f.history.length,0);f.brush.finish(1);
 assert.deepEqual(f.mesh.faceGroups,[null,'Wall',null,null,null,null]);assert.equal(f.history.length,1);assert.deepEqual(f.history[0].faceGroups,['Roof','Wall','Roof',null,null,null]);assert.equal(JSON.stringify([f.mesh.vertices,f.mesh.faces]),geometry);assert.match(f.messages.at(-1),/2 faces cleared/);
 f.brush.begin(2,0);f.brush.finish(2);assert.equal(f.history.length,1,'already ungrouped creates no history');
});
test('switching assign/erase cancels pending stroke and retains same controller lifecycle',()=>{
 const f=fixture();f.brush.arm('New');f.brush.begin(1,0);f.brush.arm(null);assert.equal(f.brush.pointerId,null);assert.equal(f.controls.enabled,true);assert.equal(f.history.length,0);assert.equal(f.mesh.faceGroups[0],'Roof');
 f.brush.begin(2,1);f.brush.cancel();assert.equal(f.mesh.faceGroups[1],'Wall');assert.equal(f.history.length,0);
 f.brush.arm('New');assert.equal(f.brush.group,'New');f.brush.begin(3,3);f.brush.finish(3);assert.equal(f.mesh.faceGroups[3],'New');assert.equal(f.history.length,1);
 f.brush.arm(null);f.brush.stop();assert.equal(f.brush.armed,false);assert.equal(f.brush.begin(4,0),false);
});
