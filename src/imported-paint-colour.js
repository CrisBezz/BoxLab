// Seed editable Paint from the existing imported colour-image owner.
import {uvImageSurfaceSource} from './uv-image-surface-preview.js?v=0.36.18.1033';
import {inspectPaintImage,importPaintImage} from './paint-image-source.js?v=0.36.18.1070';
import {opaqueNomadColourPNG} from './nomad-scalar-png.js?v=0.36.18.1035';
export function importedPaintColourSource(payload){
 try{
  const source=uvImageSurfaceSource(payload);if(!source?.choice||source.unlit)return null;
  if(payload.source==='nomad'){
   const m=payload.nomadMaterial;
   if(Object.keys(m.textures||{}).some(k=>k!=='color')||source.rotation!==0||source.repeat?.some(v=>v!==1)||source.offset?.some(v=>v!==0))return null;
  }else{
   const m=payload.materials?.[source.choice.materialIndex];if(!m)return null;
   if(payload.vertexColorCorners?.some(Array.isArray)||payload.tangentCorners?.some(Array.isArray)||payload.morphTargets?.some(Boolean)||(payload.originalTopology?.attributes||[]).some(a=>Object.keys(a||{}).some(k=>!['POSITION','NORMAL','TEXCOORD_0'].includes(k))))return null;
   if(m.normalTexture||m.occlusionTexture||m.emissiveTexture||m.pbrMetallicRoughness?.metallicRoughnessTexture)return null;
  }
  const info=inspectPaintImage(source.choice.data);
  if(info.width!==info.height||![512,1024].includes(info.width))return null;
  const m=payload.source==='glb'?payload.materials[source.choice.materialIndex]:null;
  return {...source,size:info.width,roughness:source.roughness??m?.pbrMetallicRoughness?.roughnessFactor??1,metalness:source.metalness??m?.pbrMetallicRoughness?.metallicFactor??1,requireOpaque:payload.source==='nomad'&&(payload.nomadMaterial.use_color_opacity===true||payload.nomadMaterial.use_color_opacity===1)};
 }catch{return null;}
}
export async function decodeImportedPaintColour(source,{decode=importPaintImage}={}){
 const data=source.choice.mime==='image/png'&&!source.requireOpaque?await opaqueNomadColourPNG(source.choice.data):source.choice.data;
 const image=await decode(data),pixels=image.pixels.slice(),tables=[];
 if(source.requireOpaque&&pixels.some((v,i)=>i%4===3&&v!==255))throw Error('Transparent imported colour maps are not yet editable; original texture retained');
 if(image.width!==source.size||image.height!==source.size)throw Error('Imported colour dimensions changed');
 for(let channel=0;channel<3;channel++){
  const factor=source.factor[channel],table=new Uint8Array(256);
  for(let n=0;n<256;n++){const s=n/255,linear=s<=.04045?s/12.92:((s+.055)/1.055)**2.4,value=linear*factor;table[n]=Math.round(255*(value<=.0031308?12.92*value:1.055*value**(1/2.4)-.055));}tables.push(table);
 }
 for(let i=0;i<pixels.length;i+=4){for(let c=0;c<3;c++)pixels[i+c]=tables[c][pixels[i+c]];pixels[i+3]=255;}
 return pixels;
}
