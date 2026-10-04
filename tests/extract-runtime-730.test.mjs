import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import {EditableMesh} from '../src/mesh.js';
const source=fs.readFileSync(new URL('../src/extract-faces.js',import.meta.url),'utf8');
function fixture(ids){
 const mesh=EditableMesh.cube(2);mesh.faceGroups=['a','b','c','d','e','f'];const before=mesh.clone(),events=[],objects=[],calls=[];let click;
 const context={EditableMesh,document:{querySelector:q=>q==='#extractFacesBtn'?{addEventListener:(t,f)=>click=f}:q==='#selectionStatus'?{}:null},window:{dispatchEvent:e=>events.push(e)},CustomEvent:class{constructor(type,{detail}){Object.assign(this,{type,detail});}},__boxlabBridgeState:{mesh},__boxlabSelectionBridge:{mode:()=> 'face',indices:()=>ids},__boxlabObjectHistory:{checkpoint:()=>{calls.push('checkpoint');return true;}},__boxlabHistory:{push:()=>calls.push('mesh-history')},__boxlabObjectManager:{addMesh:(m,name,options)=>{const o={id:2,name,mesh:m.clone()};objects.push(o);calls.push(options.enterObjectMode);return o;}}};
 vm.runInNewContext(source.replace(/^import .*\n/,''),context);
 return{mesh,before,events,objects,calls,click};
}
test('Extract runtime loads, moves selected faces/groups and uses one scene-history checkpoint',()=>{
 const f=fixture([0,2,2]);assert.equal(typeof f.click,'function');f.click();assert.equal(f.objects.length,1);assert.equal(f.mesh.faces.length,4);assert.deepEqual([...f.mesh.faceGroups],['b','d','e','f']);assert.deepEqual([...f.objects[0].mesh.faceGroups],['a','c']);assert.equal(f.objects[0].mesh.faces.length,2);assert.equal(f.calls.filter(x=>x==='checkpoint').length,1);assert.ok(!f.calls.includes('mesh-history'));assert.equal(f.events[0].type,'boxlab-face-extract-complete');assert.equal(f.events[0].detail.sourceChanged,true);assert.ok(f.calls.includes(true));
});
test('Extract all faces retains original object and emits completion once; empty selection is a no-op',()=>{
 const f=fixture([0,1,2,3,4,5]);f.click();assert.deepEqual(f.mesh,f.before);assert.equal(f.objects[0].mesh.faces.length,6);assert.equal(f.events.length,1);assert.equal(f.events[0].detail.sourceChanged,false);const empty=fixture([]);empty.click();assert.equal(empty.calls.length,0);assert.equal(empty.objects.length,0);
});
