import {openQuadStrokeCorners,quadStrokeCorners,straightQuadStroke,quadStrokeCrossing,sampleStrokeSpan} from '../../src/retopo-stroke.js';
import {buildRetopoQuad} from '../../src/retopo-quad.js';
import fs from 'node:fs';import vm from 'node:vm';
import * as THREE from 'three';import {EditableMesh} from '../../src/mesh.js';import {installLooseTopology} from '../../src/loose-topology.js';import {History} from '../../src/history.js';import {createRetopoSurface,nearestRetopoVertex} from '../../src/retopo-surface.js';
installLooseTopology(EditableMesh);
export function fixture(){
 const fields=new Map();let mode='face';
 function element(id=''){const el={id,children:[],hidden:false,style:{},dataset:{},listeners:new Map(),attributes:new Map(),classList:{add(){},remove(){}},setAttribute(k,v){this.attributes.set(k,String(v));},appendChild(e){this.children.push(e);},querySelector(s){return field(s);},addEventListener(t,f){if(!this.listeners.has(t))this.listeners.set(t,[]);this.listeners.get(t).push(f);},dispatchEvent(e){for(const f of this.listeners.get(e.type)||[])f(e);},click(){this.dispatchEvent({type:'click'});},getBoundingClientRect(){return{left:0,top:0,width:800,height:800};},setPointerCapture(){},releasePointerCapture(){}};return el;}
 function field(s){if(!fields.has(s))fields.set(s,element(s));return fields.get(s);}
 const window=element(),document={querySelector:field,createElement:element,head:element(),addEventListener:window.addEventListener.bind(window),dispatchEvent:window.dispatchEvent.bind(window)};
 for(const m of ['vertex','edge','face','object'])field(`#selectionModes [data-mode="${m}"]`).click=()=>{mode=m;};
 const camera=new THREE.PerspectiveCamera(45,1,.01,100);camera.position.set(0,0,5);camera.lookAt(0,0,0);camera.updateMatrixWorld();
 const state={mesh:EditableMesh.cube(),camera,scene:new THREE.Scene(),controls:{enabled:true}},h=new History(),objects=[{id:1,name:'Source',visible:true,mesh:state.mesh.clone()}];let activeId=1;
 function restoreMesh(src){state.mesh=src.clone();}
 const manager={objects,get activeId(){return activeId;},saveActive(){objects.find(o=>o.id===activeId).mesh=state.mesh.clone();},addMesh(mesh,name){this.saveActive();const o={id:2,name,mesh:mesh.clone(),visible:true};objects.push(o);activeId=2;restoreMesh(mesh);h.clear();const b=field('#selectionModes [data-mode="vertex"]');b.dataset.mode='vertex';window.dispatchEvent({type:'click',isTrusted:false,target:{closest:s=>s.includes('selectionModes')||s==='button'?b:null}});return o;}};
 const capture=()=>{manager.saveActive();return {activeId,objects:objects.map(o=>({...o,mesh:o.mesh.clone()}))};},meta=new WeakMap();
 const objectHistory={capture,checkpointSnapshot(s,m=state.mesh){h.push(m);meta.set(h.undoStack.at(-1),s);}};
 const baseUndo=h.undo.bind(h),baseRedo=h.redo.bind(h);
 function history(which){manager.saveActive();const stack=which==='undo'?h.undoStack:h.redoStack,s=meta.get(stack.at(-1)),before=s?capture():null;const result=(which==='undo'?baseUndo:baseRedo)(state.mesh);if(s&&result){objects.splice(0,objects.length,...s.objects.map(o=>({...o,mesh:o.mesh.clone()})));activeId=s.activeId;meta.set((which==='undo'?h.redoStack:h.undoStack).at(-1),before);}if(result)restoreMesh(result);manager.saveActive();}
 field('#undoBtn').click=()=>history('undo');field('#redoBtn').click=()=>history('redo');
 const context={openQuadStrokeCorners,quadStrokeCorners,straightQuadStroke,quadStrokeCrossing,sampleStrokeSpan,buildRetopoQuad,THREE,EditableMesh,createRetopoSurface,nearestRetopoVertex,placeToolSessionPanel(){},document,window,Event:class{},CustomEvent:class{},queueMicrotask:fn=>fn(),__boxlabBridgeState:state,__boxlabObjectManager:manager,__boxlabHistory:h,__boxlabObjectHistory:objectHistory,__boxlabSelectionBridge:{mode:()=>mode,clear(){}}};
 vm.runInNewContext(fs.readFileSync(new URL('../../src/retopo-workspace.js',import.meta.url),'utf8').replace(/^import .*;\n/gm,''),context);
 function pointer(type,x=400,y=400,extra={}){const e={type,target:field('#viewport'),pointerType:'pen',pointerId:9,button:0,pressure:type==='pointerup'?0:.5,clientX:x,clientY:y,preventDefault(){this.prevented=true;},stopImmediatePropagation(){},...extra};window.dispatchEvent(e);return e;}
 return{api:context.__boxlabRetopo,state,objects,manager,h,pointer,field,history};
}
