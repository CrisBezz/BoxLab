import fs from 'node:fs/promises';
import {loadBodyWasm,runWasmComparison} from '../src/performance-wasm.js';
const reports=[];
for(const triangles of [10000,50000,100000]){
 const report=await runWasmComparison({triangles,release:'0.36.18.1146',environment:{runtime:process.version,platform:process.platform,scope:'Desktop Node; not target iPad acceptance'},load:()=>loadBodyWasm({fetcher:async()=>({ok:true,arrayBuffer:()=>fs.readFile(new URL('../src/wasm/body-pack.wasm',import.meta.url))})})});
 reports.push(report);console.log(triangles,report.decision,report.metrics.medianReductionPercent.toFixed(1)+'%');
}
await fs.writeFile(new URL('../docs/performance-wasm-body-1146.json',import.meta.url),JSON.stringify({scope:'Opt-in pilot only; no production migration or iPad/capacity acceptance',reports},null,2)+'\n');
