// Separate .boxlab v2 colour transport. Native UV envelope v3 stays UV-only.
// Committed resources are read-only: history/duplicates share, edits replace.
import {captureColourResource} from './paint-resource.js?v=898';
import {encodeProjectBytes,decodeProjectBytes} from './project-glb-resources.js?v=0.36.18.899';
const LIMIT=8*1024*1024;
const fields=['version','channel','width','height','colorSpace','rowOrder','binding','pixels'];
function capture(value){
 if(!value||Object.keys(value).some(k=>!fields.includes(k)))throw Error('Unsupported project colour fields');
 // Preserve the v1 resource owner for pixel/descriptor validation, without a second raster.
 const copy=captureColourResource(value);
 if(value.version!==copy.version||value.channel!==copy.channel||value.colorSpace!==copy.colorSpace||value.rowOrder!==copy.rowOrder)throw Error('Unsupported project colour descriptor');
 return copy;
}
export function paintOwner(o){
 if(o.sourceId||o.arrayRecipe||o.booleanRecipe||o.curveProfile||o.kind==='reference'||o.glbPassthrough?.source!=='boxlab')throw Error('Colour paint requires an independent native UV object');
}
export function createProjectPaintPool(){
 const resources=[],indices=new Map(),shared=new WeakMap();let total=0;
 return {resources,add(value){
  if(shared.has(value))return {version:1,index:shared.get(value)};
  const {pixels,...descriptor}=capture(value),entry={version:1,descriptor,data:encodeProjectBytes(pixels)},key=JSON.stringify(entry);
  let index=indices.get(key);if(index==null){total+=pixels.length;if(total>LIMIT)throw Error('Colour paint pool exceeds 8 MiB');index=resources.length;resources.push(entry);indices.set(key,index);}
  shared.set(value,index);return {version:1,index};
 }};
}
export function decodeProjectPaintPool(scene){
 const entries=scene.colourPaintPool;
 if(scene.version===1&&entries!=null)throw Error('Colour paint requires project version 2');
 if(scene.version===2&&(!Array.isArray(entries)||!entries.length))throw Error('Missing colour paint pool');
 let total=0;const used=new Set(),unique=new Set();
 const resources=(entries||[]).map(entry=>{
  if(!entry?.data||Object.keys(entry.data).some(k=>!['encoding','byteLength','data'].includes(k))||entry?.version!==1||Object.keys(entry).some(k=>!['version','descriptor','data'].includes(k))||!entry.descriptor||Object.hasOwn(entry.descriptor,'pixels'))throw Error('Unsupported project colour envelope');
  const n=entry.data?.byteLength;if(!Number.isSafeInteger(n)||n<0||(total+=n)>LIMIT)throw Error('Colour paint pool exceeds 8 MiB');
  const data=decodeProjectBytes(entry.data),value=capture({...entry.descriptor,pixels:data});
  const {pixels,...descriptor}=value,key=JSON.stringify({version:1,descriptor,data:encodeProjectBytes(pixels)});
  if(unique.has(key))throw Error('Duplicate colour paint pool entry');unique.add(key);return value;
 });
 return {get(ref){if(scene.version!==2||ref?.version!==1||Object.keys(ref).some(k=>!['version','index'].includes(k))||!Number.isInteger(ref.index)||ref.index<0||ref.index>=resources.length)throw Error('Invalid colour paint reference');used.add(ref.index);return resources[ref.index];},finish(){if(used.size!==resources.length)throw Error('Unused colour paint pool entry');}};
}
