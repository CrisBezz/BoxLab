import test from 'node:test';import assert from 'node:assert/strict';import fs from 'node:fs';import vm from 'node:vm';
import {faceRuntime,snapshot} from './helpers/negative-extrude-runtime.mjs';import {EditableMesh} from '../src/mesh.js';import {closedGrid} from './helpers/through-validation-profile.mjs';
const read=p=>fs.readFileSync(new URL('../'+p,import.meta.url),'utf8');
function native(mode='face',type='face'){
 const s=read('src/main.js'),node={classList:{toggle(){}},checked:true};const c={selectionMode:mode,selection:{type,indices:[21,16,26],index:21},directTool:null,multiSelectEnabled:true,document:{querySelector:()=>node},clearLoopSlide(){},clearSelection(){c.selection=null;},syncSelectionModeButtons(){},syncTransformButtons(){},syncDirectToolControls(){},updateStatus(){}};vm.createContext(c);vm.runInContext(s.split('\n').find(l=>l.startsWith('function setDirectTool(')),c);return c;
}
for(const tool of ['extrude','inset'])test(`1187 native ${tool} arming retains all faces and primary; unrelated modes clear`,()=>{
 const c=native(),selection=c.selection;c.setDirectTool(tool);assert.equal(c.selection,selection);assert.deepEqual(c.selection.indices,[21,16,26]);c.setDirectTool(null);assert.equal(c.selection,selection);for(const mode of ['edge','vertex','object']){const other=native(mode,mode);other.setDirectTool(tool);assert.equal(other.selection,null);assert.equal(other.selectionMode,'face');}
});
function radial({changeContext=false}={}){
 const m=closedGrid(4,EditableMesh),f=faceRuntime(m,[21,16,26]),c=f.context,handlers={};let ids=[21,16,26],mode='face';const button={dataset:{toolTarget:'#extrudeBtn'},disabled:false,textContent:'Extrude',closest:()=>({dataset:{ringMode:'face'}}),addEventListener:(t,fn)=>handlers[t]=fn};
 c.__boxlabSelectionBridge.indices=()=>ids;c.__boxlabSelectionBridge.set=(type,next)=>{ids=[...next];return true;};c.__boxlabObjectManager={activeId:1};
 const target={disabled:false,click(){ids=[];if(changeContext)c.__boxlabObjectManager.activeId=2;}};
 const originalQuery=c.document.querySelector;c.document.querySelector=q=>q==='#extrudeBtn'?target:originalQuery(q);
 c.window.dispatchEvent=()=>{};
 Object.assign(c,{toolSectors:[button],syncContextToolAvailability(){},currentMode:()=>mode,state:()=>c.__boxlabBridgeState,suspendedFaceTool:false,hubSuppressedKey:'',lastSelectionKey:'face:21,16,26',setHubState(){},root:{},gestureDebug(){}});
 const s=read('src/total-gizmo.js'),a=s.indexOf('toolSectors.forEach(button=>{'),b=s.indexOf('\ntoolButtons.forEach',a);vm.runInContext(s.slice(a,b),c);
 return{f,m,ids:()=>ids,launch:()=>handlers.click({preventDefault(){},stopPropagation(){}})};
}
test('1187 actual radial proxy restores the complete multi-face launch selection',()=>{const r=radial(),before=snapshot(r.m);r.launch();assert.deepEqual(r.ids(),[21,16,26]);assert.equal(snapshot(r.m),before);assert.equal(r.f.history.undoStack.length,0);});
test('1187 radial arming never restores stale faces into a changed object',()=>{const r=radial({changeContext:true});r.launch();assert.deepEqual(r.ids(),[]);});

test('1187 real direct click retains multi-selection before first inward drag and Undo',()=>{
 const m=closedGrid(4,EditableMesh),before=snapshot(m),f=faceRuntime(m,[21,16]),target={id:'extrudeBtn',closest:q=>q.includes('#extrudeBtn')?target:null};f.context.document.dispatchEvent({type:'click',target,preventDefault(){},stopImmediatePropagation(){}});assert.equal(f.api.tool(),'extrude');assert.deepEqual(f.selected(),[21,16]);assert.equal(f.history.undoStack.length,0);assert(f.start());f.move(-.1);assert(f.owner.drag().preview,f.owner.drag().failureReason);f.finish();assert.equal(f.history.undoStack.length,1);assert.equal(snapshot(f.history.undo(m)),before);
});
