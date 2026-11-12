import {runDenseBenchmark,compareBaseline,LAB_SIZES} from './performance-lab-core.js?v=0.36.18.1096';
const loadWasmLab=()=>import('./performance-wasm.js?v=0.36.18.1146');
const KEY='boxlab.performance.baseline.dense-body-v1';
export function installPerformanceLab(panel,monitor){
 const section=document.createElement('details'),summary=document.createElement('summary');summary.textContent='Performance Lab';section.append(summary);
 const note=document.createElement('p');note.textContent='Compare JS / WASM runs a real experimental WASM body-packing module; it includes conversion/copies and normals. Production remains JavaScript until device and memory gates pass. Uses a separate fixture and the real body builder. Start at 10k. Your model stays unchanged. For navigation response, Reset first, perform one gesture type at a time, then Download viewport report. It records input-to-camera-change and input-to-render-submit timing; the latter ends after renderer.render and excludes GPU/compositor presentation.';
 const size=document.createElement('select');size.setAttribute('aria-label','Benchmark triangle count');
 for(const count of LAB_SIZES){const o=document.createElement('option');o.value=count;o.textContent=`${count/1000}k triangles`;size.append(o);}
 const output=document.createElement('pre');output.style.whiteSpace='pre-wrap';output.setAttribute('aria-live','polite');
 const button=label=>{const b=document.createElement('button');b.type='button';b.textContent=label;return b;};
 const compare=button('Compare JS / WASM'),run=button('Run baseline'),cancel=button('Cancel'),save=button('Download JSON'),baseline=button('Keep as baseline'),live=button('Download viewport report');cancel.disabled=save.disabled=baseline.disabled=true;
 let busy=false,stop=false,report=null;
 const env=()=>({userAgent:navigator.userAgent,dpr:devicePixelRatio,width:innerWidth,height:innerHeight,visibility:document.visibilityState,standalone:!!navigator.standalone,powerThermal:'unknown'});
 const viewportEnv=()=>({...env(),selectionMode:document.querySelector('#selectionModes button.active')?.dataset.mode||null,renderMode:document.querySelector('#viewportRenderLooks [data-render].active')?.dataset.render||null});
 const readBaseline=()=>{try{return JSON.parse(localStorage.getItem(KEY));}catch{return null;}};
 run.addEventListener('click',async()=>{
  if(busy)return;busy=true;stop=false;report=null;compare.disabled=run.disabled=size.disabled=save.disabled=baseline.disabled=live.disabled=true;cancel.disabled=false;
  try{
   report=await runDenseBenchmark({triangles:Number(size.value),release:document.querySelector('#appVersion')?.dataset.releaseVersion,environment:env(),snapshot:()=>monitor.snapshot(),
    cancelled:()=>stop||!panel.isConnected||document.visibilityState==='hidden',yieldFrame:()=>new Promise(r=>setTimeout(r,30)),progress:(i,n)=>{output.textContent=`Body build ${i}/${n} (2 warm-ups, 5 measured)`;}});
   report.comparison=compareBaseline(report,readBaseline());
   output.textContent=`INCONCLUSIVE — baseline only\n${report.fixture.triangles.toLocaleString()} triangles\nMedian ${report.metrics.medianMs.toFixed(1)} ms · p95 ${report.metrics.p95Ms.toFixed(1)} ms\nCPU attributes ${(report.memory.renderAttributeBytes/1048576).toFixed(1)} MiB (not total RAM)\n${report.comparison.comparable?`Median reduction ${report.comparison.medianReductionPercent.toFixed(1)}% vs ${report.comparison.baselineRelease}`:report.comparison.reason}\nNo complete viewport or editable-capacity result yet.`;
   save.disabled=baseline.disabled=false;
  }catch(error){report=null;output.textContent=error.message;}finally{busy=false;compare.disabled=run.disabled=size.disabled=live.disabled=false;cancel.disabled=true;}
 });
 compare.addEventListener('click',async()=>{
  if(busy)return;busy=true;stop=false;report=null;compare.disabled=run.disabled=size.disabled=save.disabled=baseline.disabled=live.disabled=true;cancel.disabled=false;
  try{
   const {runWasmComparison}=await loadWasmLab();
   report=await runWasmComparison({triangles:Number(size.value),release:document.querySelector('#appVersion')?.dataset.releaseVersion,environment:env(),cancelled:()=>stop||!panel.isConnected||document.visibilityState==='hidden',yieldFrame:()=>new Promise(r=>setTimeout(r,30)),progress:(i,n)=>{output.textContent=`JS / WASM pair ${i}/${n} (2 warm-ups, 7 measured)`;}});
   output.textContent=report.decision==='UNAVAILABLE'?`WASM unavailable: ${report.reason}\nJavaScript remains active.`:`${report.decision} — lab only\nJS ${report.metrics.js.medianMs.toFixed(2)} ms · WASM ${report.metrics.wasm.medianMs.toFixed(2)} ms\nComplete CPU body reduction ${report.metrics.medianReductionPercent.toFixed(1)}%\nExtra WASM memory ${(report.memory.wasmCommittedBytes/1048576).toFixed(1)} MiB (not total RAM)\nExact positions/normals PASS. Production stays JavaScript.\nDownload JSON to review timing, memory and initialization gates.`;
   save.disabled=false;
  }catch(error){report=null;output.textContent=error.message;}finally{busy=false;compare.disabled=run.disabled=size.disabled=live.disabled=false;cancel.disabled=true;}
 });
 cancel.addEventListener('click',()=>{stop=true;cancel.disabled=true;});
 baseline.addEventListener('click',()=>{if(!report)return;try{localStorage.setItem(KEY,JSON.stringify(report));output.textContent+='\nBaseline kept on this device.';}catch{output.textContent+='\nStorage unavailable; download JSON instead.';}});
 const download=value=>{const url=URL.createObjectURL(new Blob([JSON.stringify(value,null,2)],{type:'application/json'})),link=document.createElement('a');link.href=url;link.download=`BoxLab-performance-${value.release}-${value.fixture?.triangles||'viewport'}.json`;link.click();setTimeout(()=>URL.revokeObjectURL(url),1000);};
 save.addEventListener('click',()=>{if(report)download(report);});
 live.addEventListener('click',()=>download({schemaVersion:1,protocol:'viewport-snapshot-v1',release:document.querySelector('#appVersion')?.dataset.releaseVersion,timestamp:new Date().toISOString(),environment:viewportEnv(),metrics:monitor.snapshot(),decision:'INCONCLUSIVE',notes:'Manual live scene snapshot; CPU frame/rebuild timings, not GPU time or total RAM. Camera-change response ends at the existing OrbitControls change event; render-submit latency ends after the existing renderer.render call. Neither measures GPU execution or browser/compositor presentation. Gesture counts classify one-finger orbit, two-finger pan, pinch zoom, combined pan+zoom and wheel zoom. No model geometry is included.'}));
 const subdivision=document.createElement('a');subdivision.textContent='Profile subdivision';subdivision.href='./docs/subdivision-benchmark-1036.html?v=0.36.18.1152';subdivision.target='_blank';subdivision.rel='noopener';
 section.append(note,size,run,compare,cancel,save,baseline,live,subdivision,output);panel.append(section);panel.style.maxHeight='70vh';panel.style.overflowY='auto';
}
