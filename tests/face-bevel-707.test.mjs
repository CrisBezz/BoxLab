import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import * as THREE from 'three';
import {EditableMesh} from '../src/mesh.js';
import {installLooseTopology} from '../src/loose-topology.js';
import {installFaceRegion} from '../src/face-region.js';
import {installBevelTopology} from '../src/bevel-topology.js';
import {installRoundedLoopBevel} from '../src/rounded-loop-bevel.js';
import {installGeneralEdgeBevelTopology} from '../src/general-edge-bevel-topology.js';
import {installMultiEdgeChamferTopology} from '../src/multi-edge-chamfer-topology.js';
import {installPerimeterFanBevel} from '../src/perimeter-fan-bevel.js';
import {installGeneralizedEdgeFanBevel} from '../src/generalized-edge-fan-bevel.js';
import {installBevelSelection} from '../src/bevel-selection.js';
import {installPerimeterBevelRouting} from '../src/perimeter-bevel-routing.js';
import {installBevelWatertightGuard} from '../src/bevel-watertight-guard.js';
import {History} from '../src/history.js';
import {createFaceBevelPreview,disposeFaceBevelPreview} from '../src/bevel-face-preview.js';
globalThis.document={querySelector:()=>null,addEventListener(){}};
for(const install of [installLooseTopology,installFaceRegion,installBevelTopology,installRoundedLoopBevel,installGeneralEdgeBevelTopology,installMultiEdgeChamferTopology,installPerimeterFanBevel,installGeneralizedEdgeFanBevel,installBevelSelection,installPerimeterBevelRouting,installBevelWatertightGuard])install(EditableMesh);
delete globalThis.document;
const geometry=m=>({vertices:m.vertices.map(v=>v.toArray()),faces:m.faces.map(f=>[...f]),creases:[...m.creases]});
function fixture(m=EditableMesh.cube()){
 const nodes=new Map(),docHandlers=new Map(),winHandlers=new Map(),events=[];let mode='face',ids=[0],locked=false;
 const el=()=>({style:{},value:'',disabled:false,hidden:true,textContent:'',listeners:new Map(),dataset:{},classList:{add(){},remove(){},toggle(){},contains(){return false;}},appendChild(){},setAttribute(){},getAttribute(){return ''},querySelector:s=>node(s),querySelectorAll(){return []},addEventListener(t,f){this.listeners.set(t,f)},getBoundingClientRect(){return{left:0,top:0,width:400,height:400}},setPointerCapture(){},releasePointerCapture(){},dispatchEvent(){}});
 const node=s=>{if(!nodes.has(s))nodes.set(s,el());return nodes.get(s)};
 node('#bevelWidth').value='20';node('#bevelSegments').value='1';
 const context={THREE:{...THREE,Raycaster:class extends THREE.Raycaster{setFromCamera(){}intersectObjects(){return[{object:{userData:{index:ids[0]}}}]} }},Map,Set,createFaceBevelPreview,disposeFaceBevelPreview,placeToolSessionPanel:p=>{p.style.left='50%';},document:{createElement:el,querySelector:s=>s==='#frameAllBtn'?{}:s==='#app'?{classList:{contains:()=>locked}}:node(s),querySelectorAll:()=>[],head:el(),addEventListener:(t,f)=>{if(!docHandlers.has(t))docHandlers.set(t,[]);docHandlers.get(t).push(f)},dispatchEvent:e=>{events.push(e);for(const f of docHandlers.get(e.type)||[])f(e)}},window:{addEventListener:(t,f)=>winHandlers.set(t,f),dispatchEvent:e=>{events.push(e);winHandlers.get(e.type)?.(e)}},CustomEvent:class{constructor(type,{detail}){Object.assign(this,{type,detail});}},Event:class{},queueMicrotask:f=>f(),requestAnimationFrame:()=>1,cancelAnimationFrame(){},__boxlabBridgeState:{mesh:m,camera:{},scene:new THREE.Group(),controls:{enabled:true}},__boxlabHistory:new History(),__boxlabSelectionBridge:{mode:()=>mode,indices:()=>ids,set:(md,next)=>{assert.equal(md,mode);ids=next},pick:()=>({type:'face',index:ids[0]})}};
 const load=name=>vm.runInNewContext('{'+fs.readFileSync(new URL('../src/'+name,import.meta.url),'utf8').replace(/^import .*;\n/gm,'')+'}',context);
 load('direct-bevel.js');load('selection-hub-bevel-session.js');
 const owner=context.__boxlabDirectBevel,panel=context.__boxlabBevelViewportSession;
 const event=(x=0)=>({target:node('#viewport'),pointerType:'pen',buttons:1,pressure:.5,pointerId:1,isPrimary:true,clientX:x,clientY:0,preventDefault(){},stopImmediatePropagation(){this.stopped=true},stopPropagation(){}});
 const pointer=(type,x=0)=>{const e=event(x);winHandlers.get(type)?.(e);if(!e.stopped)node('#viewport').listeners.get(type)?.(e);return e;};
 const launch=()=>winHandlers.get('boxlab-selection-hub-tool')({detail:{mode,tool:'Bevel'}});
 const action=which=>panel.element.listeners.get('click')({...event(),target:{closest:()=>({dataset:{action:which}})}});
 return{context,owner,panel,nodes,node,events,pointer,launch,action,winHandlers,docHandlers,event,ids:()=>ids,setIds:v=>{ids=v},setMode:v=>{mode=v},setLocked:v=>{locked=v},mode:()=>mode};
}
test('Face boundary resolves through existing region/Edge Bevel routing; shared selected edges excluded',()=>{
 const m=EditableMesh.cube(),f=fixture(m);assert.equal(f.owner.faceBevelInfo([0]).ok,true);assert.equal(f.owner.faceBevelInfo([0]).ids.length,4);
 const faces=[0,2],info=f.owner.faceBevelInfo(faces);assert.equal(info.ok,true);assert.equal(info.ids.length,6);
 const shared=m.edges().findIndex(e=>e.faces.includes(0)&&e.faces.includes(2));assert.equal(info.ids.includes(shared),false);
 assert.equal(f.owner.faceBevelInfo([0,1]).ok,false);assert.equal(f.owner.faceBevelInfo([0,1,2,3,4,5]).ok,false);assert.equal(f.owner.faceBevelInfo([999]).ok,false);
});
test('Face launch and Cancel preserve geometry/selection/history and dock shared settings',()=>{
 const m=EditableMesh.cube(),before=geometry(m),f=fixture(m);f.launch();f.panel.sync();assert.equal(f.owner.faceActive(),true);assert.equal(f.panel.active(),true);assert.equal(f.panel.element.style.left,'50%');assert.equal(f.node('.shbs-head strong').textContent,'Face Bevel');assert.deepEqual(geometry(m),before);assert.equal(f.context.__boxlabHistory.undoStack.length,0);
 f.action('cancel');assert.equal(f.owner.active(),false);assert.deepEqual(Array.from(f.ids()),[0]);assert.deepEqual(geometry(m),before);assert.equal(f.events.at(-1).detail.tool,'Bevel');assert.ok(f.events.some(e=>e.type==='boxlab-selection-hub-session-complete'&&e.detail.mode==='face'));
});
test('Face Apply Exact matches Edge kernel geometry and has one Undo/Redo',()=>{
 for(const segments of [1,3]){
  const m=EditableMesh.cube(),before=geometry(m),f=fixture(m);f.node('#bevelSegments').value=String(segments);const info=f.owner.faceBevelInfo([0]),expected=m.clone();assert.ok(expected.generalBevelSelection(info.ids,.2,segments));
  f.launch();f.action('apply');assert.deepEqual(geometry(m),geometry(expected));assert.equal(f.mode(),'face');assert.equal(f.ids().length,0);assert.equal(f.owner.active(),false);assert.equal(f.panel.active(),false);assert.equal(f.context.__boxlabHistory.undoStack.length,1);
  const undone=f.context.__boxlabHistory.undo(m);assert.deepEqual(geometry(undone),before);assert.deepEqual(geometry(f.context.__boxlabHistory.redo(undone)),geometry(m));
 }
});
test('connected Face region commits its six outer edges through existing owner',()=>{
 const m=EditableMesh.cube(),f=fixture(m);f.setIds([0,2]);f.launch();f.action('apply');assert.equal(f.context.__boxlabHistory.undoStack.length,1);assert.equal(f.ids().length,0);assert.equal(f.mode(),'face');assert.equal(m.faces.length>6,true);
});
test('Face Pencil early owner keeps live mesh/history unchanged, releases preview for explicit Apply',()=>{
 const m=EditableMesh.cube(),before=geometry(m),f=fixture(m);f.launch();f.pointer('pointerdown');assert.equal(f.context.__boxlabBridgeState.controls.enabled,false);f.pointer('pointermove',40);assert.deepEqual(geometry(m),before);assert.equal(f.context.__boxlabHistory.undoStack.length,0);f.pointer('pointermove',60);f.pointer('pointerup',60);assert.equal(f.context.__boxlabHistory.undoStack.length,0);assert.equal(f.context.__boxlabBridgeState.controls.enabled,true);assert.equal(f.ids().length,1);assert.equal(f.owner.active(),true);assert.equal(f.context.__boxlabBridgeState.scene.children.length,1);f.action('apply');assert.equal(f.context.__boxlabHistory.undoStack.length,1);assert.equal(f.ids().length,0);assert.equal(f.owner.active(),false);assert.equal(f.context.__boxlabBridgeState.scene.children.length,0);
});
test('Face pointer cancel restores preview and original selection with no history',()=>{
 const m=EditableMesh.cube(),before=geometry(m),f=fixture(m);f.launch();f.pointer('pointerdown');f.pointer('pointermove',40);f.pointer('pointercancel');assert.deepEqual(geometry(m),before);assert.deepEqual(Array.from(f.ids()),[0]);assert.equal(f.context.__boxlabHistory.undoStack.length,0);assert.equal(f.context.__boxlabBridgeState.controls.enabled,true);
});
test('owner failure rolls back; read-only and changed selection/mode/mesh block Face apply',()=>{
 const m=EditableMesh.cube(),before=geometry(m),f=fixture(m);f.launch();const saved=EditableMesh.prototype.generalBevelSelection;EditableMesh.prototype.generalBevelSelection=function(){this.vertices[0].x=77;return null};assert.equal(f.owner.applyExact(20).ok,false);EditableMesh.prototype.generalBevelSelection=saved;assert.deepEqual(geometry(m),before);assert.equal(f.ids().length,1);assert.equal(f.context.__boxlabHistory.undoStack.length,0);
 f.setLocked(true);assert.equal(f.owner.faceBevelInfo([0]).ok,false);assert.equal(f.owner.applyExact(20).ok,false);
 for(const change of [g=>g.setIds([2]),g=>g.setMode('edge'),g=>{g.context.__boxlabBridgeState.mesh=EditableMesh.cube()}]){const g=fixture();g.launch();change(g);assert.equal(g.owner.applyExact(20).ok,false);g.panel.sync();assert.equal(g.owner.active(),false);assert.equal(g.context.__boxlabHistory.undoStack.length,0);}
});
test('Edge radial Apply remains the existing selected-edge exact workflow and remains ready',()=>{
 const m=EditableMesh.cube(),f=fixture(m);f.setMode('edge');f.setIds([0]);f.node('#bevelBtn').listeners.get('click')({preventDefault(){},stopImmediatePropagation(){}});f.launch();f.panel.sync();assert.equal(f.owner.faceActive(),false);assert.equal(f.node('.shbs-head strong').textContent,'Bevel');f.action('apply');assert.equal(f.context.__boxlabHistory.undoStack.length,1);assert.equal(f.ids().length,0);assert.equal(f.mode(),'edge');assert.equal(f.owner.active(),true);
});

test('Edge radial Pencil drag previews/commits once, clears used IDs and remains ready',()=>{
 const m=EditableMesh.cube(),before=geometry(m),f=fixture(m);f.setMode('edge');f.setIds([0]);f.node('#bevelBtn').listeners.get('click')({preventDefault(){},stopImmediatePropagation(){}});f.launch();f.pointer('pointerdown');f.pointer('pointermove',40);assert.notDeepEqual(geometry(m),before);f.pointer('pointerup',40);assert.equal(f.context.__boxlabHistory.undoStack.length,1);assert.equal(f.mode(),'edge');assert.equal(f.ids().length,0);assert.equal(f.owner.active(),true);
});
test('Face radial Bevel dispatch launches semantically without clicking the Edge mode button',()=>{
 const s=fs.readFileSync(new URL('../src/total-gizmo.js',import.meta.url),'utf8');
 const start=s.indexOf("  button.addEventListener('click',event=>{",s.indexOf('toolSectors.forEach(button=>')),end=s.indexOf('\n  });',start);let callback;const events=[];
 const context={button:{disabled:false,textContent:'Bevel',dataset:{toolTarget:'#bevelBtn'},closest:()=>({dataset:{ringMode:'face'}}),addEventListener:(t,f)=>{callback=f}},syncContextToolAvailability(){},currentMode:()=> 'face',document:{querySelector:()=>({disabled:false,click(){throw Error('Edge Bevel button clicked')}})},suspendedFaceTool:false,hubSuppressedKey:'',lastSelectionKey:'key',setHubState(){},root:{},gestureDebug(){},window:{dispatchEvent:e=>events.push(e)},CustomEvent:class{constructor(type,{detail}){Object.assign(this,{type,detail})}}};
 vm.runInNewContext(s.slice(start,end)+'\n  });',context);callback({preventDefault(){},stopPropagation(){}});assert.equal(events.length,1);assert.equal(events[0].detail.mode,'face');assert.equal(events[0].detail.tool,'Bevel');
});

test('708 sliders rebuild Shell-blue fill/wire on a copy; Cancel disposes unique resources',()=>{
 const m=EditableMesh.cube(),before=geometry(m),f=fixture(m);f.launch();const scene=f.context.__boxlabBridgeState.scene;
 const first=scene.children[0];assert.equal(first.userData.boxlabFaceBevelPreview,true);assert.equal(first.children[0].material.color.getHex(),0x62d8ff);assert.equal(first.children[0].material.opacity,.18);assert.equal(first.children[1].material.opacity,.72);assert.equal(first.children[1].material.wireframe,true);assert.equal(first.children[0].material.depthWrite,false);
 let geometryDisposed=0,materialsDisposed=0;first.children[0].geometry.addEventListener('dispose',()=>geometryDisposed++);for(const child of first.children)child.material.addEventListener('dispose',()=>materialsDisposed++);
 const oldPositions=Array.from(first.children[0].geometry.getAttribute('position').array);
 f.node('#bevelWidth').value='35';f.node('#bevelWidth').listeners.get('input')();assert.equal(scene.children.length,1);assert.equal(geometryDisposed,1);assert.equal(materialsDisposed,2);assert.notDeepEqual(Array.from(scene.children[0].children[0].geometry.getAttribute('position').array),oldPositions);
 f.node('#bevelSegments').value='3';f.node('#bevelSegments').listeners.get('input')();assert.equal(f.owner.previewState().segments,3);assert.deepEqual(geometry(m),before);assert.equal(f.context.__boxlabHistory.undoStack.length,0);f.action('cancel');assert.equal(scene.children.length,0);assert.deepEqual(geometry(m),before);assert.equal(f.context.__boxlabHistory.undoStack.length,0);
});
test('708 window Face owner precedes a consuming document Move owner; no duplicate canvas claim',()=>{
 const f=fixture();f.launch();let moved=0;const e=f.event();f.winHandlers.get('pointerdown')(e);if(!e.stopped){moved++;e.stopImmediatePropagation()};assert.equal(moved,0);assert.equal(e.stopped,true);assert.equal(f.owner.busy(),true);f.pointer('pointermove',40);f.pointer('pointerup',40);assert.equal(f.owner.busy(),false);assert.equal(f.owner.faceActive(),true);assert.equal(f.context.__boxlabHistory.undoStack.length,0);
});
test('708 Face touch/background passes navigation; main Move fallback yields only while Face session owns it',()=>{
 const f=fixture();f.launch();const touch={...f.event(),pointerType:'touch'};f.winHandlers.get('pointerdown')(touch);assert.equal(touch.stopped,undefined);assert.equal(f.owner.busy(),false);assert.equal(f.context.__boxlabBridgeState.controls.enabled,true);
 const s=fs.readFileSync(new URL('../src/main.js',import.meta.url),'utf8'),a=s.indexOf("canvas.addEventListener('pointerdown',event=>{if(event.pointerType==='mouse'"),b=s.indexOf("canvas.addEventListener('pointermove'",a);let cb,picks=0;
 const c={canvas:{addEventListener:(type,fn)=>{cb=fn}},backgroundTap:null,document:{querySelector:()=>null},__boxlabDirectBevel:f.owner,directTool:null,pickLoopSlide:()=>{picks++;return null},pick:()=>null};vm.runInNewContext(s.slice(a,b),c);cb(touch);assert.equal(picks,0);assert.equal(c.backgroundTap,null);f.action('cancel');cb(touch);assert.equal(picks,1);assert.equal(c.backgroundTap.pointerId,1);
});
test('708 same-object external geometry edit invalidates preview and prevents overwriting it',()=>{
 const m=EditableMesh.cube(),f=fixture(m);f.launch();m.vertices[0].x+=.1;const changed=geometry(m);assert.equal(f.owner.previewFaces().ok,false);assert.equal(f.context.__boxlabBridgeState.scene.children.length,0);assert.equal(f.owner.applyExact(20).ok,false);assert.deepEqual(geometry(m),changed);assert.equal(f.context.__boxlabHistory.undoStack.length,0);assert.match(f.node('.shbs-note').textContent,/geometry changed/);
});


test('persistent Edge Bevel repeats exact operations on current selection with one history step each',()=>{
 const f=fixture();f.setMode('edge');f.setIds([0]);f.node('#bevelBtn').listeners.get('click')({preventDefault(){},stopImmediatePropagation(){}});f.launch();f.action('apply');
 const m=f.context.__boxlabBridgeState.mesh,valid=m.edges().findIndex((e,i)=>!!m.generalBevelSelectionInfo([i]));assert.ok(valid>=0);f.setIds([valid]);f.panel.sync();f.action('apply');assert.equal(f.context.__boxlabHistory.undoStack.length,2);assert.equal(f.owner.active(),true);assert.equal(f.panel.edgeActive(),true);assert.equal(f.ids().length,0);
 f.winHandlers.get('boxlab-viewport-background-tap')({});assert.equal(f.owner.active(),false);assert.equal(f.panel.active(),false);assert.equal(f.events.at(-1).detail.tool,'Bevel');assert.equal(f.context.__boxlabHistory.undoStack.length,2);
});
test('Edge stationary tap selects for EXACT; cancelled drag rolls back and navigation controls restore',()=>{
 const f=fixture(),m=f.context.__boxlabBridgeState.mesh,before=geometry(m);f.setMode('edge');f.setIds([0]);f.node('#bevelBtn').listeners.get('click')({preventDefault(){},stopImmediatePropagation(){}});f.launch();f.pointer('pointerdown');f.pointer('pointerup');assert.deepEqual(Array.from(f.ids()),[0]);assert.equal(f.context.__boxlabHistory.undoStack.length,0);assert.equal(f.owner.active(),true);
 f.pointer('pointerdown');f.pointer('pointermove',40);assert.equal(f.context.__boxlabBridgeState.controls.enabled,false);f.pointer('pointercancel');assert.deepEqual(geometry(m),before);assert.equal(f.context.__boxlabBridgeState.controls.enabled,true);assert.equal(f.owner.active(),true);assert.deepEqual(Array.from(f.ids()),[0]);
});
test('closing persistent Edge Bevel during preview discards unfinished changes and releases navigation',()=>{
 const f=fixture(),m=f.context.__boxlabBridgeState.mesh,before=geometry(m);f.setMode('edge');f.setIds([0]);f.node('#bevelBtn').listeners.get('click')({preventDefault(){},stopImmediatePropagation(){}});f.launch();f.pointer('pointerdown');f.pointer('pointermove',30);f.owner.disarm();assert.deepEqual(geometry(m),before);assert.equal(f.owner.busy(),false);assert.equal(f.context.__boxlabBridgeState.controls.enabled,true);assert.equal(f.context.__boxlabHistory.undoStack.length,0);
});
