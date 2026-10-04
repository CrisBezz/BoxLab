import { placeToolSessionPanel } from './tool-session-panel-position.js?v=0.36.18.729';
import * as THREE from 'three';

// BoxLab v0.36.18.671 — radial Offset Loop viewport session.
// UI/session proxy only: loop-offset.js and precision-offset-loop.js remain authoritative.

const viewportWrap=document.querySelector('#viewportWrap');
const viewport=document.querySelector('#viewport');
const spacing=document.querySelector('#offsetLoopSpacing');
const spacingOut=document.querySelector('#offsetLoopSpacingOut');
const status=document.querySelector('#selectionStatus');

let launchedFromHub=false;
let launchSelection=[];
let launchMesh=null,launchObject=null,returnGeneration=0;

const panel=document.createElement('div');
panel.id='selectionHubOffsetSession';
panel.hidden=true;
panel.innerHTML=`
  <div class="shos-title">Offset Loop</div>
  <label class="shos-row">
    <span>Spacing</span>
    <input class="shos-range" type="range" min="2" max="45" step="1" value="20"/>
    <output class="shos-out">20%</output>
  </label>
  <div class="shos-exact">
    <input class="shos-number" type="number" inputmode="decimal" min="2" max="45" step="0.1" value="20" aria-label="Exact Offset Loop percentage"/>
    <button type="button" class="shos-apply">Apply Exact</button>
    <button type="button" class="shos-done">Done</button>
  </div>
  <small>Drag selected loop for live Offset • or Apply Exact</small>
`;
viewportWrap?.append(panel);

const style=document.createElement('style');
style.textContent=`
#selectionHubOffsetSession{
  position:absolute;z-index:35;min-width:224px;padding:8px;border-radius:10px;
  background:rgba(18,20,24,.9);border:1px solid rgba(255,255,255,.16);
  backdrop-filter:blur(8px);color:#f5f7fa;font-size:11px;
}
#selectionHubOffsetSession .shos-title{font-weight:750;margin-bottom:6px}
#selectionHubOffsetSession .shos-row{display:grid;grid-template-columns:auto 1fr auto;gap:7px;align-items:center}
#selectionHubOffsetSession .shos-range{width:102px}
#selectionHubOffsetSession .shos-exact{display:grid;grid-template-columns:64px 1fr auto;gap:6px;margin-top:7px}
#selectionHubOffsetSession .shos-number{min-width:0;width:100%;box-sizing:border-box}
#selectionHubOffsetSession button{min-height:28px}
#selectionHubOffsetSession small{display:block;margin-top:5px;opacity:.68}
`;
document.head.appendChild(style);

const localRange=panel.querySelector('.shos-range');
const localOut=panel.querySelector('.shos-out');
const localNumber=panel.querySelector('.shos-number');
const apply=panel.querySelector('.shos-apply');
const done=panel.querySelector('.shos-done');

function bridge(){return globalThis.__boxlabSelectionBridge;}
function selectedEdges(){return bridge()?.mode?.()==='edge'?[...new Set(bridge()?.indices?.()||[])]:[];}

function centerScreen(ids=selectedEdges()){
  const state=globalThis.__boxlabBridgeState,mesh=state?.mesh,camera=state?.camera;
  if(!mesh||!camera||!ids.length||!viewport||!viewportWrap)return null;
  const verts=new Set(),edges=mesh.edges();
  ids.forEach(i=>{const edge=edges[i];if(edge){verts.add(edge.a);verts.add(edge.b);}});
  if(!verts.size)return null;
  const c=new THREE.Vector3();
  verts.forEach(i=>c.add(mesh.vertices[i]));
  c.multiplyScalar(1/verts.size).project(camera);
  const rect=viewport.getBoundingClientRect(),wrap=viewportWrap.getBoundingClientRect();
  return{
    x:rect.left-wrap.left+(c.x*.5+.5)*rect.width,
    y:rect.top-wrap.top+(-c.y*.5+.5)*rect.height
  };
}
function place(){
  placeToolSessionPanel(panel);
}
function authoritativeValue(){
  return Math.max(2,Math.min(45,Number(spacing?.value||20)));
}
function sync(value=authoritativeValue()){
  const v=Math.max(2,Math.min(45,Number(value)||20));
  localRange.value=String(Math.round(v));
  localNumber.value=String(v);apply.disabled=false;
  localOut.textContent=`${Math.round(v)}%`;
  if(spacing){
    spacing.value=String(Math.round(v));
    spacingOut&&(spacingOut.textContent=`${Math.round(v)}%`);
  }
  place();
}
function contextValid(){
  return bridge()?.mode?.()==='edge'&&globalThis.__boxlabBridgeState?.mesh===launchMesh&&globalThis.__boxlabObjectManager?.activeId===launchObject&&!document.querySelector('#app')?.classList?.contains('boxlab-active-locked');
}
function close({selection=null,disarm=true,complete=true}={}){
  if(!launchedFromHub)return false;
  const valid=contextValid(),keep=selection??selectedEdges(),mesh=launchMesh,object=launchObject,generation=++returnGeneration;
  panel.hidden=true;launchedFromHub=false;launchSelection=[];
  if(disarm){if(globalThis.__boxlabOffsetLoop?.isArmed?.())globalThis.__boxlabOffsetLoop?.disarm?.('Offset Loop done');}
  if(complete&&valid)requestAnimationFrame(()=>{
    if(generation!==returnGeneration||launchedFromHub||bridge()?.mode?.()!=='edge'||globalThis.__boxlabBridgeState?.mesh!==mesh||globalThis.__boxlabObjectManager?.activeId!==object)return;
    if(keep.length)bridge()?.set?.('edge',[...new Set(keep)].filter(Number.isInteger));
    globalThis.__boxlabTransformArming?.disarm?.();
    window.dispatchEvent(new CustomEvent('boxlab-selection-hub-session-complete',{detail:{mode:'edge',tool:'Offset'}}));
  });
  return true;
}
function syncContext(){
  if(!launchedFromHub)return false;
  if(!contextValid()){close({complete:false});return false;}
  return true;
}
function openFromHub(options={}){
  if(bridge()?.mode?.()!=='edge'||document.querySelector('#app')?.classList?.contains('boxlab-active-locked'))return false;
  const ids=[...new Set(options.ids||selectedEdges())].filter(Number.isInteger);
  const mesh=globalThis.__boxlabBridgeState?.mesh;
  if(!ids.length||!mesh?.offsetEdgeLoopInfo?.(ids))return false;
  returnGeneration++;launchMesh=globalThis.__boxlabBridgeState?.mesh;launchObject=globalThis.__boxlabObjectManager?.activeId;
  launchedFromHub=true;
  launchSelection=[...ids];
  bridge()?.set?.('edge',ids);
  panel.hidden=false;
  sync();
  requestAnimationFrame(()=>{if(syncContext()){panel.hidden=false;place();}});
  if(status)status.textContent='Offset Loop • drag selected loop or set exact Support Spacing here';
  return true;
}

localRange.addEventListener('input',()=>{
  if(!syncContext())return;
  const value=Number(localRange.value);
  if(spacing){
    spacing.value=String(value);
    spacing.dispatchEvent(new Event('input',{bubbles:true}));
  }
  localNumber.value=String(value);apply.disabled=false;
  localOut.textContent=`${Math.round(value)}%`;
});
localNumber.addEventListener('input',()=>{
  if(!syncContext())return;
  const raw=Number(localNumber.value);
  apply.disabled=localNumber.value.trim()===''||!Number.isFinite(raw)||raw<2||raw>45;
  if(!Number.isFinite(raw))return;
  const value=Math.max(2,Math.min(45,raw));
  localRange.value=String(Math.round(value));
  if(spacing){
    spacing.value=String(Math.round(value));
    spacing.dispatchEvent(new Event('input',{bubbles:true}));
  }
  localOut.textContent=`${Math.round(value)}%`;
});
apply.addEventListener('click',event=>{
  event.preventDefault();event.stopPropagation();
  if(!syncContext()||apply.disabled)return;
  const raw=Number(localNumber.value);if(localNumber.value.trim()===''||!Number.isFinite(raw)||raw<2||raw>45)return;
  const value=raw;
  globalThis.__boxlabPrecisionOffsetLoop?.apply?.(value);
});
done.addEventListener('click',event=>{
  event.preventDefault();event.stopPropagation();
  close({disarm:true});
});

window.addEventListener('boxlab-selection-hub-tool',event=>{
  if(launchedFromHub&&(event.detail?.mode!=='edge'||event.detail?.tool!=='Offset'))close({complete:false});
  if(event.detail?.mode!=='edge'||event.detail?.tool!=='Offset'||event.detail?.radialSession)return;
  openFromHub();
});
window.addEventListener('boxlab-offset-loop-complete',event=>{
  if(!syncContext())return;
  const created=[...new Set(event.detail?.created||[])].filter(Number.isInteger);
  close({selection:created,disarm:true});
});
window.addEventListener('boxlab-bridge-state',()=>{if(syncContext())requestAnimationFrame(()=>{if(syncContext())place();});});
document.querySelectorAll('#selectionModes button[data-mode]').forEach(button=>button.addEventListener('click',()=>{
  if(launchedFromHub&&button.dataset.mode!=='edge')close({disarm:true,complete:false});
},true));

globalThis.__boxlabOffsetViewportSession={
  version:'0.36.18.671',
  active:()=>launchedFromHub,
  openFromHub,
  close,
  element:panel
};
