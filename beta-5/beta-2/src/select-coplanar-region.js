import * as THREE from 'three';

// BoxLab v0.36.18.69 — non-destructive connected coplanar region selection.
// Starting from one selected Face, flood-selects edge-connected faces lying on
// the same geometric plane. Geometry/history are untouched.

const status=document.querySelector('#selectionStatus');
const faceTools=document.querySelector('[data-mode-tools="face"]');
const multiToggle=document.querySelector('#multiSelectToggle');

function state(){return globalThis.__boxlabBridgeState;}
function bridge(){return globalThis.__boxlabSelectionBridge;}
function mesh(){return state()?.mesh||null;}
function selectedFaces(){const b=bridge();return b?.mode?.()==='face'?[...new Set(b.indices?.()||[])].filter(Number.isInteger):[];}
function render(){document.querySelector('#cageToggle')?.dispatchEvent(new Event('change',{bubbles:true}));}
function edgeKey(a,b){return a<b?`${a}:${b}`:`${b}:${a}`;}

const row=document.createElement('div');
row.id='coplanarRegionRow';
row.className='outliner-actions';
row.style.cssText='grid-template-columns:1fr;margin-top:4px';

const button=document.createElement('button');
button.id='selectCoplanarRegionBtn';
button.type='button';
button.textContent='Coplanar Region';
button.disabled=true;
button.style.width='100%';
row.appendChild(button);

function place(){
  if(row.isConnected)return true;
  const diagnostics=document.querySelector('#degenerateFaceInspectionRow');
  if(diagnostics?.parentElement){diagnostics.insertAdjacentElement('afterend',row);return true;}
  const primary=document.querySelector('#faceInspectionRow');
  if(primary?.parentElement){primary.insertAdjacentElement('afterend',row);return true;}
  if(faceTools){faceTools.appendChild(row);return true;}
  return false;
}

function facePlane(m,faceIndex){
  const face=m?.faces?.[faceIndex];
  if(!Array.isArray(face)||face.length<3)return null;
  const pts=face.map(i=>m.vertices?.[i]);
  if(pts.some(v=>!v))return null;

  // Newell normal is stable for arbitrary polygon vertex counts.
  const n=new THREE.Vector3();
  for(let i=0;i<pts.length;i++){
    const a=pts[i],b=pts[(i+1)%pts.length];
    n.x+=(a.y-b.y)*(a.z+b.z);
    n.y+=(a.z-b.z)*(a.x+b.x);
    n.z+=(a.x-b.x)*(a.y+b.y);
  }
  if(n.lengthSq()<1e-20)return null;
  n.normalize();
  const origin=pts[0].clone();
  return{normal:n,origin};
}

function scaleTolerance(m){
  const box=new THREE.Box3();
  for(const v of m?.vertices||[])if(v)box.expandByPoint(v);
  if(box.isEmpty())return 1e-7;
  const diagonal=box.getSize(new THREE.Vector3()).length();
  return Math.max(1e-7,diagonal*1e-6);
}

function samePlane(m,faceIndex,seedPlane,tolerance){
  const face=m?.faces?.[faceIndex];
  if(!Array.isArray(face)||face.length<3)return false;
  const plane=facePlane(m,faceIndex);if(!plane)return false;
  // Orientation is deliberately ignored here: this is geometric coplanarity.
  if(Math.abs(plane.normal.dot(seedPlane.normal))<0.99999)return false;
  for(const vi of face){
    const v=m.vertices?.[vi];
    if(!v||Math.abs(v.clone().sub(seedPlane.origin).dot(seedPlane.normal))>tolerance)return false;
  }
  return true;
}

function inspect(m,seedIndex){
  if(!m||!Number.isInteger(seedIndex)||!Array.isArray(m.faces?.[seedIndex]))return{indices:[],count:0,ok:false,reason:'Select one Face'};
  const seedPlane=facePlane(m,seedIndex);
  if(!seedPlane)return{indices:[],count:0,ok:false,reason:'Selected Face has invalid geometry'};
  const tolerance=scaleTolerance(m);
  const faces=m.faces||[];
  const edgeOwners=new Map();

  faces.forEach((face,fi)=>{
    if(!Array.isArray(face)||face.length<3)return;
    for(let i=0;i<face.length;i++){
      const a=face[i],b=face[(i+1)%face.length];
      if(!Number.isInteger(a)||!Number.isInteger(b)||a===b)continue;
      const key=edgeKey(a,b);
      const owners=edgeOwners.get(key)||[];
      owners.push(fi);
      edgeOwners.set(key,owners);
    }
  });

  const neighbours=Array.from({length:faces.length},()=>new Set());
  for(const owners of edgeOwners.values()){
    if(owners.length<2)continue;
    for(let i=0;i<owners.length;i++)for(let j=i+1;j<owners.length;j++){
      neighbours[owners[i]]?.add(owners[j]);
      neighbours[owners[j]]?.add(owners[i]);
    }
  }

  const visited=new Set([seedIndex]);
  const queue=[seedIndex];
  while(queue.length){
    const current=queue.shift();
    for(const next of neighbours[current]||[]){
      if(visited.has(next))continue;
      if(!samePlane(m,next,seedPlane,tolerance))continue;
      visited.add(next);
      queue.push(next);
    }
  }

  const indices=[...visited].sort((a,b)=>a-b);
  return{indices,count:indices.length,ok:true,seedIndex,tolerance};
}

function apply(){
  const m=mesh(),ids=selectedFaces();
  if(!m||ids.length!==1)return;
  const info=inspect(m,ids[0]);
  if(!info.ok){if(status)status.textContent=`Coplanar Region • ${info.reason}`;sync();return;}

  if(multiToggle){
    const wanted=info.indices.length>1;
    if(multiToggle.checked!==wanted){multiToggle.checked=wanted;multiToggle.dispatchEvent(new Event('change',{bubbles:true}));}
  }
  bridge()?.set?.('face',info.indices);
  render();
  if(status)status.textContent=info.count>1
    ?`Coplanar Region • ${info.count} connected faces selected`
    :'Coplanar Region • no coplanar neighbours';
}

function sync(){
  place();
  const m=mesh(),ids=selectedFaces();
  const info=m&&ids.length===1?inspect(m,ids[0]):null;
  button.disabled=!info?.ok;
  button.title=info?.ok
    ?(info.count>1?`Select ${info.count} edge-connected coplanar faces`:'Selected Face has no coplanar neighbours')
    :'Select exactly one Face as the coplanar seed';
}

button.addEventListener('click',apply);
window.addEventListener('boxlab-bridge-state',sync);
document.addEventListener('pointerup',()=>queueMicrotask(sync),true);
document.querySelectorAll('#selectionModes button').forEach(b=>b.addEventListener('click',()=>queueMicrotask(sync)));
[0,40,120,300,700].forEach(delay=>setTimeout(sync,delay));

globalThis.__boxlabSelectCoplanarRegion={version:'0.36.18.69',inspect,apply,samePlane};
