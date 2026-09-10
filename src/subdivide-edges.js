// BoxLab v0.36.18.97 — batch midpoint Edge subdivision.
// Splits one or more selected Edges at 50%, preserving adjacent Face loops,
// crease values and loose-edge topology. One History entry for the whole batch.

const edgeTools=document.querySelector('[data-mode-tools="edge"]');
const status=document.querySelector('#selectionStatus');
const multiToggle=document.querySelector('#multiSelectToggle');

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

function splitFaceEdge(face,a,b,vertex){
  for(let i=0;i<face.length;i++){
    const x=face[i],y=face[(i+1)%face.length];
    if((x===a&&y===b)||(x===b&&y===a)){
      const out=[...face];out.splice(i+1,0,vertex);return out;
    }
  }
  return null;
}

function splitByKey(m,edgeKey){
  const edges=m.edges?.()||[];
  const edge=edges.find(e=>key(m,e.a,e.b)===edgeKey);
  if(!edge||!m.vertices?.[edge.a]||!m.vertices?.[edge.b])return null;

  const a=edge.a,b=edge.b,oldKey=key(m,a,b);
  const crease=m.creases?.get?.(oldKey)||0;
  const vertex=m.vertices.length;
  m.vertices.push(m.vertices[a].clone().lerp(m.vertices[b],.5));

  const owners=(edge.faces||[]).filter(fi=>Number.isInteger(fi)&&fi>=0&&Array.isArray(m.faces?.[fi]));
  for(const fi of owners){
    const next=splitFaceEdge(m.faces[fi],a,b,vertex);
    if(!next)return null;
    m.faces[fi]=next;
  }

  if(edge.loose&&m.looseEdges instanceof Set){
    m.looseEdges.delete(oldKey);
    m.looseEdges.add(key(m,a,vertex));
    m.looseEdges.add(key(m,vertex,b));
    if(m.looseVertices instanceof Set)m.looseVertices.add(vertex);
  }

  if(m.creases instanceof Map){
    m.creases.delete(oldKey);
    if(crease>0){
      m.creases.set(key(m,a,vertex),crease);
      m.creases.set(key(m,vertex,b),crease);
    }
  }
  return vertex;
}

function plan(m,ids){
  if(!m||!ids.length)return{ok:false,reason:'Select one or more Edges'};
  const edges=m.edges?.()||[],keys=[];
  for(const i of ids){
    const e=edges[i];
    if(!e||!m.vertices?.[e.a]||!m.vertices?.[e.b])return{ok:false,reason:'Selection contains an invalid Edge'};
    const k=key(m,e.a,e.b);
    if(!keys.includes(k))keys.push(k);
  }
  return{ok:!!keys.length,keys,count:keys.length};
}

function restore(m,before){
  m.vertices=before.vertices.map(v=>v.clone());
  m.faces=before.faces.map(face=>[...face]);
  m.creases=new Map(before.creases||[]);
  if(before.looseEdges instanceof Set)m.looseEdges=new Set(before.looseEdges);
  if(before.looseVertices instanceof Set)m.looseVertices=new Set(before.looseVertices);
  m.edges?.();
}

function apply(){
  const m=mesh(),ids=selectedEdges(),history=globalThis.__boxlabHistory;
  if(!m||!history)return false;
  const info=plan(m,ids);
  if(!info.ok){if(status)status.textContent=`Subdivide Edges • ${info.reason}`;sync();return false;}

  const before=m.clone(),created=[];
  for(const k of info.keys){
    const vertex=splitByKey(m,k);
    if(!Number.isInteger(vertex)){
      restore(m,before);render();
      if(status)status.textContent='Subdivide Edges • rollback • topology changed unexpectedly';
      sync();return false;
    }
    created.push(vertex);
  }

  history.push(before);
  m.edges?.();
  bridge()?.set?.('edge',[]);
  if(multiToggle){
    const wanted=created.length>1;
    if(multiToggle.checked!==wanted){multiToggle.checked=wanted;multiToggle.dispatchEvent(new Event('change',{bubbles:true}));}
  }
  document.querySelector('#selectionModes button[data-mode="vertex"]')?.click();
  queueMicrotask(()=>{
    bridge()?.set?.('vertex',created);
    render();
    if(status)status.textContent=`Subdivide Edges • ${info.count} edge${info.count===1?'':'s'} split at midpoint • ${created.length} new vert${created.length===1?'ex':'ices'} selected`;
  });
  return true;
}

function sync(){
  place();
  const m=mesh(),ids=selectedEdges(),info=m&&ids.length?plan(m,ids):null;
  button.disabled=!info?.ok||!globalThis.__boxlabHistory;
  button.title=!ids.length?'Select one or more Edges to subdivide':info?.ok?`Split ${info.count} selected Edge${info.count===1?'':'s'} at 50%`:(info?.reason||'Selected Edges cannot be subdivided');
}

function stampVersion(){
  const version=document.querySelector('#appVersion');
  if(version)version.textContent='v0.36.18.97';
  document.title='BoxLab v0.36.18.97';
}

button.addEventListener('click',apply);
window.addEventListener('boxlab-bridge-state',sync);
document.addEventListener('pointerup',()=>queueMicrotask(sync),true);
document.querySelectorAll('#selectionModes button').forEach(b=>b.addEventListener('click',()=>queueMicrotask(sync)));
[0,40,120,300,700].forEach(delay=>setTimeout(sync,delay));
[120,500,1000,1600].forEach(delay=>setTimeout(stampVersion,delay));

globalThis.__boxlabSubdivideEdges={version:'0.36.18.97',plan,apply};
