// BoxLab v0.36.18.51 — non-destructive Vertex topology inspection.
// A loose vertex is any vertex that is not referenced by a face. This includes
// isolated vertices and endpoints of intentional loose/wire edges. Geometry and
// history are untouched.

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
  if(!m)return{indices:[],count:0};
  const faceUsed=new Set();
  for(const face of m.faces||[]){
    if(!Array.isArray(face))continue;
    for(const v of face)if(Number.isInteger(v))faceUsed.add(v);
  }
  const indices=[];
  for(let i=0;i<(m.vertices?.length||0);i++){
    if(m.vertices[i]&&!faceUsed.has(i))indices.push(i);
  }
  return{indices,count:indices.length};
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
    bridge()?.set?.('vertex',info.indices);
    render();
    if(status)status.textContent=info.count
      ?`Loose Vertices • ${info.count} vertex${info.count===1?'':'es'} selected • zero face use`
      :'Topology check • 0 loose vertices';
  });
}

function sync(){
  const m=mesh();button.disabled=!m;
  if(!m){button.title='No editable mesh';return;}
  const info=inspect(m);
  button.title=info.count?`Select ${info.count} vertex${info.count===1?'':'es'} used by zero faces`:'No loose vertices found';
}

button.addEventListener('click',apply);
window.addEventListener('boxlab-bridge-state',sync);
document.addEventListener('pointerup',()=>queueMicrotask(sync),true);
setTimeout(sync,0);

globalThis.__boxlabSelectLooseVertices={version:'0.36.18.51',inspect,apply};
