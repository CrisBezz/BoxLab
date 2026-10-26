// Native UV compatibility for the original Array owner. No geometry or paint engine.
import {inspectImportedUV} from './imported-uv-inspection.js?v=0.36.18.951';
import {meshTopologySignature} from './mesh-topology-signature.js?v=0.36.18.939';

export function arrayNativeUVSource(object,mesh,live=false){
  if(object.colourPaint||object.roughnessPaint||object.metalnessPaint)throw Error('Clear paint in Object → UV before applying Array; existing paint is retained');
  const payload=live&&object.arrayRecipe?object.arrayRecipe.nativeUV:object.glbPassthrough;
  if(payload?.version!==1||payload.source!=='boxlab'||Object.keys(payload).some(k=>!['version','source','uvTopologySignature','uvCorners'].includes(k)))throw Error('Array needs plain native UVs without imported resources');
  const report=inspectImportedUV(mesh,payload,meshTopologySignature);
  if(report.state!=='ready'||report.missingFaces||report.mappedFaces!==mesh.faces.length)throw Error('Array UVs no longer match the source; recreate UVs in Object → UV');
  return {version:1,source:'boxlab',uvTopologySignature:payload.uvTopologySignature,uvCorners:payload.uvCorners.map(f=>f.map(p=>[...p]))};
}

export function arrayNativeUVResult(payload,result,count){
  if(!Number.isInteger(count)||count<2||count>12||result.faces.length!==payload.uvCorners.length*count)throw Error('Array UV face count mismatch');
  const uvCorners=Array.from({length:count},()=>payload.uvCorners.map(f=>f.map(p=>[...p]))).flat();
  const next={version:1,source:'boxlab',uvTopologySignature:meshTopologySignature(result),uvCorners};
  const report=inspectImportedUV(result,next,meshTopologySignature);
  if(report.state!=='ready'||report.missingFaces)throw Error('Array UV generation failed');
  return next;
}
