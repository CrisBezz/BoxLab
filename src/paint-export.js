// Export-local adaptation only. Never add material/provenance fields to native UVs.
import {captureFlattenedPaint} from './paint-layer-resource.js?v=0.36.18.913';
import {paintTargetKey,paintTargetDigest} from './paint-target.js?v=0.36.18.921';
import {copyRoughnessResource} from './roughness-resource.js?v=0.36.18.921';
import {encodeNomadScalarPNG,encodeNomadColourPNG} from './nomad-scalar-png.js?v=0.36.18.901';
const prepared=new WeakMap(),roughnessPrepared=new WeakMap();
export function capturePaintExportObjects(objects){
 const copies=new WeakMap(),roughnessCopies=new WeakMap();return (objects||[]).map(o=>{
  if(o?.metalnessPaint)throw Error('Metalness export is not available yet; Save .boxlab to preserve metalness');
  if(!o)return o;let colourPaint=o.colourPaint,roughnessPaint=o.roughnessPaint;
  if(colourPaint){let copy=copies.get(colourPaint);if(!copy){copy=captureFlattenedPaint(colourPaint);copies.set(colourPaint,copy);}colourPaint=copy;}
  if(roughnessPaint){let copy=roughnessCopies.get(roughnessPaint);if(!copy){copy=copyRoughnessResource(roughnessPaint);roughnessCopies.set(roughnessPaint,copy);}roughnessPaint=copy;}
  return {...o,roughnessPaint,mesh:o.mesh?.clone?o.mesh.clone():structuredClone(o.mesh),settings:structuredClone(o.settings||{}),...((colourPaint||roughnessPaint)?{colourPaint,glbPassthrough:structuredClone(o.glbPassthrough)}:{})};
 });
}
export async function preparePaintExportObjects(objects,{subd=false,owner=globalThis.__boxlabExportAs}={}){
 if(objects.some(o=>o?.metalnessPaint))throw Error('Metalness export is not available yet; Save .boxlab to preserve metalness');
 const items=objects.filter(o=>o?.colourPaint||o?.roughnessPaint).map(object=>{
  if(subd)throw Error('Paint export requires Base geometry; turn evaluated modifiers off');
  return {object,key:paintTargetKey(object,object.mesh,owner)};
 });
 const encoded=new WeakMap();
 for(const {object,key} of items){
  const binding=await paintTargetDigest(key);
  const colour=object.colourPaint,roughness=object.roughnessPaint;
  if(colour&&(colour.width!==512||colour.height!==512||binding!==colour.binding)||roughness&&binding!==roughness.binding)throw Error('Paint export requires matching native Base UVs; Undo UV/topology changes first');
  if(colour){let image=encoded.get(colour);if(!image){image={name:'BoxLab paint.png',choice:{data:await encodeNomadColourPNG(colour.pixels,colour.width,colour.height),mime:'image/png'}};encoded.set(colour,image);}prepared.set(object,image);}
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
 }
 return objects;
}
export function preparedPaintImage(object){return prepared.get(object)||null;}
export function preparedRoughnessImage(object){return roughnessPrepared.get(object)||null;}
export function paintExportGeometryObject(object){return {...object,...(prepared.has(object)?{colourPaint:null}:{}),...(roughnessPrepared.has(object)?{roughnessPaint:null}:{})};}
