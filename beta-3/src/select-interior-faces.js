// BoxLab v0.36.18.62 — non-destructive interior/manifold Face inspection.
// Selects faces whose every edge has exactly two real face users.
// Geometry/history are untouched.

const status=document.querySelector('#selectionStatus');
const faceTools=document.querySelector('[data-mode-tools="face"]');
const multiToggle=document.querySelector('#multiSelectToggle');

function state(){return globalThis.__boxlabBridgeState;}
function bridge(){return globalThis.__boxlabSelectionBridge;}
function mesh(){return state()?.mesh||null;}
function render(){document.querySelector('#cageToggle')?.dispatchEvent(new Event('change',{bubbles:true}));}

const button=document.createElement('button');
button.id='selectInteriorFacesBtn';
button.type='button';
button.textContent='Interior';
button.style.width='100%';
button.style.minWidth='0';
button.style.fontSize='9px';
button.style.padding='5px 3px';

function place(){
  const existing=document.querySelector('#degenerateFaceInspectionRow');
  if(existing){
    // Five labels are too tight in one row on the iPad drawer. Keep this
    // inspection group compact but readable as a deterministic 3 + 2 wrap.
    existing.style.gridTemplateColumns='repeat(3,minmax(0,1fr))';
    if(button.parentElement!==existing)existing.appendChild(button);
    for(const id of ['selectDegenerateFacesBtn','selectDuplicateFacesBtn','selectIsolatedFacesBtn','selectBoundaryFacesBtn']){
      const b=document.querySelector(`#${id}`);
      if(b){b.style.minWidth='0';b.style.padding='5px 3px';b.style.fontSize='9px';}
    }
    return true;
  }
  return false;
}

function edgeKey(a,b){return a<b?`${a}:${b}`:`${b}:${a}`;}

function inspect(m){
  if(!m)return{indices:[],count:0};
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

  const indices=[];
  faces.forEach((face,faceIndex)=>{
    if(!Array.isArray(face)||face.length<3)return;
    let interior=true;
    for(let i=0;i<face.length;i++){
      const a=face[i],b=face[(i+1)%face.length];
      if(!Number.isInteger(a)||!Number.isInteger(b)||a===b){interior=false;break;}
      if((edgeOwners.get(edgeKey(a,b))||[]).length!==2){interior=false;break;}
    }
    if(interior)indices.push(faceIndex);
  });

  return{indices,count:indices.length};
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
      ?`Interior Faces • ${info.count} face${info.count===1?'':'s'} selected`
      :'Topology check • 0 interior faces';
  });
}

function sync(){
  place();
  const m=mesh();
  button.disabled=!m;
  if(!m){button.title='No editable mesh';return;}
  const info=inspect(m);
  button.title=info.count
    ?`Select ${info.count} face${info.count===1?'':'s'} whose edges each have exactly two face users`
    :'No fully manifold/interior faces found';
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

globalThis.__boxlabSelectInteriorFaces={version:'0.36.18.62',inspect,apply};
