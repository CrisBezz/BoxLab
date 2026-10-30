import {nomadPBRFixture} from './nomad-pbr-fixture.mjs';
import {encodeNomadColourPNG} from '../../src/nomad-scalar-png.js';
import {buildNomadProject} from '../../src/nomad-export-core.js';
import {meshTopologySignature} from '../../src/mesh-topology-signature.js';
// Asymmetric cyan up-arrow on four coloured quadrants; no user artwork.
export async function nomadTextureTransformFixture(){
 const {objects,template}=await nomadPBRFixture(),size=128,pixels=new Uint8Array(size*size*4);
 for(let y=0;y<size;y++)for(let x=0;x<size;x++){
  const arrow=y>=16&&y<52&&Math.abs(x-64)<(y-16)||y>=48&&y<108&&x>=54&&x<74;
  const rgb=arrow?[40,235,240]:y<64?(x<64?[200,55,40]:[235,175,45]):(x<64?[55,80,190]:[65,150,70]);
  pixels.set([...rgb,255],(y*size+x)*4);
 }
 const data=await encodeNomadColourPNG(pixels,size,size);
 const transforms=[{scale:[1,1],offset:[0,0],rotation:0},{scale:[1,1],offset:[.25,.125],rotation:0},{scale:[2,1],offset:[0,2],rotation:Math.PI/2}];
 objects.forEach((o,i)=>{
  const p=o.glbPassthrough;p.images=[{definition:{type:'image/png'},data}];
  p.nomadMaterial.textures={color:{...p.nomadMaterial.textures.color,index:0,name:'Arrow quadrants.png',...transforms[i]}};
  o.name=['Original arrow','Offset arrow','Quarter-turn two arrows'][i];
 });
 return {objects,template,bytes:buildNomadProject(objects,template,{topologySignature:meshTopologySignature,name:'BoxLab NOM texture transforms'}).bytes};
}
