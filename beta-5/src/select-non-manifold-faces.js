// BoxLab v0.36.18.63 — non-destructive non-manifold Face inspection.
// Selects faces touching at least one edge used by more than two real faces.
// Geometry/history are untouched.

const status=document.querySelector('#selectionStatus');
const faceTools=document.querySelector('[data-mode-tools="face"]');
const multiToggle=document.querySelector('#multiSelectToggle');

function state(){return globalThis.__boxlabBridgeState;}
function bridge(){return globalThis.__boxlabSelectionBridge;}
function mesh(){return state()?.mesh||null;}
function render(){document.querySelector('#cageToggle')?.dispatchEvent(new Event('change',{bubbles:true}));}

const button=document.createElement('button');
button.id='selectNonManifoldFacesBtn';
button.type='button';
button.textContent='Non-Manifold';
button.style.width='100%';
button.style.minWidth='0';
button.style.fontSize='9px';
button.style.padding='5px 3px';

function place(){
  const existing=document.querySelector('#degenerateFaceInspectionRow');
  if(existing){
    // Keep six lower diagnostics as two rows of three for the iPad drawer.
    existing.style.gridTemplateColumns='repeat(3,minmax(0,1fr))';
    if(button.parentElement!==existing)existing.appendChild(button);
    for(const id of ['selectDegenerateFacesBtn','selectDuplicateFacesBtn','selectIsolatedFacesBtn','selectBoundaryFacesBtn','selectInteriorFacesBtn']){
      const b=document.querySelector(`#${id}`);
      if(b){b.style.minWidth='0';b.style.padding='5px 3px';b.style.fontSize='9px';}
    }
    return true;
  }
  return false;
}

function edgeKey(a,b){return a<b?`${a}:${b}`:`${b}:${a}`;}

function inspect(m){
  if(!m)return{indices:[],count:0,nonManifoldEdges:0};
  const faces=m.faces||[];
  const edgeOwners=new Map();

  faces.forEach((face,faceIndex)=>{
    if(!Array.isArray(face)||face.length<3)return;
    for(let i=0;i<face.length;i++){
      const a=face[i],b=face[(i+1)%face.length];
      if(!Number.isInteger(a)||!Number.isInteger(b)||a===b)continue;
      const key=edgeKey(a,b);
      const owners=edgeOwners.get(key)||[];
      owners.push(faceIndex);
      edgeOwners.set(key,owners);
    }
  });

  const selected=new Set();
  let nonManifoldEdges=0;
  for(const owners of edgeOwners.values()){
    if(owners.length<=2)continue;
    nonManifoldEdges++;
    for(const faceIndex of owners)selected.add(faceIndex);
  }

  const indices=[...selected].sort((a,b)=>a-b);
  return{indices,count:indices.length,nonManifoldEdges};
}

function apply(){
  const m=mesh();if(!m)return;
  const info=inspect(m);
  const faceMode=document.querySelector('#selectionModes button[data-mode="face"]');
  if(faceMode&&!faceMode.classList.contains('active'))faceMode.click();
  queueMicrotask(()=>{
    if(multiToggle){
      const wanted=info.indices.length>1;
      if(multiToggle.checked!==wanted){multiToggle.checked=wanted;multiToggle.dispatchEvent(new Event('change',{bubbles:true}));}
    }
    bridge()?.set?.('face',info.indices);
    render();
    if(status)status.textContent=info.count
      ?`Non-Manifold Faces • ${info.count} face${info.count===1?'':'s'} selected • ${info.nonManifoldEdges} edge${info.nonManifoldEdges===1?'':'s'} >2 users`
      :'Topology check • 0 non-manifold faces';
  });
}

function sync(){
  place();
  const m=mesh();
  button.disabled=!m;
  if(!m){button.title='No editable mesh';return;}
  const info=inspect(m);
  button.title=info.count
    ?`Select ${info.count} face${info.count===1?'':'s'} touching ${info.nonManifoldEdges} edge${info.nonManifoldEdges===1?'':'s'} used by more than two faces`
    :'No faces touch an edge with more than two users';
}

button.addEventListener('click',apply);
window.addEventListener('boxlab-bridge-state',sync);
document.addEventListener('pointerup',()=>queueMicrotask(sync),true);
[0,40,120,300,700].forEach(delay=>setTimeout(sync,delay));

setTimeout(()=>{
  if(button.isConnected)return;
  const host=document.createElement('div');
  host.className='outliner-actions';
  host.style.cssText='grid-template-columns:1fr;margin-top:4px';
  host.appendChild(button);
  const row=document.querySelector('#faceInspectionRow');
  if(row?.parentElement)row.insertAdjacentElement('afterend',host);else faceTools?.appendChild(host);
},900);

globalThis.__boxlabSelectNonManifoldFaces={version:'0.36.18.63',inspect,apply};
