// BoxLab v0.36.18.45 — non-destructive Face topology inspection.
// Selects all regular faces with five or more vertices. Geometry/history untouched.

const status=document.querySelector('#selectionStatus');
const faceTools=document.querySelector('[data-mode-tools="face"]');
const deleteFaceButton=document.querySelector('#deleteFaceBtn');
const multiToggle=document.querySelector('#multiSelectToggle');

function state(){return globalThis.__boxlabBridgeState;}
function bridge(){return globalThis.__boxlabSelectionBridge;}
function mesh(){return state()?.mesh||null;}
function render(){document.querySelector('#cageToggle')?.dispatchEvent(new Event('change',{bubbles:true}));}

const host=document.createElement('div');
host.className='outliner-actions';
host.style.gridTemplateColumns='1fr';
const button=document.createElement('button');
button.id='selectNgonsBtn';
button.type='button';
button.textContent='Select Ngons';
host.appendChild(button);
const topologyRow=deleteFaceButton?.parentElement;
if(topologyRow?.parentElement)topologyRow.parentElement.insertBefore(host,topologyRow.nextSibling);
else faceTools?.appendChild(host);

function inspect(m){
  if(!m)return{indices:[],count:0,maxSides:0};
  const indices=[];let maxSides=0;
  m.faces.forEach((face,index)=>{
    if(!Array.isArray(face))return;
    if(face.length>=5){indices.push(index);maxSides=Math.max(maxSides,face.length);}
  });
  return{indices,count:indices.length,maxSides};
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
    if(status){
      status.textContent=info.count
        ?`Ngons • ${info.count} face${info.count===1?'':'s'} selected • largest ${info.maxSides} sides`
        :'Topology check • 0 ngons';
    }
  });
}

function sync(){
  const m=mesh();button.disabled=!m;
  if(!m){button.title='No editable mesh';return;}
  const info=inspect(m);
  button.title=info.count
    ?`Select ${info.count} face${info.count===1?'':'s'} with 5+ sides`
    :'No ngons found';
}

button.addEventListener('click',apply);
window.addEventListener('boxlab-bridge-state',sync);
document.addEventListener('pointerup',()=>queueMicrotask(sync),true);
setTimeout(sync,0);

globalThis.__boxlabSelectNgons={version:'0.36.18.45',inspect,apply};
