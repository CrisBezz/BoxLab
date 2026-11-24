import {quadTopologyAudit} from './quad-clean-core.js?v=0.36.18.1226';

function crossing(a,b,c,d){
  const ux=b.x-a.x,uy=b.y-a.y,vx=d.x-c.x,vy=d.y-c.y;
  const denominator=ux*vy-uy*vx;
  if(Math.abs(denominator)<1e-8)return null;
  const x=c.x-a.x,y=c.y-a.y;
  const t=(x*vy-y*vx)/denominator,s=(x*uy-y*ux)/denominator;
  if(t<0||t>1||s<.04||s>.96)return null;
  return {x:a.x+t*ux,y:a.y+t*uy};
}

// The native opposite-edge ring owns the topology. The Retopo stroke must
// cross every edge of exactly one ring so the edit cannot leave a T-junction.
export function cutRetopoStroke(mesh,stroke,project,snap,visible){
  const edges=mesh.edges(),crossings=new Map();
  const points=[...stroke];
  for(const [end,neighbor] of [[0,1],[points.length-1,points.length-2]]){
    const p=points[end],q=points[neighbor],length=Math.hypot(p.x-q.x,p.y-q.y);
    if(length>0)points[end]={x:p.x+(p.x-q.x)*8/length,y:p.y+(p.y-q.y)*8/length};
  }
  const projected=mesh.vertices.map(project);
  for(let i=0;i<edges.length;i++){
    const {a,b}=edges[i],c=projected[a],d=projected[b];
    if(Math.abs(c.z)>1||Math.abs(d.z)>1)continue;
    const key=mesh.edgeKey(a,b);
    for(let j=1;j<points.length;j++){
      const hit=crossing(points[j-1],points[j],c,d);
      if(!hit)continue;
      if(!visible(mesh.vertices[a],c)||!visible(mesh.vertices[b],d))break;
      const prior=crossings.get(key);
      if(prior&&Math.hypot(prior.point.x-hit.x,prior.point.y-hit.y)>1)return null;
      crossings.set(key,{index:i,point:hit});
    }
  }
  if(crossings.size<2)return null;
  const seed=crossings.values().next().value.index,ring=mesh.loopRing(seed);
  if(!ring||ring.cutKeys.size!==crossings.size||[...ring.cutKeys].some(key=>!crossings.has(key)))return null;
  if(ring.splitFaces.length!==ring.cutKeys.size-1&&ring.splitFaces.length!==ring.cutKeys.size)return null;
  const split=new Set(ring.splitFaces.map(item=>item.faceIndex));
  if(edges.some(edge=>ring.cutKeys.has(mesh.edgeKey(edge.a,edge.b))&&edge.faces.some(index=>!split.has(index))))return null;
  const trial=mesh.clone(),result=trial.loopCut(seed);
  if(!result)return null;
  const groups=[];
  mesh.faces.forEach((face,index)=>{
    const group=mesh.faceGroups?.[index]??null;
    groups.push(group);
    if(split.has(index))groups.push(group);
  });
  trial.faceGroups=groups;
  let i=0;
  for(const key of ring.cutKeys){
    const position=snap(crossings.get(key).point);
    if(!position)return null;
    const {vertex}=result.slideData[i++];
    trial.vertices[vertex].copy(position);
    if(trial.creases.has(key)){
      const value=trial.creases.get(key),{a,b}=ring.directed.get(key);
      trial.creases.delete(key);
      trial.creases.set(trial.edgeKey(a,vertex),value);
      trial.creases.set(trial.edgeKey(vertex,b),value);
    }
  }
  if(!quadTopologyAudit(trial).ok)return null;
  let output=0;
  for(let faceIndex=0;faceIndex<mesh.faces.length;faceIndex++){
    const face=mesh.faces[faceIndex];
    if(!split.has(faceIndex)){output++;continue;}
    const normal=mesh.vertices[face[1]].clone().sub(mesh.vertices[face[0]])
      .cross(mesh.vertices[face[3]].clone().sub(mesh.vertices[face[0]])).normalize();
    for(const cell of trial.faces.slice(output,output+2)){
      for(let k=0;k<4;k++){
        const base=trial.vertices[cell[k]];
        const u=trial.vertices[cell[(k+1)%4]].clone().sub(base);
        const v=trial.vertices[cell[(k+3)%4]].clone().sub(base);
        if(u.cross(v).dot(normal)<=0)return null;
      }
    }
    output+=2;
  }
  return {ok:true,mesh:trial,splitFaces:split.size};
}
