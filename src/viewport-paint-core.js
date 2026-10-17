import * as THREE from 'three';
import {createPaintLayer} from '../evaluations/uv-paint/paint-core.js?v=896';
import {createStroke} from '../evaluations/uv-paint/stroke.js?v=896';
import {captureColourResource} from './paint-resource.js?v=898';
import {paintTargetKey,paintTargetDigest,paintTexture,createPaintSurface} from './paint-target.js?v=0.36.18.900';
// Scene history, selection, camera and body lifetime remain with the existing app.
export function createViewportPainter({target,activeId=()=>target()?.id,body,owner,camera,controls,scene,checkpoint,onClose=()=>{},refresh=()=>{},allowed=()=>true}){
 let session=null,generation=0,stroke=null;const ray=new THREE.Raycaster(),occluderMaterial=new THREE.MeshBasicMaterial({side:THREE.DoubleSide});
 function current(){if(!session)return false;const o=session.object;return !session.display.disposed&&allowed()&&activeId()===session.id&&o?.id===session.id&&o.colourPaint===session.resource&&o.glbPassthrough===session.uv&&o.visible!==false&&!o.locked&&!o.sourceId&&!o.arrayRecipe&&!o.booleanRecipe&&!o.curveProfile&&!o.settings?.subd&&!Object.values(o.settings?.mirror||{}).some(Boolean);}
 function cancel(){if(!stroke)return;stroke.path.cancel();session?.layer.finish(true);controls.enabled=stroke.controls;stroke=null;}
 function close(redraw=true){generation++;if(!session)return;cancel();const old=session;session=null;old.body.geometry.removeEventListener('dispose',old.lost);old.display.dispose();old.layer.dispose();onClose();if(redraw)refresh(old.body);}
 async function open(){close();const token=++generation,o=target();if(o?.locked||o?.visible===false)throw Error('Unlock and show the selected object first');const key=paintTargetKey(o,o?.mesh,owner),resource=o.colourPaint,binding=await paintTargetDigest(key);
  if(token!==generation||!allowed()||target()!==o||target()?.colourPaint!==resource||paintTargetKey(target(),target()?.mesh,owner)!==key)throw Error('Object changed while opening paint');
  if(resource&&(resource.binding!==binding||resource.width!==512||resource.height!==512))throw Error('Stored paint no longer matches this geometry/UVs; Undo the mesh or UV change first');
  const b=body();if(!b?.geometry)throw Error('Selected viewport body unavailable');const geometry=owner.buildUVPreviewGeometry(o.mesh,o.glbPassthrough);if(!geometry)throw Error('UV geometry unavailable');
  let layer,display;try{layer=createPaintLayer();if(resource)layer.restore(resource.pixels);for(const child of [...b.children])child.userData?.boxlabColourPaintDispose?.();display=createPaintSurface(b,geometry,paintTexture(layer.pixels,512));display.show();}catch(e){geometry.dispose();display?.dispose();layer?.dispose();throw e;}
  const lost=()=>close(false);session={object:o,id:o.id,key,binding,resource,uv:o.glbPassthrough,body:b,layer,display,lost};b.geometry.addEventListener('dispose',lost);return true;
 }
 function hit(p){if(!current())return null;scene.updateMatrixWorld(true);ray.setFromCamera(new THREE.Vector2(p.x/p.width*2-1,1-p.y/p.height*2),camera);
  const proxy=new THREE.Mesh(session.display.surface.geometry,session.display.surface.material);proxy.matrixWorld.copy(session.body.matrixWorld);const h=ray.intersectObject(proxy,false)[0];if(!h?.uv)return null;
  let blocked=false;scene.traverse(b=>{if(blocked||b===session.body||!['body','boxlab-inactive-body'].includes(b.userData?.kind)||!b.geometry)return;for(let a=b;a;a=a.parent)if(!a.visible)return;const other=new THREE.Mesh(b.geometry,occluderMaterial);other.matrixWorld.copy(b.matrixWorld);const nearest=ray.intersectObject(other,false)[0];if(nearest&&nearest.distance<h.distance-1e-6)blocked=true;});return blocked?null:h;
 }
 function begin(p,settings,kind='boxlab'){if(!session||stroke)return false;if(!current()||paintTargetKey(target(),target()?.mesh,owner)!==session.key){close();return false;}session.layer.begin(settings);const enabled=controls.enabled;controls.enabled=false;const path=createStroke(kind,q=>{const h=hit({...q,width:p.width,height:p.height});if(h)session.layer.stamp(h.uv.x,h.uv.y,q.pressure);});stroke={path,controls:enabled};path.start(p);return true;}
 function move(p){if(stroke){if(!current()){close();return;}stroke.path.move(p);}}
 function finish(p){if(!stroke)return false;if(p)move(p);if(!stroke)return false;stroke.path.end();const enabled=stroke.controls;stroke=null;controls.enabled=enabled;
  if(!current()||paintTargetKey(target(),target()?.mesh,owner)!==session.key){session.layer.finish(true);close();return false;}
  if(!session.layer.finish())return false;
  const resource=captureColourResource({width:512,height:512,pixels:session.layer.pixels,binding:session.binding});
  if(!checkpoint()){session.layer.restore(session.resource?.pixels||new Uint8Array(512*512*4).fill(255));throw Error('Scene history checkpoint unavailable');}
  target().colourPaint=resource;session.resource=resource;return true;
 }
 return {open,close,cancel,begin,move,finish,hit,tick(){if(session&&!current()){close();return;}if(session?.layer.consumeDirty())session.display.surface.material.map.needsUpdate=true;},get active(){return !!session;},get drawing(){return !!stroke;},get pixels(){return session?.layer.pixels;}};
}
