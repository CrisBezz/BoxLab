import {paintMaterialEnvironments} from './paint-material-environment.js?v=0.36.18.925';
import {nomadColourSurfaceSource,nomadPBRSurfaceSources} from './nomad-material-resource.js?v=0.36.18.1030';
import * as THREE from 'three';
import {importedUVImageChoices,decodeUVImage} from './uv-image-preview.js?v=0.36.18.1031';
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
export function uvImageSurfaceSource(payload,imageOptions){
 if(payload?.source==='nomad')return nomadColourSurfaceSource(payload,{opacity:imageOptions?.nativeOpacity===true});
 const source=uvImageMaterialSource(payload);if(!source)return null;
 const {materialIndex:id,material,factor}=source;
 const choice=importedUVImageChoices(payload,imageOptions).find(c=>c.materialIndex===id);
 if(!choice||Object.keys(material.pbrMetallicRoughness.baseColorTexture.extensions||{}).length)return null;
 const texture=payload.textures[material.pbrMetallicRoughness.baseColorTexture.index];
 const sampler=texture.sampler===undefined?{}:Number.isInteger(texture.sampler)&&texture.sampler>=0?payload.samplers?.[texture.sampler]:null;
 if(!sampler||![33071,33648,10497].includes(sampler.wrapS??10497)||![33071,33648,10497].includes(sampler.wrapT??10497)||![9728,9729].includes(sampler.magFilter??9729)||![9728,9729,9984,9985,9986,9987].includes(sampler.minFilter??9987))return null;
 return {choice,factor,sampler,doubleSided:material.doubleSided===true};
}
// Bound native colour display to four simultaneous 1024-square surfaces.
// Original encoded maps remain retained when a display cannot be allocated.
const nativePreviews=new Set();
const wraps={33071:THREE.ClampToEdgeWrapping,33648:THREE.MirroredRepeatWrapping,10497:THREE.RepeatWrapping};
const filters={9728:THREE.NearestFilter,9729:THREE.LinearFilter,9984:THREE.NearestMipmapNearestFilter,9985:THREE.LinearMipmapNearestFilter,9986:THREE.NearestMipmapLinearFilter,9987:THREE.LinearMipmapLinearFilter};
export function createUVImageOverlay(body,mesh,payload,buildGeometry,hiddenMaterial,{decode=decodeUVImage,lit=false,renderer=globalThis.__boxlabBridgeState?.renderer,environmentPool=paintMaterialEnvironments}={}){
 const native=payload?.source==='nomad';
 const single=uvImageSurfaceSource(payload,{nativeOpacity:lit}),multiple=!single;if(native&&(!single||nativePreviews.size>=4))return null;
 if(!body?.geometry||typeof buildGeometry!=='function')return null;
 const ids=multiple?Array.isArray(payload?.faceMaterialIndices)?[...new Set(payload.faceMaterialIndices)]:[]:[single.choice.materialIndex];
 if(!ids.length||ids.length>4)return null;
 const sources=multiple?ids.map(id=>uvImageSurfaceSource({...payload,materialIndices:[id]})):[single];
 if(sources.some(s=>!s)||sources.reduce((n,s)=>n+s.choice.data.byteLength,0)>8*1024*1024)return null;
 const geometry=buildGeometry(mesh,payload,multiple?{materials:true}:undefined);if(!geometry)return null;
 const ordered=multiple?geometry.userData.boxlabFaceMaterials?.map(id=>sources[ids.indexOf(id)]):sources;
 if(!ordered?.length||ordered.some(s=>!s)){geometry.dispose();return null;}
 const materials=ordered.map(source=>lit&&!source.unlit?new THREE.MeshStandardMaterial({roughness:source.roughness??.78,metalness:source.metalness??0}):new THREE.MeshBasicMaterial());
 const overlay=new THREE.Mesh(geometry,multiple?materials:materials[0]);overlay.visible=false;if(lit){overlay.castShadow=body.castShadow;overlay.receiveShadow=body.receiveShadow;}
 if(native)nativePreviews.add(overlay);
 overlay.userData.boxlabRenderOverlay=true;overlay.userData.boxlabUVImagePreview=true;overlay.raycast=()=>{};
 const sourceGeometry=body.geometry,fallback=body.material;let disposed=false,environment=null;
 const images=[],textures=[],backfaces=new Map();const originalCastShadow=body.castShadow;
 function opacityMode(material,value){
  // Opted-in colour alpha uses Three's original RGBA path. Otherwise keep
  // accepted RGB-only sampling when a separate map/scalar controls opacity.
  if(!single.colourAlpha)material.onBeforeCompile=shader=>{shader.fragmentShader=shader.fragmentShader.replace('#include <map_fragment>',THREE.ShaderChunk.map_fragment.replace('diffuseColor *= sampledDiffuseColor;','diffuseColor.rgb *= sampledDiffuseColor.rgb;'));};
  if(!single.colourAlpha)material.customProgramCacheKey=()=> 'boxlab-native-opacity-1028';
  material.opacity=value;material.transparent=true;material.depthWrite=false;overlay.castShadow=false;body.castShadow=false;
  body.userData.boxlabNativeOpacityOwner=overlay.uuid;
  for(const child of body.children)if(child.userData?.boxlabBackfaceCue&&!backfaces.has(child)){backfaces.set(child,child.visible);child.visible=false;}
 }
 function makeTexture(image,source,colour){
  const texture=new THREE.Texture(image);textures.push(texture);texture.flipY=false;texture.colorSpace=colour?THREE.SRGBColorSpace:THREE.NoColorSpace;
  texture.wrapS=wraps[source.sampler.wrapS??10497];texture.wrapT=wraps[source.sampler.wrapT??10497];
  texture.magFilter=filters[source.sampler.magFilter??9729];texture.minFilter=filters[source.sampler.minFilter??9987];if(source.repeat)texture.repeat.fromArray(source.repeat);
  if(native){
   // Three's automatic matrix rotates BEFORE nonuniform scaling. Native NOM
   // rotates AFTER scaling, about UV zero; keep its exact per-map matrix.
   const [sx,sy]=source.repeat,[ox,oy]=source.offset,c=Math.cos(source.rotation),s=Math.sin(source.rotation);
   texture.offset.set(ox,oy);texture.rotation=source.rotation;texture.matrixAutoUpdate=false;
   texture.matrix.set(c*sx,s*sy,ox,-s*sx,c*sy,oy,0,0,1);
  }
  texture.needsUpdate=true;return texture;
 }
 function dispose(){
  if(disposed)return;disposed=true;nativePreviews.delete(overlay);sourceGeometry.removeEventListener('dispose',dispose);body.remove(overlay);
  if(body.material===hiddenMaterial)body.material=fallback;
  if(body.userData.boxlabNativeOpacityOwner===overlay.uuid){delete body.userData.boxlabNativeOpacityOwner;body.castShadow=originalCastShadow;}
  for(const [child,visible] of backfaces)child.visible=visible;backfaces.clear();
  environment?.release();environment=null;geometry.dispose();materials.forEach(m=>m.dispose());textures.forEach(t=>t.dispose());images.forEach(i=>i.close?.());images.length=textures.length=0;
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
   images.push(image);const texture=makeTexture(image,source,true);
   const material=materials[index];material.map=texture;material.color.fromArray(source.factor);material.side=source.doubleSided?THREE.DoubleSide:THREE.FrontSide;material.toneMapped=material.isMeshStandardMaterial===true;material.needsUpdate=true;
   if(native&&lit&&material.isMeshStandardMaterial&&source.opacityPreview&&(source.opacity<1||source.colourAlpha))opacityMode(material,source.opacity);
  }
  if(!disposed){overlay.visible=true;body.material=hiddenMaterial;}
  // Colour becomes visible first. Unsupported/failed auxiliaries keep it intact.
  // One serial decode/lifetime owner; cancellation cannot start another map.
  if(native&&lit&&materials[0].isMeshStandardMaterial){
   const material=materials[0],maps=nomadPBRSurfaceSources(payload,single);
   for(const [slot,source] of Object.entries(maps)){
    if(disposed)return;
    try{
     const image=await decode(source.choice);if(disposed){image?.close?.();return;}if(!image)continue;
     images.push(image);const texture=makeTexture(image,source,slot==='emissive');material[slot==='opacity'?'alphaMap':slot+'Map']=texture;
     if(slot==='normal')material.normalScale.set(source.factor,source.negY?-source.factor:source.factor);
     else if(slot==='opacity')opacityMode(material,source.factor*single.opacity);
     else if(slot==='emissive'){material.emissive.fromArray(source.factor);material.emissiveIntensity=source.strength;}
     else material[slot]=source.factor;
     if(slot==='metalness'&&source.factor>0){
      let scene=body;while(scene&&!scene.isScene)scene=scene.parent;
      if(!scene?.environment){try{environment??=environmentPool.acquire(renderer);material.envMap=environment?.texture||null;}catch{/* Direct-light fallback; retained source stays intact. */}}
     }
     material.needsUpdate=true;
    }catch{/* Retained-only map; accepted colour remains visible. */}
   }
  }
 }).catch(()=>dispose());
 return overlay;
}
