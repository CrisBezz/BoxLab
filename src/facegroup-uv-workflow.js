import {createFacegroupBoundaryPreview} from './facegroup-boundary-preview.js?v=0.36.18.1004';
import * as THREE from 'three';
import {planFacegroupSeams} from './facegroup-uv-core.js?v=0.36.18.1000';
import {createFacegroupAtlasUV} from './imported-uv-edit.js?v=0.36.18.1000';
const fingerprint=mesh=>JSON.stringify([mesh.vertices,mesh.faces,mesh.faceGroups]);
export function installFacegroupUVWorkflow({document,host,notice,getContext,onCommit,say,now=()=>performance.now(),requestFrame=requestAnimationFrame,cancelFrame=cancelAnimationFrame}){
 const row=document.createElement('div');row.className='outliner-actions';
 row.innerHTML='<button type="button" data-fguv="preview">Facegroups → UV Seams</button><button type="button" data-fguv="confirm" hidden>Confirm UV Unwrap</button><button type="button" data-fguv="cancel" hidden>Cancel</button><output data-fguv="timer" role="status" aria-live="polite"></output>';
 const summary=host.querySelector('summary');if(summary?.after)summary.after(row);else host.appendChild(row);
 const control=name=>row.querySelector(`[data-fguv="${name}"]`),preview=control('preview'),confirm=control('confirm'),cancel=control('cancel'),timer=control('timer');
 let state=null,overlay=null,frame=null,token=0,busy=false,started=0,lastCheck=0;
 function message(text){notice.hidden=false;notice.textContent=text;say(text);}
 function disposeOverlay(){if(!overlay)return;overlay.dispose();overlay=null;}
 function reset(){token++;busy=false;state=null;disposeOverlay();if(frame!==null)cancelFrame(frame);frame=null;confirm.hidden=cancel.hidden=true;preview.disabled=confirm.disabled=false;timer.textContent='';}
 function stillCurrent(){const c=getContext();return !!c&&c.object===state?.object&&c.mesh===state?.mesh&&c.object.glbPassthrough===state?.payload;}
 function tick(){
  frame=null;if(!state)return;
  if(!stillCurrent()){reset();message('UV target changed · preview Facegroup seams again');return;}
  if(!busy&&now()-lastCheck>200){lastCheck=now();if(fingerprint(state.mesh)!==state.key){reset();message('Mesh or Facegroups changed · preview seams again');return;}}
  const body=getContext()?.body;
  if(overlay&&body)overlay.update();
  if(busy){const text=`Unwrapping · ${((now()-started)/1000).toFixed(1)} s`;if(timer.textContent!==text)timer.textContent=text;}
  frame=requestFrame(tick);
 }
 function beginPreview(){
  reset();const c=getContext();if(!c){message('Choose one unlocked Base object for Facegroup UV seams');return false;}
  if(c.object.locked||c.object.sourceId||c.object.kind==='reference'||c.object.booleanRecipe||c.object.arrayRecipe||c.object.curveProfile||c.object.materials||c.object.textures||c.object.glbPassthrough&&c.object.glbPassthrough.source!=='boxlab'||c.object.settings?.subd||Object.values(c.object.settings?.mirror||{}).some(Boolean)||c.object.colourPaint||c.object.roughnessPaint||c.object.metalnessPaint){message('Use an unlocked Base mesh with SubD/Mirror off; clear paint before unwrapping');return false;}
  const plan=planFacegroupSeams(c.mesh);if(!plan.ok){message(plan.reason);return false;}
  if(!c.scene||!c.body){message('Viewport is not ready');return false;}
  overlay=createFacegroupBoundaryPreview({mesh:c.mesh,body:c.body,scene:c.scene,edges:plan.seams});
  state={...c,payload:c.object.glbPassthrough,key:fingerprint(c.mesh),plan};lastCheck=now();confirm.hidden=cancel.hidden=false;
  message(`Facegroup seams highlighted · ${plan.islandCount} UV patches. Orbit to check, then Confirm UV Unwrap. Existing UVs will be replaced.`);tick();return true;
 }
 async function unwrap(){
  if(!state||busy)return false;
  if(!stillCurrent()||fingerprint(state.mesh)!==state.key){reset();message('Target changed · preview seams again');return false;}
  const job=++token,source=state;busy=true;started=now();confirm.disabled=preview.disabled=true;timer.textContent='Unwrapping · 0.0 s';message('Unwrapping Facegroups · keep this object selected');
  const cancelled=()=>token!==job||!stillCurrent();
  let result;
  try{
   await new Promise(resolve=>requestFrame(resolve));
   result=await createFacegroupAtlasUV(source.object,source.mesh,source.owner?.topologySignature,source.history,source.owner,{cancelled,yieldControl:()=>new Promise(resolve=>requestFrame(resolve))});
  }catch(error){result={ok:false,reason:error.message};}
  if(token!==job)return false;
  busy=false;preview.disabled=confirm.disabled=false;
  if(!result.ok){message(result.reason);timer.textContent='';return false;}
  const seconds=((now()-started)/1000).toFixed(1);state.payload=source.object.glbPassthrough;state.completed=true;confirm.hidden=true;
  onCommit(result);message(`Facegroup unwrap complete · ${result.islandCount} UV patches · ${seconds} s · checker and orange patch seams shown · Undo restores UVs`);timer.textContent=`Completed · ${seconds} s`;return true;
 }
 preview.addEventListener('click',beginPreview);confirm.addEventListener('click',unwrap);cancel.addEventListener('click',()=>{const completed=state?.completed;reset();message(completed?'UV seam preview hidden':'Facegroup unwrap cancelled · UVs unchanged');});
 return {preview:beginPreview,unwrap,cancel:reset,get busy(){return busy;}};
}
