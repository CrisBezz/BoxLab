import { placeToolSessionPanel } from './tool-session-panel-position.js?v=0.36.18.732';
// Contextual settings proxy; precision-face and repeat-face-previous own operations.
const wrap=document.querySelector('#viewportWrap');
let tool=null,raf=0,launchMesh=null,launchObject=null;
const panel=document.createElement('div');
panel.id='selectionHubFaceValueSession';panel.hidden=true;
panel.innerHTML='<strong class="shfv-title"></strong><label>Exact value <input type="number" step="0.001" inputmode="decimal" placeholder="Model units" aria-label="Exact Face tool value"/></label><button type="button" class="shfv-apply">Apply Exact</button><div class="shfv-readout"></div><div class="shfv-actions"><button type="button" class="shfv-repeat">Repeat Previous</button><button type="button" class="shfv-done">Done</button></div>';
wrap?.appendChild(panel);
const input=panel.querySelector('input'),apply=panel.querySelector('.shfv-apply'),repeat=panel.querySelector('.shfv-repeat');
const style=document.createElement('style');
style.textContent='#selectionHubFaceValueSession{position:absolute;z-index:134;width:246px;box-sizing:border-box;padding:10px;border-radius:12px;border:1px solid rgba(255,255,255,.18);background:rgba(16,19,24,.965);color:#eef2f7;pointer-events:auto;touch-action:none;font-size:12px}#selectionHubFaceValueSession[hidden]{display:none}#selectionHubFaceValueSession label{display:grid;grid-template-columns:70px 1fr;gap:6px;align-items:center;margin:8px 0}#selectionHubFaceValueSession input{min-width:0;width:100%;padding:6px;color:inherit;background:#ffffff0c;border:1px solid #ffffff30;border-radius:6px}#selectionHubFaceValueSession button{min-height:34px;padding:6px;font-size:11px}#selectionHubFaceValueSession .shfv-apply{width:100%}#selectionHubFaceValueSession .shfv-readout{font-size:10px;opacity:.75;margin:6px 0}#selectionHubFaceValueSession .shfv-actions{display:grid;grid-template-columns:1fr auto;gap:6px}';
document.head.appendChild(style);
function selected(){const b=globalThis.__boxlabSelectionBridge;return b?.mode?.()==='face'?(b.indices?.()||[]):[];}
function busy(){return !!globalThis.__boxlabFaceDirect?.dragging?.();}
function contextValid(){return globalThis.__boxlabSelectionBridge?.mode?.()==='face'&&globalThis.__boxlabBridgeState?.mesh===launchMesh&&globalThis.__boxlabObjectManager?.activeId===launchObject&&!document.querySelector('#app')?.classList?.contains('boxlab-active-locked');}
function sync(){
  cancelAnimationFrame(raf);
  if(!tool){panel.hidden=true;return;}
  if(!contextValid()){close({contextLost:true});return;}
  panel.hidden=false;
  panel.querySelector('.shfv-title').textContent=tool==='extrude'?'Extrude':'Inset';
  input.disabled=busy();
  panel.querySelector('.shfv-done').disabled=busy();
  apply.disabled=busy()||!selected().length||!globalThis.__boxlabPrecisionFace?.applyFor||input.value.trim()===''||!Number.isFinite(Number(input.value));
  const owner=globalThis.__boxlabRepeatFacePrevious,op=owner?.last?.(tool);
  const matching=op?.tool===tool;
  repeat.disabled=busy()||!matching||!owner?.arm;
  const on=matching&&!!owner?.isArmed?.();
  repeat.textContent=matching?`${on?'REPEAT ON':'Repeat'} ${tool==='inset'?'Inset':'Extrude'} ${Number(op.value).toFixed(3)}`:`Repeat ${tool==='inset'?'Inset':'Extrude'}`;
  repeat.classList.toggle('active',on);
  repeat.setAttribute('aria-pressed',String(on));
  panel.querySelector('.shfv-readout').textContent=document.querySelector('#precisionFaceReadout')?.textContent||'Drag Faces or enter a value in model units';
  placeToolSessionPanel(panel);
  raf=requestAnimationFrame(sync);
}
function close({contextLost=false}={}){
  if(busy()&&!contextLost)return false;
  const was=tool;tool=null;panel.hidden=true;cancelAnimationFrame(raf);
  if(!was)return true;
  globalThis.__boxlabRepeatFacePrevious?.disarm?.();
  if(!contextLost&&globalThis.__boxlabFaceDirect?.tool?.()===was)document.querySelector(was==='extrude'?'#extrudeBtn':'#insetBtn')?.click();
  globalThis.__boxlabFaceDirect?.clearTransformSuspension?.();
  window.dispatchEvent(new CustomEvent('boxlab-selection-hub-session-complete',{detail:{mode:'face',tool:was==='extrude'?'Extrude':'Inset'}}));
  return true;
}
panel.addEventListener('pointerdown',event=>event.stopPropagation(),true);
panel.addEventListener('touchstart',event=>event.stopPropagation(),{capture:true,passive:true});
input.addEventListener('input',sync);
function applyExact(){
  if(!tool||!contextValid()||busy()){sync();return;}
  sync();if(apply.disabled)return;
  globalThis.__boxlabRepeatFacePrevious?.disarm?.();
  globalThis.__boxlabPrecisionFace?.applyFor?.(tool,Number(input.value));
  sync();
}
apply.addEventListener('click',event=>{event.preventDefault();event.stopPropagation();applyExact();});
input.addEventListener('keydown',event=>{if(event.key==='Enter'){event.preventDefault();applyExact();input.blur();}});
repeat.addEventListener('click',event=>{event.preventDefault();event.stopPropagation();sync();if(tool&&!repeat.disabled)globalThis.__boxlabRepeatFacePrevious?.arm?.(tool);sync();});
panel.querySelector('.shfv-done').addEventListener('click',event=>{event.preventDefault();event.stopPropagation();close();});
window.addEventListener('boxlab-selection-hub-tool',event=>{
  const next=event.detail?.mode==='face'&&['Extrude','Inset'].includes(event.detail?.tool)?event.detail.tool.toLowerCase():null;
  if(tool&&tool!==next){
    // The chosen tool has already launched; do not reset its hub lifecycle.
    tool=null;panel.hidden=true;cancelAnimationFrame(raf);
    globalThis.__boxlabRepeatFacePrevious?.disarm?.();
  }
  if(!next)return;
  tool=next;launchMesh=globalThis.__boxlabBridgeState?.mesh;launchObject=globalThis.__boxlabObjectManager?.activeId;
  const value=globalThis.__boxlabPrecisionFace?.value?.();
  input.value=Number.isFinite(value)?String(value):'';
  sync();
});
window.addEventListener('boxlab-bridge-state',()=>{if(tool)sync();});
window.addEventListener('boxlab-viewport-background-tap',()=>{if(tool)close();});

globalThis.__boxlabFaceValueViewportSession={active:()=>!!tool,element:panel,close,sync};
