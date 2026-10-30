import {nomadColourAlphaFixture} from './nomad-colour-alpha-fixture.mjs';
import {buildNomadProject} from '../../src/nomad-export-core.js';
import {meshTopologySignature} from '../../src/mesh-topology-signature.js';
// One generic cube, seven retained maps, including a 16-bit displacement source.
export async function nomadMapInspectionFixture(){
 const {objects:original,template}=await nomadColourAlphaFixture(),object=original[1],p=object.glbPassthrough,m=p.nomadMaterial;
 object.name='NOM map inspection';m.textures.emissive={...m.textures.color,name:'Emission.png'};m.factorEmissive=[.05,.1,.2];m.factorEmissiveStrength=1;
 const data=Uint8Array.from(Buffer.from('iVBORw0KGgoAAAANSUhEUgAAAAIAAAACEAAAAAAHTY67AAAAEklEQVR4nGNgYGB+wVDL8P8/AAqAA2c7FPwFAAAAAElFTkSuQmCC','base64'));
 p.images=[...p.images,{definition:{type:'image/png'},data}];m.textures.displacement={...m.textures.color,index:p.images.length-1,name:'Displacement16.png',projection:'triplanar'};
 m.factorDisplacement=.1;m.displacementMid=.5;
 const objects=[object];
 return {objects,template,bytes:buildNomadProject(objects,template,{topologySignature:meshTopologySignature,name:'BoxLab NOM map inspection'}).bytes};
}
