import {applyGridFill} from './grid-fill-core.js?v=0.36.18.338';
import {quadTopologyAudit} from './quad-clean-core.js?v=0.36.18.339';

// Retopo supplies a four-corner boundary to the existing one-cell Grid Fill
// assembler. All work stays on a private native mesh until validation succeeds.
export function buildRetopoQuad(source,corners,referenceNormal){
  const refuse=reason=>({ok:false,reason});
  if(!source?.clone||corners?.length!==4)return refuse('Choose four corners');
  const mesh=source.clone(),cycle=[];
  for(const corner of corners){
    if(corner.index!==null&&corner.index!==undefined){
      if(!Number.isInteger(corner.index)||!mesh.vertices[corner.index])return refuse('Corner selection changed');
      cycle.push(corner.index);
    }else{
      const p=corner.point;
      if(!p||![p.x,p.y,p.z].every(Number.isFinite))return refuse('Invalid surface point');
      cycle.push(mesh.addLooseVertex(p));
    }
  }
  if(new Set(cycle).size!==4)return refuse('Choose four different corners');
  const points=cycle.map(i=>mesh.vertices[i]),scale=Math.max(...points.map(p=>p.distanceTo(points[0])));
  if(!Number.isFinite(scale)||scale<=1e-10)return refuse('Quad is too small');
  const normal=points[1].clone().sub(points[0]).cross(points[2].clone().sub(points[0]));
  if(normal.length()<=scale*scale*1e-8)return refuse('Quad corners are collinear');
  normal.normalize();
  // Reject crossed, collapsed and folded corners before asking Grid Fill to
  // assemble the cell. Source face/vertex numbering never changes on refusal.
  for(let i=0;i<4;i++){
    const a=points[(i+1)%4].clone().sub(points[i]),b=points[(i+2)%4].clone().sub(points[(i+1)%4]);
    if(a.length()<=scale*1e-8||a.cross(b).dot(normal)<=scale*scale*1e-8)return refuse('Tap corners around the quad boundary');
  }
  const key=cycle.slice().sort((a,b)=>a-b).join(':');
  if(mesh.faces.some(f=>f.length===4&&f.slice().sort((a,b)=>a-b).join(':')===key))return refuse('That quad already exists');
  const owners=(a,b)=>mesh.faces.filter(f=>f.some((v,i)=>(v===a&&f[(i+1)%f.length]===b)||(v===b&&f[(i+1)%f.length]===a)));
  const direction=(f,a,b)=>f.some((v,i)=>v===a&&f[(i+1)%f.length]===b);
  let reverse=referenceNormal?.dot?.(normal)<0,seed=false;
  for(let i=0;i<4;i++){
    const a=cycle[i],b=cycle[(i+1)%4],neighbors=owners(a,b);
    if(neighbors.length>1)return refuse('Use a boundary edge, not an interior edge');
    if(neighbors.length&&!seed){reverse=direction(neighbors[0],a,b);seed=true;}
  }
  if(reverse)cycle.reverse();
  for(let i=0;i<4;i++){
    const a=cycle[i],b=cycle[(i+1)%4],neighbors=owners(a,b);
    if(neighbors.some(f=>direction(f,a,b)))return refuse('Shared edges need consistent winding');
  }
  const result=applyGridFill(mesh,{ok:true,uSegments:1,vSegments:1,cycle,edgePairs:cycle.map((a,i)=>[a,cycle[(i+1)%4]]),sides:cycle.map((a,i)=>[a,cycle[(i+1)%4]])});
  if(!result||!quadTopologyAudit(mesh).ok)return refuse('Quad does not form valid topology');
  mesh.faceGroups[mesh.faces.length-1]=null;
  return{ok:true,mesh,face:mesh.faces.length-1,corners:cycle};
}
