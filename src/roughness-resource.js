// Owned single-channel data, not sRGB colour or layer coverage. Committed pixels
// follow the existing resource convention: share read-only, replace on edit.
import {encodeProjectBytes,decodeProjectBytes} from './project-glb-resources.js?v=0.36.18.899';
const fields=['version','channel','width','height','colorSpace','pixelType','rowOrder','binding'];
function exact(value,keys){if(!value||typeof value!=='object'||Object.keys(value).length!==keys.length||keys.some(k=>!Object.hasOwn(value,k)))throw Error('Invalid roughness resource fields');}
function dimensions(value){if(![value.width,value.height].every(n=>Number.isInteger(n)&&n>=16&&n<=512))throw Error('Roughness maps must be 16 to 512 pixels per axis');if(typeof value.binding!=='string'||!/^[a-f0-9]{64}$/.test(value.binding))throw Error('Invalid roughness binding');}
function descriptor(value){
 exact(value,fields);dimensions(value);
 if(value.version!==1||value.channel!=='roughness'||value.colorSpace!=='linear'||value.pixelType!=='r8'||value.rowOrder!=='uv-v0-first')throw Error('Unsupported roughness descriptor');
 return Object.fromEntries(fields.map(k=>[k,value[k]]));
}
export function captureRoughnessResource(value){
 exact(value,['width','height','binding','pixels']);dimensions(value);
 if(!(value.pixels instanceof Uint8Array)||value.pixels.length!==value.width*value.height)throw Error('Invalid roughness R8 pixels');
 return Object.freeze({version:1,channel:'roughness',width:value.width,height:value.height,colorSpace:'linear',pixelType:'r8',rowOrder:'uv-v0-first',binding:value.binding,pixels:value.pixels.slice()});
}
export function copyRoughnessResource(value){
 exact(value,[...fields,'pixels']);const {pixels,...meta}=value;descriptor(meta);
 const copy=captureRoughnessResource({width:value.width,height:value.height,binding:value.binding,pixels});
 return copy;
}
export function encodeRoughnessEntry(value){
 const {pixels:data,...d}=copyRoughnessResource(value);return {version:1,descriptor:d,data:encodeProjectBytes(data)};
}
// Inspect the complete declared size and base64 length before any byte allocation.
export function roughnessEntryBytes(entry){
 exact(entry,['version','descriptor','data']);if(entry.version!==1)throw Error('Unsupported roughness envelope');
 const d=descriptor(entry.descriptor);exact(entry.data,['encoding','byteLength','data']);
 if(entry.data.encoding!=='base64'||entry.data.byteLength!==d.width*d.height||typeof entry.data.data!=='string'||entry.data.data.length!==4*Math.ceil(entry.data.byteLength/3))throw Error('Invalid roughness byte length');
 return entry.data.byteLength;
}
export function decodeRoughnessEntry(entry){
 roughnessEntryBytes(entry);const d=entry.descriptor;
 return captureRoughnessResource({width:d.width,height:d.height,binding:d.binding,pixels:decodeProjectBytes(entry.data)});
}
