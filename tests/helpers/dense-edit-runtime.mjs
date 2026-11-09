import fs from 'node:fs';import vm from 'node:vm';
import {faceRuntime,snapshot} from './negative-extrude-runtime.mjs';
const read=p=>fs.readFileSync(new URL(p,import.meta.url),'utf8');
const main=read('../../src/main.js'),oldDirect=read('../fixtures/performance/multi-face-direct-1115.js');
const line=name=>{const start=main.indexOf('function '+name+'(');return main.slice(start,main.indexOf('\n',start));};
export function previewRuntime(mesh,ids,{legacy=false,onRender=()=>{}}={}){
 const r=faceRuntime(mesh,ids,{sourceTransform:s=>legacy?oldDirect:s});let renders=[];
 const c=r.context,prior=c.__boxlabSelectionBridge;
 Object.assign(c,{selectionMode:'face',selection:{type:'face',index:ids.at(-1),indices:[...ids]},renderMesh:()=>{renders.push(snapshot(mesh));onRender(mesh);}});
 vm.runInContext(['selectionIndices','selectionHas','makeSelection'].map(line).join('\n')+'\n'+main.split('\n').find(s=>s.startsWith('globalThis.__boxlabSelectionBridge=')),c);
 c.__boxlabSelectionBridge.pick=prior.pick;
 c.document.querySelector('#cageToggle').dispatchEvent=()=>c.renderMesh();
 r.owner.setTool('extrude');
 return {...r,begin(){return r.owner.begin({pointerId:9876,clientX:400,clientY:300},ids[0],ids,ids);},preview(distance){const d=r.owner.drag();d.changed=true;renders=[];r.pointer('pointermove',{pointerId:9876,clientX:d.x+d.normal.x*distance/.006,clientY:d.y+d.normal.y*distance/.006});return [...renders];},finish(type='pointerup'){r.pointer(type,{pointerId:9876});},selection:()=>Array.from(c.__boxlabSelectionBridge.indices()),renderCount:()=>renders.length};
}
export function loopReadRuntime(mesh,{legacy=false,yellowEvery=7}={}){
 const source=read(legacy?'../fixtures/performance/loop-cut-commit-1115.js':'../../src/loop-cut-commit.js');
 const edges=mesh.edges(),edgeObjects=new Map(edges.map((_,i)=>[i,{userData:{cageMaterial:{color:{getHex:()=>i%yellowEvery===0?0xffe14a:0x62d8ff}}}}]));
 let enumerations=0;const original=mesh.edges;mesh.edges=function(){enumerations++;return original.call(this);};
 const c={Map,Set,YELLOW:0xffe14a,__boxlabBridgeState:{mesh,edgeObjects}};vm.createContext(c);const start=source.indexOf('function state()'),end=source.indexOf('\nfunction commitLoop(');vm.runInContext(source.slice(start,end),c);
 return {read:()=>c.currentYellowEdgeKeys(),counts:()=>enumerations,reset(){enumerations=0;mesh.edges=function(){enumerations++;return original.call(this);};},restore(){mesh.edges=original;},edgeObjects,source};
}
