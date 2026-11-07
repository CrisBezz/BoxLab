import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import {createPerformanceMonitor} from '../src/performance-core.js';

const read=path=>fs.readFileSync(new URL(path,import.meta.url),'utf8');

test('.1098 scene detail timings stay bounded, opt-in, resettable and separately counted',()=>{
 let clock=0,reads=0;
 const monitor=createPerformanceMonitor(()=>{reads++;return clock;});
 const inactiveStart=monitor.start();
 monitor.stage('scene-sync',inactiveStart);
 assert.equal(reads,0);
 monitor.setEnabled(true);
 for(const [name,duration] of [['scene-sync',2],['object-sync',4],['render-mode',10],['uv-preview',4],['paint-preview',3]]){
  const start=monitor.start();clock+=duration;monitor.stage(name,start);
 }
 for(let i=0;i<125;i++){const start=monitor.start();clock+=1;monitor.stage('render-mode',start);}
 const snapshot=monitor.snapshot();
 assert.equal(snapshot.stages['scene-sync'].meanMs,2);
 assert.equal(snapshot.stages['object-sync'].meanMs,4);
 assert.equal(snapshot.stages['uv-preview'].meanMs,4);
 assert.equal(snapshot.stages['paint-preview'].meanMs,3);
 assert.equal(snapshot.stages['render-mode'].samples,120);
 assert.equal(snapshot.stages['render-mode'].meanMs,1);
 monitor.reset();assert.deepEqual(monitor.snapshot().stages,{});
});

test('.1098 times the actual render-mode owner and nested preview builders without changing material flow',()=>{
 const source=read('../src/render-modes.js'),start=source.indexOf('function applyMode(body){'),end=source.indexOf('\nObject.assign(globalThis.__boxlabRenderModes',start);
 assert.ok(start>=0&&end>start);
 const applyMode=source.slice(start,end);
 let clock=0;
 const monitor=createPerformanceMonitor(()=>clock);
 const body={isMesh:true,userData:{kind:'body'},material:{},visible:true};
 const object={id:7,visible:true,settings:{},kind:'mesh',glbPassthrough:{source:'nomad'},colourPaint:{}};
 const manager={activeId:7,get objects(){clock+=4;return [object];}};
 const c={globalThis:null,mode:'studio',lastBody:null,__boxlabPerformance:monitor,
  manager:()=>manager,bridge:()=>({mesh:{}}),
  clearRenderChildren:()=>{clock+=3;},syncStudio:()=>{clock+=2;},
  studioMaterial:{name:'studio'},studioInactiveMaterial:{},clayMaterial:{},matcapMaterial:{},normalMaterial:{},normalInactiveMaterial:{},wireSurfaceMaterial:{},wireInactiveSurfaceMaterial:{},xrayMaterial:{},facegroupMaterial:{},
  frontOnly:value=>value,addBackface:()=>{clock+=1;},addWire(){},createUVImageOverlay:()=>{clock+=5;return{};},createUVCheckerOverlay:()=>null,createCommittedPaintSurface:()=>{clock+=7;},checkerHiddenMaterial:{},
  modeLabel:()=>'',THREE:{},
 };
 c.globalThis=c;vm.createContext(c);vm.runInContext(applyMode,c);monitor.setEnabled(true);
 c.applyMode(body);
 const snapshot=monitor.snapshot();
 assert.equal(body.material,c.studioMaterial);
 assert.equal(snapshot.stages['render-mode'].samples,1);
 assert.equal(snapshot.stages['render-mode'].meanMs,26);
 assert.equal(snapshot.stages['object-sync'].samples,2);
 assert.equal(snapshot.stages['object-sync'].meanMs,4);
 assert.equal(snapshot.stages['uv-preview'].meanMs,5);
 assert.equal(snapshot.stages['paint-preview'].meanMs,7);
});

test('.1098 records render-mode time when a preview builder throws and preserves the exception',()=>{
 const source=read('../src/render-modes.js'),start=source.indexOf('function applyMode(body){'),end=source.indexOf('\nObject.assign(globalThis.__boxlabRenderModes',start);
 const applyMode=source.slice(start,end);let clock=0;
 const monitor=createPerformanceMonitor(()=>clock);const body={isMesh:true,userData:{kind:'body'},material:{},visible:true};
 const error=new Error('preview failed');
 const c={globalThis:null,mode:'uvimage',__boxlabPerformance:monitor,
  manager:()=>({objects:[{id:1,settings:{}}],activeId:1}),bridge:()=>({mesh:{}}),clearRenderChildren(){},syncStudio(){},frontOnly:value=>value,addBackface(){},addWire(){},
  createUVImageOverlay:()=>{clock+=6;throw error;},createUVCheckerOverlay:()=>null,createCommittedPaintSurface(){},checkerHiddenMaterial:{},
  studioMaterial:{},studioInactiveMaterial:{},clayMaterial:{},matcapMaterial:{},normalMaterial:{},normalInactiveMaterial:{},wireSurfaceMaterial:{},wireInactiveSurfaceMaterial:{},xrayMaterial:{},facegroupMaterial:{},THREE:{},
 };c.globalThis=c;vm.createContext(c);vm.runInContext(applyMode,c);monitor.setEnabled(true);
 assert.throws(()=>c.applyMode(body),/preview failed/);
 assert.equal(monitor.snapshot().stages['uv-preview'].meanMs,6);
 assert.equal(monitor.snapshot().stages['render-mode'].meanMs,6);
});
