// Read-only references to the importer's retained embedded images. No material,
// image-byte, project, or UV edits. Only UV0 base-colour images without transforms.
export function importedUVImageChoices(payload){
 if(payload?.source!=='glb'||payload.version!==1||!Array.isArray(payload.materialIndices))return [];
 const result=[];
 for(const materialIndex of new Set(payload.materialIndices)){
  if(!Number.isInteger(materialIndex)||materialIndex<0)continue;
  const material=payload.materials?.[materialIndex],info=material?.pbrMetallicRoughness?.baseColorTexture;
  if(!info||!Number.isInteger(info.index)||info.index<0||(info.texCoord??0)!==0||info.extensions?.KHR_texture_transform)continue;
  const texture=payload.textures?.[info.index];if(!texture||Object.keys(texture.extensions||{}).length||!Number.isInteger(texture.source)||texture.source<0)continue;
  const stored=payload.images?.[texture.source],data=stored?.data;
  if(!(data instanceof Uint8Array)||!data.length||data.byteLength>8*1024*1024)continue;
  const png=[137,80,78,71,13,10,26,10].every((b,i)=>data[i]===b),jpeg=data[0]===255&&data[1]===216&&data[2]===255;
  const mime=png?'image/png':jpeg?'image/jpeg':null;
  if(!mime||stored.definition?.mimeType&&stored.definition.mimeType!==mime)continue;
  result.push({materialIndex,imageIndex:texture.source,data,mime,label:String(material.name||`Material ${materialIndex+1}`)});
 }
 return result;
}
export async function decodeUVImage(choice){
 if(typeof globalThis.createImageBitmap!=='function')throw Error('Image preview is unavailable');
 const image=await globalThis.createImageBitmap(new Blob([choice.data],{type:choice.mime}),{resizeWidth:1024,resizeHeight:1024,resizeQuality:'high',imageOrientation:'from-image'});
 if(!image.width||!image.height||image.width>1024||image.height>1024){image.close?.();throw Error('Image preview exceeds the display budget');}
 return image;
}
export function createUVImagePreview({changed=()=>{},decode=decodeUVImage}={}){
 let choices=[],index=0,enabled=false,image=null,generation=0,status='No compatible embedded colour image.';
 const release=()=>{image?.close?.();image=null;};
 function load(){
  const token=++generation;release();const choice=choices[index];
  status=enabled&&choice?'Loading image…':choice?'':'No compatible embedded colour image.';changed();
  if(!enabled||!choice)return;
  Promise.resolve().then(()=>token===generation&&enabled?decode(choice):null).then(value=>{
   if(token!==generation||!enabled){value?.close?.();return;}
   image=value;status='Base-colour image reference · tile 0–1';changed();
  },()=>{if(token===generation&&enabled){status='Could not decode this image.';changed();}});
 }
 return {get view(){return {choices,index,enabled,image,status};},setPayload(payload){
  const previous=choices[index],next=importedUVImageChoices(payload);
  const found=next.findIndex(c=>c.materialIndex===previous?.materialIndex&&c.imageIndex===previous?.imageIndex);
  choices=next;index=found>=0?found:0;
  const choice=choices[index];if(!choice)enabled=false;
  if(previous&&choice&&previous.data===choice.data&&previous.mime===choice.mime){changed();return;}
  load();
 },enable(value){if(enabled===!!value)return;enabled=!!value&&!!choices.length;load();},choose(value){
  if(!Number.isInteger(value)||value<0||value>=choices.length||value===index)return;index=value;load();
 },close(){enabled=false;choices=[];index=0;load();}};
}
