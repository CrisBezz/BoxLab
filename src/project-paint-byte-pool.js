import {paintBudget} from './paint-budget.js?v=0.36.18.913';
// Content-addressed paint transport, using the existing canonical byte codec.
// Retained bytes and repeated decode copies have separate, bounded budgets.
import {decodeProjectBytes} from './project-glb-resources.js?v=0.36.18.899';
import {mapPaintResourceEntryBuffers,paintResourceEntryBytes} from './paint-layer-resource.js?v=0.36.18.935';
const TRANSPORT_LIMIT=8*1024*1024;
function exact(v,keys){if(!v||typeof v!=='object'||Object.keys(v).length!==keys.length||!keys.every(k=>Object.hasOwn(v,k)))throw Error('Invalid shared paint byte pool');}
function bytes(value){exact(value,['encoding','byteLength','data']);if(value.encoding!=='base64'||!Number.isSafeInteger(value.byteLength)||value.byteLength<0||typeof value.data!=='string')throw Error('Invalid shared paint bytes');return value.byteLength;}
const key=value=>value.byteLength+':'+value.data;
export function createPaintBytePool(){
 const buffers=[],indices=new Map();let unique=0,expanded=0,images=false;
 return {get buffers(){return buffers;},get expanded(){return expanded;},add(entry){
  const nextImages=images||entry.version===3,budget=paintBudget(nextImages),amount=paintResourceEntryBytes(entry);if(expanded+amount>budget.expanded)throw Error('Colour paint working set exceeds '+budget.expandedMiB+' MiB');
  const next=[];let added=0;
  // Stage all additions: refusal never publishes half a resource into this pool.
  mapPaintResourceEntryBuffers(entry,value=>{const k=key(value);if(!indices.has(k)&&!next.some(n=>n.key===k)){added+=bytes(value);next.push({key:k,value});}return value;});
  if(unique+added>budget.unique)throw Error('Colour paint pool exceeds '+budget.uniqueMiB+' MiB');
  for(const item of next){indices.set(item.key,buffers.length);buffers.push(item.value);}unique+=added;expanded+=amount;images=nextImages;
 },wrap(entry){return {version:4,entry:mapPaintResourceEntryBuffers(entry,value=>({version:1,index:indices.get(key(value))}))};}};
}
export function expandPaintBytePool(scene){
 exact(scene.colourPaintBytePool,['version','buffers']);const pool=scene.colourPaintBytePool;
 if(pool.version!==1||!Array.isArray(pool.buffers)||!pool.buffers.length)throw Error('Missing shared paint bytes');
 const budget=paintBudget(scene.colourPaintPool?.some(w=>w?.entry?.version===3));let total=0;const keys=new Set();
 for(const value of pool.buffers){total+=bytes(value);if(total>budget.unique)throw Error('Colour paint pool exceeds '+budget.uniqueMiB+' MiB');const k=key(value);if(keys.has(k))throw Error('Duplicate shared paint bytes');keys.add(k);}
 const used=new Set();let expanded=0;
 const entries=Array.from(scene.colourPaintPool,wrapper=>{
  exact(wrapper,['version','entry']);if(wrapper.version!==4)throw Error('Unsupported shared paint envelope');
  const entry=mapPaintResourceEntryBuffers(wrapper.entry,ref=>{
   exact(ref,['version','index']);if(ref.version!==1||!Number.isSafeInteger(ref.index)||ref.index<0||ref.index>=pool.buffers.length)throw Error('Invalid shared paint byte reference');
   used.add(ref.index);const value=pool.buffers[ref.index];expanded+=value.byteLength;if(expanded>budget.expanded)throw Error('Colour paint working set exceeds '+budget.expandedMiB+' MiB');return value;
  });
  const resourceBudget=paintBudget(entry.version===3);if(paintResourceEntryBytes(entry)>resourceBudget.unique)throw Error('Colour paint pool exceeds '+resourceBudget.uniqueMiB+' MiB');return entry;
 });
 if(used.size!==pool.buffers.length)throw Error('Unused shared paint bytes');
 // Full unique + expanded/ref/schema preflight precedes any binary decoding.
 if(expanded<=TRANSPORT_LIMIT)throw Error('Shared paint pool is unnecessary');
 for(const value of pool.buffers)decodeProjectBytes(value);
 return entries;
}
