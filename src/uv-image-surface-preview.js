import * as THREE from 'three';
import {importedUVImageChoices,decodeUVImage} from './uv-image-preview.js?v=0.36.18.880';
// First surface stage: one USED opaque core material on the active Base object.
// Mixed materials deliberately refuse rather than guessing a per-face assignment.
export function uvImageSurfaceSource(payload){
 if(!Array.isArray(payload?.materialIndices))return null;
 const used=new Set(payload.materialIndices);if(used.size!==1)return null;
 const id=[...used][0],choice=importedUVImageChoices(payload).find(c=>c.materialIndex===id);
 if(!choice||Object.keys(payload.materials[id].pbrMetallicRoughness.baseColorTexture.extensions||{}).length)return null;
 const material=payload.materials[id],factor=material.pbrMetallicRoughness.baseColorFactor??[1,1,1,1];
 if(Object.keys(material.extensions||{}).length||(material.alphaMode??'OPAQUE')!=='OPAQUE'||!Array.isArray(factor)||factor.length!==4||factor.some(v=>!Number.isFinite(v)||v<0||v>1)||factor[3]!==1)return null;
 const texture=payload.textures[material.pbrMetallicRoughness.baseColorTexture.index];
 const sampler=texture.sampler===undefined?{}:Number.isInteger(texture.sampler)&&texture.sampler>=0?payload.samplers?.[texture.sampler]:null;
 if(!sampler||![33071,33648,10497].includes(sampler.wrapS??10497)||![33071,33648,10497].includes(sampler.wrapT??10497)||![9728,9729].includes(sampler.magFilter??9729)||![9728,9729,9984,9985,9986,9987].includes(sampler.minFilter??9987))return null;
 return {choice,factor,sampler,doubleSided:material.doubleSided===true};
}
const wraps={33071:THREE.ClampToEdgeWrapping,33648:THREE.MirroredRepeatWrapping,10497:THREE.RepeatWrapping};
const filters={9728:THREE.NearestFilter,9729:THREE.LinearFilter,9984:THREE.NearestMipmapNearestFilter,9985:THREE.LinearMipmapNearestFilter,9986:THREE.NearestMipmapLinearFilter,9987:THREE.LinearMipmapLinearFilter};
export function createUVImageOverlay(body,mesh,payload,buildGeometry,hiddenMaterial,{decode=decodeUVImage}={}){
 const source=uvImageSurfaceSource(payload);if(!source||!body?.geometry||typeof buildGeometry!=='function')return null;
 const geometry=buildGeometry(mesh,payload);if(!geometry)return null;
 const overlay=new THREE.Mesh(geometry,new THREE.MeshBasicMaterial());overlay.visible=false;
 overlay.userData.boxlabRenderOverlay=true;overlay.userData.boxlabUVImagePreview=true;overlay.raycast=()=>{};
 const sourceGeometry=body.geometry,fallback=body.material;let disposed=false,image=null,texture=null;
 function dispose(){
  if(disposed)return;disposed=true;sourceGeometry.removeEventListener('dispose',dispose);body.remove(overlay);
  if(body.material===hiddenMaterial)body.material=fallback;
  geometry.dispose();overlay.material.dispose();texture?.dispose();image?.close?.();image=null;texture=null;
 }
 overlay.userData.boxlabUVImageDispose=dispose;sourceGeometry.addEventListener('dispose',dispose);body.add(overlay);
 // A canceled-before-start request does no decoding. Late decode results cannot
 // hide a replacement body/look and release their bitmap immediately.
 Promise.resolve().then(()=>disposed?null:decode(source.choice)).then(value=>{
  if(disposed){value?.close?.();return;}
  if(!value){dispose();return;}
  image=value;texture=new THREE.Texture(image);texture.flipY=false;texture.colorSpace=THREE.SRGBColorSpace;
  texture.wrapS=wraps[source.sampler.wrapS??10497];texture.wrapT=wraps[source.sampler.wrapT??10497];
  texture.magFilter=filters[source.sampler.magFilter??9729];texture.minFilter=filters[source.sampler.minFilter??9987];texture.needsUpdate=true;
  const material=overlay.material;material.map=texture;material.color.fromArray(source.factor);material.side=source.doubleSided?THREE.DoubleSide:THREE.FrontSide;material.toneMapped=false;material.needsUpdate=true;
  overlay.visible=true;body.material=hiddenMaterial;
 }).catch(()=>dispose());
 return overlay;
}
