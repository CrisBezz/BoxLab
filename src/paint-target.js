import * as THREE from 'three';
import {encodeBoxlabScene} from './boxlab-project-codec.js?v=0.36.18.899';
import {paintDigest} from './paint-resource.js?v=898';
const encoder=new TextEncoder(),hidden=new THREE.MeshBasicMaterial({colorWrite:false,depthWrite:false});
// Reuse original codec/UV topology validation. Positions may move/deform with unchanged UVs.
export function paintTargetKey(object,mesh=object?.mesh,owner=globalThis.__boxlabExportAs){
 const s=object?.settings||{},p=object?.glbPassthrough;
 if(!object||object.kind==='reference'||object.sourceId||object.arrayRecipe||object.booleanRecipe||object.curveProfile||s.subd||Object.values(s.mirror||{}).some(Boolean)||p?.source!=='boxlab'||p.version!==1||p.uvTopologySignature!==owner?.topologySignature(mesh)||!mesh?.faces?.length||mesh.faces.reduce((n,f)=>n+f.length,0)>20000)throw Error('Choose one unlocked native UV object; turn SubD/Mirror off and create UVs in UV Editor first (20,000 corners maximum)');
 const encoded=encodeBoxlabScene({objects:[{mesh,glbPassthrough:p,kind:'editable',settings:{}}]}).objects[0];
 return JSON.stringify({uv:encoded.glbResource});
}
export const paintTargetDigest=key=>paintDigest(encoder.encode(key));
export function paintTexture(pixels,size){const t=new THREE.DataTexture(pixels,size,size,THREE.RGBAFormat);t.colorSpace=THREE.SRGBColorSpace;t.flipY=false;t.generateMipmaps=false;t.minFilter=t.magFilter=THREE.LinearFilter;t.needsUpdate=true;return t;}
// One surface/lifetime owner for committed display and temporary stroke preview.
export function createPaintSurface(body,geometry,texture){
 const fallback=body.material,source=body.geometry,material=new THREE.MeshBasicMaterial({map:texture,toneMapped:false}),surface=new THREE.Mesh(geometry,material);let disposed=false;
 surface.userData.boxlabRenderOverlay=true;surface.raycast=()=>{};
 function dispose(){if(disposed)return;disposed=true;source.removeEventListener('dispose',dispose);body.remove(surface);if(body.material===hidden)body.material=fallback;geometry.dispose();material.dispose();texture.dispose();}
 surface.userData.boxlabColourPaintDispose=dispose;source.addEventListener('dispose',dispose);body.add(surface);
 return {surface,show(){if(!disposed){surface.visible=true;body.material=hidden;for(const child of [...body.children])if(child.userData?.boxlabBackfaceCue){body.remove(child);child.material?.dispose?.();}}},dispose,get disposed(){return disposed;}};
}
export function createCommittedPaintSurface(body,object,mesh,owner=globalThis.__boxlabExportAs){
 const resource=object?.colourPaint;if(!resource||resource.width!==512||resource.height!==512)return null;
 let key,geometry;try{key=paintTargetKey(object,mesh,owner);geometry=owner.buildUVPreviewGeometry(mesh,object.glbPassthrough);if(!geometry)return null;}catch{return null;}
 const display=createPaintSurface(body,geometry,paintTexture(resource.pixels,512));display.surface.visible=false;
 display.ready=paintTargetDigest(key).then(binding=>{if(display.disposed)return;if(binding!==resource.binding||object.colourPaint!==resource||paintTargetKey(object,mesh,owner)!==key){display.dispose();return;}display.show();}).catch(()=>display.dispose());return display;
}
