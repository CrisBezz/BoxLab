// Synthetic fixtures by default. Optional user model stays local; only aggregate timings/counts are written.
import fs from 'node:fs';import assert from 'node:assert/strict';import {performance} from 'node:perf_hooks';
import {grid,cageHarness} from '../tests/helpers/cage-group-profile.mjs';
import {previewRuntime,loopReadRuntime} from '../tests/helpers/dense-edit-runtime.mjs';
const median=a=>[...a].sort((x,y)=>x-y)[Math.floor(a.length/2)];
const report={release:'.1116',baselineCommit:'732cfb0c',scope:'Node CPU; Loop pending-key reader, and complete original Face pointer-move controller + real main selection bridge. Preview render workload includes body triangulation, real cage/pickers and Multi save/history observer from existing harness; excludes other scene hooks, browser event delivery, snapping (synthetic Exact pointer), GPU and iPad. No raw model, geometry, selection IDs or image committed.',rows:[]};
const workloads=[{name:'synthetic-grid',mesh:grid(24),ids:Array.from({length:24},(_,i)=>i+24*11),repeats:5}];
if(process.argv[2]){
 const {glbOwnerRuntime}=await import('../tests/helpers/glb-owner-runtime.mjs');
 const bytes=fs.readFileSync(process.argv[2]),buffer=bytes.buffer.slice(bytes.byteOffset,bytes.byteOffset+bytes.byteLength),r=glbOwnerRuntime();await r.import(buffer);const mesh=r.added[0].mesh;
 const ys=[...new Set(mesh.vertices.map(p=>p.y))].sort((a,b)=>a-b),y=ys[Math.floor(ys.length/2)];
 const ids=mesh.faces.flatMap((f,i)=>f.some(v=>Math.abs(mesh.vertices[v].y-y)<1e-5)&&f.some(v=>mesh.vertices[v].y<y-1e-5)?[i]:[]);
 workloads.push({name:'private-upload-aggregate',mesh,ids,repeats:1});
}
for(const {name,mesh,ids,repeats} of workloads){
 const reads={before:[],after:[]},enumerations={};let expected;
 for(let i=0;i<repeats;i++)for(const legacy of i%2?[false,true]:[true,false]){
  const r=loopReadRuntime(mesh.clone(),{legacy});const start=performance.now(),keys=Array.from(r.read());reads[legacy?'before':'after'].push(performance.now()-start);enumerations[legacy?'before':'after']=r.counts();if(expected)assert.deepEqual(keys,expected);else expected=keys;r.restore();
 }
 const previews={before:[],after:[]},rebuilds={};
 for(let i=0;i<repeats+2;i++){
  let expectedPreview;
  for(const legacy of i%2?[false,true]:[true,false]){
   const live=mesh.clone(),r=previewRuntime(live,ids,{legacy,onRender:m=>{const copy=m.clone(),g=copy.triangulatedGeometry();g.dispose();const h=cageHarness({mesh:copy,mode:'face'});try{h.build();}finally{h.dispose();}}});
   assert.equal(r.begin(),true);const t=performance.now(),frames=r.preview(.05),elapsed=performance.now()-t;
   if(i>=2)previews[legacy?'before':'after'].push(elapsed);rebuilds[legacy?'before':'after']=frames.length;
   if(expectedPreview)assert.equal(frames.at(-1),expectedPreview);else expectedPreview=frames.at(-1);
  }
 }
 const row={workload:name,vertices:mesh.vertices.length,faces:mesh.faces.length,selectedBandFaces:ids.length,loopSamplesMs:reads,loopMedianMs:{before:median(reads.before),after:median(reads.after)},loopEdgeEnumerations:enumerations,previewSamplesMs:previews,previewMedianMs:{before:median(previews.before),after:median(previews.after)},sceneRebuildsPerPreview:rebuilds,correctness:'Exact key arrays and final rendered mesh snapshots match'};report.rows.push(row);console.log(JSON.stringify(row));
}
fs.writeFileSync(new URL('../docs/performance-dense-edit-1116.json',import.meta.url),JSON.stringify(report,null,2)+'\n');
