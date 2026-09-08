// BoxLab v0.36.18.54 — diagnostic-only Vertex topology inspection.
// Reports exactly which vertex indices exist, which are referenced by faces,
// and which are classified as loose candidates. Geometry/history are untouched.

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
function list(values){return values.length?values.join(','):'—';}

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
  if(!m)return{indices:[],all:[],faceUsed:[],explicit:[],orphan:[],count:0,vertices:0,faces:0};

  const all=[];
  for(let i=0;i<(m.vertices?.length||0);i++)if(m.vertices[i])all.push(i);

  const faceUsedSet=new Set();
  let realFaces=0;
  for(let fi=0;fi<(m.faces?.length||0);fi++){
    const face=m.faces[fi];
    if(!Array.isArray(face)||face.length<3)continue;
    realFaces++;
    for(const v of face)if(Number.isInteger(v)&&m.vertices?.[v])faceUsedSet.add(v);
  }

  const explicitSet=new Set();
  for(const v of m.looseVertices||[]){
    if(Number.isInteger(v)&&m.vertices?.[v])explicitSet.add(v);
  }

  const orphan=[];
  for(const i of all){
    if(!faceUsedSet.has(i)&&!explicitSet.has(i))orphan.push(i);
  }

  const looseSet=new Set([...explicitSet,...orphan]);
  const indices=[...looseSet].sort((a,b)=>a-b);
  const faceUsed=[...faceUsedSet].sort((a,b)=>a-b);
  const explicit=[...explicitSet].sort((a,b)=>a-b);

  return{indices,all,faceUsed,explicit,orphan,count:indices.length,vertices:all.length,faces:realFaces};
}

function apply(){
  const m=mesh();
  if(!m){if(status)status.textContent='LooseDiag • no active mesh';return;}
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
    const message=`LooseDiag • All:[${list(info.all)}] • Face:[${list(info.faceUsed)}] • Loose:[${list(info.indices)}]${ok?'':' • handoff failed'}`;
    if(status)status.textContent=message;
    console.info('BoxLab LooseDiag 18.54',{
      all:info.all,
      faceUsed:info.faceUsed,
      explicitLoose:info.explicit,
      orphanLoose:info.orphan,
      loose:info.indices,
      vertices:info.vertices,
      faces:info.faces
    });
  });
}

function sync(){
  const m=mesh();button.disabled=!m;
  if(!m){button.title='No editable mesh';return;}
  const info=inspect(m);
  button.title=`All [${list(info.all)}] • Face [${list(info.faceUsed)}] • Loose [${list(info.indices)}]`;
}

button.addEventListener('click',apply);
window.addEventListener('boxlab-bridge-state',sync);
document.addEventListener('pointerup',()=>queueMicrotask(sync),true);
setTimeout(sync,0);

globalThis.__boxlabSelectLooseVertices={version:'0.36.18.54',inspect,apply};
