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
  return applySurfaceLoop(mesh,seed,ring,edges,key=>snap(crossings.get(key).point));
}

function applySurfaceLoop(mesh,seed,ring,edges,positionFor){
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
    const position=positionFor(key);
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

function nearestEdgeParameter(p,a,b){
  const dx=b.x-a.x,dy=b.y-a.y,length=dx*dx+dy*dy;
  return length?((p.x-a.x)*dx+(p.y-a.y)*dy)/length:0;
}
function quadContains(point,polygon){
  const turns=polygon.map((a,i)=>{
    const b=polygon[(i+1)%polygon.length];
    return (b.x-a.x)*(point.y-a.y)-(b.y-a.y)*(point.x-a.x);
  });
  return turns.every(turn=>turn<0)||turns.every(turn=>turn>0);
}

export function loopRetopoDrag(mesh,stroke,project,snap,visible){
  const edges=mesh.edges(),projected=mesh.vertices.map(project),first=stroke[0],last=stroke.at(-1);
  const seeds=[];
  for(let i=0;i<edges.length;i++){
    const edge=edges[i],a=projected[edge.a],b=projected[edge.b],t=nearestEdgeParameter(first,a,b);
    if(t<.08||t>.92)continue;
    const p={x:a.x+(b.x-a.x)*t,y:a.y+(b.y-a.y)*t};
    const distance=Math.hypot(p.x-first.x,p.y-first.y);
    if(distance>9||!visible(mesh.vertices[edge.a],a)||!visible(mesh.vertices[edge.b],b))continue;
    const length=Math.hypot(b.x-a.x,b.y-a.y);
    const inward=Math.abs((b.x-a.x)*(last.y-p.y)-(b.y-a.y)*(last.x-p.x))/length;
    const drag=Math.hypot(last.x-first.x,last.y-first.y);
    if(inward<11||inward<drag*.65)continue;
    if(!edge.faces.some(fi=>mesh.faces[fi].length===4&&quadContains(last,mesh.faces[fi].map(v=>projected[v]))))continue;
    seeds.push({i,t,distance});
  }
  seeds.sort((a,b)=>a.distance-b.distance);
  if(!seeds.length||(seeds[1]&&seeds[1].distance-seeds[0].distance<2))return null;
  const {i,t}=seeds[0],ring=mesh.loopRing(i);
  if(!ring)return null;
  const result=applySurfaceLoop(mesh,i,ring,edges,key=>{
    const {a,b}=ring.directed.get(key);
    if(!visible(mesh.vertices[a],projected[a])||!visible(mesh.vertices[b],projected[b]))return null;
    return snap(project(mesh.vertices[a].clone().lerp(mesh.vertices[b],t)));
  });
  return result?{...result,loopGesture:true}:null;
}

export function deleteRetopoZigzag(mesh,stroke,project,visible){
  if(stroke.length<4)return null;
  const targets=[],projected=mesh.vertices.map(project);
  for(const edge of mesh.edges()){
    const a=projected[edge.a],b=projected[edge.b],hits=[];
    let lastSide=0,lastPoint=null;
    const length=Math.hypot(b.x-a.x,b.y-a.y);
    if(length<10)continue;
    for(const p of stroke){
      const offset=((b.x-a.x)*(p.y-a.y)-(b.y-a.y)*(p.x-a.x))/length;
      if(Math.abs(offset)<4)continue;
      const side=Math.sign(offset);
      if(lastSide&&side!==lastSide){
        const hit=crossing(lastPoint,p,a,b);
        if(hit)hits.push(nearestEdgeParameter(hit,a,b));
      }
      lastPoint=p;lastSide=side;
    }
    if(hits.length!==3||Math.abs(hits[2]-hits[0])*length<9||((hits[1]-hits[0])*(hits[2]-hits[1]))<=0)continue;
    if(visible(mesh.vertices[edge.a],a)&&visible(mesh.vertices[edge.b],b))targets.push(edge);
  }
  if(targets.length!==1)return null;
  const edge=targets[0],trial=mesh.clone();
  for(const fi of [...edge.faces].sort((a,b)=>b-a))trial.deleteFace(fi);
  trial.removeLooseEdge?.(edge.a,edge.b);
  trial.compactUnusedVertices();
  const remaining=new Set(trial.edges().map(({a,b})=>trial.edgeKey(a,b)));
  for(const key of trial.creases.keys())if(!remaining.has(key))trial.creases.delete(key);
  return {ok:true,mesh:trial,deletedEdge:true,deletedFaces:edge.faces.length};
}
