import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import {EditableMesh} from '../src/mesh.js';

function fixture(mesh){
  const history=[],el=()=>({style:{},appendChild(){},addEventListener(){},dispatchEvent(){}});
  const context={document:{querySelector:()=>el(),createElement:el,addEventListener(){}},window:{addEventListener(){}},setTimeout(){},queueMicrotask:f=>f(),Event:class{},__boxlabBridgeState:{mesh},__boxlabHistory:{push:m=>history.push(m)},__boxlabSelectionBridge:{set(){}}};
  vm.runInNewContext(fs.readFileSync(new URL('../src/clean-vertices.js',import.meta.url),'utf8'),context);
  return{api:context.__boxlabCleanVertices,history};
}
test('Clean Vertices reports existing safe cleanup and one history step without changing its plan',()=>{
  const m=new EditableMesh([[0,0,0],[1,0,0],[2,0,0],[2,2,0],[0,2,0]],[[0,1,2,3,4]]),f=fixture(m);
  assert.equal(f.api.plan(m).totalRemoved,1);
  const result=f.api.apply();assert.equal(result.ok,true);assert.equal(result.removed,1);
  assert.equal(m.vertices.length,4);assert.equal(m.faces[0].length,4);assert.equal(f.history.length,1);
  assert.equal(f.api.apply().ok,false);assert.equal(f.history.length,1);
});
test('Clean Vertices reports no eligible cleanup without changing a healthy cube',()=>{
  const m=EditableMesh.cube(),before=m.clone(),f=fixture(m);
  assert.equal(f.api.apply().ok,false);assert.deepEqual(m.vertices,before.vertices);assert.deepEqual(m.faces,before.faces);
  assert.equal(f.history.length,0);
});
