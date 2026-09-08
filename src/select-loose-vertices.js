// BoxLab v0.36.18.52 — non-destructive Vertex topology inspection.
// Prefer BoxLab's explicit looseVertices topology state, with a zero-real-face
// fallback for genuinely orphaned vertices. Geometry/history are untouched.

const status=document.querySelector('#selectionStatus');
const vertexTools=document.querySelector('[data-mode-tools="vertex"]');
const multiToggle=document.querySelector('#multiSelectToggle');

function state(){return globalThis.__boxlabBridgeState;}
function bridge(){return globalThis.__boxlabSelectionBridge;}
function mesh(){return state()?.mesh||null;}
function render(){document.querySelector('#cageToggle')?.dispatchEvent(new Event('change',{bubbles:true}));}

const host=document.createElement('div');
host.className='outliner-actions';
host.style.gridTemplateColumns='1fr';
const button=document.createElement('button');
button.id='selectLooseVerticesBtn';button.type='button';button.textContent='Select Loose Vertices';
host.appendChild(button);
const cleanButton=document.querySelector('#cleanVerticesBtn');
const anchor=cleanButton?.parentElement;
if(anchor?.parentElement)anchor.parentElement.insertBefore(host,anchor.nextSibling);else vertexTools?.appendChild(host);

function inspect(m){
  if(!m)return{indices:[],explicit:0,orphan:0,count:0};
  const loose=new Set();
  for(const v of m.looseVertices||[]){
    if(Number.isInteger(v)&&m.vertices?.[v])loose.add(v);
  }

  const faceUsed=new Set();
  for(let fi=0;fi<(m.faces?.length||0);fi++){
    const face=m.faces[fi];
    if(!Array.isArray(face)||face.length<3)continue;
    for(const v of face)if(Number.isInteger(v))faceUsed.add(v);
  }

  let orphan=0;
  for(let i=0;i<(m.vertices?.length||0);i++){
    if(!m.vertices[i]||faceUsed.has(i)||loose.has(i))continue;
    loose.add(i);orphan++;
  }
  const indices=[...loose].sort((a,b)=>a-b);
  return{indices,explicit:indices.length-orphan,orphan,count:indices.length};
}

function apply(){
  const m=mesh();if(!m)return;
  const info=inspect(m);
  const vertexMode=document.querySelector('#selectionModes button[data-mode="vertex"]');
  if(vertexMode&&!vertexMode.classList.contains('active'))vertexMode.click();
  queueMicrotask(()=>{
    if(multiToggle){
      const wanted=info.indices.length>1;
      if(multiToggle.checked!==wanted){multiToggle.checked=wanted;multiToggle.dispatchEvent(new Event('change',{bubbles:true}));}
    }
    const ok=!!bridge()?.set?.('vertex',info.indices);
    render();
    if(status)status.textContent=info.count
      ?`Loose Vertices • ${info.count} vertex${info.count===1?'':'es'} selected • ${info.explicit} explicit • ${info.orphan} orphan`
      :(ok?'Topology check • 0 loose vertices':'Loose Vertices • selection handoff failed');
  });
}

function sync(){
  const m=mesh();button.disabled=!m;
  if(!m){button.title='No editable mesh';return;}
  const info=inspect(m);
  button.title=info.count?`Select ${info.count} loose/orphan vertex${info.count===1?'':'es'}`:'No loose vertices found';
}

button.addEventListener('click',apply);
window.addEventListener('boxlab-bridge-state',sync);
document.addEventListener('pointerup',()=>queueMicrotask(sync),true);
setTimeout(sync,0);

globalThis.__boxlabSelectLooseVertices={version:'0.36.18.52',inspect,apply};
