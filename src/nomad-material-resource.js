// Native NOM provenance. Encoded resources share the existing read-only history/
// project pool; no fabricated GLB materials or second image transport.
const LIMIT=24*1024*1024;
const fail=()=>{throw Error('Invalid or oversized native NOM material resources');};
function plain(value){
 const text=JSON.stringify(value,(_k,v)=>{if(typeof v==='number'&&!Number.isFinite(v)||ArrayBuffer.isView(v)||v instanceof ArrayBuffer)fail();return v;});
 if(!text||text.length>1024*1024)fail();return JSON.parse(text);
}
export function validateNomadResource(p){
 if(p?.version!==1||p.source!=='nomad'||Object.keys(p).some(k=>!['version','source','uvTopologySignature','uvCorners','nomadMaterial','images','nomadImportFit'].includes(k))||typeof p.uvTopologySignature!=='string'||!p.uvTopologySignature||!Array.isArray(p.uvCorners)||!p.uvCorners.length||p.uvCorners.some(f=>f!==null&&(!Array.isArray(f)||f.length<3||f.some(v=>!Array.isArray(v)||v.length!==2||!v.every(Number.isFinite)))))fail();
 if(!p.nomadMaterial||typeof p.nomadMaterial!=='object'||Array.isArray(p.nomadMaterial)||!Array.isArray(p.images)||p.images.length>256)fail();
 plain(p.nomadMaterial);let total=0;
 for(const image of p.images){if(!image||!(image.data instanceof Uint8Array)||!image.data.length||!image.definition||typeof image.definition!=='object'||Array.isArray(image.definition))fail();plain(image.definition);total+=image.data.length;if(total>LIMIT)fail();}
 if(p.nomadImportFit){const f=p.nomadImportFit;if(!Number.isFinite(f.scale)||f.scale<=0||!Array.isArray(f.center)||f.center.length!==3||!f.center.every(Number.isFinite))fail();}
 const textures=p.nomadMaterial.textures;
 if(textures!=null&&(typeof textures!=='object'||Array.isArray(textures)))fail();
 for(const map of Object.values(textures||{}))if(!map||typeof map!=='object'||Array.isArray(map)||!Number.isSafeInteger(map.index)||map.index<0||map.index>=p.images.length)fail();
 return p;
}
export function retainNomadMaterial(file,index){
 if(index==null||!file.json.materials)return null;
 const source=file.json.materials[index];if(!Number.isInteger(index)||index<0||!source)fail();
 if(typeof source!=='object'||Array.isArray(source)||source.textures!=null&&(typeof source.textures!=='object'||Array.isArray(source.textures)))fail();
 const material=plain(source),images=[],indices=new Map();
 for(const map of Object.values(material.textures||{})){
  if(!map||!Number.isInteger(map.index)||map.index<0)fail();const old=map.index;
  if(!indices.has(old)){if(images.length>=256)fail();indices.set(old,images.length);images.push(file.image(old));}
  map.index=indices.get(old);
 }
 return {nomadMaterial:material,images};
}
export function nomadMaterialMaps(payload){
 if(payload?.source!=='nomad')return null;
 validateNomadResource(payload);
 const maps={};for(const [slot,map] of Object.entries(payload.nomadMaterial.textures||{})){
  const image=payload.images[map.index];maps[slot]={name:map.name,choice:{data:image.data,mime:image.definition.type},nativeTexture:map};
 }
 return {nativeMaterial:payload.nomadMaterial,maps};
}
// Native Auto selects UV when UVs exist (Nomad manual/material#projection).
// First preview supports repeat scaling, not uncertain offset/rotation conventions.
function nomadTextureSource(payload,slot,{opacity=false}={}){
 if(payload?.source!=='nomad')return null;
 const m=payload.nomadMaterial,t=m?.textures?.[slot],image=payload.images?.[t?.index],data=image?.data;
 if(!m||!t||!(data instanceof Uint8Array)||!data.length||data.length>8*1024*1024||!['auto','uv'].includes(t.projection??'auto')||(!opacity&&((m.material_type??'opaque')!=='opaque'||(m.opacity??1)!==1||(m.factorOpacity??1)!==1))||m.flip_culling===true)return null;
 const png=[137,80,78,71,13,10,26,10].every((v,i)=>data[i]===v),jpeg=data[0]===255&&data[1]===216&&data[2]===255;
 const mime=png?'image/png':jpeg?'image/jpeg':null;if(!mime||image.definition.type!==mime)return null;
 const scale=t.scale??[1,1],offset=t.offset??[0,0];
 if(!Array.isArray(scale)||scale.length!==2||!scale.every(v=>Number.isFinite(v)&&v!==0)||!Array.isArray(offset)||offset.length!==2||offset.some(v=>v!==0)||(t.rotation??0)!==0)return null;
 const wraps={repeat:10497,mirror:33648,none:33071},filter={auto:9987,nearest:9728,linear:9729,mipmap:9987};
 const wrapS=wraps[t.wrapS??'repeat'],wrapT=wraps[t.wrapT??'repeat'],minFilter=filter[t.minFilter??'auto'];
 if(!wrapS||!wrapT||!minFilter||!['auto','nearest','linear'].includes(t.magFilter??'auto'))return null;
 return {choice:{imageIndex:t.index,data,mime},sampler:{wrapS,wrapT,minFilter,magFilter:t.magFilter==='nearest'?9728:9729},repeat:scale};
}
export function nomadColourSurfaceSource(payload,{opacity=false}={}){
 const source=nomadTextureSource(payload,'color',{opacity});if(!source)return null;
 const m=payload.nomadMaterial;
 // Preserve accepted opaque colour/PBR inspection when colour-alpha display is
 // deferred. Blending with colour alpha still refuses through the original guard.
 if(opacity&&![undefined,false,0].includes(m.use_color_opacity))return nomadColourSurfaceSource(payload);
 if(opacity){
  const type=m.material_type??'opaque',value=m.opacity??1,factor=m.factorOpacity??1;
  if(!['opaque','blending'].includes(type)||!Number.isFinite(value)||value<0||value>1||type==='opaque'&&value!==1||!Number.isFinite(factor)||factor<0||factor>1||!([undefined,false,0].includes(m.use_color_opacity)))return null;
 }
 const factor=m.factorColor??[1,1,1];if(!Array.isArray(factor)||factor.length!==3||!factor.every(v=>Number.isFinite(v)&&v>=0&&v<=1))return null;
 const roughness=m.roughness??.25,metalness=m.metalness??0;
 if(![roughness,metalness].every(v=>Number.isFinite(v)&&v>=0&&v<=1))return null;
 return {...source,...(opacity?{opacityPreview:true,opacity:(m.material_type==='blending'?m.opacity??1:1),choice:{...source.choice,...(m.material_type==='blending'||m.textures?.opacity?{unpremultiplied:true}:{})}}:{}),factor:[...factor,1],roughness,metalness,doubleSided:m.two_sided===1,unlit:m.always_unlit===true};
}

// Separate native data maps, never glTF G/B packed textures. Grayscale validation
// makes scalar sampling unambiguous; original encoded bytes remain untouched.
export function nomadPBRSurfaceSources(payload,colour=nomadColourSurfaceSource(payload)){
 if(!colour||colour.unlit)return {};
 const maps={},seen=new Set([colour.choice.data]);let bytes=colour.choice.data.length;
 for(const slot of ['normal','roughness','metalness','emissive','opacity']){
  if(slot==='opacity'&&!colour.opacityPreview)continue;
  const source=nomadTextureSource(payload,slot,{opacity:colour.opacityPreview});if(!source)continue;
  if(slot==='emissive'){
   const factor=payload.nomadMaterial.factorEmissive??[1,1,1],strength=payload.nomadMaterial.factorEmissiveStrength??1;
   if(!Array.isArray(factor)||factor.length!==3||!factor.every(v=>Number.isFinite(v)&&v>=0&&v<=1)||!Number.isFinite(strength)||strength<0||!Number.isFinite(Math.fround(strength))||factor.some(v=>!Number.isFinite(Math.fround(v*strength))))continue;
   const extra=seen.has(source.choice.data)?0:source.choice.data.length;if(bytes+extra>8*1024*1024)continue;
   bytes+=extra;seen.add(source.choice.data);maps[slot]={...source,factor:[...factor],strength};continue;
  }
  const factor=payload.nomadMaterial[{normal:'factorNormal',roughness:'factorRoughness',metalness:'factorMetalness',opacity:'factorOpacity'}[slot]]??1;
  if(!Number.isFinite(factor)||!Number.isFinite(Math.fround(factor))||factor<0||slot!=='normal'&&factor>1)continue;
  const extra=seen.has(source.choice.data)?0:source.choice.data.length;if(bytes+extra>8*1024*1024)continue;
  bytes+=extra;seen.add(source.choice.data);
  maps[slot]={...source,factor,negY:(payload.nomadMaterial.normal_neg_y??payload.nomadMaterial.flip_y)===true,choice:{...source.choice,linear:true,...(slot==='normal'?{}:{channel:0,grayscale:true,previewSize:512})}};
 }
 return maps;
}
