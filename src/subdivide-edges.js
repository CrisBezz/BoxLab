// BoxLab v0.36.18.99 — recursive batch midpoint Edge subdivision.
// Splits one or more selected Edges at 50%, preserving adjacent Face loops,
// crease values and loose-edge topology. One History entry for the whole batch.
// Result stays in Edge mode with both child Edges selected for immediate repeat.
// Subdivide never forces Multi on and consumes its own touch pointer sequence.

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
  return {vertex,childKeys:[key(m,a,vertex),key(m,vertex,b)]};
}

function selectedKeys(m){
  const edges=m?.edges?.()||[];
  const keys=[];
  for(const i of selectedEdges()){
    const e=edges[i];
    if(!e||!m.vertices?.[e.a]||!m.vertices?.[e.b])continue;
    const k=key(m,e.a,e.b);
    if(!keys.includes(k))keys.push(k);
  }
  return keys;
}

function planKeys(m,keys){
  if(!m||!keys.length)return{ok:false,reason:'Select one or more Edges'};
  const live=new Set((m.edges?.()||[]).map(e=>key(m,e.a,e.b)));
  for(const k of keys)if(!live.has(k))return{ok:false,reason:'Selected Edge topology changed before subdivision'};
  return{ok:true,keys:[...keys],count:keys.length};
}

function restore(m,before){
  m.vertices=before.vertices.map(v=>v.clone());
  m.faces=before.faces.map(face=>[...face]);
  m.creases=new Map(before.creases||[]);
  if(before.looseEdges instanceof Set)m.looseEdges=new Set(before.looseEdges);
  if(before.looseVertices instanceof Set)m.looseVertices=new Set(before.looseVertices);
  m.edges?.();
}

function applyKeys(keys){
  const m=mesh(),history=globalThis.__boxlabHistory;
  if(!m||!history)return false;
  const info=planKeys(m,keys);
  if(!info.ok){if(status)status.textContent=`Subdivide Edges • ${info.reason}`;sync();return false;}

  const before=m.clone(),childKeys=[];
  for(const k of info.keys){
    const result=splitByKey(m,k);
    if(!result){
      restore(m,before);render();
      if(status)status.textContent='Subdivide Edges • rollback • topology changed unexpectedly';
      sync();return false;
    }
    childKeys.push(...result.childKeys);
  }

  const rebuilt=m.edges?.()||[];
  const wanted=new Set(childKeys);
  const resultEdges=[];
  rebuilt.forEach((e,index)=>{if(wanted.has(key(m,e.a,e.b)))resultEdges.push(index);});
  if(resultEdges.length!==wanted.size){
    restore(m,before);render();
    if(status)status.textContent='Subdivide Edges • rollback • child Edges could not be resolved';
    sync();return false;
  }

  history.push(before);

  // Multi selection is a user interaction mode, not a requirement for the
  // bridge to hold several selected Edges. Never force it on here.
  if(multiToggle?.checked){
    multiToggle.checked=false;
    multiToggle.dispatchEvent(new Event('change',{bubbles:true}));
  }

  const edgeMode=document.querySelector('#selectionModes button[data-mode="edge"]');
  if(edgeMode&&!edgeMode.classList.contains('active'))edgeMode.click();

  // Replace the selection directly after topology rebuild. No synthetic canvas
  // taps are used, so no toggle/add-selection behavior can leak into repeat.
  bridge()?.set?.('edge',resultEdges);
  if(status)status.textContent=`Subdivide Edges • ${info.count} edge${info.count===1?'':'s'} split at midpoint • ${resultEdges.length} child Edges selected • repeat ready`;
  queueMicrotask(sync);
  return true;
}

function apply(){return applyKeys(selectedKeys(mesh()));}

function sync(){
  place();
  const m=mesh(),keys=m?selectedKeys(m):[],info=m&&keys.length?planKeys(m,keys):null;
  button.disabled=!info?.ok||!globalThis.__boxlabHistory;
  button.title=!keys.length?'Select one or more Edges to subdivide':info?.ok?`Split ${info.count} selected Edge${info.count===1?'':'s'} at 50%`:(info?.reason||'Selected Edges cannot be subdivided');
}

let pressed=null;
button.addEventListener('pointerdown',event=>{
  if(button.disabled||!event.isPrimary)return;
  pressed={pointerId:event.pointerId,keys:selectedKeys(mesh())};
  event.preventDefault();
  event.stopImmediatePropagation();
  button.setPointerCapture?.(event.pointerId);
},true);
button.addEventListener('pointerup',event=>{
  if(!pressed||pressed.pointerId!==event.pointerId)return;
  const keys=pressed.keys;pressed=null;
  event.preventDefault();
  event.stopImmediatePropagation();
  button.releasePointerCapture?.(event.pointerId);
  applyKeys(keys);
},true);
button.addEventListener('pointercancel',event=>{
  if(pressed?.pointerId===event.pointerId)pressed=null;
  event.preventDefault();
  event.stopImmediatePropagation();
},true);
button.addEventListener('click',event=>{event.preventDefault();event.stopImmediatePropagation();},true);

window.addEventListener('boxlab-bridge-state',sync);
document.addEventListener('pointerup',()=>queueMicrotask(sync),true);
document.querySelectorAll('#selectionModes button').forEach(b=>b.addEventListener('click',()=>queueMicrotask(sync)));
[0,40,120,300,700].forEach(delay=>setTimeout(sync,delay));

globalThis.__boxlabSubdivideEdges={version:'0.36.18.99',plan:(m,ids)=>planKeys(m,(m?.edges?.()||[]).filter((_,i)=>ids.includes(i)).map(e=>key(m,e.a,e.b))),apply};
