// BoxLab v0.36.18.159 — logical-quad Loop Cut through Add-on-edge verts.
// A quad with one collinear Add vertex is represented in storage as a 5-gon.
// For Loop Cut traversal only, treat that face as its original logical quad.
// If the logical ring crosses an edge that already contains an Add vertex,
// reuse that vertex as the cut point and propagate the loop through the strip.

import { EditableMesh as LiveEditableMesh } from './mesh.js?v=0.12';

const baseLoopCut=LiveEditableMesh.prototype.loopCut;
const EPS=1e-6;
const MATCH_EPS=2e-3;

function edgeKey(mesh,a,b){return mesh.edgeKey(a,b);}
function betweenFraction(a,v,b){
  const ab=b.clone().sub(a),den=ab.lengthSq();
  if(den<1e-14)return null;
  const t=v.clone().sub(a).dot(ab)/den;
  const projected=a.clone().lerp(b,t);
  const scale=Math.max(ab.length(),1);
  if(t<=EPS||t>=1-EPS||projected.distanceTo(v)>EPS*scale)return null;
  return t;
}
function faceLogicalInfo(mesh,face){
  if(!Array.isArray(face))return null;
  if(face.length===4)return{face:[...face],split:null};
  if(face.length!==5)return null;
  const candidates=[];
  for(let i=0;i<5;i++){
    const prev=face[(i+4)%5],vertex=face[i],next=face[(i+1)%5];
    const t=betweenFraction(mesh.vertices[prev],mesh.vertices[vertex],mesh.vertices[next]);
    if(t!==null)candidates.push({slot:i,vertex,a:prev,b:next,t});
  }
  if(candidates.length!==1)return null;
  const split=candidates[0],logical=face.filter((_,i)=>i!==split.slot);
  if(logical.length!==4||new Set(logical).size!==4)return null;
  return{face:logical,split};
}
function logicalTopology(mesh){
  const logicalFaces=[],splitsByKey=new Map();
  let hasVirtual=false;
  for(const face of mesh.faces){
    const info=faceLogicalInfo(mesh,face);
    if(!info){logicalFaces.push([...face]);continue;}
    logicalFaces.push(info.face);
    if(info.split){
      hasVirtual=true;
      const key=edgeKey(mesh,info.split.a,info.split.b);
      const prior=splitsByKey.get(key);
      if(!prior)splitsByKey.set(key,info.split);
      else if(prior.vertex!==info.split.vertex)splitsByKey.set(key,null);
    }
  }
  return{logicalFaces,splitsByKey,hasVirtual};
}
function buildEdges(mesh,faces){
  const map=new Map();
  faces.forEach((face,faceIndex)=>{
    for(let i=0;i<face.length;i++){
      const a=face[i],b=face[(i+1)%face.length],key=edgeKey(mesh,a,b);
      if(!map.has(key))map.set(key,{a:Math.min(a,b),b:Math.max(a,b),faces:[]});
      map.get(key).faces.push(faceIndex);
    }
  });
  return map;
}
function logicalSeedKey(mesh,seed,splitsByKey,edgeMap){
  const direct=edgeKey(mesh,seed.a,seed.b);
  if(edgeMap.has(direct))return direct;
  for(const [key,split] of splitsByKey){
    if(!split)continue;
    const touches=(seed.a===split.vertex&&(seed.b===split.a||seed.b===split.b))||(seed.b===split.vertex&&(seed.a===split.a||seed.a===split.b));
    if(touches&&edgeMap.has(key))return key;
  }
  return null;
}
function logicalRing(mesh,edgeIndex,topology){
  const seed=mesh.edges()[edgeIndex];
  if(!seed)return null;
  const {logicalFaces,splitsByKey}=topology,edgeMap=buildEdges(mesh,logicalFaces),seedKey=logicalSeedKey(mesh,seed,splitsByKey,edgeMap);
  if(!seedKey)return null;
  const logicalSeed=edgeMap.get(seedKey);
  const cutKeys=new Set([seedKey]),directed=new Map([[seedKey,{a:logicalSeed.a,b:logicalSeed.b}]]),queue=[seedKey];
  while(queue.length){
    const currentKey=queue.shift(),current=edgeMap.get(currentKey),currentDir=directed.get(currentKey);
    if(!current||!currentDir)continue;
    for(const faceIndex of current.faces){
      const face=logicalFaces[faceIndex];
      if(!face||face.length!==4)continue;
      let slot=-1;
      for(let i=0;i<4;i++)if(edgeKey(mesh,face[i],face[(i+1)%4])===currentKey){slot=i;break;}
      if(slot<0)continue;
      const faceA=face[slot],faceB=face[(slot+1)%4],forward=currentDir.a===faceA&&currentDir.b===faceB;
      const oppositeSlot=(slot+2)%4,oa=face[oppositeSlot],ob=face[(oppositeSlot+1)%4],oppositeKey=edgeKey(mesh,oa,ob);
      const nextDir=forward?{a:ob,b:oa}:{a:oa,b:ob};
      if(!cutKeys.has(oppositeKey)){cutKeys.add(oppositeKey);directed.set(oppositeKey,nextDir);queue.push(oppositeKey);}
    }
  }
  const splitFaces=[];
  logicalFaces.forEach((face,faceIndex)=>{
    if(face.length!==4)return;
    const slots=[];
    for(let i=0;i<4;i++)if(cutKeys.has(edgeKey(mesh,face[i],face[(i+1)%4])))slots.push(i);
    if(slots.length===2&&((slots[0]+2)%4===slots[1]||(slots[1]+2)%4===slots[0]))splitFaces.push({faceIndex,slots});
  });
  return splitFaces.length?{cutKeys,directed,splitFaces,logicalFaces,splitsByKey}:null;
}
function existingAmount(mesh,ring){
  const amounts=[];
  for(const key of ring.cutKeys){
    const split=ring.splitsByKey.get(key);if(!split)continue;
    const dir=ring.directed.get(key);if(!dir)continue;
    const t=betweenFraction(mesh.vertices[dir.a],mesh.vertices[split.vertex],mesh.vertices[dir.b]);
    if(t!==null)amounts.push(t);
  }
  if(!amounts.length)return null;
  const first=amounts[0];
  if(amounts.some(t=>Math.abs(t-first)>MATCH_EPS))return false;
  return first;
}

LiveEditableMesh.prototype.loopCut=function(edgeIndex,t=.5){
  const topology=logicalTopology(this);
  if(!topology.hasVirtual)return baseLoopCut.call(this,edgeIndex,t);
  const ring=logicalRing(this,edgeIndex,topology);
  if(!ring)return baseLoopCut.call(this,edgeIndex,t);
  const existing=existingAmount(this,ring);
  if(existing===false)return baseLoopCut.call(this,edgeIndex,t);
  const amount=Math.max(.05,Math.min(.95,existing??t));
  const midpointIndex=new Map(),slideData=[];
  for(const key of ring.cutKeys){
    const dir=ring.directed.get(key);if(!dir)continue;
    const split=ring.splitsByKey.get(key);
    let vertex=null;
    if(split){
      const et=betweenFraction(this.vertices[dir.a],this.vertices[split.vertex],this.vertices[dir.b]);
      if(et!==null&&Math.abs(et-amount)<=MATCH_EPS)vertex=split.vertex;
    }
    const start=this.vertices[dir.a].clone(),end=this.vertices[dir.b].clone();
    if(!Number.isInteger(vertex)){vertex=this.vertices.length;this.vertices.push(start.clone().lerp(end,amount));}
    midpointIndex.set(key,vertex);
    slideData.push({vertex,start:start.toArray(),end:end.toArray(),position:amount});
  }
  const replacements=new Map();
  for(const {faceIndex,slots} of ring.splitFaces){
    const [a,b,c,d]=ring.logicalFaces[faceIndex];
    if(slots.includes(0)&&slots.includes(2)){
      const m0=midpointIndex.get(edgeKey(this,a,b)),m2=midpointIndex.get(edgeKey(this,c,d));
      if(Number.isInteger(m0)&&Number.isInteger(m2))replacements.set(faceIndex,[[a,m0,m2,d],[m0,b,c,m2]]);
    }else if(slots.includes(1)&&slots.includes(3)){
      const m1=midpointIndex.get(edgeKey(this,b,c)),m3=midpointIndex.get(edgeKey(this,d,a));
      if(Number.isInteger(m1)&&Number.isInteger(m3))replacements.set(faceIndex,[[a,b,m1,m3],[m3,m1,c,d]]);
    }
  }
  if(!replacements.size)return baseLoopCut.call(this,edgeIndex,t);
  const nextFaces=[];
  this.faces.forEach((face,faceIndex)=>{const split=replacements.get(faceIndex);if(split)nextFaces.push(...split);else nextFaces.push(face);});
  this.faces=nextFaces;
  return{cutEdges:ring.cutKeys.size,splitFaces:ring.splitFaces.length,slideData,slideGroups:[slideData],position:amount,promotedAddedVertex:true};
};

LiveEditableMesh.prototype.__boxlabAddedVertexLoopPromotion='0.36.18.159';
globalThis.__boxlabAddedVertexLoopPromotion={version:'0.36.18.159'};
