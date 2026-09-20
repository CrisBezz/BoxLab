// BoxLab v0.36.18.64 — non-destructive Face winding inspection.
// Selects faces participating in a shared edge whose two face loops traverse
// that edge in the same direction, indicating inconsistent/flipped winding.
// Geometry/history are untouched.

const status=document.querySelector('#selectionStatus');
const faceTools=document.querySelector('[data-mode-tools="face"]');
const multiToggle=document.querySelector('#multiSelectToggle');

function state(){return globalThis.__boxlabBridgeState;}
function bridge(){return globalThis.__boxlabSelectionBridge;}
function mesh(){return state()?.mesh||null;}
function render(){document.querySelector('#cageToggle')?.dispatchEvent(new Event('change',{bubbles:true}));}

const button=document.createElement('button');
button.id='selectInconsistentWindingBtn';
button.type='button';
button.textContent='Winding';
button.style.width='100%';
button.style.minWidth='0';
button.style.fontSize='9px';
button.style.padding='5px 3px';

function place(){
  const existing=document.querySelector('#degenerateFaceInspectionRow');
  if(existing){
    // Keep the lower inspection group readable on iPad: three columns with wrapping.
    existing.style.gridTemplateColumns='repeat(3,minmax(0,1fr))';
    if(button.parentElement!==existing)existing.appendChild(button);
    for(const id of ['selectDegenerateFacesBtn','selectDuplicateFacesBtn','selectIsolatedFacesBtn','selectBoundaryFacesBtn','selectInteriorFacesBtn','selectNonManifoldFacesBtn']){
      const b=document.querySelector(`#${id}`);
      if(b){b.style.minWidth='0';b.style.padding='5px 3px';b.style.fontSize='9px';}
    }
    return true;
  }
  return false;
}

function edgeKey(a,b){return a<b?`${a}:${b}`:`${b}:${a}`;}

function inspect(m){
  if(!m)return{indices:[],count:0,edges:0};
  const faces=m.faces||[];
  const edgeUses=new Map();

  faces.forEach((face,faceIndex)=>{
    if(!Array.isArray(face)||face.length<3)return;
    for(let i=0;i<face.length;i++){
      const a=face[i],b=face[(i+1)%face.length];
      if(!Number.isInteger(a)||!Number.isInteger(b)||a===b)continue;
      const key=edgeKey(a,b);
      const uses=edgeUses.get(key)||[];
      uses.push({faceIndex,a,b});
      edgeUses.set(key,uses);
    }
  });

  const selected=new Set();
  let inconsistentEdges=0;
  for(const uses of edgeUses.values()){
    // Only a clean two-face shared edge has an unambiguous winding comparison.
    if(uses.length!==2)continue;
    const first=uses[0],second=uses[1];
    if(first.a===second.a&&first.b===second.b){
      inconsistentEdges++;
      selected.add(first.faceIndex);
      selected.add(second.faceIndex);
    }
  }

  const indices=[...selected].sort((a,b)=>a-b);
  return{indices,count:indices.length,edges:inconsistentEdges};
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
      ?`Inconsistent Winding • ${info.count} face${info.count===1?'':'s'} selected • ${info.edges} shared edge${info.edges===1?'':'s'}`
      :'Topology check • 0 inconsistent winding edges';
  });
}

function sync(){
  place();
  const m=mesh();
  button.disabled=!m;
  if(!m){button.title='No editable mesh';return;}
  const info=inspect(m);
  button.title=info.count
    ?`Select ${info.count} face${info.count===1?'':'s'} participating in ${info.edges} same-direction shared edge${info.edges===1?'':'s'}`
    :'No inconsistent face winding found';
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

globalThis.__boxlabSelectInconsistentWinding={version:'0.36.18.64',inspect,apply};
