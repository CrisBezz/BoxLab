import fs from 'node:fs';
import vm from 'node:vm';
import {appendStrokePoint,simplifyStroke} from '../../src/stroke-sampling.js';
import {curvePoints,makeCurveProfile,editableCurveProfile} from '../../src/curve-profile-core.js';
import {editableBooleanRuntime} from './editable-boolean-runtime.mjs';
import {orderedDOM} from './ordered-dom.mjs';
export function curveProfileUIRuntime(){
 const r=editableBooleanRuntime(),c=r.c,dom=orderedDOM(),doc=dom.node(),win=dom.node(),wrap=dom.node('viewportWrap'),host=dom.node(),head=dom.node();let current=null;
 function node(tag){const n=dom.node();n.dataset={};n.attributes={};n.setAttribute=(k,v)=>n.attributes[k]=v;n.getBoundingClientRect=()=>({left:0,top:0,width:320,height:180});n.setPointerCapture=id=>n.capture=id;n.releasePointerCapture=()=>n.capture=null;
 n.replaceChildren=(...children)=>{for(const child of [...n.children])child.remove();n.append(...children);};
 n.querySelector=s=>find(n,x=>s.startsWith('[data-curve-action')?x.dataset?.curveAction===s.match(/="([^"]+)"/)[1]:s.startsWith('#')?x.id===s.slice(1):false);
 Object.defineProperty(n,'firstChild',{get:()=>n.children[0]});n.click=()=>{if(!n.disabled)n.dispatchEvent({type:'click'});};return n;
 }
 function find(n,fn){if(fn(n))return n;for(const child of n.children){const match=find(child,fn);if(match)return match;}return null;}
 doc.createElement=node;doc.createElementNS=(ns,tag)=>node(tag);doc.head=head;doc.querySelector=s=>s==='#viewportWrap'?wrap:null;doc.addEventListener=()=>{};
 const session={current:()=>current,begin(value){current=value;host.append(value.node);},end(id){if(current?.id===id){wrap.append(current.node);current=null;}}};
 Object.assign(c,{document:doc,window:win,appendStrokePoint,simplifyStroke,curvePoints,makeCurveProfile,editableCurveProfile,structuredClone,
 CustomEvent:class{constructor(type,options){this.type=type;this.detail=options?.detail;}},__boxlabToolSession:session,__boxlabObjectRadialSession:{cancelCurrent:()=>false},__boxlabObjectSelection:{single(id){c.selectedIds=new Set([id]);}}});
 vm.runInContext(fs.readFileSync(new URL('../../src/add-object-preview.js',import.meta.url),'utf8').replace(/^export /gm,''),c);
 vm.runInContext('(function(){'+fs.readFileSync(new URL('../../src/curve-profile-ui.js',import.meta.url),'utf8').replace(/^import .*;\n/gm,'')+'})()',c);
 const api=c.__boxlabCurveProfile;
 return {r,c,api,wrap,host,current:()=>current,find:fn=>find(host,fn)||find(wrap,fn),button:action=>find(host,n=>n.dataset?.curveAction===action),
 pointer(type,x,y,extra={}){const pad=find(host,n=>n.id==='curveProfilePad');pad.dispatchEvent({type,isPrimary:true,pointerType:'pen',pointerId:1,button:0,clientX:x,clientY:y,preventDefault(){},stopImmediatePropagation(){},...extra});},draw(){this.pointer('pointerdown',40,130);for(const [x,y] of [[70,40],[180,20],[270,100],[200,150],[45,133]])this.pointer('pointermove',x,y);this.pointer('pointerup',45,133);}};
}
