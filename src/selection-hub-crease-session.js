import { placeToolSessionPanel } from './tool-session-panel-position.js?v=0.36.18.716';
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
let beforeSnapshot=null;
let changed=false;

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
function sync(){
  const value=Number(strength?.value||100);
  if(Number(localStrength.value)!==value)localStrength.value=String(value);
  localOut.textContent=`${value}%`;
  if(strengthOut&&strengthOut.textContent!==`${value}%`)strengthOut.textContent=`${value}%`;
  place();
}
function applyPreview(percent){
  const ids=[...launchSelection];
  if(!ids.length)return false;
  const ok=globalThis.__boxlabMainDirectTool?.applyCreaseSelection?.(ids,Number(percent)/100,{pushHistory:false});
  if(ok){
    changed=true;
    bridge()?.set?.('edge',ids);
    sync();
  }
  return !!ok;
}
function close({commit=true}={}){
  const preserved=[...launchSelection];
  if(commit&&changed&&beforeSnapshot)globalThis.__boxlabHistory?.push?.(beforeSnapshot);
  panel.hidden=true;
  launchedFromHub=false;
  changed=false;
  beforeSnapshot=null;
  globalThis.__boxlabTransformArming?.disarm?.();
  if(preserved.length&&bridge()?.mode?.()==='edge')queueMicrotask(()=>{
    bridge()?.set?.('edge',preserved);
    globalThis.__boxlabTotalGizmo?.setHubState?.('closed',{reason:'crease-session-done'});
  });
  launchSelection=[];
}

localStrength.addEventListener('input',()=>{
  if(strength){
    strength.value=localStrength.value;
    strength.dispatchEvent(new Event('input',{bubbles:true}));
  }
  applyPreview(localStrength.value);
});
uncreaseLocal.addEventListener('click',event=>{
  event.preventDefault();event.stopPropagation();
  localStrength.value='0';
  if(strength){
    strength.value='0';
    strength.dispatchEvent(new Event('input',{bubbles:true}));
  }
  applyPreview(0);
});
done.addEventListener('click',event=>{
  event.preventDefault();event.stopPropagation();
  close({commit:true});
});

function openFromHub(options={}){
  if(launchedFromHub)return true;
  if(bridge()?.mode?.()!=='edge')return false;
  const ids=[...new Set(options.ids||selectedEdges())].filter(Number.isInteger);
  const mesh=globalThis.__boxlabBridgeState?.mesh;
  if(!ids.length||!mesh)return false;
  launchedFromHub=true;
  launchSelection=[...ids];
  beforeSnapshot=mesh.clone?.()||null;
  changed=false;
  bridge()?.set?.('edge',launchSelection);
  panel.hidden=false;
  sync();
  applyPreview(Number(strength?.value||100));
  requestAnimationFrame(()=>{if(launchedFromHub){panel.hidden=false;bridge()?.set?.('edge',launchSelection);sync();}});
  if(status)status.textContent='Crease • selected Edge(s) • adjust Strength or Uncrease • Done';
  return true;
}
window.addEventListener('boxlab-selection-hub-tool',event=>{
  if(event.detail?.mode!=='edge'||event.detail?.tool!=='Crease'||event.detail?.radialSession)return;
  openFromHub();
});
window.addEventListener('boxlab-bridge-state',()=>{if(launchedFromHub)requestAnimationFrame(sync);});
document.querySelectorAll('#selectionModes button[data-mode]').forEach(button=>button.addEventListener('click',()=>{
  if(launchedFromHub&&button.dataset.mode!=='edge')close({commit:true});
},true));
document.addEventListener('boxlab-direct-tool-exclusive',event=>{
  if(!launchedFromHub)return;
  const tool=event.detail?.tool;
  if(tool&&tool!=='none'&&tool!=='crease')close({commit:true});
});

globalThis.__boxlabCreaseViewportSession={
  version:'0.36.18.670',
  active:()=>launchedFromHub,
  openFromHub,
  close,
  element:panel
};
