import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import * as THREE from 'three';
import {EditableMesh} from '../src/mesh.js';
import {createFaceBevelPreview,disposeFaceBevelPreview} from '../src/bevel-face-preview.js';
import {History} from '../src/history.js';
import {circleLoopInfo,circularizeLoop} from '../src/component-circle-core.js';
import {installLooseTopology} from '../src/loose-topology.js';
import {installVertexBevelTopology} from '../src/vertex-bevel-topology.js';
import {installMultiVertexBevelTopology} from '../src/multi-vertex-bevel-topology.js';
for(const install of [installLooseTopology,installVertexBevelTopology,installMultiVertexBevelTopology])install(EditableMesh);
const source=name=>fs.readFileSync(new URL('../src/'+name,import.meta.url),'utf8').replace(/^import .*;\n/gm,'');
const inline=()=>new EditableMesh([[0,0,0],[1,0,0],[2,0,0],[2,1,0],[0,1,0]],[[0,1,2,3,4]]);
const seam=()=>new EditableMesh([[0,0,0],[1,0,0],[1,1,0],[0,1,0],[1.0001,0,0],[2,0,0],[2,1,0],[1.0001,1,0]],[[0,1,2,3],[4,5,6,7]]);
function fixture(m=EditableMesh.cube()){
 const fields=new Map(),events=[],queue=[];let ids=[0],mode='vertex',locked=false,addActive=false;
 const event=(type,target,extra={})=>({type,target,isTrusted:false,preventDefault(){},stopPropagation(){},stopImmediatePropagation(){this.stopped=true;},...extra});
 const emit=(el,type,e=event(type,el))=>{for(const fn of el.listeners.get(type)||[]){fn(e);if(e.stopped)break;}return e;};
 const element=()=>{
  const classes=new Set(),el={listeners:new Map(),style:{setProperty(){},removeProperty(){}},value:'',disabled:false,hidden:false,dataset:{},children:[],attributes:new Map(),offsetHeight:150,classList:{add:s=>classes.add(s),remove:s=>classes.delete(s),contains:s=>classes.has(s),toggle:(s,on)=>{on=on??!classes.has(s);on?classes.add(s):classes.delete(s);}},getAttribute(s){return this.attributes.get(s)||null;},setAttribute(s,v){this.attributes.set(s,String(v));},removeAttribute(s){this.attributes.delete(s);},append(...items){this.children.push(...items);},appendChild(item){this.append(item);},insertAdjacentElement(){},addEventListener(t,f){if(!this.listeners.has(t))this.listeners.set(t,[]);this.listeners.get(t).push(f);},dispatchEvent(e){return emit(this,e.type,e);},querySelector(s){if(!fields.has(s))fields.set(s,element());return fields.get(s);},querySelectorAll(){return[];},closest(s){if(s.includes('#'+this.id))return this;return null;},setPointerCapture(){},releasePointerCapture(){},getBoundingClientRect:()=>({left:0,top:0,width:1000,height:600}),blur(){},click(){const e=event('click',this);emit(document,'click',e);if(!e.stopped)emit(this,'click',e);}};
  Object.defineProperty(el,'id',{get(){return this._id;},set(v){this._id=v;fields.set('#'+v,this);}});return el;
 };
 const document=element(),window=element();document.createElement=element;document.head=element();document.body=element();document.querySelector=s=>s==='#app'?{classList:{contains:()=>locked}}:fields.get(s)||null;document.querySelectorAll=()=>[];
 for(const s of ['#viewport','#viewportWrap','#vertexBevelBtn','#vertexBevelWidth','#vertexBevelWidthOut','#vertexSlideBtn','#selectionModes','#selectionStatus','#addVertexBtn','#buildEdgeBtn','#multiSelectToggle','[data-mode-tools="vertex"]','[data-mode-tools="edge"]'])fields.set(s,element());
 fields.get('#vertexBevelBtn').id='vertexBevelBtn';fields.get('#vertexBevelWidth').value='20';for(const [k,v] of [['min',2],['max',49],['step',1]])fields.get('#vertexBevelWidth').setAttribute(k,v);
 const history=new History(),camera=new THREE.PerspectiveCamera(45,1000/600,.1,100);camera.position.set(4,3,6);camera.lookAt(0,0,0);camera.updateMatrixWorld();
 const context={THREE,createFaceBevelPreview,disposeFaceBevelPreview,Set,Map,document,window,Event:class{constructor(type){this.type=type;}},CustomEvent:class{constructor(type,{detail}){Object.assign(this,{type,detail});}},queueMicrotask:f=>queue.push(f),setTimeout(){},requestAnimationFrame:()=>1,cancelAnimationFrame(){},placeToolSessionPanel:p=>{p.style.left='50%';p.style.top='12px';},__boxlabHistory:history,__boxlabBridgeState:{mesh:m,camera,scene:new THREE.Group(),edgeObjects:new Map()},__boxlabSelectionBridge:{mode:()=>mode,indices:()=>ids,set:(md,next)=>{mode=md;ids=next;}},__boxlabTransformArming:{disarm(){}},__boxlabAddVertex:{isActive:()=>addActive,stop:selectLast=>{addActive=false;if(selectLast)ids=[0];}}};
 const oldDispatch=window.dispatchEvent.bind(window);window.dispatchEvent=e=>{events.push(e);return oldDispatch(e);};
 vm.createContext(context);for(const module of ['direct-multi-vertex-bevel.js','precision-bevel.js','vertex-slide-polish.js','merge-by-distance.js','clean-vertices.js','add-edge-ui.js','vertex-tool-viewport-session.js'])vm.runInContext('{'+source(module)+'}',context);
 fields.get('#addVertexBtn').addEventListener('click',()=>{addActive=true;ids=[];});
 const api=context.__boxlabVertexViewportSession;
 return{context,m,api,history,fields,events,emit,event,window,document,ids:()=>Array.from(ids),setIds:v=>{ids=v;},setMode:v=>{mode=v;},setLocked:v=>{locked=v;},click:s=>fields.get(s).click(),flush:()=>{while(queue.length)queue.shift()();},addActive:()=>addActive};
}
test('full Vertex ring covers exactly current Active Tools; Bevel shares inner 90 degrees in all modes',()=>{
 const s=source('total-gizmo.js');const rings={};
 for(const mode of ['face','edge','vertex']){const start=s.indexOf('<div class="tg-tool-ring" data-ring-mode="'+mode+'"');const next=s.indexOf('<div class="tg-tool-ring"',start+10);rings[mode]=s.slice(start,next<0?s.indexOf('<div class="tg-edge-extrude-badge"',start):next);}
 const targets=[...rings.vertex.matchAll(/data-tool-target="([^"]+)"/g)].map(m=>m[1]);assert.deepEqual(targets,['#vertexExtrudeBtn','#buildEdgeBtn','#vertexBevelBtn','#vertexSlideBtn','#connectVertexBtn','#weldVertexBtn','#createFaceFromVerticesBtn','#deleteVertexBtn','#addVertexBtn','#componentCircleBtn','#mergeVerticesCenterBtn','#mergeVerticesFirstBtn','#mergeByDistanceBtn','#cleanVerticesBtn']);
 for(const mode of ['face','edge','vertex'])assert.match(rings[mode],/class="tg-tool-sector" style="--a:0deg" data-tool-target="#[^"]+">Extrude/);
 const faceAngles=[...rings.face.matchAll(/tg-tool-outer" style="--a:([\d.]+)deg/g)].map(m=>Number(m[1])).sort((a,b)=>a-b);assert.equal(faceAngles.length,15);faceAngles.forEach((a,i)=>assert.equal(a,i*24));
 for(const mode of ['face','edge','vertex'])assert.match(rings[mode],/class="tg-tool-sector" style="--a:90deg" data-tool-target="#[^"]+">Bevel/);
 assert.match(rings.face,/--a:135deg" data-tool-target="#knifeBtn"/);assert.match(rings.face,/--a:180deg" data-tool-target="#duplicateFacesBtn"/);assert.match(rings.face,/tg-tool-outer[^\n]+#extractFacesBtn/);assert.match(rings.edge,/--a:45deg" data-tool-target="#edgeSlideBtn"/);assert.match(rings.edge,/--a:135deg" data-tool-target="#applyCreaseBtn"/);assert.doesNotMatch(rings.vertex,/select|Grow|Shrink|Align/);
 const rects=[...rings.vertex.matchAll(/class="tg-tool-sector([^\"]*)" style="--a:([\d.]+)deg(?:;--r:([\d.]+)px)?"/g)].map(m=>{const a=Number(m[2])*Math.PI/180,r=Number(m[3]||82);return{x:Math.sin(a)*r,y:-Math.cos(a)*r,w:m[1].includes('outer')?86:68,h:34,outer:m[1].includes('outer')};});
 for(let i=0;i<rects.length;i++)for(let j=i+1;j<rects.length;j++){const a=rects[i],b=rects[j];if(!a.outer&&!b.outer)continue;assert.ok(Math.abs(a.x-b.x)>=(a.w+b.w)/2||Math.abs(a.y-b.y)>=(a.h+b.h)/2,`Vertex sectors ${i}/${j} overlap`);}
});
test('Vertex Bevel settings delegate real exact owner/kernel with one Undo/Redo and cancellation no mutation',()=>{
 const f=fixture(),before=f.m.clone();assert.equal(f.api.openFromHub({tool:'Bevel'}),true);assert.equal(f.api.element.style.top,'12px');f.click('.vts-done');f.flush();assert.deepEqual(f.m.vertices,before.vertices);assert.equal(f.history.undoStack.length,0);assert.deepEqual(f.ids(),[0]);
 f.api.openFromHub({tool:'Bevel'});const range=f.fields.get('.vts-width');range.value='30';f.emit(range,'input');assert.equal(f.fields.get('#vertexBevelWidth').value,'30');f.click('.vts-apply');f.flush();assert.equal(f.api.active(),false);assert.equal(f.context.__boxlabDirectVertexBevel.isArmed(),false);assert.equal(f.history.undoStack.length,1);assert.equal(f.ids().length,0);
 const expected=before.clone();assert.ok(expected.bevelVertices([0],.3));assert.deepEqual(JSON.parse(JSON.stringify(f.m.faces)),expected.faces);assert.deepEqual(f.m.vertices,expected.vertices);const undo=f.history.undo(f.m);assert.deepEqual(undo.vertices,before.vertices);assert.deepEqual(f.history.redo(undo).vertices,f.m.vertices);
});
test('Vertex Slide popup reuses actual rail owner and exact apply, then returns selected puck semantic',()=>{
 const f=fixture(inline());f.setIds([1]);assert.equal(f.api.openFromHub({tool:'Slide'}),true);const input=f.fields.get('.vts-value');input.value='25';f.emit(input,'input');f.click('.vts-apply');f.flush();assert.deepEqual(f.m.vertices[1].toArray(),[1.25,0,0]);assert.equal(f.history.undoStack.length,1);assert.deepEqual(f.ids(),[1]);assert.equal(f.api.active(),false);assert.equal(f.context.__boxlabVertexSlidePolish.isArmed(),false);assert.equal(f.events.at(-1).detail.mode,'vertex');
});
test('selected-only Merge distance can launch despite disabled default target, Cancel preserves and Apply delegates once',()=>{
 const f=fixture(seam());f.setIds([1,4]);assert.equal(f.api.openFromHub({tool:'Merge Dist'}),true);assert.match(f.fields.get('.vts-note').textContent,/Selected vertices only/);f.click('.vts-done');f.flush();assert.equal(f.history.undoStack.length,0);assert.deepEqual(f.ids(),[1,4]);
 f.api.openFromHub({tool:'Merge Dist'});const value=f.fields.get('.vts-value');value.value='0.00001';f.emit(value,'input');assert.equal(f.fields.get('.vts-apply').disabled,true);value.value='0.001';f.emit(value,'input');f.click('.vts-apply');f.flush();assert.equal(f.m.vertices.length,7);assert.equal(f.ids().length,1);assert.equal(f.history.undoStack.length,1);assert.equal(f.api.active(),false);
});
test('Clean Vertices clearly uses whole active object owner, launch/Cancel unchanged and Apply one history',()=>{
 const f=fixture(inline());f.setIds([3]);const before=f.m.clone();f.api.openFromHub({tool:'Clean Vertices'});assert.match(f.fields.get('.vts-note').textContent,/Whole active object/);f.click('.vts-done');f.flush();assert.deepEqual(f.m.vertices,before.vertices);assert.equal(f.history.undoStack.length,0);
 f.api.openFromHub({tool:'Clean Vertices'});f.click('.vts-apply');f.flush();assert.equal(f.m.vertices.length,4);assert.equal(f.history.undoStack.length,1);assert.equal(f.ids().length,0);assert.equal(f.api.active(),false);
});
test('Add and Build sessions use existing owner arming/Done and superseding tools without stale completion',()=>{
 const f=fixture();assert.equal(f.api.openFromHub({tool:'Add'}),true);assert.equal(f.addActive(),true);assert.equal(f.api.element.hidden,false);f.click('.vts-done');f.flush();assert.equal(f.addActive(),false);assert.deepEqual(f.ids(),[0]);assert.equal(f.history.undoStack.length,0);
 assert.equal(f.api.openFromHub({tool:'Build Edge'}),true);assert.equal(f.context.__boxlabBuildEdge.isArmed(),true);const completed=f.events.length;f.window.dispatchEvent(new f.context.CustomEvent('boxlab-selection-hub-tool',{detail:{mode:'face',tool:'Knife'}}));f.flush();assert.equal(f.context.__boxlabBuildEdge.isArmed(),false);assert.equal(f.api.active(),false);assert.equal(f.events.length,completed+1);
});
test('invalid values, lock and changed mesh/mode cannot apply; owner drag semantic closes sessions',()=>{
 const f=fixture();f.api.openFromHub({tool:'Bevel'});for(const v of ['','NaN','1','50']){const input=f.fields.get('.vts-value');input.value=v;f.emit(input,'input');assert.equal(f.fields.get('.vts-apply').disabled,true);f.click('.vts-apply');}assert.equal(f.history.undoStack.length,0);
 f.setLocked(true);f.api.sync();f.flush();assert.equal(f.api.active(),false);assert.equal(f.api.available('Add'),false);f.setLocked(false);f.api.openFromHub({tool:'Bevel'});f.context.__boxlabBridgeState.mesh=EditableMesh.cube();f.api.sync();assert.equal(f.api.active(),false);assert.equal(f.history.undoStack.length,0);
 f.api.openFromHub({tool:'Bevel'});f.window.dispatchEvent(new f.context.CustomEvent('boxlab-vertex-tool-complete',{detail:{tool:'Bevel',committed:false}}));f.flush();assert.equal(f.api.active(),false);assert.equal(f.context.__boxlabDirectVertexBevel.isArmed(),false);
 f.api.openFromHub({tool:'Bevel'});f.setMode('edge');f.api.sync();assert.equal(f.api.active(),false);
});


test('real Vertex Bevel drag completion reaches popup despite stopped pointer propagation',()=>{
 const f=fixture(),before=f.m.clone();f.api.openFromHub({tool:'Bevel'});const canvas=f.fields.get('#viewport'),p=f.m.vertices[0].clone().project(f.context.__boxlabBridgeState.camera),x=(p.x*.5+.5)*1000,y=(-p.y*.5+.5)*600;
 const down=f.event('pointerdown',canvas,{pointerId:7,isPrimary:true,pointerType:'pen',pressure:.5,clientX:x,clientY:y});f.emit(canvas,'pointerdown',down);assert.equal(down.stopped,true);
 f.emit(canvas,'pointermove',f.event('pointermove',canvas,{pointerId:7,clientX:x+20,clientY:y}));f.emit(canvas,'pointerup',f.event('pointerup',canvas,{pointerId:7}));f.flush();
 assert.equal(f.history.undoStack.length,1);assert.equal(f.api.active(),false);assert.equal(f.context.__boxlabDirectVertexBevel.isArmed(),false);assert.equal(f.ids().length,0);assert.notDeepEqual(f.m.vertices,before.vertices);
});
test('real Vertex Slide window owner closes popup through semantic completion and keeps rail result selected',()=>{
 const f=fixture(inline());f.setIds([1]);f.context.__boxlabVertexPickAssist={nearestVertexAt:()=>({i:1})};f.api.openFromHub({tool:'Slide'});const canvas=f.fields.get('#viewport'),camera=f.context.__boxlabBridgeState.camera;
 const screen=v=>{const p=v.clone().project(camera);return{x:(p.x*.5+.5)*1000,y:(-p.y*.5+.5)*600};};const start=screen(f.m.vertices[1]),a=screen(f.m.vertices[0]),b=screen(f.m.vertices[2]),target={x:a.x+(b.x-a.x)*.75,y:a.y+(b.y-a.y)*.75};
 const down=f.event('pointerdown',canvas,{pointerId:8,isPrimary:true,pointerType:'pen',clientX:start.x,clientY:start.y});f.emit(f.window,'pointerdown',down);assert.equal(down.stopped,true);
 f.emit(f.window,'pointermove',f.event('pointermove',canvas,{pointerId:8,clientX:target.x,clientY:target.y}));f.emit(f.window,'pointerup',f.event('pointerup',canvas,{pointerId:8}));f.flush();
 assert.ok(Math.abs(f.m.vertices[1].x-1.5)<1e-7);assert.equal(f.history.undoStack.length,1);assert.deepEqual(f.ids(),[1]);assert.equal(f.api.active(),false);assert.equal(f.context.__boxlabVertexSlidePolish.isArmed(),false);
});

function wireRadial(f,label,target){
 const c=f.context,classes={contains:()=>false,toggle(){}},button={disabled:false,textContent:label,dataset:{toolTarget:target},classList:classes,getAttribute(){},setAttribute(){},removeAttribute(){},closest:()=>({dataset:{ringMode:'vertex'}}),listeners:{},addEventListener(t,fn){this.listeners[t]=fn;}};
 Object.assign(c,{toolSectors:[button],currentMode:()=>c.__boxlabSelectionBridge.mode(),state:()=>c.__boxlabBridgeState,root:{hidden:false},suspendedFaceTool:false,hubSuppressedKey:'',lastSelectionKey:'initial',selectionAvailable:()=>c.__boxlabSelectionBridge.indices().length>0,selectionKey:()=>c.__boxlabSelectionBridge.mode()+':'+c.__boxlabSelectionBridge.indices().join(','),setHubState(){},gestureDebug(){}});
 const s=source('total-gizmo.js'),a=s.indexOf('function syncContextToolAvailability(){'),b=s.indexOf('\nactivator?',a);vm.runInContext(s.slice(a,b),c);const x=s.indexOf('toolSectors.forEach(button=>{'),y=s.indexOf('\ntoolButtons.forEach',x);vm.runInContext(s.slice(x,y),c);
 return()=>button.listeners.click({preventDefault(){},stopPropagation(){}});
}
function nativeAction(f,name,ids){
 const c=f.context;Object.assign(c,{mesh:f.m,history:f.history,selection:{type:'vertex',indices:ids,index:ids[0]},selectionMode:'vertex',multiSelectEnabled:true,selectionCount:()=>c.selection?.indices?.length||0,selectionIndices:()=>c.selection?.indices||[],setDirectTool(){},clearLoopSlide(){},makeSelection:(type,indices,index)=>({type,indices,index}),clearSelection:()=>{c.selection=null;c.__boxlabSelectionBridge.set('vertex',[]);},renderMesh:()=>{c.__boxlabBridgeState.mesh=c.mesh;c.__boxlabSelectionBridge.set(c.selectionMode,c.selection?.indices||[]);}});
 const s=source('main.js');for(const fn of ['compactOrphanVertices',name]){const a=s.indexOf('function '+fn+'('),b=s.indexOf('\n',a);vm.runInContext(s.slice(a,b),c);}
}
test('radial Join/Weld/Delete call actual native owners and clear suppression across result mode changes',()=>{
 for(const [label,target,fn,ids] of [['Join','#connectVertexBtn','connectSelectedVertices',[0,2]],['Weld','#weldVertexBtn','weldSelectedVertices',[0,1]],['Delete','#deleteVertexBtn','deleteSelectedVertices',[0]]]){
  const f=fixture(new EditableMesh([[0,0,0],[1,0,0],[1,1,0],[0,1,0]],[[0,1,2,3]]));f.setIds(ids);nativeAction(f,fn,ids);const el=f.document.createElement('button');el.id=target.slice(1);el.addEventListener('click',()=>f.context[fn]());wireRadial(f,label,target)();f.flush();assert.equal(f.history.undoStack.length,1);assert.equal(f.context.hubSuppressedKey,'');
  if(label==='Join'){assert.equal(f.context.__boxlabSelectionBridge.mode(),'edge');assert.equal(f.context.mesh.faces.length,2);}
  if(label==='Weld'){assert.equal(f.context.__boxlabSelectionBridge.mode(),'vertex');assert.equal(f.context.mesh.vertices.length,3);assert.equal(f.context.root.hidden,false);}
  if(label==='Delete'){assert.equal(f.ids().length,0);assert.equal(f.context.root.hidden,true);}
 }
});
test('Create Face and Circle radial invoke existing owners; rebuilt Face selection gets fresh hub path',()=>{
 const m=EditableMesh.cube();m.faces.shift();const f=fixture(m);f.setIds([0,3,2,1]);const modeButton=f.document.createElement('button');modeButton.addEventListener('click',()=>f.setMode('face'));f.fields.set('#selectionModes button[data-mode="face"]',modeButton);vm.runInContext('{'+source('face-reconstruct.js')+';sync();}',f.context);wireRadial(f,'Create Face','#createFaceFromVerticesBtn')();f.flush();assert.equal(f.m.faces.length,6);assert.equal(f.context.__boxlabSelectionBridge.mode(),'face');assert.equal(f.ids().length,1);assert.equal(f.history.undoStack.length,1);assert.equal(f.context.hubSuppressedKey,'');
 const g=fixture(new EditableMesh([[0,0,0],[3,0,0],[3,1,0],[0,1,0]],[[0,1,2,3]]));g.setIds([0,1,2,3]);Object.assign(g.context,{circleLoopInfo,circularizeLoop});g.fields.get('#vertexBevelBtn').click();assert.equal(g.context.__boxlabDirectVertexBevel.isArmed(),true);vm.runInContext('{'+source('component-circle.js')+'}',g.context);wireRadial(g,'Circle','#componentCircleBtn')();g.flush();assert.equal(g.history.undoStack.length,1);assert.deepEqual(g.ids(),[0,1,2,3]);assert.equal(g.context.root.hidden,false);assert.equal(g.context.__boxlabDirectVertexBevel.isArmed(),false);
});

test('731 Vertex Width slider renders blue copy, Cancel disposes it; external changes cannot be overwritten',()=>{
 const f=fixture(),before=f.m.clone(),owner=f.context.__boxlabDirectVertexBevel,scene=f.context.__boxlabBridgeState.scene;
 f.api.openFromHub({tool:'Bevel'});assert.equal(scene.children.length,1);assert.deepEqual(f.m.vertices,before.vertices);assert.equal(f.history.undoStack.length,0);
 const range=f.fields.get('.vts-width');range.value='35';f.emit(range,'input');assert.equal(owner.previewState().percent,35);assert.equal(scene.children.length,1);assert.deepEqual(f.m.faces,before.faces);
 f.click('.vts-done');f.flush();assert.equal(scene.children.length,0);assert.deepEqual(f.ids(),[0]);assert.equal(f.history.undoStack.length,0);
 f.api.openFromHub({tool:'Bevel'});f.m.vertices[0].x=77;assert.equal(owner.applyPreview(20).ok,false);assert.equal(f.m.vertices[0].x,77);assert.equal(scene.children.length,0);assert.equal(f.history.undoStack.length,0);
});
