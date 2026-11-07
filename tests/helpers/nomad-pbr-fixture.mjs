import fs from 'node:fs';
import {EditableMesh} from '../../src/mesh.js';
import {createBoxUV} from '../../src/imported-uv-edit.js';
import {meshTopologySignature} from '../../src/mesh-topology-signature.js';
import {encodeNomadColourPNG,encodeNomadDataPNG,encodeNomadScalarPNG} from '../../src/nomad-scalar-png.js';
import {buildNomadProject} from '../../src/nomad-export-core.js';
// Original generic swatches. No user artwork. The native writer is also the demo owner.
export async function nomadPBRFixture({emissive=false}={}){
 const size=128,colour=new Uint8Array(size*size*4),normal=colour.slice(),roughness=colour.slice(),metalness=colour.slice();
 for(let y=0;y<size;y++)for(let x=0;x<size;x++){
  const i=(y*size+x)*4,band=(Math.floor(x/32)+Math.floor(y/32))%2;
  colour.set(band?[205,151,63,255]:[91,129,162,255],i);
  const nx=.45*Math.sin(x/size*8*Math.PI),ny=.45*Math.cos(y/size*8*Math.PI),nz=Math.sqrt(1-nx*nx-ny*ny);
  normal.set([Math.round((nx+1)*127.5),Math.round((ny+1)*127.5),Math.round((nz+1)*127.5),255],i);
  const r=band?230:32;roughness.set([r,r,r,255],i);const m=x<size/2?0:255;metalness.set([m,m,m,255],i);
 }
 const pngs=await Promise.all([encodeNomadColourPNG(colour,size,size),encodeNomadDataPNG(normal,size,size),encodeNomadScalarPNG(roughness,size,size,1),encodeNomadScalarPNG(metalness,size,size,2)]);
 const images=pngs.map(data=>({definition:{type:'image/png'},data}));
 const texture=(index,scale=[1,1])=>({index,name:['Colour','Normal','Roughness','Metalness'][index]+'.png',projection:'uv',offset:[0,0],rotation:0,scale,wrapS:'repeat',wrapT:'repeat',minFilter:'auto',magFilter:'auto'});
 const objects=[emissive?'Emissive + normal':'Normal + roughness','Metalness + roughness','Colour control'].map((name,i)=>{
  const mesh=EditableMesh.cube(1.7);for(const v of mesh.vertices)v.x+=(i-1)*2.4;
  const object={id:i+1,name,mesh,visible:true,settings:{}};
  createBoxUV(object,mesh,meshTopologySignature,{capture:()=>({}),checkpointSnapshot:()=>true});
  const textures={color:texture(0),...(emissive&&i===0?{emissive:texture(0,[3,2])}:{}),...(i<2?{normal:texture(1,[2,2]),roughness:texture(2)}:{}),...(i===1?{metalness:texture(3)}:{})};
  object.glbPassthrough={...object.glbPassthrough,source:'nomad',images,nomadMaterial:{...(emissive&&i===0?{factorEmissive:[.25,.65,1],factorEmissiveStrength:2}:{}),material_type:'opaque',factorColor:[1,1,1],opacity:1,factorOpacity:1,roughness:.35,metalness:0,factorNormal:.7,normal_neg_y:false,factorRoughness:.9,factorMetalness:1,textures}};
  return object;
 });
 const template=fs.readFileSync(new URL('../../src/templates/nomad-tube.nom',import.meta.url));
 return {objects,template,bytes:buildNomadProject(objects,template,{topologySignature:meshTopologySignature,name:'BoxLab NOM PBR sample'}).bytes};
}
