// Separate project colour pool. Opaque scenev2 stays byte-compatible; raster scenev3; image scenev4.
// Native UV envelopev3 is still UV-only. History/duplicates share immutable resources.
import {encodePaintResourceEntry,decodePaintResourceEntry,paintResourceEntryBytes} from './paint-layer-resource.js?v=0.36.18.938';
import {createPaintBytePool,expandPaintBytePool} from './project-paint-byte-pool.js?v=0.36.18.938';
const LIMIT=8*1024*1024;
export function paintOwner(o){
 if(o.sourceId||o.arrayRecipe||o.booleanRecipe||o.curveProfile||o.kind==='reference'||o.glbPassthrough?.source!=='boxlab')throw Error('Colour paint requires an independent native UV object');
}
export function createProjectPaintPool(){
 const resources=[],indices=new Map(),shared=new WeakMap(),bytePool=createPaintBytePool();let total=0;
 return {get resources(){return total>LIMIT?resources.map(entry=>bytePool.wrap(entry)):resources;},get pooled(){return total>LIMIT;},get bytePool(){return {version:1,buffers:bytePool.buffers};},get layered(){return resources.some(e=>e.version>=2);},get images(){return resources.some(e=>e.version===3);},add(value){
  if(shared.has(value))return {version:1,index:shared.get(value)};
  const entry=encodePaintResourceEntry(value),key=JSON.stringify(entry);
  let index=indices.get(key);if(index==null){bytePool.add(entry);total+=paintResourceEntryBytes(entry);index=resources.length;resources.push(entry);indices.set(key,index);}
  shared.set(value,index);return {version:1,index};
 }};
}
export function decodeProjectPaintPool(scene){
 let entries=scene.colourPaintPool;
 if(scene.version!==5&&Object.hasOwn(scene,'colourPaintBytePool'))throw Error('Shared paint requires project version 5');
 if(scene.version===1&&entries!=null)throw Error('Colour paint requires project version 2');
 if([2,3,4,5].includes(scene.version)&&(!Array.isArray(entries)||!entries.length))throw Error('Missing colour paint pool');
 if(scene.version===5)entries=expandPaintBytePool(scene);
 let total=0;const used=new Set(),unique=new Set();
 // Full pool aggregate (base + flat + RGBA overlays + masks) charged before decoding.
 for(const entry of entries||[]){if(entry?.version===2&&![3,4,5].includes(scene.version))throw Error('Layered paint requires project version 3');if(entry?.version===3&&![4,5].includes(scene.version))throw Error('Image paint requires project version 4');total+=paintResourceEntryBytes(entry);if(scene.version!==5&&total>LIMIT)throw Error('Colour paint pool exceeds 8 MiB');}
 if(scene.version===3&&!entries.some(e=>e.version===2))throw Error('Missing layered colour resource');
 if(scene.version===4&&!entries.some(e=>e.version===3))throw Error('Missing image colour resource');
 const resources=(entries||[]).map(entry=>{
  const value=decodePaintResourceEntry(entry),key=JSON.stringify(encodePaintResourceEntry(value));
  if(unique.has(key))throw Error('Duplicate colour paint pool entry');unique.add(key);return value;
 });
 return {get(ref){if(![2,3,4,5].includes(scene.version)||ref?.version!==1||Object.keys(ref).some(k=>!['version','index'].includes(k))||!Number.isInteger(ref.index)||ref.index<0||ref.index>=resources.length)throw Error('Invalid colour paint reference');used.add(ref.index);return resources[ref.index];},finish(){if(used.size!==resources.length)throw Error('Unused colour paint pool entry');}};
}
