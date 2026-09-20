// BoxLab v0.36.18.289 — shared edge-flow and surface-flow continuity scoring for guarded Bridge candidates.

const EPS=1e-12;

function edgeKey(a,b){return a<b?`${a}:${b}`:`${b}:${a}`;}

function faceEdges(face){
  const out=[];
  for(let i=0;i<face.length;i++)out.push([face[i],face[(i+1)%face.length]]);
  return out;
}

function sharedEdgeLength2(mesh,a,b){
  const bEdges=new Set(faceEdges(b).map(([x,y])=>edgeKey(x,y)));
  for(const [x,y] of faceEdges(a)){
    if(!bEdges.has(edgeKey(x,y)))continue;
    const vx=mesh.vertices?.[x],vy=mesh.vertices?.[y];
    if(vx&&vy)return vx.distanceToSquared(vy);
  }
  return null;
}
function faceNormal(mesh,face){
  if(!Array.isArray(face)||face.length<3)return null;
  const a=mesh.vertices?.[face[0]],b=mesh.vertices?.[face[1]],c=mesh.vertices?.[face[2]];
  if(!a||!b||!c)return null;
  const n=b.clone().sub(a).cross(c.clone().sub(a));
  const l=n.length();
  return l>EPS?n.multiplyScalar(1/l):null;
}

function normalStepPenalty(mesh,a,b){
  const na=faceNormal(mesh,a),nb=faceNormal(mesh,b);
  if(!na||!nb)return 0;
  const dot=Math.max(-1,Math.min(1,na.dot(nb)));
  return 1-dot;
}

export function bridgeFlowRegularity(mesh,faces,{closed=false}={}){
  if(!mesh||!Array.isArray(faces)||!faces.length)return{penalty:0,connectorPenalty:0,aspectPenalty:0,surfacePenalty:0,connectors:0};
  let aspectPenalty=0;
  for(const face of faces){
    if(!Array.isArray(face)||face.length!==4)continue;
    const lengths=[];
    for(const [a,b] of faceEdges(face)){
      const va=mesh.vertices?.[a],vb=mesh.vertices?.[b];
      if(!va||!vb)continue;
      lengths.push(Math.max(va.distanceToSquared(vb),EPS));
    }
    if(lengths.length===4){
      const min=Math.min(...lengths),max=Math.max(...lengths);
      const ratio=Math.max(max/min,1);
      const log=Math.log(ratio);
      aspectPenalty+=log*log;
    }
  }

  const connectorLengths=[];
  for(let i=0;i<faces.length-1;i++){
    const d2=sharedEdgeLength2(mesh,faces[i],faces[i+1]);
    if(Number.isFinite(d2)&&d2>EPS)connectorLengths.push(d2);
  }
  if(closed&&faces.length>2){
    const d2=sharedEdgeLength2(mesh,faces.at(-1),faces[0]);
    if(Number.isFinite(d2)&&d2>EPS)connectorLengths.push(d2);
  }

  let connectorPenalty=0;
  for(let i=1;i<connectorLengths.length;i++)connectorPenalty+=Math.abs(Math.log(connectorLengths[i]/connectorLengths[i-1]));
  if(closed&&connectorLengths.length>2)connectorPenalty+=Math.abs(Math.log(connectorLengths[0]/connectorLengths.at(-1)));

  let surfacePenalty=0;
  for(let i=0;i<faces.length-1;i++)surfacePenalty+=normalStepPenalty(mesh,faces[i],faces[i+1]);
  if(closed&&faces.length>2)surfacePenalty+=normalStepPenalty(mesh,faces.at(-1),faces[0]);

  return{
    penalty:connectorPenalty+aspectPenalty*.35+surfacePenalty*.65,
    connectorPenalty,
    aspectPenalty,
    surfacePenalty,
    connectors:connectorLengths.length
  };
}
