import fs from 'node:fs';
import vm from 'node:vm';
import {makePrimitive,primitiveDensity} from '../../src/primitive-factory.js';
import {fitAddObjectToUnitCube} from '../../src/add-object-fit.js';
import {makeTextObject} from '../../src/text-object-core.js';
import {booleanSceneRuntime} from './boolean-scene-runtime.mjs';
const source=fs.readFileSync(new URL('../../src/primitive-ui.js',import.meta.url),'utf8');
const font=JSON.parse(fs.readFileSync(new URL('../../src/fonts/helvetiker_regular.typeface.json',import.meta.url),'utf8'));
// Actual Add controller, factory, font and Object history. DOM/layout/picking and
// manager are controlled doubles; no whole-app browser/touch claim.
export function addObjectRuntime({deferred=false,fontOK=true}={}){
 const scene=booleanSceneRuntime(),c=scene.c,events=[],draws=[];
 function element(tag='div'){
  const e={tagName:tag.toUpperCase(),children:[],dataset:{},style:{},listeners:new Map(),attributes:{},disabled:false,value:'',textContent:'',
   append(...nodes){for(const n of nodes){n.remove();n.parentElement=this;this.children.push(n);}},
   remove(){if(this.parentElement){const a=this.parentElement.children;a.splice(a.indexOf(this),1);this.parentElement=null;}},
   contains(n){return n===this||this.children.some(child=>child.contains(n));},
   setAttribute(k,v){this.attributes[k]=v;},addEventListener(t,f){if(!this.listeners.has(t))this.listeners.set(t,[]);this.listeners.get(t).push(f);},
   dispatchEvent(ev){ev.target??=this;for(const f of this.listeners.get(ev.type)||[])f(ev);},
   getBoundingClientRect:()=>({left:10,bottom:30}),focus(){},select(){}
  };if(tag==='canvas'){let path=[];const ctx={setTransform(){},clearRect(){draws.push({clear:true});},beginPath(){path=[];},moveTo(x,y){path.push([x,y]);},lineTo(x,y){path.push([x,y]);},closePath(){},fill(){draws.push({path:[...path]});},stroke(){}};e.getContext=()=>ctx;e.clientWidth=320;let capture=null;e.setPointerCapture=id=>capture=id;e.hasPointerCapture=id=>capture===id;e.releasePointerCapture=()=>capture=null;}e.click=()=>{if(!e.disabled)e.dispatchEvent({type:'click',preventDefault(){},stopPropagation(){},stopImmediatePropagation(){}});};return e;
 }
 const body=element(),wrap=element(),add=element('button'),status=element();body.append(wrap,add,status);
 const doc=element(),win=element();doc.body=body;doc.createElement=element;doc.querySelector=s=>({'#viewportWrap':wrap,'#outlinerAddBtn':add,'#selectionStatus':status}[s]||null);
 let resolve;const pending=new Promise(r=>resolve=r),response={ok:fontOK,json:async()=>font};
 Object.assign(c,{document:doc,window:win,makePrimitive,primitiveDensity,makeTextObject,fitAddObjectToUnitCube,
  placeToolSessionPanel:p=>{p.style.left='50%';p.style.top='12px';},
  fetch:()=>deferred?pending:Promise.resolve(response),Event:class{constructor(type){this.type=type;}},CustomEvent:class{constructor(type){this.type=type;}},
  __boxlabObjectSelection:{single(id){c.selectedIds=new Set([id]);}}
 });win.innerWidth=1024;win.innerHeight=768;win.dispatchEvent=ev=>events.push(ev.type);
 vm.runInContext(fs.readFileSync(new URL('../../src/add-object-preview.js',import.meta.url),'utf8').replace('export function','function')+';globalThis.createAddObjectPreview=createAddObjectPreview;',c);
 vm.runInContext('{'+source.replace(/^import .*;\n/gm,'').replace("new URL('./fonts/helvetiker_regular.typeface.json?v=0.36.18.771',import.meta.url)","'font.json'")+'}',c);
 const all=()=>{const nodes=[];function walk(n){nodes.push(n);n.children.forEach(walk);}walk(body);return nodes;};
 const find=fn=>all().find(fn),click=text=>{const b=find(n=>n.tagName==='BUTTON'&&n.textContent===text);if(!b)throw new Error('Missing button '+text);b.click();};
 return{...scene,body,wrap,add,status,events,draws,find,click,open:type=>{add.click();click(type);},
  panel:()=>find(n=>n.id==='primitiveAddPanel'),input:(name,value)=>{const n=find(n=>n.dataset.addSetting===name);n.value=String(value);n.dispatchEvent({type:'input'});},
  action:name=>find(n=>n.dataset.addAction===name),readout:()=>find(n=>n.attributes.role==='status')?.textContent,
  resolve:()=>resolve(response),flush:async()=>{for(let i=0;i<6;i++)await Promise.resolve();},escape:()=>doc.dispatchEvent({type:'keydown',key:'Escape'}),outside:()=>doc.dispatchEvent({type:'pointerdown',target:body})};
}
