// BoxLab v0.36.18.94 — orient selected Face winding consistently.
// Propagates winding across one edge-connected selected Face patch.
// Geometry/topology are unchanged; only required face index orders are reversed.

const faceTools=document.querySelector('[data-mode-tools="face"]');
const flipRow=document.querySelector('#flipFacesRow');
const flipButton=document.querySelector('#flipFacesBtn');
const status=document.querySelector('#selectionStatus');

function state(){return globalThis.__boxlabBridgeState;}
function bridge(){return globalThis.__boxlabSelectionBridge;}
function mesh(){return state()?.mesh||null;}
function render(){document.querySelector('#cageToggle')?.dispatchEvent(new Event('change',{bubbles:true}));}
function edgeKey(a,b){return a<b?`${a}:${b}`:`${b}:${a}`;}
function selectedFaces(){
  const m=mesh(),b=bridge();
  if(!m||b?.mode?.()!=='face')return[];
  return[...new Set(b.indices?.()||[])]
    .filter(i=>Number.isInteger(i)&&Array.isArray(m.faces?.[i])&&m.faces[i].length>=3)
    .sort((a,b)=>a-b);
}

const button=document.createElement('button');
button.id='orientFacesBtn';
button.type='button';
button.textContent='Orient Faces';
button.disabled=true;
button.style.cssText='width:100%;min-width:0';

function place(){
  const row=document.querySelector('#flipFacesRow')||flipRow;
  if(row){
    row.style.gridTemplateColumns='repeat(2,minmax(0,1fr))';
    if(flipButton)flipButton.style.minWidth='0';
    if(button.parentElement!==row)row.appendChild(button);
    return true;
  }
  if(faceTools){
    const host=document.createElement('div');
    host.className='outliner-actions';
    host.style.cssText='grid-template-columns:1fr;margin-top:4px';
    host.appendChild(button);
    faceTools.appendChild(host);
    return true;
  }
  return false;
}

function plan(m,ids){
  if(!m||ids.length<2)return{ok:false,reason:'Select at least two connected Faces'};
  const selected=new Set(ids);
  const uses=new Map();

  for(let fi=0;fi<(m.faces||[]).length;fi++){
    const face=m.faces[fi];
    if(!Array.isArray(face)||face.length<3)continue;
    for(let i=0;i<face.length;i++){
      const a=face[i],b=face[(i+1)%face.length];
      if(!Number.isInteger(a)||!Number.isInteger(b)||a===b)continue;
      const key=edgeKey(a,b),list=uses.get(key)||[];
      list.push({fi,a,b});
      uses.set(key,list);
    }
  }

  for(const list of uses.values()){
    if(list.length>2&&list.some(use=>selected.has(use.fi)))return{ok:false,reason:'Selection touches non-manifold topology'};
  }

  const adjacency=new Map(ids.map(fi=>[fi,[]]));
  for(const list of uses.values()){
    if(list.length!==2)continue;
    const [a,b]=list;
    if(!selected.has(a.fi)||!selected.has(b.fi))continue;
    const sameDirection=a.a===b.a&&a.b===b.b;
    adjacency.get(a.fi).push({fi:b.fi,sameDirection});
    adjacency.get(b.fi).push({fi:a.fi,sameDirection});
  }

  const seed=ids[0],flip=new Map([[seed,false]]),queue=[seed];
  while(queue.length){
    const fi=queue.shift(),current=flip.get(fi);
    for(const link of adjacency.get(fi)||[]){
      const wanted=current!==link.sameDirection;
      if(!flip.has(link.fi)){flip.set(link.fi,wanted);queue.push(link.fi);continue;}
      if(flip.get(link.fi)!==wanted)return{ok:false,reason:'Selected patch has contradictory winding constraints'};
    }
  }

  if(flip.size!==ids.length)return{ok:false,reason:'Selected Faces must form one edge-connected patch'};
  const toFlip=ids.filter(fi=>flip.get(fi));
  return{ok:true,ids,seed,toFlip,changed:toFlip.length};
}

function apply(){
  const m=mesh(),ids=selectedFaces(),history=globalThis.__boxlabHistory;
  if(!m||!history)return false;
  const info=plan(m,ids);
  if(!info.ok){if(status)status.textContent=`Orient Faces • ${info.reason}`;sync();return false;}
  if(!info.changed){
    if(status)status.textContent=`Orient Faces • ${ids.length} selected Faces are already consistently oriented`;
    return false;
  }

  history.push(m.clone());
  for(const fi of info.toFlip)m.faces[fi]=[...m.faces[fi]].reverse();
  m.edges?.();
  bridge()?.set?.('face',ids);
  render();
  if(status)status.textContent=`Orient Faces • ${info.changed} of ${ids.length} Faces flipped • patch now consistent`;
  queueMicrotask(sync);
  return true;
}

function sync(){
  place();
  const m=mesh(),ids=selectedFaces();
  const info=m&&ids.length>=2?plan(m,ids):null;
  button.disabled=!info?.ok||!globalThis.__boxlabHistory;
  button.title=!ids.length
    ?'Select a connected Face patch to orient'
    :ids.length<2
      ?'Select at least two connected Faces'
      :info?.ok
        ?info.changed?`Orient selected patch • ${info.changed} Face${info.changed===1?'':'s'} will flip`:'Selected patch is already consistently oriented'
        :(info?.reason||'Selected Faces cannot be oriented safely');
}

function stampVersion(){
  const version=document.querySelector('#appVersion');
  if(version)version.textContent='v0.36.18.94';
  document.title='BoxLab v0.36.18.94';
}

button.addEventListener('click',apply);
window.addEventListener('boxlab-bridge-state',sync);
document.addEventListener('pointerup',()=>queueMicrotask(sync),true);
document.querySelectorAll('#selectionModes button').forEach(b=>b.addEventListener('click',()=>queueMicrotask(sync)));
[0,40,120,300,700].forEach(delay=>setTimeout(sync,delay));
[120,500,1000,1600].forEach(delay=>setTimeout(stampVersion,delay));

globalThis.__boxlabOrientFaces={version:'0.36.18.94',plan,apply};
