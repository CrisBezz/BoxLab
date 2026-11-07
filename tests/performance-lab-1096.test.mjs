import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import {EditableMesh} from '../src/mesh.js?v=0.12';
import {denseFixture,meshFingerprint,latencyStats,runDenseBenchmark,compareBaseline} from '../src/performance-lab-core.js';
test('1096 versioned dense fixtures have stable shared geometry and exact counts',()=>{
 const a=denseFixture(10000),b=denseFixture(10000);
 assert.equal(a.faces.length,10000);assert.equal(a.vertices.length,5151);assert.equal(meshFingerprint(a),meshFingerprint(b));
 assert.notEqual(meshFingerprint(a),meshFingerprint(denseFixture(50000)));
 assert.throws(()=>denseFixture(123));
 const g=a.triangulatedGeometry();assert.equal(g.getAttribute('position').count,30000);g.dispose();
});
test('1096 real body benchmark warms up twice, measures five times, disposes all outputs and never edits source',async()=>{
 const original=EditableMesh.prototype.triangulatedGeometry;let calls=0,disposed=0,clock=0;
 EditableMesh.prototype.triangulatedGeometry=function(){calls++;const hash=meshFingerprint(this),g=original.call(this);assert.equal(meshFingerprint(this),hash);g.addEventListener('dispose',()=>disposed++);return g;};
 try{
  const report=await runDenseBenchmark({release:'test',now:()=>{clock+=2;return clock;},yieldFrame:async()=>{}});
  assert.equal(calls,7);assert.equal(disposed,7);assert.deepEqual(report.samplesMs,[2,2,2,2,2]);assert.equal(report.metrics.medianMs,2);assert.equal(report.memory.renderAttributeBytes,10000*3*3*4*2);assert.equal(report.decision,'INCONCLUSIVE');assert.equal(report.correctness.passed,true);
  assert.equal(compareBaseline(report,report).medianReductionPercent,0);
  assert.equal(compareBaseline(report,{...report,environment:{other:true}}).comparable,false);
  assert.equal(compareBaseline(report,{...report,correctness:{outputHash:'bad'}}).comparable,false);
 }finally{EditableMesh.prototype.triangulatedGeometry=original;}
});
test('1096 cancellation and changing output cannot produce a successful report; output disposed on error',async()=>{
 let stop=false;await assert.rejects(runDenseBenchmark({yieldFrame:async()=>{stop=true;},cancelled:()=>stop}),/cancelled/);
 const original=EditableMesh.prototype.triangulatedGeometry;let calls=0,disposed=0;
 EditableMesh.prototype.triangulatedGeometry=function(){const g=original.call(this);g.getAttribute('position').array[0]=calls++;g.addEventListener('dispose',()=>disposed++);return g;};
 try{await assert.rejects(runDenseBenchmark({yieldFrame:async()=>{}}),/changed/);assert.equal(disposed,2);}finally{EditableMesh.prototype.triangulatedGeometry=original;}
});
test('1096 timing statistics preserve raw samples and reject invalid values',()=>{
 const s=[5,1,4,2,3];assert.deepEqual(latencyStats(s),{medianMs:3,p95Ms:5,minMs:1,maxMs:5});assert.deepEqual(s,[5,1,4,2,3]);assert.throws(()=>latencyStats([NaN]));assert.throws(()=>latencyStats([]));
});
test('1096 actual lab UI keeps reports local, exports JSON, and handles close and storage failure',async()=>{
 class Element{constructor(tag){this.tag=tag;this.children=[];this.style={};this.events={};this.isConnected=true;this.value='10000';}append(...a){this.children.push(...a);}setAttribute(){}addEventListener(n,f){this.events[n]=f;}click(){return this.events.click?.();}}
 let written=null,download=null,revoked=null;
 const panel=new Element('section'),report=await runDenseBenchmark({release:'test',yieldFrame:async()=>{}});
 const context={LAB_SIZES:[10000,50000,100000],compareBaseline,runDenseBenchmark:async options=>{if(options.cancelled())throw Error('cancelled');return structuredClone(report);},document:{createElement:tag=>new Element(tag),querySelector:()=>({dataset:{releaseVersion:'test'}}),visibilityState:'visible'},navigator:{userAgent:'test'},devicePixelRatio:2,innerWidth:1366,innerHeight:886,localStorage:{getItem:()=>null,setItem:(k,v)=>{written=JSON.parse(v);}},Blob:class{constructor(parts){download=JSON.parse(parts[0]);}},URL:{createObjectURL:()=> 'blob:test',revokeObjectURL:x=>{revoked=x;}},setTimeout:f=>f()};
 vm.createContext(context);vm.runInContext(fs.readFileSync(new URL('../src/performance-lab-ui.js',import.meta.url),'utf8').replace(/^import[^\n]*\n/,'').replace('export function','function')+'\nthis.install=installPerformanceLab;',context);
 context.install(panel,{snapshot:()=>({})});const section=panel.children[0],byLabel=s=>section.children.find(x=>x.textContent===s),run=byLabel('Run baseline'),keep=byLabel('Keep as baseline'),save=byLabel('Download JSON');
 assert.equal(save.disabled,true);await run.click();assert.equal(save.disabled,false);keep.click();save.click();assert.equal(written.protocol,'dense-body-v1');assert.equal(download.release,'test');assert.equal(revoked,'blob:test');byLabel('Download viewport report').click();assert.equal(download.protocol,'viewport-snapshot-v1');
 context.localStorage.setItem=()=>{throw Error('blocked');};keep.click();assert.match(section.children.at(-1).textContent,/Storage unavailable/);
 panel.isConnected=false;await run.click();assert.equal(save.disabled,true);assert.match(section.children.at(-1).textContent,/cancelled/);
});
