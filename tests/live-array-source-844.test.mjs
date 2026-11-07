import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import * as THREE from 'three';
import {EditableMesh} from '../src/mesh.js';
import {createArrayRecipe,evaluateArray,reopenArray} from '../src/live-array-core.js';
import {createArraySourceEditor} from '../src/live-array-source-core.js';
import {transformEditableMesh,meshesNear} from '../src/instance-core.js';
import {encodeBoxlabScene,decodeBoxlabScene} from '../src/boxlab-project-codec.js';
import {editableBooleanRuntime} from './helpers/editable-boolean-runtime.mjs';
function fixture(){
 const r=editableBooleanRuntime(),{manager,c,h}=r;manager.activate(3);
 const object=manager.objects.find(o=>o.id===3),recipe=createArrayRecipe(EditableMesh.cube(1),5,[8,1,-3],{rotation:[20,45,360],scale:[2,.7,3]});
 object.arrayRecipe=recipe;manager.replaceActiveMesh(transformEditableMesh(evaluateArray(recipe),new THREE.Matrix4().set(1.3,.2,0,3,0,.8,.1,-2,.1,0,2,1,0,0,0,1)));
 const original=object.mesh.clone(),opened=reopenArray(object),before=r.snapshot(),undo=[...h.undoStack],redo=[...h.redoStack];let busy=false;
 const controller=createArraySourceEditor({manager:()=>manager,objectHistory:()=>c.__boxlabObjectHistory,history:()=>h,busy:()=>busy});
 return {...r,controller,recipe,opened,original,before,undo,redo,busy(value){busy=value;}};
}
test('844 source isolation retains one object, placed original and private recipe; topology Apply regenerates all items and persists',()=>{
 const r=fixture(),{controller,manager,h,opened}=r,n=manager.objects.length;
 assert.equal(controller.open(3).ok,true);r.c.currentMode=()=> 'face';
 assert.equal(manager.objects.length,n);assert.equal(manager.objects.find(o=>o.id===3).arrayRecipe,undefined);
 assert(meshesNear(r.live,transformEditableMesh(opened.source,new THREE.Matrix4().fromArray(opened.placement))));
 assert.equal(h.undoStack.length,0);assert.equal(h.redoStack.length,0);
 h.push(r.live);r.live.extrudeFace(0,.2);manager.saveActive();
 const editedLocal=transformEditableMesh(r.live,new THREE.Matrix4().fromArray(opened.placement).invert());
 const expected=evaluateArray(createArrayRecipe(editedLocal,opened.count,opened.endpoint.toArray(),opened));
 assert.equal(controller.apply().ok,true);assert.equal(controller.active(),false);assert.equal(manager.objects.length,n);
 const applied=manager.objects.find(o=>o.id===3);assert(meshesNear(applied.mesh,expected));assert.equal(applied.arrayRecipe.count,5);assert.deepEqual(applied.arrayRecipe.rotation,opened.rotation);assert.deepEqual(applied.arrayRecipe.scale,opened.scale);
 assert.equal(h.undoStack.length,r.undo.length+1);const saved=encodeBoxlabScene(r.c.__boxlabObjectHistory.capture()),loaded=decodeBoxlabScene(saved,(...args)=>new EditableMesh(...args));
 const restored=loaded.objects.find(o=>o.id===3);assert(meshesNear(restored.mesh,expected));assert(meshesNear(evaluateArray(createArrayRecipe(reopenArray(restored).source,5,opened.endpoint.toArray(),reopenArray(restored))),expected));
 manager.replaceActiveMesh(h.undo(r.live));assert(meshesNear(manager.objects.find(o=>o.id===3).mesh,r.original));assert.deepEqual(JSON.parse(JSON.stringify(manager.objects.find(o=>o.id===3).arrayRecipe)),JSON.parse(JSON.stringify(r.recipe)));
 manager.replaceActiveMesh(h.redo(r.live));assert(meshesNear(manager.objects.find(o=>o.id===3).mesh,expected));assert.equal(manager.objects.find(o=>o.id===3).arrayRecipe.source.faces.length,editedLocal.faces.length);
});
test('844 Cancel restores original scene, visibility, recipe and exact pre-session history tokens after component Undo/Redo',()=>{
 const r=fixture(),{controller,h,manager}=r;
 // Preserve a real redo branch as well as undo before entering the source transaction.
 h.push(r.live);const temp=r.live.clone();temp.vertices[0].x+=.1;manager.replaceActiveMesh(h.undo(temp));
 const before=r.snapshot(),undo=[...h.undoStack],redo=[...h.redoStack];assert.equal(controller.open(3).ok,true);r.c.currentMode=()=> 'face';
 h.push(r.live);r.live.vertices[0].x+=.3;const edited=r.live.clone();manager.replaceActiveMesh(h.undo(r.live));manager.replaceActiveMesh(h.redo(r.live));assert(meshesNear(r.live,edited));
 assert.equal(controller.cancel(),true);assert.deepEqual(r.snapshot(),before);assert.deepEqual(h.undoStack,undo);assert.deepEqual(h.redoStack,redo);assert.equal(h.undoStack[0],undo[0]);assert.equal(controller.cancel(),false);
});
test('844 no-op source Apply restores the live array without consuming existing redo or adding history',()=>{
 const r=fixture(),{controller,h,manager}=r;assert.equal(controller.open(3).ok,true);r.c.currentMode=()=> 'face';
 h.push(r.live);r.live.vertices[0].z+=.5;manager.replaceActiveMesh(h.undo(r.live));
 assert.deepEqual(controller.apply(),{ok:true,unchanged:true});assert.deepEqual(r.snapshot(),r.before);assert.deepEqual(h.undoStack,r.undo);assert.deepEqual(h.redoStack,r.redo);
});
test('844 invalid geometry and busy sessions refuse; changed object context cancels without source leaking into result',()=>{
 const r=fixture(),{controller,manager,h}=r;r.busy(true);assert.equal(controller.open(3).ok,false);r.busy(false);assert.equal(controller.open(3).ok,true);r.c.currentMode=()=> 'face';
 r.busy(true);assert.equal(controller.cancel(),false);assert.equal(controller.apply().ok,false);r.busy(false);
 h.push(r.live);r.live.vertices[0].x=NaN;assert.equal(controller.apply().ok,false);assert.equal(controller.active(),true);assert.equal(manager.objects.find(o=>o.id===3).arrayRecipe,undefined);
 manager.replaceActiveMesh(h.undo(r.live));manager.activate(1);assert.equal(controller.context().ok,false);assert.equal(controller.cancel(),true);assert.deepEqual(r.snapshot(),r.before);
 for(const kind of ['locked','reference','linked','mirror','component-edited']){
  const f=fixture(),o=f.manager.objects.find(o=>o.id===3);
  if(kind==='locked')o.locked=true;if(kind==='reference')o.kind='reference';if(kind==='linked')o.sourceId='linked';if(kind==='mirror')o.settings.mirror={x:true};if(kind==='component-edited'){f.live.vertices[0].x+=.2;f.manager.saveActive();}
  const snap=f.snapshot();assert.equal(f.controller.open(3).ok,false,kind);assert.deepEqual(f.snapshot(),snap,kind);
 }
});
function uiFixture(){
 const r=fixture(),{c}=r,events=new Map(),tasks=[],clicks=new Map();let nested=false,mode='object',placed=0;
 const panel={hidden:true,style:{},contains:node=>node===panel,querySelector:selector=>({addEventListener:(name,fn)=>clicks.set(selector,fn)})};
 const modeButton=value=>({click(){mode=value;}});
 c.document={createElement:()=>panel,querySelector:selector=>selector==='#viewportWrap'?{appendChild(){}}:selector.includes('[data-mode="face"]')?modeButton('face'):selector.includes('[data-mode="object"]')?modeButton('object'):selector==='#selectionStatus'?{textContent:''}:null,querySelectorAll:()=>nested?[{getClientRects:()=>[1]}]:[],addEventListener(){}};
 c.currentMode=()=>mode;c.queueMicrotask=fn=>tasks.push(fn);c.window={addEventListener:(name,fn)=>events.set(name,fn),dispatchEvent(){}};c.CustomEvent=class{constructor(type,options){this.type=type;this.detail=options?.detail;}};
 c.MutationObserver=class{observe(){}};c.placeToolSessionPanel=()=>{placed++;};c.createArraySourceEditor=createArraySourceEditor;c.__boxlabToolSession={current:()=>null};
 const code=fs.readFileSync(new URL('../src/live-array-source-editor.js',import.meta.url),'utf8').replace(/^import .*;\n/gm,'');vm.runInContext("(function(){"+code+"})();",c);
 const flush=()=>{let n=0;while(tasks.length){assert(++n<25,'bounded UI updates');tasks.shift()();}};
 return {...r,panel,events,clicks,flush,placed:()=>placed,nested(value){nested=value;},mode:()=>mode};
}
test('844 actual source UI yields shared top-centre slot to nested tools; component modes and gestures retain ownership',()=>{
 const r=uiFixture(),api=r.c.__boxlabLiveArraySourceEditor;assert.equal(api.open(3),true);r.flush();assert.equal(r.mode(),'face');assert.equal(r.panel.hidden,false);assert.equal(r.placed(),1);
 r.nested(true);r.events.get('boxlab-tool-session-change')();r.flush();assert.equal(r.panel.hidden,true);assert.equal(api.apply().ok,false);assert.equal(api.cancel(),false);
 r.nested(false);r.events.get('boxlab-selection-hub-session-complete')();r.flush();assert.equal(r.panel.hidden,false);
 const event=blocked=>({target:{closest:()=>blocked?{}:null},preventDefault(){this.prevented=true;},stopImmediatePropagation(){this.stopped=true;}});
 const blocked=event(true);r.events.get('click')(blocked);assert.equal(blocked.prevented,true);assert.equal(blocked.stopped,true);
 const component=event(false);r.events.get('click')(component);assert.equal(component.prevented,undefined);
 r.clicks.get('#liveArraySourceCancel')();r.flush();assert.equal(r.mode(),'object');assert.equal(r.panel.hidden,true);assert.deepEqual(r.snapshot(),r.before);
 assert.equal(r.events.has('pointerdown'),false);assert.equal(r.events.has('pointerup'),false);
});
test('844 Edit Source carries pending END/count parameters; Apply uses them and Cancel restores prior committed result',()=>{
 for(const action of ['apply','cancel']){
  const r=fixture(),parameters={...r.opened,count:7,endpoint:[9,-2,1],rotation:[0,180,30],scale:[3,1,2]};
  assert.equal(r.controller.open(3,parameters).ok,true);r.c.currentMode=()=> 'face';
  if(action==='apply'){
   const expected=evaluateArray(createArrayRecipe(r.opened.source,7,parameters.endpoint,parameters));assert.equal(r.controller.apply().ok,true);assert(meshesNear(r.manager.objects.find(o=>o.id===3).mesh,expected));assert.equal(r.h.undoStack.length,r.undo.length+1);
  }else{assert.equal(r.controller.cancel(),true);assert.deepEqual(r.snapshot(),r.before);}
 }
 const r=fixture(),before=r.snapshot();assert.equal(r.controller.open(3,{count:30,endpoint:[1,0,0]}).ok,false);assert.deepEqual(r.snapshot(),before);
});
