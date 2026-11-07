import {runDenseBenchmark,compareBaseline,LAB_SIZES} from './performance-lab-core.js?v=0.36.18.1096';
const KEY='boxlab.performance.baseline.dense-body-v1';
export function installPerformanceLab(panel,monitor){
 const section=document.createElement('details'),summary=document.createElement('summary');summary.textContent='Performance Lab';section.append(summary);
 const note=document.createElement('p');note.textContent='Baseline for WASM work. Uses a separate fixture and the real body builder. Start at 10k. Your model stays unchanged.';
 const size=document.createElement('select');size.setAttribute('aria-label','Benchmark triangle count');
 for(const count of LAB_SIZES){const o=document.createElement('option');o.value=count;o.textContent=`${count/1000}k triangles`;size.append(o);}
 const output=document.createElement('pre');output.style.whiteSpace='pre-wrap';output.setAttribute('aria-live','polite');
 const button=label=>{const b=document.createElement('button');b.type='button';b.textContent=label;return b;};
 const run=button('Run baseline'),cancel=button('Cancel'),save=button('Download JSON'),baseline=button('Keep as baseline'),live=button('Download viewport report');cancel.disabled=save.disabled=baseline.disabled=true;
 let busy=false,stop=false,report=null;
 const env=()=>({userAgent:navigator.userAgent,dpr:devicePixelRatio,width:innerWidth,height:innerHeight,visibility:document.visibilityState,standalone:!!navigator.standalone,powerThermal:'unknown'});
 const readBaseline=()=>{try{return JSON.parse(localStorage.getItem(KEY));}catch{return null;}};
 run.addEventListener('click',async()=>{
  if(busy)return;busy=true;stop=false;report=null;run.disabled=size.disabled=save.disabled=baseline.disabled=live.disabled=true;cancel.disabled=false;
  try{
   report=await runDenseBenchmark({triangles:Number(size.value),release:document.querySelector('#appVersion')?.dataset.releaseVersion,environment:env(),snapshot:()=>monitor.snapshot(),
    cancelled:()=>stop||!panel.isConnected||document.visibilityState==='hidden',yieldFrame:()=>new Promise(r=>setTimeout(r,30)),progress:(i,n)=>{output.textContent=`Body build ${i}/${n} (2 warm-ups, 5 measured)`;}});
   report.comparison=compareBaseline(report,readBaseline());
   output.textContent=`INCONCLUSIVE — baseline only\n${report.fixture.triangles.toLocaleString()} triangles\nMedian ${report.metrics.medianMs.toFixed(1)} ms · p95 ${report.metrics.p95Ms.toFixed(1)} ms\nCPU attributes ${(report.memory.renderAttributeBytes/1048576).toFixed(1)} MiB (not total RAM)\n${report.comparison.comparable?`Median reduction ${report.comparison.medianReductionPercent.toFixed(1)}% vs ${report.comparison.baselineRelease}`:report.comparison.reason}\nNo complete viewport or editable-capacity result yet.`;
   save.disabled=baseline.disabled=false;
  }catch(error){report=null;output.textContent=error.message;}finally{busy=false;run.disabled=size.disabled=live.disabled=false;cancel.disabled=true;}
 });
 cancel.addEventListener('click',()=>{stop=true;cancel.disabled=true;});
 baseline.addEventListener('click',()=>{if(!report)return;try{localStorage.setItem(KEY,JSON.stringify(report));output.textContent+='\nBaseline kept on this device.';}catch{output.textContent+='\nStorage unavailable; download JSON instead.';}});
 const download=value=>{const url=URL.createObjectURL(new Blob([JSON.stringify(value,null,2)],{type:'application/json'})),link=document.createElement('a');link.href=url;link.download=`BoxLab-performance-${value.release}-${value.fixture?.triangles||'viewport'}.json`;link.click();setTimeout(()=>URL.revokeObjectURL(url),1000);};
 save.addEventListener('click',()=>{if(report)download(report);});
 live.addEventListener('click',()=>download({schemaVersion:1,protocol:'viewport-snapshot-v1',release:document.querySelector('#appVersion')?.dataset.releaseVersion,timestamp:new Date().toISOString(),environment:env(),metrics:monitor.snapshot(),decision:'INCONCLUSIVE',notes:'Manual live scene snapshot; CPU frame/rebuild timings, not GPU time or total RAM. No deterministic camera sequence or before/after comparison. Report contains counts, not model geometry.'}));
 section.append(note,size,run,cancel,save,baseline,live,output);panel.append(section);panel.style.maxHeight='70vh';panel.style.overflowY='auto';
}
