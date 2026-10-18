// Layer/compositor foundation only: not a scene resource or a second history owner.
// Straight RGBA8 sRGB byte-space source-over matches the accepted paint raster.
import {captureColourResource} from './paint-resource.js?v=898';
import {blendPaintRGB,isPaintBlendMode} from './paint-blend-modes.js?v=0.36.18.903';
const MAX_LAYERS=4,MAX_SIZE=512;
const baseFields=['version','channel','width','height','colorSpace','rowOrder','binding','pixels'];
function exact(value,fields){if(!value||typeof value!=='object'||Object.keys(value).some(k=>!fields.includes(k))||fields.some(k=>!Object.hasOwn(value,k)))throw Error('Unsupported paint layer fields');}
function copyBase(value){
 exact(value,baseFields);const base=captureColourResource(value);
 if(baseFields.slice(0,-1).some(k=>value[k]!==base[k])||base.width>MAX_SIZE||base.height>MAX_SIZE)throw Error('Unsupported layer base');return base;
}
function copyMask(value,length){
 if(value===null)return null;
 exact(value,['enabled','inverted','pixels']);
 if(typeof value.enabled!=='boolean'||typeof value.inverted!=='boolean'||!(value.pixels instanceof Uint8Array)||value.pixels.length!==length/4)throw Error('Invalid paint layer mask');
 return Object.freeze({...value,pixels:value.pixels.slice()});
}
function copyLayer(value,length,version){
 exact(value,version===1?['id','name','visible','opacity','pixels']:['id','name','visible','opacity','pixels','blendMode','mask']);
 if(typeof value.id!=='string'||!/^[a-zA-Z0-9_-]{1,32}$/.test(value.id)||typeof value.name!=='string'||!value.name.trim()||value.name.length>64||typeof value.visible!=='boolean'||!Number.isFinite(value.opacity)||value.opacity<0||value.opacity>1||!(value.pixels instanceof Uint8Array)||value.pixels.length!==length)throw Error('Invalid paint layer');
 if(version===2&&!isPaintBlendMode(value.blendMode))throw Error('Unsupported paint blend mode');
 return Object.freeze({...value,pixels:value.pixels.slice(),...(version===2?{mask:copyMask(value.mask,length)}:{})});
}
// No flattened cache is trusted or stored; every capture owns all input bytes.
export function capturePaintLayerStack(value){
 exact(value,['version','base','layers']);if(![1,2].includes(value.version)||!Array.isArray(value.layers)||value.layers.length>=MAX_LAYERS)throw Error('Paint stack supports one base and up to three overlays');
 const base=copyBase(value.base),ids=new Set(),layers=Array.from(value.layers,v=>{const l=copyLayer(v,base.pixels.length,value.version);if(ids.has(l.id))throw Error('Duplicate paint layer ID');ids.add(l.id);return l;});
 return Object.freeze({version:value.version,base,layers:Object.freeze(layers)});
}
export function createPaintLayerStack(base){return capturePaintLayerStack({version:2,base,layers:[]});}
export function upgradePaintLayerStack(stack){const s=capturePaintLayerStack(stack);return s.version===2?s:capturePaintLayerStack({...s,version:2,layers:s.layers.map(l=>({...l,blendMode:'normal',mask:null}))});}
export function appendPaintLayer(stack,{id,name='Paint layer',visible=true,opacity=1,pixels,blendMode='normal',mask=null}={}){
 const snapshot=upgradePaintLayerStack(stack);
 return capturePaintLayerStack({...snapshot,layers:[...snapshot.layers,{id,name,visible,opacity,blendMode,mask,pixels:pixels??new Uint8Array(snapshot.base.pixels.length)}]});
}
// Replacement of an overlay is explicit. Callers checkpoint their existing history
// before assigning the result; failed edits never mutate committed stack buffers.
export function replacePaintLayer(stack,id,patch){
 const snapshot=upgradePaintLayerStack(stack),index=snapshot.layers.findIndex(l=>l.id===id);
 if(index<0)throw Error('Unknown paint layer');
 if(!patch||Object.keys(patch).some(k=>!['name','visible','opacity','pixels','blendMode','mask'].includes(k)))throw Error('Unsupported paint layer edit');
 const layers=[...snapshot.layers];layers[index]={...layers[index],...patch};return capturePaintLayerStack({...snapshot,layers});
}
export function flattenPaintLayerStack(stack){
 const snapshot=capturePaintLayerStack(stack),pixels=snapshot.base.pixels;
 // Bottom to top; round once per composited channel/layer, matching raster bytes.
 for(const layer of snapshot.layers){
  if(!layer.visible||!layer.opacity)continue;
  for(let i=0;i<pixels.length;i+=4){
   const mask=layer.mask,coverage=mask?.enabled?(mask.inverted?255-mask.pixels[i/4]:mask.pixels[i/4])/255:1;
   const a=layer.pixels[i+3]/255*layer.opacity*coverage;if(!a)continue;
   const mode=layer.blendMode||'normal';
   // Preserve exact902 Normal arithmetic; other modes operate on normalized RGB.
   const rgb=mode==='normal'?null:blendPaintRGB(mode,[pixels[i]/255,pixels[i+1]/255,pixels[i+2]/255],[layer.pixels[i]/255,layer.pixels[i+1]/255,layer.pixels[i+2]/255]);
   for(let k=0;k<3;k++)pixels[i+k]=Math.round(pixels[i+k]*(1-a)+(rgb?rgb[k]*255:layer.pixels[i+k])*a);
  }
 }
 return captureColourResource({...snapshot.base,pixels});
}
