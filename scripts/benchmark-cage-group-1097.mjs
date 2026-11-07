// Real addCage + Multi observer + saveActive/captureHistory + old/new group reader.
// No WebGL, other app hooks, actual user mesh, or iPad improvement claim.
import assert from 'node:assert/strict';
import {cageHarness,grid} from '../tests/helpers/cage-group-profile.mjs';
import {latencyStats} from '../src/performance-lab-core.js';
const results=[];
for(const density of [20,32]){
 const samples={before:[],after:[]};let beforeCounts,afterCounts;
 for(let i=0;i<7;i++){
  // Interleave AB/BA to reduce order/JIT/GC bias. Construction timings include
  // body synchronization and complete cage/proxy construction; disposal excluded.
  let signature=null;
  for(const legacy of i%2?[false,true]:[true,false]){
   const h=cageHarness({legacy,mesh:grid(density)});
   try{
    const ms=h.build(),current=h.signature();
    if(signature)assert.deepEqual(current,signature);else signature=current;
    if(i>=2)samples[legacy?'before':'after'].push(ms);
    if(legacy)beforeCounts=h.counts();else afterCounts=h.counts();
   }finally{h.dispose();}
  }
 }
 const before=latencyStats(samples.before),after=latencyStats(samples.after);
 results.push({faces:density*density,vertices:(density+1)**2,mode:'face',historyMeshes:1,warmups:2,repeats:5,samplesMs:samples,before,after,beforeCounts,afterCounts,medianReductionPercent:100*(before.medianMs-after.medianMs)/before.medianMs,correctness:'Exact proxy geometry/style/visibility parity on every paired run'});
}
console.log(JSON.stringify({release:'0.36.18.1097',baseline:'0.36.18.1096 / d3396cdda49dcf5b9699defe83198295da338d3e',runtime:process.version,scope:'Node CPU: real body observer + cage/proxy build with original active/history cloning and original vs metadata-only group reader. Other Group hooks and GPU excluded. Not iPad performance or safe editable capacity.',decision:'INCONCLUSIVE pending same-device viewport report',results},null,2));
