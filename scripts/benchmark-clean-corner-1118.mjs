import fs from 'node:fs';import assert from 'node:assert/strict';import {performance} from 'node:perf_hooks';
import {planConcaveBandWalls as oldPlan} from '../tests/fixtures/performance/connected-extrude-corners-1117.js';
import {cornerBand} from '../tests/helpers/corner-band-fixture.mjs';import {previewRuntime} from '../tests/helpers/dense-edit-runtime.mjs';
const report={release:'.1118',scope:'Synthetic segmented L bands. Actual original connected-extrusion owner; .1117 planner versus current planner. Counts refer to real mesh Faces/edges, not hidden display diagonals. CPU samples exclude clone/setup/render/history/browser/GPU/iPad; no native speedup claim.',rows:[]};
for(const subdivisions of [2,4,12]){
 const base=cornerBand({subdivisions}),rows={};
 for(const legacy of [true,false]){
  const {mesh,ids}=cornerBand({subdivisions}),r=previewRuntime(mesh,ids);if(legacy)r.context.planConcaveBandWalls=oldPlan;const samples=[];let final;
  for(let i=0;i<12;i++){const trial=mesh.clone(),t=performance.now(),result=r.context.extrudeConnectedFaceSelection(trial,ids,.6),ms=performance.now()-t;assert.ok(result&&result.ok!==false);if(i>=2)samples.push(ms);final=trial;}
  const walls=final.faces.slice(mesh.faces.length);rows[legacy?'before':'after']={resultFaces:final.faces.length,resultEdges:final.edges().length,resultVertices:final.vertices.length,wallFaces:walls.length,wallQuads:walls.filter(f=>f.length===4).length,wallTriangles:walls.filter(f=>f.length===3).length,samplesMs:samples,medianMs:[...samples].sort((a,b)=>a-b)[5]};
 }
 assert.equal(rows.after.wallTriangles,0);assert.equal(rows.after.wallFaces,base.ids.length*2);assert.equal(rows.before.resultVertices,rows.after.resultVertices);
 const row={selectedFaces:base.ids.length,sourceFaces:base.mesh.faces.length,...rows};report.rows.push(row);console.log(JSON.stringify({selectedFaces:row.selectedFaces,wallFaces:[row.before.wallFaces,row.after.wallFaces],edges:[row.before.resultEdges,row.after.resultEdges],vertices:[row.before.resultVertices,row.after.resultVertices],medianMs:[row.before.medianMs,row.after.medianMs]}));
}
fs.writeFileSync(new URL('../docs/performance-clean-corner-1118.json',import.meta.url),JSON.stringify(report,null,2)+'\n');
