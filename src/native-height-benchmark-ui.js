import {nativeHeightSources,measureNativeHeight} from './nomad-height-benchmark.js?v=0.36.18.1088';
const samplePNG='iVBORw0KGgoAAAANSUhEUgAAAAIAAAACEAAAAAAHTY67AAAAEklEQVR4nGNgYHBgYGhg+P8fAAbHAr89RY6RAAAAAElFTkSuQmCC';
const fileInput=document.querySelector('#file'),sourceSelect=document.querySelector('#source'),runButton=document.querySelector('#run'),sampleButton=document.querySelector('#sample'),copyButton=document.querySelector('#copy'),status=document.querySelector('#status'),report=document.querySelector('#report');
let sources=[],busy=false;
function lock(value){busy=value;fileInput.disabled=sampleButton.disabled=value;sourceSelect.disabled=value||!sources.length;runButton.disabled=value||!sources.length;copyButton.disabled=value||!report.value;}
function clearReport(){report.value='';report.hidden=true;copyButton.disabled=true;}
fileInput.addEventListener('change',async()=>{
 if(busy)return;clearReport();sources=[];sourceSelect.replaceChildren();lock(true);
 try{
  const file=fileInput.files?.[0];if(!file){status.textContent='No file selected.';return;}
  if(!file.size||file.size>128*1024*1024)throw Error('Choose a file within 128 MiB');
  // Refuse known over-budget PNG files before reading them into memory.
  const isPNG=/\.png$/i.test(file.name);if(isPNG&&file.size>8*1024*1024)throw Error('Height PNG must be within 8 MiB');
  const bytes=new Uint8Array(await file.arrayBuffer());
  sources=isPNG?[{label:'Selected PNG',data:bytes,settings:null}]:nativeHeightSources(bytes);
  for(let i=0;i<sources.length;i++){const option=document.createElement('option');option.value=String(i);option.textContent=sources[i].label;sourceSelect.append(option);}
  sourceSelect.value='0';status.textContent=`${sources.length} source(s) ready. Measure the selected map.`;
 }catch(error){sources=[];status.textContent=String(error?.message||error);}finally{lock(false);}
});
sourceSelect.addEventListener('change',()=>{clearReport();status.textContent='Ready to measure the selected map.';});
async function measure(source,sample=false){
 if(busy||!source)return;clearReport();lock(true);status.textContent='Decoding raw height samples… Keep this page visible.';
 try{
  const result=await measureNativeHeight(source.data,sample?{expectedSamples:[0,16384,32768,65535]}:undefined);
  const value={benchmark:'BoxLab native height decode .1064',date:new Date().toISOString(),userAgent:navigator.userAgent,sampleOnly:sample,precisionVerified:sample?true:null,settings:source.settings,...result,scope:'Raw grayscale PNG decode only. No material settings applied; no geometry, projection, GPU, viewport or total-memory measurement.'};
  report.value=JSON.stringify(value,null,2);report.hidden=false;
  status.textContent=`${result.width} × ${result.height} · ${result.bitDepth}-bit · raw range ${result.min}–${result.max}\n${result.decodeBudgetPassed?'Decode budget passed':'Stopped after slow decode'} · median ${result.decodeMedianMs.toFixed(2)} ms${sample?' · tiny sample is not a performance result':''}`;
 }catch(error){status.textContent=String(error?.message||error);}finally{lock(false);}
}
runButton.addEventListener('click',()=>measure(sources[Number(sourceSelect.value)]));
sampleButton.addEventListener('click',()=>measure({data:Uint8Array.from(atob(samplePNG),c=>c.charCodeAt(0)),settings:null},true));
copyButton.addEventListener('click',async()=>{
 if(!report.value||busy)return;report.hidden=false;
 try{await navigator.clipboard.writeText(report.value);status.textContent='Report copied. Paste it into the BoxLab development chat.';}catch{report.focus();report.select();status.textContent='Copy the selected report.';}
});
