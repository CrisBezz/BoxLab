import * as THREE from 'three';
import {prepareAutoUnwrapMesh,autoUVFingerprint,autoUnwrapSeams,guidedUnwrapSeams,validateMarkedUVSeams,validateAutoUnwrapResult} from './auto-unwrap-core.js?v=0.36.18.1200';
import {startAutoUnwrapJob} from './auto-unwrap-job.js?v=0.36.18.1200';
import {autoUnwrapTargetError,commitAutoUnwrapUV} from './imported-uv-edit.js?v=0.36.18.1189';
import {createFacegroupBoundaryPreview} from './facegroup-boundary-preview.js?v=0.36.18.1191';
export function installAutoUnwrapWorkflow({document,host,notice,getContext,onCommit,say,getMarkedEdges=()=>[],startJob=startAutoUnwrapJob,beforeStart=()=>{},requestFrame=requestAnimationFrame,cancelFrame=cancelAnimationFrame}){
 const row=document.createElement('div');row.className='outliner-actions';row.innerHTML='<button type="button" data-autouv="preview" title="Unwrap unpainted Base geometry automatically; no Facegroups required">Auto Unwrap</button><button type="button" data-autouv="guided" title="Keep Facegroups separate and let the solver add cuts within them">Guided Unwrap</button><button type="button" data-autouv="seams" title="Unwrap using the marked Edge-mode seams">Seam Unwrap</button><button type="button" data-autouv="apply" hidden>Apply UVs</button><button type="button" data-autouv="cancel" hidden>Cancel</button><label title="Texture resolution used for gutter and density calculations">Map size <select data-autouv="map-size"><option value="1024">1024</option><option value="2048">2048</option></select></label><label title="Reserved pixels around each UV island">Gutter <select data-autouv="gutter"><option value="2">2 px</option><option value="4" selected>4 px</option><option value="8">8 px</option><option value="16">16 px</option></select></label><label title="Allow chart rotation during packing"><input data-autouv="rotate" type="checkbox" checked> Rotate charts</label><label title="Area-averaged texels per model unit. Leave blank for automatic density">Texels/unit <input data-autouv="density" type="number" min="0" step="any" inputmode="decimal" placeholder="Auto" style="width:6em"></label><output data-autouv="status" role="status" aria-live="polite"></output>';host.prepend(row);
 const button=n=>row.querySelector(`[data-autouv="${n}"]`),preview=button('preview'),guided=button('guided'),seam=button('seams'),apply=button('apply'),cancel=button('cancel'),status=button('status'),mapSize=button('map-size'),gutter=button('gutter'),rotate=button('rotate'),density=button('density');let job=null,staged=null,overlay=null,raf=null,generation=0,lastCheck=0;
 const message=text=>{notice.hidden=false;notice.textContent=text;say(text);status.textContent=text;};
 function removeOverlay(){overlay?.dispose();overlay=null;}
 function reset(){generation++;job?.cancel();job=null;staged=null;removeOverlay();if(raf!==null)cancelFrame(raf);raf=null;preview.disabled=guided.disabled=seam.disabled=false;apply.hidden=cancel.hidden=true;status.textContent='';}
 function current(s,geometry=true){const c=getContext();return !!c&&c.object===s.object&&c.mesh===s.mesh&&c.object.glbPassthrough===s.payload&&!autoUnwrapTargetError(c.object,c.mesh,c.owner?.topologySignature)&&JSON.stringify(c.object.settings||{})===s.settings&&(!geometry||autoUVFingerprint(c.mesh)===s.key&&JSON.stringify(c.object.glbPassthrough??null)===s.payloadKey);}
 function tick(){raf=null;if(!staged)return;const check=Date.now()-lastCheck>=200;if(!current(staged,check)){reset();message('Auto Unwrap target changed; preview again');return;}if(check)lastCheck=Date.now();overlay?.update();raf=requestFrame(tick);}
 function makeOverlay(s,result){
  const {borders}=s.input;
  const marked=s.markedEdges;
  const key=([a,b])=>a<b?`${a}:${b}`:`${b}:${a}`;
  const markedKeys=new Set(marked.map(key));
  const edges=(borders?guidedUnwrapSeams(s.mesh,result.uvCorners,borders):autoUnwrapSeams(s.mesh,result.uvCorners)).filter(edge=>!markedKeys.has(key(edge)));
  const payload={version:1,source:'boxlab',uvTopologySignature:s.owner.topologySignature(s.mesh),uvCorners:result.uvCorners},geometry=s.owner.buildUVPreviewGeometry(s.mesh,payload);
  if(!geometry)throw Error('Could not display Auto Unwrap preview');
  const pixels=new Uint8Array(128*128*4);for(let y=0;y<128;y++)for(let x=0;x<128;x++){const v=((x>>3)+(y>>3))%2?220:68,i=(y*128+x)*4;pixels.set([v,v,v,255],i);}
  const texture=new THREE.DataTexture(pixels,128,128);texture.magFilter=THREE.NearestFilter;texture.needsUpdate=true;
  const material=new THREE.MeshBasicMaterial({map:texture,side:THREE.DoubleSide,polygonOffset:true,polygonOffsetFactor:-2,polygonOffsetUnits:-2}),body=new THREE.Mesh(geometry,material);body.raycast=()=>{};body.userData.boxlabRenderOverlay=true;body.userData.boxlabAutoUVPreview=true;body.matrixAutoUpdate=false;body.renderOrder=149;s.scene.add(body);
  const seams=createFacegroupBoundaryPreview({mesh:s.mesh,body:s.body,scene:s.scene,edges});
  const groupSeams=borders?.length?createFacegroupBoundaryPreview({mesh:s.mesh,body:s.body,scene:s.scene,edges:borders.filter(edge=>!markedKeys.has(key(edge))),color:0x47d8ff}):null;
  const markedSeams=marked.length?createFacegroupBoundaryPreview({mesh:s.mesh,body:s.body,scene:s.scene,edges:marked,color:0xe879fa}):null;
  const update=()=>{s.body.updateWorldMatrix(true,false);body.matrix.copy(s.body.matrixWorld);body.matrixWorldNeedsUpdate=true;seams.update();groupSeams?.update();markedSeams?.update();};update();
  return {update,dispose(){seams.dispose();groupSeams?.dispose();markedSeams?.dispose();body.removeFromParent();geometry.dispose();material.dispose();texture.dispose();}};
 }
 async function begin(useGroups=false,useMarked=false){
  const name=useGroups?"Guided Unwrap":useMarked?"Seam Unwrap":"Auto Unwrap";
  reset();beforeStart();lastCheck=0;const c=getContext();if(!c){message('Choose one Base object in UV tools');return false;}
  const error=autoUnwrapTargetError(c.object,c.mesh,c.owner?.topologySignature);if(error){message(error);return false;}
  const markedEdges=useGroups||useMarked?getMarkedEdges(c.object,c.mesh):[];
  if(useMarked&&!markedEdges.length){message('Select shared edges in Edge mode and choose Mark UV Seams first');return false;}
  const token=generation;let input;
  try{input=prepareAutoUnwrapMesh(c.mesh,c.owner,{guided:useGroups,markedEdges});}catch(error){message(error.message);return false;}
  input.packing={mapSize:Number(mapSize.value||1024),gutter:Number(gutter.value||4),rotate:rotate.checked!==false,density:density.value===""&&!density.validity?.badInput?null:Number(density.value)};
  if(!c.scene||!c.body){message('UV viewport is not ready');return false;}
  staged={...c,name,markedEdges,key:input.key,payload:c.object.glbPassthrough,payloadKey:JSON.stringify(c.object.glbPassthrough??null),settings:JSON.stringify(c.object.settings||{}),input};preview.disabled=guided.disabled=seam.disabled=true;apply.hidden=true;cancel.hidden=false;message(name+' running · source UVs unchanged');tick();
  try{
   job=startJob(input,{onStage:text=>{if(token===generation)status.textContent=text;}});
   const result=await job.promise;if(token!==generation)return false;job=null;
   if(!current(staged)){reset();message('Auto Unwrap target changed; preview again');return false;}
   // Worker performs full overlap validation. Main verifies coverage/folds again
   // before allocating preview geometry, using the exact staged source triangles.
   validateAutoUnwrapResult(input,result,{overlaps:false});
   validateMarkedUVSeams(input,result.uvCorners);
   const splitRegions=result.regionCounts?.filter(count=>count>1).length;
   const splitNote=splitRegions?` · ${splitRegions} ${splitRegions===1?"region":"regions"} split`:'';
   const quality=result.quality;
   const qualityNote=quality?` · ${result.packing.mapSize}px map · ${result.packing.gutter}px gutter · ${Math.round(quality.coverage*100)}% coverage · ${Number(quality.texelsPerUnit.toPrecision(4))} texels/unit · max stretch ${quality.maxStretch.toFixed(2)}× · overlap check passed`:'';
   staged.result=result;overlay=makeOverlay(staged,result);apply.hidden=false;message(`${name} preview · ${result.chartCount} ${result.chartCount===1?"patch":"patches"}${splitNote} · ${useGroups?"cyan group borders, orange other seams":"checker and orange seams"}${markedEdges.length?` · ${markedEdges.length} marked ${markedEdges.length===1?"seam":"seams"} in magenta`:""}${qualityNote} · Apply UVs or Cancel`);return true;
  }catch(error){if(token!==generation)return false;reset();message(name+' · '+error.message);return false;}
 }
 function commit(){
  const s=staged;if(!s?.result||!current(s)){reset();message('Auto Unwrap target changed; preview again');return false;}
  const result=commitAutoUnwrapUV(s.object,s.mesh,s.owner.topologySignature,s.history,s.result);if(!result.ok){message(result.reason);return false;}
  const count=s.result.chartCount,name=s.name;reset();onCommit(result);message(`${name} applied · ${count} ${count===1?"patch":"patches"} · Undo restores previous UVs`);return true;
 }
 for(const setting of [mapSize,gutter,rotate,density])setting.addEventListener('change',()=>{
  if(staged){reset();message('Packing settings changed · preview again');}
 });
 preview.addEventListener('click',()=>begin());guided.addEventListener('click',()=>begin(true));seam.addEventListener('click',()=>begin(false,true));apply.addEventListener('click',commit);cancel.addEventListener('click',()=>{reset();message('Auto Unwrap cancelled · original UVs unchanged');});
 return {preview:()=>begin(),previewGuided:()=>begin(true),apply:commit,cancel:reset,get busy(){return !!job;}};
}
