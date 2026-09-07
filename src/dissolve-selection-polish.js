// BoxLab v0.36.18.25 — Clean Dissolve + local co-planar face joining.
// Keeps the stable dissolve kernels unchanged. This module owns only the
// single-edge / closed-loop commit path and performs a conservative local
// cleanup afterwards: join safe co-planar neighbours, then remove redundant
// straight-through vertices only when every incident face can lose them safely.

const edgeButton=document.querySelector('#dissolveEdgeBtn');
const loopButton=document.querySelector('#dissolveLoopBtn');
const status=document.querySelector('#selectionStatus');
const multiToggle=document.querySelector('#multiSelectToggle');
const COPLANAR_DOT=0.999999;
const LINE_EPS=1e-7;

function state(){return globalThis.__boxlabBridgeState;}
function bridge(){return globalThis.__boxlabSelectionBridge;}
function mesh(){return state()?.mesh||null;}
function selectedEdges(){const b=bridge();return b?.mode?.()==='edge'?[...new Set(b.indices?.()||[])]:[];}
function render(){document.querySelector('#cageToggle')?.dispatchEvent(new Event('change',{bubbles:true}));}
function key(m,a,b){return m.edgeKey(a,b);}
function enableMulti(count){if(count<=1||!multiToggle||multiToggle.checked)return;multiToggle.checked=true;multiToggle.dispatchEvent(new Event('change',{bubbles:true}));}
function selectEdges(ids){const clean=[...new Set(ids||[])].filter(Number.isInteger);bridge()?.set?.('edge',clean);enableMulti(clean.length);render();return clean;}

function activeLoopEdges(){
  const objects=state()?.edgeObjects;
  if(!(objects instanceof Map))return[];
  return[...objects.entries()].filter(([,object])=>object?.renderOrder===27).map(([index])=>index).filter(Number.isInteger).sort((a,b)=>a-b);
}
function loopCandidate(m){
  const selected=selectedEdges();
  if(selected.length>=3){const info=m?.dissolveLoopInfo?.(selected);if(info)return{ids:selected,info,source:'selection'};}
  const active=activeLoopEdges();
  if(active.length>=3){const info=m?.dissolveLoopInfo?.(active);if(info)return{ids:active,info,source:'active'};}
  return null;
}
function boundaryEdgesForFaces(m,faceIndices){
  const counts=new Map();
  for(const fi of faceIndices){
    const face=m.faces[fi];if(!Array.isArray(face)||face.length<3)continue;
    for(let i=0;i<face.length;i++){
      const k=key(m,face[i],face[(i+1)%face.length]);
      counts.set(k,(counts.get(k)||0)+1);
    }
  }
  const indexByKey=new Map(m.edges().map((edge,index)=>[key(m,edge.a,edge.b),index]));
  return[...counts.entries()].filter(([,count])=>count===1).map(([k])=>indexByKey.get(k)).filter(Number.isInteger);
}
function realFaces(m,e){return(e?.faces||[]).filter(fi=>Number.isInteger(fi)&&Array.isArray(m.faces[fi]));}
function facePlaneDistance(m,faceIndex,point){
  const face=m.faces[faceIndex];if(!face?.length)return Infinity;
  const n=m.faceNormal(faceIndex);return Math.abs(point.clone().sub(m.vertices[face[0]]).dot(n));
}
function coplanarAcrossEdge(m,edgeIndex){
  const e=m.edges()[edgeIndex];if(!e||m.creases?.get?.(key(m,e.a,e.b))>0)return false;
  const fs=realFaces(m,e);if(fs.length!==2)return false;
  const n0=m.faceNormal(fs[0]),n1=m.faceNormal(fs[1]);
  if(!n0||!n1||n0.lengthSq()<1e-12||n1.lengthSq()<1e-12||n0.clone().normalize().dot(n1.clone().normalize())<COPLANAR_DOT)return false;
  const p=m.vertices[m.faces[fs[1]][0]];return !!p&&facePlaneDistance(m,fs[0],p)<=1e-6;
}
function joinCoplanarFromFaces(m,seedFaces){
  let frontier=new Set(seedFaces.filter(fi=>Array.isArray(m.faces[fi]))),joined=0;
  for(let guard=0;guard<256&&frontier.size;guard++){
    let changed=false;
    const edges=m.edges();
    for(let ei=0;ei<edges.length;ei++){
      const fs=realFaces(m,edges[ei]);
      if(fs.length!==2||!fs.some(fi=>frontier.has(fi))||!coplanarAcrossEdge(m,ei)||!m.dissolveEdgeInfo?.(ei))continue;
      const result=m.dissolveEdge(ei);if(!result)continue;
      frontier=new Set([result.faceIndex]);joined++;changed=true;break;
    }
    if(!changed)break;
  }
  return{joined,faces:[...frontier]};
}
function collinear(a,b,c){
  const ab=b.clone().sub(a),bc=c.clone().sub(b),scale=Math.max(ab.length(),bc.length(),1);
  if(ab.lengthSq()<1e-16||bc.lengthSq()<1e-16)return true;
  return ab.cross(bc).length()<=LINE_EPS*scale*scale&&b.clone().sub(a).dot(c.clone().sub(b))>=-LINE_EPS;
}
function removableStraightVertex(m,v){
  if(m.looseVertices?.has?.(v))return false;
  const incident=[];
  for(let fi=0;fi<m.faces.length;fi++)if(m.faces[fi]?.includes(v))incident.push(fi);
  if(!incident.length)return false;
  for(const fi of incident){
    const face=m.faces[fi],i=face.indexOf(v);if(face.length<=3||i<0)return false;
    const prev=face[(i-1+face.length)%face.length],next=face[(i+1)%face.length];
    if(prev===next||!collinear(m.vertices[prev],m.vertices[v],m.vertices[next]))return false;
    if((m.creases?.get?.(key(m,prev,v))||0)>0||(m.creases?.get?.(key(m,v,next))||0)>0)return false;
  }
  return true;
}
function compactUnusedVertices(m){
  const used=new Set(m.faces.flat());
  const map=new Map(),verts=[];
  m.vertices.forEach((p,i)=>{if(used.has(i)){map.set(i,verts.length);verts.push(p.clone());}});
  if(verts.length===m.vertices.length)return 0;
  const removed=m.vertices.length-verts.length;
  m.vertices=verts;m.faces=m.faces.map(f=>f.map(v=>map.get(v)));
  const creases=new Map();for(const[k,val]of m.creases||[]){const[a,b]=k.split(':').map(Number);if(map.has(a)&&map.has(b))creases.set(key(m,map.get(a),map.get(b)),val);}m.creases=creases;
  m.remapLooseTopology?.(map);m.edges();return removed;
}
function cleanStraightVertices(m,candidateVertices){
  let removed=0;
  for(let pass=0;pass<8;pass++){
    let changed=false;
    const candidates=[...new Set(candidateVertices||[])].filter(v=>Number.isInteger(v)&&m.vertices[v]);
    for(const v of candidates){
      if(!removableStraightVertex(m,v))continue;
      for(const face of m.faces){const i=face?.indexOf(v);if(i>=0)face.splice(i,1);}
      removed++;changed=true;
    }
    if(!changed)break;
  }
  if(removed)compactUnusedVertices(m);else m.edges();
  return removed;
}
function localCleanup(m,seedFaces){
  const candidateVertices=new Set();for(const fi of seedFaces)for(const v of m.faces[fi]||[])candidateVertices.add(v);
  const joined=joinCoplanarFromFaces(m,seedFaces);
  for(const fi of joined.faces)for(const v of m.faces[fi]||[])candidateVertices.add(v);
  const removedVertices=cleanStraightVertices(m,[...candidateVertices]);
  return{joinedFaces:joined.joined,removedVertices,faces:joined.faces};
}

edgeButton?.addEventListener('click',event=>{
  const m=mesh(),ids=selectedEdges(),history=globalThis.__boxlabHistory;
  if(!m||ids.length!==1||!history||!m.dissolveEdgeInfo?.(ids[0]))return;
  event.preventDefault();event.stopImmediatePropagation();
  const before=m.clone(),result=m.dissolveEdge(ids[0]);
  if(!result){if(status)status.textContent='Dissolve Edge failed • invalid topology';return;}
  const cleanup=localCleanup(m,[result.faceIndex]);
  history.push(before);
  const faceSeeds=cleanup.faces.filter(fi=>Array.isArray(m.faces[fi]));
  const next=boundaryEdgesForFaces(m,faceSeeds.length?faceSeeds:[Math.min(result.faceIndex,m.faces.length-1)]);
  selectEdges(next);
  if(status)status.textContent=`Clean Dissolve • ${cleanup.joinedFaces} co-planar join${cleanup.joinedFaces===1?'':'s'} • ${cleanup.removedVertices} redundant vert${cleanup.removedVertices===1?'ex':'ices'} removed`;
},true);

loopButton?.addEventListener('click',event=>{
  const m=mesh(),candidate=loopCandidate(m),history=globalThis.__boxlabHistory;
  if(!m||!candidate||!history)return;
  event.preventDefault();event.stopImmediatePropagation();
  const before=m.clone(),replacementCount=candidate.info.replacements?.length||0,result=m.dissolveLoop(candidate.ids);
  if(!result){if(status)status.textContent='Dissolve Loop failed • invalid or changed topology';return;}
  const start=Math.max(0,m.faces.length-replacementCount),seedFaces=Array.from({length:replacementCount},(_,i)=>start+i).filter(fi=>m.faces[fi]);
  const cleanup=localCleanup(m,seedFaces);
  history.push(before);
  document.querySelector('#loopSlide')?.setAttribute('disabled','');
  const next=boundaryEdgesForFaces(m,cleanup.faces.length?cleanup.faces:seedFaces);
  selectEdges(next);
  if(status)status.textContent=`Clean Dissolve Loop • ${result.removedEdges} edges • ${cleanup.joinedFaces} co-planar join${cleanup.joinedFaces===1?'':'s'} • ${cleanup.removedVertices} redundant vert${cleanup.removedVertices===1?'ex':'ices'} removed`;
},true);

globalThis.__boxlabDissolveSelectionPolish={version:'0.36.18.25'};
