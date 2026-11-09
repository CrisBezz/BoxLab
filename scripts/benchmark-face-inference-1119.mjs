import fs from 'node:fs';import assert from 'node:assert/strict';import {performance} from 'node:perf_hooks';
import {grid} from '../tests/helpers/cage-group-profile.mjs';import {inferenceRuntime,referenceSignature} from '../tests/helpers/face-inference-runtime.mjs';
const median=a=>[...a].sort((x,y)=>x-y)[Math.floor(a.length/2)];
const report={release:'.1119',baseline:'Exact inference functions from .1118 commit8218a63b1a5594fd338e23601e8220b6dc0fb596',scope:'Synthetic grids, complete original physical pointer inference call with an Edge reference. Two warmups, ten alternating paired repetitions. Includes fresh projection array, edge enumeration and original nearest-reference maths. Stub bounds getter has no browser layout cost. Excludes render/history/event delivery/GPU/iPad; not a native speedup or capacity claim.',rows:[]};
for(const n of [24,48,96]){
 const mesh=grid(n),rs=[true,false].map(legacy=>inferenceRuntime(mesh.clone(),[],{legacy}));
 for(const r of rs){r.state.camera.position.set(n/2,n*1.5,n/2);r.state.camera.lookAt(n/2,0,n/2);r.state.camera.updateMatrixWorld();r.rect.width=n*400;r.rect.height=n*300;}
 const point=mesh.vertices[0].clone().lerp(mesh.vertices[1],.5),q=rs[0].context.screenPoint(point,rs[0].state.camera),event={clientX:q.x,clientY:q.y},samples=[[],[]],counts=[];
 for(let i=0;i<12;i++){let expected;for(const j of i%2?[1,0]:[0,1]){const r=rs[j];r.reset();const start=performance.now(),hit=referenceSignature(r.pick(event)),ms=performance.now()-start;assert.equal(hit?.type,'Edge');if(expected)assert.deepEqual(hit,expected);else expected=hit;if(i>=2)samples[j].push(ms);counts[j]=r.counts();}}
 const row={faces:mesh.faces.length,vertices:mesh.vertices.length,edges:mesh.edges().length,before:{...counts[0],samplesMs:samples[0],medianMs:median(samples[0])},after:{...counts[1],samplesMs:samples[1],medianMs:median(samples[1])},correctness:'Exact reference type/index/point/distance match'};report.rows.push(row);console.log(JSON.stringify(row));
}
fs.writeFileSync(new URL('../docs/performance-face-inference-1119.json',import.meta.url),JSON.stringify(report,null,2)+'\n');
