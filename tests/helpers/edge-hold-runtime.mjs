import fs from 'node:fs';
import vm from 'node:vm';
import * as THREE from 'three';
import {EditableMesh} from '../../src/mesh.js';
import {scaffoldLoopCandidates} from '../../src/scaffold-loop-candidates.js';
import {vertexRuntime} from './vertex-extrude-runtime.mjs';

// Shared .761 fixture: actual main hold functions/listeners and selectors; real raycasts.
// Canvas down is a controlled seed adapter, not the full main application.
export function wireCube(){const cube=EditableMesh.cube(2),m=new EditableMesh(cube.vertices.map(v=>v.toArray()),[]);for(const e of cube.edges())m.addLooseEdge(e.a,e.b);return m;}
export function edgeHoldRuntime(m=wireCube(),initial=[]){
 const f=vertexRuntime(m,initial),c=f.context,timers=new Map();let timer=0,orbit=0;f.setMode('edge');
 c.setTimeout=(fn,ms)=>{const id=++timer;timers.set(id,{fn,ms});return id;};c.clearTimeout=id=>timers.delete(id);
 c.MouseEvent=class extends c.Event{preventDefault(){} stopImmediatePropagation(){this.stopped=true;}};Object.assign(c,{scaffoldLoopCandidates,performance:{now:()=>1000},canvas:f.canvas,controls:f.state.controls});
 for(const id of ['selectLoopBtn','selectBoundaryBtn','selectRingBtn','growSelectionBtn','shrinkSelectionBtn','fillFaceBtn','multiSelectToggle','loopSlide','loopSlideOut']){const el=c.document.createElement('button');el.id=id;}
 f.fields.get('#multiSelectToggle').checked=false;
 const load=name=>vm.runInContext("'use strict';{"+fs.readFileSync(new URL('../../src/'+name,import.meta.url),'utf8').replace(/^import .*;\n/gm,'')+'}',c);
 const main=fs.readFileSync(new URL('../../src/main.js',import.meta.url),'utf8');
 vm.runInContext(`let mesh=__boxlabBridgeState.mesh,selection=null,selectionMode='edge',directTool=null,edgeHold=null,edgeHoldCycle=null,faceHold=null,vertexHold=null,drag=null,componentTapIntent=null;const EDGE_HOLD_MS=420,EDGE_HOLD_MOVE=7,EDGE_SCRUB_STEP=32,SELECTION_SCRUB_LOCK=18,SELECTION_VERTICAL_STEP=30;`,c);
 c.renderMesh=()=>{f.render();};
 vm.runInContext(main.slice(main.indexOf('const cap='),main.indexOf('function clearSelection()')),c);
 c.__boxlabSelectionBridge.mode=()=>vm.runInContext('selectionMode',c);
 c.__boxlabSelectionBridge.indices=()=>Array.from(vm.runInContext('selectionIndices()',c));
 c.__boxlabSelectionBridge.set=(mode,ids)=>{c.nextMode=mode;c.nextIds=ids;vm.runInContext('selectionMode=nextMode;selection=makeSelection(nextMode,nextIds);',c);};
 c.__boxlabSelectionBridge.set('edge',initial);
 const ray=new THREE.Raycaster();ray.params.Line.threshold=.09;
 c.__boxlabSelectionBridge.pick=(mode,e)=>{if(mode!=='edge')return null;ray.setFromCamera(new THREE.Vector2(e.clientX/500-1,1-e.clientY/300),f.state.camera);const objects=m.edges().map((edge,index)=>{const o=new THREE.Line(new THREE.BufferGeometry().setFromPoints([m.vertices[edge.a],m.vertices[edge.b]]),new THREE.LineBasicMaterial());o.userData.index=index;o.updateMatrixWorld();return o;});const hit=ray.intersectObjects(objects,false)[0];return hit?{type:'edge',index:hit.object.userData.index}:null;};c.__boxlabSelectionBridge.pickObject=()=>null;
 f.load('pencil-orbit-gate.js');c.__boxlabPencilOrbitGate.beginOrbitRegistration();f.canvas.addEventListener('pointerdown',function onPointerDown(){orbit++;});f.canvas.addEventListener('pointermove',function onPointerMove(){});f.canvas.addEventListener('pointerup',function onPointerUp(){});c.__boxlabPencilOrbitGate.endOrbitRegistration();
 load('directed-loop.js');load('strict-select-loop.js');load('boundary-tools.js');load('advanced-selection.js');load('fill-boundary-ui.js');
 // Existing main hold timer, browser movement and window completion functions.
 const a=main.indexOf("canvas.addEventListener('pointermove',event=>{\n  if(!edgeHold"),b=main.indexOf('// Existing background owner',a);vm.runInContext(main.slice(a,b),c);
 f.canvas.addEventListener('pointerdown',e=>{const hit=c.__boxlabSelectionBridge.pick('edge',e);if(!hit)return;c.event=e;c.seed=hit.index;vm.runInContext('armEdgeHold(event,seed);selection=makeSelection("edge",[seed]);',c);},true);
 const run=ms=>{for(const [id,t] of [...timers])if(t.ms<=ms){timers.delete(id);t.fn();}};
 const at=seed=>{const e=m.edges()[seed];return f.screen(m.vertices[e.a].clone().lerp(m.vertices[e.b],.5));};
 return {...f,ids:()=>c.__boxlabSelectionBridge.indices(),run,orbit:()=>orbit,at,hold(seed=0){const p=at(seed);f.pointer('pointerdown',{clientX:p.x,clientY:p.y});run(420);return p;},collect(seed){c.seed=seed;return vm.runInContext('collectEdgeHoldCandidates(seed)',c);},candidates:()=>vm.runInContext('edgeHold.candidates',c)};
}
