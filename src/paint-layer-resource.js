// One colourPaint resource: opaque v1, raster layers v2, retained images v3.
import {captureColourResource} from './paint-resource.js?v=898';
import {upgradePaintLayerStack,flattenPaintLayerStack,paintLayerStackBytes} from './paint-layer-stack.js?v=0.36.18.908';
import {encodeProjectBytes,decodeProjectBytes} from './project-glb-resources.js?v=0.36.18.899';
const fields=['version','channel','width','height','colorSpace','rowOrder','binding','pixels'];
const sourceFields=['version','mime','width','height','rowOrder','colourSpace','alpha','encoded','data'];
function exact(v,keys){if(!v||typeof v!=='object'||Object.keys(v).some(k=>!keys.includes(k))||keys.some(k=>!Object.hasOwn(v,k)))throw Error('Unsupported layered colour fields');}
function opaque(value){exact(value,fields);const copy=captureColourResource(value);if(fields.slice(0,-1).some(k=>copy[k]!==value[k]))throw Error('Unsupported colour descriptor');return copy;}
function same(a,b){return a.length===b.length&&a.every((v,i)=>v===b[i]);}
export function captureLayeredColourResource(stack){
 // Include the outer flattened preview before allocating owned stack copies.
 if(paintLayerStackBytes(stack)+(stack.base?.pixels?.byteLength||0)>8*1024*1024)throw Error('Colour paint pool exceeds 8 MiB');
 const layers=upgradePaintLayerStack(stack),flat=flattenPaintLayerStack(layers);return Object.freeze({...flat,version:layers.version===3?3:2,layers});
}
export function capturePaintResource(value){
 if(value?.version===1)return opaque(value);
 exact(value,[...fields,'layers']);if(![2,3].includes(value.version))throw Error('Unsupported layered colour version');
 const copy=captureLayeredColourResource(value.layers);
 if(fields.slice(0,-1).some(k=>copy[k]!==value[k])||!(value.pixels instanceof Uint8Array)||!same(copy.pixels,value.pixels))throw Error('Layered colour preview does not match its editable stack');return copy;
}
// External writers get only an owned, opaque colour snapshot, captured before await.
export function captureFlattenedPaint(value){const copy=capturePaintResource(value);return captureColourResource(copy);}
function baseEntry(base){const {pixels,...descriptor}=base;return {descriptor,data:encodeProjectBytes(pixels)};}
function encodeImage(image){if(image===null)return null;const {pixels,encoded,...meta}=image.source;return {...image,source:{...meta,encoded:encodeProjectBytes(encoded),data:encodeProjectBytes(pixels)}};}
function decodeImage(image){if(image===null)return null;const {data,encoded,...meta}=image.source;return {...image,source:{...meta,encoded:decodeProjectBytes(encoded),pixels:decodeProjectBytes(data)}};}
export function encodePaintResourceEntry(value){
 const copy=capturePaintResource(value),{pixels,layers,...descriptor}=copy;
 if(!layers)return {version:1,descriptor,data:encodeProjectBytes(pixels)};
 return {version:copy.version,descriptor,data:encodeProjectBytes(pixels),layers:{version:layers.version,base:baseEntry(layers.base),layers:layers.layers.map(({pixels,mask,image,...meta})=>({...meta,data:encodeProjectBytes(pixels),mask:mask?{enabled:mask.enabled,inverted:mask.inverted,data:encodeProjectBytes(mask.pixels)}:null,...(layers.version===3?{image:encodeImage(image)}:{})}))}};
}
// Inspect every serialized buffer before any pool decode allocation.
export function paintResourceEntryBytes(entry){
 exact(entry,entry?.version===1?['version','descriptor','data']:['version','descriptor','data','layers']);
 if(![1,2,3].includes(entry.version))throw Error('Unsupported project colour envelope');
 const buffers=[entry.data];
 if(entry.version>=2){
  exact(entry.layers,['version','base','layers']);exact(entry.layers.base,['descriptor','data']);
  if(entry.layers.version!==entry.version||!Array.isArray(entry.layers.layers)||entry.layers.layers.length>3)throw Error('Invalid layered colour envelope');buffers.push(entry.layers.base.data);
  for(const l of entry.layers.layers){
   exact(l,['id','name','visible','opacity','blendMode','data','mask',...(entry.version===3?['image']:[])]);buffers.push(l.data);
   if(l.mask!==null){exact(l.mask,['enabled','inverted','data']);buffers.push(l.mask.data);}
   if(entry.version===3&&l.image!==null){exact(l.image,['version','source','placement','objectToWorld']);exact(l.image.source,sourceFields);buffers.push(l.image.source.encoded,l.image.source.data);}
  }
 }
 let total=0;for(const data of buffers){exact(data,['encoding','byteLength','data']);if(!Number.isSafeInteger(data.byteLength)||data.byteLength<0)throw Error('Invalid paint byte length');total+=data.byteLength;if(!Number.isSafeInteger(total))throw Error('Invalid paint byte budget');}return total;
}
export function decodePaintResourceEntry(entry){
 if(paintResourceEntryBytes(entry)>8*1024*1024)throw Error('Colour paint pool exceeds 8 MiB');
 if(entry.version===1){exact(entry.descriptor,fields.filter(k=>k!=='pixels'));return opaque({...entry.descriptor,pixels:decodeProjectBytes(entry.data)});}
 exact(entry.descriptor,fields.filter(k=>k!=='pixels'));
 const serialized=entry.layers;exact(serialized.base.descriptor,fields.filter(k=>k!=='pixels'));
 const stack={version:serialized.version,base:opaque({...serialized.base.descriptor,pixels:decodeProjectBytes(serialized.base.data)}),layers:serialized.layers.map(({data,mask,image,...meta})=>({...meta,pixels:decodeProjectBytes(data),mask:mask?{enabled:mask.enabled,inverted:mask.inverted,pixels:decodeProjectBytes(mask.data)}:null,...(serialized.version===3?{image:decodeImage(image)}:{})}))};
 return capturePaintResource({...entry.descriptor,pixels:decodeProjectBytes(entry.data),layers:stack});
}
