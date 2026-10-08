import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import * as THREE from 'three';
import {EditableMesh} from '../src/mesh.js';
import {scaffoldLoopCandidates} from '../src/scaffold-loop-candidates.js';
import {vertexRuntime} from './helpers/vertex-extrude-runtime.mjs';
function wireCube(){const cube=EditableMesh.cube(2),m=new EditableMesh(cube.vertices.map(v=>v.toArray()),[]);for(const e of cube.edges())m.addLooseEdge(e.a,e.b);return m;}
function degreeCycle(m,ids){const degree=new Map();for(const i of ids){const e=m.edges()[i];for(const v of [e.a,e.b])degree.set(v,(degree.get(v)||0)+1);}assert.equal(degree.size,ids.length);assert.ok([...degree.values()].every(n=>n===2));}
function fixture(m=wireCube(),initial=[]){
 const f=vertexRuntime(m,initial),c=f.context,timers=new Map();let timer=0,orbit=0;f.setMode('edge');
 c.setTimeout=(fn,ms)=>{const id=++timer;timers.set(id,{fn,ms});return id;};c.clearTimeout=id=>timers.delete(id);
 c.MouseEvent=class extends c.Event{preventDefault(){} stopImmediatePropagation(){this.stopped=true;}};Object.assign(c,{scaffoldLoopCandidates,performance:{now:()=>1000},canvas:f.canvas,controls:f.state.controls});
 for(const id of ['selectLoopBtn','selectBoundaryBtn','selectRingBtn','growSelectionBtn','shrinkSelectionBtn','fillFaceBtn','multiSelectToggle','loopSlide','loopSlideOut']){const el=c.document.createElement('button');el.id=id;}
 f.fields.get('#multiSelectToggle').checked=false;
 const load=name=>vm.runInContext("'use strict';{"+fs.readFileSync(new URL('../src/'+name,import.meta.url),'utf8').replace(/^import .*;\n/gm,'')+'}',c);
 const main=fs.readFileSync(new URL('../src/main.js',import.meta.url),'utf8');
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
test('wire cube proposes each of the two closed face outlines at every loose-edge seed',()=>{const m=wireCube(),before=m.clone();for(let i=0;i<m.edges().length;i++){const cycles=scaffoldLoopCandidates(m,i);assert.equal(cycles.length,2);for(const cycle of cycles){assert.equal(cycle.length,4);assert.ok(cycle.includes(i));degreeCycle(m,cycle);}}assert.deepEqual(m.vertices,before.vertices);assert.deepEqual(Array.from(m.faces),Array.from(before.faces));assert.deepEqual(m.looseEdges,before.looseEdges);});
test('scaffold candidates ignore existing faces and surfaced quad loops',()=>{const m=wireCube(),cube=EditableMesh.cube(2);m.faces.push([...cube.faces[0]]);const loose=m.edges().findIndex(e=>e.loose&&[e.a,e.b].some(v=>cube.faces[0].includes(v)));assert.ok(scaffoldLoopCandidates(m,loose).length);for(const e of m.edges().map((e,i)=>({e,i})).filter(x=>!x.e.loose))assert.deepEqual(scaffoldLoopCandidates(m,e.i),[]);assert.deepEqual(scaffoldLoopCandidates(cube,0),[]);});
test('planar branched grid offers adjacent cells rather than the whole outer perimeter',()=>{const m=new EditableMesh([[0,0,0],[1,0,0],[2,0,0],[0,1,0],[1,1,0],[2,1,0],[0,2,0],[1,2,0],[2,2,0]],[]);for(const [a,b] of [[0,1],[1,2],[3,4],[4,5],[6,7],[7,8],[0,3],[3,6],[1,4],[4,7],[2,5],[5,8]])m.addLooseEdge(a,b);const i=m.edges().findIndex(e=>m.edgeKey(e.a,e.b)===m.edgeKey(1,4));const cycles=scaffoldLoopCandidates(m,i);assert.equal(cycles.length,2);assert.ok(cycles.every(c=>c.length===4));});
test('subdivided rail and dangling branches still give one closed planar outline',()=>{const m=new EditableMesh([[0,0,0],[1,0,0],[2,0,0],[2,1,0],[0,1,0],[-1,0,0]],[]);for(const [a,b] of [[0,1],[1,2],[2,3],[3,4],[4,0],[0,5]])m.addLooseEdge(a,b);const cycles=scaffoldLoopCandidates(m,0);assert.equal(cycles.length,1);assert.equal(cycles[0].length,5);});
test('open, warped, degenerate and crossing scaffolds refuse a closed outline',()=>{for(const points of [[[0,0,0],[1,0,0],[1,1,.2],[0,1,0]],[[0,0,0],[1,1,0],[0,1,0],[1,0,0]],[[0,0,0],[0,0,0],[1,0,0],[0,1,0]]]){const m=new EditableMesh(points,[]);for(let i=0;i<4;i++)m.addLooseEdge(i,(i+1)%4);assert.deepEqual(scaffoldLoopCandidates(m,0),[]);}const m=new EditableMesh([[0,0,0],[1,0,0],[1,1,0],[0,1,0]],[]);for(const [a,b] of [[0,1],[1,2],[2,3]])m.addLooseEdge(a,b);assert.deepEqual(scaffoldLoopCandidates(m,0),[]);assert.deepEqual(scaffoldLoopCandidates(m,-1),[]);});
test('scaffold outline detection follows geometry under rotation translation and scale',()=>{for(const scale of [.001,1,1000]){const m=wireCube();for(const p of m.vertices)p.applyAxisAngle(new THREE.Vector3(1,2,3).normalize(),.72).multiplyScalar(scale).add(new THREE.Vector3(4,5,6));assert.equal(scaffoldLoopCandidates(m,0).length,2);}});
test('actual hold timer and sideways browser cycle floating outlines then Close Face commits one undo step',()=>{const f=fixture(),p=f.hold();assert.equal(f.candidates()[0].kind,'Scaffold Boundary');assert.equal(f.ids().length,4);const first=[...f.ids()];f.pointer('pointermove',{clientX:p.x+32,clientY:p.y});assert.equal(f.candidates()[1].kind,'Scaffold Boundary');assert.equal(f.ids().length,4);assert.notDeepEqual(f.ids(),first);assert.equal(f.orbit(),0);f.pointer('pointerup',{clientX:p.x+32,clientY:p.y});degreeCycle(f.state.mesh,f.ids());f.click('#fillFaceBtn');f.run(0);assert.equal(f.state.mesh.faces.length,1);assert.equal(f.history.undoStack.length,1);const before=f.history.undo(f.state.mesh);assert.equal(before.faces.length,0);assert.equal(before.looseEdges.size,12);const after=f.history.redo(before);assert.equal(after.faces.length,1);});
test('actual vertical Grow/Shrink owner still works on floating scaffold without Orbit',()=>{const f=fixture(),p=f.hold();f.pointer('pointermove',{clientX:p.x,clientY:p.y-30});assert.equal(f.ids().length,5);assert.equal(f.orbit(),0);f.pointer('pointermove',{clientX:p.x,clientY:p.y});assert.deepEqual(f.ids(),[0]);f.pointer('pointerup',{clientX:p.x,clientY:p.y});});
test('hold cancellation restores previous selection and makes no history',()=>{const f=fixture(wireCube(),[6]),p=f.hold();f.pointer('pointercancel',{clientX:p.x,clientY:p.y});assert.deepEqual(f.ids(),[6]);assert.equal(f.history.undoStack.length,0);});

test('surfaced mesh browser candidates keep exact original ordering and selections',()=>{const f=fixture(EditableMesh.cube(2));for(let i=0;i<f.state.mesh.edges().length;i++){const current=f.collect(i).map(c=>({kind:c.kind,indices:Array.from(c.indices)}));f.context.scaffoldLoopCandidates=()=>[];const baseline=f.collect(i).map(c=>({kind:c.kind,indices:Array.from(c.indices)}));f.context.scaffoldLoopCandidates=scaffoldLoopCandidates;assert.deepEqual(current,baseline);}});
