// BoxLab v0.36.18.46 — non-destructive Face topology inspection.
// Selects all triangular faces. Geometry/history untouched.

const status=document.querySelector('#selectionStatus');
const faceTools=document.querySelector('[data-mode-tools="face"]');
const ngonsButton=document.querySelector('#selectNgonsBtn');
const multiToggle=document.querySelector('#multiSelectToggle');

function state(){return globalThis.__boxlabBridgeState;}
function bridge(){return globalThis.__boxlabSelectionBridge;}
function mesh(){return state()?.mesh||null;}
function render(){document.querySelector('#cageToggle')?.dispatchEvent(new Event('change',{bubbles:true}));}

const host=document.createElement('div');
host.className='outliner-actions';
host.style.gridTemplateColumns='1fr';
const button=document.createElement('button');
button.id='selectTrianglesBtn';
button.type='button';
button.textContent='Select Triangles';
host.appendChild(button);
const ngonHost=ngonsButton?.parentElement;
if(ngonHost?.parentElement)ngonHost.parentElement.insertBefore(host,ngonHost.nextSibling);
else faceTools?.appendChild(host);

function inspect(m){
  if(!m)return{indices:[],count:0};
  const indices=[];
  m.faces.forEach((face,index)=>{if(Array.isArray(face)&&face.length===3)indices.push(index);});
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
      ?`Triangles • ${info.count} face${info.count===1?'':'s'} selected`
      :'Topology check • 0 triangles';
  });
}

function sync(){
  const m=mesh();button.disabled=!m;
  if(!m){button.title='No editable mesh';return;}
  const info=inspect(m);
  button.title=info.count
    ?`Select ${info.count} triangular face${info.count===1?'':'s'}`
    :'No triangles found';
}

button.addEventListener('click',apply);
window.addEventListener('boxlab-bridge-state',sync);
document.addEventListener('pointerup',()=>queueMicrotask(sync),true);
setTimeout(sync,0);

globalThis.__boxlabSelectTriangles={version:'0.36.18.46',inspect,apply};
