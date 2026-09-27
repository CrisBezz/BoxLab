// BoxLab v0.36.18.28 — Dissolve result-selection polish + safe inline-edge fallback.
// Stable two-face dissolve topology remains unchanged. When a selected edge
// cannot use the normal dissolve kernel, allow removal only when one endpoint
// is a redundant straight-through vertex in every face that uses it.

const edgeButton=document.querySelector('#dissolveEdgeBtn');
const loopButton=document.querySelector('#dissolveLoopBtn');
const status=document.querySelector('#selectionStatus');
const multiToggle=document.querySelector('#multiSelectToggle');
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

function collinear(a,b,c){
  if(!a||!b||!c)return false;
  const ab=b.clone().sub(a),bc=c.clone().sub(b),scale=Math.max(ab.length(),bc.length(),1);
  if(ab.lengthSq()<1e-16||bc.lengthSq()<1e-16)return true;
  return ab.clone().cross(bc).length()<=LINE_EPS*scale*scale&&ab.dot(bc)>=-LINE_EPS;
}
function incidentFaces(m,v){
  const out=[];for(let fi=0;fi<m.faces.length;fi++)if(m.faces[fi]?.includes(v))out.push(fi);return out;
}
function straightVertexInfo(m,v){
  if(!Number.isInteger(v)||!m.vertices[v]||m.looseVertices?.has?.(v))return null;
  const faces=incidentFaces(m,v);if(!faces.length)return null;
  const occurrences=[];
  for(const fi of faces){
    const face=m.faces[fi],i=face.indexOf(v);if(i<0||face.length<=3)return null;
    const prev=face[(i-1+face.length)%face.length],next=face[(i+1)%face.length];
    if(prev===next||!collinear(m.vertices[prev],m.vertices[v],m.vertices[next]))return null;
    if((m.creases?.get?.(key(m,prev,v))||0)>0||(m.creases?.get?.(key(m,v,next))||0)>0)return null;
    occurrences.push({fi,prev,next});
  }
  return{vertex:v,faces,occurrences};
}
function compactUnusedVertices(m){
  const used=new Set(m.faces.flat());
  const map=new Map(),vertices=[];
  m.vertices.forEach((p,i)=>{if(used.has(i)){map.set(i,vertices.length);vertices.push(p.clone());}});
  if(vertices.length===m.vertices.length){m.edges();return 0;}
  const removed=m.vertices.length-vertices.length;
  m.vertices=vertices;
  m.faces=m.faces.map(face=>face.map(v=>map.get(v)));
  const creases=new Map();
  for(const [k,value] of m.creases||[]){const [a,b]=k.split(':').map(Number);if(map.has(a)&&map.has(b))creases.set(key(m,map.get(a),map.get(b)),value);}
  m.creases=creases;
  m.remapLooseTopology?.(map);
  m.edges();
  return removed;
}
function dissolveInlineEdge(m,edgeIndex){
  const edge=m.edges()[edgeIndex];if(!edge)return null;
  const candidates=[straightVertexInfo(m,edge.a),straightVertexInfo(m,edge.b)].filter(Boolean);
  if(!candidates.length)return null;
  // Prefer the endpoint used by fewer faces; this removes the least topology.
  candidates.sort((a,b)=>a.faces.length-b.faces.length||a.vertex-b.vertex);
  const chosen=candidates[0];
  for(const {fi} of chosen.occurrences){const face=m.faces[fi],i=face.indexOf(chosen.vertex);if(i<0||face.length<=3)return null;face.splice(i,1);}
  const removed=compactUnusedVertices(m);
  return{removedVertex:chosen.vertex,removedVertices:removed||1,faceCount:m.faces.length};
}

edgeButton?.addEventListener('click',event=>{
  const m=mesh(),ids=selectedEdges(),history=globalThis.__boxlabHistory;
  if(!m||ids.length!==1||!history)return;
  const edgeIndex=ids[0],normalInfo=m.dissolveEdgeInfo?.(edgeIndex),inlineInfo=!normalInfo?(()=>{
    const before=m.clone(),result=dissolveInlineEdge(m,edgeIndex);
    if(!result){m.vertices=before.vertices.map(v=>v.clone());m.faces=before.faces.map(f=>[...f]);m.creases=new Map(before.creases);if(before.looseEdges instanceof Set)m.looseEdges=new Set(before.looseEdges);if(before.looseVertices instanceof Set)m.looseVertices=new Set(before.looseVertices);m.edges();}
    return result?{before,result}:null;
  })():null;
  if(!normalInfo&&!inlineInfo)return;
  event.preventDefault();event.stopImmediatePropagation();
  if(inlineInfo){
    history.push(inlineInfo.before);selectEdges([]);
    if(status)status.textContent=`Dissolve Edge • removed redundant inline vertex • clean face boundary`;
    return;
  }
  const before=m.clone(),result=m.dissolveEdge(edgeIndex);
  if(!result){if(status)status.textContent='Dissolve Edge failed • invalid topology';return;}
  history.push(before);
  const next=boundaryEdgesForFaces(m,[result.faceIndex]);
  selectEdges(next);
  if(status)status.textContent=`Dissolve Edge • merged faces • ${next.length} boundary edge${next.length===1?'':'s'} selected`;
},true);

loopButton?.addEventListener('click',event=>{
  const m=mesh(),candidate=loopCandidate(m),history=globalThis.__boxlabHistory;
  if(!m||!candidate||!history)return;
  event.preventDefault();event.stopImmediatePropagation();
  const before=m.clone(),replacementCount=candidate.info.replacements?.length||0,result=m.dissolveLoop(candidate.ids);
  if(!result){if(status)status.textContent='Dissolve Loop failed • invalid or changed topology';return;}
  history.push(before);
  const start=Math.max(0,m.faces.length-replacementCount),faces=Array.from({length:replacementCount},(_,i)=>start+i);
  const next=boundaryEdgesForFaces(m,faces);
  document.querySelector('#loopSlide')?.setAttribute('disabled','');
  selectEdges(next);
  if(status)status.textContent=`Dissolve Loop • removed ${result.removedEdges} edges + ${result.removedVertices} vertices • ${next.length} surviving boundary edges selected`;
},true);

globalThis.__boxlabDissolveSelectionPolish={version:'0.36.18.28'};
