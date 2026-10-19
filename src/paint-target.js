import * as THREE from 'three';
import {encodeBoxlabScene} from './boxlab-project-codec.js?v=0.36.18.921';
import {copyRoughnessResource} from './roughness-resource.js?v=0.36.18.921';
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
 const fallback=body.material,source=body.geometry,material=new THREE.MeshBasicMaterial({map:texture,toneMapped:false}),surface=new THREE.Mesh(geometry,material);let disposed=false,lit=null,colourMap=null,roughnessMap=null;
 surface.userData.boxlabRenderOverlay=true;surface.raycast=()=>{};
 // Textures belong to this surface, never the shared committed resources.
 // Roughness is sampled from G as linear data; colour keeps the accepted sRGB map.
 function showMaterial(colour,roughness,rgba=false){
  if(disposed)return;
  if(colour&&(!(colour instanceof Uint8Array)||colour.length!==512*512*4))throw Error('Invalid material colour preview');
  if(roughness){const {width,height,pixels}=roughness;if(![width,height].every(v=>Number.isInteger(v)&&v>=16&&v<=512)||!(pixels instanceof Uint8Array)||pixels.length!==width*height*(rgba?4:1))throw Error('Invalid material roughness preview');}
  if(!lit)lit=new THREE.MeshStandardMaterial({color:0xffffff,roughness:1,metalness:0,side:THREE.FrontSide});
  if(colour){if(!colourMap)colourMap=paintTexture(colour.slice(),512);else{colourMap.image.data.set(colour);colourMap.needsUpdate=true;}}
  if(roughness){
   const {width,height,pixels}=roughness;
   if(!roughnessMap||roughnessMap.image.width!==width||roughnessMap.image.height!==height){roughnessMap?.dispose();roughnessMap=new THREE.DataTexture(new Uint8Array(width*height*4),width,height,THREE.RGBAFormat);roughnessMap.colorSpace=THREE.NoColorSpace;roughnessMap.flipY=false;roughnessMap.generateMipmaps=false;roughnessMap.minFilter=roughnessMap.magFilter=THREE.LinearFilter;}
   const data=roughnessMap.image.data;for(let i=0;i<width*height;i++){data[i*4]=255;data[i*4+1]=pixels[i*(rgba?4:1)];data[i*4+2]=0;data[i*4+3]=255;}roughnessMap.needsUpdate=true;
  }
  const nextColour=colour?colourMap:null,nextRoughness=roughness?roughnessMap:null;
  if(lit.map!==nextColour||lit.roughnessMap!==nextRoughness)lit.needsUpdate=true;
  lit.map=nextColour;lit.roughnessMap=nextRoughness;surface.material=lit;surface.castShadow=body.castShadow;surface.receiveShadow=body.receiveShadow;
 }
 function dispose(){if(disposed)return;disposed=true;source.removeEventListener('dispose',dispose);body.remove(surface);if(body.material===hidden)body.material=fallback;geometry.dispose();material.dispose();texture.dispose();lit?.dispose();colourMap?.dispose();roughnessMap?.dispose();}
 surface.userData.boxlabColourPaintDispose=dispose;source.addEventListener('dispose',dispose);body.add(surface);
 return {surface,showMaterial,showChannel(){if(!disposed)surface.material=material;},show(){if(!disposed){surface.visible=true;body.material=hidden;for(const child of [...body.children])if(child.userData?.boxlabBackfaceCue){body.remove(child);child.material?.dispose?.();}}},dispose,get disposed(){return disposed;}};
}
export function createCommittedPaintSurface(body,object,mesh,owner=globalThis.__boxlabExportAs){
 const resource=object?.colourPaint,roughness=object?.roughnessPaint;if(!resource&&!roughness)return null;
 if(resource&&(resource.width!==512||resource.height!==512))return null;
 let key,geometry,scalar;try{key=paintTargetKey(object,mesh,owner);if(roughness)scalar=copyRoughnessResource(roughness);geometry=owner.buildUVPreviewGeometry(mesh,object.glbPassthrough);if(!geometry)return null;}catch{return null;}
 const display=createPaintSurface(body,geometry,paintTexture(resource?.pixels||new Uint8Array([255,255,255,255]),resource?512:1));display.surface.visible=false;
 display.ready=paintTargetDigest(key).then(binding=>{
  if(display.disposed)return;
  if(object.colourPaint!==resource||object.roughnessPaint!==roughness||paintTargetKey(object,mesh,owner)!==key){display.dispose();return;}
  const colourValid=resource?.binding===binding,roughnessValid=scalar?.binding===binding;
  // Do not show a stale channel with a valid neighbour. Roughness-only uses white.
  if(resource&&!colourValid||!colourValid&&!roughnessValid){display.dispose();return;}
  if(roughnessValid)display.showMaterial(resource?.pixels||null,scalar);
  display.show();
 }).catch(()=>display.dispose());return display;
}
