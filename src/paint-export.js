// Export-local adaptation only. Never add material/provenance fields to native UVs.
import {captureFlattenedPaint} from './paint-layer-resource.js?v=0.36.18.904';
import {paintTargetKey,paintTargetDigest} from './paint-target.js?v=0.36.18.904';
import {encodeNomadColourPNG} from './nomad-scalar-png.js?v=0.36.18.901';
const prepared=new WeakMap();
export function capturePaintExportObjects(objects){
 const copies=new WeakMap();return (objects||[]).map(o=>{
  if(!o)return o;let colourPaint=o.colourPaint;
  if(colourPaint){let copy=copies.get(colourPaint);if(!copy){copy=captureFlattenedPaint(colourPaint);copies.set(colourPaint,copy);}colourPaint=copy;}
  return {...o,mesh:o.mesh?.clone?o.mesh.clone():structuredClone(o.mesh),settings:structuredClone(o.settings||{}),...(colourPaint?{colourPaint,glbPassthrough:structuredClone(o.glbPassthrough)}:{})};
 });
}
export async function preparePaintExportObjects(objects,{subd=false,owner=globalThis.__boxlabExportAs}={}){
 const items=objects.filter(o=>o?.colourPaint).map(object=>{
  if(subd)throw Error('Paint export requires Base geometry; turn evaluated modifiers off');
  return {object,key:paintTargetKey(object,object.mesh,owner)};
 });
 const encoded=new WeakMap();
 for(const {object,key} of items){
  const resource=object.colourPaint;if(resource.width!==512||resource.height!==512||await paintTargetDigest(key)!==resource.binding)throw Error('Paint export requires matching native Base UVs; Undo UV/topology changes first');
  let image=encoded.get(resource);if(!image){image={name:'BoxLab paint.png',choice:{data:await encodeNomadColourPNG(resource.pixels,resource.width,resource.height),mime:'image/png'}};encoded.set(resource,image);}
  prepared.set(object,image);
 }
 return objects;
}
export function preparedPaintImage(object){return prepared.get(object)||null;}
export function paintExportGeometryObject(object){return object.colourPaint&&prepared.has(object)?{...object,colourPaint:null}:object;}
