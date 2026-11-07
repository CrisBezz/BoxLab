import {importedPaintColourSource} from './imported-paint-colour.js?v=0.36.18.1095';
// Separate project colour pool. Opaque scenev2 stays byte-compatible; raster scenev3; image scenev4.
// Native UV envelopev3 is still UV-only. History/duplicates share immutable resources.
import {encodePaintResourceEntry,decodePaintResourceEntry,paintResourceEntryBytes} from './paint-layer-resource.js?v=0.36.18.1033';
import {createPaintBytePool,expandPaintBytePool} from './project-paint-byte-pool.js?v=0.36.18.1033';
import {meshTopologySignature} from './mesh-topology-signature.js?v=0.36.18.1087';
const LIMIT=8*1024*1024;
export function importedPaintEligible(o){
 const p=o?.glbPassthrough,m=o?.mesh,faces=m?.faces,uv=p?.uvCorners;
 if(!p||p.version!==1||!['glb','nomad'].includes(p.source)||!Array.isArray(faces)||!faces.length||p.uvTopologySignature!==meshTopologySignature(m)||!Array.isArray(uv)||uv.length!==faces.length||uv.some((corners,i)=>!Array.isArray(corners)||corners.length!==faces[i]?.length||corners.some(v=>!Array.isArray(v)||v.length!==2||!v.every(Number.isFinite)||v[0]<0||v[0]>1||v[1]<0||v[1]>1)))return false;
 if(importedPaintColourSource(p))return true;
 if(p.source==='nomad')return Array.isArray(p.images)&&p.images.length===0&&!Object.keys(p.nomadMaterial?.textures||{}).length&&(p.nomadMaterial?.material_type??'opaque')==='opaque'&&(p.nomadMaterial?.opacity??1)===1&&(p.nomadMaterial?.factorOpacity??1)===1&&p.nomadMaterial?.two_sided!==1&&p.nomadMaterial?.flip_culling!==true&&p.nomadMaterial?.always_unlit!==true;
 const assignments=Array.isArray(p.materialIndices)?new Set(p.materialIndices):new Set(),materialIds=[...assignments];
 const material=materialIds.length===1?p.materials?.[materialIds[0]]:null,factor=material?.pbrMetallicRoughness?.baseColorFactor;
 return Array.isArray(p.images)&&p.images.length===0&&Array.isArray(p.textures)&&p.textures.length===0&&Array.isArray(p.materials)&&assignments.size<=1&&(materialIds.length===0||!!material)&&(!factor||(Array.isArray(factor)&&factor.length===4&&factor.every(Number.isFinite)&&factor[3]===1))&&material?.doubleSided!==true&&!p.vertexColorCorners?.some(Array.isArray)&&!p.tangentCorners?.some(Array.isArray)&&!p.morphTargets?.some(Boolean)&&!(p.originalTopology?.attributes||[]).some(a=>Object.keys(a||{}).some(k=>!['POSITION','NORMAL','TEXCOORD_0'].includes(k)));
}
export function paintOwner(o){
 const source=o?.glbPassthrough?.source;
 if(o.sourceId||o.arrayRecipe||o.booleanRecipe||o.curveProfile||o.kind==='reference'||(source!=='boxlab'&&!importedPaintEligible(o)))throw Error('Paint requires an independent native UV object or an imported single-material UV mesh with no embedded images or one opaque 512/1024 square colour texture (PNG/JPEG, at most 2 MiB); additional PBR maps, texture transforms and multi-material imports stay protected');
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
