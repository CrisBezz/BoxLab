import * as THREE from 'three';

// BoxLab v0.36.18.37 — conservative Vertex Merge.
// Adds Merge to Center and Merge to First without altering existing Vertex tools.

const status=document.querySelector('#selectionStatus');
const vertexTools=document.querySelector('[data-mode-tools="vertex"]');
const multiToggle=document.querySelector('#multiSelectToggle');

function state(){return globalThis.__boxlabBridgeState;}
function bridge(){return globalThis.__boxlabSelectionBridge;}
function mesh(){return state()?.mesh||null;}
function selectedVertices(){const b=bridge();return b?.mode?.()==='vertex'?[...new Set(b.indices?.()||[])].filter(Number.isInteger):[];}
function render(){document.querySelector('#cageToggle')?.dispatchEvent(new Event('change',{bubbles:true}));}
function key(m,a,b){return m.edgeKey(a,b);}

const row=document.createElement('div');
row.id='vertexMergeRow';
row.style.cssText='display:grid;grid-template-columns:1fr 1fr;gap:6px;margin:6px 0 2px';
const centerButton=document.createElement('button');centerButton.type='button';centerButton.id='mergeVerticesCenterBtn';centerButton.textContent='Merge to Center';
const firstButton=document.createElement('button');firstButton.type='button';firstButton.id='mergeVerticesFirstBtn';firstButton.textContent='Merge to First';
row.append(centerButton,firstButton);vertexTools?.append(row);

function cleanFace(face,selected,keep){
  const mapped=face.map(v=>selected.has(v)?keep:v),clean=[];
  for(const v of mapped)if(!clean.length||clean[clean.length-1]!==v)clean.push(v);
  if(clean.length>1&&clean[0]===clean[clean.length-1])clean.pop();
  return clean;
}
function faceSignature(face){
  if(!face?.length)return'';
  const variants=[];
  const rotations=list=>{for(let i=0;i<list.length;i++)variants.push([...list.slice(i),...list.slice(0,i)].join(','));};
  rotations(face);rotations([...face].reverse());variants.sort();return variants[0];
}
function polygonAreaVector(m,face,keep,target){
  const out=new THREE.Vector3();
  for(let i=0;i<face.length;i++){
    const ia=face[i],ib=face[(i+1)%face.length];
    const a=ia===keep?target:m.vertices[ia],b=ib===keep?target:m.vertices[ib];
    if(!a||!b)return null;
    out.x+=(a.y-b.y)*(a.z+b.z);
    out.y+=(a.z-b.z)*(a.x+b.x);
    out.z+=(a.x-b.x)*(a.y+b.y);
  }
  return out;
}
function mergeInfo(m,ids,mode){
  const vertices=[...new Set(ids||[])].filter(i=>Number.isInteger(i)&&m?.vertices?.[i]);
  if(vertices.length<2)return{ok:false,reason:'Select at least two vertices'};
  if(vertices.some(v=>m.looseVertices?.has?.(v)))return{ok:false,reason:'Loose vertices are not merged in this build'};
  const usedByFace=new Set(m.faces.flat());
  if(vertices.some(v=>!usedByFace.has(v)))return{ok:false,reason:'Select regular mesh vertices'};

  const keep=vertices[0],selected=new Set(vertices),target=new THREE.Vector3();
  if(mode==='first')target.copy(m.vertices[keep]);
  else{vertices.forEach(v=>target.add(m.vertices[v]));target.multiplyScalar(1/vertices.length);}

  const nextFaces=[];
  for(const face of m.faces){
    if(!Array.isArray(face)||face.length<3)continue;
    const clean=cleanFace(face,selected,keep);
    if(new Set(clean).size!==clean.length)return{ok:false,reason:'Merge would repeat a vertex inside a face'};
    if(clean.length<3)return{ok:false,reason:'Merge would remove a triangular face'};
    const area=polygonAreaVector(m,clean,keep,target);
    if(!area||area.lengthSq()<1e-14)return{ok:false,reason:'Merge would create a zero-area face'};
    nextFaces.push(clean);
  }

  const signatures=new Set();
  for(const face of nextFaces){const sig=faceSignature(face);if(signatures.has(sig))return{ok:false,reason:'Merge would create duplicate faces'};signatures.add(sig);}
  const uses=new Map();
  for(const face of nextFaces)for(let i=0;i<face.length;i++){
    const k=key(m,face[i],face[(i+1)%face.length]);uses.set(k,(uses.get(k)||0)+1);
  }
  if([...uses.values()].some(count=>count>2))return{ok:false,reason:'Merge would create non-manifold edges'};
  return{ok:true,vertices,selected,keep,target,nextFaces,mode};
}

function compact(m,keepOld){
  const used=new Set(m.faces.flat()),map=new Map(),vertices=[];
  m.vertices.forEach((v,i)=>{if(used.has(i)){map.set(i,vertices.length);vertices.push(v.clone());}});
  m.vertices=vertices;m.faces=m.faces.map(face=>face.map(v=>map.get(v)));
  const creases=new Map();
  for(const [k,value] of m.creases||[]){let[a,b]=String(k).split(':').map(Number);if(!map.has(a)||!map.has(b))continue;a=map.get(a);b=map.get(b);if(a===b)continue;const nk=key(m,a,b);creases.set(nk,Math.max(creases.get(nk)||0,value));}
  m.creases=creases;m.remapLooseTopology?.(map);m.edges();return map.get(keepOld);
}

function apply(mode){
  const m=mesh(),ids=selectedVertices(),history=globalThis.__boxlabHistory;
  if(!m||!history)return;
  const info=mergeInfo(m,ids,mode);
  if(!info.ok){if(status)status.textContent=`Vertex Merge • ${info.reason}`;sync();return;}
  const before=m.clone();history.push(before);
  m.vertices[info.keep].copy(info.target);m.faces=info.nextFaces.map(face=>[...face]);

  const mergedCreases=new Map();
  for(const [k,value] of before.creases||[]){
    let[a,b]=String(k).split(':').map(Number);if(info.selected.has(a))a=info.keep;if(info.selected.has(b))b=info.keep;if(a===b)continue;
    const nk=key(m,a,b);mergedCreases.set(nk,Math.max(mergedCreases.get(nk)||0,value));
  }
  m.creases=mergedCreases;
  if(before.looseEdges instanceof Set)m.looseEdges=new Set(before.looseEdges);
  if(before.looseVertices instanceof Set)m.looseVertices=new Set(before.looseVertices);
  const mergeMap=new Map(m.vertices.map((_,i)=>[i,i]));for(const v of info.vertices)mergeMap.set(v,info.keep);m.remapLooseTopology?.(mergeMap);

  const resultVertex=compact(m,info.keep);
  if(!Number.isInteger(resultVertex)){
    m.vertices=before.vertices.map(v=>v.clone());m.faces=before.faces.map(f=>[...f]);m.creases=new Map(before.creases);
    if(before.looseEdges instanceof Set)m.looseEdges=new Set(before.looseEdges);if(before.looseVertices instanceof Set)m.looseVertices=new Set(before.looseVertices);m.edges();render();
    if(status)status.textContent='Vertex Merge • rollback • result vertex was lost';return;
  }
  if(multiToggle?.checked){multiToggle.checked=false;multiToggle.dispatchEvent(new Event('change',{bubbles:true}));}
  bridge()?.set?.('vertex',[resultVertex]);render();
  if(status)status.textContent=`Vertex Merge • ${info.vertices.length} vertices → 1 • ${mode==='first'?'to first':'center'} • result selected`;
  sync();
}
function sync(){
  const m=mesh(),ids=selectedVertices();
  const center=m?mergeInfo(m,ids,'center'):null,first=m?mergeInfo(m,ids,'first'):null;
  centerButton.disabled=!center?.ok;firstButton.disabled=!first?.ok;
  centerButton.title=center?.ok?'Merge selected vertices to their centroid':(center?.reason||'Select at least two vertices');
  firstButton.title=first?.ok?'Merge selected vertices to the first selected vertex':(first?.reason||'Select at least two vertices');
}
centerButton.addEventListener('click',()=>apply('center'));
firstButton.addEventListener('click',()=>apply('first'));
window.addEventListener('boxlab-bridge-state',sync);
document.addEventListener('pointerup',()=>queueMicrotask(sync),true);
document.querySelectorAll('#selectionModes button').forEach(b=>b.addEventListener('click',()=>queueMicrotask(sync)));
setTimeout(sync,0);

globalThis.__boxlabVertexMerge={version:'0.36.18.37',info:mergeInfo,center:()=>apply('center'),first:()=>apply('first')};
