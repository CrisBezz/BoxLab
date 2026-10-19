// Scene v6 adds one independent R8 roughness pool; the existing colour envelope
// version remains explicit and is decoded by its original v1–5 owner unchanged.
import {encodeRoughnessEntry,decodeRoughnessEntry,roughnessEntryBytes} from './roughness-resource.js?v=0.36.18.917';
const UNIQUE=4*1024*1024,EXPANDED=8*1024*1024;
function ref(index){return {version:1,index};}
export function createProjectRoughnessPool(){
 const resources=[],indices=new Map(),shared=new WeakMap();let unique=0,expanded=0;
 return {resources,add(value){
  if(shared.has(value)){const index=shared.get(value),bytes=resources[index].data.byteLength;if(expanded+bytes>EXPANDED)throw Error('Roughness references exceed 8 MiB');expanded+=bytes;return ref(index);}
  const entry=encodeRoughnessEntry(value),bytes=roughnessEntryBytes(entry),key=JSON.stringify(entry);let index=indices.get(key);
  if(expanded+bytes>EXPANDED)throw Error('Roughness references exceed 8 MiB');
  if(index==null){if(unique+bytes>UNIQUE)throw Error('Roughness pool exceeds 4 MiB');index=resources.length;resources.push(entry);indices.set(key,index);unique+=bytes;}
  expanded+=bytes;shared.set(value,index);return ref(index);
 }};
}
export function decodeProjectRoughnessPool(scene){
 const has=Object.hasOwn(scene,'roughnessPaintPool');
 if(scene.version!==6){if(has||Object.hasOwn(scene,'colourPaintVersion')||scene.objects.some(o=>Object.hasOwn(o,'roughnessPaintResource')||Object.hasOwn(o,'roughnessPaint')))throw Error('Roughness requires project version 6');return {colourScene:scene,get(){throw Error('Roughness requires project version 6');},finish(){}};}
 if(!Number.isInteger(scene.colourPaintVersion)||scene.colourPaintVersion<1||scene.colourPaintVersion>5||!Array.isArray(scene.roughnessPaintPool)||!scene.roughnessPaintPool.length)throw Error('Invalid project v6 roughness/colour envelope');
 let bytes=0;const sizes=Array.from(scene.roughnessPaintPool,entry=>{const n=roughnessEntryBytes(entry);bytes+=n;if(bytes>UNIQUE)throw Error('Roughness pool exceeds 4 MiB');return n;});
 const used=new Set();let expanded=0;
 function indexOf(value){if(!value||value.version!==1||Object.keys(value).length!==2||!Object.hasOwn(value,'version')||!Object.hasOwn(value,'index')||!Number.isInteger(value.index)||value.index<0||value.index>=sizes.length)throw Error('Invalid roughness resource reference');return value.index;}
 // Charge all references before decoding; duplicates share the decoded resource.
 for(const o of scene.objects){if(Object.hasOwn(o,'roughnessPaint'))throw Error('Unencoded roughness resource');if(Object.hasOwn(o,'roughnessPaintResource')){const index=indexOf(o.roughnessPaintResource);used.add(index);expanded+=sizes[index];if(expanded>EXPANDED)throw Error('Roughness references exceed 8 MiB');}}
 if(used.size!==sizes.length)throw Error('Unused roughness pool entry');
 const keys=new Set(),resources=Array.from(scene.roughnessPaintPool,entry=>{const value=decodeRoughnessEntry(entry),key=JSON.stringify(encodeRoughnessEntry(value));if(keys.has(key))throw Error('Duplicate roughness pool entry');keys.add(key);return value;});
 return {colourScene:{...scene,version:scene.colourPaintVersion},get(value){return resources[indexOf(value)];},finish(){}};
}
