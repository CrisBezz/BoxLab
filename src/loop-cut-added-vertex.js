// BoxLab v0.36.18.746 — conforming logical-quad Loop Cut for single and multi cuts.
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

// Complete boundary subdivisions where the quad ring terminates at an n-gon.
// Keep the n-gon intact; it must share the exact cut vertices with its neighbour.
function inheritCutGroups(mesh,before,ring,count){
  const split=new Set((ring?.splitFaces||[]).map(item=>item.faceIndex));
  const groups=before.faces.flatMap((_,fi)=>Array(split.has(fi)?count+1:1).fill(before.faceGroups?.[fi]??null));
  if(groups.length===mesh.faces.length)mesh.faceGroups=groups;
}
function conformCutBoundaries(mesh,before,groups){
  const items=groups.flat(),rails=new Map();
  for(const item of items){
    const related=new Set(items.filter(other=>other.start.every((n,i)=>n===item.start[i])&&other.end.every((n,i)=>n===item.end[i])).map(other=>other.vertex));
    const a=before.vertices.findIndex((v,index)=>v.toArray().every((n,i)=>n===item.start[i])&&mesh.faces.some(face=>face.some(vertex=>related.has(vertex))&&face.includes(index)));
    const b=before.vertices.findIndex((v,index)=>v.toArray().every((n,i)=>n===item.end[i])&&mesh.faces.some(face=>face.some(vertex=>related.has(vertex))&&face.includes(index)));
    if(a<0||b<0)continue;
    const key=edgeKey(mesh,a,b);
    if(!rails.has(key))rails.set(key,{a,b,vertices:new Set([a,b])});
    rails.get(key).vertices.add(item.vertex);
  }
  for(const [key,split] of logicalTopology(before).splitsByKey){
    if(!split)continue;
    if(!rails.has(key))rails.set(key,{a:split.a,b:split.b,vertices:new Set([split.a,split.b])});
    rails.get(key).vertices.add(split.vertex);
  }
  for(const rail of rails.values()){
    // Logical quads may already contain a boundary subdivision from Knife/Add.
    for(const face of before.faces){
      if(!face.includes(rail.a)||!face.includes(rail.b))continue;
      for(const vertex of face)if(betweenFraction(before.vertices[rail.a],before.vertices[vertex],before.vertices[rail.b])!==null)rail.vertices.add(vertex);
    }
  }
  mesh.faces=mesh.faces.map(face=>{
    const out=[];
    for(let i=0;i<face.length;i++){
      const a=face[i],b=face[(i+1)%face.length];out.push(a);
      for(const rail of rails.values()){
        if(!rail.vertices.has(a)||!rail.vertices.has(b))continue;
        const inside=[...rail.vertices].filter(v=>v!==a&&v!==b).map(vertex=>({vertex,t:betweenFraction(mesh.vertices[a],mesh.vertices[vertex],mesh.vertices[b])})).filter(v=>v.t!==null).sort((x,y)=>x.t-y.t);
        out.push(...inside.map(v=>v.vertex));break;
      }
    }
    return out;
  });
  // Split creases along the same rails rather than leaving keys for dead edges.
  const actual=new Set(mesh.edges().map(e=>edgeKey(mesh,e.a,e.b)));
  for(const [key,strength] of before.creases){
    if(actual.has(key))continue;
    const rail=rails.get(key);if(!rail)continue;
    mesh.creases.delete(key);
    const ordered=[...rail.vertices].map(vertex=>({vertex,t:vertex===rail.a?0:vertex===rail.b?1:betweenFraction(mesh.vertices[rail.a],mesh.vertices[vertex],mesh.vertices[rail.b])})).filter(v=>v.t!==null).sort((x,y)=>x.t-y.t);
    for(let i=1;i<ordered.length;i++){const child=edgeKey(mesh,ordered[i-1].vertex,ordered[i].vertex);if(actual.has(child))mesh.creases.set(child,strength);}
  }
}
// A closed strip of convex planar polygons with parallel crossing rails has one
// unambiguous continuation, even when bevels/subdivisions make it an n-gon.
function parallelPolygonCuts(before,edgeIndex,fractions){
  const edges=before.edges(),seed=edges[edgeIndex];if(!seed||seed.loose)return null;
  const axis=before.vertices[seed.b].clone().sub(before.vertices[seed.a]);
  if(axis.lengthSq()<1e-14)return null;axis.normalize();
  const scale=before.vertices.reduce((max,v)=>Math.max(max,v.distanceTo(before.vertices[seed.a])),1),eps=scale*1e-7;
  const projection=v=>v.clone().sub(before.vertices[seed.a]).dot(axis);
  const seedLength=before.vertices[seed.b].distanceTo(before.vertices[seed.a]);
  const probe=seedLength*(fractions.length===1?fractions[0]:.5);
  const byKey=new Map(edges.map(e=>[edgeKey(before,e.a,e.b),e]));
  const faces=new Map(),rails=new Map(),queue=[...(seed.faces||[])];
  const convex=face=>{
    if(face.length<4)return false;
    const origin=before.vertices[face[0]],normal=axis.clone().set(0,0,0);
    for(let i=1;i<face.length-1;i++)normal.add(before.vertices[face[i]].clone().sub(origin).cross(before.vertices[face[i+1]].clone().sub(origin)));
    if(normal.lengthSq()<eps*eps)return false;normal.normalize();
    if(face.some(v=>Math.abs(before.vertices[v].clone().sub(origin).dot(normal))>eps))return false;
    return face.every((v,i)=>{
      const a=before.vertices[v],b=before.vertices[face[(i+1)%face.length]],c=before.vertices[face[(i+2)%face.length]];
      return b.clone().sub(a).cross(c.clone().sub(b)).dot(normal)>=-eps*scale;
    });
  };
  while(queue.length){
    const fi=queue.shift();if(faces.has(fi))continue;
    const face=before.faces[fi];if(!face||!convex(face))return null;
    const crossing=[];
    for(let i=0;i<face.length;i++){
      const a=face[i],b=face[(i+1)%face.length],pa=projection(before.vertices[a]),pb=projection(before.vertices[b]);
      if(Math.abs(pa-probe)<=eps||Math.abs(pb-probe)<=eps)return null;
      if((pa-probe)*(pb-probe)>=0)continue;
      const delta=before.vertices[b].clone().sub(before.vertices[a]);
      if(delta.clone().normalize().cross(axis).length()>1e-6)return null;
      const key=edgeKey(before,a,b),edge=byKey.get(key);
      if(!edge||edge.faces.length!==2)return null;
      crossing.push(key);rails.set(key,{edge,lo:Math.min(pa,pb),hi:Math.max(pa,pb)});
      queue.push(...edge.faces.filter(other=>other!==fi));
    }
    if(crossing.length!==2)return null;faces.set(fi,crossing);
  }
  if(!rails.has(edgeKey(before,seed.a,seed.b))||faces.size<3)return null;
  const lo=Math.max(...[...rails.values()].map(r=>r.lo)),hi=Math.min(...[...rails.values()].map(r=>r.hi));
  if(hi-lo<=eps)return null;
  const amounts=fractions.length===1?[(probe-lo)/(hi-lo)]:fractions;
  if(amounts.some(t=>t<=0||t>=1))return null;
  const candidate=before.clone(),groups=amounts.map(()=>[]),cutVertices=new Map();
  for(const [key,rail] of rails){
    const {a,b}=rail.edge,pa=projection(before.vertices[a]),pb=projection(before.vertices[b]);
    const at=h=>before.vertices[a].clone().lerp(before.vertices[b],(h-pa)/(pb-pa));
    const start=at(lo),end=at(hi),ids=[];
    amounts.forEach((t,j)=>{const vertex=candidate.vertices.length;candidate.vertices.push(start.clone().lerp(end,t));ids.push(vertex);groups[j].push({vertex,start:start.toArray(),end:end.toArray(),position:t});});cutVertices.set(key,ids);
    const strength=candidate.creases.get(key);if(strength){candidate.creases.delete(key);const chain=[a,...(pa<pb?ids:[...ids].reverse()),b];for(let i=1;i<chain.length;i++)candidate.creases.set(edgeKey(candidate,chain[i-1],chain[i]),strength);}
  }
  const nextFaces=[],nextGroups=[];
  before.faces.forEach((face,fi)=>{
    const crossing=faces.get(fi);if(!crossing){nextFaces.push([...face]);nextGroups.push(before.faceGroups?.[fi]??null);return;}
    const expanded=[];
    for(let i=0;i<face.length;i++){
      const a=face[i],b=face[(i+1)%face.length];expanded.push(a);const ids=cutVertices.get(edgeKey(before,a,b));
      if(ids)expanded.push(...(projection(before.vertices[a])<projection(before.vertices[b])?ids:[...ids].reverse()));
    }
    let pieces=[expanded];
    for(let j=0;j<amounts.length;j++){
      const a=cutVertices.get(crossing[0])[j],b=cutVertices.get(crossing[1])[j],index=pieces.findIndex(f=>f.includes(a)&&f.includes(b));
      if(index<0){pieces=[];break;}const f=pieces[index],ia=f.indexOf(a),ib=f.indexOf(b);
      const walk=(from,to)=>{const out=[];for(let i=from;;i=(i+1)%f.length){out.push(f[i]);if(i===to)return out;}};
      pieces.splice(index,1,walk(ia,ib),walk(ib,ia));
    }
    nextFaces.push(...pieces);nextGroups.push(...pieces.map(()=>before.faceGroups?.[fi]??null));
  });
  if(nextFaces.length!==before.faces.length+faces.size*amounts.length||nextFaces.some(f=>f.length<3||new Set(f).size!==f.length))return null;
  candidate.faces=nextFaces;candidate.faceGroups=nextGroups;
  if(candidate.edges().some(e=>!e.loose&&e.faces.length!==2))return null;
  return{candidate,cut:{cutEdges:rails.size,splitFaces:faces.size,slideData:groups[0],slideGroups:groups,position:amounts[0],positions:amounts,cutCount:amounts.length,parallelPolygonStrip:true}};
}
function completeCutLoops(mesh,groups){
  const edges=mesh.edges();
  return groups.every(group=>{
    const vertices=new Set(group.map(item=>item.vertex)),degree=new Map([...vertices].map(v=>[v,0]));
    for(const e of edges)if(vertices.has(e.a)&&vertices.has(e.b)){degree.set(e.a,degree.get(e.a)+1);degree.set(e.b,degree.get(e.b)+1);}
    return vertices.size>=3&&[...degree.values()].every(n=>n===2);
  });
}
function applyParallelCut(mesh,result){
  if(!result)return null;
  mesh.vertices=result.candidate.vertices;mesh.faces=result.candidate.faces;mesh.faceGroups=result.candidate.faceGroups;mesh.creases=result.candidate.creases;
  return result.cut;
}

LiveEditableMesh.prototype.loopCut=function(edgeIndex,t=.5){
  const before=this.clone(),nativeRing=this.loopRing(edgeIndex),requested=Math.max(.05,Math.min(.95,t)),result=performLogicalCuts(this,edgeIndex,[requested]);
  let cut;
  if(!result)cut=baseLoopCut.call(this,edgeIndex,t);
  else{const slideData=result.slideGroups[0]||[],position=result.amounts[0]??requested;cut={cutEdges:result.ring.cutKeys.size,splitFaces:result.ring.splitFaces.length,slideData,slideGroups:[slideData],position,promotedAddedVertex:true};}
  if(cut){inheritCutGroups(this,before,result?.ring||nativeRing,1);conformCutBoundaries(this,before,cut.slideGroups||[cut.slideData]);}
  if(!cut||!completeCutLoops(this,cut.slideGroups||[cut.slideData])){
    const parallel=parallelPolygonCuts(before,edgeIndex,[requested]);
    if(parallel)return applyParallelCut(this,parallel);
  }
  return cut;
};
LiveEditableMesh.prototype.loopCuts=function(edgeIndex,count=2){
  const before=this.clone(),nativeRing=this.loopRing(edgeIndex),cuts=Math.max(2,Math.min(8,Math.round(Number(count)||2))),fractions=Array.from({length:cuts},(_,i)=>(i+1)/(cuts+1)),result=performLogicalCuts(this,edgeIndex,fractions);
  const cut=result?{cutCount:result.amounts.length,cutEdges:result.ring.cutKeys.size,splitFaces:result.ring.splitFaces.length,slideGroups:result.slideGroups,positions:result.amounts,promotedAddedVertex:true}:baseLoopCuts.call(this,edgeIndex,count);
  if(cut){inheritCutGroups(this,before,result?.ring||nativeRing,cut.slideGroups.length);conformCutBoundaries(this,before,cut.slideGroups);}
  if(!cut||!completeCutLoops(this,cut.slideGroups)){
    const parallel=parallelPolygonCuts(before,edgeIndex,fractions);
    if(parallel)return applyParallelCut(this,parallel);
  }
  return cut;
};

LiveEditableMesh.prototype.__boxlabAddedVertexLoopPromotion='0.36.18.746';
globalThis.__boxlabAddedVertexLoopPromotion={version:'0.36.18.746'};
