import * as THREE from 'three';
import {createPaintLayer} from '../evaluations/uv-paint/paint-core.js?v=905';
import {createStroke} from '../evaluations/uv-paint/stroke.js?v=896';
import {captureColourResource} from './paint-resource.js?v=898';
import {createPaintLayerStack,appendPaintLayer,replacePaintLayer,flattenPaintLayerStack} from './paint-layer-stack.js?v=0.36.18.908';
import {captureLayeredColourResource,capturePaintResource} from './paint-layer-resource.js?v=0.36.18.909';
import {createProjectPaintPool} from './project-paint-resources.js?v=0.36.18.909';
import {paintTargetKey,paintTargetDigest,paintTexture,createPaintSurface} from './paint-target.js?v=0.36.18.909';
// Scene history, selection, camera and body lifetime remain with the existing app.
export function createViewportPainter({target,activeId=()=>target()?.id,body,owner,camera,controls,scene,checkpoint,onClose=()=>{},refresh=()=>{},allowed=()=>true,objects=()=>[target()]}){
 let session=null,generation=0,stroke=null;const ray=new THREE.Raycaster(),occluderMaterial=new THREE.MeshBasicMaterial({side:THREE.DoubleSide});
 function current(){if(!session)return false;const o=session.object;return !session.display.disposed&&allowed()&&activeId()===session.id&&o?.id===session.id&&o.colourPaint===session.resource&&o.glbPassthrough===session.uv&&o.visible!==false&&!o.locked&&!o.sourceId&&!o.arrayRecipe&&!o.booleanRecipe&&!o.curveProfile&&!o.settings?.subd&&!Object.values(o.settings?.mirror||{}).some(Boolean);}
 function cancel(){if(!stroke)return;stroke.path.cancel();session?.layer.finish(true);if(session)updatePreview();controls.enabled=stroke.controls;stroke=null;}
 function close(redraw=true){generation++;if(!session)return;cancel();const old=session;session=null;old.body.geometry.removeEventListener('dispose',old.lost);old.display.dispose();old.layer.dispose();onClose();if(redraw)refresh(old.body);}
 async function open(){close();const token=++generation,o=target();if(o?.locked||o?.visible===false)throw Error('Unlock and show the selected object first');const key=paintTargetKey(o,o?.mesh,owner),resource=o.colourPaint,binding=await paintTargetDigest(key);
  if(token!==generation||!allowed()||target()!==o||target()?.colourPaint!==resource||paintTargetKey(target(),target()?.mesh,owner)!==key)throw Error('Object changed while opening paint');
  if(resource&&(resource.binding!==binding||resource.width!==512||resource.height!==512))throw Error('Stored paint no longer matches this geometry/UVs; Undo the mesh or UV change first');
  const b=body();if(!b?.geometry)throw Error('Selected viewport body unavailable');const geometry=owner.buildUVPreviewGeometry(o.mesh,o.glbPassthrough);if(!geometry)throw Error('UV geometry unavailable');
  const stack=resource?.version>=2?capturePaintResource(resource).layers:null,selected=stack?.layers.at(-1)?.id||'$base',preview=new Uint8Array(512*512*4).fill(255);if(resource)preview.set(resource.pixels);
  let layer,display;try{layer=createPaintLayer(512,{transparent:!!stack&&selected!=='$base'});if(stack)layer.restore(selected==='$base'?stack.base.pixels:stack.layers.find(l=>l.id===selected).pixels);else if(resource)layer.restore(resource.pixels);for(const child of [...b.children])child.userData?.boxlabColourPaintDispose?.();display=createPaintSurface(b,geometry,paintTexture(preview,512));display.show();}catch(e){geometry.dispose();display?.dispose();layer?.dispose();throw e;}
  const lost=()=>close(false);session={object:o,id:o.id,key,binding,resource,uv:o.glbPassthrough,body:b,layer,display,lost,stack,selected,preview,dirty:true,paintTarget:'colour'};b.geometry.addEventListener('dispose',lost);return true;
 }
 function hit(p){if(!current())return null;scene.updateMatrixWorld(true);ray.setFromCamera(new THREE.Vector2(p.x/p.width*2-1,1-p.y/p.height*2),camera);
  const proxy=new THREE.Mesh(session.display.surface.geometry,session.display.surface.material);proxy.matrixWorld.copy(session.body.matrixWorld);const h=ray.intersectObject(proxy,false)[0];if(!h?.uv)return null;
  let blocked=false;scene.traverse(b=>{if(blocked||b===session.body||!['body','boxlab-inactive-body'].includes(b.userData?.kind)||!b.geometry)return;for(let a=b;a;a=a.parent)if(!a.visible)return;const other=new THREE.Mesh(b.geometry,occluderMaterial);other.matrixWorld.copy(b.matrixWorld);const nearest=ray.intersectObject(other,false)[0];if(nearest&&nearest.distance<h.distance-1e-6)blocked=true;});return blocked?null:h;
 }
 function begin(p,settings,kind='boxlab',maskValue=0){if(!session||stroke)return false;const selected=session.stack?.layers.find(l=>l.id===session.selected);if(selected&&(!selected.visible||!selected.opacity))throw Error('Show the selected layer and increase its opacity before painting');if(session.paintTarget==='mask'){if(!selected?.mask?.enabled)throw Error('Enable the selected layer mask before painting it');if(!Number.isInteger(maskValue)||maskValue<0||maskValue>255)throw Error('Mask value must be 0 to 255');const hex=maskValue.toString(16).padStart(2,'0');settings={...settings,colour:'#'+hex.repeat(3)};}if(selected?.image&&session.paintTarget==='colour')throw Error('Image colour is retained; paint its mask or select a paint layer');if(!current()||paintTargetKey(target(),target()?.mesh,owner)!==session.key){close();return false;}session.layer.begin(settings);const enabled=controls.enabled;controls.enabled=false;const path=createStroke(kind,q=>{const h=hit({...q,width:p.width,height:p.height});if(h)session.layer.stamp(h.uv.x,h.uv.y,q.pressure);});stroke={path,controls:enabled};path.start(p);return true;}
 function move(p){if(stroke){if(!current()){close();return;}stroke.path.move(p);}}
 function finish(p){if(!stroke)return false;if(p)move(p);if(!stroke)return false;stroke.path.end();const enabled=stroke.controls;stroke=null;controls.enabled=enabled;
  if(!current()||paintTargetKey(target(),target()?.mesh,owner)!==session.key){session.layer.finish(true);close();return false;}
  if(!session.layer.finish())return false;
  try{
   const resource=session.stack?captureLayeredColourResource(workingStack()):captureColourResource({width:512,height:512,pixels:session.layer.pixels,binding:session.binding});
   return commit(resource);
  }catch(error){loadLayer();updatePreview();throw error;}
 }
 function workingStack(){const s=session;if(s.stack.layers.find(l=>l.id===s.selected)?.image&&s.paintTarget==='colour')return s.stack;if(s.selected==='$base')return {...s.stack,base:captureColourResource({...s.stack.base,pixels:s.layer.pixels})};
  const maskPixels=s.paintTarget==='mask'?new Uint8Array(512*512):null;if(maskPixels)for(let i=0;i<maskPixels.length;i++)maskPixels[i]=s.layer.pixels[i*4];
  return {...s.stack,layers:s.stack.layers.map(l=>l.id===s.selected?(maskPixels?{...l,mask:{...l.mask,pixels:maskPixels}}:{...l,pixels:s.layer.pixels}):l)};
 }
 function updatePreview(){if(!session)return;session.preview.set(session.stack?flattenPaintLayerStack(workingStack()).pixels:session.layer.pixels);session.dirty=true;}
 function loadLayer(){const s=session;if(!s)return;const selected=s.stack?.layers.find(l=>l.id===s.selected);if(s.paintTarget==='mask'&&!selected?.mask)s.paintTarget='colour';
  s.layer.dispose();s.layer=createPaintLayer(512,{transparent:!!selected&&s.paintTarget!=='mask'});
  if(s.paintTarget==='mask'){const rgba=new Uint8Array(512*512*4),mask=selected.mask.pixels;for(let i=0;i<mask.length;i++){const at=i*4;rgba[at]=rgba[at+1]=rgba[at+2]=mask[i];rgba[at+3]=255;}s.layer.restore(rgba);}
  else{const pixels=selected?.pixels||s.stack?.base.pixels||s.resource?.pixels;if(pixels)s.layer.restore(pixels);}
 }
 function commit(resource){
  if(!current()||paintTargetKey(target(),target()?.mesh,owner)!==session.key){close();throw Error('Object changed during paint');}
  const pool=createProjectPaintPool();for(const o of objects()){const r=o===target()?resource:o?.colourPaint;if(r)pool.add(r);}
  if(!checkpoint())throw Error('Scene history checkpoint unavailable');
  target().colourPaint=resource;session.resource=resource;session.stack=resource.version>=2?resource.layers:null;loadLayer();updatePreview();return true;
 }
 function ready(){if(!session)return false;cancel();if(!current()||paintTargetKey(target(),target()?.mesh,owner)!==session.key){close();return false;}return true;}
 function selectLayer(id){if(!ready())return false;if(id!=='$base'&&!session.stack?.layers.some(l=>l.id===id))throw Error('Unknown paint layer');session.selected=id;session.paintTarget='colour';loadLayer();return true;}
 function addLayer(){if(!ready())return false;const s=session,stack=s.stack||createPaintLayerStack(s.resource||captureColourResource({width:512,height:512,pixels:s.preview,binding:s.binding}));let n=1;while(stack.layers.some(l=>l.id==='layer'+n))n++;const id='layer'+n,resource=captureLayeredColourResource(appendPaintLayer(stack,{id,name:'Layer '+n}));if(commit(resource)){session.selected=id;session.paintTarget='colour';loadLayer();return true;}return false;}
 function editLayer(patch){if(!ready()||session.selected==='$base')return false;const layer=session.stack.layers.find(l=>l.id===session.selected);if(Object.keys(patch).every(k=>layer[k]===patch[k]))return false;return commit(captureLayeredColourResource(replacePaintLayer(session.stack,session.selected,patch)));}
 function removeLayer(){if(!ready()||session.selected==='$base')return false;const s=session,layers=s.stack.layers.filter(l=>l.id!==s.selected);if(commit(captureLayeredColourResource({...s.stack,layers}))){session.selected=layers.at(-1)?.id||'$base';loadLayer();return true;}return false;}
 function moveLayer(direction){if(!ready()||session.selected==='$base'||![-1,1].includes(direction))return false;const layers=[...session.stack.layers],i=layers.findIndex(l=>l.id===session.selected),j=i+direction;if(j<0||j>=layers.length)return false;[layers[i],layers[j]]=[layers[j],layers[i]];return commit(captureLayeredColourResource({...session.stack,layers}));}
 function selectPaintTarget(value){if(!ready())return false;if(!['colour','mask'].includes(value))throw Error('Unknown paint target');if(value==='mask'&&!session.stack?.layers.find(l=>l.id===session.selected)?.mask)throw Error('Add a mask to the selected paint layer first');if(session.paintTarget===value)return false;session.paintTarget=value;loadLayer();return true;}
 function addMask(){if(!ready())return false;const layer=session.stack?.layers.find(l=>l.id===session.selected);if(!layer)throw Error('Select a paint layer above Base colour for a mask');if(layer.mask)return false;
  if(commit(captureLayeredColourResource(replacePaintLayer(session.stack,session.selected,{mask:{enabled:true,inverted:false,pixels:new Uint8Array(512*512).fill(255)}})))){session.paintTarget='mask';loadLayer();return true;}return false;
 }
 function editMask(patch){if(!ready())return false;const layer=session.stack?.layers.find(l=>l.id===session.selected);if(!layer?.mask)throw Error('Add a mask to the selected paint layer first');if(!patch||Object.keys(patch).some(k=>!['enabled','inverted'].includes(k)))throw Error('Unsupported mask edit');if(Object.keys(patch).every(k=>layer.mask[k]===patch[k]))return false;return commit(captureLayeredColourResource(replacePaintLayer(session.stack,session.selected,{mask:{...layer.mask,...patch}})));}
 function removeMask(){if(!ready())return false;const layer=session.stack?.layers.find(l=>l.id===session.selected);if(!layer?.mask)return false;return commit(captureLayeredColourResource(replacePaintLayer(session.stack,session.selected,{mask:null})));}
 function state(){const s=session;return s?{selected:s.selected,paintTarget:s.paintTarget,layered:!!s.stack,layers:[{id:'$base',name:'Base colour',visible:true,opacity:1,blendMode:'normal',mask:null},...(s.stack?.layers||[]).map(({id,name,visible,opacity,blendMode,mask,image})=>({id,name,visible,opacity,blendMode,image:!!image,mask:mask?{enabled:mask.enabled,inverted:mask.inverted}:null}))]}:null;}
 return {open,close,cancel,begin,move,finish,hit,selectLayer,addLayer,editLayer,removeLayer,moveLayer,selectPaintTarget,addMask,editMask,removeMask,
  tick(){if(session&&!current()){close();return;}if(session?.layer.consumeDirty())updatePreview();if(session?.dirty){session.display.surface.material.map.needsUpdate=true;session.dirty=false;}},
  get state(){return state();},get active(){return !!session;},get drawing(){return !!stroke;},get pixels(){return session?.preview;}};
}
