import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import * as THREE from 'three';
import {EditableMesh} from '../../src/mesh.js';
import {installLooseTopology} from '../../src/loose-topology.js';
import {installFaceRegion} from '../../src/face-region.js';
import {faceRuntime,snapshot} from './negative-extrude-runtime.mjs';

// Install the same real region/Inset kernels reached through loose-bootstrap
// and multi-face-direct's side-effect import. Suppress only the legacy UI hooks.
const previousDocument=globalThis.document;
globalThis.document={querySelector:()=>null};
try{installLooseTopology(EditableMesh);installFaceRegion(EditableMesh);}
finally{if(previousDocument===undefined)delete globalThis.document;else globalThis.document=previousDocument;}
vm.runInNewContext(fs.readFileSync(new URL('../../src/uniform-inset.js',import.meta.url),'utf8').replace(/^import .*;\n/gm,''),{EditableMesh,THREE});

// History.clone materializes absent labels as null. Compare effective per-Face
// labels as the accepted .756 contract requires, while retaining exact geometry,
// crease and loose-topology values.
function effectiveSnapshot(mesh){
  const value=JSON.parse(snapshot(mesh));
  value.groups=mesh.faces.map((_,index)=>mesh.faceGroups?.[index]??null);
  return JSON.stringify(value);
}

// Reuse the whole current Face controller, real mesh kernels, selected-Face
// raycast and History. Native primary picking/selection bridge and DOM/event
// dispatch are controlled doubles; this does not prove Safari/Pencil hit accuracy.
function fixture(tool,ids=[0,2],sourceTransform){
  const m=EditableMesh.cube(),f=faceRuntime(m,ids,{sourceTransform});
  f.owner.setTool(tool);f.history.redoStack.push(m.clone());
  const before=snapshot(m),bridge=f.context.__boxlabSelectionBridge;
  const toggles=[],picks=[],captures=new Set();let hit=0;
  bridge.pick=(type,event)=>{picks.push({type,event});return {index:hit};};
  bridge.toggle=(type,index)=>{
    toggles.push({type,index});
    const current=f.selected();
    bridge.set(type,current.includes(index)?current.filter(value=>value!==index):[...current,index]);
  };
  const canvas=f.elements.get('#viewport');
  canvas.setPointerCapture=id=>captures.add(id);
  canvas.hasPointerCapture=id=>captures.has(id);
  canvas.releasePointerCapture=id=>captures.delete(id);
  // Outside selected geometry avoids selected-hit priority in these delegated-
  // primary-picker cases. Selected-hit priority has its own retained .535 checks.
  const pointer=(type,extra={})=>f.pointer(type,{pointerType:'pen',clientX:10000,clientY:10000,...extra});
  function unchanged(){
    assert.equal(snapshot(m),before,'selection must not alter geometry/metadata');
    assert.equal(f.history.undoStack.length,0,'selection adds no mesh history');
    assert.equal(f.history.redoStack.length,1,'selection preserves redo');
    assert.equal(f.api.tool(),tool,'tool stays armed');
  }
  function retired(){assert.equal(f.api.pending(),null);assert.equal(f.owner.drag(),null);assert.equal(captures.size,0);}
  return {m,f,bridge,before,picks,toggles,captures,pointer,unchanged,retired,setHit:value=>{hit=value;}};
}

export function tapRemoval(sourceTransform){
  for(const tool of ['extrude','inset']){
    const x=fixture(tool,[0,2],sourceTransform);
    x.setHit(0);x.pointer('pointerdown');
    assert.deepEqual(x.f.selected(),[0,2]);assert.equal(x.f.api.pending().hit,0);x.unchanged();
    x.pointer('pointerup');assert.deepEqual(x.f.selected(),[2]);
    assert.deepEqual(x.toggles,[{type:'face',index:0}]);x.unchanged();x.retired();
    x.pointer('pointerup');assert.equal(x.toggles.length,1,'repeated release cannot toggle again');
  }
}

export function tapToggle(sourceTransform){
  for(const tool of ['extrude','inset']){
    const r=fixture(tool,[0],sourceTransform);
    for(const [hit,expected] of [[1,[0,1]],[0,[1]],[2,[1,2]],[2,[1]]]){
      r.setHit(hit);r.pointer('pointerdown');
      assert.equal(r.f.api.pending().hit,hit);r.unchanged();
      r.pointer('pointerup');assert.deepEqual(r.f.selected(),expected);r.unchanged();r.retired();
    }
    assert.deepEqual(r.toggles.map(call=>call.index),[1,0,2,2]);
    const count=r.toggles.length;
    r.setHit(3);r.pointer('pointerdown');assert.deepEqual(r.f.selected(),[3],'unselected press is provisional');
    r.pointer('pointercancel');assert.deepEqual(r.f.selected(),[1],'cancel restores prior selection');
    assert.equal(r.toggles.length,count,'cancel never toggles');r.unchanged();r.retired();
    r.pointer('pointerup');assert.equal(r.toggles.length,count,'cancel retires the old press');
  }
}

export function delegatedPicker(sourceTransform){
  for(const tool of ['extrude','inset']){
    const r=fixture(tool,[],sourceTransform);r.setHit(4);
    const event=r.pointer('pointerdown');
    assert.equal(r.picks.length,1);assert.equal(r.picks[0].type,'face');assert.equal(r.picks[0].event,event);
    assert.equal(r.f.api.pending().hit,4,'owner accepts an unselected primary Face from the bridge');
    assert.deepEqual(r.f.selected(),[4]);assert.equal(r.f.owner.drag(),null);r.unchanged();
    r.pointer('pointerup');assert.deepEqual(r.f.selected(),[4]);r.retired();r.unchanged();
  }
}

export function deferredModelling(sourceTransform){
  for(const tool of ['extrude','inset']){
    const r=fixture(tool,[0,2],sourceTransform);let regionReads=0,clones=0;
    const clone=r.m.clone.bind(r.m);
    r.m.clone=()=>{clones++;return clone();};
    r.m.faceRegionsInfo=()=>{regionReads++;return null;};
    r.setHit(3);r.pointer('pointerdown');r.pointer('pointermove',{clientX:10005});
    assert.equal(regionReads,0,'down/small movement do not validate a modelling region');
    assert.equal(clones,0,'down/small movement do not begin a geometry transaction');
    assert.equal(r.f.owner.drag(),null);r.unchanged();
    r.pointer('pointerup');assert.deepEqual(r.f.selected(),[0,2,3],'tap toggles even when region validator refuses');
    assert.equal(clones,0);r.unchanged();r.retired();
  }
}

export function dragWorkingSet(sourceTransform){
  for(const tool of ['extrude','inset'])for(const [ids,hit,expected] of [[[0],1,[1]],[[0,1],0,[0,1]]]){
    const r=fixture(tool,ids,sourceTransform);r.setHit(hit);
    const untouchedFace=r.m.faces[0].slice(),untouchedPositions=untouchedFace.map(i=>r.m.vertices[i].toArray());
    r.pointer('pointerdown');
    assert.deepEqual(Array.from(r.f.api.pending().workingFaces),expected);
    r.pointer('pointermove',{clientX:10005});assert.equal(r.f.owner.drag(),null);r.unchanged();
    r.pointer('pointermove',{clientX:10009});
    const drag=r.f.owner.drag();assert.ok(drag,'deliberate motion promotes to direct modelling');
    assert.deepEqual(Array.from(drag.faces),expected);assert.deepEqual(r.f.selected(),expected);
    const movement=tool==='extrude'?{clientX:10009+drag.normal.x*50,clientY:10000+drag.normal.y*50}:{clientX:10049,clientY:10000};
    r.pointer('pointermove',movement);
    assert.equal(drag.preview,true,'real kernel produced a preview');assert.notEqual(snapshot(r.m),r.before);
    assert.equal(r.f.history.undoStack.length,0);assert.equal(r.f.history.redoStack.length,1,'preview preserves redo');
    if(!ids.includes(hit)){
      assert.deepEqual(Array.from(r.m.faces[0]),untouchedFace,'previously selected Face remains untouched');
      assert.deepEqual(untouchedFace.map(i=>r.m.vertices[i].toArray()),untouchedPositions);
    }
    r.pointer('pointerup');r.retired();assert.deepEqual(r.f.selected(),expected);assert.equal(r.toggles.length,0,'drag must not also toggle');
    assert.equal(r.f.api.tool(),tool);assert.equal(r.f.history.undoStack.length,1);assert.equal(r.f.history.redoStack.length,0);
    const after=effectiveSnapshot(r.m),undo=r.f.history.undo(r.m);assert.equal(snapshot(undo),r.before);
    assert.equal(effectiveSnapshot(r.f.history.redo(undo)),after,'one-step Redo restores the committed kernel result');
    r.pointer('pointerup');assert.equal(r.f.history.undoStack.length,1,'old release cannot commit twice');
  }
}

export function dragCancellation(sourceTransform){
  for(const tool of ['extrude','inset']){
    const r=fixture(tool,[0],sourceTransform);r.setHit(1);
    r.pointer('pointerdown');r.pointer('pointermove',{clientX:10009});
    const drag=r.f.owner.drag();assert.ok(drag);
    r.pointer('pointermove',tool==='extrude'?{clientX:10009+drag.normal.x*50,clientY:10000+drag.normal.y*50}:{clientX:10049});
    assert.equal(drag.preview,true);assert.notEqual(snapshot(r.m),r.before);
    r.pointer('pointercancel');r.unchanged();r.retired();
    assert.deepEqual(r.f.selected(),[1],'drag Cancel retains its working Face selection');
    assert.equal(r.toggles.length,0);
    r.pointer('pointerup');r.unchanged();r.retired();assert.equal(r.toggles.length,0);
  }
}
