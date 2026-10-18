// Separate project colour pool. Opaque scenev2 stays byte-compatible; layered scenev3.
// Native UV envelopev3 is still UV-only. History/duplicates share immutable resources.
import {encodePaintResourceEntry,decodePaintResourceEntry,paintResourceEntryBytes} from './paint-layer-resource.js?v=0.36.18.904';
const LIMIT=8*1024*1024;
export function paintOwner(o){
 if(o.sourceId||o.arrayRecipe||o.booleanRecipe||o.curveProfile||o.kind==='reference'||o.glbPassthrough?.source!=='boxlab')throw Error('Colour paint requires an independent native UV object');
}
export function createProjectPaintPool(){
 const resources=[],indices=new Map(),shared=new WeakMap();let total=0;
 return {resources,get layered(){return resources.some(e=>e.version===2);},add(value){
  if(shared.has(value))return {version:1,index:shared.get(value)};
  const entry=encodePaintResourceEntry(value),key=JSON.stringify(entry);
  let index=indices.get(key);if(index==null){total+=paintResourceEntryBytes(entry);if(total>LIMIT)throw Error('Colour paint pool exceeds 8 MiB');index=resources.length;resources.push(entry);indices.set(key,index);}
  shared.set(value,index);return {version:1,index};
 }};
}
export function decodeProjectPaintPool(scene){
 const entries=scene.colourPaintPool;
 if(scene.version===1&&entries!=null)throw Error('Colour paint requires project version 2');
 if([2,3].includes(scene.version)&&(!Array.isArray(entries)||!entries.length))throw Error('Missing colour paint pool');
 let total=0;const used=new Set(),unique=new Set();
 // Full pool aggregate (base + flat + RGBA overlays + masks) charged before decoding.
 for(const entry of entries||[]){if(entry?.version===2&&scene.version!==3)throw Error('Layered paint requires project version 3');total+=paintResourceEntryBytes(entry);if(total>LIMIT)throw Error('Colour paint pool exceeds 8 MiB');}
 if(scene.version===3&&!entries.some(e=>e.version===2))throw Error('Missing layered colour resource');
 const resources=(entries||[]).map(entry=>{
  const value=decodePaintResourceEntry(entry),key=JSON.stringify(encodePaintResourceEntry(value));
  if(unique.has(key))throw Error('Duplicate colour paint pool entry');unique.add(key);return value;
 });
 return {get(ref){if(![2,3].includes(scene.version)||ref?.version!==1||Object.keys(ref).some(k=>!['version','index'].includes(k))||!Number.isInteger(ref.index)||ref.index<0||ref.index>=resources.length)throw Error('Invalid colour paint reference');used.add(ref.index);return resources[ref.index];},finish(){if(used.size!==resources.length)throw Error('Unused colour paint pool entry');}};
}
