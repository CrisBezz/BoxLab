import fs from 'node:fs';
import vm from 'node:vm';
import * as THREE from 'three';
import {History} from '../../src/history.js';
// Whole Knife owner, real camera/raycaster and editable kernels. DOM/capture only
// are doubles; no substituted endpoints in the gesture/commit checks.
export function knifeScreenRuntime(mesh,camera,{inference=false,width=800,height=800,left=37,top=61}={}){
 const nodes=new Map(),doc=new Map(),win=new Map(),captures=new Set(),markers=new Set(),events=[];let locked=false,mode='face';
 const listen=(map,t,f)=>{if(!map.has(t))map.set(t,[]);map.get(t).push(f)};
 const emit=(map,event)=>{events.push(event);for(const f of map.get(event.type)||[])f(event)};
 const node=s=>{if(!nodes.has(s))nodes.set(s,{checked:false,classList:{add(){},remove(){},contains:()=>s==='#app'&&locked},listeners:new Map(),addEventListener(t,f){this.listeners.set(t,f)},dispatchEvent(){},setPointerCapture:id=>captures.add(id),releasePointerCapture:id=>captures.delete(id),getBoundingClientRect:()=>({left,top,width,height}),remove(){},style:{}});return nodes.get(s)};
 node('#inferenceSnapToggle').checked=inference;
 const ctx={THREE,Map,Set,Event:class{},CustomEvent:class{constructor(type,options){Object.assign(this,{type,...options})}},document:{querySelector:node,querySelectorAll:()=>[],addEventListener:(t,f)=>listen(doc,t,f),dispatchEvent:e=>emit(doc,e),createElement:()=>{const el={style:{},remove:()=>markers.delete(el)};return el},body:{appendChild:el=>markers.add(el)}},window:{addEventListener:(t,f)=>listen(win,t,f),dispatchEvent:e=>emit(win,e)},__boxlabBridgeState:{mesh,camera},__boxlabHistory:new History(),__boxlabObjectManager:{activeId:1},__boxlabSelectionBridge:{mode:()=>mode,set:next=>mode=next}};
 vm.runInNewContext(fs.readFileSync(new URL('../../src/knife-tool.js',import.meta.url),'utf8').replace(/^import .*;\n/gm,'')+'\nglobalThis.testKnifeScreen={boundary:freeBoundaryPoint,endpoint:endpointFor,screen:screenPoint};',ctx);
 const screen=v=>ctx.testKnifeScreen.screen(v,camera);
 const point=(a,b,t)=>{const world=mesh.vertices[a].clone().lerp(mesh.vertices[b],t);return {...screen(world),world}};
 const pointer=(type,p)=>node('#viewport').listeners.get(type)({type,target:node('#viewport'),pointerId:1,isPrimary:true,pointerType:'pen',pressure:.5,clientX:p.x,clientY:p.y,preventDefault(){},stopImmediatePropagation(){}});
 const arm=()=>node('#knifeBtn').listeners.get('click')({preventDefault(){},stopImmediatePropagation(){}});
 return{ctx,node,screen,point,pointer,arm,captures,markers,events,setLocked:value=>locked=value,setMode:value=>mode=value,emitWindow:(type,detail={})=>emit(win,{type,...detail}),emitDocument:(type,detail)=>emit(doc,{type,detail}),boundary:(fi,p,allowMid=true)=>ctx.testKnifeScreen.boundary(fi,p.x,p.y,allowMid),endpoint:(fi,start,p)=>ctx.testKnifeScreen.endpoint(fi,start,{clientX:p.x,clientY:p.y})};
}
