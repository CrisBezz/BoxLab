// BoxLab v0.36.18.202 — quad-preferred triangle-pair cleanup.
// Converts planar topology-safe triangle pairs into quads transactionally.
const VERSION='0.36.18.202';
const status=document.querySelector('#selectionStatus');

function state(){return globalThis.__boxlabBridgeState||null;}
function mesh(){return state()?.mesh||null;}
function forceRender(){document.querySelector('#cageToggle')?.dispatchEvent(new Event('change',{bubbles:true}));}
function edgeKey(a,b){return a<b?`${a}:${b}`:`${b}:${a}`;}

function orderedBoundary(m,faceA,faceB){
  const counts=new Map();
  for(const face of [faceA,faceB])for(let i=0;i<face.length;i++){
    const a=face[i],b=face[(i+1)%face.length],key=edgeKey(a,b);
    counts.set(key,(counts.get(key)||0)+1);
  }
  const boundary=[...counts].filter(([,count])=>count===1).map(([key])=>key.split(':').map(Number));
  if(boundary.length!==4)return null;
  const adjacency=new Map();
  for(const [a,b] of boundary){
    if(!adjacency.has(a))adjacency.set(a,[]);if(!adjacency.has(b))adjacency.set(b,[]);
    adjacency.get(a).push(b);adjacency.get(b).push(a);
  }
  if(adjacency.size!==4||[...adjacency.values()].some(list=>list.length!==2))return null;
  const start=adjacency.keys().next().value,cycle=[start];let previous=null,current=start;
  while(cycle.length<4){
    const next=(adjacency.get(current)||[]).find(v=>v!==previous);
    if(next===undefined||next===start||cycle.includes(next))return null;
    cycle.push(next);previous=current;current=next;
  }
  if(!(adjacency.get(current)||[]).includes(start))return null;
  return cycle;
}
function directed(face,a,b){
  for(let i=0;i<face.length;i++){const x=face[i],y=face[(i+1)%face.length];if(x===a&&y===b)return 1;if(x===b&&y===a)return-1;}
  return 0;
}
function orientLikePair(cycle,faceA,faceB){
  for(let i=0;i<cycle.length;i++){
    const a=cycle[i],b=cycle[(i+1)%cycle.length];
    const d=directed(faceA,a,b)||directed(faceB,a,b);
    if(d===1)return cycle;
    if(d===-1)return [...cycle].reverse();
  }
  return cycle;
}

function inspect(m=mesh()){
  const source=globalThis.__boxlabSelectTriPairs?.inspect?.(m);
  if(!source)return{available:!!m,candidates:[],pairCount:0};
  const used=new Set(),candidates=[];
  for(const pair of source.planarPairs||[]){
    const [a,b]=pair.faces||[];
    if(!Number.isInteger(a)||!Number.isInteger(b)||used.has(a)||used.has(b))continue;
    const faceA=m.faces[a],faceB=m.faces[b];
    if(!Array.isArray(faceA)||!Array.isArray(faceB)||faceA.length!==3||faceB.length!==3)continue;
    const cycle=orderedBoundary(m,faceA,faceB);if(!cycle)continue;
    candidates.push({...pair,faces:[a,b],cycle:orientLikePair(cycle,faceA,faceB)});
    used.add(a);used.add(b);
  }
  return{available:!!m,candidates,pairCount:candidates.length,triangleCount:candidates.length*2};
}

function apply(m=mesh()){
  if(!m)return{ok:false,reason:'No editable mesh'};
  const info=inspect(m);if(!info.pairCount)return{ok:false,reason:'No planar quad-pair candidates',...info};
  const before=m.clone(),history=globalThis.__boxlabHistory,gate=globalThis.__boxlabTopologyGate;
  const beforeGate=gate?.validate?.(m)||null;
  const replacement=new Map(),remove=new Set();
  for(const pair of info.candidates){const [a,b]=pair.faces;const keep=Math.min(a,b),drop=Math.max(a,b);replacement.set(keep,[...pair.cycle]);remove.add(drop);}
  const next=[];
  for(let i=0;i<m.faces.length;i++){
    if(remove.has(i))continue;
    next.push(replacement.has(i)?replacement.get(i):m.faces[i]);
  }
  m.faces=next;
  const after=gate?.validate?.(m)||null;
  const invalid=after&&!after.valid;
  if(invalid){m.vertices=before.vertices.map(v=>v.clone());m.faces=before.faces.map(f=>[...f]);m.creases=new Map(before.creases);forceRender();gate?.sync?.();return{ok:false,reason:'Validation failed — cleanup rolled back',before:beforeGate,after};}
  history?.push?.(before);
  forceRender();gate?.sync?.();
  return{ok:true,quads:info.pairCount,trianglesRemoved:info.triangleCount,before:beforeGate,after};
}

function ensureUI(){
  const close=document.querySelector('#closeHolesRow'),gate=document.querySelector('#topologyValidityGate');
  const anchor=close||gate;if(!anchor)return null;
  let row=document.querySelector('#quadPairCleanupRow');if(row)return row;
  row=document.createElement('div');row.id='quadPairCleanupRow';row.style.cssText='margin:5px 0 0;display:grid;grid-template-columns:1fr';
  const button=document.createElement('button');button.type='button';button.id='quadPairCleanupBtn';button.textContent='Quad Cleanup';button.title='Merge planar topology-safe triangle pairs into quads';
  row.append(button);anchor.insertAdjacentElement('afterend',row);
  button.addEventListener('click',()=>{const result=apply();if(status)status.textContent=result.ok?`Quad Cleanup • ${result.quads} quad${result.quads===1?'':'s'} created`:`Quad Cleanup • ${result.reason}`;syncUI();});
  return row;
}
function syncUI(){
  const row=ensureUI(),button=row?.querySelector('#quadPairCleanupBtn');if(!button)return false;
  const info=inspect(mesh());button.disabled=!info.pairCount;button.textContent=info.pairCount?`Quad Cleanup (${info.pairCount})`:'Quad Cleanup';
  button.title=info.pairCount?`Merge ${info.pairCount} planar topology-safe triangle pair${info.pairCount===1?'':'s'} into quads`:'No planar quad-pair candidates';
  return true;
}
if(!ensureUI()){let attempts=0;const timer=setInterval(()=>{attempts++;if(ensureUI()||attempts>50)clearInterval(timer);},100);}
window.addEventListener('boxlab-bridge-state',()=>queueMicrotask(syncUI));
document.addEventListener('pointerup',()=>setTimeout(syncUI,0),true);

globalThis.__boxlabQuadPairCleanup={version:VERSION,inspect,apply,syncUI};
