// Read-only references to retained embedded images; default callers stay colour-only.
// UV workspace opts into map references, never lighting or stored image edits.
// Shared read-only embedded UV0 image resolver; callers own material/slot policy.
export function embeddedUVImage(payload,info,{maxBytes=8*1024*1024}={}){
 // Preview defaults stay bounded; native byte-copy export may use its 24 MB pool.
 if(!Number.isSafeInteger(maxBytes)||maxBytes<=0||maxBytes>24*1024*1024)return null;
 if(payload?.source!=='glb'||payload.version!==1||!info||!Number.isInteger(info.index)||info.index<0||(info.texCoord??0)!==0||info.extensions?.KHR_texture_transform)return null;
 const texture=payload.textures?.[info.index];if(!texture||Object.keys(texture.extensions||{}).length||!Number.isInteger(texture.source)||texture.source<0)return null;
 const stored=payload.images?.[texture.source],data=stored?.data;
 if(!(data instanceof Uint8Array)||!data.length||data.byteLength>maxBytes)return null;
 const png=[137,80,78,71,13,10,26,10].every((b,i)=>data[i]===b),jpeg=data[0]===255&&data[1]===216&&data[2]===255;
 const mime=png?'image/png':jpeg?'image/jpeg':null;
 if(!mime||stored.definition?.mimeType&&stored.definition.mimeType!==mime)return null;
 return {imageIndex:texture.source,data,mime};
}
const mapLabels={color:'Colour',normal:'Normal',emissive:'Emissive',roughness:'Roughness (G)',metalness:'Metalness (B)'};
export function importedUVImageChoices(payload,imageOptions,slots=['color']){
 if(payload?.source!=='glb'||payload.version!==1||!Array.isArray(payload.materialIndices))return [];
 const result=[],requested=Array.isArray(slots)?[...new Set(slots)].filter(slot=>Object.hasOwn(mapLabels,slot)):[];
 for(const materialIndex of new Set(payload.materialIndices)){
  if(!Number.isInteger(materialIndex)||materialIndex<0)continue;
  const material=payload.materials?.[materialIndex];
  for(const slot of requested){
   const channel=slot==='roughness'?1:slot==='metalness'?2:null;
   const info=channel?material?.pbrMetallicRoughness?.metallicRoughnessTexture:slot==='color'?material?.pbrMetallicRoughness?.baseColorTexture:material?.[slot+'Texture'];
   if(slot!=='color'&&Object.keys(info?.extensions||{}).length)continue;
   const choice=embeddedUVImage(payload,info,imageOptions);
   if(choice){const label=String(material.name||`Material ${materialIndex+1}`);result.push({materialIndex,...choice,...(channel?{channel}:{}),...(requested.length===1&&slot==='color'?{}:{slot}),label:requested.length===1&&slot==='color'?label:label+' · '+mapLabels[slot]});}
  }
 }
 return result;
}
export async function decodeUVImage(choice){
 if(typeof globalThis.createImageBitmap!=='function')throw Error('Image preview is unavailable');
 const scalar=choice.channel===0||choice.channel===1||choice.channel===2,previewSize=choice.previewSize===512?512:1024;
 const image=await globalThis.createImageBitmap(new Blob([choice.data],{type:choice.mime}),{resizeWidth:previewSize,resizeHeight:previewSize,resizeQuality:'high',imageOrientation:'from-image',...(scalar||choice.linear?{colorSpaceConversion:'none',premultiplyAlpha:'none'}:choice.unpremultiplied?{premultiplyAlpha:'none'}:{})});
 if(!image.width||!image.height||image.width>previewSize||image.height>previewSize){image.close?.();throw Error('Image preview exceeds the display budget');}
 if(!scalar)return image;
 let canvas,ready=false;
 try{
  canvas=typeof OffscreenCanvas==='function'?new OffscreenCanvas(image.width,image.height):globalThis.document?.createElement('canvas');
  if(!canvas)throw Error('Scalar image preview is unavailable');
  canvas.width=image.width;canvas.height=image.height;
  const context=canvas.getContext('2d',{willReadFrequently:true,colorSpace:'srgb'});if(!context)throw Error('Scalar image preview canvas is unavailable');
  context.drawImage(image,0,0);const pixels=context.getImageData(0,0,image.width,image.height);
  for(let i=0;i<pixels.data.length;i+=4){if(pixels.data[i+3]!==255)throw Error('Scalar image reference requires opaque packed pixels');if(choice.grayscale&&(pixels.data[i]!==pixels.data[i+1]||pixels.data[i]!==pixels.data[i+2]))throw Error('Native scalar preview requires a grayscale image');const value=pixels.data[i+choice.channel];pixels.data[i]=pixels.data[i+1]=pixels.data[i+2]=value;}
  context.putImageData(pixels,0,0);
  // Keep one canvas image in the existing controller, rather than encode a PNG
  // or allocate a second bitmap. Late/canceled results use the same close hook.
  canvas.close=()=>{canvas.width=canvas.height=1;};ready=true;return canvas;
 }finally{image.close?.();if(canvas&&!ready)canvas.width=canvas.height=1;}
}
export function createUVImagePreview({changed=()=>{},decode=decodeUVImage,slots=['color']}={}){
 const emptyStatus=slots.length===1&&slots[0]==='color'?'No compatible embedded colour image.':'No compatible embedded image reference.';
 let choices=[],index=0,enabled=false,image=null,generation=0,status=emptyStatus;
 const release=()=>{image?.close?.();image=null;};
 function load(){
  const token=++generation;release();const choice=choices[index];
  status=enabled&&choice?'Loading image…':choice?'':emptyStatus;changed();
  if(!enabled||!choice)return;
  Promise.resolve().then(()=>token===generation&&enabled?decode(choice):null).then(value=>{
   if(token!==generation||!enabled){value?.close?.();return;}
   image=value;status=(choice.slot&&choice.slot!=='color'?mapLabels[choice.slot]:'Base-colour')+' image reference · tile 0–1';changed();
  },()=>{if(token===generation&&enabled){status='Could not decode this image.';changed();}});
 }
 return {get view(){return {choices,index,enabled,image,status};},setPayload(payload){
  const previous=choices[index],next=importedUVImageChoices(payload,undefined,slots);
  const found=next.findIndex(c=>c.materialIndex===previous?.materialIndex&&c.imageIndex===previous?.imageIndex&&c.slot===previous?.slot);
  choices=next;index=found>=0?found:0;
  const choice=choices[index];if(!choice)enabled=false;
  if(previous&&choice&&previous.data===choice.data&&previous.mime===choice.mime&&previous.slot===choice.slot){changed();return;}
  load();
 },enable(value){if(enabled===!!value)return;enabled=!!value&&!!choices.length;load();},choose(value){
  if(!Number.isInteger(value)||value<0||value>=choices.length||value===index)return;index=value;load();
 },close(){enabled=false;choices=[];index=0;load();}};
}
