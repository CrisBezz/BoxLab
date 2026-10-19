// Shared bounded scalar pool from the accepted roughness owner. No scene/history owner.
const UNIQUE=4*1024*1024,EXPANDED=8*1024*1024;
function ref(index){return {version:1,index};}
export function createScalarProjectPool(codec,label){
 const resources=[],indices=new Map(),shared=new WeakMap();let unique=0,expanded=0;
 return {resources,add(value){
  if(shared.has(value)){const index=shared.get(value),bytes=resources[index].data.byteLength;if(expanded+bytes>EXPANDED)throw Error(`${label} references exceed 8 MiB`);expanded+=bytes;return ref(index);}
  const entry=codec.encode(value),bytes=codec.entryBytes(entry),key=JSON.stringify(entry);let index=indices.get(key);
  if(expanded+bytes>EXPANDED)throw Error(`${label} references exceed 8 MiB`);
  if(index==null){if(unique+bytes>UNIQUE)throw Error(`${label} pool exceeds 4 MiB`);index=resources.length;resources.push(entry);indices.set(key,index);unique+=bytes;}
  expanded+=bytes;shared.set(value,index);return ref(index);
 }};
}
export function decodeScalarProjectPool(entries,objects,field,rawField,codec,label){
 let bytes=0;const sizes=Array.from(entries,entry=>{const n=codec.entryBytes(entry);bytes+=n;if(bytes>UNIQUE)throw Error(`${label} pool exceeds 4 MiB`);return n;});
 const used=new Set();let expanded=0;
 function indexOf(value){if(!value||value.version!==1||Object.keys(value).length!==2||!Object.hasOwn(value,'version')||!Object.hasOwn(value,'index')||!Number.isInteger(value.index)||value.index<0||value.index>=sizes.length)throw Error(`Invalid ${label.toLowerCase()} resource reference`);return value.index;}
 // Charge all references before decoding; duplicates share the decoded resource.
 for(const o of objects){if(Object.hasOwn(o,rawField))throw Error(`Unencoded ${label.toLowerCase()} resource`);if(Object.hasOwn(o,field)){const index=indexOf(o[field]);used.add(index);expanded+=sizes[index];if(expanded>EXPANDED)throw Error(`${label} references exceed 8 MiB`);}}
 if(used.size!==sizes.length)throw Error(`Unused ${label.toLowerCase()} pool entry`);
 const keys=new Set(),resources=Array.from(entries,entry=>{const value=codec.decode(entry),key=JSON.stringify(codec.encode(value));if(keys.has(key))throw Error(`Duplicate ${label.toLowerCase()} pool entry`);keys.add(key);return value;});
 return {get(value){return resources[indexOf(value)];},finish(){}};
}
