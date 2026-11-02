import {decodeNomadHeightPNG} from './nomad-scalar-png.js?v=0.36.18.1064';
import {readNomadImport} from './nomad-import-core.js?v=0.36.18.1033';

// Container/material/image reader only: no geometry parsing, UV replacement or
// live scene access. An explicit native displacement slot is the only authority.
export function nativeHeightSources(bytes){
 const file=readNomadImport(bytes),materials=file.json.materials;
 if(!Array.isArray(materials)||materials.length>256)throw Error('NOM requires at most 256 materials');
 const result=[];
 for(let i=0;i<materials.length;i++){
  const material=materials[i],slot=material?.textures?.displacement;if(slot==null)continue;
  const image=file.image(slot.index);
  if(image.definition.type!=='image/png')throw Error('Native displacement benchmark requires PNG');
  result.push({label:`Material ${i+1} · ${typeof slot.name==='string'?slot.name:'Displacement'}`,data:image.data,settings:{strength:material.factorDisplacement??null,midpoint:material.displacementMid??null,worldSpace:material.displacementWorld??null,projection:slot.projection??null}});
 }
 if(!result.length)throw Error('No explicit displacement image slot in this NOM');
 return result;
}

export async function measureNativeHeight(data,{decode=decodeNomadHeightPNG,now=()=>performance.now(),nextFrame=()=>new Promise(r=>requestAnimationFrame(r)),expectedSamples=null}={}){
 const times=[];let image,stoppedEarly=false;
 for(let i=0;i<3;i++){
  await nextFrame();const start=now();image=await decode(data);const ms=now()-start;times.push(ms);
  if(expectedSamples&&(image.samples.length!==expectedSamples.length||expectedSamples.some((value,i)=>image.samples[i]!==value)))throw Error('Height sample precision check failed');
  // The previous output can be collected before the next full decode allocates.
  const {samples,...metadata}=image;image=metadata;
  if(ms>1200){stoppedEarly=true;break;}
 }
 const sorted=[...times].sort((a,b)=>a-b);
 return {...image,encodedBytes:data.byteLength,decodeSamplesMs:times,decodeMedianMs:sorted[Math.floor(sorted.length/2)],decodeMaxMs:Math.max(...times),stopAfterSingleDecodeMs:1200,stoppedEarly,decodeBudgetPassed:!stoppedEarly&&times.length===3};
}
