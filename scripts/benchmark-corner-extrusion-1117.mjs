// Valid repaired geometry only; no speedup claim against the invalid old surface.
import fs from 'node:fs';import {performance} from 'node:perf_hooks';import assert from 'node:assert/strict';
import {cornerBand} from '../tests/helpers/corner-band-fixture.mjs';import {previewRuntime} from '../tests/helpers/dense-edit-runtime.mjs';import {topologySummary} from '../src/topology-seam-conformance.js';
const report={release:'.1117',scope:'Synthetic Node CPU connected-extrusion owner, including fresh corner-wall planning and final edge enumeration. Clone/setup, render/cage/history, inference, browser/GPU and iPad excluded. Invalid .1116 geometry is not a performance baseline. No claim that invalid preview geometry caused the previous lag.',rows:[]};
for(const subdivisions of [2,4,12]){
 const {mesh,ids}=cornerBand({subdivisions}),r=previewRuntime(mesh,ids),samples=[];let final;
 for(let i=0;i<12;i++){const trial=mesh.clone(),start=performance.now(),result=r.context.extrudeConnectedFaceSelection(trial,ids,.6),ms=performance.now()-start;assert.ok(result&&result.ok!==false);assert.equal(topologySummary(trial).closed,true);if(i>=2)samples.push(ms);final=trial;}
 report.rows.push({sourceVertices:mesh.vertices.length,sourceFaces:mesh.faces.length,selectedFaces:ids.length,resultFaces:final.faces.length,samplesMs:samples,medianMs:[...samples].sort((a,b)=>a-b)[5],correctness:'Closed oriented result; independent overlap/winding checks in regression suite'});
}
fs.writeFileSync(new URL('../docs/performance-corner-extrusion-1117.json',import.meta.url),JSON.stringify(report,null,2)+'\n');for(const row of report.rows)console.log(row.selectedFaces,row.medianMs.toFixed(3)+' ms');
