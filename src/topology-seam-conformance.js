// BoxLab v0.36.18.235 — reusable boundary T-junction seam conformance.
// Repairs mismatched face-boundary segmentation without moving vertices.
const VERSION='0.36.18.235';

function edgeKey(a,b){return a<b?`${a}:${b}`:`${b}:${a}`;}
function cloneMesh(mesh){
  if(mesh?.clone)return mesh.clone();
  return {
    ...mesh,
    vertices:(mesh?.vertices||[]).map(v=>v?.clone?v.clone():{...v}),
    faces:(mesh?.faces||[]).map(f=>[...f]),
    creases:new Map(mesh?.creases||[]),
    looseEdges:new Set(mesh?.looseEdges||[]),
    looseVertices:new Set(mesh?.looseVertices||[])
  };
}
function edgeUse(mesh){
  const uses=new Map();
  for(let fi=0;fi<(mesh?.faces?.length||0);fi++){
    const face=mesh.faces[fi];if(!Array.isArray(face)||face.length<3)continue;
    for(let i=0;i<face.length;i++){
      const a=face[i],b=face[(i+1)%face.length],key=edgeKey(a,b);
      if(!uses.has(key))uses.set(key,[]);
      uses.get(key).push({fi,i,a,b});
    }
  }
  return uses;
}
export function topologySummary(mesh){
  const uses=edgeUse(mesh),boundary=[],nonManifold=[];
  for(const [key,owners] of uses){
    if(owners.length===1)boundary.push({key,...owners[0]});
    else if(owners.length>2)nonManifold.push({key,owners});
  }
  let invalidFaces=0;
  for(const face of mesh?.faces||[]){
    if(!Array.isArray(face)||face.length<3||new Set(face).size!==face.length){invalidFaces++;continue;}
    if(face.some(index=>!Number.isInteger(index)||index<0||index>=mesh.vertices.length))invalidFaces++;
  }
  return {
    vertices:mesh?.vertices?.length||0,faces:mesh?.faces?.length||0,edges:uses.size,
    boundaryEdges:boundary.length,nonManifoldEdges:nonManifold.length,invalidFaces,
    boundary,nonManifold,
    closed:boundary.length===0&&nonManifold.length===0&&invalidFaces===0&&(mesh?.faces?.length||0)>0
  };
}
function meshScale(mesh){
  if(!mesh?.vertices?.length)return 1e-12;
  let minX=Infinity,minY=Infinity,minZ=Infinity,maxX=-Infinity,maxY=-Infinity,maxZ=-Infinity;
  for(const p of mesh.vertices){
    if(!p||![p.x,p.y,p.z].every(Number.isFinite))continue;
    minX=Math.min(minX,p.x);minY=Math.min(minY,p.y);minZ=Math.min(minZ,p.z);
    maxX=Math.max(maxX,p.x);maxY=Math.max(maxY,p.y);maxZ=Math.max(maxZ,p.z);
  }
  if(!Number.isFinite(minX))return 1e-12;
  return Math.max(1e-12,Math.hypot(maxX-minX,maxY-minY,maxZ-minZ));
}
function pointOnOpenSegment(point,a,b,tolerance){
  const abx=b.x-a.x,aby=b.y-a.y,abz=b.z-a.z;
  const apx=point.x-a.x,apy=point.y-a.y,apz=point.z-a.z;
  const l2=abx*abx+aby*aby+abz*abz;if(l2<=tolerance*tolerance)return null;
  const t=(apx*abx+apy*aby+apz*abz)/l2;
  const endpoint=Math.min(.25,Math.max(1e-8,tolerance/Math.sqrt(l2)));
  if(t<=endpoint||t>=1-endpoint)return null;
  const qx=a.x+abx*t,qy=a.y+aby*t,qz=a.z+abz*t;
  const distance=Math.hypot(point.x-qx,point.y-qy,point.z-qz);
  return distance<=tolerance?{t,distance}:null;
}
function splitExistingVertex(mesh,record,vertex){
  const face=mesh.faces?.[record.fi];
  if(!Array.isArray(face)||face.includes(vertex))return false;
  const i=record.i,a=face[i],b=face[(i+1)%face.length];
  if(edgeKey(a,b)!==record.key&&record.key)return false;
  const next=[...face];next.splice(i+1,0,vertex);mesh.faces[record.fi]=next;
  if(mesh.creases instanceof Map){
    const old=edgeKey(a,b),strength=mesh.creases.get(old);
    if(strength!==undefined){mesh.creases.delete(old);mesh.creases.set(edgeKey(a,vertex),strength);mesh.creases.set(edgeKey(vertex,b),strength);}
  }
  if(mesh.looseEdges instanceof Set){
    const old=edgeKey(a,b);
    if(mesh.looseEdges.delete(old)){mesh.looseEdges.add(edgeKey(a,vertex));mesh.looseEdges.add(edgeKey(vertex,b));}
  }
  return true;
}
export function conformBoundaryTJunctions(mesh,options={}){
  const candidate=cloneMesh(mesh),before=topologySummary(candidate);
  const tolerance=options.tolerance??Math.max(1e-10,meshScale(candidate)*5e-7);
  const maxSplits=options.maxSplits??2048;
  let splits=0;
  while(splits<maxSplits){
    const info=topologySummary(candidate);if(!info.boundary.length)break;
    const boundaryVertices=new Set();
    for(const edge of info.boundary){boundaryVertices.add(edge.a);boundaryVertices.add(edge.b);}
    let chosen=null;
    for(const edge of info.boundary){
      const a=candidate.vertices?.[edge.a],b=candidate.vertices?.[edge.b];if(!a||!b)continue;
      for(const vertex of boundaryVertices){
        if(vertex===edge.a||vertex===edge.b)continue;
        const p=candidate.vertices?.[vertex];if(!p)continue;
        const hit=pointOnOpenSegment(p,a,b,tolerance);if(!hit)continue;
        const face=candidate.faces?.[edge.fi];if(!face||face.includes(vertex))continue;
        chosen={...edge,key:edge.key,vertex,t:hit.t};break;
      }
      if(chosen)break;
    }
    if(!chosen)break;
    if(!splitExistingVertex(candidate,chosen,chosen.vertex))break;
    splits++;
  }
  candidate.edges?.();
  const after=topologySummary(candidate);
  const improved=after.boundaryEdges<before.boundaryEdges||after.nonManifoldEdges<before.nonManifoldEdges;
  const safe=after.invalidFaces===0&&after.nonManifoldEdges<=before.nonManifoldEdges&&after.boundaryEdges<=before.boundaryEdges;
  return {ok:safe,mesh:safe?candidate:mesh,splits,before,after,improved,tolerance,reason:safe?(splits?'Boundary T-junctions conformed':'No seam conformance needed'):'Seam conformance rejected'};
}
export function gateClosedEdit(beforeMesh,editedMesh,options={}){
  const before=topologySummary(beforeMesh),raw=topologySummary(editedMesh);
  if(!before.closed)return{ok:true,mesh:editedMesh,repaired:false,splits:0,before,after:raw,reason:'Source mesh already open — closed-shell gate not applied'};
  if(raw.closed)return{ok:true,mesh:editedMesh,repaired:false,splits:0,before,after:raw,reason:'Closed result'};
  const repaired=conformBoundaryTJunctions(editedMesh,options),after=repaired.after;
  if(repaired.ok&&after.closed)return{ok:true,mesh:repaired.mesh,repaired:true,splits:repaired.splits,before,raw,after,reason:`Closed after ${repaired.splits} seam split${repaired.splits===1?'':'s'}`};
  return{ok:false,mesh:beforeMesh,repaired:false,splits:repaired.splits,before,raw,after,reason:`Topology rollback • ${raw.boundaryEdges} boundary edge${raw.boundaryEdges===1?'':'s'}`};
}

globalThis.__boxlabTopologySeamConformance={version:VERSION,topologySummary,conformBoundaryTJunctions,gateClosedEdit};
