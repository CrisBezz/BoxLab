import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import {EditableMesh} from '../../src/mesh.js';
export const gizmoSource=fs.readFileSync(new URL('../../src/total-gizmo.js',import.meta.url),'utf8');
function section(start,end){const a=gizmoSource.indexOf(start),b=gizmoSource.indexOf(end,a);assert.ok(a>=0&&b>a,`missing gizmo owner: ${start}`);return gizmoSource.slice(a,b);}
// Actual controller, selection functions, frame sync and completion/puck handlers.
// Projection, DOM, other owner APIs and RAF are doubles; no browser rendering or
// pointer recognition claim. State transitions are not reimplemented here.
export function selectionHubRuntime({mode='face',ids=[0],globals={}}={}){
 let current=mode,indices=[...ids];const mesh=EditableMesh.cube(2),handlers=new Map(),puckHandlers=new Map(),calls=[];
 const rect={left:0,top:0,width:1024,height:768};
 const c={root:{dataset:{},style:{},hidden:true},canvas:{getBoundingClientRect:()=>rect},viewportWrap:{getBoundingClientRect:()=>rect},
 __boxlabBridgeState:{mesh,camera:{}},__boxlabSelectionBridge:{mode:()=>current,indices:()=>indices,set:(m,next)=>{current=m;indices=[...next];}},
 __boxlabObjectManager:{activeId:1,objects:[{id:1,mesh,visible:true}]},__boxlabObjectSelection:{ids:new Set([1]),multi:false},
 hubState:'closed',expanded:false,hubSuppressedKey:'',lastSelectionKey:'',suspendedFaceTool:false,edgeExtrudeConstraintSession:false,objectTransformDismissed:false,
 gestureDebug:(stage,detail)=>calls.push({stage,detail}),resetTransientState:()=>calls.push({stage:'reset'}),hideFloatInput:()=>calls.push({stage:'hide-input'}),
 requestAnimationFrame:()=>1,queueMicrotask:fn=>fn(),screenPoint:()=>({x:100,y:100}),centerOf:()=>({}),HALF:98,
 placeToolSessionPanel(){},floatPalette:{},cornerControls:{sync(){},position(){}},syncAxisVisuals(){},syncEdgeExtrudeConstraintVisuals(){},
 window:{addEventListener:(type,handler)=>handlers.set(type,handler)},activator:{addEventListener:(type,handler)=>puckHandlers.set(type,handler)},
 ...globals};
 vm.createContext(c);
 vm.runInContext(section('function state(){','function centerOf(')+section('activator?.addEventListener(', '\n\n\ntoolCenters.forEach')+section("window.addEventListener('boxlab-selection-hub-session-complete'", "\nwindow.addEventListener('boxlab-bridge-state'")+section('function sync(){','\nsync();'),c);
 return{c,mesh,calls,sync:()=>c.sync(),mode:value=>current=value,select:next=>indices=[...next],
 puck:()=>{let prevented=0,stopped=0;puckHandlers.get('pointerdown')({preventDefault:()=>prevented++,stopPropagation:()=>stopped++});return{prevented,stopped};},
 complete:detail=>handlers.get('boxlab-selection-hub-session-complete')({detail}),
 state:()=>({hub:c.hubState,expanded:c.expanded,hidden:c.root.hidden,dataset:{...c.root.dataset}}),
 collapsedHandle(){vm.runInContext(section('function onHandleDown(event){','function clearTransientHandleState(){'),c);let prevented=0,stopped=0;c.onHandleDown({pointerId:9,preventDefault:()=>prevented++,stopPropagation:()=>stopped++});return{prevented,stopped};}
 };
}
export function assertComponentPuck(mode='face'){
 const r=selectionHubRuntime({mode});r.sync();assert.equal(r.c.hubState,'closed');assert.equal(r.c.expanded,false);assert.equal(r.c.root.hidden,false);assert.equal(r.c.root.dataset.expanded,'false');assert.equal(r.c.root.dataset.hubState,'closed');return r;
}
export function assertSelectionCollapses(){const r=assertComponentPuck();r.puck();assert.equal(r.c.expanded,true);r.select([1]);r.sync();assert.equal(r.c.expanded,false);assert.equal(r.c.hubState,'closed');return r;}
export function assertObjectFull(){const r=selectionHubRuntime({mode:'object'});r.sync();assert.equal(r.c.hubState,'transform');assert.equal(r.c.expanded,true);r.c.setExpanded(false);assert.equal(r.c.expanded,true);r.c.setHubState('tools');assert.equal(r.c.hubState,'tools');return r;}
export function assertCollapsedCSS(){
 // CSS visibility is a structural contract; browser hit-testing still needs device QA.
 assert.match(gizmoSource,/#totalGizmo:not\(\[data-hub-state="transform"\]\) svg\{display:none!important\}/);
 const r=assertComponentPuck();assert.deepEqual(r.collapsedHandle(),{prevented:1,stopped:1});return r;
}
