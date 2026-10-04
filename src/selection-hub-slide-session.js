import { placeToolSessionPanel } from './tool-session-panel-position.js?v=0.36.18.730';
import * as THREE from 'three';

// BoxLab v0.36.18.672 — radial Edge Slide viewport session.
// UI/session proxy only: component-slide.js and precision-edge-slide.js remain authoritative.

const viewportWrap=document.querySelector('#viewportWrap');
const viewport=document.querySelector('#viewport');
const status=document.querySelector('#selectionStatus');

let launchedFromHub=false;
let launchSelection=[];
let launchMesh=null,launchObject=null,returnGeneration=0;

const panel=document.createElement('div');
panel.id='selectionHubSlideSession';
panel.hidden=true;
panel.innerHTML=`
  <div class="shss-title">Edge Slide</div>
  <div class="shss-row">
    <input class="shss-number" type="number" inputmode="decimal" min="-98" max="98" step="0.1" placeholder="± %" aria-label="Exact Edge Slide percentage"/>
    <button type="button" class="shss-apply">Apply Exact</button>
    <button type="button" class="shss-done">Done</button>
  </div>
  <small>Drag selected Edge(s) for live Slide • +/− chooses side</small>
`;
viewportWrap?.append(panel);

const style=document.createElement('style');
style.textContent=`
#selectionHubSlideSession{
  position:absolute;z-index:35;min-width:232px;padding:8px;border-radius:10px;
  background:rgba(18,20,24,.9);border:1px solid rgba(255,255,255,.16);
  backdrop-filter:blur(8px);color:#f5f7fa;font-size:11px;
}
#selectionHubSlideSession .shss-title{font-weight:750;margin-bottom:6px}
#selectionHubSlideSession .shss-row{display:grid;grid-template-columns:70px 1fr auto;gap:6px}
#selectionHubSlideSession .shss-number{min-width:0;width:100%;box-sizing:border-box}
#selectionHubSlideSession button{min-height:28px}
#selectionHubSlideSession small{display:block;margin-top:5px;opacity:.68}
`;
document.head.appendChild(style);

const exact=panel.querySelector('.shss-number');
const apply=panel.querySelector('.shss-apply');
const done=panel.querySelector('.shss-done');

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
function contextValid(){
  return bridge()?.mode?.()==='edge'&&globalThis.__boxlabBridgeState?.mesh===launchMesh&&globalThis.__boxlabObjectManager?.activeId===launchObject&&!document.querySelector('#app')?.classList?.contains('boxlab-active-locked');
}
function close({selection=null,disarm=true,complete=true}={}){
  if(!launchedFromHub)return false;
  const valid=contextValid(),keep=selection??selectedEdges(),mesh=launchMesh,object=launchObject,generation=++returnGeneration;
  panel.hidden=true;launchedFromHub=false;launchSelection=[];
  if(disarm){globalThis.__boxlabComponentSlide?.disarmEdge?.('Edge Slide done');}
  if(complete&&valid)requestAnimationFrame(()=>{
    if(generation!==returnGeneration||launchedFromHub||bridge()?.mode?.()!=='edge'||globalThis.__boxlabBridgeState?.mesh!==mesh||globalThis.__boxlabObjectManager?.activeId!==object)return;
    if(keep.length)bridge()?.set?.('edge',[...new Set(keep)].filter(Number.isInteger));
    globalThis.__boxlabTransformArming?.disarm?.();
    window.dispatchEvent(new CustomEvent('boxlab-selection-hub-session-complete',{detail:{mode:'edge',tool:'Slide'}}));
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
  if(!ids.length||!globalThis.__boxlabBridgeState?.mesh)return false;
  returnGeneration++;launchMesh=globalThis.__boxlabBridgeState?.mesh;launchObject=globalThis.__boxlabObjectManager?.activeId;
  launchedFromHub=true;
  launchSelection=[...ids];
  bridge()?.set?.('edge',ids);
  panel.hidden=false;
  exact.value='';apply.disabled=true;
  place();
  requestAnimationFrame(()=>{if(syncContext()){panel.hidden=false;place();}});
  if(status)status.textContent='Edge Slide • drag selected Edge(s) or enter exact ±% here';
  return true;
}

apply.addEventListener('click',event=>{
  event.preventDefault();event.stopPropagation();
  if(!syncContext())return;
  const value=Number(exact.value);
  if(exact.value.trim()===''||!Number.isFinite(value)||Math.abs(value)<1e-6||Math.abs(value)>98){
    if(status)status.textContent='Edge Slide • enter a non-zero signed percentage';
    return;
  }
  globalThis.__boxlabPrecisionEdgeSlide?.apply?.(value);
});
exact.addEventListener('input',()=>{const v=Number(exact.value);apply.disabled=exact.value.trim()===''||!Number.isFinite(v)||Math.abs(v)<1e-6||Math.abs(v)>98;});
exact.addEventListener('keydown',event=>{
  if(event.key!=='Enter')return;
  event.preventDefault();
  apply.click();
  exact.blur();
});
done.addEventListener('click',event=>{
  event.preventDefault();event.stopPropagation();
  close({disarm:true});
});

window.addEventListener('boxlab-selection-hub-tool',event=>{
  if(launchedFromHub&&(event.detail?.mode!=='edge'||event.detail?.tool!=='Slide'))close({complete:false});
  if(event.detail?.mode!=='edge'||event.detail?.tool!=='Slide'||event.detail?.radialSession)return;
  openFromHub();
});
window.addEventListener('boxlab-edge-slide-complete',event=>{
  if(!syncContext())return;
  const ids=[...new Set(event.detail?.ids||launchSelection)].filter(Number.isInteger);
  launchSelection=ids;
  place();
});
window.addEventListener('boxlab-bridge-state',()=>{if(syncContext())requestAnimationFrame(()=>{if(syncContext())place();});});
document.querySelectorAll('#selectionModes button[data-mode]').forEach(button=>button.addEventListener('click',()=>{
  if(launchedFromHub&&button.dataset.mode!=='edge')close({disarm:true,complete:false});
},true));

globalThis.__boxlabSlideViewportSession={
  version:'0.36.18.672',
  active:()=>launchedFromHub,
  openFromHub,
  close,
  element:panel
};

window.addEventListener('boxlab-viewport-background-tap',()=>{if(syncContext())close({disarm:true});});
