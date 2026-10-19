import {capturePaintExportObjects,preparePaintExportObjects,preparedPaintImage,preparedRoughnessImage,preparedMetalnessImage} from './paint-export.js?v=0.36.18.923';
import {encodeNomadScalarPNG} from './nomad-scalar-png.js?v=0.36.18.922';
// Export-local glTF G/B unpacking. Source resources remain read-only; the original
// native writer owns materials, UV validation, binary layout and final byte budgets.
import {nativeMaterialMaps,buildNomadProject,createNomadImageIdentity} from './nomad-export-core.js?v=0.36.18.923';
const LIMIT=2048,TOTAL_LIMIT=24*1024*1024;
function dimensions(choice){
 const a=choice.data,v=new DataView(a.buffer,a.byteOffset,a.byteLength);let width=0,height=0;
 if(choice.mime==='image/png'){
  if(a.length<33||v.getUint32(8)!==13||v.getUint32(12)!==0x49484452||a[24]!==8)throw Error('NOMAD packed PNG requires an 8-bit image');
  width=v.getUint32(16);height=v.getUint32(20);
  // Image orientation metadata is not part of glTF texture coordinates.
  for(let at=8;at+12<=a.length;){const n=v.getUint32(at),type=v.getUint32(at+4);if(n>a.length-at-12)throw Error('NOMAD packed PNG is truncated');if(type===0x65584966)throw Error('NOMAD packed image orientation metadata is unsupported; use a plain PNG');at+=n+12;}
 }else{
  for(let at=2;at+4<=a.length;){
   if(a[at++]!==255)throw Error('NOMAD packed JPEG header is invalid');while(a[at]===255)at++;
   const marker=a[at++];if(marker===0xda||marker===0xd9)break;
   const n=v.getUint16(at);if(n<2||at+n>a.length)throw Error('NOMAD packed JPEG is truncated');
   if(marker===0xe1&&a[at+2]===69&&a[at+3]===120&&a[at+4]===105&&a[at+5]===102)throw Error('NOMAD packed image orientation metadata is unsupported; use a plain PNG');
   if([0xc0,0xc1,0xc2].includes(marker)){if(n<8||a[at+2]!==8)throw Error('NOMAD packed JPEG requires an 8-bit image');height=v.getUint16(at+3);width=v.getUint16(at+5);}
   at+=n;
  }
 }
 if(!width||!height||width>LIMIT||height>LIMIT)throw Error('NOMAD packed maps must be at most 2048 × 2048; original resolution is preserved');
 return {width,height};
}
function makeCanvas(width,height){
 const canvas=typeof OffscreenCanvas==='function'?new OffscreenCanvas(width,height):globalThis.document?.createElement('canvas');
 if(!canvas)throw Error('NOMAD map conversion is unavailable in this browser');
 canvas.width=width;canvas.height=height;return canvas;
}
export async function splitNomadPackedImage(choice){
 const {width,height}=dimensions(choice);
 if(typeof globalThis.createImageBitmap!=='function')throw Error('NOMAD map conversion is unavailable in this browser');
 let bitmap,canvas;
 try{
  // No preview thumbnail, gamma operation, Y flip or factor baking. Canvas pixels
  // are opaque 8-bit data; translucent input refuses to avoid premultiplication loss.
  bitmap=await createImageBitmap(new Blob([choice.data],{type:choice.mime}),{colorSpaceConversion:'none',premultiplyAlpha:'none',imageOrientation:'from-image'});
  if(bitmap.width!==width||bitmap.height!==height)throw Error('NOMAD packed image dimensions changed during decode');
  canvas=makeCanvas(width,height);const ctx=canvas.getContext('2d',{willReadFrequently:true,colorSpace:'srgb'});
  if(!ctx)throw Error('NOMAD map conversion canvas is unavailable');
  ctx.drawImage(bitmap,0,0);bitmap.close();bitmap=null;
  const pixels=ctx.getImageData(0,0,width,height),input=pixels.data;
  for(let i=3;i<input.length;i+=4)if(input[i]!==255)throw Error('NOMAD packed maps require opaque pixels to preserve channel values');
  const result={};
  for(const [slot,channel] of [['roughness',1],['metalness',2]])result[slot]={name:slot+'.png',choice:{data:await encodeNomadScalarPNG(input,width,height,channel),mime:'image/png'}};
  return result;
 }finally{bitmap?.close();if(canvas){canvas.width=1;canvas.height=1;}}
}
export async function buildNomadProjectWithMaps(objects,template,{subd=false,...options}={},split=splitNomadPackedImage){
 // Snapshot before the first await: edits/Undo/scene replacement during conversion
 // cannot mix geometry, UVs or factors from different scene states in the download.
 const snapshot=capturePaintExportObjects((objects||[]).filter(o=>o?.kind!=='reference'&&o?.visible!==false&&o?.mesh?.vertices?.length&&o?.mesh?.faces?.length));
 const [templateBytes]=await Promise.all([template,preparePaintExportObjects(snapshot,{subd,owner:{topologySignature:options.topologySignature||globalThis.__boxlabExportAs?.topologySignature}})]);
 const packedMaps=new Map(),sources=new Set(),imageIdentity=createNomadImageIdentity(),packedIdentity=createNomadImageIdentity(),converted=new Map();let bytes=0,sourceBytes=0;
 const addImage=choice=>{const image=imageIdentity(choice);if(!sources.has(image)){sources.add(image);bytes+=image.data.length;}};
 const checkBudget=()=>{if(bytes>TOTAL_LIMIT)throw Error(`NOMAD embedded images exceed 24 MB (sources ${(sourceBytes/1048576).toFixed(2)} MiB + converted ${((bytes-sourceBytes)/1048576).toFixed(2)} MiB; ${snapshot.length} objects)`);};
 for(const object of snapshot){
  const painted=preparedPaintImage(object);if(painted)addImage(painted.choice);
  const roughness=preparedRoughnessImage(object);if(roughness)addImage(roughness.choice);
  const metalness=preparedMetalnessImage(object);if(metalness)addImage(metalness.choice);
  const material=nativeMaterialMaps(object.glbPassthrough);
  for(const [slot,map] of Object.entries(material?.maps||{}))if(slot!=='packed')addImage(map.choice);
 }
 sourceBytes=bytes;checkBudget();
 for(const object of snapshot){
  const choice=nativeMaterialMaps(object.glbPassthrough)?.maps.packed?.choice;
  if(!choice||packedMaps.has(choice.data))continue;
  if(subd)throw Error('NOMAD UV export requires matching Base geometry; disable evaluated modifiers');
  const key=packedIdentity(choice);let maps=converted.get(key);
  if(!maps){
   maps=await split(choice);
   for(const slot of ['roughness','metalness']){if(maps[slot]?.choice?.data)addImage(maps[slot].choice);checkBudget();}
   converted.set(key,maps);
  }
  packedMaps.set(choice.data,maps);
 }
 return buildNomadProject(snapshot,templateBytes,{...options,subd,packedMaps});
}
