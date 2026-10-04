import { placeToolSessionPanel } from './tool-session-panel-position.js?v=0.36.18.732';
import * as THREE from 'three';

// BoxLab v0.36.18.668 — Selection Hub Crease viewport session.
// UI proxy only: main.js remains the authoritative Crease owner.

const viewportWrap=document.querySelector('#viewportWrap');
const viewport=document.querySelector('#viewport');
const strength=document.querySelector('#creaseStrength');
const strengthOut=document.querySelector('#creaseStrengthOut');
const crease=document.querySelector('#applyCreaseBtn');
const uncrease=document.querySelector('#clearCreaseBtn');
const status=document.querySelector('#selectionStatus');

let launchedFromHub=false;
let launchSelection=[];
let changed=false;
let launchMesh=null,launchObject=null,returnGeneration=0;

const panel=document.createElement('div');
panel.id='selectionHubCreaseSession';
panel.hidden=true;
panel.innerHTML=`
  <div class="shcs-title">Crease</div>
  <label class="shcs-row">
    <span>Strength</span>
    <input class="shcs-strength" type="range" min="0" max="100" step="5" value="100"/>
    <output class="shcs-out">100%</output>
  </label>
  <div class="shcs-actions">
    <button type="button" class="shcs-uncrease">Uncrease</button>
    <button type="button" class="shcs-done">Done</button>
  </div>
  <small class="shcs-note">Set strength • tap Edge(s) to apply</small>
`;
viewportWrap?.append(panel);

const style=document.createElement('style');
style.textContent=`
#selectionHubCreaseSession{
  position:absolute;z-index:35;min-width:196px;padding:8px;border-radius:10px;
  background:rgba(18,20,24,.9);border:1px solid rgba(255,255,255,.16);
  backdrop-filter:blur(8px);color:#f5f7fa;font-size:11px;
}
#selectionHubCreaseSession .shcs-title{font-weight:750;margin-bottom:6px}
#selectionHubCreaseSession .shcs-row{display:grid;grid-template-columns:auto 1fr auto;gap:7px;align-items:center}
#selectionHubCreaseSession input{width:96px}
#selectionHubCreaseSession .shcs-actions{display:grid;grid-template-columns:1fr 1fr;gap:6px;margin-top:7px}
#selectionHubCreaseSession button{min-height:28px}
#selectionHubCreaseSession .shcs-note{display:block;margin-top:5px;opacity:.68}
`;
document.head.appendChild(style);

const localStrength=panel.querySelector('.shcs-strength');
const localOut=panel.querySelector('.shcs-out');
const done=panel.querySelector('.shcs-done');
const uncreaseLocal=panel.querySelector('.shcs-uncrease');

function bridge(){return globalThis.__boxlabSelectionBridge;}
function selectedEdges(){
  return bridge()?.mode?.()==='edge'?[...new Set(bridge()?.indices?.()||[])]:[];
}
function centerScreen(){
  const state=globalThis.__boxlabBridgeState,mesh=state?.mesh,camera=state?.camera,ids=selectedEdges();
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
function sync(){
  if(!launchedFromHub)return;
  if(!contextValid()){close({complete:false});return;}
  const value=Number(strength?.value||100);
  if(Number(localStrength.value)!==value)localStrength.value=String(value);
  localOut.textContent=`${value}%`;
  if(strengthOut&&strengthOut.textContent!==`${value}%`)strengthOut.textContent=`${value}%`;
  place();
}
function applyPreview(percent){
  const ids=[...launchSelection];
  if(!contextValid()||!ids.length)return false;
  // Record once through the real owner before Object management can swap histories.
  const ok=globalThis.__boxlabMainDirectTool?.applyCreaseSelection?.(ids,Number(percent)/100,{pushHistory:!changed});
  if(ok){
    changed=true;
    bridge()?.set?.('edge',ids);
    sync();
  }
  return !!ok;
}
function close({complete=true}={}){
  if(!launchedFromHub)return false;
  const valid=contextValid(),mesh=launchMesh,object=launchObject,generation=++returnGeneration;
  const preserved=[...launchSelection];
  panel.hidden=true;
  launchedFromHub=false;
  changed=false;
  if(complete&&valid)queueMicrotask(()=>{
    if(generation!==returnGeneration||launchedFromHub||bridge()?.mode?.()!=='edge'||globalThis.__boxlabBridgeState?.mesh!==mesh||globalThis.__boxlabObjectManager?.activeId!==object)return;
    globalThis.__boxlabTransformArming?.disarm?.();
    if(preserved.length)bridge()?.set?.('edge',preserved);
    window.dispatchEvent(new CustomEvent('boxlab-selection-hub-session-complete',{detail:{mode:'edge',tool:'Crease'}}));
  });
  launchSelection=[];
  return true;
}

localStrength.addEventListener('input',()=>{
  if(!contextValid())return;
  if(strength){
    strength.value=localStrength.value;
    strength.dispatchEvent(new Event('input',{bubbles:true}));
  }
  applyPreview(localStrength.value);
});
uncreaseLocal.addEventListener('click',event=>{
  event.preventDefault();event.stopPropagation();
  if(!contextValid())return;
  localStrength.value='0';
  if(strength){
    strength.value='0';
    strength.dispatchEvent(new Event('input',{bubbles:true}));
  }
  applyPreview(0);
});
done.addEventListener('click',event=>{
  event.preventDefault();event.stopPropagation();
  close();
});

function openFromHub(options={}){
  if(launchedFromHub)return true;
  if(bridge()?.mode?.()!=='edge'||document.querySelector('#app')?.classList?.contains('boxlab-active-locked'))return false;
  const ids=[...new Set(options.ids||selectedEdges())].filter(Number.isInteger);
  const mesh=globalThis.__boxlabBridgeState?.mesh;
  if(!ids.length||!mesh)return false;
  returnGeneration++;launchMesh=mesh;launchObject=globalThis.__boxlabObjectManager?.activeId;
  launchedFromHub=true;
  launchSelection=[...ids];
  changed=false;
  bridge()?.set?.('edge',launchSelection);
  panel.hidden=false;
  sync();
  applyPreview(Number(strength?.value||100));
  requestAnimationFrame(()=>{if(launchedFromHub&&contextValid()){panel.hidden=false;bridge()?.set?.('edge',launchSelection);sync();}});
  if(status)status.textContent='Crease • selected Edge(s) • adjust Strength or Uncrease • Done';
  return true;
}
window.addEventListener('boxlab-selection-hub-tool',event=>{
  if(launchedFromHub&&(event.detail?.mode!=='edge'||event.detail?.tool!=='Crease'))close({complete:false});
  if(event.detail?.mode!=='edge'||event.detail?.tool!=='Crease'||event.detail?.radialSession)return;
  openFromHub();
});
window.addEventListener('boxlab-bridge-state',()=>{if(launchedFromHub)requestAnimationFrame(sync);});
document.querySelectorAll('#selectionModes button[data-mode]').forEach(button=>button.addEventListener('click',()=>{
  if(launchedFromHub&&button.dataset.mode!=='edge')close({complete:false});
},true));
document.addEventListener('boxlab-direct-tool-exclusive',event=>{
  if(!launchedFromHub)return;
  const tool=event.detail?.tool;
  if(tool&&tool!=='none'&&tool!=='crease')close({complete:false});
});

globalThis.__boxlabCreaseViewportSession={
  version:'0.36.18.670',
  active:()=>launchedFromHub,
  openFromHub,
  close,
  element:panel
};
