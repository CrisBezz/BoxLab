import { placeToolSessionPanel } from './tool-session-panel-position.js?v=0.36.18.716';
// BoxLab v0.36.18.676 — radial Edge Bridge guided selection session.
// UX proxy only. bridge-ui.js + bridge-topology.js remain authoritative.

const viewportWrap=document.querySelector('#viewportWrap');
const status=document.querySelector('#selectionStatus');
const bridgeButton=document.querySelector('#bridgeEdgesBtn');
let active=false,firstIds=[];

const panel=document.createElement('div');
panel.id='selectionHubBridgeSession';
panel.hidden=true;
panel.innerHTML=`
  <div class="shbs-title">Bridge</div>
  <div class="shbs-state">First boundary ready</div>
  <div class="shbs-help">Add the second boundary loop</div>
  <div class="shbs-row">
    <button type="button" class="shbs-apply" disabled>Apply Bridge</button>
    <button type="button" class="shbs-cancel">Cancel</button>
  </div>`;
viewportWrap?.append(panel);

const style=document.createElement('style');
style.textContent=`
#selectionHubBridgeSession{position:absolute;z-index:35;min-width:220px;padding:9px;border-radius:10px;background:rgba(18,20,24,.91);border:1px solid rgba(255,255,255,.16);backdrop-filter:blur(8px);color:#f5f7fa;font-size:11px}
#selectionHubBridgeSession .shbs-title{font-weight:750;font-size:12px;margin-bottom:5px}
#selectionHubBridgeSession .shbs-state{font-weight:650;margin-bottom:3px}
#selectionHubBridgeSession .shbs-help{opacity:.7;margin-bottom:7px}
#selectionHubBridgeSession .shbs-row{display:grid;grid-template-columns:1fr auto;gap:6px}
#selectionHubBridgeSession button{min-height:29px}`;
document.head.appendChild(style);

const stateText=panel.querySelector('.shbs-state');
const help=panel.querySelector('.shbs-help');
const apply=panel.querySelector('.shbs-apply');
const cancel=panel.querySelector('.shbs-cancel');

function bridge(){return globalThis.__boxlabSelectionBridge;}
function state(){return globalThis.__boxlabBridgeState;}
function selectedEdges(){return bridge()?.mode?.()==='edge'?[...new Set(bridge()?.indices?.()||[])]:[];}

function isSingleBoundaryLoop(ids){
  const mesh=state()?.mesh;
  if(!mesh||!ids?.length||ids.length<3)return false;
  const edges=mesh.edges?.()||[];
  const picked=ids.map(i=>edges[i]);
  if(picked.some(e=>!e))return false;
  if(picked.some(e=>!(e.loose||((e.faces||[]).filter(Number.isInteger).length===1))))return false;
  const degree=new Map(),adj=new Map();
  for(const e of picked){
    degree.set(e.a,(degree.get(e.a)||0)+1);
    degree.set(e.b,(degree.get(e.b)||0)+1);
    if(!adj.has(e.a))adj.set(e.a,[]);
    if(!adj.has(e.b))adj.set(e.b,[]);
    adj.get(e.a).push(e.b);adj.get(e.b).push(e.a);
  }
  if([...degree.values()].some(n=>n!==2))return false;
  const start=picked[0].a,seen=new Set([start]),queue=[start];
  while(queue.length){
    const v=queue.shift();
    for(const n of adj.get(v)||[])if(!seen.has(n)){seen.add(n);queue.push(n);}
  }
  return seen.size===degree.size;
}

function combinedValid(ids=selectedEdges()){
  return !!state()?.mesh?.bridgeEdgeSelectionInfo?.(ids);
}

function selectionCenterScreen(ids=selectedEdges()){
  const mesh=state()?.mesh,camera=state()?.camera,canvas=document.querySelector('#viewport');
  if(!mesh||!camera||!canvas||!ids.length)return null;
  const verts=new Set(),edges=mesh.edges();
  ids.forEach(i=>{const e=edges[i];if(e){verts.add(e.a);verts.add(e.b);}});
  if(!verts.size)return null;
  const p={x:0,y:0,count:0};
  const rect=canvas.getBoundingClientRect(),wrap=viewportWrap.getBoundingClientRect();
  for(const vi of verts){
    const v=mesh.vertices[vi]?.clone?.().project(camera);if(!v)continue;
    p.x+=rect.left-wrap.left+(v.x*.5+.5)*rect.width;
    p.y+=rect.top-wrap.top+(-v.y*.5+.5)*rect.height;
    p.count++;
  }
  return p.count?{x:p.x/p.count,y:p.y/p.count}:null;
}

function place(){
  placeToolSessionPanel(panel);
}

function sync(){
  if(!active)return;
  const ids=selectedEdges(),valid=combinedValid(ids);
  apply.disabled=!valid;
  if(valid){
    stateText.textContent='Two compatible boundaries ready';
    help.textContent='Apply Bridge to connect them';
  }else{
    const kept=firstIds.every(id=>ids.includes(id));
    stateText.textContent=kept?'First boundary ready':'Keep the first boundary selected';
    help.textContent='Add matching boundary • hold Edge → Boundary works well';
  }
  place();
}

function returnPuck(ids){
  requestAnimationFrame(()=>{
    if(ids?.length&&bridge()?.mode?.()==='edge')bridge()?.set?.('edge',ids);
    globalThis.__boxlabTotalGizmo?.setHubState?.('closed',{reason:'bridge-session-done'});
  });
}

function close({restore=true}={}){
  const keep=restore?[...firstIds]:selectedEdges();
  active=false;panel.hidden=true;
  if(restore&&bridge()?.mode?.()==='edge')bridge()?.set?.('edge',keep);
  returnPuck(keep);
  firstIds=[];
}

function openFromHub(options={}){
  if(bridge()?.mode?.()!=='edge')return false;
  const ids=[...new Set(options.ids||selectedEdges())].filter(Number.isInteger);
  if(!isSingleBoundaryLoop(ids)){
    if(status)status.textContent='Bridge • start with one complete boundary loop';
    return false;
  }
  active=true;
  firstIds=[...ids];
  bridge()?.set?.('edge',firstIds);
  panel.hidden=false;
  apply.disabled=true;
  stateText.textContent='First boundary ready';
  help.textContent='Add matching boundary • hold Edge → Boundary works well';
  if(status)status.textContent='Bridge • first boundary kept • add matching second boundary';
  place();requestAnimationFrame(sync);
  return true;
}

apply.addEventListener('click',event=>{
  event.preventDefault();event.stopPropagation();
  if(!active||!combinedValid())return;
  const ids=selectedEdges();
  active=false;panel.hidden=true;
  const ok=!!globalThis.__boxlabBridgeUI?.bridgeEdgesFromHub?.({ids});
  if(!ok){
    active=true;panel.hidden=false;
    if(status)status.textContent='Bridge • selected boundaries are not compatible';
    sync();
    return;
  }
  firstIds=[];
});

cancel.addEventListener('click',event=>{
  event.preventDefault();event.stopPropagation();
  close({restore:true});
});

window.addEventListener('boxlab-bridge-state',()=>{if(active)requestAnimationFrame(sync);});
document.addEventListener('pointerup',()=>{if(active)queueMicrotask(sync);},true);
document.addEventListener('click',()=>{if(active)queueMicrotask(sync);},true);

globalThis.__boxlabBridgeViewportSession={
  version:'0.36.18.676',
  active:()=>active,
  canStart:ids=>isSingleBoundaryLoop(ids||selectedEdges()),
  openFromHub,
  close,
  element:panel
};
