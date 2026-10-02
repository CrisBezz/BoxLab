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
  const p=centerScreen();if(!p)return;
  const width=viewportWrap?.clientWidth||0;
  const offset=128,side=(width-p.x)>350?1:-1;
  panel.style.left=`${p.x+offset*side}px`;
  panel.style.top=`${p.y}px`;
  panel.style.transform='translate(-50%,-50%)';
}
function sync(){
  const value=Number(strength?.value||100);
  if(Number(localStrength.value)!==value)localStrength.value=String(value);
  localOut.textContent=`${value}%`;
  if(strengthOut&&strengthOut.textContent!==`${value}%`)strengthOut.textContent=`${value}%`;
  place();
}
function close({disarm=true}={}){
  const preserved=selectedEdges().length?selectedEdges():[...launchSelection];
  panel.hidden=true;
  launchedFromHub=false;
  if(disarm&&crease?.classList.contains('active'))crease.click();
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
  sync();
});
uncreaseLocal.addEventListener('click',event=>{
  event.preventDefault();event.stopPropagation();
  if(!selectedEdges().length)return;
  uncrease?.click();
  sync();
});
done.addEventListener('click',event=>{
  event.preventDefault();event.stopPropagation();
  close({disarm:true});
});

function openFromHub(){
  if(bridge()?.mode?.()!=='edge')return false;
  const ids=selectedEdges();
  if(!ids.length)return false;
  launchedFromHub=true;
  launchSelection=[...ids];
  panel.hidden=false;
  sync();
  requestAnimationFrame(()=>{if(launchedFromHub){panel.hidden=false;sync();}});
  if(status)status.textContent='Crease • set Strength here • tap Edge(s) to apply • Done returns to puck';
  return true;
}
window.addEventListener('boxlab-selection-hub-tool',event=>{
  if(event.detail?.mode!=='edge'||event.detail?.tool!=='Crease')return;
  openFromHub();
});
window.addEventListener('boxlab-bridge-state',()=>{if(launchedFromHub)requestAnimationFrame(sync);});
document.querySelectorAll('#selectionModes button[data-mode]').forEach(button=>button.addEventListener('click',()=>{
  if(launchedFromHub&&button.dataset.mode!=='edge')close({disarm:true});
},true));
document.addEventListener('boxlab-direct-tool-exclusive',event=>{
  if(!launchedFromHub)return;
  const tool=event.detail?.tool;
  if(tool&&tool!=='none'&&tool!=='crease')close({disarm:false});
});

globalThis.__boxlabCreaseViewportSession={
  version:'0.36.18.669',
  active:()=>launchedFromHub,
  openFromHub,
  close,
  element:panel
};
