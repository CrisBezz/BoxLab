import fs from 'node:fs';
import vm from 'node:vm';
import * as THREE from 'three';
import {EditableMesh} from '../../src/mesh.js';
import {installLooseTopology} from '../../src/loose-topology.js';
import {History} from '../../src/history.js';
import {buildVertexExtrude} from '../../src/vertex-extrude-core.js';
installLooseTopology(EditableMesh);
export function vertexRuntime(m=EditableMesh.cube(),initial=[0],{sourceTransform=source=>source}={}){
  const fields=new Map(),queue=[],events=[],directions=[];let ids=[...initial],mode='vertex',locked=false;
  const event=(type,target,extra={})=>({type,target,isPrimary:true,pointerType:'pen',pressure:.5,buttons:1,button:0,pointerId:1,
    clientX:500,clientY:300,preventDefault(){this.prevented=true;},stopPropagation(){},stopImmediatePropagation(){this.stopped=true;},...extra});
  const emit=(el,e)=>{for(const fn of el.listeners.get(e.type)||[]){fn(e);if(e.stopped)break;}return e;};
  function element(){
    const classes=new Set(),el={listeners:new Map(),style:{},dataset:{},children:[],attributes:new Map(),value:'',hidden:false,disabled:false,
      classList:{add:s=>classes.add(s),remove:s=>classes.delete(s),contains:s=>classes.has(s),toggle:(s,v)=>{v=v??!classes.has(s);v?classes.add(s):classes.delete(s);}},
      setAttribute(s,v){this.attributes.set(s,String(v));},getAttribute(s){return this.attributes.get(s)||null;},removeAttribute(s){this.attributes.delete(s);},
      append(...items){for(const item of items){item.parentElement=this;this.children.push(item);}},appendChild(item){this.append(item);},insertAdjacentElement(){},
      addEventListener(t,f){if(!this.listeners.has(t))this.listeners.set(t,[]);this.listeners.get(t).push(f);},dispatchEvent(e){return emit(this,e);},
      querySelector(s){if(!fields.has(s))fields.set(s,element());return fields.get(s);},
      querySelectorAll(s){return s==='[data-vertex-extrude-direction]'?directions:[];},
      closest(s){if(this.id&&s.includes('#'+this.id))return this;if(s.includes('#selectionModes button')&&this.dataset.mode)return this;return null;},
      setPointerCapture(id){this.capture=id;},releasePointerCapture(id){if(this.capture===id)this.capture=null;},
      getBoundingClientRect:()=>({left:0,top:0,width:1000,height:600}),blur(){},click(){const e=event('click',this);emit(document,e);if(!e.stopped)emit(this,e);}};
    Object.defineProperty(el,'id',{get(){return this._id;},set(v){this._id=v;fields.set('#'+v,this);}});return el;
  }
  const document=element(),window=element();document.head=element();document.createElement=element;
  document.querySelector=s=>s==='#app'?{classList:{contains:()=>locked}}:fields.get(s)||null;
  const camera=new THREE.PerspectiveCamera(45,1000/600,.1,100);camera.position.set(0,0,10);camera.lookAt(0,0,0);camera.updateMatrixWorld();
  const state={mesh:m,camera,scene:new THREE.Group(),controls:{enabled:true}};
  const history=new History();const context={THREE,buildVertexExtrude,Set,Map,document,window,
    Event:class{constructor(type){this.type=type;}},CustomEvent:class{constructor(type,{detail}={}){Object.assign(this,{type,detail});}},
    requestAnimationFrame:()=>1,cancelAnimationFrame(){},queueMicrotask:f=>queue.push(f),setTimeout(){},
    placeToolSessionPanel:p=>{p.style.left='50%';p.style.top='12px';},__boxlabBridgeState:state,__boxlabHistory:history,
    __boxlabObjectManager:{activeId:'a',saveActive(){}},__boxlabSelectionBridge:{mode:()=>mode,indices:()=>ids,set:(md,next)=>{mode=md;ids=[...next];}},__boxlabTransformArming:{disarm(){}}};
  for(const s of ['#viewport','#viewportWrap','#selectionStatus','#cageToggle','[data-mode-tools="vertex"]','#addVertexBtn','#buildEdgeBtn','#vertexBevelBtn','#vertexSlideBtn'])fields.set(s,element());
  for(const a of ['free','x','y','z']){const b=element();b.dataset.vertexExtrudeDirection=a;directions.push(b);}
  const dispatch=e=>{for(const surface of [window,document,e.target]){emit(surface,e);if(e.stopped)break;}return e;};
  const oldDispatch=window.dispatchEvent.bind(window);window.dispatchEvent=e=>{events.push(e);return oldDispatch(e);};
  const render=()=>{state.scene.clear();state.mesh.vertices.forEach((v,i)=>{const marker=new THREE.Mesh(new THREE.SphereGeometry(.04),new THREE.MeshBasicMaterial());marker.position.copy(v);marker.userData={kind:'vertex',index:i};state.scene.add(marker);});state.scene.updateMatrixWorld();window.dispatchEvent(new context.CustomEvent('boxlab-bridge-state'));};
  fields.get('#cageToggle').addEventListener('change',render);
  vm.createContext(context);
  const load=name=>vm.runInContext('{'+sourceTransform(fs.readFileSync(new URL('../../src/'+name,import.meta.url),'utf8'),name).replace(/^import .*;\n/gm,'')+'}',context);
  load('vertex-tool-viewport-session.js');load('vertex-extrude.js');load('vertex-pick-assist.js');
  const flush=()=>{while(queue.length)queue.shift()();};render();
  const canvas=fields.get('#viewport'),pointer=(type,extra={})=>dispatch(event(type,canvas,extra));
  const screen=v=>{const p=v.clone().project(camera);return{x:(p.x*.5+.5)*1000,y:(-p.y*.5+.5)*600};};
  return {context,fields,events,history,state,directions,canvas,pointer,screen,load,render,flush,
    owner:context.__boxlabVertexExtrude,session:context.__boxlabVertexViewportSession,ids:()=>ids,setIds:v=>{ids=v;},setMode:v=>{mode=v;},setLocked:v=>{locked=v;},
    click:s=>fields.get(s).click(),input:v=>{const el=fields.get('.vts-value');el.value=String(v);emit(el,event('input',el));},
    pull(id,dx=80,dy=0,type='pointerup',extra={}){const start=screen(state.mesh.vertices[id]);pointer('pointerdown',{clientX:start.x,clientY:start.y,...extra});pointer('pointermove',{clientX:start.x+dx,clientY:start.y+dy,...extra});pointer(type,{clientX:start.x+dx,clientY:start.y+dy,...extra});flush();},
    tap(id){const start=screen(state.mesh.vertices[id]);pointer('pointerdown',{clientX:start.x,clientY:start.y});pointer('pointerup',{clientX:start.x,clientY:start.y});flush();},
    background(){window.dispatchEvent(new context.CustomEvent('boxlab-viewport-background-tap'));},
    radial(){const button={disabled:false,textContent:'Extrude',dataset:{toolTarget:'#vertexExtrudeBtn'},classList:{contains:()=>false,toggle(){}},setAttribute(){},removeAttribute(){},getAttribute(){},closest:()=>({dataset:{ringMode:'vertex'}}),listeners:{},addEventListener(t,f){this.listeners[t]=f;}};
      Object.assign(context,{toolSectors:[button],currentMode:()=>mode,state:()=>state,root:{hidden:false},suspendedFaceTool:false,hubSuppressedKey:'',lastSelectionKey:'initial',selectionAvailable:()=>ids.length>0,selectionKey:()=>mode+ids.join(','),setHubState(){},gestureDebug(){}});
      const s=fs.readFileSync(new URL('../../src/total-gizmo.js',import.meta.url),'utf8');
      const a=s.indexOf('function syncContextToolAvailability(){'),b=s.indexOf('\nactivator?',a);vm.runInContext(s.slice(a,b),context);
      const x=s.indexOf('toolSectors.forEach(button=>{'),y=s.indexOf('\ntoolButtons.forEach',x);vm.runInContext(s.slice(x,y),context);
      button.listeners.click({preventDefault(){},stopPropagation(){}});flush();return button;
    }};
}
