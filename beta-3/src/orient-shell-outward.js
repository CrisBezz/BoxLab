// BoxLab v0.36.18.95 — orient a closed selected Face shell outward.
// First solves consistent winding across the selected shell, then uses signed
// volume to choose the outward orientation. Geometry/topology are unchanged.

const faceTools=document.querySelector('[data-mode-tools="face"]');
const orientButton=document.querySelector('#orientFacesBtn');
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

const row=document.createElement('div');
row.id='orientShellOutwardRow';
row.className='outliner-actions';
row.style.cssText='grid-template-columns:1fr;margin-top:4px';
const button=document.createElement('button');
button.id='orientShellOutwardBtn';
button.type='button';
button.textContent='Orient Shell Outward';
button.disabled=true;
button.style.cssText='width:100%;min-width:0';
row.appendChild(button);

function place(){
  if(row.isConnected)return true;
  const orient=orientButton||document.querySelector('#orientFacesBtn');
  const anchor=orient?.parentElement||document.querySelector('#flipFacesRow');
  if(anchor?.parentElement){anchor.insertAdjacentElement('afterend',row);return true;}
  if(faceTools){faceTools.appendChild(row);return true;}
  return false;
}

function plan(m,ids){
  if(!m||ids.length<4)return{ok:false,reason:'Select a closed Face shell'};
  const selected=new Set(ids),uses=new Map();

  for(let fi=0;fi<(m.faces||[]).length;fi++){
    const face=m.faces[fi];
    if(!Array.isArray(face)||face.length<3)continue;
    for(let i=0;i<face.length;i++){
      const a=face[i],b=face[(i+1)%face.length];
      if(!Number.isInteger(a)||!Number.isInteger(b)||a===b)return{ok:false,reason:'Shell contains invalid Face topology'};
      const key=edgeKey(a,b),list=uses.get(key)||[];
      list.push({fi,a,b});uses.set(key,list);
    }
  }

  const adjacency=new Map(ids.map(fi=>[fi,[]]));
  for(const [key,list] of uses){
    const selectedUses=list.filter(use=>selected.has(use.fi));
    if(!selectedUses.length)continue;
    if(list.length!==2)return{ok:false,reason:list.length>2?'Shell touches non-manifold topology':'Selected shell is open'};
    if(selectedUses.length!==2)return{ok:false,reason:'Selected shell is not closed'};
    const [a,b]=selectedUses;
    const sameDirection=a.a===b.a&&a.b===b.b;
    adjacency.get(a.fi)?.push({fi:b.fi,sameDirection,key});
    adjacency.get(b.fi)?.push({fi:a.fi,sameDirection,key});
  }

  const seed=ids[0],flip=new Map([[seed,false]]),queue=[seed];
  while(queue.length){
    const fi=queue.shift(),current=flip.get(fi);
    for(const link of adjacency.get(fi)||[]){
      const wanted=current!==link.sameDirection;
      if(!flip.has(link.fi)){flip.set(link.fi,wanted);queue.push(link.fi);continue;}
      if(flip.get(link.fi)!==wanted)return{ok:false,reason:'Shell has contradictory winding constraints'};
    }
  }
  if(flip.size!==ids.length)return{ok:false,reason:'Selected Faces must form one connected closed shell'};

  let sixVolume=0;
  for(const fi of ids){
    let face=[...m.faces[fi]];
    if(flip.get(fi))face.reverse();
    const a=m.vertices?.[face[0]];
    if(!a)return{ok:false,reason:'Shell contains missing vertices'};
    for(let i=1;i<face.length-1;i++){
      const b=m.vertices?.[face[i]],c=m.vertices?.[face[i+1]];
      if(!b||!c)return{ok:false,reason:'Shell contains missing vertices'};
      sixVolume+=a.x*(b.y*c.z-b.z*c.y)+a.y*(b.z*c.x-b.x*c.z)+a.z*(b.x*c.y-b.y*c.x);
    }
  }

  let scale=0;
  const usedVertices=new Set(ids.flatMap(fi=>m.faces[fi]||[]));
  let minX=Infinity,minY=Infinity,minZ=Infinity,maxX=-Infinity,maxY=-Infinity,maxZ=-Infinity;
  for(const vi of usedVertices){const v=m.vertices?.[vi];if(!v)continue;minX=Math.min(minX,v.x);minY=Math.min(minY,v.y);minZ=Math.min(minZ,v.z);maxX=Math.max(maxX,v.x);maxY=Math.max(maxY,v.y);maxZ=Math.max(maxZ,v.z);}
  if(Number.isFinite(minX))scale=Math.max(maxX-minX,maxY-minY,maxZ-minZ);
  const volumeTolerance=Math.max(1e-15,Math.pow(Math.max(scale,1e-6),3)*1e-10)*6;
  if(Math.abs(sixVolume)<=volumeTolerance)return{ok:false,reason:'Shell volume is too small to determine outward direction'};

  const wholeShellFlip=sixVolume<0;
  const toFlip=ids.filter(fi=>Boolean(flip.get(fi))!==wholeShellFlip);
  return{ok:true,ids,toFlip,changed:toFlip.length,volume:Math.abs(sixVolume)/6,wholeShellFlip};
}

function apply(){
  const m=mesh(),ids=selectedFaces(),history=globalThis.__boxlabHistory;
  if(!m||!history)return false;
  const info=plan(m,ids);
  if(!info.ok){if(status)status.textContent=`Orient Shell Outward • ${info.reason}`;sync();return false;}
  if(!info.changed){
    if(status)status.textContent=`Orient Shell Outward • shell is already consistently outward • volume ${info.volume.toPrecision(4)}`;
    return false;
  }

  history.push(m.clone());
  for(const fi of info.toFlip)m.faces[fi]=[...m.faces[fi]].reverse();
  m.edges?.();
  bridge()?.set?.('face',ids);
  render();
  if(status)status.textContent=`Orient Shell Outward • ${info.changed} of ${ids.length} Faces flipped • shell outward • volume ${info.volume.toPrecision(4)}`;
  queueMicrotask(sync);
  return true;
}

function sync(){
  place();
  const m=mesh(),ids=selectedFaces();
  const info=m&&ids.length?plan(m,ids):null;
  button.disabled=!info?.ok||!globalThis.__boxlabHistory;
  button.title=!ids.length
    ?'Select every Face of one closed shell'
    :info?.ok
      ?info.changed?`Orient closed shell outward • ${info.changed} Face${info.changed===1?'':'s'} will flip`:'Selected shell is already outward'
      :(info?.reason||'Selected Faces are not one closed manifold shell');
}

function stampVersion(){
  const version=document.querySelector('#appVersion');
  if(version)version.textContent='v0.36.18.95';
  document.title='BoxLab v0.36.18.95';
}

button.addEventListener('click',apply);
window.addEventListener('boxlab-bridge-state',sync);
document.addEventListener('pointerup',()=>queueMicrotask(sync),true);
document.querySelectorAll('#selectionModes button').forEach(b=>b.addEventListener('click',()=>queueMicrotask(sync)));
[0,40,120,300,700].forEach(delay=>setTimeout(sync,delay));
[120,500,1000,1600].forEach(delay=>setTimeout(stampVersion,delay));

globalThis.__boxlabOrientShellOutward={version:'0.36.18.95',plan,apply};
