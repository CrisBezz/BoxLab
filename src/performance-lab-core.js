import {EditableMesh} from './mesh.js?v=0.12';
export const LAB_PROTOCOL='dense-body-v1';
export const LAB_SIZES=[10000,50000,100000];
export function denseFixture(triangles){
 if(!LAB_SIZES.includes(triangles))throw Error('Unsupported benchmark size');
 const width=100,rows=triangles/(2*width),vertices=[],faces=[];
 for(let z=0;z<=rows;z++)for(let x=0;x<=width;x++)vertices.push([x,((x*17+z*13)%31)/31,z]);
 for(let z=0;z<rows;z++)for(let x=0;x<width;x++){
  const a=z*(width+1)+x,b=a+width+1;
  faces.push([a,b,a+1],[a+1,b,b+1]);
 }
 return new EditableMesh(vertices,faces);
}
export function meshFingerprint(mesh){
 let h=2166136261;const mix=s=>{for(let i=0;i<s.length;i++)h=Math.imul(h^s.charCodeAt(i),16777619)>>>0;};
 for(const v of mesh.vertices)mix(`${v.x},${v.y},${v.z};`);
 for(const f of mesh.faces)mix(f.join(',')+';');return h.toString(16).padStart(8,'0');
}
export function latencyStats(samples){
 if(!samples.length||samples.some(x=>!Number.isFinite(x)||x<0))throw Error('Invalid timing samples');
 const s=[...samples].sort((a,b)=>a-b),n=s.length;
 return {medianMs:n%2?s[(n-1)/2]:(s[n/2-1]+s[n/2])/2,p95Ms:s[Math.ceil(n*.95)-1],minMs:s[0],maxMs:s[n-1]};
}
export function compareBaseline(report,baseline){
 if(!baseline||baseline.protocol!==report.protocol||baseline.fixture?.hash!==report.fixture.hash||baseline.correctness?.outputHash!==report.correctness.outputHash||JSON.stringify(baseline.environment)!==JSON.stringify(report.environment)||!Number.isFinite(baseline.metrics?.medianMs)||baseline.metrics.medianMs<=0)return {comparable:false,reason:'No matching fixture, output and browser baseline'};
 return {comparable:true,baselineRelease:baseline.release,medianReductionPercent:100*(baseline.metrics.medianMs-report.metrics.medianMs)/baseline.metrics.medianMs,reason:'CPU body construction only; device/power and complete viewport require review'};
}
export async function runDenseBenchmark({triangles=10000,release,environment={},snapshot=()=>null,now=()=>performance.now(),yieldFrame=()=>new Promise(r=>setTimeout(r,0)),cancelled=()=>false,progress=()=>{}}={}){
 const check=()=>{if(cancelled())throw Error('Benchmark cancelled; no partial report saved');};
 check();const liveSnapshotBeforeBenchmark=snapshot();await yieldFrame();check();const mesh=denseFixture(triangles),hash=meshFingerprint(mesh),samples=[];
 let outputHash=null,bufferBytes=0;
 // Existing application owner: includes packing, allocation and normals. No second kernel.
 for(let i=0;i<7;i++){
  await yieldFrame();check();let geometry;
  try{
   const start=now();geometry=mesh.triangulatedGeometry();const elapsed=now()-start;
   const p=geometry.getAttribute('position'),n=geometry.getAttribute('normal');
   if(p.count!==triangles*3||n.count!==p.count)throw Error('Body output count mismatch');
   let h=2166136261;bufferBytes=0;
   for(const attribute of [p,n]){
    const bytes=new Uint8Array(attribute.array.buffer,attribute.array.byteOffset,attribute.array.byteLength);bufferBytes+=bytes.length;
    for(const byte of bytes)h=Math.imul(h^byte,16777619)>>>0;
   }
   if(outputHash!==null&&outputHash!==h)throw Error('Body output changed between repeats');
   outputHash=h;if(i>=2)samples.push(elapsed);
  }finally{geometry?.dispose();}
  progress(i+1,7);
 }
 check();return {schemaVersion:1,protocol:LAB_PROTOCOL,release,timestamp:new Date().toISOString(),environment,
  fixture:{id:`irregular-grid-${triangles}-v1`,hash,vertices:mesh.vertices.length,faces:mesh.faces.length,triangles},
  operation:'EditableMesh.triangulatedGeometry: packing + allocation + normals',warmup:2,repeats:5,samplesMs:samples,metrics:latencyStats(samples),
  correctness:{passed:true,outputHash:outputHash.toString(16).padStart(8,'0'),scope:'Stable output across repeats; not candidate parity or editable-capacity acceptance'},
  memory:{renderAttributeBytes:bufferBytes,scope:'Position/normal CPU arrays only; excludes editable mesh, temporary arrays, heap, GPU and browser memory'},
  liveSnapshotBeforeBenchmark,decision:'INCONCLUSIVE',notes:'Baseline foundation. No WASM candidate or speed improvement claimed. Excludes GPU, import parsing, complete rebuild, tools and safe editable capacity.'};
}
