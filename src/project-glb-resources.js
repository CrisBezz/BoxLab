// Imported GLB payload only. Geometry/history remain with their existing owners.
const LIMIT=24*1024*1024;
function json(value){return JSON.parse(JSON.stringify(value,(_key,v)=>{if(typeof v==='number'&&!Number.isFinite(v))throw Error('Invalid GLB resource number');if(ArrayBuffer.isView(v)||v instanceof ArrayBuffer)throw Error('Unsupported GLB resource binary channel');return v;}));}
function encodeBytes(data){
 if(!(data instanceof Uint8Array)||data.byteLength>LIMIT)throw Error('Invalid or oversized GLB image bytes');
 let binary='';for(let i=0;i<data.length;i+=32768)binary+=String.fromCharCode(...data.subarray(i,i+32768));
 return {encoding:'base64',byteLength:data.length,data:btoa(binary)};
}
function decodeBytes(value){
 if(value?.encoding!=='base64'||!Number.isSafeInteger(value.byteLength)||value.byteLength<0||value.byteLength>LIMIT||typeof value.data!=='string'||value.data.length!==4*Math.ceil(value.byteLength/3)||!/^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?$/.test(value.data))throw Error('Invalid GLB image encoding');
 const binary=atob(value.data);if(binary.length!==value.byteLength||btoa(binary)!==value.data)throw Error('Invalid GLB image byte length');
 return Uint8Array.from(binary,c=>c.charCodeAt(0));
}
export function encodeProjectGLB(payload){
 if(!payload||typeof payload!=='object'||Array.isArray(payload)||payload.version!==1||payload.source!=='glb')throw Error('Invalid GLB resource payload');
 let bytes=0;const result={...payload};
 if(payload.images!=null){if(!Array.isArray(payload.images))throw Error('Invalid GLB images');result.images=payload.images.map(image=>{if(!image||typeof image!=='object')throw Error('Invalid GLB image');const data=image.data==null?null:encodeBytes(image.data);bytes+=data?.byteLength||0;if(bytes>LIMIT)throw Error('GLB image pool exceeds 24 MB');return {...image,data};});}
 return {version:1,payload:json(result)};
}
export function decodeProjectGLB(resource){
 if(resource?.version!==1||!resource.payload||typeof resource.payload!=='object'||Array.isArray(resource.payload))throw Error('Unsupported GLB project resources');
 const result=json(resource.payload);if(result.version!==1||result.source!=='glb')throw Error('Invalid imported GLB payload');let bytes=0;
 if(result.images!=null){if(!Array.isArray(result.images))throw Error('Invalid GLB images');result.images=result.images.map(image=>{if(!image||typeof image!=='object')throw Error('Invalid GLB image');const data=image.data==null?null:decodeBytes(image.data);bytes+=data?.byteLength||0;if(bytes>LIMIT)throw Error('GLB image pool exceeds 24 MB');return {...image,data};});}
 return result;
}
