// One disposable worker per job: Cancel interrupts native WASM and frees its heap.
export function startAutoUnwrapJob(input,{WorkerClass=globalThis.Worker,timeoutMs=45000,onStage=()=>{}}={}){
 let worker,timer,settled=false,rejectJob;
 const finish=()=>{clearTimeout(timer);worker?.terminate();};
 const promise=new Promise((resolve,reject)=>{rejectJob=reject;try{worker=new WorkerClass(new URL('./auto-unwrap-worker.js?v=0.36.18.1193',import.meta.url),{type:'module'});worker.onmessage=event=>{if(settled)return;if(event.data.stage){onStage(event.data.stage);return;}settled=true;finish();event.data.error?reject(Error(event.data.error)):resolve(event.data.result);};worker.onerror=event=>{if(settled)return;settled=true;finish();reject(Error(event.message||'Auto Unwrap worker failed'));};timer=setTimeout(()=>{if(settled)return;settled=true;finish();reject(Error('Auto Unwrap exceeded 45 seconds; try a smaller mesh'));},timeoutMs);worker.postMessage(input);}catch(error){settled=true;finish();reject(error);}});
 return {promise,cancel(){if(settled)return;settled=true;finish();rejectJob(Error('Auto Unwrap cancelled'));}};
}
