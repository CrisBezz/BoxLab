import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import * as THREE from 'three';
import {EditableMesh} from '../src/mesh.js';
import {analyzeSolidifyInput,solidifyOpenMesh} from '../src/solidify-core.js';
import {applyMirror} from '../src/mirror.js';
const read=n=>fs.readFileSync(new URL('../src/'+n,import.meta.url),'utf8');
const specs=[['Transform','surfaceTransformBtn','surface-transform','__boxlabSurfaceTransform'],['Insert','surfaceInsertBtn','surface-insert','__boxlabSurfaceInsert'],['Solidify','solidifyBtn','solidify','__boxlabSolidifyPreview'],['Array','linearArrayLaunchBtn','array','__boxlabLinearArray'],['Boolean','booleanLaunchBtn','boolean','__boxlabBooleanToolSession'],['Join','joinObjectsBtn'],['Symmetry / Bisect','symmetryBisectBtn','symmetry-bisect','__boxlabSymmetryBisect'],['Mesh Health','meshHealthBtn','mesh-health','__boxlabMeshHealth'],['Revolve Profile','revolveProfileLaunchBtn','revolve-profile','__boxlabRevolveProfile'],['Clean for SubD','quadCleanBtn']];
function fixture(){
 const fields=new Map(),q=[],events=[],calls=[];let mode='object';
 function el(){const n={style:{},dataset:{},listeners:new Map(),children:[],hidden:false,disabled:false,isConnected:true,classList:{contains:()=>false,add(){},remove(){},toggle(){}},querySelector(s){return fields.get(s)||null;},querySelectorAll:s=>s==='[data-array-move]'?n.children.filter(c=>c.dataset.arrayMove):[],addEventListener(t,f){const a=this.listeners.get(t)||[];a.push(f);this.listeners.set(t,a);},dispatchEvent(e){for(const f of this.listeners.get(e.type)||[])f(e);},appendChild(n){if(n.parentNode)n.parentNode.children=n.parentNode.children.filter(x=>x!==n);this.children.push(n);n.parentNode=this;},insertBefore(n){this.appendChild(n);},prepend(n){this.appendChild(n);},replaceChildren(...nodes){for(const n of this.children)n.parentNode=null;this.children=[];for(const n of nodes)this.appendChild(n);},click(){calls.push(this.id);this.dispatchEvent({type:'click',preventDefault(){},stopPropagation(){}});},removeAttribute(){}};Object.defineProperty(n,'innerHTML',{set(s){for(const m of s.matchAll(/data-array-move="([^"]+)"/g)){const child=el();child.dataset.arrayMove=m[1];n.appendChild(child);}for(const m of s.matchAll(/id="([^"]+)"/g)){const child=el();child.id=m[1];fields.set('#'+child.id,child);n.appendChild(child);}}});return n;}
 const document=el(),window=el();document.createElement=el;document.head=el();document.querySelector=s=>fields.get(s)||null;document.querySelectorAll=()=>[];
 for(const id of ['editDrawer','viewportWrap','selectionStatus'])fields.set('#'+id,el());const drawer=fields.get('#editDrawer'),content=el(),summary=el();summary.textContent='Active Tools';fields.set(':scope > .drawer-content',content);fields.set(':scope > summary',summary);
 for(const [,id] of specs){const n=el();n.id=id;fields.set('#'+id,n);content.appendChild(n);}
 const c={document,window,queueMicrotask:f=>q.push(f),setTimeout(){},CustomEvent:class{constructor(type,{detail}){Object.assign(this,{type,detail});}},placeToolSessionPanel:p=>Object.assign(p.style,{left:'50%',top:'12px'}),__boxlabSelectionBridge:{mode:()=>mode},__boxlabObjectManager:{activeId:1,objects:[{id:1,mesh:{}}]},__boxlabObjectSelection:{ids:new Set([1])},__boxlabTransformArming:{disarm(){calls.push('disarm');}}};
 const dispatch=window.dispatchEvent.bind(window);window.dispatchEvent=e=>{events.push(e);dispatch(e);};vm.createContext(c);
 vm.runInContext('{'+read('tool-session-ui.js').replace(/^import .*;\n/gm,'')+'}',c);vm.runInContext('{'+read('object-radial-session.js')+'}',c);
 const panels=new Map();for(const [label,id,session,api] of specs){if(!session)continue;const node=el();node.id=session+'Panel';content.appendChild(node);panels.set(session,node);const stop=()=>{calls.push('cancel:'+session);node.hidden=true;c.__boxlabToolSession.end(session);};c[api]={cancel:stop,close:stop};fields.get('#'+id).addEventListener('click',()=>{node.hidden=false;c.__boxlabToolSession.begin({id:session,title:label,node});});}
 return{c,fields,events,calls,panels,content,el,mode:m=>{mode=m;},flush:()=>{while(q.length)q.shift()();},api:c.__boxlabObjectRadialSession};
}
test('Object ring exactly covers existing ten Active Tool launchers, with spaced sectors',()=>{
 const s=read('total-gizmo.js'),start=s.indexOf('<div class="tg-tool-ring" data-ring-mode="object"'),ring=s.slice(start,s.indexOf('<div class="tg-edge-extrude-badge"',start));
 assert.deepEqual([...ring.matchAll(/data-tool-target="#([^"]+)"/g)].map(m=>m[1]),specs.map(s=>s[1]));assert.match(ring,/Return to gizmo/);assert.doesNotMatch(ring,/selectAll|Duplicate|Origin|Pivot/);
 const rects=[...ring.matchAll(/style="--a:([\d.]+)deg(?:;--r:([\d.]+)px)?"/g)].map(m=>{const a=Number(m[1])*Math.PI/180,r=Number(m[2]||120);return{x:r*Math.sin(a),y:-r*Math.cos(a)};});for(let i=0;i<rects.length;i++)for(let j=i+1;j<rects.length;j++)assert.ok(Math.abs(rects[i].x-rects[j].x)>=86||Math.abs(rects[i].y-rects[j].y)>=34,`overlap ${i}/${j}`);
});
test('All eight session launches dock original controls intact; close restores them and completes Object lifecycle',()=>{
 for(const [label,,id] of specs){if(!id)continue;const f=fixture(),node=f.panels.get(id);assert.equal(f.api.launch(label),true);assert.equal(f.c.__boxlabToolSession.current().id,id);assert.equal(node.parentNode,f.c.__boxlabToolSession.host);assert.equal(f.c.__boxlabToolSession.host.parentNode,f.fields.get('#viewportWrap'));assert.equal(f.c.__boxlabToolSession.host.style.left,'50%');assert.equal(f.c.__boxlabToolSession.host.style.top,'12px');f.api.cancelCurrent();f.flush();assert.equal(node.parentNode,f.content);assert.equal(f.c.__boxlabToolSession.host.hidden,true);assert.equal(f.events.at(-1).detail.mode,'object');}
});
test('Switching sessions cancels previous authoritative owner once before launching next',()=>{
 const f=fixture();f.api.launch('Insert');f.api.launch('Array');f.flush();assert.equal(f.calls.filter(x=>x==='cancel:surface-insert').length,1);assert.equal(f.c.__boxlabToolSession.current().id,'array');assert.equal(f.panels.get('surface-insert').parentNode,f.content);assert.equal(f.panels.get('surface-insert').hidden,true);assert.equal(f.api.hidesGizmo(),true);
});
test('Existing session begin replacement also cancels previous owner; new panel stays active',()=>{
 const f=fixture();f.api.launch('Solidify');const node=f.panels.get('symmetry-bisect');f.c.__boxlabToolSession.begin({id:'symmetry-bisect',node});f.flush();assert.equal(f.calls.filter(x=>x==='cancel:solidify').length,1);assert.equal(f.c.__boxlabToolSession.current().id,'symmetry-bisect');assert.equal(f.api.hidesGizmo(),false);
});
test('Symmetry and Revolve retain plane gizmo; other sessions hide competing transforms',()=>{for(const label of ['Symmetry / Bisect','Revolve Profile','Transform','Boolean']){const f=fixture();f.api.launch(label);assert.equal(f.api.hidesGizmo(),!['Symmetry / Bisect','Revolve Profile'].includes(label));}});
test('Join/Clean invoke original one-shot buttons exactly once and complete without stale session',()=>{for(const label of ['Join','Clean for SubD']){const f=fixture();f.api.launch(label);f.flush();assert.equal(f.calls.filter(x=>x===specs.find(s=>s[0]===label)[1]).length,1);assert.equal(f.events.at(-1).detail.tool,label);assert.equal(f.api.hidesGizmo(),false);}});
test('Disabled, reference, locked, missing and wrong-mode launches do not dispatch',()=>{
 const f=fixture();f.fields.get('#solidifyBtn').disabled=true;assert.equal(f.api.launch('Solidify'),false);f.c.__boxlabObjectManager.objects[0].locked=true;for(const [label] of specs)assert.equal(f.api.available(label),false);f.c.__boxlabObjectManager.objects[0].locked=false;f.c.__boxlabObjectManager.objects[0].kind='reference';assert.equal(f.api.launch('Mesh Health'),false);f.c.__boxlabObjectManager.objects[0].kind='editable';f.mode('face');assert.equal(f.api.launch('Array'),false);assert.equal(f.api.launch('Unknown'),false);assert.equal(f.calls.length,0);
});
test('Surface Transform/Insert reject multi selection; Boolean opens for operand selection',()=>{const f=fixture();f.c.__boxlabObjectSelection.ids=new Set([1,2]);assert.equal(f.api.available('Transform'),false);assert.equal(f.api.available('Insert'),false);assert.equal(f.api.available('Boolean'),true);});
test('Boolean mode exit closes session and restores full panel',()=>{const f=fixture();f.api.launch('Boolean');f.mode('edge');f.c.window.dispatchEvent({type:'boxlab-bridge-state'});f.flush();assert.equal(f.c.__boxlabToolSession.current(),null);assert.equal(f.panels.get('boolean').parentNode,f.content);});
test('Object hub stays tools until explicit close; close returns protected gizmo',()=>{
 const s=read('total-gizmo.js'),a=s.indexOf('function vertexExtrudeConstraintSession(){'),b=s.indexOf('\nfunction setExpanded',a),c={currentMode:()=> 'object',objectTransformDismissed:false,edgeExtrudeConstraintSession:false,hubState:'transform',expanded:true,root:{dataset:{}},gestureDebug(){}};vm.createContext(c);vm.runInContext(s.slice(a,b),c);assert.equal(c.setHubState('tools'),'tools');assert.equal(c.setHubState('closed'),'transform');assert.match(s,/hubState!=='transform'&&hubState!=='tools'/);assert.match(s,/__boxlabObjectRadialSession\?\.hidesGizmo/);
});

test('Actual Solidify and Array owners launch from radial, dock settings, remove previews on Cancel without source mutation',()=>{
 for(const [label,module,api] of [['Solidify','solidify.js','__boxlabSolidifyPreview'],['Array','linear-array.js','__boxlabLinearArray']]){
  const f=fixture(),mesh=new EditableMesh([[0,0,0],[1,0,0],[1,1,0],[0,1,0]],[[0,1,2,3]]),before=mesh.clone(),scene=new THREE.Scene();
  f.fields.set('.mode-tools[data-mode-tools="object"]',f.content);f.fields.set('#selectionModes button.active',{dataset:{mode:'object'}});f.fields.set('#viewport',f.el());const input=f.el();input.value='.2';input.min='.01';input.max='1';input.step='.01';input.closest=()=>null;f.fields.set('#solidifyThickness',input);
  f.fields.set('#solidifyThicknessOut',f.el());f.fields.get('#solidifyBtn').listeners.clear();
  Object.assign(f.c,{THREE,applyMirror,analyzeSolidifyInput,solidifyOpenMesh,__boxlabBridgeState:{mesh,scene,controls:{enabled:true}}});f.c.__boxlabObjectManager.objects[0].mesh=mesh;
  vm.runInContext('{'+read(module).replace(/^import .*;\n/gm,'')+'}',f.c);
  assert.equal(f.api.launch(label),true);assert.equal(f.c[api].active,true);assert.ok(scene.children.length>0);assert.deepEqual(mesh,before);assert.equal(f.c.__boxlabToolSession.host.parentNode,f.fields.get('#viewportWrap'));
  f.api.cancelCurrent();f.flush();assert.equal(f.c[api].active,false);assert.equal(scene.children.length,0);assert.deepEqual(mesh,before);assert.equal(f.c.__boxlabToolSession.host.hidden,true);
 }
});
test('Existing Face session clients retain drawer host for their protected viewport proxies',()=>{
 const f=fixture();f.mode('face');const node=f.el();f.content.appendChild(node);f.c.__boxlabToolSession.begin({id:'shell',node});assert.equal(f.c.__boxlabToolSession.host.parentNode,f.content);assert.equal(f.c.__boxlabToolSession.host.dataset.viewportDock,'false');f.c.__boxlabToolSession.end('shell');assert.equal(node.parentNode,f.content);
});

test('Actual Array owner repositions END on each selected axis; Free restores all arrow handles and axis drag keeps mixed endpoint',()=>{
 const f=fixture(),mesh=new EditableMesh([[0,0,0],[1,0,0],[1,1,0],[0,1,0]],[[0,1,2,3]]),before=mesh.clone(),scene=new THREE.Scene(),camera=new THREE.PerspectiveCamera(50,1,0.1,100);camera.position.set(6,6,6);camera.lookAt(0,0,0);camera.updateMatrixWorld();
 const canvas=f.el();canvas.getBoundingClientRect=()=>({left:0,top:0,width:800,height:800});canvas.setPointerCapture=()=>{};canvas.releasePointerCapture=()=>{};
 f.fields.set('.mode-tools[data-mode-tools="object"]',f.content);f.fields.set('#selectionModes button.active',{dataset:{mode:'object'}});f.fields.set('#viewport',canvas);f.c.__boxlabObjectManager.objects[0].mesh=mesh;
 let picked=null;class Raycaster extends THREE.Raycaster{intersectObject(){return picked?[picked]:[];}}
 Object.assign(f.c,{THREE:{...THREE,Raycaster},__boxlabBridgeState:{mesh,scene,camera,controls:{enabled:true}}});
 vm.runInContext('{'+read('linear-array.js').replace(/^import .*;\n/gm,'')+'}',f.c);f.api.launch('Array');
 const api=f.c.__boxlabLinearArray,controls=f.c.__boxlabToolSession.host.children.find(n=>n.id==='linearArraySession'),buttons=controls.children.filter(n=>n.dataset.arrayMove),choose=axis=>buttons.find(n=>n.dataset.arrayMove===axis).click();
 const axes=()=>scene.children[0].children.filter(n=>n.type==='ArrowHelper').map(n=>n.userData.arrayAxis);
 assert.deepEqual(axes(),['x','y','z']);
 for(const axis of ['y','z','x']){choose(axis);assert.equal(api.endpoint[axis],2.5);for(const other of ['x','y','z'].filter(a=>a!==axis))assert.equal(api.endpoint[other],0);assert.deepEqual(axes(),[axis]);}
 choose('free');assert.deepEqual(axes(),['x','y','z']);
 picked={object:scene.children[0].children.find(n=>n.type==='ArrowHelper'&&n.userData.arrayAxis==='y').cone,point:new THREE.Vector3(3,.5,0)};
 const event={type:'pointerdown',target:canvas,pointerType:'pen',pointerId:41,clientX:500,clientY:400,preventDefault(){},stopPropagation(){},stopImmediatePropagation(){}};
 assert.equal(api.ownsPoint(event),true);f.c.document.dispatchEvent(event);assert.equal(api.dragging,true);assert.equal(f.c.__boxlabBridgeState.controls.enabled,false);
 canvas.dispatchEvent({...event,type:'pointermove',clientY:330});assert.equal(api.endpoint.x,2.5);assert.notEqual(api.endpoint.y,0);assert.equal(api.endpoint.z,0);assert.deepEqual(axes(),['x','y','z'],'Free remains Free while dragging a single arrow');
 canvas.dispatchEvent({...event,type:'pointerup',clientY:330});assert.equal(api.dragging,false);assert.equal(f.c.__boxlabBridgeState.controls.enabled,true);assert.deepEqual(mesh,before);api.cancel();assert.equal(scene.children.length,0);assert.deepEqual(mesh,before);
});
