import test from 'node:test';
import assert from 'node:assert/strict';
import * as THREE from 'three';
import {EditableMesh} from '../src/mesh.js';
import {createSelectionInputOptions} from '../src/selection-input-controls.js';
import {vertexRuntime} from './helpers/vertex-extrude-runtime.mjs';
import {mainPickerRuntime} from './helpers/main-picker-runtime.mjs';

// Full document-capture tap owner, real cube/main raycasts and event propagation.
// Downstream selection storage/rendering is controlled, not a Safari/WebGL test.
function fixture(axis='z',sign=1,{front=true,sourceTransform=s=>s}={}){
 const m=EditableMesh.cube();m.vertices.forEach(v=>v.multiplyScalar(.5));
 const near=m.faces.findIndex(face=>face.every(i=>m.vertices[i][axis]===sign*.5));
 const far=m.faces.findIndex(face=>face.every(i=>m.vertices[i][axis]===-sign*.5));
 const f=vertexRuntime(m,[far],{sourceTransform});f.setMode('face');
 const camera=f.state.camera;camera.position.set(0,0,0);camera.position[axis]=sign*5;
 camera.up.set(0,axis==='y'?0:1,axis==='y'?1:0);camera.lookAt(0,0,0);camera.updateMatrixWorld();
 const root=new THREE.Group();m.faces.forEach((face,index)=>{
  const positions=[];for(let i=1;i<face.length-1;i++)for(const vi of [face[0],face[i],face[i+1]])positions.push(...m.vertices[vi].toArray());
  const geometry=new THREE.BufferGeometry();geometry.setAttribute('position',new THREE.Float32BufferAttribute(positions,3));
  const picker=new THREE.Mesh(geometry,new THREE.MeshBasicMaterial({side:THREE.DoubleSide}));picker.userData={kind:'face',index};root.add(picker);
 });root.updateMatrixWorld(true);
 const native=mainPickerRuntime({root,camera,canvas:f.canvas}),input=createSelectionInputOptions(f.context);input.setFront(front);
 native.context.__boxlabSelectionInput=input;f.context.__boxlabSelectionInput=input;
 const b=f.context.__boxlabSelectionBridge;b.pick=native.bridge.pick;b.pickHits=native.bridge.pickHits;
 f.history.redoStack.push(m.clone());const before=JSON.stringify(m);
 f.load('component-tap-toggle.js');
 // Existing main unselected-hit behavior: add the nearest hit; the document
 // owner must yield before this adapter can run. Selected taps belong to owner.
 f.canvas.addEventListener('pointerdown',e=>{const hit=b.pick('face',e);if(hit&&!f.ids().includes(hit.index))b.set('face',[...f.ids(),hit.index]);});
 const tap=()=>{const down=f.pointer('pointerdown',{clientX:500,clientY:300});f.pointer('pointerup',{clientX:500,clientY:300,buttons:0,pressure:0});return down;};
 const unchanged=()=>{assert.equal(JSON.stringify(m),before);assert.equal(f.history.undoStack.length,0);assert.equal(f.history.redoStack.length,1);};
 return {...f,near,far,b,input,tap,unchanged};
}

test('1129 selecting unselected front cube face preserves selected rear face from all six views',()=>{
 for(const axis of ['x','y','z'])for(const sign of [-1,1]){
  const f=fixture(axis,sign);assert.equal(f.b.pick('face',{clientX:500,clientY:300}).index,f.near);
  const down=f.tap();assert.equal(!!down.stopped,false,'document capture must yield unselected visible face');
  assert.deepEqual(f.ids(),[f.far,f.near]);
  assert(f.tap().stopped,'visible selected face still toggles off');assert.deepEqual(f.ids(),[f.far]);f.unchanged();
 }
});
test('1129 FRONT rejection cannot fall back to selected rear ray; OFF retains legacy behavior',()=>{
 const f=fixture();f.b.pick=()=>null;f.tap();assert.deepEqual(f.ids(),[f.far]);f.unchanged();
 const legacy=fixture('z',1,{front:false});assert(legacy.tap().stopped);assert.deepEqual(legacy.ids(),[]);legacy.unchanged();
});
test('1129 restoring the old selected-only tap ray reproduces rear deselection',()=>{
 const f=fixture('z',1,{sourceTransform:(s,name)=>name==='component-tap-toggle.js'?s.replace(/if\(globalThis\.__boxlabSelectionInput\?\.frontOnly\?\.\(\)\)\{[^}]+\}/,''):s});
 f.tap();assert.deepEqual(f.ids(),[],'old capture removes rear face before front can be added');f.unchanged();
});
