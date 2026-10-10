import {gestureDebugRuntime} from './gesture-debug-runtime.mjs';
import {mainPickerRuntime} from './main-picker-runtime.mjs';
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
    assert.equal(event.prevented,true);assert.equal(event.stopped,true,'direct owner consumes the press');
    assert.ok(r.captures.has(event.pointerId),'direct owner captures the pointer');
    const press=r.f.events.filter(e=>e.type==='boxlab-face-direct-press');
    assert.equal(press.length,1);assert.equal(press[0].detail.pointerId,event.pointerId);
    assert.equal(press[0].detail.hit,4);assert.deepEqual(Array.from(press[0].detail.workingFaces),[4]);
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

function projectedFace(r,index){
  const point=new THREE.Vector3();r.m.faces[index].forEach(i=>point.add(r.m.vertices[i]));
  point.multiplyScalar(1/r.m.faces[index].length).project(r.f.state.camera);
  return {clientX:(point.x*.5+.5)*900,clientY:(-point.y*.5+.5)*600};
}

function pressTarget(r,expected,position=projectedFace(r,1),pointerId=22){
  const before=snapshot(r.m),ids=[...r.f.selected()],undo=r.f.history.undoStack.length,redo=r.f.history.redoStack.length;
  r.pointer('pointerdown',{...position,pointerId});
  assert.equal(r.f.api.pending()?.hit,expected,'pending hit must respect the current targeting contract');
  const working=ids.includes(expected)?ids:[expected];
  assert.deepEqual(Array.from(r.f.api.pending().workingFaces),working);
  r.pointer('pointercancel',{pointerId});r.retired();
  assert.deepEqual(r.f.selected(),ids,'cancel restores provisional selection');
  assert.equal(snapshot(r.m),before);assert.equal(r.f.history.undoStack.length,undo);assert.equal(r.f.history.redoStack.length,redo);
}

function committedExtrude(sourceTransform,ids=[1]){
  const r=fixture('extrude',ids,sourceTransform);r.setHit(1);
  r.pointer('pointerdown');r.pointer('pointermove',{clientX:10009});
  const d=r.f.owner.drag();assert.ok(d);
  r.pointer('pointermove',{clientX:10009+d.normal.x*50,clientY:10000+d.normal.y*50});r.pointer('pointerup');
  assert.equal(r.f.history.undoStack.length,1);assert.deepEqual(r.f.selected(),ids);r.retired();
  return r;
}

export function selectedPriority(sourceTransform){
  for(const tool of ['extrude','inset'])for(const ids of [[1],[1,0]]){
    const r=fixture(tool,ids,sourceTransform);r.setHit(2);
    r.bridge.pickHits=()=>[{index:2},{index:4}];
    // Real Three selected-Face raycast at the projected front cap, despite a
    // different controlled native primary/stack. No whole-scene picker claim.
    pressTarget(r,1);r.unchanged();assert.equal(r.toggles.length,0);
  }
}

export function sequentialScope(sourceTransform){
  // Deliberate selection has priority before an ordinary commit, in both tools.
  for(const tool of ['extrude','inset']){
    const r=fixture(tool,[1],sourceTransform);r.setHit(1);r.bridge.pickHits=()=>[{index:1},{index:2}];
    pressTarget(r,1);r.unchanged();
  }
  // Enable continuation via a real commit, not by seeding an internal boolean.
  const r=committedExtrude(sourceTransform);r.setHit(1);r.bridge.pickHits=()=>[{index:1},{index:2}];
  pressTarget(r,2);
  r.f.owner.setTool('inset');pressTarget(r,1); // even with surviving Extrude continuation state
  r.f.owner.setTool('extrude');r.bridge.set('face',[1,0]);pressTarget(r,1);
  r.bridge.set('face',[3]);r.setHit(3);r.bridge.pickHits=()=>[{index:3},{index:2}];
  pressTarget(r,3,projectedFace(r,3)); // selection-key mismatch forbids stale continuation
  const multi=committedExtrude(sourceTransform,[1,0]);multi.setHit(1);multi.bridge.pickHits=()=>[{index:1},{index:2}];
  pressTarget(multi,1,{clientX:10000,clientY:10000}); // no selected hit, unchanged multi selection key
}

export function explicitResets(sourceTransform){
  for(const reset of ['tap','rearm']){
    const r=committedExtrude(sourceTransform);r.setHit(1);
    if(reset==='tap'){
      // Toggle off explicitly, then deliberately restore the same IDs: a key
      // comparison alone cannot protect this case; the tap must clear preference.
      r.pointer('pointerdown');r.pointer('pointerup');assert.deepEqual(r.f.selected(),[]);
      r.bridge.set('face',[1]);
    }else{
      for(const id of ['insetBtn','extrudeBtn']){
        const target={id,closest(selector){return selector==='#extrudeBtn,#insetBtn'?this:null;}};
        r.f.context.document.dispatchEvent({type:'click',target,preventDefault(){},stopImmediatePropagation(){}});
      }
      assert.equal(r.f.api.tool(),'extrude');
    }
    r.bridge.pickHits=()=>[{index:1},{index:2}];pressTarget(r,1);
  }
}

export function explicitExactAndReplay(sourceTransform){
  for(const ids of [[1],[1,0]]){
    const r=committedExtrude(sourceTransform);r.bridge.set('face',ids);r.setHit(2);
    let stackReads=0;r.bridge.pickHits=()=>{stackReads++;return [{index:2},{index:4}];};
    const picks=r.picks.length;pressTarget(r,ids[0],{clientX:10000,clientY:10000},9876);
    assert.equal(r.picks.length,picks,'synthetic Exact never re-picks the native primary');
    assert.equal(stackReads,0,'synthetic Exact never re-picks the native stack');
    // Current Exact-style synthetic path commits the full explicit set once.
    const before=effectiveSnapshot(r.m),history=r.f.history.undoStack.length;
    r.f.exact(.2);r.retired();assert.deepEqual(r.f.selected(),ids);
    assert.equal(r.f.history.undoStack.length,history+1);assert.equal(r.picks.length,picks);assert.equal(stackReads,0);
    const after=effectiveSnapshot(r.m),undo=r.f.history.undo(r.m);
    assert.equal(effectiveSnapshot(undo),before);assert.equal(effectiveSnapshot(r.f.history.redo(undo)),after);
  }
  // Repeat ceased using synthetic pointers in .531. Exercise its current direct
  // replay API separately; this is not proof of the Repeat UI's tap launcher.
  for(const tool of ['extrude','inset']){
    const r=committedExtrude(sourceTransform);r.setHit(4);r.bridge.pickHits=()=>[{index:4}];
    const picks=r.picks.length,before=effectiveSnapshot(r.m),history=r.f.history.undoStack.length;
    const face=Array.from(r.m.faces[2]),other=Array.from(r.m.faces[3]);
    assert.equal(r.f.api.replay(tool,.2,2),true);assert.deepEqual(r.f.selected(),[2]);
    assert.notDeepEqual(Array.from(r.m.faces[2]),face,'replay changes the explicit target Face');
    assert.deepEqual(Array.from(r.m.faces[3]),other,'replay leaves an unrelated Face cycle intact');
    assert.equal(r.picks.length,picks);assert.equal(r.f.history.undoStack.length,history+1);
    const after=effectiveSnapshot(r.m),undo=r.f.history.undo(r.m);
    assert.equal(effectiveSnapshot(undo),before);assert.equal(effectiveSnapshot(r.f.history.redo(undo)),after);
  }
}

// Connect the existing main picker extraction to the whole Face owner using the
// same camera, canvas rectangle and actual cube face fan meshes. Selection/history
// and DOM dispatch remain the shared controlled fixture; not a whole-app UI test.
function nativeFaceRoot(mesh){
  const root=new THREE.Group();
    mesh.faces.forEach((f,index)=>{
      const positions=[];for(let i=1;i<f.length-1;i++)for(const id of [f[0],f[i],f[i+1]])positions.push(...mesh.vertices[id].toArray());
      const geometry=new THREE.BufferGeometry();geometry.setAttribute('position',new THREE.Float32BufferAttribute(positions,3));
      const object=new THREE.Mesh(geometry,new THREE.MeshBasicMaterial({side:THREE.DoubleSide}));object.userData={kind:'face',index};root.add(object);
    });root.updateMatrixWorld(true);
  return root;
}

export function nativeFacePicker(sourceTransform){
  for(const tool of ['extrude','inset'])for(const ids of [[],[0],[1],[1,0]]){
    const r=fixture(tool,ids),root=nativeFaceRoot(r.m);
    try{
      const native=mainPickerRuntime({sourceTransform,camera:r.f.state.camera,canvas:r.f.elements.get('#viewport'),root});
      for(const name of ['pick','pickHits','pickObject'])r.bridge[name]=native.bridge[name];
      const position=projectedFace(r,1),press=r.pointer('pointerdown',position);
      assert.equal(r.f.api.pending()?.hit,1,'live cube front cap is the intended primary');
      assert.ok(native.events.every(e=>e===press),'primary and stack receive the original press');
      assert.equal(native.events.length,2);assert.equal(press.prevented,true);assert.equal(press.stopped,true);
      const expectedWorking=ids.includes(1)?ids:[1];assert.deepEqual(Array.from(r.f.api.pending().workingFaces),expectedWorking);
      r.unchanged();r.pointer('pointerup',position);
      assert.deepEqual(r.f.selected(),ids.includes(1)?ids.filter(i=>i!==1):[...ids,1]);
      assert.deepEqual(r.toggles,[{type:'face',index:1}]);r.unchanged();r.retired();
      r.pointer('pointerup',position);assert.equal(r.toggles.length,1);
    }finally{root.children.forEach(o=>{o.geometry.dispose();o.material.dispose();});}
  }
}

// Current semantic press evidence and real central debug owner, without the retired
// temporary FaceTap overlay. Logging never changes the model or selection/history.
export function faceDiagnostics(sourceTransform){
  for(const tool of ['extrude','inset']){
    const r=fixture(tool,[0,2],sourceTransform),debug=gestureDebugRuntime();r.f.context.__boxlabGestureDebug=debug.api;
    const before=snapshot(r.m);r.setHit(0);r.pointer('pointerdown');
    const press=r.f.events.filter(e=>e.type==='boxlab-face-direct-press');assert.equal(press.length,1);
    assert.equal(press[0].detail.pointerId,22);assert.equal(press[0].detail.tool,tool);assert.equal(press[0].detail.hit,0);
    assert.deepEqual(Array.from(press[0].detail.selectionBefore),[0,2]);assert.deepEqual(Array.from(press[0].detail.workingFaces),[0,2]);
    r.pointer('pointerup');assert.deepEqual(r.f.selected(),[2]);r.unchanged();r.retired();
    assert.deepEqual(Array.from(press[0].detail.selectionBefore),[0,2],'press evidence retains its original snapshot');
    assert.equal(debug.body.children.filter(n=>n.textContent.includes('FACE DIRECT FINISH')).length,1);
    assert.match(debug.body.children[0].textContent,/FACE DIRECT FINISH.*type=pointerup.*pid=22.*pointer=pen.*pendingFace=true.*drag=false/);
    r.setHit(3);r.pointer('pointerdown');r.pointer('pointercancel');assert.deepEqual(r.f.selected(),[2]);r.unchanged();r.retired();
    const lines=debug.body.children.filter(n=>n.textContent.includes('FACE DIRECT FINISH'));
    assert.equal(lines.length,2);assert.match(lines[0].textContent,/type=pointercancel/);assert.match(lines[1].textContent,/type=pointerup/);
    r.pointer('pointerup');assert.equal(debug.body.children.filter(n=>n.textContent.includes('FACE DIRECT FINISH')).length,2,'old release emits no duplicate finish');
    for(let i=0;i<20;i++)debug.api.log('UNRELATED',{i});assert.equal(debug.body.children.length,12,'central recent log is bounded');
    debug.api.clear();assert.equal(debug.body.children.length,0);debug.api.disable();assert.equal(debug.root.children.length,0);
    r.setHit(2);r.pointer('pointerdown');r.pointer('pointerup');assert.deepEqual(r.f.selected(),[]);assert.equal(debug.root.children.length,0,'disabled logging creates no panel');
    assert.equal(snapshot(r.m),before);assert.equal(r.f.history.undoStack.length,0);assert.equal(r.f.history.redoStack.length,1);
  }
}

// Exercise current native picking from every cube side. Real Face fan meshes and
// a shared camera/rect are used; no back-facing polygon screen-picker is invented.
export function nativeFaceViewpoints(sourceTransform){
  for(const tool of ['extrude','inset'])for(const axis of ['x','y','z'])for(const sign of [-1,1]){
    const r=fixture(tool,[]),root=nativeFaceRoot(r.m);
    const camera=r.f.state.camera;camera.position.set(0,0,0);camera.position[axis]=sign*5;
    camera.up.set(0,axis==='y'?0:1,axis==='y'?1:0);camera.lookAt(0,0,0);camera.updateMatrixWorld();
    const expected=r.m.faces.findIndex(f=>f.every(i=>r.m.vertices[i][axis]===sign));assert.ok(expected>=0);
    try{
      const native=mainPickerRuntime({sourceTransform,camera,canvas:r.f.elements.get('#viewport'),root});
      for(const name of ['pick','pickHits','pickObject'])r.bridge[name]=native.bridge[name];
      const position={clientX:450,clientY:300},probe={...position};
      const primary=native.bridge.pick('face',probe),hits=native.bridge.pickHits('face',probe);
      assert.equal(primary?.index,expected,'nearest actual face follows camera viewpoint');
      assert.ok(hits.some(h=>h.index!==expected),'far shell remains deeper in raw native stack');
      assert.ok(hits.every((h,i)=>!i||h.distance>=hits[i-1].distance));
      r.pointer('pointerdown',position);assert.equal(r.f.api.pending()?.hit,expected);
      assert.deepEqual(Array.from(r.f.api.pending().workingFaces),[expected]);r.unchanged();
      r.pointer('pointerup',position);assert.deepEqual(r.f.selected(),[expected]);
      assert.deepEqual(r.toggles,[{type:'face',index:expected}]);r.unchanged();r.retired();
    }finally{root.children.forEach(o=>{o.geometry.dispose();o.material.dispose();});}
  }
}
