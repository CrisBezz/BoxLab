// BoxLab v0.36.18.687 — logical-quad Loop Cut through collinear boundary detail.
// Faces with four genuine corners plus any number of collinear boundary vertices
// are treated as logical quads. Genuine ngons / poles remain hard stops.

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
function chainSlice(face,start,end){
  const out=[face[start]];
  let i=start;
  for(let guard=0;guard<=face.length;guard++){
    if(i===end)return out;
    i=(i+1)%face.length;
    out.push(face[i]);
  }
  return null;
}
function faceLogicalInfo(mesh,face){
  if(!Array.isArray(face)||face.length<4)return null;
  if(face.length===4){
    return{
      face:[...face],
      chains:[
        [face[0],face[1]],[face[1],face[2]],[face[2],face[3]],[face[3],face[0]]
      ],
      virtual:false
    };
  }
  const corners=[];
  for(let i=0;i<face.length;i++){
    const prev=face[(i-1+face.length)%face.length],v=face[i],next=face[(i+1)%face.length];
    if(betweenFraction(mesh.vertices[prev],mesh.vertices[v],mesh.vertices[next])===null)corners.push(i);
  }
  if(corners.length!==4)return null;
  const logical=corners.map(i=>face[i]);
  if(new Set(logical).size!==4)return null;
  const chains=[];
  for(let i=0;i<4;i++){
    const chain=chainSlice(face,corners[i],corners[(i+1)%4]);
    if(!chain||chain.length<2)return null;
    const a=mesh.vertices[chain[0]],b=mesh.vertices[chain[chain.length-1]];
    let prior=-Infinity;
    for(let j=1;j<chain.length-1;j++){
      const t=betweenFraction(a,mesh.vertices[chain[j]],b);
      if(t===null||t<=prior+EPS)return null;
      prior=t;
    }
    chains.push(chain);
  }
  return{face:logical,chains,virtual:true};
}
function logicalTopology(mesh){
  const logicalFaces=[],faceInfos=[],physicalToLogical=new Map();
  let hasVirtual=false;
  for(const face of mesh.faces){
    const info=faceLogicalInfo(mesh,face);
    faceInfos.push(info);
    logicalFaces.push(info?info.face:[...face]);
    if(!info)continue;
    if(info.virtual)hasVirtual=true;
    info.chains.forEach((chain,slot)=>{
      const a=info.face[slot],b=info.face[(slot+1)%4],logicalKey=edgeKey(mesh,a,b);
      for(let i=0;i<chain.length-1;i++){
        const physicalKey=edgeKey(mesh,chain[i],chain[i+1]);
        if(!physicalToLogical.has(physicalKey))physicalToLogical.set(physicalKey,logicalKey);
        else if(physicalToLogical.get(physicalKey)!==logicalKey)physicalToLogical.set(physicalKey,null);
      }
    });
  }
  return{logicalFaces,faceInfos,physicalToLogical,hasVirtual};
}
function buildEdges(mesh,faces){
  const map=new Map();
  faces.forEach((face,faceIndex)=>{
    for(let i=0;i<face.length;i++){
      const a=face[i],b=face[(i+1)%face.length],key=edgeKey(mesh,a,b);
      if(!map.has(key))map.set(key,{a,b,faces:[]});
      map.get(key).faces.push(faceIndex);
    }
  });
  return map;
}
function logicalSeedKey(mesh,seed,topology,edgeMap){
  const physical=edgeKey(mesh,seed.a,seed.b);
  const promoted=topology.physicalToLogical.get(physical);
  if(promoted&&edgeMap.has(promoted))return promoted;
  if(edgeMap.has(physical))return physical;
  return null;
}
function logicalSeedDirection(mesh,seed,topology,seedKey,edgeMap){
  // Preserve the exact direction of the physical edge the user touched.
  // When that physical edge is only one segment of a promoted logical side,
  // project its direction onto the logical side endpoints.
  for(const info of topology.faceInfos||[]){
    if(!info)continue;
    for(let slot=0;slot<4;slot++){
      const logicalA=info.face[slot],logicalB=info.face[(slot+1)%4];
      if(edgeKey(mesh,logicalA,logicalB)!==seedKey)continue;
      const chain=info.chains?.[slot]||[];
      for(let i=0;i<chain.length-1;i++){
        const a=chain[i],b=chain[i+1];
        if(a===seed.a&&b===seed.b)return{a:logicalA,b:logicalB};
        if(a===seed.b&&b===seed.a)return{a:logicalB,b:logicalA};
      }
    }
  }

  // Ordinary physical edge / pure quad fallback: use the touched edge's
  // own orientation whenever it matches the logical endpoints.
  const logical=edgeMap.get(seedKey);
  if(!logical)return null;
  if(seed.a===logical.a&&seed.b===logical.b)return{a:logical.a,b:logical.b};
  if(seed.a===logical.b&&seed.b===logical.a)return{a:logical.b,b:logical.a};
  return{a:logical.a,b:logical.b};
}
function logicalRing(mesh,edgeIndex,topology){
  const seed=mesh.edges()[edgeIndex];if(!seed)return null;
  const {logicalFaces}=topology,edgeMap=buildEdges(mesh,logicalFaces),seedKey=logicalSeedKey(mesh,seed,topology,edgeMap);
  if(!seedKey)return null;
  const seedDir=logicalSeedDirection(mesh,seed,topology,seedKey,edgeMap);
  if(!seedDir)return null;
  const cutKeys=new Set([seedKey]),directed=new Map([[seedKey,seedDir]]),queue=[seedKey];
  while(queue.length){
    const currentKey=queue.shift(),current=edgeMap.get(currentKey),currentDir=directed.get(currentKey);
    if(!current||!currentDir)continue;
    for(const faceIndex of current.faces){
      const face=logicalFaces[faceIndex];if(!face||face.length!==4)continue;
      let slot=-1;
      for(let i=0;i<4;i++)if(edgeKey(mesh,face[i],face[(i+1)%4])===currentKey){slot=i;break;}
      if(slot<0)continue;
      const faceA=face[slot],faceB=face[(slot+1)%4],forward=currentDir.a===faceA&&currentDir.b===faceB;
      const oppositeSlot=(slot+2)%4,oa=face[oppositeSlot],ob=face[(oppositeSlot+1)%4],oppositeKey=edgeKey(mesh,oa,ob);
      const nextDir=forward?{a:ob,b:oa}:{a:oa,b:ob};
      if(!cutKeys.has(oppositeKey)){
        cutKeys.add(oppositeKey);directed.set(oppositeKey,nextDir);queue.push(oppositeKey);
      }
    }
  }
  const splitFaces=[];
  logicalFaces.forEach((face,faceIndex)=>{
    if(face.length!==4||!topology.faceInfos[faceIndex])return;
    const slots=[];
    for(let i=0;i<4;i++)if(cutKeys.has(edgeKey(mesh,face[i],face[(i+1)%4])))slots.push(i);
    if(slots.length===2&&((slots[0]+2)%4===slots[1]||(slots[1]+2)%4===slots[0]))splitFaces.push({faceIndex,slots});
  });
  return splitFaces.length?{cutKeys,directed,splitFaces,logicalFaces,faceInfos:topology.faceInfos}:null;
}
function existingVertexAt(mesh,info,key,dir,amount){
  if(!info)return null;
  for(let slot=0;slot<4;slot++){
    const a=info.face[slot],b=info.face[(slot+1)%4];
    if(edgeKey(mesh,a,b)!==key)continue;
    for(const vi of info.chains[slot].slice(1,-1)){
      const t=betweenFraction(mesh.vertices[dir.a],mesh.vertices[vi],mesh.vertices[dir.b]);
      if(t!==null&&Math.abs(t-amount)<=MATCH_EPS)return vi;
    }
  }
  return null;
}
function allInfosForLogicalKey(mesh,ring,key){
  const out=[];
  for(const {faceIndex} of ring.splitFaces){
    const info=ring.faceInfos[faceIndex];if(!info)continue;
    if(info.face.some((a,i)=>edgeKey(mesh,a,info.face[(i+1)%4])===key))out.push(info);
  }
  return out;
}
function normalizePoly(poly){
  const out=[];
  for(const v of poly)if(Number.isInteger(v)&&out[out.length-1]!==v)out.push(v);
  if(out.length>1&&out[0]===out[out.length-1])out.pop();
  return new Set(out).size>=3?out:null;
}
function orientPath(path,from,to){
  if(path[0]===from&&path[path.length-1]===to)return [...path];
  if(path[0]===to&&path[path.length-1]===from)return [...path].reverse();
  return null;
}
function augmentedChain(mesh,info,slot,ring,cutVertices){
  const base=info.chains[slot],a=base[0],b=base[base.length-1],key=edgeKey(mesh,a,b);
  const ids=[...base,...(cutVertices.get(key)||[])],unique=[...new Set(ids)];
  const va=mesh.vertices[a],vb=mesh.vertices[b];
  unique.sort((u,v)=>{
    const tu=u===a?0:u===b?1:(betweenFraction(va,mesh.vertices[u],vb)??0);
    const tv=v===a?0:v===b?1:(betweenFraction(va,mesh.vertices[v],vb)??0);
    return tu-tv;
  });
  return unique;
}
function segmentInclusive(chain,from,to){
  const a=chain.indexOf(from),b=chain.indexOf(to);
  if(a<0||b<0)return null;
  return a<=b?chain.slice(a,b+1):chain.slice(b,a+1).reverse();
}
function untouchedSlots(cutSlots){
  const set=new Set(cutSlots);
  return[0,1,2,3].filter(i=>!set.has(i));
}
function connectorForEndpoints(info,cutSlots,from,to){
  // For opposite cut sides in a logical quad there are exactly two untouched
  // boundary sides. One connects the "start" endpoints; the other connects
  // the "end" endpoints. Choose only a chain whose actual endpoints match.
  for(const slot of untouchedSlots(cutSlots)){
    const path=orientPath(info.chains[slot],from,to);
    if(path)return path;
  }
  return null;
}
function splitLogicalFace(mesh,info,slots,ring,cutVertices,amounts){
  if(!info||slots.length!==2)return null;
  const s0=slots[0],s1=slots[1];
  if((s0+2)%4!==s1&&(s1+2)%4!==s0)return null;

  const key0=edgeKey(mesh,info.face[s0],info.face[(s0+1)%4]);
  const key1=edgeKey(mesh,info.face[s1],info.face[(s1+1)%4]);
  const dir0=ring.directed.get(key0),dir1=ring.directed.get(key1);
  if(!dir0||!dir1)return null;

  let p=orientPath(augmentedChain(mesh,info,s0,ring,cutVertices),dir0.a,dir0.b);
  let q=orientPath(augmentedChain(mesh,info,s1,ring,cutVertices),dir1.a,dir1.b);
  if(!p||!q)return null;

  let pCuts=[...(cutVertices.get(key0)||[])];
  let qCuts=[...(cutVertices.get(key1)||[])];
  if(pCuts.length!==amounts.length||qCuts.length!==amounts.length)return null;

  // Order cut vertices along the actual directed side, not insertion order.
  pCuts.sort((a,b)=>p.indexOf(a)-p.indexOf(b));
  qCuts.sort((a,b)=>q.indexOf(a)-q.indexOf(b));

  const pBounds=[p[0],...pCuts,p[p.length-1]];
  const qBounds=[q[0],...qCuts,q[q.length-1]];
  const startConnector=connectorForEndpoints(info,slots,qBounds[0],pBounds[0]);
  const endConnector=connectorForEndpoints(info,slots,pBounds[pBounds.length-1],qBounds[qBounds.length-1]);
  if(!startConnector||!endConnector)return null;

  const polys=[];
  const bands=pBounds.length-1;
  for(let i=0;i<bands;i++){
    const ps=segmentInclusive(p,pBounds[i],pBounds[i+1]);
    const qs=segmentInclusive(q,qBounds[i],qBounds[i+1]);
    if(!ps||!qs)return null;

    const poly=[...ps];

    // Interior boundary between bands is the Loop Cut chord.
    if(i===bands-1) poly.push(...endConnector.slice(1));
    else poly.push(qBounds[i+1]);

    // Walk back down the opposite cut side, preserving any pre-existing
    // collinear detail that belongs inside this band.
    poly.push(...qs.slice(0,-1).reverse());

    if(i===0) poly.push(...startConnector.slice(1));
    else poly.push(pBounds[i]);

    const clean=normalizePoly(poly);
    if(!clean)return null;
    polys.push(clean);
  }
  return polys;
}
function performLogicalCuts(mesh,edgeIndex,fractions){
  const topology=logicalTopology(mesh);if(!topology.hasVirtual)return null;
  const ring=logicalRing(mesh,edgeIndex,topology);if(!ring)return null;
  const amounts=[...new Set(fractions.map(v=>Math.round(Math.max(.05,Math.min(.95,v))*1e9)/1e9))].sort((a,b)=>a-b);
  const cutVertices=new Map(),slideGroups=amounts.map(()=>[]);
  for(const key of ring.cutKeys){
    const dir=ring.directed.get(key);if(!dir)continue;
    const infos=allInfosForLogicalKey(mesh,ring,key),start=mesh.vertices[dir.a].clone(),end=mesh.vertices[dir.b].clone(),indices=[];
    amounts.forEach((amount,groupIndex)=>{
      let vertex=null;
      for(const info of infos){
        vertex=existingVertexAt(mesh,info,key,dir,amount);
        if(Number.isInteger(vertex))break;
      }
      if(!Number.isInteger(vertex)){vertex=mesh.vertices.length;mesh.vertices.push(start.clone().lerp(end,amount));}
      indices.push(vertex);
      slideGroups[groupIndex].push({vertex,start:start.toArray(),end:end.toArray(),position:amount});
    });
    cutVertices.set(key,indices);
  }

  const replacements=new Map();
  for(const {faceIndex,slots} of ring.splitFaces){
    const info=ring.faceInfos[faceIndex],polys=splitLogicalFace(mesh,info,slots,ring,cutVertices,amounts);
    if(polys?.length)replacements.set(faceIndex,polys);
  }
  if(!replacements.size)return null;

  const nextFaces=[],nextGroups=[];
  mesh.faces.forEach((face,faceIndex)=>{
    const split=replacements.get(faceIndex),group=mesh.faceGroups?.[faceIndex]??null;
    if(split){for(const poly of split){nextFaces.push(poly);nextGroups.push(group);}}
    else{nextFaces.push(face);nextGroups.push(group);}
  });
  mesh.faces=nextFaces;
  if(Array.isArray(mesh.faceGroups))mesh.faceGroups=nextGroups;
  return{ring,amounts,slideGroups};
}

LiveEditableMesh.prototype.loopCut=function(edgeIndex,t=.5){
  const requested=Math.max(.05,Math.min(.95,t)),result=performLogicalCuts(this,edgeIndex,[requested]);
  if(!result)return baseLoopCut.call(this,edgeIndex,t);
  const slideData=result.slideGroups[0]||[],position=result.amounts[0]??requested;
  return{cutEdges:result.ring.cutKeys.size,splitFaces:result.ring.splitFaces.length,slideData,slideGroups:[slideData],position,promotedLogicalQuad:true};
};
LiveEditableMesh.prototype.loopCuts=function(edgeIndex,count=2){
  const cuts=Math.max(2,Math.min(8,Math.round(Number(count)||2))),fractions=Array.from({length:cuts},(_,i)=>(i+1)/(cuts+1)),result=performLogicalCuts(this,edgeIndex,fractions);
  if(!result)return baseLoopCuts.call(this,edgeIndex,count);
  return{cutCount:result.amounts.length,cutEdges:result.ring.cutKeys.size,splitFaces:result.ring.splitFaces.length,slideGroups:result.slideGroups,positions:result.amounts,promotedLogicalQuad:true};
};

LiveEditableMesh.prototype.__boxlabAddedVertexLoopPromotion='0.36.18.687';
globalThis.__boxlabAddedVertexLoopPromotion={version:'0.36.18.687'};
