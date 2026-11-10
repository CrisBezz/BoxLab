import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import * as THREE from 'three';
import {frontDragRuntime} from './helpers/front-drag-selection-runtime.mjs';
const read=name=>fs.readFileSync(new URL('../src/'+name,import.meta.url),'utf8');

test('1127 original Face transform yields an occluded selected face to the actual front picker',()=>{
 for(const front of [true,false]){
  const f=frontDragRuntime();f.input.setFront(front);f.setIds([3]);f.state.selectedFaces=[3];
  const button=f.context.document.createElement('button');button.classList.add('active');f.fields.set('#selectionModes button[data-mode="face"]',button);
  vm.runInContext(read('face-transform.js').replace(/^import .*;\n/,'').replace('export function','function')+'\ninstallFaceTransform();',f.context);
  let selectedFront=false;f.canvas.addEventListener('pointerdown',e=>{const hit=f.context.__boxlabSelectionBridge.pick('face',e);if(hit){f.setIds([hit.index]);selectedFront=true;}});
  const down=f.pen('pointerdown',0);assert.equal(!!down.stopped,!front);assert.equal(selectedFront,front);assert.deepEqual(f.ids(),front?[0]:[3]);
  f.pen('pointercancel',0);assert.equal(f.history.undoStack.length,0);
 }
});

test('1127 region selected-only fallback cannot consume a hidden face with FRONT on',()=>{
 const f=frontDragRuntime(),source=read('face-region.js'),a=source.indexOf('  function selectedFaceHit('),b=source.indexOf('  function setArmed(',a);
 Object.assign(f.context,{raycaster:new THREE.Raycaster(),pointer:new THREE.Vector2(),canvas:f.canvas,selectionBridge:()=>f.context.__boxlabSelectionBridge,setPointer:e=>{const r=f.canvas.getBoundingClientRect();f.context.pointer.set((e.clientX-r.left)/r.width*2-1,-((e.clientY-r.top)/r.height*2-1));}});
 vm.runInContext(source.slice(a,b),f.context);const e=f.point(0),hit=()=>f.context.selectedFaceHit({clientX:e.x,clientY:e.y},f.state.mesh,[3],f.state.camera);
 assert.equal(hit(),null);f.input.setFront(false);assert.equal(hit(),3);f.input.setFront(true);
 const frontHit=f.context.selectedFaceHit({clientX:e.x,clientY:e.y},f.state.mesh,[0],f.state.camera);assert.equal(frontHit,0);
});

test('1127 persistent armed fallback shares the authoritative FRONT picker',()=>{
 const f=frontDragRuntime(),source=read('persistent-face-tool-select.js'),a=source.indexOf('function pickFace('),b=source.indexOf("window.addEventListener('pointerdown'",a);
 Object.assign(f.context,{bridge:()=>f.context.__boxlabSelectionBridge});vm.runInContext(source.slice(a,b),f.context);
 const e=f.point(0);assert.equal(f.context.pickFace({clientX:e.x,clientY:e.y},f.state.mesh,f.state.camera),0);
 f.context.__boxlabSelectionBridge.pick=()=>null;assert.equal(f.context.pickFace(e,f.state.mesh,f.state.camera),null,'no fallback through an occluder or rejected hit');
});

test('current requested rail order is Select Lasso DRAG FRONT Paint without changing spacing',()=>{
 const css=read('viewport-toolbar-controls.js');for(const [id,order]of [['viewportSelectionBtn',0],['lassoSelectBtn',1],['dragSelectBtn',2],['frontSelectBtn',3],['viewportPaintBtn',4]])assert(css.includes('#'+id+'{order:'+order+'}'));
});

test('1127 every live bootstrap import uses the same refreshed module identity',()=>{
 assert(read('uniform-inset.js').includes("./loose-bootstrap.js?v=0.36.18.1127"));
 assert(read('multi-face-direct.js').includes("./uniform-inset.js?v=0.36.18.1127"));
 assert(read('loose-bootstrap.js').includes("./face-transform.js?v=0.36.18.1127"));
 const index=fs.readFileSync(new URL('../index.html',import.meta.url),'utf8');assert(index.includes('src/loose-bootstrap.js?v=0.36.18.1127'));assert(index.includes('src/multi-face-direct.js?v=0.36.18.1127'));
});
