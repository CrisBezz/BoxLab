import {createPaintFilterDomain} from './paint-filter-domain.js?v=0.36.18.936';
import * as THREE from 'three';
import {createPaintLayer} from '../evaluations/uv-paint/paint-core.js?v=0.36.18.941';
import {createStroke} from '../evaluations/uv-paint/stroke.js?v=896';
import {captureColourResource} from './paint-resource.js?v=898';
import {createPaintLayerStack,appendPaintLayer,replacePaintLayer,flattenPaintLayerStack,appendImagePaintLayer,replaceImagePaintLayer,rasterizeImagePaintLayer,enlargePaintLayerStack,mergePaintLayersToBase} from './paint-layer-stack.js?v=0.36.18.938';
import {projectPaintImage} from './paint-image-project.js?v=0.36.18.936';
import {surfaceImageFrameFromHit} from './paint-image-surface.js?v=0.36.18.933';
import {capturePaintImagePlacement,paintImagePlacementFromCamera} from './paint-image-placement.js?v=0.36.18.907';
import {captureLayeredColourResource,capturePaintResource} from './paint-layer-resource.js?v=0.36.18.938';
import {createProjectPaintPool} from './project-paint-resources.js?v=0.36.18.938';
import {paintTargetKey,paintTargetDigest,paintTexture,createPaintSurface} from './paint-target.js?v=0.36.18.938';
import {captureRoughnessResource,copyRoughnessResource} from './roughness-resource.js?v=0.36.18.921';
import {createProjectRoughnessPool} from './project-roughness-resources.js?v=0.36.18.921';
import {captureMetalnessResource,copyMetalnessResource} from './metalness-resource.js?v=0.36.18.921';
import {createProjectMetalnessPool} from './project-metalness-resources.js?v=0.36.18.921';
const scalarOwners={roughness:{field:'roughnessPaint',capture:captureRoughnessResource,copy:copyRoughnessResource,pool:createProjectRoughnessPool,initial:255,label:'Roughness'},metalness:{field:'metalnessPaint',capture:captureMetalnessResource,copy:copyMetalnessResource,pool:createProjectMetalnessPool,initial:0,label:'Metalness'}};
// Scene history, selection, camera and body lifetime remain with the existing app.
export function createViewportPainter({target,activeId=()=>target()?.id,body,owner,camera,controls,scene,checkpoint,onClose=()=>{},refresh=()=>{},allowed=()=>true,objects=()=>[target()],newColourSize=512}){
 if(![512,1024].includes(newColourSize))throw Error('New colour texture must be 512 or 1024');
 let session=null,generation=0,stroke=null;const ray=new THREE.Raycaster(),occluderMaterial=new THREE.MeshBasicMaterial({side:THREE.DoubleSide});
 function current(){if(!session)return false;const o=session.object;return !session.display.disposed&&allowed()&&activeId()===session.id&&o?.id===session.id&&o.colourPaint===session.resource&&o.roughnessPaint===session.roughness&&o.metalnessPaint===session.metalness&&o.glbPassthrough===session.uv&&o.visible!==false&&!o.locked&&!o.sourceId&&!o.arrayRecipe&&!o.booleanRecipe&&!o.curveProfile&&!o.settings?.subd&&!Object.values(o.settings?.mirror||{}).some(Boolean);}
 function cancel(){if(!stroke)return;stroke.path?.cancel();session?.layer.finish(true);if(session)updatePreview();controls.enabled=stroke.controls;stroke=null;}
 function close(redraw=true){generation++;if(!session)return;cancel();const old=session;session=null;old.body.geometry.removeEventListener('dispose',old.lost);old.display.dispose();old.layer.dispose();onClose();if(redraw)refresh(old.body);}
 async function open(){close();const token=++generation,o=target();if(o?.locked||o?.visible===false)throw Error('Unlock and show the selected object first');const key=paintTargetKey(o,o?.mesh,owner),resource=o.colourPaint,roughness=o.roughnessPaint,metalness=o.metalnessPaint,binding=await paintTargetDigest(key);
  if(token!==generation||!allowed()||target()!==o||target()?.colourPaint!==resource||target()?.roughnessPaint!==roughness||target()?.metalnessPaint!==metalness||paintTargetKey(target(),target()?.mesh,owner)!==key)throw Error('Object changed while opening paint');
  const size=resource?.width||newColourSize;
  if(resource&&(resource.binding!==binding||![512,1024].includes(size)||resource.height!==size))throw Error('Stored paint no longer matches this geometry/UVs; Undo the mesh or UV change first');
  for(const [channel,cfg] of Object.entries(scalarOwners)){const resource=o[cfg.field];if(resource){const r=cfg.copy(resource);if(r.binding!==binding)throw Error('Stored '+channel+' no longer matches this geometry/UVs; Undo the mesh or UV change first');}}
  const b=body();if(!b?.geometry)throw Error('Selected viewport body unavailable');const geometry=owner.buildUVPreviewGeometry(o.mesh,o.glbPassthrough,{faceIndices:true});if(!geometry)throw Error('UV geometry unavailable');
  const preview=new Uint8Array(size*size*4).fill(255);if(resource)preview.set(resource.pixels);
  // Opening a new 1024 document stays transient: first edit uses the accepted
  // layered profile; no blank resource or history entry is published on open.
  const stack=resource?.version>=2?capturePaintResource(resource).layers:!resource&&size===1024?createPaintLayerStack(captureColourResource({width:size,height:size,pixels:preview,binding})):null,selected=stack?.layers.at(-1)?.id||'$base';
  let layer,display;try{layer=createPaintLayer(size,{transparent:!!stack&&selected!=='$base'});if(stack)layer.restore(selected==='$base'?stack.base.pixels:stack.layers.find(l=>l.id===selected).pixels);else if(resource)layer.restore(resource.pixels);for(const child of [...b.children])child.userData?.boxlabColourPaintDispose?.();display=createPaintSurface(b,geometry,paintTexture(preview,size));display.show();}catch(e){geometry.dispose();display?.dispose();layer?.dispose();throw e;}
  const lost=()=>close(false);session={size,object:o,id:o.id,key,binding,resource,roughness,metalness,uv:o.glbPassthrough,body:b,layer,display,lost,stack,selected,preview,dirty:true,paintTarget:'colour',previewMode:'channel'};b.geometry.addEventListener('dispose',lost);return true;
 }
 function hit(p){if(!current())return null;scene.updateMatrixWorld(true);ray.setFromCamera(new THREE.Vector2(p.x/p.width*2-1,1-p.y/p.height*2),camera);
  const proxy=new THREE.Mesh(session.display.surface.geometry,session.display.surface.material);proxy.matrixWorld.copy(session.body.matrixWorld);const h=ray.intersectObject(proxy,false)[0];if(!h?.uv)return null;
  let blocked=false;scene.traverse(b=>{if(blocked||b===session.body||!['body','boxlab-inactive-body'].includes(b.userData?.kind)||!b.geometry)return;for(let a=b;a;a=a.parent)if(!a.visible)return;const other=new THREE.Mesh(b.geometry,occluderMaterial);other.matrixWorld.copy(b.matrixWorld);const nearest=ray.intersectObject(other,false)[0];if(nearest&&nearest.distance<h.distance-1e-6)blocked=true;});return blocked?null:h;
 }
 function scalar(){return !!session&&Object.hasOwn(scalarOwners,session.paintTarget);}
 function begin(p,settings,kind='boxlab',maskValue=0,roughnessValue=128,metalnessValue=255,action='paint'){if(!['paint','fill','erase','blur','smudge'].includes(action))throw Error('Unknown paint action');if(!session||stroke)return false;clearImagePreview();const selected=session.stack?.layers.find(l=>l.id===session.selected);if(!scalar()&&selected&&(!selected.visible||!selected.opacity))throw Error('Show the selected layer and increase its opacity before painting');if(scalar()){const value=session.paintTarget==='roughness'?roughnessValue:metalnessValue;if(!Number.isInteger(value)||value<0||value>255)throw Error(scalarOwners[session.paintTarget].label+' value must be 0 to 255');const hex=value.toString(16).padStart(2,'0');settings={...settings,colour:'#'+hex.repeat(3)};}if(session.paintTarget==='mask'){if(!selected?.mask?.enabled)throw Error('Enable the selected layer mask before painting it');if(!Number.isInteger(maskValue)||maskValue<0||maskValue>255)throw Error('Mask value must be 0 to 255');const hex=maskValue.toString(16).padStart(2,'0');settings={...settings,colour:'#'+hex.repeat(3)};}if(action==='erase'){const value=scalar()?scalarOwners[session.paintTarget].initial:session.paintTarget==='mask'?(selected?.mask?.inverted?0:255):255;const hex=value.toString(16).padStart(2,'0');settings={...settings,colour:'#'+hex.repeat(3)};}if(selected?.image&&session.paintTarget==='colour')throw Error('Image colour is retained; use Convert to paint for Brush/Blur, or edit its mask');if(!current()||paintTargetKey(target(),target()?.mesh,owner)!==session.key){close();return false;}if(['fill','blur','smudge'].includes(action)&&!hit(p))return false;let filter=null;if(['blur','smudge'].includes(action)){const filterSize=scalar()?512:session.size;if(session.filterDomain?.labels.length!==filterSize*filterSize)session.filterDomain=null;session.filterDomain??=createPaintFilterDomain(session.display.surface.geometry,scalar()?512:session.size,{mesh:session.object.mesh,payload:session.uv,topologySignature:owner.topologySignature});filter={domains:session.filterDomain.labels,neighbours:session.filterDomain.neighbours,amount:action==='blur'?(settings.blurAmount??1):1};}session.layer.begin(settings,{erase:action==='erase'&&session.paintTarget==='colour'&&!!selected,filter,smudge:action==='smudge'});const enabled=controls.enabled;controls.enabled=false;if(action==='fill'){stroke={fill:true,start:{x:p.x,y:p.y},controls:enabled};session.layer.fill();return true;}const path=createStroke(kind,q=>{const h=hit({...q,width:p.width,height:p.height});if(h)session.layer.stamp(h.uv.x,h.uv.y,q.pressure,['blur','smudge'].includes(action)?session.filterDomain.faceAt(h.faceIndex):null);else if(action==='smudge')session.layer.resetPickup();});stroke={path,controls:enabled};path.start(p);return true;}
 function move(p){if(stroke){if(!current()){close();return;}if(stroke.fill){if(Math.hypot(p.x-stroke.start.x,p.y-stroke.start.y)>8)cancel();return;}try{stroke.path.move(p);}catch(error){cancel();throw error;}}}
 function finish(p){if(!stroke)return false;if(p)move(p);if(!stroke)return false;try{stroke.path?.end();}catch(error){cancel();throw error;}const enabled=stroke.controls;stroke=null;controls.enabled=enabled;
  if(!current()||paintTargetKey(target(),target()?.mesh,owner)!==session.key){session.layer.finish(true);close();return false;}
  if(!session.layer.finish())return false;
  try{
   if(scalar())return commitScalar();
   const resource=session.stack?captureLayeredColourResource(workingStack()):captureColourResource({width:session.size,height:session.size,pixels:session.layer.pixels,binding:session.binding});
   return commit(resource);
  }catch(error){loadLayer();updatePreview();throw error;}
 }
 function workingStack(){const s=session;if(s.stack.layers.find(l=>l.id===s.selected)?.image&&s.paintTarget==='colour')return s.stack;if(s.selected==='$base')return {...s.stack,base:captureColourResource({...s.stack.base,pixels:s.layer.pixels})};
  const maskPixels=s.paintTarget==='mask'?new Uint8Array(s.size*s.size):null;if(maskPixels)for(let i=0;i<maskPixels.length;i++)maskPixels[i]=s.layer.pixels[i*4];
  return {...s.stack,layers:s.stack.layers.map(l=>l.id===s.selected?(maskPixels?{...l,mask:{...l.mask,pixels:maskPixels}}:{...l,pixels:s.layer.pixels}):l)};
 }
 function scalarPreview(){const s=session;if(s.size===512)return s.layer.pixels;const out=s.preview;for(let y=0;y<s.size;y++)for(let x=0;x<s.size;x++){const at=(y*s.size+x)*4,from=((y>>1)*512+(x>>1))*4;out.set(s.layer.pixels.subarray(from,from+4),at);}return out;}
 function updatePreview(){if(!session)return;session.preview.set(scalar()?scalarPreview():session.imagePreview?.resource.pixels||(session.stack?flattenPaintLayerStack(workingStack()).pixels:session.layer.pixels));session.dirty=true;}
 function updateMaterialPreview(){const s=session;if(!s)return;
  if(s.previewMode!=='material'){s.display.showChannel();return;}
  const colour=scalar()?(s.resource?.pixels||null):s.preview;
  const roughness=s.paintTarget==='roughness'?{width:512,height:512,pixels:s.layer.pixels}:s.roughness;
  const metalness=s.paintTarget==='metalness'?{width:512,height:512,pixels:s.layer.pixels}:s.metalness;
  s.display.showMaterial(colour,roughness,s.paintTarget==='roughness',metalness,s.paintTarget==='metalness');
 }
 function selectPreviewMode(value){if(!ready())return false;if(!['channel','material'].includes(value))throw Error('Unknown paint preview');if(session.previewMode===value)return false;session.previewMode=value;session.dirty=true;return true;}
 function loadLayer(){const s=session;if(!s)return;const selected=s.stack?.layers.find(l=>l.id===s.selected);if(s.paintTarget==='mask'&&!selected?.mask)s.paintTarget='colour';
  s.layer.dispose();s.layer=createPaintLayer(scalar()?512:s.size,{transparent:!!selected&&s.paintTarget==='colour'});
  if(scalar()){const cfg=scalarOwners[s.paintTarget],rgba=new Uint8Array(512*512*4).fill(255),pixels=s[s.paintTarget]?.pixels;for(let i=0;i<512*512;i++)rgba[i*4]=rgba[i*4+1]=rgba[i*4+2]=pixels?pixels[i]:cfg.initial;s.layer.restore(rgba);}
  else if(s.paintTarget==='mask'){const rgba=new Uint8Array(s.size*s.size*4),mask=selected.mask.pixels;for(let i=0;i<mask.length;i++){const at=i*4;rgba[at]=rgba[at+1]=rgba[at+2]=mask[i];rgba[at+3]=255;}s.layer.restore(rgba);}
  else{const pixels=selected?.pixels||s.stack?.base.pixels||s.resource?.pixels;if(pixels)s.layer.restore(pixels);}
 }
 // The opaque raster interpolates raw bytes; equal RGB channels carry linear R8
 // values without gamma conversion or colour blend modes. Publish only R8 copies.
 function commitScalar(){
  if(!current()||paintTargetKey(target(),target()?.mesh,owner)!==session.key){close();throw Error('Object changed during paint');}
  const pixels=new Uint8Array(512*512);for(let i=0;i<pixels.length;i++)pixels[i]=session.layer.pixels[i*4];
  const channel=session.paintTarget,cfg=scalarOwners[channel],resource=cfg.capture({width:512,height:512,pixels,binding:session.binding}),pool=cfg.pool();
  for(const o of objects()){const r=o===target()?resource:o?.[cfg.field];if(r)pool.add(r);}
  if(!checkpoint())throw Error('Scene history checkpoint unavailable');
  target()[cfg.field]=resource;session[channel]=resource;loadLayer();updatePreview();return true;
 }
 function colourOnly(){if(scalar())throw Error('Switch to Colour to edit layers, masks or images');}
 function preflight(resource){const pool=createProjectPaintPool();for(const o of objects()){const r=o===target()?resource:o?.colourPaint;if(r)pool.add(r);}}
 function clearImagePreview(){if(session?.imagePreview){session.imagePreview=null;updatePreview();}}
 function commit(resource){
  if(!current()||paintTargetKey(target(),target()?.mesh,owner)!==session.key){close();throw Error('Object changed during paint');}
  preflight(resource);
  if(!checkpoint())throw Error('Scene history checkpoint unavailable');
  target().colourPaint=resource;session.imagePreview=null;session.resource=resource;session.stack=resource.version>=2?resource.layers:null;loadLayer();updatePreview();return true;
 }
 function ready(){if(!session)return false;cancel();clearImagePreview();if(!current()||paintTargetKey(target(),target()?.mesh,owner)!==session.key){close();return false;}return true;}
 function selectLayer(id){if(!ready())return false;colourOnly();if(id!=='$base'&&!session.stack?.layers.some(l=>l.id===id))throw Error('Unknown paint layer');session.selected=id;session.paintTarget='colour';loadLayer();return true;}
 function addLayer(){colourOnly();if(!ready())return false;const s=session,stack=s.stack||createPaintLayerStack(s.resource||captureColourResource({width:s.size,height:s.size,pixels:s.preview,binding:s.binding}));let n=1;while(stack.layers.some(l=>l.id==='layer'+n))n++;const id='layer'+n,resource=captureLayeredColourResource(appendPaintLayer(stack,{id,name:'Layer '+n}));if(commit(resource)){session.selected=id;session.paintTarget='colour';loadLayer();return true;}return false;}
 function prepareImage(source,placement,{replace=false,name='Image layer',surface=null}={}){colourOnly();
 const s=session,selected=s.stack?.layers.find(l=>l.id===s.selected);
  if(replace&&!selected?.image)throw Error('Select an image layer to edit');
  const stack=s.stack||createPaintLayerStack(s.resource||captureColourResource({width:s.size,height:s.size,pixels:s.preview,binding:s.binding}));
  if(!replace&&stack.layers.length>=3)throw Error('Delete a layer first; three overlays maximum');
  scene.updateMatrixWorld(true);
  const image={version:1,source,placement:placement?.worldToClip?capturePaintImagePlacement(placement):paintImagePlacementFromCamera(camera,placement),objectToWorld:s.body.matrixWorld.toArray()},result=projectPaintImage({geometry:s.display.surface.geometry,image,scene,body:s.body,size:s.size,surface,mesh:s.object.mesh,payload:s.uv,topologySignature:owner.topologySignature});
  let n=1;while(stack.layers.some(l=>l.id==='image'+n))n++;const id=replace?s.selected:'image'+n;
  const next=replace?replaceImagePaintLayer(stack,id,result):appendImagePaintLayer(stack,{...result,id,name:name.trim().slice(0,64)||'Image layer'});
  return {resource:captureLayeredColourResource(next),id};
 }
 function projectImage(source,placement,options={}){if(!ready())return false;const candidate=prepareImage(source,placement,options);return publishImage(candidate);}
 function publishImage(candidate){if(commit(candidate.resource)){session.selected=candidate.id;session.paintTarget='colour';loadLayer();return true;}return false;}
 function previewImage(source,placement,options={}){if(!ready())return false;const candidate=prepareImage(source,placement,options);preflight(candidate.resource);session.imagePreview=candidate;updatePreview();return true;}
 function applyImagePreview(){const candidate=session?.imagePreview;if(!candidate||!ready())return false;try{return publishImage(candidate);}catch(error){updatePreview();throw error;}}
 function surfaceFrame(p,source){if(!current())return null;const h=hit(p);return h?surfaceImageFrameFromHit(h,{matrixWorld:session.body.matrixWorld,geometry:session.display.surface.geometry,source}):null;}

 function rasterizeImage(){colourOnly();if(session?.imagePreview)throw Error('Apply or cancel image placement before converting');if(!ready())return false;
  const s=session;if(!s.stack?.layers.find(l=>l.id===s.selected)?.image)throw Error('Select an image layer to convert');
  if(commit(captureLayeredColourResource(rasterizeImagePaintLayer(s.stack,s.selected)))){session.paintTarget='colour';loadLayer();updatePreview();return true;}return false;
 }
 function increaseResolution(){colourOnly();if(session?.imagePreview)throw Error('Apply or cancel image placement before increasing resolution');if(!ready())return false;
  const s=session;if(s.size!==512)throw Error('Colour texture is already 1024 × 1024');
  const stack=s.stack||createPaintLayerStack(s.resource||captureColourResource({width:s.size,height:s.size,pixels:s.preview,binding:s.binding}));
  const enlarged=enlargePaintLayerStack(stack),resource=captureLayeredColourResource(enlarged);
  preflight(resource);
  let layer,texture;try{const selected=enlarged.layers.find(l=>l.id===s.selected);layer=createPaintLayer(1024,{transparent:!!selected&&s.paintTarget==='colour'});
   if(s.paintTarget==='mask'){const rgba=new Uint8Array(1024*1024*4),mask=selected.mask.pixels;for(let i=0;i<mask.length;i++){const at=i*4;rgba[at]=rgba[at+1]=rgba[at+2]=mask[i];rgba[at+3]=255;}layer.restore(rgba);}else layer.restore(selected?.pixels||enlarged.base.pixels);
   const preview=resource.pixels.slice();texture=paintTexture(preview,1024);
   if(!current()||paintTargetKey(target(),target()?.mesh,owner)!==s.key)throw Error('Object changed during paint');
   if(!checkpoint())throw Error('Scene history checkpoint unavailable');
   target().colourPaint=resource;s.resource=resource;s.stack=resource.version>=2?resource.layers:null;s.size=1024;s.preview=preview;s.layer.dispose();s.layer=layer;s.filterDomain=null;s.display.replaceChannelTexture(texture);s.dirty=true;return true;
  }catch(error){layer?.dispose();texture?.dispose();throw error;}
 }
 function mergeLayers(all=false){colourOnly();if(session?.imagePreview)throw Error('Apply or cancel image placement before merging');if(!ready())return false;
  const s=session;if(!s.stack?.layers.length||!all&&s.selected==='$base')return false;
  const resource=captureLayeredColourResource(mergePaintLayersToBase(s.stack,all?null:s.selected));
  if(commit(resource)){session.selected='$base';session.paintTarget='colour';loadLayer();updatePreview();return true;}return false;
 }
 function imageForEdit(){if(!ready())return null;const image=session.stack?.layers.find(l=>l.id===session.selected)?.image;return image?{source:image.source,placement:{centre:[...image.placement.centre],size:[...image.placement.size],rotation:image.placement.rotation}}:null;}
 function editLayer(patch){colourOnly();if(!ready()||session.selected==='$base')return false;const layer=session.stack.layers.find(l=>l.id===session.selected);if(Object.keys(patch).every(k=>layer[k]===patch[k]))return false;return commit(captureLayeredColourResource(replacePaintLayer(session.stack,session.selected,patch)));}
 function removeLayer(){colourOnly();if(!ready()||session.selected==='$base')return false;const s=session,layers=s.stack.layers.filter(l=>l.id!==s.selected);if(commit(captureLayeredColourResource({...s.stack,layers}))){session.selected=layers.at(-1)?.id||'$base';loadLayer();return true;}return false;}
 function moveLayer(direction){colourOnly();if(!ready()||session.selected==='$base'||![-1,1].includes(direction))return false;const layers=[...session.stack.layers],i=layers.findIndex(l=>l.id===session.selected),j=i+direction;if(j<0||j>=layers.length)return false;[layers[i],layers[j]]=[layers[j],layers[i]];return commit(captureLayeredColourResource({...session.stack,layers}));}
 function selectPaintTarget(value){if(!ready())return false;if(!['colour','mask','roughness','metalness'].includes(value))throw Error('Unknown paint target');if(value==='mask'&&!session.stack?.layers.find(l=>l.id===session.selected)?.mask)throw Error('Add a mask to the selected paint layer first');if(session.paintTarget===value)return false;if(Object.hasOwn(scalarOwners,value)&&session[value]&&(session[value].width!==512||session[value].height!==512))throw Error(scalarOwners[value].label+' painting requires a 512 × 512 map; existing map kept unchanged');session.paintTarget=value;loadLayer();updatePreview();return true;}
 function addMask(){colourOnly();if(!ready())return false;const layer=session.stack?.layers.find(l=>l.id===session.selected);if(!layer)throw Error('Select a paint layer above Base colour for a mask');if(layer.mask)return false;
  if(commit(captureLayeredColourResource(replacePaintLayer(session.stack,session.selected,{mask:{enabled:true,inverted:false,pixels:new Uint8Array(session.size*session.size).fill(255)}})))){session.paintTarget='mask';loadLayer();return true;}return false;
 }
 function editMask(patch){colourOnly();if(!ready())return false;const layer=session.stack?.layers.find(l=>l.id===session.selected);if(!layer?.mask)throw Error('Add a mask to the selected paint layer first');if(!patch||Object.keys(patch).some(k=>!['enabled','inverted'].includes(k)))throw Error('Unsupported mask edit');if(Object.keys(patch).every(k=>layer.mask[k]===patch[k]))return false;return commit(captureLayeredColourResource(replacePaintLayer(session.stack,session.selected,{mask:{...layer.mask,...patch}})));}
 function removeMask(){colourOnly();if(!ready())return false;const layer=session.stack?.layers.find(l=>l.id===session.selected);if(!layer?.mask)return false;return commit(captureLayeredColourResource(replacePaintLayer(session.stack,session.selected,{mask:null})));}
 function state(){const s=session;return s?{resolution:s.size,selected:s.selected,paintTarget:s.paintTarget,previewMode:s.previewMode,layered:!!s.stack,layers:[{id:'$base',name:'Base colour',visible:true,opacity:1,blendMode:'normal',mask:null},...(s.stack?.layers||[]).map(({id,name,visible,opacity,blendMode,mask,image})=>({id,name,visible,opacity,blendMode,image:!!image,mask:mask?{enabled:mask.enabled,inverted:mask.inverted}:null}))]}:null;}
 return {open,close,cancel,begin,move,finish,hit,selectPreviewMode,selectLayer,addLayer,editLayer,removeLayer,moveLayer,selectPaintTarget,addMask,editMask,removeMask,projectImage,imageForEdit,rasterizeImage,increaseResolution,mergeToBase:()=>mergeLayers(false),flattenLayers:()=>mergeLayers(true),previewImage,applyImagePreview,clearImagePreview,surfaceFrame,
  tick(){if(session&&!current()){close();return;}if(session?.layer.consumeDirty())updatePreview();if(session?.dirty){updateMaterialPreview();const map=session.display.surface.material.map;if(session.previewMode==='channel'&&map)map.needsUpdate=true;session.dirty=false;}},
  get state(){return state();},get active(){return !!session;},get drawing(){return !!stroke;},get pixels(){return session?.preview;}};
}
