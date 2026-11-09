import fs from 'node:fs';import assert from 'node:assert/strict';import {performance} from 'node:perf_hooks';
import {looseRuntime,plain} from '../tests/helpers/loose-inspector-runtime.mjs';
const median=a=>[...a].sort((x,y)=>x-y)[Math.floor(a.length/2)];
const report={release:'.1115',baselineCommit:'0ff80afde6c110c337ea657ec702257cfc623e15',scope:'Node CPU, complete original inspect calls including scene traversal, marker sorting and fresh axis index. Vertex-mode markers; manager snapshot/history synchronization unchanged and excluded. No full app, iPad latency, GPU, WASM or capacity claim. Dense coincident/one-axis-degenerate distributions can retain worst-case quadratic work.',warmups:2,repeats:5,rows:[]};
for(const [w,h] of [[40,25],[64,64]]){
 const vertices=Array.from({length:w*h},(_,i)=>({x:i%w,y:Math.floor(i/w),z:0})),faces=Array.from({length:Math.floor(vertices.length/3)},(_,i)=>[i*3,i*3+1,i*3+2]),mesh={vertices,faces},markers=vertices.map((p,index)=>({index,...p}));
 const old=looseRuntime(mesh,markers,{legacy:true}),current=looseRuntime(mesh,markers),before=[],after=[];
 for(let i=0;i<2;i++){old.api.inspect(mesh);current.api.inspect(mesh);}
 for(let i=0;i<5;i++){
  let expected;
  for(const which of i%2?['current','old']:['old','current']){
   const r=which==='old'?old:current;r.resetCounts();const t=performance.now(),value=r.api.inspect(mesh),ms=performance.now()-t;
   (which==='old'?before:after).push(ms);if(expected)assert.deepEqual(plain(value),expected);else expected=plain(value);
  }
 }
 report.rows.push({markers:markers.length,snapshotFaceVertices:faces.length*3,beforeMs:before,afterMs:after,beforeMedianMs:median(before),afterMedianMs:median(after),beforeDistanceChecks:old.counts().distanceChecks,afterDistanceChecks:current.counts().distanceChecks,exactReportParity:true});
}
fs.writeFileSync(new URL('../docs/performance-loose-inspection-1115.json',import.meta.url),JSON.stringify(report,null,2)+'\n');
for(const r of report.rows)console.log(`${r.markers} markers: ${r.beforeMedianMs.toFixed(2)} -> ${r.afterMedianMs.toFixed(2)} ms; ${r.beforeDistanceChecks} -> ${r.afterDistanceChecks} distance checks; report parity PASS`);
