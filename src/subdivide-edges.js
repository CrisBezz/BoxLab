// BoxLab v0.36.18.103 — batch midpoint subdivision via Add Vertex split kernel.
// No parallel topology mutation: every split uses the exact proven splitEdge()
// implementation already used by Add Vertex.

const edgeTools=document.querySelector('[data-mode-tools="edge"]');
const status=document.querySelector('#selectionStatus');
const canvas=document.querySelector('#viewport');

function state(){return globalThis.__boxlabBridgeState;}
function bridge(){return globalThis.__boxlabSelectionBridge;}
function mesh(){return state()?.mesh||null;}
function render(){document.querySelector('#cageToggle')?.dispatchEvent(new Event('change',{bubbles:true}));}
function selectedEdges(){
  const b=bridge();
  return b?.mode?.()==='edge'?[...new Set(b.indices?.()||[])].filter(Number.isInteger):[];
}
function key(m,a,b){return m.edgeKey(a,b);}

const row=document.createElement('div');
row.id='subdivideEdgesRow';
row.className='outliner-actions';
row.style.cssText='grid-template-columns:1fr;margin-top:4px';

const button=document.createElement('button');
button.id='subdivideEdgesBtn';
button.type='button';
button.textContent='Subdivide Edges';
button.disabled=true;
button.style.cssText='width:100%;min-width:0';
row.appendChild(button);

function place(){
  if(row.isConnected)return true;
  const anchor=document.querySelector('#rotateEdgeBtn')?.parentElement;
  if(anchor?.parentElement){anchor.insertAdjacentElement('afterend',row);return true;}
  if(edgeTools){edgeTools.appendChild(row);return true;}
  return false;
}

function selectedKeys(m){
  const edges=m?.edges?.()||[],keys=[];
  for(const i of selectedEdges()){
    const e=edges[i];
    if(!e||!m.vertices?.[e.a]||!m.vertices?.[e.b])continue;
    const k=key(m,e.a,e.b);
    if(!keys.includes(k))keys.push(k);
  }
  return keys;
}

function plan(m,keys){
  if(!m||!keys.length)return{ok:false,reason:'Select one or more Edges'};
  if(typeof globalThis.__boxlabEdgeSplitKernel?.splitEdge!=='function')return{ok:false,reason:'Edge split kernel is still loading'};
  const live=new Set((m.edges?.()||[]).map(e=>key(m,e.a,e.b)));
  for(const k of keys)if(!live.has(k))return{ok:false,reason:'Selected Edge is no longer present'};
  return{ok:true,keys:[...keys],count:keys.length};
}

function restore(m,before,looseEdges,looseVertices){
  m.vertices=before.vertices.map(v=>v.clone());
  m.faces=before.faces.map(face=>[...face]);
  m.creases=new Map(before.creases||[]);
  if(looseEdges)m.looseEdges=new Set(looseEdges);
  if(looseVertices)m.looseVertices=new Set(looseVertices);
  m.edges?.();
}

function applyKeys(keys){
  const m=mesh(),history=globalThis.__boxlabHistory,split=globalThis.__boxlabEdgeSplitKernel?.splitEdge;
  const info=plan(m,keys);
  if(!m||!history||!info.ok){
    if(status)status.textContent=`Subdivide Edges • ${info?.reason||'Unavailable'}`;
    sync();return false;
  }

  const before=m.clone();
  const looseEdges=m.looseEdges instanceof Set?new Set(m.looseEdges):null;
  const looseVertices=m.looseVertices instanceof Set?new Set(m.looseVertices):null;

  for(const edgeKey of info.keys){
    // Topology changes after every split, so resolve the current Edge index fresh
    // from its stable endpoint key before invoking the shared kernel.
    const live=m.edges?.()||[];
    const index=live.findIndex(e=>key(m,e.a,e.b)===edgeKey);
    if(index<0||!split(m,index,.5)){
      restore(m,before,looseEdges,looseVertices);
      render();
      if(status)status.textContent='Subdivide Edges • rollback • shared split kernel could not complete';
      sync();return false;
    }
  }

  history.push(before);
  bridge()?.set?.('edge',[]);
  render();
  if(status)status.textContent=`Subdivide Edges • ${info.count} edge${info.count===1?'':'s'} split at midpoint • select next Edge${info.count===1?'':'s'}`;
  queueMicrotask(sync);
  return true;
}

function apply(){return applyKeys(selectedKeys(mesh()));}

function sync(){
  place();
  const m=mesh(),keys=m?selectedKeys(m):[],info=plan(m,keys);
  button.disabled=!info.ok||!globalThis.__boxlabHistory;
  button.title=info.ok?`Split ${info.count} selected Edge${info.count===1?'':'s'} at 50%`:(info.reason||'Select one or more Edges to subdivide');
}

button.addEventListener('click',apply);
canvas?.addEventListener('pointerdown',()=>queueMicrotask(sync));
canvas?.addEventListener('pointerup',()=>setTimeout(sync,0));
window.addEventListener('boxlab-bridge-state',sync);
document.querySelectorAll('#selectionModes button').forEach(b=>b.addEventListener('click',()=>queueMicrotask(sync)));
[0,40,120,300,700].forEach(delay=>setTimeout(sync,delay));

globalThis.__boxlabSubdivideEdges={version:'0.36.18.103',apply};
