import * as THREE from 'three';

const DEFAULTS={vertexPx:14,midpointPx:11,edgePx:24};

function screenDistance(a,b){
  if(!a||!b)return Infinity;
  const dx=Number(a.x)-Number(b.x),dy=Number(a.y)-Number(b.y);
  return Math.hypot(dx,dy);
}

function segmentProjection(point,a,b){
  const abx=b.x-a.x,aby=b.y-a.y,lenSq=abx*abx+aby*aby;
  if(!(lenSq>1e-9))return null;
  const t=THREE.MathUtils.clamp(((point.x-a.x)*abx+(point.y-a.y)*aby)/lenSq,0,1);
  return{x:a.x+abx*t,y:a.y+aby*t,t};
}

export function crossObjectSnapCandidates({objects=[],activeId=null,soloId=null,project}={}){
  if(typeof project!=='function')return[];
  const candidates=[];
  for(const object of objects||[]){
    if(!object||object.id===activeId||object.visible===false)continue;
    if(soloId!=null&&object.id!==soloId)continue;
    const mesh=object.mesh;
    if(!mesh?.vertices?.length)continue;
    for(let i=0;i<mesh.vertices.length;i++){
      const world=mesh.vertices[i];
      const screen=project(world);
      if(screen)candidates.push({type:'Vertex',objectId:object.id,index:i,position:world.clone(),screen});
    }
    const edges=mesh.edges?.()||[];
    for(let i=0;i<edges.length;i++){
      const edge=edges[i],va=mesh.vertices[edge.a],vb=mesh.vertices[edge.b];
      if(!va||!vb)continue;
      const a=project(va),b=project(vb);
      if(!a||!b)continue;
      const midpoint=va.clone().lerp(vb,.5);
      const midpointScreen={x:(a.x+b.x)*.5,y:(a.y+b.y)*.5};
      candidates.push({type:'Midpoint',objectId:object.id,index:i,edge,position:midpoint,screen:midpointScreen,a,b});
      candidates.push({type:'Edge',objectId:object.id,index:i,edge,va:va.clone(),vb:vb.clone(),a,b});
    }
  }
  return candidates;
}

export function nearestCrossObjectSnap({objects=[],activeId=null,soloId=null,project,clientX,clientY,vertexPx=DEFAULTS.vertexPx,midpointPx=DEFAULTS.midpointPx,edgePx=DEFAULTS.edgePx}={}){
  if(!Number.isFinite(clientX)||!Number.isFinite(clientY)||typeof project!=='function')return null;
  const point={x:clientX,y:clientY};
  const candidates=crossObjectSnapCandidates({objects,activeId,soloId,project});
  let bestVertex=null,bestMidpoint=null,bestEdge=null;
  for(const c of candidates){
    if(c.type==='Vertex'){
      const distance=screenDistance(point,c.screen);
      if(distance<=vertexPx&&(!bestVertex||distance<bestVertex.distance))bestVertex={...c,distance};
    }else if(c.type==='Midpoint'){
      const distance=screenDistance(point,c.screen);
      if(distance<=midpointPx&&(!bestMidpoint||distance<bestMidpoint.distance))bestMidpoint={...c,distance};
    }else if(c.type==='Edge'){
      const q=segmentProjection(point,c.a,c.b);
      if(!q)continue;
      const distance=screenDistance(point,q);
      if(distance<=edgePx&&(!bestEdge||distance<bestEdge.distance)){
        bestEdge={...c,distance,t:q.t,position:c.va.clone().lerp(c.vb,q.t),screen:{x:q.x,y:q.y}};
      }
    }
  }
  return bestVertex||bestMidpoint||bestEdge||null;
}

export const CROSS_OBJECT_SNAP_DEFAULTS=Object.freeze({...DEFAULTS});


export function componentSnapDelta(startReference,targetPosition,axis=null){
  if(!startReference?.isVector3||!targetPosition?.isVector3)return null;
  if(axis&&['x','y','z'].includes(axis)){
    const delta=new THREE.Vector3();
    delta[axis]=targetPosition[axis]-startReference[axis];
    return delta;
  }
  return targetPosition.clone().sub(startReference);
}
