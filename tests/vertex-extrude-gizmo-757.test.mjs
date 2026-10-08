import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import {vertexRuntime} from './helpers/vertex-extrude-runtime.mjs';
import {snapshot} from './helpers/negative-extrude-runtime.mjs';
const source=fs.readFileSync(new URL('../src/total-gizmo.js',import.meta.url),'utf8');
function fixture(){
 const f=vertexRuntime(),c=f.context,root=f.fields.get('#viewportWrap');
 Object.assign(c,{root,canvas:f.canvas,viewportWrap:root,state:()=>f.state,currentMode:()=>c.__boxlabSelectionBridge.mode(),expanded:true,hubState:'transform',edgeExtrudeConstraintSession:false,selectionAvailable:()=>f.ids().length>0,hideFloatInput(){},gestureDebug(){},handleSpec:el=>el.dataset,syncEdgeExtrudeConstraintVisuals(){},arm(){throw Error('Axis chooser armed a transform');}});
 vm.runInContext(source.slice(source.indexOf('function vertexExtrudeConstraintSession(){'),source.indexOf('function setHubState(')),c);
 vm.runInContext(source.slice(source.indexOf('function onHandleDown('),source.indexOf('\nfunction ',source.indexOf('function onHandleDown(')+10)),c);
 f.choose=(constraint,tool='move')=>{const e={currentTarget:{dataset:{tool,constraint}},preventDefault(){this.prevented=true;},stopImmediatePropagation(){this.stopped=true;},stopPropagation(){}};c.onHandleDown(e);return e;};
 f.gizmoSync=()=>{
 Object.assign(c,{HALF:90,raf:0,lastSelectionKey:'',hubSuppressedKey:'',objectTransformDismissed:false,selectionKey:()=>f.ids().join(','),setHubState:()=>{c.hubState='transform';c.expanded=true;},centerOf:()=>f.state.mesh.vertices[f.ids()[0]],screenPoint:()=>({x:500,y:300}),floatPalette:{style:{}},cornerControls:{sync(){},position(){}},syncAxisVisuals(){}});
 const a=source.lastIndexOf('\nfunction sync(){'),b=source.indexOf('\nsync();',a);vm.runInContext(source.slice(a,b),c);c.sync();return root;
 };
 return f;
}
test('Vertex Extrude displays expanded offset viewport axes while ordinary Vertex panels stay hidden',()=>{
 const f=fixture();f.session.openFromHub({tool:'Extrude'});const r=f.gizmoSync();assert.equal(r.hidden,false);assert.equal(r.dataset.expanded,'true');assert.equal(r.style.left,'622px');
 f.owner.disarm();f.context.__boxlabVertexViewportSession={active:()=>true};f.gizmoSync();assert.equal(r.hidden,true);
});
for(const axis of ['free','x','y','z'])test(`viewport ${axis} choice delegates existing Vertex Extrude exact/history without Move`,()=>{
 const f=fixture();f.session.openFromHub({tool:'Extrude'});const before=snapshot(f.state.mesh),p=f.state.mesh.vertices[0].clone();const e=f.choose(axis);assert.equal(e.stopped,true);assert.equal(f.owner.direction(),axis);assert.equal(snapshot(f.state.mesh),before);assert.equal(f.history.undoStack.length,0);
 f.input(1);f.click('.vts-apply');const d=f.state.mesh.vertices[f.ids()[0]].clone().sub(p);assert.equal(d.length(),1);if(axis!=='free')assert.equal(d[axis],1);assert.equal(f.history.undoStack.length,1);assert.equal(snapshot(f.history.undo(f.state.mesh)),before);
});
test('axis chooser cannot switch during an active pull or arm Rotate/Scale; Done retires chooser',()=>{
 const f=fixture();f.session.openFromHub({tool:'Extrude'});f.choose('x','rotate');f.choose('y','scale');assert.equal(f.owner.direction(),'free');
 const p=f.screen(f.state.mesh.vertices[0]);f.pointer('pointerdown',{clientX:p.x,clientY:p.y});f.choose('x');assert.equal(f.owner.direction(),'free');f.pointer('pointercancel');f.click('.vts-done');assert.equal(f.context.vertexExtrudeConstraintSession(),false);
});
test('viewport X axis constrains real Pencil pull and leaves new tips ready for Free pull',()=>{
 const f=fixture();f.session.openFromHub({tool:'Extrude'});f.choose('x');f.pull(0,80,-40);let tip=f.ids()[0],d=f.state.mesh.vertices[tip].clone().sub(f.state.mesh.vertices[0]);assert.ok(d.x>0);assert.equal(d.y,0);assert.equal(d.z,0);
 f.choose('free');f.pull(tip,60,-30);d=f.state.mesh.vertices[f.ids()[0]].clone().sub(f.state.mesh.vertices[tip]);assert.ok(d.x>0&&d.y>0);assert.equal(f.history.undoStack.length,2);
});
test('shared chooser hides transform controls, highlights chosen axis and restores visuals on Done',()=>{
 const f=fixture(),c=f.context,r=c.root,badge={hidden:true,querySelector:()=>({replaceChildren(){}})};
 c.edgeExtrudeBadge=badge;c.document.createTextNode=x=>x;
 const controls=new Map();r.querySelectorAll=s=>{if(!controls.has(s))controls.set(s,[{style:{},classList:{add(){},remove(){}}}]);return controls.get(s);};
 vm.runInContext(source.slice(source.indexOf('function syncEdgeExtrudeConstraintVisuals(){'),source.indexOf('\nfunction syncContextToolAvailability')),c);
 f.session.openFromHub({tool:'Extrude'});f.choose('y');assert.equal(badge.hidden,false);assert.equal(controls.get('.tg-rotate')[0].style.display,'none');assert.equal(controls.get('.tg-move-axes,.tg-center')[0].style.display,'');assert.ok(controls.has('.tg-handle[data-tool="move"][data-constraint="y"]'));
 f.click('.vts-done');c.syncEdgeExtrudeConstraintVisuals();assert.equal(badge.hidden,true);assert.equal(controls.get('.tg-rotate')[0].style.display,'');
});
test('closing hub during Extrude retires original session and discards live preview',()=>{
 const f=fixture(),c=f.context;Object.assign(c,{suspendedFaceTool:false,hubSuppressedKey:'',resetTransientState(){}});
 vm.runInContext(source.slice(source.indexOf('function setHubState('),source.indexOf('\nfunction setExpanded')),c);
 f.session.openFromHub({tool:'Extrude'});const before=snapshot(f.state.mesh),p=f.screen(f.state.mesh.vertices[0]);f.pointer('pointerdown',{clientX:p.x,clientY:p.y});f.pointer('pointermove',{clientX:p.x+60,clientY:p.y});assert.equal(f.owner.busy(),true);
 assert.equal(c.setHubState('closed'),'closed');assert.equal(f.session.active(),false);assert.equal(f.owner.isArmed(),false);assert.equal(snapshot(f.state.mesh),before);assert.equal(f.history.undoStack.length,0);
});
test('existing Edge Extrude chooser still selects XYZ and edge-perpendicular Plane through its owner event',()=>{
 const f=fixture(),c=f.context;f.setMode('edge');c.edgeExtrudeConstraintSession=true;c.status={};let axis='plane';c.__boxlabTransformArming={active:()=>true,setConstraint:x=>{axis=x;}};
 for(const a of ['x','y','z','free']){f.choose(a);assert.equal(axis,a==='free'?'plane':a);assert.equal(f.events.at(-1).type,'boxlab-edge-extrude-gizmo-constraint');assert.equal(f.events.at(-1).detail.constraint,axis);}
 assert.equal(f.owner.isArmed(),false);assert.equal(f.history.undoStack.length,0);
});
