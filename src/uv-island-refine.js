import {inspectImportedUV,importedUVIslandBounds} from './imported-uv-inspection.js?v=0.36.18.951';
import {prepareAutoUnwrapMesh,validateAutoUnwrapResult} from './auto-unwrap-core.js?v=0.36.18.1200';

export function prepareIslandRefinement(mesh,payload,island,owner){
 const report=inspectImportedUV(mesh,payload,owner.topologySignature);
 if(report.state!=='ready'||report.missingFaces||report.outsideCorners)throw Error('Refinement requires complete UVs inside tile 0–1');
 const faces=report.faceIslands.flatMap((id,index)=>id===island?[index]:[]);
 if(!faces.length)throw Error('Select a UV island first');
 const bounds=importedUVIslandBounds(payload.uvCorners,faces);
 if(!(bounds.maxU>bounds.minU&&bounds.maxV>bounds.minV))throw Error('Selected island has no usable UV area');
 const vertexIDs=new Map(),vertices=[];
 const patchFaces=faces.map(face=>mesh.faces[face].map(id=>{
  if(!vertexIDs.has(id)){vertexIDs.set(id,vertices.length);vertices.push(mesh.vertices[id]);}
  return vertexIDs.get(id);
 }));
 return {faces,bounds,full:prepareAutoUnwrapMesh(mesh,owner),patch:prepareAutoUnwrapMesh({vertices,faces:patchFaces},owner)};
}

export function fitRefinedIsland(plan,original,result){
 validateAutoUnwrapResult(plan.patch,result,{overlaps:false});
 const source=importedUVIslandBounds(result.uvCorners,plan.faces.map((_,i)=>i));
 const target=plan.bounds,spanU=source.maxU-source.minU,spanV=source.maxV-source.minV;
 const scale=.98*Math.min((target.maxU-target.minU)/spanU,(target.maxV-target.minV)/spanV);
 const centerU=(target.minU+target.maxU)/2,centerV=(target.minV+target.maxV)/2;
 const uvCorners=original.slice();
 plan.faces.forEach((face,index)=>{
  uvCorners[face]=result.uvCorners[index].map(([u,v])=>[
   centerU+(u-(source.minU+source.maxU)/2)*scale,
   centerV+(v-(source.minV+source.maxV)/2)*scale,
  ]);
 });
 validateAutoUnwrapResult(plan.full,{uvCorners});
 return {uvCorners};
}
