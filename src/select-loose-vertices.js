// BoxLab v0.36.18.50 — non-destructive Vertex topology inspection.
// Selects vertices that are not referenced by any face and are not endpoints
// of any edge. Geometry and history are untouched.

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
  const used=new Set();
  for(const face of m.faces||[])if(Array.isArray(face))for(const v of face)if(Number.isInteger(v))used.add(v);
  for(const edge of m.edges?.()||[]){
    if(Number.isInteger(edge?.a))used.add(edge.a);
    if(Number.isInteger(edge?.b))used.add(edge.b);
  }
  const indices=[];
  for(let i=0;i<(m.vertices?.length||0);i++)if(m.vertices[i]&&!used.has(i))indices.push(i);
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
      ?`Loose Vertices • ${info.count} vertex${info.count===1?'':'es'} selected`
      :'Topology check • 0 loose vertices';
  });
}

function sync(){
  const m=mesh();button.disabled=!m;
  if(!m){button.title='No editable mesh';return;}
  const info=inspect(m);
  button.title=info.count?`Select ${info.count} loose vertex${info.count===1?'':'es'}`:'No loose vertices found';
}

button.addEventListener('click',apply);
window.addEventListener('boxlab-bridge-state',sync);
document.addEventListener('pointerup',()=>queueMicrotask(sync),true);
setTimeout(sync,0);

globalThis.__boxlabSelectLooseVertices={version:'0.36.18.50',inspect,apply};
