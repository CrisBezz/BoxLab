import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import * as THREE from 'three';
const read=name=>fs.readFileSync(new URL('../'+name,import.meta.url),'utf8');
test('999 startup, same-size settling and mode/lifecycle callbacks allocate one drawing buffer; genuine resize/DPR allocate once each',()=>{
 const source=read('src/main.js'),camera=new THREE.PerspectiveCamera(),position=camera.position.clone(),sizes=[];
 let w=300,h=150,dpr=1,updates=0;
 const context={THREE,camera,window:{devicePixelRatio:2},wrap:{clientWidth:1366,clientHeight:826},renderer:{
  getSize:v=>v.set(w,h),getPixelRatio:()=>dpr,
  setDrawingBufferSize:(x,y,ratio)=>{w=x;h=y;dpr=ratio;sizes.push([x,y,ratio]);}
 },updateScreenSpaceSelection:()=>updates++};
 vm.createContext(context);vm.runInContext(source.slice(source.indexOf('function resize('),source.indexOf('function setPointer(')),context);
 context.resize();for(let i=0;i<20;i++)context.resize();assert.deepEqual(sizes,[[1366,826,2]]);
 context.resize(1366,886,2);context.resize(1366,886,2);context.resize(1366,886,1);
 assert.deepEqual(sizes,[[1366,826,2],[1366,886,2],[1366,886,1]]);
 for(const args of [[0,886,2],[1366,0,2],[NaN,826,2],[1366,826,Infinity]])context.resize(...args);
 assert.equal(sizes.length,3);assert(camera.position.equals(position));assert.equal(camera.aspect,1366/886);assert.equal(updates,24);
 assert.doesNotMatch(source,/renderer\.setPixelRatio\(/);
});
test('999 retired atmosphere hook removes legacy surface without recreating DOM, listeners or timers',()=>{
 const source=read('src/studio-atmosphere.js');let removals=0;
 const context={document:{querySelector:selector=>{assert.equal(selector,'#boxlabStudioAtmosphere');return {remove(){removals++;}};}}};
 vm.createContext(context);vm.runInContext(source,context);
 assert.equal(context.__boxlabStudioAtmosphere.enabled,false);assert.equal(removals,1);
 context.__boxlabStudioAtmosphere.sync();assert.equal(removals,2);
 assert.doesNotMatch(source,/createElement|setTimeout|requestAnimationFrame|addEventListener|mix-blend-mode/);
});
