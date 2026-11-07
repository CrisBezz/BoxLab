import fs from 'node:fs';
import vm from 'node:vm';
import assert from 'node:assert/strict';
import * as THREE from 'three';
import {EditableMesh} from '../../src/mesh.js';
import {History} from '../../src/history.js';
import {meshIntersections,epsilonForMeshes} from '../../src/boolean-intersections.js';
import {topologyInfo,classifyPoint} from '../../src/boolean-classify.js';
import {booleanBSP} from '../../src/boolean-bsp.js';
import {combineEditableMeshes} from '../../src/object-join-core.js';
import {createEditableBooleanController,recordBooleanRecipe} from '../../src/editable-boolean-core.js';
const read=name=>fs.readFileSync(new URL('../../src/'+name,import.meta.url),'utf8');
function section(source,start,end){const a=source.indexOf(start),b=source.indexOf(end,a);assert.ok(a>=0&&b>a,start);return source.slice(a,b);}
// Real manager save/activation/history replacement, scene-history bridge and
// complete Boolean dispatch/geometry. Rendering, DOM and settings UI are adapters.
export function editableBooleanRuntime(operation='difference'){
  const h=new History(),live=EditableMesh.cube(2),source=read('multi-object.js'),management=read('object-management.js'),boolean=read('boolean-prototype.js');
  const settings={mirror:{x:false,y:false,z:false},subd:false,subdLevel:1,cage:true};
  const make=(id,name,mesh)=>({id,name,mesh,visible:true,locked:false,kind:'editable',settings:{...settings,mirror:{...settings.mirror}},history:{undo:[],redo:[]}});
  const a=make(1,'A',live.clone()),b=make(2,'B',EditableMesh.cube(1.4));b.mesh.vertices.forEach(v=>v.add(new THREE.Vector3(.8,.17,.13)));
  const objects=[a,b,make(3,'Unrelated',EditableMesh.cube(.4))];
  let currentSettings={...settings};
  const c={THREE,EditableMesh,Map,Set,Array,__boxlabHistory:h,__boxlabBridgeState:{mesh:live},sceneObjects:objects,sceneActiveId:1,nextId:4,
    selectedIds:new Set([1,2]),multiEnabled:true,groupNames:new Map(),collapsedGroups:new Set(),historyBridgeInstalled:false,
    linkedSources:new Map(),queueMicrotask:()=>{},requestAnimationFrame:()=>{},setTimeout:()=>{},
    currentMode:()=> 'object',state:()=>c.__boxlabBridgeState,history:()=>h,
    captureSettings:()=>currentSettings,restoreSettings:value=>{currentSettings={...value};},
    clearComponentSelection(){},renderOutliner(){},rebuildInactiveLayer(){},activeBody:null,updateUI(){},enterObjectMode(){},
    document:{addEventListener(){},querySelector(){return null;}},status:{},
    CONVEX_ONLY:'Current Boolean supports convex solids only',DEGENERATE_INPUT:'Degenerate face in Boolean input',
    meshIntersections,epsilonForMeshes,topologyInfo,classifyPoint,booleanBSP,combineEditableMeshes};
  vm.createContext(c);
  vm.runInContext(section(management,'function manager(){','function injectStyle(){'),c);
  c.forceRender=()=>{};c.currentMode=()=> 'object';c.activeObject=()=>objects.find(o=>o.id===c.sceneActiveId);
  const multiCode=section(source,'function cloneLooseValue(','function captureSettings()')
    +section(source,'function captureHistory()','function linkedCount(')
    +section(source,'function saveActive()','function activeShouldShow()')
    +section(source,'function activateObject(','function duplicateStem(')
    +section(source,'function addObject(','function duplicateActive()');
  const moduleNames=code=>code.replace(/\bobjects\b/g,'sceneObjects').replace(/\bactiveId\b/g,'sceneActiveId');
  vm.runInContext(moduleNames(multiCode),c);
  // Use the exact new manager method, not an alternate replacement implementation.
  const replacement=section(source,'    replaceActiveMesh(mesh) {','    addMesh(').trim().replace(/,$/,'');
  const manager=vm.runInContext(moduleNames('({'+replacement+'})'),c);
  Object.assign(manager,{saveActive:()=>c.saveActive(),activate:id=>c.activateObject(id),addMesh:(...args)=>c.addObject(...args)});
  Object.defineProperties(manager,{objects:{get(){c.saveActive();return objects;}},activeId:{get(){return c.sceneActiveId;}}});c.__boxlabObjectManager=manager;
  vm.runInContext(section(management,'function installHistoryBridge(){','function initialize(){'),c);c.installHistoryBridge();
  vm.runInContext(section(boolean,'function centroid(','function ensureUI(){'),c);
  c.eligibility=()=>({ok:true,kind:'objects',active:manager.objects.find(o=>o.id===1),other:manager.objects.find(o=>o.id===2)});
  c.selection=()=>({select(ids){c.selectedIds=new Set(ids);}});c.setStatus=()=>{};
  c.__boxlabEditableBoolean={record:recordBooleanRecipe};
  vm.runInContext(section(boolean,'function booleanNameStem(','function sync(){')+section(boolean,'function apply(operation){','\nensureUI();'),c);
  c.apply(operation);assert.equal(manager.activeId,4,'real Boolean creation');
  let dragging=false;
  const controller=createEditableBooleanController({manager:()=>manager,objectHistory:()=>c.__boxlabObjectHistory,history:()=>h,
    solve:(...args)=>c.buildResult(...args),busy:()=>dragging,
    changed:detail=>{if(detail?.applied)c.selectedIds=new Set([detail.applied]);}});
  c.__boxlabEditableBoolean={record:recordBooleanRecipe,active:controller.active,cancel:controller.cancel};
  const snapshot=()=>JSON.parse(JSON.stringify(c.__boxlabObjectHistory.capture(),(key,value)=>key==='history'?undefined:value));
  return{c,manager,h,controller,snapshot,objects,live,drag(value){dragging=value;},move(delta){h.push(live);live.vertices.forEach(v=>v.add(delta));manager.saveActive();}};
}
