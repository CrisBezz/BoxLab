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
export function nomadColourSurfaceSource(payload){
 if(payload?.source!=='nomad')return null;
 const m=payload.nomadMaterial,t=m?.textures?.color,image=payload.images?.[t?.index],data=image?.data;
 if(!m||!t||!(data instanceof Uint8Array)||!data.length||data.length>8*1024*1024||!['auto','uv'].includes(t.projection??'auto')||(m.material_type??'opaque')!=='opaque'||(m.opacity??1)!==1||(m.factorOpacity??1)!==1||m.flip_culling===true)return null;
 const png=[137,80,78,71,13,10,26,10].every((v,i)=>data[i]===v),jpeg=data[0]===255&&data[1]===216&&data[2]===255;
 const mime=png?'image/png':jpeg?'image/jpeg':null;if(!mime||image.definition.type!==mime)return null;
 const scale=t.scale??[1,1],offset=t.offset??[0,0];
 if(!Array.isArray(scale)||scale.length!==2||!scale.every(v=>Number.isFinite(v)&&v!==0)||!Array.isArray(offset)||offset.length!==2||offset.some(v=>v!==0)||(t.rotation??0)!==0)return null;
 const wraps={repeat:10497,mirror:33648,none:33071},filter={auto:9987,nearest:9728,linear:9729,mipmap:9987};
 const wrapS=wraps[t.wrapS??'repeat'],wrapT=wraps[t.wrapT??'repeat'],minFilter=filter[t.minFilter??'auto'];
 if(!wrapS||!wrapT||!minFilter||!['auto','nearest','linear'].includes(t.magFilter??'auto'))return null;
 const factor=m.factorColor??[1,1,1];if(!Array.isArray(factor)||factor.length!==3||!factor.every(v=>Number.isFinite(v)&&v>=0&&v<=1))return null;
 const roughness=m.roughness??.25,metalness=m.metalness??0;
 if(![roughness,metalness].every(v=>Number.isFinite(v)&&v>=0&&v<=1))return null;
 return {choice:{imageIndex:t.index,data,mime},factor:[...factor,1],sampler:{wrapS,wrapT,minFilter,magFilter:t.magFilter==='nearest'?9728:9729},repeat:scale,roughness,metalness,doubleSided:m.two_sided===1,unlit:m.always_unlit===true};
}
