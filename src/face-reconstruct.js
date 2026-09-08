import * as THREE from 'three';

// BoxLab v0.36.18.43 — conservative Face Reconstruction.
// Creates one face only when selected vertices already form one clean planar
// closed boundary loop in the existing mesh. No guessing from selection order.

const status=document.querySelector('#selectionStatus');
const vertexTools=document.querySelector('[data-mode-tools="vertex"]');
const multiToggle=document.querySelector('#multiSelectToggle');

function state(){return globalThis.__boxlabBridgeState;}
function bridge(){return globalThis.__boxlabSelectionBridge;}
function mesh(){return state()?.mesh||null;}
function selectedVertices(){const b=bridge();return b?.mode?.()==='vertex'?[...new Set(b.indices?.()||[])].filter(Number.isInteger):[];}
function render(){document.querySelector('#cageToggle')?.dispatchEvent(new Event('change',{bubbles:true}));}

const host=document.createElement('div');
host.className='outliner-actions';
host.style.gridTemplateColumns='1fr';
const button=document.createElement('button');
button.id='createFaceFromVerticesBtn';button.type='button';button.textContent='Create Face';button.disabled=true;
host.appendChild(button);
const anchor=document.querySelector('#cleanVerticesBtn')?.parentElement;
if(anchor?.parentElement)anchor.parentElement.insertBefore(host,anchor.nextSibling);else vertexTools?.append(host);

function faceSignature(face){
  const variants=[];const add=list=>{for(let i=0;i<list.length;i++)variants.push([...list.slice(i),...list.slice(0,i)].join(','));};
  add(face);add([...face].reverse());variants.sort();return variants[0]||'';
}
function orderedBoundary(m,ids){
  const selected=new Set(ids),adj=new Map(ids.map(v=>[v,[]]));
  for(const e of m.edges()){
    if(!selected.has(e.a)||!selected.has(e.b))continue;
    adj.get(e.a).push(e.b);adj.get(e.b).push(e.a);
  }
  if([...adj.values()].some(list=>list.length!==2))return null;
  const start=Math.min(...ids),order=[start];let prev=null,current=start;
  for(let guard=0;guard<ids.length;guard++){
    const next=adj.get(current).find(v=>v!==prev);
    if(!Number.isInteger(next))return null;
    if(next===start)return order.length===ids.length?order:null;
    if(order.includes(next))return null;
    order.push(next);prev=current;current=next;
  }
  return null;
}
function newell(m,order){
  const n=new THREE.Vector3();
  for(let i=0;i<order.length;i++){
    const a=m.vertices[order[i]],b=m.vertices[order[(i+1)%order.length]];if(!a||!b)return null;
    n.x+=(a.y-b.y)*(a.z+b.z);n.y+=(a.z-b.z)*(a.x+b.x);n.z+=(a.x-b.x)*(a.y+b.y);
  }
  return n;
}
function planar(m,order,normal){
  const n=normal.clone().normalize(),origin=m.vertices[order[0]],box=new THREE.Box3();
  order.forEach(v=>box.expandByPoint(m.vertices[v]));
  const tol=Math.max(1e-7,box.getSize(new THREE.Vector3()).length()*1e-6);
  return order.every(v=>Math.abs(m.vertices[v].clone().sub(origin).dot(n))<=tol);
}
function orientAgainstNeighbour(m,order){
  for(let i=0;i<order.length;i++){
    const a=order[i],b=order[(i+1)%order.length];
    const edge=m.edges().find(e=>(e.a===a&&e.b===b)||(e.a===b&&e.b===a));
    const fi=(edge?.faces||[]).find(x=>Number.isInteger(x)&&x>=0&&Array.isArray(m.faces[x]));
    if(!Number.isInteger(fi))continue;
    const f=m.faces[fi];
    for(let j=0;j<f.length;j++){
      if(f[j]===a&&f[(j+1)%f.length]===b)return [...order].reverse();
      if(f[j]===b&&f[(j+1)%f.length]===a)return order;
    }
  }
  return order;
}
function createInfo(m,ids){
  const vertices=[...new Set(ids||[])].filter(i=>Number.isInteger(i)&&m?.vertices?.[i]);
  if(vertices.length<3)return{ok:false,reason:'Select at least 3 boundary vertices'};
  const order=orderedBoundary(m,vertices);if(!order)return{ok:false,reason:'Selected vertices must form one closed edge loop'};
  const n=newell(m,order);if(!n||n.lengthSq()<1e-14)return{ok:false,reason:'Boundary has zero area'};
  if(!planar(m,order,n))return{ok:false,reason:'Boundary vertices are not planar'};
  const sig=faceSignature(order);if(m.faces.some(face=>faceSignature(face)===sig))return{ok:false,reason:'That face already exists'};
  const uses=new Map();for(const face of m.faces)for(let i=0;i<face.length;i++){const k=m.edgeKey(face[i],face[(i+1)%face.length]);uses.set(k,(uses.get(k)||0)+1);}
  for(let i=0;i<order.length;i++){const k=m.edgeKey(order[i],order[(i+1)%order.length]);if((uses.get(k)||0)>=2)return{ok:false,reason:'Boundary contains a non-manifold/full edge'};}
  return{ok:true,order:orientAgainstNeighbour(m,order)};
}
function apply(){
  const m=mesh(),history=globalThis.__boxlabHistory,ids=selectedVertices();if(!m||!history)return;
  const info=createInfo(m,ids);if(!info.ok){if(status)status.textContent=`Create Face • ${info.reason}`;sync();return;}
  const before=m.clone();history.push(before);
  m.faces.push([...info.order]);m.edges();
  const faceIndex=m.faces.length-1;
  bridge()?.set?.('vertex',[]);
  if(multiToggle?.checked){multiToggle.checked=false;multiToggle.dispatchEvent(new Event('change',{bubbles:true}));}
  const faceMode=document.querySelector('#selectionModes button[data-mode="face"]');if(faceMode&&!faceMode.classList.contains('active'))faceMode.click();
  queueMicrotask(()=>{bridge()?.set?.('face',[faceIndex]);render();if(status)status.textContent=`Create Face • ${info.order.length}-vertex face created • result selected`;});
}
function sync(){const info=createInfo(mesh(),selectedVertices());button.disabled=!info?.ok;button.title=info?.ok?'Create one face from this closed planar vertex boundary':(info?.reason||'Select a closed planar boundary');}
button.addEventListener('click',apply);window.addEventListener('boxlab-bridge-state',sync);document.addEventListener('pointerup',()=>queueMicrotask(sync),true);setTimeout(sync,0);

globalThis.__boxlabFaceReconstruct={version:'0.36.18.43',info:createInfo,apply};
