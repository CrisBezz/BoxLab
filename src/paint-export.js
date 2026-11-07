// Export-local adaptation only. Never add material/provenance fields to native UVs.
import {captureFlattenedPaint} from './paint-layer-resource.js?v=0.36.18.1033';
import {paintTargetKey,paintTargetDigest} from './paint-target.js?v=0.36.18.1090';
import {copyMetalnessResource} from './metalness-resource.js?v=0.36.18.1075';
import {copyRoughnessResource} from './roughness-resource.js?v=0.36.18.1075';
import {copyOpacityResource} from './opacity-resource.js?v=0.36.18.1075';
import {encodeNomadScalarPNG,encodeNomadColourPNG,encodeNomadColourAlphaPNG,encodeNomadDataPNG} from './nomad-scalar-png.js?v=0.36.18.1086';
import {padPaintPixels} from './paint-filter-domain.js?v=0.36.18.1089';
const prepared=new WeakMap(),roughnessPrepared=new WeakMap(),metalnessPrepared=new WeakMap(),opacityPrepared=new WeakMap(),packedPrepared=new WeakMap(),exportColourSource=new WeakMap();
export function capturePaintExportObjects(objects){
 const copies=new WeakMap(),roughnessCopies=new WeakMap(),metalnessCopies=new WeakMap(),opacityCopies=new WeakMap();return (objects||[]).map(o=>{
  if(!o)return o;let colourPaint=o.colourPaint,roughnessPaint=o.roughnessPaint,metalnessPaint=o.metalnessPaint,opacityPaint=o.opacityPaint;
  if(colourPaint){let copy=copies.get(colourPaint);if(!copy){copy=captureFlattenedPaint(colourPaint);copies.set(colourPaint,copy);}colourPaint=copy;}
  if(roughnessPaint){let copy=roughnessCopies.get(roughnessPaint);if(!copy){copy=copyRoughnessResource(roughnessPaint);roughnessCopies.set(roughnessPaint,copy);}roughnessPaint=copy;}
  if(metalnessPaint){let copy=metalnessCopies.get(metalnessPaint);if(!copy){copy=copyMetalnessResource(metalnessPaint);metalnessCopies.set(metalnessPaint,copy);}metalnessPaint=copy;}
  if(opacityPaint){let copy=opacityCopies.get(opacityPaint);if(!copy){copy=copyOpacityResource(opacityPaint);opacityCopies.set(opacityPaint,copy);}opacityPaint=copy;}
  const copy={...o,roughnessPaint,metalnessPaint,opacityPaint,mesh:o.mesh?.clone?o.mesh.clone():structuredClone(o.mesh),settings:structuredClone(o.settings||{}),...((colourPaint||roughnessPaint||metalnessPaint||opacityPaint)?{colourPaint,glbPassthrough:structuredClone(o.glbPassthrough)}:{})};if(colourPaint&&o.colourPaint?.pixels)exportColourSource.set(copy,o.colourPaint.pixels);return copy;
 });
}
export async function preparePaintExportObjects(objects,{subd=false,owner=globalThis.__boxlabExportAs,packedScalars=false,includeOpacity=false}={}){
 const items=objects.filter(o=>o?.colourPaint||o?.roughnessPaint||o?.metalnessPaint||(includeOpacity&&o?.opacityPaint)).map(object=>{
  if(subd)throw Error('Paint export requires Base geometry; turn evaluated modifiers off');
  if(packedScalars&&object.metalnessPaint&&object.roughnessPaint&&(object.metalnessPaint.width!==object.roughnessPaint.width||object.metalnessPaint.height!==object.roughnessPaint.height))throw Error('GLB roughness and metalness maps must have matching dimensions; no resizing is applied');
  return {object,key:paintTargetKey(object,object.mesh,owner)};
 });
 const encoded=new WeakMap(),packedEncoded=new WeakMap(),noRoughness={};
 for(const {object,key} of items){
  const binding=await paintTargetDigest(key);
  let colour=object.colourPaint;const roughness=object.roughnessPaint,metalness=object.metalnessPaint,opacity=includeOpacity?object.opacityPaint:null;
  if(colour&&owner?.padPaintEdges===true&&typeof owner?.buildUVPreviewGeometry==='function'){
   let geometry;try{geometry=owner.buildUVPreviewGeometry(object.mesh,object.glbPassthrough,{faceIndices:true});if(geometry)padPaintPixels(colour.pixels,colour.width,geometry,4,colour.pixels,exportColourSource.get(object)||colour.pixels);}
   catch{/* Keep otherwise valid texture exports available if UV padding cannot be derived. */}
   finally{geometry?.dispose?.();}
  }
  if(colour&&(![512,1024].includes(colour.width)||colour.height!==colour.width||binding!==colour.binding)||roughness&&binding!==roughness.binding||metalness&&binding!==metalness.binding||opacity&&(![16,512].includes(opacity.width)||opacity.height!==512||binding!==opacity.binding))throw Error('Paint export requires matching native Base UVs; Undo UV/topology changes first');
  if(opacity&&(opacity.width!==512||opacity.height!==512))throw Error('GLB opacity map must be 512 × 512');
  if(opacity){const image={name:'BoxLab colour opacity.png',choice:{data:await encodeNomadColourAlphaPNG(colour?.pixels||null,colour?.width||0,colour?.height||0,opacity.pixels,opacity.width,opacity.height),mime:'image/png'}};prepared.set(object,image);opacityPrepared.set(object,true);}
  else if(colour){let image=encoded.get(colour);if(!image){image={name:'BoxLab paint.png',choice:{data:await encodeNomadColourPNG(colour.pixels,colour.width,colour.height),mime:'image/png'}};encoded.set(colour,image);}prepared.set(object,image);}
  if(roughness){
   let image=encoded.get(roughness);if(!image){
    // Reuse the authoritative lossless scalar PNG writer. glTF reads G;
    // grayscale expands identically in RGB, with metallicFactor zero.
    const rgba=new Uint8Array(roughness.width*roughness.height*4);
    for(let i=0;i<roughness.pixels.length;i++)rgba[i*4+1]=roughness.pixels[i];
    image={name:'BoxLab roughness.png',choice:{data:await encodeNomadScalarPNG(rgba,roughness.width,roughness.height,1),mime:'image/png'}};encoded.set(roughness,image);
   }
   roughnessPrepared.set(object,image);
  }
  if(metalness){
   let image=encoded.get(metalness);if(!image){const rgba=new Uint8Array(metalness.width*metalness.height*4);for(let i=0;i<metalness.pixels.length;i++)rgba[i*4+2]=metalness.pixels[i];image={name:'BoxLab metalness.png',choice:{data:await encodeNomadScalarPNG(rgba,metalness.width,metalness.height,2),mime:'image/png'}};encoded.set(metalness,image);}metalnessPrepared.set(object,image);
   if(packedScalars){
    let pairs=packedEncoded.get(metalness);if(!pairs){pairs=new WeakMap();packedEncoded.set(metalness,pairs);}const key=roughness||noRoughness;let packed=pairs.get(key);
    if(!packed){const rgba=new Uint8Array(metalness.width*metalness.height*4);for(let i=0;i<metalness.pixels.length;i++){rgba[i*4]=255;rgba[i*4+1]=roughness?roughness.pixels[i]:255;rgba[i*4+2]=metalness.pixels[i];rgba[i*4+3]=255;}packed={name:'BoxLab roughness metalness.png',choice:{data:await encodeNomadDataPNG(rgba,metalness.width,metalness.height),mime:'image/png'}};pairs.set(key,packed);}
    packedPrepared.set(object,packed);
   }
  }
 }
 return objects;
}
export function preparedPaintImage(object){return prepared.get(object)||null;}
export function preparedOpacityImage(object){return opacityPrepared.has(object)?prepared.get(object)||null:null;}
export function preparedRoughnessImage(object){return roughnessPrepared.get(object)||null;}
export function preparedMetalnessImage(object){return metalnessPrepared.get(object)||null;}
export function preparedMetallicRoughnessImage(object){return packedPrepared.get(object)||null;}
export function paintExportGeometryObject(object){return {...object,...(prepared.has(object)?{colourPaint:null}:{}),...(roughnessPrepared.has(object)?{roughnessPaint:null}:{}),...(metalnessPrepared.has(object)?{metalnessPaint:null}:{}),...(opacityPrepared.has(object)?{opacityPaint:null}:{})};}
