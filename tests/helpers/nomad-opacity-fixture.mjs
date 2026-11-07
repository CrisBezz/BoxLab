import {nomadPBRFixture} from './nomad-pbr-fixture.mjs';
import {encodeNomadScalarPNG} from '../../src/nomad-scalar-png.js';
import {buildNomadProject} from '../../src/nomad-export-core.js';
import {meshTopologySignature} from '../../src/mesh-topology-signature.js';
export async function nomadOpacityFixture(){
 const {objects,template}=await nomadPBRFixture(),size=128,pixels=new Uint8Array(size*size*4);
 for(let y=0;y<size;y++)for(let x=0;x<size;x++){const v=(Math.floor(x/32)+Math.floor(y/32))%2?255:0;pixels.set([v,v,v,255],(y*size+x)*4);}
 const data=await encodeNomadScalarPNG(pixels,size,size,1),p=objects[0].glbPassthrough;
 p.images=[...p.images,{definition:{type:'image/png'},data}];
 p.nomadMaterial.textures.opacity={...p.nomadMaterial.textures.color,index:p.images.length-1,name:'Opacity.png',scale:[2,2]};p.nomadMaterial.material_type='blending';p.nomadMaterial.factorOpacity=.8;p.nomadMaterial.two_sided=1;objects[0].name='Opacity checker';
 const m=objects[1].glbPassthrough.nomadMaterial;m.material_type='blending';m.opacity=.35;m.two_sided=1;objects[1].name='Uniform 35 percent';
 return {objects,template,bytes:buildNomadProject(objects,template,{topologySignature:meshTopologySignature,name:'BoxLab NOM opacity sample'}).bytes};
}
