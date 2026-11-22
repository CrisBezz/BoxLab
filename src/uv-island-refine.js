import {inspectImportedUV,importedUVIslandBounds} from './imported-uv-inspection.js?v=0.36.18.951';
import {prepareAutoUnwrapMesh,validateAutoUnwrapResult,validateMarkedUVSeams} from './auto-unwrap-core.js?v=0.36.18.1200';

// Group labels are part of the legacy signature. Reuse corners only when
// the ordered polygon vertex lists still match exactly.
export function refinementSource(mesh,payload,owner){
 if(!payload)return null;
 const signature=owner.topologySignature(mesh);
 const stored=payload.uvTopologySignature;
 if(stored!==signature){
  if(typeof stored!=='string')return null;
  const parts=stored.split('|');
  if(parts.some(part=>part.indexOf('@')<1))return null;
  const faceKeys=parts.map(part=>part.slice(0,part.indexOf('@')));
  if(faceKeys.length!==mesh.faces.length||faceKeys.some((key,index)=>key!==mesh.faces[index].join(',')))return null;
 }
 const source=stored===signature?payload:{...payload,uvTopologySignature:signature};
 const report=inspectImportedUV(mesh,source,owner.topologySignature);
 return report.state==='ready'&&!report.missingFaces&&!report.outsideCorners?source:null;
}

export function prepareIslandRefinement(mesh,payload,island,owner,markedEdges=[]){
 const source=refinementSource(mesh,payload,owner);
 if(!source)throw Error('Create a complete UV layout with Guided Unwrap first');
 const report=inspectImportedUV(mesh,source,owner.topologySignature);
 const faces=report.faceIslands.flatMap((id,index)=>id===island?[index]:[]);
 if(!faces.length)throw Error('Select a UV island first');
 return prepareRefinementFaces(mesh,payload,faces,owner,markedEdges);
}

export function prepareIslandsRefinement(mesh,payload,islands,owner,markedEdges=[]){
 const source=refinementSource(mesh,payload,owner);
 if(!source)throw Error('Create a complete UV layout with Guided Unwrap first');
 const report=inspectImportedUV(mesh,source,owner.topologySignature);
 if(!Array.isArray(islands)||new Set(islands).size<2||islands.some(id=>!Number.isInteger(id)||id<0||id>=report.islandCount))throw Error('Collect at least two UV islands');
 const selected=new Set(islands);
 const faces=report.faceIslands.flatMap((id,index)=>selected.has(id)?[index]:[]);
 return prepareRefinementFaces(mesh,payload,faces,owner,markedEdges);
}

export function prepareFacegroupRefinement(mesh,payload,group,owner,markedEdges=[]){
 if(!refinementSource(mesh,payload,owner))throw Error('Create a complete UV layout with Guided Unwrap first');
 const faces=mesh.faces.flatMap((_,index)=>mesh.faceGroups?.[index]===group?[index]:[]);
 if(!faces.length||typeof group!=='string'||!group.trim())throw Error('Choose a Facegroup first');
 return prepareRefinementFaces(mesh,payload,faces,owner,markedEdges);
}

function prepareRefinementFaces(mesh,payload,faces,owner,markedEdges){
 const bounds=importedUVIslandBounds(payload.uvCorners,faces);
 if(!(bounds.maxU>bounds.minU&&bounds.maxV>bounds.minV))throw Error('Selected island has no usable UV area');
 const vertexIDs=new Map(),vertices=[];
 const patchFaces=faces.map(face=>mesh.faces[face].map(id=>{
  if(!vertexIDs.has(id)){vertexIDs.set(id,vertices.length);vertices.push(mesh.vertices[id]);}
  return vertexIDs.get(id);
 }));
 const edgeUses=new Map();
 for(const face of patchFaces)face.forEach((a,i)=>{
  const b=face[(i+1)%face.length],key=a<b?a+':'+b:b+':'+a;
  edgeUses.set(key,(edgeUses.get(key)||0)+1);
 });
 const patchMarks=markedEdges.flatMap(([a,b])=>{
  const x=vertexIDs.get(a),y=vertexIDs.get(b);
  if(x===undefined||y===undefined)return [];
  const key=x<y?x+':'+y:y+':'+x;
  return edgeUses.get(key)===2?[[x,y]]:[];
 });
 return {faces,bounds,markedCount:patchMarks.length,full:prepareAutoUnwrapMesh(mesh,owner),patch:prepareAutoUnwrapMesh({vertices,faces:patchFaces},owner,{markedEdges:patchMarks})};
}

export function fitRefinedIsland(plan,original,result){
 validateAutoUnwrapResult(plan.patch,result,{overlaps:false});
 validateMarkedUVSeams(plan.patch,result.uvCorners);
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
 validateMarkedUVSeams(plan.patch,plan.faces.map(face=>uvCorners[face]));
 return {uvCorners};
}
