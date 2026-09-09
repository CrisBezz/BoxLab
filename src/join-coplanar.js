import * as THREE from 'three';

// BoxLab v0.36.18.75 — explicit conservative Join Coplanar, UI placement polish.
// Uses the existing stable dissolveEdge kernel only after verifying that the
// selected shared edge separates exactly two genuinely coplanar, uncreased faces.

const status=document.querySelector('#selectionStatus');
const edgeTools=document.querySelector('[data-mode-tools="edge"]');
const multiToggle=document.querySelector('#multiSelectToggle');

function state(){return globalThis.__boxlabBridgeState;}
function bridge(){return globalThis.__boxlabSelectionBridge;}
function mesh(){return state()?.mesh||null;}
function selectedEdges(){const b=bridge();return b?.mode?.()==='edge'?[...new Set(b.indices?.()||[])].filter(Number.isInteger):[];}
function render(){document.querySelector('#cageToggle')?.dispatchEvent(new Event('change',{bubbles:true}));}

const button=document.createElement('button');
button.id='joinCoplanarBtn';
button.type='button';
button.textContent='Join Coplanar';
button.disabled=true;

function place(){
  const bridgeButton=document.querySelector('#bridgeEdgesBtn');
  const fillButton=document.querySelector('#fillFaceBtn');
  const row=bridgeButton?.parentElement;
  if(row&&fillButton){
    row.style.gridTemplateColumns='repeat(3,minmax(0,1fr))';
    bridgeButton.style.minWidth='0';fillButton.style.minWidth='0';button.style.minWidth='0';
    if(button.parentElement!==row)row.appendChild(button);
    return true;
  }
  if(!button.isConnected&&edgeTools)edgeTools.append(button);
  return false;
}
place();

function scaleTolerance(m,faceIndices){
  const box=new THREE.Box3();
  for(const fi of faceIndices)for(const vi of m.faces[fi]||[]){const v=m.vertices[vi];if(v)box.expandByPoint(v);}
  const size=box.getSize(new THREE.Vector3()).length();
  return Math.max(1e-7,size*1e-6);
}

function joinInfo(m,edgeIndex){
  const edge=m?.edges?.()?.[edgeIndex];
  if(!edge||edge.loose)return{ok:false,reason:'Select one regular shared edge'};
  const realFaces=(edge.faces||[]).filter(fi=>Number.isInteger(fi)&&fi>=0&&Array.isArray(m.faces[fi]));
  if(realFaces.length!==2)return{ok:false,reason:'Edge must separate exactly two faces'};

  const edgeKey=m.edgeKey(edge.a,edge.b);
  if((m.creases?.get?.(edgeKey)||0)>0)return{ok:false,reason:'Creased edges cannot be joined'};

  const dissolve=m.dissolveEdgeInfo?.(edgeIndex);
  if(!dissolve)return{ok:false,reason:'Faces cannot be safely merged'};

  const [f0,f1]=realFaces,n0=m.faceNormal(f0),n1=m.faceNormal(f1);
  if(!n0||!n1||n0.lengthSq()<1e-12||n1.lengthSq()<1e-12)return{ok:false,reason:'Face normal is invalid'};
  if(n0.dot(n1)<0.99999)return{ok:false,reason:'Faces are not coplanar'};

  const origin=m.vertices[m.faces[f0][0]];
  if(!origin)return{ok:false,reason:'Face geometry is invalid'};
  const tol=scaleTolerance(m,realFaces);
  for(const fi of realFaces){
    for(const vi of m.faces[fi]){
      const v=m.vertices[vi];
      if(!v||Math.abs(v.clone().sub(origin).dot(n0))>tol)return{ok:false,reason:'Faces are not on the same plane'};
    }
  }

  return{ok:true,edgeIndex,edgeKey,faceIndices:realFaces,dissolve,tolerance:tol};
}

function applyJoin(){
  const m=mesh(),ids=selectedEdges(),history=globalThis.__boxlabHistory;
  if(!m||ids.length!==1||!history)return;
  const info=joinInfo(m,ids[0]);
  if(!info.ok){if(status)status.textContent=`Join Coplanar • ${info.reason}`;sync();return;}

  const before=m.clone();
  history.push(before);
  const result=m.dissolveEdge(ids[0]);
  if(!result){
    if(status)status.textContent='Join Coplanar • merge failed';
    return;
  }

  bridge()?.set?.('edge',[]);
  if(multiToggle?.checked){multiToggle.checked=false;multiToggle.dispatchEvent(new Event('change',{bubbles:true}));}
  const faceMode=document.querySelector('#selectionModes button[data-mode="face"]');
  if(faceMode&&!faceMode.classList.contains('active'))faceMode.click();
  queueMicrotask(()=>{
    bridge()?.set?.('face',[result.faceIndex]);
    render();
    if(status)status.textContent=`Join Coplanar • 2 faces → 1 face • result selected`;
  });
}

function sync(){
  place();
  const m=mesh(),ids=selectedEdges();
  const info=m&&ids.length===1?joinInfo(m,ids[0]):null;
  button.disabled=!info?.ok;
  button.title=info?.ok?'Join the two coplanar faces across this edge':(info?.reason||'Select one shared edge between coplanar faces');
}

button.addEventListener('click',applyJoin);
window.addEventListener('boxlab-bridge-state',sync);
document.addEventListener('pointerup',()=>queueMicrotask(sync),true);
document.querySelectorAll('#selectionModes button').forEach(b=>b.addEventListener('click',()=>queueMicrotask(sync)));
setTimeout(sync,0);

globalThis.__boxlabJoinCoplanar={version:'0.36.18.75',info:joinInfo,apply:applyJoin};
