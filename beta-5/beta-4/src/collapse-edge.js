import * as THREE from 'three';

// BoxLab v0.36.18.36 — conservative single-edge Collapse.
// Collapses one selected manifold edge to its midpoint, rejects unsafe topology,
// preserves crease/loose references through compaction, and selects the result vertex.

const status=document.querySelector('#selectionStatus');
const edgeTools=document.querySelector('[data-mode-tools="edge"]');
const deleteEdgeButton=document.querySelector('#deleteEdgeBtn');
const multiToggle=document.querySelector('#multiSelectToggle');

function state(){return globalThis.__boxlabBridgeState;}
function bridge(){return globalThis.__boxlabSelectionBridge;}
function mesh(){return state()?.mesh||null;}
function selectedEdges(){const b=bridge();return b?.mode?.()==='edge'?[...new Set(b.indices?.()||[])].filter(Number.isInteger):[];}
function render(){document.querySelector('#cageToggle')?.dispatchEvent(new Event('change',{bubbles:true}));}
function key(m,a,b){return m.edgeKey(a,b);}

const button=document.createElement('button');
button.id='collapseEdgeBtn';
button.type='button';
button.textContent='Collapse Edge';
button.disabled=true;

const topologyRow=deleteEdgeButton?.parentElement;
if(topologyRow){
  topologyRow.style.gridTemplateColumns='repeat(4,1fr)';
  topologyRow.insertBefore(button,deleteEdgeButton);
}else edgeTools?.append(button);

function cleanFace(face,remove,keep){
  const mapped=face.map(v=>v===remove?keep:v),clean=[];
  for(const v of mapped)if(!clean.length||clean[clean.length-1]!==v)clean.push(v);
  if(clean.length>1&&clean[0]===clean[clean.length-1])clean.pop();
  return clean;
}

function faceSignature(face){
  if(!face?.length)return'';
  const variants=[];
  const pushRotations=list=>{for(let i=0;i<list.length;i++)variants.push([...list.slice(i),...list.slice(0,i)].join(','));};
  pushRotations(face);pushRotations([...face].reverse());
  variants.sort();return variants[0];
}

function polygonAreaVector(m,face,keep,midpoint){
  const out=new THREE.Vector3();
  for(let i=0;i<face.length;i++){
    const ia=face[i],ib=face[(i+1)%face.length];
    const a=ia===keep?midpoint:m.vertices[ia],b=ib===keep?midpoint:m.vertices[ib];
    if(!a||!b)return null;
    out.x+=(a.y-b.y)*(a.z+b.z);
    out.y+=(a.z-b.z)*(a.x+b.x);
    out.z+=(a.x-b.x)*(a.y+b.y);
  }
  return out;
}

function collapseInfo(m,edgeIndex){
  const edges=m?.edges?.()||[],edge=edges[edgeIndex];
  if(!edge||edge.loose||!m.vertices[edge.a]||!m.vertices[edge.b])return{ok:false,reason:'Select one regular mesh edge'};
  if((edge.faces||[]).filter(fi=>fi>=0).length<1)return{ok:false,reason:'Loose edges are not collapsed in this build'};

  const keep=Math.min(edge.a,edge.b),remove=Math.max(edge.a,edge.b),midpoint=m.vertices[keep].clone().add(m.vertices[remove]).multiplyScalar(.5);
  const nextFaces=[];
  for(const face of m.faces){
    if(!Array.isArray(face)||face.length<3)continue;
    const clean=cleanFace(face,remove,keep);
    if(new Set(clean).size!==clean.length)return{ok:false,reason:'Collapse would create a repeated vertex in a face'};
    if(clean.length<3)return{ok:false,reason:'Collapse would remove a triangular face'};
    const area=polygonAreaVector(m,clean,keep,midpoint);
    if(!area||area.lengthSq()<1e-14)return{ok:false,reason:'Collapse would create a zero-area face'};
    nextFaces.push(clean);
  }

  const signatures=new Set();
  for(const face of nextFaces){const sig=faceSignature(face);if(signatures.has(sig))return{ok:false,reason:'Collapse would create duplicate faces'};signatures.add(sig);}

  const uses=new Map();
  for(const face of nextFaces)for(let i=0;i<face.length;i++){
    const k=key(m,face[i],face[(i+1)%face.length]);uses.set(k,(uses.get(k)||0)+1);
  }
  if([...uses.values()].some(count=>count>2))return{ok:false,reason:'Collapse would create non-manifold edges'};

  return{ok:true,edgeIndex,keep,remove,midpoint,nextFaces};
}

function compact(m,keepOld){
  const used=new Set(m.faces.flat()),map=new Map(),vertices=[];
  m.vertices.forEach((v,i)=>{if(used.has(i)){map.set(i,vertices.length);vertices.push(v.clone());}});
  m.vertices=vertices;
  m.faces=m.faces.map(face=>face.map(v=>map.get(v)));

  const creases=new Map();
  for(const [k,value] of m.creases||[]){
    let[a,b]=String(k).split(':').map(Number);
    if(!map.has(a)||!map.has(b))continue;
    a=map.get(a);b=map.get(b);if(a===b)continue;
    const nk=key(m,a,b),prior=creases.get(nk)||0;creases.set(nk,Math.max(prior,value));
  }
  m.creases=creases;
  m.remapLooseTopology?.(map);
  m.edges();
  return map.get(keepOld);
}

function applyCollapse(){
  const m=mesh(),ids=selectedEdges(),history=globalThis.__boxlabHistory;
  if(!m||ids.length!==1||!history)return;
  const info=collapseInfo(m,ids[0]);
  if(!info.ok){if(status)status.textContent=`Collapse Edge • ${info.reason}`;sync();return;}

  const before=m.clone();
  history.push(before); // selection-aware history snapshots the selected source edge here.
  m.vertices[info.keep].copy(info.midpoint);
  m.faces=info.nextFaces.map(face=>[...face]);

  // Remap crease keys through the endpoint merge before orphan compaction.
  const mergedCreases=new Map();
  for(const [k,value] of before.creases||[]){
    let[a,b]=String(k).split(':').map(Number);
    if(a===info.remove)a=info.keep;if(b===info.remove)b=info.keep;if(a===b)continue;
    const nk=key(m,a,b),prior=mergedCreases.get(nk)||0;mergedCreases.set(nk,Math.max(prior,value));
  }
  m.creases=mergedCreases;

  if(before.looseEdges instanceof Set)m.looseEdges=new Set(before.looseEdges);
  if(before.looseVertices instanceof Set)m.looseVertices=new Set(before.looseVertices);
  const mergedMap=new Map(m.vertices.map((_,i)=>[i,i]));mergedMap.set(info.remove,info.keep);
  m.remapLooseTopology?.(mergedMap);

  const resultVertex=compact(m,info.keep);
  if(!Number.isInteger(resultVertex)){
    m.vertices=before.vertices.map(v=>v.clone());m.faces=before.faces.map(f=>[...f]);m.creases=new Map(before.creases);
    if(before.looseEdges instanceof Set)m.looseEdges=new Set(before.looseEdges);if(before.looseVertices instanceof Set)m.looseVertices=new Set(before.looseVertices);m.edges();render();
    if(status)status.textContent='Collapse Edge • rollback • result vertex was lost';return;
  }

  // Avoid conversion-polish carrying the old edge endpoints into Vertex mode.
  bridge()?.set?.('edge',[]);
  if(multiToggle?.checked){multiToggle.checked=false;multiToggle.dispatchEvent(new Event('change',{bubbles:true}));}
  const vertexMode=document.querySelector('#selectionModes button[data-mode="vertex"]');
  if(vertexMode&&!vertexMode.classList.contains('active'))vertexMode.click();
  queueMicrotask(()=>{bridge()?.set?.('vertex',[resultVertex]);render();if(status)status.textContent='Collapse Edge • midpoint • resulting vertex selected';});
}

function sync(){
  const m=mesh(),ids=selectedEdges();
  const info=m&&ids.length===1?collapseInfo(m,ids[0]):null;
  button.disabled=!info?.ok;
  button.title=info?.ok?'Collapse selected edge to its midpoint':(info?.reason||'Select one collapsible edge');
}

button.addEventListener('click',applyCollapse);
window.addEventListener('boxlab-bridge-state',sync);
document.addEventListener('pointerup',()=>queueMicrotask(sync),true);
document.querySelectorAll('#selectionModes button').forEach(b=>b.addEventListener('click',()=>queueMicrotask(sync)));
setTimeout(sync,0);

globalThis.__boxlabCollapseEdge={version:'0.36.18.36',info:collapseInfo,apply:applyCollapse};
