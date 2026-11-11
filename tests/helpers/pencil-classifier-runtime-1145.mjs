// REJECTED bounds experiment only. Never used by the app.
import fs from 'node:fs';import vm from 'node:vm';import * as THREE from 'three';
const source=fs.readFileSync(new URL('../fixtures/performance/pencil-bounds-rejected-1145.js',import.meta.url),'utf8');
export function pencilClassifierRuntime({mesh,camera,canvas,legacy=false,mode='face',edgeHit=null,isolated=false}={}){
 const state={mesh,camera},context={THREE,canvas,pointer:new THREE.Vector2(),raycaster:new THREE.Raycaster(),__boxlabBridgeState:state,isPenHover:event=>!!event.hover,selectionBridge:()=>({mode:()=>mode,pick:()=>edgeHit})};
 const text=legacy?fs.readFileSync(new URL('../fixtures/performance/pencil-classifier-1144.mjs',import.meta.url),'utf8').replace('export function','function'):source.slice(source.indexOf('  function pencilHitsEditableMesh(event) {'),source.indexOf('\n  function selectionBridge()'));
 if(isolated){vm.createContext(context);vm.runInContext(text,context);}
 else{
  // Compile the actual unchanged function in the native JS realm for timing:
  // vm global proxies make new Number/Array hot loops incomparable to native mesh methods.
  const compile=new Function('THREE','canvas','isPenHover','selectionBridge','globalThis',`const pointer=new THREE.Vector2(),raycaster=new THREE.Raycaster();${text};return {pencilHitsEditableMesh,pointer,raycaster};`);
  Object.assign(context,compile(THREE,canvas,context.isPenHover,context.selectionBridge,context));
 }
 return{pick:event=>context.pencilHitsEditableMesh({pointerType:'pen',...event}),state,context};
}
