import fs from 'node:fs';
import vm from 'node:vm';
import * as THREE from 'three';
import {EditableMesh} from '../../src/mesh.js';
import {History} from '../../src/history.js';
import {planThrough,buildThrough,firstThroughContact,buildNegativeExtrude} from '../../src/through-kernel.js';
import {gateClosedEdit,topologySummary} from '../../src/topology-seam-conformance.js';

export const bands=[3,5,8,10];
export function uploadedFixture({before=false}={}){
  const vertices=[],faces=[];
  for(const line of fs.readFileSync(new URL('../fixtures/negative-extrude-742.obj',import.meta.url),'utf8').split('\n')){
    const fields=line.trim().split(/\s+/);
    if(fields[0]==='v')vertices.push(fields.slice(1).map(Number));
    if(fields[0]==='f')faces.push(fields.slice(1).map(value=>Number(value)-1));
  }
  if(!before)return new EditableMesh(vertices,faces);
  // User supplied the already extruded mesh. Recover its pre-extrusion cage from
  // the original sidewall endpoints, not from a guessed screenshot dimension.
  const m=new EditableMesh(vertices.slice(0,22),faces.slice(0,13));
  bands.forEach((fi,i)=>{m.faces[fi]=faces[13+i*4].slice(0,2).concat(faces[15+i*4].slice(0,2));});
  return m;
}
export const snapshot=m=>JSON.stringify({vertices:m.vertices,faces:m.faces,creases:[...m.creases],groups:m.faceGroups,looseEdges:[...(m.looseEdges||[])],looseVertices:[...(m.looseVertices||[])]});
export function volume(m){let total=0;for(const face of m.faces)for(let i=1;i<face.length-1;i++)total+=m.vertices[face[0]].dot(m.vertices[face[i]].clone().cross(m.vertices[face[i+1]]))/6;return total;}

export function faceRuntime(m,ids,{fallback=false}={}){
  const documentHandlers=new Map(),windowHandlers=new Map(),events=[],elements=new Map();
  const element=()=>({classList:{contains:()=>false,toggle(){},remove(){}},dispatchEvent(){},getBoundingClientRect:()=>({left:0,top:0,width:900,height:600}),setPointerCapture(){},hasPointerCapture:()=>false});
  const get=selector=>{if(!elements.has(selector))elements.set(selector,element());return elements.get(selector);};
  const camera=new THREE.PerspectiveCamera(45,1.5,.1,100);camera.position.set(5,3,5);camera.lookAt(0,0,0);camera.updateMatrixWorld();
  let selected=[...ids];const state={mesh:m,camera},history=new History();
  const add=(map,type,fn)=>{if(!map.has(type))map.set(type,[]);map.get(type).push(fn);};
  const document={querySelector:get,querySelectorAll:()=>[],addEventListener:(t,f)=>add(documentHandlers,t,f),dispatchEvent:e=>{events.push(e);for(const fn of documentHandlers.get(e.type)||[])fn(e);}};
  const window={addEventListener:(t,f)=>add(windowHandlers,t,f)};
  const bridge={mode:()=> 'face',indices:()=>selected,pick:()=>({index:selected[0]}),set:(mode,next)=>{selected=[...next];}};
  const context={THREE,document,window,planThrough,buildThrough,firstThroughContact,buildNegativeExtrude,gateClosedEdit,topologySummary,queueMicrotask,Event,
    CustomEvent:class{constructor(type,{detail}={}){this.type=type;this.detail=detail;}},
    __boxlabBridgeState:state,__boxlabSelectionBridge:bridge,__boxlabHistory:history};
  vm.createContext(context);
  const source=fs.readFileSync(new URL('../../src/multi-face-direct.js',import.meta.url),'utf8').replace(/^import .*;\n/gm,'');
  vm.runInContext(source+"\n globalThis.testOwner={begin:beginDirectDrag,finish,setTool:tool=>{armed=tool;},drag:()=>drag};",context);
  const owner=context.testOwner;
  const event=(type,x=400,y=300)=>({type,target:get('#viewport'),pointerId:22,isPrimary:true,clientX:x,clientY:y,preventDefault(){},stopImmediatePropagation(){}});
  const pointerDispatch=e=>{
    e.target=get('#viewport');e.stopped=false;e.preventDefault=()=>{};e.stopImmediatePropagation=()=>{e.stopped=true;};
    for(const fn of windowHandlers.get(e.type)||[]){fn(e);if(e.stopped)return;}
    for(const fn of documentHandlers.get(e.type)||[]){fn(e);if(e.stopped)return;}
  };
  if(fallback){
    get('#extrudeBtn').classList.contains=()=>context.__boxlabFaceDirect.tool()==='extrude';
    get('#viewport').dispatchEvent=pointerDispatch;
    context.PointerEvent=class{constructor(type,props){this.type=type;Object.assign(this,props);}};
    const fallbackSource=fs.readFileSync(new URL('../../src/sequential-through-fallback.js',import.meta.url),'utf8').replace(/^import .*;\n/gm,'');
    vm.runInContext('(function(){'+fallbackSource+'\n})()',context);
  }
  return {history,state,events,selected:()=>selected,api:context.__boxlabFaceDirect,owner,
    physicalCut(distance,type='pointerup'){
      owner.setTool('extrude');pointerDispatch(event('pointerdown'));
      const normal=context.projectedNormal(m,{normal:m.faceNormal(ids[0]),regionVertices:m.faces[ids[0]]},camera),sign=Math.sign(distance),x=400+normal.x*9*sign,y=300+normal.y*9*sign;
      pointerDispatch(event('pointermove',x,y));
      pointerDispatch(event('pointermove',x+normal.x*distance/.006,y+normal.y*distance/.006));
      pointerDispatch(event(type));
    },
    smallPhysicalMove(){owner.setTool('extrude');document.dispatchEvent(event('pointerdown'));document.dispatchEvent(event('pointermove',404,303));},
    start(){owner.setTool('extrude');return owner.begin(event('pointerdown'),ids[0],ids,ids);},
    move(distance){const d=owner.drag(),e=event('pointermove',400+d.normal.x*distance/.006,300+d.normal.y*distance/.006);for(const fn of documentHandlers.get('pointermove')||[])fn(e);},
    finish(type='pointerup'){owner.finish(event(type));},
    exact(distance){
      owner.setTool('extrude');
      const down=event('pointerdown');down.pointerId=9876;document.dispatchEvent(down);
      const normal=context.projectedNormal(m,{normal:m.faceNormal(ids[0]),regionVertices:m.faces[ids[0]]},camera);
      const move=event('pointermove',400+normal.x*distance/.006,300+normal.y*distance/.006);move.pointerId=9876;document.dispatchEvent(move);
      const up=event('pointerup');up.pointerId=9876;for(const fn of windowHandlers.get('pointerup')||[])fn(up);
    }};
}
