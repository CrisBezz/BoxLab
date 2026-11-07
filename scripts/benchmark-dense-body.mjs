// CPU-only baseline for the unchanged application owner. Never evidence of iPad/GPU capacity.
import {runDenseBenchmark,LAB_SIZES} from '../src/performance-lab-core.js';
const reports=[];
for(const triangles of LAB_SIZES)reports.push(await runDenseBenchmark({triangles,release:'0.36.18.1096',environment:{runtime:process.version,platform:process.platform,architecture:process.arch,device:'CI/local Node; not iPad'}}));
process.stdout.write(JSON.stringify({scope:'CPU-only baseline; no before/after candidate or optimisation claim',reports},null,2)+'\n');
