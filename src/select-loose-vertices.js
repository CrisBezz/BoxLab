// BoxLab v0.36.18.55 — Select Loose Vertices from live viewport topology.
// The object-manager snapshot can omit isolated live vertices. Use the vertex
// markers currently rendered by BoxLab as the authoritative live vertex index
// set, then subtract all vertices referenced by real faces. Selection only.

const status=document.querySelector('#selectionStatus');
const vertexTools=document.querySelector('[data-mode-tools="vertex"]');
const multiToggle=document.querySelector('#multiSelectToggle');

function state(){return globalThis.__boxlabBridgeState;}
function bridge(){return globalThis.__boxlabSelectionBridge;}
function mesh(){
  const manager=globalThis.__boxlabObjectManager;
  if(manager){
    const activeId=manager.activeId;
    const objects=manager.objects||[];
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

function liveVertexIndices(){
  const found=new Set();
  const scene=state()?.scene;
  scene?.traverse?.(object=>{
    if(object?.userData?.kind!=='vertex')return;
    const index=object.userData.index;
    if(Number.isInteger(index))found.add(index);
  });
  return[...found].sort((a,b)=>a-b);
}

function inspect(m){
  if(!m)return{indices:[],all:[],faceUsed:[],count:0,vertices:0,faces:0};

  const fallback=[];
  for(let i=0;i<(m.vertices?.length||0);i++)if(m.vertices[i])fallback.push(i);
  const live=liveVertexIndices();
  const all=live.length?live:fallback;

  const faceUsedSet=new Set();
  let realFaces=0;
  for(let fi=0;fi<(m.faces?.length||0);fi++){
    const face=m.faces[fi];
    if(!Array.isArray(face)||face.length<3)continue;
    realFaces++;
    for(const v of face)if(Number.isInteger(v))faceUsedSet.add(v);
  }

  const indices=all.filter(index=>!faceUsedSet.has(index));
  const faceUsed=[...faceUsedSet].sort((a,b)=>a-b);
  return{indices,all,faceUsed,count:indices.length,vertices:all.length,faces:realFaces};
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
      ?`Loose Vertices • ${info.count} selected • Live:[${list(info.all)}] • Face:[${list(info.faceUsed)}] • Loose:[${list(info.indices)}]${ok?'':' • handoff failed'}`
      :`Loose Vertices • 0 found • Live:[${list(info.all)}] • Face:[${list(info.faceUsed)}]${ok?'':' • handoff failed'}`;
  });
}

function sync(){
  const m=mesh();button.disabled=!m;
  if(!m){button.title='No editable mesh';return;}
  const info=inspect(m);
  button.title=info.count?`Select ${info.count} live loose vertex${info.count===1?'':'es'}`:'No loose vertices found';
}

button.addEventListener('click',apply);
window.addEventListener('boxlab-bridge-state',sync);
document.addEventListener('pointerup',()=>queueMicrotask(sync),true);
setTimeout(sync,0);

globalThis.__boxlabSelectLooseVertices={version:'0.36.18.55',inspect,apply,liveVertexIndices};
