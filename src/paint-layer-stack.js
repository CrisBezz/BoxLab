// Layer/compositor foundation only: not a scene resource or a second history owner.
// Straight RGBA8 sRGB byte-space source-over matches the accepted paint raster.
import {captureColourResource} from './paint-resource.js?v=898';
const MAX_LAYERS=4,MAX_SIZE=512;
const baseFields=['version','channel','width','height','colorSpace','rowOrder','binding','pixels'];
function exact(value,fields){if(!value||typeof value!=='object'||Object.keys(value).some(k=>!fields.includes(k))||fields.some(k=>!Object.hasOwn(value,k)))throw Error('Unsupported paint layer fields');}
function copyBase(value){
 exact(value,baseFields);const base=captureColourResource(value);
 if(baseFields.slice(0,-1).some(k=>value[k]!==base[k])||base.width>MAX_SIZE||base.height>MAX_SIZE)throw Error('Unsupported layer base');return base;
}
function copyLayer(value,length){
 exact(value,['id','name','visible','opacity','pixels']);
 if(typeof value.id!=='string'||!/^[a-zA-Z0-9_-]{1,32}$/.test(value.id)||typeof value.name!=='string'||!value.name.trim()||value.name.length>64||typeof value.visible!=='boolean'||!Number.isFinite(value.opacity)||value.opacity<0||value.opacity>1||!(value.pixels instanceof Uint8Array)||value.pixels.length!==length)throw Error('Invalid paint layer');
 return Object.freeze({...value,pixels:value.pixels.slice()});
}
// No flattened cache is trusted or stored; every capture owns all input bytes.
export function capturePaintLayerStack(value){
 exact(value,['version','base','layers']);if(value.version!==1||!Array.isArray(value.layers)||value.layers.length>=MAX_LAYERS)throw Error('Paint stack supports one base and up to three overlays');
 const base=copyBase(value.base),ids=new Set(),layers=value.layers.map(v=>{const l=copyLayer(v,base.pixels.length);if(ids.has(l.id))throw Error('Duplicate paint layer ID');ids.add(l.id);return l;});
 return Object.freeze({version:1,base,layers:Object.freeze(layers)});
}
export function createPaintLayerStack(base){return capturePaintLayerStack({version:1,base,layers:[]});}
export function appendPaintLayer(stack,{id,name='Paint layer',visible=true,opacity=1,pixels}={}){
 const snapshot=capturePaintLayerStack(stack);
 return capturePaintLayerStack({...snapshot,layers:[...snapshot.layers,{id,name,visible,opacity,pixels:pixels??new Uint8Array(snapshot.base.pixels.length)}]});
}
// Replacement of an overlay is explicit. Callers checkpoint their existing history
// before assigning the result; failed edits never mutate committed stack buffers.
export function replacePaintLayer(stack,id,patch){
 const snapshot=capturePaintLayerStack(stack),index=snapshot.layers.findIndex(l=>l.id===id);
 if(index<0)throw Error('Unknown paint layer');
 if(!patch||Object.keys(patch).some(k=>!['name','visible','opacity','pixels'].includes(k)))throw Error('Unsupported paint layer edit');
 const layers=[...snapshot.layers];layers[index]={...layers[index],...patch};return capturePaintLayerStack({...snapshot,layers});
}
export function flattenPaintLayerStack(stack){
 const snapshot=capturePaintLayerStack(stack),pixels=snapshot.base.pixels;
 // Bottom to top; round once per composited channel/layer, matching raster bytes.
 for(const layer of snapshot.layers){if(!layer.visible||!layer.opacity)continue;for(let i=0;i<pixels.length;i+=4){const a=layer.pixels[i+3]/255*layer.opacity;if(!a)continue;for(let k=0;k<3;k++)pixels[i+k]=Math.round(pixels[i+k]*(1-a)+layer.pixels[i+k]*a);}}
 return captureColourResource({...snapshot.base,pixels});
}
