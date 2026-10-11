// BoxLab v0.36.18.73 — non-destructive connected Face-shell selection.
// Starting from exactly one selected Face, selects every Face edge-connected
// to that seed. No coplanarity requirement. Geometry/history are untouched.

const status=document.querySelector('#selectionStatus');
const faceTools=document.querySelector('[data-mode-tools="face"]');
const multiToggle=document.querySelector('#multiSelectToggle');

function state(){return globalThis.__boxlabBridgeState;}
function bridge(){return globalThis.__boxlabSelectionBridge;}
function mesh(){return state()?.mesh||null;}
function selectedFaces(){const b=bridge();return b?.mode?.()==='face'?[...new Set(b.indices?.()||[])].filter(Number.isInteger):[];}
function render(){document.querySelector('#cageToggle')?.dispatchEvent(new Event('change',{bubbles:true}));}
function edgeKey(a,b){return a<b?`${a}:${b}`:`${b}:${a}`;}

const button=document.createElement('button');
button.id='selectConnectedShellBtn';
button.type='button';
button.textContent='Connected Shell';
button.disabled=true;
button.style.width='100%';
button.style.minWidth='0';

function place(){
  const row=document.querySelector('#faceIslandsRow');
  if(row){
    row.style.gridTemplateColumns='repeat(2,minmax(0,1fr))';
    if(button.parentElement!==row)row.appendChild(button);
    return true;
  }
  return false;
}

function inspect(m,seedIndex){
  if(!m||!Number.isInteger(seedIndex)||!Array.isArray(m.faces?.[seedIndex])||m.faces[seedIndex].length<3)
    return{ok:false,reason:'Select exactly one Face',indices:[],count:0};

  const faces=m.faces||[];
  const edgeOwners=new Map();
  faces.forEach((face,fi)=>{
    if(!Array.isArray(face)||face.length<3)return;
    for(let i=0;i<face.length;i++){
      const a=face[i],b=face[(i+1)%face.length];
      if(!Number.isInteger(a)||!Number.isInteger(b)||a===b)continue;
      const key=edgeKey(a,b);
      const owners=edgeOwners.get(key)||[];
      owners.push(fi);edgeOwners.set(key,owners);
    }
  });

  const neighbours=Array.from({length:faces.length},()=>new Set());
  for(const owners of edgeOwners.values()){
    if(owners.length<2)continue;
    for(let i=0;i<owners.length;i++)for(let j=i+1;j<owners.length;j++){
      neighbours[owners[i]]?.add(owners[j]);
      neighbours[owners[j]]?.add(owners[i]);
    }
  }

  const visited=new Set([seedIndex]),queue=[seedIndex];
  while(queue.length){
    const fi=queue.shift();
    for(const next of neighbours[fi]||[]){
      if(visited.has(next))continue;
      if(!Array.isArray(faces[next])||faces[next].length<3)continue;
      visited.add(next);queue.push(next);
    }
  }
  const indices=[...visited].sort((a,b)=>a-b);
  return{ok:true,seedIndex,indices,count:indices.length};
}

function apply(){
  const m=mesh(),ids=selectedFaces();
  if(!m||ids.length!==1)return;
  const info=inspect(m,ids[0]);
  if(!info.ok){if(status)status.textContent=`Connected Shell • ${info.reason}`;sync();return;}
  if(multiToggle){
    const wanted=info.indices.length>1;
    if(multiToggle.checked!==wanted){multiToggle.checked=wanted;multiToggle.dispatchEvent(new Event('change',{bubbles:true}));}
  }
  bridge()?.set?.('face',info.indices);
  render();
  if(status)status.textContent=info.count>1
    ?`Connected Shell • ${info.count} faces selected`
    :'Connected Shell • seed is a single-face shell';
}

function sync(){
  place();
  const m=mesh(),ids=selectedFaces();
  const info=m&&ids.length===1?inspect(m,ids[0]):null;
  button.disabled=!info?.ok;
  button.title=info?.ok
    ?`Select all ${info.count} Faces in this edge-connected shell`
    :'Select exactly one Face as the shell seed';
}

button.addEventListener('click',apply);
window.addEventListener('boxlab-bridge-state',sync);
document.addEventListener('pointerup',()=>queueMicrotask(sync),true);
document.querySelectorAll('#selectionModes button').forEach(b=>b.addEventListener('click',()=>queueMicrotask(sync)));
[0,40,120,300,700].forEach(delay=>setTimeout(sync,delay));

setTimeout(()=>{
  if(button.isConnected)return;
  const host=document.createElement('div');
  host.className='outliner-actions';
  host.style.cssText='grid-template-columns:1fr;margin-top:4px';
  host.appendChild(button);
  const islands=document.querySelector('#faceIslandsRow');
  if(islands?.parentElement)islands.insertAdjacentElement('afterend',host);else faceTools?.appendChild(host);
},900);

globalThis.__boxlabSelectConnectedShell={version:'0.36.18.73',inspect,apply};
