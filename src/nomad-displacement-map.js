// Nomad GLB extras use an explicit material-slot name reference, unlike core
// glTF's texture indices. Paired user GLB/NOM files prove this convention for
// displacement (same 16-bit PNG SHA256); never infer a slot from an image name.
import {embeddedUVImage} from './uv-image-preview.js?v=0.36.18.1028';
export function nomadDisplacementMap(payload){
 const material=payload?.meshExtras?.nomad,slot=material?.textures?.displacement;
 if(slot==null)return null;
 const fail=detail=>{throw Error('NOMAD displacement '+detail);};
 if(payload.source!=='glb'||payload.version!==1||material.version!==1||!slot||typeof slot!=='object'||Array.isArray(slot)||typeof slot.name!=='string'||!slot.name.length)fail('requires an explicit version-1 Nomad slot');
 const keys=['name','magFilter','minFilter','projection','offset','rotation','scale','triplanar_hardness','triplanar_world','wrapS','wrapT'];
 if(Object.keys(slot).some(k=>!keys.includes(k))||!['auto','uv'].includes(slot.projection??'auto')||(slot.magFilter??'auto')!=='auto'||(slot.minFilter??'auto')!=='auto'||(slot.wrapS??'repeat')!=='repeat'||(slot.wrapT??'repeat')!=='repeat'||(slot.rotation??0)!==0||!same(slot.offset??[0,0],[0,0])||!same(slot.scale??[1,1],[1,1]))fail('requires an untransformed UV/Auto slot with default repeat sampling');
 const hardness=slot.triplanar_hardness??[.8999999761581421,.8999999761581421,.8999999761581421],world=slot.triplanar_world??true;
 if(!Array.isArray(hardness)||hardness.length!==3||hardness.some(v=>!Number.isFinite(v)||v<0||v>1)||typeof world!=='boolean')fail('projection settings are invalid');
 if(!Array.isArray(payload.images)||!Array.isArray(payload.textures))fail('requires retained image and texture tables');
 const images=payload.images.map((image,index)=>image?.definition?.name===slot.name?index:-1).filter(i=>i>=0);
 if(images.length!==1)fail('slot reference must identify exactly one embedded image');
 const textures=payload.textures.map((texture,index)=>texture?.source===images[0]?index:-1).filter(i=>i>=0);
 if(textures.length!==1)fail('image must identify exactly one core texture');
 const index=textures[0],choice=embeddedUVImage(payload,{index},{maxBytes:24*1024*1024});
 if(!choice)fail('requires an embedded PNG/JPEG image within the 24 MB native budget');
 const texture=payload.textures[index],sampler=texture.sampler===undefined?{}:Number.isInteger(texture.sampler)&&texture.sampler>=0?payload.samplers?.[texture.sampler]:null;
 if(!sampler||(sampler.wrapS??10497)!==10497||(sampler.wrapT??10497)!==10497||(sampler.magFilter??9729)!==9729||(sampler.minFilter??9987)!==9987)fail('texture requires default repeat/linear mipmap sampling');
 const {factorDisplacement,displacementMid,displacementWorld}=material;
 if(!Number.isFinite(factorDisplacement)||!Number.isFinite(Math.fround(factorDisplacement))||!Number.isFinite(displacementMid)||displacementMid<0||displacementMid>1||typeof displacementWorld!=='boolean')fail('strength, midpoint or world setting is invalid');
 // A complete Base UV channel is required by the native writer. Its observed
 // Auto encoding therefore also represents an explicitly UV-projected source.
 return {choice,name:slot.name,projection:'auto',hardness:[...hardness],world,settings:{factorDisplacement,displacementMid,displacementWorld}};
}
function same(a,b){return Array.isArray(a)&&a.length===b.length&&a.every((v,i)=>v===b[i]);}
