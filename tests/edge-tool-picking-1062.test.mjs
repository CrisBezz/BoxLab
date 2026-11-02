import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import * as THREE from 'three';
import {History} from '../src/history.js';
import {insertFaceSegment} from '../src/topology-kernel.js';
import {parseEditableOBJ} from '../src/obj-facegroups-core.js';
import {mainPickerRuntime} from './helpers/main-picker-runtime.mjs';
const read=name=>fs.readFileSync(new URL('../src/'+name,import.meta.url),'utf8');
const mesh=()=>parseEditableOBJ(fs.readFileSync(new URL('./fixtures/convex-edge-954.obj',import.meta.url),'utf8'))[0].mesh;
const rect={left:80,top:50,width:1366,height:900};
function fixture(scale=1){
 const m=mesh();m.vertices.forEach(v=>v.multiplyScalar(scale));const camera=new THREE.PerspectiveCamera(42,rect.width/rect.height,.01*scale,100*scale);camera.position.set(2.2,1.4,2.7).multiplyScalar(scale);camera.lookAt(0,.5*scale,0);camera.updateMatrixWorld();
 const root=new THREE.Group(),canvas={getBoundingClientRect:()=>rect};
 function refresh(){for(const o of [...root.children]){root.remove(o);o.geometry.dispose();o.material.dispose();}m.edges().forEach((e,i)=>{const line=new THREE.Line(new THREE.BufferGeometry().setFromPoints([m.vertices[e.a],m.vertices[e.b]]),new THREE.LineBasicMaterial({visible:false}));line.userData={kind:'edge',index:i};root.add(line);});root.updateMatrixWorld(true);}
 refresh();const native=mainPickerRuntime({root,camera,canvas});const at=index=>{const e=m.edges()[index],p=m.vertices[e.a].clone().lerp(m.vertices[e.b],.5).project(camera);return {clientX:rect.left+(p.x*.5+.5)*rect.width,clientY:rect.top+(-p.y*.5+.5)*rect.height,pointerType:'pen',isPrimary:true,preventDefault(){this.consumed=true;},stopImmediatePropagation(){}};};
 return {m,camera,root,canvas,native,at,refresh};
}
const blocks=[['face-split.js','function hitEdge(','function faceHasNonAdjacentEdges','hitEdge',false],['direct-bevel.js','function hit(','function disarm(','hit',false],['edge-extrude.js','function hitAnyEdge(','function edgePlaneAt','hitAnyEdge',false],['edge-extrude.js','function hitSelectedEdge(','function hitAnyEdge','hitSelectedEdge',true],['component-slide.js','function hitSelectedEdge(','function sideTarget','hitSelectedEdge',true],['loop-offset.js','function hitSelectedEdge(','function seedRail','hitSelectedEdge',true]];
test('Split, Bevel, Extrude, Edge Slide and Offset Loop use native CSS edge ranking on the supplied convex fixture at three scales',()=>{
 for(const scale of [.1,1,10]){
  const f=fixture(scale),before=JSON.stringify(f.m);let calls=0;const picker={pick:(type,event)=>{assert.equal(type,'edge');calls++;return f.native.bridge.pick(type,event);}};
  for(const [name,start,end,fn,selected] of blocks){const s=read(name),c={bridge:()=>picker,__boxlabSelectionBridge:picker};vm.createContext(c);vm.runInContext(s.slice(s.indexOf(start),s.indexOf(end,s.indexOf(start))),c);
   for(const index of [19,34,42,44,45,47,48,49,50,56,57,59])assert.equal(c[fn](f.at(index),[index]),index,name+' convex edge '+index+' scale '+scale);
   assert.equal(c[fn]({clientX:rect.left-30,clientY:rect.top},[49]),null,name+' preserves a native miss');
   if(selected)assert.equal(c[fn](f.at(50),[49]),null,name+' does not steal a nearby unselected edge');
  }
  assert(calls>0);assert.equal(JSON.stringify(f.m),before);
 }
});
test('actual Split tool selects a depth-stolen convex edge then completes one canonical split with exact Undo/Redo',()=>{
 const f=fixture(),listeners=new Map(),history=new History(),status={textContent:''};let selected=[];
 const candidate=[19,34,42,44,45,47,48,49,50,56,57,59].flatMap(index=>f.m.edges()[index].faces.filter(fi=>f.m.faces[fi].length>=4).map(fi=>({index,fi})))[0];assert(candidate);
 const face=f.m.faces[candidate.fi],edge=f.m.edges()[candidate.index],at=face.findIndex((a,i)=>f.m.edgeKey(a,face[(i+1)%face.length])===f.m.edgeKey(edge.a,edge.b)),j=(at+2)%face.length,other=f.m.edges().findIndex(e=>f.m.edgeKey(e.a,e.b)===f.m.edgeKey(face[j],face[(j+1)%face.length]));assert(other>=0);
 const button={classList:{remove(){},toggle(){}},addEventListener:(name,fn)=>listeners.set('button:'+name,fn)};
 f.canvas.addEventListener=(name,fn)=>listeners.set('canvas:'+name,fn);
 const state={mesh:f.m,camera:f.camera,edgeObjects:new Map()};const refresh=()=>{f.refresh();state.edgeObjects=new Map(f.root.children.map(o=>[o.userData.index,o]));};refresh();
 const document={querySelector:q=>q==='#viewport'?f.canvas:q==='#faceSplitBtn'?button:q==='#selectionStatus'?status:q==='#cageToggle'?{dispatchEvent:refresh}:q.includes('data-mode="edge"')?{click(){}}:null,addEventListener(){},dispatchEvent(){}};
 const c={THREE,insertFaceSegment,document,Event:class{},CustomEvent:class{},__boxlabBridgeState:state,__boxlabSelectionBridge:{...f.native.bridge,mode:()=> 'edge',set:(type,ids)=>{selected=[...ids];refresh();}},__boxlabHistory:history};vm.createContext(c);vm.runInContext(read('face-split.js').replace(/^import[^;]+;\s*$/gm,''),c);
 const before=JSON.stringify(f.m.clone()),faceCount=f.m.faces.length;listeners.get('button:click')({preventDefault(){},stopImmediatePropagation(){}});assert(c.__boxlabFaceSplit.isArmed());
 listeners.get('canvas:pointerdown')(f.at(candidate.index));assert.deepEqual(selected,[candidate.index]);assert.equal(history.undoStack.length,0);
 listeners.get('canvas:pointerdown')(f.at(other));assert.match(status.textContent,/Face Split committed/);assert.equal(f.m.faces.length,faceCount+1);assert.equal(history.undoStack.length,1);assert(c.__boxlabFaceSplit.isArmed());assert.equal(selected.length,1);
 const after=JSON.stringify(f.m.clone()),undo=history.undo(f.m);assert.equal(JSON.stringify(undo),before);assert.equal(JSON.stringify(history.redo(undo)),after);c.__boxlabFaceSplit.disarm();assert(!c.__boxlabFaceSplit.isArmed());
});
test('Offset Loop bootstrap and drawer resolve one module URL',()=>{
 const url=s=>s.match(/loop-offset\.js\?v=([^'"\s]+)/)[1];assert.equal(url(read('drawer-ui.js')),url(read('loose-bootstrap.js')));
});
