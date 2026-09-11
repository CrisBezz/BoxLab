// BoxLab v0.36.18.132 — non-destructive Tris-to-Quads candidate inspection.
// Finds manifold interior edges shared by exactly two triangular faces where
// the combined region forms a simple four-vertex / four-boundary-edge patch.
// Geometry/history are untouched.

const faceTools=document.querySelector('[data-mode-tools="face"]');
const status=document.querySelector('#selectionStatus');
const multiToggle=document.querySelector('#multiSelectToggle');

function state(){return globalThis.__boxlabBridgeState;}
function bridge(){return globalThis.__boxlabSelectionBridge;}
function mesh(){return state()?.mesh||null;}
function render(){document.querySelector('#cageToggle')?.dispatchEvent(new Event('change',{bubbles:true}));}
function validOwners(m,edge){return (edge?.faces||[]).filter(fi=>Number.isInteger(fi)&&fi>=0&&fi<m.faces.length&&Array.isArray(m.faces[fi]));}
function key(a,b){return a<b?`${a}:${b}`:`${b}:${a}`;}

const row=document.createElement('div');
row.id='triPairCandidateRow';
row.className='outliner-actions';
row.style.cssText='grid-template-columns:1fr;margin:4px 0 0';

const button=document.createElement('button');
button.id='selectTriPairCandidatesBtn';
button.type='button';
button.textContent='Tri Pair Candidates';
button.disabled=true;
button.style.cssText='width:100%;min-width:0;font-size:10px;padding:5px 4px';
row.append(button);

function place(){
  if(row.isConnected)return true;
  const patchHost=document.querySelector('#isolatedNonQuadFaceSelectionHost')||document.querySelector('#quadPatchFaceSelectionHost');
  if(patchHost?.parentElement){patchHost.insertAdjacentElement('afterend',row);return true;}
  const inspection=document.querySelector('#faceInspectionRow');
  if(inspection?.parentElement){inspection.insertAdjacentElement('afterend',row);return true;}
  if(faceTools){faceTools.appendChild(row);return true;}
  return false;
}

function candidatePair(m,edge){
  const owners=validOwners(m,edge);
  if(owners.length!==2)return null;
  const f0=m.faces[owners[0]],f1=m.faces[owners[1]];
  if(!Array.isArray(f0)||!Array.isArray(f1)||f0.length!==3||f1.length!==3)return null;

  const vertices=[...new Set([...f0,...f1])];
  if(vertices.length!==4)return null;

  const counts=new Map();
  for(const face of [f0,f1]){
    for(let i=0;i<face.length;i++){
      const a=face[i],b=face[(i+1)%face.length],k=key(a,b);
      counts.set(k,(counts.get(k)||0)+1);
    }
  }
  const boundaryKeys=[...counts].filter(([,count])=>count===1).map(([k])=>k);
  if(boundaryKeys.length!==4)return null;

  const degree=new Map(vertices.map(v=>[v,0]));
  for(const k of boundaryKeys){
    const [a,b]=k.split(':').map(Number);
    if(!degree.has(a)||!degree.has(b))return null;
    degree.set(a,degree.get(a)+1);
    degree.set(b,degree.get(b)+1);
  }
  if([...degree.values()].some(value=>value!==2))return null;

  return{faces:owners.slice().sort((a,b)=>a-b),edgeVertices:[edge.a,edge.b]};
}

function inspect(m){
  if(!m)return{faces:[],pairs:[],pairCount:0};
  const pairs=[];
  (m.edges?.()||[]).forEach((edge,index)=>{
    const pair=candidatePair(m,edge);
    if(pair)pairs.push({edge:index,...pair});
  });
  const faces=[...new Set(pairs.flatMap(pair=>pair.faces))].sort((a,b)=>a-b);
  return{faces,pairs,pairCount:pairs.length};
}

function apply(){
  const m=mesh();if(!m)return;
  const info=inspect(m);
  const faceMode=document.querySelector('#selectionModes button[data-mode="face"]');
  if(faceMode&&!faceMode.classList.contains('active'))faceMode.click();
  queueMicrotask(()=>{
    if(multiToggle){
      const wanted=info.faces.length>1;
      if(multiToggle.checked!==wanted){multiToggle.checked=wanted;multiToggle.dispatchEvent(new Event('change',{bubbles:true}));}
    }
    bridge()?.set?.('face',info.faces);
    render();
    if(status)status.textContent=info.pairCount
      ?`Tri Pair Candidates • ${info.pairCount} pair${info.pairCount===1?'':'s'} • ${info.faces.length} triangle${info.faces.length===1?'':'s'} selected`
      :'Tri Pair Candidates • 0 compatible pairs';
  });
}

function sync(){
  place();
  const m=mesh(),info=m?inspect(m):null;
  button.disabled=!m;
  button.title=m
    ?`Select triangles participating in topology-safe quad-pair candidates • ${info.pairCount} pair${info.pairCount===1?'':'s'} • ${info.faces.length} faces`
    :'No editable mesh';
}

button.addEventListener('click',apply);
window.addEventListener('boxlab-bridge-state',sync);
document.addEventListener('pointerup',()=>queueMicrotask(sync),true);
document.querySelectorAll('#selectionModes button').forEach(button=>button.addEventListener('click',()=>queueMicrotask(sync)));
[0,40,120,300,700,1000].forEach(delay=>setTimeout(sync,delay));

globalThis.__boxlabSelectTriPairs={version:'0.36.18.132',inspect,apply,sync};
