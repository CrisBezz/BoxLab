import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import * as THREE from 'three';
import {editableBooleanEligibility} from '../src/editable-boolean-core.js';
import {editableBooleanRuntime} from './helpers/editable-boolean-runtime.mjs';
import {orderedDOM} from './helpers/ordered-dom.mjs';
function runtime(){
 const r=editableBooleanRuntime(),c=r.c,dom=orderedDOM(),list=dom.node();
 function node(){const n=dom.node();n.dataset={};n.setAttribute=()=>{};return n;}
 list.replaceChildren=()=>{for(const child of [...list.children])child.remove();};
 Object.assign(c,{soloId:null,list,modeLabel:null,duplicateButton:null,renameButton:null,deleteButton:null,linkedDuplicateButton:null,makeUniqueButton:null,editableBooleanEligibility,
  document:{createElement:node,querySelector:()=>null},cap:s=>s,linkedCount:()=>0,updateLockUI(){}});
 const src=fs.readFileSync(new URL('../src/multi-object.js',import.meta.url),'utf8');
 vm.runInContext(src.slice(src.indexOf('function renderOutliner()'),src.indexOf('function forceRender()')).replace(/\bobjects\b/g,'sceneObjects').replace(/\bactiveId\b/g,'sceneActiveId'),c);
 return {...r,list,rows(){c.renderOutliner();return list.children.map(row=>Number(row.dataset.objectId));}};
}
test('805 actual outliner lists result and ordinary hidden objects, retains A/B through live edit and Cancel',()=>{
 const r=runtime();r.objects.find(o=>o.id===3).visible=false;
 const before=r.snapshot(),undo=r.h.undoStack.length;
 assert.deepEqual(r.rows(),[3,4]);assert.deepEqual(r.snapshot(),before);assert.equal(r.h.undoStack.length,undo);
 assert.equal(r.controller.open(4).ok,true);assert.deepEqual(r.rows(),[3,4]);
 assert.equal(r.controller.choose(2),true);r.move(new THREE.Vector3(.1,.02,0));assert.equal(r.controller.update().ok,true);
 assert.deepEqual(r.rows(),[3,4]);assert.equal(r.controller.cancel(),true);assert.deepEqual(r.rows(),[3,4]);
 assert.equal(r.objects.length,4);assert.equal(r.manager.activeId,4);
});
test('805 Apply and scene Undo/Redo recompute recipe rows without deleting stored sources',()=>{
 const r=runtime();assert.equal(r.controller.open(4).ok,true);r.move(new THREE.Vector3(.08,0,0));assert.equal(r.controller.apply().ok,true);
 assert.deepEqual(r.rows(),[3,4]);r.h.undo(r.live);assert.deepEqual(r.rows(),[3,4]);r.h.redo(r.live);assert.deepEqual(r.rows(),[3,4]);
 assert.equal(r.objects.length,4);assert.equal(r.controller.open(4).ok,true);assert.equal(r.controller.cancel(),true);
});
test('805 deleted, damaged or noneditable results release sources; locked valid result stays compact',()=>{
 const r=runtime(),result=r.objects.find(o=>o.id===4);result.locked=true;assert.deepEqual(r.rows(),[3,4]);result.locked=false;
 result.mesh.vertices[0].x+=.2;assert.deepEqual(r.rows(),[1,2,3,4]);
 result.booleanRecipe.resultSignature=JSON.stringify([result.mesh.vertices.map(v=>[v.x,v.y,v.z]),result.mesh.faces,result.mesh.faceGroups,[...result.mesh.creases]]);
 result.booleanRecipe.bId=99;assert.deepEqual(r.rows(),[1,2,3,4]);result.booleanRecipe.bId=2;
 r.objects.splice(r.objects.indexOf(result),1);assert.deepEqual(r.rows(),[1,2,3]);
});
