// Editable colour-image input. Not a project envelope or a replacement UV decoder.
export const PAINT_IMAGE_MAX_BYTES=2*1024*1024;
export const PAINT_IMAGE_MAX_SIDE=1024;
const exact=(v,keys)=>v&&typeof v==='object'&&!Array.isArray(v)&&Object.keys(v).length===keys.length&&keys.every(k=>Object.hasOwn(v,k));
const dimensions=(w,h)=>Number.isInteger(w)&&Number.isInteger(h)&&w>0&&h>0&&w<=PAINT_IMAGE_MAX_SIDE&&h<=PAINT_IMAGE_MAX_SIDE;
// Inspect dimensions before asking the browser to allocate a decoded bitmap.
export function inspectPaintImage(data){
 if(!(data instanceof Uint8Array)||!data.length||data.length>PAINT_IMAGE_MAX_BYTES)throw Error('Image exceeds the 2 MiB encoded budget');
 const view=new DataView(data.buffer,data.byteOffset,data.byteLength);let width,height,mime;
 if(data.length>=33&&[137,80,78,71,13,10,26,10].every((v,i)=>data[i]===v)){
  if(view.getUint32(8)!==13||String.fromCharCode(...data.subarray(12,16))!=='IHDR')throw Error('Invalid PNG header');
  width=view.getUint32(16);height=view.getUint32(20);mime='image/png';
 }else if(data.length>=4&&data[0]===255&&data[1]===216){
  let offset=2;
  while(offset<data.length){
   if(data[offset++]!==255)throw Error('Invalid JPEG marker');
   while(data[offset]===255)offset++;
   const marker=data[offset++];if(marker===217||marker===218)break;
   if(marker===1||marker>=208&&marker<=215)continue;
   if(offset+2>data.length)throw Error('Truncated JPEG');
   const length=view.getUint16(offset);if(length<2||offset+length>data.length)throw Error('Truncated JPEG segment');
   if([192,193,194].includes(marker)){
    if(length<8||data[offset+2]!==8)throw Error('Unsupported JPEG precision');
    height=view.getUint16(offset+3);width=view.getUint16(offset+5);mime='image/jpeg';break;
   }
   offset+=length;
  }
 }else throw Error('Choose a PNG or JPEG image');
 if(!mime||!dimensions(width,height))throw Error('Image must be at most 1024 × 1024 pixels');
 return Object.freeze({mime,width,height});
}
export function capturePaintImageSource(value){
 if(!exact(value,['version','mime','width','height','rowOrder','colourSpace','alpha','encoded','pixels'])||value.version!==1||value.rowOrder!=='image-top-first'||value.colourSpace!=='srgb'||value.alpha!=='straight')throw Error('Invalid editable image source');
 const info=inspectPaintImage(value.encoded);
 if(info.mime!==value.mime||info.width!==value.width||info.height!==value.height||!(value.pixels instanceof Uint8Array)||value.pixels.length!==value.width*value.height*4)throw Error('Image source dimensions do not match');
 // Pixels are a browser-decoded cache; original encoded bytes are retained exactly.
 // Typed arrays are read-only by caller contract, like existing paint resources.
 return Object.freeze({...value,encoded:value.encoded.slice(),pixels:value.pixels.slice()});
}
export async function importPaintImage(bytes,{decode=globalThis.createImageBitmap,canvas=()=>typeof OffscreenCanvas==='function'?new OffscreenCanvas(1,1):globalThis.document?.createElement('canvas')}={}){
 // Capture before await: callers may reuse/change their file buffer while decoding.
 const info=inspectPaintImage(bytes),encoded=bytes.slice();
 if(typeof decode!=='function')throw Error('Image decoding is unavailable');
 let bitmap,surface;
 try{
  bitmap=await decode(new Blob([encoded],{type:info.mime}),{imageOrientation:'none',premultiplyAlpha:'none',colorSpaceConversion:'default'});
  if(bitmap?.width!==info.width||bitmap?.height!==info.height)throw Error('Decoded image dimensions do not match');
  surface=canvas();if(!surface)throw Error('Image canvas is unavailable');
  surface.width=info.width;surface.height=info.height;
  const context=surface.getContext('2d',{willReadFrequently:true,colorSpace:'srgb'});if(!context)throw Error('Image canvas is unavailable');
  context.drawImage(bitmap,0,0);
  const pixels=new Uint8Array(context.getImageData(0,0,info.width,info.height).data);
  return capturePaintImageSource({version:1,...info,rowOrder:'image-top-first',colourSpace:'srgb',alpha:'straight',encoded,pixels});
 }finally{bitmap?.close?.();if(surface)surface.width=surface.height=1;}
}
