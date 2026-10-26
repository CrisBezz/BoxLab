import { placeToolSessionPanel } from './tool-session-panel-position.js?v=0.36.18.732';
// BoxLab v0.36.18.676 — radial Edge Bridge guided selection session.
// Preview uses the original Bridge kernel on a private clone; original UI owns commit/history.

import {createFaceBevelPreview,disposeFaceBevelPreview} from './bevel-face-preview.js?v=0.36.18.716';

const viewportWrap=document.querySelector('#viewportWrap');
const status=document.querySelector('#selectionStatus');
const bridgeButton=document.querySelector('#bridgeEdgesBtn');
let active=false,firstIds=[],context=null,preview=null;

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

// Source stays authoritative while the rendering-only candidate is on screen.
function sourceKey(mesh){return JSON.stringify({vertices:mesh.vertices,faces:mesh.faces,
  groups:mesh.faceGroups,creases:[...(mesh.creases||[])],looseEdges:[...(mesh.looseEdges||[])],looseVertices:[...(mesh.looseVertices||[])]});}
function editable(){return !document.querySelector('#app')?.classList?.contains('boxlab-active-locked');}
function contextValid(){return !!context&&editable()&&bridge()?.mode?.()==='edge'
  &&state()?.mesh===context.mesh&&state()?.scene===context.scene
  &&globalThis.__boxlabObjectManager?.activeId===context.object&&sourceKey(context.mesh)===context.key;}
function discardPreview(){disposeFaceBevelPreview(preview?.ghost);preview=null;}
function syncPreview(ids){
  const key=ids.slice().sort((a,b)=>a-b).join(',');
  if(preview?.key===key)return !!preview.ghost;
  discardPreview();
  if(!combinedValid(ids))return false;
  const live=state()?.mesh,before=live.clone(),candidate=before.clone();
  let result,ghost;
  // Historical edges() observers may publish a trial; never let a private candidate
  // replace the active mesh pointer seen by selection, manager or subsequent tools.
  try{
    result=candidate.bridgeSelectedEdges(ids);
    if(result)ghost=createFaceBevelPreview(state()?.scene,candidate,before);
  }catch{ghost=null;}
  finally{if(state())state().mesh=live;}
  if(!result||!ghost){disposeFaceBevelPreview(ghost);return false;}
  ghost.name='BoxLab Edge Bridge Preview';
  preview={key,ghost};return true;
}

function place(){
  placeToolSessionPanel(panel);
}

function sync(){
  if(!active)return;
  if(!contextValid()){close({restore:false});return;}
  const ids=selectedEdges(),compatible=combinedValid(ids),valid=syncPreview(ids);
  apply.disabled=!valid;
  if(valid){
    stateText.textContent='Bridge preview ready';
    help.textContent='Apply Bridge to keep it • Cancel discards preview';
  }else{
    const kept=firstIds.every(id=>ids.includes(id));
    stateText.textContent=compatible?'Bridge preview unavailable':kept?'First boundary ready':'Keep the first boundary selected';
    help.textContent=compatible?'Choose another boundary pair':'Add matching boundary • hold Edge → Boundary works well';
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
  active=false;panel.hidden=true;discardPreview();context=null;
  if(restore&&bridge()?.mode?.()==='edge')bridge()?.set?.('edge',keep);
  if(restore)returnPuck(keep);
  firstIds=[];
}

function openFromHub(options={}){
  if(bridge()?.mode?.()!=='edge'||!editable())return false;
  const ids=[...new Set(options.ids||selectedEdges())].filter(Number.isInteger);
  if(!combinedValid(ids)&&!isSingleBoundaryLoop(ids)){
    if(status)status.textContent='Bridge • select two compatible boundaries or start with one complete boundary loop';
    return false;
  }
  close({restore:false});
  const mesh=state()?.mesh;
  context={mesh,scene:state()?.scene,object:globalThis.__boxlabObjectManager?.activeId,key:sourceKey(mesh)};
  active=true;
  firstIds=[...ids];
  bridge()?.set?.('edge',firstIds);
  panel.hidden=false;
  apply.disabled=true;
  stateText.textContent='First boundary ready';
  help.textContent='Add matching boundary • hold Edge → Boundary works well';
  sync();requestAnimationFrame(sync);
  if(status)status.textContent=preview?'Bridge • preview shown • Apply Bridge to keep it':combinedValid(ids)?'Bridge • preview unavailable':'Bridge • first boundary kept • add matching second boundary';
  return true;
}

apply.addEventListener('click',event=>{
  event.preventDefault();event.stopPropagation();
  if(!active)return;
  sync();if(!active||apply.disabled||!preview)return;
  const ids=selectedEdges();
  active=false;panel.hidden=true;discardPreview();
  const ok=!!globalThis.__boxlabBridgeUI?.bridgeEdgesFromHub?.({ids});
  if(!ok){
    active=true;panel.hidden=false;
    if(status)status.textContent='Bridge • selected boundaries are not compatible';
    sync();
    return;
  }
  firstIds=[];context=null;
});

cancel.addEventListener('click',event=>{
  event.preventDefault();event.stopPropagation();
  close({restore:true});
});

window.addEventListener('boxlab-bridge-state',()=>{if(active)requestAnimationFrame(sync);});
document.addEventListener('pointerup',()=>{if(active)queueMicrotask(sync);},true);
document.addEventListener('click',()=>{if(active)queueMicrotask(sync);},true);

window.addEventListener('pagehide',()=>close({restore:false}));
window.addEventListener('boxlab-selection-hub-tool',event=>{if(active&&(event.detail?.mode!=='edge'||event.detail?.tool!=='Bridge'))close({restore:false});});
window.addEventListener('boxlab-tool-session-change',event=>{if(active&&event.detail?.active)close({restore:false});});

globalThis.__boxlabBridgeViewportSession={
  version:'0.36.18.676',
  active:()=>active,
  canStart:ids=>editable()&&(combinedValid(ids||selectedEdges())||isSingleBoundaryLoop(ids||selectedEdges())),
  openFromHub,
  close,
  element:panel
};
