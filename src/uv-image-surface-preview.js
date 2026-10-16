import * as THREE from 'three';
import {importedUVImageChoices,decodeUVImage} from './uv-image-preview.js?v=0.36.18.885';
// Active Base inspection. Mixed materials require exact per-face import provenance.
// Names/facegroup labels are never interpreted as material assignments.
export function uvImageMaterialSource(payload){
 if(payload?.source!=='glb'||payload.version!==1||!Array.isArray(payload.materialIndices))return null;
 const used=new Set(payload.materialIndices);if(used.size!==1)return null;
 const id=[...used][0],material=Number.isInteger(id)&&id>=0?payload.materials?.[id]:null;if(!material)return null;
 const factor=material.pbrMetallicRoughness?.baseColorFactor??[1,1,1,1];
 if(Object.keys(material.extensions||{}).length||(material.alphaMode??'OPAQUE')!=='OPAQUE'||!Array.isArray(factor)||factor.length!==4||factor.some(v=>!Number.isFinite(v)||v<0||v>1)||factor[3]!==1)return null;
 return {materialIndex:id,material,factor};
}
export function uvImageSurfaceSource(payload){
 const source=uvImageMaterialSource(payload);if(!source)return null;
 const {materialIndex:id,material,factor}=source;
 const choice=importedUVImageChoices(payload).find(c=>c.materialIndex===id);
 if(!choice||Object.keys(material.pbrMetallicRoughness.baseColorTexture.extensions||{}).length)return null;
 const texture=payload.textures[material.pbrMetallicRoughness.baseColorTexture.index];
 const sampler=texture.sampler===undefined?{}:Number.isInteger(texture.sampler)&&texture.sampler>=0?payload.samplers?.[texture.sampler]:null;
 if(!sampler||![33071,33648,10497].includes(sampler.wrapS??10497)||![33071,33648,10497].includes(sampler.wrapT??10497)||![9728,9729].includes(sampler.magFilter??9729)||![9728,9729,9984,9985,9986,9987].includes(sampler.minFilter??9987))return null;
 return {choice,factor,sampler,doubleSided:material.doubleSided===true};
}
const wraps={33071:THREE.ClampToEdgeWrapping,33648:THREE.MirroredRepeatWrapping,10497:THREE.RepeatWrapping};
const filters={9728:THREE.NearestFilter,9729:THREE.LinearFilter,9984:THREE.NearestMipmapNearestFilter,9985:THREE.LinearMipmapNearestFilter,9986:THREE.NearestMipmapLinearFilter,9987:THREE.LinearMipmapLinearFilter};
export function createUVImageOverlay(body,mesh,payload,buildGeometry,hiddenMaterial,{decode=decodeUVImage}={}){
 const single=uvImageSurfaceSource(payload),multiple=!single;
 if(!body?.geometry||typeof buildGeometry!=='function')return null;
 const ids=multiple?Array.isArray(payload?.faceMaterialIndices)?[...new Set(payload.faceMaterialIndices)]:[]:[single.choice.materialIndex];
 if(!ids.length||ids.length>4)return null;
 const sources=multiple?ids.map(id=>uvImageSurfaceSource({...payload,materialIndices:[id]})):[single];
 if(sources.some(s=>!s)||sources.reduce((n,s)=>n+s.choice.data.byteLength,0)>8*1024*1024)return null;
 const geometry=buildGeometry(mesh,payload,multiple?{materials:true}:undefined);if(!geometry)return null;
 const ordered=multiple?geometry.userData.boxlabFaceMaterials?.map(id=>sources[ids.indexOf(id)]):sources;
 if(!ordered?.length||ordered.some(s=>!s)){geometry.dispose();return null;}
 const materials=ordered.map(()=>new THREE.MeshBasicMaterial());
 const overlay=new THREE.Mesh(geometry,multiple?materials:materials[0]);overlay.visible=false;
 overlay.userData.boxlabRenderOverlay=true;overlay.userData.boxlabUVImagePreview=true;overlay.raycast=()=>{};
 const sourceGeometry=body.geometry,fallback=body.material;let disposed=false;
 const images=[],textures=[];
 function dispose(){
  if(disposed)return;disposed=true;sourceGeometry.removeEventListener('dispose',dispose);body.remove(overlay);
  if(body.material===hiddenMaterial)body.material=fallback;
  geometry.dispose();materials.forEach(m=>m.dispose());textures.forEach(t=>t.dispose());images.forEach(i=>i.close?.());images.length=textures.length=0;
 }
 overlay.userData.boxlabUVImageDispose=dispose;sourceGeometry.addEventListener('dispose',dispose);body.add(overlay);
 // Decode serially: a canceled request cannot start remaining material decodes.
 // The surface replaces Solid only after ALL material images are ready.
 Promise.resolve().then(async()=>{
  for(let index=0;index<ordered.length;index++){
   if(disposed)return;
   const source=ordered[index],image=await decode(source.choice);
   if(disposed){image?.close?.();return;}
   if(!image){dispose();return;}
   images.push(image);const texture=new THREE.Texture(image);textures.push(texture);texture.flipY=false;texture.colorSpace=THREE.SRGBColorSpace;
   texture.wrapS=wraps[source.sampler.wrapS??10497];texture.wrapT=wraps[source.sampler.wrapT??10497];
   texture.magFilter=filters[source.sampler.magFilter??9729];texture.minFilter=filters[source.sampler.minFilter??9987];texture.needsUpdate=true;
   const material=materials[index];material.map=texture;material.color.fromArray(source.factor);material.side=source.doubleSided?THREE.DoubleSide:THREE.FrontSide;material.toneMapped=false;material.needsUpdate=true;
  }
  if(!disposed){overlay.visible=true;body.material=hiddenMaterial;}
 }).catch(()=>dispose());
 return overlay;
}
