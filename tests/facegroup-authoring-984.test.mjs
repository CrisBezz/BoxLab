import test from 'node:test';
import assert from 'node:assert/strict';
import {EditableMesh} from '../src/mesh.js';
import {assignSelectedFacegroup} from '../src/facegroup-authoring.js';
function fixture(){
 const mesh=EditableMesh.cube(1),object={id:'a',mesh},undo=[];
 const manager={activeId:'a',objects:[object],replaceActiveMesh(next){object.mesh=next;return true;}};
 const history={capture:()=>object.mesh.clone(),checkpointSnapshot:before=>undo.push(before)};
 const args={manager,mesh,history,selection:{mode:()=> 'face',indices:()=>[0,2]},name:'Front'};
 return {mesh,object,undo,args,apply:patch=>assignSelectedFacegroup({...args,mesh:object.mesh,...patch})};
}
test('assign and clear metadata preserve geometry, source, other groups and one checkpoint',()=>{
 const f=fixture();f.mesh.faceGroups[1]='Other';const geometry=JSON.stringify([f.mesh.vertices,f.mesh.faces]);
 assert.equal(f.apply().changed,true);assert.deepEqual(f.object.mesh.faceGroups,['Front','Other','Front',null,null,null]);
 assert.equal(JSON.stringify([f.object.mesh.vertices,f.object.mesh.faces]),geometry);assert.equal(f.mesh.faceGroups[0],null);assert.equal(f.undo.length,1);
 assert.equal(f.apply().changed,false);assert.equal(f.undo.length,1);
 assert.equal(f.apply({name:null}).changed,true);assert.equal(f.object.mesh.faceGroups[0],null);assert.equal(f.object.mesh.faceGroups[1],'Other');
 const redo=f.object.mesh.clone();f.object.mesh=f.undo.pop();assert.equal(f.object.mesh.faceGroups[0],'Front');f.object.mesh=redo;assert.equal(f.object.mesh.faceGroups[0],null);
});
test('invalid contexts and failed replacement do not create history or mutate source',()=>{
 for(const patch of [{name:''},{name:'x\ny'},{name:'x'.repeat(65)},{selection:{mode:()=> 'edge'}},{selection:{mode:()=> 'face',indices:()=>[999]}},{session:{isActive:()=>true}},{history:null}]){
 const f=fixture();assert.equal(f.apply(patch).ok,false);assert.equal(f.undo.length,0);assert.ok(f.mesh.faceGroups.every(x=>x===null));
 }
 for(const key of ['locked','sourceId','arrayRecipe','booleanRecipe','curveProfile']){const f=fixture();f.object[key]=true;assert.equal(f.apply().ok,false);assert.equal(f.undo.length,0);}
 const f=fixture();f.args.manager.replaceActiveMesh=()=>false;assert.equal(f.apply().ok,false);assert.equal(f.undo.length,0);
});
