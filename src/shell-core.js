import { EditableMesh } from './mesh.js';
import { analyzeSolidifyInput, solidifyOpenMesh, __solidifyInternals } from './solidify-core.js?v=0.36.18.374';

function cloneInto(target,source){
  target.vertices=source.vertices.map(v=>v.clone());
  target.faces=source.faces.map(f=>[...f]);
  target.faceGroups=source.faces.map((_,fi)=>source.faceGroups?.[fi]??null);
  target.creases=new Map(source.creases||[]);
  target.looseEdges=new Set(source.looseEdges||[]);
  target.looseVertices=new Set(source.looseVertices||[]);
  target.edges?.();
}
function selectedFaceIds(mesh,faceIndices){
  return[...new Set(faceIndices||[])].filter(i=>Number.isInteger(i)&&Array.isArray(mesh?.faces?.[i]));
}
function compactRemaining(mesh,removed){
  const faces=mesh.faces.filter((_,i)=>!removed.has(i)).map(f=>[...f]);
  const faceGroups=mesh.faces.map((_,i)=>mesh.faceGroups?.[i]??null).filter((_,i)=>!removed.has(i));
  if(!faces.length)return null;
  const used=new Set(faces.flat());
  const map=new Map(),vertices=[];
  mesh.vertices.forEach((v,i)=>{
    if(!used.has(i))return;
    map.set(i,vertices.length);
    vertices.push(v.clone());
  });
  const compactFaces=faces.map(face=>face.map(i=>map.get(i)));
  const creases=new Map();
  for(const [key,value] of mesh.creases||[]){
    const [a,b]=String(key).split(':').map(Number);
    if(!map.has(a)||!map.has(b))continue;
    const na=map.get(a),nb=map.get(b);
    creases.set(na<nb?`${na}:${nb}`:`${nb}:${na}`,value);
  }
  return new EditableMesh(vertices,compactFaces,creases,faceGroups);
}

export function analyzeShellInput(mesh,faceIndices){
  if(!mesh)return{ok:false,reason:'invalid-mesh'};
  if((mesh.looseEdges?.size||0)||(mesh.looseVertices?.size||0))return{ok:false,reason:'loose-topology'};
  const closed=__solidifyInternals.inspectClosed(mesh);
  if(!closed.ok)return{ok:false,reason:'needs-closed-solid',detail:closed.reason};
  const selected=selectedFaceIds(mesh,faceIndices);
  if(!selected.length)return{ok:false,reason:'no-selected-faces'};
  if(selected.length>=mesh.faces.length)return{ok:false,reason:'all-faces-selected'};
  const opened=compactRemaining(mesh,new Set(selected));
  if(!opened)return{ok:false,reason:'empty-result'};
  const openCheck=analyzeSolidifyInput(opened);
  if(!openCheck.ok)return{ok:false,reason:'invalid-opening',detail:openCheck.reason};
  return{
    ok:true,
    selectedFaces:selected,
    remainingFaces:opened.faces.length,
    openingBoundaryEdges:openCheck.boundaryEdges
  };
}

export function shellClosedMesh(mesh,faceIndices,thickness=0.2){
  const analysis=analyzeShellInput(mesh,faceIndices);
  if(!analysis.ok)return{...analysis,changed:false};
  const before=mesh.clone();
  try{
    const opened=compactRemaining(before,new Set(analysis.selectedFaces));
    const result=solidifyOpenMesh(opened,thickness);
    if(!result.ok)return{...result,changed:false,stage:'solidify'};
    cloneInto(mesh,opened);
    const closed=__solidifyInternals.inspectClosed(mesh);
    if(!closed.ok){
      cloneInto(mesh,before);
      return{ok:false,changed:false,rolledBack:true,reason:`validation-${closed.reason}`};
    }
    return{
      ok:true,
      changed:true,
      thickness:Number(thickness),
      removedFaces:analysis.selectedFaces.length,
      openingBoundaryEdges:analysis.openingBoundaryEdges,
      sideFaces:result.sideFaces,
      before:{vertices:before.vertices.length,faces:before.faces.length},
      after:{vertices:mesh.vertices.length,faces:mesh.faces.length}
    };
  }catch(error){
    cloneInto(mesh,before);
    return{ok:false,changed:false,rolledBack:true,reason:error?.message||'shell-exception',error};
  }
}

export const __shellInternals={compactRemaining,selectedFaceIds,cloneInto};
