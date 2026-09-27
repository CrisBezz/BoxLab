import * as THREE from 'three';

// BoxLab v0.36.18.75 — explicit multi-Face coplanar join, UI placement polish.
// Joins one edge-connected, coplanar Face selection into a single polygon by
// rebuilding only the selected region boundary. No automatic vertex cleanup.

const status=document.querySelector('#selectionStatus');
const faceTools=document.querySelector('[data-mode-tools="face"]');
const multiToggle=document.querySelector('#multiSelectToggle');

function state(){return globalThis.__boxlabBridgeState;}
function bridge(){return globalThis.__boxlabSelectionBridge;}
function mesh(){return state()?.mesh||null;}
function selectedFaces(){const b=bridge();return b?.mode?.()==='face'?[...new Set(b.indices?.()||[])].filter(Number.isInteger):[];}
function render(){document.querySelector('#cageToggle')?.dispatchEvent(new Event('change',{bubbles:true}));}
function edgeKey(a,b){return a<b?`${a}:${b}`:`${b}:${a}`;}

const button=document.createElement('button');
button.id='joinSelectedCoplanarFacesBtn';
button.type='button';
button.textContent='Join Coplanar';
button.disabled=true;
button.style.width='100%';
button.style.minWidth='0';

function place(){
  const extrude=document.querySelector('#extrudeBtn');
  const inset=document.querySelector('#insetBtn');
  const knife=document.querySelector('#knifeBtn');
  const row=extrude?.parentElement;
  if(row&&inset&&knife){
    row.style.gridTemplateColumns='repeat(4,minmax(0,1fr))';
    for(const item of [extrude,inset,knife,button]){
      item.style.minWidth='0';
      row.appendChild(item);
    }
    return true;
  }
  return false;
}

function facePlane(m,faceIndex){
  const face=m?.faces?.[faceIndex];
  if(!Array.isArray(face)||face.length<3)return null;
  const pts=face.map(i=>m.vertices?.[i]);
  if(pts.some(v=>!v))return null;
  const n=new THREE.Vector3();
  for(let i=0;i<pts.length;i++){
    const a=pts[i],b=pts[(i+1)%pts.length];
    n.x+=(a.y-b.y)*(a.z+b.z);
    n.y+=(a.z-b.z)*(a.x+b.x);
    n.z+=(a.x-b.x)*(a.y+b.y);
  }
  if(n.lengthSq()<1e-20)return null;
  n.normalize();
  return{normal:n,origin:pts[0].clone()};
}

function scaleTolerance(m,faceIndices){
  const box=new THREE.Box3();
  for(const fi of faceIndices)for(const vi of m.faces?.[fi]||[]){const v=m.vertices?.[vi];if(v)box.expandByPoint(v);}
  if(box.isEmpty())return 1e-7;
  return Math.max(1e-7,box.getSize(new THREE.Vector3()).length()*1e-6);
}

function samePlane(m,faceIndex,seedPlane,tolerance){
  const face=m?.faces?.[faceIndex];
  if(!Array.isArray(face)||face.length<3)return false;
  const plane=facePlane(m,faceIndex);if(!plane)return false;
  if(Math.abs(plane.normal.dot(seedPlane.normal))<0.99999)return false;
  for(const vi of face){
    const v=m.vertices?.[vi];
    if(!v||Math.abs(v.clone().sub(seedPlane.origin).dot(seedPlane.normal))>tolerance)return false;
  }
  return true;
}

function orderedBoundary(boundaryEdges){
  if(boundaryEdges.length<3)return null;
  const adjacency=new Map();
  const add=(a,b)=>{if(!adjacency.has(a))adjacency.set(a,[]);adjacency.get(a).push(b);};
  for(const {a,b} of boundaryEdges){add(a,b);add(b,a);}
  if([...adjacency.values()].some(list=>list.length!==2))return null;

  const start=Math.min(...adjacency.keys());
  const loop=[start];
  const used=new Set();
  let previous=null,current=start;
  for(let guard=0;guard<boundaryEdges.length;guard++){
    const neighbours=adjacency.get(current)||[];
    const next=neighbours.find(v=>v!==previous&&!used.has(edgeKey(current,v))) ?? neighbours.find(v=>!used.has(edgeKey(current,v)));
    if(next===undefined)return null;
    used.add(edgeKey(current,next));
    previous=current;
    current=next;
    if(current===start)break;
    loop.push(current);
  }
  if(current!==start||used.size!==boundaryEdges.length||loop.length!==boundaryEdges.length)return null;
  return loop;
}

function loopNormal(m,loop){
  const n=new THREE.Vector3();
  for(let i=0;i<loop.length;i++){
    const a=m.vertices?.[loop[i]],b=m.vertices?.[loop[(i+1)%loop.length]];
    if(!a||!b)return null;
    n.x+=(a.y-b.y)*(a.z+b.z);
    n.y+=(a.z-b.z)*(a.x+b.x);
    n.z+=(a.x-b.x)*(a.y+b.y);
  }
  return n.lengthSq()<1e-20?null:n.normalize();
}

function canonicalFace(face){return [...face].sort((a,b)=>a-b).join(',');}

function plan(m,faceIndices){
  const ids=[...new Set(faceIndices||[])].filter(i=>Number.isInteger(i)&&Array.isArray(m?.faces?.[i])).sort((a,b)=>a-b);
  if(!m||ids.length<2)return{ok:false,reason:'Select at least two Faces'};

  const seedPlane=facePlane(m,ids[0]);
  if(!seedPlane)return{ok:false,reason:'Selected Face geometry is invalid'};
  const tolerance=scaleTolerance(m,ids);
  for(const fi of ids)if(!samePlane(m,fi,seedPlane,tolerance))return{ok:false,reason:'Selection is not coplanar'};

  const selected=new Set(ids);
  const globalOwners=new Map();
  (m.faces||[]).forEach((face,fi)=>{
    if(!Array.isArray(face)||face.length<3)return;
    for(let i=0;i<face.length;i++){
      const a=face[i],b=face[(i+1)%face.length];
      if(!Number.isInteger(a)||!Number.isInteger(b)||a===b)continue;
      const key=edgeKey(a,b);
      const owners=globalOwners.get(key)||[];
      owners.push(fi);globalOwners.set(key,owners);
    }
  });

  const selectedOwners=new Map();
  for(const fi of ids){
    const face=m.faces[fi];
    for(let i=0;i<face.length;i++){
      const a=face[i],b=face[(i+1)%face.length],key=edgeKey(a,b);
      const owners=selectedOwners.get(key)||[];
      owners.push({fi,a,b});selectedOwners.set(key,owners);
    }
  }

  const neighbours=new Map(ids.map(fi=>[fi,new Set()]));
  const boundaryEdges=[];
  const internalKeys=[];
  for(const [key,owners] of selectedOwners){
    const global=globalOwners.get(key)||[];
    if(global.length>2)return{ok:false,reason:'Selection touches non-manifold topology'};
    if(owners.length===1){
      boundaryEdges.push({key,a:owners[0].a,b:owners[0].b,fi:owners[0].fi});
    }else if(owners.length===2){
      if(global.length!==2)return{ok:false,reason:'Internal edge has external face users'};
      const [a,b]=owners.map(o=>o.fi);
      neighbours.get(a)?.add(b);neighbours.get(b)?.add(a);
      internalKeys.push(key);
      if((m.creases?.get?.(key)||0)>0)return{ok:false,reason:'Creased internal edges cannot be joined'};
    }else return{ok:false,reason:'Selected region has invalid edge ownership'};
  }

  const visited=new Set([ids[0]]),queue=[ids[0]];
  while(queue.length){const fi=queue.shift();for(const next of neighbours.get(fi)||[])if(!visited.has(next)){visited.add(next);queue.push(next);}}
  if(visited.size!==ids.length)return{ok:false,reason:'Selected Faces are not edge-connected'};

  let boundary=orderedBoundary(boundaryEdges);
  if(!boundary)return{ok:false,reason:'Region must have one clean outer boundary'};
  const normal=loopNormal(m,boundary);
  if(!normal)return{ok:false,reason:'Merged boundary is degenerate'};
  if(normal.dot(seedPlane.normal)<0)boundary=boundary.reverse();

  const mergedKey=canonicalFace(boundary);
  for(let fi=0;fi<(m.faces||[]).length;fi++){
    if(selected.has(fi))continue;
    const face=m.faces[fi];
    if(Array.isArray(face)&&face.length===boundary.length&&canonicalFace(face)===mergedKey)return{ok:false,reason:'Merge would duplicate an existing Face'};
  }

  return{ok:true,faceIndices:ids,boundary,internalKeys,tolerance,resultIndex:ids[0]};
}

function apply(){
  const m=mesh(),ids=selectedFaces(),history=globalThis.__boxlabHistory;
  if(!m||!history)return;
  const info=plan(m,ids);
  if(!info.ok){if(status)status.textContent=`Join Coplanar Faces • ${info.reason}`;sync();return;}

  history.push(m.clone());
  const selected=new Set(info.faceIndices);
  const insertAt=info.faceIndices[0];
  const faces=[];
  let resultIndex=-1;
  for(let fi=0;fi<m.faces.length;fi++){
    if(fi===insertAt){resultIndex=faces.length;faces.push([...info.boundary]);}
    if(selected.has(fi))continue;
    faces.push([...m.faces[fi]]);
  }
  m.faces=faces;
  for(const key of info.internalKeys){
    m.creases?.delete?.(key);
    m.looseEdges?.delete?.(key);
  }
  m.edges?.();

  if(multiToggle?.checked){multiToggle.checked=false;multiToggle.dispatchEvent(new Event('change',{bubbles:true}));}
  bridge()?.set?.('face',[resultIndex]);
  render();
  if(status)status.textContent=`Join Coplanar Faces • ${info.faceIndices.length} faces → 1 face • result selected`;
  queueMicrotask(sync);
}

function sync(){
  place();
  const m=mesh(),ids=selectedFaces();
  const info=m&&ids.length>=2?plan(m,ids):null;
  button.disabled=!info?.ok||!globalThis.__boxlabHistory;
  button.title=info?.ok
    ?`Join ${ids.length} selected coplanar Faces into one Face`
    :(info?.reason||'Select an edge-connected coplanar Face region');
}

button.addEventListener('click',apply);
window.addEventListener('boxlab-bridge-state',sync);
document.addEventListener('pointerup',()=>queueMicrotask(sync),true);
document.querySelectorAll('#selectionModes button').forEach(b=>b.addEventListener('click',()=>queueMicrotask(sync)));
[0,40,120,300,700].forEach(delay=>setTimeout(sync,delay));

setTimeout(()=>{
  if(button.isConnected)return;
  const host=document.createElement('div');
  host.className='outliner-actions';
  host.style.cssText='grid-template-columns:1fr;margin-top:4px';
  host.appendChild(button);
  faceTools?.appendChild(host);
},900);

globalThis.__boxlabJoinSelectedCoplanarFaces={version:'0.36.18.75',plan,apply};
