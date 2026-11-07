import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import * as THREE from 'three';
import {EditableMesh} from '../src/mesh.js';
import {createFaceBevelPreview,disposeFaceBevelPreview} from '../src/bevel-face-preview.js';
import {History} from '../src/history.js';
import {radialRuntime,sector,target} from './helpers/radial-runtime.mjs';
for(const [file,name] of [['loose-topology','installLooseTopology'],['bridge-topology','installBridgeTopology'],['bridge-unequal','installUnequalBridge'],['bridge-unequal-quality','installUnequalBridgeQuality'],['bridge-unequal-alignment','installUnequalBridgeAlignment'],['bridge-unequal-global','installUnequalBridgeGlobal'],['bridge-all-quad','installSubdFriendlyBridge'],['bridge-transactional','installTransactionalBridge'],['bridge-open-chain','installOpenChainBridge'],['bridge-open-chain-all-quad','installOpenChainAllQuadBridge']]){
 (await import('../src/'+file+'.js'))[name](EditableMesh);
}
function fixture(){
 const v=[],f=[];
 for(const line of fs.readFileSync(new URL('./fixtures/edge-bridge-976.obj',import.meta.url),'utf8').split('\n')){
  const s=line.trim().split(/\s+/);if(s[0]==='v')v.push(new THREE.Vector3(...s.slice(1).map(Number)));if(s[0]==='f')f.push(s.slice(1).map(x=>Number(x)-1));
 }
 return new EditableMesh(v,f);
}
function ids(mesh,pairs){return pairs.map(([a,b])=>mesh.edges().findIndex(e=>mesh.edgeKey(e.a,e.b)===mesh.edgeKey(a-1,b-1)));}
function runtime(mesh,initial){
 const handlers=new Map(),nodes=new Map(),frames=[],timers=[];let selected=[...initial],mode='edge';
 function node(){return{hidden:false,disabled:false,style:{},textContent:'',addEventListener(t,f){this[t]=f;},append(){},querySelector(s){if(!nodes.has(s))nodes.set(s,node());return nodes.get(s);}};}
 const wrap=node(),status=node(),button=node();
 const selection={mode:()=>mode,indices:()=>selected,set:(m,x)=>{mode=m;selected=[...x];}};
 const c={createFaceBevelPreview,disposeFaceBevelPreview,__boxlabBridgeState:{mesh,scene:new THREE.Scene()},__boxlabSelectionBridge:selection,__boxlabHistory:new History(),__boxlabTotalGizmo:{setHubState(){}},placeToolSessionPanel(){},requestAnimationFrame:f=>{frames.push(f);return frames.length;},queueMicrotask:f=>f(),setTimeout:f=>{timers.push(f);return timers.length;},CustomEvent:class{constructor(type,options){this.type=type;this.detail=options.detail;}},
 document:{createElement:node,head:{append(){},appendChild(){}},querySelector:s=>s==='#viewportWrap'?wrap:s==='#selectionStatus'?status:s==='#bridgeEdgesBtn'?button:s==='#selectionModes button[data-mode="face"]'?{click(){mode='face';}}:null,addEventListener(){}},window:{addEventListener:(t,f)=>handlers.set(t,f),dispatchEvent:e=>handlers.get(e.type)?.(e)}};
 vm.createContext(c);
 for(const file of ['bridge-ui.js','selection-hub-bridge-session.js'])vm.runInContext('(function(){'+fs.readFileSync(new URL('../src/'+file,import.meta.url),'utf8').replace(/^import .*\n/gm,'')+'\n})();',c);
 return{c,selection,status,session:c.__boxlabBridgeViewportSession,apply:nodes.get('.shbs-apply'),cancel:nodes.get('.shbs-cancel'),flush(){for(const f of timers.splice(0))f();for(const f of frames.splice(0))f();},select:x=>selected=[...x]};
}
const event={preventDefault(){},stopPropagation(){}};
test('976 supplied pair opens actual radial session, applies one quad via original UI/history, UndoRedo',()=>{
 const mesh=fixture(),chosen=ids(mesh,[[3,10],[23,24]]),r=runtime(mesh,chosen),before=mesh.clone();
 assert.ok(mesh.bridgeEdgeSelectionInfo(chosen)?.openChain);
 assert.equal(r.session.canStart(chosen),true);
 const s=sector('Bridge','edge'),radial=radialRuntime({mode:'edge',sectors:[s],targets:{'#tool':target({disabled:true})},globals:{__boxlabSelectionBridge:r.selection,__boxlabBridgeViewportSession:r.session}});
 radial.availability();assert.equal(s.disabled,false);
 assert.equal(r.session.openFromHub({ids:chosen}),true);assert.equal(r.apply.disabled,false);assert.equal(mesh.faces.length,14);assert.equal(r.c.__boxlabHistory.undoStack.length,0);
 r.apply.click(event);r.flush();assert.equal(mesh.faces.length,15);assert.deepEqual(mesh.faces[14],[2,22,23,9]);assert.equal(r.c.__boxlabHistory.undoStack.length,1);assert.equal(r.session.active(),false);assert.deepEqual(Array.from(r.selection.indices()),[14]);
 assert.equal(globalThis.__boxlabTopology.validateTopology(mesh,{allowBoundary:true}).ok,true);
 const undone=r.c.__boxlabHistory.undo(mesh);assert.deepEqual(undone.faces,before.faces);const redone=r.c.__boxlabHistory.redo(undone);assert.deepEqual(redone.faces,mesh.faces);
});
test('976 Cancel preserves ready edge pair and leaves geometry/history untouched',()=>{
 const mesh=fixture(),chosen=ids(mesh,[[3,10],[23,24]]),r=runtime(mesh,chosen),before=mesh.clone();
 assert.equal(r.session.openFromHub({ids:chosen}),true);r.cancel.click(event);r.flush();assert.equal(r.session.active(),false);assert.deepEqual(Array.from(r.selection.indices()),chosen);assert.deepEqual(mesh.faces,before.faces);assert.equal(r.c.__boxlabHistory.undoStack.length,0);
});
test('976 single-loop guided selection remains supported and adding second loop enables Apply',()=>{
 const mesh=EditableMesh.cube(2);mesh.faces=[mesh.faces[0],mesh.faces[1]];
 const loops=mesh.faces.map(f=>f.map((v,i)=>ids(mesh,[[v+1,f[(i+1)%f.length]+1]])[0])),r=runtime(mesh,loops[0]);
 assert.equal(r.session.canStart(loops[0]),true);assert.equal(r.session.openFromHub({ids:loops[0]}),true);assert.equal(r.apply.disabled,true);
 r.select(loops.flat());r.flush();assert.equal(r.apply.disabled,false);r.apply.click(event);r.flush();assert.equal(mesh.faces.length,6);assert.equal(r.c.__boxlabHistory.undoStack.length,1);
});
test('976 interior edge, missing edge and single open edge remain refused without mutation',()=>{
 for(const pairs of [[[7,8],[23,24]],[[3,10]],[[3,10],[999,1000]]]){
  const mesh=fixture(),chosen=ids(mesh,pairs),r=runtime(mesh,chosen),before=mesh.clone();
  assert.equal(r.session.canStart(chosen),false);assert.equal(r.session.openFromHub({ids:chosen}),false);assert.equal(r.session.active(),false);assert.deepEqual(mesh.faces,before.faces);assert.equal(r.c.__boxlabHistory.undoStack.length,0);
 }
});

function ghost(r){return r.c.__boxlabBridgeState.scene.children.find(g=>g.name==='BoxLab Edge Bridge Preview');}
test('978 preview is visible before Apply, original topology/history/selection stay untouched; resources dispose once',()=>{
 const mesh=fixture(),chosen=ids(mesh,[[3,10],[23,24]]),r=runtime(mesh,chosen),before=mesh.clone();
 r.session.openFromHub({ids:chosen});const g=ghost(r);assert.ok(g);assert.equal(g.children.length,2);assert.equal(g.children[0].geometry.getAttribute('position').count,6);assert.equal(g.children[0].material.color.getHex(),0x62d8ff);assert.equal(g.children[0].material.depthWrite,false);
 assert.equal(r.c.__boxlabBridgeState.mesh,mesh,'private clone never steals active mesh');assert.deepEqual(mesh.faces,before.faces);assert.deepEqual(mesh.vertices,before.vertices);assert.deepEqual(Array.from(r.selection.indices()),chosen);assert.equal(r.c.__boxlabHistory.undoStack.length,0);
 let geometries=0,materials=0;g.children[0].geometry.addEventListener('dispose',()=>geometries++);for(const child of g.children)child.material.addEventListener('dispose',()=>materials++);
 r.flush();assert.equal(ghost(r),g,'unchanged selection reuses preview');r.apply.click(event);r.flush();assert.equal(ghost(r),undefined);assert.equal(geometries,1);assert.equal(materials,2);assert.equal(mesh.faces.length,15);assert.equal(r.c.__boxlabHistory.undoStack.length,1);
 r.session.close();assert.equal(geometries,1);assert.equal(materials,2);
});
test('978 guided second-loop selection creates preview; removing boundary clears it and Apply; Cancel never commits',()=>{
 const mesh=EditableMesh.cube(2);mesh.faces=[mesh.faces[0],mesh.faces[1]];
 const loops=mesh.faces.map(f=>f.map((v,i)=>ids(mesh,[[v+1,f[(i+1)%f.length]+1]])[0])),r=runtime(mesh,loops[0]);
 r.session.openFromHub({ids:loops[0]});assert.equal(ghost(r),undefined);r.select(loops.flat());r.flush();assert.ok(ghost(r));assert.equal(mesh.faces.length,2);
 r.select(loops[0]);r.c.window.dispatchEvent({type:'boxlab-bridge-state'});r.flush();assert.equal(ghost(r),undefined);assert.equal(r.apply.disabled,true);
 r.select(loops.flat());r.c.window.dispatchEvent({type:'boxlab-bridge-state'});r.flush();assert.ok(ghost(r));r.cancel.click(event);r.flush();assert.equal(ghost(r),undefined);assert.equal(mesh.faces.length,2);assert.equal(r.c.__boxlabHistory.undoStack.length,0);assert.deepEqual(Array.from(r.selection.indices()),loops[0]);
});
test('978 external geometry change, object change, mode change and pagehide discard ghost without rolling back other work',()=>{
 for(const change of ['geometry','object','mode','pagehide','tool']){
  const mesh=fixture(),chosen=ids(mesh,[[3,10],[23,24]]),r=runtime(mesh,chosen);r.session.openFromHub({ids:chosen});assert.ok(ghost(r));
  if(change==='geometry')mesh.vertices[0].x+=.2;
  if(change==='object')r.c.__boxlabObjectManager={activeId:2};
  if(change==='mode')r.selection.set('face',[0]);
  r.c.window.dispatchEvent({type:change==='pagehide'?'pagehide':change==='tool'?'boxlab-selection-hub-tool':'boxlab-bridge-state',detail:{mode:'edge',tool:'Slide'}});r.flush();
  assert.equal(ghost(r),undefined);assert.equal(r.session.active(),false);assert.equal(mesh.faces.length,14);assert.equal(r.c.__boxlabHistory.undoStack.length,0);if(change==='geometry')assert.equal(mesh.vertices[0].x,-.3);if(change==='mode')assert.equal(r.selection.mode(),'face');
 }
});
test('978 missing scene cannot enable Apply without a visible preview; no source or history mutation',()=>{
 const mesh=fixture(),chosen=ids(mesh,[[3,10],[23,24]]),r=runtime(mesh,chosen);r.c.__boxlabBridgeState.scene=null;
 r.session.openFromHub({ids:chosen});assert.equal(r.apply.disabled,true);r.apply.click(event);assert.equal(mesh.faces.length,14);assert.equal(r.c.__boxlabHistory.undoStack.length,0);assert.equal(r.c.__boxlabBridgeState.mesh,mesh);r.session.close();
});
