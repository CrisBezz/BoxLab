import {deflateSync} from 'node:zlib';
import {crc} from './png-inspect.mjs';
import {nomadOpacityFixture} from './nomad-opacity-fixture.mjs';
import {buildNomadProject} from '../../src/nomad-export-core.js';
import {meshTopologySignature} from '../../src/mesh-topology-signature.js';
// Test-only RGBA PNG writer; production image transport/export remain byte-copy.
function chunk(type,data){const out=Buffer.alloc(data.length+12);out.writeUInt32BE(data.length);out.write(type,4);out.set(data,8);out.writeUInt32BE(crc(out.subarray(4,-4)),out.length-4);return out;}
export async function nomadColourAlphaFixture(){
 const {objects,template}=await nomadOpacityFixture(),size=128,rows=Buffer.alloc((size*4+1)*size);
 for(let y=0;y<size;y++)for(let x=0;x<size;x++){const at=y*(size*4+1)+1+x*4,alpha=(Math.floor(x/32)+Math.floor(y/32))%2?255:0;rows.set([55,175,220,alpha],at);}
 const ihdr=Buffer.alloc(13);ihdr.writeUInt32BE(size,0);ihdr.writeUInt32BE(size,4);ihdr[8]=8;ihdr[9]=6;
 const data=new Uint8Array(Buffer.concat([Buffer.from([137,80,78,71,13,10,26,10]),chunk('IHDR',ihdr),chunk('sRGB',Buffer.from([0])),chunk('IDAT',deflateSync(rows)),chunk('IEND',Buffer.alloc(0))]));
 const alpha={definition:{type:'image/png'},data},opacity=objects[0].glbPassthrough.images.at(-1);
 for(let i=0;i<3;i++){
  const p=objects[i].glbPassthrough;p.images=[...p.images,alpha];const m=p.nomadMaterial;m.textures.color={...m.textures.color,index:p.images.length-1,name:'Colour-alpha.png'};m.use_color_opacity=i===2?0:1;
  m.material_type='blending';m.opacity=i===1?.65:1;m.factorOpacity=i===1?.8:1;m.two_sided=1;
  delete m.textures.opacity;
  if(i===1){p.images=[...p.images,opacity];m.textures.opacity={...m.textures.color,index:p.images.length-1,name:'Opacity.png',scale:[2,2]};}
  objects[i].name=['Colour alpha ON','Colour alpha x opacity','Colour alpha OFF'][i];
 }
 return {objects,template,bytes:buildNomadProject(objects,template,{topologySignature:meshTopologySignature,name:'BoxLab NOM colour alpha sample'}).bytes};
}
