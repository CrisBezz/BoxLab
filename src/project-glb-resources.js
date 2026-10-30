import {validateNomadResource} from './nomad-material-resource.js?v=0.36.18.1029';
// Imported GLB resources and native UV-only envelopes; geometry/history keep their owners.
const LIMIT=24*1024*1024;
function json(value){return JSON.parse(JSON.stringify(value,(_key,v)=>{if(typeof v==='number'&&!Number.isFinite(v))throw Error('Invalid GLB resource number');if(ArrayBuffer.isView(v)||v instanceof ArrayBuffer)throw Error('Unsupported GLB resource binary channel');return v;}));}
function encodeBytes(data){
 if(!(data instanceof Uint8Array)||data.byteLength>LIMIT)throw Error('Invalid or oversized GLB image bytes');
 let binary='';for(let i=0;i<data.length;i+=32768)binary+=String.fromCharCode(...data.subarray(i,i+32768));
 return {encoding:'base64',byteLength:data.length,data:btoa(binary)};
}
function decodeBytes(value){
 if(value?.encoding!=='base64'||!Number.isSafeInteger(value.byteLength)||value.byteLength<0||value.byteLength>LIMIT||typeof value.data!=='string'||value.data.length!==4*Math.ceil(value.byteLength/3))throw Error('Invalid GLB image encoding');
 // Avoid a repeated-group regex: valid multi-megabyte images overflow its stack.
 const padding=(3-value.byteLength%3)%3;
 if(!value.data.endsWith('='.repeat(padding))||/[^A-Za-z0-9+/]/.test(value.data.slice(0,value.data.length-padding)))throw Error('Invalid GLB image encoding');
 const binary=atob(value.data);if(binary.length!==value.byteLength||btoa(binary)!==value.data)throw Error('Invalid GLB image byte length');
 return Uint8Array.from(binary,c=>c.charCodeAt(0));
}
export function createProjectGLBImagePool(){
 const images=[],indices=new Map();let bytes=0;
 return {images,add(value){const key=value.byteLength+':'+value.data;let index=indices.get(key);if(index==null){bytes+=value.byteLength;if(bytes>LIMIT)throw Error('GLB image pool exceeds 24 MB');index=images.length;images.push(value);indices.set(key,index);}return {imagePoolIndex:index};}};
}
export function decodeProjectGLBImagePool(images){
 if(!Array.isArray(images))throw Error('Invalid GLB image pool');let bytes=0;
 return images.map(value=>{const data=decodeBytes(value);bytes+=data.length;if(bytes>LIMIT)throw Error('GLB image pool exceeds 24 MB');return data;});
}
function imageData(value,pool){
 if(value&&Object.hasOwn(value,'imagePoolIndex')){const index=value.imagePoolIndex;if(Object.keys(value).length!==1||!Number.isSafeInteger(index)||index<0||!pool||index>=pool.length)throw Error('Invalid GLB image pool reference');return pool[index];}
 return decodeBytes(value);
}
// Resource v3 is a native UV-only channel, not GLB provenance/material data.
function nativeUV(payload){
 if(!payload||payload.version!==1||payload.source!=='boxlab'||Object.keys(payload).some(k=>!['version','source','uvTopologySignature','uvCorners'].includes(k))||typeof payload.uvTopologySignature!=='string'||!payload.uvTopologySignature||!Array.isArray(payload.uvCorners)||!payload.uvCorners.length||payload.uvCorners.some(face=>!Array.isArray(face)||face.length<3||face.some(p=>!Array.isArray(p)||p.length!==2||!p.every(Number.isFinite))))throw Error('Invalid native BoxLab UV channel');
 return payload;
}
export function encodeProjectGLB(payload,pool=null){
 if(payload?.source==='boxlab')return {version:3,payload:json(nativeUV(payload))};
 if(payload?.source==='nomad')validateNomadResource(payload);
 if(!payload||typeof payload!=='object'||Array.isArray(payload)||payload.version!==1||!['glb','nomad'].includes(payload.source))throw Error('Invalid GLB resource payload');
 let bytes=0;const result={...payload};
 if(payload.images!=null){if(!Array.isArray(payload.images))throw Error('Invalid GLB images');result.images=payload.images.map(image=>{if(!image||typeof image!=='object')throw Error('Invalid GLB image');const data=image.data==null?null:encodeBytes(image.data);bytes+=data?.byteLength||0;if(bytes>LIMIT)throw Error('GLB image pool exceeds 24 MB');return {...image,data:data&&pool?pool.add(data):data};});}
 return {version:payload.source==='nomad'?4:pool&&result.images?.some(image=>image.data?.imagePoolIndex!=null)?2:1,payload:json(result)};
}
export function decodeProjectGLB(resource,pool=null){
 if(resource?.version===3)return json(nativeUV(resource.payload));
 if(![1,2,4].includes(resource?.version)||!resource.payload||typeof resource.payload!=='object'||Array.isArray(resource.payload))throw Error('Unsupported GLB project resources');
 const result=json(resource.payload);if(result.version!==1||result.source!==(resource.version===4?'nomad':'glb'))throw Error('Invalid imported GLB payload');let bytes=0;
 if(result.images!=null){if(!Array.isArray(result.images))throw Error('Invalid GLB images');result.images=result.images.map(image=>{if(!image||typeof image!=='object')throw Error('Invalid GLB image');if(image.data?.imagePoolIndex!=null&&![2,4].includes(resource.version))throw Error('Invalid GLB resource reference version');const data=image.data==null?null:imageData(image.data,pool);bytes+=data?.byteLength||0;if(bytes>LIMIT)throw Error('GLB image pool exceeds 24 MB');return {...image,data};});}
 if(resource.version===4)validateNomadResource(result);
 return result;
}

// Shared canonical binary transport; paint uses a separate versioned envelope.
export {encodeBytes as encodeProjectBytes,decodeBytes as decodeProjectBytes};
