import {topologySummary} from './topology-seam-conformance.js?v=0.36.18.236';

const EPS=1e-12;

function edgeKey(a,b){return a<b?`${a}:${b}`:`${b}:${a}`;}
function canonicalFace(face){return [...face].sort((a,b)=>a-b).join(':');}
function faceArea2(mesh,face){
  if(!Array.isArray(face)||face.length<3)return 0;
  const origin=mesh.vertices?.[face[0]];if(!origin)return 0;
  let area2=0;
  for(let i=1;i<face.length-1;i++){
    const a=mesh.vertices?.[face[i]],b=mesh.vertices?.[face[i+1]];
    if(!a||!b)return 0;
    area2+=a.clone().sub(origin).cross(b.clone().sub(origin)).length();
  }
  return area2;
}

export function analyzeMeshHealth(mesh){
  const base=topologySummary(mesh);
  const result={
    ...base,
    triangles:0,quads:0,ngons:0,
    duplicateFaces:0,degenerateFaces:0,zeroAreaFaces:0,
    inconsistentWindingEdges:0,orphanVertices:0,
    looseVertices:mesh?.looseVertices instanceof Set?mesh.looseVertices.size:0,
    looseEdges:mesh?.looseEdges instanceof Set?mesh.looseEdges.size:0,
    issues:[],warnings:[],state:'issues'
  };
  if(!mesh?.vertices||!mesh?.faces){
    result.issues.push({code:'invalid-mesh',count:1,label:'Invalid mesh data'});
    return result;
  }

  const seenFaces=new Set(),usedVertices=new Set(),uses=new Map();
  for(const face of mesh.faces){
    if(Array.isArray(face)){
      if(face.length===3)result.triangles++;
      else if(face.length===4)result.quads++;
      else if(face.length>4)result.ngons++;
    }
    const valid=Array.isArray(face)&&face.length>=3&&new Set(face).size===face.length&&face.every(i=>Number.isInteger(i)&&i>=0&&i<mesh.vertices.length);
    if(!valid){result.degenerateFaces++;continue;}
    const canonical=canonicalFace(face);
    if(seenFaces.has(canonical))result.duplicateFaces++;
    else seenFaces.add(canonical);
    if(faceArea2(mesh,face)<=EPS)result.zeroAreaFaces++;
    for(const vi of face)usedVertices.add(vi);
    for(let i=0;i<face.length;i++){
      const a=face[i],b=face[(i+1)%face.length],key=edgeKey(a,b);
      if(!uses.has(key))uses.set(key,[]);
      uses.get(key).push({a,b});
    }
  }

  for(let i=0;i<mesh.vertices.length;i++){
    if(usedVertices.has(i))continue;
    const explicitlyLoose=(mesh.looseVertices instanceof Set&&mesh.looseVertices.has(i))||
      (mesh.looseEdges instanceof Set&&[...mesh.looseEdges].some(key=>String(key).split(':').map(Number).includes(i)));
    if(!explicitlyLoose)result.orphanVertices++;
  }

  for(const owners of uses.values()){
    if(owners.length!==2)continue;
    const [a,b]=owners;
    if(!(a.a===b.b&&a.b===b.a))result.inconsistentWindingEdges++;
  }

  const addIssue=(code,count,label)=>{if(count>0)result.issues.push({code,count,label});};
  const addWarning=(code,count,label)=>{if(count>0)result.warnings.push({code,count,label});};
  addIssue('invalid-faces',base.invalidFaces+result.degenerateFaces,result.degenerateFaces?'Invalid / degenerate faces':'Invalid faces');
  addIssue('zero-area-faces',result.zeroAreaFaces,'Zero-area faces');
  addIssue('duplicate-faces',result.duplicateFaces,'Duplicate faces');
  addIssue('non-manifold-edges',base.nonManifoldEdges,'Non-manifold edges');
  addIssue('inconsistent-winding',result.inconsistentWindingEdges,'Inconsistent winding edges');
  addIssue('orphan-vertices',result.orphanVertices,'Orphan vertices');
  addWarning('boundary-edges',base.boundaryEdges,'Boundary edges');
  addWarning('loose-vertices',result.looseVertices,'Intentional loose vertices');
  addWarning('loose-edges',result.looseEdges,'Intentional loose edges');

  // Avoid double-reporting faces that fail the same structural validity check.
  const invalid=result.issues.find(i=>i.code==='invalid-faces');
  if(invalid)invalid.count=Math.max(base.invalidFaces,result.degenerateFaces);

  result.state=result.issues.length?'issues':base.closed?'closed-clean':'open-clean';
  result.label=result.state==='closed-clean'?'Closed · Clean':result.state==='open-clean'?'Open · Clean':'Issues Found';
  return result;
}
