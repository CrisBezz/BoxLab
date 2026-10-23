import * as THREE from 'three';
import {paintMaterialEnvironments} from './paint-material-environment.js?v=0.36.18.925';
import {encodeBoxlabScene} from './boxlab-project-codec.js?v=0.36.18.938';
import {copyMetalnessResource} from './metalness-resource.js?v=0.36.18.921';
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
export function createPaintSurface(body,geometry,texture,{renderer=globalThis.__boxlabBridgeState?.renderer,environmentPool=paintMaterialEnvironments}={}){
 const fallback=body.material,source=body.geometry,material=new THREE.MeshBasicMaterial({map:texture,toneMapped:false}),surface=new THREE.Mesh(geometry,material);let disposed=false,lit=null,colourMap=null,roughnessMap=null,metalnessMap=null,environment=null;
 surface.userData.boxlabRenderOverlay=true;surface.raycast=()=>{};
 // Textures belong to this surface, never the shared committed resources.
 // Roughness G and metalness B are linear data; colour keeps the accepted sRGB map.
 function validateScalar(resource,rgba,label){if(resource){const {width,height,pixels}=resource;if(![width,height].every(v=>Number.isInteger(v)&&v>=16&&v<=512)||!(pixels instanceof Uint8Array)||pixels.length!==width*height*(rgba?4:1))throw Error('Invalid material '+label+' preview');}}
 function scalarTexture(texture,resource,rgba,channel){
  const {width,height,pixels}=resource;
  if(!texture||texture.image.width!==width||texture.image.height!==height){texture?.dispose();texture=new THREE.DataTexture(new Uint8Array(width*height*4),width,height,THREE.RGBAFormat);texture.colorSpace=THREE.NoColorSpace;texture.flipY=false;texture.generateMipmaps=false;texture.minFilter=texture.magFilter=THREE.LinearFilter;}
  const data=texture.image.data;for(let i=0;i<width*height;i++){data[i*4]=255;data[i*4+1]=0;data[i*4+2]=0;data[i*4+channel]=pixels[i*(rgba?4:1)];data[i*4+3]=255;}texture.needsUpdate=true;return texture;
 }
 function showMaterial(colour,roughness,rgba=false,metalness=null,metalnessRGBA=false){
  if(disposed)return;
  const colourSize=colour?Math.sqrt(colour.length/4):0;
  if(colour&&(!(colour instanceof Uint8Array)||![512,1024].includes(colourSize)))throw Error('Invalid material colour preview');
  validateScalar(roughness,rgba,'roughness');validateScalar(metalness,metalnessRGBA,'metalness');
  if(!lit)lit=new THREE.MeshStandardMaterial({color:0xffffff,roughness:1,metalness:0,side:THREE.FrontSide});
  if(colour){if(!colourMap||colourMap.image.width!==colourSize){colourMap?.dispose();colourMap=paintTexture(colour.slice(),colourSize);}else{colourMap.image.data.set(colour);colourMap.needsUpdate=true;}}
  if(roughness)roughnessMap=scalarTexture(roughnessMap,roughness,rgba,1);
  if(metalness)metalnessMap=scalarTexture(metalnessMap,metalness,metalnessRGBA,2);
  let scene=body;while(scene&&!scene.isScene)scene=scene.parent;
  if(metalness&&!scene?.environment){environment??=environmentPool.acquire(renderer);}
  else if(environment){environment.release();environment=null;}
  const nextEnvironment=environment?.texture||null;
  if(lit.envMap!==nextEnvironment){lit.envMap=nextEnvironment;lit.needsUpdate=true;}
  const nextColour=colour?colourMap:null,nextRoughness=roughness?roughnessMap:null,nextMetalness=metalness?metalnessMap:null;
  if(lit.map!==nextColour||lit.roughnessMap!==nextRoughness||lit.metalnessMap!==nextMetalness)lit.needsUpdate=true;
  lit.map=nextColour;lit.roughnessMap=nextRoughness;lit.metalnessMap=nextMetalness;lit.metalness=metalness?1:0;surface.material=lit;surface.castShadow=body.castShadow;surface.receiveShadow=body.receiveShadow;
 }
 function dispose(){if(disposed)return;disposed=true;source.removeEventListener('dispose',dispose);body.remove(surface);if(body.material===hidden)body.material=fallback;geometry.dispose();material.dispose();texture.dispose();lit?.dispose();colourMap?.dispose();roughnessMap?.dispose();metalnessMap?.dispose();environment?.release();environment=null;}
 surface.userData.boxlabColourPaintDispose=dispose;source.addEventListener('dispose',dispose);body.add(surface);
 return {surface,showMaterial,replaceChannelTexture(next){texture.dispose();texture=next;material.map=next;material.needsUpdate=true;},showChannel(){if(!disposed)surface.material=material;},show(){if(!disposed){surface.visible=true;body.material=hidden;for(const child of [...body.children])if(child.userData?.boxlabBackfaceCue){body.remove(child);child.material?.dispose?.();}}},dispose,get disposed(){return disposed;}};
}
export function createCommittedPaintSurface(body,object,mesh,owner=globalThis.__boxlabExportAs){
 const resource=object?.colourPaint,roughness=object?.roughnessPaint,metalness=object?.metalnessPaint;if(!resource&&!roughness&&!metalness)return null;
 if(resource&&(![512,1024].includes(resource.width)||resource.height!==resource.width))return null;
 let key,geometry,scalar,metal;try{key=paintTargetKey(object,mesh,owner);if(roughness)scalar=copyRoughnessResource(roughness);if(metalness)metal=copyMetalnessResource(metalness);geometry=owner.buildUVPreviewGeometry(mesh,object.glbPassthrough);if(!geometry)return null;}catch{return null;}
 const display=createPaintSurface(body,geometry,paintTexture(resource?.pixels||new Uint8Array([255,255,255,255]),resource?resource.width:1));display.surface.visible=false;
 display.ready=paintTargetDigest(key).then(binding=>{
  if(display.disposed)return;
  if(object.colourPaint!==resource||object.roughnessPaint!==roughness||object.metalnessPaint!==metalness||paintTargetKey(object,mesh,owner)!==key){display.dispose();return;}
  const colourValid=resource?.binding===binding,roughnessValid=scalar?.binding===binding,metalnessValid=metal?.binding===binding;
  // Do not show a stale channel with a valid neighbour. Scalar-only uses white.
  if(resource&&!colourValid||!colourValid&&!roughnessValid&&!metalnessValid){display.dispose();return;}
  // Committed colour is albedo, including image/AO composites. Use the same
  // scene-lit material even without scalar maps; Channel stays an editing view.
  display.showMaterial(colourValid?resource.pixels:null,roughnessValid?scalar:null,false,metalnessValid?metal:null);
  display.show();
 }).catch(()=>display.dispose());return display;
}
