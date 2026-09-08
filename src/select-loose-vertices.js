// BoxLab v0.36.18.53 — non-destructive Vertex topology inspection.
// Read a freshly saved snapshot of the active object's live mesh from the object
// manager, then select explicit loose vertices plus zero-real-face orphans.
// Geometry/history are untouched.

const status=document.querySelector('#selectionStatus');
const vertexTools=document.querySelector('[data-mode-tools="vertex"]');
const multiToggle=document.querySelector('#multiSelectToggle');

function state(){return globalThis.__boxlabBridgeState;}
function bridge(){return globalThis.__boxlabSelectionBridge;}
function mesh(){
  const manager=globalThis.__boxlabObjectManager;
  if(manager){
    const activeId=manager.activeId;
    const objects=manager.objects||[]; // getter saves the live active mesh first
    const active=objects.find(object=>object.id===activeId);
    if(active?.mesh)return active.mesh;
  }
  return state()?.mesh||null;
}
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
  if(!m)return{indices:[],explicit:0,orphan:0,count:0,vertices:0,faces:0};
  const loose=new Set();
  for(const v of m.looseVertices||[]){
    if(Number.isInteger(v)&&m.vertices?.[v])loose.add(v);
  }
  const faceUsed=new Set();
  let realFaces=0;
  for(let fi=0;fi<(m.faces?.length||0);fi++){
    const face=m.faces[fi];
    if(!Array.isArray(face)||face.length<3)continue;
    realFaces++;
    for(const v of face)if(Number.isInteger(v))faceUsed.add(v);
  }
  let orphan=0;
  for(let i=0;i<(m.vertices?.length||0);i++){
    if(!m.vertices[i]||faceUsed.has(i)||loose.has(i))continue;
    loose.add(i);orphan++;
  }
  const indices=[...loose].sort((a,b)=>a-b);
  return{indices,explicit:indices.length-orphan,orphan,count:indices.length,vertices:m.vertices?.length||0,faces:realFaces};
}

function apply(){
  const m=mesh();
  if(!m){if(status)status.textContent='Loose Vertices • no active mesh';return;}
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
      ?`Loose Vertices • ${info.count} selected • mesh ${info.vertices} verts / ${info.faces} faces • ${info.explicit} explicit • ${info.orphan} orphan`
      :`Loose Vertices • 0 found • mesh ${info.vertices} verts / ${info.faces} faces${ok?'':' • selection handoff failed'}`;
  });
}

function sync(){
  const m=mesh();button.disabled=!m;
  if(!m){button.title='No editable mesh';return;}
  const info=inspect(m);
  button.title=info.count?`Select ${info.count} loose/orphan vertex${info.count===1?'':'es'}`:`0 loose vertices in ${info.vertices}-vertex mesh`;
}

button.addEventListener('click',apply);
window.addEventListener('boxlab-bridge-state',sync);
document.addEventListener('pointerup',()=>queueMicrotask(sync),true);
setTimeout(sync,0);

globalThis.__boxlabSelectLooseVertices={version:'0.36.18.53',inspect,apply};
