import {nomadMapInspectionFixture} from './nomad-map-inspection-fixture.mjs';
import {buildNomadProject} from '../../src/nomad-export-core.js';
import {meshTopologySignature} from '../../src/mesh-topology-signature.js';
export async function nomadSevenMapObjectsFixture(){
 const {objects:[base],template}=await nomadMapInspectionFixture();
 const labels=['Colour','Normal','Emissive','Roughness','Metalness','Opacity','Displacement'],slots=['color','normal','emissive','roughness','metalness','opacity','displacement'];
 const objects=slots.map((slot,i)=>{
  const mesh=base.mesh.clone();for(const v of mesh.vertices){v.x+=(i%4-1.5)*2.4;v.z+=(Math.floor(i/4)-.5)*7.2;}
  const p=structuredClone(base.glbPassthrough),m=p.nomadMaterial;m.textures={[slot]:m.textures[slot]};m.material_type='opaque';m.opacity=m.factorOpacity=1;m.use_color_opacity=0;p.uvTopologySignature=meshTopologySignature(mesh);
  return {...base,id:i+1,name:`0${i+1} ${labels[i]}`,mesh,glbPassthrough:p};
 });
 return {objects,template,bytes:buildNomadProject(objects,template,{topologySignature:meshTopologySignature,name:'BoxLab seven map objects'}).bytes};
}
