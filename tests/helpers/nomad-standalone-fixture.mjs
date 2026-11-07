import {nomadSevenMapObjectsFixture} from './nomad-seven-map-objects-fixture.mjs';
import {nomadPBRFixture} from './nomad-pbr-fixture.mjs';
import {buildNomadProject} from '../../src/nomad-export-core.js';
import {meshTopologySignature} from '../../src/mesh-topology-signature.js';
export async function nomadStandaloneFixture(){
 const {objects,template}=await nomadSevenMapObjectsFixture(),{objects:[colour]}=await nomadPBRFixture();
 for(const i of [0,2]){
  const p=objects[i].glbPassthrough,index=p.images.length;
  p.images.push(structuredClone(colour.glbPassthrough.images[0]));p.nomadMaterial.textures[i===0?'color':'emissive'].index=index;
 }
 for(const o of objects)o.glbPassthrough.nomadMaterial.color=[.65,.65,.65];
 objects[2].glbPassthrough.nomadMaterial.factorEmissive=[.5,.7,1];objects[2].glbPassthrough.nomadMaterial.factorEmissiveStrength=2;
 return {objects,template,bytes:buildNomadProject(objects,template,{topologySignature:meshTopologySignature,name:'BoxLab standalone maps'}).bytes};
}
