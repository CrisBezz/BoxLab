// BoxLab v0.36.18.72 — non-destructive detached Face-island selection.
// Finds edge-connected Face components and selects every Face outside the
// largest component. This catches detached multi-Face shells that Isolated
// Faces intentionally does not. Geometry/history are untouched.

const status=document.querySelector('#selectionStatus');
const faceTools=document.querySelector('[data-mode-tools="face"]');
const multiToggle=document.querySelector('#multiSelectToggle');

function state(){return globalThis.__boxlabBridgeState;}
function bridge(){return globalThis.__boxlabSelectionBridge;}
function mesh(){return state()?.mesh||null;}
function render(){document.querySelector('#cageToggle')?.dispatchEvent(new Event('change',{bubbles:true}));}
function edgeKey(a,b){return a<b?`${a}:${b}`:`${b}:${a}`;}

const row=document.createElement('div');
row.id='faceIslandsRow';
row.className='outliner-actions';
row.style.cssText='grid-template-columns:1fr;margin-top:4px';

const button=document.createElement('button');
button.id='selectFaceIslandsBtn';
button.type='button';
button.textContent='Detached Face Islands';
button.disabled=true;
button.style.width='100%';
row.appendChild(button);

function place(){
  if(row.isConnected)return true;
  const coplanar=document.querySelector('#coplanarRegionRow');
  if(coplanar?.parentElement){coplanar.insertAdjacentElement('afterend',row);return true;}
  const diagnostics=document.querySelector('#degenerateFaceInspectionRow');
  if(diagnostics?.parentElement){diagnostics.insertAdjacentElement('afterend',row);return true;}
  if(faceTools){faceTools.appendChild(row);return true;}
  return false;
}

function inspect(m){
  if(!m)return{indices:[],count:0,islandCount:0,components:[],largestCount:0};
  const faces=m.faces||[];
  const valid=[];
  const edgeOwners=new Map();

  faces.forEach((face,fi)=>{
    if(!Array.isArray(face)||face.length<3)return;
    valid.push(fi);
    for(let i=0;i<face.length;i++){
      const a=face[i],b=face[(i+1)%face.length];
      if(!Number.isInteger(a)||!Number.isInteger(b)||a===b)continue;
      const key=edgeKey(a,b);
      const owners=edgeOwners.get(key)||[];
      owners.push(fi);
      edgeOwners.set(key,owners);
    }
  });

  const neighbours=new Map(valid.map(fi=>[fi,new Set()]));
  for(const owners of edgeOwners.values()){
    if(owners.length<2)continue;
    for(let i=0;i<owners.length;i++)for(let j=i+1;j<owners.length;j++){
      neighbours.get(owners[i])?.add(owners[j]);
      neighbours.get(owners[j])?.add(owners[i]);
    }
  }

  const unseen=new Set(valid),components=[];
  while(unseen.size){
    const seed=unseen.values().next().value;
    const queue=[seed],component=[];
    unseen.delete(seed);
    while(queue.length){
      const fi=queue.shift();component.push(fi);
      for(const next of neighbours.get(fi)||[]){
        if(!unseen.has(next))continue;
        unseen.delete(next);queue.push(next);
      }
    }
    component.sort((a,b)=>a-b);components.push(component);
  }

  components.sort((a,b)=>b.length-a.length||a[0]-b[0]);
  const largest=components[0]||[];
  const detached=components.slice(1).flat().sort((a,b)=>a-b);
  return{
    indices:detached,
    count:detached.length,
    islandCount:components.length,
    detachedIslandCount:Math.max(0,components.length-1),
    components,
    largestCount:largest.length
  };
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
      ?`Face Islands • ${info.count} detached face${info.count===1?'':'s'} selected • ${info.detachedIslandCount} detached island${info.detachedIslandCount===1?'':'s'}`
      :`Face Islands • 1 connected shell • 0 detached faces`;
  });
}

function sync(){
  place();
  const m=mesh();button.disabled=!m;
  if(!m){button.title='No editable mesh';return;}
  const info=inspect(m);
  button.title=info.count
    ?`Select ${info.count} Faces outside the largest connected shell (${info.detachedIslandCount} detached island${info.detachedIslandCount===1?'':'s'})`
    :'No detached Face islands found';
}

button.addEventListener('click',apply);
window.addEventListener('boxlab-bridge-state',sync);
document.addEventListener('pointerup',()=>queueMicrotask(sync),true);
document.querySelectorAll('#selectionModes button').forEach(b=>b.addEventListener('click',()=>queueMicrotask(sync)));
[0,40,120,300,700].forEach(delay=>setTimeout(sync,delay));

globalThis.__boxlabSelectFaceIslands={version:'0.36.18.72',inspect,apply};
