// Exact .1113 inspectors versus current production modules, identical meshes and interleaved CPU timing.
import fs from 'node:fs';import assert from 'node:assert/strict';import {performance} from 'node:perf_hooks';
import {EditableMesh} from '../src/mesh.js';
import {inspectors,inspectorRuntime,plain} from '../tests/helpers/vertex-inspector-runtime.mjs';
function grid(w,h){const v=[],f=[];for(let y=0;y<=h;y++)for(let x=0;x<=w;x++)v.push([x,y,0]);for(let y=0;y<h;y++)for(let x=0;x<w;x++){const i=y*(w+1)+x;f.push([i,i+1,i+w+2,i+w+1]);}return new EditableMesh(v,f);}
const median=a=>[...a].sort((x,y)=>x-y)[Math.floor(a.length/2)];
const report={release:'.1114',baselineCommit:'ab3a40bce743d82f0ef2fcf571521ea66cb6e543',scope:'Node CPU, complete original production inspect functions. Includes fresh incidence construction per call. No cache reuse, GPU, full app event chain or iPad latency measurement; no capacity claim.',repeats:5,warmups:2,rows:[]};
for(const [w,h] of [[40,25],[50,40]])for(const [name] of inspectors){
 const mesh=grid(w,h),old=inspectorRuntime(name,mesh,true).api.inspect,current=inspectorRuntime(name,mesh).api.inspect;
 for(let i=0;i<2;i++){old(mesh);current(mesh);}
 const before=[],after=[];
 for(let i=0;i<5;i++){
  for(const which of i%2?['current','old']:['old','current']){const fn=which==='old'?old:current,t=performance.now(),value=fn(mesh);(which==='old'?before:after).push(performance.now()-t);assert.deepEqual(plain(value),plain((which==='old'?current:old)(mesh)));}
 }
 report.rows.push({inspector:name,faces:mesh.faces.length,vertices:mesh.vertices.length,beforeMs:before,afterMs:after,beforeMedianMs:median(before),afterMedianMs:median(after),classificationParity:true});
}
fs.writeFileSync(new URL('../docs/performance-vertex-inspection-1114.json',import.meta.url),JSON.stringify(report,null,2)+'\n');
for(const r of report.rows)console.log(`${r.inspector} ${r.faces} faces: ${r.beforeMedianMs.toFixed(2)} -> ${r.afterMedianMs.toFixed(2)} ms; parity PASS`);
