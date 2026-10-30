import {nomadMaterialMaps} from './nomad-material-resource.js?v=0.36.18.1030';
// Native image inspection adapter belongs only to the UV workspace.
const nativeLabels={color:'Colour',normal:'Normal',emissive:'Emissive',roughness:'Roughness',metalness:'Metalness',opacity:'Opacity',displacement:'Displacement'};
export function nativeImageChoices(payload,imageOptions,slots=['color']){
 const maxBytes=imageOptions?.maxBytes??8*1024*1024;
 if(!Number.isSafeInteger(maxBytes)||maxBytes<=0||maxBytes>24*1024*1024)return [];
 let maps;try{maps=nomadMaterialMaps(payload)?.maps;}catch{return [];}
 if(!maps)return [];
 const result=[];
 for(const slot of Array.isArray(slots)?new Set(slots):[]){
  if(!Object.hasOwn(nativeLabels,slot))continue;
  const map=maps[slot],data=map?.choice?.data;if(!data||data.length>maxBytes)continue;
  const png=[137,80,78,71,13,10,26,10].every((v,i)=>data[i]===v),jpeg=data[0]===255&&data[1]===216&&data[2]===255;
  const mime=png?'image/png':jpeg?'image/jpeg':null;if(!mime||map.choice.mime!==mime)continue;
  // These are raw image references. Do not extract glTF G/B channels, apply
  // native material transforms/factors or imply a retained map renders in 3D.
  const label=nativeLabels[slot],name=typeof map.name==='string'?map.name:'';
  result.push({...map.choice,imageIndex:map.nativeTexture.index,materialIndex:0,slot,label:`NOM · ${label}${name?' · '+name:''}`,referenceStatus:`Raw ${label} image · inspection only · tile 0–1 · material mapping not applied`});
 }
 return result;
}
