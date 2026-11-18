import * as THREE from 'three';
import {prepareAutoUnwrapMesh,autoUVFingerprint,autoUnwrapSeams,validateAutoUnwrapResult} from './auto-unwrap-core.js?v=0.36.18.1191';
import {startAutoUnwrapJob} from './auto-unwrap-job.js?v=0.36.18.1191';
import {autoUnwrapTargetError,commitAutoUnwrapUV} from './imported-uv-edit.js?v=0.36.18.1189';
import {createFacegroupBoundaryPreview} from './facegroup-boundary-preview.js?v=0.36.18.1191';
export function installAutoUnwrapWorkflow({document,host,notice,getContext,onCommit,say,startJob=startAutoUnwrapJob,beforeStart=()=>{},requestFrame=requestAnimationFrame,cancelFrame=cancelAnimationFrame}){
 const row=document.createElement('div');row.className='outliner-actions';row.innerHTML='<button type="button" data-autouv="preview" title="Unwrap unpainted Base geometry automatically; no Facegroups required">Auto Unwrap</button><button type="button" data-autouv="guided" title="Keep Facegroups as separate regions; add automatic cuts within closed or holed regions">Facegroup Guided</button><button type="button" data-autouv="apply" hidden>Apply UVs</button><button type="button" data-autouv="cancel" hidden>Cancel</button><output data-autouv="status" role="status" aria-live="polite"></output>';host.prepend(row);
 const button=n=>row.querySelector(`[data-autouv="${n}"]`),preview=button('preview'),guided=button('guided'),apply=button('apply'),cancel=button('cancel'),status=button('status');let job=null,staged=null,overlay=null,raf=null,generation=0,lastCheck=0;
 const message=text=>{notice.hidden=false;notice.textContent=text;say(text);status.textContent=text;};
 function removeOverlay(){overlay?.dispose();overlay=null;}
 function reset(){generation++;job?.cancel();job=null;staged=null;removeOverlay();if(raf!==null)cancelFrame(raf);raf=null;preview.disabled=false;if(guided)guided.disabled=false;apply.hidden=cancel.hidden=true;status.textContent='';}
 function current(s,geometry=true){const c=getContext();return !!c&&c.object===s.object&&c.mesh===s.mesh&&c.object.glbPassthrough===s.payload&&!autoUnwrapTargetError(c.object,c.mesh,c.owner?.topologySignature)&&JSON.stringify(c.object.settings||{})===s.settings&&(!geometry||autoUVFingerprint(c.mesh)===s.key&&JSON.stringify(c.object.glbPassthrough??null)===s.payloadKey);}
 function tick(){raf=null;if(!staged)return;const check=Date.now()-lastCheck>=200;if(!current(staged,check)){reset();message('Auto Unwrap target changed; preview again');return;}if(check)lastCheck=Date.now();overlay?.update();raf=requestFrame(tick);}
 function makeOverlay(s,result){
  const payload={version:1,source:'boxlab',uvTopologySignature:s.owner.topologySignature(s.mesh),uvCorners:result.uvCorners},geometry=s.owner.buildUVPreviewGeometry(s.mesh,payload);
  if(!geometry)throw Error('Could not display Auto Unwrap preview');
  const pixels=new Uint8Array(128*128*4);for(let y=0;y<128;y++)for(let x=0;x<128;x++){const v=((x>>3)+(y>>3))%2?220:68,i=(y*128+x)*4;pixels.set([v,v,v,255],i);}
  const texture=new THREE.DataTexture(pixels,128,128);texture.magFilter=THREE.NearestFilter;texture.needsUpdate=true;
  const material=new THREE.MeshBasicMaterial({map:texture,side:THREE.DoubleSide,polygonOffset:true,polygonOffsetFactor:-2,polygonOffsetUnits:-2}),body=new THREE.Mesh(geometry,material);body.raycast=()=>{};body.userData.boxlabRenderOverlay=true;body.userData.boxlabAutoUVPreview=true;body.matrixAutoUpdate=false;body.renderOrder=149;s.scene.add(body);
  const guideEdges=s.input.guideBoundaries||[],guideKeys=new Set(guideEdges.map(([a,b])=>a<b?`${a}:${b}`:`${b}:${a}`));
  const seams=createFacegroupBoundaryPreview({mesh:s.mesh,body:s.body,scene:s.scene,edges:autoUnwrapSeams(s.mesh,result.uvCorners).filter(([a,b])=>!guideKeys.has(a<b?`${a}:${b}`:`${b}:${a}`))});
  const guides=guideEdges.length?createFacegroupBoundaryPreview({mesh:s.mesh,body:s.body,scene:s.scene,edges:guideEdges,color:0x55ddff}):null;
  const update=()=>{s.body.updateWorldMatrix(true,false);body.matrix.copy(s.body.matrixWorld);body.matrixWorldNeedsUpdate=true;seams.update();guides?.update();};update();
  return {update,dispose(){seams.dispose();guides?.dispose();body.removeFromParent();geometry.dispose();material.dispose();texture.dispose();}};
 }
 async function begin({guided:useGroups=false}={}){
  reset();beforeStart();lastCheck=0;const c=getContext();if(!c){message('Choose one Base object in UV tools');return false;}
  const error=autoUnwrapTargetError(c.object,c.mesh,c.owner?.topologySignature);if(error){message(error);return false;}
  const token=generation;let input;
  try{input=prepareAutoUnwrapMesh(c.mesh,c.owner,{guided:useGroups});}catch(error){message(error.message);return false;}
  if(!c.scene||!c.body){message('UV viewport is not ready');return false;}
  staged={...c,key:input.key,payload:c.object.glbPassthrough,payloadKey:JSON.stringify(c.object.glbPassthrough??null),settings:JSON.stringify(c.object.settings||{}),input};preview.disabled=true;if(guided)guided.disabled=true;apply.hidden=true;cancel.hidden=false;message((useGroups?'Facegroup Guided':'Auto Unwrap')+' running; source UVs unchanged');tick();
  try{
   job=startJob(input,{onStage:text=>{if(token===generation)status.textContent=text;}});
   const result=await job.promise;if(token!==generation)return false;job=null;
   if(!current(staged)){reset();message('Auto Unwrap target changed; preview again');return false;}
   // Worker performs full overlap validation. Main verifies coverage/folds again
   // before allocating preview geometry, using the exact staged source triangles.
   validateAutoUnwrapResult(input,result,{overlaps:false});staged.result=result;overlay=makeOverlay(staged,result);apply.hidden=false;message(`${useGroups?'Facegroup Guided':'Auto Unwrap'} preview · ${result.chartCount} patches${useGroups?' in '+input.regionCount+' regions · cyan group boundaries · orange automatic cuts':' · checker and orange seams'} · Apply UVs or Cancel`);return true;
  }catch(error){if(token!==generation)return false;reset();message('Auto Unwrap · '+error.message);return false;}
 }
 function commit(){
  const s=staged;if(!s?.result||!current(s)){reset();message('Auto Unwrap target changed; preview again');return false;}
  const result=commitAutoUnwrapUV(s.object,s.mesh,s.owner.topologySignature,s.history,s.result);if(!result.ok){message(result.reason);return false;}
  const count=s.result.chartCount,label=s.result.guided?'Facegroup Guided':'Auto Unwrap';reset();onCommit(result);message(`${label} applied · ${count} patches · Undo restores previous UVs`);return true;
 }
 preview.addEventListener('click',()=>begin());guided?.addEventListener('click',()=>begin({guided:true}));apply.addEventListener('click',commit);cancel.addEventListener('click',()=>{reset();message('Auto Unwrap cancelled · original UVs unchanged');});
 return {preview:begin,apply:commit,cancel:reset,get busy(){return !!job;}};
}
