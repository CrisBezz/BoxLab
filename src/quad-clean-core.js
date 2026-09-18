// BoxLab v0.36.18.290 — conservative Quad Clean foundation.
// Phase 1: merge safe adjacent triangle pairs into subdivision-friendly quads without moving vertices.

const EPS=1e-12;
const MAX_EDGE_RATIO=5;
const MIN_NORMAL_DOT=Math.cos(Math.PI/4);

function edgeKey(mesh,a,b){return mesh.edgeKey?mesh.edgeKey(a,b):(a<b?`${a}:${b}`:`${b}:${a}`);}
function triNormal(mesh,face){
  const a=mesh.vertices?.[face?.[0]],b=mesh.vertices?.[face?.[1]],c=mesh.vertices?.[face?.[2]];
  if(!a||!b||!c)return null;
  const n=b.clone().sub(a).cross(c.clone().sub(a)),l=n.length();
  return l>EPS?n.multiplyScalar(1/l):null;
}
function faceEdges(face){return face.map((a,i)=>[a,face[(i+1)%face.length]]);}

function quadFromTriangles(mesh,a,b,sharedKey){
  const directed=[];
  for(const face of[a,b])for(const [x,y] of faceEdges(face))if(edgeKey(mesh,x,y)!==sharedKey)directed.push([x,y]);
  if(directed.length!==4)return null;
  for(let start=0;start<directed.length;start++){
    const used=new Set([start]),quad=[directed[start][0],directed[start][1]];
    let current=directed[start][1];
    for(let step=1;step<4;step++){
      let found=-1,reverse=false;
      for(let i=0;i<directed.length;i++){
        if(used.has(i))continue;
        if(directed[i][0]===current){found=i;break;}
        if(directed[i][1]===current){found=i;reverse=true;break;}
      }
      if(found<0)break;
      used.add(found);
      const next=reverse?directed[found][0]:directed[found][1];
      if(step<3)quad.push(next);
      current=next;
    }
    if(used.size===4&&current===quad[0]&&new Set(quad).size===4)return quad;
  }
  return null;
}

export function evaluateTrianglePair(mesh,faceA,faceB){
  if(!mesh||faceA===faceB)return{ok:false,reason:'invalid-pair'};
  const a=mesh.faces?.[faceA],b=mesh.faces?.[faceB];
  if(!Array.isArray(a)||!Array.isArray(b)||a.length!==3||b.length!==3)return{ok:false,reason:'not-triangles'};
  const shared=a.filter(v=>b.includes(v));
  if(shared.length!==2)return{ok:false,reason:'not-one-shared-edge'};
  const sharedKey=edgeKey(mesh,shared[0],shared[1]);
  const owners=mesh.edges?.().find(e=>edgeKey(mesh,e.a,e.b)===sharedKey)?.faces||[];
  if(owners.length!==2)return{ok:false,reason:'non-manifold-shared-edge'};
  if((mesh.creases instanceof Map)&&(mesh.creases.get(sharedKey)||0)>0)return{ok:false,reason:'creased-edge'};
  const na=triNormal(mesh,a),nb=triNormal(mesh,b);
  if(!na||!nb)return{ok:false,reason:'degenerate-triangle'};
  const normalDot=na.dot(nb);
  if(normalDot<MIN_NORMAL_DOT)return{ok:false,reason:'normal-break'};
  const quad=quadFromTriangles(mesh,a,b,sharedKey);
  if(!quad)return{ok:false,reason:'quad-order'};
  const p=quad.map(i=>mesh.vertices?.[i]);
  if(p.some(v=>!v))return{ok:false,reason:'missing-vertex'};
  const q1=p[1].clone().sub(p[0]).cross(p[2].clone().sub(p[0]));
  const q2=p[2].clone().sub(p[0]).cross(p[3].clone().sub(p[0]));
  const l1=q1.length(),l2=q2.length();
  if(l1<=EPS||l2<=EPS)return{ok:false,reason:'degenerate-quad'};
  if(q1.dot(q2)/(l1*l2)<-0.05)return{ok:false,reason:'folded-quad'};
  const lengths=quad.map((v,i)=>mesh.vertices[v].distanceTo(mesh.vertices[quad[(i+1)%4]]));
  const min=Math.min(...lengths),max=Math.max(...lengths);
  if(min<=EPS||max/min>MAX_EDGE_RATIO)return{ok:false,reason:'aspect-ratio'};
  const score=(1-normalDot)*2+Math.log(Math.max(max/min,1));
  return{ok:true,quad,sharedKey,score,normalDot,edgeRatio:max/min};
}

export function quadCleanTrianglePairs(mesh){
  if(!mesh?.faces||!mesh?.vertices)return{ok:false,reason:'invalid-mesh',merged:0,before:null,after:null};
  const before={
    vertices:mesh.vertices.length,
    faces:mesh.faces.length,
    triangles:mesh.faces.filter(f=>f.length===3).length,
    quads:mesh.faces.filter(f=>f.length===4).length,
    ngons:mesh.faces.filter(f=>f.length>4).length
  };
  const candidates=[];
  const edges=mesh.edges?.()||[];
  for(const edge of edges){
    if(edge.faces?.length!==2)continue;
    const [a,b]=edge.faces;
    const evaluated=evaluateTrianglePair(mesh,a,b);
    if(evaluated.ok)candidates.push({a,b,...evaluated});
  }
  candidates.sort((x,y)=>x.score-y.score||x.a-y.a||x.b-y.b);
  const used=new Set(),chosen=[];
  for(const c of candidates){
    if(used.has(c.a)||used.has(c.b))continue;
    used.add(c.a);used.add(c.b);chosen.push(c);
  }
  if(!chosen.length)return{ok:true,changed:false,merged:0,before,after:{...before},candidates:candidates.length};
  const replacement=new Map(),remove=new Set();
  for(const c of chosen){replacement.set(Math.min(c.a,c.b),c.quad);remove.add(Math.max(c.a,c.b));}
  const faces=[];
  for(let i=0;i<mesh.faces.length;i++){
    if(remove.has(i))continue;
    faces.push(replacement.get(i)||[...mesh.faces[i]]);
  }
  mesh.faces=faces;
  mesh.edges?.();
  const after={
    vertices:mesh.vertices.length,
    faces:mesh.faces.length,
    triangles:mesh.faces.filter(f=>f.length===3).length,
    quads:mesh.faces.filter(f=>f.length===4).length,
    ngons:mesh.faces.filter(f=>f.length>4).length
  };
  return{ok:true,changed:true,merged:chosen.length,before,after,candidates:candidates.length};
}
