// BoxLab v0.36.18.162 — logical-quad Loop Cut for single and multi cuts.
// Add-on-edge turns adjacent quads into 5-gons. Treat those faces as their
// original logical quads for ring traversal and reuse the existing Added vertex
// whenever a cut crosses its logical edge. Both loopCut() and loopCuts() use the
// same logical path so the Loop-count slider cannot bypass this compatibility.

import { EditableMesh as LiveEditableMesh } from './mesh.js?v=0.12';

const baseLoopCut=LiveEditableMesh.prototype.loopCut;
const baseLoopCuts=LiveEditableMesh.prototype.loopCuts;
const EPS=1e-6;
const MATCH_EPS=2e-3;

function edgeKey(mesh,a,b){return mesh.edgeKey(a,b);}
function betweenFraction(a,v,b){
  const ab=b.clone().sub(a),den=ab.lengthSq();
  if(den<1e-14)return null;
  const t=v.clone().sub(a).dot(ab)/den,projected=a.clone().lerp(b,t),scale=Math.max(ab.length(),1);
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
  const logicalFaces=[],splitsByKey=new Map();let hasVirtual=false;
  for(const face of mesh.faces){
    const info=faceLogicalInfo(mesh,face);
    if(!info){logicalFaces.push([...face]);continue;}
    logicalFaces.push(info.face);
    if(info.split){
      hasVirtual=true;
      const key=edgeKey(mesh,info.split.a,info.split.b),prior=splitsByKey.get(key);
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
  const direct=edgeKey(mesh,seed.a,seed.b);if(edgeMap.has(direct))return direct;
  for(const [key,split] of splitsByKey){
    if(!split)continue;
    const touches=(seed.a===split.vertex&&(seed.b===split.a||seed.b===split.b))||(seed.b===split.vertex&&(seed.a===split.a||seed.a===split.b));
    if(touches&&edgeMap.has(key))return key;
  }
  return null;
}
function logicalRing(mesh,edgeIndex,topology){
  const seed=mesh.edges()[edgeIndex];if(!seed)return null;
  const {logicalFaces,splitsByKey}=topology,edgeMap=buildEdges(mesh,logicalFaces),seedKey=logicalSeedKey(mesh,seed,splitsByKey,edgeMap);
  if(!seedKey)return null;
  const logicalSeed=edgeMap.get(seedKey),cutKeys=new Set([seedKey]),directed=new Map([[seedKey,{a:logicalSeed.a,b:logicalSeed.b}]]),queue=[seedKey];
  while(queue.length){
    const currentKey=queue.shift(),current=edgeMap.get(currentKey),currentDir=directed.get(currentKey);if(!current||!currentDir)continue;
    for(const faceIndex of current.faces){
      const face=logicalFaces[faceIndex];if(!face||face.length!==4)continue;
      let slot=-1;for(let i=0;i<4;i++)if(edgeKey(mesh,face[i],face[(i+1)%4])===currentKey){slot=i;break;}
      if(slot<0)continue;
      const faceA=face[slot],faceB=face[(slot+1)%4],forward=currentDir.a===faceA&&currentDir.b===faceB,oppositeSlot=(slot+2)%4,oa=face[oppositeSlot],ob=face[(oppositeSlot+1)%4],oppositeKey=edgeKey(mesh,oa,ob),nextDir=forward?{a:ob,b:oa}:{a:oa,b:ob};
      if(!cutKeys.has(oppositeKey)){cutKeys.add(oppositeKey);directed.set(oppositeKey,nextDir);queue.push(oppositeKey);}
    }
  }
  const splitFaces=[];
  logicalFaces.forEach((face,faceIndex)=>{
    if(face.length!==4)return;
    const slots=[];for(let i=0;i<4;i++)if(cutKeys.has(edgeKey(mesh,face[i],face[(i+1)%4])))slots.push(i);
    if(slots.length===2&&((slots[0]+2)%4===slots[1]||(slots[1]+2)%4===slots[0]))splitFaces.push({faceIndex,slots});
  });
  return splitFaces.length?{cutKeys,directed,splitFaces,logicalFaces,splitsByKey}:null;
}
function existingAmounts(mesh,ring){
  const out=[];
  for(const key of ring.cutKeys){
    const split=ring.splitsByKey.get(key),dir=ring.directed.get(key);if(!split||!dir)continue;
    const t=betweenFraction(mesh.vertices[dir.a],mesh.vertices[split.vertex],mesh.vertices[dir.b]);
    if(t!==null&&!out.some(v=>Math.abs(v-t)<=MATCH_EPS))out.push(t);
  }
  return out.sort((a,b)=>a-b);
}
function fitFractionsToExisting(fractions,existing){
  const out=[...fractions];
  for(const target of existing){
    let best=-1,bestD=Infinity;
    for(let i=0;i<out.length;i++){const d=Math.abs(out[i]-target);if(d<bestD){bestD=d;best=i;}}
    if(best>=0)out[best]=target;
  }
  return [...new Set(out.map(v=>Math.round(v*1e9)/1e9))].sort((a,b)=>a-b);
}
function performLogicalCuts(mesh,edgeIndex,fractions){
  const topology=logicalTopology(mesh);if(!topology.hasVirtual)return null;
  const ring=logicalRing(mesh,edgeIndex,topology);if(!ring)return null;
  const existing=existingAmounts(mesh,ring),amounts=fitFractionsToExisting(fractions,existing);
  const cutVertices=new Map(),slideGroups=amounts.map(()=>[]);
  for(const key of ring.cutKeys){
    const dir=ring.directed.get(key);if(!dir)continue;
    const start=mesh.vertices[dir.a].clone(),end=mesh.vertices[dir.b].clone(),split=ring.splitsByKey.get(key),indices=[];
    amounts.forEach((amount,groupIndex)=>{
      let vertex=null;
      if(split){const et=betweenFraction(mesh.vertices[dir.a],mesh.vertices[split.vertex],mesh.vertices[dir.b]);if(et!==null&&Math.abs(et-amount)<=MATCH_EPS)vertex=split.vertex;}
      if(!Number.isInteger(vertex)){vertex=mesh.vertices.length;mesh.vertices.push(start.clone().lerp(end,amount));}
      indices.push(vertex);slideGroups[groupIndex].push({vertex,start:start.toArray(),end:end.toArray(),position:amount});
    });
    cutVertices.set(key,indices);
  }
  const orientedCuts=(from,to)=>{
    const key=edgeKey(mesh,from,to),items=cutVertices.get(key)||[],dir=ring.directed.get(key);if(!dir)return[];
    return dir.a===from&&dir.b===to?[...items]:[...items].reverse();
  };
  const replacements=new Map();
  for(const {faceIndex,slots} of ring.splitFaces){
    const [a,b,c,d]=ring.logicalFaces[faceIndex],strips=[];
    if(slots.includes(0)&&slots.includes(2)){
      const left=[a,...orientedCuts(a,b),b],right=[d,...orientedCuts(d,c),c];
      for(let i=0;i<left.length-1;i++)strips.push([left[i],left[i+1],right[i+1],right[i]]);
    }else if(slots.includes(1)&&slots.includes(3)){
      const left=[b,...orientedCuts(b,c),c],right=[a,...orientedCuts(a,d),d];
      for(let i=0;i<left.length-1;i++)strips.push([right[i],left[i],left[i+1],right[i+1]]);
    }
    if(strips.length)replacements.set(faceIndex,strips);
  }
  if(!replacements.size)return null;
  const nextFaces=[];mesh.faces.forEach((face,faceIndex)=>{const split=replacements.get(faceIndex);if(split)nextFaces.push(...split);else nextFaces.push(face);});mesh.faces=nextFaces;
  return{ring,amounts,slideGroups};
}

LiveEditableMesh.prototype.loopCut=function(edgeIndex,t=.5){
  const requested=Math.max(.05,Math.min(.95,t)),result=performLogicalCuts(this,edgeIndex,[requested]);
  if(!result)return baseLoopCut.call(this,edgeIndex,t);
  const slideData=result.slideGroups[0]||[],position=result.amounts[0]??requested;
  return{cutEdges:result.ring.cutKeys.size,splitFaces:result.ring.splitFaces.length,slideData,slideGroups:[slideData],position,promotedAddedVertex:true};
};
LiveEditableMesh.prototype.loopCuts=function(edgeIndex,count=2){
  const cuts=Math.max(2,Math.min(8,Math.round(Number(count)||2))),fractions=Array.from({length:cuts},(_,i)=>(i+1)/(cuts+1)),result=performLogicalCuts(this,edgeIndex,fractions);
  if(!result)return baseLoopCuts.call(this,edgeIndex,count);
  return{cutCount:result.amounts.length,cutEdges:result.ring.cutKeys.size,splitFaces:result.ring.splitFaces.length,slideGroups:result.slideGroups,positions:result.amounts,promotedAddedVertex:true};
};

LiveEditableMesh.prototype.__boxlabAddedVertexLoopPromotion='0.36.18.162';
globalThis.__boxlabAddedVertexLoopPromotion={version:'0.36.18.162'};
